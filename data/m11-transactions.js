LEARNSQL.questions.m11 = [
  {
    id: "m11-q01", dialecte: "Standard",
    q: "Un virement retire 100 € d'un compte et l'ajoute à un autre. Pourquoi faire les deux UPDATE dans une transaction ?",
    choix: [
      "Pour aller plus vite",
      "Pour que les deux réussissent ensemble ou soient annulés ensemble : jamais d'argent perdu à mi-chemin",
      "Pour trier",
      "Ce n'est pas utile"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est l'atomicité : tout ou rien.",
      "Non.",
      "Non."
    ],
    retenir: "Transaction = tout ou rien."
  },
  {
    id: "m11-q02", dialecte: "Standard",
    q: "Que veut dire ACID ?",
    choix: [
      "Accès, Calcul, Index, Données",
      "Atomicité, Cohérence, Isolation, Durabilité",
      "Ajout, Copie, Insertion, Destruction",
      "Un type d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Tout ou rien ; règles respectées ; transactions qui ne se gênent pas ; une fois validé, c'est enregistré.",
      "Non.",
      "Non."
    ],
    retenir: "ACID = Atomicité, Cohérence, Isolation, Durabilité."
  },
  {
    id: "m11-q03", dialecte: "SQL Server",
    q: "Sur SQL Server, sans BEGIN TRAN, que se passe-t-il pour un UPDATE ?",
    choix: [
      "Il attend un COMMIT",
      "Il est validé automatiquement dès qu'il se termine (mode autocommit)",
      "Il est annulé",
      "Il est refusé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si IMPLICIT_TRANSACTIONS est activé.",
      "Oui. Chaque instruction est sa propre transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Par défaut : chaque instruction est validée seule."
  },
  {
    id: "m11-q04", dialecte: "SQL Server",
    q: "Que vaut @@TRANCOUNT après BEGIN TRAN; BEGIN TRAN; ?",
    choix: ["0", "1", "2", "Erreur"],
    bonne: 2,
    pourquoi: [
      "Non.",
      "Non. Chaque BEGIN TRAN ajoute 1.",
      "Oui. Mais ce n'est pas vraiment deux transactions indépendantes.",
      "Non."
    ],
    retenir: "@@TRANCOUNT = niveau d'imbrication."
  },
  {
    id: "m11-q05", dialecte: "SQL Server",
    q: "@@TRANCOUNT vaut 2. Tu fais COMMIT. Les modifications sont-elles définitivement validées ?",
    choix: [
      "Oui",
      "Non : COMMIT fait juste passer @@TRANCOUNT à 1. Seul le dernier COMMIT (de 1 à 0) valide vraiment",
      "Oui, à moitié",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège des transactions « imbriquées ».",
      "Oui. Les transactions imbriquées ne sont pas de vraies sous-transactions.",
      "Non.",
      "Non."
    ],
    retenir: "Seul le COMMIT le plus extérieur valide."
  },
  {
    id: "m11-q06", dialecte: "SQL Server",
    q: "@@TRANCOUNT vaut 2. Tu fais ROLLBACK (sans nom). Que se passe-t-il ?",
    choix: [
      "Seule la transaction intérieure est annulée",
      "TOUT est annulé depuis le premier BEGIN TRAN, et @@TRANCOUNT revient à 0",
      "Rien",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur fréquente.",
      "Oui. Un ROLLBACK annule tout. Pour une annulation partielle : SAVE TRANSACTION.",
      "Non.",
      "Non."
    ],
    retenir: "ROLLBACK = tout annuler, quel que soit le niveau."
  },
  {
    id: "m11-q07", dialecte: "SQL Server",
    q: "À quoi sert SAVE TRANSACTION point1 ?",
    choix: [
      "À valider",
      "À poser un point de sauvegarde : ROLLBACK TRANSACTION point1 annule seulement ce qui suit, la transaction reste ouverte",
      "À sauvegarder la base",
      "À fermer la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Annulation partielle à l'intérieur d'une transaction.",
      "Non. Rien à voir avec un BACKUP.",
      "Non."
    ],
    retenir: "SAVE TRANSACTION = point de retour partiel."
  },
  {
    id: "m11-q08", dialecte: "SQL Server",
    q: "Que fait SET XACT_ABORT ON ?",
    choix: [
      "Annule tout de suite toutes les transactions",
      "Toute erreur d'exécution annule automatiquement la transaction en cours entière",
      "Empêche les transactions",
      "Accélère les COMMIT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sans lui, certaines erreurs laissent la transaction ouverte et les instructions suivantes continuent.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure qui modifie : SET XACT_ABORT ON en tête."
  },
  {
    id: "m11-q09", dialecte: "SQL Server",
    q: "Dans un bloc CATCH, que veut dire XACT_STATE() = -1 ?",
    choix: [
      "Aucune transaction",
      "Une transaction est ouverte mais « condamnée » : on ne peut que faire ROLLBACK",
      "La transaction peut être validée",
      "Erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait 0.",
      "Oui. 1 = validable, 0 = pas de transaction, -1 = seulement ROLLBACK possible.",
      "Non. Ce serait 1.",
      "Non."
    ],
    retenir: "XACT_STATE : 1 validable, 0 aucune, -1 condamnée."
  },
  {
    id: "m11-q10", dialecte: "SQL Server",
    q: "Quel modèle de gestion d'erreur est le plus sûr pour une procédure qui modifie des données ?",
    choixCode: true,
    choix: [
      "BEGIN TRAN; …; COMMIT; (sans rien d'autre)",
      "SET XACT_ABORT ON; BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH IF @@TRANCOUNT > 0 ROLLBACK; THROW; END CATCH",
      "BEGIN TRY …; END TRY BEGIN CATCH END CATCH",
      "Aucune transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une erreur peut laisser une transaction ouverte ou à moitié faite.",
      "Oui. Annulation garantie, et l'erreur remonte à l'appelant.",
      "Non. L'erreur est « avalée » : personne ne sait que ça a échoué.",
      "Non."
    ],
    retenir: "XACT_ABORT + TRY/CATCH + ROLLBACK + THROW."
  },
  {
    id: "m11-q11", dialecte: "SQL Server",
    q: "Que change SET IMPLICIT_TRANSACTIONS ON ?",
    choix: [
      "Rien",
      "Chaque INSERT / UPDATE / DELETE (et même SELECT) ouvre une transaction qui reste ouverte jusqu'à un COMMIT explicite",
      "Les transactions sont validées automatiquement",
      "Les verrous disparaissent"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Certains outils activent ce mode : un oubli de COMMIT bloque alors tout le monde.",
      "Non. C'est l'inverse.",
      "Non."
    ],
    retenir: "IMPLICIT_TRANSACTIONS ON = COMMIT obligatoire, sinon blocages."
  },
  {
    id: "m11-q12", dialecte: "SQL Server",
    q: "Sur SQL Server, un CREATE TABLE fait dans une transaction peut-il être annulé par ROLLBACK ?",
    choix: ["Non", "Oui : la plupart des ordres de structure (DDL) sont transactionnels sur SQL Server", "Seulement les DROP", "Seulement le week-end"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique pour les scripts de déploiement : tout ou rien.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : DDL annulable dans une transaction."
  },
  {
    id: "m11-q13", dialecte: "Snowflake",
    q: "Sur Snowflake, tu fais BEGIN; INSERT …; CREATE TABLE …; ROLLBACK;. L'INSERT est-il annulé ?",
    choix: [
      "Oui",
      "Non : un ordre de structure (DDL) valide implicitement la transaction en cours. L'INSERT est déjà validé",
      "Erreur",
      "Seulement le CREATE est annulé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Grosse différence avec SQL Server.",
      "Oui. Sur Snowflake, garde les DDL en dehors des transactions de données.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : un DDL fait un COMMIT implicite."
  },
  {
    id: "m11-q14", dialecte: "Snowflake",
    q: "Sur Snowflake, comment regrouper plusieurs INSERT / UPDATE dans une transaction ?",
    choixCode: true,
    choix: ["BEGIN TRAN … COMMIT TRAN", "BEGIN; … COMMIT; (ou BEGIN TRANSACTION / START TRANSACTION)", "TRANSACTION START", "Impossible"],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Sans BEGIN, chaque instruction est validée seule (autocommit).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : BEGIN … COMMIT / ROLLBACK."
  },
  {
    id: "m11-q15", dialecte: "Snowflake",
    q: "Quel niveau d'isolation propose Snowflake ?",
    choix: ["Tous les niveaux", "READ COMMITTED uniquement", "SERIALIZABLE uniquement", "READ UNCOMMITTED"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une requête voit les données validées au moment où elle démarre. Les lectures ne bloquent jamais.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : READ COMMITTED seulement."
  },
  {
    id: "m11-q16", dialecte: "SQL Server",
    q: "Une session modifie une ligne sans valider. Une autre veut lire cette ligne (niveau par défaut, sans RCSI). Que se passe-t-il ?",
    choix: [
      "Elle lit l'ancienne valeur",
      "Elle attend que la 1re session valide ou annule (blocage)",
      "Elle lit la nouvelle valeur",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas avec RCSI / SNAPSHOT.",
      "Oui. Le verrou exclusif de l'écriture bloque la lecture en READ COMMITTED classique.",
      "Non. Ce serait une lecture sale (NOLOCK).",
      "Non. Elle attend, sans erreur."
    ],
    retenir: "READ COMMITTED (verrous) : lecture bloquée par une écriture en cours."
  },
  {
    id: "m11-q17", dialecte: "SQL Server",
    q: "Qu'est-ce qu'une « lecture sale » (dirty read) ?",
    choix: [
      "Une lecture de données mal saisies",
      "Lire des données modifiées par une autre transaction pas encore validée (qui sera peut-être annulée)",
      "Une lecture lente",
      "Une lecture sans index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Possible en READ UNCOMMITTED / NOLOCK. Le chiffre lu peut n'avoir jamais existé.",
      "Non.",
      "Non."
    ],
    retenir: "Lecture sale = lire du non validé."
  },
  {
    id: "m11-q18", dialecte: "SQL Server",
    q: "Que fait WITH (NOLOCK) dans une requête ?",
    choix: [
      "Rien",
      "Lit sans poser ni respecter les verrous partagés : pas d'attente, mais lectures sales, lignes manquées ou doublées possibles",
      "Accélère sans risque",
      "Verrouille toute la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Équivaut à READ UNCOMMITTED. Dangereux pour des chiffres comptables.",
      "Non. Il y a des risques réels.",
      "Non."
    ],
    retenir: "NOLOCK = rapide mais potentiellement faux."
  },
  {
    id: "m11-q19", dialecte: "SQL Server",
    q: "Avec NOLOCK, une requête de comptage peut-elle compter deux fois la même ligne ?",
    choix: [
      "Non, jamais",
      "Oui : si la ligne est déplacée pendant la lecture (division de page), elle peut être lue deux fois ou pas du tout",
      "Seulement avec DISTINCT",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. NOLOCK n'est pas qu'un risque de « lecture sale » : il peut fausser les totaux.",
      "Non.",
      "Non. Snowflake n'a pas NOLOCK."
    ],
    retenir: "NOLOCK peut doubler ou perdre des lignes."
  },
  {
    id: "m11-q20", dialecte: "SQL Server",
    q: "Les rapports bloquent l'ERP (et l'inverse) à cause des verrous de lecture. Quelle solution est plus saine que NOLOCK partout ?",
    choix: [
      "Supprimer les index",
      "Activer READ_COMMITTED_SNAPSHOT (RCSI) sur la base : les lectures lisent la dernière version validée, sans bloquer ni être bloquées",
      "Redémarrer le serveur chaque heure",
      "Mettre les rapports la nuit uniquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Coût : versions stockées dans tempdb. À valider avec l'éditeur de l'ERP.",
      "Non.",
      "Non. Possible, mais pas toujours acceptable."
    ],
    retenir: "Lecteurs vs écrivains : RCSI plutôt que NOLOCK."
  },
  {
    id: "m11-q21", dialecte: "SQL Server",
    q: "Avec RCSI activé, une lecture pendant une modification non validée voit…",
    choix: [
      "La nouvelle valeur non validée",
      "La dernière valeur validée (avant la modification), sans attendre",
      "Rien, elle attend",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de lecture sale.",
      "Oui. Le moteur garde l'ancienne version le temps de la transaction.",
      "Non. Plus d'attente pour les lectures.",
      "Non."
    ],
    retenir: "RCSI : on lit la dernière version validée."
  },
  {
    id: "m11-q22", dialecte: "SQL Server",
    q: "Où SQL Server stocke-t-il les anciennes versions des lignes avec RCSI / SNAPSHOT ?",
    choix: ["Dans le journal", "Dans tempdb (version store)", "Dans la table elle-même", "Nulle part"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Surveiller la taille de tempdb, surtout avec de longues transactions.",
      "Non.",
      "Non."
    ],
    retenir: "Versionnement = tempdb."
  },
  {
    id: "m11-q23", dialecte: "SQL Server",
    q: "Qu'est-ce qu'une « lecture non répétable » ?",
    choix: [
      "Une lecture impossible",
      "Lire deux fois la même ligne dans une transaction et obtenir deux valeurs différentes, car une autre transaction l'a modifiée entre-temps",
      "Une lecture sans index",
      "Une erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Possible en READ COMMITTED. REPEATABLE READ l'empêche.",
      "Non.",
      "Non."
    ],
    retenir: "Non répétable = même ligne, valeur différente."
  },
  {
    id: "m11-q24", dialecte: "SQL Server",
    q: "Qu'est-ce qu'une « ligne fantôme » (phantom) ?",
    choix: [
      "Une ligne supprimée",
      "Relancer le même SELECT dans une transaction et voir apparaître de NOUVELLES lignes insérées par une autre transaction",
      "Une ligne NULL",
      "Une ligne en double"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Seul SERIALIZABLE (ou SNAPSHOT) l'empêche.",
      "Non.",
      "Non."
    ],
    retenir: "Fantôme = nouvelle ligne qui apparaît."
  },
  {
    id: "m11-q25", dialecte: "SQL Server",
    q: "Quel niveau d'isolation empêche les lectures sales, non répétables ET les fantômes, avec des verrous ?",
    choix: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
    bonne: 3,
    pourquoi: [
      "Non. Il n'empêche rien.",
      "Non. Seulement les lectures sales.",
      "Non. Les fantômes restent possibles.",
      "Oui. Le plus strict, et celui qui bloque le plus."
    ],
    retenir: "Plus d'isolation = moins d'anomalies, plus de blocages."
  },
  {
    id: "m11-q26", dialecte: "SQL Server",
    q: "Quel est le niveau d'isolation par défaut de SQL Server (installé chez soi) ?",
    choix: ["READ UNCOMMITTED", "READ COMMITTED (avec verrous)", "SERIALIZABLE", "SNAPSHOT"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (Sur Azure SQL Database, RCSI est activé par défaut.)",
      "Non.",
      "Non."
    ],
    retenir: "Défaut SQL Server : READ COMMITTED."
  },
  {
    id: "m11-q27", dialecte: "SQL Server",
    q: "En niveau SNAPSHOT, deux transactions modifient la même ligne. Que se passe-t-il pour la 2e ?",
    choix: [
      "Elle écrase la 1re",
      "Erreur de conflit de mise à jour (3960) : elle doit être relancée",
      "Elle attend toujours",
      "Les deux valeurs sont gardées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SNAPSHOT protège contre les mises à jour perdues, mais l'application doit gérer la relance.",
      "Non.",
      "Non."
    ],
    retenir: "SNAPSHOT : conflit d'écriture = erreur, à relancer."
  },
  {
    id: "m11-q28", dialecte: "SQL Server",
    q: "Deux utilisateurs lisent le stock (10), chacun retire 3 et écrit 7. Le stock final vaut 7 au lieu de 4. Comment s'appelle ce problème ?",
    choix: ["Lecture sale", "Mise à jour perdue (lost update)", "Fantôme", "Deadlock"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Solution : UPDATE stock SET qte = qte - 3 (calcul dans l'UPDATE), ou verrou UPDLOCK à la lecture.",
      "Non.",
      "Non."
    ],
    retenir: "Lire puis écrire = risque de mise à jour perdue."
  },
  {
    id: "m11-q29", dialecte: "Standard",
    q: "Quelle écriture évite la mise à jour perdue sur un stock ?",
    choixCode: true,
    choix: [
      "SELECT @q = qte …; SET @q = @q - 3; UPDATE stock SET qte = @q",
      "UPDATE stock SET qte = qte - 3 WHERE article = 'A1' AND qte >= 3",
      "UPDATE stock SET qte = 7",
      "SELECT qte FROM stock WITH (NOLOCK)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Entre la lecture et l'écriture, quelqu'un peut modifier.",
      "Oui. Le calcul et la vérification se font dans la même instruction, sous verrou.",
      "Non.",
      "Non."
    ],
    retenir: "Faire le calcul DANS l'UPDATE."
  },
  {
    id: "m11-q30", dialecte: "SQL Server",
    q: "Quels sont les deux types de verrous de base ?",
    choix: [
      "Rapide et lent",
      "Partagé (S, pour lire : plusieurs lecteurs possibles) et exclusif (X, pour écrire : un seul)",
      "Ouvert et fermé",
      "Ligne et colonne"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un X bloque tout le monde ; plusieurs S peuvent coexister.",
      "Non.",
      "Non."
    ],
    retenir: "S = lecture partagée. X = écriture exclusive."
  },
  {
    id: "m11-q31", dialecte: "SQL Server",
    q: "À quoi sert le verrou de mise à jour (U, ou indicateur UPDLOCK) ?",
    choix: [
      "À lire plus vite",
      "À réserver une ligne qu'on va modifier : les autres peuvent lire, mais personne d'autre ne peut la réserver. Évite un type de deadlock",
      "À supprimer",
      "À rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sans lui, deux sessions qui lisent puis veulent écrire s'attendent mutuellement.",
      "Non.",
      "Non."
    ],
    retenir: "UPDLOCK : « je lis pour modifier »."
  },
  {
    id: "m11-q32", dialecte: "SQL Server",
    q: "Pourquoi SQL Server pose-t-il des verrous « d'intention » (IS, IX) sur la table et la page quand on verrouille une ligne ?",
    choix: [
      "Pour rien",
      "Pour signaler qu'une ligne est verrouillée à l'intérieur : une demande de verrou sur toute la table sait tout de suite qu'elle doit attendre",
      "Pour trier",
      "Pour compresser"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas besoin de parcourir toutes les lignes pour savoir si la table est libre.",
      "Non.",
      "Non."
    ],
    retenir: "Verrous d'intention = panneau « occupé à l'intérieur »."
  },
  {
    id: "m11-q33", dialecte: "SQL Server",
    q: "Qu'est-ce que l'escalade de verrous ?",
    choix: [
      "Un verrou qui devient plus rapide",
      "Quand une instruction pose trop de verrous de lignes (environ 5 000), SQL Server les remplace par un verrou sur toute la table",
      "Un deadlock",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Économise de la mémoire, mais bloque tous les autres utilisateurs de la table.",
      "Non.",
      "Non."
    ],
    retenir: "Escalade : beaucoup de verrous de lignes → verrou de table."
  },
  {
    id: "m11-q34", dialecte: "SQL Server",
    q: "Comment éviter l'escalade de verrous lors d'une grosse purge ?",
    choix: [
      "NOLOCK",
      "Traiter par lots de moins de 5 000 lignes",
      "Ajouter DISTINCT",
      "Désactiver le journal"
    ],
    bonne: 1,
    pourquoi: [
      "Non. N'a pas d'effet sur un DELETE.",
      "Oui. Chaque lot reste sous le seuil, et les autres peuvent travailler entre deux lots.",
      "Non.",
      "Non. Impossible."
    ],
    retenir: "Purges : lots < 5 000 lignes."
  },
  {
    id: "m11-q35", dialecte: "Standard",
    q: "Quelle est la différence entre un blocage et un deadlock ?",
    choix: [
      "Aucune",
      "Blocage : une session attend qu'une autre finisse (ça se résout tout seul). Deadlock : deux sessions s'attendent mutuellement (sans fin, le moteur doit en tuer une)",
      "Le deadlock est plus court",
      "Le blocage est une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un blocage peut être long ; un deadlock est détecté et résolu en quelques secondes.",
      "Non.",
      "Non. C'est une attente."
    ],
    retenir: "Blocage = attente. Deadlock = attente circulaire."
  },
  {
    id: "m11-q36", dialecte: "SQL Server",
    q: "Que reçoit la session choisie comme « victime » d'un deadlock ?",
    choix: [
      "Rien",
      "L'erreur 1205 : sa transaction est annulée",
      "Un avertissement seulement",
      "Un redémarrage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'application (ou la procédure) peut relancer la transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Deadlock : erreur 1205, transaction annulée → relancer."
  },
  {
    id: "m11-q37", dialecte: "Standard",
    q: "Session 1 : met à jour client puis commande. Session 2 : met à jour commande puis client. Quel risque ?",
    choix: ["Aucun", "Deadlock", "Lecture sale", "Fantôme"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chacune tient une table et attend l'autre. Règle : toujours accéder aux tables dans le même ordre.",
      "Non.",
      "Non."
    ],
    retenir: "Même ordre d'accès aux tables = moins de deadlocks."
  },
  {
    id: "m11-q38", dialecte: "SQL Server",
    q: "Quelles mesures réduisent les deadlocks ?",
    choix: [
      "Transactions longues",
      "Transactions courtes, même ordre d'accès, bons index (moins de lignes verrouillées), niveau d'isolation adapté",
      "Plus de NOLOCK",
      "Plus de triggers"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse.",
      "Oui. Un index manquant fait verrouiller beaucoup plus de lignes que nécessaire.",
      "Non.",
      "Non."
    ],
    retenir: "Court, ordonné, bien indexé."
  },
  {
    id: "m11-q39", dialecte: "SQL Server",
    q: "Où retrouver le détail (graphe) des deadlocks récents sur SQL Server, sans rien configurer ?",
    choix: [
      "Nulle part",
      "Dans la session Extended Events « system_health », qui enregistre les deadlocks par défaut",
      "Dans le journal Windows",
      "Dans la table sys.tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le graphe montre les sessions, les requêtes et les ressources en cause.",
      "Non.",
      "Non."
    ],
    retenir: "Deadlocks : session system_health."
  },
  {
    id: "m11-q40", dialecte: "SQL Server",
    q: "Comment voir qui bloque qui, en ce moment ?",
    choixCode: true,
    choix: [
      "SELECT session_id, blocking_session_id, wait_type, wait_time FROM sys.dm_exec_requests WHERE blocking_session_id <> 0",
      "SELECT * FROM sys.tables",
      "DBCC CHECKDB",
      "SELECT @@VERSION"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Remonte la chaîne jusqu'à la session qui bloque sans être bloquée (la « tête »). sp_who2 donne aussi l'info.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Blocages en cours : sys.dm_exec_requests.blocking_session_id."
  },
  {
    id: "m11-q41", dialecte: "SQL Server",
    q: "Comment trouver la plus vieille transaction ouverte d'une base ?",
    choixCode: true,
    choix: ["DBCC OPENTRAN", "SELECT @@TRANCOUNT", "sp_help", "SHOW TRANSACTIONS"],
    bonne: 0,
    pourquoi: [
      "Oui. Affiche la session et l'heure de début : souvent la coupable d'un blocage ou d'un journal qui grossit.",
      "Non. Seulement pour ta propre session.",
      "Non.",
      "Non. Syntaxe Snowflake."
    ],
    retenir: "DBCC OPENTRAN : la plus vieille transaction ouverte."
  },
  {
    id: "m11-q42", dialecte: "SQL Server",
    q: "Tu fais KILL 87 sur une session qui modifiait 5 millions de lignes depuis 1 heure. Que se passe-t-il ?",
    choix: [
      "Elle s'arrête instantanément",
      "Sa transaction est annulée (ROLLBACK), ce qui peut prendre aussi longtemps que le travail déjà fait",
      "Les modifications sont validées",
      "Le serveur redémarre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pendant l'annulation, les verrous restent posés. KILL n'est jamais anodin.",
      "Non.",
      "Non."
    ],
    retenir: "KILL = ROLLBACK, parfois long."
  },
  {
    id: "m11-q43", dialecte: "SQL Server",
    q: "Pourquoi une transaction restée ouverte des heures fait-elle grossir le journal (log) ?",
    choix: [
      "Elle n'a pas d'effet",
      "Le journal ne peut pas être vidé au-delà de la plus vieille transaction active : tout ce qui suit est conservé",
      "Elle compresse le journal",
      "Elle supprime le journal"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Disque plein possible. Encore une raison de garder les transactions courtes.",
      "Non.",
      "Non."
    ],
    retenir: "Transaction longue = journal qui gonfle."
  },
  {
    id: "m11-q44", dialecte: "SQL Server",
    q: "Que fait SET LOCK_TIMEOUT 5000 ?",
    choix: [
      "Les verrous durent 5 secondes",
      "Au lieu d'attendre sans fin un verrou, l'instruction échoue (erreur 1222) après 5 secondes",
      "La transaction est validée après 5 s",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile pour un traitement qui préfère échouer vite plutôt qu'attendre.",
      "Non.",
      "Non."
    ],
    retenir: "LOCK_TIMEOUT : limiter l'attente des verrous."
  },
  {
    id: "m11-q45", dialecte: "SQL Server",
    q: "Une table sert de file d'attente : plusieurs traitements prennent les tâches « à faire ». Quel indicateur permet de sauter les lignes déjà prises par un autre ?",
    choixCode: true,
    choix: ["NOLOCK", "READPAST (avec UPDLOCK, ROWLOCK)", "TABLOCK", "HOLDLOCK"],
    bonne: 1,
    pourquoi: [
      "Non. Deux traitements prendraient la même tâche.",
      "Oui. UPDATE TOP (1) … WITH (UPDLOCK, READPAST, ROWLOCK) : chacun prend une tâche libre.",
      "Non. Bloque toute la table.",
      "Non."
    ],
    retenir: "File d'attente : UPDLOCK + READPAST."
  },
  {
    id: "m11-q46", dialecte: "SQL Server",
    q: "Que fait l'indicateur WITH (TABLOCK) sur un INSERT massif ?",
    choix: [
      "Rien",
      "Prend un verrou sur toute la table : moins de verrous à gérer, et parfois une journalisation réduite",
      "Lit sans verrou",
      "Empêche l'INSERT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour des chargements de nuit, quand personne d'autre n'utilise la table.",
      "Non.",
      "Non."
    ],
    retenir: "TABLOCK : chargement massif, table pour soi seul."
  },
  {
    id: "m11-q47", dialecte: "Standard",
    q: "Un écran ouvre une transaction, puis attend que l'utilisateur clique « Valider ». Quel est le problème ?",
    choix: [
      "Aucun",
      "L'utilisateur peut partir déjeuner : la transaction reste ouverte, les verrous bloquent tout le monde",
      "Le clic est trop rapide",
      "Le serveur refuse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Règle : jamais d'attente humaine dans une transaction. On lit, l'utilisateur modifie, puis une transaction courte écrit.",
      "Non.",
      "Non."
    ],
    retenir: "Jamais d'interaction utilisateur pendant une transaction."
  },
  {
    id: "m11-q48", dialecte: "SQL Server",
    q: "Comment un index peut-il réduire les blocages ?",
    choix: [
      "Il n'a aucun effet",
      "Sans index, un UPDATE … WHERE doit parcourir (et souvent verrouiller) beaucoup plus de lignes ; avec un index, il ne touche que les lignes visées",
      "Il supprime les verrous",
      "Il désactive les transactions"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Moins de lignes lues = moins de verrous = moins de conflits.",
      "Non.",
      "Non."
    ],
    retenir: "Bons index = moins de verrous."
  },
  {
    id: "m11-q49", dialecte: "SQL Server",
    q: "Que fait l'indicateur HOLDLOCK (WITH (HOLDLOCK)) sur une lecture ?",
    choix: [
      "Rien",
      "Garde les verrous jusqu'à la fin de la transaction, comme en SERIALIZABLE, pour cette table",
      "Lit sans verrou",
      "Valide la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile pour un « insérer si absent » sûr, mais augmente les blocages.",
      "Non.",
      "Non."
    ],
    retenir: "HOLDLOCK = SERIALIZABLE sur une table."
  },
  {
    id: "m11-q50", dialecte: "Snowflake",
    q: "Sur Snowflake, une longue requête de lecture bloque-t-elle un UPDATE sur la même table ?",
    choix: [
      "Oui",
      "Non : les lectures ne posent pas de verrou qui bloque les écritures, et ne sont pas bloquées par elles",
      "Seulement le soir",
      "Seulement sans warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque requête lit une version cohérente des données. Les conflits concernent surtout les écritures entre elles.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : lecteurs et écrivains ne se bloquent pas."
  },
  {
    id: "m11-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, deux sessions lancent en même temps un UPDATE sur la même table. Que se passe-t-il généralement ?",
    choix: [
      "Les deux s'exécutent en parallèle sans conflit",
      "La 2e attend que la 1re soit validée (les UPDATE / DELETE / MERGE sur une même table s'attendent souvent). Les INSERT / COPY, eux, se gênent peu",
      "La 2e est annulée tout de suite",
      "Les données sont mélangées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Évite de lancer plusieurs traitements de modification sur la même table en même temps.",
      "Non. Elle attend (jusqu'au délai LOCK_TIMEOUT).",
      "Non."
    ],
    retenir: "Snowflake : écritures concurrentes sur une table = attente."
  },
  {
    id: "m11-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, une requête attend un verrou depuis des heures. Quel paramètre limite cette attente ?",
    choixCode: true,
    choix: ["LOCK_TIMEOUT", "STATEMENT_TIMEOUT_IN_SECONDS", "AUTO_SUSPEND", "DATA_RETENTION_TIME_IN_DAYS"],
    bonne: 0,
    pourquoi: [
      "Oui. Par défaut 12 heures (43 200 s) : souvent trop long pour un traitement.",
      "Non. Il limite la durée totale d'exécution, pas l'attente de verrou.",
      "Non. Concerne le warehouse.",
      "Non. Concerne Time Travel."
    ],
    retenir: "Snowflake : LOCK_TIMEOUT = attente max d'un verrou."
  },
  {
    id: "m11-q53", dialecte: "Snowflake",
    q: "Sur Snowflake, comment voir les verrous et transactions en cours ?",
    choixCode: true,
    choix: ["SHOW LOCKS; et SHOW TRANSACTIONS;", "sp_who2", "DBCC OPENTRAN", "SELECT @@TRANCOUNT"],
    bonne: 0,
    pourquoi: [
      "Oui. Pour retrouver qui bloque une table.",
      "Non. SQL Server.",
      "Non. SQL Server.",
      "Non. SQL Server."
    ],
    retenir: "Snowflake : SHOW LOCKS, SHOW TRANSACTIONS."
  },
  {
    id: "m11-q54", dialecte: "Snowflake",
    q: "Sur Snowflake, comment annuler une transaction restée ouverte qui bloque une table ?",
    choixCode: true,
    choix: ["KILL 87", "SELECT SYSTEM$ABORT_TRANSACTION(<id de transaction>)", "ROLLBACK ALL", "DROP TRANSACTION"],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. L'id se trouve avec SHOW TRANSACTIONS ou SHOW LOCKS.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : SYSTEM$ABORT_TRANSACTION."
  },
  {
    id: "m11-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, que se passe-t-il si une session met AUTOCOMMIT = FALSE ?",
    choix: [
      "Rien",
      "Chaque modification ouvre une transaction qui reste ouverte jusqu'à un COMMIT ou ROLLBACK explicite",
      "Les modifications sont interdites",
      "Les requêtes deviennent plus rapides"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Comme IMPLICIT_TRANSACTIONS sur SQL Server : attention aux oublis de COMMIT.",
      "Non.",
      "Non."
    ],
    retenir: "AUTOCOMMIT = FALSE : COMMIT obligatoire."
  },
  {
    id: "m11-q56", dialecte: "SQL Server",
    q: "Juste après le message « COMMIT réussi », le serveur plante. Les données validées sont-elles perdues ?",
    choix: [
      "Oui",
      "Non : la validation est écrite dans le journal sur disque avant de répondre. Au redémarrage, elles sont rejouées",
      "Seulement la moitié",
      "Ça dépend de l'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est la durabilité (le D de ACID).",
      "Non.",
      "Non."
    ],
    retenir: "COMMIT confirmé = données durables."
  },
  {
    id: "m11-q57", dialecte: "SQL Server",
    q: "Pourquoi SQL Server écrit-il d'abord dans le journal (log) avant de modifier les pages de données ?",
    choix: [
      "Pour rien",
      "Pour pouvoir rejouer ou annuler les modifications après un incident (journalisation anticipée)",
      "Pour compresser",
      "Pour trier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le journal est la vraie garantie de cohérence. Il faut le sauvegarder et le surveiller.",
      "Non.",
      "Non."
    ],
    retenir: "Journal d'abord, données ensuite."
  },
  {
    id: "m11-q58", dialecte: "SQL Server",
    q: "Que fait l'option DELAYED_DURABILITY sur SQL Server ?",
    choix: [
      "Rien",
      "Le COMMIT répond avant que le journal soit écrit sur disque : plus rapide, mais les dernières transactions peuvent être perdues en cas de panne",
      "Elle double la sécurité",
      "Elle supprime le journal"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Compromis vitesse / sécurité. À réserver à des données reconstructibles.",
      "Non.",
      "Non."
    ],
    retenir: "Durabilité différée = plus vite, moins sûr."
  },
  {
    id: "m11-q59", dialecte: "SQL Server",
    q: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE s'applique à quoi ?",
    choix: [
      "À toute la base, pour tout le monde",
      "À ta session, jusqu'à ce que tu le changes (ou la fin de la session / procédure)",
      "À la requête suivante seulement",
      "À une table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les autres sessions ne sont pas concernées.",
      "Non.",
      "Non. Pour une table : un indicateur WITH (…)."
    ],
    retenir: "Niveau d'isolation = réglage de session."
  },
  {
    id: "m11-q60", dialecte: "SQL Server",
    q: "Quelle est la portée d'un indicateur de table comme WITH (UPDLOCK) ?",
    choix: [
      "Toute la session",
      "Cette table, dans cette requête seulement",
      "Toute la base",
      "Toutes les tables de la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Réglage très ciblé.",
      "Non.",
      "Non."
    ],
    retenir: "Indicateur de table = une table, une requête."
  },
  {
    id: "m11-q61", dialecte: "SQL Server",
    q: "En READ COMMITTED (verrous), combien de temps un SELECT garde-t-il ses verrous partagés ?",
    choix: [
      "Jusqu'à la fin de la transaction",
      "Juste le temps de lire chaque ligne (ou page), puis il les relâche",
      "Une heure",
      "Il n'en pose pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait REPEATABLE READ.",
      "Oui. D'où les lectures non répétables : la ligne peut changer juste après.",
      "Non.",
      "Non. Il en pose, brièvement."
    ],
    retenir: "READ COMMITTED : verrous de lecture très courts."
  },
  {
    id: "m11-q62", dialecte: "SQL Server",
    q: "En REPEATABLE READ, que subit une autre session qui veut modifier une ligne que tu as lue ?",
    choix: [
      "Rien",
      "Elle attend la fin de ta transaction : tu gardes ton verrou de lecture jusqu'au bout",
      "Elle lit une copie",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Plus de cohérence pour toi, plus d'attente pour les autres.",
      "Non.",
      "Non."
    ],
    retenir: "REPEATABLE READ : lectures verrouillées jusqu'à la fin."
  },
  {
    id: "m11-q63", dialecte: "SQL Server",
    q: "En SERIALIZABLE, tu as lu les commandes du client 42. Une autre session veut insérer une commande pour le client 42. Que se passe-t-il ?",
    choix: [
      "Elle insère",
      "Elle attend : SERIALIZABLE verrouille aussi la « plage » lue, pour empêcher les fantômes",
      "Une erreur immédiate",
      "Elle insère pour un autre client"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Verrous de plage (key-range), d'autant plus efficaces qu'il existe un index sur client_id.",
      "Non.",
      "Non."
    ],
    retenir: "SERIALIZABLE : même les insertions dans la plage lue attendent."
  },
  {
    id: "m11-q64", dialecte: "SQL Server",
    q: "Quelle différence entre RCSI et le niveau SNAPSHOT ?",
    choix: [
      "Aucune",
      "RCSI : chaque INSTRUCTION voit une photo cohérente. SNAPSHOT : toute la TRANSACTION voit la même photo, du début à la fin",
      "SNAPSHOT bloque plus",
      "RCSI est sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SNAPSHOT est utile pour un rapport en plusieurs requêtes qui doivent être cohérentes entre elles.",
      "Non. Les deux évitent les blocages lecture / écriture.",
      "Non."
    ],
    retenir: "RCSI = cohérent par instruction. SNAPSHOT = cohérent par transaction."
  },
  {
    id: "m11-q65", dialecte: "SQL Server",
    q: "Comment utiliser le niveau SNAPSHOT dans une session ?",
    choix: [
      "Rien à faire",
      "Activer ALLOW_SNAPSHOT_ISOLATION ON sur la base, puis SET TRANSACTION ISOLATION LEVEL SNAPSHOT dans la session",
      "WITH (NOLOCK)",
      "Redémarrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Deux étapes : autoriser au niveau base, puis demander au niveau session.",
      "Non.",
      "Non."
    ],
    retenir: "SNAPSHOT : autoriser (base) + demander (session)."
  },
  {
    id: "m11-q66", dialecte: "SQL Server",
    q: "ALTER DATABASE … SET READ_COMMITTED_SNAPSHOT ON reste bloqué sans fin. Pourquoi ?",
    choix: [
      "Bug",
      "Il a besoin d'être seul sur la base : d'autres connexions sont ouvertes. Fenêtre de maintenance, ou WITH ROLLBACK IMMEDIATE (coupe les autres)",
      "Le disque est plein",
      "Il faut un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. À planifier avec les utilisateurs et l'éditeur de l'ERP.",
      "Non.",
      "Non."
    ],
    retenir: "Activer RCSI : opération exclusive, à planifier."
  },
  {
    id: "m11-q67", dialecte: "SQL Server",
    q: "Après l'activation de RCSI, quel risque pour une application existante ?",
    choix: [
      "Aucun",
      "Du code qui comptait sur un blocage pour se protéger (lire puis écrire) peut maintenant lire une ancienne valeur et créer des incohérences",
      "Toutes les requêtes échouent",
      "Les index disparaissent"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Risque faible mais réel.",
      "Oui. Ce code doit utiliser UPDLOCK ou faire le calcul dans l'UPDATE.",
      "Non.",
      "Non."
    ],
    retenir: "RCSI change le comportement : tester avant."
  },
  {
    id: "m11-q68", dialecte: "SQL Server",
    q: "Un rapport enchaîne 5 SELECT (CA, marge, stock…) pendant que l'ERP travaille. Les chiffres ne « tombent » pas juste entre eux. Pourquoi, et quelle solution ?",
    choix: [
      "Bug de calcul",
      "Chaque SELECT voit un moment différent. En niveau SNAPSHOT, les 5 SELECT de la transaction voient la même photo",
      "Il faut NOLOCK",
      "Il faut un seul SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ou calculer le rapport sur une copie figée (entrepôt de données).",
      "Non. Pire.",
      "Non. Pas toujours possible."
    ],
    retenir: "Rapport multi-requêtes cohérent : SNAPSHOT ou copie figée."
  },
  {
    id: "m11-q69", dialecte: "SQL Server",
    q: "Dans les statistiques d'attente du serveur, LCK_M_X et LCK_M_S sont très hauts. Que veut dire cette mesure ?",
    choix: [
      "Le disque est lent",
      "Beaucoup de temps passé à attendre des verrous : problème de blocages",
      "Le processeur est saturé",
      "Tout va bien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait plutôt PAGEIOLATCH.",
      "Oui. Cherche les transactions longues et les requêtes sans bon index.",
      "Non. Ce serait plutôt SOS_SCHEDULER_YIELD.",
      "Non."
    ],
    retenir: "Attentes LCK_M_* = blocages."
  },
  {
    id: "m11-q70", dialecte: "SQL Server",
    q: "Comment faire enregistrer par SQL Server les blocages qui durent plus de 20 secondes ?",
    choix: [
      "Impossible",
      "Régler « blocked process threshold » à 20 et capturer l'événement blocked_process_report (Extended Events)",
      "Mettre NOLOCK",
      "Regarder l'écran en continu"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le rapport donne la requête bloquée et la requête bloquante, même la nuit.",
      "Non.",
      "Non."
    ],
    retenir: "Blocages longs : blocked process report."
  },
  {
    id: "m11-q71", dialecte: "SQL Server",
    q: "Un traitement de nuit et l'ERP se retrouvent parfois en deadlock. Comment faire en sorte que ce soit le traitement qui soit sacrifié ?",
    choixCode: true,
    choix: ["SET DEADLOCK_PRIORITY LOW; dans le traitement", "SET DEADLOCK_PRIORITY HIGH; dans le traitement", "WITH (NOLOCK)", "Impossible"],
    bonne: 0,
    pourquoi: [
      "Oui. Le moteur choisit en priorité la session de priorité basse. Le traitement doit savoir se relancer.",
      "Non. C'est l'inverse.",
      "Non.",
      "Non."
    ],
    retenir: "DEADLOCK_PRIORITY LOW = je me sacrifie en premier."
  },
  {
    id: "m11-q72", dialecte: "SQL Server",
    q: "Comment rendre une procédure robuste face aux deadlocks ?",
    choix: [
      "Ignorer l'erreur",
      "Dans le CATCH, si ERROR_NUMBER() = 1205, attendre un peu et relancer la transaction (quelques tentatives maximum)",
      "Mettre NOLOCK partout",
      "Supprimer les transactions"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données ne sont pas écrites.",
      "Oui. Une boucle de nouvelles tentatives limitée.",
      "Non.",
      "Non."
    ],
    retenir: "Deadlock = relance automatique (limitée)."
  },
  {
    id: "m11-q73", dialecte: "SQL Server",
    q: "Deux sessions lisent la même ligne (verrou S), puis veulent la modifier (verrou X). Que se passe-t-il ?",
    choix: [
      "Rien",
      "Deadlock « de conversion » : chacune attend que l'autre relâche son S. UPDLOCK à la lecture l'évite",
      "Lecture sale",
      "Elles modifient en même temps"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec UPDLOCK, la 2e attend dès la lecture : pas de cycle.",
      "Non.",
      "Non."
    ],
    retenir: "Lire pour modifier : UPDLOCK évite le deadlock de conversion."
  },
  {
    id: "m11-q74", dialecte: "SQL Server",
    q: "Des deadlocks apparaissent lors de suppressions de clients. La table commande n'a pas d'index sur client_id. Lien ?",
    choix: [
      "Aucun",
      "Pour vérifier la clé étrangère, SQL Server parcourt toute la table commande et verrouille beaucoup plus que nécessaire : plus de conflits",
      "Les index causent les deadlocks",
      "C'est un bug"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un index sur la colonne de clé étrangère réduit fortement les verrous.",
      "Non.",
      "Non."
    ],
    retenir: "FK sans index = scans + verrous + deadlocks."
  },
  {
    id: "m11-q75", dialecte: "SQL Server",
    q: "Que font les indicateurs ROWLOCK et PAGLOCK ?",
    choix: [
      "Ils désactivent les verrous",
      "Ils demandent un niveau de verrou précis (ligne ou page) au lieu de laisser SQL Server choisir",
      "Ils valident",
      "Ils trient"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. À utiliser rarement : SQL Server choisit bien dans la plupart des cas.",
      "Non.",
      "Non."
    ],
    retenir: "ROWLOCK / PAGLOCK : forcer la granularité (rarement utile)."
  },
  {
    id: "m11-q76", dialecte: "SQL Server",
    q: "Sur une table partitionnée, que permet ALTER TABLE … SET (LOCK_ESCALATION = AUTO) ?",
    choix: [
      "Rien",
      "L'escalade se fait au niveau de la partition plutôt que de toute la table : les autres partitions restent accessibles",
      "Elle supprime l'escalade",
      "Elle double les verrous"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile quand un traitement travaille sur un mois pendant que les utilisateurs lisent les autres.",
      "Non. Ce serait DISABLE (et encore, pas totalement).",
      "Non."
    ],
    retenir: "Partition + LOCK_ESCALATION = AUTO : escalade limitée à la partition."
  },
  {
    id: "m11-q77", dialecte: "SQL Server",
    q: "Pourquoi ne pas désactiver l'escalade de verrous (LOCK_ESCALATION = DISABLE) partout ?",
    choix: [
      "C'est impossible",
      "Des millions de verrous de lignes consomment beaucoup de mémoire : risque pour tout le serveur",
      "Ça désactive les transactions",
      "Ça n'a aucun effet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est possible par table.",
      "Oui. Mieux vaut traiter par lots.",
      "Non.",
      "Non."
    ],
    retenir: "Désactiver l'escalade : en dernier recours."
  },
  {
    id: "m11-q78", dialecte: "SQL Server",
    q: "Sur SQL Server, quel est l'équivalent du SELECT … FOR UPDATE d'Oracle ou PostgreSQL ?",
    choixCode: true,
    choix: ["SELECT … FOR UPDATE", "SELECT … FROM t WITH (UPDLOCK, ROWLOCK) WHERE …, dans une transaction", "SELECT … LOCK", "Il n'y en a pas"],
    bonne: 1,
    pourquoi: [
      "Non. N'existe pas sur SQL Server.",
      "Oui. La ligne est réservée jusqu'à la fin de la transaction.",
      "Non.",
      "Non."
    ],
    retenir: "FOR UPDATE ≈ WITH (UPDLOCK) sur SQL Server."
  },
  {
    id: "m11-q79", dialecte: "Standard",
    q: "Quelle est la différence entre gestion « pessimiste » et « optimiste » des accès concurrents ?",
    choix: [
      "Aucune",
      "Pessimiste : on verrouille avant de modifier (attente). Optimiste : on ne verrouille pas, on vérifie au moment d'écrire que personne n'a changé la donnée (version)",
      "Pessimiste = NOLOCK",
      "Optimiste = SERIALIZABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Optimiste convient quand les conflits sont rares (fiches clients). Pessimiste quand ils sont fréquents (stock).",
      "Non.",
      "Non."
    ],
    retenir: "Pessimiste = verrouiller. Optimiste = vérifier la version."
  },
  {
    id: "m11-q80", dialecte: "Standard",
    q: "Un chargement de nuit insère 10 millions de lignes. Une seule grosse transaction ou des validations par lots ?",
    choix: [
      "Toujours une seule",
      "Par lots, en général : journal plus petit, moins de verrous. Mais il faut alors pouvoir reprendre proprement après une erreur au milieu",
      "Aucune transaction",
      "Une transaction par ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible si le volume est maîtrisé, mais risqué.",
      "Oui. C'est un compromis : tout ou rien vs reprise.",
      "Non.",
      "Non. Beaucoup trop lent."
    ],
    retenir: "Gros volumes : lots + reprise possible."
  },
  {
    id: "m11-q81", dialecte: "Standard",
    q: "Comment rendre un traitement par lots « reprenable » après une panne ?",
    choix: [
      "Le relancer depuis le début en espérant",
      "Noter dans une table de suivi le dernier lot validé (ex. dernier id traité), et repartir de là",
      "Désactiver le journal",
      "Mettre NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Risque de doublons.",
      "Oui. Chaque lot met à jour le point de reprise dans la même transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Point de reprise enregistré avec chaque lot."
  },
  {
    id: "m11-q82", dialecte: "SQL Server",
    q: "Une transaction modifie des données sur deux serveurs (via serveur lié). Qu'implique-t-elle ?",
    choix: [
      "Rien de spécial",
      "Une transaction distribuée (MSDTC) : plus lente, plus fragile, à éviter si possible",
      "C'est interdit",
      "Elle est automatiquement en NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Préfère copier les données puis traiter localement, ou découpler par une file d'échange.",
      "Non.",
      "Non."
    ],
    retenir: "Transactions multi-serveurs : à éviter."
  },
  {
    id: "m11-q83", dialecte: "SQL Server",
    q: "Un trigger AFTER INSERT lève une erreur. Que devient l'INSERT qui l'a déclenché ?",
    choix: [
      "Il est validé quand même",
      "Il est annulé : le trigger s'exécute dans la même transaction que l'instruction",
      "Il est mis en attente",
      "Il est inséré deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le trigger fait partie de la transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Trigger = même transaction que l'instruction."
  },
  {
    id: "m11-q84", dialecte: "SQL Server",
    q: "Pourquoi un trigger lent (qui appelle un service externe ou fait de gros calculs) aggrave-t-il les blocages ?",
    choix: [
      "Il n'a pas d'effet",
      "Il rallonge la transaction de chaque INSERT / UPDATE : les verrous sont gardés plus longtemps",
      "Il supprime les verrous",
      "Il passe en NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un trigger doit être court. Les traitements lourds : en différé (file d'attente, traitement planifié).",
      "Non.",
      "Non."
    ],
    retenir: "Triggers courts, sinon transactions longues."
  },
  {
    id: "m11-q85", dialecte: "SQL Server",
    q: "TRUNCATE TABLE stg_import reste bloqué alors que personne ne modifie cette table. Pourquoi ?",
    choix: [
      "Bug",
      "TRUNCATE demande un verrou de modification de structure (Sch-M) : même une simple lecture en cours sur la table le bloque",
      "La table est vide",
      "Il faut un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Cherche une requête de lecture (ou une transaction ouverte) sur cette table.",
      "Non.",
      "Non."
    ],
    retenir: "TRUNCATE / ALTER : verrou Sch-M, bloqué par tout le monde."
  },
  {
    id: "m11-q86", dialecte: "SQL Server",
    q: "Reconstruire un index en journée bloque les utilisateurs. Quelle option l'évite (selon l'édition) ?",
    choixCode: true,
    choix: ["ALTER INDEX … REBUILD WITH (ONLINE = ON)", "WITH (NOLOCK)", "TRUNCATE", "Rien"],
    bonne: 0,
    pourquoi: [
      "Oui. Les lectures et écritures continuent pendant la reconstruction (édition Enterprise / Azure).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Maintenance en journée : ONLINE = ON."
  },
  {
    id: "m11-q87", dialecte: "SQL Server",
    q: "En fermant un onglet SSMS, un message demande : « Il y a des transactions non validées. Voulez-vous les valider ? ». Que faire ?",
    choix: [
      "Toujours répondre Oui",
      "Réfléchir : tu avais laissé une transaction ouverte. Vérifie ce qu'elle contient avant de choisir valider ou annuler",
      "Toujours répondre Annuler",
      "Ignorer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu pourrais valider un test.",
      "Oui. Ce message signale aussi que tu bloquais peut-être d'autres utilisateurs.",
      "Non. Pas toujours non plus.",
      "Non."
    ],
    retenir: "Ce message = une transaction oubliée."
  },
  {
    id: "m11-q88", dialecte: "SQL Server",
    q: "Une procédure appelée à l'intérieur d'une transaction fait ROLLBACK. L'appelant reçoit l'erreur 266. Pourquoi ?",
    choix: [
      "Bug",
      "Le ROLLBACK de la procédure a annulé TOUTE la transaction de l'appelant : le nombre de transactions n'est plus le même qu'avant l'appel",
      "La procédure n'existe pas",
      "Problème de droits"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une procédure appelée dans une transaction doit être prudente avec ROLLBACK.",
      "Non.",
      "Non."
    ],
    retenir: "Erreur 266 = ROLLBACK intérieur qui casse la transaction extérieure."
  },
  {
    id: "m11-q89", dialecte: "SQL Server",
    q: "Comment une procédure peut-elle annuler seulement son propre travail si elle est appelée dans une transaction existante ?",
    choix: [
      "ROLLBACK simple",
      "Si @@TRANCOUNT > 0 à l'entrée : SAVE TRANSACTION point_proc, et en cas d'erreur ROLLBACK TRANSACTION point_proc",
      "Impossible",
      "COMMIT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Annule tout.",
      "Oui. Sinon, elle ouvre sa propre transaction. Modèle classique mais délicat.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure imbriquée : point de sauvegarde."
  },
  {
    id: "m11-q90", dialecte: "Standard",
    q: "Power BI interroge directement la base de l'ERP en continu. Quel risque, et quelle architecture est plus saine ?",
    choix: [
      "Aucun risque",
      "Requêtes lourdes = verrous et charge sur l'ERP. Mieux : alimenter un entrepôt (ou une copie de lecture) et y brancher Power BI",
      "Mettre NOLOCK dans Power BI",
      "Arrêter les rapports"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Séparer la saisie (OLTP) de l'analyse (entrepôt Snowflake) protège les utilisateurs de l'ERP.",
      "Non.",
      "Non."
    ],
    retenir: "Analyse sur une copie, pas sur l'ERP en direct."
  },
  {
    id: "m11-q91", dialecte: "SQL Server",
    q: "Avec Always On, des rapports lisent un réplica secondaire « lisible ». Quel niveau d'isolation y est utilisé ?",
    choix: [
      "READ UNCOMMITTED",
      "SNAPSHOT, automatiquement : les lectures ne bloquent pas la réplication",
      "SERIALIZABLE",
      "Aucun"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les indicateurs de verrou sont ignorés sur le secondaire.",
      "Non.",
      "Non."
    ],
    retenir: "Réplica lisible = SNAPSHOT automatique."
  },
  {
    id: "m11-q92", dialecte: "SQL Server",
    q: "Que donne UPDATE t WITH (NOLOCK) SET … ?",
    choix: [
      "Une mise à jour sans verrou",
      "Une erreur : NOLOCK n'est pas autorisé sur la table cible d'une modification",
      "Une mise à jour plus rapide",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Impossible : une écriture pose toujours des verrous exclusifs.",
      "Oui. NOLOCK ne concerne que les lectures.",
      "Non.",
      "Non."
    ],
    retenir: "NOLOCK : jamais sur la cible d'une écriture."
  },
  {
    id: "m11-q93", dialecte: "Standard",
    q: "Pour éviter deux clients avec le même email, une procédure fait IF NOT EXISTS (SELECT …) INSERT …. Est-ce suffisant ?",
    choix: [
      "Oui",
      "Non : deux sessions peuvent passer le test en même temps. La vraie garantie est une contrainte UNIQUE en base",
      "Oui avec NOLOCK",
      "Oui la nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le test reste utile pour un message clair, mais la contrainte est le filet de sécurité.",
      "Non. Pire.",
      "Non."
    ],
    retenir: "Unicité garantie = contrainte UNIQUE, pas un SELECT avant."
  },
  {
    id: "m11-q94", dialecte: "Standard",
    q: "Un traitement de recalcul des prix verrouille la table article pendant 20 minutes. Quelle décision d'organisation prendre en premier ?",
    choix: [
      "Le lancer à 10 h, en pleine saisie",
      "Le planifier hors des heures de saisie, et le découper en lots si possible",
      "Mettre NOLOCK partout dans l'ERP",
      "Désactiver les verrous"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Planification + découpage : souvent la solution la plus simple et la plus efficace.",
      "Non.",
      "Non."
    ],
    retenir: "Traitements lourds : hors heures de saisie, par lots."
  },
  {
    id: "m11-q95", dialecte: "SQL Server",
    q: "Comment obtenir le prochain numéro de facture depuis une table compteur, sans risque que deux sessions obtiennent le même ?",
    choixCode: true,
    choix: [
      "SELECT @n = n FROM compteur; UPDATE compteur SET n = @n + 1;",
      "UPDATE compteur SET n = n + 1 OUTPUT inserted.n WHERE code = 'FACTURE';",
      "SELECT MAX(num) + 1 FROM facture",
      "NEWID()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux sessions peuvent lire la même valeur.",
      "Oui. Incrément et lecture en une seule instruction atomique.",
      "Non. Deux sessions peuvent calculer le même MAX.",
      "Non. Pas un numéro de facture."
    ],
    retenir: "Compteur sûr : UPDATE … SET n = n + 1 OUTPUT inserted.n."
  },
  {
    id: "m11-q96", dialecte: "SQL Server",
    q: "Pourquoi une SEQUENCE ne convient-elle pas toujours pour des numéros de facture légaux ?",
    choix: [
      "Elle est trop lente",
      "Une valeur prise puis annulée (ROLLBACK) est perdue : des trous apparaissent. Une table compteur dans la même transaction n'en laisse pas",
      "Elle ne compte pas",
      "Elle est réservée à Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est très rapide.",
      "Oui. La table compteur, elle, est annulée avec la transaction. Contrepartie : les factures se créent une par une.",
      "Non.",
      "Non."
    ],
    retenir: "Sans trou = compteur transactionnel. Rapide = SEQUENCE (avec trous)."
  },
  {
    id: "m11-q97", dialecte: "Snowflake",
    q: "Sur Snowflake, une longue requête démarre à 10 h 00. Un INSERT est validé à 10 h 01. La requête voit-elle les nouvelles lignes ?",
    choix: [
      "Oui",
      "Non : une requête voit les données telles qu'elles étaient à son démarrage",
      "À moitié",
      "Elle s'arrête"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Cohérence au niveau de l'instruction : le résultat ne mélange jamais deux moments.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : une requête = une photo cohérente."
  },
  {
    id: "m11-q98", dialecte: "Standard",
    q: "Que deviennent les verrous d'une transaction après son COMMIT ou son ROLLBACK ?",
    choix: [
      "Ils restent une heure",
      "Ils sont relâchés : les sessions en attente peuvent continuer",
      "Ils passent à la session suivante",
      "Ils deviennent des verrous de table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. D'où l'importance de terminer vite ses transactions.",
      "Non.",
      "Non."
    ],
    retenir: "Fin de transaction = verrous libérés."
  },
  {
    id: "m11-q99", dialecte: "SQL Server",
    q: "Dans quel cas NOLOCK peut-il être acceptable ?",
    choix: [
      "Pour la comptabilité",
      "Pour une estimation rapide sans enjeu (ex. ordre de grandeur d'une table de logs), quand un résultat un peu faux est sans conséquence",
      "Pour les factures",
      "Pour les paies"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Jamais pour des chiffres qui servent à décider, facturer ou payer.",
      "Non.",
      "Non."
    ],
    retenir: "NOLOCK : seulement quand l'exactitude n'a pas d'importance."
  },
  {
    id: "m11-q100", dialecte: "Standard",
    q: "Quelle liste résume les bonnes pratiques sur les transactions ?",
    choix: [
      "Longues, avec NOLOCK partout",
      "Courtes, même ordre d'accès, gestion d'erreur (XACT_ABORT, TRY/CATCH), pas d'attente humaine dedans, bons index, isolation adaptée",
      "Aucune transaction",
      "Toujours SERIALIZABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La plupart des blocages et deadlocks viennent d'un oubli de ces règles.",
      "Non.",
      "Non. Trop de blocages."
    ],
    retenir: "Courtes, ordonnées, protégées, bien indexées."
  }
];
