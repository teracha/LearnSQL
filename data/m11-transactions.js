LEARNSQL.questions.m11 = [
  {
    id: "m11-q01", dialecte: "Standard",
    q: "Un virement retire 100 € d'un compte et l'ajoute à un autre. Pourquoi faire les deux UPDATE dans une transaction ?",
    choix: [
      "Pour aller plus vite qu'avec deux UPDATE",
      "Tout ou rien : pas d'argent perdu en route",
      "Pour trier les deux comptes",
      "Ce n'est pas utile pour deux UPDATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les deux réussissent ensemble ou sont annulés ensemble : c'est l'atomicité.",
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
      "Il attend un COMMIT pour être validé",
      "Il est validé dès qu'il se termine",
      "Il est annulé à la fin de la session",
      "Il est refusé sans transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si IMPLICIT_TRANSACTIONS est activé.",
      "Oui. Mode autocommit : chaque instruction est sa propre transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Par défaut : chaque instruction est validée seule."
  },
  {
    id: "m11-q04", dialecte: "SQL Server",
    q: "Que vaut @@TRANCOUNT après BEGIN TRAN; BEGIN TRAN; ?",
    choix: [
      "0",
      "1",
      "2",
      "Erreur"
    ],
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
      "Oui, tout est validé",
      "Non : @@TRANCOUNT passe juste à 1",
      "Oui, mais seulement la transaction intérieure",
      "Erreur : deux transactions ouvertes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège des transactions « imbriquées ».",
      "Oui. Seul le dernier COMMIT (de 1 à 0) valide vraiment : les transactions imbriquées ne sont pas de vraies sous-transactions.",
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
      "Tout est annulé, @@TRANCOUNT à 0",
      "Rien : il faut nommer la transaction",
      "Erreur : ROLLBACK ambigu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur fréquente.",
      "Oui. TOUT est annulé depuis le premier BEGIN TRAN. Pour une annulation partielle : SAVE TRANSACTION.",
      "Non.",
      "Non."
    ],
    retenir: "ROLLBACK = tout annuler, quel que soit le niveau."
  },
  {
    id: "m11-q07", dialecte: "SQL Server",
    q: "À quoi sert SAVE TRANSACTION point1 ?",
    choix: [
      "À valider ce qui précède",
      "À poser un point de retour partiel",
      "À sauvegarder la base (BACKUP)",
      "À fermer la transaction proprement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. ROLLBACK TRANSACTION point1 annule seulement ce qui suit, et la transaction reste ouverte.",
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
      "Une erreur annule toute la transaction",
      "Empêche d'ouvrir des transactions",
      "Accélère les COMMIT de la session"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Toute erreur d'exécution annule automatiquement la transaction entière. Sans lui, certaines erreurs laissent la transaction ouverte et les instructions suivantes continuent.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure qui modifie : SET XACT_ABORT ON en tête."
  },
  {
    id: "m11-q09", dialecte: "SQL Server",
    q: "Dans un bloc CATCH, que veut dire XACT_STATE() = -1 ?",
    choix: [
      "Aucune transaction n'est ouverte",
      "Transaction condamnée : ROLLBACK seul",
      "La transaction peut encore être validée",
      "Erreur de syntaxe dans le CATCH"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait 0.",
      "Oui. 1 = validable, 0 = pas de transaction, -1 = ouverte mais seulement ROLLBACK possible.",
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
      "SET XACT_ABORT ON; BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH END CATCH",
      "SET XACT_ABORT ON; BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH IF @@TRANCOUNT > 0 ROLLBACK; THROW; END CATCH",
      "SET XACT_ABORT ON; BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH COMMIT; THROW; END CATCH",
      "BEGIN TRY BEGIN TRAN; …; COMMIT; END TRY BEGIN CATCH ROLLBACK; END CATCH"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'erreur est « avalée » : l'appelant ne sait pas que ça a échoué.",
      "Oui. Annulation garantie, et l'erreur remonte à l'appelant.",
      "Non. On VALIDE en cas d'erreur : données à moitié faites (et souvent une nouvelle erreur).",
      "Non. ROLLBACK sans test de @@TRANCOUNT peut échouer, et l'erreur n'est pas remontée (pas de THROW)."
    ],
    retenir: "XACT_ABORT + TRY/CATCH + ROLLBACK + THROW."
  },
  {
    id: "m11-q11", dialecte: "SQL Server",
    q: "Que change SET IMPLICIT_TRANSACTIONS ON ?",
    choix: [
      "Rien de visible pour l'utilisateur",
      "Chaque modification ouvre une transaction",
      "Les transactions sont validées automatiquement",
      "Les verrous disparaissent de la session"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elle reste ouverte jusqu'à un COMMIT explicite (même un SELECT en ouvre une). Certains outils activent ce mode : un oubli de COMMIT bloque alors tout le monde.",
      "Non. C'est l'inverse.",
      "Non."
    ],
    retenir: "IMPLICIT_TRANSACTIONS ON = COMMIT obligatoire, sinon blocages."
  },
  {
    id: "m11-q12", dialecte: "SQL Server",
    q: "Sur SQL Server, un CREATE TABLE fait dans une transaction peut-il être annulé par ROLLBACK ?",
    choix: [
      "Non, un CREATE est toujours validé",
      "Oui : le DDL est transactionnel",
      "Seulement les DROP, pas les CREATE",
      "Seulement si la table est vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La plupart des ordres de structure (DDL) sont transactionnels sur SQL Server. Pratique pour les scripts de déploiement : tout ou rien.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : DDL annulable dans une transaction."
  },
  {
    id: "m11-q13", dialecte: "Snowflake",
    q: "Sur Snowflake, tu fais BEGIN; INSERT …; CREATE TABLE …; ROLLBACK;. L'INSERT est-il annulé ?",
    choix: [
      "Oui, l'INSERT et le CREATE sont annulés",
      "Non : le DDL a validé l'INSERT",
      "Erreur : DDL interdit dans BEGIN",
      "Seulement le CREATE TABLE est annulé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Grosse différence avec SQL Server.",
      "Oui. Sur Snowflake, un ordre de structure (DDL) valide implicitement la transaction en cours. Garde les DDL en dehors des transactions de données.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : un DDL fait un COMMIT implicite."
  },
  {
    id: "m11-q14", dialecte: "Snowflake",
    q: "Sur Snowflake, comment regrouper plusieurs INSERT / UPDATE dans une transaction ?",
    choixCode: true,
    choix: [
      "BEGIN TRAN; … COMMIT TRAN;",
      "BEGIN; … COMMIT;",
      "TRANSACTION START; … TRANSACTION END;",
      "BEGIN; … SAVE;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. (Ou BEGIN TRANSACTION / START TRANSACTION.) Sans BEGIN, chaque instruction est validée seule (autocommit).",
      "Non. N'existe pas.",
      "Non. SAVE n'existe pas : on termine par COMMIT ou ROLLBACK."
    ],
    retenir: "Snowflake : BEGIN … COMMIT / ROLLBACK."
  },
  {
    id: "m11-q15", dialecte: "Snowflake",
    q: "Quel niveau d'isolation propose Snowflake ?",
    choix: [
      "Tous les niveaux",
      "READ COMMITTED uniquement",
      "SERIALIZABLE uniquement",
      "READ UNCOMMITTED"
    ],
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
      "Elle attend : elle est bloquée",
      "Elle lit la nouvelle valeur",
      "Erreur : ligne en cours de modification"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas avec RCSI / SNAPSHOT.",
      "Oui. Elle attend que la 1re session valide ou annule : le verrou exclusif de l'écriture bloque la lecture en READ COMMITTED classique.",
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
      "Lire des données pas encore validées",
      "Une lecture très lente sur un disque plein",
      "Une lecture faite sans aucun index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Modifiées par une autre transaction, peut-être annulée ensuite. Possible en READ UNCOMMITTED / NOLOCK : le chiffre lu peut n'avoir jamais existé.",
      "Non.",
      "Non."
    ],
    retenir: "Lecture sale = lire du non validé."
  },
  {
    id: "m11-q18", dialecte: "SQL Server",
    q: "Que fait WITH (NOLOCK) dans une requête ?",
    choix: [
      "Rien de visible, c'est décoratif",
      "Lit sans verrous : rapide mais faux",
      "Accélère la lecture, sans aucun risque",
      "Verrouille toute la table en lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas d'attente, mais lectures sales, lignes manquées ou doublées possibles. Équivaut à READ UNCOMMITTED : dangereux pour des chiffres comptables.",
      "Non. Il y a des risques réels.",
      "Non."
    ],
    retenir: "NOLOCK = rapide mais potentiellement faux."
  },
  {
    id: "m11-q19", dialecte: "SQL Server",
    q: "Avec NOLOCK, une requête de comptage peut-elle compter deux fois la même ligne ?",
    choix: [
      "Non, jamais, c'est impossible",
      "Oui, si la ligne bouge pendant la lecture",
      "Seulement avec un DISTINCT",
      "Oui, mais seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Si la ligne est déplacée (division de page), elle peut être lue deux fois ou pas du tout. NOLOCK peut fausser les totaux, pas seulement lire du « sale ».",
      "Non.",
      "Non. Snowflake n'a pas NOLOCK."
    ],
    retenir: "NOLOCK peut doubler ou perdre des lignes."
  },
  {
    id: "m11-q20", dialecte: "SQL Server",
    q: "Les rapports bloquent l'ERP (et l'inverse) à cause des verrous de lecture. Quelle solution est plus saine que NOLOCK partout ?",
    choix: [
      "Supprimer les index des tables",
      "Activer READ_COMMITTED_SNAPSHOT",
      "Redémarrer le serveur chaque heure",
      "Lancer les rapports la nuit seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. RCSI : les lectures lisent la dernière version validée, sans bloquer ni être bloquées. Coût : versions stockées dans tempdb. À valider avec l'éditeur de l'ERP.",
      "Non.",
      "Non. Possible, mais pas toujours acceptable."
    ],
    retenir: "Lecteurs vs écrivains : RCSI plutôt que NOLOCK."
  },
  {
    id: "m11-q21", dialecte: "SQL Server",
    q: "Avec RCSI activé, une lecture pendant une modification non validée voit…",
    choix: [
      "La nouvelle valeur, pas encore validée",
      "La dernière valeur validée, sans attendre",
      "Rien : elle attend la fin",
      "Une erreur de conflit"
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
    choix: [
      "Dans le journal",
      "Dans tempdb (version store)",
      "Dans la table elle-même",
      "Nulle part"
    ],
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
      "Une lecture impossible à faire",
      "Même ligne, deux valeurs différentes",
      "Une lecture faite sans index",
      "Une erreur de syntaxe dans le SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Lire deux fois la même ligne dans une transaction et obtenir deux valeurs, car une autre transaction l'a modifiée entre-temps. Possible en READ COMMITTED ; REPEATABLE READ l'empêche.",
      "Non.",
      "Non."
    ],
    retenir: "Non répétable = même ligne, valeur différente."
  },
  {
    id: "m11-q24", dialecte: "SQL Server",
    q: "Qu'est-ce qu'une « ligne fantôme » (phantom) ?",
    choix: [
      "Une ligne supprimée par erreur",
      "De nouvelles lignes qui apparaissent",
      "Une ligne remplie de NULL",
      "Une ligne en double dans la table de faits"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Relancer le même SELECT dans une transaction et voir apparaître des lignes insérées par une autre transaction. Seul SERIALIZABLE (ou SNAPSHOT) l'empêche.",
      "Non.",
      "Non."
    ],
    retenir: "Fantôme = nouvelle ligne qui apparaît."
  },
  {
    id: "m11-q25", dialecte: "SQL Server",
    q: "Quel niveau d'isolation empêche les lectures sales, non répétables ET les fantômes, avec des verrous ?",
    choix: [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE"
    ],
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
    choix: [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "SERIALIZABLE",
      "REPEATABLE READ"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec verrous. (Sur Azure SQL Database, RCSI est activé par défaut.)",
      "Non.",
      "Non."
    ],
    retenir: "Défaut SQL Server : READ COMMITTED."
  },
  {
    id: "m11-q27", dialecte: "SQL Server",
    q: "En niveau SNAPSHOT, deux transactions modifient la même ligne. Que se passe-t-il pour la 2e ?",
    choix: [
      "Elle écrase la 1re, sans erreur",
      "Erreur de conflit : à relancer",
      "Elle attend, puis écrase la 1re",
      "Les deux valeurs sont gardées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Erreur 3960 de conflit de mise à jour. SNAPSHOT protège contre les mises à jour perdues, mais l'application doit gérer la relance.",
      "Non.",
      "Non."
    ],
    retenir: "SNAPSHOT : conflit d'écriture = erreur, à relancer."
  },
  {
    id: "m11-q28", dialecte: "SQL Server",
    q: "Deux utilisateurs lisent le stock (10), chacun retire 3 et écrit 7. Le stock final vaut 7 au lieu de 4. Comment s'appelle ce problème ?",
    choix: [
      "Lecture sale (dirty read)",
      "Mise à jour perdue",
      "Ligne fantôme (phantom)",
      "Interblocage (deadlock)"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (Lost update.) Solution : UPDATE stock SET qte = qte - 3 (calcul dans l'UPDATE), ou verrou UPDLOCK à la lecture.",
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
      "Rapide (lecture) et lent (écriture)",
      "Partagé (S) et exclusif (X)",
      "Ouvert (O) et fermé (F)",
      "Par ligne et par colonne"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. S pour lire : plusieurs lecteurs possibles. X pour écrire : un seul. Un X bloque tout le monde ; plusieurs S peuvent coexister.",
      "Non.",
      "Non."
    ],
    retenir: "S = lecture partagée. X = écriture exclusive."
  },
  {
    id: "m11-q31", dialecte: "SQL Server",
    q: "À quoi sert le verrou de mise à jour (U, ou indicateur UPDLOCK) ?",
    choix: [
      "À lire plus vite les lignes",
      "À réserver une ligne qu'on va modifier",
      "À supprimer la ligne verrouillée",
      "À rien, c'est un ancien verrou"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les autres peuvent lire, mais personne d'autre ne peut la réserver. Évite un type de deadlock : deux sessions qui lisent puis veulent écrire s'attendent mutuellement.",
      "Non.",
      "Non."
    ],
    retenir: "UPDLOCK : « je lis pour modifier »."
  },
  {
    id: "m11-q32", dialecte: "SQL Server",
    q: "Pourquoi SQL Server pose-t-il des verrous « d'intention » (IS, IX) sur la table et la page quand on verrouille une ligne ?",
    choix: [
      "Pour rien, c'est historique",
      "Pour signaler un verrou à l'intérieur",
      "Pour trier les lignes verrouillées par id",
      "Pour compresser la table verrouillée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une demande de verrou sur toute la table sait tout de suite qu'elle doit attendre : pas besoin de parcourir toutes les lignes.",
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
      "Trop de verrous de lignes → table",
      "Un deadlock entre deux sessions",
      "Une erreur de verrouillage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Quand une instruction pose trop de verrous de lignes (environ 5 000), SQL Server les remplace par un verrou sur toute la table : moins de mémoire, mais tous les autres sont bloqués.",
      "Non.",
      "Non."
    ],
    retenir: "Escalade : beaucoup de verrous de lignes → verrou de table."
  },
  {
    id: "m11-q34", dialecte: "SQL Server",
    q: "Comment éviter l'escalade de verrous lors d'une grosse purge ?",
    choix: [
      "Ajouter NOLOCK au DELETE",
      "Des lots de moins de 5 000 lignes",
      "Ajouter DISTINCT dans le DELETE",
      "Désactiver le journal des transactions"
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
      "Aucune, ce sont deux noms",
      "Deadlock = attente croisée",
      "Le deadlock dure moins longtemps",
      "Le blocage provoque une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Blocage : une session attend qu'une autre finisse (ça se résout tout seul). Deadlock : deux sessions s'attendent mutuellement, sans fin : le moteur en tue une.",
      "Non.",
      "Non. C'est une attente."
    ],
    retenir: "Blocage = attente. Deadlock = attente circulaire."
  },
  {
    id: "m11-q36", dialecte: "SQL Server",
    q: "Que reçoit la session choisie comme « victime » d'un deadlock ?",
    choix: [
      "Rien, elle continue normalement",
      "L'erreur 1205 : transaction annulée",
      "Un simple avertissement",
      "Un redémarrage de sa session"
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
    choix: [
      "Aucun",
      "Deadlock",
      "Lecture sale",
      "Fantôme"
    ],
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
      "Des transactions plus longues",
      "Transactions courtes, bons index",
      "Plus de NOLOCK dans les requêtes",
      "Plus de triggers sur les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse.",
      "Oui. Transactions courtes, même ordre d'accès aux tables, bons index (moins de lignes verrouillées), niveau d'isolation adapté.",
      "Non.",
      "Non."
    ],
    retenir: "Court, ordonné, bien indexé."
  },
  {
    id: "m11-q39", dialecte: "SQL Server",
    q: "Où retrouver le détail (graphe) des deadlocks récents sur SQL Server, sans rien configurer ?",
    choix: [
      "Nulle part sans configuration",
      "Session Extended Events system_health",
      "Dans le journal des événements Windows",
      "Dans la vue système sys.tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elle enregistre les deadlocks par défaut. Le graphe montre les sessions, les requêtes et les ressources en cause.",
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
      "SELECT session_id, blocking_session_id, wait_type, wait_time FROM sys.dm_exec_requests WHERE blocking_session_id = 0",
      "SELECT session_id, status, login_name FROM sys.dm_exec_sessions WHERE status = 'sleeping'",
      "SELECT * FROM sys.tables WHERE is_locked = 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Remonte la chaîne jusqu'à la session qui bloque sans être bloquée (la « tête »). sp_who2 donne aussi l'info.",
      "Non. = 0 : ce sont les sessions qui ne sont PAS bloquées.",
      "Non. Liste les sessions inactives, pas les blocages.",
      "Non. Cette colonne n'existe pas."
    ],
    retenir: "Blocages en cours : sys.dm_exec_requests.blocking_session_id."
  },
  {
    id: "m11-q41", dialecte: "SQL Server",
    q: "Comment trouver la plus vieille transaction ouverte d'une base ?",
    choixCode: true,
    choix: [
      "DBCC OPENTRAN",
      "SELECT @@TRANCOUNT",
      "sp_help",
      "SHOW TRANSACTIONS"
    ],
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
      "Un ROLLBACK, parfois aussi long",
      "Les modifications sont validées",
      "Le serveur SQL redémarre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sa transaction est annulée, ce qui peut prendre aussi longtemps que le travail déjà fait. Pendant l'annulation, les verrous restent posés : KILL n'est jamais anodin.",
      "Non.",
      "Non."
    ],
    retenir: "KILL = ROLLBACK, parfois long."
  },
  {
    id: "m11-q43", dialecte: "SQL Server",
    q: "Pourquoi une transaction restée ouverte des heures fait-elle grossir le journal (log) ?",
    choix: [
      "Elle n'a aucun effet sur le journal",
      "Le journal ne peut pas être vidé",
      "Elle compresse le journal en continu",
      "Elle supprime le journal à la fin"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le journal ne peut pas être vidé au-delà de la plus vieille transaction active : tout ce qui suit est conservé. Disque plein possible.",
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
      "Échec après 5 s d'attente d'un verrou",
      "La transaction est validée après 5 s",
      "Rien, sauf si le serveur redémarre ensuite"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Au lieu d'attendre sans fin, l'instruction échoue (erreur 1222) après 5 secondes. Utile pour un traitement qui préfère échouer vite.",
      "Non.",
      "Non."
    ],
    retenir: "LOCK_TIMEOUT : limiter l'attente des verrous."
  },
  {
    id: "m11-q45", dialecte: "SQL Server",
    q: "Une table sert de file d'attente : plusieurs traitements prennent les tâches « à faire ». Quel indicateur permet de sauter les lignes déjà prises par un autre ?",
    choixCode: true,
    choix: [
      "WITH (NOLOCK, ROWLOCK)",
      "WITH (UPDLOCK, READPAST, ROWLOCK)",
      "WITH (TABLOCKX, ROWLOCK)",
      "WITH (HOLDLOCK, UPDLOCK, ROWLOCK)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux traitements prendraient la même tâche.",
      "Oui. READPAST saute les lignes verrouillées : UPDATE TOP (1) … WITH (UPDLOCK, READPAST, ROWLOCK), chacun prend une tâche libre.",
      "Non. Verrou exclusif sur toute la table : un seul traitement à la fois.",
      "Non. HOLDLOCK attend les lignes prises au lieu de les sauter."
    ],
    retenir: "File d'attente : UPDLOCK + READPAST."
  },
  {
    id: "m11-q46", dialecte: "SQL Server",
    q: "Que fait l'indicateur WITH (TABLOCK) sur un INSERT massif ?",
    choix: [
      "Rien de plus qu'un INSERT normal",
      "Un verrou sur toute la table",
      "Il lit sans aucun verrou",
      "Il empêche l'INSERT de démarrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Moins de verrous à gérer, et parfois une journalisation réduite. Pour des chargements de nuit, quand personne d'autre n'utilise la table.",
      "Non.",
      "Non."
    ],
    retenir: "TABLOCK : chargement massif, table pour soi seul."
  },
  {
    id: "m11-q47", dialecte: "Standard",
    q: "Un écran ouvre une transaction, puis attend que l'utilisateur clique « Valider ». Quel est le problème ?",
    choix: [
      "Aucun, c'est le fonctionnement normal",
      "Les verrous restent posés pendant l'attente",
      "Le clic de l'utilisateur est trop rapide",
      "Le serveur refuse la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'utilisateur peut partir déjeuner : la transaction reste ouverte et bloque tout le monde. Règle : jamais d'attente humaine dans une transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Jamais d'interaction utilisateur pendant une transaction."
  },
  {
    id: "m11-q48", dialecte: "SQL Server",
    q: "Comment un index peut-il réduire les blocages ?",
    choix: [
      "Il n'a aucun effet sur les verrous posés",
      "Moins de lignes lues, moins de verrous",
      "Il supprime les verrous de lecture",
      "Il désactive les transactions longues"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sans index, un UPDATE … WHERE doit parcourir (et souvent verrouiller) beaucoup plus de lignes ; avec un index, il ne touche que les lignes visées.",
      "Non.",
      "Non."
    ],
    retenir: "Bons index = moins de verrous."
  },
  {
    id: "m11-q49", dialecte: "SQL Server",
    q: "Que fait l'indicateur HOLDLOCK (WITH (HOLDLOCK)) sur une lecture ?",
    choix: [
      "Rien de plus qu'une lecture",
      "Verrous gardés jusqu'à la fin",
      "Il lit sans poser de verrou",
      "Il valide la transaction en cours"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Comme en SERIALIZABLE, pour cette table. Utile pour un « insérer si absent » sûr, mais augmente les blocages.",
      "Non.",
      "Non."
    ],
    retenir: "HOLDLOCK = SERIALIZABLE sur une table."
  },
  {
    id: "m11-q50", dialecte: "Snowflake",
    q: "Sur Snowflake, une longue requête de lecture bloque-t-elle un UPDATE sur la même table ?",
    choix: [
      "Oui, la lecture verrouille la table",
      "Non, aucun blocage entre eux",
      "Oui, mais seulement le soir",
      "Seulement si le warehouse est arrêté"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les lectures ne bloquent pas les écritures et ne sont pas bloquées par elles : chaque requête lit une version cohérente. Les conflits concernent surtout les écritures entre elles.",
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
      "La 2e attend que la 1re soit validée",
      "La 2e est annulée tout de suite",
      "Les données des deux sont mélangées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les UPDATE / DELETE / MERGE sur une même table s'attendent souvent ; les INSERT / COPY se gênent peu. Évite de lancer plusieurs traitements de modification sur la même table en même temps.",
      "Non. Elle attend (jusqu'au délai LOCK_TIMEOUT).",
      "Non."
    ],
    retenir: "Snowflake : écritures concurrentes sur une table = attente."
  },
  {
    id: "m11-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, une requête attend un verrou depuis des heures. Quel paramètre limite cette attente ?",
    choixCode: true,
    choix: [
      "LOCK_TIMEOUT",
      "STATEMENT_TIMEOUT_IN_SECONDS",
      "AUTO_SUSPEND",
      "DATA_RETENTION_TIME_IN_DAYS"
    ],
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
    choix: [
      "SHOW LOCKS; et SHOW TRANSACTIONS;",
      "EXEC sp_who2; et EXEC sp_lock;",
      "DBCC OPENTRAN; et SHOW LOCKS;",
      "SELECT * FROM sys.dm_tran_locks;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pour retrouver qui bloque une table.",
      "Non. Procédures SQL Server.",
      "Non. DBCC OPENTRAN est SQL Server.",
      "Non. Vue SQL Server."
    ],
    retenir: "Snowflake : SHOW LOCKS, SHOW TRANSACTIONS."
  },
  {
    id: "m11-q54", dialecte: "Snowflake",
    q: "Sur Snowflake, comment annuler une transaction restée ouverte qui bloque une table ?",
    choixCode: true,
    choix: [
      "SELECT SYSTEM$CANCEL_QUERY(<id de requête>)",
      "SELECT SYSTEM$ABORT_TRANSACTION(<id de transaction>)",
      "ROLLBACK TRANSACTION <id de transaction>",
      "DROP TRANSACTION <id de transaction>"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Annule une requête en cours, pas une transaction restée ouverte.",
      "Oui. L'id se trouve avec SHOW TRANSACTIONS ou SHOW LOCKS.",
      "Non. ROLLBACK ne vise que la transaction de TA session.",
      "Non. N'existe pas."
    ],
    retenir: "Snowflake : SYSTEM$ABORT_TRANSACTION."
  },
  {
    id: "m11-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, que se passe-t-il si une session met AUTOCOMMIT = FALSE ?",
    choix: [
      "Rien de visible pour la session",
      "Un COMMIT explicite devient obligatoire",
      "Les modifications sont interdites",
      "Les requêtes deviennent plus rapides"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque modification ouvre une transaction qui reste ouverte jusqu'à un COMMIT ou ROLLBACK. Comme IMPLICIT_TRANSACTIONS sur SQL Server : attention aux oublis.",
      "Non.",
      "Non."
    ],
    retenir: "AUTOCOMMIT = FALSE : COMMIT obligatoire."
  },
  {
    id: "m11-q56", dialecte: "SQL Server",
    q: "Juste après le message « COMMIT réussi », le serveur plante. Les données validées sont-elles perdues ?",
    choix: [
      "Oui, tout ce qui n'est pas sur disque",
      "Non : le journal les garantit",
      "Seulement la moitié des lignes",
      "Ça dépend des index de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La validation est écrite dans le journal sur disque avant de répondre ; au redémarrage, les données sont rejouées. C'est la durabilité (le D de ACID).",
      "Non.",
      "Non."
    ],
    retenir: "COMMIT confirmé = données durables."
  },
  {
    id: "m11-q57", dialecte: "SQL Server",
    q: "Pourquoi SQL Server écrit-il d'abord dans le journal (log) avant de modifier les pages de données ?",
    choix: [
      "Pour rien, c'est historique",
      "Pour rejouer ou annuler après incident",
      "Pour compresser les pages de données",
      "Pour trier les modifications"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est la journalisation anticipée : le journal est la vraie garantie de cohérence. Il faut le sauvegarder et le surveiller.",
      "Non.",
      "Non."
    ],
    retenir: "Journal d'abord, données ensuite."
  },
  {
    id: "m11-q58", dialecte: "SQL Server",
    q: "Que fait l'option DELAYED_DURABILITY sur SQL Server ?",
    choix: [
      "Rien de visible pour les utilisateurs",
      "COMMIT plus rapide, mais moins sûr",
      "Elle double la sécurité des COMMIT",
      "Elle supprime le journal de la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le COMMIT répond avant que le journal soit écrit sur disque : les dernières transactions peuvent être perdues en cas de panne. À réserver à des données reconstructibles.",
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
      "À ta session, jusqu'à nouvel ordre",
      "À la requête suivante seulement",
      "À la table lue juste après"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Jusqu'à ce que tu le changes (ou la fin de la session / procédure). Les autres sessions ne sont pas concernées.",
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
      "Le temps de lire la ligne, pas plus",
      "Une heure, puis il les relâche",
      "Il n'en pose aucun, jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait REPEATABLE READ.",
      "Oui. Juste le temps de lire chaque ligne (ou page), puis il les relâche. D'où les lectures non répétables : la ligne peut changer juste après.",
      "Non.",
      "Non. Il en pose, brièvement."
    ],
    retenir: "READ COMMITTED : verrous de lecture très courts."
  },
  {
    id: "m11-q62", dialecte: "SQL Server",
    q: "En REPEATABLE READ, que subit une autre session qui veut modifier une ligne que tu as lue ?",
    choix: [
      "Rien, elle modifie tout de suite",
      "Elle attend la fin de ta transaction",
      "Elle modifie une copie de la ligne",
      "Une erreur immédiate de verrou"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Tu gardes ton verrou de lecture jusqu'au bout : plus de cohérence pour toi, plus d'attente pour les autres.",
      "Non.",
      "Non."
    ],
    retenir: "REPEATABLE READ : lectures verrouillées jusqu'à la fin."
  },
  {
    id: "m11-q63", dialecte: "SQL Server",
    q: "En SERIALIZABLE, tu as lu les commandes du client 42. Une autre session veut insérer une commande pour le client 42. Que se passe-t-il ?",
    choix: [
      "Elle insère sans attendre",
      "Elle attend (verrou de plage)",
      "Une erreur immédiate de conflit",
      "Elle insère pour un autre client"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SERIALIZABLE verrouille aussi la « plage » lue, pour empêcher les fantômes (verrous key-range, efficaces avec un index sur client_id).",
      "Non.",
      "Non."
    ],
    retenir: "SERIALIZABLE : même les insertions dans la plage lue attendent."
  },
  {
    id: "m11-q64", dialecte: "SQL Server",
    q: "Quelle différence entre RCSI et le niveau SNAPSHOT ?",
    choix: [
      "Aucune, ce sont deux noms",
      "Instruction vs transaction entière",
      "SNAPSHOT bloque plus que RCSI",
      "RCSI n'existe que sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. RCSI : chaque INSTRUCTION voit une photo cohérente. SNAPSHOT : toute la TRANSACTION voit la même photo, du début à la fin. Utile pour un rapport en plusieurs requêtes.",
      "Non. Les deux évitent les blocages lecture / écriture.",
      "Non."
    ],
    retenir: "RCSI = cohérent par instruction. SNAPSHOT = cohérent par transaction."
  },
  {
    id: "m11-q65", dialecte: "SQL Server",
    q: "Comment utiliser le niveau SNAPSHOT dans une session ?",
    choix: [
      "Rien à faire, c'est actif",
      "Base + session : deux réglages",
      "Ajouter WITH (NOLOCK) partout",
      "Redémarrer le service SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. ALLOW_SNAPSHOT_ISOLATION ON sur la base, puis SET TRANSACTION ISOLATION LEVEL SNAPSHOT dans la session.",
      "Non.",
      "Non."
    ],
    retenir: "SNAPSHOT : autoriser (base) + demander (session)."
  },
  {
    id: "m11-q66", dialecte: "SQL Server",
    q: "ALTER DATABASE … SET READ_COMMITTED_SNAPSHOT ON reste bloqué sans fin. Pourquoi ?",
    choix: [
      "Un bug connu de cette commande",
      "Il doit être seul sur la base",
      "Le disque de tempdb est plein à 100 %",
      "Il manque un index sur la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. D'autres connexions sont ouvertes. Fenêtre de maintenance, ou WITH ROLLBACK IMMEDIATE (coupe les autres). À planifier avec les utilisateurs et l'éditeur de l'ERP.",
      "Non.",
      "Non."
    ],
    retenir: "Activer RCSI : opération exclusive, à planifier."
  },
  {
    id: "m11-q67", dialecte: "SQL Server",
    q: "Après l'activation de RCSI, quel risque pour une application existante ?",
    choix: [
      "Aucun risque, tout est compatible",
      "Du code peut lire d'anciennes valeurs",
      "Toutes les requêtes échouent",
      "Les index disparaissent de la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Risque faible mais réel.",
      "Oui. Du code qui comptait sur un blocage pour se protéger (lire puis écrire) peut maintenant lire une ancienne valeur et créer des incohérences : il doit utiliser UPDLOCK ou faire le calcul dans l'UPDATE.",
      "Non.",
      "Non."
    ],
    retenir: "RCSI change le comportement : tester avant."
  },
  {
    id: "m11-q68", dialecte: "SQL Server",
    q: "Un rapport enchaîne 5 SELECT (CA, marge, stock…) pendant que l'ERP travaille. Les chiffres ne « tombent » pas juste entre eux. Pourquoi, et quelle solution ?",
    choix: [
      "Un bug de calcul dans le rapport",
      "Chaque SELECT voit un autre moment",
      "Il faut ajouter NOLOCK partout",
      "Il faut tout faire en un seul SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. En niveau SNAPSHOT, les 5 SELECT de la transaction voient la même photo. Ou calcule le rapport sur une copie figée (entrepôt de données).",
      "Non. Pire.",
      "Non. Pas toujours possible."
    ],
    retenir: "Rapport multi-requêtes cohérent : SNAPSHOT ou copie figée."
  },
  {
    id: "m11-q69", dialecte: "SQL Server",
    q: "Dans les statistiques d'attente du serveur, LCK_M_X et LCK_M_S sont très hauts. Que veut dire cette mesure ?",
    choix: [
      "Le disque des données est trop lent",
      "Beaucoup d'attente de verrous",
      "Le processeur est saturé",
      "Tout va bien, c'est normal"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait plutôt PAGEIOLATCH.",
      "Oui. Problème de blocages : cherche les transactions longues et les requêtes sans bon index.",
      "Non. Ce serait plutôt SOS_SCHEDULER_YIELD.",
      "Non."
    ],
    retenir: "Attentes LCK_M_* = blocages."
  },
  {
    id: "m11-q70", dialecte: "SQL Server",
    q: "Comment faire enregistrer par SQL Server les blocages qui durent plus de 20 secondes ?",
    choix: [
      "Impossible sans outil payant",
      "Le « blocked process report »",
      "Mettre NOLOCK sur les tables",
      "Regarder l'écran en continu"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Règle « blocked process threshold » à 20 et capture l'événement blocked_process_report (Extended Events) : le rapport donne la requête bloquée et la bloquante, même la nuit.",
      "Non.",
      "Non."
    ],
    retenir: "Blocages longs : blocked process report."
  },
  {
    id: "m11-q71", dialecte: "SQL Server",
    q: "Un traitement de nuit et l'ERP se retrouvent parfois en deadlock. Comment faire en sorte que ce soit le traitement qui soit sacrifié ?",
    choixCode: true,
    choix: [
      "SET DEADLOCK_PRIORITY LOW; dans le traitement",
      "SET DEADLOCK_PRIORITY HIGH; dans le traitement",
      "WITH (NOLOCK)",
      "Impossible"
    ],
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
      "Ignorer l'erreur et continuer",
      "Relancer sur l'erreur 1205",
      "Mettre NOLOCK dans toutes les requêtes",
      "Supprimer toutes les transactions"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données ne sont pas écrites.",
      "Oui. Dans le CATCH, si ERROR_NUMBER() = 1205, attendre un peu et relancer la transaction (quelques tentatives maximum).",
      "Non.",
      "Non."
    ],
    retenir: "Deadlock = relance automatique (limitée)."
  },
  {
    id: "m11-q73", dialecte: "SQL Server",
    q: "Deux sessions lisent la même ligne (verrou S), puis veulent la modifier (verrou X). Que se passe-t-il ?",
    choix: [
      "Rien, elles modifient l'une après l'autre",
      "Un deadlock « de conversion »",
      "Une lecture sale des deux côtés",
      "Elles modifient la ligne en même temps"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chacune attend que l'autre relâche son S. UPDLOCK à la lecture l'évite : la 2e attend dès la lecture, pas de cycle.",
      "Non.",
      "Non."
    ],
    retenir: "Lire pour modifier : UPDLOCK évite le deadlock de conversion."
  },
  {
    id: "m11-q74", dialecte: "SQL Server",
    q: "Des deadlocks apparaissent lors de suppressions de clients. La table commande n'a pas d'index sur client_id. Lien ?",
    choix: [
      "Aucun lien avec les deadlocks",
      "Scan de commande : trop de verrous",
      "Les index causent les deadlocks",
      "C'est un bug de SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour vérifier la clé étrangère, SQL Server parcourt toute la table commande et verrouille beaucoup plus que nécessaire. Un index sur la colonne de FK réduit fortement les verrous.",
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
      "Ils imposent ligne ou page",
      "Ils valident la transaction",
      "Ils trient les lignes lues au passage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ils demandent un niveau de verrou précis au lieu de laisser SQL Server choisir. À utiliser rarement.",
      "Non.",
      "Non."
    ],
    retenir: "ROWLOCK / PAGLOCK : forcer la granularité (rarement utile)."
  },
  {
    id: "m11-q76", dialecte: "SQL Server",
    q: "Sur une table partitionnée, que permet ALTER TABLE … SET (LOCK_ESCALATION = AUTO) ?",
    choix: [
      "Rien de plus que l'option TABLE",
      "Escalade limitée à la partition",
      "Elle supprime toute escalade",
      "Elle double le nombre de verrous"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les autres partitions restent accessibles. Utile quand un traitement travaille sur un mois pendant que les utilisateurs lisent les autres.",
      "Non. Ce serait DISABLE (et encore, pas totalement).",
      "Non."
    ],
    retenir: "Partition + LOCK_ESCALATION = AUTO : escalade limitée à la partition."
  },
  {
    id: "m11-q77", dialecte: "SQL Server",
    q: "Pourquoi ne pas désactiver l'escalade de verrous (LOCK_ESCALATION = DISABLE) partout ?",
    choix: [
      "C'est impossible, l'option n'existe pas",
      "Trop de verrous : trop de mémoire",
      "Ça désactive les transactions",
      "Ça n'a aucun effet mesurable"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est possible par table.",
      "Oui. Des millions de verrous de lignes consomment beaucoup de mémoire : risque pour tout le serveur. Mieux vaut traiter par lots.",
      "Non.",
      "Non."
    ],
    retenir: "Désactiver l'escalade : en dernier recours."
  },
  {
    id: "m11-q78", dialecte: "SQL Server",
    q: "Sur SQL Server, quel est l'équivalent du SELECT … FOR UPDATE d'Oracle ou PostgreSQL ?",
    choixCode: true,
    choix: [
      "SELECT … FROM t WHERE … FOR UPDATE, dans une transaction",
      "SELECT … FROM t WITH (UPDLOCK, ROWLOCK) WHERE …, dans une transaction",
      "SELECT … FROM t WITH (READPAST, ROWLOCK) WHERE …, dans une transaction",
      "SELECT … FROM t WITH (UPDLOCK, ROWLOCK) WHERE …, sans transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non. FOR UPDATE n'existe pas sur SQL Server.",
      "Oui. La ligne est réservée jusqu'à la fin de la transaction.",
      "Non. READPAST saute les lignes verrouillées, il ne réserve rien.",
      "Non. Sans transaction, le verrou est relâché dès la fin du SELECT."
    ],
    retenir: "FOR UPDATE ≈ WITH (UPDLOCK) sur SQL Server."
  },
  {
    id: "m11-q79", dialecte: "Standard",
    q: "Quelle est la différence entre gestion « pessimiste » et « optimiste » des accès concurrents ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "Verrouiller ou vérifier la version",
      "Pessimiste = toujours NOLOCK",
      "Optimiste = toujours en SERIALIZABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pessimiste : on verrouille avant de modifier (attente). Optimiste : on ne verrouille pas, on vérifie au moment d'écrire que personne n'a changé la donnée (version). Optimiste si conflits rares, pessimiste s'ils sont fréquents.",
      "Non.",
      "Non."
    ],
    retenir: "Pessimiste = verrouiller. Optimiste = vérifier la version."
  },
  {
    id: "m11-q80", dialecte: "Standard",
    q: "Un chargement de nuit insère 10 millions de lignes. Une seule grosse transaction ou des validations par lots ?",
    choix: [
      "Toujours une seule grosse transaction",
      "Par lots, avec une reprise possible",
      "Aucune transaction, c'est plus rapide",
      "Une transaction par ligne insérée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible si le volume est maîtrisé, mais risqué.",
      "Oui. En général par lots : journal plus petit, moins de verrous. Mais il faut alors pouvoir reprendre proprement après une erreur au milieu : c'est un compromis.",
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
      "Enregistrer le dernier lot validé",
      "Désactiver le journal pendant le traitement",
      "Mettre NOLOCK sur la table cible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Risque de doublons.",
      "Oui. Note dans une table de suivi le dernier lot validé (ex. dernier id traité), dans la même transaction que le lot, et repars de là.",
      "Non.",
      "Non."
    ],
    retenir: "Point de reprise enregistré avec chaque lot."
  },
  {
    id: "m11-q82", dialecte: "SQL Server",
    q: "Une transaction modifie des données sur deux serveurs (via serveur lié). Qu'implique-t-elle ?",
    choix: [
      "Rien de spécial, comme en local",
      "Une transaction distribuée (MSDTC)",
      "C'est interdit sur SQL Server",
      "Elle passe automatiquement en NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Plus lente, plus fragile, à éviter si possible. Préfère copier les données puis traiter localement, ou découpler par une file d'échange.",
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
      "Il est annulé avec le trigger",
      "Il est mis en attente jusqu'à demain",
      "Il est inséré deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le trigger s'exécute dans la même transaction que l'instruction : l'erreur annule tout.",
      "Non.",
      "Non."
    ],
    retenir: "Trigger = même transaction que l'instruction."
  },
  {
    id: "m11-q84", dialecte: "SQL Server",
    q: "Pourquoi un trigger lent (qui appelle un service externe ou fait de gros calculs) aggrave-t-il les blocages ?",
    choix: [
      "Il n'a aucun effet sur les verrous",
      "Les verrous sont gardés plus longtemps",
      "Il supprime les verrous de la table",
      "Il passe la session en NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il rallonge la transaction de chaque INSERT / UPDATE. Un trigger doit être court : les traitements lourds se font en différé (file d'attente, traitement planifié).",
      "Non.",
      "Non."
    ],
    retenir: "Triggers courts, sinon transactions longues."
  },
  {
    id: "m11-q85", dialecte: "SQL Server",
    q: "TRUNCATE TABLE stg_import reste bloqué alors que personne ne modifie cette table. Pourquoi ?",
    choix: [
      "Un bug connu de TRUNCATE sur les tables vides",
      "Une lecture en cours bloque TRUNCATE",
      "La table est déjà vide",
      "Il manque un index sur la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. TRUNCATE demande un verrou de modification de structure (Sch-M) : même une simple lecture en cours le bloque. Cherche une requête de lecture (ou une transaction ouverte) sur cette table.",
      "Non.",
      "Non."
    ],
    retenir: "TRUNCATE / ALTER : verrou Sch-M, bloqué par tout le monde."
  },
  {
    id: "m11-q86", dialecte: "SQL Server",
    q: "Reconstruire un index en journée bloque les utilisateurs. Quelle option l'évite (selon l'édition) ?",
    choixCode: true,
    choix: [
      "ALTER INDEX … REBUILD WITH (ONLINE = ON)",
      "ALTER INDEX … REBUILD WITH (NOLOCK = ON)",
      "ALTER INDEX … REORGANIZE WITH (ONLINE = OFF)",
      "ALTER INDEX … REBUILD WITH (SORT_IN_TEMPDB = ON)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les lectures et écritures continuent pendant la reconstruction (édition Enterprise / Azure).",
      "Non. Cette option n'existe pas.",
      "Non. REORGANIZE n'a pas cette option, et OFF ne règle rien.",
      "Non. Utile pour l'espace, mais l'index reste bloqué pendant la reconstruction."
    ],
    retenir: "Maintenance en journée : ONLINE = ON."
  },
  {
    id: "m11-q87", dialecte: "SQL Server",
    q: "En fermant un onglet SSMS, un message demande : « Il y a des transactions non validées. Voulez-vous les valider ? ». Que faire ?",
    choix: [
      "Toujours répondre Oui, c'est plus sûr",
      "Vérifier ce qu'elle contient",
      "Toujours répondre Non, par prudence",
      "Ignorer le message et fermer l'onglet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu pourrais valider un test.",
      "Oui. Tu avais laissé une transaction ouverte : vérifie son contenu avant de choisir valider ou annuler. Ce message signale aussi que tu bloquais peut-être d'autres utilisateurs.",
      "Non. Pas toujours non plus.",
      "Non."
    ],
    retenir: "Ce message = une transaction oubliée."
  },
  {
    id: "m11-q88", dialecte: "SQL Server",
    q: "Une procédure appelée à l'intérieur d'une transaction fait ROLLBACK. L'appelant reçoit l'erreur 266. Pourquoi ?",
    choix: [
      "Un bug des procédures imbriquées",
      "Le ROLLBACK a tout annulé, appelant compris",
      "La procédure n'existe pas dans la base",
      "Un problème de droits sur la procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le ROLLBACK de la procédure a annulé TOUTE la transaction de l'appelant : le nombre de transactions n'est plus le même qu'avant l'appel.",
      "Non.",
      "Non."
    ],
    retenir: "Erreur 266 = ROLLBACK intérieur qui casse la transaction extérieure."
  },
  {
    id: "m11-q89", dialecte: "SQL Server",
    q: "Comment une procédure peut-elle annuler seulement son propre travail si elle est appelée dans une transaction existante ?",
    choix: [
      "Un ROLLBACK simple, en fin de procédure",
      "Un point de sauvegarde (SAVE)",
      "C'est impossible sur SQL Server",
      "Un COMMIT juste avant chaque erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Annule tout.",
      "Oui. Si @@TRANCOUNT > 0 à l'entrée : SAVE TRANSACTION point_proc, et en cas d'erreur ROLLBACK TRANSACTION point_proc. Sinon, elle ouvre sa propre transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure imbriquée : point de sauvegarde."
  },
  {
    id: "m11-q90", dialecte: "Standard",
    q: "Power BI interroge directement la base de l'ERP en continu. Quel risque, et quelle architecture est plus saine ?",
    choix: [
      "Aucun risque pour l'ERP",
      "Charge sur l'ERP : passer par un entrepôt",
      "Mettre NOLOCK dans les requêtes Power BI",
      "Arrêter les rapports Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Requêtes lourdes = verrous et charge sur l'ERP. Mieux : alimenter un entrepôt (ou une copie de lecture) et y brancher Power BI.",
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
      "SNAPSHOT, automatiquement",
      "SERIALIZABLE, imposé",
      "Aucun, pas de transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les lectures ne bloquent pas la réplication. Les indicateurs de verrou sont ignorés sur le secondaire.",
      "Non.",
      "Non."
    ],
    retenir: "Réplica lisible = SNAPSHOT automatique."
  },
  {
    id: "m11-q92", dialecte: "SQL Server",
    q: "Que donne UPDATE t WITH (NOLOCK) SET … ?",
    choix: [
      "Une mise à jour qui ne pose aucun verrou",
      "Une erreur : NOLOCK interdit ici",
      "Une mise à jour plus rapide",
      "Rien, l'option est ignorée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Impossible : une écriture pose toujours des verrous exclusifs.",
      "Oui. NOLOCK n'est pas autorisé sur la table cible d'une modification : il ne concerne que les lectures.",
      "Non.",
      "Non."
    ],
    retenir: "NOLOCK : jamais sur la cible d'une écriture."
  },
  {
    id: "m11-q93", dialecte: "Standard",
    q: "Pour éviter deux clients avec le même email, une procédure fait IF NOT EXISTS (SELECT …) INSERT …. Est-ce suffisant ?",
    choix: [
      "Oui, le test IF NOT EXISTS suffit",
      "Non : contrainte UNIQUE",
      "Oui, avec NOLOCK sur le SELECT",
      "Oui, si on le lance la nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Deux sessions peuvent passer le test en même temps. La vraie garantie est une contrainte UNIQUE en base ; le test reste utile pour un message clair.",
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
      "Hors heures de saisie, par lots",
      "Mettre NOLOCK partout dans l'ERP",
      "Désactiver les verrous du serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Planifie-le hors des heures de saisie, et découpe-le en lots si possible : souvent la solution la plus simple et la plus efficace.",
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
      "Elle est trop lente à générer",
      "Un ROLLBACK laisse des trous",
      "Elle ne sait pas compter",
      "Elle est réservée à Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est très rapide.",
      "Oui. Une valeur prise puis annulée est perdue. Une table compteur dans la même transaction n'en laisse pas (elle est annulée avec la transaction), mais les factures se créent alors une par une.",
      "Non.",
      "Non."
    ],
    retenir: "Sans trou = compteur transactionnel. Rapide = SEQUENCE (avec trous)."
  },
  {
    id: "m11-q97", dialecte: "Snowflake",
    q: "Sur Snowflake, une longue requête démarre à 10 h 00. Un INSERT est validé à 10 h 01. La requête voit-elle les nouvelles lignes ?",
    choix: [
      "Oui, elle voit les lignes ajoutées en direct",
      "Non : la photo est prise au départ",
      "À moitié, selon le warehouse",
      "Elle s'arrête et redémarre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une requête voit les données telles qu'elles étaient à son démarrage : le résultat ne mélange jamais deux moments.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : une requête = une photo cohérente."
  },
  {
    id: "m11-q98", dialecte: "Standard",
    q: "Que deviennent les verrous d'une transaction après son COMMIT ou son ROLLBACK ?",
    choix: [
      "Ils restent posés une heure",
      "Ils sont relâchés tout de suite",
      "Ils passent à la session suivante",
      "Ils deviennent des verrous de table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les sessions en attente peuvent continuer : d'où l'importance de terminer vite ses transactions.",
      "Non.",
      "Non."
    ],
    retenir: "Fin de transaction = verrous libérés."
  },
  {
    id: "m11-q99", dialecte: "SQL Server",
    q: "Dans quel cas NOLOCK peut-il être acceptable ?",
    choix: [
      "Pour les chiffres de la comptabilité",
      "Pour une estimation sans enjeu",
      "Pour les montants des factures",
      "Pour le calcul des paies"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. ordre de grandeur d'une table de logs, quand un résultat un peu faux est sans conséquence. Jamais pour des chiffres qui servent à décider, facturer ou payer.",
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
      "Courtes, ordonnées, protégées",
      "Aucune transaction, c'est plus simple",
      "Toujours en SERIALIZABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Courtes, même ordre d'accès, gestion d'erreur (XACT_ABORT, TRY/CATCH), pas d'attente humaine dedans, bons index, isolation adaptée. La plupart des blocages viennent d'un oubli de ces règles.",
      "Non.",
      "Non. Trop de blocages."
    ],
    retenir: "Courtes, ordonnées, protégées, bien indexées."
  }
];
