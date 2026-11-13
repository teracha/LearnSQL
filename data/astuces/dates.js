// Astuces SQL, famille « Dates utiles » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "debut-fin-de-mois",
    titre: "Trouver le premier et le dernier jour du mois",
    famille: "Dates utiles",
    besoins: ["avoir le premier jour du mois d'une date", "trouver le dernier jour du mois", "les bornes du mois dernier pour un rapport"],
    essais: ["fin de mois", "1er jour du mois en cours", "dernier jour du mois precedent", "eomonth"],
    moteurs: {
      sqlserver: "Dernier jour : `EOMONTH(d)` ; premier : `DATETRUNC(month, d)` (2022+), avant : `DATEADD(day, 1, EOMONTH(d, -1))`",
      snowflake: "Dernier jour : `LAST_DAY(d)` ; premier : `DATE_TRUNC('month', d)`",
      mysql: "Dernier jour : `LAST_DAY(d)` ; premier : `d - INTERVAL (DAY(d) - 1) DAY`"
    },
    exemple: "SELECT num_cde, date_cde,\n       DATEADD(day, 1, EOMONTH(date_cde, -1)) AS premier_jour,\n       EOMONTH(date_cde)                       AS dernier_jour\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       DATE_TRUNC('month', date_cde) AS premier_jour,\n       LAST_DAY(date_cde)            AS dernier_jour\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
      mysql: "SELECT num_cde, date_cde,\n       date_cde - INTERVAL (DAY(date_cde) - 1) DAY AS premier_jour,\n       LAST_DAY(date_cde)                          AS dernier_jour\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;"
    },
    resultat: [["num_cde", "date_cde", "premier_jour", "dernier_jour"], ["CDE-1001", "2026-03-02", "2026-03-01", "2026-03-31"], ["CDE-1005", "2026-04-01", "2026-04-01", "2026-04-30"], ["CDE-1008", "2026-04-10", "2026-04-01", "2026-04-30"]],
    piege: "Sur une colonne date + heure, `<= EOMONTH(d)` s'arrête au dernier jour à minuit : les flux de ce jour-là, après 0 h, sortent du rapport. Écris plutôt `<` le 1er du mois suivant.",
    pratique: "Sur SQL Server, le mois dernier sans date en dur : `>= DATEADD(day, 1, EOMONTH(GETDATE(), -2))` et `< DATEADD(day, 1, EOMONTH(GETDATE(), -1))`. Le rapport mensuel tourne alors seul, chaque mois.",
    motsCles: ["premier jour", "dernier jour", "fin de mois", "début de mois", "mois", "mois dernier", "1er du mois", "bornes"],
    voirAussi: ["eomonth", "date-trunc", "dateadd", "datefromparts"]
  },
  {
    id: "debut-annee-trimestre",
    titre: "Trouver le premier jour de l'année ou du trimestre",
    famille: "Dates utiles",
    besoins: ["avoir le 1er janvier de l'année d'une date", "trouver le premier jour du trimestre", "filtrer depuis le début de l'année en cours"],
    essais: ["debut d annee", "premier jour du trimestre en cours", "depuis le 1er janvier", "year to date"],
    moteurs: {
      sqlserver: "`DATETRUNC(year, d)`, `DATETRUNC(quarter, d)` (2022+) ; avant : `DATEFROMPARTS(YEAR(d), 1, 1)`, et pour le trimestre `DATEFROMPARTS(YEAR(d), (DATEPART(quarter, d) - 1) * 3 + 1, 1)`",
      snowflake: "`DATE_TRUNC('year', d)`, `DATE_TRUNC('quarter', d)`",
      mysql: "`MAKEDATE(YEAR(d), 1)` ; trimestre : `MAKEDATE(YEAR(d), 1) + INTERVAL (QUARTER(d) - 1) QUARTER`"
    },
    exemple: "SELECT num_fact, date_fact,\n       DATEFROMPARTS(YEAR(date_fact), 1, 1) AS debut_annee,\n       DATEFROMPARTS(YEAR(date_fact), (DATEPART(quarter, date_fact) - 1) * 3 + 1, 1)\n         AS debut_trimestre\nFROM facture\nWHERE id IN (1, 4)\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_fact, date_fact,\n       DATE_TRUNC('year', date_fact)    AS debut_annee,\n       DATE_TRUNC('quarter', date_fact) AS debut_trimestre\nFROM facture\nWHERE id IN (1, 4)\nORDER BY id;",
      mysql: "SELECT num_fact, date_fact,\n       MAKEDATE(YEAR(date_fact), 1) AS debut_annee,\n       MAKEDATE(YEAR(date_fact), 1) + INTERVAL (QUARTER(date_fact) - 1) QUARTER\n         AS debut_trimestre\nFROM facture\nWHERE id IN (1, 4)\nORDER BY id;"
    },
    resultat: [["num_fact", "date_fact", "debut_annee", "debut_trimestre"], ["FA-2026-0301", "2026-03-03", "2026-01-01", "2026-01-01"], ["FA-2026-0401", "2026-04-11", "2026-01-01", "2026-04-01"]],
    piege: "Le numéro du trimestre seul (`DATEPART(quarter, d)`, de 1 à 4) mélange les années : le 1er trimestre 2025 et celui de 2026 tombent dans le même groupe. Garde la date du début de trimestre : elle contient l'année.",
    pratique: "Depuis le début de l'année, sans date en dur : `date_cde >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)` ; Snowflake : `>= DATE_TRUNC('year', CURRENT_DATE)` ; MySQL : `>= MAKEDATE(YEAR(CURDATE()), 1)`. La période repart seule chaque 1er janvier.",
    motsCles: ["début d'année", "premier jour", "1er janvier", "trimestre", "année en cours", "depuis le début de l'année", "ytd", "début de trimestre", "exercice"],
    voirAussi: ["datefromparts", "date-trunc", "datepart"]
  },
  {
    id: "date-sans-heure",
    titre: "Enlever l'heure d'une date",
    famille: "Dates utiles",
    besoins: ["garder seulement la date, sans l'heure", "transformer une date et heure en date simple", "la date du jour sans l'heure"],
    essais: ["supprimer heures minutes secondes", "cast en date", "date d aujourd hui sans heure", "tronquer l heure d un datetime"],
    moteurs: {
      sqlserver: "`CAST(date_recu AS date)` ; aujourd'hui : `CAST(GETDATE() AS date)`",
      snowflake: "`date_recu::DATE` ou `TO_DATE(date_recu)` ; aujourd'hui : `CURRENT_DATE` ; `DATE_TRUNC('day', …)` garde un horodatage, à 00:00",
      mysql: "`DATE(date_recu)` ; aujourd'hui : `CURDATE()`"
    },
    exemple: "SELECT id, date_recu, CAST(date_recu AS date) AS jour\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;",
    exemples: {
      snowflake: "SELECT id, date_recu, date_recu::DATE AS jour\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;",
      mysql: "SELECT id, date_recu, DATE(date_recu) AS jour\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;"
    },
    resultat: [["id", "date_recu", "jour"], [1, "2026-03-02 06:10:00", "2026-03-02"], [2, "2026-03-09 06:12:00", "2026-03-09"], [3, "2026-03-16 06:05:00", "2026-03-16"], [5, "2026-04-07 06:08:00", "2026-04-07"]],
    piege: "Comparer une colonne date + heure à une date seule ne garde que minuit pile : `date_recu = '20260302'` ne trouve pas le flux de 6 h 10. Enlève l'heure, ou prends la journée entière : `>=` ce jour et `<` le lendemain.",
    pratique: "Dans Power BI, relie la table de dates à une colonne sans heure : une date avec heure ne trouve pas son jour dans la relation, et ses montants tombent dans « (vide) ».",
    motsCles: ["heure", "sans l'heure", "enlever l'heure", "date seule", "datetime", "cast date", "tronquer", "minuit", "aujourd'hui", "date du jour"],
    voirAussi: ["cast", "current-date", "getdate", "types-date"]
  },
  {
    id: "total-par-mois",
    titre: "Faire un total par mois",
    famille: "Dates utiles",
    besoins: ["calculer le chiffre d'affaires de chaque mois", "regrouper les commandes par mois et par année", "un total mensuel pour un graphique"],
    essais: ["ca mensuel", "somme des ventes par mois", "group by mois annee", "nombre de commandes par mois"],
    moteurs: {
      sqlserver: "`GROUP BY DATEFROMPARTS(YEAR(date_cde), MONTH(date_cde), 1)` ; 2022+ : `GROUP BY DATETRUNC(month, date_cde)`",
      snowflake: "`GROUP BY DATE_TRUNC('month', date_cde)`",
      mysql: "`GROUP BY` le 1er du mois : `date_cde - INTERVAL (DAY(date_cde) - 1) DAY`"
    },
    exemple: "SELECT DATEFROMPARTS(YEAR(date_cde), MONTH(date_cde), 1) AS mois,\n       COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY DATEFROMPARTS(YEAR(date_cde), MONTH(date_cde), 1)\nORDER BY mois;",
    exemples: {
      snowflake: "SELECT DATE_TRUNC('month', date_cde) AS mois,\n       COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY DATE_TRUNC('month', date_cde)\nORDER BY mois;",
      mysql: "SELECT date_cde - INTERVAL (DAY(date_cde) - 1) DAY AS mois,\n       COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY mois\nORDER BY mois;"
    },
    resultat: [["mois", "nb_cdes", "ca"], ["2026-03-01", 3, "8455.00"], ["2026-04-01", 4, "9637.80"]],
    piege: "`GROUP BY MONTH(date_cde)` seul met mars 2025 et mars 2026 dans la même ligne, sans erreur. Groupe par le 1er du mois (ou par l'année et le mois) : l'année reste dans le groupe.",
    pratique: "Sur SQL Server, répète l'expression entière dans le GROUP BY : l'alias `mois` y est inconnu. Snowflake et MySQL acceptent l'alias. Garde le mois en vraie date : Power BI le trie dans l'ordre.",
    motsCles: ["par mois", "mensuel", "mois", "total", "chiffre d'affaires", "ca", "regrouper", "année", "graphique", "group by"],
    voirAussi: ["group-by", "date-trunc", "datefromparts", "sum"]
  },
  {
    id: "echeance-fin-de-mois",
    titre: "Calculer une échéance à 45 jours fin de mois",
    famille: "Dates utiles",
    besoins: ["calculer la date d'échéance d'une facture à 45 jours fin de mois", "une échéance à 30 jours fin de mois", "la date limite de paiement d'une facture"],
    essais: ["echeance 45j fdm", "date de reglement a 30 jours fin de mois", "calculer la date d echeance", "delai de paiement fin de mois"],
    moteurs: {
      sqlserver: "`EOMONTH(DATEADD(day, 45, date_fact))` ; l'autre lecture, fin de mois puis 45 jours : `DATEADD(day, 45, EOMONTH(date_fact))`",
      snowflake: "`LAST_DAY(DATEADD(day, 45, date_fact))` ; ou `DATEADD(day, 45, LAST_DAY(date_fact))`",
      mysql: "`LAST_DAY(date_fact + INTERVAL 45 DAY)` ; ou `LAST_DAY(date_fact) + INTERVAL 45 DAY`"
    },
    exemple: "SELECT num_fact, date_fact,\n       EOMONTH(DATEADD(day, 45, date_fact)) AS echeance_1,  -- + 45 jours, puis fin de mois\n       DATEADD(day, 45, EOMONTH(date_fact)) AS echeance_2   -- fin de mois, puis + 45 jours\nFROM facture\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_fact, date_fact,\n       LAST_DAY(DATEADD(day, 45, date_fact)) AS echeance_1,\n       DATEADD(day, 45, LAST_DAY(date_fact)) AS echeance_2\nFROM facture\nORDER BY id;",
      mysql: "SELECT num_fact, date_fact,\n       LAST_DAY(date_fact + INTERVAL 45 DAY) AS echeance_1,\n       LAST_DAY(date_fact) + INTERVAL 45 DAY AS echeance_2\nFROM facture\nORDER BY id;"
    },
    resultat: [["num_fact", "date_fact", "echeance_1", "echeance_2"], ["FA-2026-0301", "2026-03-03", "2026-04-30", "2026-05-15"], ["FA-2026-0302", "2026-03-06", "2026-04-30", "2026-05-15"], ["FA-2026-0303", "2026-03-10", "2026-04-30", "2026-05-15"], ["FA-2026-0401", "2026-04-11", "2026-05-31", "2026-06-14"]],
    piege: "« 45 jours fin de mois » se lit de deux façons, avec deux dates : le 30 avril ou le 15 mai pour la facture du 3 mars. Le contrat ou les conditions de vente disent laquelle : ne choisis pas seul.",
    pratique: "En France, la loi limite le délai de paiement entre entreprises à 60 jours après la date de la facture, ou à 45 jours fin de mois. Une échéance plus lointaine mérite une alerte.",
    motsCles: ["échéance", "fin de mois", "45 jours", "30 jours", "paiement", "date limite", "règlement", "délai de paiement", "fdm", "facture"],
    voirAussi: ["eomonth", "dateadd"]
  },
  {
    id: "jours-entre-deux-dates",
    titre: "Compter les jours entre deux dates",
    famille: "Dates utiles",
    besoins: ["calculer le nombre de jours entre deux dates", "le nombre de jours de retard d'une facture", "combien de jours depuis la date de facture"],
    essais: ["difference en jours entre 2 dates", "datediff en jours", "nb de jours ecoules depuis la commande", "duree en jours"],
    moteurs: {
      sqlserver: "`DATEDIFF(day, début, fin)`",
      snowflake: "`DATEDIFF(day, début, fin)`, ou `fin - début` entre deux DATE",
      mysql: "`DATEDIFF(fin, début)` : l'ordre est inversé"
    },
    exemple: "-- Âge des factures non payées au 30 avril 2026 (date d'arrêté)\nSELECT num_fact, date_fact, statut,\n       DATEDIFF(day, date_fact, '20260430') AS jours\nFROM facture\nWHERE statut <> 'PAYEE'\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_fact, date_fact, statut,\n       DATEDIFF(day, date_fact, '2026-04-30'::DATE) AS jours\nFROM facture\nWHERE statut <> 'PAYEE'\nORDER BY id;",
      mysql: "SELECT num_fact, date_fact, statut,\n       DATEDIFF('2026-04-30', date_fact) AS jours\nFROM facture\nWHERE statut <> 'PAYEE'\nORDER BY id;"
    },
    resultat: [["num_fact", "date_fact", "statut", "jours"], ["FA-2026-0303", "2026-03-10", "RETARD", 51], ["FA-2026-0401", "2026-04-11", "EMISE", 19]],
    piege: "DATEDIFF compte les minuits franchis, pas des durées de 24 h : du lundi 23 h au mardi 1 h, il dit 1 jour. Et MySQL inverse l'ordre, `DATEDIFF(fin, début)` : à l'envers, le résultat devient négatif.",
    pratique: "Pour une balance âgée, range les jours en tranches avec un `CASE` : 0-30, 31-60, plus de 60. Compte depuis l'échéance, pas depuis la facture, si c'est le retard de paiement que tu suis.",
    motsCles: ["jours", "combien de jours", "écart", "différence", "retard", "durée", "délai", "écoulés", "calendaires", "datediff"],
    voirAussi: ["datediff", "dateadd", "case"]
  },
  {
    id: "age-en-annees",
    titre: "Calculer un âge ou une ancienneté en années",
    famille: "Dates utiles",
    besoins: ["calculer l'âge exact à partir de la date de naissance", "l'ancienneté d'un client ou d'un contrat en années pleines", "le nombre d'années révolues entre deux dates"],
    essais: ["age a partir de la date de naissance", "anciennete en annees", "nombre d annees completes", "datediff year donne un an de trop"],
    moteurs: {
      sqlserver: "`DATEDIFF(year, d, ref)`, moins 1 si l'anniversaire n'est pas passé : `- CASE WHEN MONTH(d) * 100 + DAY(d) > MONTH(ref) * 100 + DAY(ref) THEN 1 ELSE 0 END`",
      snowflake: "Même calcul : `DATEDIFF(year, d, ref)` compte aussi les changements d'année",
      mysql: "`TIMESTAMPDIFF(YEAR, d, ref)` : les années pleines, directement"
    },
    exemple: "-- Années pleines au 5 mars 2027 (date d'arrêté)\nSELECT num_cde, date_cde,\n       DATEDIFF(year, date_cde, '20270305') AS ecart_annees,\n       DATEDIFF(year, date_cde, '20270305')\n         - CASE WHEN MONTH(date_cde) * 100 + DAY(date_cde) > 305   -- 305 = 5 mars\n                THEN 1 ELSE 0 END AS annees_pleines\nFROM commande\nWHERE id <= 4\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       DATEDIFF(year, date_cde, '2027-03-05'::DATE) AS ecart_annees,\n       DATEDIFF(year, date_cde, '2027-03-05'::DATE)\n         - CASE WHEN MONTH(date_cde) * 100 + DAY(date_cde) > 305   -- 305 = 5 mars\n                THEN 1 ELSE 0 END AS annees_pleines\nFROM commande\nWHERE id <= 4\nORDER BY id;",
      mysql: "SELECT num_cde, date_cde,\n       YEAR('2027-03-05') - YEAR(date_cde)       AS ecart_annees,\n       TIMESTAMPDIFF(YEAR, date_cde, '2027-03-05') AS annees_pleines\nFROM commande\nWHERE id <= 4\nORDER BY id;"
    },
    resultat: [["num_cde", "date_cde", "ecart_annees", "annees_pleines"], ["CDE-1001", "2026-03-02", 1, 1], ["CDE-1002", "2026-03-05", 1, 1], ["CDE-1003", "2026-03-09", 1, 0], ["CDE-1004", "2026-03-12", 1, 0]],
    piege: "`DATEDIFF(year, …)` compte les changements d'année, pas les années pleines : il dit 1 pour CDE-1003, qui n'a pas encore un an au 5 mars 2027. Retire 1 tant que l'anniversaire n'est pas passé.",
    pratique: "Même logique pour une ancienneté en mois (abonnement, contrat) : `DATEDIFF(month, …)` moins 1 si le jour n'est pas atteint. Sur MySQL, `TIMESTAMPDIFF(MONTH, d, ref)` donne directement les mois pleins.",
    motsCles: ["âge", "ancienneté", "années", "années pleines", "date de naissance", "anniversaire", "révolues", "an", "salarié", "contrat"],
    voirAussi: ["datediff", "case", "datepart"]
  },
  {
    id: "semaine-iso",
    titre: "Trouver le numéro de semaine (norme ISO)",
    famille: "Dates utiles",
    besoins: ["avoir le numéro de semaine d'une date, comme en France", "regrouper les commandes par semaine", "la semaine ISO de chaque commande"],
    essais: ["numero de semaine", "semaine 1 a 53", "week iso", "chiffre d affaires par semaine"],
    moteurs: {
      sqlserver: "`DATEPART(iso_week, d)` ; l'année de cette semaine : `YEAR(DATEADD(day, 26 - DATEPART(iso_week, d), d))`",
      snowflake: "`WEEKISO(d)` ; l'année de cette semaine : `YEAROFWEEKISO(d)`",
      mysql: "`WEEK(d, 3)` ; l'année et la semaine ensemble : `YEARWEEK(d, 3)` (202653)"
    },
    exemple: "SELECT num_cde, date_cde,\n       DATEPART(iso_week, date_cde) AS semaine\nFROM commande\nWHERE id >= 4\nORDER BY date_cde;",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       WEEKISO(date_cde) AS semaine\nFROM commande\nWHERE id >= 4\nORDER BY date_cde;",
      mysql: "SELECT num_cde, date_cde,\n       WEEK(date_cde, 3) AS semaine\nFROM commande\nWHERE id >= 4\nORDER BY date_cde;"
    },
    resultat: [["num_cde", "date_cde", "semaine"], ["CDE-1004", "2026-03-12", 11], ["CDE-1005", "2026-04-01", 14], ["CDE-1006", "2026-04-03", 14], ["CDE-1007", "2026-04-07", 15], ["CDE-1008", "2026-04-10", 15]],
    piege: "Le vendredi 1er janvier 2027 est en semaine 53… de l'année 2026 : grouper par `YEAR(d)` et semaine coupe cette semaine en deux. Groupe par l'année ISO et la semaine, et évite `DATEPART(week, d)`, sans iso, qui suit d'autres règles.",
    pratique: "Pour un axe « semaine » dans Power BI, fabrique une clé année ISO × 100 + semaine (202653) : elle se trie bien, même au passage de l'année.",
    motsCles: ["semaine", "numéro de semaine", "iso", "week", "par semaine", "hebdomadaire", "semaine 53", "iso_week"],
    voirAussi: ["datepart", "date-trunc"]
  },
  {
    id: "jour-en-lettres",
    titre: "Afficher le jour de la semaine en lettres",
    famille: "Dates utiles",
    besoins: ["afficher le nom du jour (lundi, mardi…) d'une date", "savoir quel jour de la semaine tombe une commande", "le jour de la semaine en français"],
    essais: ["nom du jour en francais", "lundi mardi mercredi a partir d une date", "dayname", "quel jour de la semaine etait le 2 mars"],
    moteurs: {
      sqlserver: "`FORMAT(d, 'dddd', 'fr-FR')` → 'mercredi' ; `DATENAME(weekday, d)` suit la langue de la session",
      snowflake: "`DAYNAME(d)` → 'Wed' (anglais, 3 lettres) ; en français : `DECODE(DAYOFWEEKISO(d), 1, 'lundi', 2, 'mardi', …)`",
      mysql: "`DAYNAME(d)` → 'Wednesday' ; en français : `SET lc_time_names = 'fr_FR';` avant"
    },
    exemple: "SELECT num_cde, date_cde,\n       FORMAT(date_cde, 'dddd', 'fr-FR') AS jour\nFROM commande\nWHERE id >= 5\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       DECODE(DAYOFWEEKISO(date_cde), 1, 'lundi', 2, 'mardi', 3, 'mercredi',\n              4, 'jeudi', 5, 'vendredi', 6, 'samedi', 7, 'dimanche') AS jour\nFROM commande\nWHERE id >= 5\nORDER BY id;",
      mysql: "SET lc_time_names = 'fr_FR';\nSELECT num_cde, date_cde, DAYNAME(date_cde) AS jour\nFROM commande\nWHERE id >= 5\nORDER BY id;"
    },
    resultat: [["num_cde", "date_cde", "jour"], ["CDE-1005", "2026-04-01", "mercredi"], ["CDE-1006", "2026-04-03", "vendredi"], ["CDE-1007", "2026-04-07", "mardi"], ["CDE-1008", "2026-04-10", "vendredi"]],
    piege: "`DATENAME(weekday, d)` et `DATEPART(weekday, d)` dépendent de la session : 'Wednesday' sur un serveur anglais, et lundi n'y vaut pas toujours 1 (réglage DATEFIRST). `FORMAT` avec 'fr-FR' donne le même nom partout, mais il est lent sur beaucoup de lignes.",
    pratique: "Pour trier les jours, garde aussi leur numéro, 1 = lundi : `DAYOFWEEKISO(d)` (Snowflake), `WEEKDAY(d) + 1` (MySQL), `(DATEPART(weekday, d) + @@DATEFIRST - 2) % 7 + 1` (SQL Server). Le nom seul se trie par l'alphabet.",
    motsCles: ["nom du jour", "jour de la semaine", "lundi", "en lettres", "français", "samedi", "dimanche", "week-end"],
    voirAussi: ["format", "datepart"]
  },
  {
    id: "jours-ouvres",
    titre: "Compter les jours ouvrés entre deux dates",
    famille: "Dates utiles",
    besoins: ["calculer le nombre de jours ouvrés entre deux dates", "un délai en jours ouvrés, sans les week-ends ni les jours fériés", "compter les jours travaillés depuis une commande"],
    essais: ["jours ouvrables entre 2 dates", "networkdays en sql", "delai de livraison en jours ouvres", "sans samedi dimanche ni feries"],
    moteurs: {
      sqlserver: "Pas de fonction : une table `calendrier` (une ligne par jour, `ouvre` = 1 ou 0), puis on compte ses jours ouvrés ; week-end : `DATEDIFF(day, '19000101', jour) % 7 >= 5` (le 1er janvier 1900 était un lundi)",
      snowflake: "Pas de fonction : la même table calendrier ; week-end : `DAYOFWEEKISO(jour) >= 6`",
      mysql: "Pas de fonction : la même table calendrier ; week-end : `WEEKDAY(jour) >= 5` (0 = lundi)"
    },
    exemple: "-- calendrier : une ligne par jour ; ouvre = 0 le samedi, le dimanche\n-- et les jours fériés (lundi de Pâques le 6 avril 2026). Arrêté au 15 avril.\nSELECT c.num_cde, c.date_cde,\n       DATEDIFF(day, c.date_cde, '20260415') AS jours_calendaires,\n       COUNT(k.jour)                          AS jours_ouvres\nFROM commande AS c\nLEFT JOIN calendrier AS k\n       ON k.jour > c.date_cde AND k.jour <= '20260415' AND k.ouvre = 1\nWHERE c.statut = 'EN_COURS'\nGROUP BY c.num_cde, c.date_cde\nORDER BY c.date_cde;",
    exemples: {
      snowflake: "SELECT c.num_cde, c.date_cde,\n       DATEDIFF(day, c.date_cde, '2026-04-15'::DATE) AS jours_calendaires,\n       COUNT(k.jour)                                  AS jours_ouvres\nFROM commande AS c\nLEFT JOIN calendrier AS k\n       ON k.jour > c.date_cde AND k.jour <= '2026-04-15'::DATE AND k.ouvre = 1\nWHERE c.statut = 'EN_COURS'\nGROUP BY c.num_cde, c.date_cde\nORDER BY c.date_cde;",
      mysql: "SELECT c.num_cde, c.date_cde,\n       DATEDIFF('2026-04-15', c.date_cde) AS jours_calendaires,\n       COUNT(k.jour)                       AS jours_ouvres\nFROM commande AS c\nLEFT JOIN calendrier AS k\n       ON k.jour > c.date_cde AND k.jour <= '2026-04-15' AND k.ouvre = 1\nWHERE c.statut = 'EN_COURS'\nGROUP BY c.num_cde, c.date_cde\nORDER BY c.date_cde;"
    },
    resultat: [["num_cde", "date_cde", "jours_calendaires", "jours_ouvres"], ["CDE-1005", "2026-04-01", 14, 9], ["CDE-1006", "2026-04-03", 12, 7], ["CDE-1007", "2026-04-07", 8, 6]],
    piege: "Le lundi de Pâques (6 avril 2026) n'est ni un samedi ni un dimanche : un calcul « du lundi au vendredi » le compte comme ouvré, et le délai est faux d'un jour. Les jours fériés viennent d'une liste, à tenir à jour chaque année.",
    pratique: "Dans Excel, c'est NB.JOURS.OUVRES. En SQL, la table calendrier fait ce travail : remplis-la une fois pour plusieurs années (week-ends et jours fériés), puis chaque délai se compte en une requête.",
    motsCles: ["jours ouvrés", "ouvrables", "ouvré", "week-end", "férié", "jours fériés", "networkdays", "travaillés", "calendrier", "samedi", "dimanche"],
    voirAussi: ["datediff", "left-join", "count"]
  },
  {
    id: "fuseau-horaire",
    titre: "Changer de fuseau horaire (UTC, heure de Paris)",
    famille: "Dates utiles",
    besoins: ["convertir une heure UTC en heure de Paris", "changer le fuseau horaire d'une date", "afficher l'heure locale d'un flux horodaté en UTC"],
    essais: ["timezone", "heure francaise a partir de l utc", "convertir gmt en heure locale", "decalage horaire heure d ete"],
    moteurs: {
      sqlserver: "`date_recu AT TIME ZONE 'UTC' AT TIME ZONE 'Romance Standard Time'` (2016+) : des noms Windows, listés dans `sys.time_zone_info`",
      snowflake: "`CONVERT_TIMEZONE('UTC', 'Europe/Paris', date_recu)` : des noms IANA, sensibles à la casse",
      mysql: "`CONVERT_TZ(date_recu, '+00:00', 'Europe/Paris')` : NULL si les tables de fuseaux ne sont pas chargées"
    },
    exemple: "-- date_recu est supposée en UTC (le temps universel)\nSELECT id, date_recu,\n       CAST(date_recu AT TIME ZONE 'UTC' AT TIME ZONE 'Romance Standard Time'\n            AS datetime2(0)) AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 3, 5, 6)\nORDER BY id;",
    exemples: {
      snowflake: "SELECT id, date_recu,\n       CONVERT_TIMEZONE('UTC', 'Europe/Paris', date_recu) AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 3, 5, 6)\nORDER BY id;",
      mysql: "SELECT id, date_recu,\n       CONVERT_TZ(date_recu, '+00:00', 'Europe/Paris') AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 3, 5, 6)\nORDER BY id;"
    },
    resultat: [["id", "date_recu", "heure_paris"], [1, "2026-03-02 06:10:00", "2026-03-02 07:10:00"], [3, "2026-03-16 06:05:00", "2026-03-16 07:05:00"], [5, "2026-04-07 06:08:00", "2026-04-07 08:08:00"], [6, "2026-04-08 17:30:00", "2026-04-08 19:30:00"]],
    piege: "Un décalage fixe (`DATEADD(hour, 1, …)`) se trompe la moitié de l'année : Paris est à UTC+1 l'hiver et à UTC+2 l'été (en 2026, à partir du 29 mars). Les fonctions de fuseau suivent le changement d'heure.",
    pratique: "Les noms changent d'un moteur à l'autre : SQL Server veut un nom Windows ('Romance Standard Time'), Snowflake et MySQL un nom IANA ('Europe/Paris'). Sur MySQL, il faut d'abord charger les tables de fuseaux.",
    motsCles: ["fuseau horaire", "utc", "heure de paris", "timezone", "heure locale", "heure d'été", "gmt", "décalage horaire", "changement d'heure", "convertir"],
    voirAussi: ["types-date", "getdate"]
  }
]);
