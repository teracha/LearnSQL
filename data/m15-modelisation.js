LEARNSQL.questions.m15 = [
  {
    id: "m15-q01", dialecte: "Standard",
    q: "Une table commande répète le nom et la ville du client sur chaque commande. Le client déménage. Quel problème ?",
    choix: [
      "Aucun, c'est le plus simple",
      "Il faut modifier chaque commande",
      "Les anciennes commandes sont bloquées",
      "Le client est supprimé automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien ne met les autres commandes à jour.",
      "Oui. Si on en oublie une, les données deviennent incohérentes (anomalie de mise à jour). Une information doit être stockée à un seul endroit.",
      "Non.",
      "Non."
    ],
    retenir: "Information répétée = risque d'incohérence."
  },
  {
    id: "m15-q02", dialecte: "Standard",
    q: "Dans une table « à plat » commande + client, on ne peut pas créer un client tant qu'il n'a pas commandé. Comment s'appelle ce problème ?",
    choix: [
      "Anomalie d'insertion",
      "Deadlock à la création",
      "Lecture fantôme",
      "Lecture sale (dirty read)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le client n'existe qu'à travers une commande. Solution : une table client séparée.",
      "Non. Un problème de verrous, pas de modèle.",
      "Non. Un problème d'isolation des transactions.",
      "Non. Un problème d'isolation des transactions."
    ],
    retenir: "Anomalie d'insertion = on ne peut pas créer une info seule."
  },
  {
    id: "m15-q03", dialecte: "Standard",
    q: "Une table « à plat » mélange commandes et clients (nom, adresse sur chaque ligne de commande). On supprime la seule commande d'un client. Que perd-on ?",
    choix: [
      "Rien d'autre que la commande",
      "Le client",
      "La table entière",
      "Les index de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le client disparaît avec elle.",
      "Oui. Toutes les informations du client (anomalie de suppression). Supprimer une commande ne devrait pas effacer un client.",
      "Non.",
      "Non."
    ],
    retenir: "Anomalie de suppression = on perd plus que voulu."
  },
  {
    id: "m15-q04", dialecte: "Standard",
    q: "Que demande la 1re forme normale (1FN) ?",
    choix: [
      "Une clé étrangère par table",
      "Des valeurs atomiques, sans liste",
      "Des noms de colonnes en majuscules",
      "Au moins un index par table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une seule valeur par case : pas de liste ni de groupe de colonnes répétées. 'A1;B2;C3' dans une colonne, ou tel1, tel2, tel3 : non conforme.",
      "Non.",
      "Non."
    ],
    retenir: "1FN = valeurs atomiques, pas de répétition."
  },
  {
    id: "m15-q05", dialecte: "Standard",
    q: "Table ligne_cde (num_cde, num_ligne, article, libelle_article, qte). Clé = (num_cde, num_ligne). Quel problème de 2e forme normale ?",
    choix: [
      "Aucun, la table est correcte",
      "libelle_article dépend de article seul",
      "qte devrait être dans la clé",
      "num_ligne est inutile, num_cde suffit comme clé"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il ne dépend pas de toute la clé : il est répété et peut devenir incohérent. En pratique : le libellé va dans la table article. (Sauf si on veut garder le libellé « au moment de la commande » : c'est alors un choix voulu.)",
      "Non.",
      "Non. Une commande a plusieurs lignes : num_cde seul n'est pas unique."
    ],
    retenir: "2FN = chaque colonne dépend de TOUTE la clé."
  },
  {
    id: "m15-q06", dialecte: "Standard",
    q: "Table client (id, code_postal, ville). La ville dépend du code postal, pas du client. Quelle forme normale est concernée ?",
    choix: [
      "1FN : valeurs non atomiques",
      "3FN (transitive)",
      "2FN : dépendance partielle de clé",
      "Aucune, tout est conforme"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque case a une seule valeur.",
      "Oui. Dépendance « transitive » entre deux colonnes non clés (ville dépend de code_postal). En théorie : une table des codes postaux. En pratique, on accepte souvent cette redondance pour les adresses.",
      "Non. La clé (id) n'est pas composée.",
      "Non."
    ],
    retenir: "3FN = pas de dépendance entre colonnes non clés."
  },
  {
    id: "m15-q07", dialecte: "Standard",
    q: "Pourquoi une base d'ERP (saisie des commandes) est-elle normalisée ?",
    choix: [
      "Pour aller plus vite en lecture",
      "Pour écrire sans aucune incohérence",
      "Pour faciliter les rapports Power BI",
      "Pour réduire le nombre de tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les lectures demandent plus de jointures.",
      "Oui. Chaque information à un seul endroit, intégrité garantie. C'est un système transactionnel (OLTP) : beaucoup de petites écritures.",
      "Non.",
      "Non. Normaliser crée plutôt plus de tables."
    ],
    retenir: "OLTP = normalisé, pour écrire juste."
  },
  {
    id: "m15-q08", dialecte: "Standard",
    q: "Pourquoi un entrepôt de données (pour l'analyse) est-il souvent DÉnormalisé ?",
    choix: [
      "Par erreur de conception",
      "Pour des requêtes simples et rapides",
      "Pour économiser de la place",
      "Pour faciliter la saisie des données"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Moins de jointures, des dimensions « à plat » faciles à comprendre. Les données sont chargées par des traitements contrôlés, pas saisies : le risque d'incohérence est maîtrisé.",
      "Non. Il en prend un peu plus.",
      "Non."
    ],
    retenir: "OLAP = dénormalisé, pour lire vite."
  },
  {
    id: "m15-q09", dialecte: "Standard",
    q: "Qu'est-ce qu'une clé candidate ?",
    choix: [
      "Une clé étrangère vers une autre table",
      "Une clé possible : unique, non NULL",
      "Une clé supprimée mais conservée",
      "Un index non unique"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une colonne (ou un groupe) qui pourrait servir de clé primaire. Ex. id, SIRET, email. On en choisit une comme PK ; les autres deviennent des clés alternatives (UNIQUE).",
      "Non.",
      "Non."
    ],
    retenir: "Clés candidates : une devient PK, les autres UNIQUE."
  },
  {
    id: "m15-q10", dialecte: "Standard",
    q: "Une relation « une commande a plusieurs lignes ». Où va la clé étrangère ?",
    choix: [
      "Dans commande, une colonne par ligne",
      "Dans ligne_cde",
      "Dans une table de liaison à part",
      "Dans les deux tables, par sécurité"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une commande ne peut pas stocker plusieurs id de lignes.",
      "Oui. Colonne cde_id : le côté « plusieurs » porte la référence vers le côté « un ». Règle du 1-N.",
      "Non. Seulement pour le N-N.",
      "Non. Redondance et risque d'incohérence."
    ],
    retenir: "1-N : la FK est côté N."
  },
  {
    id: "m15-q11", dialecte: "Standard",
    q: "Un client a au plus une fiche « conditions de paiement » spécifique. Comment modéliser cette relation 1-1 ?",
    choix: [
      "Une table de liaison client_conditions",
      "Dans client, ou table de même clé",
      "Une liste dans une colonne de client",
      "Impossible en relationnel"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Réservé au N-N.",
      "Oui. Soit des colonnes dans la table client, soit une table séparée dont la clé est aussi client_id (PK + FK). Table séparée si les données sont facultatives, volumineuses ou sensibles.",
      "Non.",
      "Non."
    ],
    retenir: "1-1 : mêmes colonnes, ou table avec la même clé."
  },
  {
    id: "m15-q12", dialecte: "Standard",
    q: "Un article peut être vendu dans plusieurs promotions, une promotion contient plusieurs articles. Modélisation ?",
    choix: [
      "Une FK promo_id dans article",
      "Une table de liaison promo_article",
      "Une FK article_id dans promotion",
      "Une colonne liste des articles en promo"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une seule promo possible par article.",
      "Oui. promo_article (promo_id, article_id), avec éventuellement le prix promo. Sa clé est souvent (promo_id, article_id).",
      "Non. Un seul article possible par promotion.",
      "Non. Contraire à la 1FN."
    ],
    retenir: "N-N = table de liaison."
  },
  {
    id: "m15-q13", dialecte: "Standard",
    q: "Dans un schéma entité-association, que veut dire « 0,N » côté commande pour la relation client-commande ?",
    choix: [
      "Un client a exactement une commande",
      "De zéro à N commandes par client",
      "Une commande a plusieurs clients",
      "Une commande a zéro ou N lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Minimum 0 (prospect sans commande), maximum N.",
      "Non.",
      "Non. Ce serait la relation commande-ligne."
    ],
    retenir: "Cardinalités : minimum, maximum."
  },
  {
    id: "m15-q14", dialecte: "Standard",
    q: "Une commande doit TOUJOURS avoir un client (cardinalité 1,1). Comment le traduire en base ?",
    choix: [
      "Rien, c'est le cas par défaut",
      "NOT NULL + clé étrangère",
      "Un index sur client_id",
      "Un CHECK sur le nom du client"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. client_id NOT NULL + clé étrangère vers client. NOT NULL = obligatoire ; FK = qui existe.",
      "Non.",
      "Non."
    ],
    retenir: "Obligatoire = NOT NULL + FK."
  },
  {
    id: "m15-q15", dialecte: "Standard",
    q: "Dans un ERP, pourquoi sépare-t-on l'en-tête de commande et les lignes de commande ?",
    choix: [
      "Par habitude des éditeurs",
      "Infos communes vs lignes multiples",
      "Pour accélérer Power BI",
      "Parce que la norme EDI l'impose aux ERP"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les infos de l'en-tête (client, date, adresse) sont communes ; les lignes (article, quantité, prix) sont multiples : relation 1-N. Même structure dans les messages EDI (ORDERS : en-tête + lignes).",
      "Non.",
      "Non. L'EDI a la même structure, mais ne l'impose pas."
    ],
    retenir: "Document = en-tête (1) + lignes (N)."
  },
  {
    id: "m15-q16", dialecte: "Standard",
    q: "Dans un ERP multi-sociétés, pourquoi la colonne societe fait-elle souvent partie des clés ?",
    choix: [
      "Pour trier les données par société",
      "Codes en double entre sociétés",
      "Ce n'est jamais le cas en pratique",
      "Pour faciliter les droits d'accès"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le même code client ou numéro de pièce peut exister dans plusieurs sociétés : la clé doit les distinguer. Toute jointure doit alors inclure la société.",
      "Non.",
      "Non."
    ],
    retenir: "Multi-sociétés : la société fait partie de la clé."
  },
  {
    id: "m15-q17", dialecte: "Standard",
    q: "Le prix de l'article change. Les anciennes factures doivent garder l'ancien prix. Comment modéliser ?",
    choix: [
      "Lire le prix dans la table article",
      "Le copier sur la ligne de facture",
      "Ne jamais changer les prix",
      "Recalculer les factures au besoin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les anciennes factures changeraient.",
      "Oui. Copier le prix unitaire dans la ligne au moment de la facturation. Redondance VOULUE : c'est une « photo » à la date du document.",
      "Non.",
      "Non. Une facture émise ne change plus."
    ],
    retenir: "Documents : figer les valeurs du moment."
  },
  {
    id: "m15-q18", dialecte: "Standard",
    q: "Comment modéliser des tarifs qui changent dans le temps ?",
    choix: [
      "Une colonne prix qu'on écrase",
      "Des prix datés (début, fin)",
      "Une colonne de prix par année",
      "Un fichier Excel partagé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd l'historique.",
      "Oui. Une table tarif (article, prix, date_debut, date_fin) : un prix par période de validité. Prix à une date : debut <= @d AND (fin IS NULL OR fin >= @d).",
      "Non.",
      "Non."
    ],
    retenir: "Valeurs dans le temps : périodes de validité."
  },
  {
    id: "m15-q19", dialecte: "Standard",
    q: "Comment modéliser la conversion de devises pour des ventes en USD et en EUR ?",
    choix: [
      "Un taux fixe écrit dans le code",
      "Montant d'origine + table de taux datée",
      "Tout saisir directement en EUR",
      "Une colonne de montant par devise"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une table de taux (devise, date, taux) et, sur les ventes, le montant en devise d'origine + éventuellement le montant converti. On garde la vérité et une conversion traçable.",
      "Non.",
      "Non."
    ],
    retenir: "Devises : montant d'origine + table de taux datée."
  },
  {
    id: "m15-q20", dialecte: "Standard",
    q: "Un article se vend à l'unité, au carton (12) ou à la palette (480). Comment gérer les quantités ?",
    choix: [
      "Une colonne de quantité par unité",
      "Quantité + unité, avec conversions",
      "Tout stocker en cartons",
      "Ignorer les unités, garder le nombre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une unité de référence pour l'article, une table de conversion (article, unité, coefficient), et toujours la quantité avec son unité. Sinon, additionner cartons et pièces donne des totaux faux.",
      "Non.",
      "Non."
    ],
    retenir: "Quantité = valeur + unité, avec conversions."
  },
  {
    id: "m15-q21", dialecte: "Standard",
    q: "Dans un modèle en étoile, que contient la table de faits ?",
    choix: [
      "Les descriptions des clients",
      "Les mesures et les clés",
      "Les paramètres de l'application",
      "Les utilisateurs du rapport"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça, ce sont les dimensions.",
      "Oui. Les mesures (montants, quantités) et les clés vers les dimensions. Une ligne = un événement ou une mesure, au grain choisi.",
      "Non.",
      "Non."
    ],
    retenir: "Faits = mesures + clés."
  },
  {
    id: "m15-q22", dialecte: "Standard",
    q: "Que contient une table de dimension ?",
    choix: [
      "Des montants et des quantités",
      "Les axes d'analyse",
      "Les erreurs de chargement",
      "Les index des faits"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont des mesures (faits).",
      "Oui. Les descriptions qui servent à filtrer et regrouper : qui, quoi, où, quand (client, article, date, dépôt…).",
      "Non.",
      "Non."
    ],
    retenir: "Dimensions = axes d'analyse."
  },
  {
    id: "m15-q23", dialecte: "Standard",
    q: "Qu'est-ce que le « grain » d'une table de faits ?",
    choix: [
      "Sa taille sur le disque",
      "Ce que représente UNE ligne",
      "Son nombre d'index",
      "Son nombre de colonnes de mesures"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ce que représente exactement une ligne (ex. une ligne de facture ; un article par jour et par dépôt). C'est la première décision à prendre et à écrire.",
      "Non.",
      "Non."
    ],
    retenir: "Grain = sens d'une ligne de faits."
  },
  {
    id: "m15-q24", dialecte: "Standard",
    q: "Une table de faits contient des lignes de facture ET des lignes « total facture ». Quel problème ?",
    choix: [
      "Aucun, c'est plus complet",
      "Deux grains mélangés",
      "Moins de lignes à lire",
      "Les dimensions disparaissent"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une somme compte deux fois les montants. Une table de faits = un seul grain.",
      "Non.",
      "Non."
    ],
    retenir: "Un grain par table de faits."
  },
  {
    id: "m15-q25", dialecte: "Standard",
    q: "Pourquoi choisir le grain le plus fin possible (ex. ligne de facture plutôt que total mensuel par client) ?",
    choix: [
      "Pour avoir plus de lignes",
      "On peut agréger un détail",
      "C'est obligatoire en BI",
      "Pour l'export vers Excel"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On peut toujours agréger un détail ; on ne peut jamais retrouver le détail à partir d'un total. Les besoins évoluent : le détail rend le modèle durable.",
      "Non.",
      "Non."
    ],
    retenir: "Grain fin = analyses futures possibles."
  },
  {
    id: "m15-q26", dialecte: "Standard",
    q: "Le montant HT d'une vente est-il une mesure additive ?",
    choix: [
      "Non, jamais",
      "Oui",
      "Seulement par mois",
      "Seulement par client"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On peut le sommer par client, par mois, par article, sans erreur. C'est la mesure idéale.",
      "Non.",
      "Non."
    ],
    retenir: "Additive = sommable sur toutes les dimensions."
  },
  {
    id: "m15-q27", dialecte: "Standard",
    q: "Le stock en fin de mois est-il additif dans le temps ?",
    choix: [
      "Oui, comme le CA",
      "Non : semi-additif",
      "Non additif du tout",
      "Additif seulement par mois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 100 en janvier + 100 en février ≠ 200 en stock.",
      "Oui. On peut le sommer par dépôt, mais pas sur plusieurs mois (on prend le dernier, ou la moyenne). Dans Power BI : LASTNONBLANK / CLOSINGBALANCE plutôt que SUM sur le temps.",
      "Non. On peut le sommer par dépôt ou par article.",
      "Non."
    ],
    retenir: "Stock, solde : semi-additifs."
  },
  {
    id: "m15-q28", dialecte: "Standard",
    q: "Comment stocker un taux de marge dans une table de faits ?",
    choix: [
      "Stocker le taux et le sommer",
      "Stocker marge et CA, calculer après",
      "Ne rien stocker du tout",
      "Stocker le taux en texte formaté"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un taux ne s'additionne pas.",
      "Oui. Marge et CA sont additifs ; le taux se calcule au moment de l'analyse : SUM(marge) / SUM(ca). Les ratios se recalculent à partir de leurs composants.",
      "Non. Les composants sont nécessaires.",
      "Non."
    ],
    retenir: "Non additif : stocker numérateur et dénominateur."
  },
  {
    id: "m15-q29", dialecte: "Standard",
    q: "Quelle différence entre un modèle en étoile et un modèle en flocon (snowflake schema) ?",
    choix: [
      "Aucune, deux noms pour la même chose",
      "Dimensions à plat vs éclatées",
      "Le flocon est le produit Snowflake",
      "L'étoile n'a pas de table de faits"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Étoile : dimensions à plat (famille et gamme dans dim_article). Flocon : dimensions normalisées en plusieurs tables (article → famille → gamme). L'étoile est en général préférée pour Power BI.",
      "Non. Coïncidence de nom.",
      "Non."
    ],
    retenir: "Étoile = dimensions à plat (préféré). Flocon = dimensions éclatées."
  },
  {
    id: "m15-q30", dialecte: "Standard",
    q: "Pourquoi Power BI préfère-t-il un modèle en étoile ?",
    choix: [
      "C'est obligatoire dans Power BI",
      "Filtres et DAX simples, plus rapide",
      "Pour les couleurs des visuels",
      "Il n'a aucune préférence"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mais c'est fortement recommandé.",
      "Oui. Filtres simples (des dimensions vers les faits), calculs DAX plus simples, meilleures performances, modèle compréhensible. C'est la recommandation officielle de Microsoft.",
      "Non.",
      "Non."
    ],
    retenir: "Power BI = étoile."
  },
  {
    id: "m15-q31", dialecte: "Standard",
    q: "Pourquoi les dimensions ont-elles souvent une clé technique (client_sk) différente du code client de l'ERP ?",
    choix: [
      "Pour compliquer les requêtes",
      "Historique, multi-sources, stabilité",
      "Pour masquer le code client aux utilisateurs",
      "C'est obligatoire dans Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Gérer l'historique (plusieurs versions du même client), mélanger plusieurs sources, et rester stable si le code métier change. Le code ERP reste une colonne de la dimension (clé naturelle).",
      "Non. Le code ERP reste visible dans la dimension.",
      "Non."
    ],
    retenir: "Dimension : clé technique + clé métier."
  },
  {
    id: "m15-q32", dialecte: "Standard",
    q: "Une dimension de type SCD 1 : le client change de ville. Que se passe-t-il ?",
    choix: [
      "Une nouvelle ligne est créée",
      "La ville est écrasée",
      "Rien ne change dans la dimension",
      "Les anciennes ventes sont supprimées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le type 2.",
      "Oui. Toutes les ventes, même anciennes, sont rattachées à la nouvelle ville. Simple, mais pas d'historique. Adapté aux corrections (faute de frappe).",
      "Non.",
      "Non."
    ],
    retenir: "SCD 1 = on écrase."
  },
  {
    id: "m15-q33", dialecte: "Standard",
    q: "Une dimension de type SCD 2 : le client change de commercial. Que se passe-t-il ?",
    choix: [
      "Le commercial est écrasé",
      "On ferme l'ancienne ligne, on en crée une",
      "On supprime puis recrée le client",
      "On ajoute une colonne « ancien commercial »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le type 1.",
      "Oui. Ancienne ligne fermée (date de fin) ; nouvelle ligne (nouvelle clé technique, date de début). Les ventes passées restent liées à l'ancien commercial, les nouvelles au nouveau.",
      "Non.",
      "Non. C'est le type 3."
    ],
    retenir: "SCD 2 = nouvelle version, historique complet."
  },
  {
    id: "m15-q34", dialecte: "Standard",
    q: "Une dimension de type SCD 3 : que garde-t-on ?",
    choix: [
      "Tout l'historique des valeurs",
      "Valeur actuelle + précédente",
      "Rien, la valeur est écrasée",
      "Une copie complète de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le type 2.",
      "Oui. Dans deux colonnes (ex. region_actuelle, region_precedente). Utile pour comparer « avant / après » une réorganisation, sans historique complet.",
      "Non. C'est le type 1.",
      "Non."
    ],
    retenir: "SCD 3 = valeur actuelle + précédente."
  },
  {
    id: "m15-q35", dialecte: "Standard",
    q: "Dans une dimension SCD 2, à quoi sert la colonne actuel (1 / 0) ?",
    choix: [
      "À rien, c'est décoratif",
      "Trouver vite la version en cours",
      "À trier les versions par date",
      "À supprimer les anciennes versions"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Trouver vite la version en cours de chaque client, sans tester les dates. Les colonnes date_debut, date_fin, actuel vont ensemble.",
      "Non.",
      "Non."
    ],
    retenir: "SCD 2 : debut, fin, actuel."
  },
  {
    id: "m15-q36", dialecte: "Standard",
    q: "Pourquoi mettre date_fin = '9999-12-31' plutôt que NULL sur la version en cours d'une dimension SCD 2 ?",
    choix: [
      "C'est obligatoire en SQL",
      "Filtres par période sans cas NULL",
      "Pour la lisibilité des dates",
      "Pour économiser de la place"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NULL est aussi utilisé.",
      "Oui. Les jointures et filtres par période (date BETWEEN debut AND fin) marchent sans cas particulier pour NULL. Un choix de convention, à documenter.",
      "Non.",
      "Non."
    ],
    retenir: "Fin ouverte : 9999-12-31 simplifie les filtres."
  },
  {
    id: "m15-q37", dialecte: "Standard",
    q: "Quel type de SCD choisir pour une colonne « date de naissance » ?",
    choix: [
      "Type 2 : historique complet",
      "Type 0 ou 1",
      "Type 3 : valeur précédente",
      "Aucune dimension pour ça"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'historique utile.",
      "Oui. Type 0 (ou 1 pour corriger une erreur) : elle ne change pas dans le temps. Le type se choisit colonne par colonne selon le besoin métier.",
      "Non.",
      "Non."
    ],
    retenir: "Type de SCD = choix par colonne."
  },
  {
    id: "m15-q38", dialecte: "Standard",
    q: "Une vente arrive avec un code client inconnu de la dimension. Bonne pratique ?",
    choix: [
      "Supprimer la vente du chargement",
      "Un membre « Inconnu » (clé -1)",
      "Mettre NULL dans la clé client",
      "Bloquer tout le chargement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le CA serait faux.",
      "Oui. Ou créer un membre provisoire, puis corriger quand le client arrive. Le total reste juste, et l'anomalie est visible.",
      "Non. Les jointures perdraient la vente.",
      "Non. Sauf règle métier stricte."
    ],
    retenir: "Membre « Inconnu » : ne jamais perdre un fait."
  },
  {
    id: "m15-q39", dialecte: "Standard",
    q: "Qu'est-ce qu'un « membre déduit » (inferred member) dans une dimension ?",
    choix: [
      "Un membre supprimé de la dimension",
      "Une ligne provisoire, avec le code",
      "Un doublon détecté automatiquement",
      "Un utilisateur sans rôle"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Créée avec seulement le code, quand un fait arrive avant sa dimension ; complétée au prochain chargement. Mieux que « Inconnu » : la vente est déjà rattachée au bon client.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension en retard : membre provisoire."
  },
  {
    id: "m15-q40", dialecte: "Standard",
    q: "Pourquoi une dimension date (calendrier) plutôt que d'utiliser seulement la colonne date de la table de faits ?",
    choix: [
      "C'est inutile, la date suffit",
      "Attributs utiles et tous les jours",
      "Pour stocker les dates au format texte",
      "Parce que l'ERP l'exige"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elle porte tous les attributs utiles (semaine ISO, mois, trimestre, année fiscale, jour ouvré, férié, saison) et contient tous les jours, même sans vente. Indispensable pour l'intelligence temporelle de Power BI.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension date = indispensable."
  },
  {
    id: "m15-q41", dialecte: "Standard",
    q: "Ton entreprise a un exercice fiscal d'octobre à septembre. Où gérer cette notion ?",
    choix: [
      "Dans chaque rapport, par une formule",
      "Dans la dimension date",
      "Dans la table de faits, sur chaque ligne",
      "Impossible : l'année civile s'impose"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Calcul répété et risque d'écarts.",
      "Oui. Colonnes annee_fiscale, mois_fiscal, trimestre_fiscal : la règle est écrite une fois.",
      "Non. Répété des millions de fois.",
      "Non."
    ],
    retenir: "Calendrier fiscal : dans la dimension date."
  },
  {
    id: "m15-q42", dialecte: "Standard",
    q: "Pourquoi l'activité « piscine » rend-elle utile une colonne saison dans la dimension date ?",
    choix: [
      "Inutile pour l'analyse",
      "Comparer les saisons d'une année à l'autre",
      "Pour afficher la météo du jour",
      "Pour planifier les vacances du personnel"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Comparer facilement les saisons (haute / basse) et les mêmes périodes d'une année à l'autre. Les attributs métier spécifiques donnent de la valeur à la dimension date.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension date : ajouter les notions métier."
  },
  {
    id: "m15-q43", dialecte: "Standard",
    q: "Une commande a une date de commande, de livraison et de facturation. Combien de dimensions date faut-il créer ?",
    choix: [
      "Trois tables calendrier différentes",
      "Une seule, à rôles multiples",
      "Aucune, les dates suffisent",
      "Une par client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Inutile.",
      "Oui. Une seule table calendrier, reliée trois fois (dimension « à rôles multiples »). Dans Power BI : une relation active, les autres inactives (USERELATIONSHIP), ou des copies de la table.",
      "Non.",
      "Non."
    ],
    retenir: "Plusieurs dates = une dimension, plusieurs rôles."
  },
  {
    id: "m15-q44", dialecte: "Standard",
    q: "Le numéro de facture est stocké dans la table de faits, sans table de dimension associée. Comment s'appelle ce cas ?",
    choix: [
      "Une erreur de modèle",
      "Une dimension « dégénérée »",
      "Une clé étrangère orpheline",
      "Une mesure non additive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est normal.",
      "Oui. Utile pour regrouper les lignes d'une même facture, sans autre attribut à décrire.",
      "Non.",
      "Non. Un numéro ne se somme pas, mais ce n'est pas une mesure."
    ],
    retenir: "N° de document dans les faits = dimension dégénérée."
  },
  {
    id: "m15-q45", dialecte: "Standard",
    q: "Les ventes ont 6 petits indicateurs (urgent O/N, mode de livraison, canal, payé O/N…). Comment éviter 6 petites dimensions ?",
    choix: [
      "Créer quand même 6 dimensions",
      "Une dimension « fourre-tout »",
      "Les mettre en texte dans les faits",
      "Les supprimer du modèle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Modèle encombré.",
      "Oui. Junk dimension : elle contient les combinaisons existantes de ces indicateurs. Une seule clé dans les faits.",
      "Non. Possible pour 1 ou 2, mais alourdit les faits.",
      "Non."
    ],
    retenir: "Petits indicateurs : junk dimension."
  },
  {
    id: "m15-q46", dialecte: "Standard",
    q: "Qu'est-ce qu'une dimension « conforme » ?",
    choix: [
      "Une dimension sans aucune erreur de données",
      "Partagée, avec le même sens",
      "Une dimension vide, prête",
      "Une dimension temporaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une dimension partagée par plusieurs tables de faits (ventes, achats, stock), avec le même sens et les mêmes clés. On peut alors croiser ventes et stock par article sans incohérence.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension conforme = partagée, même définition."
  },
  {
    id: "m15-q47", dialecte: "Standard",
    q: "Quelle table de faits pour le stock de chaque article, chaque fin de mois ?",
    choix: [
      "Transactionnelle (mouvements)",
      "Photo périodique",
      "Table sans faits (factless)",
      "Accumulative (par étapes)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait les mouvements.",
      "Oui. Periodic snapshot : une ligne par article, par dépôt, par mois. On mesure un état à intervalle régulier.",
      "Non.",
      "Non."
    ],
    retenir: "État régulier = periodic snapshot."
  },
  {
    id: "m15-q48", dialecte: "Standard",
    q: "Tu veux suivre chaque commande à travers ses étapes (commandée, préparée, expédiée, facturée) et mesurer les délais. Quel type de table de faits ?",
    choix: [
      "Transactionnelle (une ligne par événement)",
      "Accumulative (accumulating snapshot)",
      "Photo mensuelle (periodic)",
      "Aucune table de faits"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les délais entre étapes seraient difficiles à calculer.",
      "Oui. Une ligne par commande, mise à jour à chaque étape, avec une date par étape. Les délais se calculent facilement (expédition - commande).",
      "Non.",
      "Non."
    ],
    retenir: "Processus à étapes = accumulating snapshot."
  },
  {
    id: "m15-q49", dialecte: "Standard",
    q: "Tu veux savoir quels articles étaient en promotion, même ceux qui ne se sont pas vendus. Quel type de table ?",
    choix: [
      "La table des ventes, filtrée",
      "Une table « sans faits »",
      "La dimension date",
      "Un index sur promotion"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les articles non vendus n'y sont pas.",
      "Oui. Table de faits « sans faits » (factless) : article × promotion × période, sans montant. Elle enregistre une couverture ou un événement, sans mesure.",
      "Non.",
      "Non."
    ],
    retenir: "Événement sans mesure = factless fact."
  },
  {
    id: "m15-q50", dialecte: "Standard",
    q: "Combien de tables de faits pour un entrepôt couvrant ventes, achats et stock ?",
    choix: [
      "Une seule pour tout",
      "Une par processus métier",
      "Une par client",
      "Une par rapport Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Grains et mesures incompatibles.",
      "Oui. Ventes, achats, stock : reliées par des dimensions conformes. On parle de « constellation » de faits.",
      "Non.",
      "Non. Les rapports partagent les mêmes faits."
    ],
    retenir: "Un processus = une table de faits."
  },
  {
    id: "m15-q51", dialecte: "Standard",
    q: "À quoi sert une « matrice en bus » (processus en lignes, dimensions en colonnes) au début d'un projet d'entrepôt ?",
    choix: [
      "À dessiner le réseau",
      "Voir les dimensions partagées",
      "À choisir le matériel serveur",
      "À planifier les sauvegardes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Voir quels processus (ventes, achats, stock…) partagent quelles dimensions, pour planifier un entrepôt cohérent, processus par processus. Outil de cadrage très utile pour un chef de projet data.",
      "Non.",
      "Non."
    ],
    retenir: "Matrice en bus = carte processus × dimensions."
  },
  {
    id: "m15-q52", dialecte: "Standard",
    q: "Hiérarchie article : gamme > famille > sous-famille > article. Dans un modèle en étoile, où la mettre ?",
    choix: [
      "Quatre tables reliées en chaîne",
      "En colonnes dans dim_article",
      "Dans la table de faits",
      "Dans une table de hiérarchie à part"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le flocon.",
      "Oui. gamme, famille, sous_famille sur chaque ligne d'article. Les répétitions sont acceptées : la dimension reste simple et rapide.",
      "Non.",
      "Non. Ce serait encore du flocon."
    ],
    retenir: "Hiérarchie = colonnes dans la dimension."
  },
  {
    id: "m15-q53", dialecte: "Standard",
    q: "Un organigramme a une profondeur variable (3 à 7 niveaux). Comment le rendre exploitable dans un outil de reporting ?",
    choix: [
      "Impossible à exploiter",
      "L'aplatir en colonnes de niveaux",
      "Garder seulement le parent direct",
      "Créer une table par niveau"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Calculer, à partir de la relation parent-enfant, des colonnes niveau1, niveau2… ou un chemin, par exemple avec une CTE récursive. Les niveaux manquants reprennent souvent la valeur du parent.",
      "Non. Trop limité pour les filtres.",
      "Non."
    ],
    retenir: "Hiérarchie irrégulière : aplatir en colonnes de niveaux."
  },
  {
    id: "m15-q54", dialecte: "Standard",
    q: "Une vente est partagée entre deux commerciaux (60 % / 40 %). Comment modéliser sans compter la vente deux fois ?",
    choix: [
      "Deux lignes de vente identiques",
      "Une table pont avec la part",
      "Ignorer le 2e commercial",
      "Une colonne texte « Martin, Bernard »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CA doublé.",
      "Oui. Table « pont » (vente, commercial, part) : on multiplie le montant par la part pour l'analyse par commercial. La somme des parts vaut 100 % : le total reste juste.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension multi-valuée : table pont + coefficient."
  },
  {
    id: "m15-q55", dialecte: "Standard",
    q: "Dans Power BI, pourquoi éviter les relations « bidirectionnelles » par défaut ?",
    choix: [
      "Elles sont interdites",
      "Filtres ambigus et lenteurs",
      "Elles sont payantes",
      "Elles suppriment des données"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chemins de filtre ambigus, résultats surprenants, lenteurs. Filtre simple : dimension → faits. À utiliser seulement dans un cas précis et maîtrisé.",
      "Non.",
      "Non."
    ],
    retenir: "Power BI : relations unidirectionnelles."
  },
  {
    id: "m15-q56", dialecte: "Standard",
    q: "Power BI signale une relation « plusieurs à plusieurs » entre deux tables. Que faut-il souvent faire ?",
    choix: [
      "L'accepter, c'est normal",
      "Revoir le modèle",
      "Supprimer une des deux tables",
      "Passer toutes les clés en texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Source fréquente de totaux faux.",
      "Oui. Créer une vraie dimension avec des valeurs uniques, ou une table pont. Le plus souvent, une dimension a des doublons de clé.",
      "Non.",
      "Non."
    ],
    retenir: "Plusieurs-à-plusieurs dans Power BI = alerte de modélisation."
  },
  {
    id: "m15-q57", dialecte: "Standard",
    q: "Power BI refuse une relation 1-N entre dim_client et les ventes : « valeurs en double ». Cause ?",
    choix: [
      "Les ventes ont des doublons",
      "La clé de dim_client n'est pas unique",
      "Un bug de Power BI",
      "Trop de lignes dans les ventes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le côté « N » peut avoir des doublons.",
      "Oui. Ex. un même code client dans deux sociétés, ou deux versions SCD 2 sur le même code. Utiliser la clé technique unique (client_sk), ou corriger les doublons.",
      "Non.",
      "Non."
    ],
    retenir: "Côté « 1 » d'une relation = clé unique."
  },
  {
    id: "m15-q58", dialecte: "Standard",
    q: "Les tableaux de bord sont lents sur une table de faits de 2 milliards de lignes, alors qu'ils affichent surtout des totaux mensuels. Piste de modélisation ?",
    choix: [
      "Supprimer les données anciennes",
      "Une table agrégée pour ces visuels",
      "Ajouter des colonnes calculées",
      "Passer les montants en texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Par ex. mois × famille × région, en gardant le détail pour les analyses fines. Les agrégats précalculés sont un outil classique de performance.",
      "Non.",
      "Non."
    ],
    retenir: "Visuels agrégés : table agrégée."
  },
  {
    id: "m15-q59", dialecte: "Standard",
    q: "Dans la méthode Data Vault, que sont les hubs, les links et les satellites ?",
    choix: [
      "Trois types de serveurs",
      "Clés, liens, attributs",
      "Trois niveaux de rapports",
      "Trois types d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Hub : les clés métier (un client). Link : les relations entre hubs (client-commande). Satellite : les attributs descriptifs historisés. Modèle très souple pour intégrer et historiser de nombreuses sources.",
      "Non.",
      "Non."
    ],
    retenir: "Data Vault : hubs, links, satellites."
  },
  {
    id: "m15-q60", dialecte: "Standard",
    q: "Data Vault ou modèle en étoile : comment les utilise-t-on souvent ensemble ?",
    choix: [
      "On n'utilise jamais les deux",
      "Vault intègre, étoile restitue",
      "L'étoile pour l'intégration",
      "Data Vault directement pour Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Data Vault pour la couche d'intégration et d'historique ; étoile pour la couche de restitution (Power BI). Data Vault est difficile à requêter directement.",
      "Non.",
      "Non. Difficile à requêter directement."
    ],
    retenir: "Intégration (Vault) → restitution (étoile)."
  },
  {
    id: "m15-q61", dialecte: "Standard",
    q: "Quelle convention de nommage aide à lire un entrepôt ?",
    choix: [
      "Aucune, chacun choisit",
      "Préfixes clairs, mêmes noms partout",
      "Des noms courts : t1, t2, t3",
      "Les noms de l'ERP tels quels (ex. T1_CLI_COD)"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. dim_client, fct_ventes, stg_… pour le chargement, et des noms de colonnes identiques pour la même notion partout. Un utilisateur doit comprendre le modèle sans documentation lourde.",
      "Non.",
      "Non. Les noms techniques de l'ERP sont souvent obscurs : on les traduit."
    ],
    retenir: "Noms clairs et cohérents."
  },
  {
    id: "m15-q62", dialecte: "Standard",
    q: "À quoi sert un dictionnaire de données (ou glossaire métier) ?",
    choix: [
      "À traduire les noms en anglais",
      "Une définition par donnée",
      "À stocker les mots de passe",
      "À rien, le code suffit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Définir chaque donnée et chaque indicateur (sens, source, règle de calcul, propriétaire) pour que tout le monde parle de la même chose. Ex. « CA » : HT ? net des avoirs ? date de facture ou de livraison ?",
      "Non.",
      "Non."
    ],
    retenir: "Dictionnaire = une définition par indicateur."
  },
  {
    id: "m15-q63", dialecte: "Standard",
    q: "La direction et la comptabilité n'ont pas le même « CA » dans leurs rapports. Quelle est la vraie solution ?",
    choix: [
      "Choisir le chiffre le plus élevé",
      "Une définition validée, codée une fois",
      "Laisser chacun son propre chiffre",
      "Arrondir les deux chiffres"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Faire valider une définition unique du CA par les métiers, la documenter et l'implémenter une seule fois (dans le modèle). Un sujet de gouvernance avant d'être un sujet technique.",
      "Non.",
      "Non."
    ],
    retenir: "Un indicateur = une définition validée = un calcul."
  },
  {
    id: "m15-q64", dialecte: "Standard",
    q: "Le même client existe dans l'ERP, le CRM et l'outil EDI, avec des codes différents. Quelle démarche ?",
    choix: [
      "Garder trois clients distincts",
      "Un référentiel (MDM)",
      "Supprimer le CRM",
      "Utiliser le nom comme clé commune"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le CA d'un client serait éclaté.",
      "Oui. Gestion des données de référence : une table de correspondance des codes, et un référentiel client « maître ». On relie les identifiants de chaque système à un identifiant unique.",
      "Non.",
      "Non. Les noms s'écrivent de mille façons."
    ],
    retenir: "Multi-systèmes : référentiel et table de correspondance."
  },
  {
    id: "m15-q65", dialecte: "Standard",
    q: "Comment repérer les doublons de clients venant de plusieurs sources ?",
    choix: [
      "Comparer les id techniques",
      "SIRET, email, puis validation",
      "Comparer les dates de création",
      "Impossible sans saisie manuelle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les id sont différents d'un système à l'autre.",
      "Oui. Comparer des attributs stables et normalisés (SIRET, TVA intracommunautaire, email, nom + code postal nettoyés), puis valider avec le métier. On construit une fiche de référence (golden record).",
      "Non.",
      "Non."
    ],
    retenir: "Dédoublonnage : identifiants légaux + validation métier."
  },
  {
    id: "m15-q66", dialecte: "Standard",
    q: "Comment les messages EDI se rattachent-ils au modèle de données ?",
    choix: [
      "Ils n'ont aucun lien avec le modèle",
      "Chaque message = un document",
      "Tout va dans une seule table EDI",
      "Seules les factures sont concernées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. ORDERS → commande ; DESADV → expédition / livraison ; INVOIC → facture. Chaque message a un en-tête et des lignes. Le numéro de commande d'origine relie les documents.",
      "Non.",
      "Non."
    ],
    retenir: "EDI : chaque message = un document du processus."
  },
  {
    id: "m15-q67", dialecte: "Standard",
    q: "Pourquoi garder aussi le message EDI brut (texte complet) dans une table, en plus des données intégrées ?",
    choix: [
      "Inutile une fois intégré",
      "Traçabilité : relire, rejouer",
      "Pour l'afficher dans Power BI",
      "Pour gagner de la place"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. En cas de litige ou d'erreur d'intégration, on peut relire et rejouer le message d'origine. Couche « brute » : on ne perd jamais la source.",
      "Non.",
      "Non."
    ],
    retenir: "Garder la source brute = pouvoir rejouer."
  },
  {
    id: "m15-q68", dialecte: "Standard",
    q: "Une commande passe par plusieurs statuts. On veut savoir quand chaque statut a été atteint. Modélisation ?",
    choix: [
      "Une seule colonne statut, écrasée",
      "Une table d'historique des statuts",
      "Une colonne par jour du mois",
      "Impossible sans outil externe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd les dates de passage.",
      "Oui. (commande, statut, date_statut, utilisateur), en plus du statut actuel sur la commande. On peut mesurer les délais entre étapes.",
      "Non.",
      "Non."
    ],
    retenir: "Suivre un processus : table d'historique des statuts."
  },
  {
    id: "m15-q69", dialecte: "Standard",
    q: "Comment garder la trace de toutes les modifications d'une table sensible (tarifs, conditions de paiement) ?",
    choix: [
      "Impossible en SQL",
      "Une table d'audit",
      "Des captures d'écran",
      "Un mail à chaque changement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Qui, quand, ancienne valeur, nouvelle valeur ; alimentée par trigger, par OUTPUT ou par une table temporelle. Exigence fréquente des audits et des commissaires aux comptes.",
      "Non.",
      "Non."
    ],
    retenir: "Données sensibles : piste d'audit."
  },
  {
    id: "m15-q70", dialecte: "Standard",
    q: "Un article est arrêté (plus vendu). Dans la dimension article de l'entrepôt, que faire ?",
    choix: [
      "Le supprimer de la dimension",
      "Le garder avec un statut",
      "Le renommer « ARRÊTÉ »",
      "Le dupliquer dans une archive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les ventes passées perdraient leur article.",
      "Oui. Attribut statut (actif / arrêté) et éventuellement une date d'arrêt : les ventes passées en ont besoin. On ne supprime pas de membres d'une dimension.",
      "Non.",
      "Non."
    ],
    retenir: "Dimension : on désactive, on ne supprime pas."
  },
  {
    id: "m15-q71", dialecte: "Standard",
    q: "Quelle différence entre modèle logique et modèle physique ?",
    choix: [
      "Aucune, deux mots pour la même chose",
      "Indépendant vs lié à un moteur",
      "Le physique est fait sur papier",
      "Le logique contient les index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Logique : entités, attributs, relations, indépendamment du moteur. Physique : tables, types, index, contraintes pour un moteur précis (SQL Server, Snowflake). Le même modèle logique peut donner deux modèles physiques.",
      "Non.",
      "Non."
    ],
    retenir: "Logique = quoi. Physique = comment, sur quel moteur."
  },
  {
    id: "m15-q72", dialecte: "Standard",
    q: "Dans quel ordre conçoit-on un modèle de données ?",
    choix: [
      "Directement les tables",
      "Conceptuel → logique → physique",
      "Physique → logique → conceptuel",
      "Peu importe l'ordre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On risque de coder une mauvaise compréhension du métier.",
      "Oui. Le modèle conceptuel se valide avec les utilisateurs, en langage métier.",
      "Non.",
      "Non."
    ],
    retenir: "Métier d'abord, technique ensuite."
  },
  {
    id: "m15-q73", dialecte: "Standard",
    q: "Dans l'ERP, un client est identifié par (societe, code_client). Dans l'entrepôt, comment le gérer ?",
    choix: [
      "Garder seulement code_client",
      "Clé technique + clé métier composée",
      "Concaténer en texte et l'utiliser comme clé",
      "Ignorer la société"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Doublons entre sociétés.",
      "Oui. Une clé technique client_sk, et société + code comme clé métier (unique ensemble). Les faits ne portent que client_sk : jointures simples.",
      "Non. Possible, mais moins propre qu'une clé technique.",
      "Non."
    ],
    retenir: "Clé métier composée → clé technique unique."
  },
  {
    id: "m15-q74", dialecte: "Standard",
    q: "Des ventes de septembre arrivent seulement en octobre (fichier en retard). Le client a changé de commercial le 1er octobre (SCD 2). À quelle version les rattacher ?",
    choix: [
      "À la version actuelle du client",
      "À la version valide à la date de vente",
      "Au hasard parmi les versions",
      "À aucune, la vente est rejetée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le commercial de septembre serait faux.",
      "Oui. En joignant sur la période de validité. Les faits « en retard » se rattachent selon leur date métier, pas la date de chargement.",
      "Non.",
      "Non."
    ],
    retenir: "Faits en retard : rattacher selon la date métier."
  },
  {
    id: "m15-q75", dialecte: "Standard",
    q: "La DAF veut l'encours clients et son ancienneté (balance âgée) à chaque fin de mois. Quel type de table de faits ?",
    choix: [
      "Transactionnelle (mouvements)",
      "Photo périodique",
      "Table sans faits (factless)",
      "Une vue en temps réel seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Recalculer le passé à partir des mouvements est complexe et fragile.",
      "Oui. Une ligne par client (ou facture) et par fin de mois, avec le montant dû par tranche d'âge. On fige l'état à chaque clôture.",
      "Non.",
      "Non. On ne pourrait pas revoir les mois passés."
    ],
    retenir: "État à date de clôture : photo périodique."
  },
  {
    id: "m15-q76", dialecte: "Standard",
    q: "Les frais de port sont au niveau de la facture, la table de faits est au niveau ligne. Que faire ?",
    choix: [
      "Les recopier sur chaque ligne",
      "Les répartir, ou un autre grain",
      "Les ignorer dans l'analyse",
      "Les mettre dans la dimension client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils seraient comptés plusieurs fois.",
      "Oui. Les répartir sur les lignes (au prorata du montant, par exemple), ou les mettre dans une table de faits au grain facture. La règle de répartition se valide avec le métier.",
      "Non.",
      "Non."
    ],
    retenir: "Montant d'en-tête dans des faits « ligne » : répartir ou autre grain."
  },
  {
    id: "m15-q77", dialecte: "Standard",
    q: "Une remise de 100 € est accordée sur toute une facture de 3 lignes. Comment l'analyser par article ?",
    choix: [
      "100 € sur chaque ligne",
      "Au prorata, arrondi géré",
      "Tout sur la première ligne",
      "L'ignorer dans l'analyse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 300 € au total.",
      "Oui. La répartir au prorata du montant de chaque ligne, en gérant l'arrondi pour que la somme fasse exactement 100 €. Le dernier centime va souvent sur la plus grosse ligne.",
      "Non. La marge par article serait faussée.",
      "Non."
    ],
    retenir: "Répartition au prorata + gestion de l'arrondi."
  },
  {
    id: "m15-q78", dialecte: "Standard",
    q: "Un groupe a des filiales en EUR et en GBP. Comment stocker les montants dans l'entrepôt ?",
    choix: [
      "Seulement en devise locale",
      "Origine + EUR + taux utilisé",
      "Seulement en EUR, converti",
      "En texte avec le symbole"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Impossible de consolider facilement.",
      "Oui. En devise d'origine ET en devise du groupe (EUR), avec le taux utilisé, pour comparer et consolider. Préciser aussi la règle : taux du jour, du mois, budgétaire…",
      "Non. On perd la valeur d'origine.",
      "Non."
    ],
    retenir: "Multi-devises : origine + groupe + taux."
  },
  {
    id: "m15-q79", dialecte: "Standard",
    q: "Le budget est défini par mois et par famille ; les ventes sont au jour et à l'article. Comment les modéliser ?",
    choix: [
      "Dans la même table de faits",
      "Deux faits, un niveau commun",
      "Répartir le budget au hasard",
      "Ne pas modéliser le budget"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Grains incompatibles.",
      "Oui. Deux tables de faits, chacune à son grain, reliées à des dimensions communes au niveau partagé (mois, famille). La comparaison se fait au niveau commun.",
      "Non.",
      "Non."
    ],
    retenir: "Réel et budget : deux faits, un niveau commun."
  },
  {
    id: "m15-q80", dialecte: "Standard",
    q: "Dans Power BI, comment relier un budget mensuel à la table calendrier journalière ?",
    choix: [
      "Impossible dans Power BI",
      "Une date au 1er du mois",
      "Créer 30 lignes de budget par mois",
      "Relier sur le nom du mois en texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Stocker dans le budget une date du mois (ex. le 1er) reliée au calendrier, et ne l'analyser qu'au niveau mois ou au-dessus. Un filtre sur un jour précis n'a pas de sens pour le budget.",
      "Non. Possible (répartition), mais c'est un autre choix métier.",
      "Non. « Janvier » de quelle année ?"
    ],
    retenir: "Budget mensuel : clé date au 1er du mois."
  },
  {
    id: "m15-q81", dialecte: "Standard",
    q: "On veut analyser les commandes par heure de la journée. Faut-il mettre les heures dans la dimension date ?",
    choix: [
      "Oui, une ligne par minute de chaque jour",
      "Non : une dimension heure à part",
      "Non, c'est impossible",
      "Oui, une colonne par heure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La dimension date exploserait (des millions de lignes).",
      "Oui. Une dimension « heure » séparée (24 ou 1 440 lignes), en plus de la dimension date. Deux petites dimensions plutôt qu'une énorme.",
      "Non.",
      "Non."
    ],
    retenir: "Date et heure : deux dimensions."
  },
  {
    id: "m15-q82", dialecte: "Standard",
    q: "Dans dim_client (SCD 2), la « classe de CA » change chaque mois pour beaucoup de clients : la dimension grossit énormément. Solution ?",
    choix: [
      "Rien, c'est normal",
      "Une mini-dimension (ou type 1)",
      "Supprimer l'historique",
      "Une colonne par mois"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sortir cet attribut très changeant dans une « mini-dimension » reliée directement aux faits (ou le traiter en type 1). On évite une nouvelle version complète du client à chaque petit changement.",
      "Non.",
      "Non."
    ],
    retenir: "Attribut qui change souvent : mini-dimension."
  },
  {
    id: "m15-q83", dialecte: "Standard",
    q: "Le classement ABC des articles est recalculé chaque trimestre. Où le stocker, et de quel type ?",
    choix: [
      "Dans chaque rapport, recalculé",
      "Dans dim_article, type 1 ou 2",
      "Dans la table de faits uniquement",
      "Nulle part, on le recalcule"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Type 1 si on veut seulement le classement actuel, type 2 si on veut analyser les ventes selon le classement de l'époque. Le choix dépend de la question métier.",
      "Non.",
      "Non."
    ],
    retenir: "Attribut calculé : le type SCD dépend de la question."
  },
  {
    id: "m15-q84", dialecte: "Standard",
    q: "Pourquoi distinguer, dans une dimension, un membre « Inconnu » (-1) et un membre « Non applicable » (-2) ?",
    choix: [
      "Inutile, c'est la même chose",
      "Manque anormal vs sans objet",
      "Pour avoir plus de lignes",
      "Pour Power BI uniquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Inconnu = l'information devrait exister mais manque (erreur à corriger). Non applicable = elle n'a pas de sens (ex. pas de commercial pour une vente web). Les rapports de qualité ne remontent que les vrais « inconnus ».",
      "Non.",
      "Non."
    ],
    retenir: "-1 inconnu (anomalie), -2 non applicable (normal)."
  },
  {
    id: "m15-q85", dialecte: "Standard",
    q: "Dans une dimension, la région est parfois NULL. Que voit l'utilisateur dans Power BI, et que faire ?",
    choix: [
      "Rien de spécial",
      "« (Vide) » : à remplacer",
      "Une erreur de rapport",
      "Les ventes disparaissent"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une valeur « (Vide) » peu claire. Mieux : remplacer par un libellé explicite comme « Non renseignée » lors du chargement. Un rapport doit être compréhensible sans connaître la technique.",
      "Non.",
      "Non."
    ],
    retenir: "Dimensions : pas de NULL affiché, des libellés clairs."
  },
  {
    id: "m15-q86", dialecte: "Standard",
    q: "Les clés étrangères d'une table de faits doivent-elles accepter NULL ?",
    choix: [
      "Oui, c'est plus souple",
      "Non : membres -1 / -2",
      "Seulement la clé date",
      "Peu importe, c'est pareil"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un NULL ne se joint jamais : la ligne peut disparaître d'un rapport.",
      "Oui. Utiliser les membres -1 / -2 : toutes les jointures retrouvent une ligne de dimension, et les totaux restent justes.",
      "Non.",
      "Non."
    ],
    retenir: "Faits : clés NOT NULL, membres spéciaux."
  },
  {
    id: "m15-q87", dialecte: "Standard",
    q: "Un entrepôt a été modélisé comme l'ERP (normalisé, 250 tables). Quelle conséquence pour les utilisateurs Power BI ?",
    choix: [
      "Aucune, c'est l'idéal",
      "Modèle illisible, lent, complexe",
      "Une sécurité renforcée par les jointures",
      "Des rapports plus rapides"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Modèle incompréhensible, beaucoup de jointures, calculs complexes et lents : il manque une couche de restitution en étoile. Normalisé pour stocker ; en étoile pour analyser.",
      "Non.",
      "Non."
    ],
    retenir: "Restitution = étoile, pas la copie de l'ERP."
  },
  {
    id: "m15-q88", dialecte: "Standard",
    q: "Une seule énorme table « tout à plat » (One Big Table) avec toutes les colonnes : avantage et risque ?",
    choix: [
      "Aucun avantage, que des risques",
      "Simple à lire, mais rigide",
      "Aucun risque, que des avantages",
      "Elle est interdite en BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pratique pour certains usages précis (export, data science).",
      "Oui. Simple à interroger ; mais très large, beaucoup de répétitions, historique et mises à jour des descriptions difficiles. Pour Power BI, l'étoile reste généralement meilleure.",
      "Non.",
      "Non."
    ],
    retenir: "Table unique : simple, mais rigide."
  },
  {
    id: "m15-q89", dialecte: "Standard",
    q: "Pourquoi construire un modèle sémantique partagé (un dataset Power BI certifié) plutôt qu'un modèle par rapport ?",
    choix: [
      "Pour avoir plus de fichiers",
      "Mêmes chiffres dans tous les rapports",
      "Pour les couleurs communes",
      "C'est obligatoire dans Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une seule définition des mesures et des relations, réutilisée par tous les rapports. Fin des « deux CA différents » dans deux rapports.",
      "Non.",
      "Non."
    ],
    retenir: "Modèle sémantique partagé = une vérité."
  },
  {
    id: "m15-q90", dialecte: "Standard",
    q: "Comment charger seulement les lignes nouvelles ou modifiées de l'ERP chaque nuit ?",
    choix: [
      "Tout recharger chaque nuit, toujours",
      "Un repère de dernier chargement",
      "Deviner les lignes modifiées",
      "Charger une ligne sur deux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible pour de petites tables, coûteux pour les grandes.",
      "Oui. Une colonne de date de modification (ou rowversion, ou une capture de changements) : ne prendre que ce qui a changé depuis le dernier chargement réussi.",
      "Non.",
      "Non."
    ],
    retenir: "Incrémental : repère de dernier chargement."
  },
  {
    id: "m15-q91", dialecte: "Standard",
    q: "Une commande est supprimée dans l'ERP. Un chargement incrémental basé sur la date de modification la voit-il ?",
    choix: [
      "Oui, comme une modification",
      "Non, pas du tout",
      "Seulement le lundi",
      "Oui, avec un DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une ligne supprimée n'a plus de date. Il faut une suppression logique, une table de suppressions, une capture de changements, ou une comparaison complète régulière. Point souvent oublié.",
      "Non.",
      "Non."
    ],
    retenir: "Les suppressions doivent être détectées autrement."
  },
  {
    id: "m15-q92", dialecte: "Standard",
    q: "Comment s'assurer que l'entrepôt est juste par rapport à l'ERP ?",
    choix: [
      "Faire confiance au chargement",
      "Des rapprochements automatiques",
      "Demander aux utilisateurs",
      "Regarder un rapport au hasard"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Nombres de lignes et totaux (CA, quantités) par période, comparés entre source et entrepôt. Un écart déclenche une alerte avant que les décideurs ne voient un chiffre faux.",
      "Non.",
      "Non."
    ],
    retenir: "Rapprochement source / entrepôt : automatique et régulier."
  },
  {
    id: "m15-q93", dialecte: "Standard",
    q: "Dans l'ERP, l'en-tête de commande stocke aussi montant_total (somme des lignes). Quel est le risque ?",
    choix: [
      "Aucun, c'est plus pratique",
      "Total faux si une ligne change",
      "La commande devient plus lente",
      "Le total est interdit en SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Redondance : si une ligne change sans mise à jour du total, l'en-tête devient faux. Dénormalisation acceptée pour la performance, à condition d'être maîtrisée (procédure, trigger, contrôle).",
      "Non.",
      "Non."
    ],
    retenir: "Total stocké = à maintenir cohérent."
  },
  {
    id: "m15-q94", dialecte: "Standard",
    q: "Comment modéliser les adresses d'un client (facturation, livraison, plusieurs dépôts) ?",
    choix: [
      "Des colonnes adresse1, adresse2… dans client",
      "Table adresse + copie sur document",
      "Une seule adresse par client",
      "Un fichier joint au client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Nombre limité et colonnes répétées.",
      "Oui. Une table adresse (client, type, rue, cp, ville…) ; et une copie de l'adresse utilisée sur chaque document. Le document garde l'adresse « du moment ».",
      "Non.",
      "Non."
    ],
    retenir: "Adresses : table dédiée + copie sur les documents."
  },
  {
    id: "m15-q95", dialecte: "Standard",
    q: "Une même pompe existe en 3 puissances et 2 tensions. Comment modéliser ?",
    choix: [
      "Une colonne par combinaison",
      "Un modèle + variantes",
      "Un texte libre de description",
      "Une seule ligne d'article"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un article modèle et des variantes (ou un article par variante, avec des attributs puissance et tension). Analyses possibles par modèle ou par variante.",
      "Non.",
      "Non. Impossible de gérer le stock par variante."
    ],
    retenir: "Variantes : modèle + attributs."
  },
  {
    id: "m15-q96", dialecte: "Standard",
    q: "Comment modéliser une nomenclature (un kit piscine contient une pompe, un filtre, un liner…) ?",
    choix: [
      "Une colonne liste dans article",
      "Une table parent-composant-quantité",
      "Un article par composant sans lien",
      "Un fichier Excel partagé"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (article_parent, article_composant, quantite) : elle relie la table article à elle-même. Les niveaux multiples se parcourent avec une CTE récursive.",
      "Non.",
      "Non."
    ],
    retenir: "Nomenclature : table parent-composant-quantité."
  },
  {
    id: "m15-q97", dialecte: "Standard",
    q: "Un modèle « entité-attribut-valeur » (table unique : id, nom_attribut, valeur en texte) : quel est le problème ?",
    choix: [
      "Aucun, c'est le modèle le plus souple",
      "Ni types, ni contraintes, lent",
      "Il est trop rapide",
      "Il est interdit en SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas de types, pas de contraintes, requêtes très compliquées (une jointure par attribut) et lentes. Souple en apparence, coûteux en pratique.",
      "Non.",
      "Non."
    ],
    retenir: "EAV = anti-modèle dans la plupart des cas."
  },
  {
    id: "m15-q98", dialecte: "Standard",
    q: "Des caractéristiques produit varient beaucoup selon la famille (dimensions d'un liner, débit d'une pompe…). Option moderne et raisonnable ?",
    choix: [
      "100 colonnes souvent vides",
      "Colonnes communes + JSON",
      "Un modèle EAV",
      "Ne pas les stocker"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les attributs communs en colonnes, les spécifiques dans une colonne JSON (VARIANT sur Snowflake). Les attributs souvent filtrés peuvent ensuite devenir de vraies colonnes.",
      "Non. Pas de types, et des requêtes complexes.",
      "Non."
    ],
    retenir: "Attributs variables : colonnes communes + JSON."
  },
  {
    id: "m15-q99", dialecte: "Standard",
    q: "Avant de modéliser un nouveau besoin d'analyse, quelles questions poser au métier ?",
    choix: [
      "Quelle couleur pour le rapport ?",
      "Décisions, indicateurs, axes, détail",
      "Quel serveur utiliser ?",
      "Combien de pages de rapport ?"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Quelles décisions ? Quels indicateurs, avec quelle définition ? Par quels axes ? À quel niveau de détail ? Avec quel historique ? Ces réponses donnent le grain, les faits, les dimensions et le type de SCD.",
      "Non.",
      "Non."
    ],
    retenir: "Recueil du besoin : décisions, indicateurs, axes, détail, historique."
  },
  {
    id: "m15-q100", dialecte: "Standard",
    q: "Quelle phrase résume la modélisation pour l'analyse ?",
    choix: [
      "Copier l'ERP tel quel",
      "Grain, faits, dimensions, historique",
      "Tout mettre dans une seule table",
      "Laisser Power BI deviner les liens"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Définir le grain, séparer faits (mesures) et dimensions (axes), gérer l'historique, utiliser des clés techniques et des membres spéciaux, partager des dimensions conformes. C'est la méthode de Kimball.",
      "Non.",
      "Non."
    ],
    retenir: "Grain, faits, dimensions, historique, conformité."
  }
];
