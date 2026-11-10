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
    seulement les lignes qui ont une correspondance
GARDER les lignes où co.statut est différent de 'ANNULEE'
REGROUPER par c.nom
    pour chaque groupe : total = la somme de co.montant_ht
GARDER les groupes où la somme de co.montant_ht est plus grande que 5000
AFFICHER c.nom, total
TRIER par total, du plus grand au plus petit

À savoir :
- `co.statut <> 'ANNULEE'` : les lignes où co.statut est vide (NULL) sont écartées aussi. NULL n'est ni égal ni
  différent d'une valeur.
```

La jointure relie la clé du client (`c.id`) : chaque commande a au plus un client, aucune ligne n'est répétée. Il n'y
a donc pas de phrase de répétition sous RELIER (voir « Les jointures » plus bas).

## La page

- `#/traduire`, ouverte à tous, sans compte. Lien « Traduire » dans le menu, après « Dico ». Lien aussi depuis la page
  du dico. Un compte connecté suit le droit outil `traduire` (`docs/outils.md`, « Les droits des outils »).
- Une phrase d'explication : « Colle une requête SQL. Le site l'explique en pseudo-code, dans l'ordre où SQL la
  calcule. Rien n'est envoyé : tout reste dans ton navigateur. »
- Une zone de texte (police code), un bouton « Traduire », un bouton « Copier » (le pseudo-code en texte simple, pour
  une spécification, suivi des notes « À savoir »), et 3 exemples à cliquer (regroupement ; clients sans commande avec
  `LEFT JOIN` ; dernière commande par client avec une CTE et `ROW_NUMBER`), sur la base d'exemple
  (`docs/base-exemple.sql`).
- La requête n'est **enregistrée nulle part** (ni localStorage, ni URL) : elle reste dans une variable tant que
  l'onglet est ouvert, pour la retrouver après un clic vers le dico.
- Le résultat, sous un titre « La traduction » :
  1. le pseudo-code : une action par ligne, le verbe en MAJUSCULES au début (mis en valeur), les sous-étapes en
     retrait, avec une barre verticale à gauche ; la suite d'une ligne trop longue pour l'écran a un retrait suspendu,
     plus petit (on ne la confond pas avec une sous-étape) ; une sous-requête dans un bloc décalé ;
  2. « À savoir » : les notes de sens (règles plus bas), seulement s'il y en a ;
  3. « Dans le dico » : des liens vers les fiches du dico des mots de la requête (fonctions et mots-clés reconnus par
     leur `nom` ou leurs `noms`, à leur place dans la requête : une colonne qui s'appelle `date` n'est pas un lien).
- Après un clic sur « Traduire » (ou un exemple), la page défile jusqu'au résultat s'il est sous l'écran (téléphone), et
  le focus va sur le titre « La traduction ».
- Un exemple remplace le texte de la zone. Si elle contenait la requête de l'élève, un lien « Revenir à ma requête »
  apparaît (sans boîte de dialogue) ; il disparaît quand l'élève traduit de nouveau sa propre requête. Cette requête
  reste seulement en mémoire, comme l'autre.
- « Copier » est grisé tant qu'il n'y a rien à copier : avant la 1re traduction, et quand le résultat n'est qu'un
  message d'erreur.
