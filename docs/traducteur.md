# Traduire une requête en pseudo-code

L'élève colle une requête SQL (SQL Server, Snowflake ou MySQL). Le site l'explique en **pseudo-code français**, étape
par étape, **dans l'ordre où SQL la calcule**. Sans IA, sans service externe : tout se passe dans le navigateur, la
requête ne quitte jamais l'ordinateur (ce sont souvent des requêtes d'entreprise).

## L'exemple validé par l'élève

```sql
SELECT c.nom, SUM(co.montant_ht) AS total
FROM commande co
JOIN client c ON c.id = co.client_id
WHERE co.statut <> 'ANNULEE'
GROUP BY c.nom
HAVING SUM(co.montant_ht) > 5000
ORDER BY total DESC;
```

L'exemple écrit à la main (le style visé) :

```
PRENDRE les commandes
  RELIER chaque commande à son client
GARDER les commandes non annulées
REGROUPER par nom de client
  total = somme des montants HT
GARDER les clients dont le total dépasse 5000
AFFICHER le nom et le total
TRIER du plus gros total au plus petit
```

Le site, sans IA, ne devine pas « non annulées ». Il écrit une traduction plus littérale, mais aussi claire :

```
PRENDRE la table commande (appelée co)
RELIER la table client (appelée c), quand c.id = co.client_id
    seulement les commandes qui ont un client
GARDER les lignes où co.statut est différent de 'ANNULEE'
REGROUPER par c.nom
    pour chaque groupe : total = la somme de co.montant_ht
GARDER les groupes où la somme de co.montant_ht est plus grande que 5000
AFFICHER c.nom, total
TRIER par total, du plus grand au plus petit
```

## La page

- `#/traduire`, ouverte à tous, sans compte. Lien « Traduire » dans le menu, après « Dico ». Lien aussi depuis la page
  du dico.
- Une phrase d'explication : « Colle une requête SQL. Le site l'explique en pseudo-code, dans l'ordre où SQL la
  calcule. Rien n'est envoyé : tout reste dans ton navigateur. »
- Une zone de texte (police code), un bouton « Traduire », un bouton « Copier » (le pseudo-code en texte simple, pour
  une spécification), et 3 exemples à cliquer (regroupement ; clients sans commande avec `LEFT JOIN` ; dernière
  commande par client avec une CTE et `ROW_NUMBER`), sur la base d'exemple (`docs/base-exemple.sql`).
- La requête n'est **enregistrée nulle part** (ni localStorage, ni URL) : elle reste dans une variable tant que
  l'onglet est ouvert, pour la retrouver après un clic vers le dico.
- Le résultat :
  1. le pseudo-code : une action par ligne, le verbe en MAJUSCULES au début (mis en valeur), les sous-étapes en
     retrait, une sous-requête dans un bloc décalé ;
  2. « À savoir » : les notes de sens (règles plus bas), seulement s'il y en a ;
  3. « Dans le dico » : des liens vers les fiches du dico des mots de la requête (fonctions et mots-clés reconnus par
     leur `nom` ou leurs `noms`).
- Lisible sur téléphone (390 px) : pas de défilement horizontal de la page ; les lignes longues passent à la ligne.

## Le moteur

`js/traducteur.js`, ES5, sans bibliothèque. Fonction pure `LEARNSQL.traduire(texteSql)` qui renvoie la traduction
(lignes avec leur niveau de retrait, notes, fiches du dico, erreurs) : testable avec node, sans navigateur. L'affichage
est dans `js/app.js` (`pageTraduire`).

### L'ordre des étapes (ordre logique de calcul)
1. `WITH` : chaque CTE devient une étape « PRÉPARER « nom » : … », avant la requête principale ; une CTE récursive :
   un départ, puis « RÉPÉTER tant que de nouvelles lignes arrivent ».
