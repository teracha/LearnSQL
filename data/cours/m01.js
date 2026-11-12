// Parcours SQL — Fiche de cours du module m01 « Les bases du SELECT », version 3 (04/11/2026).
// Version 3 = le squelette validé par l'élève sur m02 : chaque section suit Exemple (qui montre le piège quand il y en
// a un) → Résultat → « Ce qui se passe » → « Pourquoi » → « Le piège » → « Le bon réflexe » → parfois « SQL Server /
// Snowflake » ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition.
// Les faits et les résultats viennent de la version 2 (expert + testeur, sources officielles : learn.microsoft.com
// SELECT - ORDER BY clause, TOP, SELECT clause, = (String comparison), GETDATE ; docs.snowflake.com ORDER BY,
// DEFAULT_NULL_ORDERING, TOP <n>, LIMIT / FETCH, SAMPLE, Identifier requirements, SELECT / EXCLUDE ; git 83d34d4).
// Résultats recalculés avec SQLite sur docs/base-exemple.sql : factures (4 lignes) ; totaux par client hors annulées
// > 1 300 (15115.00, 2580.00) ; PRO français par ville, NULL en tête (5 lignes) ; TOP (4) WITH TIES (5 lignes, deux à
// 1290.00) ; DISTINCT type + statut des flux (4 couples) ; clients sans SIREN (2) ; SELECT sans FROM (20, 1, NULL,
// CDE-1001).
// Notions rares testées par une seule question (GO, USE, @@VERSION, DB_NAME, sp_help, DESCRIBE, TOP (0), NEWID,
// SAMPLE, GETDATE évalué une fois, ::, NULLS FIRST / LAST, collation CS) : laissées à l'explication de la question
// (règle 6 de docs/plan-sql.md).
LEARNSQL.cours.m01 = {
  intro: "Une commande EDI d'AquaBleu n'est pas facturée dans Divalto : par quelle requête commences-tu ? Un `SELECT` sur la table des commandes, trié par date, limité aux dernières lignes. Ce module pose cette base : lire, trier, limiter, et surtout l'ordre dans lequel le moteur exécute ta requête. C'est ce qui évite un rapport Power BI faux parce que l'ordre n'était pas garanti, ou un `SELECT *` qui casse une intégration le jour où une colonne s'ajoute.",
  sections: [
    {
      titre: "Lire une table : SELECT et FROM",
      exemple: "SELECT f.num_fact, f.montant_ht, f.statut\nFROM dbo.facture AS f;",
      resultat: [["num_fact", "montant_ht", "statut"], ["FA-2026-0301", "4780.00", "PAYEE"], ["FA-2026-0302", "1290.00", "PAYEE"], ["FA-2026-0303", "2385.00", "RETARD"], ["FA-2026-0401", "79.80", "EMISE"]],
      regle: "Une requête `SELECT` lit une table. `FROM` dit laquelle ; `SELECT` dit quelles colonnes sortir, et dans quel ordre. Le schéma écrit devant (`dbo`) est le tiroir qui range la table. Deux tiroirs peuvent avoir chacun une table du même nom : le schéma dit laquelle lire. Un alias est un nom court donné à la table (`AS f`) ; il la désigne ensuite dans toute la requête. En production, on nomme chaque colonne voulue : avec `SELECT *`, toute colonne ajoutée à la table arrive aussi dans le résultat.",
      points: [
        "Ce qui se passe : les 4 factures, avec 3 colonnes choisies, dans l'ordre du `SELECT`. `AS f` donne un nom court à la table (un alias), et `f.statut` dit de quelle table vient la colonne.",
        "Pourquoi : le moteur lit `FROM` d'abord. Il doit savoir quelle table ouvrir avant de choisir les colonnes. `dbo.facture` nomme le schéma (le tiroir qui range la table) : une autre table `facture` existe peut-être dans un schéma `stg`, pour les imports.",
        "Le piège : `SELECT *` en production. Le jour où une colonne s'ajoute, le rapport Power BI ou le flux EDI qui lisent cette requête reçoivent une colonne de plus, et se décalent ou plantent ; une vue, elle, se fige ou plante (m16).",
        "Le bon réflexe : liste tes colonnes. Et une fois l'alias posé, utilise-le partout : `facture.statut` n'est plus reconnu, seul `f.statut` l'est.",
        "Et aussi : les colonnes sortent dans l'ordre du `SELECT`. Les lignes, elles, sortent dans un ordre que personne ne garantit sans `ORDER BY` (section 3)."
      ],
      retenir: "Liste tes colonnes, préfixe le schéma, pose un alias de table court et utilise-le partout."
    },
    {
      titre: "L'ordre d'exécution : le moteur ne lit pas comme toi",
      exemple: "/* 5 */ SELECT client_id, SUM(montant_ht) AS total\n/* 1 */ FROM dbo.commande\n/* 2 */ WHERE statut <> 'ANNULEE'\n/* 3 */ GROUP BY client_id\n/* 4 */ HAVING SUM(montant_ht) > 1300\n/* 6 */ ORDER BY total DESC;",
      resultat: [["client_id", "total"], [1, "15115.00"], [2, "2580.00"]],
      regle: "L'ordre logique est l'ordre où le moteur traite une requête, pas celui où on l'écrit. Il prend d'abord les lignes (`FROM`, `WHERE`), puis forme les groupes (`GROUP BY`, `HAVING`). Ensuite il choisit ce qui sort (`SELECT`, `DISTINCT`), et finit par la présentation (`ORDER BY`, puis `TOP` ou `LIMIT`). Chaque étape ne voit que le travail des étapes d'avant. Sur SQL Server, un nom de colonne créé dans le `SELECT` (un alias) ne sert donc que dans `ORDER BY`. Snowflake, lui, l'accepte aussi dans `WHERE`, `GROUP BY` et `HAVING`.",
      points: [
        "Ce qui se passe : le total des commandes de chaque client, sans les annulées, pour les clients au-dessus de 1 300 €, du plus gros au plus petit. `GROUP BY` fait une ligne par client, `SUM` additionne, `HAVING` filtre les totaux (module m04).",
        "Pourquoi les numéros : tu écris `SELECT` en premier, le moteur l'exécute presque en dernier. Il lit la table, filtre les lignes, regroupe, filtre les groupes, et seulement alors choisit les colonnes. Le tri vient après.",
        "Le piège : l'alias `total` naît au `SELECT`. Dans `WHERE` ou `HAVING`, qui passent avant, il n'existe pas encore : `HAVING total > 1300` donne « nom de colonne non valide » sur SQL Server.",
        "Le bon réflexe : dans `WHERE` et `HAVING`, répète le calcul (`SUM(montant_ht) > 1300`). Seul `ORDER BY`, qui passe après `SELECT`, voit l'alias ; et l'alias seul, pas dans un calcul (`ORDER BY total * 2` échoue).",
        "SQL Server / Snowflake : Snowflake accepte l'alias dans `WHERE`, `GROUP BY`, `HAVING`, et même plus loin dans le même `SELECT`. Pratique, mais une requête écrite ainsi ne tourne plus sur SQL Server."
      ],
      retenir: "Ordre logique : FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → TOP / LIMIT. Sur SQL Server, l'alias du SELECT ne vit que dans ORDER BY."
    },
    {
      titre: "Trier avec ORDER BY",
      exemple: "SELECT nom, ville\nFROM dbo.client\nWHERE pays = 'FR' AND type = 'PRO'\nORDER BY ville;",
      resultat: [["nom", "ville"], ["Camping Les Flots", null], ["Piscines Dumont", "Grenoble"], ["Piscines Dumont", "Lyon"], ["Hydro Sud", "Montpellier"], ["Bleu Lagon", "Nice"]],
      regle: "Sans `ORDER BY`, les lignes sortent comme le moteur les trouve, et cet ordre peut changer. Seul `ORDER BY` garantit un ordre : croissant par défaut (`ASC`, de A à Z), décroissant avec `DESC`. Un deuxième critère ne sert qu'en cas d'égalité sur le premier. La place des cases vides (NULL) dépend du moteur. Le tri se décide là où l'ordre compte : dans la requête qui alimente le rapport ou le fichier.",
      points: [
        "Ce qui se passe : les 5 piscinistes français, triés par ville, de A à Z (`ASC`, le sens par défaut). Camping Les Flots sort en premier : sa ville est NULL, une case vide.",
        "Pourquoi : SQL Server traite NULL comme la plus petite valeur. En `ASC` il sort en tête, en `DESC` en fin. Snowflake fait l'inverse par défaut : NULL est la plus grande valeur.",
        "Le piège : sans `ORDER BY`, aucun ordre n'est garanti, même s'il « a l'air » bon aujourd'hui. Le jour où le moteur change de chemin (un nouvel index, plus de données), le rapport Power BI ou le fichier EDI sortent dans un autre ordre.",
        "Le bon réflexe : un seul `ORDER BY`, dans la requête finale, sur des noms de colonnes. `ORDER BY pays, montant_ht DESC` trie par pays, puis le 2e critère départage seulement les lignes du même pays.",
        "Et aussi : pour mettre les NULL en fin, `ORDER BY CASE WHEN ville IS NULL THEN 1 ELSE 0 END, ville`. Des codes rangés en texte se trient '1', '10', '2' : trie sur `CAST(code AS int)`."
      ],
      retenir: "Pas d'ORDER BY, pas d'ordre. Un seul ORDER BY, sur des noms de colonnes, dans la requête finale : jamais dans une vue."
    },
    {
      titre: "Limiter : TOP, LIMIT et la pagination",
      exemple: "SELECT TOP (4) WITH TIES num_cde, montant_ht\nFROM dbo.commande\nORDER BY montant_ht DESC;",
      resultat: [["num_cde", "montant_ht"], ["CDE-1007", "7950.00"], ["CDE-1001", "4780.00"], ["CDE-1003", "2385.00"], ["CDE-1002", "1290.00"], ["CDE-1006", "1290.00"]],
      regle: "`TOP` (SQL Server) et `LIMIT` (Snowflake) gardent les n premières lignes d'un résultat. « Premières » suppose un ordre : on les écrit donc toujours avec un `ORDER BY`, qui trie avant qu'ils ne coupent. Sur SQL Server, `WITH TIES` garde en plus les ex aequo de la dernière place. Pour avoir une ligne entière, la plus récente ou la plus grosse, on trie puis on garde la première. `MAX`, lui, ne rend qu'une valeur. Paginer, c'est sauter des lignes (`OFFSET`) puis en prendre quelques-unes, toujours sur un résultat trié.",
      points: [
        "Ce qui se passe : 5 lignes pour un `TOP (4)`. Deux commandes à 1 290 € se partagent la 4e place ; `WITH TIES` (« avec les ex aequo ») garde les deux.",
        "Pourquoi : `TOP` s'applique en dernier, après le tri. « Les 4 plus grosses » n'a de sens qu'une fois les lignes triées. Sans `ORDER BY` : 4 lignes quelconques, qui changent d'un jour à l'autre.",
        "Le piège : « la commande la plus récente » avec `MAX(date_cde)` : tu obtiens une date, pas la commande. `ORDER BY date_cde DESC` puis `TOP (1)` donne la ligne entière ; avec `WITH TIES`, toutes les commandes du dernier jour.",
        "Le bon réflexe : pour afficher page par page, `ORDER BY id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` donne les lignes 21 à 30. À la page 5 000, `OFFSET` relit tout ce qui précède : pagine alors par clé, `WHERE id > @dernier_id ORDER BY id`, avec `TOP (10)`.",
        "SQL Server / Snowflake : Snowflake écrit `LIMIT 4` tout à la fin, après `ORDER BY`, et accepte aussi `TOP 4` ; sa pagination s'écrit `LIMIT 10 OFFSET 20`. SQL Server, lui, n'a que `TOP`."
      ],
      retenir: "TOP ou LIMIT, toujours avec ORDER BY. La ligne la plus récente : ORDER BY date DESC puis TOP (1), pas MAX."
    },
    {
      titre: "DISTINCT : des lignes entières uniques",
      exemple: "SELECT DISTINCT type, statut\nFROM dbo.flux_edi\nORDER BY type, statut;",
      resultat: [["type", "statut"], ["DESADV", "REJET"], ["INVOIC", "OK"], ["ORDERS", "OK"], ["ORDERS", "REJET"]],
      regle: "`DISTINCT` retire les lignes en double du résultat. Deux lignes sont des doublons seulement si toutes leurs colonnes affichées sont pareilles : une seule différence, et les deux restent. On s'en sert pour lister les valeurs différentes d'une colonne, ou les combinaisons de plusieurs. Des doublons inattendus ont une cause, souvent une jointure (le lien entre deux tables). `DISTINCT` masque le problème sans le réparer : on cherche d'abord la cause.",
      points: [
        "Ce qui se passe : 4 couples type + statut, chacun une seule fois. `ORDERS` sort deux fois, parce que son statut diffère : `DISTINCT` compare la ligne entière, pas la première colonne.",
        "Pourquoi : `DISTINCT` s'applique après `SELECT`, sur les colonnes affichées. C'est aussi pour ça qu'avec `DISTINCT`, `ORDER BY` n'accepte que des colonnes du `SELECT` : trier 4 couples par `motif`, SQL Server refuse.",
        "Le piège : ajouter `DISTINCT` pour « corriger » des doublons apparus après une jointure (module m05). Les doublons viennent de plusieurs lignes par commande ; `DISTINCT` les cache, et les sommes restent fausses.",
        "Le bon réflexe : cherche d'où viennent les doublons avant d'ajouter `DISTINCT`. Sur une clé unique (`id`), `DISTINCT` ne retire rien et coûte un tri pour rien.",
        "Et aussi : pour `DISTINCT`, les NULL sont égaux entre eux : une seule ligne vide. Et `SELECT DISTINCT COUNT(*)` compte toutes les lignes ; pour compter des valeurs différentes, `COUNT(DISTINCT statut)`."
      ],
      retenir: "DISTINCT compare des lignes entières et garde un seul NULL. Des doublons après une jointure : cherche la cause avant de dédoublonner."
    },
    {
      titre: "Écrire les valeurs et les noms",
      exemple: "-- Fiches à nettoyer : les clients sans SIREN\nSELECT code, nom AS [Nom client], 'À saisir par l''ADV' AS action\nFROM dbo.client\nWHERE siren IS NULL;",
      resultat: [["code", "Nom client", "action"], ["C003", "Bleu Lagon", "À saisir par l'ADV"], ["C005", "Pool & Garden", "À saisir par l'ADV"]],
      regle: "Une requête mêle des valeurs et des noms, et le moteur doit voir où chacun commence et finit. Un texte se met entre apostrophes, et une apostrophe à l'intérieur se double. Un nom spécial, avec un espace par exemple, s'entoure lui aussi, d'un signe qui dépend du moteur. Enfin, une colonne se compare à une valeur du même type : un code rangé en texte s'écrit entre apostrophes.",
      points: [
        "Ce qui se passe : les 2 fiches sans SIREN. La colonne `action` répète le même texte sur chaque ligne (une constante). Le titre « Nom client » contient un espace : d'où les crochets `[ ]`.",
        "Pourquoi l'apostrophe doublée : une apostrophe ouvre un texte, la suivante le ferme. Pour en mettre une dedans, on la double : `'l''ADV'` s'affiche l'ADV. Sinon le texte se ferme trop tôt : erreur.",
        "Le piège : comparer avec le mauvais type. `code_postal = 69110` (un nombre) sur une colonne texte force SQL Server à convertir toute la colonne, et il plante sur '2A004' (la Corse). Écris `'69110'`.",
        "Le bon réflexe : évite les noms avec un espace ou un mot réservé (`nom_client` plutôt que « Nom client »). Pour ceux qui existent déjà : `[ ]` sur SQL Server, `\" \"` sur Snowflake.",
        "SQL Server / Snowflake : Snowflake met un nom sans guillemets en MAJUSCULES (Power BI voit `NOM`). Avec guillemets, la casse devient obligatoire (`\"client\"` n'est plus `client`) : ne mélange pas les deux."
      ],
      retenir: "Texte entre apostrophes (doublée dedans), nom spécial entre [ ] ou \" \", et toujours une valeur du même type que la colonne."
    },
    {
      titre: "Calculer et tester sans table",
      exemple: "SELECT 10 + 5 * 2      AS calcul,\n       10 % 3          AS reste,\n       39.90 * NULL    AS vide,\n       'CDE-' + '1001' AS num_cde;   -- Snowflake : 'CDE-' || '1001'",
      resultat: [["calcul", "reste", "vide", "num_cde"], [20, 1, null, "CDE-1001"]],
      regle: "Un `SELECT` sait aussi calculer : chaque calcul ou fonction devient une colonne du résultat. Sans `FROM`, il ne lit aucune table et rend une seule ligne, comme une calculette. Le calcul suit les priorités des maths ; des parenthèses rendent l'intention claire. Une case vide (NULL) rend vide tout le calcul où elle entre. La remplacer par 0 n'est juste que si « vide » veut vraiment dire zéro.",
      points: [
        "Ce qui se passe : une seule ligne, sans table. `SELECT` sans `FROM` calcule des expressions : idéal pour tester une formule ou une fonction avant de la mettre dans une vraie requête.",
        "Pourquoi 20 et pas 30 : la multiplication passe avant l'addition, comme à l'école : 10 + (5 × 2). Mets des parenthèses pour lever le doute. `%` donne le reste de la division : 10 % 3 = 1.",
        "Le piège : `39.90 * NULL` donne NULL. Un montant vide dans Power BI vient souvent d'une quantité manquante multipliée par un prix.",
        "Le bon réflexe : `COALESCE(qte, 0)` remplace la case vide par 0, si c'est vraiment le sens voulu (module m02 : NULL et ses pièges).",
        "SQL Server / Snowflake : `+` colle deux textes sur SQL Server. Sur Snowflake, `+` essaie d'additionner et plante sur 'CDE-' : écris `||`. `CONCAT()` marche sur les deux."
      ],
      retenir: "Teste sans FROM. NULL contamine tout calcul. Multiplication avant addition : mets des parenthèses."
    },
    {
      titre: "Détails utiles",
      points: [
        "Nom complet d'une table : `Ventes.dbo.facture`, c'est-à-dire base.schéma.table. Une 4e partie devant (`SRV_ERP.Divalto.dbo.article`) lit une table sur un autre serveur : pratique, souvent lent.",
        "Une virgule oubliée, `SELECT nom ville`, renomme `nom` en `ville` sans erreur : écris toujours `AS` devant un alias. Une virgule en trop avant `FROM` plante.",
        "Une vue (une requête enregistrée sous un nom) exige un nom unique par colonne : un alias sur chaque calcul, jamais deux `id`. Encore une raison d'éviter `SELECT *`.",
        "`f.*` donne toutes les colonnes d'une seule table ; `*, montant_ht * 1.2 AS ttc` ajoute un calcul. Snowflake : `* EXCLUDE (siren)` retire une colonne.",
        "`TOP (@n)` avec une variable exige les parenthèses ; `TOP (10) PERCENT` arrondit au-dessus (10 % de 15 lignes = 2) ; avec DISTINCT : `SELECT DISTINCT TOP (3)`.",
        "Les mots-clés s'écrivent en majuscules ou non, la mise en page est libre. `--` commente jusqu'à la fin de la ligne, `/* … */` plusieurs lignes. Un `;` finit chaque instruction, obligatoire avant `WITH`.",
        "Une petite table écrite dans la requête : `FROM (VALUES (1, 'FR'), (2, 'BE')) AS t(id, pays)`, pratique pour une correspondance codes → libellés."
      ],
      retenir: "Écris AS devant chaque alias, un alias sur chaque calcul, et le schéma devant chaque table."
    }
  ],
  differences: [
    ["Limiter les lignes", "`TOP (n)`", "`LIMIT n` (TOP accepté)"],
    ["Paginer", "`OFFSET … FETCH`", "`LIMIT … OFFSET`"],
    ["Alias du SELECT dans WHERE / GROUP BY", "Interdit", "Accepté"],
    ["NULL dans ORDER BY ASC", "En premier", "En dernier"],
    ["Nom spécial", "`[Mon Nom]`", "`\"Mon Nom\"`"],
    ["Casse des noms", "Selon la collation", "MAJUSCULES sans guillemets"],
    ["Concaténer", "`+`", "`||`"],
    ["Espaces de fin", "Ignorés", "Comptés"],
    ["Toutes les colonnes sauf…", "Impossible", "`SELECT * EXCLUDE (col)`"],
    ["Créer une table depuis une requête", "`SELECT … INTO`", "`CREATE TABLE … AS SELECT`"]
  ]
};
