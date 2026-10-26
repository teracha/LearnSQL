LEARNSQL.cours.m03 = {
  intro: "Les fonctions transforment une valeur sur chaque ligne : couper un texte, calculer une échéance, convertir un montant. C'est là que SQL Server et Snowflake diffèrent le plus.",
  sections: [
    {
      titre: "CASE : le « si… alors »",
      exemple: "SELECT nom,\n  CASE\n    WHEN ca >= 50000 THEN 'A'\n    WHEN ca >= 10000 THEN 'B'\n    ELSE 'C'\n  END AS classe\nFROM dbo.client;",
      points: [
        "CASE s'arrête à la PREMIÈRE condition vraie : mets les plus strictes en premier.",
        "Sans ELSE et sans condition vraie : résultat NULL.",
        "Pour tester NULL : `CASE WHEN col IS NULL`, jamais `CASE col WHEN NULL`.",
        "Raccourci : `IIF(cond, a, b)` sur SQL Server, `IFF(cond, a, b)` sur Snowflake."
      ],
      retenir: "Première condition vraie gagnante. Toujours un ELSE."
    },
    {
      titre: "Remplacer NULL",
      exemple: "SELECT COALESCE(tel_portable, tel_fixe, 'inconnu') AS telephone\nFROM dbo.contact;",
      points: [
        "`COALESCE(a, b, c)` : 1re valeur non NULL. Standard, marche partout.",
        "`ISNULL(a, b)` : SQL Server seulement, 2 arguments, prend le type de `a` (risque de troncature).",
        "`NULLIF(a, b)` : renvoie NULL si a = b. Idéal contre la division par zéro."
      ],
      retenir: "COALESCE pour remplacer NULL. NULLIF pour éviter la division par zéro."
    },
    {
      titre: "Le texte",
      exemple: "SELECT\n  SUBSTRING('EDIFACT', 1, 3)        AS debut,     -- 'EDI'\n  CHARINDEX('-', 'CDE-2026')         AS position,  -- 4\n  TRIM('  ABC  ')                    AS propre,    -- 'ABC'\n  REPLACE('12,5', ',', '.')          AS montant;   -- '12.5'",
      points: [
        "Les positions commencent à 1.",
        "`LEN` ignore les espaces de fin (SQL Server). `DATALENGTH` compte les octets.",
        "Concaténer : `+` donne NULL si une valeur est NULL. `CONCAT` les ignore sur SQL Server… mais pas sur Snowflake.",
        "Compléter avec des zéros : `RIGHT('000000' + CAST(id AS varchar(6)), 6)` sur SQL Server, `LPAD(id, 6, '0')` sur Snowflake.",
        "Caractères étrangers : `NVARCHAR` et `N'texte'` sur SQL Server."
      ],
      retenir: "Positions à partir de 1. Attention aux NULL dans les concaténations."
    },
    {
      titre: "Les dates",
      exemple: "SELECT\n  DATEADD(day, 30, date_facture)         AS echeance,\n  DATEDIFF(day, date_cde, date_livraison) AS delai_jours,\n  EOMONTH(date_cde)                      AS fin_de_mois   -- Snowflake : LAST_DAY\nFROM dbo.facture;",
      points: [
        "`DATEADD(unité, n, date)` ajoute (ou retire si n < 0).",
        "`DATEDIFF` compte les frontières franchies : du 31/12 au 01/01 = 1 an.",
        "1er jour du mois : `DATE_TRUNC('month', d)` (Snowflake), `DATETRUNC(month, d)` (SQL Server 2022+).",
        "Écris les dates en `'AAAAMMJJ'` sur SQL Server : fiable quelle que soit la langue.",
        "Jour de la semaine : dépend de `SET DATEFIRST`. Ne le code pas en dur."
      ],
      retenir: "Dates en 'AAAAMMJJ'. DATEDIFF compte des frontières, pas des durées."
    },
    {
      titre: "Convertir : CAST, CONVERT, TRY_CAST",
      exemple: "SELECT\n  CONVERT(date, '22/10/2026', 103)        AS date_fr,   -- SQL Server\n  TRY_CAST(montant_txt AS decimal(10,2))  AS montant    -- NULL si invalide\nFROM stg.import_edi;",
      points: [
        "`CAST(x AS type)` : standard, sans format.",
        "`CONVERT(type, x, style)` : SQL Server, avec un style (103 = jj/mm/aaaa).",
        "Snowflake : `TO_DATE('22/10/2026', 'DD/MM/YYYY')`, `TO_CHAR(d, 'DD/MM/YYYY')`.",
        "`TRY_CAST` renvoie NULL au lieu de planter : parfait pour contrôler un import.",
        "CAST en entier : SQL Server tronque (12.7 → 12), Snowflake arrondit (12.7 → 13).",
        "Texte + nombre sur SQL Server : conversion vers le nombre (`'10' + 5 = 15`)."
      ],
      retenir: "TRY_CAST pour les données douteuses. Précise toujours le format des dates."
    },
    {
      titre: "Les nombres et leurs types",
      exemple: "SELECT\n  7 / 2                 AS division_entiere,  -- 3 sur SQL Server\n  7 / 2.0               AS division,          -- 3.5\n  CEILING(25 / 10.0)    AS nb_palettes,       -- 3\n  ROUND(12.345, 2)      AS arrondi;           -- 12.35",
      points: [
        "SQL Server : entier / entier = entier. Snowflake renvoie un décimal.",
        "Montants : `DECIMAL(18,2)`. Jamais `FLOAT` (valeurs approchées).",
        "`DECIMAL(p, s)` : p chiffres au total, s après la virgule.",
        "Précise toujours la longueur : `varchar` sans longueur = 1 caractère dans un DECLARE."
      ],
      retenir: "Division entière sur SQL Server : ajoute .0. Argent = DECIMAL."
    }
  ],
  differences: [
    ["7 / 2", "3", "3.5"],
    ["CONCAT avec NULL", "Ignore le NULL", "Renvoie NULL"],
    ["Si… alors court", "`IIF`", "`IFF`"],
    ["Texte → date", "`CONVERT(date, x, 103)`", "`TO_DATE(x, 'DD/MM/YYYY')`"],
    ["Fin de mois", "`EOMONTH`", "`LAST_DAY`"],
    ["Compléter à gauche", "`RIGHT('000' + x, 3)`", "`LPAD(x, 3, '0')`"],
    ["CAST(12.7 AS INT)", "12 (tronque)", "13 (arrondit)"]
  ]
};
