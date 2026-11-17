// Conseils d'architecte, famille « Interroger » (format : docs/architecte.md).
// Résultats des exemples recalculés avec SQLite sur docs/base-exemple.sql (scratchpad architecte/interroger/scripts/verif.py) :
// CA par client et par mois (6 lignes, AquaBleu 7165.00 en mars et 7950.00 en avril ; par nom seul, Piscines Dumont 2659.80) ;
// commande × lignes (AquaBleu 30230.00 au lieu de 15115.00 ; SUM(DISTINCT) : 1290.00 au client 2) ; COUNT 7 / 5 / 4 ;
// COUNT conditionnel avec ELSE 0 (client 2 : 2 au lieu de 0) ; prix moyen CHL-5 37.18 / 36.02 ; flux LEFT JOIN commande
// LEFT JOIN client (6 lignes ; INNER : 5) ; lignes × flux (CDE-1001 : 9560.00 et 4 flux) ; LEFT + filtre dans le WHERE
// (piscinistes : 2 lignes au lieu de 6) ; commande × client sans condition (56) ; commandes de mars sans flux (NOT EXISTS : CDE-1002 ;
// NOT IN : 0 ligne) ; BETWEEN du 1er au 16 mars sur date_recu (3 flux au lieu de 4) ; TTC > 3000 (CDE-1001, CDE-1007).
// Calculés avec Python (zoneinfo, decimal) : flux d'avril en heure de Paris (07/04 et 08/04) ; 1er avril 0 h à Paris =
// 31/03 22:00 UTC ; 29/03/2026 = 23 h, 25/10/2026 = 25 h ; 7 h à Paris = la veille à Los Angeles toute l'année ; semaines
// ISO (29/12/2025 = semaine 1 de 2026 ; 01/01/2027 = semaine 53 de 2026) ; 3 × ROUND(0,333 ; 2) = 0,99, ROUND(0,999 ; 2) =
// 1,00 ; vendredi 3/04/2026 + 2 jours ouvrés (lundi de Pâques le 6) = mercredi 8/04.
// Sources lues le 16/11/2026 (pages gardées dans scratchpad architecte/interroger/pages) : learn.microsoft.com (AVG, SUM,
// COUNT, APPROX_COUNT_DISTINCT, GROUP BY, GROUPING, FROM, data-type-precedence, collation-precedence, IN, BETWEEN,
// post-migration guide, DATEDIFF, GETDATE, AT TIME ZONE, DATEPART, SET DATEFIRST, EOMONTH, TRY_CONVERT, datetime2,
// IS DISTINCT FROM, GENERATE_SERIES, FORMAT, CAST et CONVERT, ROUND, DATENAME, scalar UDF inlining, fonctions
// déterministes, TRY_CAST, index sur colonnes calculées, sys.dm_exec_function_stats, Power BI : tables de dates et
// date/heure automatique) ; docs.snowflake.com en .md (AVG, SUM, COUNT, COUNT_IF, APPROX_COUNT_DISTINCT, GROUP BY,
// ROLLUP, JOIN, collation, conversion de types, LIKE, ILIKE, Search Optimization, micro-partitions, Query Profile,
// paramètres, types date et heure, DATEDIFF, CURRENT_DATE, CURRENT_TIMESTAMP, CONVERT_TIMEZONE, TRY_TO_DATE, ROUND,
// modèles de format, formats de date, CREATE FUNCTION, TRY_CAST, UDF, EQUAL_NULL, SET) ; dev.mysql.com/doc/refman/8.4
// (group-by-handling, aggregate-functions, group-by-modifiers, select, sql-mode, join, outer-join-simplification,
// type-conversion, charset-*, comparison-operators, index-btree-hash, create-index, case-sensitivity, datetime,
// time-zone-support, date-and-time-functions, with, string-functions, mathematical-functions, cast-functions,
// create-procedure, stored-programs-logging) ; Divalto (Jointures auto résolues et CAST implicites).
// Relecture testeur (17/11/2026) : chiffres recalculés avec SQLite et Python ; MySQL : texte → nombre = avertissement
// dans un SELECT, erreur en INSERT / UPDATE strict (type-conversion, sql-mode, load-data) ; SQL Server : « MISSING JOIN
// PREDICATE » (set-showplan-all), DATETIME arrondi au 1/300 s et '23:59:59.999' → lendemain (datetime), FORMAT et CLR
// hébergé par le moteur (format, clr-integration), SCHEMABINDING (deterministic functions) ; Snowflake : WEEK_START,
// WEEK_OF_YEAR_POLICY (functions-date-time) ; Power BI : marquer la table de dates (desktop-date-tables).
LEARNSQL.architecte = (LEARNSQL.architecte || []).concat([
  {
    id: "agreger",
    titre: "Je fais un agrégat",
    famille: "Interroger",
    resume: "Les questions avant un `GROUP BY` : le grain du résultat, les lignes qui entrent, COUNT, SUM et AVG face aux NULL, le type du calcul, les totaux et l'arrondi.",
    besoins: [
      "je fais un total avec group by",
      "calculer une somme ou une moyenne par client",
      "compter les commandes par mois",
      "les questions à se poser avant un group by"
    ],
    essais: [
      "chiffre d affaires par client et par mois",
      "count distinct ou count etoile",
      "faire des sous totaux avec rollup"
    ],
    exemple: {
      texte: "Le contrôle de gestion veut le chiffre d'affaires (CA) par client et par mois, pour Power BI. Il faut un agrégat : une fonction qui résume plusieurs lignes en une valeur (`SUM`, `COUNT`, `AVG`). Avant d'écrire le `GROUP BY`, tu fixes le grain, le niveau de détail d'une ligne : un client et un mois. Voici la requête qu'on obtient : 6 lignes, dont 2 pour AquaBleu (7 165 € en mars, 7 950 € en avril).",
      code: "-- Grain : une ligne = un client et un mois (commandes non annulées)\nSELECT cl.code, cl.nom,\n       DATEFROMPARTS(YEAR(co.date_cde), MONTH(co.date_cde), 1) AS mois,\n       COUNT(*)           AS nb_cdes,\n       SUM(co.montant_ht) AS ca_ht\nFROM dbo.commande AS co\nJOIN dbo.client   AS cl ON cl.id = co.client_id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom, DATEFROMPARTS(YEAR(co.date_cde), MONTH(co.date_cde), 1)\nORDER BY cl.code, mois;",
      codes: {
        snowflake: "-- Grain : une ligne = un client et un mois (commandes non annulées)\nSELECT cl.code, cl.nom,\n       DATE_TRUNC('month', co.date_cde) AS mois,\n       COUNT(*)           AS nb_cdes,\n       SUM(co.montant_ht) AS ca_ht\nFROM commande AS co\nJOIN client   AS cl ON cl.id = co.client_id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom, mois      -- Snowflake accepte l'alias\nORDER BY cl.code, mois;",
        mysql: "-- Grain : une ligne = un client et un mois (commandes non annulées)\nSELECT cl.code, cl.nom,\n       CAST(DATE_FORMAT(co.date_cde, '%Y-%m-01') AS DATE) AS mois,\n       COUNT(*)           AS nb_cdes,\n       SUM(co.montant_ht) AS ca_ht\nFROM commande AS co\nJOIN client   AS cl ON cl.id = co.client_id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom, mois      -- MySQL accepte l'alias\nORDER BY cl.code, mois;"
      }
    },
    etapes: [
      {
        titre: "Le grain du résultat",
        questions: [
          {
            id: "grain",
            q: "Que représente UNE ligne du résultat ?",
            pourquoi: "Le grain, c'est le niveau de détail d'une ligne. S'il est flou, le `GROUP BY` l'est aussi : une colonne de trop multiplie les lignes, une colonne en moins mélange deux mois.",
            reflexe: "Écris-le en une phrase : « une ligne = un client et un mois ». Les colonnes du `GROUP BY` sont les mots de cette phrase, pas une de plus."
          },
          {
            id: "cle-groupe",
            q: "Groupes-tu sur une clé, ou sur un libellé ?",
            pourquoi: "Deux clients peuvent porter le même nom. Grouper sur `nom` fusionne les deux agences Piscines Dumont (C002 et C006) : 2 659,80 € pour un client qui n'existe pas.",
            reflexe: "Groupe sur la clé (`cl.code` ou `cl.id`), et ajoute le libellé à côté : `GROUP BY cl.code, cl.nom`. Le nom suit la clé, il ne la remplace pas."
          },
          {
            id: "periode",
            q: "Ton regroupement par mois garde-t-il l'année ?",
            pourquoi: "`MONTH(date_cde)` vaut 3 en mars 2025 comme en mars 2026. Sur deux ans d'historique, le rapport additionne les deux mois de mars, sans erreur.",
            reflexe: "Groupe sur le 1er jour du mois : une vraie date, qui garde l'année et se trie bien. Power BI la relie ensuite à sa table de dates.",
            moteurs: {
              sqlserver: "`DATEFROMPARTS(YEAR(d), MONTH(d), 1)`, ou `DATETRUNC(month, d)` depuis SQL Server 2022.",
              snowflake: "`DATE_TRUNC('month', d)`.",
              mysql: "Pas de `DATE_TRUNC` : `CAST(DATE_FORMAT(d, '%Y-%m-01') AS DATE)`."
            }
          },
          {
            id: "groupes-vides",
            q: "Les groupes sans aucune ligne doivent-ils apparaître ?",
            pourquoi: "`GROUP BY` ne crée que les groupes qui ont des lignes. Un client sans commande, ou un mois sans vente, disparaît : la moyenne par mois est fausse, et personne ne voit le trou.",
            reflexe: "Pars de la liste complète (la table client, une table calendrier d'une ligne par jour), puis `LEFT JOIN` vers les commandes et `COALESCE(SUM(…), 0)`. Voir l'astuce « Afficher 0 pour les clients sans commande »."
          }
        ]
      },
      {
        titre: "Les lignes qui entrent",
        questions: [
          {
            id: "jointure-avant",
            q: "Une jointure faite avant l'agrégat multiplie-t-elle des lignes ?",
            pourquoi: "Joindre une commande à ses lignes répète son montant sur chacune. `SUM(co.montant_ht)` donne alors 30 230 € à AquaBleu, au lieu de 15 115 €. Aucune erreur ne s'affiche.",
            reflexe: "Additionne chaque montant à son grain : `SUM(li.qte * li.prix_unit)` pour les lignes. Ou agrège chaque table avant de la joindre. Compte les lignes avant et après la jointure."
          },
          {
            id: "lignes-exclues",
            q: "Quelles lignes ne doivent pas compter : annulées, avoirs, essais ?",
            pourquoi: "Le CA n'a pas la même définition partout. Une commande annulée ou une commande d'essai gonfle le total ; un avoir oublié aussi. Deux rapports donnent alors deux chiffres.",
            reflexe: "Écris la règle avec le métier, puis dans le `WHERE` : `statut <> 'ANNULEE'`. Mets-la à un seul endroit (une vue), pour que tous les rapports comptent pareil."
          },
          {
            id: "devise-unite",
            q: "Les valeurs additionnées sont-elles dans la même devise et la même unité ?",
            pourquoi: "Des euros additionnés à des francs suisses, ou des kilos à des pièces : le total ne veut plus rien dire. Aucune erreur ne s'affiche. Si Pool & Garden, à Genève, est facturé en francs suisses, ses montants se mêlent aux euros dans le CA.",
            reflexe: "Regarde d'abord ce qui se mélange : `GROUP BY devise`. Convertis avant de sommer, au taux retenu par la compta, ou garde un total par devise. Les quantités : ramène-les à une seule unité."
          },
          {
            id: "where-having",
            q: "Ton filtre porte-t-il sur les lignes ou sur les groupes ?",
            pourquoi: "`WHERE` trie les lignes avant le regroupement, `HAVING` trie les groupes après. « Nouveaux clients 2026 » avec un `WHERE` sur la date : tous les clients de l'année deviennent nouveaux.",
            reflexe: "Condition sur une colonne (statut, date) : `WHERE`, le plus tôt possible. Condition sur un agrégat : `HAVING`. Nouveaux clients : `HAVING MIN(date_cde) >=` le 1er janvier, sans `WHERE` sur la date."
          }
        ]
      },
      {
        titre: "Compter et additionner",
        questions: [
          {
            id: "quoi-compter",
            q: "COUNT(*), COUNT(colonne) ou COUNT(DISTINCT) : que comptes-tu vraiment ?",
            pourquoi: "« Combien de clients ? » a trois réponses : 7 fiches (`COUNT(*)`), 5 SIREN renseignés (`COUNT(siren)`), 4 SIREN différents (`COUNT(DISTINCT siren)`). Chaque rapport prend la sienne, et les chiffres divergent.",
            reflexe: "Dis ce que tu comptes : des lignes, des valeurs renseignées, ou des valeurs différentes. Après un `LEFT JOIN`, compte la clé de droite (`COUNT(co.id)`), pas `COUNT(*)`.",
            moteurs: {
              sqlserver: "`COUNT` rend un `INT` : au-delà de 2,1 milliards de lignes, `COUNT_BIG`.",
              snowflake: "`COUNT(DISTINCT a, b)` compte les couples. Attention : `COUNT(co.*)` ne compte que les lignes qui n'ont aucun NULL.",
              mysql: "`COUNT(DISTINCT a, b)` compte aussi les couples."
            }
          },
          {
            id: "conditionnel",
            q: "Comptes-tu sous condition, avec un CASE dans l'agrégat ?",
            pourquoi: "`COUNT(CASE WHEN canal = 'EDI' THEN 1 ELSE 0 END)` compte toutes les lignes : 0 n'est pas NULL. Le client 2 affiche 2 commandes EDI, il n'en a aucune.",
            reflexe: "Avec `COUNT`, pas de `ELSE` : `COUNT(CASE WHEN canal = 'EDI' THEN 1 END)`. Avec `SUM`, un `ELSE 0`. Une colonne par condition, en une seule lecture de la table.",
            moteurs: {
              snowflake: "`COUNT_IF(canal = 'EDI')`. Sa doc : il rend NULL quand aucune ligne ne vérifie la condition. Ajoute `COALESCE(…, 0)`."
            }
          },
          {
            id: "null-valeurs",
            q: "Des NULL dans la colonne changent-ils le résultat ?",
            pourquoi: "`SUM` et `AVG` sautent les NULL : la moyenne de 10, 20 et NULL vaut 15, pas 10. Un délai vide sort du calcul, et la moyenne paraît meilleure qu'elle n'est.",
            reflexe: "Décide avec le métier : un vide vaut 0 (`AVG(COALESCE(x, 0))`), ou il est inconnu (laisse-le). Affiche aussi le nombre de vides : `COUNT(*) - COUNT(x)`."
          },
          {
            id: "aucune-ligne",
            q: "Que doit afficher le total quand aucune ligne ne correspond ?",
            pourquoi: "Sur zéro ligne, `COUNT` rend 0, mais `SUM` et `AVG` rendent NULL. Le 1er du mois, le CA s'affiche vide, et `ca - avoirs` devient NULL.",
            reflexe: "`COALESCE(SUM(montant_ht), 0)` quand 0 a un sens pour le lecteur. Teste la requête sur une période vide avant de la livrer."
          },
          {
            id: "type-calcul",
            q: "Le type de la colonne change-t-il le résultat de AVG ou de SUM ?",
            pourquoi: "Sur des entiers, une moyenne peut perdre ses décimales : 150 et 5 donnent 77 au lieu de 77,5. Un total trop grand peut aussi dépasser la limite du type, et la requête plante.",
            reflexe: "Fixe le type du calcul : `AVG(qte * 1.0)`, ou `AVG(CAST(qte AS DECIMAL(12,2)))`. Pour un très gros total d'entiers, convertis en `BIGINT` avant de sommer.",
            moteurs: {
              sqlserver: "`AVG` d'un `INT` rend un `INT` (coupé). `SUM` d'un `INT` reste un `INT` : `SUM(CAST(qte AS BIGINT))`. `AVG` d'un `DECIMAL` sort avec au moins 6 décimales.",
              snowflake: "`AVG` d'entiers garde les décimales. `SUM` d'une colonne texte la convertit en `FLOAT`, un nombre approché.",
              mysql: "`SUM` et `AVG` d'entiers ou de `DECIMAL` rendent un `DECIMAL` : pas de décimales perdues."
            }
          },
          {
            id: "ponderee",
            q: "Une moyenne simple, ou une moyenne pondérée par les quantités ?",
            pourquoi: "`AVG(prix_unit)` donne le même poids à 8 seaux et à 150 seaux : 37,18 € au lieu de 36,02 € pour le chlore 5 kg. La moyenne de moyennes trompe de la même façon.",
            reflexe: "Garde les sommes jusqu'au bout, divise à la fin : `SUM(qte * prix_unit) / NULLIF(SUM(qte), 0)`. `NULLIF` change le 0 en NULL : pas de division par zéro."
          }
        ]
      },
      {
        titre: "Le GROUP BY",
        questions: [
          {
            id: "colonnes-groupees",
            q: "Chaque colonne du SELECT est-elle groupée ou agrégée ?",
            pourquoi: "Une colonne ni groupée ni agrégée n'a pas une seule valeur par groupe. Selon le moteur, la requête plante, ou elle affiche une valeur prise au hasard.",
            reflexe: "Mets dans le `GROUP BY` toutes les colonnes non agrégées du `SELECT`. Si une seule valeur du groupe suffit, dis-le : `MAX(nom)`.",
            moteurs: {
              sqlserver: "Erreur si une colonne manque. L'alias du `SELECT` est refusé dans le `GROUP BY` : répète l'expression.",
              snowflake: "`GROUP BY ALL` groupe sur toutes les colonnes non agrégées. L'alias est permis, mais une colonne de même nom passe avant lui. `ANY_VALUE(nom)` donne une valeur du groupe.",
              mysql: "`ONLY_FULL_GROUP_BY` (actif par défaut) refuse la requête. Désactivé, MySQL prend une valeur quelconque du groupe, sans erreur : garde-le. `ANY_VALUE(nom)` si c'est voulu."
            }
          },
          {
            id: "null-groupe",
            q: "Les NULL de la colonne groupée forment-ils un vrai groupe ?",
            pourquoi: "`GROUP BY` réunit toutes les cases vides dans un seul groupe. En cherchant les SIREN en double, Bleu Lagon et Pool & Garden sortent ensemble : deux clients sans rapport.",
            reflexe: "Écarte les vides avant de grouper (`WHERE siren IS NOT NULL`), ou donne-leur un libellé assumé : « Non renseigné »."
          }
        ]
      },
      {
        titre: "Le résultat final",
        questions: [
          {
            id: "arrondi",
            q: "Arrondis-tu chaque ligne, ou seulement le total ?",
            pourquoi: "Trois lignes à 0,333 € : arrondies une à une, elles font 0,99 € ; le total arrondi fait 1,00 €. Le rapport et la compta ont un centime d'écart.",
            reflexe: "Calcule en pleine précision, arrondis à la fin, une seule fois. Si la compta arrondit chaque ligne (la TVA par ligne), suis sa règle, et écris-la en commentaire."
          },
          {
            id: "totaux",
            q: "Faut-il des sous-totaux et un total général ?",
            pourquoi: "Une 2e requête pour le total peut filtrer autrement. Et sur une ligne de total, la colonne totalisée vaut NULL, comme une vraie case vide : on confond les deux.",
            reflexe: "`ROLLUP` donne le détail, les sous-totaux et le total en une requête. Repère les lignes de total avec `GROUPING(col) = 1`, jamais avec `IS NULL`. Pour Power BI, envoie le détail : il fait les totaux.",
            moteurs: {
              mysql: "`WITH ROLLUP` ou `ROLLUP (…)`, et `GROUPING()`. Pas de `CUBE` ni de `GROUPING SETS`."
            }
          },
          {
            id: "approche",
            q: "Un compte approché suffit-il, sur un très gros volume ?",
            pourquoi: "`COUNT(DISTINCT)` sur des centaines de millions de lignes demande beaucoup de mémoire et de temps. Pour une tendance (articles vus, clients actifs), un chiffre à 2 % près suffit souvent.",
            reflexe: "`APPROX_COUNT_DISTINCT(col)` pour un tableau de tendance. Jamais pour un chiffre comptable, une facture ou un contrôle : là, `COUNT(DISTINCT)`.",
            moteurs: {
              sqlserver: "Depuis SQL Server 2019. Sa doc : au plus 2 % d'erreur, dans 97 % des cas.",
              snowflake: "`APPROX_COUNT_DISTINCT` (autre nom : `HLL`), avec la méthode HyperLogLog.",
              mysql: "Pas de compte approché : `COUNT(DISTINCT)`."
            }
          },
          {
            id: "controle",
            q: "Le total colle-t-il à la source (Divalto, la compta) ?",
            pourquoi: "Un agrégat faux ne plante jamais. L'erreur se voit le jour où quelqu'un compare avec l'ERP, souvent en réunion.",
            reflexe: "Compare ton total général avec la source : la somme du détail doit égaler le total de Divalto ou de la balance. Garde ce contrôle dans le script, et relance-le à chaque changement."
          }
        ]
      }
    ],
    pieges: [
      "Le montant de la commande additionné après la jointure avec ses lignes : AquaBleu à 30 230 € au lieu de 15 115 €, sans aucun message.",
      "Réparer une somme gonflée avec `SUM(DISTINCT …)` : les deux commandes à 1 290 € du client 2 n'en font plus qu'une.",
      "Grouper sur le nom : les deux agences Piscines Dumont (C002 et C006) deviennent un seul client.",
      "`GROUP BY MONTH(date_cde)` sur deux ans d'historique : mars 2025 et mars 2026 s'additionnent.",
      "`SUM` sur aucune ligne rend NULL : le CA du 1er du mois s'affiche vide dans le rapport.",
      "Sur SQL Server, `AVG` d'une colonne entière coupe les décimales : 150 et 5 donnent 77.",
      "MySQL sans `ONLY_FULL_GROUP_BY` : une colonne oubliée dans le `GROUP BY` prend une valeur au hasard du groupe.",
      "Les NULL d'un `ROLLUP` pris pour de vraies cases vides : `COALESCE(motif, 'Sous-total')` mélange le détail et le total."
    ],
    pratique: "Pour Power BI, envoie le détail au bon grain : le modèle fait les totaux et les moyennes. Un agrégat SQL sert à réduire un gros volume, ou à figer un chiffre validé avec la compta.",
    motsCles: ["group by", "agrégat", "total", "somme", "moyenne", "compter", "count", "sum", "avg", "having", "rollup", "sous-total", "grain", "chiffre d'affaires", "par mois"],
    voirAussi: ["joindre", "filtrer", "dates", "fenetre", "doublons", "donnees-powerbi"],
    dico: ["group-by", "having", "count", "sum", "avg", "rollup", "coalesce", "round"],
    outils: ["astuces", "traduire"],
    sources: [
      { titre: "AVG (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/avg-transact-sql" },
      { titre: "APPROX_COUNT_DISTINCT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/approx-count-distinct-transact-sql" },
      { titre: "Snowflake : COUNT", url: "https://docs.snowflake.com/en/sql-reference/functions/count" },
      { titre: "Snowflake : COUNT_IF", url: "https://docs.snowflake.com/en/sql-reference/functions/count_if" },
      { titre: "Snowflake : SUM", url: "https://docs.snowflake.com/en/sql-reference/functions/sum" },
      { titre: "Snowflake : GROUP BY", url: "https://docs.snowflake.com/en/sql-reference/constructs/group-by" },
      { titre: "MySQL 8.4 : MySQL Handling of GROUP BY", url: "https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html" },
      { titre: "MySQL 8.4 : Aggregate Function Descriptions", url: "https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html" }
    ]
  },
  {
    id: "joindre",
    titre: "Je joins des tables",
    famille: "Interroger",
    resume: "Les questions avant un `JOIN` : la clé complète, les lignes en face, INNER ou LEFT, les NULL et les types des clés, le compte avant et après.",
    besoins: [
      "je fais une jointure entre deux tables",
      "faire une jointure",
      "joindre les commandes et les clients",
      "choisir entre inner join et left join"
    ],
    essais: [
      "ma jointure multiplie les lignes",
      "left join qui perd des lignes",
      "full outer join en mysql",
      "jointure entre l erp et les flux edi"
    ],
    exemple: {
      texte: "Ton suivi EDI doit montrer chaque flux reçu, même rejeté, avec sa commande et son client quand ils existent. Il faut des jointures : une jointure relie deux tables par une condition, écrite après `ON`. Avant d'écrire les `JOIN`, tu comptes les flux (6), tu choisis `LEFT JOIN`, puis tu recomptes : toujours 6 lignes. Le flux 3, rejeté, garde sa ligne, avec des NULL à droite.",
      code: "SELECT COUNT(*) AS nb_flux FROM dbo.flux_edi;          -- avant : 6\n\nSELECT f.id AS flux, f.type, f.statut,\n       co.num_cde, cl.nom AS client\nFROM dbo.flux_edi AS f\nLEFT JOIN dbo.commande AS co ON co.id = f.cde_id       -- un flux : 0 ou 1 commande\nLEFT JOIN dbo.client   AS cl ON cl.id = co.client_id   -- LEFT aussi, sinon le flux 3 disparaît\nORDER BY f.id;                                         -- après : 6 lignes",
      codes: {
        snowflake: "SELECT COUNT(*) AS nb_flux FROM flux_edi;          -- avant : 6\n\nSELECT f.id AS flux, f.type, f.statut,\n       co.num_cde, cl.nom AS client\nFROM flux_edi AS f\nLEFT JOIN commande AS co ON co.id = f.cde_id       -- un flux : 0 ou 1 commande\nLEFT JOIN client   AS cl ON cl.id = co.client_id   -- LEFT aussi, sinon le flux 3 disparaît\nORDER BY f.id;                                     -- après : 6 lignes",
        mysql: "SELECT COUNT(*) AS nb_flux FROM flux_edi;          -- avant : 6\n\nSELECT f.id AS flux, f.type, f.statut,\n       co.num_cde, cl.nom AS client\nFROM flux_edi AS f\nLEFT JOIN commande AS co ON co.id = f.cde_id       -- un flux : 0 ou 1 commande\nLEFT JOIN client   AS cl ON cl.id = co.client_id   -- LEFT aussi, sinon le flux 3 disparaît\nORDER BY f.id;                                     -- après : 6 lignes"
      }
    },
    etapes: [
      {
        titre: "Les clés",
        questions: [
          {
            id: "grain-tables",
            q: "Que représente une ligne de chaque table, et du résultat ?",
            pourquoi: "Joindre la commande (une ligne par commande) à ses lignes (une par article) change le grain du résultat, son niveau de détail : une ligne par article. Le montant de la commande s'y répète.",
            reflexe: "Écris le grain de chaque table et celui du résultat voulu : « une ligne = un flux EDI ». Puis vérifie que chaque jointure le garde."
          },
          {
            id: "cle-complete",
            q: "Ta condition ON couvre-t-elle toutes les colonnes de la clé ?",
            pourquoi: "Une clé à deux colonnes jointe sur une seule mélange les lignes. Dans Divalto, le dossier (DOS) fait partie des clés : l'oublier relie les commandes de deux dossiers.",
            reflexe: "Lis la clé primaire, ou unique, de la table d'en face. Mets toutes ses colonnes dans le `ON` : `ON a.societe = b.societe AND a.num_cde = b.num_cde`."
          },
          {
            id: "cardinalite",
            q: "Pour une ligne, combien de lignes en face : zéro, une ou plusieurs ?",
            pourquoi: "En « un à plusieurs », la ligne de gauche est copiée. Deux tables qui pointent vers la même commande (lignes et flux) se croisent : 2 × 2 = 4 copies, et CDE-1001 vaut 9 560 € au lieu de 4 780 €.",
            reflexe: "Vérifie que la clé est unique du côté « un » : `GROUP BY cle HAVING COUNT(*) > 1` doit être vide. Deux tables qui pointent vers la même commande : agrège chacune avant de la joindre."
          },
          {
            id: "versions-datees",
            q: "La table d'en face garde-t-elle plusieurs versions datées (tarif, taux, adresse) ?",
            pourquoi: "Un article qui a eu 3 tarifs donne 3 lignes pour chaque ligne de commande : le CA triple, sans erreur. Ou bien la requête prend le tarif d'aujourd'hui pour une commande de mars.",
            reflexe: "Joins aussi sur la période : `ON t.article_id = li.article_id AND co.date_cde >= t.date_debut AND co.date_cde < t.date_fin`. Vérifie qu'une seule version couvre chaque date : ni trou, ni chevauchement."
          },
          {
            id: "compter",
            q: "As-tu compté les lignes avant et après chaque jointure ?",
            pourquoi: "Une jointure qui perd ou qui double des lignes ne donne aucune erreur. Le seul signe, c'est un nombre de lignes qui change.",
            reflexe: "`COUNT(*)` de la table de départ, puis après chaque `JOIN`, une jointure à la fois. Ici : 6 flux avant, 6 lignes après. Chaque écart doit s'expliquer.",
            moteurs: {
              sqlserver: "Le plan d'exécution réel (le chemin suivi par le moteur) montre, pour chaque jointure, les lignes estimées et les lignes réelles.",
              snowflake: "Le Query Profile (le plan détaillé de Snowflake) montre les lignes qui entrent et qui sortent de chaque jointure. Sa doc appelle « exploding join » une jointure qui en produit bien plus qu'elle n'en reçoit."
            }
          }
        ]
      },
      {
        titre: "Le type de jointure",
        questions: [
          {
            id: "existe",
            q: "As-tu besoin des colonnes d'en face, ou seulement de savoir qu'une ligne existe ?",
            pourquoi: "Pour lister les clients qui ont commandé, `JOIN commande` sort AquaBleu 3 fois : une fois par commande. Un `DISTINCT` ajouté pour corriger cache le problème, qui revient dès qu'on affiche une colonne de la commande.",
            reflexe: "Pour « au moins une ligne en face » : `WHERE EXISTS (SELECT 1 FROM commande AS co WHERE co.client_id = cl.id)`. Une ligne par client, sans `DISTINCT`. Garde le `JOIN` pour afficher des colonnes d'en face."
          },
          {
            id: "inner-left",
            q: "Une ligne sans partenaire en face doit-elle rester ?",
            pourquoi: "`INNER JOIN` garde seulement ce qui existe des deux côtés. Le flux 3, rejeté et sans commande, disparaît : le suivi EDI ne montre plus les rejets.",
            reflexe: "`INNER` pour « présent des deux côtés ». `LEFT` pour garder toute la table de départ, avec des NULL quand l'autre côté manque. Choisis selon la question métier, puis recompte."
          },
          {
            id: "left-where",
            q: "Une condition sur la table de droite d'un LEFT JOIN est-elle dans le WHERE ?",
            pourquoi: "Le `WHERE` passe après la jointure. `WHERE co.statut = 'EN_COURS'` retire les lignes où `co` est NULL : le `LEFT` redevient un `INNER`, et les clients sans commande disparaissent.",
            reflexe: "Filtre de la table de droite : dans le `ON` (`AND co.statut = 'EN_COURS'`). Filtre de la table de gauche : dans le `WHERE`."
          },
          {
            id: "chaine-left",
            q: "Après un LEFT JOIN, les jointures suivantes gardent-elles les lignes NULL ?",
            pourquoi: "Flux `LEFT JOIN` commande, puis `INNER JOIN` client : le client du flux 3 est NULL, et la ligne disparaît. Le `LEFT` du début ne sert plus à rien.",
            reflexe: "Enchaîne des `LEFT JOIN` depuis la table de départ, comme dans l'exemple. Puis recompte : le résultat garde le nombre de lignes de la table de départ."
          },
          {
            id: "full",
            q: "Dois-tu garder les lignes seules des deux côtés, pour un rapprochement ?",
            pourquoi: "Comparer l'ERP et l'EDI avec un `LEFT JOIN` ne montre qu'un sens des écarts : les commandes sans flux, mais pas les flux sans commande.",
            reflexe: "`FULL OUTER JOIN`, chaque côté filtré avant la jointure (dans une CTE, une requête nommée avec `WITH`), et une colonne d'état : « Manque ERP », « Manque EDI », « OK ».",
            moteurs: {
              mysql: "Pas de `FULL OUTER JOIN`. Écris un `LEFT JOIN`, puis `UNION ALL` des lignes de droite sans partenaire (`… LEFT JOIN … WHERE gauche.id IS NULL`). La fiche FULL OUTER JOIN du dico donne la requête entière."
            }
          },
          {
            id: "cartesien",
            q: "Chaque table a-t-elle sa condition de jointure ?",
            pourquoi: "Une condition oubliée croise tout avec tout : c'est le produit cartésien. 10 000 × 10 000 = 100 millions de lignes. Ici, 8 commandes × 7 clients = 56 lignes, sans erreur.",
            reflexe: "Écris chaque jointure `JOIN … ON`, jamais la virgule dans le `FROM`. Un vrai croisement s'écrit `CROSS JOIN`, avec un commentaire qui dit pourquoi.",
            moteurs: {
              sqlserver: "Un `JOIN` sans `ON` est une erreur de syntaxe. Avec la virgule et sans condition, le plan avertit : « No Join Predicate » dans SSMS (« MISSING JOIN PREDICATE » avec `SET SHOWPLAN_ALL`).",
              snowflake: "Un `JOIN` sans `ON` croise tout, comme un `CROSS JOIN` (sa doc).",
              mysql: "`JOIN`, `INNER JOIN` et `CROSS JOIN` y sont équivalents : sans `ON`, tout est croisé (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Les valeurs des clés",
        questions: [
          {
            id: "null-cles",
            q: "Une colonne de jointure peut-elle être NULL ?",
            pourquoi: "NULL n'est égal à rien, même pas à NULL. Une ligne à clé vide ne trouve jamais de partenaire : `INNER JOIN` la perd, `LEFT JOIN` lui met des NULL.",
            reflexe: "Compte les clés vides avant (`WHERE cde_id IS NULL`). Si deux vides doivent se joindre, écris-le : `a IS NOT DISTINCT FROM b`.",
            moteurs: {
              sqlserver: "`IS NOT DISTINCT FROM` depuis SQL Server 2022. Avant : `(a = b OR (a IS NULL AND b IS NULL))`.",
              snowflake: "`IS NOT DISTINCT FROM`, ou `EQUAL_NULL(a, b)`.",
              mysql: "L'opérateur `<=>`, l'égalité qui accepte les NULL : `a <=> b`."
            }
          },
          {
            id: "meme-type",
            q: "Les deux colonnes de la jointure ont-elles le même type ?",
            pourquoi: "Texte d'un côté, nombre de l'autre : le moteur convertit seul, c'est une conversion implicite. L'index (la table des matières de la table) ne sert plus, et une valeur comme 'A12' fait planter la requête, ou devient 0.",
            reflexe: "Compare les types avant (`INFORMATION_SCHEMA.COLUMNS`). Corrige le type de la colonne. Sinon, convertis toi-même l'autre côté, et laisse nue la colonne de la grosse table, celle qui a l'index.",
            moteurs: {
              sqlserver: "Le type de plus faible priorité est converti : `INT` passe avant `VARCHAR`, donc toute la colonne texte est convertie. Le plan montre `CONVERT_IMPLICIT`.",
              snowflake: "Convertit aussi seul. Si une valeur ne se convertit pas, la requête échoue.",
              mysql: "Texte contre nombre : les deux deviennent des nombres à virgule. 'x6' vaut 0, et l'index de la colonne texte ne sert plus (sa doc)."
            }
          },
          {
            id: "format-cle",
            q: "Les deux clés ont-elles le même format : zéros, espaces, majuscules ?",
            pourquoi: "'0042' n'égale pas '42', et 'C001 ' n'égale pas toujours 'C001'. La jointure perd des lignes, sans erreur, et seulement sur certaines valeurs.",
            reflexe: "Nettoie une fois, au chargement (`TRIM`, `UPPER`, zéros devant), plutôt que dans chaque `ON` : une fonction dans le `ON` empêche l'index.",
            moteurs: {
              sqlserver: "`=` ignore les espaces de fin. La casse suit la collation de la colonne : souvent ignorée.",
              snowflake: "Compare exactement, par défaut : la casse et les espaces de fin comptent.",
              mysql: "La collation par défaut (`utf8mb4_0900_ai_ci`) ignore la casse et les accents, mais compte les espaces de fin."
            }
          },
          {
            id: "collation",
            q: "Les deux colonnes texte ont-elles la même collation ?",
            pourquoi: "La collation, c'est la règle de comparaison des textes (casse, accents). L'ERP et l'entrepôt de données peuvent en avoir deux différentes : la jointure plante, ou compare autrement que prévu.",
            reflexe: "Vérifie la collation des deux colonnes. Si elles diffèrent, impose-en une dans le `ON`, avec `COLLATE`. Mieux : la même collation dès la création des tables.",
            moteurs: {
              sqlserver: "Erreur « Cannot resolve the collation conflict… ». Ajoute d'un côté : `ON a.code = b.code COLLATE French_CI_AS`.",
              snowflake: "Deux collations différentes au même niveau : erreur « Incompatible collations ». Ajoute `COLLATE 'fr'` d'un côté.",
              mysql: "Erreur « Illegal mix of collations ». Ajoute `COLLATE` d'un côté."
            }
          }
        ]
      },
      {
        titre: "Lisible et rapide",
        questions: [
          {
            id: "alias",
            q: "Chaque table a-t-elle un alias clair, et chaque colonne son alias ?",
            pourquoi: "Avec `a`, `b`, `c`, il faut remonter au `FROM` pour comprendre. Une colonne sans alias devient ambiguë le jour où l'autre table en reçoit une du même nom : la requête plante.",
            reflexe: "Des alias qui parlent (`f` pour flux, `co` pour commande, `cl` pour client), et `alias.colonne` partout, même quand le nom est unique."
          },
          {
            id: "index-cle",
            q: "Les colonnes de jointure sont-elles indexées ?",
            pourquoi: "Sans index sur la clé étrangère, chaque jointure sur une grosse table la lit en entier. La requête rapide en recette devient lente en production.",
            reflexe: "Un index sur la colonne de jointure du côté « plusieurs » (`commande.client_id`). Compare le plan avant et après.",
            moteurs: {
              sqlserver: "Aucun index n'est créé seul sur une clé étrangère : crée-le.",
              snowflake: "Pas d'index classique : filtre chaque table tôt, et lis le Query Profile, son plan détaillé. Un index secondaire (édition Enterprise) ne sert qu'aux recherches très sélectives.",
              mysql: "InnoDB crée l'index de la clé étrangère s'il manque."
            }
          }
        ]
      }
    ],
    pieges: [
      "Un `LEFT JOIN` suivi d'un `WHERE` sur la table de droite : le `LEFT` redevient un `INNER`, et les clients sans commande disparaissent.",
      "Joindre les lignes et les flux à la même commande : 2 × 2 = 4 copies, et CDE-1001 vaut 9 560 € au lieu de 4 780 €.",
      "`DISTINCT` pour cacher des doublons de jointure : la somme reste fausse, et une vraie ligne en double disparaît.",
      "Une clé texte jointe à une clé nombre : conversion implicite, index perdu, et une valeur 'A12' qui fait planter la requête sur SQL Server.",
      "Une clé à deux colonnes (dossier et numéro) jointe sur une seule : les commandes de deux dossiers se mélangent.",
      "Une jointure migrée de SQL Server vers Snowflake : 'c001' et 'C001' ne se joignent plus, sans erreur.",
      "Un `INNER JOIN` placé après un `LEFT JOIN` : les lignes gardées par le `LEFT` disparaissent quand même."
    ],
    pratique: "Dans Divalto, le dossier (DOS) est en tête des clés, et c'est un texte : mets-le dans chaque `ON`, comparé à un texte. Une table commune à tous les dossiers se joint sur le dossier commun (999).",
    motsCles: ["join", "jointure", "joindre", "inner join", "left join", "full outer join", "produit cartésien", "clé de jointure", "lignes multipliées", "cardinalité", "collation", "rapprochement", "alias", "null"],
    voirAussi: ["agreger", "filtrer", "relier-tables", "doublons", "sous-requete", "requete-lente", "historiser"],
    dico: ["inner-join", "left-join", "full-outer-join", "cross-join", "exists", "is-distinct-from", "conversion-implicite", "collate"],
    outils: ["traduire", "astuces"],
    sources: [
      { titre: "FROM et JOIN (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/from-transact-sql" },
      { titre: "Priorité des types de données (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/data-type-precedence-transact-sql" },
      { titre: "Snowflake : JOIN", url: "https://docs.snowflake.com/en/sql-reference/constructs/join" },
      { titre: "Snowflake : collation", url: "https://docs.snowflake.com/en/sql-reference/collation" },
      { titre: "Snowflake : Query Profile (exploding joins)", url: "https://docs.snowflake.com/en/user-guide/ui-snowsight-activity" },
      { titre: "MySQL 8.4 : JOIN Clause", url: "https://dev.mysql.com/doc/refman/8.4/en/join.html" },
      { titre: "MySQL 8.4 : Type Conversion in Expression Evaluation", url: "https://dev.mysql.com/doc/refman/8.4/en/type-conversion.html" },
      { titre: "Divalto : Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" }
    ]
  },
  {
    id: "filtrer",
    titre: "Je filtre des lignes",
    famille: "Interroger",
    resume: "Les questions avant un `WHERE` : la règle métier, les NULL, AND et OR, les bornes de dates, le type de la valeur, la casse et l'index.",
    besoins: [
      "je filtre des lignes avec un where",
      "écrire une condition where sans se tromper",
      "filtrer les commandes d'une période",
      "les questions à se poser avant un where"
    ],
    essais: [
      "ma requete ne ramene rien avec not in",
      "where colonne = null ne marche pas",
      "filtre between sur une date avec heure",
      "conditions and or et parentheses"
    ],
    exemple: {
      texte: "Tu contrôles les commandes saisies à la main : celles de mars 2026, non annulées, qui n'ont reçu aucun flux EDI. Le filtre semble simple. Il cache trois pièges : la plage de dates, le NULL de la table des flux, et `NOT IN`. Voici la version relue : elle rend CDE-1002. Écrite avec `NOT IN`, elle ne rendrait rien.",
      code: "SELECT co.num_cde, co.canal, co.date_cde\nFROM dbo.commande AS co\nWHERE co.statut <> 'ANNULEE'\n  AND co.date_cde >= '20260301'                -- 1er mars inclus\n  AND co.date_cde <  '20260401'                -- 1er avril exclu\n  AND NOT EXISTS (SELECT 1 FROM dbo.flux_edi AS f\n                  WHERE f.cde_id = co.id)      -- pas NOT IN : cde_id a un NULL\nORDER BY co.date_cde;",
      codes: {
        snowflake: "SELECT co.num_cde, co.canal, co.date_cde\nFROM commande AS co\nWHERE co.statut <> 'ANNULEE'\n  AND co.date_cde >= '2026-03-01'              -- 1er mars inclus\n  AND co.date_cde <  '2026-04-01'              -- 1er avril exclu\n  AND NOT EXISTS (SELECT 1 FROM flux_edi AS f\n                  WHERE f.cde_id = co.id)      -- pas NOT IN : cde_id a un NULL\nORDER BY co.date_cde;",
        mysql: "SELECT co.num_cde, co.canal, co.date_cde\nFROM commande AS co\nWHERE co.statut <> 'ANNULEE'\n  AND co.date_cde >= '2026-03-01'              -- 1er mars inclus\n  AND co.date_cde <  '2026-04-01'              -- 1er avril exclu\n  AND NOT EXISTS (SELECT 1 FROM flux_edi AS f\n                  WHERE f.cde_id = co.id)      -- pas NOT IN : cde_id a un NULL\nORDER BY co.date_cde;"
      }
    },
    etapes: [
      {
        titre: "La règle métier",
        questions: [
          {
            id: "regle",
            q: "La règle du filtre est-elle écrite avec le métier ?",
            pourquoi: "« Les commandes de mars » : date de commande, de livraison ou de facture ? Annulées comprises ? Sans règle écrite, deux rapports filtrent autrement et donnent deux chiffres.",
            reflexe: "Écris la règle en une phrase, validée par le métier : « saisies du 1er au 31 mars, hors annulées ». Puis traduis chaque mot en une condition, avec un commentaire."
          },
          {
            id: "valeurs",
            q: "Connais-tu toutes les valeurs réelles de la colonne filtrée ?",
            pourquoi: "Selon le moteur, `statut = 'LIVREE'` rate 'Livree' ou 'LIVREE ' (un espace à la fin) saisis à la main : Snowflake rate les deux ; MySQL 8, le second ; SQL Server (collation CI), aucun. Le filtre perd ces lignes, sans erreur.",
            reflexe: "Regarde d'abord les valeurs et leur nombre : `SELECT statut, COUNT(*) FROM commande GROUP BY statut`. Voir l'astuce « Lister les valeurs d'une colonne et leur nombre »."
          }
        ]
      },
      {
        titre: "NULL et logique",
        questions: [
          {
            id: "null",
            q: "La colonne filtrée peut-elle être NULL ?",
            pourquoi: "NULL veut dire « inconnu » : `siren = NULL` ne trouve rien, et `ville <> 'Lyon'` oublie Camping Les Flots, dont la ville est vide. Aucun message ne prévient.",
            reflexe: "`IS NULL` et `IS NOT NULL` sont les seuls tests qui voient un vide. Pour garder les vides : `ville <> 'Lyon' OR ville IS NULL`."
          },
          {
            id: "not-in",
            q: "La liste d'un NOT IN peut-elle contenir un NULL ?",
            pourquoi: "Un seul NULL dans la liste, et `NOT IN` ne rend aucune ligne. Le flux 3 n'a pas de commande : `id NOT IN (SELECT cde_id FROM flux_edi)` rend 0 ligne, au lieu de CDE-1002.",
            reflexe: "Écris `NOT EXISTS`, comme dans l'exemple. Si tu gardes `NOT IN`, retire les NULL de la liste : `WHERE cde_id IS NOT NULL`."
          },
          {
            id: "and-or",
            q: "Mélanges-tu AND et OR dans la même condition ?",
            pourquoi: "`AND` passe avant `OR`. `ville = 'Lyon' OR ville = 'Grenoble' AND type = 'PRO'` garde AquaBleu, une grande surface de Lyon, dans la liste des piscinistes.",
            reflexe: "Des parenthèses dès qu'un `OR` apparaît : `(ville = 'Lyon' OR ville = 'Grenoble') AND type = 'PRO'`. Ou `ville IN ('Lyon', 'Grenoble')`."
          }
        ]
      },
      {
        titre: "Les dates",
        questions: [
          {
            id: "bornes",
            q: "La colonne a-t-elle une heure, et tes bornes en tiennent-elles compte ?",
            pourquoi: "`BETWEEN` le 1er et le 16 mars s'arrête le 16 à minuit (0 h). Le flux 3, reçu le 16 mars à 6 h 05, sort du résultat : 3 flux au lieu de 4.",
            reflexe: "`>=` le premier jour, `<` le lendemain du dernier : ici `>=` 1er mars et `<` 17 mars. Cette forme reste juste avec ou sans heure."
          },
          {
            id: "litteral",
            q: "La date écrite dans ta requête sera-t-elle lue comme tu le crois ?",
            pourquoi: "'03/04/2026' est le 3 avril en France, le 4 mars aux États-Unis. Selon le format et le moteur, la date s'inverse, ou la requête plante.",
            reflexe: "Écris les dates dans un format sans ambiguïté, celui que ton moteur lit pareil partout. Ne compte jamais sur la langue du serveur.",
            moteurs: {
              sqlserver: "'20260301' (AAAAMMJJ) est lu pareil dans toutes les langues. '2026-03-01' peut s'inverser avec l'ancien type `DATETIME`. Avec l'heure : '2026-03-01T06:00:00'.",
              snowflake: "Écris '2026-03-01'. '20260301' est lu comme des secondes depuis 1970, sans erreur."
            }
          }
        ]
      },
      {
        titre: "L'index",
        questions: [
          {
            id: "colonne-nue",
            q: "La colonne filtrée reste-t-elle nue, sans fonction ni calcul autour ?",
            pourquoi: "`YEAR(date_cde) = 2026` ou `UPPER(nom) = 'AQUABLEU'` : le moteur calcule chaque ligne avant de comparer. L'index (la table des matières de la table) ne sert plus, et tout est lu.",
            reflexe: "Mets le calcul du côté de la valeur : une plage de dates, `montant_ht > 1000 / 1.2`. Si la fonction est inévitable, indexe son résultat (voir « J'utilise une fonction sur chaque ligne »).",
            moteurs: {
              sqlserver: "Le plan d'exécution (le chemin suivi par le moteur) montre un Scan (tout lire) au lieu d'un Seek (aller droit au but).",
              snowflake: "L'élagage (sauter les blocs de la table, les micro-partitions) se perd souvent. Le Query Profile, son plan détaillé, compare les partitions lues au total.",
              mysql: "L'index ne sert pas, sauf un index sur l'expression elle-même (« functional key part »)."
            }
          },
          {
            id: "like",
            q: "Ton LIKE commence-t-il par un joker (%) ?",
            pourquoi: "`LIKE '%CHL%'` ne peut pas suivre l'ordre de l'index : le moteur lit toutes les lignes. Sur une grosse table, chaque recherche se paie en entier.",
            reflexe: "Écris le début connu : `LIKE 'CHL%'` peut utiliser l'index. Une recherche « contient » fréquente demande un autre outil : la recherche plein texte.",
            moteurs: {
              snowflake: "`LIKE` compte la casse, `ILIKE` l'ignore. Search Optimization (édition Enterprise, payante) peut accélérer `LIKE '%…%'`.",
              mysql: "L'index sert si le motif est une constante qui ne commence pas par un joker (sa doc)."
            }
          },
          {
            id: "type-valeur",
            q: "La valeur comparée a-t-elle le même type que la colonne ?",
            pourquoi: "`siren = 512345678` compare un nombre à une colonne texte : chaque SIREN est converti, l'index ne sert plus, et un SIREN avec une lettre fait planter la requête, ou devient 0.",
            reflexe: "Écris la valeur dans le type de la colonne : `siren = '512345678'`. Un paramètre (Power BI, script, application) prend aussi le type exact de la colonne.",
            moteurs: {
              sqlserver: "Un paramètre `NVARCHAR` comparé à une colonne `VARCHAR` peut aussi forcer la conversion de la colonne. Le plan montre `CONVERT_IMPLICIT`.",
              mysql: "Une colonne texte comparée à un nombre n'utilise pas l'index, et 'x6' = 0 est vrai."
            }
          },
          {
            id: "sous-requete",
            q: "Le filtre compare-t-il la colonne au résultat d'une sous-requête ?",
            pourquoi: "Snowflake n'élague pas les micro-partitions avec un filtre qui contient une sous-requête, même si elle rend une seule valeur. `WHERE date_recu >= (SELECT MAX(…) …)` lit toute la table.",
            reflexe: "Calcule d'abord la valeur dans une variable, puis filtre avec elle : `SET d = (SELECT MAX(date_cde) FROM commande);` puis `WHERE date_cde >= $d`.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Le texte",
        questions: [
          {
            id: "casse",
            q: "Le filtre doit-il ignorer les majuscules et les accents ?",
            pourquoi: "`nom = 'aquableu'` trouve AquaBleu sur SQL Server (collation CI), rien sur Snowflake. 'Geneve' trouve 'Genève' sur MySQL, pas en `French_CI_AS`. Même requête, résultats différents.",
            reflexe: "Connais la collation de la colonne, sa règle de comparaison des textes. Sur un moteur qui compte la casse, compare les deux côtés en majuscules, ou nettoie au chargement.",
            moteurs: {
              sqlserver: "Selon la collation : `French_CI_AS` ignore la casse (CI) mais compte les accents (AS).",
              snowflake: "Compte la casse et les accents par défaut. `ILIKE` ignore la casse ; une collation (`COLLATE 'fr-ci'`) aussi, mais elle peut ralentir et réduire l'élagage.",
              mysql: "`utf8mb4_0900_ai_ci`, la collation par défaut, ignore la casse et les accents."
            }
          }
        ]
      },
      {
        titre: "Avec une jointure",
        questions: [
          {
            id: "on-where",
            q: "Avec un LEFT JOIN, ce filtre va-t-il dans le ON ou dans le WHERE ?",
            pourquoi: "Dans le `WHERE`, un filtre sur la table de droite retire les lignes sans partenaire. Les piscinistes sans commande en cours disparaissent : 2 lignes au lieu de 6.",
            reflexe: "Table de droite : le filtre dans le `ON`. Table de gauche : dans le `WHERE`. Recompte les lignes après chaque déplacement."
          }
        ]
      },
      {
        titre: "Vérifier",
        questions: [
          {
            id: "exclus",
            q: "As-tu regardé les lignes que ton filtre retire ?",
            pourquoi: "Un filtre faux ne plante jamais : il rend trop ou pas assez de lignes. Personne ne le voit, jusqu'au jour où un chiffre ne colle plus.",
            reflexe: "Compte avant et après le filtre. Puis lance le filtre inverse, sans oublier les NULL (`WHERE NOT (condition) OR colonne IS NULL`), et lis quelques lignes écartées."
          }
        ]
      }
    ],
    pieges: [
      "`WHERE siren = NULL` : 0 ligne, sans erreur. Il faut `IS NULL`.",
      "`NOT IN (SELECT cde_id FROM flux_edi)` avec un seul NULL : 0 ligne, et le contrôle « commandes sans flux » paraît en ordre.",
      "`BETWEEN` sur une date avec heure : le dernier jour s'arrête à minuit, et ses lignes disparaissent.",
      "`YEAR(date_cde) = 2026` : le résultat est juste, mais toute la table est lue à chaque fois.",
      "Un `OR` sans parenthèses : une grande surface entre dans la liste des piscinistes.",
      "Une requête migrée vers Snowflake : `statut = 'livree'` ne trouve plus rien, car la casse compte.",
      "Un filtre sur la table de droite d'un `LEFT JOIN`, placé dans le `WHERE` : les lignes sans partenaire disparaissent."
    ],
    pratique: "Dans Divalto, les champs CE et DOS sont du texte : écris `CE4 = '1'`, pas `CE4 = 1`. Sinon, le moteur doit convertir, et il n'utilise plus les index qui contiennent ces champs.",
    motsCles: ["where", "filtre", "filtrer", "condition", "is null", "not in", "not exists", "between", "like", "and or", "parenthèses", "période", "casse", "index", "conversion implicite"],
    voirAussi: ["joindre", "dates", "comparer-texte", "fonction-scalaire", "sous-requete", "requete-lente"],
    dico: ["where", "is-null", "in", "between", "like", "ilike", "and-or-not", "exists"],
    outils: ["astuces", "traduire"],
    sources: [
      { titre: "IN (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/in-transact-sql" },
      { titre: "BETWEEN (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/between-transact-sql" },
      { titre: "Guide de validation et d'optimisation après migration (prédicats SARGable)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/post-migration-validation-and-optimization-guide" },
      { titre: "Snowflake : LIKE", url: "https://docs.snowflake.com/en/sql-reference/functions/like" },
      { titre: "Snowflake : micro-partitions et élagage", url: "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions" },
      { titre: "Snowflake : collation", url: "https://docs.snowflake.com/en/sql-reference/collation" },
      { titre: "MySQL 8.4 : B-Tree Index (LIKE)", url: "https://dev.mysql.com/doc/refman/8.4/en/index-btree-hash.html" },
      { titre: "Divalto : Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" }
    ]
  },
  {
    id: "dates",
    titre: "Je calcule avec des dates",
    famille: "Interroger",
    resume: "Les questions avant un calcul de date : le type de la colonne, le fuseau horaire, les bornes de la période, DATEDIFF, les semaines, les jours ouvrés, le calendrier.",
    besoins: [
      "ajouter des jours ou des mois à une date",
      "calculer un écart entre deux dates",
      "gérer les fuseaux horaires et l'heure d'été",
      "les questions à se poser sur une colonne date"
    ],
    essais: [
      "datediff donne un an pour un seul jour",
      "numero de semaine iso et changement d annee",
      "heure utc ou heure de paris sur snowflake",
      "jours ouvres entre deux dates avec les feries"
    ],
    exemple: {
      texte: "Le tableau de bord EDI compte les flux reçus chaque jour d'avril, en heure de Paris. Le serveur EDI horodate `date_recu` en UTC (le temps universel). Avant d'écrire la requête, tu fixes : le type de la colonne, son fuseau, et les bornes de la période en UTC. Résultat : un flux le 7 avril, un le 8.",
      code: "-- date_recu : DATETIME2 en UTC ; le jour métier est celui de Paris\nSELECT CAST(f.date_recu AT TIME ZONE 'UTC'\n            AT TIME ZONE 'Romance Standard Time' AS date) AS jour_paris,\n       COUNT(*) AS nb_flux\nFROM dbo.flux_edi AS f\nWHERE f.date_recu >= '2026-03-31T22:00:00'   -- 1er avril, 0 h à Paris (UTC+2)\n  AND f.date_recu <  '2026-04-30T22:00:00'   -- 1er mai, 0 h à Paris : exclu\nGROUP BY CAST(f.date_recu AT TIME ZONE 'UTC'\n              AT TIME ZONE 'Romance Standard Time' AS date)\nORDER BY jour_paris;",
      codes: {
        snowflake: "-- date_recu : TIMESTAMP_NTZ en UTC ; le jour métier est celui de Paris\nSELECT CONVERT_TIMEZONE('UTC', 'Europe/Paris', f.date_recu)::DATE AS jour_paris,\n       COUNT(*) AS nb_flux\nFROM flux_edi AS f\nWHERE f.date_recu >= '2026-03-31 22:00:00'   -- 1er avril, 0 h à Paris (UTC+2)\n  AND f.date_recu <  '2026-04-30 22:00:00'   -- 1er mai, 0 h à Paris : exclu\nGROUP BY jour_paris\nORDER BY jour_paris;",
        mysql: "-- date_recu : DATETIME en UTC ; 'Europe/Paris' exige les tables de fuseaux du serveur\nSELECT DATE(CONVERT_TZ(f.date_recu, '+00:00', 'Europe/Paris')) AS jour_paris,\n       COUNT(*) AS nb_flux\nFROM flux_edi AS f\nWHERE f.date_recu >= '2026-03-31 22:00:00'   -- 1er avril, 0 h à Paris (UTC+2)\n  AND f.date_recu <  '2026-04-30 22:00:00'   -- 1er mai, 0 h à Paris : exclu\nGROUP BY jour_paris\nORDER BY jour_paris;"
      }
    },
    etapes: [
      {
        titre: "Le type de la colonne",
        questions: [
          {
            id: "type",
            q: "La colonne est-elle une date seule, ou une date avec heure ?",
            pourquoi: "Le calcul en dépend. Sur une date avec heure, une égalité avec un jour ne trouve que les lignes de minuit. Et une date rangée en texte se trie mal : '10/03' passe après '01/04'.",
            reflexe: "Regarde le type exact avant d'écrire : date seule, date et heure, avec ou sans fuseau. Une date en texte se convertit une fois, au chargement, pas dans chaque requête.",
            moteurs: {
              sqlserver: "`DATE`, `DATETIME2` (le type moderne), `DATETIME` (l'ancien, arrondi au 1/300 de seconde), `DATETIMEOFFSET` (avec le décalage horaire).",
              snowflake: "`DATE` ; `TIMESTAMP` vaut `TIMESTAMP_NTZ` (sans fuseau) par défaut, selon le paramètre `TIMESTAMP_TYPE_MAPPING`.",
              mysql: "`DATE`, `DATETIME` (sans fuseau), `TIMESTAMP` (rangé en UTC, de 1970 à 2038)."
            }
          },
          {
            id: "jour",
            q: "Faut-il comparer des jours, alors que la colonne a une heure ?",
            pourquoi: "Un regroupement sur la date et l'heure donne une ligne par instant différent, pas une par jour. Et un filtre « = ce jour-là » ne trouve que minuit pile.",
            reflexe: "Pour afficher ou grouper par jour : `CAST(date_recu AS DATE)`. Pour filtrer un jour : une plage, de 0 h ce jour-là à 0 h le lendemain, exclu. Voir l'astuce « Enlever l'heure d'une date »."
          }
        ]
      },
      {
        titre: "Le fuseau et l'horloge",
        questions: [
          {
            id: "fuseau",
            q: "La valeur est-elle rangée en UTC, ou en heure locale ?",
            pourquoi: "Un flux reçu à 23 h 30 UTC appartient au lendemain à Paris. Mélanger l'ERP (heure locale) et l'EDI (UTC) décale les comptages d'une ou deux heures, et parfois d'un jour.",
            reflexe: "Écris le fuseau dans le nom ou la description de la colonne (`date_recu_utc`). Range les horodatages en UTC ; convertis en heure locale seulement pour afficher, ou pour trouver le jour métier.",
            moteurs: {
              sqlserver: "`DATETIMEOFFSET` garde le décalage. `AT TIME ZONE` (depuis 2016) convertit, heure d'été comprise ; ses fuseaux sont ceux de Windows (`sys.time_zone_info`).",
              snowflake: "`TIMESTAMP_NTZ` : sans fuseau. `TIMESTAMP_LTZ` : rangé en UTC, montré au fuseau de la session. `TIMESTAMP_TZ` : garde le décalage.",
              mysql: "`TIMESTAMP` est converti en UTC au stockage, puis vers le fuseau de la session à la lecture. `DATETIME` n'est jamais converti."
            }
          },
          {
            id: "maintenant",
            q: "Quelle heure donne « maintenant » sur ce serveur ?",
            pourquoi: "« Maintenant » vient de l'horloge du serveur, qui n'est pas forcément à l'heure de Paris. Sur Snowflake laissé sur Los Angeles, un traitement lancé à 7 h à Paris prend la veille pour « aujourd'hui ».",
            reflexe: "Sache quelle horloge tu lis. Dans les traitements, prends l'UTC ; fixe le fuseau de la session quand le jour métier compte. Teste à l'heure réelle du traitement.",
            moteurs: {
              sqlserver: "`GETDATE()` et `CURRENT_TIMESTAMP` donnent l'heure du système du serveur ; Azure SQL Database suit l'UTC. `SYSUTCDATETIME()` donne l'UTC.",
              snowflake: "`CURRENT_TIMESTAMP` et `CURRENT_DATE` suivent le paramètre `TIMEZONE`, réglé sur America/Los_Angeles par défaut : `ALTER SESSION SET TIMEZONE = 'Europe/Paris';`.",
              mysql: "`NOW()` suit le fuseau de la session (`time_zone`), par défaut celui du serveur. `UTC_TIMESTAMP()` donne l'UTC."
            }
          },
          {
            id: "heure-ete",
            q: "Le calcul traverse-t-il un changement d'heure ?",
            pourquoi: "À Paris, le 29 mars 2026 dure 23 heures et le 25 octobre 25 heures. Une durée calculée en heure locale se trompe d'une heure, et une heure de la nuit d'octobre existe deux fois.",
            reflexe: "Calcule les durées en UTC. Convertis en heure locale seulement à la fin, pour afficher ou pour trouver le jour métier.",
            moteurs: {
              sqlserver: "`AT TIME ZONE` gère le changement d'heure : une heure locale dans le « trou » de mars est décalée d'une heure (sa doc).",
              snowflake: "`TIMESTAMP_TZ` garde le décalage (+01:00), pas le fuseau : ajoute six mois, et le décalage reste celui de l'hiver (sa doc)."
            }
          },
          {
            id: "date-du-jour",
            q: "La date du jour est-elle lue une seule fois dans le traitement ?",
            pourquoi: "Un traitement de nuit lit l'heure dans cinq instructions : celles qui passent après minuit calculent un autre « hier ». Les fichiers du même traitement ne collent plus entre eux.",
            reflexe: "Lis la date une fois, au début, dans une variable. Déduis toutes les autres dates de cette variable.",
            moteurs: {
              sqlserver: "`DECLARE @jour date = CAST(GETDATE() AS date);`",
              snowflake: "`SET jour = CURRENT_DATE();` puis `$jour`.",
              mysql: "`SET @jour = CURDATE();`. Dans une même instruction, `NOW()` ne bouge pas ; `SYSDATE()` change à chaque appel."
            }
          }
        ]
      },
      {
        titre: "La période",
        questions: [
          {
            id: "demi-ouvert",
            q: "Tes périodes vont-elles du début inclus au début suivant exclu ?",
            pourquoi: "Avec `BETWEEN` ou `<= '… 23:59:59'`, une ligne peut tomber dans deux mois, ou dans aucun (23:59:59,5). Les totaux des mois ne font plus le total de l'année.",
            reflexe: "Chaque période va de son début inclus au début de la suivante exclu : `>=` 1er avril et `<` 1er mai. Chaque instant tombe dans une seule période, avec ou sans heure.",
            moteurs: {
              sqlserver: "Avec `DATETIME`, `'… 23:59:59.999'` est arrondi au lendemain, 0 h (sa doc) : une borne `<=` du 31 mars prend aussi les lignes du 1er avril à 0 h."
            }
          },
          {
            id: "fin-de-mois",
            q: "As-tu besoin du dernier jour du mois, ou d'ajouter des mois ?",
            pourquoi: "« Le 30 » ou « le 31 » écrits en dur sont faux en février. Et un mois ajouté au 31 janvier donne le 28 février : une échéance glisse.",
            reflexe: "Une fonction de fin de mois pour afficher. Pour une borne, préfère le 1er du mois suivant, exclu. Teste janvier, février et une année bissextile.",
            moteurs: {
              sqlserver: "`EOMONTH(d)`. Le 1er du mois : `DATETRUNC(month, d)` (2022) ou `DATEFROMPARTS(YEAR(d), MONTH(d), 1)`.",
              snowflake: "`LAST_DAY(d)`. Le 1er du mois : `DATE_TRUNC('month', d)`.",
              mysql: "`LAST_DAY(d)`. Pas de `DATE_TRUNC` : `CAST(DATE_FORMAT(d, '%Y-%m-01') AS DATE)`."
            }
          }
        ]
      },
      {
        titre: "Les écarts",
        questions: [
          {
            id: "datediff",
            q: "DATEDIFF mesure-t-il vraiment ce que tu crois ?",
            pourquoi: "DATEDIFF compte les frontières franchies, pas une durée. Du 31/12/2025 au 01/01/2026, il donne 1 an pour un seul jour. Un âge sort avec un an de trop avant l'anniversaire.",
            reflexe: "Compte dans la petite unité utile (des jours), puis convertis. Pour des années pleines, retire 1 si l'anniversaire n'est pas encore passé. Voir l'astuce « Calculer un âge ou une ancienneté en années ».",
            moteurs: {
              sqlserver: "`DATEDIFF(year, '20251231', '20260101')` vaut 1 (sa doc : « boundaries crossed »).",
              snowflake: "Même règle : seule l'unité demandée compte (sa doc). `DATEDIFF(year, '2025-12-31'::DATE, '2026-01-01'::DATE)` vaut donc 1.",
              mysql: "`DATEDIFF(fin, début)` compte des jours seulement, dans l'ordre inverse. `TIMESTAMPDIFF(YEAR, début, fin)` compte des années complètes."
            }
          },
          {
            id: "ouvres",
            q: "Faut-il des jours ouvrés, ou des jours de calendrier ?",
            pourquoi: "Une commande du vendredi 3 avril 2026, livrée en 2 jours ouvrés : le week-end et le lundi de Pâques passent, elle arrive le 8, 5 jours plus tard au calendrier. Le taux de retard est faux.",
            reflexe: "Une table calendrier avec une colonne « ouvré », fériés compris, tenue à jour chaque année. Compte ses jours ouvrés entre les deux dates. Voir l'astuce « Compter les jours ouvrés entre deux dates »."
          },
          {
            id: "semaines",
            q: "Quelle semaine veux-tu : ISO (lundi, norme européenne), ou celle du moteur ?",
            pourquoi: "Les moteurs ne numérotent pas tous les semaines pareil. En ISO, le lundi 29/12/2025 est dans la semaine 1 de 2026 : grouper par année civile et semaine ISO crée une fausse semaine 1 de 2025.",
            reflexe: "Prends la semaine ISO avec l'année ISO, toujours ensemble. Le plus simple : les deux colonnes dans la table calendrier, calculées une fois. Voir l'astuce « Trouver le numéro de semaine (norme ISO) ».",
            moteurs: {
              sqlserver: "`DATEPART(iso_week, d)`, mais aucune partie « année ISO ». `week` et `weekday` dépendent de `SET DATEFIRST` (7, le dimanche, en anglais américain).",
              snowflake: "`WEEKISO` et `YEAROFWEEKISO` suivent toujours l'ISO. `WEEK` dépend de `WEEK_START` et de `WEEK_OF_YEAR_POLICY` ; `DAYOFWEEK` et `DATE_TRUNC('week', d)`, de `WEEK_START` seulement.",
              mysql: "`WEEK(d, 3)` donne la semaine ISO ; `YEARWEEK(d, 3)`, l'année et la semaine. Sans mode, `WEEK` suit `default_week_format`."
            }
          }
        ]
      },
      {
        titre: "Les dates douteuses",
        questions: [
          {
            id: "invalides",
            q: "Une date reçue en texte peut-elle être invalide ou ambiguë ?",
            pourquoi: "Un fichier EDI avec '20260230' ou '00000000' : un `CAST` plante et bloque tout l'import. Et '03/04/2026' peut être lu 3 avril ou 4 mars.",
            reflexe: "Convertis avec le format écrit en toutes lettres, et une fonction qui rend NULL au lieu de planter. Liste les NULL obtenus avant de charger.",
            moteurs: {
              sqlserver: "`TRY_CONVERT(date, x, 112)` : NULL si impossible (112 = AAAAMMJJ).",
              snowflake: "`TRY_TO_DATE(x, 'YYYYMMDD')`. Sans format, une chaîne de chiffres est lue comme des secondes depuis 1970.",
              mysql: "`STR_TO_DATE(x, '%Y%m%d')` rend NULL, avec un avertissement, quand le texte ne se lit pas."
            }
          },
          {
            id: "fausse-date",
            q: "La colonne contient-elle de fausses dates, comme 1900-01-01 ou 9999-12-31 ?",
            pourquoi: "Une date inconnue saisie '1900-01-01' passe pour une vraie : un délai calculé depuis elle dépasse 126 ans, et la moyenne explose. Une fin '9999-12-31' fausse les durées de la même façon.",
            reflexe: "Compte-les avant de calculer : `WHERE d < '1990-01-01' OR d > '2099-12-31'`, bornes à fixer avec le métier. Écarte-les du calcul, ou change-les en NULL au chargement. Voir « Je choisis le type de chaque colonne ».",
            moteurs: {
              mysql: "Cherche aussi '0000-00-00' : `LOAD DATA` avec `LOCAL` ou `IGNORE` y range une date illisible, avec un simple avertissement (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Le calendrier",
        questions: [
          {
            id: "calendrier",
            q: "Ton rapport a-t-il une table calendrier ?",
            pourquoi: "Sans elle, les jours sans vente disparaissent, et chaque rapport recalcule semaine et exercice à sa façon. Power BI crée en plus, par défaut, une table de dates cachée pour chaque colonne date (« Date/heure automatique »).",
            reflexe: "Une table en base : une ligne par jour, sans trou ni doublon, sur des années entières, avec semaine ISO, ouvré, férié, exercice. Dans Power BI, marque-la comme table de dates si sa doc le demande (clé AAAAMMJJ, fonctions de temps classiques).",
            moteurs: {
              sqlserver: "Les jours se génèrent avec `GENERATE_SERIES` (SQL Server 2022, niveau de compatibilité 160).",
              snowflake: "Les jours se génèrent avec `TABLE(GENERATOR(ROWCOUNT => n))`. Numérote-les avec `ROW_NUMBER()` : sa doc prévient que `SEQ4()` peut laisser des trous.",
              mysql: "Avec une CTE récursive : `cte_max_recursion_depth` vaut 1000 par défaut, moins de 3 ans de jours. Augmente-le pour la session."
            }
          }
        ]
      }
    ],
    pieges: [
      "Une période écrite avec `<= '… 23:59:59'` : les fractions de la dernière seconde tombent entre deux mois.",
      "`DATEDIFF(year, …)` pour un âge : un an de trop avant l'anniversaire.",
      "Une date gardée en texte 'JJ/MM/AAAA' : le tri est faux, et jour et mois s'inversent selon la langue du serveur.",
      "Snowflake laissé sur America/Los_Angeles : à 7 h à Paris, `CURRENT_DATE` donne encore la veille.",
      "Grouper par `YEAR(d)` et semaine ISO : le 29 décembre 2025 tombe dans une fausse « semaine 1 de 2025 ».",
      "Des heures UTC (EDI) et locales (ERP) dans le même calcul : les flux de la nuit changent de jour.",
      "MySQL : `CONVERT_TZ(d, 'UTC', 'Europe/Paris')` rend NULL quand les tables de fuseaux du serveur ne sont pas chargées."
    ],
    pratique: "Génère la table calendrier une fois, en base, pour 10 ans, avec les fériés et l'exercice de ta société. Power BI, Excel et tes requêtes partagent alors les mêmes semaines et les mêmes jours ouvrés.",
    motsCles: ["date", "dates", "datediff", "dateadd", "fuseau horaire", "utc", "heure d'été", "fin de mois", "semaine iso", "jours ouvrés", "table calendrier", "timestamp", "période", "getdate", "aujourd'hui"],
    voirAussi: ["filtrer", "agreger", "formater", "choisir-types", "donnees-powerbi", "importer-fichier"],
    dico: ["datediff", "dateadd", "eomonth", "datepart", "getdate", "datetimeoffset", "timestamp-ltz", "to-date"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "DATEDIFF (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/datediff-transact-sql" },
      { titre: "GETDATE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/getdate-transact-sql" },
      { titre: "AT TIME ZONE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/at-time-zone-transact-sql" },
      { titre: "DATEPART (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/datepart-transact-sql" },
      { titre: "Snowflake : paramètres (TIMEZONE, WEEK_START)", url: "https://docs.snowflake.com/en/sql-reference/parameters" },
      { titre: "Snowflake : types date et heure", url: "https://docs.snowflake.com/en/sql-reference/data-types-datetime" },
      { titre: "MySQL 8.4 : Date and Time Functions", url: "https://dev.mysql.com/doc/refman/8.4/en/date-and-time-functions.html" },
      { titre: "Power BI : tables de dates", url: "https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-date-tables" }
    ]
  },
  {
    id: "formater",
    titre: "Je formate une valeur pour l'affichage",
    famille: "Interroger",
    resume: "Les questions avant de formater dans une requête : qui affiche la valeur, la culture, l'arrondi, la longueur, le format des dates, les NULL et l'export CSV.",
    besoins: [
      "mise en forme des nombres et des dates",
      "afficher un montant ou une date au format français",
      "formater un montant ou une date",
      "formater dans la requête ou dans le rapport"
    ],
    essais: [
      "format est lent sur sql server",
      "afficher 4 780,00 avec un espace pour les milliers",
      "date en jj/mm/aaaa dans le resultat",
      "point ou virgule pour les decimales"
    ],
    exemple: {
      texte: "L'ADV (l'administration des ventes) veut la liste des commandes avec la date en JJ/MM/AAAA et le montant à la française (4 780,00). Avant de formater dans la requête, tu demandes qui affiche la valeur. Pour Power BI ou Excel : les vraies valeurs, le format se règle dans l'outil. Pour un mail ou un PDF : le texte, formaté à la fin.",
      code: "-- Pour Power BI ou Excel : les vraies valeurs (le format se règle dans l'outil)\nSELECT num_cde, date_cde, montant_ht FROM dbo.commande WHERE id IN (1, 5, 8);\n\n-- Pour un texte (mail, PDF) : formater à la fin, avec une culture choisie\nSELECT num_cde,\n       CONVERT(varchar(10), date_cde, 103) AS date_fr,      -- 02/03/2026\n       FORMAT(montant_ht, 'N2', 'fr-FR')   AS montant_fr    -- 4 780,00\nFROM dbo.commande\nWHERE id IN (1, 5, 8)\nORDER BY date_cde;   -- le tri se fait sur la vraie date, pas sur le texte",
      codes: {
        snowflake: "-- Pour Power BI ou Excel : les vraies valeurs (le format se règle dans l'outil)\nSELECT num_cde, date_cde, montant_ht FROM commande WHERE id IN (1, 5, 8);\n\n-- Pour un texte (mail, PDF) : formater à la fin\nSELECT num_cde,\n       TO_CHAR(date_cde, 'DD/MM/YYYY') AS date_fr,          -- 02/03/2026\n       TRANSLATE(TO_CHAR(montant_ht, 'FM999,999,990.00'), ',.', ' ,')\n         AS montant_fr                                      -- 4 780,00\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY date_cde;   -- le tri se fait sur la vraie date, pas sur le texte",
        mysql: "-- Pour Power BI ou Excel : les vraies valeurs (le format se règle dans l'outil)\nSELECT num_cde, date_cde, montant_ht FROM commande WHERE id IN (1, 5, 8);\n\n-- Pour un texte (mail, PDF) : formater à la fin\nSELECT num_cde,\n       DATE_FORMAT(date_cde, '%d/%m/%Y') AS date_fr,        -- 02/03/2026\n       REPLACE(REPLACE(FORMAT(montant_ht, 2), ',', ' '), '.', ',')\n         AS montant_fr                                      -- 4 780,00\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY date_cde;   -- le tri se fait sur la vraie date, pas sur le texte"
      }
    },
    etapes: [
      {
        titre: "Où formater",
        questions: [
          {
            id: "qui-affiche",
            q: "Qui affiche la valeur : Power BI, Excel, ou un texte final ?",
            pourquoi: "Un montant formaté en SQL arrive en texte dans Power BI ou Excel : il ne s'additionne plus, se trie mal, et ne suit plus la langue de chaque utilisateur.",
            reflexe: "Power BI ou Excel : envoie le nombre et la date bruts, et règle le format dans l'outil. Formate en SQL seulement pour un texte final : mail, PDF, étiquette, libellé."
          },
          {
            id: "garder-brut",
            q: "La valeur servira-t-elle encore à trier, filtrer ou calculer ?",
            pourquoi: "En texte, '2 385,00' passe avant '318,00', et '10/04/2026' avant '12/03/2026'. Une somme sur ce texte devient impossible.",
            reflexe: "Garde la valeur brute à côté du texte : la brute pour trier, filtrer et calculer, le texte pour afficher. Trie toujours sur la brute (`ORDER BY date_cde`)."
          },
          {
            id: "stocker",
            q: "Vas-tu enregistrer le texte formaté dans une table ?",
            pourquoi: "Un SIREN rangé '512 345 678' ne se retrouve plus avec `siren = '512345678'`. Un montant rangé en texte ne s'additionne plus. Le format d'un jour devient une donnée pour toujours.",
            reflexe: "Range la valeur, jamais son affichage. Le format se refait à la lecture, dans une vue ou dans le rapport."
          }
        ]
      },
      {
        titre: "La culture",
        questions: [
          {
            id: "separateurs",
            q: "Quels séparateurs attend le lecteur : 4 780,00 ou 4,780.00 ?",
            pourquoi: "La culture (la langue et ses conventions) décide des séparateurs. Un Excel en français lit 4,780 comme 4,78 : une erreur de mille, sans message.",
            reflexe: "Choisis la culture dans la requête, jamais celle du serveur par hasard. Teste avec un montant de plus de mille, avec des décimales : 4 780,50.",
            moteurs: {
              sqlserver: "`FORMAT(x, 'N2', 'fr-FR')`. Sans 3e argument, `FORMAT` suit la langue de la session (`SET LANGUAGE`).",
              snowflake: "`TO_CHAR` écrit toujours un point décimal : échange ensuite les signes avec `TRANSLATE`.",
              mysql: "`FORMAT(x, 2)` écrit 4,780.00. Un 3e argument choisit la langue : `FORMAT(12332.2, 2, 'de_DE')` donne 12.332,20 (exemple de sa doc)."
            }
          },
          {
            id: "cout-format",
            q: "FORMAT va-t-il tourner sur beaucoup de lignes ?",
            pourquoi: "`FORMAT` appelle le CLR, le moteur .NET hébergé dans SQL Server. Sur un gros volume, ce coût peut compter, mais sa doc ne le chiffre pas. Elle le réserve à la mise en forme selon une culture ; pour le reste : `CAST` ou `CONVERT`.",
            reflexe: "Sur un gros volume, préfère `CONVERT` avec un style, ou formate dans l'outil. Si tu gardes `FORMAT`, mesure sur le volume réel. Et teste le modèle : un modèle faux rend NULL, sans erreur.",
            seulement: ["sqlserver"]
          }
        ]
      },
      {
        titre: "Les nombres",
        questions: [
          {
            id: "arrondir",
            q: "Faut-il arrondir la valeur, ou seulement l'afficher avec 2 décimales ?",
            pourquoi: "Arrondir change la valeur ; afficher, non. Des lignes arrondies une à une, puis additionnées, s'écartent du total arrondi : un centime d'écart avec la compta.",
            reflexe: "Calcule en pleine précision. Arrondis une fois, là où ta règle de gestion le dit (la ligne de facture, ou le total). Pour le reste, un format d'affichage suffit.",
            moteurs: {
              sqlserver: "`ROUND(x, 2)` garde le type : une moyenne s'affiche 5038.330000. `CAST(x AS DECIMAL(12,2))` arrondit et ne garde que 2 décimales.",
              snowflake: "`ROUND` arrondit les demis en s'éloignant de zéro. Sur un `NUMBER`, un 3e argument, `'HALF_TO_EVEN'`, arrondit au chiffre pair : l'arrondi bancaire.",
              mysql: "`ROUND` d'un `DECIMAL` arrondit les demis en s'éloignant de zéro ; d'un `FLOAT` ou d'un `DOUBLE`, souvent au chiffre pair (sa doc)."
            }
          },
          {
            id: "longueur",
            q: "Le texte prévu est-il assez long pour la plus grande valeur ?",
            pourquoi: "Un texte trop court abîme le nombre, sans erreur dans certains cas : une étoile, des #, ou des chiffres coupés, selon le moteur.",
            reflexe: "Calcule la longueur sur la plus grande valeur possible, signe, séparateurs et décimales compris, pas sur l'exemple du jour. Teste avec le maximum de la colonne.",
            moteurs: {
              sqlserver: "`CAST(12345 AS VARCHAR(4))` donne `*`. `CAST(12345.67 AS VARCHAR(6))` rend une erreur (sa doc).",
              snowflake: "`TO_CHAR` avec un modèle trop court écrit des `#` à la place de tous les chiffres.",
              mysql: "`CAST(12345 AS CHAR(4))` garde les 4 premiers caractères : '1234'."
            }
          },
          {
            id: "zeros",
            q: "Le code doit-il garder ses zéros devant ?",
            pourquoi: "Un code converti en nombre perd ses zéros : le code postal 01200 devient 1200, et la jointure avec Divalto ou le fichier EDI ne trouve plus rien.",
            reflexe: "Garde les codes en texte. Pour compléter un numéro à une longueur fixe (000042), vois l'astuce « Compléter un numéro avec des zéros devant »."
          }
        ]
      },
      {
        titre: "Les dates",
        questions: [
          {
            id: "format-date",
            q: "Quel format de date attend le lecteur, ou le fichier ?",
            pourquoi: "'03/04/2026' est le 3 avril en France, le 4 mars aux États-Unis. Un fichier EDI attend souvent AAAAMMJJ (segment DTM, format 102) : un autre format est rejeté.",
            reflexe: "Écris le format en toutes lettres : JJ/MM/AAAA pour un lecteur français, AAAAMMJJ ou AAAA-MM-JJ pour un fichier ou un programme. Voir l'astuce « Écrire une date en JJ/MM/AAAA ».",
            moteurs: {
              sqlserver: "`CONVERT(varchar(10), d, 103)` : JJ/MM/AAAA. Style 112 : AAAAMMJJ. Style 23 : AAAA-MM-JJ.",
              snowflake: "`TO_CHAR(d, 'DD/MM/YYYY')`. Pour toute la session : le paramètre `DATE_OUTPUT_FORMAT`.",
              mysql: "`DATE_FORMAT(d, '%d/%m/%Y')`."
            }
          },
          {
            id: "lettres",
            q: "As-tu vérifié les lettres du modèle : mois, minutes, heures sur 24 ?",
            pourquoi: "Dans `FORMAT`, `mm` donne les minutes et `MM` le mois ; `hh` compte sur 12 heures : 17 h 30 s'écrit 05:30. Le texte est faux, sans erreur.",
            reflexe: "Teste le modèle sur une date connue : le 8 avril 2026 à 17 h 30 doit donner 08/04/2026 17:30.",
            moteurs: {
              sqlserver: "`FORMAT(d, 'dd/MM/yyyy HH:mm')`.",
              snowflake: "`TO_CHAR(d, 'DD/MM/YYYY HH24:MI')` : `MI` pour les minutes.",
              mysql: "`DATE_FORMAT(d, '%d/%m/%Y %H:%i')` : `%i` pour les minutes ; `%M` donne le nom du mois."
            }
          },
          {
            id: "langue",
            q: "Les noms de mois ou de jours sont-ils dans la bonne langue ?",
            pourquoi: "« March 2026 » au lieu de « mars 2026 » : la langue suit la session ou le serveur, pas le lecteur.",
            reflexe: "Fixe la langue dans la requête, ou garde le numéro du mois et laisse l'outil écrire le nom.",
            moteurs: {
              sqlserver: "`FORMAT(d, 'MMMM yyyy', 'fr-FR')`. `DATENAME` suit la langue de la session (`SET LANGUAGE`).",
              snowflake: "`TO_CHAR` écrit les mois en anglais (January, February…).",
              mysql: "`SET lc_time_names = 'fr_FR';` avant `DATE_FORMAT(d, '%M %Y')`."
            }
          }
        ]
      },
      {
        titre: "Vides et export",
        questions: [
          {
            id: "null",
            q: "Comment afficher une valeur NULL ?",
            pourquoi: "Un montant NULL affiché 0 fait croire à une vente nulle ; affiché vide, à un oubli. Le lecteur doit savoir ce que veut dire la case.",
            reflexe: "Décide le sens avec le métier : vide (inconnu), 0 (vraiment zéro) ou un libellé (« Non renseigné »). Convertis d'abord en texte, puis remplace : `COALESCE(CAST(montant_ht AS VARCHAR(20)), '')`.",
            moteurs: {
              sqlserver: "`COALESCE` prend le type de plus haute priorité : `COALESCE(montant_ht, '')` essaie de convertir '' en `DECIMAL`, et plante (sa doc)."
            }
          },
          {
            id: "csv",
            q: "Le fichier exporté sera-t-il lu par un humain (Excel) ou par un programme ?",
            pourquoi: "Une virgule décimale dans un CSV séparé par des virgules coupe chaque montant en deux colonnes. Un programme (EDI, ERP, API) attend souvent le point, et des dates AAAA-MM-JJ.",
            reflexe: "Programme : suis sa spécification (séparateur, point décimal, format de date). Excel en français : point-virgule entre les colonnes, virgule décimale. Voir l'astuce « Mettre une virgule à la place du point (export Excel) »."
          }
        ]
      }
    ],
    pieges: [
      "Un montant formaté en SQL ('4 780,00') envoyé à Power BI : il devient du texte, ne s'additionne plus et se trie mal.",
      "`FORMAT(d, 'dd/mm/yyyy')` : `mm` donne les minutes, pas le mois.",
      "`FORMAT` sans culture : le résultat change avec la langue de la session (`SET LANGUAGE`).",
      "Sur SQL Server, `ROUND(x, 2)` garde le type : la moyenne s'affiche 5038.330000.",
      "Un code converti en nombre pour l'afficher : 01200 devient 1200, pour toujours si on l'enregistre.",
      "Un CSV avec des virgules décimales et des virgules entre les colonnes : chaque montant est coupé en deux.",
      "Un texte trop court : `CAST(12345 AS VARCHAR(4))` donne `*` sur SQL Server, sans erreur.",
      "Un modèle de `FORMAT` mal écrit rend NULL, sans erreur : l'étiquette sort vide."
    ],
    pratique: "Power BI et Excel savent formater les montants et les dates. Formate en SQL seulement ce qui sort en texte : un libellé, un mail, un fichier pour un partenaire.",
    motsCles: ["format", "formater", "affichage", "mise en forme", "décimales", "séparateur", "milliers", "virgule", "date française", "jj/mm/aaaa", "culture", "to_char", "convert", "arrondir", "csv"],
    voirAussi: ["dates", "agreger", "exporter", "donnees-powerbi", "choisir-types", "fonction-scalaire"],
    dico: ["format", "convert", "to-char", "round", "cast", "coalesce", "concat", "lpad"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "FORMAT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/format-transact-sql" },
      { titre: "CAST et CONVERT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/cast-and-convert-transact-sql" },
      { titre: "ROUND (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/round-transact-sql" },
      { titre: "Snowflake : SQL format models", url: "https://docs.snowflake.com/en/sql-reference/sql-format-models" },
      { titre: "Snowflake : ROUND", url: "https://docs.snowflake.com/en/sql-reference/functions/round" },
      { titre: "Snowflake : formats de date et d'heure", url: "https://docs.snowflake.com/en/sql-reference/date-time-input-output" },
      { titre: "MySQL 8.4 : String Functions (FORMAT)", url: "https://dev.mysql.com/doc/refman/8.4/en/string-functions.html" },
      { titre: "MySQL 8.4 : Mathematical Functions (ROUND)", url: "https://dev.mysql.com/doc/refman/8.4/en/mathematical-functions.html" }
    ]
  },
  {
    id: "fonction-scalaire",
    titre: "J'utilise une fonction sur chaque ligne",
    famille: "Interroger",
    resume: "Les questions avant d'appeler une fonction sur chaque ligne : NULL et erreurs de conversion, index perdu dans le WHERE, coût d'un appel par ligne, fonctions maison (UDF), déterminisme.",
    besoins: [
      "fonction scalaire",
      "créer une fonction scalaire maison (udf)",
      "appeler une fonction dans le select pour chaque ligne",
      "les questions à se poser avant une udf"
    ],
    essais: [
      "udf scalaire tres lente sur sql server 2019",
      "fonction maison appelee ligne par ligne",
      "try_cast pour eviter une erreur de conversion",
      "is_inlineable"
    ],
    exemple: {
      texte: "Un rapport affiche le TTC des commandes avec une fonction maison (une UDF, écrite par l'équipe), `dbo.f_ttc`, et filtre `WHERE dbo.f_ttc(montant_ht) > 3000`. En recette, 8 commandes : instantané. En production, la fonction tourne sur chaque ligne de la table, et un index (la table des matières de la table) sur `montant_ht` ne peut plus servir. Voici la version relue : même résultat (CDE-1001 et CDE-1007), sans fonction maison.",
      code: "-- Avant : une fonction maison, sur chaque ligne, dans le SELECT et le WHERE\nSELECT num_cde, dbo.f_ttc(montant_ht) AS montant_ttc\nFROM dbo.commande\nWHERE dbo.f_ttc(montant_ht) > 3000;\n\n-- Après : l'expression dans la requête, la colonne nue dans le WHERE\nSELECT num_cde, CAST(montant_ht * 1.20 AS DECIMAL(12,2)) AS montant_ttc   -- TVA 20 %\nFROM dbo.commande\nWHERE montant_ht > 2500;   -- 3 000 / 1,20 : le calcul passe du côté de la valeur",
      codes: {
        snowflake: "-- Avant : une fonction maison (UDF), sur chaque ligne\nSELECT num_cde, f_ttc(montant_ht) AS montant_ttc\nFROM commande\nWHERE f_ttc(montant_ht) > 3000;\n\n-- Après : l'expression dans la requête, la colonne nue dans le WHERE\nSELECT num_cde, (montant_ht * 1.20)::NUMBER(12,2) AS montant_ttc   -- TVA 20 %\nFROM commande\nWHERE montant_ht > 2500;   -- 3 000 / 1,20 : le calcul passe du côté de la valeur",
        mysql: "-- Avant : une fonction stockée, sur chaque ligne\nSELECT num_cde, f_ttc(montant_ht) AS montant_ttc\nFROM commande\nWHERE f_ttc(montant_ht) > 3000;\n\n-- Après : l'expression dans la requête, la colonne nue dans le WHERE\nSELECT num_cde, CAST(montant_ht * 1.20 AS DECIMAL(12,2)) AS montant_ttc   -- TVA 20 %\nFROM commande\nWHERE montant_ht > 2500;   -- 3 000 / 1,20 : le calcul passe du côté de la valeur"
      }
    },
    etapes: [
      {
        titre: "Le besoin",
        questions: [
          {
            id: "utile",
            q: "Une jointure, une vue ou une expression simple ferait-elle le travail ?",
            pourquoi: "Une fonction maison qui cherche le nom du client refait une recherche pour chaque ligne : 2 millions de commandes, 2 millions de recherches. Une jointure lit les clients en une fois.",
            reflexe: "Un libellé : une jointure. Un calcul court : l'expression dans la requête, ou une vue. Une fonction maison seulement pour une règle partagée et complexe."
          },
          {
            id: "ou",
            q: "Où la fonction est-elle appelée : SELECT, WHERE, JOIN ou ORDER BY ?",
            pourquoi: "Dans le `SELECT`, elle tourne sur les lignes rendues. Dans le `WHERE` ou le `ON`, elle tourne sur toutes les lignes lues, et l'index de la colonne ne sert plus.",
            reflexe: "Garde les fonctions dans le `SELECT` quand c'est possible. Dans le `WHERE`, laisse la colonne nue, et passe le calcul du côté de la valeur : `montant_ht > 3000 / 1.20`."
          },
          {
            id: "volume",
            q: "Combien de lignes passeront dans la fonction, en production ?",
            pourquoi: "Un appel par ligne ne se voit pas sur 8 lignes de recette. Il se paie sur des millions de lignes, à chaque exécution du rapport.",
            reflexe: "Teste sur le volume réel, ou sur une copie récente de la production. Regarde combien de fois la fonction s'exécute.",
            moteurs: {
              sqlserver: "`sys.dm_exec_function_stats` (depuis 2016) compte les exécutions de chaque fonction scalaire, sauf celles mises en ligne."
            }
          }
        ]
      },
      {
        titre: "Les valeurs d'entrée",
        questions: [
          {
            id: "null",
            q: "Que rend la fonction quand une entrée est NULL ?",
            pourquoi: "La plupart des fonctions rendent NULL pour une entrée NULL : `UPPER(NULL)`, `LEFT(NULL, 3)`. Collée avec `+`, l'étiquette « nom (ville) » de Camping Les Flots, sans ville, sort entièrement NULL.",
            reflexe: "Teste la fonction avec NULL. Si le métier veut une valeur, remplace avant : `COALESCE(ville, '')`. Décide si un résultat NULL doit sortir, ou être signalé.",
            moteurs: {
              sqlserver: "`CONCAT` traite NULL comme un texte vide ; `+` rend NULL.",
              snowflake: "`CONCAT` et `||` rendent NULL dès qu'un morceau est NULL.",
              mysql: "`CONCAT` rend NULL dès qu'un argument est NULL ; `CONCAT_WS` saute les NULL."
            }
          },
          {
            id: "conversion",
            q: "Une valeur peut-elle faire échouer la conversion ?",
            pourquoi: "Un `CAST` plante sur une seule valeur ('12,5', 'N/A') et arrête tout un import de 10 000 lignes. Ou, pire, la valeur devient 0 sans bruit.",
            reflexe: "Une fonction TRY rend NULL au lieu de planter. Liste ensuite les échecs : `WHERE TRY_CAST(qte_txt AS INT) IS NULL AND qte_txt IS NOT NULL`. Voir l'astuce « Trouver les valeurs non numériques dans une colonne texte ».",
            moteurs: {
              sqlserver: "`TRY_CAST` et `TRY_CONVERT` rendent NULL. Une conversion interdite entre deux types reste une erreur.",
              snowflake: "`TRY_CAST` part seulement d'un texte (sa doc). Aussi `TRY_TO_NUMBER` et `TRY_TO_DATE`.",
              mysql: "Pas de `TRY_CAST`. Dans un `SELECT`, un texte non numérique devient 0 ('x6') ou son début ('6x' donne 6), avec un simple avertissement. Dans un `INSERT` ou un `UPDATE`, le mode strict (actif par défaut) en fait une erreur."
            }
          },
          {
            id: "type-retour",
            q: "Le type rendu par la fonction est-il celui que tu crois ?",
            pourquoi: "Le type du résultat décide des décimales, de la longueur et du tri. Une division d'entiers perd ses décimales, un texte peut être coupé, et Power BI reçoit un type inattendu.",
            reflexe: "Fixe le type du résultat avec `CAST` : `CAST(montant_ht * 1.20 AS DECIMAL(12,2))`. Pour remplacer un NULL, préfère `COALESCE` à `ISNULL`.",
            moteurs: {
              sqlserver: "`ISNULL` prend le type de son 1er argument, et peut couper le 2e ; `COALESCE`, le type de plus haute priorité. `7 / 2` vaut 3.",
              snowflake: "`7 / 2` vaut 3.5 : la division garde des décimales."
            }
          }
        ]
      },
      {
        titre: "L'index",
        questions: [
          {
            id: "where-join",
            q: "La fonction enveloppe-t-elle une colonne du WHERE ou du JOIN ?",
            pourquoi: "`WHERE YEAR(date_cde) = 2026` ou `ON LEFT(a.code, 6) = b.code` : le moteur calcule chaque ligne avant de comparer. L'index ne sert plus, et la table est lue en entier.",
            reflexe: "Réécris pour laisser la colonne nue : une plage de dates, un calcul du côté de la valeur. Si la fonction est inévitable et fréquente, indexe son résultat.",
            moteurs: {
              sqlserver: "Une colonne calculée (souvent `PERSISTED`), puis un index dessus. Son expression doit être déterministe et précise (sa doc).",
              snowflake: "L'élagage (sauter les blocs inutiles de la table, les micro-partitions) se perd souvent. Search Optimization (édition Enterprise) accélère certaines recherches avec fonction.",
              mysql: "Un index sur l'expression : `CREATE INDEX ix_code ON article ((UPPER(code)));`."
            }
          },
          {
            id: "deterministe",
            q: "La fonction rend-elle toujours le même résultat pour la même entrée ?",
            pourquoi: "Une fonction non déterministe (`GETDATE()`, `NEWID()`) change d'un appel à l'autre. Elle ne peut pas servir dans un index, et deux exécutions du même rapport ne rendent pas le même résultat.",
            reflexe: "Lis la date ou l'heure une fois, au début, dans une variable. Garde les fonctions non déterministes hors des colonnes calculées et des index.",
            moteurs: {
              sqlserver: "`GETDATE`, `NEWID` et `FORMAT` ne sont jamais déterministes. Une fonction maison ne l'est que créée `WITH SCHEMABINDING`, liée aux objets qu'elle lit (sa doc).",
              snowflake: "Une UDF (fonction maison) est `VOLATILE` par défaut. `IMMUTABLE` est une promesse que Snowflake ne vérifie pas : fausse, le résultat n'est plus garanti.",
              mysql: "`NOW()` donne l'heure du début de l'instruction ; `SYSDATE()`, l'heure de chaque appel."
            }
          }
        ]
      },
      {
        titre: "Les fonctions maison",
        questions: [
          {
            id: "inlining",
            q: "Ta fonction scalaire maison peut-elle être mise en ligne (inlining) ?",
            pourquoi: "Mise en ligne, la fonction est recopiée dans la requête. Sinon, elle tourne ligne par ligne, sur un seul processeur : la doc cite 29 minutes avec la fonction, 1,6 seconde une fois mise en ligne.",
            reflexe: "SQL Server 2019 ou plus, base en compatibilité 150 ou plus (son réglage de version) : vérifie `is_inlineable` dans `sys.sql_modules`. 1 ne garantit pas la mise en ligne : l'appel compte aussi (pas dans un `ORDER BY` ni un `GROUP BY`).",
            moteurs: {
              sqlserver: "Empêchent la mise en ligne : `GETDATE()`, une variable table, une boucle `WHILE`, plusieurs `RETURN` (depuis la mise à jour cumulative CU5 de 2019), une CTE (requête nommée par `WITH`) dans la fonction, ou, depuis la CU11, dans la requête qui l'appelle."
            },
            seulement: ["sqlserver"]
          },
          {
            id: "table-en-ligne",
            q: "Une fonction table en ligne, ou une vue, ferait-elle mieux ?",
            pourquoi: "Une fonction table écrite en plusieurs instructions est une boîte noire : le moteur devine mal son nombre de lignes, et choisit un mauvais plan (le chemin pour lire les données).",
            reflexe: "Une seule requête : une fonction table en ligne (`RETURNS TABLE AS RETURN (SELECT …)`), ou une vue. Le moteur la déplie dans le plan, comme du SQL écrit à la main.",
            moteurs: {
              sqlserver: "Appelle-la avec `CROSS APPLY`. Une fonction table en plusieurs instructions est estimée à 100 lignes (depuis 2014) ; l'exécution entrelacée (SQL Server 2017, niveau 140) ne corrige que certains cas.",
              snowflake: "Fonction table (UDTF) : `RETURNS TABLE (…)`, appelée avec `TABLE(f(…))`.",
              mysql: "Pas de fonction qui rend une table : une vue."
            }
          },
          {
            id: "langage",
            q: "En quel langage écrire l'UDF : SQL, ou Python, Java, JavaScript, Scala ?",
            pourquoi: "Le langage change ce qu'il faut maintenir (paquets, versions) et la façon de traiter les lignes : une à une, ou par lots.",
            reflexe: "SQL quand une expression SQL suffit. Python ou Java pour une bibliothèque qui manque en SQL. Une UDF Python « vectorisée » reçoit les lignes par lots, ce qui peut aller plus vite.",
            seulement: ["snowflake"]
          },
          {
            id: "declarer",
            q: "Ta fonction stockée déclare-t-elle DETERMINISTIC, NO SQL ou READS SQL DATA à juste titre ?",
            pourquoi: "Avec le journal binaire (qui sert à la réplication, actif par défaut), `CREATE FUNCTION` exige l'une des trois, sinon erreur 1418. Mentir pour passer peut fausser le plan d'exécution (sa doc).",
            reflexe: "Déclare la vérité : `DETERMINISTIC` seulement si la même entrée donne toujours le même résultat ; `READS SQL DATA` si la fonction lit des tables. Ne contourne pas avec `log_bin_trust_function_creators`.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Vérifier",
        questions: [
          {
            id: "cas-limites",
            q: "As-tu testé la fonction sur les cas limites ?",
            pourquoi: "Une fonction juste sur l'exemple casse sur un code sans tiret (BACHE8), un texte vide, un 29 février ou un montant négatif (un avoir).",
            reflexe: "Une petite table de cas : NULL, vide, 0, négatif, très long, caractère spécial, avec le résultat attendu de chacun. Rejoue-la à chaque modification de la fonction."
          }
        ]
      }
    ],
    pieges: [
      "Une fonction maison qui lit une table (le nom du client), appelée dans le `SELECT` : une recherche par ligne, des minutes au lieu d'une seconde.",
      "`WHERE dbo.f_ttc(montant_ht) > 3000` : la fonction tourne sur toutes les lignes lues, et l'index ne sert plus.",
      "`CAST(qte_txt AS INT)` dans un import : une seule valeur 'N/A' arrête tout le chargement.",
      "MySQL, dans un `SELECT` ou avec `LOAD DATA LOCAL` : la quantité 'N/A' devient 0, avec un simple avertissement que personne ne lit.",
      "Croire une fonction mise en ligne parce que la base est en SQL Server 2019 : un `GETDATE()` dedans suffit à l'empêcher.",
      "Déclarer `IMMUTABLE` (Snowflake) ou `DETERMINISTIC` (MySQL) une fonction qui ne l'est pas : des résultats faux, sans erreur.",
      "Une fonction testée sur 8 lignes de recette : la lenteur n'apparaît qu'en production."
    ],
    pratique: "Avant d'écrire une fonction maison, cherche la fonction intégrée dans le dico : elle est déjà testée, et souvent plus rapide. Une règle métier partagée va plutôt dans une vue.",
    motsCles: ["fonction scalaire", "udf", "fonction maison", "fonction utilisateur", "chaque ligne", "ligne par ligne", "try_cast", "conversion", "déterministe", "getdate", "inlining", "is_inlineable", "create function", "lenteur", "null"],
    voirAussi: ["filtrer", "formater", "requete-lente", "procedure", "creer-index", "dates"],
    dico: ["create-function", "try-cast", "cast", "conversion-implicite", "colonne-calculee", "cross-apply", "getdate", "concat"],
    outils: ["dico", "astuces"],
    sources: [
      { titre: "Mise en ligne des UDF scalaires (Scalar UDF inlining)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/user-defined-functions/scalar-udf-inlining" },
      { titre: "Fonctions déterministes et non déterministes", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/user-defined-functions/deterministic-and-nondeterministic-functions" },
      { titre: "TRY_CAST (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/try-cast-transact-sql" },
      { titre: "Index sur les colonnes calculées", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/indexes/indexes-on-computed-columns" },
      { titre: "Snowflake : CREATE FUNCTION", url: "https://docs.snowflake.com/en/sql-reference/sql/create-function" },
      { titre: "Snowflake : TRY_CAST", url: "https://docs.snowflake.com/en/sql-reference/functions/try_cast" },
      { titre: "MySQL 8.4 : CREATE PROCEDURE and CREATE FUNCTION", url: "https://dev.mysql.com/doc/refman/8.4/en/create-procedure.html" },
      { titre: "MySQL 8.4 : Stored Program Binary Logging", url: "https://dev.mysql.com/doc/refman/8.4/en/stored-programs-logging.html" }
    ]
  },
  // Vague 2 (17/11/2026) : fenetre, sous-requete, doublons, trier-paginer, comparer-texte.
  // Résultats recalculés avec SQLite sur docs/base-exemple.sql (scratchpad architecte/v2-interroger/scripts/verif.py) et
  // rejoués sur MySQL 8.0.46, connexion utf8mb4 (ex aequo CDE-1002 / CDE-1006 : ROW_NUMBER 4 et 5, RANK 4 et 4 puis 6,
  // DENSE_RANK 4 et 4 puis 5 ; AquaBleu numéroté 1, 3, 7 ou 1, 2, 3 ; 45 345 € = 3 x 15 115 € ; dernier flux : CDE-1001
  // INVOIC, CDE-1003 ORDERS, CDE-1007 DESADV REJET ; KIT-COUV : 10 lignes au niveau 10 ; SIREN 5 - 4 = 1 ligne en trop ;
  // TOP (4) WITH TIES = 5 lignes ; LIMIT 2, 3 ; tri binaire et tri utf8mb4_0900_ai_ci des libellés ; 'GENEVE' ; 'C001 ' ;
  // 3 / 2 / 1 groupes pour 'Hydro Sud' ; DELETE des doublons par jointure ; erreurs QUALIFY, DISTINCT OVER, 1242, IGNORE NULLS).
  // Sources lues le 17/11/2026 (pages gardées dans scratchpad architecte/v2-interroger/pages) : learn.microsoft.com (OVER,
  // ROW_NUMBER, LAG, LAST_VALUE, WINDOW, erreurs 0-999, 1000-1999, 2000-2999, 4000-4999, 10000-10999, WITH, DELETE, ORDER BY,
  // TOP, CREATE VIEW, LIKE, = (comparaison de chaînes), collation et Unicode, Full-Text Search, SOUNDEX, DIFFERENCE,
  // REGEXP_LIKE, expressions régulières, recherche approchée, nouveautés SQL Server 2025, suppression des doublons) ;
  // docs.snowflake.com en .md (fenêtres, QUALIFY, COUNT, LAG, LAST_VALUE, ROW_NUMBER, sous-requêtes, WITH, CTE, LATERAL,
  // DELETE, INSERT, ORDER BY, LIMIT, TOP, top-K pruning, paramètres, collation, LIKE, ILIKE, CONTAINS, SEARCH, recherche
  // plein texte, Search Optimization, SUBSTRING, EDITDISTANCE, JAROWINKLER_SIMILARITY, SOUNDEX, REGEXP_LIKE, expressions
  // régulières) ; dev.mysql.com/doc/refman/8.4 (fenêtres : usage, cadre, fonctions, restrictions, fenêtres nommées ; SELECT,
  // mots réservés, erreurs des sous-requêtes, restrictions, WITH, tables dérivées, LATERAL, DELETE, LIMIT, ORDER BY, NULL,
  // comparaison de chaînes, jeux Unicode, plein texte, expressions régulières, fonctions de chaînes) et 8.0 (nouveautés) ;
  // Divalto (widgets KPI, requêtes Dataviz Industrie, contrôle des doublons en saisie de pièces, installation, collation).
  {
    id: "fenetre",
    titre: "J'utilise une fonction de fenêtre",
    famille: "Interroger",
    resume: "Les questions avant un `OVER` : le groupe, l'ordre et les ex aequo, le cadre, le filtre sur le résultat, LAG, le cumul, la vitesse, les moteurs.",
    besoins: [
      "fonction de fenêtre",
      "numéroter les lignes avec row_number",
      "calculer un cumul ou un rang par client avec over",
      "comparer une ligne à la précédente avec lag"
    ],
    essais: [
      "rank ou dense_rank avec des ex aequo",
      "last_value ne rend pas la derniere valeur",
      "filtrer sur row_number dans le where",
      "lag pour comparer avec la commande precedente"
    ],
    exemple: {
      texte: "Pour Power BI, tu veux chaque commande avec trois calculs : son numéro dans le client (1 = la plus récente), le cumul du client, et l'écart avec la commande d'avant (LAG lit la ligne d'avant). Une fonction de fenêtre (`OVER`) calcule sur un groupe de lignes sans les fusionner. Avant de l'écrire, tu fixes le groupe (`PARTITION BY`), l'ordre (`ORDER BY`) et le cadre : les lignes prises dans le calcul. Résultat : 7 lignes ; la 1re commande de chaque client a un écart vide (NULL).",
      code: "SELECT client_id, num_cde, date_cde, montant_ht,\n       ROW_NUMBER() OVER (PARTITION BY client_id\n                          ORDER BY date_cde DESC, id DESC) AS rn,        -- 1 = la plus récente\n       SUM(montant_ht) OVER (PARTITION BY client_id ORDER BY date_cde, id\n                             ROWS UNBOUNDED PRECEDING) AS cumul_client,  -- le cadre est écrit\n       montant_ht - LAG(montant_ht) OVER (PARTITION BY client_id\n                                          ORDER BY date_cde, id) AS ecart  -- NULL sur la 1re\nFROM dbo.commande\nWHERE statut <> 'ANNULEE'\nORDER BY client_id, date_cde, id;   -- l'ordre de l'affichage, à part",
      codes: {
        snowflake: "SELECT client_id, num_cde, date_cde, montant_ht,\n       ROW_NUMBER() OVER (PARTITION BY client_id\n                          ORDER BY date_cde DESC, id DESC) AS rn,        -- 1 = la plus récente\n       SUM(montant_ht) OVER (PARTITION BY client_id ORDER BY date_cde, id\n                             ROWS UNBOUNDED PRECEDING) AS cumul_client,  -- le cadre est écrit\n       montant_ht - LAG(montant_ht) OVER (PARTITION BY client_id\n                                          ORDER BY date_cde, id) AS ecart  -- NULL sur la 1re\nFROM commande\nWHERE statut <> 'ANNULEE'\nORDER BY client_id, date_cde, id;   -- l'ordre de l'affichage, à part",
        mysql: "SELECT client_id, num_cde, date_cde, montant_ht,\n       ROW_NUMBER() OVER (PARTITION BY client_id\n                          ORDER BY date_cde DESC, id DESC) AS rn,        -- 1 = la plus récente\n       SUM(montant_ht) OVER (PARTITION BY client_id ORDER BY date_cde, id\n                             ROWS UNBOUNDED PRECEDING) AS cumul_client,  -- le cadre est écrit\n       montant_ht - LAG(montant_ht) OVER (PARTITION BY client_id\n                                          ORDER BY date_cde, id) AS ecart  -- NULL sur la 1re\nFROM commande\nWHERE statut <> 'ANNULEE'\nORDER BY client_id, date_cde, id;   -- l'ordre de l'affichage, à part"
      }
    },
    etapes: [
      {
        titre: "Le bon outil",
        questions: [
          {
            id: "fenetre-ou-groupe",
            q: "Veux-tu garder chaque ligne, ou une seule ligne par groupe ?",
            pourquoi: "`GROUP BY` fusionne les lignes ; une fenêtre les garde et pose le calcul du groupe à côté. Le mauvais choix donne le mauvais grain (le niveau de détail d'une ligne) : des commandes perdues, ou un total répété partout.",
            reflexe: "Écris le grain en une phrase : « une ligne = une commande ». Le détail avec le total du client : `SUM(montant_ht) OVER (PARTITION BY client_id)`. Une ligne par client : `GROUP BY`. Voir « Je fais un agrégat »."
          },
          {
            id: "ou-calculer",
            q: "Le calcul doit-il suivre les filtres du rapport Power BI ?",
            pourquoi: "Un rang calculé en SQL est figé. Filtré sur une région dans Power BI, un client reste « 3e », même s'il est 1er de sa région. Et un total répété, additionné, compte plusieurs fois : 45 345 € pour AquaBleu au lieu de 15 115 €.",
            reflexe: "Ce qui ne bouge pas (numéro de version, dernière commande, cumul validé) : en SQL. Ce qui doit suivre les filtres (rang, part du total) : une mesure, un calcul fait par Power BI. N'additionne jamais une colonne de total répété."
          }
        ]
      },
      {
        titre: "Le groupe et l'ordre",
        questions: [
          {
            id: "partition",
            q: "Sur quel groupe le calcul repart-il à zéro (PARTITION BY) ?",
            pourquoi: "Sans `PARTITION BY`, la fenêtre prend tout le résultat. Le cumul ne repart pas à chaque client, et LAG compare la 1re commande de Piscines Dumont (CDE-1002) à une commande d'AquaBleu (CDE-1001).",
            reflexe: "Dis le groupe en clair : « par client », « par client et par année ». Puis écris ses colonnes : `PARTITION BY client_id`. Prends la clé, pas le nom : les deux agences Piscines Dumont portent le même."
          },
          {
            id: "ordre-unique",
            q: "L'ordre de la fenêtre départage-t-il toutes les lignes, avec une clé unique en dernier ?",
            pourquoi: "Des ex aequo (des lignes à égalité dans l'ordre) n'ont pas d'ordre garanti entre eux. CDE-1002 et CDE-1006 valent 1 290 € : avec `ORDER BY montant_ht`, leur numéro et leur LAG peuvent changer d'une exécution à l'autre ; leur cumul aussi, avec `ROWS`.",
            reflexe: "Finis l'ordre par une colonne unique : `ORDER BY montant_ht DESC, id DESC`. Le résultat devient le même à chaque exécution. Choisis aussi le sens : `DESC` pour « 1 = la plus récente »."
          },
          {
            id: "ordre-final",
            q: "As-tu aussi un ORDER BY à la fin de la requête ?",
            pourquoi: "L'ordre écrit dans `OVER` sert au calcul, pas à l'affichage. Sans `ORDER BY` final, les lignes sortent dans un ordre quelconque, qui peut changer d'un jour à l'autre.",
            reflexe: "Garde un `ORDER BY` final, comme dans l'exemple : `ORDER BY client_id, date_cde, id`. Il peut différer de celui de la fenêtre. Voir « Je trie et je garde les N premiers »."
          },
          {
            id: "apres-group-by",
            q: "Ta fenêtre est-elle calculée sur le résultat d'un GROUP BY ?",
            pourquoi: "Après un `GROUP BY`, la fenêtre ne voit qu'une ligne par groupe. `SUM(montant_ht) OVER ()` y est refusé : `montant_ht` n'existe plus ligne par ligne. Il faut une autre écriture.",
            reflexe: "Enveloppe l'agrégat : `SUM(SUM(montant_ht)) OVER ()` donne le total de tous les clients. Une fenêtre sur une fenêtre : deux étapes, une CTE (une requête nommée par `WITH`) par fenêtre.",
            moteurs: {
              sqlserver: "Une fenêtre dans un agrégat, ou dans une autre fenêtre : erreur 4109.",
              mysql: "Les fenêtres imbriquées ne sont pas prises en charge (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Les ex aequo",
        questions: [
          {
            id: "fonction-rang",
            q: "Les ex aequo doivent-ils recevoir un numéro chacun, ou le même rang ?",
            pourquoi: "Classées par montant, CDE-1002 et CDE-1006 (1 290 €) sont 4 et 5 avec ROW_NUMBER ; 4 et 4 avec RANK, puis 6 ; 4 et 4 avec DENSE_RANK, puis 5. Un filtre `rang = 4` rend une ligne ou deux, selon la fonction.",
            reflexe: "Une ligne par numéro (dédoublonner, garder la dernière) : ROW_NUMBER, avec un départage. Tous les ex aequo, comme sur un podium : RANK. Les N plus gros montants différents : DENSE_RANK. Écris ton choix en commentaire."
          }
        ]
      },
      {
        titre: "Le cadre",
        questions: [
          {
            id: "cadre",
            q: "As-tu écrit le cadre (ROWS ou RANGE), ou laisses-tu celui par défaut ?",
            pourquoi: "Avec un `ORDER BY` et sans cadre écrit, le défaut est `RANGE … CURRENT ROW` : les ex aequo du tri sont cumulés d'un coup. Deux mouvements de stock du même jour affichent tous les deux le solde du soir.",
            reflexe: "Écris toujours le cadre. Un cumul : `ROWS UNBOUNDED PRECEDING`, du début du groupe à la ligne. Une moyenne des 3 dernières commandes : `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.",
            moteurs: {
              snowflake: "Même défaut, sauf pour FIRST_VALUE, LAST_VALUE et NTH_VALUE : toute la fenêtre. Sa doc conseille d'écrire le cadre."
            }
          },
          {
            id: "lignes-ou-jours",
            q: "Ta moyenne mobile compte-t-elle des lignes, ou des jours ?",
            pourquoi: "`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` prend les 7 dernières lignes, pas les 7 derniers jours. Un jour sans commande n'a pas de ligne : avec 3 jours vides, la « moyenne sur 7 jours » couvre 10 jours, sans erreur.",
            reflexe: "Pars d'une table calendrier (une ligne par jour), jointe en `LEFT JOIN` aux ventes, avec 0 les jours vides. Puis `ROWS`. Ou un cadre en jours, là où le moteur l'accepte.",
            moteurs: {
              sqlserver: "`RANGE` refuse un écart chiffré (`6 PRECEDING`) : calendrier complet, puis `ROWS`.",
              snowflake: "Sur une date : `RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW`, avec un seul `ORDER BY`.",
              mysql: "`RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW`."
            }
          },
          {
            id: "last-value",
            q: "Pour la dernière valeur (LAST_VALUE), ton cadre va-t-il jusqu'au bout du groupe ?",
            pourquoi: "Sans cadre écrit, SQL Server et MySQL s'arrêtent à la ligne courante : LAST_VALUE rend la ligne elle-même. Snowflake prend toute la fenêtre. Même requête, deux résultats, sans erreur.",
            reflexe: "Écris `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`. Ou prends FIRST_VALUE dans l'ordre inverse (`ORDER BY date_cde DESC`) : il donne la dernière valeur sur les trois moteurs, sans cadre à régler."
          }
        ]
      },
      {
        titre: "Filtrer sur le résultat",
        questions: [
          {
            id: "filtre-resultat",
            q: "Veux-tu filtrer sur le résultat de la fenêtre (rn = 1, rang <= 3) ?",
            pourquoi: "La fenêtre se calcule après le `WHERE` : quand il s'exécute, elle n'existe pas encore. `WHERE ROW_NUMBER() OVER (…) = 1` est refusé.",
            reflexe: "Calcule la fenêtre dans une CTE, puis filtre au-dessus : `WITH r AS (…) SELECT … FROM r WHERE rn = 1`. Avec l'exemple, `rn = 1` garde la dernière commande de chaque client.",
            moteurs: {
              sqlserver: "Erreur 4108 : « Windowed functions can only appear in the SELECT or ORDER BY clauses. »",
              snowflake: "`QUALIFY rn = 1` filtre en une seule requête, après la fenêtre ; il lit l'alias du `SELECT`.",
              mysql: "Pas de clause `QUALIFY` (le mot est réservé depuis la 8.4, mais la clause n'existe pas) : CTE, puis `WHERE`."
            }
          },
          {
            id: "filtre-avant",
            q: "Ton filtre doit-il retirer des lignes avant le calcul, ou après ?",
            pourquoi: "Numérotées par date parmi toutes les commandes, celles d'AquaBleu ont les numéros 1, 3 et 7. Filtrées sur AquaBleu avant le calcul, elles ont 1, 2 et 3. Ce sont deux questions différentes.",
            reflexe: "Dis ce que compte le rang : « parmi toutes les commandes » (filtre au-dessus de la CTE) ou « parmi celles du client » (filtre dans le `WHERE` de la même requête). Une vue qui calcule une fenêtre est filtrée après."
          }
        ]
      },
      {
        titre: "LAG, LEAD et les bords",
        questions: [
          {
            id: "premiere-ligne",
            q: "Que doit afficher LAG sur la première ligne de chaque groupe ?",
            pourquoi: "La 1re commande d'un client n'a pas de commande d'avant : LAG rend NULL, et l'écart aussi. Un `CASE … ELSE 'Stable'` la classe alors « Stable », à tort.",
            reflexe: "Décide du sens : NULL (« pas de commande d'avant »), ou une valeur par défaut : `LAG(montant_ht, 1, 0)`. Pour un écart en %, divise par `NULLIF(LAG(…), 0)`. Teste la 1re et la dernière ligne de chaque groupe."
          },
          {
            id: "trous",
            q: "La ligne d'avant est-elle vraiment la période d'avant ?",
            pourquoi: "LAG compte des lignes, pas des mois. Si février n'a aucune vente, la ligne d'avant mars est janvier : l'évolution « mois sur mois » compare mars à janvier, sans le dire.",
            reflexe: "Pars d'un calendrier complet (une ligne par mois, même vide), puis LAG. Ou contrôle la date de la ligne d'avant : elle doit être le mois précédent."
          },
          {
            id: "ignore-nulls",
            q: "Faut-il sauter les cases vides, pour reprendre la dernière valeur connue ?",
            pourquoi: "Un prix manque certains jours. `LAG(prix)` rend alors NULL, et le calcul de la marge saute ces jours-là, sans erreur.",
            reflexe: "`IGNORE NULLS`, dans LAG ou LAST_VALUE, prend la dernière valeur non vide, là où le moteur l'accepte. Sinon, deux étapes : l'astuce « Reprendre la dernière valeur connue (remplir vers le bas) ».",
            moteurs: {
              sqlserver: "`IGNORE NULLS` depuis SQL Server 2022.",
              snowflake: "`LAG(prix) IGNORE NULLS OVER (…)`.",
              mysql: "`IGNORE NULLS` est lu, puis refusé : erreur (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Le cumul",
        questions: [
          {
            id: "cumul-controle",
            q: "Le dernier cumul de chaque groupe égale-t-il le total du groupe ?",
            pourquoi: "Un cumul faux ne plante pas : il saute une ligne, en compte deux d'un coup, ou repart au mauvais moment. Personne ne le voit avant l'écart avec la compta.",
            reflexe: "Compare, pour chaque client, le cumul de sa dernière ligne et son total par `GROUP BY` : dans l'exemple, AquaBleu finit à 15 115 €. Garde ce contrôle dans le script."
          }
        ]
      },
      {
        titre: "La vitesse",
        questions: [
          {
            id: "tri",
            q: "Combien de lignes chaque fenêtre doit-elle trier ?",
            pourquoi: "Chaque `PARTITION BY … ORDER BY` demande un tri. Sur des millions de lignes, un tri qui ne tient pas en mémoire déborde sur le disque, et coûte plus cher. Cela ne se voit qu'avec le vrai volume.",
            reflexe: "Filtre d'abord (la période, le statut) : moins de lignes à trier. Donne le même `PARTITION BY` et le même `ORDER BY` aux fenêtres qui le peuvent. Lis le plan d'exécution (le chemin choisi par le moteur) : combien de tris ?",
            moteurs: {
              sqlserver: "Un index sur les colonnes du `PARTITION BY`, puis de l'`ORDER BY`, dans le même ordre, avec les colonnes lues en `INCLUDE`, peut éviter le tri (sa doc).",
              snowflake: "Le Query Profile (le plan détaillé de Snowflake), rubrique « Spilling », montre un tri qui déborde. Filtre avant, ou essaie un warehouse (le moteur de calcul) plus grand, et mesure.",
              mysql: "`EXPLAIN` montre « Using filesort » : un tri, écrit sur disque s'il est trop gros (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Les moteurs",
        questions: [
          {
            id: "count-distinct",
            q: "Comptes-tu des valeurs différentes dans une fenêtre, avec COUNT(DISTINCT) OVER ?",
            pourquoi: "Le nombre d'articles différents de chaque client, sur chaque ligne : l'écriture semble évidente, mais seul Snowflake l'accepte. Copiée ailleurs, la requête plante.",
            reflexe: "Ailleurs : `COUNT(DISTINCT article_id)` par `GROUP BY` dans une CTE, puis jointure au détail. Ou `DENSE_RANK()` croissant + décroissant - 1 (un NULL y compte comme une valeur).",
            moteurs: {
              sqlserver: "Erreur 10759 : « Use of DISTINCT is not allowed with the OVER clause. »",
              snowflake: "Accepté ; avec un `ORDER BY` dans l'`OVER`, sur une seule colonne (sa doc).",
              mysql: "Refusé : pas de `DISTINCT` dans une fonction de fenêtre (sa doc)."
            }
          },
          {
            id: "versions",
            q: "Ton moteur et sa version acceptent-ils toute ta requête ?",
            pourquoi: "Une fenêtre écrite pour Snowflake (`QUALIFY`, `COUNT(DISTINCT …) OVER`) plante sur SQL Server et MySQL ; un cadre en jours plante sur SQL Server. Et un MySQL d'avant la 8.0 refuse `OVER`.",
            reflexe: "Vérifie la version (`SELECT @@VERSION;` sur SQL Server, `SELECT VERSION();` sur MySQL), puis teste sur chaque moteur cible. Si la requête doit migrer, garde les écritures communes : une CTE plutôt que `QUALIFY`.",
            moteurs: {
              sqlserver: "`IGNORE NULLS` et la clause `WINDOW` (une fenêtre nommée, réutilisée) depuis 2022 ; `WINDOW` demande le niveau de compatibilité 160 (le réglage de version de la base).",
              mysql: "Fonctions de fenêtre depuis la 8.0 (sa doc des nouveautés 8.0) ; la clause `WINDOW` y est acceptée."
            }
          }
        ]
      }
    ],
    pieges: [
      "Un `ROW_NUMBER()` sans départage : CDE-1002 et CDE-1006 (1 290 €) peuvent échanger leur numéro d'une exécution à l'autre.",
      "Un cumul sans cadre écrit : deux lignes à égalité dans l'ordre reçoivent le même cumul, d'un coup.",
      "`LAST_VALUE` sans cadre : la ligne elle-même sur SQL Server et MySQL, la vraie dernière sur Snowflake. Une requête migrée change de résultat, sans erreur.",
      "`WHERE ROW_NUMBER() OVER (…) = 1` : refusé partout. Il faut une CTE, ou `QUALIFY` sur Snowflake.",
      "Une requête Snowflake avec `QUALIFY` ou `COUNT(DISTINCT …) OVER`, copiée sur SQL Server ou MySQL : erreur.",
      "LAG sans `PARTITION BY` : la 1re commande d'un client est comparée à celle d'un autre client.",
      "Un total répété (`SUM(…) OVER (PARTITION BY client_id)`) additionné dans Power BI : 45 345 € pour AquaBleu au lieu de 15 115 €.",
      "Une « moyenne sur 7 jours » en `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`, sur des jours qui manquent : elle couvre plus de 7 jours."
    ],
    pratique: "La page Divalto « Les widgets KPI » présente `RANK() OVER (ORDER BY X)` comme un compteur de lignes. À égalité, RANK donne le même numéro : pour compter les lignes, prends `ROW_NUMBER()` avec un départage.",
    motsCles: ["fonction de fenêtre", "moyenne mobile", "fonction analytique", "over", "partition by", "row_number", "rank", "dense_rank", "lag", "lead", "cumul", "last_value", "qualify", "moyenne glissante", "ex aequo"],
    voirAussi: ["agreger", "trier-paginer", "sous-requete", "doublons", "dates", "requete-lente", "donnees-powerbi"],
    dico: ["over", "row-number", "rank", "lag-lead", "cumul", "cadre-rows", "first-value", "qualify"],
    outils: ["astuces", "traduire"],
    sources: [
      { titre: "Clause OVER (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/select-over-clause-transact-sql" },
      { titre: "LAG (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/lag-transact-sql" },
      { titre: "Erreurs du moteur de base de données 4000 à 4999", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/errors-events/database-engine-events-and-errors-4000-to-4999" },
      { titre: "Snowflake : Window function syntax and usage", url: "https://docs.snowflake.com/en/sql-reference/functions-window-syntax" },
      { titre: "Snowflake : QUALIFY", url: "https://docs.snowflake.com/en/sql-reference/constructs/qualify" },
      { titre: "MySQL 8.4 : Window Function Frame Specification", url: "https://dev.mysql.com/doc/refman/8.4/en/window-functions-frames.html" },
      { titre: "MySQL 8.4 : Window Function Restrictions", url: "https://dev.mysql.com/doc/refman/8.4/en/window-function-restrictions.html" },
      { titre: "Divalto : Les widgets KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" }
    ]
  },
  {
    id: "sous-requete",
    titre: "J'écris une sous-requête ou une CTE",
    famille: "Interroger",
    resume: "Les questions avant une sous-requête ou un `WITH` : une valeur ou une liste, IN ou EXISTS, la corrélée, la CTE lisible mais recalculée, la récursive, la table temporaire, APPLY.",
    besoins: [
      "écrire une sous-requête dans le where",
      "découper une requête en étapes avec une cte",
      "choisir entre sous-requête, cte et table temporaire",
      "une cte récursive pour une nomenclature"
    ],
    essais: [
      "subquery returned more than 1 value",
      "maxrecursion 100 atteint sur la nomenclature",
      "cross apply ou lateral pour la derniere ligne",
      "with qui est recalcule plusieurs fois"
    ],
    exemple: {
      texte: "Le suivi EDI doit montrer, pour chaque commande EDI, le type et le statut de son dernier flux. Une 1re version mettait une sous-requête (une requête entre parenthèses, dans une autre) dans le `SELECT`. Elle a planté le jour où CDE-1001 a reçu un 2e flux, sa facture INVOIC : elle devait rendre une seule valeur. Voici la version relue, en deux étapes nommées : une CTE (`WITH`). 3 commandes ; CDE-1007 a un dernier flux rejeté.",
      code: "-- Avant : (SELECT f.statut FROM dbo.flux_edi AS f WHERE f.cde_id = co.id) : erreur 512 dès 2 flux\nWITH dernier_flux AS (                         -- étape 1 : le dernier flux de chaque commande\n  SELECT f.cde_id, f.type, f.statut,\n         ROW_NUMBER() OVER (PARTITION BY f.cde_id\n                            ORDER BY f.date_recu DESC, f.id DESC) AS rn\n  FROM dbo.flux_edi AS f\n  WHERE f.cde_id IS NOT NULL\n)\nSELECT co.num_cde, d.type AS dernier_type, d.statut AS dernier_statut   -- étape 2\nFROM dbo.commande AS co\nLEFT JOIN dernier_flux AS d ON d.cde_id = co.id AND d.rn = 1\nWHERE co.canal = 'EDI'\nORDER BY co.num_cde;   -- CDE-1001 INVOIC OK, CDE-1003 ORDERS OK, CDE-1007 DESADV REJET",
      codes: {
        snowflake: "-- Avant : (SELECT f.statut … WHERE f.cde_id = co.id) dans le SELECT : pas garanti sur Snowflake\nWITH dernier_flux AS (                         -- étape 1 : le dernier flux de chaque commande\n  SELECT f.cde_id, f.type, f.statut\n  FROM flux_edi AS f\n  WHERE f.cde_id IS NOT NULL\n  QUALIFY ROW_NUMBER() OVER (PARTITION BY f.cde_id\n                             ORDER BY f.date_recu DESC, f.id DESC) = 1\n)\nSELECT co.num_cde, d.type AS dernier_type, d.statut AS dernier_statut   -- étape 2\nFROM commande AS co\nLEFT JOIN dernier_flux AS d ON d.cde_id = co.id\nWHERE co.canal = 'EDI'\nORDER BY co.num_cde;   -- CDE-1001 INVOIC OK, CDE-1003 ORDERS OK, CDE-1007 DESADV REJET",
        mysql: "-- Avant : (SELECT f.statut FROM flux_edi AS f WHERE f.cde_id = co.id) : erreur 1242 dès 2 flux\nWITH dernier_flux AS (                         -- étape 1 : le dernier flux de chaque commande\n  SELECT f.cde_id, f.type, f.statut,\n         ROW_NUMBER() OVER (PARTITION BY f.cde_id\n                            ORDER BY f.date_recu DESC, f.id DESC) AS rn\n  FROM flux_edi AS f\n  WHERE f.cde_id IS NOT NULL\n)\nSELECT co.num_cde, d.type AS dernier_type, d.statut AS dernier_statut   -- étape 2\nFROM commande AS co\nLEFT JOIN dernier_flux AS d ON d.cde_id = co.id AND d.rn = 1\nWHERE co.canal = 'EDI'\nORDER BY co.num_cde;   -- CDE-1001 INVOIC OK, CDE-1003 ORDERS OK, CDE-1007 DESADV REJET"
      }
    },
    etapes: [
      {
        titre: "Le bon outil",
        questions: [
          {
            id: "forme",
            q: "Que doit rendre ta sous-requête : une valeur, une liste, ou une table ?",
            pourquoi: "Chaque forme a sa règle. Une valeur se met après `=` ; une liste, après `IN` ou `EXISTS` ; une table, dans le `FROM`, avec un nom. Une forme mal choisie plante, ou double des lignes.",
            reflexe: "Dis-le avant d'écrire : « une valeur : le taux de TVA du jour » ; « une liste : les commandes qui ont un flux » ; « une table : le dernier flux de chaque commande », comme dans l'exemple."
          },
          {
            id: "vue-ou-cte",
            q: "Cette étape servira-t-elle aussi à d'autres requêtes ou rapports ?",
            pourquoi: "Une CTE ne vit que dans sa requête. Copiée dans cinq rapports, la même règle (« commande active ») diverge au premier changement : cinq chiffres différents.",
            reflexe: "Une règle partagée va dans une vue, une requête enregistrée dans la base, que tous lisent. Une étape propre à une seule requête reste une CTE. Voir « Je crée une vue »."
          }
        ]
      },
      {
        titre: "Une seule valeur",
        questions: [
          {
            id: "une-valeur",
            q: "Ta sous-requête après = peut-elle un jour rendre plusieurs lignes ?",
            pourquoi: "Elle marche des mois, puis plante quand une 2e ligne arrive. CDE-1001 reçoit sa facture INVOIC : la sous-requête du suivi EDI rend deux statuts, et tout le rapport tombe en erreur.",
            reflexe: "Garantis une ligne : une clé unique dans le `WHERE`, un agrégat (`MAX`), ou `TOP (1)` avec un `ORDER BY`. Si plusieurs lignes sont normales : `IN`, `EXISTS`, ou une jointure vers une table qui en garde une, comme dans l'exemple.",
            moteurs: {
              sqlserver: "Erreur 512 : « Subquery returned more than 1 value. This is not permitted when the subquery follows =, !=, <, <= , >, >= or when the subquery is used as an expression. »",
              snowflake: "Erreur à l'exécution. Une sous-requête liée à la ligne du dessus doit en plus rendre une ligne à coup sûr : un agrégat sans `GROUP BY` (sa doc).",
              mysql: "Erreur 1242 : « Subquery returns more than 1 row »."
            }
          },
          {
            id: "vide",
            q: "Que vaut ta sous-requête quand elle ne trouve rien ?",
            pourquoi: "Vide, elle vaut NULL, pas 0. Le CA de Camping Les Flots, qui n'a aucune commande, sort vide, et tout calcul qui l'utilise devient NULL à son tour.",
            reflexe: "Prévois le cas vide : `COALESCE((SELECT SUM(co.montant_ht) FROM commande AS co WHERE co.client_id = cl.id), 0)`, si 0 a un sens. Teste avec un client sans commande."
          }
        ]
      },
      {
        titre: "Une liste : IN ou EXISTS",
        questions: [
          {
            id: "in-exists",
            q: "Pour « a au moins un… », écris-tu IN, EXISTS ou une jointure ?",
            pourquoi: "Une jointure répète la ligne pour chaque partenaire : AquaBleu sort 3 fois, une par commande. On ajoute `DISTINCT`, qui cache le problème. `IN` et `EXISTS` rendent chaque client une seule fois.",
            reflexe: "`WHERE EXISTS (SELECT 1 FROM commande AS co WHERE co.client_id = cl.id)`. Garde ce lien vers la ligne du dessus : sans lui, `EXISTS` est vrai pour tous les clients dès qu'une commande existe.",
            moteurs: {
              sqlserver: "`IN` compare une seule colonne : pour deux colonnes, `EXISTS`.",
              snowflake: "Un `EXISTS` lié à la ligne du dessus n'est prévu que dans le `WHERE` (sa doc).",
              mysql: "`(a, b) IN (SELECT …)` compare deux colonnes d'un coup."
            }
          },
          {
            id: "not-in",
            q: "Ta liste NOT IN peut-elle contenir un NULL ?",
            pourquoi: "Un seul NULL dans la liste, et `NOT IN` ne rend aucune ligne. Le flux 3, rejeté, n'a pas de commande : `id NOT IN (SELECT cde_id FROM flux_edi)` rend 0 ligne au lieu de 5.",
            reflexe: "Écris `NOT EXISTS`. Le détail : « Je filtre des lignes »."
          }
        ]
      },
      {
        titre: "La sous-requête corrélée",
        questions: [
          {
            id: "correlee",
            q: "Ta sous-requête est-elle corrélée, c'est-à-dire liée à chaque ligne du dessus ?",
            pourquoi: "En logique, elle est recalculée pour chaque ligne. Dans le `SELECT` de 2 millions de commandes, cela peut faire 2 millions de recherches, si le moteur ne la change pas en jointure. Le coût n'apparaît qu'avec le vrai volume.",
            reflexe: "Compare avec une jointure vers une table groupée, une ligne par clé : `LEFT JOIN (SELECT client_id, MAX(date_cde) AS derniere FROM commande GROUP BY client_id)`. Lis le plan d'exécution (le chemin choisi par le moteur) et mesure les deux.",
            moteurs: {
              snowflake: "Une corrélée qui rend une valeur n'est garantie que dans le `WHERE`, et avec une ligne à coup sûr (un agrégat sans `GROUP BY`). Ailleurs, passe par une jointure (sa doc)."
            }
          },
          {
            id: "alias-colonnes",
            q: "Chaque colonne de la sous-requête porte-t-elle l'alias de sa table ?",
            pourquoi: "Une colonne absente de la table de la sous-requête est cherchée dans celle du dessus, sans erreur. `code IN (SELECT code FROM ligne_cde)` : `ligne_cde` n'a pas de `code`, l'article est comparé à lui-même, et les 8 articles sortent.",
            reflexe: "Préfixe chaque colonne : `a.id IN (SELECT l.article_id FROM ligne_cde AS l)`. Avec l'alias, une colonne mal nommée donne une vraie erreur."
          }
        ]
      },
      {
        titre: "La CTE",
        questions: [
          {
            id: "cte-lisible",
            q: "Des sous-requêtes imbriquées seraient-elles plus claires en étapes nommées (CTE) ?",
            pourquoi: "Trois sous-requêtes les unes dans les autres se lisent de l'intérieur vers l'extérieur. Personne ne les relit sans se tromper, et une correction en oublie une sur trois.",
            reflexe: "Une étape par CTE, avec un nom qui dit ce qu'elle contient : `WITH dernier_flux AS (…), rejets AS (…)`. Chaque étape lit les précédentes. Pour vérifier une étape, finis par `SELECT * FROM dernier_flux`.",
            moteurs: {
              sqlserver: "L'instruction d'avant doit finir par `;` : d'où l'habitude d'écrire `;WITH` (sa doc)."
            }
          },
          {
            id: "cte-recalcul",
            q: "Ta CTE est-elle citée plusieurs fois, ou relue par plusieurs requêtes ?",
            pourquoi: "Une CTE n'est pas un résultat gardé : elle disparaît avec l'instruction qui la suit. Sur SQL Server, chaque citation la recalcule (sa doc) : une étape lourde citée trois fois se paie trois fois.",
            reflexe: "Un résultat lourd, relu plusieurs fois : range-le une fois dans une table temporaire (une table de travail qui disparaît avec la session). Indexe-la si tu la joins souvent, puis relis-la.",
            moteurs: {
              sqlserver: "`SELECT … INTO #t FROM …`. Mets `DROP TABLE IF EXISTS #t;` en tête du script, pour pouvoir le relancer.",
              snowflake: "`CREATE TEMPORARY TABLE t AS SELECT …` : elle vit le temps de la session.",
              mysql: "Si l'optimiseur matérialise la CTE (la calcule dans une table interne), il le fait une seule fois, même citée plusieurs fois (sa doc). Sinon : `CREATE TEMPORARY TABLE`."
            }
          }
        ]
      },
      {
        titre: "La CTE récursive",
        questions: [
          {
            id: "recursive-limite",
            q: "Ta CTE récursive s'arrête-t-elle, même si les données bouclent ?",
            pourquoi: "Une CTE récursive (qui se relit elle-même) descend une nomenclature niveau par niveau. Une ligne saisie à l'envers crée une boucle : BACHE8 contient KIT-COUV, qui contient BACHE8. La récursion ne s'arrête plus d'elle-même.",
            reflexe: "Un compteur garde-fou : `1 AS niveau` dans l'ancre (la 1re partie), `e.niveau + 1` et `WHERE e.niveau < 10` dans la partie récursive. Choisis la limite avec le métier : la nomenclature la plus profonde, plus une marge.",
            moteurs: {
              sqlserver: "Arrêt à 100 niveaux par défaut : erreur 530. `OPTION (MAXRECURSION n)` change la limite, de 0 à 32 767 ; 0 l'enlève.",
              snowflake: "Une boucle tourne, et consomme des crédits (l'unité de facture), jusqu'au délai `STATEMENT_TIMEOUT_IN_SECONDS` (2 jours par défaut) ou l'annulation. La liste des colonnes de la CTE est obligatoire.",
              mysql: "`WITH RECURSIVE` obligatoire. `cte_max_recursion_depth` arrête la requête après 1 000 niveaux, par défaut."
            }
          },
          {
            id: "recursive-chemin",
            q: "Ta récursion s'arrête-t-elle sur un composant déjà vu, grâce au chemin parcouru ?",
            pourquoi: "Le compteur arrête la boucle, mais le résultat reste faux. Sur KIT-COUV, il sort 10 lignes au lieu d'une (BACHE8, KIT-COUV, BACHE8…) : 5 bâches au lieu d'une pour un seul kit.",
            reflexe: "Garde le chemin parcouru, et arrête quand le composant y est déjà, comme ci-dessous. Puis liste les lignes en boucle : ce sont des erreurs de saisie à corriger. Voir « Je relie deux tables ».",
            moteurs: {
              sqlserver: "Le chemin doit avoir le même type, longueur comprise, dans les deux parties : d'où les deux `CAST` (sa doc).",
              snowflake: "Concatène avec `||` ; un `VARCHAR` sans longueur suffit.",
              mysql: "Le type vient de l'ancre seule : élargis-la avec `CAST(… AS CHAR(400))`, sinon le chemin est coupé, ou la requête plante (sa doc)."
            },
            code: "WITH eclate (composant, niveau, chemin) AS (\n  SELECT composant, 1, CAST('KIT-COUV>' + composant AS VARCHAR(400))\n  FROM dbo.nomenclature WHERE compose = 'KIT-COUV'\n  UNION ALL\n  SELECT n.composant, e.niveau + 1, CAST(e.chemin + '>' + n.composant AS VARCHAR(400))\n  FROM dbo.nomenclature AS n JOIN eclate AS e ON n.compose = e.composant\n  WHERE '>' + e.chemin + '>' NOT LIKE '%>' + n.composant + '>%')   -- déjà vu : arrêt\nSELECT composant, niveau, chemin FROM eclate;   -- 1 ligne : BACHE8"
          }
        ]
      },
      {
        titre: "APPLY et LATERAL",
        questions: [
          {
            id: "apply",
            q: "Te faut-il, pour chaque ligne, plusieurs colonnes de sa ligne liée la plus récente ?",
            pourquoi: "Une sous-requête dans le `SELECT` ne rend qu'une colonne. Pour le type, le statut et la date du dernier flux, il en faut trois : trois recherches par commande, et à égalité de date, elles peuvent viser trois flux différents.",
            reflexe: "Une seule lecture : ROW_NUMBER dans une CTE, comme dans l'exemple, sur les trois moteurs. Ou une jointure latérale : une sous-requête du `FROM` qui lit la ligne en cours.",
            moteurs: {
              sqlserver: "`OUTER APPLY (SELECT TOP (1) f.type, f.statut … ORDER BY f.date_recu DESC, f.id DESC) AS d`. `CROSS APPLY` perd les commandes sans flux, comme un `INNER JOIN`.",
              snowflake: "`LATERAL` existe, mais un `LIMIT` y est refusé dans une sous-requête liée : prends ROW_NUMBER et `QUALIFY`.",
              mysql: "`LEFT JOIN LATERAL (SELECT … ORDER BY … LIMIT 1) AS d ON TRUE` garde les commandes sans flux."
            }
          }
        ]
      },
      {
        titre: "Le tri",
        questions: [
          {
            id: "order-by",
            q: "As-tu mis un ORDER BY dans une sous-requête ou une CTE ?",
            pourquoi: "Un tri à l'intérieur ne trie pas le résultat final. Selon le moteur, il est refusé, ignoré, ou coûte un tri pour rien.",
            reflexe: "Trie une seule fois, dans la requête finale. À l'intérieur, un `ORDER BY` ne sert qu'à choisir les lignes d'un `TOP` ou d'un `LIMIT`. Le détail : « Je trie et je garde les N premiers ».",
            moteurs: {
              sqlserver: "Sans `TOP`, `OFFSET` ou `FOR XML` : erreur 1033."
            }
          }
        ]
      }
    ],
    pieges: [
      "Une sous-requête dans le `SELECT`, juste en recette, qui plante le jour où une commande reçoit un 2e flux (erreur 512 sur SQL Server).",
      "`NOT IN` sur une liste qui contient un NULL : 0 ligne, sans erreur.",
      "Une colonne sans alias, prise dans la table du dessus : `code IN (SELECT code FROM ligne_cde)` est toujours vrai.",
      "Un `EXISTS` sans lien vers la ligne du dessus : vrai pour toutes les lignes.",
      "Une CTE lourde citée deux fois : sur SQL Server, elle est calculée deux fois.",
      "`OPTION (MAXRECURSION 0)` pour faire taire l'erreur 530 : une boucle tourne alors sans fin.",
      "Une nomenclature en boucle (KIT-COUV et BACHE8) sur Snowflake : la requête tourne, et se paie, jusqu'au délai maximal, 2 jours par défaut.",
      "Sur MySQL, un chemin trop court dans l'ancre d'une CTE récursive : il est coupé, ou la requête plante."
    ],
    pratique: "Les requêtes Dataviz livrées par Divalto (page « Industrie ») enchaînent les CTE : `;WITH Params AS (…), ComposantsBase AS (…)`. La 1re porte les paramètres (les dates), chaque étape suivante lit la précédente. Lis-les étape par étape.",
    motsCles: ["sous-requête", "erreur 512", "subquery", "cte", "with", "cte récursive", "récursif", "exists", "in", "corrélée", "table temporaire", "cross apply", "lateral", "maxrecursion", "nomenclature"],
    voirAussi: ["filtrer", "joindre", "fenetre", "trier-paginer", "creer-vue", "relier-tables", "requete-lente"],
    dico: ["sous-requete", "with-cte", "cte-recursive", "exists", "in", "cross-apply", "table-temporaire"],
    outils: ["traduire", "astuces"],
    sources: [
      { titre: "WITH common_table_expression (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/with-common-table-expression-transact-sql" },
      { titre: "Erreurs du moteur de base de données 0 à 999 (512, 530)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/errors-events/database-engine-events-and-errors-0-to-999" },
      { titre: "Snowflake : Working with subqueries", url: "https://docs.snowflake.com/en/user-guide/querying-subqueries" },
      { titre: "Snowflake : WITH", url: "https://docs.snowflake.com/en/sql-reference/constructs/with" },
      { titre: "MySQL 8.4 : Subquery Errors", url: "https://dev.mysql.com/doc/refman/8.4/en/subquery-errors.html" },
      { titre: "MySQL 8.4 : WITH (Common Table Expressions)", url: "https://dev.mysql.com/doc/refman/8.4/en/with.html" },
      { titre: "MySQL 8.4 : Optimizing Derived Tables, View References, and Common Table Expressions", url: "https://dev.mysql.com/doc/refman/8.4/en/derived-table-optimization.html" },
      { titre: "Divalto : Requêtes Dataviz X.13 · Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "doublons",
    titre: "Je cherche ou j'enlève des doublons",
    famille: "Interroger",
    resume: "Les questions avant de chercher ou d'effacer des doublons : la définition, les presque-doublons, la ligne gardée, les lignes liées, la sauvegarde, la cause et la règle qui empêche leur retour.",
    besoins: [
      "trouver les doublons dans une table",
      "supprimer les lignes en double",
      "dédoublonner les clients avant une reprise",
      "une fiche client en double"
    ],
    essais: [
      "le meme fichier edi charge deux fois",
      "doublons avec des espaces et des majuscules",
      "delete des doublons avec row_number",
      "group by having count superieur a 1"
    ],
    exemple: {
      texte: "Avant de reprendre les clients dans Divalto, tu cherches les doublons. Première idée : le même SIREN, le numéro de l'entreprise. Deux fiches sortent : Piscines Dumont à Grenoble (C002) et à Lyon (C006). Le métier tranche : deux agences de la même société, donc pas un doublon. La bonne règle est le SIRET, le numéro de chaque établissement. D'abord définir, puis chercher, puis montrer les lignes entières.",
      code: "-- 1. Les groupes : le même SIREN plus d'une fois (les SIREN vides à part)\nSELECT siren, COUNT(*) AS nb\nFROM dbo.client\nWHERE siren IS NOT NULL\nGROUP BY siren\nHAVING COUNT(*) > 1;                     -- 423456789 : 2 fiches\n\n-- 2. Les lignes entières, à montrer au métier avant toute décision\nWITH d AS (\n  SELECT code, nom, ville, siren,\n         COUNT(*) OVER (PARTITION BY siren) AS nb\n  FROM dbo.client\n  WHERE siren IS NOT NULL\n)\nSELECT code, nom, ville, siren, nb\nFROM d\nWHERE nb > 1\nORDER BY siren, code;                    -- C002 Grenoble, C006 Lyon : deux agences",
      codes: {
        snowflake: "-- 1. Les groupes : le même SIREN plus d'une fois (les SIREN vides à part)\nSELECT siren, COUNT(*) AS nb\nFROM client\nWHERE siren IS NOT NULL\nGROUP BY siren\nHAVING COUNT(*) > 1;                     -- 423456789 : 2 fiches\n\n-- 2. Les lignes entières, en une requête\nSELECT code, nom, ville, siren,\n       COUNT(*) OVER (PARTITION BY siren) AS nb\nFROM client\nWHERE siren IS NOT NULL\nQUALIFY nb > 1\nORDER BY siren, code;                    -- C002 Grenoble, C006 Lyon : deux agences",
        mysql: "-- 1. Les groupes : le même SIREN plus d'une fois (les SIREN vides à part)\nSELECT siren, COUNT(*) AS nb\nFROM client\nWHERE siren IS NOT NULL\nGROUP BY siren\nHAVING COUNT(*) > 1;                     -- 423456789 : 2 fiches\n\n-- 2. Les lignes entières, à montrer au métier avant toute décision\nWITH d AS (\n  SELECT code, nom, ville, siren,\n         COUNT(*) OVER (PARTITION BY siren) AS nb\n  FROM client\n  WHERE siren IS NOT NULL\n)\nSELECT code, nom, ville, siren, nb\nFROM d\nWHERE nb > 1\nORDER BY siren, code;                    -- C002 Grenoble, C006 Lyon : deux agences"
      }
    },
    etapes: [
      {
        titre: "La définition",
        questions: [
          {
            id: "definition",
            q: "Quelles colonnes veulent dire « la même chose » pour le métier ?",
            pourquoi: "Un doublon dépend des colonnes choisies. Par SIREN, Piscines Dumont sort deux fois : ce sont deux agences. Effacer l'une perd une vraie agence, avec ses commandes et son encours.",
            reflexe: "Écris la règle avec le métier, en une phrase : « même SIRET », « même partenaire et même numéro de commande EDI ». Fais-la valider sur 10 cas réels avant toute suppression."
          },
          {
            id: "vides",
            q: "Que fais-tu des lignes où une colonne de la règle est vide ?",
            pourquoi: "Pour `GROUP BY`, tous les NULL (les cases vides) forment un seul groupe. Bleu Lagon et Pool & Garden, sans SIREN, sortent ensemble comme « doublons » : deux clients sans rapport.",
            reflexe: "Écarte les vides de la recherche (`WHERE siren IS NOT NULL`), comme dans l'exemple, et traite-les à part : une fiche sans SIREN est une fiche à compléter, pas un doublon."
          },
          {
            id: "presque",
            q: "Des valeurs presque égales (espaces, majuscules, accents) désignent-elles le même client ?",
            pourquoi: "'Hydro Sud', 'HYDRO SUD' et 'Hydro Sud ' (un espace à la fin) : selon le moteur, `GROUP BY nom` fait 1, 2 ou 3 groupes. Le doublon passe inaperçu, ou deux fiches sont réunies sans qu'on le veuille.",
            reflexe: "Groupe sur une forme nettoyée : `UPPER(TRIM(nom))`, sans accents si le métier le veut. Mieux : une colonne nettoyée au chargement. Cherche aussi les caractères invisibles : l'astuce « Repérer les caractères invisibles (espace insécable) ».",
            moteurs: {
              sqlserver: "Avec une collation (la règle de comparaison des textes) `_CI_` : 1 groupe ; la casse et les espaces de fin sont ignorés. Les accents comptent en `_AS`.",
              snowflake: "3 groupes : la casse et les espaces de fin comptent.",
              mysql: "Collation par défaut : 2 groupes. La casse et les accents sont ignorés, pas les espaces de fin (NO PAD)."
            }
          }
        ]
      },
      {
        titre: "Trouver et regarder",
        questions: [
          {
            id: "compter",
            q: "Combien de groupes en double, et combien de lignes en trop ?",
            pourquoi: "« 50 doublons » : 50 groupes, ou 50 lignes à effacer ? Sans ces deux chiffres, impossible de dire si le nettoyage a réussi, ni d'en rendre compte au métier.",
            reflexe: "Les groupes : `GROUP BY … HAVING COUNT(*) > 1`. Les lignes en trop : `COUNT(siren) - COUNT(DISTINCT siren)`, ici 5 - 4 = 1. Note les deux avant ; après le nettoyage, les lignes en trop valent 0."
          },
          {
            id: "lignes-entieres",
            q: "As-tu regardé les lignes entières, pas seulement les groupes ?",
            pourquoi: "`GROUP BY` rend une ligne par groupe, sans le détail. On ne voit pas que les deux Piscines Dumont ont deux villes, et on efface une vraie agence.",
            reflexe: "Mets le compte sur chaque ligne : `COUNT(*) OVER (PARTITION BY siren)` dans une CTE (une requête nommée par `WITH`), puis `WHERE nb > 1`, comme dans l'exemple. Montre cette liste au métier avant de décider.",
            moteurs: {
              snowflake: "En une requête : `QUALIFY COUNT(*) OVER (PARTITION BY siren) > 1`."
            }
          },
          {
            id: "distinct",
            q: "Un DISTINCT cache-t-il le problème au lieu de le régler ?",
            pourquoi: "`DISTINCT` retire les doublons du résultat, pas de la table. Il ne retire rien si une seule colonne diffère, comme l'heure de chargement. Et après une jointure, la liste paraît propre, mais les sommes restent fausses.",
            reflexe: "Cherche d'où vient la ligne en trop : un fichier chargé deux fois, une jointure qui multiplie. Corrige la cause. Garde `DISTINCT` pour lister des valeurs, pas pour réparer."
          }
        ]
      },
      {
        titre: "La ligne gardée",
        questions: [
          {
            id: "garder",
            q: "Quelle ligne garder : la plus récente, la plus complète, ou celle que l'ERP utilise ?",
            pourquoi: "Garder « une au hasard » peut garder la fiche sans SIREN et effacer celle qui a l'adresse à jour. Et si Divalto ou l'EDI utilisent l'autre numéro, leurs liens cassent.",
            reflexe: "Écris la règle dans l'ordre de la numérotation : `ROW_NUMBER() OVER (PARTITION BY siret ORDER BY date_modif DESC, id DESC)`. La ligne 1 est gardée. Le dernier critère, unique, rend le choix stable."
          },
          {
            id: "fusionner",
            q: "Faut-il reporter des informations de la ligne effacée sur la ligne gardée ?",
            pourquoi: "La fiche gardée n'a pas de téléphone ; la fiche effacée l'avait. Une suppression simple perd l'information pour de bon.",
            reflexe: "Complète d'abord la ligne gardée (`COALESCE(g.telephone, e.telephone)`), dans une mise à jour, puis efface. Garde une table de correspondance : ancien numéro, numéro gardé, date."
          }
        ]
      },
      {
        titre: "Les lignes liées",
        questions: [
          {
            id: "liees",
            q: "D'autres tables pointent-elles vers la ligne à effacer (commandes, factures) ?",
            pourquoi: "Les commandes du client effacé pointent vers un numéro qui n'existe plus. Selon le moteur, la suppression est refusée, ou passe en laissant des commandes orphelines (sans client), dont le CA sort des rapports.",
            reflexe: "Rattache d'abord les lignes liées à la ligne gardée, dans une transaction (tout ou rien) : `UPDATE commande SET client_id = @id_garde WHERE client_id = @id_double;`. Puis efface le doublon. Puis cherche les orphelins avec `NOT EXISTS`.",
            moteurs: {
              sqlserver: "La clé étrangère refuse le `DELETE` du client encore cité : erreur 547.",
              snowflake: "La clé étrangère n'est pas appliquée : le `DELETE` passe, et les commandes restent orphelines, sans erreur.",
              mysql: "InnoDB refuse le `DELETE` du client encore cité."
            }
          },
          {
            id: "ailleurs",
            q: "Le numéro effacé sert-il encore ailleurs : Divalto, EDI, Power BI, fichiers ?",
            pourquoi: "Un partenaire EDI envoie toujours l'ancien code client : le flux est rejeté, ou recrée la fiche effacée. Le doublon revient au prochain message.",
            reflexe: "Sers-toi de la table de correspondance (ancien numéro, numéro gardé) dans les flux et les rapports. Préviens les équipes qui utilisent l'ancien code avant de l'effacer."
          }
        ]
      },
      {
        titre: "Effacer sans risque",
        questions: [
          {
            id: "copie",
            q: "As-tu copié, avec la date, les lignes que tu vas effacer ?",
            pourquoi: "Une règle de doublon mal écrite efface des lignes uniques. Sans copie, il faut restaurer toute la base pour les retrouver.",
            reflexe: "Copie les lignes visées dans une table datée, et compte : lignes copiées = lignes en trop annoncées. Garde-la le temps des vérifications. Le détail : « Je supprime des lignes ».",
            moteurs: {
              snowflake: "Time Travel (le retour dans le passé, 1 jour par défaut) relit aussi la table d'avant. Un `CLONE` en garde une copie, sans recopier les données."
            }
          },
          {
            id: "effacer",
            q: "Comment effacer les lignes en trop, quand deux lignes sont identiques ?",
            pourquoi: "Deux lignes identiques en tout ne se distinguent pas dans un `WHERE` : un `DELETE` efface les deux, ou aucune. Il faut d'abord numéroter les lignes de chaque groupe.",
            reflexe: "Numérote avec la règle de choix, compte les lignes `rn > 1` par un `SELECT`, puis efface celles-là, dans une transaction. Recompte après : 0 ligne en trop. Sur SQL Server, le `DELETE` passe par la CTE (ci-dessous).",
            moteurs: {
              snowflake: "Pas de `DELETE` à travers une CTE. Réécris la table : `INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY ROW_NUMBER() OVER (…) = 1;`, dans une transaction. Avec un id unique : `DELETE FROM t USING (… QUALIFY … > 1) AS d WHERE t.id = d.id`.",
              mysql: "Joins la table à elle-même, numérotée : `DELETE c FROM client_import AS c JOIN (SELECT id, ROW_NUMBER() OVER (…) AS rn FROM client_import) AS d ON d.id = c.id WHERE d.rn > 1;`."
            },
            code: "WITH d AS (\n  SELECT ROW_NUMBER() OVER (PARTITION BY siret\n                            ORDER BY date_modif DESC, id DESC) AS rn\n  FROM dbo.client_import\n)\nDELETE FROM d WHERE rn > 1;   -- efface dans client_import"
          }
        ]
      },
      {
        titre: "La cause",
        questions: [
          {
            id: "cause",
            q: "D'où viennent les doublons : un import rejoué, une clé absente, une saisie ?",
            pourquoi: "Effacer sans chercher la cause, c'est recommencer chaque mois. Le même fichier EDI rejoué la nuit recrée les mêmes commandes au prochain passage.",
            reflexe: "Regarde les colonnes de trace des lignes en double : fichier, date de chargement, utilisateur. Deux lignes du même fichier : corrige le chargement (« J'importe un fichier »). Pas de clé métier : « Je choisis la clé primaire ».",
            moteurs: {
              snowflake: "Un `DELETE` garde l'historique de chargement : `COPY INTO` ne rechargera pas le même fichier, sauf `FORCE = TRUE` ou fichier modifié (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Empêcher le retour",
        questions: [
          {
            id: "unique",
            q: "Une contrainte UNIQUE, ou un index unique, empêche-t-elle les doublons de revenir ?",
            pourquoi: "Sans règle dans la base, le nettoyage tient jusqu'au prochain import. Une contrainte, ou un index unique (une table des matières qui refuse les doublons), est vérifiée par le moteur à chaque écriture.",
            reflexe: "Une fois la table propre, pose la règle sur la clé métier : `ALTER TABLE client ADD CONSTRAINT uq_client_siret UNIQUE (siret);`. Elle échoue s'il reste un doublon : c'est aussi ton dernier contrôle.",
            moteurs: {
              sqlserver: "Un seul NULL accepté ; pour « unique quand c'est rempli » : `CREATE UNIQUE INDEX … WHERE siret IS NOT NULL`. Les espaces de fin étant ignorés, 'C001' et 'C001 ' y sont un doublon.",
              snowflake: "`UNIQUE` est noté, pas appliqué (sauf sur une table hybride) : charge par `MERGE` (insérer ou mettre à jour selon la clé), et garde le contrôle `GROUP BY … HAVING` après chaque chargement.",
              mysql: "`UNIQUE` appliqué ; plusieurs NULL acceptés."
            }
          }
        ]
      }
    ],
    pieges: [
      "Effacer une des deux fiches Piscines Dumont, « en double » sur le SIREN : c'étaient deux agences, avec leurs commandes.",
      "`GROUP BY siren` sans écarter les NULL : deux clients sans SIREN sortent comme un doublon.",
      "Un `DELETE` sur deux lignes identiques en tout : les deux partent.",
      "Effacer le client en double avant de rattacher ses commandes : refus sur SQL Server et MySQL, commandes orphelines sur Snowflake.",
      "Un nettoyage sans corriger la cause : le même fichier rejoué recrée les doublons le mois suivant.",
      "Un `DISTINCT` dans le rapport au lieu de corriger la table : la liste est propre, les totaux restent faux.",
      "Sur Snowflake, compter sur `UNIQUE` : il n'est pas appliqué sur une table standard.",
      "Chercher les doublons sur le nom exact : 'HYDRO SUD' et 'Hydro Sud ' passent pour deux clients sur Snowflake."
    ],
    pratique: "Divalto peut signaler une pièce client en double (option du dossier) sur « Votre référence » ou « Votre pièce », comparées sans blancs, sans les signes `. , - _ / :` et sans casse. Intégrée par un flux, la pièce en double est créée « Suspendu », selon le paramétrage.",
    motsCles: ["doublon", "doublons", "en double", "dédoublonner", "deux fois", "supprimer les doublons", "having count", "row_number", "unique", "presque doublons", "fiche en double", "distinct", "nettoyage", "siret"],
    voirAussi: ["cle-primaire", "supprimer", "importer-fichier", "fenetre", "comparer-texte", "fusionner", "charger-snowflake", "migrer"],
    dico: ["group-by", "having", "count", "row-number", "distinct", "unique", "delete", "qualify"],
    outils: ["astuces"],
    sources: [
      { titre: "Supprimer les lignes en double d'une table SQL Server", url: "https://learn.microsoft.com/fr-fr/troubleshoot/sql/database-engine/development/remove-duplicate-rows-sql-server-tab" },
      { titre: "= (Comparaison de chaînes ou affectation) : les espaces de fin", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/string-comparison-assignment" },
      { titre: "Snowflake : DELETE", url: "https://docs.snowflake.com/en/sql-reference/sql/delete" },
      { titre: "Snowflake : INSERT (OVERWRITE)", url: "https://docs.snowflake.com/en/sql-reference/sql/insert" },
      { titre: "MySQL 8.4 : DELETE Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/delete.html" },
      { titre: "MySQL 8.4 : Restrictions on Subqueries", url: "https://dev.mysql.com/doc/refman/8.4/en/subquery-restrictions.html" },
      { titre: "MySQL 8.4 : Unicode Character Sets (NO PAD)", url: "https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-sets.html" },
      { titre: "Divalto : Contrôler les doublons en saisie de pièces (V10.6)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704717457/Contr+ler+les+doublons+en+saisie+de+pi+ces+V10.6" }
    ]
  },
  {
    id: "trier-paginer",
    titre: "Je trie et je garde les N premiers",
    famille: "Interroger",
    resume: "Les questions avant `ORDER BY` et `TOP` ou `LIMIT` : l'ordre garanti, les ex aequo, les NULL, le tri d'un texte, la page suivante, le top N par groupe.",
    besoins: [
      "trier et garder les 10 premiers",
      "afficher les plus grosses commandes avec top",
      "paginer un résultat page par page",
      "les 3 dernières commandes de chaque client"
    ],
    essais: [
      "top 10 sans order by",
      "offset fetch lent a la page 5000",
      "les null sortent en premier dans le tri",
      "limit avec des ex aequo sur snowflake"
    ],
    exemple: {
      texte: "Le tableau de bord de l'ADV montre « les 4 plus grosses commandes ». La 4e place est partagée : CDE-1002 et CDE-1006 sont ex aequo, à 1 290 €. Avec un simple `TOP (4)`, le moteur en garde une au hasard, et pas toujours la même. Avant d'écrire, tu décides avec le demandeur : les ex aequo gardés (5 lignes), ou exactement 4 lignes, départagées par une clé unique.",
      code: "-- Les ex aequo gardés : 5 lignes\nSELECT TOP (4) WITH TIES num_cde, montant_ht\nFROM dbo.commande\nORDER BY montant_ht DESC;\n\n-- Exactement 4 lignes, toujours les mêmes : une clé unique départage\nSELECT TOP (4) num_cde, montant_ht\nFROM dbo.commande\nORDER BY montant_ht DESC, num_cde;    -- CDE-1002 gardée, CDE-1006 non",
      codes: {
        snowflake: "-- Pas de WITH TIES : RANK garde les ex aequo (5 lignes)\nSELECT num_cde, montant_ht\nFROM commande\nQUALIFY RANK() OVER (ORDER BY montant_ht DESC) <= 4\nORDER BY montant_ht DESC, num_cde;\n\n-- Exactement 4 lignes, toujours les mêmes : une clé unique départage\nSELECT num_cde, montant_ht\nFROM commande\nORDER BY montant_ht DESC, num_cde\nLIMIT 4;                              -- CDE-1002 gardée, CDE-1006 non",
        mysql: "-- Ni TOP ni WITH TIES : RANK dans une CTE garde les ex aequo (5 lignes)\nWITH r AS (\n  SELECT num_cde, montant_ht, RANK() OVER (ORDER BY montant_ht DESC) AS rang\n  FROM commande\n)\nSELECT num_cde, montant_ht FROM r\nWHERE rang <= 4\nORDER BY montant_ht DESC, num_cde;\n\n-- Exactement 4 lignes, toujours les mêmes : une clé unique départage\nSELECT num_cde, montant_ht\nFROM commande\nORDER BY montant_ht DESC, num_cde\nLIMIT 4;                              -- CDE-1002 gardée, CDE-1006 non"
      }
    },
    etapes: [
      {
        titre: "L'ordre voulu",
        questions: [
          {
            id: "order-by-final",
            q: "Ton résultat a-t-il un ORDER BY dans la requête finale ?",
            pourquoi: "Sans `ORDER BY`, aucun ordre n'est garanti, même s'il « a l'air » bon aujourd'hui. Un nouvel index, plus de lignes, et le fichier EDI ou l'export sort dans un autre ordre.",
            reflexe: "Écris l'ordre dont le lecteur a besoin, dans la requête finale : `ORDER BY date_cde DESC, num_cde`. Un `TOP`, un `LIMIT` ou un `OFFSET` sans `ORDER BY` prend des lignes quelconques."
          },
          {
            id: "departage",
            q: "Ton ORDER BY finit-il par une colonne unique, qui départage les ex aequo ?",
            pourquoi: "À égalité sur le tri, le moteur rend les lignes dans l'ordre qu'il veut, et pas toujours le même. CDE-1002 et CDE-1006 échangent leur place, et la 4e commande du top change d'un jour à l'autre.",
            reflexe: "Ajoute en dernier une colonne unique : `ORDER BY montant_ht DESC, num_cde`. Le résultat devient le même à chaque exécution, et un `TOP` ou une page coupe toujours au même endroit."
          },
          {
            id: "ex-aequo",
            q: "À la dernière place, gardes-tu tous les ex aequo, ou exactement N lignes ?",
            pourquoi: "« Les 4 plus grosses commandes » : deux commandes à 1 290 € se partagent la 4e place. `TOP (4)` en garde une, au hasard : le rapport en oublie une, sans le dire.",
            reflexe: "Décide avec le demandeur, puis écris la règle en commentaire. Tous les ex aequo : 5 lignes ici. Exactement 4 : une clé unique départage, comme dans l'exemple.",
            moteurs: {
              sqlserver: "`TOP (4) WITH TIES`, avec un `ORDER BY` obligatoire.",
              snowflake: "Pas de `WITH TIES` : `QUALIFY RANK() OVER (ORDER BY …) <= 4`.",
              mysql: "Ni `TOP` ni `WITH TIES` : `RANK()` dans une CTE (une requête nommée par `WITH`), puis `WHERE rang <= 4`."
            }
          }
        ]
      },
      {
        titre: "L'écriture du moteur",
        questions: [
          {
            id: "syntaxe",
            q: "Quelle écriture ton moteur attend-il : TOP, LIMIT, ou OFFSET … FETCH ?",
            pourquoi: "Chaque moteur a la sienne. Une requête copiée d'un moteur à l'autre plante, ou garde d'autres lignes : sur MySQL, `LIMIT 10, 20` rend 20 lignes à partir de la 11e, pas 10.",
            reflexe: "Écris la forme de ton moteur, toujours avec un `ORDER BY`. Pour une page (sauter 20 lignes, en garder 10) : `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY`, ou `LIMIT 10 OFFSET 20`.",
            moteurs: {
              sqlserver: "`TOP (n)`, ou `OFFSET … FETCH`, qui exige un `ORDER BY`. `TOP` et `OFFSET` ne vont pas ensemble dans la même requête (sa doc).",
              snowflake: "`LIMIT … OFFSET`, `OFFSET … FETCH`, ou `TOP n` : `TOP n` et `LIMIT n` sont équivalents (sa doc).",
              mysql: "`LIMIT 10 OFFSET 20`, ou `LIMIT 20, 10` : le saut d'abord, puis le nombre. Pas de `TOP` ni de `FETCH`."
            }
          }
        ]
      },
      {
        titre: "Les NULL et le texte",
        questions: [
          {
            id: "null",
            q: "Où doivent sortir les lignes vides (NULL) : en tête, ou à la fin ?",
            pourquoi: "Chaque moteur a sa règle. Triés par ville, les clients commencent par Camping Les Flots (ville vide) sur SQL Server et MySQL, et finissent par lui sur Snowflake. Sur Snowflake, un top 10 en `DESC` commence par les dates vides.",
            reflexe: "Écris la place des NULL quand elle compte. Sinon, trie d'abord sur un test : `ORDER BY CASE WHEN ville IS NULL THEN 1 ELSE 0 END, ville`. Ou écarte-les (`WHERE … IS NOT NULL`) s'ils n'ont rien à faire là.",
            moteurs: {
              sqlserver: "NULL est la plus petite valeur : en tête en `ASC`, à la fin en `DESC`. Pas de `NULLS FIRST` ni de `NULLS LAST`.",
              snowflake: "Par défaut (`DEFAULT_NULL_ORDERING = LAST`), NULL est la plus grande valeur : à la fin en `ASC`, en tête en `DESC`. `NULLS LAST` le règle requête par requête.",
              mysql: "Comme SQL Server. Pas de `NULLS LAST` : `ORDER BY ville IS NULL, ville` met les vides à la fin."
            }
          },
          {
            id: "texte",
            q: "Le tri d'un texte suit-il l'ordre attendu : majuscules, minuscules, accents ?",
            pourquoi: "L'ordre d'un texte suit sa collation, la règle qui compare et trie les textes. En ordre binaire (base Divalto, Snowflake par défaut), « pH moins 5 kg » et « Épuisette de fond » sortent après « Robot » : minuscules et accents passent après les majuscules.",
            reflexe: "Pour une liste à lire, impose un tri à la française : une collation dans l'`ORDER BY`. Teste avec des majuscules, des minuscules, des accents et des chiffres. Pour un code, l'ordre binaire convient souvent.",
            moteurs: {
              sqlserver: "`ORDER BY libelle COLLATE French_CI_AS` : cette collation passe avant celle de la colonne (sa doc).",
              snowflake: "Sans collation, l'ordre des codes UTF-8 : toutes les majuscules avant les minuscules. `ORDER BY COLLATE(libelle, 'fr')` trie à la française.",
              mysql: "`utf8mb4_0900_ai_ci` ignore la casse et les accents : « Épuisette » se range avec les E, « pH » avec les P."
            }
          },
          {
            id: "nombre-texte",
            q: "Le nombre que tu tries est-il rangé en texte ?",
            pourquoi: "En texte, on compare caractère par caractère : '10' passe avant '9', et « Chlore lent 25 kg » avant « Chlore lent 5 kg ». Des numéros de lot sortent dans le désordre.",
            reflexe: "Trie sur la valeur convertie (`ORDER BY TRY_CAST(num_lot AS INT)`), ou range le nombre dans une colonne numérique. Un code de longueur fixe, avec ses zéros ('000042'), se trie bien en texte.",
            moteurs: {
              mysql: "Pas de `TRY_CAST` : `CAST(num_lot AS UNSIGNED)`. Une valeur comme 'A12' devient 0, avec un simple avertissement."
            }
          }
        ]
      },
      {
        titre: "La page suivante",
        questions: [
          {
            id: "pages-stables",
            q: "Une ligne peut-elle sortir sur deux pages, ou sur aucune ?",
            pourquoi: "Chaque page relance la requête. Si l'ordre a des ex aequo, ou si des lignes arrivent entre deux pages, une commande sort deux fois, et une autre jamais. Personne ne le voit.",
            reflexe: "Un ordre qui finit par une clé unique. Pour une liste qui bouge pendant qu'on la lit (les flux EDI du jour), pagine par clé : la page suivante part de la dernière ligne vue.",
            moteurs: {
              sqlserver: "Sa doc : des pages stables demandent un `ORDER BY` unique, et des données qui ne changent pas entre deux pages (sinon, une seule transaction en isolation snapshot ou serializable, des niveaux qui figent les données lues)."
            }
          },
          {
            id: "grand-offset",
            q: "Les pages lointaines restent-elles rapides, avec un grand OFFSET ?",
            pourquoi: "Pour sauter 100 000 lignes, le moteur doit les trouver et les trier, puis les jeter. Chaque page coûte plus que la précédente : la dernière est la plus chère.",
            reflexe: "Pagine par clé : garde la dernière clé vue, puis `WHERE id > @dernier_id ORDER BY id`, avec `TOP (20)` ou `LIMIT 20`. Un index sur `id` va droit à la page. Mesure la dernière page, pas la première."
          },
          {
            id: "cout-tri",
            q: "Le tri lui-même coûte-t-il cher : gros volume, aucun index dans cet ordre ?",
            pourquoi: "Trier des millions de lignes pour en garder 10 demande de la mémoire, parfois le disque. Sans aide, tout est lu et trié à chaque appel du rapport.",
            reflexe: "Filtre avant de trier (la période, le statut). Un index dans l'ordre du tri peut éviter le tri : le plan d'exécution (le chemin choisi par le moteur) le montre.",
            moteurs: {
              sqlserver: "Le plan montre un opérateur Sort. Un index sur `montant_ht DESC` peut le supprimer pour un `TOP`.",
              snowflake: "`ORDER BY … LIMIT` peut sauter des blocs de la table (« top-K pruning ») si la 1re colonne triée est un entier, une date, un horodatage ou un texte. En `DESC`, sur une colonne qui peut être NULL : seulement avec `NULLS LAST` (sa doc).",
              mysql: "`EXPLAIN` affiche « Using filesort » quand l'index ne sert pas au tri (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Le top N par groupe",
        questions: [
          {
            id: "par-groupe",
            q: "Veux-tu les N premiers en tout, ou les N premiers de chaque groupe ?",
            pourquoi: "`TOP (3)` garde 3 lignes en tout, pas 3 par client. « Les 3 dernières commandes de chaque client » n'en montre alors qu'une pour AquaBleu, qui en a 3.",
            reflexe: "Numérote dans chaque groupe : `ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC, id DESC)`, puis garde `rn <= 3`. Ex aequo compris : RANK. Voir « J'utilise une fonction de fenêtre ».",
            moteurs: {
              sqlserver: "Dans une CTE, puis `WHERE rn <= 3`. Ou `CROSS APPLY (SELECT TOP (3) … ORDER BY …)` pour chaque client.",
              snowflake: "`QUALIFY ROW_NUMBER() OVER (…) <= 3`, en une requête.",
              mysql: "Dans une CTE, puis `WHERE rn <= 3` : pas de `QUALIFY`."
            }
          }
        ]
      },
      {
        titre: "Où trier",
        questions: [
          {
            id: "tri-utile",
            q: "Le tri sert-il à quelqu'un, ou l'outil va-t-il retrier ?",
            pourquoi: "Power BI et Excel trient eux-mêmes chaque tableau et chaque visuel. Un `ORDER BY` sur 5 millions de lignes chargées dans Power BI coûte un tri, sans rien changer à l'affichage.",
            reflexe: "Trie en SQL quand l'ordre fait partie du résultat : un fichier, un export, un top N, une liste à lire telle quelle. Pour un chargement Power BI, laisse le tri à l'outil."
          },
          {
            id: "vue",
            q: "Ta vue, ta sous-requête ou ta CTE contient-elle un ORDER BY ?",
            pourquoi: "Un tri à l'intérieur ne trie pas la requête qui les lit. Un `SELECT TOP 100 PERCENT … ORDER BY` dans une vue est accepté, mais le résultat lu n'est pas trié pour autant.",
            reflexe: "Pas de tri dans une vue : trie dans la requête qui la lit. À l'intérieur, un `ORDER BY` ne sert qu'à choisir les lignes d'un `TOP` ou d'un `LIMIT`.",
            moteurs: {
              sqlserver: "Sans `TOP`, `OFFSET` ou `FOR XML` : erreur 1033. Avec eux, l'`ORDER BY` choisit les lignes, il ne trie pas le résultat (sa doc).",
              snowflake: "Accepté, mais il ne vaut que dans la sous-requête ; sa doc conseille de trier seulement au niveau final. Un `ORDER BY` et un `LIMIT` à deux niveaux : résultat imprévisible.",
              mysql: "L'optimiseur ignore l'`ORDER BY` d'une table dérivée ou d'une vue, sauf cas simples (sa doc)."
            }
          }
        ]
      }
    ],
    pieges: [
      "`TOP (10)` sans `ORDER BY` : 10 lignes quelconques, qui changent d'un jour à l'autre.",
      "Un top 4 avec deux ex aequo à la 4e place : `TOP (4)` en garde un au hasard.",
      "Sur Snowflake, `ORDER BY date_livraison DESC LIMIT 10` : les dates vides (NULL) sortent en tête.",
      "Des numéros de lot rangés en texte : '10' sort avant '9'.",
      "`LIMIT 10, 20` sur MySQL : 20 lignes à partir de la 11e, pas 10.",
      "Une pagination par `OFFSET` sur une liste qui bouge : une commande sur deux pages, une autre sur aucune.",
      "Un `ORDER BY` dans une vue, avec `TOP 100 PERCENT` : la requête qui lit la vue n'est pas triée pour autant.",
      "`TOP (3)` pour « les 3 dernières commandes de chaque client » : 3 lignes en tout."
    ],
    pratique: "Une base Divalto est en collation binaire (`Latin1_General_BIN`) : triée sur un libellé, une liste met les minuscules et les lettres accentuées après les majuscules. Pour une liste à lire, impose une collation française dans l'`ORDER BY`.",
    motsCles: ["trier", "tri", "order by", "top", "limit", "offset", "fetch", "pagination", "plus gros", "n premiers", "with ties", "ex aequo", "nulls last", "classement", "ordre de tri"],
    voirAussi: ["fenetre", "sous-requete", "comparer-texte", "requete-lente", "creer-vue", "creer-index", "exporter", "donnees-powerbi"],
    dico: ["order-by", "top", "offset-fetch", "rank", "row-number", "qualify", "collate"],
    outils: ["astuces", "traduire"],
    sources: [
      { titre: "SELECT - Clause ORDER BY (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/select-order-by-clause-transact-sql" },
      { titre: "TOP (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/top-transact-sql" },
      { titre: "Snowflake : ORDER BY", url: "https://docs.snowflake.com/en/sql-reference/constructs/order-by" },
      { titre: "Snowflake : LIMIT / FETCH", url: "https://docs.snowflake.com/en/sql-reference/constructs/limit" },
      { titre: "Snowflake : Top-K pruning", url: "https://docs.snowflake.com/en/user-guide/querying-top-k-pruning-optimization" },
      { titre: "MySQL 8.4 : LIMIT Query Optimization", url: "https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html" },
      { titre: "MySQL 8.4 : Working with NULL Values", url: "https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html" },
      { titre: "Divalto : Installation Divalto infinity serveur et licence", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10550739615/Installation+Divalto+infinity+serveur+et+licence" }
    ]
  },
  {
    id: "comparer-texte",
    titre: "Je compare ou je cherche du texte",
    famille: "Interroger",
    resume: "Les questions avant de comparer ou chercher du texte : la collation (casse, accents, espaces), les jokers de LIKE, l'index, le plein texte, Unicode, le rapprochement approché, les expressions régulières.",
    besoins: [
      "chercher un mot dans un libellé",
      "comparer des textes sans tenir compte des majuscules et des accents",
      "rechercher un client dont le nom ressemble",
      "faire une recherche plein texte"
    ],
    essais: [
      "geneve sans accent ne trouve pas genève",
      "ilike et collate sur snowflake",
      "regexp_like sur sql server 2025",
      "chercher un % ou un _ avec like"
    ],
    exemple: {
      texte: "Un partenaire EDI écrit les villes en majuscules, sans accent (le jeu de caractères UNOA) : 'GENEVE'. Ta fiche client dit 'Genève'. Avant de comparer, tu fixes la règle avec le métier : ni la casse, ni les accents ne comptent. Puis tu l'écris dans la requête, car chaque moteur a sa règle par défaut, sa collation : MySQL trouve Pool & Garden ; SQL Server (French_CI_AS) et Snowflake ne trouvent rien.",
      code: "-- La ville reçue dans le flux EDI : majuscules, sans accent (UNOA)\nSELECT code, nom, ville\nFROM dbo.client\nWHERE ville = 'GENEVE';                        -- French_CI_AS : 0 ligne (l'accent compte)\n\n-- La règle écrite : ni la casse, ni les accents\nSELECT code, nom, ville\nFROM dbo.client\nWHERE ville COLLATE French_CI_AI = 'GENEVE';   -- C005 Pool & Garden",
      codes: {
        snowflake: "-- La ville reçue dans le flux EDI : majuscules, sans accent (UNOA)\nSELECT code, nom, ville\nFROM client\nWHERE ville = 'GENEVE';                        -- 0 ligne : la casse et les accents comptent\n\n-- La règle écrite : ni la casse, ni les accents\nSELECT code, nom, ville\nFROM client\nWHERE COLLATE(ville, 'fr-ci-ai') = 'GENEVE';   -- C005 Pool & Garden",
        mysql: "-- La ville reçue dans le flux EDI : majuscules, sans accent (UNOA)\nSELECT code, nom, ville\nFROM client\nWHERE ville = 'GENEVE';            -- C005 : utf8mb4_0900_ai_ci ignore la casse et les accents\n\n-- La règle écrite, ici l'inverse : la casse et les accents comptent\nSELECT code, nom, ville\nFROM client\nWHERE ville COLLATE utf8mb4_0900_as_cs = 'GENEVE';   -- 0 ligne"
      }
    },
    etapes: [
      {
        titre: "La règle",
        questions: [
          {
            id: "regle",
            q: "Pour le métier, 'Genève', 'GENEVE' et 'geneve ' sont-ils la même valeur ?",
            pourquoi: "Si la règle n'est pas décidée, la collation du moteur, sa règle de comparaison des textes, décide à ta place. Elle change d'un moteur à l'autre : la même jointure trouve la fiche sur MySQL, et rien sur Snowflake.",
            reflexe: "Écris la règle : la casse, les accents, les espaces, la ponctuation comptent-ils ? Pour un code (article, client), en général tout compte. Pour un nom ou une ville, souvent rien. Puis applique-la dans la requête."
          },
          {
            id: "collation",
            q: "Quelle est la collation de chaque colonne comparée ?",
            pourquoi: "La collation peut changer d'une colonne à l'autre, même dans une seule base. Sans la connaître, tu ne sais pas ce que fait ton `=`, ni ton `LIKE`.",
            reflexe: "Lis-la avant d'écrire. Son nom dit la règle : CI = casse ignorée, CS = casse comptée, AI = accents ignorés, AS = accents comptés, BIN = binaire, tout compte.",
            moteurs: {
              sqlserver: "`SELECT name, collation_name FROM sys.columns WHERE object_id = OBJECT_ID('dbo.client');`. Une base Divalto est en `Latin1_General_BIN` : la casse et les accents comptent.",
              snowflake: "`SELECT DISTINCT COLLATION(ville) FROM client;` : NULL veut dire aucune collation, les textes sont comparés par leurs codes UTF-8, et tout compte.",
              mysql: "`SHOW FULL COLUMNS FROM client;`, colonne Collation. Par défaut : `utf8mb4_0900_ai_ci`."
            }
          }
        ]
      },
      {
        titre: "Casse, accents, espaces",
        questions: [
          {
            id: "casse-accents",
            q: "Ta comparaison doit-elle ignorer la casse, les accents, ou les deux ?",
            pourquoi: "`UPPER` des deux côtés règle la casse, pas les accents : 'GENEVE' ne trouve toujours pas 'GENÈVE'. Et une fonction sur la colonne empêche l'index (la table des matières de la table) de servir.",
            reflexe: "Écris la règle dans la comparaison : une collation explicite, comme dans l'exemple. Si la recherche est fréquente, une colonne prête à comparer (majuscules, sans accent), remplie au chargement et indexée.",
            moteurs: {
              sqlserver: "`ville COLLATE French_CI_AI = 'GENEVE'`. `French_CI_AS`, la collation française par défaut, ignore la casse mais compte les accents.",
              snowflake: "`ILIKE` ignore la casse, pas les accents. `COLLATE(ville, 'fr-ci-ai')` ignore les deux en `=` ; dans `LIKE` et `ILIKE`, seules les collations `upper`, `lower` et `trim` sont acceptées (sa doc).",
              mysql: "`utf8mb4_0900_ai_ci` ignore déjà la casse et les accents. Pour tout compter : `COLLATE utf8mb4_0900_as_cs`."
            }
          },
          {
            id: "espaces",
            q: "Les espaces à la fin du texte comptent-ils dans ta comparaison ?",
            pourquoi: "'C001 ', avec un espace venu d'un champ EDI de longueur fixe, égale 'C001' sur SQL Server, pas sur Snowflake, ni sur MySQL avec sa collation par défaut. La jointure garde la ligne sur un moteur, et la perd sur l'autre.",
            reflexe: "Enlève-les au chargement, une fois (`RTRIM`, ou `TRIM`). Ne compte pas sur la règle du moteur : elle change aussi entre `=` et `LIKE`.",
            moteurs: {
              sqlserver: "`=` ignore les espaces de fin. `LIKE` compte ceux du motif, et ceux de la colonne si elle est Unicode (`NVARCHAR`) (sa doc).",
              snowflake: "Ils comptent, sauf avec une collation `trim` ou `rtrim`.",
              mysql: "`=` les compte avec une collation NO PAD, comme celle par défaut ; `LIKE` les compte toujours (sa doc)."
            }
          },
          {
            id: "invisibles",
            q: "Des caractères invisibles se cachent-ils dans les valeurs : espace insécable, tabulation, retour à la ligne ?",
            pourquoi: "Copié d'Excel ou d'un PDF, 'C001' finit par une espace insécable. À l'écran, les deux valeurs sont identiques ; le `=` et la jointure échouent, et `TRIM` ne l'enlève pas.",
            reflexe: "Compare les longueurs, puis affiche le code du dernier caractère : 160 pour l'espace insécable, 9 pour la tabulation. Remplace-les au chargement. Voir l'astuce « Repérer les caractères invisibles (espace insécable) »."
          }
        ]
      },
      {
        titre: "LIKE et ses jokers",
        questions: [
          {
            id: "jokers",
            q: "Le texte cherché contient-il %, _ ou [, que LIKE prend pour des jokers ?",
            pourquoi: "Un joker remplace d'autres caractères. Dans `LIKE 'FA_2026%'`, le `_` remplace n'importe quel caractère : 'FA-2026-0301' est trouvé aussi. Et `LIKE '%50%%'`, pour chercher « 50% », trouve tout ce qui contient 50.",
            reflexe: "Échappe le joker avec `ESCAPE` : `LIKE '%50!%%' ESCAPE '!'` cherche un vrai %. Une saisie d'utilisateur collée dans un motif doit être échappée avant.",
            moteurs: {
              sqlserver: "`[ ]` est aussi un joker : `[0-9]`, un chiffre. Un vrai `[` s'écrit `[[]` (sa doc).",
              snowflake: "Pas de caractère d'échappement par défaut : écris `ESCAPE`. Pas de `[ ]` : `REGEXP_LIKE`.",
              mysql: "`\\` échappe déjà `%` et `_` par défaut, sauf en mode `NO_BACKSLASH_ESCAPES`."
            }
          }
        ]
      },
      {
        titre: "La vitesse",
        questions: [
          {
            id: "contient",
            q: "Ta recherche « contient » (LIKE '%…%') tourne-t-elle souvent, sur une grosse table ?",
            pourquoi: "Avec un joker au début, l'index ne peut pas servir : le moteur lit toutes les lignes, à chaque recherche. Invisible sur 8 articles, cela se paie sur 5 millions de libellés.",
            reflexe: "Un début connu (`LIKE 'CHL%'`) peut utiliser l'index. Pour chercher des mots dans des libellés, passe à la recherche plein texte (question suivante). Le détail de l'index : « Je filtre des lignes ».",
            moteurs: {
              snowflake: "Search Optimization (un service payant, édition Enterprise) `ON SUBSTRING(libelle)` aide `LIKE '%…%'`, si le morceau cherché fait au moins 5 caractères (sa doc)."
            }
          },
          {
            id: "fonction-colonne",
            q: "Ta règle met-elle une fonction ou un COLLATE sur la colonne comparée ?",
            pourquoi: "`UPPER(nom) = 'AQUABLEU'` ou `ville COLLATE French_CI_AI = …` : le moteur transforme chaque ligne avant de comparer. L'index ne peut plus aller droit à la valeur.",
            reflexe: "Si la recherche est fréquente, donne à la colonne la bonne collation dès sa création, ou ajoute une colonne calculée nettoyée, indexée. Compare le plan avant et après. Voir « J'utilise une fonction sur chaque ligne ».",
            moteurs: {
              snowflake: "Une collation dans le `WHERE`, différente de celle de la colonne, peut réduire ou supprimer l'élagage (sauter les blocs inutiles de la table) (sa doc)."
            }
          },
          {
            id: "plein-texte",
            q: "Cherches-tu des mots dans des textes longs, plutôt qu'un morceau de code ?",
            pourquoi: "`LIKE '%pompe%'` cherche des lettres, pas des mots : il trouve « télépompe », rate « POMPES » sur un moteur sensible à la casse, et lit toute la table. La recherche plein texte découpe le texte en mots, rangés dans un index.",
            reflexe: "Pour des mots dans des libellés, des descriptions ou des notes : un index plein texte. Il s'installe, se remplit et se paie : réserve-le aux recherches fréquentes sur de gros volumes.",
            moteurs: {
              sqlserver: "Full-Text Search : un composant à installer, un seul index plein texte par table, puis `CONTAINS` ou `FREETEXT` (sa doc).",
              snowflake: "`SEARCH(libelle, 'pompe filtre')` découpe en mots, sans réglage, et ignore la casse. Search Optimization `ON FULL_TEXT` l'accélère (édition Enterprise).",
              mysql: "Un index `FULLTEXT`, puis `MATCH (libelle) AGAINST ('pompe')`. Sur InnoDB, un mot de moins de 3 lettres n'est pas indexé, par défaut."
            }
          }
        ]
      },
      {
        titre: "Le type et l'alphabet",
        questions: [
          {
            id: "code-nombre",
            q: "Compares-tu un code rangé en texte à un nombre ?",
            pourquoi: "`code_postal = 69110` sur une colonne texte : le moteur convertit chaque ligne en nombre. L'index ne sert plus, et '2A004' (la Corse) fait planter la requête, ou devient 2 sur MySQL, avec un simple avertissement.",
            reflexe: "Écris la valeur dans le type de la colonne : `code_postal = '69110'`. Dans Divalto, `CE4 = '1'`. Le détail : « J'écris une valeur dans une requête »."
          },
          {
            id: "unicode-n",
            q: "Ta valeur Unicode s'écrit-elle avec N devant, face à une colonne NVARCHAR ?",
            pourquoi: "Sans le N, 'Łódź' passe d'abord par la page de codes de la base (un alphabet limité) : la valeur est abîmée avant la comparaison, qui ne trouve rien, sans erreur.",
            reflexe: "Colonne `NVARCHAR` : `N'Łódź'`. Colonne `VARCHAR` : pas de N, sinon toute la colonne est convertie et l'index sert mal. Déclare aussi tes paramètres dans le type de la colonne.",
            seulement: ["sqlserver"]
          }
        ]
      },
      {
        titre: "Ressemblances et motifs",
        questions: [
          {
            id: "approche",
            q: "Cherches-tu des valeurs qui se ressemblent : fautes de frappe, noms mal écrits ?",
            pourquoi: "'Piscine Dumond' et 'Piscines Dumont' ne sont égaux pour aucune collation. Un rapprochement de fichiers fournisseurs ou de prospects laisse passer ces presque-doublons.",
            reflexe: "Mesure la ressemblance, par exemple une distance d'édition (le nombre de lettres à changer : ici 2), sur des candidats déjà filtrés (même code postal). Fais valider les paires par un humain : jamais de fusion automatique.",
            moteurs: {
              sqlserver: "`SOUNDEX` et `DIFFERENCE` suivent la prononciation anglaise. `EDIT_DISTANCE` et `JARO_WINKLER_SIMILARITY` (SQL Server 2025) sont en préversion : option `PREVIEW_FEATURES`, déconseillée en production.",
              snowflake: "`EDITDISTANCE(a, b)` (la distance de Levenshtein) et `JAROWINKLER_SIMILARITY(a, b)`, de 0 à 100, sans tenir compte de la casse.",
              mysql: "Seulement `SOUNDEX`, prévu pour l'anglais et peu fiable en UTF-8 (sa doc). Pas de distance d'édition intégrée."
            }
          },
          {
            id: "regex",
            q: "Un motif LIKE suffit-il, ou faut-il une expression régulière ?",
            pourquoi: "Vérifier un format (un SIRET de 14 chiffres, un code 'AAA-999') avec LIKE devient vite illisible. Une expression régulière, un motif qui décrit le format, le dit en une ligne.",
            reflexe: "Garde LIKE pour « commence par » et « contient ». Pour un format : une expression régulière, testée sur des valeurs justes et fausses, avec un commentaire qui la dit en français. Ici, 5 SIREN ont bien 9 chiffres.",
            moteurs: {
              sqlserver: "Depuis SQL Server 2025 : `REGEXP_LIKE(siren, '^[0-9]{9}$')`, au niveau de compatibilité 170 (le réglage de version de la base) ; aussi `REGEXP_REPLACE`, `REGEXP_SUBSTR`… Rien avant. Elles ignorent la collation (sa doc).",
              snowflake: "`REGEXP_LIKE(siren, '[0-9]{9}')` : le motif est ancré aux deux bouts, donc « exactement 9 chiffres ». Pas de collation possible.",
              mysql: "`REGEXP_LIKE(siren, '^[0-9]{9}$')` ; la casse suit la collation, sauf option `'c'` ou `'i'`."
            }
          }
        ]
      },
      {
        titre: "Nettoyer à la source",
        questions: [
          {
            id: "nettoyer",
            q: "Les valeurs sont-elles nettoyées une fois, au chargement, plutôt que dans chaque requête ?",
            pourquoi: "`UPPER(TRIM(code))` répété dans chaque requête : quelqu'un l'oublie une fois, l'index ne sert plus, et deux rapports comparent différemment.",
            reflexe: "Au chargement : `TRIM`, `UPPER` pour les codes, caractères invisibles retirés, une forme sans accent si besoin. Garde la valeur brute à côté. Ensuite, compare des colonnes propres, sans fonction."
          }
        ]
      }
    ],
    pieges: [
      "`ville = 'GENEVE'` : trouvé sur MySQL, rien sur SQL Server (`French_CI_AS`) ni sur Snowflake. Même requête, résultats différents.",
      "`UPPER` des deux côtés pour ignorer la casse : les accents comptent toujours, et l'index ne sert plus.",
      "Un code reçu 'C001 ', avec un espace de fin : égal à 'C001' sur SQL Server, différent sur Snowflake et MySQL.",
      "`LIKE 'FA_2026%'` : le `_` est un joker, et 'FA-2026-0301' sort aussi.",
      "Sur Snowflake, `ILIKE` pour ignorer les accents : il n'ignore que la casse.",
      "`SOUNDEX` sur des noms français : il suit la prononciation anglaise.",
      "Une espace insécable copiée d'Excel : `TRIM` ne l'enlève pas, et la jointure échoue sans erreur.",
      "Une recherche « contient » sur 5 millions de libellés, à chaque frappe : toute la table est lue à chaque fois."
    ],
    pratique: "Une base Divalto est en `Latin1_General_BIN` : la casse et les accents comptent. Depuis la 10.12, des libellés passent en `Latin1_General_CI_AI`. Vérifie la collation de chaque champ comparé, surtout dans une surcharge.",
    motsCles: ["texte", "comparer", "chercher", "recherche", "casse", "majuscules", "accents", "collation", "like", "ilike", "espaces de fin", "plein texte", "soundex", "regex", "contient"],
    voirAussi: ["filtrer", "joindre", "doublons", "ecrire-valeur", "trier-paginer", "fonction-scalaire", "importer-fichier"],
    dico: ["like", "ilike", "collate", "upper-lower", "trim", "replace", "nvarchar", "len"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "Classement et prise en charge d'Unicode", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/collations/collation-and-unicode-support" },
      { titre: "LIKE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/like-transact-sql" },
      { titre: "Nouveautés de SQL Server 2025 (expressions régulières, recherche approchée)", url: "https://learn.microsoft.com/fr-fr/sql/sql-server/what-s-new-in-sql-server-2025" },
      { titre: "Snowflake : Collation support", url: "https://docs.snowflake.com/en/sql-reference/collation" },
      { titre: "Snowflake : SEARCH", url: "https://docs.snowflake.com/en/sql-reference/functions/search" },
      { titre: "MySQL 8.4 : String Comparison Functions and Operators", url: "https://dev.mysql.com/doc/refman/8.4/en/string-comparison-functions.html" },
      { titre: "MySQL 8.4 : Natural Language Full-Text Searches", url: "https://dev.mysql.com/doc/refman/8.4/en/fulltext-natural-language.html" },
      { titre: "Divalto : Avant migration, vérifier les modifications", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11750211627/Avant+migration+v+rifier+les+modifications" }
    ]
  }
]);