- Lisible sur téléphone (390 px) : pas de défilement horizontal de toute la page (pseudo-code, notes, liens) ; les
  lignes et les morceaux de code longs passent à la ligne. La zone de texte est en 16 px (sinon l'iPhone zoome).
- Les boutons « ghost » (bordure, fond transparent : Copier, Nouvelle recherche, Abandonner…) gardent un contraste d'au
  moins 4,5 dans les deux thèmes, que le thème sombre soit choisi sur le site ou venu du système.
- Texte vide, ou seulement des espaces et des commentaires : « Rien à traduire : colle une requête SQL. » (aucune
  ligne de pseudo-code). Un texte qui n'est pas du SQL (plusieurs morceaux illisibles, sans mot SQL au début) : un seul
  message, « Je n'arrive pas à lire la requête : ce texte ne ressemble pas à du SQL. Une requête commence par SELECT,
  WITH, INSERT, UPDATE, DELETE… ».

## Le moteur

`js/traducteur.js`, ES5, sans bibliothèque. Fonction pure `LEARNSQL.traduire(texteSql)` qui renvoie la traduction
(lignes avec leur niveau de retrait, notes, fiches du dico, erreurs, et le texte simple pour « Copier ») : testable avec
node, sans navigateur. Le moteur s'attache à `window` : avec node, écrire `global.window = global;` puis
`window.LEARNSQL = {};` avant `require('./js/traducteur.js')` (les fiches du dico, chargées avant, donnent les liens).
L'affichage est dans `js/app.js` (`pageTraduire`).

### Lisibilité (élève dyslexique et TDAH)
- Une idée par ligne. Une ligne de plus de 120 caractères environ est coupée en sous-lignes, à ses « ; » ou à ses
  morceaux (la fenêtre, le tri, le cadre ; « parmi les lignes de … », « (refaite pour chaque ligne de …) »).
- À partir de 3 conditions reliées par ET (ou OU), une condition par ligne ; 2 conditions aussi, si la ligne est longue.
- Une fenêtre commune à plusieurs calculs est écrite une seule fois, dans la ligne CALCULER.
- Pas de nom inventé (« calcul 1 ») : un calcul sans nom prend le nom de sa fonction (« numéro », « rang »).
- Le singulier avec 1 : « la première ligne », « au plus 1 ligne », « SAUTER la première ligne ».
- Quand le moteur reconnaît le dialecte (SQL Server : `GO`, `@@…`, `DECLARE @x`, `[crochets]`, `NOLOCK`, `PRINT`… ;
  Snowflake : `::`, `QUALIFY`, `IFF`, `FLATTEN`, `col:champ`, `$$`… ; MySQL : accents graves, `LIMIT m, n`, `#`…), une
  remarque de moteur ne donne que la règle de ce moteur (`CONCAT`, `CONCAT_WS`, `LENGTH`, les guillemets doubles,
  `DATEADD(m, …)`). Sinon, elle cite les moteurs.

### L'ordre des étapes (ordre logique de calcul)
1. `WITH` : chaque CTE devient une étape « PRÉPARER « nom » : … », avant la requête principale.
   Une CTE est récursive quand son corps cite son propre nom (en général après `UNION ALL`), avec ou sans le mot
   `RECURSIVE` : SQL Server n'accepte pas ce mot, MySQL l'exige (`WITH RECURSIVE`), Snowflake le rend facultatif.
   Elle s'écrit : DÉPART (la partie qui ne cite pas la CTE), puis « RÉPÉTER tant que de nouvelles lignes arrivent »
   (la partie qui la cite : le nom de la CTE y veut dire les lignes trouvées au tour d'avant).
2. `FROM` et jointures → PRENDRE, RELIER. Le type de jointure est dit en mots : seulement les lignes avec
   correspondance ; toutes les lignes de gauche, même sans correspondance (les colonnes de droite sont alors vides) ;
   toutes les combinaisons. `FROM a, b` (virgule) : toutes les combinaisons ; le lien est dans le WHERE.
   La répétition des lignes n'est dite que là où elle peut changer un résultat :
   - la table reliée porte la clé de la table déjà prise (`b.x = a.id`, une ligne vers plusieurs) : « chaque ligne de
     a sort une fois pour chaque ligne de b qui correspond » ;
   - recherche par la clé de la table reliée (`b.id = a.x`) : au plus une correspondance, pas de phrase ;
   - anti-jointure (`LEFT JOIN b … WHERE b.x IS NULL`, x dans le ON ou x = id) : pas de phrase ; sous le GARDER,
     « → il ne reste que les lignes de a qui n'ont aucune correspondance dans b » ;
   - lien incertain (clé sur plusieurs colonnes, noms Divalto) : « si une ligne de a a plusieurs correspondances dans
     b, elle sort une fois pour chacune », seulement s'il y a un REGROUPER ou un agrégat après ;
   - dans un `UPDATE … FROM` / `UPDATE … JOIN` qui n'est pas une recherche par la clé : « une ligne de a qui a
     plusieurs correspondances n'est modifiée qu'une fois, avec les valeurs d'une seule d'entre elles, prise au
     hasard » (jamais la phrase « sort une fois » dans un UPDATE ou un DELETE).
   `OPENJSON(x, '$.chemin') WITH (col TYPE '$.champ', …)` (SQL Server 2016+) : « les éléments du JSON x, au chemin … »,
   puis une ligne par élément, lue avec les colonnes (une sous-ligne par colonne : son type et son chemin).
   `CROSS APPLY` / `LATERAL` : pour chaque ligne, le bloc est calculé avec cette ligne ; une ligne pour laquelle le
   bloc ne renvoie rien disparaît. `OUTER APPLY` (et `LEFT JOIN LATERAL`) : elle reste, avec des colonnes vides.
   `LATERAL FLATTEN(input => x)` (Snowflake) : pour chaque ligne, une ligne par élément du tableau x (`value` =
   l'élément, `index` = sa position) ; sans `OUTER => TRUE`, les lignes dont le tableau est vide ou absent
   disparaissent ; avec `OUTER => TRUE`, elles restent (value vide).
3. `WHERE` → GARDER les lignes où …
   Un filtre sur un numéro de ligne (`rn = 1`, `rn <= 3`, `rn > 1`, quand rn vient d'un `ROW_NUMBER`, `RANK` ou
   `DENSE_RANK` de la CTE, de la sous-requête ou du SELECT) : une sous-ligne dit son sens, « → la 1re ligne de chaque
   groupe de co.client_id : celle qui a la plus grande co.date_cde ». Dans un DELETE (`rn > 1`) : « → il reste la 1re
   ligne de chaque groupe : celle qui a la plus grande date_recu ».
4. `GROUP BY` → REGROUPER, avec les calculs de chaque groupe. Un agrégat sans `GROUP BY` : toutes les lignes en un
   seul groupe (une seule ligne de résultat).
   - `GROUP BY ROLLUP (a, b)` (SQL Server, Snowflake) et `GROUP BY a, b WITH ROLLUP` (MySQL, SQL Server) : « REGROUPER
     par a et b, plus un sous-total par a (sans détailler b), plus un total général ; dans ces lignes, la colonne
     regroupée est vide (NULL) ». `CUBE (a, b)` : tous les sous-totaux (par a, par b, et le total). `GROUPING SETS` :
     les regroupements demandés, assemblés. MySQL 8.0 n'accepte ni `ROLLUP (…)`, ni `CUBE`, ni `GROUPING SETS`.
   - `GROUP BY 1, 2` (MySQL, Snowflake) : par la 1re, la 2e colonne affichée (dire laquelle), comme pour ORDER BY.
   - `GROUP BY ALL` (Snowflake) : par toutes les colonnes affichées qui ne sont pas des agrégats (les nommer).
5. `HAVING` → GARDER les groupes où …
6. Fonctions de fenêtre (`OVER`) → CALCULER sur chaque ligne, sans regrouper : … Après un REGROUPER : « sur chaque
   ligne regroupée (une par e.compte et e.periode) ». Si tous les calculs ont la même fenêtre (PARTITION BY et ORDER
   BY), elle est écrite une fois dans la ligne CALCULER (« …, dans chaque groupe de a, en triant par d : »), ou sur une
   sous-ligne « pour tous ces calculs : … » si la ligne serait trop longue.
7. `QUALIFY` (Snowflake) → GARDER les lignes où … (QUALIFY, après le calcul). Un calcul écrit seulement dans QUALIFY
   prend le nom de sa fonction (« numéro = le numéro de la ligne… », puis « GARDER les lignes où ce numéro est égal à
   1 »), avec la sous-ligne de sens (voir 3). Un alias du SELECT dans son PARTITION BY est expliqué (« dans chaque
   groupe de ean (c'est-à-dire le champ ean du JSON f.value, converti en texte) »).
8. `SELECT` → AFFICHER … ; `DISTINCT` → ENLEVER les lignes en double.
   Un alias du SELECT utilisé avant AFFICHER (dans WHERE, GROUP BY, HAVING ou QUALIFY) : dire ce qu'il vaut
   (« total, c'est-à-dire la somme de montant_ht »), car il n'a pas encore été affiché.
9. `ORDER BY` → TRIER par …, du plus petit au plus grand / du plus grand au plus petit (numéro de colonne : dire
   laquelle). `NULLS FIRST` / `NULLS LAST`, quand ils sont écrits : les vides en premier / en dernier.
10. `TOP n`, `LIMIT n`, `FETCH FIRST/NEXT n ROWS ONLY` → GARDER les n premières lignes ; `OFFSET m` → SAUTER les m
    premières lignes (avant de garder). Avec 1 : « GARDER la première ligne », « SAUTER la première ligne », « GARDER la
    ligne suivante », « SUPPRIMER au plus 1 ligne ».
    - `TOP (n) WITH TIES` (SQL Server, ORDER BY obligatoire) : GARDER les n premières lignes, plus celles ex aequo avec
      la n-ième (même valeur de tri) : il peut en sortir plus de n.
    - `TOP (n) PERCENT` : GARDER n % des lignes (arrondi au nombre entier supérieur).
    - MySQL `LIMIT m, n` : SAUTER m lignes, puis GARDER n lignes (le 1er nombre = les lignes sautées) ;
      `LIMIT n OFFSET m` dit la même chose.
    - Snowflake : `TOP n` = `LIMIT n`, pas de WITH TIES. MySQL : ni TOP, ni FETCH.
- `SELECT … INTO nouvelle_table` (SQL Server ; `#table` = table temporaire) → CRÉER une nouvelle table avec le résultat
  (erreur si elle existe déjà), après le calcul. `SELECT … INTO @var` (MySQL) ou `INTO :var` (Snowflake Scripting) →
  RANGER le résultat dans la variable (pas de table créée). MySQL `INTO OUTFILE '…'` → écrire dans un fichier.
- `UNION` / `UNION ALL` / `INTERSECT` / `EXCEPT` / `MINUS` : un bloc par requête, puis l'opération en mots (avec ou
  sans doublons), puis le tri et la limite de l'ensemble. `INTERSECT` passe avant `UNION`, `UNION ALL`, `EXCEPT` /
  `MINUS` (eux sont lus de gauche à droite) : montrer le vrai regroupement, comme pour ET / OU. `INTERSECT`, `EXCEPT`
  et `MINUS` enlèvent aussi les doublons. Dans ces opérations (et dans `UNION`), deux NULL comptent comme égaux.
  Les colonnes du résultat ont les noms de la 1re requête : dans la 2e (et dans la partie RÉPÉTER d'une CTE récursive),
  si un nom change, « AFFICHER client, nom (les noms viennent de la requête 1) » puis « client = client_id »…

### Les expressions en mots
- `=` égal à ; `<>` et `!=` différent de ; `>` plus grand que ; `<` plus petit que ; `>=` au moins ; `<=` au plus.
- `AND` et, `OR` ou, `NOT` pas. Le regroupement réel est montré (ET passe avant OU).
- `IN (a, b)` vaut a ou b ; `NOT IN (a, b)` ne vaut ni a, ni b ; `IN (sous-requête)` fait partie du résultat de : … ;
  `EXISTS` il existe au moins une ligne dans : … ; `BETWEEN a AND b` entre a et b (bornes comprises) ;
  `NOT BETWEEN a AND b` : plus petit que a ou plus grand que b (a et b exclus).
- `NOT (x = v)` : x n'est pas égal à v (forme négative, pas « pas (…) ») ; `NOT (x LIKE …)`, `NOT (x IN …)`,
  `NOT (x BETWEEN …)` : comme `NOT LIKE`, `NOT IN`, `NOT BETWEEN`.
- Une sous-requête qui utilise une colonne de la requête du dessus (corrélée) : le dire (« refaite pour chaque ligne :
  elle utilise co.id »).
- Une sous-requête faite d'un seul agrégat sur une seule table (WHERE permis, sans GROUP BY) tient en une ligne :
  « le nombre de lignes de dbo.commande où statut est égal à 'EN_COURS' », « la moyenne de prix_tarif sur toute la
  table article (une seule valeur, la même sur chaque ligne) », « la plus grande valeur de co.date_cde parmi les
  lignes de dbo.commande (appelée co) où co.client_id est égal à c.id (refaite pour chaque ligne de c) ».
- `SET @x = (SELECT …)` / `DECLARE @x … = (SELECT …)` : la précision « NULL si elle ne renvoie aucune ligne ; erreur si
  elle en renvoie plusieurs » n'est écrite que si c'est possible (un agrégat sans GROUP BY renvoie toujours une ligne ;
  `TOP 1` : seulement « NULL si elle ne renvoie aucune ligne »).
- `LIKE 'X%'` commence par X ; `'%X'` finit par X ; `'%X%'` contient X — seulement si X ne contient aucun joker (ni
  `_`, ni `%`, ni, sur SQL Server, `[`). Sinon : « ressemble au modèle '…' (% = n'importe quel texte, même vide ;
  _ = un seul caractère quelconque) ». Ex. `LIKE 'EN_%'` : « ressemble au modèle 'EN_%' : EN, un caractère
  quelconque, puis n'importe quel texte ».
  - SQL Server seulement : `[A-C]` = un seul caractère entre A et C ; `[^0-9]` = un seul caractère qui n'est pas un
    chiffre ; `[_]` ou `[%]` = le caractère lui-même. Sur MySQL et Snowflake, `[` est un caractère normal (le moteur
    reconnu décide ; s'il n'est pas reconnu, la remarque cite les deux cas).
  - `ESCAPE '!'` : le caractère qui suit ! est pris tel quel (`'%!%%' ESCAPE '!'` : contient '%'). MySQL : `\_` et
    `\%` = le caractère lui-même.
  - `ILIKE` (Snowflake) : sans tenir compte des majuscules.
- `IS NULL` est vide (NULL) ; `IS NOT NULL` a une valeur (pas NULL) : un texte vide '' n'est pas NULL (les champs
  vides de Divalto sont souvent '' ou des espaces).
- `TRY_CAST(x AS T) IS NULL` (et `TRY_CONVERT`, `TRY_TO_NUMBER`…) : « x ne peut pas être converti en T, ou est vide
  (NULL) » ; `IS NOT NULL` : « x peut être converti en T ».
- `a IS DISTINCT FROM 'v'` (SQL Server 2022+, Snowflake) : « a est différent de 'v' (vide compte comme une valeur : une
  ligne où a est vide sort) » ; `IS NOT DISTINCT FROM` et `a <=> b` (MySQL) : égal, en comptant deux NULL comme
  égaux.
- `DATEPART(WEEK, d)` (SQL Server) : « le numéro de semaine de d ; la semaine du 1er janvier est la semaine 1 ; le 1er
  jour de la semaine dépend du réglage DATEFIRST ; ce n'est pas la semaine ISO utilisée en France (pour elle :
  DATEPART(ISO_WEEK, …)) ».
- `CASE` : selon le cas, si … alors … sinon … ; les cas sont testés dans l'ordre, le premier vrai gagne. Sans `ELSE` :
  écrire toujours « sinon : vide (NULL) ». `CASE x WHEN v THEN …` = « selon x : si x est égal à v alors … » (donc
  `WHEN NULL` n'est jamais vrai : note 1).
- `IIF` / `IFF` / `IF()` : x si la condition est vraie, sinon y — y aussi quand la condition est inconnue (NULL).
- Fonctions courantes (agrégats, texte, dates, conversion, nombres, fenêtres) : une phrase modèle chacune
  (`COUNT(*)` le nombre de lignes ; `COUNT(x)` le nombre de x non vides ; `COUNT(DISTINCT x)` le nombre de valeurs
  différentes de x (sans compter les vides) ; `COALESCE(a, b)` a, ou b si a est vide ; `ROW_NUMBER() OVER (PARTITION
  BY a ORDER BY b DESC)` le numéro de la ligne dans chaque groupe de a, en triant par b du plus grand au plus petit ;
  …). Fonction inconnue : écrite telle quelle (et lien vers le dico si une fiche existe). Jamais une traduction
  inventée.
- `CONCAT(a, b)` : a et b collés. SQL Server : un NULL compte comme '' (vide). MySQL et Snowflake : si une valeur est
  NULL, le résultat est NULL. `a || b` : NULL si une valeur est NULL. `'texte' + x` (SQL Server, dans `PRINT` par
  exemple) : « 'texte' suivi de x » (`CAST(x AS VARCHAR(10))` : « x (converti en texte, VARCHAR(10)) »).
  `CONCAT_WS(sep, a, b)` : collés avec sep entre eux ; SQL Server et MySQL sautent les NULL, Snowflake renvoie NULL.
  Quand le moteur est reconnu, seule sa règle est écrite.
- Fonctions de fenêtre :
  - un agrégat en fenêtre avec ORDER BY et sans cadre écrit (`SUM(x) OVER (PARTITION BY a ORDER BY d)`) : « le cumul
    de x depuis le début du groupe jusqu'à la ligne courante ; les lignes qui ont la même valeur de d sont comptées
    ensemble (même résultat) ». C'est le cadre par défaut RANGE … CURRENT ROW, sur les 3 moteurs ;
  - `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` : « le cumul ligne par ligne » ;
    `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` : « sur la ligne courante et les 2 lignes d'avant » ;
  - sans ORDER BY dans OVER : « sur tout le groupe » (tout le résultat s'il n'y a pas de PARTITION BY) ;
  - `ROW_NUMBER()` : « le numéro de la ligne (1, 2, 3…) » ; le risque des ex aequo est une note (13), pas une phrase
    dans la ligne. `RANK()` : « le rang : les ex aequo ont le même rang, puis un trou (1, 2, 2, 4) ». `DENSE_RANK()` :
    « le rang sans trou (1, 2, 2, 3) ». `LAG(x)` / `LEAD(x)` : la valeur de x sur la ligne d'avant / d'après dans le
    groupe (vide s'il n'y en a pas).
  - `LAST_VALUE(x)` et `NTH_VALUE(x, n)` avec ORDER BY et sans cadre écrit : la ligne ne dit jamais « dans chaque
    groupe ». Elle dit « x de la dernière (de la n-ième) ligne de la fenêtre », puis deux sous-lignes : « fenêtre : dans
    chaque groupe de a, en triant par d … » et « sans cadre écrit : du début du groupe jusqu'à la ligne courante (SQL
    Server, MySQL) ; tout le groupe (Snowflake) » (pour NTH_VALUE : MySQL seulement, SQL Server ne l'a pas).
  - Une définition longue est écrite une idée par ligne : « rn = le numéro de la ligne (1, 2, 3…) », puis « dans chaque
    groupe de co.client_id », puis « en triant par co.date_cde du plus grand au plus petit ».
- Les noms de tables, de colonnes et les valeurs restent écrits comme dans la requête ; un alias est expliqué une fois
  (« la table commande, appelée co »).
- Les 3 écritures sont acceptées : `[crochets]`, `` `accents graves` ``, `"guillemets"` ; `dbo.table`, `base.schema.table` ;
  `TOP` et `LIMIT` ; `x::INT` ; `@variable`, `?`, `:param`, `$1` ; commentaires `--` et `/* */` (ignorés), `#`
  jusqu'à la fin de la ligne (MySQL) et `//` jusqu'à la fin de la ligne (accepté par Snowflake d'après plusieurs
  outils). MySQL : `--` n'est un commentaire que s'il est suivi d'un espace (`5--3` vaut 8). MySQL `/*! … */` (dans
  les exports mysqldump) est du code exécuté : ne pas l'ignorer en silence (« Je ne sais pas encore traduire : /*! … */ »).
  - Sur MySQL (sans le réglage ANSI_QUOTES), `"LIVREE"` est un texte (comme 'LIVREE'), pas un nom ; sur SQL Server
    (QUOTED_IDENTIFIER ON, par défaut) et Snowflake, c'est un nom. Si la requête a des marques MySQL (accents graves,
    `LIMIT m, n`, `IFNULL`, `DATE_FORMAT`, `GROUP_CONCAT`, `#`…) : traiter "…" comme un texte. Sinon : l'écrire tel
    quel, sans dire « la colonne … », et rappeler les deux sens.
  - Snowflake : `col:champ` (deux-points collé à un nom, sans espace) = le champ « champ » dans le document JSON /
    VARIANT de la colonne col (`raw:header.order_number`, `l.value:ean`) ; `::TYPE` = conversion. Un `:nom` qui suit
    un opérateur, une virgule ou une parenthèse (`= :id`) est un paramètre.
  - Snowflake : `$1`, `t.$2` dans `SELECT … FROM @stage` = la 1re, la 2e colonne du fichier ; `FROM @nom` = les
    fichiers d'un stage. Sur SQL Server, `FROM @t` = une variable table.

### Les autres instructions
- `INSERT … VALUES` / `INSERT … SELECT` → AJOUTER ; `UPDATE` (avec `FROM` / `JOIN`) → MODIFIER … METTRE … ; `DELETE`
  → SUPPRIMER ; `TRUNCATE` → VIDER. `DELETE` / `UPDATE` sur une CTE (SQL Server) : les lignes supprimées ou modifiées
  sont celles de la table sous la CTE (dédoublonnage avec ROW_NUMBER).
- `MERGE` → FUSIONNER la source (USING) dans la cible (INTO), en reliant par la condition ON. Puis un cas par clause
  WHEN, testées dans l'ordre (la première qui convient s'applique ; un `AND …` ajoute une condition) :
  - `WHEN MATCHED` : si la ligne de la source a une correspondance dans la cible → METTRE … ou SUPPRIMER la ligne de la
    cible ;
  - `WHEN NOT MATCHED [BY TARGET]` : si la ligne de la source n'a pas de correspondance dans la cible → AJOUTER … ;
  - `WHEN NOT MATCHED BY SOURCE` (SQL Server seulement : Snowflake ne l'a pas, d'après sa documentation de
    migration) : si une ligne de la CIBLE n'a pas de correspondance dans la source → METTRE … ou SUPPRIMER. Avec
    DELETE : si la source est partielle (un fichier, un client…), les autres lignes de la cible sont supprimées ;
  - sans `WHEN NOT MATCHED BY SOURCE`, les lignes de la cible absentes de la source ne changent pas ;
  - si plusieurs lignes de la source correspondent à la même ligne de la cible et qu'une clause WHEN MATCHED doit la
    modifier ou la supprimer : erreur (réglages par défaut) ;
  - une clause trop longue pour une ligne : « si … : » puis l'action (METTRE, AJOUTER, SUPPRIMER) sur une sous-ligne ;
    « en reliant quand … » passe aussi sur une sous-ligne si la ligne FUSIONNER est trop longue.
- MySQL :
  - `INSERT … ON DUPLICATE KEY UPDATE c = …` : AJOUTER ; si une ligne avec la même clé primaire ou la même valeur d'un
    index UNIQUE existe déjà : la MODIFIER à la place (c = …). Dans ce `c = …`, une colonne seule (`qte`, ou
    `table.qte`) = « la valeur actuelle de qte » ; `VALUES(c)` ou `alias.c` (`… VALUES (…) AS nouv`) = « la valeur
    qu'on voulait ajouter » ;
  - `REPLACE INTO` : AJOUTER ; si une ligne avec la même clé (primaire ou UNIQUE) existe, elle est d'abord SUPPRIMÉE,
    puis la nouvelle est ajoutée : les colonnes non citées prennent leur valeur par défaut (ce n'est pas une
    modification) ;
  - `INSERT IGNORE` : AJOUTER, en sautant sans erreur les lignes qui feraient un doublon de clé ; les valeurs
    invalides sont ajustées (texte trop long coupé) avec un simple avertissement.
- `CREATE TABLE … AS SELECT`, `CREATE VIEW … AS` → CRÉER ; `CREATE TABLE` simple : ses colonnes et leurs règles.
  `CREATE OR REPLACE TABLE … AS SELECT` (Snowflake) : « CRÉER la table … avec le résultat de la requête ci-dessous »,
  puis la sous-ligne « si elle existe déjà, elle est REMPLACÉE : l'ancienne table et toutes ses lignes disparaissent »
  (et ses droits, sauf COPY GRANTS ; cette ligne appartient au CRÉER, pas à la requête), puis « la requête : » et son
  bloc.
  Colonnes : `IDENTITY(1,1)` / `AUTO_INCREMENT` = « numéro automatique (commence à 1, +1 à chaque ligne) » ; une clé
  étrangère qui accepte NULL : « s'il est rempli, il doit exister dans … (clé étrangère) ; vide (NULL) permis » ;
  `ON DELETE CASCADE` : « si la ligne visée est supprimée, cette ligne l'est aussi (CASCADE) ».
  `CREATE OR ALTER PROCEDURE / VIEW / FUNCTION` (SQL Server 2016 SP1+) : CRÉER, ou modifier si elle existe.
- T-SQL courant : `DECLARE`, `SET`, `SELECT @x = …`, `IF … ELSE`, `WHILE`, `BEGIN … END`, transactions (`BEGIN TRAN`,
  `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVE TRAN`), `TRY … CATCH`, `THROW` / `RAISERROR`, `EXEC` (et SQL
  dynamique), `PRINT`, `RETURN`, `CREATE PROCEDURE` / `FUNCTION`, `SET NOCOUNT ON`, `SET XACT_ABORT ON`, curseurs
  (`DECLARE … CURSOR`, `OPEN`, `FETCH`, `CLOSE`, `DEALLOCATE`), `USE`.
  - `SELECT @x = col FROM …` : RANGER dans @x la valeur de col ; si plusieurs lignes, @x garde celle de la dernière
    ligne lue (sans ORDER BY : n'importe laquelle) ; si aucune ligne, @x n'est pas modifiée (elle garde son ancienne
    valeur). `SET @x = (SELECT …)` : NULL si aucune ligne, erreur si plusieurs lignes (voir les expressions).
  - `EXEC` d'une procédure créée plus haut dans le même texte : dire quels paramètres ne sont pas donnés (« @depuis
    n'est pas donné : il vaut '2026-01-01' (sa valeur par défaut) » ; sans valeur par défaut : erreur).
  - `WITH (NOLOCK)` : expliqué une fois par instruction (« lue avec NOLOCK », puis la sous-ligne « NOLOCK : la table est
    lue sans attendre les verrous ; elle peut lire des changements pas encore validés ») ; les tables suivantes :
    « lue elle aussi avec NOLOCK ».
  - `RAISERROR(…, gravité, …)` : gravité 10 ou moins = simple message (pas d'erreur, pas de saut vers CATCH) ; 11 à 19
    = une erreur (saut vers CATCH). `THROW` = toujours une erreur.
- Plusieurs instructions (séparées par `;`, ou écrites l'une après l'autre sans `;` en T-SQL) : INSTRUCTION 1,
  INSTRUCTION 2… `GO`, seul sur sa ligne (SQL Server), n'est pas une instruction : il coupe le script en LOTS (LOT 1,
  LOT 2…). Une variable n'existe que dans son lot. `GO 5` = exécuter le lot 5 fois.
- Le corps de `CREATE PROCEDURE`, `FUNCTION`, `VIEW` ou `TRIGGER` va jusqu'au GO suivant (ou jusqu'à la fin du texte) :
  sans GO, les instructions qui suivent font partie de la procédure (piège : un EXEC placé juste après est dans la
  procédure, qui s'appelle alors elle-même).
- Ce que le moteur ne sait pas lire : une ligne honnête « Je ne sais pas encore traduire : … » (le début du texte), et
  la suite continue. Une construction inconnue à l'intérieur d'une instruction ne la coupe jamais en deux. Une requête
  incomplète ou fausse : « Je n'arrive pas à lire la requête à partir de : … ». Un « ; » rencontré dans une parenthèse
  ouverte compte comme la fin de l'instruction : le message montre la parenthèse (« (ville = 'Lyon' (une parenthèse
  ouverte n'est jamais fermée) ») et ne cite jamais l'instruction suivante. Jamais d'erreur JavaScript, jamais de page
  blanche.

### « À savoir » : les notes de sens
Une note dit ce que la requête **fait vraiment**, quand ce n'est pas ce qu'on croit. Pas de conseil de style ni de
performance. Une ou deux phrases, mots simples, une seule fois par requête :
1. `= NULL`, `<> NULL`, `!= NULL` dans une condition (WHERE, ON, HAVING, CASE WHEN), `CASE x WHEN NULL` et
   `NOT IN (…, NULL)` : cette comparaison n'est jamais vraie (NULL n'est égal à rien, même pas à NULL). Écrire
   `IS NULL` / `IS NOT NULL` (ou `CASE WHEN x IS NULL`). Le texte dépend de sa place :
   - seule ou dans la chaîne de ET du WHERE : « Ici, le WHERE ne laisse sortir aucune ligne » (HAVING : aucun groupe ;
     UPDATE / DELETE : aucune ligne n'est modifiée / supprimée ; ON : la jointure ne trouve aucune correspondance) ;
   - dans une branche d'un OU : « cette partie du OU ne garde aucune ligne ; seules sortent les lignes où <l'autre
     branche> » (si la comparaison est dans un groupe ET : « la partie (… et …) ne garde aucune ligne : seules
     sortent… ») ;
   - dans un CASE : « cette branche du CASE n'est jamais choisie ».
   Pas de note pour une affectation (`SET col = NULL`, `@v = NULL`), ni pour `IS [NOT] DISTINCT FROM` (SQL Server
   2022+, Snowflake) et `<=>` (MySQL), qui comparent NULL comme une valeur. Avec `NOT IN (…, NULL)`, la note 1 suffit
   (pas de note 7 en plus).
2. `NOT IN (sous-requête)` : si la sous-requête renvoie un NULL, aucune ligne ne sort ; préférer `NOT EXISTS`. Pas de
   note quand la sous-requête enlève déjà les NULL de sa colonne (`WHERE x IS NOT NULL`).
3. `LEFT JOIN b` puis, dans le `WHERE`, une condition sur une colonne de b qui ne peut pas être vraie quand b est vide
   (=, <>, <, >, LIKE, IN, BETWEEN, IS NOT NULL…) : les lignes sans correspondance disparaissent, la jointure agit
   comme un `JOIN` simple. Pour les garder, mettre la condition dans le `ON`. Avec `b.x IS NOT NULL` : « il ne reste que
   les lignes qui ont une correspondance. C'est un JOIN simple écrit autrement : écris JOIN. » Pas de note pour `b.x IS NULL`
   (recherche de ce qui manque), ni quand la condition reste vraie pour une case vide (`b.x IS NULL OR …`,
   `COALESCE(b.x, …)`, `ISNULL(b.x, …)`). (Même chose pour `RIGHT JOIN` et la table de gauche.)
4. `UPDATE` ou `DELETE` sans `WHERE`, sans jointure et sans `TOP` / `LIMIT` : toutes les lignes de la table sont
   modifiées (ou supprimées). (Avec `TOP (n)` ou `LIMIT n` : voir la note 5.)
5. `TOP`, `LIMIT` ou `FETCH` sans `ORDER BY` : les lignes gardées peuvent changer d'une fois à l'autre. Même chose pour
   `UPDATE`, `DELETE`, `MERGE` ou `INSERT` avec `TOP (n)` (SQL Server : jamais d'ordre possible) et pour MySQL
   `UPDATE` / `DELETE … LIMIT n` sans ORDER BY : les lignes modifiées ou supprimées sont prises sans ordre garanti.
   Pas de note dans un `EXISTS` (le choix des lignes n'y change rien).
6. `AND` et `OR` mélangés sans parenthèses : ET passe avant OU (le pseudo-code montre le vrai regroupement).
7. `<>`, `!=`, `NOT LIKE`, `NOT IN (liste)`, `NOT BETWEEN`, `NOT (x = …)` sur une colonne x :
   - dans `WHERE`, `HAVING` ou `QUALIFY` : les lignes où x est vide (NULL) sont écartées aussi ;
   - dans `WHEN MATCHED AND` (MERGE) : si x est vide (NULL), le test n'est pas vrai et la ligne n'est pas mise à jour
     (ni supprimée) : « un prix vide dans la cible n'est jamais rempli ; pour le remplir, ajoute `OR cible.prix IS
     NULL` » ;
   - pas de note dans le `ON` d'une jointure.
8. `||` : colle des textes sur Snowflake et sur SQL Server 2025+ (erreur sur les versions d'avant) ; sur MySQL, c'est
   un OU logique (sauf réglage `PIPES_AS_CONCAT`) : utiliser `CONCAT`.
9. `LAST_VALUE … OVER (… ORDER BY …)` sans cadre écrit : sur SQL Server et MySQL, la fenêtre s'arrête à la dernière
   ligne qui a la même valeur de tri que la ligne courante (souvent la ligne elle-même) ; Snowflake prend toute la
   fenêtre. `NTH_VALUE(x, 2) … ORDER BY …` sans cadre écrit (SQL Server ne l'a pas) : sur MySQL, la fenêtre s'arrête à
   la ligne courante : sur la 1re ligne de chaque groupe, le résultat est vide (NULL) ; Snowflake prend toute la
   fenêtre. Pour regarder tout le groupe : `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.
10. `BETWEEN … AND '2026-03-31'` (une borne haute qui est une date sans heure) : si la colonne contient aussi l'heure,
    '2026-03-31' veut dire le 31 à 0 h 00 : la journée du 31 est presque exclue.
11. Un agrégat (`SUM`, `AVG`, `COUNT(colonne)`) sur une table A, après une jointure vers une table B qui porte la clé de
    A (`B.x = A.id`, une ligne vers plusieurs), sans regrouper par B : au conditionnel, en nommant les tables. « `SUM(co.montant_ht)`
    après la jointure avec ligne_cde : si une ligne de la table commande (co) correspond à plusieurs lignes de la
    table ligne_cde (l), son montant_ht est compté plusieurs fois (total gonflé). Fais la somme avant la jointure, ou
    additionne une colonne de l. »
12. `COUNT(*)` avec `GROUP BY` sur le côté gardé d'un `LEFT JOIN` (ou `RIGHT JOIN`) : « une ligne de client (c) sans
    ligne dans commande (co) garde une ligne (avec les colonnes de co vides), donc elle compte 1, pas 0. Pour ne
    compter que les lignes de co, écris `COUNT(co.client_id)` ». Dans le même cas, `SUM` / `AVG` / `MIN` / `MAX` d'une
    colonne du côté facultatif : « (vide, pas 0, pour une ligne de c sans correspondance) » dans la ligne du calcul.
13. `ROW_NUMBER() … ORDER BY …` dont le tri ne finit pas par une colonne unique (`id`) : une fois par requête,
    « si deux lignes d'un même groupe (co.client_id) ont la même co.date_cde, celle qui reçoit le n° 1 n'est pas
    garantie (le résultat peut changer d'une fois à l'autre). Ajoute une colonne unique au tri, par exemple co.id. »
    Sans ORDER BY : les numéros sont donnés dans un ordre non garanti.

## Les tests
- `node outils/tests/traducteur-cas.js` : des cas (requête → morceaux de texte attendus, et interdits), sans navigateur ;
  affiche « N échec(s) sur M ».
- `node outils/tests/traducteur-corpus.js` : le corpus de l'expert SQL (87 vraies requêtes) ; pour chacune : pas
  d'erreur, les notes « À savoir » attendues exactement, et pas de « Je ne sais pas encore traduire » sur ce que la
  spécification couvre ; les cas faux exprès donnent le bon message. Puis les 8 cas trompeurs ou faux du jugement de
  l'expert (OPENJSON … WITH, COUNT(*) après LEFT JOIN, UPDATE … FROM, = NULL dans un OU, DATEPART(WEEK), NTH_VALUE,
  NOT BETWEEN, erreur avant un « ; ») : leurs notes et leurs textes attendus.
- `outils/tests/traduire.js` (Playwright, dans `outils/tests/lancer.sh`) : la page, un exemple, le bouton Traduire
  (défilement et focus sur le résultat), le bouton Copier (grisé pour une erreur), « Revenir à ma requête », un lien
  vers le dico, l'écran de téléphone (toute la page, notes comprises ; zone de texte en 16 px), le contraste des
  boutons « ghost » dans les deux thèmes, aucune erreur JavaScript.
