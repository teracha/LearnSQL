// Traducteur de requêtes (docs/traducteur.md) : des cas sans navigateur. Usage (depuis la racine) : node outils/tests/traducteur-cas.js
// Chaque cas : la requête, des morceaux de texte attendus, des morceaux interdits, et parfois les notes « À savoir »
// attendues (exactement), l'ordre des étapes, les fiches du dico (présentes ou absentes).
global.window = global;
const fs = require('fs'), path = require('path');
const racine = path.join(__dirname, '..', '..');
window.LEARNSQL = {};
// Le dico dans l'ordre de index.html (l'ordre compte quand deux fiches ont le même nom).
const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
(html.match(/data\/dico\/[a-z-]+\.js/g) || []).forEach(f => require(path.join(racine, f)));
require(path.join(racine, 'js/traducteur.js'));
const T = sql => LEARNSQL.traduire(sql);

const cas = [
  // --- Les 3 exemples de la page ---
  { nom: 'exemple 1 : regroupement', sql: "SELECT c.nom, SUM(co.montant_ht) AS total\nFROM commande co\nJOIN client c ON c.id = co.client_id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY c.nom\nHAVING SUM(co.montant_ht) > 5000\nORDER BY total DESC;",
    attendu: ['PRENDRE la table commande (appelée co)', 'RELIER la table client (appelée c), quand c.id = co.client_id', 'seulement les lignes qui ont une correspondance',
      "GARDER les lignes où co.statut est différent de 'ANNULEE'", 'REGROUPER par c.nom', 'pour chaque groupe : total = la somme de co.montant_ht',
      'GARDER les groupes où la somme de co.montant_ht est plus grande que 5000', 'AFFICHER c.nom, total', 'TRIER par total, du plus grand au plus petit'],
    ordre: ['PRENDRE', 'RELIER', 'GARDER les lignes', 'REGROUPER', 'GARDER les groupes', 'AFFICHER', 'TRIER'], notes: [7], fiches: ['sum', 'group-by', 'having'] },
  { nom: 'exemple 2 : LEFT JOIN et IS NULL', sql: 'SELECT c.code, c.nom\nFROM client c\nLEFT JOIN commande co ON co.client_id = c.id\nWHERE co.id IS NULL;',
    attendu: ['toutes les lignes de c, même sans correspondance (les colonnes de co sont alors vides : NULL)', 'GARDER les lignes où co.id est vide (NULL)'], interdit: ['JOIN simple'], notes: [], fiches: ['left-join', 'is-null'] },
  { nom: 'exemple 3 : CTE et ROW_NUMBER', sql: 'WITH derniere AS (\n  SELECT co.*,\n         ROW_NUMBER() OVER (PARTITION BY co.client_id ORDER BY co.date_cde DESC) AS rn\n  FROM commande co\n)\nSELECT client_id, num_cde, date_cde, montant_ht\nFROM derniere\nWHERE rn = 1;',
    attendu: ['PRÉPARER « derniere » :', 'le numéro de la ligne (1, 2, 3…) dans chaque groupe de co.client_id, en triant par co.date_cde du plus grand au plus petit',
      'PRENDRE le résultat « derniere » (préparé plus haut)', 'GARDER les lignes où rn est égal à 1'], interdit: ['REGROUPER'],
    ordre: ['PRÉPARER', 'CALCULER', 'PRENDRE le résultat', 'GARDER'], notes: [], fiches: ['with-cte', 'row-number', 'over'] },

  // --- Clauses et expressions ---
  { nom: 'agrégat sans GROUP BY', sql: "SELECT COUNT(*) AS nb, COUNT(ville) AS v, COUNT(DISTINCT nom) AS n FROM client",
    attendu: ['REGROUPER toutes les lignes en un seul groupe', 'nb = le nombre de lignes', 'v = le nombre de ville non vides', 'n = le nombre de valeurs différentes de nom (sans compter les vides)'], notes: [] },
  { nom: 'DISTINCT, TOP et ORDER BY numéro', sql: 'SELECT DISTINCT TOP 3 famille, prix_tarif FROM article ORDER BY 2 DESC',
    attendu: ['ENLEVER les lignes en double', 'TRIER par la 2e colonne affichée (prix_tarif), du plus grand au plus petit', 'GARDER les 3 premières lignes'],
    ordre: ['AFFICHER', 'ENLEVER', 'TRIER', 'GARDER les 3'], notes: [] },
  { nom: 'TOP WITH TIES', sql: 'SELECT TOP (4) WITH TIES num_cde FROM commande ORDER BY montant_ht DESC', attendu: ['plus celles ex aequo', 'il peut en sortir plus de 4'], notes: [] },
  { nom: 'OFFSET FETCH', sql: 'SELECT num_cde FROM commande ORDER BY date_cde DESC OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY', attendu: ['SAUTER les 20 premières lignes', 'GARDER les 10 lignes suivantes'], notes: [] },
  { nom: 'IN, BETWEEN et IS NOT NULL', sql: "SELECT * FROM commande WHERE canal IN ('EDI', 'WEB') AND montant_ht BETWEEN 100 AND 500 AND client_id IS NOT NULL",
    attendu: ["canal vaut 'EDI' ou 'WEB'", 'montant_ht est entre 100 et 500 (bornes comprises)', 'client_id a une valeur (pas NULL)', 'AFFICHER toutes les colonnes'], notes: [] },
  { nom: 'LIKE : commence, contient, modèle', sql: "SELECT code FROM article WHERE code LIKE 'CHL%' OR libelle LIKE '%pompe%' OR statut LIKE 'EN_%'",
    attendu: ["code commence par 'CHL'", "libelle contient 'pompe'", "statut ressemble au modèle 'EN_%' : 'EN', un caractère quelconque, puis n'importe quel texte"], interdit: ["commence par 'EN_'"], notes: [] },
  { nom: 'ILIKE (Snowflake)', sql: "SELECT nom FROM client WHERE nom ILIKE '%piscine%'", attendu: ["nom contient 'piscine' (sans tenir compte des majuscules)"], notes: [], fiches: ['ilike'] },
  { nom: 'CASE sans ELSE', sql: "SELECT CASE WHEN montant_ht >= 5000 THEN 'GROS' WHEN montant_ht >= 1000 THEN 'MOYEN' END AS taille FROM commande",
    attendu: ['taille = selon le cas (le premier cas vrai gagne) :', "si montant_ht vaut au moins 5000 alors 'GROS'", "sinon si montant_ht vaut au moins 1000 alors 'MOYEN'", 'sinon : vide (NULL)'], notes: [] },
  { nom: 'fonctions de texte, dates, conversion', sql: "SELECT DATEADD(DAY, 30, date_fact) AS e, DATEDIFF(DAY, date_fact, '2026-04-30') AS a, UPPER(LEFT(statut, 3)) AS c, COALESCE(ville, '?') AS v, ROUND(prix, 2) AS p, CAST(x AS DATE) AS d FROM t",
    attendu: ['e = date_fact plus 30 jours', "a = le nombre de jours de date_fact à '2026-04-30'", 'c = (les 3 premiers caractères de statut) en majuscules', "v = ville, ou '?' si ville est vide", 'p = prix arrondi à 2 décimales', 'd = x converti en date (DATE)'],
    notes: [], fiches: ['dateadd', 'datediff', 'upper-lower', 'left', 'coalesce', 'round', 'cast'] },
  { nom: 'IIF : même quand le test donne NULL', sql: "SELECT IIF(stock > 0, 'oui', 'non') AS dispo FROM article", attendu: ["dispo = 'oui' si stock est plus grand que 0, sinon 'non' (même quand le test donne NULL)"], notes: [] },
  { nom: 'fonction inconnue écrite telle quelle', sql: 'SELECT dbo.calcul_remise(c.id, 5) AS r FROM client c', attendu: ['r = dbo.calcul_remise(c.id, 5)'], notes: [] },
  { nom: 'GROUP BY ROLLUP', sql: 'SELECT canal, statut, SUM(montant_ht) AS t FROM commande GROUP BY ROLLUP (canal, statut)',
    attendu: ['REGROUPER par canal et statut, plus un sous-total par canal (sans détailler statut), plus un total général', 'les colonnes qui ne sont pas regroupées sont vides (NULL)'], notes: [], fiches: ['rollup'] },
  { nom: 'MySQL WITH ROLLUP', sql: 'SELECT canal, SUM(montant_ht) FROM commande GROUP BY canal WITH ROLLUP', attendu: ['REGROUPER par canal, plus un total général'], notes: [] },
  { nom: 'alias du SELECT dans HAVING (dire ce qu\'il vaut)', sql: 'SELECT client_id, SUM(montant_ht) AS total FROM commande GROUP BY client_id HAVING total > 1000',
    attendu: ["GARDER les groupes où total (c'est-à-dire la somme de montant_ht) est plus grand que 1000"], notes: [] },
  { nom: 'GROUP BY 1 et GROUP BY ALL', sql: "SELECT DATE_TRUNC('month', date_cde) AS mois, canal, SUM(montant_ht) AS ca FROM commande GROUP BY ALL",
    attendu: ["REGROUPER par toutes les colonnes affichées qui ne sont pas des calculs de groupe : mois (c'est-à-dire date_cde ramené au début du mois (le 1er jour)) et canal"], notes: [] },

  // --- Jointures ---
  { nom: 'jointure 1-n : les lignes répétées', sql: 'SELECT c.nom FROM client c INNER JOIN commande co ON co.client_id = c.id', attendu: ['une ligne qui a plusieurs correspondances sort une fois pour chacune'], notes: [] },
  { nom: 'FULL OUTER JOIN', sql: 'SELECT * FROM commande co FULL OUTER JOIN flux_edi e ON e.cde_id = co.id', attendu: ['toutes les lignes des deux côtés, même sans correspondance'], notes: [], fiches: ['full-outer-join'] },
  { nom: 'CROSS JOIN', sql: 'SELECT * FROM depot d CROSS JOIN article a', attendu: ['toutes les combinaisons : chaque ligne avec chaque ligne de a'], notes: [], fiches: ['cross-join'] },
  { nom: 'jointure à l\'ancienne (virgule)', sql: 'SELECT c.nom FROM client c, commande co WHERE co.client_id = c.id',
    attendu: ['RELIER la table commande (appelée co) : toutes les combinaisons (virgule)', 'co.client_id = c.id (le lien entre co et c)'], notes: [] },
  { nom: 'CROSS APPLY', sql: 'SELECT c.nom, x.num_cde FROM client c CROSS APPLY (SELECT TOP 1 num_cde FROM commande co WHERE co.client_id = c.id ORDER BY date_cde DESC) x',
    attendu: ['RELIER pour chaque ligne, le résultat de la sous-requête (appelée x), calculé avec cette ligne', 'une ligne pour laquelle ce bloc ne renvoie rien disparaît', 'GARDER la première ligne'], notes: [], fiches: ['cross-apply'] },
  { nom: 'OUTER APPLY', sql: 'SELECT c.nom FROM client c OUTER APPLY (SELECT TOP 1 num_cde FROM commande co WHERE co.client_id = c.id ORDER BY date_cde) x',
    attendu: ['reste, avec des colonnes vides (NULL)'], notes: [] },

  // --- Sous-requêtes, CTE, ensembles ---
  { nom: 'IN (sous-requête) et sous-requête scalaire', sql: 'SELECT a.code, (SELECT AVG(prix_tarif) FROM article) AS moyen FROM article a WHERE a.id IN (SELECT article_id FROM ligne_cde)',
    attendu: ['GARDER les lignes où a.id fait partie du résultat de :', 'moyen = le résultat de :'], notes: [] },
  { nom: 'EXISTS corrélé', sql: "SELECT co.num_cde FROM commande co WHERE EXISTS (SELECT 1 FROM facture f WHERE f.cde_id = co.id)",
    attendu: ['il existe au moins une ligne dans :', '(refaite pour chaque ligne de la requête du dessus : elle utilise co.id)'], interdit: ['AFFICHER 1'], notes: [] },
  { nom: 'CTE récursive sans RECURSIVE (SQL Server)', sql: 'WITH n AS (SELECT 1 AS k UNION ALL SELECT k + 1 FROM n WHERE k < 10) SELECT k FROM n',
    attendu: ['une requête récursive (elle se cite elle-même, même sans le mot RECURSIVE)', 'DÉPART :', 'RÉPÉTER tant que de nouvelles lignes arrivent', 'EMPILER les lignes du départ et de tous les tours (UNION ALL'], notes: [] },
  { nom: 'UNION et tri de l\'ensemble', sql: "SELECT ville FROM client UNION SELECT nom FROM depot ORDER BY ville",
    attendu: ['REQUÊTE 1 :', 'REQUÊTE 2 :', 'ASSEMBLER les lignes de la requête 1 et de la requête 2, sans les lignes en double (UNION)', 'TRIER le tout par ville'], notes: [] },
  { nom: 'UNION ALL', sql: 'SELECT a FROM t UNION ALL SELECT a FROM u', attendu: ['à la suite : les doublons restent (UNION ALL)'], notes: [] },
  { nom: 'INTERSECT passe avant EXCEPT', sql: 'SELECT a FROM t EXCEPT SELECT a FROM u INTERSECT SELECT a FROM v',
    attendu: ['présentes à la fois dans la requête 2 et dans la requête 3', 'INTERSECT est calculé avant EXCEPT', 'GARDER les lignes de la requête 1 qui ne sont pas dans ce résultat'], notes: [] },

  // --- Fenêtres ---
  { nom: 'cumul : cadre par défaut et ROWS', sql: 'SELECT SUM(qte) OVER (PARTITION BY a ORDER BY d) AS c1, SUM(qte) OVER (PARTITION BY a ORDER BY d ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS c2 FROM t',
    attendu: ['c1 = le cumul de qte dans chaque groupe de a', 'les lignes qui ont la même valeur de d sont comptées ensemble (même résultat)', 'c2 = la somme de qte dans chaque groupe de a, en triant par d du plus petit au plus grand, sur la ligne courante et les 2 lignes d\'avant', 'CALCULER sur chaque ligne, sans regrouper'], notes: [] },
  { nom: 'LAG et RANK', sql: 'SELECT LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) AS avant, RANK() OVER (ORDER BY montant_ht DESC) AS r FROM commande',
    attendu: ["avant = la valeur de date_cde sur la ligne d'avant dans chaque groupe de client_id", '(vide s\'il n\'y en a pas)', 'puis un trou (1, 2, 2, 4)'], notes: [] },
  { nom: 'QUALIFY (Snowflake)', sql: 'SELECT * FROM flux_edi QUALIFY ROW_NUMBER() OVER (PARTITION BY cde_id ORDER BY date_recu DESC) = 1',
    attendu: ['calcul 1 = le numéro de la ligne', 'GARDER les lignes où calcul 1 est égal à 1'], ordre: ['CALCULER', 'GARDER', 'AFFICHER'], notes: [], fiches: ['qualify'] },

  // --- Les notes « À savoir » : où elles sortent, et où elles ne sortent pas ---
  { nom: 'note 1 : = NULL', sql: 'SELECT * FROM client WHERE siren = NULL', attendu: ['siren est égal à NULL', 'IS NULL'], notes: [1] },
  { nom: 'note 1 : <> NULL', sql: 'SELECT * FROM client WHERE siren <> NULL', attendu: ['IS NOT NULL'], notes: [1] },
  { nom: 'note 1 : CASE x WHEN NULL', sql: "SELECT CASE ville WHEN NULL THEN '?' ELSE ville END AS v FROM client", attendu: ['CASE ville WHEN NULL'], notes: [1] },
  { nom: 'pas de note 1 : une affectation', sql: 'UPDATE client SET ville = NULL WHERE id = 3', attendu: ['METTRE ville = vide (NULL)'], notes: [] },
  { nom: 'pas de note 1 : IS DISTINCT FROM', sql: 'SELECT * FROM t WHERE a IS DISTINCT FROM b', attendu: ['(deux NULL comptent comme égaux)'], notes: [] },
  { nom: 'note 2 : NOT IN (sous-requête)', sql: 'SELECT num_cde FROM commande WHERE id NOT IN (SELECT cde_id FROM flux_edi)', attendu: ['ne fait pas partie du résultat de', 'NOT EXISTS'], notes: [2] },
  { nom: 'pas de note 2 : NOT EXISTS', sql: 'SELECT num_cde FROM commande co WHERE NOT EXISTS (SELECT 1 FROM flux_edi e WHERE e.cde_id = co.id)', attendu: ["il n'existe aucune ligne dans"], notes: [] },
  { nom: 'note 3 : LEFT JOIN puis WHERE sur b', sql: "SELECT co.num_cde FROM commande co LEFT JOIN facture f ON f.cde_id = co.id WHERE f.statut = 'PAYEE'", attendu: ['la jointure agit comme un JOIN simple', 'mets cette condition dans le ON'], notes: [3] },
  { nom: 'pas de note 3 : condition dans le ON', sql: "SELECT co.num_cde FROM commande co LEFT JOIN facture f ON f.cde_id = co.id AND f.statut = 'PAYEE'", notes: [] },
  { nom: 'pas de note 3 : COALESCE garde les vides', sql: "SELECT co.num_cde FROM commande co LEFT JOIN facture f ON f.cde_id = co.id WHERE COALESCE(f.statut, 'X') = 'X'", notes: [] },
  { nom: 'note 3 : RIGHT JOIN et la table de gauche', sql: 'SELECT a.code FROM stock_depot s RIGHT JOIN article a ON a.id = s.article_id WHERE s.depot_id = 1', attendu: ['RIGHT JOIN'], notes: [3] },
  { nom: 'note 4 : UPDATE sans WHERE', sql: 'UPDATE dbo.article SET prix_tarif = prix_tarif * 1.05', attendu: ['MODIFIER toutes les lignes de la table dbo.article', 'METTRE prix_tarif = prix_tarif * 1.05'], notes: [4] },
  { nom: 'note 4 : DELETE sans WHERE', sql: 'DELETE FROM import_edi', attendu: ['SUPPRIMER toutes les lignes de la table import_edi'], notes: [4] },
  { nom: 'pas de note 4 : TRUNCATE', sql: 'TRUNCATE TABLE import_edi', attendu: ['VIDER la table import_edi'], notes: [], fiches: ['truncate'] },
  { nom: 'pas de note 4 avec TOP, mais la note 5', sql: "UPDATE TOP (100) dbo.flux_edi SET statut = 'OK'", attendu: ['MODIFIER au plus 100 lignes de la table dbo.flux_edi'], notes: [5] },
  { nom: 'note 5 : TOP sans ORDER BY', sql: "select top 5 * from dbo.flux_edi where statut = 'REJET'", attendu: ['GARDER les 5 premières lignes', 'ordre garanti'], notes: [5] },
  { nom: 'note 5 : LIMIT sans ORDER BY', sql: 'SELECT * FROM flux_edi LIMIT 5 OFFSET 5', attendu: ['SAUTER les 5 premières lignes', 'GARDER les 5 lignes suivantes'], notes: [5] },
  { nom: 'pas de note 5 : TOP dans EXISTS', sql: 'SELECT * FROM client c WHERE EXISTS (SELECT TOP 1 1 FROM commande co WHERE co.client_id = c.id)', notes: [] },
  { nom: 'note 6 : ET passe avant OU', sql: "SELECT * FROM commande WHERE statut = 'LIVREE' OR statut = 'EN_COURS' AND canal = 'EDI'",
    attendu: ["statut est égal à 'LIVREE' ou (statut est égal à 'EN_COURS' et canal est égal à 'EDI')"], notes: [6] },
  { nom: 'pas de note 6 : parenthèses écrites', sql: "SELECT * FROM commande WHERE (statut = 'LIVREE' OR statut = 'EN_COURS') AND canal = 'EDI'",
    attendu: ["(statut est égal à 'LIVREE' ou statut est égal à 'EN_COURS') et canal est égal à 'EDI'"], notes: [] },
  { nom: 'note 7 : <> sur une colonne', sql: "SELECT * FROM client WHERE ville <> 'Lyon'", attendu: ['les lignes où ville est vide (NULL) sont écartées aussi'], notes: [7] },
  { nom: 'note 7 : NOT LIKE', sql: "SELECT * FROM article WHERE code NOT LIKE 'CHL%'", attendu: ["code ne commence pas par 'CHL'"], notes: [7] },
  { nom: 'note 7 dans un DELETE', sql: "DELETE FROM flux_edi WHERE statut <> 'OK'", attendu: ['ne sont pas supprimées non plus'], notes: [7] },
  { nom: 'pas de note 7 : <> dans le ON', sql: "SELECT * FROM client c JOIN commande co ON co.client_id = c.id AND co.statut <> 'ANNULEE'", notes: [] },
  { nom: 'pas de note 7 : <> sur ISNULL(colonne)', sql: "SELECT * FROM client WHERE ISNULL(ville, '') <> 'Lyon'", attendu: ["(ville, ou '' si ville est vide) est différent de 'Lyon'"], notes: [] },
  { nom: 'note 8 : || (Snowflake)', sql: "SELECT code || ' - ' || nom AS lib FROM client", attendu: ["lib = code, ' - ' et nom collés (||)", 'PIPES_AS_CONCAT'], notes: [8] },
  { nom: 'note 8 : || sur MySQL (OU logique)', sql: "SELECT num_cde || DATE_FORMAT(date_cde, '%d/%m/%Y') AS lib FROM commande", attendu: ['un OU logique', 'au format jj/mm/aaaa'], notes: [8] },
  { nom: 'pas de note 8 : CONCAT', sql: "SELECT CONCAT(code, ' - ', nom) AS lib FROM client", attendu: ["lib = code, ' - ' et nom collés"], notes: [] },
  { nom: 'note 9 : LAST_VALUE sans cadre', sql: 'SELECT LAST_VALUE(num_cde) OVER (PARTITION BY client_id ORDER BY date_cde) AS d FROM commande', attendu: ['la dernière valeur de num_cde', 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING'], notes: [9] },
  { nom: 'pas de note 9 : cadre écrit', sql: 'SELECT LAST_VALUE(num_cde) OVER (PARTITION BY client_id ORDER BY date_cde ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS d FROM commande', attendu: ['sur tout le groupe, du début à la fin'], notes: [] },
  { nom: 'note 10 : BETWEEN et une date sans heure', sql: "SELECT * FROM flux_edi WHERE date_recu BETWEEN '2026-03-01' AND '2026-03-31'", attendu: ['le 31 à 0 h 00', 'la journée du 31 est presque exclue'], notes: [10] },
  { nom: 'pas de note 10 : BETWEEN sur des nombres', sql: 'SELECT * FROM commande WHERE montant_ht BETWEEN 100 AND 500', notes: [] },

  // --- Les 3 écritures ---
  { nom: 'SQL Server : [crochets], dbo., base.schema.table, NOLOCK', sql: 'SELECT [code] FROM ventes.dbo.[article] a WITH (NOLOCK) WHERE a.[famille] = @fam',
    attendu: ['PRENDRE la table ventes.dbo.[article] (appelée a), lue sans attendre les verrous (NOLOCK', 'a.[famille] est égal à @fam'], notes: [], fiches: ['nolock'] },
  { nom: 'Snowflake : :: , chemin JSON, FLATTEN', sql: 'SELECT r.raw:header.num::STRING AS num, l.value:ean::STRING AS ean FROM raw_orders r, LATERAL FLATTEN(input => r.raw:lines) l',
    attendu: ['num = le champ header.num du JSON r.raw, converti en texte (STRING)', 'RELIER pour chaque ligne, les éléments du tableau r.raw:lines (FLATTEN, appelés l)', 'une ligne dont le tableau est vide ou absent disparaît'],
    interdit: ['paramètre :header'], notes: [], fiches: ['flatten'] },
  { nom: 'Snowflake : Time Travel et MINUS', sql: 'SELECT id FROM commande AT(OFFSET => -60*30) MINUS SELECT id FROM commande', attendu: ['telle qu\'elle était il y a 1800 secondes (30 minutes)', '(MINUS, comme EXCEPT)'], notes: [] },
  { nom: 'MySQL : accents graves et LIMIT m, n', sql: 'SELECT `num_cde` FROM `commande` ORDER BY `date_cde` DESC LIMIT 10, 20', attendu: ['SAUTER les 10 premières lignes', 'GARDER les 20 lignes suivantes'], interdit: ['GARDER les 10'], notes: [] },
  { nom: 'MySQL : IFNULL et GROUP_CONCAT … SEPARATOR', sql: "SELECT IFNULL(c.ville, '?') AS v, GROUP_CONCAT(co.num_cde ORDER BY co.date_cde SEPARATOR ' | ') AS l FROM client c LEFT JOIN commande co ON co.client_id = c.id GROUP BY c.id, c.ville",
    attendu: ["v = c.ville, ou '?' si c.ville est vide", "collées en un seul texte, séparées par ' | ', triées par co.date_cde"], notes: [] },
  { nom: 'guillemets doubles : un texte sur MySQL, un nom ailleurs', sql: 'SELECT * FROM commande WHERE statut = "LIVREE"', attendu: ['sur MySQL, "LIVREE" est un texte'], notes: [] },
  { nom: 'paramètres ? et :id', sql: 'SELECT * FROM t WHERE a = ? AND b = :id', attendu: ['est égal au paramètre ?', 'est égal au paramètre :id'], notes: [] },

  // --- Les instructions qui modifient ---
  { nom: 'INSERT … VALUES, plusieurs lignes', sql: "INSERT INTO dbo.depot (id, nom) VALUES (4, N'Bordeaux'), (5, N'Lille')", attendu: ['AJOUTER 2 lignes dans la table dbo.depot (colonnes id, nom) :', "(4, N'Bordeaux')"], notes: [], fiches: ['insert'], sansFiches: ['stuff'] },
  { nom: 'INSERT … SELECT', sql: "INSERT INTO archive (id, num) SELECT id, num FROM facture WHERE statut = 'PAYEE'", attendu: ['AJOUTER dans la table archive (colonnes id, num) le résultat de :', 'la 1re colonne affichée va dans id'], notes: [] },
  { nom: 'MySQL : ON DUPLICATE KEY UPDATE', sql: 'INSERT INTO stock_depot (article_id, depot_id, qte) VALUES (5, 1, 12) ON DUPLICATE KEY UPDATE qte = qte + VALUES(qte)',
    attendu: ['ON DUPLICATE KEY UPDATE : si une ligne avec la même clé primaire', "la valeur qu'on voulait ajouter dans qte"], notes: [] },
  { nom: 'MySQL : REPLACE et INSERT IGNORE', sql: 'REPLACE INTO t (a) VALUES (1); INSERT IGNORE INTO t (a) VALUES (2)', attendu: ['elle est d\'abord SUPPRIMÉE', 'INSERT IGNORE : une ligne qui ferait un doublon de clé est sautée'], notes: [] },
  { nom: 'UPDATE … FROM avec jointure (SQL Server)', sql: 'UPDATE a SET a.stock = s.total FROM dbo.article AS a JOIN (SELECT article_id, SUM(qte) AS total FROM stock_depot GROUP BY article_id) AS s ON s.article_id = a.id',
    attendu: ['MODIFIER la table dbo.article (appelée a)', 'une ligne de a sans correspondance n\'est pas modifiée', 'METTRE a.stock = s.total'], interdit: ['toutes les lignes'], notes: [] },
  { nom: 'MySQL : UPDATE … JOIN … SET', sql: "UPDATE commande co JOIN client c ON c.id = co.client_id SET co.canal = 'EDI' WHERE c.type = 'GD'", attendu: ['MODIFIER la table commande (appelée co)', "seulement les lignes où c.type est égal à 'GD'", 'les autres tables ne sont pas modifiées'], notes: [] },
  { nom: 'DELETE a FROM a JOIN b', sql: "DELETE e FROM flux_edi e JOIN commande co ON co.id = e.cde_id WHERE co.statut = 'ANNULEE'",
    attendu: ['SUPPRIMER des lignes de la table flux_edi (appelée e)', 'seules des lignes de e sont supprimées'], notes: [] },
  { nom: 'DELETE à travers une CTE', sql: 'WITH d AS (SELECT id, ROW_NUMBER() OVER (PARTITION BY cle ORDER BY id) AS rn FROM dbo.flux_edi) DELETE FROM d WHERE rn > 1',
    attendu: ['ce sont les lignes de la table dbo.flux_edi qui sont supprimées'], notes: [] },
  { nom: 'MERGE avec NOT MATCHED BY SOURCE', sql: 'MERGE dbo.tarif AS c USING src AS s ON c.code = s.code WHEN MATCHED THEN UPDATE SET c.prix = s.prix WHEN NOT MATCHED BY TARGET THEN INSERT (code, prix) VALUES (s.code, s.prix) WHEN NOT MATCHED BY SOURCE THEN DELETE;',
    attendu: ['FUSIONNER la source src (appelée s) dans la cible dbo.tarif (appelée c)', 'les cas WHEN sont testés dans l\'ordre', 'si une ligne de la cible n\'a pas de correspondance dans la source : SUPPRIMER cette ligne de la cible', 'toutes les autres lignes de la cible sont supprimées'],
    notes: [], fiches: ['merge'] },
  { nom: 'SELECT … INTO #table', sql: 'SELECT id, nom INTO #c FROM client', attendu: ['CRÉER la table temporaire #c avec ce résultat'], ordre: ['AFFICHER', 'CRÉER'], notes: [] },
  { nom: 'MySQL : SELECT … INTO @variable', sql: 'SELECT COUNT(*) INTO @n FROM client', attendu: ['RANGER le résultat dans @n (aucune table n\'est créée'], notes: [] },
  { nom: 'CREATE TABLE simple', sql: "CREATE TABLE client (id INT PRIMARY KEY, code VARCHAR(10) NOT NULL, pays CHAR(2) DEFAULT 'FR', depot_id INT REFERENCES depot(id))",
    attendu: ['CRÉER la table client, avec les colonnes :', 'id : nombre entier (INT), clé primaire', 'code : texte de 10 caractères au plus (VARCHAR(10)), obligatoire (NOT NULL)', "par défaut : 'FR'", 'doit exister dans depot (id) (clé étrangère)'], notes: [] },
  { nom: 'CREATE OR REPLACE TABLE … AS SELECT', sql: 'CREATE OR REPLACE TABLE r.ca AS SELECT client_id, SUM(montant_ht) AS ca FROM commande GROUP BY client_id',
    attendu: ['CRÉER la table r.ca avec le résultat de :', 'si elle existe déjà, elle est REMPLACÉE'], notes: [] },
  { nom: 'CREATE VIEW et DROP TABLE IF EXISTS', sql: 'CREATE VIEW v_c AS SELECT nom FROM client;\nDROP TABLE IF EXISTS tmp;', attendu: ['CRÉER la vue v_c, qui donne le résultat de :', 'SUPPRIMER la table tmp (sa structure et toutes ses lignes), si elle existe'], notes: [] },

  // --- T-SQL ---
  { nom: 'DECLARE, SET, SELECT @x =, PRINT', sql: "DECLARE @nb INT = 0;\nSET @nb = (SELECT COUNT(*) FROM commande);\nSELECT @d = date_cde FROM commande WHERE client_id = 1;\nPRINT 'nb : ' + CAST(@nb AS VARCHAR(10));",
    attendu: ['INSTRUCTION 1 :', 'DÉCLARER la variable @nb : nombre entier (INT), qui vaut au départ 0', 'METTRE dans @nb le résultat de la sous-requête (NULL si elle ne renvoie aucune ligne ; erreur si elle en renvoie plusieurs) :',
      'RANGER dans @d la valeur date_cde', 'si aucune ligne : @d garde son ancienne valeur', "ÉCRIRE le message 'nb : ' +"], notes: [] },
  { nom: 'IF EXISTS … ELSE', sql: "IF EXISTS (SELECT 1 FROM flux_edi WHERE statut = 'REJET') PRINT 'rejets' ELSE PRINT 'aucun'", attendu: ['SI il existe au moins une ligne dans :', 'ALORS :', 'SINON :'], ordre: ['SI', 'ALORS', 'SINON'], notes: [] },
  { nom: 'WHILE et BEGIN … END', sql: 'DECLARE @i INT = 1\nWHILE @i <= 3\nBEGIN\n  PRINT @i\n  SET @i += 1\nEND', attendu: ['RÉPÉTER tant que @i vaut au plus 3 :', 'METTRE dans @i la valeur @i + 1'], notes: [] },
  { nom: 'TRY … CATCH, transaction, XACT_ABORT, THROW', sql: 'SET XACT_ABORT ON;\nBEGIN TRY\n  BEGIN TRAN;\n  UPDATE t SET a = 1 WHERE id = 2;\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF @@TRANCOUNT > 0 ROLLBACK;\n  THROW;\nEND CATCH',
    attendu: ['RÉGLER : à la première erreur', 'ESSAYER :', 'COMMENCER une transaction', 'VALIDER la transaction', "EN CAS D'ERREUR :", 'ANNULER la transaction', "RELANCER l'erreur attrapée"], notes: [], fiches: ['try-catch', 'xact-abort', 'commit', 'rollback', 'throw', 'trancount'] },
  { nom: 'RAISERROR : information ou erreur', sql: "RAISERROR('info', 10, 1) WITH NOWAIT;\nRAISERROR('grave', 16, 1);", attendu: ["un simple message d'information, pas une erreur", "SIGNALER l'erreur 'grave' (gravité 16) : dans un TRY, on passe au CATCH"], notes: [] },
  { nom: 'EXEC avec OUTPUT et sp_executesql', sql: "EXEC dbo.p @a = 1, @r = @res OUTPUT;\nEXEC sp_executesql @sql, N'@s INT', @s = 5;",
    attendu: ['EXÉCUTER la procédure dbo.p, avec @a = 1, @r = @res (en sortie : la valeur revient dans @res)', 'EXÉCUTER le texte contenu dans @sql comme une requête (SQL dynamique, sp_executesql), avec le paramètre @s = 5'], notes: [] },
  { nom: 'curseur', sql: 'DECLARE c CURSOR LOCAL FAST_FORWARD FOR SELECT id FROM t;\nOPEN c;\nFETCH NEXT FROM c INTO @id;\nWHILE @@FETCH_STATUS = 0 FETCH NEXT FROM c INTO @id;\nCLOSE c;\nDEALLOCATE c;',
    attendu: ['DÉCLARER le curseur c', 'OUVRIR le curseur c', 'LIRE la ligne suivante du curseur c, et la ranger dans @id', 'tant que la dernière lecture du curseur a réussi (@@FETCH_STATUS = 0)', 'FERMER le curseur c', 'LIBÉRER le curseur c'], notes: [] },
  { nom: 'CREATE PROCEDURE, GO, lots', sql: 'CREATE OR ALTER PROCEDURE dbo.p @id INT, @r INT OUTPUT AS\nBEGIN\n  SET NOCOUNT ON;\n  SELECT @r = COUNT(*) FROM t WHERE id = @id;\nEND\nGO\nEXEC dbo.p 1, @x OUTPUT\nGO',
    attendu: ['LOT 1 :', 'CRÉER la procédure dbo.p (ou la modifier si elle existe)', '@r : nombre entier (INT), en sortie', 'ce qu\'elle fait (jusqu\'au GO suivant', 'LOT 2 :', 'EXÉCUTER la procédure dbo.p'], notes: [] },
  { nom: 'piège : CREATE PROCEDURE sans GO', sql: 'CREATE PROCEDURE dbo.purge AS\n  DELETE FROM t WHERE a = 1;\nEXEC dbo.purge;', attendu: ['elle s\'appelle elle-même'], interdit: ['INSTRUCTION 2'], notes: [] },
  { nom: 'CREATE FUNCTION', sql: 'CREATE FUNCTION dbo.f (@x INT) RETURNS INT AS BEGIN RETURN @x * 2 END', attendu: ['CRÉER la fonction dbo.f', 'elle renvoie : nombre entier (INT)', 'RENVOYER @x * 2'], notes: [] },
  { nom: 'USE et GO sans point-virgule', sql: "use ventes\ngo\ndeclare @d date = getdate()\nupdate dbo.facture set statut = 'RETARD' where date_fact < dateadd(day, -30, @d)\nselect @@rowcount as nb\ngo",
    attendu: ['LOT 1 :', 'UTILISER la base ventes', 'LOT 2 :', 'INSTRUCTION 3 :', 'la date du jour', 'date_fact est plus petit que @d moins 30 jours', 'le nombre de lignes touchées par l\'instruction d\'avant (@@ROWCOUNT)'], notes: [] },
  { nom: 'plusieurs instructions avec ;', sql: 'SELECT 1; SELECT 2', attendu: ['INSTRUCTION 1 :', 'INSTRUCTION 2 :'], notes: [] },
  { nom: 'une variable n\'existe que dans son lot', sql: 'DECLARE @d DATE = GETDATE()\nGO\nSELECT * FROM t WHERE d = @d', attendu: ['LOT 2 :', '@d est déclarée dans un autre lot'], notes: [] },

  // --- Commentaires, textes faux ou coupés ---
  { nom: 'commentaires -- et /* */ ignorés', sql: '-- en-tête\nSELECT /* colonnes */ nom -- le nom\nFROM client /* fin */', attendu: ['PRENDRE la table client', 'AFFICHER nom'], interdit: ['en-tête', 'colonnes'], notes: [] },
  { nom: 'commentaire # (MySQL) et //', sql: '# remise à zéro\nSELECT a FROM t // fin de ligne', attendu: ['PRENDRE la table t'], interdit: ['remise'], notes: [] },
  { nom: 'parenthèse jamais fermée', sql: 'SELECT nom FROM client WHERE id IN (1, 2, 3', attendu: ["Je n'arrive pas à lire la requête à partir de : (1, 2, 3", 'jamais fermée'], interdit: ['PRENDRE'] },
  { nom: 'FROM sans table', sql: "SELECT nom, ville FROM WHERE pays = 'FR'", attendu: ["Je n'arrive pas à lire la requête à partir de : WHERE pays = 'FR'"], interdit: ['PRENDRE'] },
  { nom: 'texte qui n\'est pas du SQL', sql: 'Bonjour, peux-tu me lister les commandes ?', attendu: ["Je n'arrive pas à lire la requête à partir de : Bonjour"] },
  { nom: 'texte vide', sql: '   \n\t ', attendu: ['Rien à traduire : colle une requête SQL.'], vide: true },
  { nom: 'seulement des commentaires', sql: '-- rien\n/* encore rien */', attendu: ['Rien à traduire : colle une requête SQL.'], vide: true },
  { nom: 'texte entre apostrophes jamais fermé', sql: "SELECT * FROM commande WHERE statut = 'ANNULEE", attendu: ["Je n'arrive pas à lire la requête à partir de : 'ANNULEE (un texte entre apostrophes n'est jamais fermé)"] },
  { nom: 'requête coupée en plein milieu', sql: 'SELECT a FROM t WHERE a =', attendu: ["Je n'arrive pas à lire la requête à partir de : la fin du texte"] },
  { nom: 'non traduit (PIVOT), puis la suite continue', sql: "SELECT * FROM t PIVOT (SUM(m) FOR c IN ([A], [B])) p;\nSELECT a FROM u;", attendu: ['Je ne sais pas encore traduire : PIVOT', 'PRENDRE la table u'] },
  { nom: 'instruction non traduite (GRANT), puis la suite', sql: 'GRANT SELECT ON t TO lecteur;\nDELETE FROM t WHERE a = 1;', attendu: ['Je ne sais pas encore traduire : GRANT', 'SUPPRIMER des lignes de la table t'] },
  { nom: 'du HTML dans la requête reste du texte', sql: "SELECT '<script>alert(1)</script>' AS x, \"<b>\" FROM t", attendu: ["x = '<script>alert(1)</script>'"], notes: [] },

  // --- Les liens vers le dico : pas de faux liens ---
  { nom: 'pas de faux lien : une colonne qui s\'appelle comme un mot-clé', sql: 'SELECT t.left, t.date, t.count FROM t', fiches: ['select', 'from'], sansFiches: ['left', 'count', 'types-date'] },
  { nom: 'IF() de MySQL : la fiche IIF ; IF … ELSE : la fiche IF', sql: "SELECT IF(a > 0, 'o', 'n') FROM t; IF @x = 1 PRINT 'a';", fiches: ['iif', 'if-else'] },
  { nom: 'TRUNCATE() de MySQL : la fiche ROUND, pas TRUNCATE TABLE', sql: 'SELECT TRUNCATE(prix, 1) FROM article', attendu: ['tronqué à 1 décimale'], fiches: ['round'], sansFiches: ['truncate'] }
];

let echecs = 0;
const ligne = (c, m) => { echecs++; console.log('ÉCHEC  ' + c.nom + ' : ' + m); };
cas.forEach(c => {
  let r;
  try { r = T(c.sql); } catch (e) { ligne(c, 'exception ' + e.message); return; }
  if (!r || !Array.isArray(r.lignes) || typeof r.texte !== 'string') { ligne(c, 'résultat mal formé'); return; }
  const t = r.texte;
  (c.attendu || []).forEach(a => { if (t.indexOf(a) < 0) ligne(c, 'absent : « ' + a + ' »'); });
  (c.interdit || []).forEach(a => { if (t.indexOf(a) >= 0) ligne(c, 'interdit présent : « ' + a + ' »'); });
  if (c.notes) { const n = r.notes.map(x => x.num); if (JSON.stringify(n) !== JSON.stringify(c.notes)) ligne(c, 'notes ' + JSON.stringify(n) + ' au lieu de ' + JSON.stringify(c.notes)); }
  if (c.ordre) { let k = -1; c.ordre.forEach(o => { const p = t.indexOf(o, k + 1); if (p < 0 || p <= k) ligne(c, 'ordre : « ' + o + ' » mal placé'); else k = p; }); }
  const ids = r.fiches.map(f => f.id);
  (c.fiches || []).forEach(f => { if (ids.indexOf(f) < 0) ligne(c, 'fiche du dico absente : ' + f); });
  (c.sansFiches || []).forEach(f => { if (ids.indexOf(f) >= 0) ligne(c, 'faux lien vers la fiche ' + f); });
  if (c.vide && r.lignes.length) ligne(c, 'des lignes de pseudo-code pour un texte vide');
  if (!c.vide && !r.lignes.length) ligne(c, 'aucune ligne (page blanche)');
});
let total = cas.length;

// Rapide : une requête de 300 lignes en moins de 200 ms.
total++;
(() => {
  const l = ['SELECT co.id,'];
  for (let k = 0; k < 120; k++) l.push("  CASE WHEN co.montant_ht > " + k + " THEN 'T" + k + "' END AS t" + k + ',');
  l.push('  co.num_cde', 'FROM commande co');
  for (let k = 0; k < 60; k++) l.push('LEFT JOIN facture f' + k + ' ON f' + k + '.cde_id = co.id');
  l.push('WHERE 1 = 1');
  while (l.length < 300) l.push("  AND (co.canal = 'C" + l.length + "' OR co.montant_ht BETWEEN 1 AND 2)");
  const sql = l.join('\n'), d = Date.now(), r = T(sql), ms = Date.now() - d;
  console.log('300 lignes de SQL : ' + ms + ' ms, ' + r.lignes.length + ' lignes de pseudo-code');
  if (ms >= 200 || !r.lignes.length) { echecs++; console.log('ÉCHEC  vitesse : ' + ms + ' ms'); }
})();

// Jamais d'exception, jamais de page blanche : chaque début des exemples (requête coupée), et des textes au hasard.
total++;
(() => {
  let n = 0, mauvais = 0, graine = 3;
  const hasard = m => { graine = (graine * 1103515245 + 12345) % 2147483648; return graine % m; };
  const textes = cas.slice(0, 3).map(c => c.sql).concat(cas.filter(c => /T-SQL|MERGE|CREATE PROC|curseur/.test(c.nom)).map(c => c.sql));
  textes.forEach(s => { for (let k = 1; k <= s.length; k++) { n++; essai(s.slice(0, k)); } });
  const alpha = "SELECT FROM WHERE ()'\",;.*=<>!@#$%|[]`:?-+/\n\tabc0123456789éà€";
  for (let r = 0; r < 500; r++) { let s = ''; const l = hasard(80); for (let k = 0; k < l; k++) s += alpha.charAt(hasard(alpha.length)); n++; essai(s); }
  function essai(s) {
    try { const r = T(s); if (!r || (!r.lignes.length && !r.erreurs.length)) mauvais++; } catch (e) { mauvais++; }
  }
  console.log(n + ' textes coupés ou au hasard : ' + mauvais + ' problème(s)');
  if (mauvais) { echecs++; console.log('ÉCHEC  solidité'); }
})();

console.log(echecs + ' échec(s) sur ' + total);
process.exitCode = echecs ? 1 : 0;