2. `FROM` et jointures → PRENDRE, RELIER (le type de jointure dit en mots : seulement les lignes avec correspondance ;
   toutes les lignes de gauche, même sans correspondance ; toutes les combinaisons ; `APPLY` / `LATERAL` : pour chaque
   ligne, …).
3. `WHERE` → GARDER les lignes où …
4. `GROUP BY` (`ROLLUP`, `CUBE`, `GROUPING SETS`) → REGROUPER, avec les calculs de chaque groupe. Un agrégat sans
   `GROUP BY` : toutes les lignes en un seul groupe.
5. `HAVING` → GARDER les groupes où …
6. Fonctions de fenêtre (`OVER`) → CALCULER sur chaque ligne, sans regrouper : …
7. `QUALIFY` → GARDER les lignes où … (après les fenêtres).
8. `SELECT` → AFFICHER … ; `DISTINCT` → ENLEVER les lignes en double.
9. `ORDER BY` → TRIER par …, du plus petit au plus grand / du plus grand au plus petit (numéro de colonne : dire
   laquelle).
10. `TOP`, `LIMIT`, `OFFSET … FETCH` → GARDER les N premières lignes (SAUTER les M premières).
- `UNION` / `UNION ALL` / `INTERSECT` / `EXCEPT` / `MINUS` : un bloc par requête, puis l'opération en mots (avec ou
  sans doublons), puis le tri et la limite de l'ensemble.

### Les expressions en mots
- `=` égal à ; `<>` et `!=` différent de ; `>` plus grand que ; `<` plus petit que ; `>=` au moins ; `<=` au plus.
- `AND` et, `OR` ou, `NOT` pas. Le regroupement réel est montré (ET passe avant OU).
- `IN (a, b)` vaut a ou b ; `NOT IN (a, b)` ne vaut ni a, ni b ; `IN (sous-requête)` fait partie du résultat de : … ;
  `EXISTS` il existe au moins une ligne dans : … ; `BETWEEN a AND b` entre a et b (bornes comprises).
- `LIKE 'X%'` commence par X ; `'%X'` finit par X ; `'%X%'` contient X ; sinon : ressemble au modèle (% = n'importe
  quel texte, _ = un seul caractère). `ILIKE` (Snowflake) : sans tenir compte des majuscules.
- `IS NULL` est vide (NULL) ; `IS NOT NULL` n'est pas vide.
- `CASE` : selon le cas, si … alors … sinon … ; `IIF` / `IFF` / `IF()` : x si condition, sinon y.
- Fonctions courantes (agrégats, texte, dates, conversion, nombres, fenêtres) : une phrase modèle chacune
  (`COUNT(*)` le nombre de lignes ; `COUNT(x)` le nombre de x non vides ; `COUNT(DISTINCT x)` le nombre de x
  différents ; `COALESCE(a, b)` a, ou b si a est vide ; `ROW_NUMBER() OVER (PARTITION BY a ORDER BY b DESC)` le
  numéro de la ligne dans chaque groupe de a, en triant par b du plus grand au plus petit ; …). Fonction inconnue :
  écrite telle quelle (et lien vers le dico si une fiche existe). Jamais une traduction inventée.
- Les noms de tables, de colonnes et les valeurs restent écrits comme dans la requête ; un alias est expliqué une fois
  (« la table commande, appelée co »).
- Les 3 écritures sont acceptées : `[crochets]`, `` `accents graves` ``, `"guillemets"` ; `dbo.table`, `base.schema.table` ;
  `TOP` et `LIMIT` ; `x::INT` ; `@variable`, `?`, `:param`, `$1` ; commentaires `--` et `/* */` (ignorés).

