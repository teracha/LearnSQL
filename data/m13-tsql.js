LEARNSQL.questions.m13 = [
  {
    id: "m13-q01", dialecte: "SQL Server",
    q: "Comment déclarer deux variables en une seule instruction ?",
    choixCode: true,
    choix: [
      "DECLARE @a INT = 1; @b INT = 2;",
      "DECLARE @a INT = 1, @b VARCHAR(10) = 'X';",
      "VAR @a, @b;",
      "DECLARE @a, @b INT;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La 2e partie n'a pas de DECLARE.",
      "Oui. Les déclarations sont séparées par des virgules.",
      "Non.",
      "Non. Chaque variable a son propre type."
    ],
    retenir: "DECLARE @a type = valeur, @b type = valeur;"
  },
  {
    id: "m13-q02", dialecte: "SQL Server",
    q: "Que vaut une variable déclarée sans valeur (DECLARE @n INT;) ?",
    choix: [
      "0",
      "NULL",
      "Une erreur",
      "-1"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Attention : @n + 1 vaut alors NULL. Initialise : DECLARE @n INT = 0;",
      "Non.",
      "Non."
    ],
    retenir: "Variable non initialisée = NULL."
  },
  {
    id: "m13-q03", dialecte: "SQL Server",
    q: "Quelle différence entre SET et SELECT pour affecter des variables ?",
    choix: [
      "Aucune",
      "SET affecte une seule variable ; SELECT peut en affecter plusieurs à la fois (SELECT @a = …, @b = … FROM …)",
      "SELECT est interdit",
      "SET est plus lent"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Mais attention aux comportements différents si la requête renvoie 0 ou plusieurs lignes.",
      "Non.",
      "Non."
    ],
    retenir: "SET = une variable. SELECT = plusieurs."
  },
  {
    id: "m13-q04", dialecte: "SQL Server",
    q: "SELECT @nom = nom FROM client WHERE pays = 'FR'; renvoie 500 lignes. Que contient @nom ?",
    choix: [
      "Une erreur",
      "Le nom d'une seule des lignes (souvent la dernière lue), sans aucun avertissement",
      "Tous les noms",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'erreur : c'est le piège.",
      "Oui. Rends le résultat unique (WHERE sur la clé) ou utilise SET @nom = (SELECT …) qui plante si plusieurs lignes.",
      "Non.",
      "Non."
    ],
    retenir: "SELECT @v = … sur plusieurs lignes : valeur imprévisible."
  },
  {
    id: "m13-q05", dialecte: "SQL Server",
    q: "@prix vaut 10. SELECT @prix = prix FROM tarif WHERE article = 'INCONNU'; ne trouve rien. Que vaut @prix ?",
    choix: [
      "NULL",
      "10 (inchangé)",
      "0",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas avec SET @prix = (SELECT …).",
      "Oui. Aucune ligne = aucune affectation : l'ancienne valeur reste. Piège dans les boucles !",
      "Non.",
      "Non."
    ],
    retenir: "SELECT @v sans ligne = variable inchangée."
  },
  {
    id: "m13-q06", dialecte: "SQL Server",
    q: "Une variable déclarée avant un GO est-elle utilisable après ?",
    choix: [
      "Oui",
      "Non : GO termine le lot, la variable n'existe plus",
      "Seulement en lecture",
      "Seulement dans SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il faut la redéclarer dans le nouveau lot.",
      "Non.",
      "Non."
    ],
    retenir: "Une variable vit dans son lot (jusqu'au GO)."
  },
  {
    id: "m13-q07", dialecte: "SQL Server",
    q: "Pourquoi les messages PRINT d'un long traitement n'apparaissent-ils qu'à la fin ?",
    choix: [
      "Bug",
      "Ils sont mis en mémoire tampon. Pour un affichage immédiat : RAISERROR('message', 0, 1) WITH NOWAIT",
      "PRINT est désactivé",
      "Il faut SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Gravité 0 = simple information, pas une erreur.",
      "Non.",
      "Non."
    ],
    retenir: "Suivi en direct : RAISERROR(…, 0, 1) WITH NOWAIT."
  },
  {
    id: "m13-q08", dialecte: "SQL Server",
    q: "Pourquoi entourer plusieurs instructions d'un BEGIN … END après un IF ?",
    choix: [
      "Pour la décoration",
      "Sans BEGIN … END, seule la PREMIÈRE instruction dépend du IF ; les suivantes s'exécutent toujours",
      "C'est obligatoire même pour une instruction",
      "Pour créer une transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Bug classique. Mets toujours BEGIN … END, même pour une seule ligne.",
      "Non. Mais c'est conseillé.",
      "Non. Ce n'est pas BEGIN TRAN."
    ],
    retenir: "IF … BEGIN … END, toujours."
  },
  {
    id: "m13-q09", dialecte: "SQL Server",
    q: "Dans une boucle WHILE, que font BREAK et CONTINUE ?",
    choix: [
      "Rien",
      "BREAK sort de la boucle ; CONTINUE passe directement au tour suivant",
      "Ils annulent la transaction",
      "Ils arrêtent le serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Attention à faire avancer la condition, sinon boucle infinie.",
      "Non.",
      "Non."
    ],
    retenir: "BREAK = sortir. CONTINUE = tour suivant."
  },
  {
    id: "m13-q10", dialecte: "SQL Server",
    q: "Une boucle WHILE @i < 100 n'incrémente jamais @i. Que se passe-t-il ?",
    choix: [
      "Elle s'arrête après 100 tours",
      "Boucle infinie : le traitement ne s'arrête jamais",
      "Erreur",
      "Elle ne démarre pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il faut l'annuler à la main. Toujours vérifier que la condition progresse (SET @i += 1).",
      "Non.",
      "Non."
    ],
    retenir: "WHILE : la condition doit progresser."
  },
  {
    id: "m13-q11", dialecte: "SQL Server",
    q: "Quelle est l'utilité de SET NOCOUNT ON en début de procédure ?",
    choix: [
      "Compter les lignes",
      "Supprimer les messages « (n lignes affectées) » : moins de trafic réseau, et certains outils (ETL, applis) ne sont plus perturbés",
      "Empêcher les modifications",
      "Accélérer les index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Bonne pratique dans toute procédure.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure : SET NOCOUNT ON en première ligne."
  },
  {
    id: "m13-q12", dialecte: "SQL Server",
    q: "Comment donner une valeur par défaut à un paramètre de procédure ?",
    choixCode: true,
    choix: [
      "@annee INT DEFAULT 2026",
      "@annee INT = NULL (puis gérer le cas NULL dans le code)",
      "@annee INT OPTIONAL",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe invalide.",
      "Oui. L'appelant peut omettre le paramètre. Ex. SET @annee = COALESCE(@annee, YEAR(GETDATE())).",
      "Non.",
      "Non."
    ],
    retenir: "Paramètre facultatif : @p type = valeur_par_défaut."
  },
  {
    id: "m13-q13", dialecte: "SQL Server",
    q: "Pourquoi appeler une procédure avec des paramètres nommés (EXEC p @annee = 2026, @client = 42) ?",
    choix: [
      "C'est plus long, donc mieux",
      "L'appel reste juste même si l'ordre des paramètres change, et il est plus lisible",
      "C'est obligatoire",
      "C'est plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un appel par position (EXEC p 2026, 42) casse si quelqu'un ajoute un paramètre au milieu.",
      "Non.",
      "Non."
    ],
    retenir: "Appels de procédures : paramètres nommés."
  },
  {
    id: "m13-q14", dialecte: "SQL Server",
    q: "Comment une procédure renvoie-t-elle une valeur calculée à l'appelant, autrement qu'avec un SELECT ?",
    choix: [
      "Avec RETURN 'texte'",
      "Avec un paramètre OUTPUT (déclaré OUTPUT dans la procédure ET dans l'appel)",
      "Avec PRINT",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. RETURN ne renvoie qu'un entier.",
      "Oui. Oublier OUTPUT dans l'appel = la valeur n'est pas récupérée, sans erreur.",
      "Non.",
      "Non."
    ],
    retenir: "Valeur de retour : paramètre OUTPUT."
  },
  {
    id: "m13-q15", dialecte: "SQL Server",
    q: "À quoi sert RETURN dans une procédure ?",
    choix: [
      "À renvoyer un texte",
      "À sortir de la procédure, en renvoyant éventuellement un code entier (0 = succès, par convention)",
      "À renvoyer un tableau",
      "À valider la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. EXEC @code = dbo.p … récupère ce code.",
      "Non.",
      "Non."
    ],
    retenir: "RETURN = sortie + code entier."
  },
  {
    id: "m13-q16", dialecte: "SQL Server",
    q: "Pourquoi éviter de préfixer ses procédures par sp_ ?",
    choix: [
      "C'est interdit",
      "SQL Server cherche d'abord les procédures sp_ dans la base master (procédures système) : risque de conflit et léger surcoût",
      "Elles sont plus lentes à écrire",
      "Elles ne peuvent pas avoir de paramètres"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Préfère usp_, p_ ou un nom métier clair, dans un schéma dédié.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de préfixe sp_ pour ses procédures."
  },
  {
    id: "m13-q17", dialecte: "SQL Server",
    q: "Quel est l'avantage de CREATE OR ALTER PROCEDURE ?",
    choix: [
      "Plus rapide à l'exécution",
      "Le même script crée la procédure si elle n'existe pas, ou la modifie sinon, en gardant les droits existants",
      "Il supprime les anciennes versions",
      "Aucun"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Scripts de déploiement relançables (SQL Server 2016 SP1+).",
      "Non.",
      "Non."
    ],
    retenir: "CREATE OR ALTER = déploiement relançable."
  },
  {
    id: "m13-q18", dialecte: "SQL Server",
    q: "Quelles fonctions donnent les détails d'une erreur dans un bloc CATCH ?",
    choixCode: true,
    choix: [
      "ERROR_NUMBER(), ERROR_MESSAGE(), ERROR_LINE(), ERROR_PROCEDURE(), ERROR_SEVERITY()",
      "@@ERROR seulement",
      "GET_ERROR()",
      "PRINT ERROR"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. À enregistrer dans une table de log avant de relancer l'erreur.",
      "Non. @@ERROR est remis à 0 par l'instruction suivante : peu fiable.",
      "Non.",
      "Non."
    ],
    retenir: "CATCH : ERROR_MESSAGE(), ERROR_LINE()…"
  },
  {
    id: "m13-q19", dialecte: "SQL Server",
    q: "Dans un CATCH, que fait THROW; (sans paramètre) ?",
    choix: [
      "Rien",
      "Il relance l'erreur d'origine (même numéro, même message) vers l'appelant",
      "Il efface l'erreur",
      "Il valide la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Après ROLLBACK et log, l'appelant (Agent SQL, ETL) sait que ça a échoué.",
      "Non.",
      "Non."
    ],
    retenir: "CATCH : … puis THROW; pour ne pas cacher l'erreur."
  },
  {
    id: "m13-q20", dialecte: "SQL Server",
    q: "Un CATCH contient seulement PRINT 'erreur'. Quel est le problème ?",
    choix: [
      "Aucun",
      "L'erreur est « avalée » : le travail planifié est vu comme réussi alors qu'il a échoué",
      "PRINT est interdit",
      "La transaction est validée deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Personne n'est alerté. Toujours relancer (THROW) ou signaler l'échec.",
      "Non.",
      "Non."
    ],
    retenir: "Ne jamais avaler une erreur."
  },
  {
    id: "m13-q21", dialecte: "SQL Server",
    q: "Comment lever ta propre erreur métier (ex. « Client inconnu ») ?",
    choixCode: true,
    choix: [
      "THROW 50001, 'Client inconnu', 1;",
      "THROW 'Client inconnu';",
      "ERROR('Client inconnu')",
      "PRINT 'Client inconnu'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Numéro ≥ 50 000, message, état. L'instruction précédente doit se terminer par ;",
      "Non. Il faut un numéro.",
      "Non.",
      "Non. Ce n'est pas une erreur."
    ],
    retenir: "THROW numéro (≥ 50000), 'message', état;"
  },
  {
    id: "m13-q22", dialecte: "SQL Server",
    q: "THROW 50001, 'X', 1; donne une erreur de syntaxe. L'instruction juste avant est SET @a = 1 (sans point-virgule). Pourquoi ?",
    choix: [
      "THROW n'existe pas",
      "L'instruction qui précède THROW doit se terminer par ;",
      "Le numéro est trop grand",
      "Il faut RAISERROR"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Comme pour WITH et MERGE. Termine toutes tes instructions par ;",
      "Non.",
      "Non."
    ],
    retenir: "Avant THROW : point-virgule."
  },
  {
    id: "m13-q23", dialecte: "SQL Server",
    q: "TRY / CATCH attrape-t-il une faute de frappe dans un nom de table (SELECT * FROM clientt) dans le même bloc ?",
    choix: [
      "Oui, toujours",
      "Non : les erreurs de compilation / de résolution de nom au même niveau ne sont pas attrapées par ce CATCH",
      "Oui, en mode debug",
      "Seulement les jours pairs"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elles sont attrapées par un CATCH de niveau supérieur (procédure appelante). D'où l'importance des tests.",
      "Non.",
      "Non."
    ],
    retenir: "CATCH n'attrape pas les erreurs de compilation du même niveau."
  },
  {
    id: "m13-q24", dialecte: "SQL Server",
    q: "Pourquoi préférer THROW à RAISERROR dans du code neuf ?",
    choix: [
      "RAISERROR n'existe plus",
      "THROW est plus simple, respecte XACT_ABORT et relance fidèlement l'erreur d'origine",
      "RAISERROR est plus rapide",
      "Aucune raison"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il existe encore (et reste utile pour WITH NOWAIT).",
      "Oui. RAISERROR garde des usages (messages de progression), mais THROW est la référence pour les erreurs.",
      "Non.",
      "Non."
    ],
    retenir: "Erreurs : THROW. Messages de progression : RAISERROR … WITH NOWAIT."
  },
  {
    id: "m13-q25", dialecte: "SQL Server",
    q: "Une fonction scalaire peut-elle faire un INSERT dans une table ?",
    choix: [
      "Oui",
      "Non : une fonction ne peut pas modifier les données de la base",
      "Seulement dans une #table",
      "Seulement la nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour modifier : une procédure stockée.",
      "Non. Les #tables sont aussi interdites dans une fonction (variables table permises).",
      "Non."
    ],
    retenir: "Fonction = lecture seule. Procédure = peut modifier."
  },
  {
    id: "m13-q26", dialecte: "SQL Server",
    q: "Peut-on utiliser NEWID() directement dans une fonction utilisateur ?",
    choix: [
      "Oui",
      "Non : fonction à « effet de bord », interdite dans une fonction utilisateur",
      "Seulement en scalaire",
      "Seulement en table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. GETDATE() est permis, mais NEWID() et RAND() non.",
      "Non.",
      "Non."
    ],
    retenir: "Fonction utilisateur : pas de NEWID()."
  },
  {
    id: "m13-q27", dialecte: "SQL Server",
    q: "Peut-on utiliser TRY / CATCH dans une fonction utilisateur ?",
    choix: [
      "Oui",
      "Non",
      "Seulement dans une fonction table",
      "Seulement avec THROW"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui, c'est interdit. Une fonction doit être simple ; la gestion d'erreur va dans la procédure appelante.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de TRY/CATCH dans une fonction."
  },
  {
    id: "m13-q28", dialecte: "SQL Server",
    q: "Quelle forme de fonction est la plus performante pour renvoyer des lignes ?",
    choixCode: true,
    choix: [
      "RETURNS @t TABLE (…) AS BEGIN INSERT @t … RETURN END",
      "RETURNS TABLE AS RETURN (SELECT …)",
      "Une fonction scalaire appelée en boucle",
      "Un curseur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Multi-instructions : estimations pauvres.",
      "Oui. Fonction table « inline » : intégrée dans le plan comme une vue paramétrée.",
      "Non.",
      "Non."
    ],
    retenir: "Fonction table inline = rapide."
  },
  {
    id: "m13-q29", dialecte: "SQL Server",
    q: "Une procédure doit recevoir une liste de 500 codes articles. Quelle solution est la plus propre ?",
    choix: [
      "500 paramètres",
      "Un paramètre table (CREATE TYPE … AS TABLE, puis @liste dbo.type_codes READONLY)",
      "Une chaîne avec des virgules, découpée avec SUBSTRING en boucle",
      "Une variable globale"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Typé, efficace, joignable directement. (STRING_SPLIT ou JSON sont des alternatives plus simples.)",
      "Non. Fragile et lent.",
      "Non. N'existe pas."
    ],
    retenir: "Liste en paramètre : paramètre table (TVP)."
  },
  {
    id: "m13-q30", dialecte: "SQL Server",
    q: "Une procédure reçoit un JSON de commande. Comment le transformer en lignes ?",
    choixCode: true,
    choix: [
      "SELECT * FROM OPENJSON(@json, '$.lignes') WITH (article VARCHAR(20) '$.art', qte INT '$.qte')",
      "SELECT * FROM @json",
      "CAST(@json AS TABLE)",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. OPENJSON + WITH donne des colonnes typées (SQL Server 2016+).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "JSON → lignes : OPENJSON … WITH (…)."
  },
  {
    id: "m13-q31", dialecte: "SQL Server",
    q: "Pourquoi ce code est-il dangereux ?",
    code: "DECLARE @sql NVARCHAR(MAX) =\n  N'SELECT * FROM client WHERE nom = ''' + @nom + N'''';\nEXEC (@sql);",
    choix: [
      "Il est lent",
      "Injection SQL : si @nom contient '; DROP TABLE client; --, la commande est exécutée",
      "Il manque un ORDER BY",
      "Il n'y a pas de danger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas le problème principal.",
      "Oui. Jamais de concaténation d'une valeur saisie. sp_executesql avec @nom en paramètre.",
      "Non.",
      "Non."
    ],
    retenir: "Concaténer une saisie dans du SQL = injection."
  },
  {
    id: "m13-q32", dialecte: "SQL Server",
    q: "Quelle écriture du SQL dynamique est sûre ?",
    choixCode: true,
    choix: [
      "EXEC ('SELECT * FROM client WHERE nom = ''' + @nom + '''')",
      "EXEC sp_executesql N'SELECT * FROM client WHERE nom = @n', N'@n NVARCHAR(100)', @n = @nom",
      "EXEC (@nom)",
      "SELECT * FROM @nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Injection possible.",
      "Oui. La valeur est un paramètre : jamais exécutée comme du code. Et le plan est réutilisé.",
      "Non.",
      "Non."
    ],
    retenir: "sp_executesql + paramètres."
  },
  {
    id: "m13-q33", dialecte: "SQL Server",
    q: "Le nom de la table est variable (@table). Les paramètres ne marchent pas pour un nom d'objet. Comment se protéger ?",
    choixCode: true,
    choix: [
      "Concaténer @table tel quel",
      "QUOTENAME(@table), et idéalement vérifier que la table existe dans une liste autorisée",
      "Mettre des apostrophes autour",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. QUOTENAME entoure de crochets et neutralise les caractères dangereux.",
      "Non. Ça en ferait un texte.",
      "Non."
    ],
    retenir: "Nom d'objet dynamique : QUOTENAME + liste blanche."
  },
  {
    id: "m13-q34", dialecte: "SQL Server",
    q: "Une variable @annee déclarée dans la procédure est-elle visible à l'intérieur d'un EXEC sp_executesql @sql ?",
    choix: [
      "Oui",
      "Non : le SQL dynamique s'exécute dans un contexte séparé. Il faut la passer en paramètre",
      "Seulement si elle s'appelle @annee",
      "Seulement en lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. D'où la liste de paramètres de sp_executesql.",
      "Non.",
      "Non."
    ],
    retenir: "SQL dynamique : variables passées en paramètres."
  },
  {
    id: "m13-q35", dialecte: "SQL Server",
    q: "Une #table créée À L'INTÉRIEUR d'un SQL dynamique est-elle visible après l'EXEC ?",
    choix: [
      "Oui",
      "Non : elle disparaît à la fin du SQL dynamique. Crée-la avant, et remplis-la dedans",
      "Seulement en ## ",
      "Seulement dans SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une #table créée AVANT l'EXEC est visible dedans.",
      "Non. Possible, mais à éviter.",
      "Non."
    ],
    retenir: "#table : la créer avant le SQL dynamique."
  },
  {
    id: "m13-q36", dialecte: "SQL Server",
    q: "Comment déboguer un SQL dynamique qui plante ?",
    choix: [
      "Le relancer en boucle",
      "Afficher le texte généré (PRINT @sql ou SELECT @sql), le copier et l'exécuter seul pour voir l'erreur exacte",
      "Ajouter NOLOCK",
      "Le supprimer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On voit souvent tout de suite l'espace ou l'apostrophe manquante.",
      "Non.",
      "Non."
    ],
    retenir: "SQL dynamique : PRINT @sql avant EXEC."
  },
  {
    id: "m13-q37", dialecte: "SQL Server",
    q: "Pourquoi les curseurs sont-ils souvent déconseillés ?",
    choix: [
      "Ils sont interdits",
      "Ils traitent les lignes une par une : beaucoup plus lent qu'une requête sur l'ensemble des lignes",
      "Ils suppriment des données",
      "Ils ne marchent pas sur SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. 100 000 lignes en curseur : minutes. En une requête : secondes.",
      "Non.",
      "Non."
    ],
    retenir: "Curseur = ligne par ligne = lent."
  },
  {
    id: "m13-q38", dialecte: "SQL Server",
    q: "Si un curseur est vraiment nécessaire, quelles options le rendent le plus léger ?",
    choixCode: true,
    choix: [
      "DECLARE c CURSOR GLOBAL DYNAMIC",
      "DECLARE c CURSOR LOCAL FAST_FORWARD",
      "DECLARE c CURSOR SCROLL",
      "Aucune"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les plus coûteuses.",
      "Oui. LOCAL : limité à la procédure. FAST_FORWARD : lecture seule, en avant seulement.",
      "Non.",
      "Non."
    ],
    retenir: "Curseur : LOCAL FAST_FORWARD."
  },
  {
    id: "m13-q39", dialecte: "SQL Server",
    q: "Dans une boucle de curseur, que signifie @@FETCH_STATUS = 0 ?",
    choix: [
      "Fin du curseur",
      "La lecture (FETCH) a réussi : une ligne est disponible",
      "Erreur",
      "Curseur vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. -1 = plus de lignes.",
      "Oui. Boucle typique : WHILE @@FETCH_STATUS = 0 BEGIN … FETCH NEXT … END.",
      "Non.",
      "Non."
    ],
    retenir: "@@FETCH_STATUS = 0 = ligne lue."
  },
  {
    id: "m13-q40", dialecte: "SQL Server",
    q: "Après une boucle de curseur, qu'est-ce qu'on oublie souvent ?",
    choix: [
      "Rien",
      "CLOSE puis DEALLOCATE du curseur",
      "COMMIT",
      "DROP TABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sinon il reste ouvert (surtout s'il est GLOBAL) et bloque une nouvelle exécution.",
      "Non.",
      "Non."
    ],
    retenir: "Curseur : OPEN, FETCH, CLOSE, DEALLOCATE."
  },
  {
    id: "m13-q41", dialecte: "SQL Server",
    q: "Dans quel cas un curseur (ou une boucle) reste-t-il acceptable ?",
    choix: [
      "Pour calculer un total",
      "Pour appeler une procédure par élément (ex. envoyer un fichier par client), ou pour des tâches d'administration sur quelques objets",
      "Pour mettre à jour 1 million de prix",
      "Jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SUM.",
      "Oui. Quand chaque élément déclenche une action qui ne peut pas être faite « en masse ».",
      "Non. Un UPDATE.",
      "Non."
    ],
    retenir: "Boucle : seulement quand l'action est vraiment unitaire."
  },
  {
    id: "m13-q42", dialecte: "SQL Server",
    q: "Comment remplacer ce curseur qui met à jour le prix de chaque article d'une famille, un par un ?",
    choixCode: true,
    choix: [
      "Un deuxième curseur",
      "UPDATE article SET prix = prix * 1.05 WHERE famille = 'POMPE';",
      "Une boucle WHILE",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une seule instruction pour toutes les lignes.",
      "Non. Même problème.",
      "Non."
    ],
    retenir: "Penser « ensemble »."
  },
  {
    id: "m13-q43", dialecte: "SQL Server",
    q: "Comment empêcher qu'un même traitement planifié tourne deux fois en même temps (s'il dure plus longtemps que prévu) ?",
    choixCode: true,
    choix: [
      "Espérer",
      "EXEC sp_getapplock @Resource = 'traitement_edi', @LockMode = 'Exclusive', @LockOwner = 'Session', @LockTimeout = 0",
      "NOLOCK",
      "WAITFOR DELAY"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un verrou « applicatif » : la 2e exécution voit que le verrou est pris et s'arrête.",
      "Non.",
      "Non."
    ],
    retenir: "Un seul traitement à la fois : sp_getapplock."
  },
  {
    id: "m13-q44", dialecte: "SQL Server",
    q: "Que fait WAITFOR DELAY '00:00:05' ?",
    choix: [
      "Rien",
      "Met en pause l'exécution 5 secondes",
      "Attend un verrou 5 s",
      "Planifie un job"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile entre deux lots d'une purge, ou pour réessayer après un deadlock.",
      "Non.",
      "Non."
    ],
    retenir: "WAITFOR DELAY = pause."
  },
  {
    id: "m13-q45", dialecte: "SQL Server",
    q: "Comment planifier une procédure chaque nuit à 2 h sur SQL Server ?",
    choix: [
      "Une boucle WHILE infinie",
      "Un travail (job) de l'Agent SQL Server, avec une étape EXEC dbo.p_… et une planification",
      "Le planificateur Windows obligatoirement",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec historique, alertes par mail en cas d'échec, reprise…",
      "Non. Possible, mais l'Agent est fait pour ça.",
      "Non."
    ],
    retenir: "Planification SQL Server : Agent SQL."
  },
  {
    id: "m13-q46", dialecte: "SQL Server",
    q: "Un job de l'Agent SQL échoue la nuit. Comment le savoir le matin sans regarder l'historique ?",
    choix: [
      "Impossible",
      "Configurer une notification (Database Mail + opérateur) en cas d'échec du job",
      "Regarder les logs Windows",
      "Attendre les plaintes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Et pour que l'échec soit détecté, la procédure ne doit pas avaler ses erreurs.",
      "Non.",
      "Non."
    ],
    retenir: "Jobs : alertes en cas d'échec."
  },
  {
    id: "m13-q47", dialecte: "SQL Server",
    q: "Un utilisateur a le droit EXEC sur dbo.p_ca_client, mais aucun droit sur la table commande. La procédure (même propriétaire) lit commande. Ça marche ?",
    choix: [
      "Non, erreur de droits",
      "Oui : chaînage de propriété. Les procédures sont une bonne façon de donner un accès contrôlé",
      "Seulement en lecture",
      "Seulement le soir"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Exception : le SQL dynamique dans la procédure casse ce chaînage.",
      "Non.",
      "Non."
    ],
    retenir: "Droits via procédures : chaînage de propriété."
  },
  {
    id: "m13-q48", dialecte: "SQL Server",
    q: "Pourquoi xp_cmdshell (lancer des commandes Windows depuis SQL) est-il désactivé par défaut ?",
    choix: [
      "Il est lent",
      "Risque de sécurité : il donne accès au système d'exploitation du serveur",
      "Il ne marche pas",
      "Il est payant"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour manipuler des fichiers : un outil ETL, PowerShell ou un job dédié.",
      "Non.",
      "Non."
    ],
    retenir: "xp_cmdshell : à laisser désactivé."
  },
  {
    id: "m13-q49", dialecte: "SQL Server",
    q: "Une procédure de 2 000 lignes fait tout (import, contrôle, calcul, export). Quelle amélioration ?",
    choix: [
      "Aucune",
      "La découper en procédures plus petites, une par responsabilité, appelées par une procédure « chef d'orchestre »",
      "Tout mettre dans une fonction",
      "La copier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Plus facile à tester, à relancer partiellement, à maintenir.",
      "Non.",
      "Non."
    ],
    retenir: "Une procédure = une responsabilité."
  },
  {
    id: "m13-q50", dialecte: "SQL Server",
    q: "Que mettre dans une table de log de traitement ?",
    choix: [
      "Rien",
      "Nom du traitement, début, fin, statut, nombre de lignes traitées, message d'erreur éventuel",
      "Seulement l'heure de fin",
      "Le mot de passe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On sait ce qui a tourné, combien de temps, avec quel volume, et pourquoi ça a échoué.",
      "Non.",
      "Non. Jamais."
    ],
    retenir: "Log de traitement : qui, quand, combien, résultat."
  },
  {
    id: "m13-q51", dialecte: "SQL Server",
    q: "T-SQL accepte GOTO. Faut-il l'utiliser ?",
    choix: [
      "Oui, partout",
      "Rarement : il rend le code difficile à suivre. IF / WHILE / TRY-CATCH suffisent presque toujours",
      "Il est obligatoire",
      "Il n'existe pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le code doit pouvoir être lu de haut en bas.",
      "Non.",
      "Non. Il existe."
    ],
    retenir: "GOTO : à éviter."
  },
  {
    id: "m13-q52", dialecte: "SQL Server",
    q: "Quelle différence entre CASE et IF en T-SQL ?",
    choix: [
      "Aucune",
      "CASE est une expression qui renvoie une valeur (dans une requête) ; IF contrôle l'enchaînement des instructions",
      "IF marche dans un SELECT",
      "CASE exécute des instructions"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On ne peut pas écrire IF dans un SELECT, ni exécuter un UPDATE dans un CASE.",
      "Non.",
      "Non."
    ],
    retenir: "CASE = valeur. IF = déroulement."
  },
  {
    id: "m13-q53", dialecte: "SQL Server",
    q: "Dans une procédure, pourquoi préférer CREATE TABLE #t (…) explicite à SELECT … INTO #t ?",
    choix: [
      "C'est plus court",
      "On maîtrise les types, NULL / NOT NULL et on peut ajouter une clé ; SELECT INTO déduit les types (parfois trop larges ou faux)",
      "SELECT INTO est interdit",
      "Aucune différence"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SELECT INTO reste pratique et rapide pour des besoins simples.",
      "Non.",
      "Non."
    ],
    retenir: "#table : structure explicite = moins de surprises."
  },
  {
    id: "m13-q54", dialecte: "SQL Server",
    q: "Tu insères des lignes dans une variable table @log, puis tu fais ROLLBACK. Que contient @log ?",
    choix: [
      "Rien, tout est annulé",
      "Toujours les lignes : les variables table ne sont pas concernées par le ROLLBACK",
      "Une erreur",
      "La moitié"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les #tables, elles, seraient annulées.",
      "Oui. Astuce pour garder un journal d'erreurs malgré l'annulation.",
      "Non.",
      "Non."
    ],
    retenir: "Variable table : survit au ROLLBACK."
  },
  {
    id: "m13-q55", dialecte: "SQL Server",
    q: "Comment garder une trace de l'erreur dans une table de log permanente, alors que la transaction est annulée ?",
    choix: [
      "Insérer dans le log AVANT le ROLLBACK",
      "Dans le CATCH : faire le ROLLBACK D'ABORD, puis insérer dans la table de log (hors transaction)",
      "Impossible",
      "Mettre NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'insertion serait annulée avec le reste.",
      "Oui. Ou passer par une variable table pendant la transaction, puis l'écrire après.",
      "Non.",
      "Non."
    ],
    retenir: "Log d'erreur : après le ROLLBACK."
  },
  {
    id: "m13-q56", dialecte: "SQL Server",
    q: "Une procédure A crée #temp puis appelle une procédure B. B peut-elle lire #temp ?",
    choix: [
      "Non",
      "Oui : une #table est visible dans les procédures appelées par celle qui l'a créée",
      "Seulement en ##",
      "Seulement si B la recrée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique, mais crée une dépendance cachée entre A et B : à documenter.",
      "Non.",
      "Non."
    ],
    retenir: "#table visible vers le bas (procédures appelées)."
  },
  {
    id: "m13-q57", dialecte: "SQL Server",
    q: "Une procédure contient 3 SELECT. Que reçoit un outil ETL qui l'appelle ?",
    choix: [
      "Les 3 fusionnés",
      "3 jeux de résultats séparés ; beaucoup d'outils ne lisent que le premier",
      "Une erreur",
      "Seulement le dernier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une procédure appelée par un outil devrait renvoyer un seul jeu de résultats clair.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure pour un outil : un seul SELECT final."
  },
  {
    id: "m13-q58", dialecte: "SQL Server",
    q: "INSERT INTO #t EXEC dbo.p_A; marche, mais p_A fait elle-même INSERT … EXEC p_B. Que se passe-t-il ?",
    choix: [
      "Ça marche",
      "Erreur : un INSERT … EXEC ne peut pas être imbriqué",
      "Seules les données de p_B arrivent",
      "Boucle infinie"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Limite connue. Alternative : faire écrire p_A directement dans une #table créée par l'appelant.",
      "Non.",
      "Non."
    ],
    retenir: "INSERT … EXEC : pas d'imbrication."
  },
  {
    id: "m13-q59", dialecte: "SQL Server",
    q: "Le code fait souvent référence à Divalto_PROD.dbo.client. Comment éviter d'écrire ce nom en dur partout ?",
    choixCode: true,
    choix: [
      "CREATE SYNONYM dbo.erp_client FOR Divalto_PROD.dbo.client;",
      "Copier la table",
      "Une variable @base",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Si la base change de nom (test, recette), on modifie seulement le synonyme.",
      "Non.",
      "Non. Une variable ne peut pas remplacer un nom de table (sauf SQL dynamique).",
      "Non."
    ],
    retenir: "Synonyme = alias permanent vers un objet."
  },
  {
    id: "m13-q60", dialecte: "Standard",
    q: "Où doit vivre le code des procédures, vues et fonctions ?",
    choix: [
      "Seulement dans la base de production",
      "Dans un dépôt Git (scripts versionnés), déployé vers les bases : on sait qui a changé quoi, et on peut revenir en arrière",
      "Sur le bureau du développeur",
      "Dans un mail"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'historique, pas de retour arrière.",
      "Oui. La base reçoit le code ; Git le garde.",
      "Non.",
      "Non."
    ],
    retenir: "Le code SQL se versionne dans Git."
  },
  {
    id: "m13-q61", dialecte: "Standard",
    q: "Une procédure contient en dur le taux de TVA 0,20 et le chemin d'un dossier d'export. Meilleure pratique ?",
    choix: [
      "C'est très bien",
      "Les mettre dans une table de paramètres (code, valeur, date d'effet) lue par la procédure",
      "Les mettre en commentaire",
      "Les mettre dans le nom de la procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un changement = modifier et redéployer le code.",
      "Oui. Un changement = une mise à jour de données, tracée.",
      "Non.",
      "Non."
    ],
    retenir: "Valeurs métier variables : table de paramètres."
  },
  {
    id: "m13-q62", dialecte: "SQL Server",
    q: "Pourquoi déclarer @date_debut DATE plutôt que @date_debut VARCHAR(10) dans une procédure ?",
    choix: [
      "Aucune raison",
      "Le type DATE refuse les dates invalides à l'appel, évite les problèmes de format, et permet des comparaisons efficaces",
      "VARCHAR est interdit",
      "DATE est plus court à écrire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec un texte, '31/02/2026' passerait jusqu'à planter au milieu du traitement.",
      "Non.",
      "Non."
    ],
    retenir: "Paramètres typés = erreurs détectées tôt."
  },
  {
    id: "m13-q63", dialecte: "SQL Server",
    q: "Une procédure reçoit @date_debut et @date_fin. Que faire en tout début de procédure ?",
    choixCode: true,
    choix: [
      "Rien",
      "IF @date_fin < @date_debut THROW 50010, 'Période invalide', 1;",
      "Un curseur",
      "SET NOCOUNT OFF"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Valider les paramètres d'abord : message clair, aucun travail inutile.",
      "Non.",
      "Non."
    ],
    retenir: "Valider les paramètres en entrée."
  },
  {
    id: "m13-q64", dialecte: "SQL Server",
    q: "Tu veux construire la liste 'A1;B2;C3' à partir d'une table. Que préférer à une boucle qui concatène ligne par ligne ?",
    choixCode: true,
    choix: [
      "Un curseur",
      "SELECT @liste = STRING_AGG(code, ';') FROM …",
      "Une fonction scalaire",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une seule instruction (SQL Server 2017+).",
      "Non.",
      "Non."
    ],
    retenir: "Concaténer des lignes : STRING_AGG."
  },
  {
    id: "m13-q65", dialecte: "SQL Server",
    q: "Différence entre CREATE PROCEDURE … WITH RECOMPILE et OPTION (RECOMPILE) sur une requête ?",
    choix: [
      "Aucune",
      "WITH RECOMPILE recompile TOUTE la procédure à chaque appel ; OPTION (RECOMPILE) seulement la requête concernée",
      "OPTION (RECOMPILE) est interdit",
      "WITH RECOMPILE accélère toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Préfère OPTION (RECOMPILE) sur la seule requête sensible.",
      "Non.",
      "Non."
    ],
    retenir: "Recompilation ciblée : OPTION (RECOMPILE)."
  },
  {
    id: "m13-q66", dialecte: "SQL Server",
    q: "À quoi sert EXECUTE AS OWNER dans la définition d'une procédure ?",
    choix: [
      "À rien",
      "La procédure s'exécute avec les droits de son propriétaire : utile pour une action précise que l'appelant n'a pas le droit de faire directement",
      "À changer de base",
      "À créer un utilisateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. À utiliser avec prudence : la procédure doit être bien contrôlée.",
      "Non.",
      "Non."
    ],
    retenir: "EXECUTE AS = droits empruntés, à encadrer."
  },
  {
    id: "m13-q67", dialecte: "SQL Server",
    q: "Dans un script de déploiement exécuté en mode SQLCMD, à quoi sert :setvar BaseCible Divalto_RECETTE ?",
    choix: [
      "À créer une base",
      "À définir une variable de script, utilisée ensuite comme $(BaseCible) : le même script sert pour recette et production",
      "À rien",
      "À déclarer une variable T-SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Remplacement de texte avant l'exécution.",
      "Non.",
      "Non. Ce n'est pas un @."
    ],
    retenir: "SQLCMD :setvar = paramètre de script de déploiement."
  },
  {
    id: "m13-q68", dialecte: "SQL Server",
    q: "Que signifie la gravité (severity) d'une erreur SQL Server ?",
    choix: [
      "Rien",
      "0-10 : information ; 11-16 : erreur corrigeable par l'utilisateur ; 17-19 : ressources ; 20+ : grave, la connexion est coupée",
      "Le nombre de lignes",
      "La durée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les erreurs métier levées avec THROW ont une gravité 16. Les messages ≤ 10 ne déclenchent pas le CATCH.",
      "Non.",
      "Non."
    ],
    retenir: "Gravité ≤ 10 = info ; 16 = erreur classique ; 20+ = critique."
  },
  {
    id: "m13-q69", dialecte: "SQL Server",
    q: "Une procédure renvoie un résultat faux. Méthode simple pour trouver l'étape fautive ?",
    choix: [
      "Tout réécrire",
      "Ajouter temporairement des SELECT (ou PRINT) des tables intermédiaires et des variables après chaque étape",
      "Ajouter NOLOCK",
      "Redémarrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Même idée que déboguer une chaîne de CTE. Penser à les retirer ensuite (ou les conditionner à un paramètre @debug).",
      "Non.",
      "Non."
    ],
    retenir: "Déboguer = afficher les étapes intermédiaires."
  },
  {
    id: "m13-q70", dialecte: "SQL Server",
    q: "Comment tester une procédure de calcul de remise de façon fiable et répétable ?",
    choix: [
      "La lancer en production et regarder",
      "Préparer un jeu de données de test connu, l'exécuter, comparer au résultat attendu (des outils comme tSQLt automatisent ces tests)",
      "Demander à l'utilisateur",
      "Ne pas tester"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les tests rejouables évitent les régressions quand on modifie le code.",
      "Non.",
      "Non."
    ],
    retenir: "Tests : données connues + résultat attendu."
  },
  {
    id: "m13-q71", dialecte: "Snowflake",
    q: "Quelle est la structure d'un bloc Snowflake Scripting ?",
    choixCode: true,
    choix: [
      "BEGIN TRY … END TRY",
      "DECLARE (facultatif) … BEGIN … EXCEPTION (facultatif) … END;",
      "TRY … CATCH",
      "{ … }"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Déclarations, corps, gestion d'erreurs.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : DECLARE / BEGIN / EXCEPTION / END."
  },
  {
    id: "m13-q72", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment déclarer et affecter une variable dans le corps du bloc ?",
    choixCode: true,
    choix: [
      "DECLARE @n INT = 5;",
      "LET n := 5;",
      "SET @n = 5;",
      "VAR n = 5;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. LET déclare et affecte ; ensuite n := 6; pour changer la valeur.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake Scripting : LET var := valeur;"
  },
  {
    id: "m13-q73", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment utiliser la variable nb_jours dans une requête SQL ?",
    choixCode: true,
    choix: [
      "WHERE date_log < DATEADD(day, -@nb_jours, CURRENT_DATE)",
      "WHERE date_log < DATEADD(day, -:nb_jours, CURRENT_DATE)",
      "WHERE date_log < DATEADD(day, -$nb_jours, CURRENT_DATE)",
      "WHERE date_log < DATEADD(day, -nb_jours(), CURRENT_DATE)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. @ est SQL Server.",
      "Oui. Les deux-points « lient » la variable dans l'instruction SQL.",
      "Non. $ sert aux variables de SESSION (SET v = …).",
      "Non."
    ],
    retenir: "Variable de script dans le SQL : :nom."
  },
  {
    id: "m13-q74", dialecte: "Snowflake",
    q: "Quelle est la forme d'une procédure Snowflake en SQL ?",
    choixCode: true,
    choix: [
      "CREATE PROCEDURE p @a INT AS BEGIN … END",
      "CREATE OR REPLACE PROCEDURE p(a INT) RETURNS VARCHAR LANGUAGE SQL AS $$ BEGIN … RETURN 'OK'; END; $$;",
      "CREATE FUNCTION p …",
      "DEFINE PROCEDURE p"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Type de retour obligatoire, langage précisé, corps entre $$.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : RETURNS + LANGUAGE + $$ … $$."
  },
  {
    id: "m13-q75", dialecte: "Snowflake",
    q: "Comment exécuter une procédure sur Snowflake ?",
    choixCode: true,
    choix: [
      "EXEC p 30",
      "CALL p(30);",
      "RUN p(30)",
      "SELECT p(30)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui.",
      "Non.",
      "Non. SELECT appelle une fonction, pas une procédure."
    ],
    retenir: "Snowflake : CALL procédure(…)."
  },
  {
    id: "m13-q76", dialecte: "Snowflake",
    q: "Sur Snowflake, comment exécuter une requête construite dans une chaîne ?",
    choixCode: true,
    choix: [
      "EXEC (@sql)",
      "EXECUTE IMMEDIATE :sql;",
      "sp_executesql",
      "RUN :sql"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec USING (…) pour passer des valeurs en paramètres (contre l'injection).",
      "Non. SQL Server.",
      "Non."
    ],
    retenir: "SQL dynamique Snowflake : EXECUTE IMMEDIATE."
  },
  {
    id: "m13-q77", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment récupérer le message d'une erreur attrapée ?",
    choixCode: true,
    choix: [
      "ERROR_MESSAGE()",
      "EXCEPTION WHEN OTHER THEN RETURN SQLERRM;",
      "CATCH (e)",
      "@@ERROR"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. SQLERRM = message, SQLCODE = code, SQLSTATE = état.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : EXCEPTION WHEN OTHER + SQLERRM."
  },
  {
    id: "m13-q78", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment lever une erreur métier personnalisée ?",
    choixCode: true,
    choix: [
      "THROW 50001, 'msg', 1;",
      "DECLARE erreur_periode EXCEPTION (-20001, 'Période invalide'); … RAISE erreur_periode;",
      "PRINT 'erreur'",
      "RETURN -1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. On déclare l'exception (numéro entre -20000 et -20999), puis RAISE.",
      "Non.",
      "Non. Un code retour n'arrête pas l'appelant."
    ],
    retenir: "Snowflake : DECLARE … EXCEPTION puis RAISE."
  },
  {
    id: "m13-q79", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment parcourir les lignes d'une requête ?",
    choixCode: true,
    choix: [
      "WHILE @@FETCH_STATUS = 0",
      "DECLARE c CURSOR FOR SELECT …; … FOR ligne IN c DO … END FOR;",
      "FOREACH ROW",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. Mais comme sur SQL Server : à réserver aux actions vraiment unitaires.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : FOR … IN curseur DO … END FOR."
  },
  {
    id: "m13-q80", dialecte: "Snowflake",
    q: "Une procédure Snowflake s'exécute par défaut avec les droits de qui ?",
    choix: [
      "De l'appelant",
      "De son propriétaire (EXECUTE AS OWNER) ; on peut choisir EXECUTE AS CALLER",
      "De l'administrateur",
      "De personne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si on le précise.",
      "Oui. OWNER : l'appelant n'a pas besoin de droits sur les tables. CALLER : il les lui faut.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : droits du propriétaire par défaut."
  },
  {
    id: "m13-q81", dialecte: "Snowflake",
    q: "Tu crées une TASK Snowflake planifiée chaque nuit. Elle ne s'exécute jamais. Oubli classique ?",
    choixCode: true,
    choix: [
      "Le warehouse est trop grand",
      "ALTER TASK ma_task RESUME; (une task est créée suspendue)",
      "Il faut un index",
      "Il faut redémarrer Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il faut l'activer explicitement après création.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake TASK : créée suspendue → RESUME."
  },
  {
    id: "m13-q82", dialecte: "Snowflake",
    q: "Comment enchaîner une task « calcul » après une task « chargement » sur Snowflake ?",
    choixCode: true,
    choix: [
      "Planifier les deux à la même heure",
      "CREATE TASK calcul … AFTER chargement AS …",
      "Une boucle",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de garantie d'ordre.",
      "Oui. Les tasks forment une chaîne (un graphe) : la suivante démarre quand la précédente a fini.",
      "Non.",
      "Non."
    ],
    retenir: "Tasks enchaînées : AFTER."
  },
  {
    id: "m13-q83", dialecte: "Snowflake",
    q: "Une task Snowflake peut-elle s'exécuter sans warehouse dédié ?",
    choix: [
      "Non, jamais",
      "Oui : les tasks « serverless » utilisent des ressources gérées par Snowflake (facturées à l'usage)",
      "Oui, gratuitement",
      "Seulement le week-end"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique pour de petites tâches fréquentes.",
      "Non. Ce n'est pas gratuit.",
      "Non."
    ],
    retenir: "Tasks serverless : sans warehouse à gérer."
  },
  {
    id: "m13-q84", dialecte: "Snowflake",
    q: "Comment traiter seulement les nouvelles lignes d'une table, toutes les 10 minutes, sur Snowflake ?",
    choix: [
      "Relire toute la table à chaque fois",
      "Un STREAM sur la table (il capte les changements) + une TASK qui consomme ce stream quand il a des données",
      "Un trigger",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Coûteux.",
      "Oui. Condition WHEN SYSTEM$STREAM_HAS_DATA('mon_stream') : la task ne tourne que s'il y a du nouveau.",
      "Non. Pas de triggers sur Snowflake.",
      "Non."
    ],
    retenir: "Incrémental Snowflake : STREAM + TASK."
  },
  {
    id: "m13-q85", dialecte: "Snowflake",
    q: "Comment créer une fonction SQL simple sur Snowflake (prix TTC) ?",
    choixCode: true,
    choix: [
      "CREATE FUNCTION ttc(ht NUMBER(18,2)) RETURNS NUMBER(18,2) AS 'ht * 1.2';",
      "CREATE PROCEDURE ttc …",
      "DEFINE ttc = ht * 1.2",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Fonction utilisable dans un SELECT : SELECT ttc(montant) FROM …",
      "Non. Une procédure ne s'utilise pas dans un SELECT.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : CREATE FUNCTION … AS 'expression'."
  },
  {
    id: "m13-q86", dialecte: "Snowflake",
    q: "En plus de SQL, dans quels langages peut-on écrire des procédures Snowflake ?",
    choix: [
      "Aucun autre",
      "JavaScript, Python, Java, Scala",
      "COBOL",
      "Seulement C#"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Python est pratique pour des traitements de données complexes (avec Snowpark).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : procédures SQL, JavaScript, Python…"
  },
  {
    id: "m13-q87", dialecte: "Snowflake",
    q: "Comment une procédure Snowflake peut-elle renvoyer un tableau de lignes ?",
    choixCode: true,
    choix: [
      "RETURNS VARCHAR",
      "RETURNS TABLE (code VARCHAR, ca NUMBER) … LET res RESULTSET := (SELECT …); RETURN TABLE(res);",
      "PRINT",
      "SELECT à la fin, comme SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une seule valeur.",
      "Oui. On déclare la structure du tableau renvoyé.",
      "Non.",
      "Non. Sur Snowflake, il faut déclarer RETURNS TABLE."
    ],
    retenir: "Snowflake : RETURNS TABLE + RETURN TABLE(resultset)."
  },
  {
    id: "m13-q88", dialecte: "Snowflake",
    q: "Snowflake Scripting n'a pas de PRINT. Comment suivre l'avancement d'un traitement ?",
    choix: [
      "Impossible",
      "Écrire dans une table de log (ou utiliser la journalisation par table d'événements), et renvoyer un résumé en valeur de retour",
      "PRINT marche quand même",
      "Regarder le warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une table de log est de toute façon une bonne pratique, sur les deux moteurs.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : log en table, pas de PRINT."
  },
  {
    id: "m13-q89", dialecte: "Snowflake",
    q: "Dans une procédure Snowflake, comment rendre plusieurs modifications « tout ou rien » ?",
    choixCode: true,
    choix: [
      "BEGIN TRAN … COMMIT TRAN",
      "BEGIN TRANSACTION; … COMMIT; (et ROLLBACK dans le bloc EXCEPTION)",
      "Impossible",
      "SAVEPOINT obligatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. Attention : pas d'instruction DDL au milieu (COMMIT implicite).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : BEGIN TRANSACTION … COMMIT, ROLLBACK dans EXCEPTION."
  },
  {
    id: "m13-q90", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi servent SET seuil = 1000; puis WHERE montant > $seuil ?",
    choix: [
      "À rien",
      "À définir une variable de SESSION, utilisable dans les requêtes suivantes avec $",
      "À créer une colonne",
      "À créer un paramètre de procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique dans une feuille de calcul Snowsight. Dans une procédure, on utilise plutôt LET et :var.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : SET v = … ; $v (variable de session)."
  },
  {
    id: "m13-q91", dialecte: "SQL Server + Snowflake",
    q: "Tu migres une procédure T-SQL vers Snowflake. Que faut-il réécrire au minimum ?",
    choix: [
      "Rien",
      "La structure (CREATE PROCEDURE … $$), les @variables, TRY/CATCH, les fonctions propres à SQL Server (GETDATE, ISNULL, TOP…), les #tables",
      "Seulement le nom",
      "Seulement les commentaires"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La logique reste, la syntaxe change beaucoup. C'est l'occasion de passer en « ensembliste ».",
      "Non.",
      "Non."
    ],
    retenir: "Migration T-SQL → Snowflake : syntaxe à réécrire."
  },
  {
    id: "m13-q92", dialecte: "SQL Server + Snowflake",
    q: "Quelles traductions SQL Server → Snowflake sont correctes ?",
    choix: [
      "GETDATE() → NOW()",
      "GETDATE() → CURRENT_TIMESTAMP ; ISNULL(a, b) → COALESCE(a, b) ou IFNULL ; TOP (n) → LIMIT n ; #t → TEMPORARY TABLE",
      "ISNULL → ISNULL",
      "Aucune traduction nécessaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les fonctions standard (COALESCE, CURRENT_TIMESTAMP, CASE) simplifient les migrations.",
      "Non. ISNULL n'existe pas sur Snowflake.",
      "Non."
    ],
    retenir: "Écrire standard = migrer plus facilement."
  },
  {
    id: "m13-q93", dialecte: "Snowflake",
    q: "Dans une procédure Snowflake, comment créer une table de travail qui disparaît à la fin de la session ?",
    choixCode: true,
    choix: [
      "CREATE TABLE #travail …",
      "CREATE TEMPORARY TABLE travail …",
      "DECLARE @travail TABLE",
      "CREATE VOLATILE travail"
    ],
    bonne: 1,
    pourquoi: [
      "Non. # est SQL Server.",
      "Oui. Visible seulement dans la session.",
      "Non. SQL Server.",
      "Non."
    ],
    retenir: "Snowflake : TEMPORARY TABLE."
  },
  {
    id: "m13-q94", dialecte: "Snowflake",
    q: "Pourquoi une boucle qui exécute 10 000 petites requêtes est-elle encore plus pénalisante sur Snowflake que sur SQL Server ?",
    choix: [
      "Elle ne l'est pas",
      "Chaque instruction a un coût fixe (compilation, coordination dans le cloud) : 10 000 instructions = beaucoup de temps et de crédits",
      "Snowflake interdit les boucles",
      "À cause des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Snowflake excelle sur quelques grosses requêtes, pas sur des milliers de petites.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : peu de grosses requêtes, pas beaucoup de petites."
  },
  {
    id: "m13-q95", dialecte: "Standard",
    q: "Lors d'une relecture de code SQL (revue), que vérifier en priorité ?",
    choix: [
      "La couleur dans l'éditeur",
      "Résultat juste (jointures, NULL, doublons), gestion d'erreurs et transactions, performance (SARGable, ensembliste), sécurité (injection), lisibilité",
      "Le nombre de lignes de code",
      "Les majuscules uniquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Dans cet ordre : juste, sûr, rapide, lisible.",
      "Non.",
      "Non."
    ],
    retenir: "Revue : juste, sûr, rapide, lisible."
  },
  {
    id: "m13-q96", dialecte: "Standard",
    q: "Quel nom de procédure est le plus clair ?",
    choix: [
      "dbo.proc1",
      "dbo.p_integrer_commandes_edi",
      "dbo.sp_traitement",
      "dbo.toto"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Préfixe cohérent + verbe + objet : on sait ce qu'elle fait sans l'ouvrir.",
      "Non. Préfixe sp_ et nom vague.",
      "Non."
    ],
    retenir: "Nom = verbe + objet."
  },
  {
    id: "m13-q97", dialecte: "SQL Server",
    q: "Pour signaler un échec, pourquoi THROW est-il plus sûr que RETURN -1 ?",
    choix: [
      "Il est plus court",
      "Un code de retour est souvent ignoré par l'appelant ; une erreur levée arrête le traitement et est vue par l'Agent SQL, l'ETL ou l'application",
      "RETURN est interdit",
      "Aucune différence"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un job qui « réussit » avec un code -1 ignoré, c'est une erreur silencieuse.",
      "Non.",
      "Non."
    ],
    retenir: "Échec = erreur levée, pas un code ignorable."
  },
  {
    id: "m13-q98", dialecte: "SQL Server",
    q: "Une étape de job échoue parfois à cause d'un deadlock. Quelle option simple de l'Agent SQL aide ?",
    choix: [
      "Aucune",
      "Les « tentatives » (retry attempts) de l'étape, avec un délai entre deux essais",
      "Supprimer le job",
      "NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. À condition que la procédure soit relançable sans doublon (idempotente).",
      "Non.",
      "Non."
    ],
    retenir: "Job : tentatives automatiques + procédure idempotente."
  },
  {
    id: "m13-q99", dialecte: "Standard",
    q: "Que mettre dans l'en-tête de commentaire d'une procédure ?",
    choix: [
      "Rien",
      "Son objectif, ses paramètres, ce qu'elle modifie, les tables lues, et les cas particuliers / règles métier",
      "Une blague",
      "Le mot de passe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'historique des modifications, lui, est dans Git.",
      "Non.",
      "Non. Jamais de secret dans le code."
    ],
    retenir: "En-tête : objectif, paramètres, effets, règles."
  },
  {
    id: "m13-q100", dialecte: "Standard",
    q: "Quelle liste résume une bonne procédure stockée ?",
    choix: [
      "Longue, avec des curseurs",
      "SET NOCOUNT ON, paramètres typés et validés, ensembliste, transaction + XACT_ABORT + TRY/CATCH + THROW, log, relançable, versionnée",
      "Sans gestion d'erreur pour aller vite",
      "Avec des valeurs en dur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est le standard attendu en production.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure pro : typée, ensembliste, protégée, tracée, versionnée."
  }
];
