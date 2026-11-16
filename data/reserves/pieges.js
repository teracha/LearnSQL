// Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md) : les pièges fréquents, des noms qu'on choisit
// souvent sans y penser. Les statuts par moteur viennent de liste.js (ne pas les répéter ici).
// Écrit par l'expert SQL le 16/11/2026. Chaque mot a une vraie raison dans liste.js (réservé, futur, limité), ou c'est
// le nom d'un type qui embrouille (NUMBER, TEXT : seulement des mots-clés permis sur MySQL). Chaque nom de « aLaPlace »
// est libre sur les 3 moteurs (absent de liste.js) et suit les 3 motifs de regles.js.
// Pas retenus, faute de vraie raison : TYPE, STATUS, NAME, COMMENT (mots-clés permis sur MySQL seulement ; la base
// d'exemple a d'ailleurs client.type) et ACCOUNT (limité sur Snowflake dans SHOW … IN seulement, mot-clé permis sur MySQL).
// Faits des conseils (pages officielles) : SQL Server : USER est une fonction sans parenthèses (user-transact-sql),
// une colonne « timestamp » sans type est un rowversion (rowversion-transact-sql), TOP … PERCENT (top-transact-sql),
// le rôle public (database-level-roles), CURRENT_DATE fonction depuis SQL Server 2025 (current-date-transact-sql) ;
// Snowflake : colonnes SEQ, KEY, PATH, INDEX, VALUE, THIS de FLATTEN (functions/flatten), CURRENT_DATE sans
// parenthèses (functions/current_date), casse entre guillemets (identifiers-syntax) ; MySQL 8.4 : CURRENT_DATE =
// CURDATE() (date-and-time-functions). Divalto : ART.REF et MOUV.REF (data/dico/divalto.js).
LEARNSQL.motsPieges = [
  {
    mot: "ORDER",
    pourquoi: "La commande (« order » en anglais), ou l'ordre de tri.",
    aLaPlace: ["num_cde", "cde_id", "ordre_tri"],
    conseil: "Sur Snowflake, si tu dois l'entourer, écris `\"ORDER\"` en majuscules : `\"order\"` serait un autre nom."
  },
  {
    mot: "DATE",
    pourquoi: "La date d'une commande ou d'une facture.",
    aLaPlace: ["date_cde", "date_fact", "date_creation"],
    conseil: "DATE est aussi le nom d'un type : `date_cde` dit en plus de quelle date il s'agit."
  },
  {
    mot: "NUMBER",
    pourquoi: "Un numéro de commande, de facture ou de lot.",
    aLaPlace: ["num_cde", "num_fact", "num_lot"],
    conseil: "Sur Snowflake, NUMBER est le type des nombres : une colonne number se confond avec lui."
  },
  {
    mot: "REF",
    pourquoi: "La référence d'un article, en abrégé.",
    aLaPlace: ["ref_article", "code_article"],
    conseil: "Divalto a des colonnes REF (`ART.REF`, `MOUV.REF`) : elles marchent, car un mot futur n'est pas encore réservé."
  },
  {
    mot: "LINENO",
    pourquoi: "Le numéro de ligne d'une commande, en abrégé anglais.",
    aLaPlace: ["num_ligne", "no_ligne"],
    conseil: "Attention aux exports en anglais : une colonne LineNo s'écrit `[LineNo]` sur SQL Server."
  },
  {
    mot: "DESC",
    pourquoi: "L'abréviation de « description », pour un libellé.",
    aLaPlace: ["libelle", "designation", "description_longue"],
    conseil: "Dans `ORDER BY`, DESC veut dire « décroissant »."
  },
  {
    mot: "TEXT",
    pourquoi: "Un texte libre : une remarque, un message.",
    aLaPlace: ["commentaire", "texte_libre", "message"],
    conseil: "TEXT est aussi un type : déconseillé sur SQL Server, synonyme de VARCHAR sur Snowflake."
  },
  {
    mot: "USER",
    pourquoi: "L'utilisateur qui a saisi ou modifié la ligne.",
    aLaPlace: ["saisi_par", "modifie_par", "code_utilisateur"],
    conseil: "Sur SQL Server, sans crochets, `SELECT user FROM …` renvoie ton nom d'utilisateur (dbo par exemple), pas la colonne."
  },
  {
    mot: "GROUP",
    pourquoi: "Le groupe d'un client ou d'un article.",
    aLaPlace: ["groupe_client", "groupe_article", "code_groupe"],
    conseil: "Le pluriel GROUPS est réservé lui aussi, sur MySQL."
  },
  {
    mot: "RANGE",
    pourquoi: "Une gamme de produits (« range » en anglais).",
    aLaPlace: ["gamme", "code_gamme"],
    conseil: "En SQL, RANGE sert dans les fonctions de fenêtre : `RANGE BETWEEN …`."
  },
  {
    mot: "SIZE",
    pourquoi: "La taille d'un article (S, M, L) ou d'un fichier.",
    aLaPlace: ["taille", "code_taille", "taille_fichier"]
  },
  {
    mot: "INDEX",
    pourquoi: "Un indice de prix, ou un numéro d'ordre dans une liste.",
    aLaPlace: ["indice_prix", "num_ordre", "rang"]
  },
  {
    mot: "PERCENT",
    pourquoi: "Le pourcentage d'une remise ou d'une marge.",
    aLaPlace: ["taux_remise", "pct_remise", "taux_marge"],
    conseil: "Sur SQL Server, PERCENT sert dans `TOP 10 PERCENT` : d'où le mot réservé."
  },
  {
    mot: "CONDITION",
    pourquoi: "Une condition de paiement ou une condition tarifaire.",
    aLaPlace: ["cond_paiement", "condition_reglement", "condition_tarif"]
  },
  {
    mot: "LIMIT",
    pourquoi: "Le plafond d'encours autorisé pour un client.",
    aLaPlace: ["plafond_encours", "limite_credit", "seuil_alerte"],
    conseil: "Sur MySQL, `LIMIT 10` garde 10 lignes d'un résultat : d'où le mot réservé."
  },
  {
    mot: "DEFAULT",
    pourquoi: "Pour marquer le dépôt, l'adresse ou le tarif par défaut.",
    aLaPlace: ["par_defaut", "depot_defaut", "tarif_defaut"]
  },
  {
    mot: "PRIMARY",
    pourquoi: "Pour marquer l'adresse ou le contact principal.",
    aLaPlace: ["est_principal", "adresse_principale", "contact_principal"],
    conseil: "PRIMARY sert dans `PRIMARY KEY`, la clé primaire."
  },
  {
    mot: "PUBLIC",
    pourquoi: "Un prix public, ou une case « visible par tous ».",
    aLaPlace: ["prix_public", "est_public", "visible_web"],
    conseil: "Sur SQL Server, public est aussi le rôle qui réunit tous les utilisateurs d'une base."
  },
  {
    mot: "LEVEL",
    pourquoi: "Le niveau de relance d'une facture, ou le niveau dans une nomenclature.",
    aLaPlace: ["niveau_relance", "niveau_nomenclature"]
  },
  {
    mot: "CHECK",
    pourquoi: "Un contrôle (qualité, flux EDI), ou un chèque en anglais.",
    aLaPlace: ["controle", "resultat_controle", "num_cheque"],
    conseil: "CHECK est une contrainte : une règle que chaque ligne doit respecter."
  },
  {
    mot: "RETURN",
    pourquoi: "Un retour de marchandise d'un client.",
    aLaPlace: ["retour_client", "num_retour", "qte_retour"]
  },
  {
    mot: "TRANSACTION",
    pourquoi: "Un mouvement de stock ou une opération bancaire.",
    aLaPlace: ["mouvement", "num_mouvement", "operation_bancaire"],
    conseil: "Sur SQL Server, `BEGIN TRANSACTION` ouvre une transaction : d'où le mot réservé."
  },
  {
    mot: "SECTION",
    pourquoi: "La section analytique, en comptabilité.",
    aLaPlace: ["section_analytique", "code_section"]
  },
  {
    mot: "PLAN",
    pourquoi: "Un plan de production, un plan de charge ou le plan comptable.",
    aLaPlace: ["plan_prod", "plan_charge", "plan_comptable"],
    conseil: "PLAN passe sans guillemets sur Snowflake : le même script plante ensuite sur SQL Server."
  },
  {
    mot: "ZONE",
    pourquoi: "Une zone géographique, ou une zone de stockage d'un entrepôt.",
    aLaPlace: ["zone_geo", "zone_stockage", "code_zone"],
    conseil: "SQL Server s'en sert déjà pour les fuseaux horaires : `AT TIME ZONE`."
  },
  {
    mot: "FILE",
    pourquoi: "Le nom du fichier EDI reçu ou envoyé.",
    aLaPlace: ["nom_fichier", "fichier_edi", "fichier_recu"],
    conseil: "Pour le chemin du fichier, évite aussi PATH (mot futur sur SQL Server) : écris `chemin_fichier`."
  },
  {
    mot: "DATA",
    pourquoi: "Le contenu brut d'un message EDI ou d'un JSON.",
    aLaPlace: ["contenu_brut", "message_brut", "contenu_json"],
    conseil: "Sur Snowflake, range le JSON brut dans une colonne de type VARIANT."
  },
  {
    mot: "FROM",
    pourquoi: "L'émetteur d'un message EDI, ou le début d'une période.",
    aLaPlace: ["emetteur", "expediteur", "date_debut"]
  },
  {
    mot: "TO",
    pourquoi: "Le destinataire d'un message EDI, ou la fin d'une période.",
    aLaPlace: ["destinataire", "date_fin"]
  },
  {
    mot: "TIMESTAMP",
    pourquoi: "L'heure exacte de réception d'un flux EDI.",
    aLaPlace: ["date_recu", "recu_le", "horodatage"],
    conseil: "Sur SQL Server, une colonne écrite `timestamp` sans type devient un compteur de version (rowversion), pas une date."
  },
  {
    mot: "TIME",
    pourquoi: "L'heure d'une livraison ou de l'arrivée d'un flux.",
    aLaPlace: ["heure_livraison", "heure_reception"]
  },
  {
    mot: "ROW",
    pourquoi: "Le numéro de ligne d'un fichier importé.",
    aLaPlace: ["num_ligne", "ligne_fichier"],
    conseil: "Garde ce numéro dès l'import : une table n'a pas d'ordre, et `ROW_NUMBER()` ne retrouve pas celui du fichier."
  },
  {
    mot: "KEY",
    pourquoi: "La clé d'un paramètre ou d'un flux.",
    aLaPlace: ["code_param", "cle_flux"]
  },
  {
    mot: "VALUE",
    pourquoi: "La valeur d'un paramètre, ou une donnée lue dans un flux.",
    aLaPlace: ["valeur_param", "valeur_lue", "montant"],
    conseil: "Sur Snowflake, FLATTEN (pour lire un JSON) renvoie déjà les colonnes KEY, INDEX et VALUE : préfixe-les, `f.value`."
  },
  {
    mot: "ROLE",
    pourquoi: "Le rôle d'un utilisateur, ou d'un partenaire dans un flux EDI.",
    aLaPlace: ["role_utilisateur", "role_partenaire"]
  },
  {
    mot: "SCHEMA",
    pourquoi: "Le schéma d'un message EDI (XSD), ou le schéma d'une table dans un inventaire.",
    aLaPlace: ["nom_schema", "schema_xsd"],
    conseil: "Même piège pour DATABASE : écris `nom_base`."
  },
  {
    mot: "YEAR",
    pourquoi: "L'année, dans une table calendrier pour Power BI.",
    aLaPlace: ["annee", "annee_cde", "annee_fiscale"],
    conseil: "YEAR est aussi une fonction : `YEAR(date_cde)` donne l'année de la commande."
  },
  {
    mot: "MONTH",
    pourquoi: "Le mois, dans une table calendrier ou un cumul mensuel.",
    aLaPlace: ["mois", "num_mois", "nom_mois"],
    conseil: "Même piège pour DAY : dans une table calendrier, écris `annee`, `mois`, `jour`."
  },
  {
    mot: "START",
    pourquoi: "Le début d'un contrat, d'une promo ou d'un traitement.",
    aLaPlace: ["date_debut", "heure_debut", "debut_validite"]
  },
  {
    mot: "END",
    pourquoi: "La fin d'un contrat, d'une promo ou d'un traitement.",
    aLaPlace: ["date_fin", "heure_fin", "fin_validite"],
    conseil: "Sur SQL Server, END ferme `BEGIN … END` et `CASE … END` : d'où le mot réservé."
  },
  {
    mot: "CURRENT",
    pourquoi: "Pour marquer la version en cours d'un tarif ou d'une adresse.",
    aLaPlace: ["est_actif", "version_active", "en_cours"]
  },
  {
    mot: "CURRENT_DATE",
    pourquoi: "La date du jour, dans une table de paramètres ou de calendrier.",
    aLaPlace: ["date_jour", "date_traitement"],
    conseil: "Sans guillemets, `current_date` donne la date du jour, pas ta colonne (sur SQL Server : depuis la version 2025)."
  },
  {
    mot: "TABLE",
    pourquoi: "Le nom d'une table, dans un dictionnaire de données ou un journal d'import.",
    aLaPlace: ["nom_table", "table_cible", "table_source"]
  },
  {
    mot: "COLUMN",
    pourquoi: "Le nom d'une colonne, dans un dictionnaire de données ou un mapping EDI.",
    aLaPlace: ["nom_colonne", "colonne_cible", "colonne_source"]
  },
  {
    mot: "VIEW",
    pourquoi: "Le nom d'une vue dans un inventaire, ou un nombre de vues.",
    aLaPlace: ["nom_vue", "nb_vues"],
    conseil: "Pour nommer une vue, un préfixe aide à la reconnaître : `v_cde_en_cours`."
  }
];