### Les autres instructions
- `INSERT … VALUES` / `INSERT … SELECT` → AJOUTER ; `UPDATE` (avec `FROM` / `JOIN`) → MODIFIER … METTRE … ; `DELETE`
  → SUPPRIMER ; `TRUNCATE` → VIDER ; `MERGE` → FUSIONNER (si la ligne existe : … ; si elle n'existe pas : …) ;
  MySQL `ON DUPLICATE KEY UPDATE`, `REPLACE`, `INSERT IGNORE`.
- `SELECT … INTO` (SQL Server), `CREATE TABLE … AS SELECT`, `CREATE VIEW … AS` → CRÉER ; `CREATE TABLE` simple : ses
  colonnes et leurs règles.
- T-SQL courant : `DECLARE`, `SET`, `SELECT @x = …`, `IF … ELSE`, `WHILE`, `BEGIN … END`, transactions (`BEGIN TRAN`,
  `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVE TRAN`), `TRY … CATCH`, `THROW` / `RAISERROR`, `EXEC` (et SQL
  dynamique), `PRINT`, `RETURN`, `CREATE PROCEDURE` / `FUNCTION`, `SET NOCOUNT ON`, `SET XACT_ABORT ON`, curseurs
  (`DECLARE … CURSOR`, `OPEN`, `FETCH`, `CLOSE`, `DEALLOCATE`), `USE`.
- Plusieurs instructions (séparées par `;` ou `GO`) : INSTRUCTION 1, INSTRUCTION 2…
- Ce que le moteur ne sait pas lire : une ligne honnête « Je ne sais pas encore traduire : … » (le début du texte), et
  la suite continue. Une requête incomplète ou fausse : « Je n'arrive pas à lire la requête à partir de : … ». Jamais
  d'erreur JavaScript, jamais de page blanche.

### « À savoir » : les notes de sens
Une note dit ce que la requête **fait vraiment**, quand ce n'est pas ce qu'on croit. Pas de conseil de style ni de
performance. Une ou deux phrases, mots simples, une seule fois par requête :
1. `= NULL`, `<> NULL`, `!= NULL` dans une condition : jamais vrai, aucune ligne ; écrire `IS NULL`.
2. `NOT IN (sous-requête)` : si la sous-requête renvoie un NULL, aucune ligne ne sort ; préférer `NOT EXISTS`.
3. `LEFT JOIN b` puis, dans le `WHERE`, une condition simple sur une colonne de b (autre que `IS NULL`) : les lignes
   sans correspondance disparaissent, la jointure agit comme un `JOIN` simple ; mettre la condition dans le `ON`.
   (Même chose pour `RIGHT JOIN` et la table de gauche.)
4. `UPDATE` ou `DELETE` sans `WHERE` (et sans jointure) : toutes les lignes de la table.
5. `TOP`, `LIMIT` ou `FETCH` sans `ORDER BY` : les lignes gardées peuvent changer d'une fois à l'autre.
6. `AND` et `OR` mélangés sans parenthèses : ET passe avant OU (le pseudo-code montre le vrai regroupement).
7. `<>`, `!=`, `NOT LIKE`, `NOT IN (liste)`, `NOT BETWEEN` sur une colonne : les lignes où elle est NULL sont écartées
   aussi.
8. `||` : colle des textes sur Snowflake et sur SQL Server 2025+ (erreur sur les versions d'avant) ; sur MySQL, c'est
   un OU logique (sauf réglage `PIPES_AS_CONCAT`) : utiliser `CONCAT`.
9. `LAST_VALUE … OVER (… ORDER BY …)` sans cadre écrit : sur SQL Server et MySQL, la fenêtre s'arrête à la ligne
   courante (on obtient souvent la ligne elle-même) ; Snowflake prend toute la fenêtre.

## Les tests
- `node outils/tests/traducteur-cas.js` : des cas (requête → morceaux de texte attendus, et interdits), sans navigateur ;
  affiche « N échec(s) sur M ».
- `outils/tests/traduire.js` (Playwright, dans `outils/tests/lancer.sh`) : la page, un exemple, le bouton Traduire, le
  bouton Copier, un lien vers le dico, l'écran de téléphone, aucune erreur JavaScript.
