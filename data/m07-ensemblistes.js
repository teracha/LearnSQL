// Module volontairement limité à 60 questions : le thème est plus étroit,
// au-delà les questions deviendraient répétitives.
LEARNSQL.questions.m07 = [
  {
    id: "m07-q01", dialecte: "Standard",
    q: "A contient 3 lignes, B contient 3 lignes, dont une identique à une ligne de A. Combien de lignes donne A UNION ALL B ?",
    choix: [
      "5",
      "6",
      "3",
      "1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION ALL ne supprime rien.",
      "Oui. UNION ALL empile tout, doublons compris.",
      "Non. Ce serait le nombre de lignes de A seul.",
      "Non. 1, c'est seulement la ligne commune."
    ],
    retenir: "UNION ALL = tout empiler, sans dédoublonner."
  },
  {
    id: "m07-q02", dialecte: "Standard",
    q: "A contient 3 lignes, B contient 3 lignes, dont une identique à une ligne de A. Combien de lignes donne A UNION B ?",
    choix: [
      "6",
      "5",
      "4",
      "3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION supprime les doublons.",
      "Oui. La ligne commune n'apparaît qu'une fois.",
      "Non. Une seule ligne est en double : 6 - 1 = 5.",
      "Non. Ce serait le nombre de lignes de A seul."
    ],
    retenir: "UNION = UNION ALL + suppression des doublons."
  },
  {
    id: "m07-q03", dialecte: "Standard",
    q: "A contient déjà deux lignes identiques. B est vide. Combien de lignes donne A UNION B ?",
    choix: [
      "2",
      "1",
      "0",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION dédoublonne tout le résultat, pas seulement entre A et B.",
      "Oui. Les doublons internes à A sont aussi supprimés.",
      "Non. A n'est pas vide : il reste une ligne.",
      "Non. Une union avec une table vide est valide."
    ],
    retenir: "UNION supprime TOUS les doublons, même ceux d'une seule partie."
  },
  {
    id: "m07-q04", dialecte: "Standard",
    q: "A = {1, 2, 2, 3} et B = {3, 4}. Que donne A UNION B ?",
    choix: [
      "1, 2, 2, 3, 3, 4",
      "1, 2, 3, 4",
      "3",
      "1, 2"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est UNION ALL.",
      "Oui. Toutes les valeurs, une seule fois chacune.",
      "Non. C'est INTERSECT.",
      "Non. C'est A EXCEPT B."
    ],
    retenir: "UNION = tout, sans doublon."
  },
  {
    id: "m07-q05", dialecte: "Standard",
    q: "A = {1, 2, 2, 3} et B = {3, 4}. Que donne A INTERSECT B ?",
    choix: [
      "3",
      "3, 3",
      "1, 2, 4",
      "Rien"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Seule la valeur 3 est présente des deux côtés.",
      "Non. INTERSECT renvoie un résultat sans doublon.",
      "Non. Ce sont les valeurs NON communes.",
      "Non. La valeur 3 est des deux côtés."
    ],
    retenir: "INTERSECT = présent des deux côtés, sans doublon."
  },
  {
    id: "m07-q06", dialecte: "Standard",
    q: "A = {1, 2, 2, 3} et B = {3, 4}. Que donne A EXCEPT B ?",
    choix: [
      "1, 2, 2",
      "1, 2",
      "4",
      "1, 2, 4"
    ],
    bonne: 1,
    pourquoi: [
      "Non. EXCEPT supprime aussi les doublons du résultat.",
      "Oui. Ce qui est dans A et pas dans B, sans doublon.",
      "Non. C'est B EXCEPT A.",
      "Non. 4 n'est pas dans A : EXCEPT ne le renvoie pas."
    ],
    retenir: "EXCEPT = dans le 1er, pas dans le 2e, sans doublon."
  },
  {
    id: "m07-q07", dialecte: "Standard",
    q: "A = {1, 2, 2, 3} et B = {3, 4}. Que donne B EXCEPT A ?",
    choix: [
      "1, 2",
      "4",
      "3",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est A EXCEPT B.",
      "Oui. L'ordre compte : B EXCEPT A ≠ A EXCEPT B.",
      "Non. 3 est aussi dans A : il est retiré.",
      "Non. 4 n'est pas dans A : il reste."
    ],
    retenir: "EXCEPT n'est pas symétrique."
  },
  {
    id: "m07-q08", dialecte: "Standard",
    q: "Tu empiles les ventes de la société 1 et celles de la société 2 (aucune ligne commune possible). UNION ou UNION ALL ?",
    choix: [
      "UNION",
      "UNION ALL",
      "Peu importe",
      "INTERSECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION chercherait des doublons inexistants : travail inutile. Pire : deux ventes identiques mais réelles seraient fusionnées.",
      "Oui. Plus rapide, et aucune ligne réelle n'est perdue.",
      "Non. Le résultat et le coût peuvent différer.",
      "Non. INTERSECT garde ce qui est commun : ici, rien."
    ],
    retenir: "Par défaut : UNION ALL."
  },
  {
    id: "m07-q09", dialecte: "Standard",
    q: "Deux ventes réelles, identiques (même client, même article, même jour, même montant), sont dans A. Que fait A UNION B ?",
    choix: [
      "Les garde toutes les deux",
      "N'en garde qu'une : le CA est faux",
      "Erreur",
      "Les supprime"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION les voit comme des doublons.",
      "Oui. Danger de UNION sur des données de détail : des lignes réelles disparaissent.",
      "Non. Des lignes identiques ne causent pas d'erreur.",
      "Non. Une ligne reste."
    ],
    retenir: "UNION sur des faits = risque de perdre des lignes réelles."
  },
  {
    id: "m07-q10", dialecte: "Standard",
    q: "Pourquoi UNION est-il plus coûteux que UNION ALL ?",
    choix: [
      "Il lit chaque table deux fois de suite",
      "Il doit chercher les doublons (tri ou hachage)",
      "Il crée des index temporaires sur chaque table",
      "Il n'est pas plus coûteux, c'est un mythe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque table est lue une fois ; le coût vient du dédoublonnage.",
      "Oui. Il doit comparer toutes les lignes pour trouver les doublons. Sur de gros volumes, ce travail en plus est important.",
      "Non. Il compare les lignes, il ne crée pas d'index.",
      "Non. Le dédoublonnage coûte vraiment."
    ],
    retenir: "UNION = UNION ALL + un tri ou un hachage."
  },
  {
    id: "m07-q11", dialecte: "Standard",
    q: "Que donne SELECT code, libelle FROM a UNION ALL SELECT code FROM b; ?",
    choix: [
      "Ça marche, libelle vaut NULL pour b",
      "Erreur : nombre de colonnes différent",
      "Seule la colonne code est gardée",
      "0 ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur ne complète pas.",
      "Oui. Toutes les parties doivent avoir le même nombre de colonnes. Ajoute NULL AS libelle dans la 2e.",
      "Non. Le moteur refuse : rien n'est renvoyé.",
      "Non. La requête ne s'exécute pas : c'est une erreur."
    ],
    retenir: "Même nombre de colonnes dans chaque partie."
  },
  {
    id: "m07-q12", dialecte: "SQL Server",
    q: "Que donne SELECT 1 UNION ALL SELECT 'A'; sur SQL Server ?",
    choix: [
      "Deux lignes, l'une avec 1 et l'autre avec 'A'",
      "Erreur de conversion de 'A'",
      "Une seule ligne : la valeur 1",
      "Deux lignes : 1 et NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une colonne n'a qu'un seul type.",
      "Oui. Le type le plus fort (INT) s'impose : 'A' ne peut pas devenir un entier. Convertis : CAST(1 AS varchar(10)).",
      "Non. Il y a une erreur.",
      "Non. Il y a une erreur."
    ],
    retenir: "Chaque colonne : types compatibles dans toutes les parties."
  },
  {
    id: "m07-q13", dialecte: "Standard",
    q: "Comment s'appellent les colonnes du résultat de SELECT code AS ref FROM a UNION ALL SELECT code AS article FROM b ?",
    choix: [
      "ref",
      "article",
      "code",
      "ref et article"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les noms viennent de la PREMIÈRE requête.",
      "Non. Les alias des parties suivantes sont ignorés.",
      "Non. L'alias ref remplace le nom code.",
      "Non. Une seule colonne."
    ],
    retenir: "Noms de colonnes = ceux de la 1re requête."
  },
  {
    id: "m07-q14", dialecte: "Standard",
    q: "Où se place le ORDER BY dans une requête avec UNION ALL ?",
    choix: [
      "Dans chaque partie, avant le UNION ALL",
      "Une seule fois, à la toute fin",
      "Dans la 1re partie seulement",
      "Nulle part : il est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un ORDER BY dans chaque partie est refusé.",
      "Oui. Il trie le résultat complet.",
      "Non. Un ORDER BY avant UNION ALL est refusé.",
      "Non. Il est permis, à la fin."
    ],
    retenir: "UNION : un seul ORDER BY, à la fin."
  },
  {
    id: "m07-q15", dialecte: "SQL Server",
    q: "Que donne cette requête sur SQL Server ?",
    code: "SELECT code FROM a ORDER BY code\nUNION ALL\nSELECT code FROM b;",
    choix: [
      "Le résultat trié",
      "Erreur de syntaxe près de UNION",
      "Seule la 1re partie est triée",
      "Seule la 2e partie apparaît"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Oui. ORDER BY ne peut pas être placé avant UNION.",
      "Non. La requête ne s'exécute pas.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "ORDER BY au milieu d'une UNION = erreur."
  },
  {
    id: "m07-q16", dialecte: "Standard",
    q: "SELECT code AS ref FROM a UNION ALL SELECT code FROM b ORDER BY ???. Quel nom utiliser dans le ORDER BY ?",
    choixCode: true,
    choix: [
      "ref",
      "b.code",
      "a.code",
      "article"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le tri utilise les noms du résultat, donc ceux de la 1re requête.",
      "Non. Les tables des parties ne sont plus visibles à ce niveau.",
      "Non. Les tables des parties ne sont plus visibles à ce niveau.",
      "Non. Les alias de la 2e partie sont ignorés."
    ],
    retenir: "ORDER BY final : noms (ou positions) de la 1re requête."
  },
  {
    id: "m07-q17", dialecte: "SQL Server",
    q: "Tu veux les 5 plus grosses commandes de 2025 ET les 5 plus grosses de 2026, dans un même résultat. Comment faire sur SQL Server ?",
    choixCode: true,
    choix: [
      "SELECT TOP (5) … ORDER BY montant DESC UNION ALL SELECT TOP (5) … ORDER BY montant DESC",
      "SELECT * FROM (SELECT TOP (5) … ORDER BY montant DESC) a UNION ALL SELECT * FROM (SELECT TOP (5) … ORDER BY montant DESC) b",
      "SELECT TOP (10) … UNION ALL …",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 1er ORDER BY est mal placé : erreur.",
      "Oui. Chaque TOP + ORDER BY est enfermé dans une table dérivée.",
      "Non. 10 au total, pas 5 par année.",
      "Non. C'est possible avec deux tables dérivées."
    ],
    retenir: "TOP + ORDER BY par partie : tables dérivées."
  },
  {
    id: "m07-q18", dialecte: "Standard",
    q: "Sans ORDER BY, A UNION ALL B renvoie-t-il toujours les lignes de A avant celles de B ?",
    choix: [
      "Oui, toujours dans cet ordre",
      "Non, pas garanti",
      "Oui, mais seulement sur SQL Server",
      "Non, B vient toujours en premier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Souvent vrai en pratique, jamais garanti.",
      "Oui. Ajoute une colonne (1 pour A, 2 pour B) et trie dessus : SELECT 1 AS ordre, … UNION ALL SELECT 2, … ORDER BY ordre.",
      "Non. SQL Server ne le garantit pas non plus.",
      "Non. Aucun ordre n'est garanti, dans un sens ou dans l'autre."
    ],
    retenir: "Ordre des parties : à forcer avec une colonne de tri."
  },
  {
    id: "m07-q19", dialecte: "SQL Server",
    q: "Comment créer une table #t avec le résultat d'un UNION ALL ?",
    choixCode: true,
    choix: [
      "SELECT … FROM a UNION ALL SELECT … FROM b INTO #t",
      "SELECT … INTO #t FROM a UNION ALL SELECT … FROM b",
      "INTO #t SELECT … UNION ALL …",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. INTO ne se met pas à la fin.",
      "Oui. INTO se met dans la PREMIÈRE requête ; tout le résultat de l'union y va.",
      "Non. INTO se place après la liste du SELECT.",
      "Non. SELECT … INTO fonctionne avec un UNION ALL."
    ],
    retenir: "SELECT … INTO + UNION : INTO dans la 1re partie."
  },
  {
    id: "m07-q20", dialecte: "Standard",
    q: "Tu empiles l'ERP et l'EDI. Comment savoir d'où vient chaque ligne ?",
    choixCode: true,
    choix: [
      "SELECT 'ERP' AS source, … FROM erp UNION ALL SELECT 'ERP', … FROM edi",
      "SELECT 'ERP' AS source, … FROM erp UNION ALL SELECT 'EDI', … FROM edi",
      "SELECT … FROM erp UNION ALL SELECT … FROM edi ORDER BY source",
      "SELECT … FROM erp UNION SELECT … FROM edi"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux parties disent 'ERP' : impossible de les distinguer.",
      "Oui. Une colonne constante par partie indique la source.",
      "Non. La colonne source n'existe pas : erreur.",
      "Non. Rien n'indique la source, et UNION fusionne les doublons."
    ],
    retenir: "Empiler des sources : ajoute une colonne « source »."
  },
  {
    id: "m07-q21", dialecte: "Standard",
    q: "Deux lignes (NULL, 'A') : une dans A, une dans B. Combien de lignes donne A UNION B ?",
    choix: [
      "2",
      "1",
      "0",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour UNION, deux NULL sont considérés comme égaux.",
      "Oui. Contrairement au =, les opérateurs ensemblistes traitent NULL = NULL.",
      "Non. Les deux lignes existent : il en reste une.",
      "Non. Les NULL sont permis dans un UNION."
    ],
    retenir: "UNION / INTERSECT / EXCEPT : NULL = NULL."
  },
  {
    id: "m07-q22", dialecte: "Standard",
    q: "Quelle différence entre a INTERSECT b (sur code, ville) et a INNER JOIN b ON a.code = b.code AND a.ville = b.ville ?",
    choix: [
      "Aucune, ce sont deux écritures identiques",
      "INTERSECT gère les NULL, sans doublons",
      "Le JOIN est toujours plus juste et plus rapide",
      "INTERSECT est interdit avec deux colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils diffèrent sur les NULL et les doublons.",
      "Oui. INTERSECT considère NULL = NULL et ne renvoie pas de doublons. Le JOIN rate les NULL et peut multiplier les lignes : une ville NULL des deux côtés est trouvée par INTERSECT, pas par le JOIN.",
      "Non. Le JOIN rate les NULL et peut créer des doublons.",
      "Non. INTERSECT accepte plusieurs colonnes."
    ],
    retenir: "INTERSECT compare des lignes entières, NULL compris."
  },
  {
    id: "m07-q23", dialecte: "Standard",
    q: "Quelle différence entre a EXCEPT b et a WHERE NOT EXISTS (… b.code = a.code) ?",
    choix: [
      "Aucune, les deux donnent le même résultat",
      "EXCEPT compare toute la ligne, pas la clé",
      "NOT EXISTS supprime les doublons en plus",
      "EXCEPT ne marche que sur une seule colonne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. EXCEPT compare toutes les colonnes, pas seulement la clé.",
      "Oui. EXCEPT compare toutes les colonnes ; NOT EXISTS compare seulement ce que tu mets dans le WHERE (souvent la clé). EXCEPT trouve aussi les lignes MODIFIÉES (même code, ville différente).",
      "Non. C'est EXCEPT qui dédoublonne.",
      "Non. EXCEPT compare autant de colonnes qu'on veut."
    ],
    retenir: "EXCEPT = lignes différentes. NOT EXISTS sur la clé = clés absentes."
  },
  {
    id: "m07-q24", dialecte: "Standard",
    q: "La liste B contient un code NULL. A EXCEPT B pose-t-il le même problème que NOT IN ?",
    choix: [
      "Oui : 0 ligne, comme avec NOT IN",
      "Non : EXCEPT gère bien les NULL",
      "Oui : une erreur à cause du NULL",
      "Seulement sur SQL Server, pas Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le piège du NULL ne touche pas EXCEPT.",
      "Oui. EXCEPT traite les NULL comme des valeurs normales : c'est une alternative sûre à NOT IN.",
      "Non. Un NULL ne provoque pas d'erreur avec EXCEPT.",
      "Non. EXCEPT gère les NULL sur les deux moteurs."
    ],
    retenir: "EXCEPT n'a pas le piège NULL de NOT IN."
  },
  {
    id: "m07-q25", dialecte: "Snowflake",
    q: "Sur Snowflake, quel mot-clé est synonyme de EXCEPT ?",
    choixCode: true,
    choix: [
      "MINUS",
      "SUBTRACT",
      "DIFF",
      "NOT UNION"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. MINUS (hérité d'Oracle) = EXCEPT. SQL Server ne connaît que EXCEPT.",
      "Non. Ce mot-clé n'existe pas.",
      "Non. Ce mot-clé n'existe pas.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "Snowflake : EXCEPT = MINUS."
  },
  {
    id: "m07-q26", dialecte: "SQL Server",
    q: "Sur SQL Server, comment est évalué A UNION B INTERSECT C ?",
    choix: [
      "(A UNION B) INTERSECT C",
      "A UNION (B INTERSECT C)",
      "Erreur",
      "De gauche à droite"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas de gauche à droite ici.",
      "Oui. INTERSECT est prioritaire sur UNION et EXCEPT. Mets des parenthèses pour être clair.",
      "Non. La requête est valide.",
      "Non. INTERSECT est prioritaire : il est évalué d'abord."
    ],
    retenir: "INTERSECT passe avant UNION / EXCEPT. Parenthèses conseillées."
  },
  {
    id: "m07-q27", dialecte: "Standard",
    q: "Comment est évalué A UNION B EXCEPT C (UNION et EXCEPT ont la même priorité) ?",
    choix: [
      "A UNION (B EXCEPT C)",
      "(A UNION B) EXCEPT C",
      "Erreur",
      "A EXCEPT C, puis UNION B"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Même priorité = de gauche à droite.",
      "Oui. De gauche à droite. Les lignes de A présentes dans C sont donc aussi retirées.",
      "Non. La requête est valide.",
      "Non. On lit de gauche à droite : UNION d'abord."
    ],
    retenir: "Même priorité = de gauche à droite. Parenthèses pour éviter les surprises."
  },
  {
    id: "m07-q28", dialecte: "Standard",
    q: "Comment trouver TOUTES les différences entre deux tables de même structure, v1 et v2 ?",
    choixCode: true,
    choix: [
      "(v1 EXCEPT v2) UNION ALL (v1 EXCEPT v2)",
      "(v1 EXCEPT v2) UNION ALL (v2 EXCEPT v1)",
      "(v1 UNION v2) EXCEPT (v1 UNION v2)",
      "(v1 INTERSECT v2) UNION ALL (v2 EXCEPT v1)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le même sens deux fois : les lignes en plus dans v2 manquent.",
      "Oui. Les deux sens. Ajoute une colonne 'v1' / 'v2' pour savoir d'où vient chaque différence.",
      "Non. Toujours vide.",
      "Non. Les lignes communes + celles en plus dans v2 : les lignes absentes de v2 manquent."
    ],
    retenir: "Différences complètes : EXCEPT dans les deux sens."
  },
  {
    id: "m07-q29", dialecte: "Standard",
    q: "(v1 EXCEPT v2) UNION ALL (v2 EXCEPT v1) renvoie 0 ligne. Que peut-on conclure ?",
    choix: [
      "Les tables sont vides",
      "Les deux tables contiennent les mêmes lignes distinctes",
      "Les tables sont identiques, doublons compris",
      "Il y a une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas forcément.",
      "Oui. Attention : EXCEPT dédoublonne. Compare aussi COUNT(*) pour vérifier les doublons.",
      "Non. Une ligne en double dans v1 seulement ne serait pas détectée.",
      "Non. 0 ligne est un résultat, pas une erreur."
    ],
    retenir: "Recette : EXCEPT dans les deux sens + comparer les COUNT(*)."
  },
  {
    id: "m07-q30", dialecte: "Standard",
    q: "Chargement incrémental : comment trouver les lignes de la table de chargement (stg) nouvelles OU modifiées par rapport à la cible ?",
    choixCode: true,
    choix: [
      "SELECT * FROM stg",
      "SELECT colonnes FROM stg EXCEPT SELECT colonnes FROM cible",
      "SELECT * FROM stg INTERSECT SELECT * FROM cible",
      "SELECT * FROM cible EXCEPT SELECT * FROM stg"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tout serait rechargé.",
      "Oui. Seules les lignes absentes ou différentes de la cible restent.",
      "Non. Ce sont les lignes inchangées.",
      "Non. Ce sont les lignes disparues ou modifiées côté cible."
    ],
    retenir: "Delta à charger : stg EXCEPT cible."
  },
  {
    id: "m07-q31", dialecte: "Standard",
    q: "EXCEPT sur une table de 80 colonnes et 50 millions de lignes est lent. Quelle alternative courante ?",
    choix: [
      "INTERSECT à la place d'EXCEPT",
      "Comparer un hash des colonnes",
      "Ajouter DISTINCT dans chaque partie",
      "Remplacer EXCEPT par UNION, plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trouve les lignes identiques, pas les différences, et coûte autant.",
      "Oui. Une empreinte (hash) des colonnes, calculée et stockée à chaque chargement : on compare la clé + une seule colonne au lieu de 80.",
      "Non. EXCEPT dédoublonne déjà.",
      "Non. UNION ne compare pas."
    ],
    retenir: "Très grosses comparaisons : clé + hash."
  },
  {
    id: "m07-q32", dialecte: "Standard",
    q: "Ton ERP a une base par société (dossier). Comment créer une vue qui regroupe les clients de toutes les sociétés ?",
    choixCode: true,
    choix: [
      "SELECT code, nom FROM soc1.dbo.client UNION ALL SELECT code, nom FROM soc2.dbo.client",
      "SELECT 'SOC1' AS societe, code, nom FROM soc1.dbo.client UNION ALL SELECT 'SOC2', code, nom FROM soc2.dbo.client",
      "SELECT 'SOC1' AS societe, code, nom FROM soc1.dbo.client UNION SELECT 'SOC1', code, nom FROM soc2.dbo.client",
      "SELECT 'SOC1' AS societe, c1.code, c1.nom FROM soc1.dbo.client c1 JOIN soc2.dbo.client c2 ON c2.code = c1.code"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans colonne société, le même code dans deux sociétés est impossible à distinguer.",
      "Oui. UNION ALL + colonne société : le même code client peut exister dans les deux.",
      "Non. Les deux parties disent 'SOC1', et UNION fusionne les clients identiques des deux sociétés.",
      "Non. On veut empiler, pas relier : seuls les codes communs sortent."
    ],
    retenir: "Multi-sociétés : UNION ALL + colonne société."
  },
  {
    id: "m07-q33", dialecte: "Standard",
    q: "Les commandes sont dans commande (année en cours) et commande_archive (années passées). Comment tout analyser ?",
    choixCode: true,
    choix: [
      "Une vue : SELECT … FROM commande JOIN commande_archive ON …",
      "Une vue : SELECT … FROM commande UNION ALL SELECT … FROM commande_archive",
      "Une vue : SELECT … FROM commande UNION SELECT … FROM commande_archive",
      "Copier l'archive dans commande avant chaque rapport"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On veut empiler, pas relier.",
      "Oui. Les colonnes doivent être listées dans le même ordre dans les deux parties.",
      "Non. Inutilement coûteux, et risque de fusionner des lignes identiques.",
      "Non. Lourd et risqué : doublons, données modifiées."
    ],
    retenir: "Tables découpées dans le temps : vue UNION ALL."
  },
  {
    id: "m07-q34", dialecte: "Standard",
    q: "Tu veux le CA net par client à partir de facture (montants positifs) et avoir (montants positifs aussi). Quelle approche ?",
    choixCode: true,
    choix: [
      "SELECT client_id, montant FROM facture UNION ALL SELECT client_id, montant FROM avoir, puis GROUP BY client_id",
      "SELECT client_id, montant FROM facture UNION ALL SELECT client_id, -montant FROM avoir, puis GROUP BY client_id",
      "SELECT client_id, montant FROM facture UNION SELECT client_id, -montant FROM avoir, puis GROUP BY client_id",
      "facture JOIN avoir ON client, puis SUM(f.montant) - SUM(a.montant)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les avoirs sont ajoutés au lieu d'être retirés.",
      "Oui. On empile avec le bon signe, puis on agrège une seule fois.",
      "Non. UNION fusionnerait deux factures identiques du même client.",
      "Non. Jointure 1-N des deux côtés : sommes multipliées."
    ],
    retenir: "Combiner deux tables de faits : UNION ALL (avec le signe) puis GROUP BY."
  },
  {
    id: "m07-q35", dialecte: "Standard",
    q: "Comment simuler un FULL OUTER JOIN avec des opérateurs ensemblistes ?",
    choix: [
      "A INNER JOIN B, UNION ALL B INNER JOIN A",
      "A LEFT JOIN B, puis UNION ALL du reste de B",
      "A INTERSECT B, puis UNION ALL de A EXCEPT B",
      "A CROSS JOIN B, filtré par un WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les lignes sans correspondance manquent.",
      "Oui. Le LEFT JOIN donne A complet ; on ajoute les lignes de B sans correspondance dans A (NOT EXISTS).",
      "Non. Pas de jointure : on ne relie pas les colonnes de A et de B.",
      "Non. Un filtre sur un CROSS JOIN donne un INNER JOIN."
    ],
    retenir: "FULL = LEFT JOIN + (B sans correspondance)."
  },
  {
    id: "m07-q36", dialecte: "Standard",
    q: "Pour simuler un FULL JOIN, tu écris A LEFT JOIN B UNION A RIGHT JOIN B. Quel est le risque ?",
    choix: [
      "Aucun, c'est équivalent à un FULL JOIN",
      "UNION fusionne aussi de vraies lignes égales",
      "Erreur de syntaxe entre LEFT et RIGHT JOIN",
      "Les lignes communes disparaissent du résultat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION fusionne aussi des lignes réelles identiques.",
      "Oui. UNION fusionne des lignes identiques légitimes, et le dédoublonnage coûte cher. Préfère LEFT JOIN UNION ALL (B sans correspondance), ou un vrai FULL OUTER JOIN.",
      "Non. La syntaxe est valide.",
      "Non. Elles apparaissent une fois."
    ],
    retenir: "Évite UNION pour reconstituer un FULL JOIN."
  },
  {
    id: "m07-q37", dialecte: "Standard",
    q: "Que penser de SELECT DISTINCT code FROM a UNION SELECT DISTINCT code FROM b ?",
    choix: [
      "Ils sont nécessaires pour dédoublonner",
      "Les DISTINCT sont inutiles",
      "C'est une erreur de syntaxe",
      "C'est plus rapide grâce aux DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION supprime déjà les doublons.",
      "Oui. UNION supprime déjà tous les doublons.",
      "Non. C'est valide.",
      "Non. Ça ajoute du travail."
    ],
    retenir: "UNION + DISTINCT = redondant."
  },
  {
    id: "m07-q38", dialecte: "Standard",
    q: "Une vue fait SELECT * FROM a UNION ALL SELECT * FROM b. Quelqu'un ajoute une colonne dans a. Que se passe-t-il ?",
    choix: [
      "Rien, la vue continue de fonctionner",
      "La vue casse ou mélange les colonnes",
      "La colonne est ajoutée aussi dans b",
      "La vue s'adapte toute seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux parties n'ont plus le même nombre de colonnes.",
      "Oui. Le nombre de colonnes diffère (erreur) ou les colonnes se décalent. Liste toujours les colonnes, dans le même ordre, dans chaque partie.",
      "Non. Une vue ne modifie pas les tables.",
      "Non. SELECT * ne s'adapte pas des deux côtés."
    ],
    retenir: "UNION : jamais de SELECT *, liste les colonnes."
  },
  {
    id: "m07-q39", dialecte: "Standard",
    q: "Partie 1 : SELECT nom, ville. Partie 2 : SELECT ville, nom. Les deux colonnes sont du texte. Que se passe-t-il ?",
    choix: [
      "Erreur : colonnes dans un ordre différent",
      "Villes et noms mélangés, sans erreur",
      "Le moteur remet les colonnes dans l'ordre",
      "Les lignes de la partie 2 sont ignorées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les types sont compatibles : pas d'erreur.",
      "Oui. L'union se fait par POSITION, pas par nom : les villes et les noms se retrouvent dans les mêmes colonnes.",
      "Non. Le moteur ne regarde pas les noms.",
      "Non. Toutes les lignes sont gardées, mais mélangées."
    ],
    retenir: "UNION associe les colonnes par position, pas par nom."
  },
  {
    id: "m07-q40", dialecte: "SQL Server",
    q: "Erreur « Cannot resolve the collation conflict … in the UNION ALL operator ». Cause ?",
    choix: [
      "Les colonnes ont des types différents",
      "Des collations différentes entre bases",
      "Il manque un ORDER BY à la fin de l'union",
      "Il y a des NULL dans une des colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'erreur parle de collation, pas de type.",
      "Oui. Les deux parties viennent de bases avec des collations différentes. Ajoute COLLATE sur une des colonnes (ex. nom COLLATE French_CI_AS).",
      "Non. ORDER BY ne règle pas un conflit de collation.",
      "Non. Les NULL ne causent pas de conflit de collation."
    ],
    retenir: "UNION entre bases : attention aux collations."
  },
  {
    id: "m07-q41", dialecte: "SQL Server",
    q: "Partie 1 : code VARCHAR(5). Partie 2 : code VARCHAR(50). Les codes longs de la partie 2 sont-ils coupés ?",
    choix: [
      "Oui, coupés à 5 caractères",
      "Non : le type le plus large l'emporte",
      "Erreur : longueurs incompatibles",
      "Seulement avec UNION, pas avec UNION ALL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le type le plus large est choisi : rien n'est coupé.",
      "Oui. SQL Server choisit un type qui peut contenir toutes les valeurs : VARCHAR(50).",
      "Non. Deux VARCHAR de tailles différentes sont compatibles.",
      "Non. La règle est la même pour UNION et UNION ALL."
    ],
    retenir: "UNION : type résultat = le plus large."
  },
  {
    id: "m07-q42", dialecte: "Standard",
    q: "Partie 1 : qte INT. Partie 2 : qte DECIMAL(10,3). Quel est le type du résultat ?",
    choix: [
      "INT, les décimales sont perdues",
      "DECIMAL : les décimales sont conservées",
      "Texte",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le type le plus précis gagne : DECIMAL.",
      "Oui. Le type le plus précis l'emporte.",
      "Non. Deux nombres donnent un nombre.",
      "Non. INT et DECIMAL sont compatibles."
    ],
    retenir: "INT + DECIMAL dans une UNION = DECIMAL."
  },
  {
    id: "m07-q43", dialecte: "Standard",
    q: "Dans une CTE récursive, quel opérateur relie l'ancre et la partie récursive ?",
    choix: [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "EXCEPT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Refusé par SQL Server dans ce cas.",
      "Oui. Chaque tour ajoute ses lignes à celles des tours précédents.",
      "Non. INTERSECT garderait seulement le commun : pas de récursion.",
      "Non. EXCEPT retirerait des lignes : pas de récursion."
    ],
    retenir: "Récursion = UNION ALL."
  },
  {
    id: "m07-q44", dialecte: "Standard",
    q: "GROUP BY GROUPING SETS ((region), (annee)) équivaut à quoi ?",
    choix: [
      "Un GROUP BY region, annee, tout simplement",
      "Deux GROUP BY empilés, en une lecture",
      "Un INTERSECT entre les deux regroupements",
      "Un ROLLUP (region, annee) complet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça donnerait les combinaisons.",
      "Oui. Un GROUP BY region UNION ALL un GROUP BY annee, mais calculé en une seule lecture. Même résultat (avec NULL dans la colonne non groupée), en plus efficace.",
      "Non. GROUPING SETS empile les groupes, il ne les croise pas.",
      "Non. ROLLUP ajoute aussi region × annee et le total."
    ],
    retenir: "GROUPING SETS = plusieurs GROUP BY empilés, en une passe."
  },
  {
    id: "m07-q45", dialecte: "SQL Server",
    q: "Pour transformer 12 colonnes de mois en lignes, pourquoi CROSS APPLY (VALUES …) plutôt que 12 SELECT reliés par UNION ALL ?",
    choix: [
      "UNION ALL est interdit pour dépivoter",
      "Une seule lecture au lieu de 12",
      "CROSS APPLY dédoublonne les mois",
      "Aucune différence de performance"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION ALL marche, mais lit la table 12 fois.",
      "Oui. UNION ALL lit la table 12 fois ; CROSS APPLY la lit une seule fois. Même résultat, beaucoup moins de lectures.",
      "Non. CROSS APPLY ne dédoublonne rien.",
      "Non. 1 lecture au lieu de 12 : grosse différence."
    ],
    retenir: "Dépivoter : une lecture avec CROSS APPLY (VALUES …)."
  },
  {
    id: "m07-q46", dialecte: "Standard",
    q: "Comment insérer en une instruction des lignes venant de deux tables de chargement ?",
    choixCode: true,
    choix: [
      "INSERT INTO cible (code, nom) SELECT code, nom FROM stg1 UNION ALL SELECT code, nom FROM stg2",
      "INSERT INTO cible (code, nom) SELECT code, nom FROM stg1 UNION ALL SELECT nom, code FROM stg2",
      "INSERT INTO cible (code, nom) SELECT code, nom FROM stg1, stg2",
      "INSERT INTO cible (code, nom) VALUES (SELECT code, nom FROM stg1), (SELECT code, nom FROM stg2)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le SELECT de l'INSERT peut être une union.",
      "Non. Colonnes inversées dans la 2e partie : les codes et les noms sont mélangés.",
      "Non. Produit cartésien (et colonnes ambiguës).",
      "Non. VALUES n'accepte pas des sous-requêtes de plusieurs lignes."
    ],
    retenir: "INSERT … SELECT … UNION ALL SELECT …"
  },
  {
    id: "m07-q47", dialecte: "Standard",
    q: "Tu empiles commande et commande_archive, puis tu veux seulement 2024. Où filtrer ?",
    choix: [
      "Un seul WHERE, dans la dernière partie",
      "Un WHERE dans chaque partie (ou autour)",
      "Dans le ORDER BY, à la fin de l'union",
      "Dans la 1re partie : il vaut pour tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce WHERE ne s'applique qu'à la dernière partie.",
      "Oui. Chaque WHERE agit sur sa partie. Ou on enveloppe l'union : WITH u AS (… UNION ALL …) SELECT * FROM u WHERE annee = 2024.",
      "Non. ORDER BY trie, il ne filtre pas.",
      "Non. Il ne vaut que pour sa partie."
    ],
    retenir: "Un WHERE dans une UNION ne vaut que pour sa partie."
  },
  {
    id: "m07-q48", dialecte: "Standard",
    q: "Quelle requête trouve les clients communs aux sociétés 1 et 2 (même SIRET) ?",
    choixCode: true,
    choix: [
      "SELECT siret FROM soc1.client UNION SELECT siret FROM soc2.client",
      "SELECT siret FROM soc1.client INTERSECT SELECT siret FROM soc2.client",
      "SELECT siret FROM soc1.client EXCEPT SELECT siret FROM soc2.client",
      "SELECT siret FROM soc1.client UNION ALL SELECT siret FROM soc2.client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tous les SIRET des deux sociétés.",
      "Oui. Présents des deux côtés.",
      "Non. Ceux de la société 1 seulement.",
      "Non. Tous les SIRET des deux sociétés, avec doublons."
    ],
    retenir: "Commun = INTERSECT."
  },
  {
    id: "m07-q49", dialecte: "Standard",
    q: "Quelle requête liste les articles du catalogue qui n'ont jamais eu de stock ?",
    choixCode: true,
    choix: [
      "SELECT code FROM catalogue INTERSECT SELECT code FROM stock",
      "SELECT code FROM catalogue EXCEPT SELECT code FROM stock",
      "SELECT code FROM stock EXCEPT SELECT code FROM catalogue",
      "SELECT code FROM catalogue UNION SELECT code FROM stock"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ceux qui ont du stock.",
      "Oui. Dans le catalogue, absents du stock.",
      "Non. Du stock sur des articles hors catalogue (anomalie intéressante, mais autre question).",
      "Non. Tous les codes des deux tables."
    ],
    retenir: "Absent de B : A EXCEPT B."
  },
  {
    id: "m07-q50", dialecte: "Standard",
    q: "Comment compter le nombre d'articles du catalogue sans stock ?",
    choixCode: true,
    choix: [
      "SELECT COUNT(*) FROM catalogue EXCEPT SELECT COUNT(*) FROM stock",
      "SELECT COUNT(*) FROM (SELECT code FROM catalogue EXCEPT SELECT code FROM stock) t",
      "SELECT COUNT(EXCEPT code)",
      "SELECT COUNT(*) FROM catalogue - stock"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On compare deux nombres, pas des codes.",
      "Oui. On enveloppe l'EXCEPT, puis on compte.",
      "Non. EXCEPT n'est pas un mot de COUNT.",
      "Non. On ne soustrait pas deux tables avec un moins."
    ],
    retenir: "Compter un résultat ensembliste : l'envelopper dans une sous-requête."
  },
  {
    id: "m07-q51", dialecte: "SQL Server",
    q: "SQL Server accepte-t-il EXCEPT ALL (qui garderait les doublons) ?",
    choix: [
      "Oui, EXCEPT ALL est accepté",
      "Non : seulement EXCEPT",
      "Oui, avec un DISTINCT en plus",
      "Seulement dans une CTE récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse EXCEPT ALL.",
      "Oui. Seulement EXCEPT, qui dédoublonne. Pour comparer avec les doublons : numérote les lignes (ROW_NUMBER par clé) avant l'EXCEPT.",
      "Non. DISTINCT dédoublonne, il ne garde pas les doublons.",
      "Non. EXCEPT ALL n'existe nulle part sur SQL Server."
    ],
    retenir: "SQL Server : pas d'EXCEPT ALL / INTERSECT ALL."
  },
  {
    id: "m07-q52", dialecte: "Standard",
    q: "INTERSECT et EXCEPT ont-ils les mêmes règles que UNION (même nombre de colonnes, types compatibles) ?",
    choix: [
      "Oui",
      "Non, ils sont plus souples",
      "Non, ils exigent les mêmes noms",
      "Seulement INTERSECT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Mêmes règles : nombre de colonnes, types compatibles, association par position.",
      "Non. Ils ont exactement les mêmes règles.",
      "Non. Les noms ne comptent pas.",
      "Non. EXCEPT a aussi ces règles."
    ],
    retenir: "Tous les opérateurs ensemblistes : mêmes règles de colonnes."
  },
  {
    id: "m07-q53", dialecte: "Standard",
    q: "Pour savoir quels CLIENTS manquent dans la cible, que comparer avec EXCEPT ?",
    choix: [
      "Toutes les colonnes de la table",
      "Seulement la clé (code client)",
      "Seulement le nom du client",
      "Aucune colonne : EXCEPT * suffit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un client présent mais modifié apparaîtrait comme « manquant ».",
      "Oui. Comparer la clé = présence / absence. Comparer toutes les colonnes = présence ET identité.",
      "Non. Le nom n'est pas un identifiant fiable.",
      "Non. EXCEPT compare les colonnes listées dans les SELECT."
    ],
    retenir: "EXCEPT sur la clé = absents. Sur toutes les colonnes = absents ou modifiés."
  },
  {
    id: "m07-q54", dialecte: "SQL Server",
    q: "Une vue UNION ALL regroupe vente_2024, vente_2025, vente_2026, chacune avec une contrainte CHECK sur l'année. Que fait SQL Server pour WHERE annee = 2026 ?",
    choix: [
      "Il lit les 3 tables, puis filtre",
      "Il ne lit que vente_2026",
      "Une erreur : la vue est ambiguë",
      "Il lit seulement la 1re table de la vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas si les contraintes sont en place et fiables.",
      "Oui. Grâce aux contraintes CHECK (vue partitionnée), l'optimiseur sait que les autres tables ne peuvent pas contenir 2026.",
      "Non. La vue est valide : c'est une vue partitionnée.",
      "Non. Il lit la table qui peut contenir 2026."
    ],
    retenir: "Vue UNION ALL + CHECK = tables ignorées quand le filtre les exclut."
  },
  {
    id: "m07-q55", dialecte: "Standard",
    q: "A a 3 lignes distinctes. Combien de lignes donnent A UNION ALL A, puis A UNION A ?",
    choix: [
      "6 et 6",
      "6 et 3",
      "3 et 3",
      "3 et 6"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION supprime les doublons : il en reste 3.",
      "Oui. UNION ALL double tout ; UNION supprime les doublons.",
      "Non. UNION ALL garde tout : 6 lignes.",
      "Non. C'est l'inverse."
    ],
    retenir: "UNION ALL additionne, UNION dédoublonne."
  },
  {
    id: "m07-q56", dialecte: "Standard",
    q: "Combien de lignes donne A INTERSECT A, si A a 3 lignes dont 2 identiques ?",
    choix: [
      "3",
      "2",
      "1",
      "6"
    ],
    bonne: 1,
    pourquoi: [
      "Non. INTERSECT dédoublonne.",
      "Oui. Les lignes distinctes de A : 2.",
      "Non. A a 2 lignes distinctes, pas 1.",
      "Non. INTERSECT ne multiplie pas les lignes."
    ],
    retenir: "A INTERSECT A = DISTINCT A."
  },
  {
    id: "m07-q57", dialecte: "Standard",
    q: "Que donne A EXCEPT A ?",
    choix: [
      "A",
      "Aucune ligne",
      "Les doublons de A",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tout ce qui est dans A est retiré.",
      "Oui. Tout ce qui est dans A est dans A.",
      "Non. EXCEPT dédoublonne et retire tout.",
      "Non. La requête est valide."
    ],
    retenir: "A EXCEPT A = vide."
  },
  {
    id: "m07-q58", dialecte: "Standard",
    q: "Quelle requête liste les codes présents dans l'ERP OU dans l'EDI, mais pas dans les deux ?",
    choixCode: true,
    choix: [
      "(erp UNION edi) EXCEPT (erp INTERSECT edi)",
      "(erp INTERSECT edi) EXCEPT (erp UNION edi)",
      "(erp EXCEPT edi) UNION ALL (erp EXCEPT edi)",
      "(erp UNION edi) EXCEPT (erp EXCEPT edi)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tout, moins ce qui est commun. C'est la « différence symétrique ».",
      "Non. Toujours vide : le commun est inclus dans le tout.",
      "Non. Le même sens deux fois : les codes seulement dans l'EDI manquent.",
      "Non. On retire les codes seulement dans l'ERP : il reste les communs et ceux de l'EDI."
    ],
    retenir: "Différence symétrique = (A UNION B) EXCEPT (A INTERSECT B)."
  },
  {
    id: "m07-q59", dialecte: "Standard",
    q: "Rapport de rapprochement : pour chaque code, tu veux « ERP seul », « EDI seul » ou « Les deux ». Quel outil est le plus direct ?",
    choix: [
      "Trois requêtes EXCEPT / INTERSECT empilées",
      "Un FULL OUTER JOIN avec un CASE sur les NULL",
      "Un UNION",
      "Un CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais plus long et trois lectures.",
      "Oui. Une seule requête : CASE WHEN e.code IS NULL THEN 'EDI seul' WHEN d.code IS NULL THEN 'ERP seul' ELSE 'Les deux' END.",
      "Non. UNION réunit les codes, sans dire d'où ils viennent.",
      "Non. CROSS JOIN combine tout, sans comparer."
    ],
    retenir: "Statut de rapprochement par ligne : FULL OUTER JOIN + CASE."
  },
  {
    id: "m07-q60", dialecte: "Standard",
    q: "Quelle règle résume le bon usage des opérateurs ensemblistes ?",
    choix: [
      "Toujours UNION, pour éviter les doublons",
      "UNION ALL par défaut, le reste au besoin",
      "Toujours EXCEPT, pour comparer les données",
      "Jamais d'opérateurs ensemblistes en production"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Coûteux et risqué sur des données de détail.",
      "Oui. UNION seulement pour dédoublonner ; INTERSECT / EXCEPT pour comparer des listes ou des tables. Et toujours : colonnes listées, même ordre, mêmes types.",
      "Non. EXCEPT sert à comparer, pas à empiler.",
      "Non. Ils sont utiles et sûrs, bien utilisés."
    ],
    retenir: "UNION ALL par défaut. Comparaisons : EXCEPT / INTERSECT."
  }
];
