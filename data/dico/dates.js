// Super dico SQL — catégorie « Dates » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (DATEADD -> date(d, '+30 days'), DATEDIFF(day) -> julianday,
// EOMONTH -> date(d, 'start of month', '+1 month', '-1 day'), DATEFROMPARTS / DATETRUNC -> date(d, 'start of month'),
// trimestre = (mois + 2) / 3) : script de contrôle verif.py (scratchpad dico). GETDATE et CURRENT_DATE : le jour
// d'exécution est écrit dans l'exemple (30/04/2026, 07/04/2026), comme la date d'arrêté du cours m03.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/functions : getdate, current-timestamp, sysutcdatetime, current-date
//   (SQL Server 2025), dateadd (dernier jour du mois), datediff (frontières franchies), datepart, year, month, day,
//   eomonth, datefromparts (date impossible = erreur), datetrunc (SQL Server 2022), date-and-time-data-types-and-functions.
// - Snowflake, docs.snowflake.com/en/sql-reference/functions : current_timestamp (alias GETDATE, LOCALTIMESTAMP),
//   sysdate (UTC, TIMESTAMP_NTZ), current_date, dateadd (alias TIMESTAMPADD ; 31/01 + 1 mois = 28/02), add_months
//   (garde la fin de mois), datediff, date_part, extract, year (QUARTER…), last_day, date_from_parts (valeurs hors
//   limites acceptées : mois 0 = décembre d'avant), date_trunc.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html : NOW (début de l'instruction), SYSDATE,
//   UTC_TIMESTAMP, CURDATE / CURRENT_DATE, DATE_ADD / DATE_SUB et INTERVAL (jour ramené au dernier du mois),
//   DATEDIFF(fin, début) en jours, TIMESTAMPDIFF(unité, début, fin), EXTRACT, YEAR, MONTH, QUARTER, LAST_DAY, MAKEDATE.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "getdate",
    nom: "GETDATE",
    type: "fonction",
    categorie: "Dates",
    definition: "Donne la date et l'heure de maintenant, au moment où la requête démarre.",
    moteurs: {
      sqlserver: "`GETDATE()` ou `CURRENT_TIMESTAMP` ; en heure universelle (UTC) : `SYSUTCDATETIME()`",
      snowflake: "`CURRENT_TIMESTAMP` ; `GETDATE()` en est un alias ; `SYSDATE()` donne l'heure UTC",
      mysql: "Pas de GETDATE : `NOW()` ou `CURRENT_TIMESTAMP` ; en UTC : `UTC_TIMESTAMP()`"
    },
    noms: ["CURRENT_TIMESTAMP", "NOW", "SYSDATETIME", "SYSDATE"],
    exemple: "-- Lancée le 30/04/2026 : l'âge de chaque facture, en jours\nSELECT num_fact, DATEDIFF(day, date_fact, GETDATE()) AS age_jours\nFROM facture;",
    exemples: {
      mysql: "-- Lancée le 30/04/2026 : l'âge de chaque facture, en jours\nSELECT num_fact, DATEDIFF(NOW(), date_fact) AS age_jours\nFROM facture;"
    },
    resultat: [["num_fact", "age_jours"], ["FA-2026-0301", 58], ["FA-2026-0302", 55], ["FA-2026-0303", 51], ["FA-2026-0401", 19]],
    piege: "GETDATE contient l'heure : `WHERE date_cde = GETDATE()` ne trouve rien, même pour une commande du jour. Compare à la date seule : `CAST(GETDATE() AS date)`.",
    pratique: "Sur Snowflake, CURRENT_TIMESTAMP suit le paramètre TIMEZONE, réglé par défaut sur America/Los_Angeles (Californie). Pour l'heure de Paris : `ALTER SESSION SET TIMEZONE = 'Europe/Paris';`.",
    motsCles: ["maintenant", "aujourd'hui", "heure", "date", "actuelle", "courante", "instant", "now", "horodatage", "timestamp", "système", "moment", "présent", "horloge"],
    voirAussi: ["current-date", "dateadd", "datediff", "cast"],
    module: "m03"
  },
  {
    id: "current-date",
    nom: "CURRENT_DATE",
    type: "fonction",
    categorie: "Dates",
    definition: "Donne la date du jour, sans l'heure.",
    moteurs: {
      sqlserver: "`CAST(GETDATE() AS date)` ; `CURRENT_DATE` existe seulement en 2025+",
      snowflake: "`CURRENT_DATE` (ou `CURRENT_DATE()`)",
      mysql: "`CURRENT_DATE` ou `CURDATE()`"
    },
    noms: ["CURDATE"],
    exemple: "-- Lancée le 07/04/2026 : les commandes du jour\nSELECT num_cde, canal, montant_ht\nFROM commande\nWHERE date_cde = CAST(GETDATE() AS date);",
    exemples: {
      snowflake: "-- Lancée le 07/04/2026 : les commandes du jour\nSELECT num_cde, canal, montant_ht\nFROM commande\nWHERE date_cde = CURRENT_DATE;",
      mysql: "-- Lancée le 07/04/2026 : les commandes du jour\nSELECT num_cde, canal, montant_ht\nFROM commande\nWHERE date_cde = CURRENT_DATE;"
    },
    resultat: [["num_cde", "canal", "montant_ht"], ["CDE-1007", "EDI", "7950.00"]],
    piege: "Sur une colonne date + heure (DATETIME), `= CAST(GETDATE() AS date)` ne garde que les lignes de minuit pile. Prends la journée entière : `>= CAST(GETDATE() AS date)` et `< DATEADD(day, 1, CAST(GETDATE() AS date))`.",
    pratique: "Pour contrôler chaque matin les flux de la veille, écris la date d'hier : `DATEADD(day, -1, CAST(GETDATE() AS date))` sur SQL Server, `CURRENT_DATE - 1` sur Snowflake, `CURRENT_DATE - INTERVAL 1 DAY` sur MySQL.",
    motsCles: ["aujourd'hui", "aujourdhui", "date du jour", "date", "jour", "courante", "actuelle", "curdate", "today", "maintenant", "quotidien", "journée", "calendrier"],
    voirAussi: ["getdate", "cast", "dateadd", "datediff"],
    module: "m02"
  },
  {
    id: "dateadd",
    nom: "DATEADD",
    type: "fonction",
    categorie: "Dates",
    definition: "Ajoute, ou retire, des jours, des mois ou des années à une date.",
    moteurs: {
      sqlserver: "`DATEADD(day, 30, d)` ; un nombre négatif retire",
      snowflake: "`DATEADD(day, 30, d)` (même écriture) ; `ADD_MONTHS(d, 1)` garde la fin de mois",
      mysql: "Pas de DATEADD : `DATE_ADD(d, INTERVAL 30 DAY)` ou `d + INTERVAL 30 DAY`"
    },
    noms: ["DATE_ADD", "ADD_MONTHS", "DATE_SUB", "TIMESTAMPADD"],
    exemple: "-- Échéance à 30 jours\nSELECT num_fact, date_fact,\n       DATEADD(day, 30, date_fact) AS echeance\nFROM facture;",
    exemples: {
      mysql: "-- Échéance à 30 jours\nSELECT num_fact, date_fact,\n       DATE_ADD(date_fact, INTERVAL 30 DAY) AS echeance\nFROM facture;"
    },
    resultat: [["num_fact", "date_fact", "echeance"], ["FA-2026-0301", "2026-03-03", "2026-04-02"], ["FA-2026-0302", "2026-03-06", "2026-04-05"], ["FA-2026-0303", "2026-03-10", "2026-04-09"], ["FA-2026-0401", "2026-04-11", "2026-05-11"]],
    piege: "`DATEADD(month, 1, '20260131')` donne le 28 février : le jour est ramené au dernier jour du mois. Une échéance « le 31 » glisse ainsi au 28 ; pour une fin de mois, repars de `EOMONTH`.",
    pratique: "DATEADD compte les jours du calendrier, week-ends compris. Pour un délai fournisseur en jours ouvrés, passe par une table calendrier : une ligne par jour, avec une colonne ouvré (oui ou non).",
    motsCles: ["ajouter", "retirer", "enlever", "jours", "mois", "années", "échéance", "décaler", "date", "interval", "délai", "semaines", "plus", "moins", "avancer"],
    voirAussi: ["datediff", "eomonth", "getdate", "datepart"],
    module: "m03"
  },
  {
    id: "datediff",
    nom: "DATEDIFF",
    type: "fonction",
    categorie: "Dates",
    definition: "Compte l'écart entre deux dates, en jours, en mois ou en années.",
    moteurs: {
      sqlserver: "`DATEDIFF(day, début, fin)` : compte les frontières franchies",
      snowflake: "`DATEDIFF(day, début, fin)` (même écriture, même règle)",
      mysql: "`DATEDIFF(fin, début)` : en jours seulement, ordre inversé ; autres unités : `TIMESTAMPDIFF(MONTH, début, fin)`"
    },
    noms: ["TIMESTAMPDIFF", "DATEDIFF_BIG"],
    exemple: "-- Âge des factures au 30/04/2026, en jours\nSELECT num_fact, date_fact,\n       DATEDIFF(day, date_fact, '20260430') AS age_jours\nFROM facture;",
    exemples: {
      snowflake: "-- Âge des factures au 30/04/2026, en jours\nSELECT num_fact, date_fact,\n       DATEDIFF(day, date_fact, '2026-04-30') AS age_jours\nFROM facture;",
      mysql: "-- Âge des factures au 30/04/2026, en jours\nSELECT num_fact, date_fact,\n       DATEDIFF('2026-04-30', date_fact) AS age_jours\nFROM facture;"
    },
    resultat: [["num_fact", "date_fact", "age_jours"], ["FA-2026-0301", "2026-03-03", 58], ["FA-2026-0302", "2026-03-06", 55], ["FA-2026-0303", "2026-03-10", 51], ["FA-2026-0401", "2026-04-11", 19]],
    piege: "DATEDIFF compte les frontières franchies, pas les durées : `DATEDIFF(year, '20251231', '20260101')` vaut 1 pour un seul jour. Pour un âge, retire 1 si l'anniversaire n'est pas passé (`TIMESTAMPDIFF` de MySQL, lui, compte des années pleines).",
    pratique: "Pour un horodatage en millisecondes depuis 1970 (format « epoch » de certaines API), `DATEDIFF(millisecond, '19700101', d)` plante sur SQL Server : le résultat dépasse un INT. Écris `DATEDIFF_BIG` (BIGINT).",
    motsCles: ["écart", "différence", "durée", "jours", "mois", "années", "âge", "ancienneté", "retard", "entre", "délai", "compter", "intervalle", "temps", "nombre"],
    voirAussi: ["dateadd", "getdate", "datepart", "current-date"],
    module: "m03"
  },
  {
    id: "datepart",
    nom: "DATEPART",
    type: "fonction",
    categorie: "Dates",
    definition: "Extrait une partie d'une date : l'année, le mois, le jour, le trimestre…",
    moteurs: {
      sqlserver: "`DATEPART(quarter, d)` ; raccourcis : `YEAR(d)`, `MONTH(d)`, `DAY(d)`",
      snowflake: "`DATE_PART(quarter, d)` ou `EXTRACT(quarter FROM d)` ; raccourcis : `YEAR(d)`, `MONTH(d)`, `QUARTER(d)`",
      mysql: "Pas de DATEPART : `EXTRACT(QUARTER FROM d)` ; raccourcis : `YEAR(d)`, `MONTH(d)`, `QUARTER(d)`"
    },
    noms: ["DATE_PART", "EXTRACT", "YEAR", "MONTH", "DAY", "QUARTER"],
    exemple: "SELECT num_cde, date_cde,\n       YEAR(date_cde) AS annee,\n       MONTH(date_cde) AS mois,\n       DATEPART(quarter, date_cde) AS trimestre\nFROM commande\nWHERE canal = 'EDI';",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       YEAR(date_cde) AS annee,\n       MONTH(date_cde) AS mois,\n       QUARTER(date_cde) AS trimestre\nFROM commande\nWHERE canal = 'EDI';",
      mysql: "SELECT num_cde, date_cde,\n       YEAR(date_cde) AS annee,\n       MONTH(date_cde) AS mois,\n       QUARTER(date_cde) AS trimestre\nFROM commande\nWHERE canal = 'EDI';"
    },
    resultat: [["num_cde", "date_cde", "annee", "mois", "trimestre"], ["CDE-1001", "2026-03-02", 2026, 3, 1], ["CDE-1003", "2026-03-09", 2026, 3, 1], ["CDE-1007", "2026-04-07", 2026, 4, 2]],
    piege: "`WHERE YEAR(date_cde) = 2026` enveloppe la colonne : l'index ne sert plus, toute la table est lue. Écris une plage : `date_cde >= '20260101' AND date_cde < '20270101'`.",
    pratique: "Pour un numéro de semaine comme en France (norme ISO : semaine du lundi au dimanche), écris `DATEPART(iso_week, d)` ; Snowflake : `WEEKISO(d)` ; MySQL : `WEEK(d, 3)`. La semaine « simple » (`week`) suit d'autres règles.",
    motsCles: ["extraire", "année", "mois", "jour", "trimestre", "semaine", "partie", "numéro", "year", "month", "day", "quarter", "extract", "heure", "date"],
    voirAussi: ["date-trunc", "eomonth", "datefromparts", "dateadd"],
    module: "m03"
  },
  {
    id: "eomonth",
    nom: "EOMONTH",
    type: "fonction",
    categorie: "Dates",
    definition: "Donne le dernier jour du mois d'une date : utile pour les échéances fin de mois.",
    moteurs: {
      sqlserver: "`EOMONTH(d)` ; fin du mois suivant : `EOMONTH(d, 1)`",
      snowflake: "Pas de EOMONTH : `LAST_DAY(d)` ; mois suivant : `LAST_DAY(DATEADD(month, 1, d))`",
      mysql: "Pas de EOMONTH : `LAST_DAY(d)` ; mois suivant : `LAST_DAY(d + INTERVAL 1 MONTH)`"
    },
    noms: ["LAST_DAY"],
    exemple: "SELECT num_fact, date_fact,\n       EOMONTH(date_fact) AS fin_de_mois,\n       EOMONTH(date_fact, 1) AS fin_mois_suivant\nFROM facture;",
    exemples: {
      snowflake: "SELECT num_fact, date_fact,\n       LAST_DAY(date_fact) AS fin_de_mois,\n       LAST_DAY(DATEADD(month, 1, date_fact)) AS fin_mois_suivant\nFROM facture;",
      mysql: "SELECT num_fact, date_fact,\n       LAST_DAY(date_fact) AS fin_de_mois,\n       LAST_DAY(date_fact + INTERVAL 1 MONTH) AS fin_mois_suivant\nFROM facture;"
    },
    resultat: [["num_fact", "date_fact", "fin_de_mois", "fin_mois_suivant"], ["FA-2026-0301", "2026-03-03", "2026-03-31", "2026-04-30"], ["FA-2026-0302", "2026-03-06", "2026-03-31", "2026-04-30"], ["FA-2026-0303", "2026-03-10", "2026-03-31", "2026-04-30"], ["FA-2026-0401", "2026-04-11", "2026-04-30", "2026-05-31"]],
    piege: "EOMONTH renvoie une date sans heure : face à une colonne date + heure, elle vaut minuit. `date_recu <= EOMONTH(@d)` oublie donc le dernier jour après 0 h ; écris `< DATEADD(day, 1, EOMONTH(@d))`.",
    pratique: "Pour une échéance à 30 jours fin de mois (+ 30 jours, puis fin du mois), écris `EOMONTH(DATEADD(day, 30, date_fact))`. Snowflake : `LAST_DAY(date_fact + 30)` ; MySQL : `LAST_DAY(date_fact + INTERVAL 30 DAY)`.",
    motsCles: ["fin", "dernier", "jour", "mois", "échéance", "clôture", "last_day", "mensuel", "arrêté", "période", "calendrier", "eom"],
    voirAussi: ["dateadd", "date-trunc", "datefromparts", "datepart"],
    module: "m03"
  },
  {
    id: "datefromparts",
    nom: "DATEFROMPARTS",
    type: "fonction",
    categorie: "Dates",
    definition: "Fabrique une date à partir de trois nombres : l'année, le mois et le jour.",
    moteurs: {
      sqlserver: "`DATEFROMPARTS(2026, 4, 30)` ; une date impossible plante",
      snowflake: "`DATE_FROM_PARTS(2026, 4, 30)` ; une valeur hors limites décale la date au lieu de planter",
      mysql: "Pas de DATEFROMPARTS : `MAKEDATE(2026, 1)` donne le 1er janvier ; ajoute `+ INTERVAL 3 MONTH` pour avril"
    },
    noms: ["DATE_FROM_PARTS", "MAKEDATE"],
    exemple: "-- Le 1er jour du mois de chaque commande\nSELECT num_cde, date_cde,\n       DATEFROMPARTS(YEAR(date_cde), MONTH(date_cde), 1) AS debut_mois\nFROM commande\nWHERE statut = 'EN_COURS';",
    exemples: {
      snowflake: "-- Le 1er jour du mois de chaque commande\nSELECT num_cde, date_cde,\n       DATE_FROM_PARTS(YEAR(date_cde), MONTH(date_cde), 1) AS debut_mois\nFROM commande\nWHERE statut = 'EN_COURS';",
      mysql: "-- Le 1er jour du mois de chaque commande\nSELECT num_cde, date_cde,\n       MAKEDATE(YEAR(date_cde), 1)\n         + INTERVAL (MONTH(date_cde) - 1) MONTH AS debut_mois\nFROM commande\nWHERE statut = 'EN_COURS';"
    },
    resultat: [["num_cde", "date_cde", "debut_mois"], ["CDE-1005", "2026-04-01", "2026-04-01"], ["CDE-1006", "2026-04-03", "2026-04-01"], ["CDE-1007", "2026-04-07", "2026-04-01"]],
    piege: "SQL Server refuse une date impossible (`DATEFROMPARTS(2026, 2, 30)` plante), mais Snowflake la décale sans rien dire : un mois 0 donne décembre de l'année d'avant. Contrôle tes nombres avant de fabriquer la date.",
    pratique: "Pour un exercice comptable de juillet à juin, fabrique les bornes depuis l'année : `>= DATEFROMPARTS(@annee, 7, 1)` et `< DATEFROMPARTS(@annee + 1, 7, 1)`. Snowflake : `DATE_FROM_PARTS` ; MySQL : `MAKEDATE(@annee, 1) + INTERVAL 6 MONTH`.",
    motsCles: ["fabriquer", "construire", "créer", "date", "année", "mois", "jour", "assembler", "premier", "début", "composer", "nombres", "makedate", "parties"],
    voirAussi: ["datepart", "eomonth", "date-trunc", "convert"],
    module: "m03"
  },
  {
    id: "date-trunc",
    nom: "DATETRUNC",
    type: "fonction",
    categorie: "Dates",
    definition: "Ramène une date au début de sa période : 1er jour du mois, du trimestre, de l'année…",
    moteurs: {
      sqlserver: "`DATETRUNC(month, d)` (2022+) ; avant : `DATEADD(day, 1, EOMONTH(d, -1))`",
      snowflake: "`DATE_TRUNC('month', d)` : la période en premier",
      mysql: "Pas de DATE_TRUNC : `d - INTERVAL (DAY(d) - 1) DAY` pour le 1er du mois"
    },
    noms: ["DATE_TRUNC"],
    exemple: "SELECT num_cde, date_cde,\n       DATETRUNC(month, date_cde) AS mois\nFROM commande\nWHERE canal = 'TEL';",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       DATE_TRUNC('month', date_cde) AS mois\nFROM commande\nWHERE canal = 'TEL';",
      mysql: "SELECT num_cde, date_cde,\n       date_cde - INTERVAL (DAY(date_cde) - 1) DAY AS mois\nFROM commande\nWHERE canal = 'TEL';"
    },
    resultat: [["num_cde", "date_cde", "mois"], ["CDE-1002", "2026-03-05", "2026-03-01"], ["CDE-1005", "2026-04-01", "2026-04-01"], ["CDE-1008", "2026-04-10", "2026-04-01"]],
    piege: "Pour un total par mois, `MONTH(date_cde)` met mars 2025 et mars 2026 dans la même case. Tronque plutôt au mois : `DATETRUNC(month, date_cde)` garde l'année.",
    pratique: "Pour un graphique mensuel dans Power BI ou Excel, garde le mois en vraie date (le 1er du mois, avec DATETRUNC). Un texte comme 'mars 2026' se trie par l'alphabet : avril passe avant mars.",
    motsCles: ["tronquer", "début", "mois", "premier", "jour", "année", "semaine", "période", "regrouper", "arrondir", "trimestre", "trunc", "ramener", "mensuel"],
    voirAussi: ["eomonth", "datefromparts", "datepart", "dateadd"],
    module: "m03"
  }
]);
