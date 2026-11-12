// Parcours SQL — Fiche de cours du module m02 « Filtrer et gérer NULL », version 2 (04/11/2026).
// Pourquoi une version 2 : la version 1 (expert + testeur, faits justes) était jugée mal expliquée par l'élève : le
// pourquoi manquait, les exemples ne montraient pas le piège, des mots techniques arrivaient sans explication.
// Cette version garde les faits et les résultats vérifiés (SQLite sur docs/base-exemple.sql ; sources dans la version 1,
// git ec11983), et change la pédagogie : chaque section suit le même squelette.
//   Exemple (qui MONTRE le piège quand il y en a un) → Résultat → « Ce qui se passe » → « Pourquoi » → « Le piège »
//   (l'erreur vue en entreprise et son effet) → « Le bon réflexe » → parfois « SQL Server / Snowflake » → À retenir.
// Chaque mot technique est expliqué à sa première apparition (collation, sous-requête, index, optimiseur…).
// Résultats recalculés avec SQLite : piège AND / OR (3 lignes, dont AquaBleu en GD ; avec parenthèses : 2) ; clients
// hors Lyon avec <> (4 lignes : Camping Les Flots, ville NULL, manque) ; clients sans SIREN (2) ; commandes sans flux
// EDI (NOT IN : 0 ligne ; NOT EXISTS : 5) ; flux ORDERS avec COALESCE / NULLIF (4) ; commandes livrées de mars (3) ;
// articles CHL (2) ; nom = 'aquableu' (0 ligne en comparaison exacte, 1 ligne sans casse).
// Notions rares testées par une seule question (PATINDEX, NOT BETWEEN, OPTION (RECOMPILE), ANSI_NULLS OFF, STARTSWITH,
// DATENAME…) : laissées à l'explication de la question (règle 6).
LEARNSQL.cours.m02 = {
  intro: "Ton rapport « commandes sans flux EDI » revient vide ce matin. Bonne nouvelle, ou filtre piégé ? En SQL, un filtre faux ne plante presque jamais : il se tait, et renvoie trop ou pas assez de lignes. Ce module explique comment le moteur lit un `WHERE`, pourquoi une case vide (NULL) change tout, et les six pièges qui faussent un rapport sans aucun message d'erreur.",
  sections: [
    {
      titre: "WHERE, AND et OR : le moteur garde les lignes vraies",
      exemple: "-- Voulu : les piscinistes (PRO) de Lyon ou de Grenoble\nSELECT code, nom, ville, type\nFROM dbo.client\nWHERE ville = 'Lyon' OR ville = 'Grenoble' AND type = 'PRO';",
      resultat: [["code", "nom", "ville", "type"], ["C001", "AquaBleu", "Lyon", "GD"], ["C002", "Piscines Dumont", "Grenoble", "PRO"], ["C006", "Piscines Dumont", "Lyon", "PRO"]],
      regle: "`WHERE` teste chaque ligne et ne garde que celles où la condition est vraie. Si elle est fausse, ou « inconnue » à cause d'une case vide (partie suivante), la ligne sort. On combine plusieurs tests avec `AND` (tous doivent être vrais) ou `OR` (un seul suffit). Mélangés, ils suivent une priorité : `AND` passe avant `OR`, comme la multiplication avant l'addition. Des parenthèses imposent l'ordre voulu.",
      points: [
        "Ce qui se passe : 3 lignes, dont AquaBleu : une grande distribution (GD), pas un pisciniste.",
        "Pourquoi : le moteur a lu « Lyon, ou bien (Grenoble et PRO) ». AquaBleu est à Lyon : il entre.",
        "Le piège : un rapport « piscinistes de Lyon et Grenoble » qui contient une grande surface. Personne ne le voit, et les chiffres par type de client sont faux.",
        "Le bon réflexe : des parenthèses dès que tu mélanges AND et OR : `(ville = 'Lyon' OR ville = 'Grenoble') AND type = 'PRO'` donne les 2 bonnes lignes. `ville IN ('Lyon', 'Grenoble')` écrit le OR pour toi, sans piège.",
        "Et aussi : `BETWEEN 1000 AND 3000` inclut les deux bornes, petite borne d'abord. NOT ne porte que sur la condition juste après lui : `NOT (A OR B)` veut dire « ni A ni B »."
      ],
      retenir: "Dès que tu mélanges AND et OR, mets des parenthèses. IN remplace une série de OR, sans piège."
    },
    {
      titre: "NULL : une case vide n'est ni vraie ni fausse",
      exemple: "-- Voulu : les clients qui ne sont pas à Lyon\nSELECT code, nom, ville\nFROM dbo.client\nWHERE ville <> 'Lyon';",
      resultat: [["code", "nom", "ville"], ["C002", "Piscines Dumont", "Grenoble"], ["C003", "Bleu Lagon", "Nice"], ["C004", "Hydro Sud", "Montpellier"], ["C005", "Pool & Garden", "Genève"]],
      regle: "NULL veut dire « inconnu » : ce n'est ni zéro ni un texte vide. Comparer un inconnu à une valeur donne un troisième résultat : « inconnu », ni vrai ni faux. Même `NULL = NULL` reste inconnu. Comme `WHERE` ne garde que le vrai, une ligne dont le test reste inconnu est écartée, sans message. Pour voir les cases vides, il faut le test fait pour elles : `IS NULL` ou `IS NOT NULL`.",
      points: [
        "Ce qui se passe : 4 lignes. Camping Les Flots manque, alors qu'il n'est pas à Lyon. Sa ville est NULL : une case vide, non renseignée.",
        "Pourquoi : « Inconnu différent de Lyon ? » : le moteur répond « inconnu », ni vrai ni faux.",
        "Le piège : toute comparaison avec =, <>, <, LIKE ou NOT laisse les lignes NULL dehors, sans erreur. Un contrôle « clients hors Lyon » oublie un client, et tu ne le sais pas.",
        "Le bon réflexe : `IS NULL` et `IS NOT NULL` sont les seuls tests qui voient une case vide. Pour garder les inconnus : `ville <> 'Lyon' OR ville IS NULL`.",
        "Et aussi : `siren = NULL` renvoie 0 ligne, sans erreur, parce que « inconnu égal inconnu » reste inconnu. `WHERE siren IS NULL` trouve bien les 2 fiches à nettoyer (Bleu Lagon, Pool & Garden)."
      ],
      retenir: "NULL = inconnu. Seul IS NULL ou IS NOT NULL le teste ; les autres comparaisons laissent la ligne dehors, sans erreur."
    },
    {
      titre: "NOT IN et NULL : le rapport vide",
      exemple: "-- Piège : 0 ligne ! Le flux 3 (rejeté) n'a pas de commande : son cde_id est NULL\nSELECT num_cde FROM dbo.commande\nWHERE id NOT IN (SELECT cde_id FROM dbo.flux_edi);\n\n-- Juste : les 5 commandes sans flux EDI (résultat ci-dessous)\nSELECT c.num_cde, c.canal\nFROM dbo.commande AS c\nWHERE NOT EXISTS (SELECT 1 FROM dbo.flux_edi AS f\n                  WHERE f.cde_id = c.id);",
      resultat: [["num_cde", "canal"], ["CDE-1002", "TEL"], ["CDE-1004", "WEB"], ["CDE-1005", "TEL"], ["CDE-1006", "WEB"], ["CDE-1008", "TEL"]],
      regle: "`NOT IN` garde une ligne si sa valeur n'est égale à aucune valeur de la liste. Il doit donc être sûr qu'elle diffère de chacune ; face à un NULL, il ne l'est jamais. Ainsi, une liste qui contient un NULL vide tout le résultat, sans erreur. Ce NULL vient souvent d'une sous-requête (une requête dans la requête) sur une colonne qui peut être vide. Pour trouver ce qui manque, on préfère `NOT EXISTS` : il vérifie qu'aucune ligne liée n'existe, sans liste à comparer.",
      points: [
        "Ce qui se passe : la première requête renvoie 0 ligne. La seconde renvoie les 5 commandes qui n'ont pas de flux EDI. Même question, deux réponses.",
        "Pourquoi : `NOT IN (1, 3, NULL, 7)` veut dire « différent de 1, et de 3, et de NULL, et de 7 ». « Différent de NULL » est inconnu, et une chaîne de AND avec un inconnu n'est jamais vraie. Aucune ligne ne passe.",
        "Le piège : les contrôles « sans » (commandes sans flux, clients sans commande, articles sans stock). Un seul NULL dans la liste, et le rapport est vide : tout a l'air en ordre.",
        "Le bon réflexe : `NOT EXISTS` avec une sous-requête (une requête dans la requête, module m06) : pour chaque commande, le moteur regarde s'il existe un flux qui pointe vers elle. Les NULL ne gênent plus.",
        "Et aussi : si tu gardes NOT IN, exclus les NULL dedans : `SELECT cde_id FROM dbo.flux_edi WHERE cde_id IS NOT NULL`. IN avec un NULL dans la liste, lui, reste sans danger."
      ],
      retenir: "Un seul NULL dans la liste vide un NOT IN, sans erreur. Écris NOT EXISTS, ou exclus les NULL de la liste."
    },
    {
      titre: "COALESCE et NULLIF : remplacer une case vide, ou en fabriquer une",
      exemple: "-- Flux ORDERS : un motif lisible, une alerte seulement sur les rejets\nSELECT id, COALESCE(motif, 'Aucun') AS motif,\n       NULLIF(statut, 'OK')        AS alerte\nFROM dbo.flux_edi\nWHERE type = 'ORDERS';",
      resultat: [["id", "motif", "alerte"], [1, "Aucun", null], [2, "Aucun", null], [3, "EAN inconnu", "REJET"], [5, "Aucun", null]],
      regle: "Une case vide gêne parfois, et parfois elle protège. `COALESCE` la remplace par une valeur de secours : un libellé lisible, un zéro. `NULLIF` fait le geste contraire : il change en NULL une valeur qui pose problème. Son grand usage : la division. Un diviseur à zéro devenu NULL donne un résultat vide, au lieu d'arrêter la requête. Dans les deux cas, on change le sens d'une valeur : on le fait seulement si ce sens est juste.",
      points: [
        "Ce qui se passe : les motifs vides deviennent « Aucun ». Et dans la colonne alerte, le statut OK devient NULL : seule la ligne rejetée garde une valeur.",
        "Pourquoi : `COALESCE(a, b)` renvoie la première valeur non vide (a si elle est renseignée, sinon b). `NULLIF(a, b)` fait l'inverse : il renvoie NULL quand a vaut b.",
        "Le piège : un calcul `montant / qte` plante avec « division par zéro » dès qu'une ligne a qte = 0, et tout le rapport s'arrête. Écrire `qte <> 0 AND montant / qte > 5` ne protège pas : le moteur choisit l'ordre dans lequel il teste.",
        "Le bon réflexe : `montant / NULLIF(qte, 0)`. Quand qte vaut 0, NULLIF renvoie NULL, la division donne NULL, et la ligne sort sans erreur.",
        "SQL Server / Snowflake : `ISNULL` (SQL Server), `NVL` ou `IFNULL` (Snowflake) font comme COALESCE, mais avec deux valeurs seulement. COALESCE marche partout : prends-le. Un texte vide n'est pas NULL : `NULLIF(TRIM(ref), '') IS NULL` attrape les deux."
      ],
      retenir: "COALESCE remplace un NULL, NULLIF en fabrique un : `montant / NULLIF(qte, 0)` évite la division par zéro."
    },
    {
      titre: "Les dates : une plage, et la colonne nue",
      exemple: "-- Commandes livrées en mars 2026 : du 1er mars inclus au 1er avril exclu\n-- '20260301' (AAAAMMJJ) : forme sûre sur SQL Server ; Snowflake attend '2026-03-01'\nSELECT num_cde, date_cde, montant_ht\nFROM dbo.commande\nWHERE statut = 'LIVREE'\n  AND date_cde >= '20260301'\n  AND date_cde <  '20260401';",
      resultat: [["num_cde", "date_cde", "montant_ht"], ["CDE-1001", "2026-03-02", "4780.00"], ["CDE-1002", "2026-03-05", "1290.00"], ["CDE-1003", "2026-03-09", "2385.00"]],
      regle: "Une période se filtre avec deux bornes : `>=` le premier jour, et `<` le lendemain du dernier. Cette forme reste juste quand la colonne a une heure, là où `BETWEEN` perdrait la fin du dernier jour. Deuxième règle : la colonne filtrée reste nue, sans fonction autour. Ainsi, le moteur peut se servir de l'index (la table des matières de la table). On transforme donc la valeur cherchée, jamais la colonne.",
      points: [
        "Ce qui se passe : les 3 commandes livrées de mars. La plage va du 1er mars inclus au 1er avril exclu : le signe < sur la fin, pas <=.",
        "Pourquoi : `BETWEEN '20260301' AND '20260331'` marche sur une colonne DATE. Mais sur une colonne DATETIME (date + heure), '20260331' veut dire le 31 mars à minuit : la commande du 31 à 14 h disparaît.",
        "Le piège : `YEAR(date_cde) = 2026`. La fonction enveloppe la colonne ; le moteur ne peut plus utiliser l'index (la table des matières de la table) et lit toutes les lignes. Sur une grosse table, la requête passe de 1 seconde à 1 minute.",
        "Le bon réflexe : la colonne reste nue, le calcul va du côté de la valeur : `date_cde >= DATEADD(day, -30, GETDATE())` pour les 30 derniers jours. Snowflake aussi lit moins de blocs quand la colonne est nue (module m14).",
        "SQL Server / Snowflake : la date du jour s'écrit `CAST(GETDATE() AS date)` sur SQL Server, `CURRENT_DATE` sur Snowflake. Une date écrite '20260301' est lue par SQL Server ; Snowflake la lirait de travers : écris '2026-03-01'."
      ],
      retenir: "Une période : `>= début AND < lendemain de la fin`. La colonne nue, le calcul du côté de la valeur."
    },
    {
      titre: "LIKE : chercher un motif dans un texte",
      exemple: "-- Articles dont le code commence par CHL\nSELECT code, libelle, prix_tarif\nFROM dbo.article\nWHERE code LIKE 'CHL%';",
      resultat: [["code", "libelle", "prix_tarif"], ["CHL-5", "Chlore lent 5 kg", "39.90"], ["CHL-25", "Chlore lent 25 kg", "159.00"]],
      regle: "`LIKE` cherche un motif dans un texte : des caractères connus, et des jokers pour ceux qu'on ne connaît pas. Il sert à trouver un code qui commence par un préfixe, ou un nom qui contient un mot. Sa vitesse dépend du début du motif. Si le début est connu, le moteur peut se servir de l'index ; avec un joker en tête, il lit tout. C'est le même piège qu'une fonction autour de la colonne.",
      points: [
        "Ce qui se passe : les 2 chlores. `%` remplace n'importe quelle suite de caractères, même vide. `_` remplace exactement un caractère : `'CHL-_'` trouve CHL-5, pas CHL-25.",
        "Pourquoi ça va vite : avec un début connu (`'CHL%'`), le moteur cherche dans l'index comme dans un dictionnaire, et s'arrête aux mots qui commencent par CHL.",
        "Le piège : `'%CHL%'`, avec un joker devant. Plus de dictionnaire possible : le moteur lit toute la table. `LEFT(code, 3) = 'CHL'` a le même défaut (la fonction enveloppe la colonne).",
        "Le bon réflexe : écrire le début du motif quand tu le connais. Pour chercher un vrai % ou un vrai _ : `LIKE '%50!%%' ESCAPE '!'` (le caractère après ! est pris tel quel).",
        "SQL Server / Snowflake : SQL Server accepte des classes, `[0-9]` un chiffre, `[^0-9]` tout sauf un chiffre. Snowflake n'en a pas (il faut `REGEXP_LIKE`), et son LIKE compte la casse : `ILIKE 'chl%'` l'ignore."
      ],
      retenir: "% remplace une suite de caractères, _ un seul. Un début connu profite de l'index ; un % devant lit toute la table."
    },
    {
      titre: "Majuscules et espaces : chaque moteur a sa règle",
      exemple: "SELECT code, nom\nFROM dbo.client\nWHERE nom = 'aquableu';   -- en minuscules",
      resultat: "SQL Server : 1 ligne, C001 AquaBleu. Snowflake : aucune ligne.",
      regle: "Deux textes égaux pour un moteur ne le sont pas forcément pour l'autre. SQL Server compare avec souplesse : souvent sans tenir compte des majuscules, et sans les espaces de fin dans une égalité. Snowflake, par défaut, ne fait pas ces deux exceptions : majuscules et espaces comptent. Un filtre écrit pour l'un peut donc ne rien trouver sur l'autre, sans erreur. Avant de corriger une comparaison (`UPPER`, `ILIKE`, `TRIM`), on vérifie la règle du moteur.",
      points: [
        "Ce qui se passe : la même requête trouve AquaBleu sur SQL Server et rien sur Snowflake. Ni l'un ni l'autre ne se trompe : ils n'ont pas la même règle.",
        "Pourquoi : SQL Server suit la collation de la colonne, c'est-à-dire sa règle de comparaison des textes. La plus courante en France, French_CI_AS, ignore la casse (CI) mais compte les accents (AS). Snowflake compare exactement, lettre pour lettre.",
        "Le piège : une migration vers Snowflake. Des filtres qui marchaient depuis des années (`statut = 'livree'`, `nom = 'DUPONT'`) ne renvoient plus rien, sans erreur. Même chose pour les espaces de fin : SQL Server les ignore dans =, Snowflake les compte.",
        "Le bon réflexe : sur Snowflake, `UPPER(nom) = 'AQUABLEU'` ou `ILIKE`, et `TRIM` pour les espaces. Sur SQL Server, n'ajoute pas UPPER quand la colonne est déjà sans casse : c'est inutile, et ça empêche l'index.",
        "Et aussi : pour une recherche sensible à la casse sur SQL Server, une fois : `nom = 'dupont' COLLATE French_CS_AS` (CS = la casse compte)."
      ],
      retenir: "SQL Server compare selon sa collation (souvent sans casse, espaces de fin ignorés) ; Snowflake compare exactement : UPPER, ILIKE, TRIM."
    },
    {
      titre: "Détails utiles",
      points: [
        "Comparer à une moyenne : `WHERE montant_ht > AVG(montant_ht)` plante, car WHERE travaille ligne par ligne, avant tout calcul de groupe. Écris `> (SELECT AVG(montant_ht) FROM dbo.commande)`, une sous-requête qui calcule la moyenne d'abord.",
        "Contrôler un import : `TRY_CAST(qte_txt AS int) IS NULL AND qte_txt IS NOT NULL` trouve les quantités qui ne sont pas des nombres. TRY_CAST renvoie NULL au lieu de planter.",
        "Des nombres rangés en texte se comparent lettre par lettre : `'99' > '100'` est vrai, parce que 9 vient après 1. Convertis en nombre avant de comparer.",
        "Un tarif valable à une date : `debut <= @d AND (fin IS NULL OR fin >= @d)`. Une fin NULL veut dire « encore valable » : il faut le dire au moteur.",
        "Égalité qui accepte deux NULL (deux fiches sans SIREN sont-elles « pareilles » ?) : `a IS NOT DISTINCT FROM b` (SQL Server 2022 et plus, Snowflake). Avant : `a = b OR (a IS NULL AND b IS NULL)`.",
        "`WHERE 1 = 1` est toujours vrai : pratique quand un programme ajoute des `AND …` à la suite, sans gérer le premier.",
        "Un paramètre écrit `N'C001'` (texte Unicode) comparé à une colonne VARCHAR force SQL Server à convertir la colonne : l'index sert mal, ou plus du tout (selon la collation). Aligne le type du paramètre sur celui de la colonne."
      ],
      retenir: "WHERE travaille ligne par ligne : pour comparer à un total ou une moyenne, passe par une sous-requête."
    }
  ],
  differences: [
    ["Casse (`=`, LIKE)", "Selon la collation (CI)", "Exacte (sauf `ILIKE`)"],
    ["Espaces de fin (`=`)", "Ignorés", "Comptés (`TRIM`)"],
    ["Classes `[AB]` dans LIKE", "Oui", "Non : `REGEXP_LIKE`"],
    ["Remplacer NULL", "`ISNULL`, `COALESCE`", "`NVL`, `IFNULL`, `COALESCE`"],
    ["Égal, NULL compris", "`IS NOT DISTINCT FROM` (2022+)", "`EQUAL_NULL`, `IS NOT DISTINCT FROM`"],
    ["Date en texte", "`'20260301'` (AAAAMMJJ)", "`'2026-03-01'`"],
    ["Date du jour", "`CAST(GETDATE() AS date)`", "`CURRENT_DATE`"],
    ["1er janvier de l'année", "`DATEFROMPARTS(YEAR(GETDATE()), 1, 1)`", "`DATE_TRUNC('year', CURRENT_DATE)`"],
    ["Booléen", "`BIT` : `actif = 1`", "`BOOLEAN` : `WHERE actif`"],
    ["IN sur deux colonnes", "Non : `EXISTS`", "Oui"]
  ]
};
