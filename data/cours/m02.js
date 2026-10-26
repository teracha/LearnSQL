LEARNSQL.cours.m02 = {
  intro: "WHERE garde seulement les lignes qui t'intéressent. Ça paraît simple. Mais NULL et les priorités entre AND et OR créent beaucoup de bugs silencieux.",
  sections: [
    {
      titre: "Le filtre WHERE",
      exemple: "SELECT num_cde, montant\nFROM dbo.commande\nWHERE pays = 'FR'\n  AND montant >= 1000;",
      points: [
        "Une ligne est gardée seulement si la condition est VRAIE.",
        "Opérateurs : `=`, `<>` (ou `!=`), `<`, `<=`, `>`, `>=`.",
        "WHERE est lu juste après FROM, avant GROUP BY et SELECT."
      ],
      retenir: "WHERE garde les lignes où la condition est vraie. Ni fausse, ni inconnue."
    },
    {
      titre: "NULL : la valeur inconnue",
      exemple: "-- FAUX : renvoie 0 ligne\nWHERE date_livraison = NULL\n\n-- JUSTE\nWHERE date_livraison IS NULL",
      points: [
        "NULL veut dire « inconnu ». Ce n'est ni 0, ni ''.",
        "Toute comparaison avec NULL donne « inconnu ». Même `NULL = NULL`.",
        "« Inconnu » n'est pas « vrai » : la ligne est éliminée.",
        "Test correct : `IS NULL` / `IS NOT NULL`.",
        "Piège : `statut <> 'X'` élimine aussi les lignes où statut est NULL.",
        "`NOT` n'inverse pas « inconnu » : il reste inconnu."
      ],
      retenir: "NULL se teste avec IS NULL. Tout filtre <>, NOT, IN… exclut les NULL."
    },
    {
      titre: "Le piège NOT IN + NULL",
      exemple: "-- Si la sous-requête contient un seul NULL → 0 ligne !\nWHERE id NOT IN (SELECT client_id FROM commande)\n\n-- Sûr :\nWHERE NOT EXISTS (\n  SELECT 1 FROM commande co WHERE co.client_id = c.id\n)",
      points: [
        "`NOT IN (1, 2, NULL)` = `<> 1 AND <> 2 AND <> NULL` → toujours inconnu.",
        "Résultat : aucune ligne, et aucune erreur pour te prévenir.",
        "`NOT EXISTS` n'a pas ce problème."
      ],
      retenir: "Préfère NOT EXISTS à NOT IN avec une sous-requête."
    },
    {
      titre: "AND, OR, NOT : les priorités",
      exemple: "-- Lu comme : FR OU (BE ET ca > 1000)\nWHERE pays = 'FR' OR pays = 'BE' AND ca > 1000\n\n-- Ce qu'on voulait :\nWHERE (pays = 'FR' OR pays = 'BE') AND ca > 1000",
      points: [
        "Priorité : NOT, puis AND, puis OR.",
        "Dès que tu mélanges AND et OR : mets des parenthèses.",
        "`NOT (A OR B)` = `NOT A AND NOT B` (loi de De Morgan).",
        "L'ordre d'évaluation n'est pas garanti : `qte <> 0 AND montant / qte > 5` peut quand même diviser par zéro. Utilise `NULLIF(qte, 0)`."
      ],
      retenir: "AND passe avant OR. Parenthèses obligatoires dans ta tête."
    },
    {
      titre: "IN, BETWEEN et les dates",
      exemple: "WHERE pays IN ('FR', 'BE', 'CH')\n\n-- Dates avec heure : la bonne méthode\nWHERE date_cde >= '20260101'\n  AND date_cde <  '20260201'",
      points: [
        "`IN (a, b, c)` = plusieurs OR sur la même colonne.",
        "`BETWEEN a AND b` inclut les deux bornes. Petite borne d'abord.",
        "Sur un DATETIME, `BETWEEN '20260101' AND '20260131'` rate le 31 après minuit.",
        "Méthode sûre : `>= début AND < lendemain de la fin`.",
        "BETWEEN sur du texte : 'Caron' n'est pas entre 'A' et 'C'."
      ],
      retenir: "Période : >= début AND < fin + 1. Fiable avec ou sans heure."
    },
    {
      titre: "LIKE : chercher dans du texte",
      exemple: "WHERE nom LIKE 'DUP%'      -- commence par DUP\nWHERE code LIKE 'PI_C%'    -- P, I, 1 caractère, C, puis n'importe quoi\nWHERE code LIKE '%[_]%'    -- contient un vrai _ (SQL Server)",
      points: [
        "`%` = 0 à n caractères. `_` = exactement 1 caractère.",
        "SQL Server : `[AB]` = A ou B, `[_]` = un vrai _.",
        "Snowflake : pas de crochets. `ILIKE` ignore la casse.",
        "`LIKE 'DUP%'` peut utiliser un index. `LIKE '%DUP'` lit toute la table."
      ],
      retenir: "% = plusieurs caractères, _ = un seul. Le % au début empêche l'index."
    },
    {
      titre: "Filtres rapides (SARGable)",
      exemple: "-- Lent : fonction autour de la colonne\nWHERE YEAR(date_cde) = 2026\n\n-- Rapide : la colonne reste « nue »\nWHERE date_cde >= '20260101' AND date_cde < '20270101'",
      points: [
        "Une fonction autour d'une colonne empêche la recherche dans l'index.",
        "Transforme la valeur, pas la colonne.",
        "Compare des types identiques : `code_postal = '69110'`, pas `= 69110`."
      ],
      retenir: "Ne touche pas à la colonne filtrée : mets les calculs du côté de la valeur."
    },
    {
      titre: "Casse, espaces et texte vide",
      exemple: "WHERE nom = 'dupont'                 -- trouve 'DUPONT' sur SQL Server (CI)\nWHERE UPPER(nom) = 'DUPONT'          -- Snowflake\nWHERE COALESCE(ref, '') = ''         -- vide OU NULL",
      points: [
        "SQL Server : la casse dépend de la collation (souvent CI = ignore la casse).",
        "Snowflake : sensible à la casse par défaut.",
        "SQL Server ignore les espaces de fin pour `=`. Snowflake les compte.",
        "`''` (vide) n'est pas NULL. Teste les deux sur les données importées.",
        "`IS DISTINCT FROM` compare en traitant NULL comme une valeur (Snowflake, SQL Server 2022+)."
      ],
      retenir: "Migration SQL Server → Snowflake : attention à la casse et aux espaces."
    }
  ],
  differences: [
    ["Casse dans les comparaisons", "Selon la collation (souvent ignorée)", "Prise en compte"],
    ["Espaces de fin", "Ignorés", "Comptés"],
    ["LIKE sans casse", "Selon la collation", "`ILIKE`"],
    ["Classes [AB] dans LIKE", "Oui", "Non (RLIKE / REGEXP)"],
    ["Booléen", "`BIT` : `actif = 1`", "`BOOLEAN` : `WHERE actif`"],
    ["Date du jour", "`CAST(GETDATE() AS date)`", "`CURRENT_DATE`"]
  ]
};
