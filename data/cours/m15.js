// Parcours SQL — Cours complet du module m15 « Modélisation des données », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m15.js, l'ancien cours court) et des 100 « retenir » de
// data/m15-modelisation.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition.
// Fil du module : la base d'exemple est un petit ERP normalisé (S1) ; on en tire une table de faits et ses dimensions
// (S2 à S7), comme l'entrepôt Snowflake + Power BI de l'élève. Règles de moteur : seulement les contraintes (faits connus).
// Résultats vérifiés avec SQLite sur docs/base-exemple.sql (scratchpad cours-complets/m15 : verif.py, 36 essais, et
// verif_cours.py, qui rejoue les 7 exemples tels qu'écrits : 0 écart) : table « à plat » de C001 et C006 (4 lignes ; C005
// et C007 sans commande ; C006 n'a que CDE-1008) ; fait_vente avant le 6 mars (3 lignes) ; CA facturé par famille avec le
// montant de la facture recopié sur ses articles (CHIMIE 11945.00 au lieu de 5905.00 ; total 15699.80 au lieu de 8534.80,
// la somme des 4 factures) ; deux photos du stock CHIMIE (CHL-5 : 240 au lieu de 120) ; dim_societe non dédoublonnée
// (Piscines Dumont 5319.60 au lieu de 2659.80 ; Bleu Lagon, SIREN NULL, perd CDE-1004) ; dim_client historisée (C001 :
// clés 1, 1, 8 ; sans la période dans le ON : 6 lignes ; en type 1, le CA de mars de Lyon, 7165.00, passe à Villeurbanne) ;
// dim_date du 3 au 7 avril 2026 (1, 0, 0, 0, 1 commandes ; Pâques calculé au 5 avril 2026, lundi de Pâques le 6) ;
// montant_ht = somme des lignes sur les 8 commandes (0 écart).
// Conventions : version SCD 2 en [début ; fin[ (`>= date_debut AND < date_fin`), comme m05 (S7, q62) ; constantes
// 'AAAAMMJJ' (SQL Server). Renvois : m04 (taux, moyenne des moyennes), m05 (jointures qui gonflent les sommes), m06
// (générer des jours), m10 (clés, contraintes, contrôles de doublons et d'orphelins).
// Couverture des 100 « retenir » : scratchpad cours-complets/m15/couverture.txt. Laissées à l'explication de leur question
// (une seule question chacune, règle 6 de docs/plan-sql.md) : clé candidate (q09), 1-1 (q11), notation 0,N (q13), unités
// (q20), SCD 3 (q34), membre déduit (q39), junk dimension (q45), matrice en bus (q51), hiérarchie irrégulière (q53), table
// agrégée (q58), noms (q61), dédoublonnage (q65), membre désactivé (q70), mini-dimension (q82), variantes (q95).
// Sources (lues le 12/11/2026) :
// - learn.microsoft.com : power-bi/guidance/star-schema (faits et dimensions, clé de substitution, flocon, SCD 1 et 2 avec
//   date de fin 12/31/9999, rôles et USERELATIONSHIP, junk, dégénérée, factless) ; power-bi/transform-model/
//   desktop-relationships-understand (côté « 1 » unique, sinon l'actualisation échoue ; bidirectionnel à éviter ; relation
//   plusieurs à plusieurs « limitée », jointure INNER, lignes omises ; ligne vide virtuelle = membre inconnu) ;
//   power-bi/guidance/relationships-many-to-many (table pont ; faits d'un grain supérieur au 1er de la période) ;
//   power-bi/guidance/model-date-tables (une ligne par date, sans trou, années entières, pour les fonctions de temps DAX) ;
//   fabric/data-warehouse/dimensional-modeling-fact-tables (grain ; transaction, periodic snapshot, accumulating ; additive,
//   semi-additive, non additive ; factless ; clés de faits NOT NULL et membres spéciaux) et dimensional-modeling-dimension-
//   tables (clé de substitution et clé naturelle ; dimensions dénormalisées ; SCD 1, 2, 3 ; -1 inconnu, -2 non applicable ;
//   clé de date AAAAMMJJ ; dimension heure de 1 440 lignes ; dimensions conformes ; hiérarchies aplaties) ;
//   dax/closingbalancemonth-function-dax, dax/lastnonblank-function-dax ; sql/t-sql/functions/generate-series-transact-sql
//   (SQL Server 2022, niveau 160) ; sql/t-sql/data-types/json-data-type (SQL Server 2025, GA).
// - docs.snowflake.com/en (lu en .md avec curl) : sql-reference/constraints-overview (tables standard : PRIMARY KEY, UNIQUE,
//   FOREIGN KEY non vérifiées, NOT NULL et CHECK vérifiés ; lues par les outils BI), sql-reference/functions/generator.
// - Kimball, The Data Warehouse Toolkit (3e éd., 2013) : cité par ces pages Microsoft ; kimballgroup.com n'était pas
//   joignable (refusé par le proxy).
// Faits déjà vérifiés (consignes, novembre 2026) : Snowflake vérifie NOT NULL et CHECK (depuis avril 2026), pas PRIMARY KEY,
// UNIQUE ni FOREIGN KEY ; AUTOINCREMENT = IDENTITY sur Snowflake (m10).
LEARNSQL.cours.m15 = {
  intro: "Ton rapport Power BI annonce 11 945 € de chimie facturée pour 5 905 € réels, et un stock de chlore doublé sur deux mois : erreur de formule, ou modèle mal construit ? Modéliser, c'est décider où ranger chaque information. Divalto range pour saisir sans erreur, ton entrepôt Snowflake pour que Power BI lise vite. Ce module relie les deux, et évite les chiffres comptés deux fois.",
  sections: [
    {
      titre: "Une information à un seul endroit : normaliser",
      exemple: "-- Une table « à plat » : la commande et son client\nSELECT co.num_cde, cl.code, cl.nom, cl.ville\nFROM dbo.commande AS co\nJOIN dbo.client AS cl ON cl.id = co.client_id\nWHERE cl.code IN ('C001', 'C006')\nORDER BY co.num_cde;",
      resultat: [["num_cde", "code", "nom", "ville"], ["CDE-1001", "C001", "AquaBleu", "Lyon"], ["CDE-1003", "C001", "AquaBleu", "Lyon"], ["CDE-1007", "C001", "AquaBleu", "Lyon"], ["CDE-1008", "C006", "Piscines Dumont", "Lyon"]],
      regle: "Normaliser, c'est donner à chaque information une seule place. Elle va dans la table de ce qu'elle décrit : la ville d'un client, dans la table client. Les autres tables la retrouvent par une clé. Une information recopiée finit par se contredire : une copie est corrigée, l'autre non. C'est le modèle de l'ERP, fait pour saisir sans erreur. Les formes normales sont les règles qui vérifient ce rangement.",
      points: [
        "Ce qui se passe : AquaBleu et sa ville sont écrits 3 fois, une par commande. Rangé tel quel dans une table, ce résultat garde 3 copies, et chacune peut changer seule.",
        "Pourquoi : 1re forme normale (1FN) : une valeur par case. 2FN : chaque colonne dépend de toute la clé (dans `stock_depot`, clé article + dépôt, pas de libellé d'article). 3FN : de rien d'autre (la ville dépend du client).",
        "Le piège : trois anomalies. Mise à jour : AquaBleu déménage, 2 lignes sur 3 corrigées, deux villes. Insertion : Pool & Garden, sans commande, ne peut pas exister. Suppression : effacer CDE-1008 efface l'agence Piscines Dumont de Lyon.",
        "Le bon réflexe : dans l'ERP (OLTP, fait pour saisir), une table client. Un client a plusieurs commandes : la commande garde `client_id`, NOT NULL et clé étrangère (m10), donc un client qui existe. La ville est écrite une fois."
      ],
      retenir: "Une information à un seul endroit. 1FN : une valeur par case ; 2FN : toute la clé ; 3FN : rien que la clé."
    },
    {
      titre: "L'étoile : des faits au centre, des dimensions autour",
      exemple: "-- fait_vente : une ligne = un article commandé\nSELECT co.num_cde, co.date_cde, co.client_id, li.article_id,  -- clés\n       li.qte, li.qte * li.prix_unit AS montant_ht           -- mesures\nFROM dbo.ligne_cde AS li\nJOIN dbo.commande AS co ON co.id = li.cde_id\nWHERE co.date_cde < '20260306'\nORDER BY li.id;",
      resultat: [["num_cde", "date_cde", "client_id", "article_id", "qte", "montant_ht"], ["CDE-1001", "2026-03-02", 1, 1, 100, "3590.00"], ["CDE-1001", "2026-03-02", 1, 2, 10, "1190.00"], ["CDE-1002", "2026-03-05", 2, 6, 1, "1290.00"]],
      regle: "Le modèle en étoile (Kimball) range les données pour les analyser. Au centre, une table de faits garde les événements mesurés, comme les ventes : leurs clés et leurs mesures (quantités, montants). Autour, les dimensions disent qui, quoi, quand : le client, l'article, la date. Chaque dimension tient en une seule table à plat, quitte à répéter des valeurs. C'est l'inverse de l'ERP : on recopie exprès, pour que les rapports lisent vite.",
      points: [
        "Ce qui se passe : une ligne = un article commandé : ses clés (date, client, article) et ses mesures, les nombres qu'on additionne. `num_cde` reste là, sans table : une dimension « dégénérée ».",
        "Pourquoi : Power BI filtre une dimension ; le filtre descend vers les faits.",
        "Le piège : copier l'ERP tel quel dans Power BI : des dizaines de tables, des chaînes de jointures, des formules DAX lentes. Ou l'inverse : une seule table géante, rigide, où tout se répète.",
        "Le bon réflexe : l'entrepôt (OLAP, fait pour analyser) dénormalise, c'est-à-dire recopie exprès : des dimensions à plat, famille et gamme en colonnes de `dim_article`. Le prix : de la place, un chargement contrôlé.",
        "Et aussi : le schéma « en flocon » (snowflake schema) éclate une dimension en tables reliées : article → famille → gamme. Sans lien avec le produit Snowflake. Power BI préfère l'étoile."
      ],
      retenir: "Étoile : une table de faits (clés + mesures) au centre, des dimensions à plat autour. L'ERP normalise, l'entrepôt recopie pour lire vite."
    },
    {
      titre: "Le grain : une ligne de faits = quoi ?",
      exemple: "-- CA facturé par famille\nSELECT a.famille,\n       SUM(f.montant_ht)          AS ca_faux,   -- grain : la facture\n       SUM(li.qte * li.prix_unit) AS ca_juste   -- grain : l'article\nFROM dbo.facture AS f\nJOIN dbo.ligne_cde AS li ON li.cde_id = f.cde_id\nJOIN dbo.article   AS a  ON a.id = li.article_id\nGROUP BY a.famille\nORDER BY a.famille;",
      resultat: [["famille", "ca_faux", "ca_juste"], ["ACCESSOIRE", "2464.80", "1339.80"], ["CHIMIE", "11945.00", "5905.00"], ["ROBOT", "1290.00", "1290.00"]],
      regle: "Le grain, c'est ce que représente une ligne de faits : une facture, un article facturé, un stock de fin de mois. Une table de faits n'a qu'un grain, et chaque mesure y est à ce grain. Une mesure d'un grain plus gros, comme le total d'une facture, recopiée sur chaque article, se compte plusieurs fois, sans erreur. On écrit donc le grain avant les colonnes, et on prend le plus fin.",
      points: [
        "Ce qui se passe : CHIMIE affiche 11 945 € au lieu de 5 905 €. Le total faux, 15 699,80 €, dépasse celui des 4 factures : 8 534,80 €. Seul ROBOT tombe juste : sa facture n'a qu'un article.",
        "Pourquoi : une ligne de la table facture = une facture ; de `ligne_cde`, un article. La jointure recopie le montant de la facture sur chaque article : FA-2026-0301 compte double.",
        "Le piège : une table de faits qui mélange deux grains : lignes et totaux de facture, ou le port recopié sur chaque article. Le CA par famille dépasse celui de la compta, sans erreur (m05).",
        "Le bon réflexe : écris le grain avant les colonnes : « une ligne = un article facturé ». Le port, une remise globale : répartis au prorata (arrondi compris), ou une table de faits au grain facture.",
        "Et aussi : le grain le plus fin gagne : un détail s'agrège toujours, un total ne se détaille jamais. Contrôle : la somme des faits = le total de la source (8 534,80 €)."
      ],
      retenir: "Un seul grain par table de faits, écrit avant les colonnes. Une mesure d'un autre grain : répartie, ou dans sa propre table."
    },
    {
      titre: "Un stock ne s'additionne pas dans le temps",
      exemple: "-- Deux photos identiques du stock : fin mars, fin avril\nWITH photo AS (\n  SELECT m.fin_mois, s.article_id, s.qte\n  FROM dbo.stock_depot AS s\n  CROSS JOIN (VALUES ('20260331'), ('20260430')) AS m(fin_mois))\nSELECT a.code, SUM(p.qte) AS stock_faux,\n       SUM(CASE WHEN p.fin_mois = '20260430' THEN p.qte END) AS stock_avril\nFROM photo AS p JOIN dbo.article AS a ON a.id = p.article_id\nWHERE a.famille = 'CHIMIE'\nGROUP BY a.code ORDER BY a.code;",
      resultat: [["code", "stock_faux", "stock_avril"], ["CHL-25", 80, 40], ["CHL-5", 240, 120], ["PH-5", 160, 80]],
      regle: "Avant de faire une somme, demande-toi ce que la mesure représente. Une vente est un événement : chaque vente s'ajoute aux autres, sur tous les axes. Un stock ou un solde est une photo à une date. On additionne les stocks de plusieurs dépôts, à la même date. Mais d'une date à l'autre, la nouvelle photo remplace l'ancienne. Un taux n'est pas une quantité : il se recalcule à partir des sommes de ses deux termes.",
      points: [
        "Ce qui se passe : 240 seaux de CHL-5, pour 120 en stock. Rien n'a bougé, mais SUM additionne les deux photos. `stock_avril` ne lit que la dernière : c'est le vrai stock.",
        "Pourquoi : une mesure additive s'additionne sur tous les axes (CA, quantité vendue). Un stock, un solde, un encours sont semi-additifs : additionnés entre dépôts, pas entre dates. Un taux, non additif, ne s'additionne nulle part.",
        "Le piège : un visuel Power BI « stock par trimestre » en simple somme additionne trois photos mensuelles : le stock triple. Même erreur avec des taux de marge additionnés, ou moyennés (m04).",
        "Le bon réflexe : sur le temps, la dernière photo de la période (ou la moyenne) : en DAX, `CLOSINGBALANCEMONTH` ou `LASTNONBLANK`. Un taux : garde ses deux termes (marge, CA), divise à la fin.",
        "Et aussi : c'est une photo périodique (periodic snapshot) : une ligne par article, dépôt et fin de mois, comme la balance âgée. En devises : garde le montant d'origine, l'euro et le taux."
      ],
      retenir: "Additive : partout. Semi-additive (stock, solde) : jamais sur le temps, prends la dernière photo. Non additive (taux) : divise les sommes à la fin."
    },
    {
      titre: "Les clés : uniques côté dimension, jamais vides",
      exemple: "-- dim_societe copiée de client, sans dédoublonner\nWITH dim_societe AS (SELECT siren, nom FROM dbo.client WHERE siren IS NOT NULL)\nSELECT s.siren, s.nom, SUM(co.montant_ht) AS total_cdes\nFROM dbo.commande AS co\nJOIN dbo.client AS cl ON cl.id = co.client_id\nJOIN dim_societe AS s ON s.siren = cl.siren   -- Bleu Lagon : SIREN vide\nGROUP BY s.siren, s.nom\nORDER BY s.siren;",
      resultat: [["siren", "nom", "total_cdes"], ["334567890", "Hydro Sud", "318.00"], ["423456789", "Piscines Dumont", "5319.60"], ["512345678", "AquaBleu", "15115.00"]],
      regle: "Une dimension se relie à ses faits par une clé. C'est une relation un à plusieurs (1-N). La clé est unique côté dimension ; côté faits, elle se répète, une fois par vente. Si elle se répète aussi dans la dimension, chaque fait y trouve plusieurs lignes et se compte plusieurs fois. Si elle est vide, le fait ne trouve pas sa dimension. La règle : une ligne par clé dans la dimension, et jamais de clé vide dans les faits.",
      points: [
        "Ce qui se passe : Piscines Dumont affiche 5 319,60 €, le double de ses 2 659,80 €. Son SIREN est deux fois dans `dim_societe`, une par agence. Bleu Lagon, sans SIREN, disparaît.",
        "Pourquoi : ici, 423456789 se répète des deux côtés (plusieurs à plusieurs) : ses commandes comptent double. Un NULL ne trouve rien.",
        "Le piège : Power BI refuse ce doublon en relation 1-N (l'actualisation échoue) ; une clé vide y tombe dans « (Vide) ». En plusieurs à plusieurs, il cache le doublon et peut perdre des faits sans correspondance.",
        "Le bon réflexe : une ligne par clé, plus deux lignes spéciales : -1 « Inconnu » (anomalie à corriger), -2 « Non applicable ». Un fait sans correspondance prend -1, jamais NULL. Vrai plusieurs à plusieurs : une table de liaison (pont).",
        "SQL Server / Snowflake : SQL Server refuse un doublon de PRIMARY KEY ou UNIQUE, et un orphelin (une clé qui pointe vers rien). Snowflake ne les vérifie pas : contrôle après chaque chargement (`HAVING COUNT(*) > 1`, `NOT EXISTS`, m10)."
      ],
      retenir: "Côté « 1 », une clé unique ; côté faits, jamais vide (-1, -2). Un plusieurs à plusieurs inattendu cache une dimension en double."
    },
    {
      titre: "Une dimension qui change : écraser ou historiser",
      exemple: "-- Supposons : AquaBleu (C001) passe à Villeurbanne le 1er avril. dim_client :\n--   client_sk | ville        | date_debut | date_fin   | actuel\n--           1 | Lyon         | 2020-01-01 | 2026-04-01 | 0\n--           8 | Villeurbanne | 2026-04-01 | 9999-12-31 | 1\nSELECT co.num_cde, co.date_cde, d.client_sk, d.ville\nFROM dbo.commande AS co\nJOIN dbo.client AS cl ON cl.id = co.client_id\nJOIN dbo.dim_client AS d ON d.code = cl.code\n AND co.date_cde >= d.date_debut AND co.date_cde < d.date_fin  -- sans : 6 lignes\nWHERE cl.code = 'C001' ORDER BY co.num_cde;",
      resultat: [["num_cde", "date_cde", "client_sk", "ville"], ["CDE-1001", "2026-03-02", 1, "Lyon"], ["CDE-1003", "2026-03-09", 1, "Lyon"], ["CDE-1007", "2026-04-07", 8, "Villeurbanne"]],
      regle: "Quand une fiche de dimension change, il faut choisir ce que deviennent les faits passés. Écraser l'ancienne valeur (type 1) réécrit l'histoire : tous les faits passés prennent la nouvelle valeur. C'est bien pour corriger une faute. Historiser (type 2) ajoute une version, avec ses dates : chaque fait garde la version valable à sa date. Dès qu'un rapport passé ne doit pas changer après coup, la colonne demande le type 2.",
      points: [
        "Ce qui se passe : les deux commandes de mars restent à Lyon, celle d'avril va à Villeurbanne : chacune prend la version du client valable à sa date, clé 1 ou 8.",
        "Pourquoi : SCD = dimension qui change lentement. Type 1 : on écrase. Type 2 : on ferme la ligne (`date_fin`, exclue) et on en ajoute une, avec une nouvelle clé de substitution, ou clé technique (un numéro créé par l'entrepôt).",
        "Le piège : le type 1 sur une colonne qui a besoin d'histoire. Ville écrasée, le CA de mars de Lyon (7 165 €) passe à Villeurbanne : le rapport de mars change après coup.",
        "Le bon réflexe : un type par colonne (1 pour une faute corrigée, 2 pour une ville, un commercial). Fin ouverte '9999-12-31', pas NULL : le filtre reste simple ; `actuel = 1` : la version en cours.",
        "Et aussi : sans les dates dans le ON, chaque commande sort deux fois. Une vente chargée en retard prend la version valable à sa date. Nouvelle clé : `IDENTITY` (SQL Server), `AUTOINCREMENT` (Snowflake)."
      ],
      retenir: "Type 1 écrase ; type 2 ajoute une version (nouvelle clé, dates, actuel). Chaque fait pointe vers la version valable à sa date."
    },
    {
      titre: "La table de dates : chaque jour, même sans vente",
      exemple: "-- dim_date : une ligne par jour, générée une fois (m06)\nSELECT d.date_jour, d.jour_semaine, d.ferie, COUNT(co.id) AS nb_cdes\nFROM dbo.dim_date AS d\nLEFT JOIN dbo.commande AS co ON co.date_cde = d.date_jour\nWHERE d.date_jour >= '20260403' AND d.date_jour < '20260408'\nGROUP BY d.date_jour, d.jour_semaine, d.ferie\nORDER BY d.date_jour;",
      resultat: [["date_jour", "jour_semaine", "ferie", "nb_cdes"], ["2026-04-03", "vendredi", "non", 1], ["2026-04-04", "samedi", "non", 0], ["2026-04-05", "dimanche", "non", 0], ["2026-04-06", "lundi", "oui", 0], ["2026-04-07", "mardi", "non", 1]],
      regle: "Une table de faits n'a des lignes que les jours où il se passe quelque chose. La table de dates, elle, a une ligne pour chaque jour, sans trou. On part d'elle, puis on joint les faits en LEFT JOIN. Un jour sans vente reste alors visible, et les moyennes par jour restent justes. Ventes, achats et stock s'y relient tous : chaque rapport parle du même calendrier.",
      points: [
        "Ce qui se passe : 5 jours sortent, dont 3 sans commande (0). Le lundi 6 avril est férié (lundi de Pâques) : un jour vide normal, pas une panne de l'EDI.",
        "Pourquoi : la table porte ce qu'on ne veut pas recalculer : semaine ISO, mois, jour ouvré, férié, saison, exercice fiscal (d'octobre à septembre).",
        "Le piège : grouper sur la date des faits. Les jours sans commande disparaissent, les moyennes par jour sont fausses, chaque rapport recode l'exercice fiscal. Les calculs de période du DAX veulent une table de dates.",
        "Le bon réflexe : une seule table, sans trou, sur des années entières, partagée par tous les faits. Commande, livraison, facture : une relation par rôle (une active, les autres par `USERELATIONSHIP`), ou une copie par rôle.",
        "SQL Server / Snowflake : jours générés par `GENERATE_SERIES` (SQL Server 2022) ou `GENERATOR` (Snowflake). Clé : l'entier AAAAMMJJ (20260406). L'heure a sa dimension (1 440 minutes) ; un budget mensuel se relie au 1er du mois."
      ],
      retenir: "Une table de dates : un jour par ligne, sans trou, avec les notions métier (férié, saison, exercice). Une table, plusieurs rôles."
    },
    {
      titre: "Détails utiles",
      points: [
        "Copies voulues : `prix_unit` fige le prix du jour, l'adresse se recopie sur la facture ; un total stocké (`montant_ht`) se contrôle. L'histoire se garde à part : statuts datés, table d'audit (qui, quand, avant, après).",
        "Un processus, une table de faits (ventes, achats, stock, budget), reliées par des dimensions partagées, dites « conformes ». Autres : accumulatifs (une ligne par commande, une date par étape), sans mesure (articles en promotion).",
        "Un indicateur = une définition validée par le métier (le CA : HT ? net des avoirs ?), écrite dans un dictionnaire, calculée une fois dans un modèle Power BI partagé.",
        "Chargement de nuit : seulement ce qui a changé (date de modification). Une ligne supprimée n'a plus de date : suppression logique (une marque) ou capture des changements. Puis rapproche lignes et totaux avec la source.",
        "Plusieurs sociétés ou sources (ERP, CRM, EDI) : clé métier = société + code, un référentiel (fiche maître), une table de correspondance des codes. Un message EDI = un document (ORDERS → commande) : garde le brut pour le rejouer.",
        "Attributs variables (débit d'une pompe) : colonnes communes + JSON (`json` sur SQL Server 2025, `VARIANT` sur Snowflake). Pas de table entité-attribut-valeur (id, attribut, valeur en texte) : ni type, ni contrainte.",
        "Data Vault, autre méthode : hubs (clés métier), links (liens), satellites (attributs historisés). Souple pour intégrer beaucoup de sources ; l'étoile reste la couche que lit Power BI.",
        "Concevoir dans l'ordre : le besoin (décisions, indicateurs, axes, détail, historique), puis les modèles conceptuel (mots du métier), logique (sans moteur), physique (types, index, pour un moteur)."
      ],
      retenir: "Un processus = une table de faits, un indicateur = une définition, un chargement = un rapprochement."
    }
  ],
  differences: [
    ["PRIMARY KEY, UNIQUE", "Vérifiées", "Déclarées, non vérifiées"],
    ["FOREIGN KEY", "Vérifiée", "Déclarée, non vérifiée"],
    ["NOT NULL, CHECK", "Vérifiés", "Vérifiés (CHECK : avril 2026)"],
    ["Doublons, orphelins", "Refusés (contraintes)", "À contrôler au chargement"],
    ["Clé de substitution", "`IDENTITY(1,1)`", "`AUTOINCREMENT`, séquence"],
    ["Générer le calendrier", "`GENERATE_SERIES` (2022)", "`GENERATOR(ROWCOUNT => n)`"],
    ["Attributs variables", "`json` (2025)", "`VARIANT`"]
  ]
};
