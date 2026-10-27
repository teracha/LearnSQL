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
      "Non. VAR n'existe pas en T-SQL.",
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
      "Non. Sans valeur, une variable vaut NULL.",
      "Oui. Attention : @n + 1 vaut alors NULL. Initialise : DECLARE @n INT = 0;",
      "Non. Déclarer sans valeur est permis.",
      "Non. Sans valeur, une variable vaut NULL."
    ],
    retenir: "Variable non initialisée = NULL."
  },
  {
    id: "m13-q03", dialecte: "SQL Server",
    q: "Quelle différence entre SET et SELECT pour affecter des variables ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "SELECT peut en affecter plusieurs",
      "SET marche aussi avec un FROM",
      "SET est plus rapide sur une table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SELECT peut affecter plusieurs variables d'un coup.",
      "Oui. SET affecte une seule variable ; SELECT peut en affecter plusieurs à la fois (SELECT @a = …, @b = … FROM …). Attention aux comportements différents si la requête renvoie 0 ou plusieurs lignes.",
      "Non. SET n'accepte pas de FROM : il faut SET @a = (SELECT … FROM …).",
      "Non. La vitesse n'est pas la différence."
    ],
    retenir: "SET = une variable. SELECT = plusieurs."
  },
  {
    id: "m13-q04", dialecte: "SQL Server",
    q: "SELECT @nom = nom FROM client WHERE pays = 'FR'; renvoie 500 lignes. Que contient @nom ?",
    choix: [
      "Une erreur « plusieurs lignes »",
      "Le nom d'une seule ligne, sans avertir",
      "Tous les noms, séparés par des virgules",
      "NULL, faute de ligne unique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'erreur : c'est le piège.",
      "Oui. Souvent la dernière lue, sans aucun avertissement. Rends le résultat unique (WHERE sur la clé) ou utilise SET @nom = (SELECT …) qui plante si plusieurs lignes.",
      "Non. Il faudrait STRING_AGG pour ça.",
      "Non. La variable reçoit bien une valeur."
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
      "Non. La variable garde son ancienne valeur.",
      "Non. Aucune ligne n'est pas une erreur."
    ],
    retenir: "SELECT @v sans ligne = variable inchangée."
  },
  {
    id: "m13-q06", dialecte: "SQL Server",
    q: "Une variable déclarée avant un GO est-elle utilisable après ?",
    choix: [
      "Oui, jusqu'à la fin du script",
      "Non : GO termine le lot",
      "Seulement en lecture après le GO",
      "Oui, si elle est déclarée en premier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle vit seulement dans son lot.",
      "Oui. La variable n'existe plus après le GO. Il faut la redéclarer dans le nouveau lot.",
      "Non. Après le GO, elle n'existe plus du tout.",
      "Non. L'ordre de déclaration ne change rien."
    ],
    retenir: "Une variable vit dans son lot (jusqu'au GO)."
  },
  {
    id: "m13-q07", dialecte: "SQL Server",
    q: "Pourquoi les messages PRINT d'un long traitement n'apparaissent-ils qu'à la fin ?",
    choix: [
      "Un bug connu de SSMS",
      "Ils sont mis en mémoire tampon",
      "PRINT attend la fin de la transaction",
      "PRINT s'affiche seulement en cas d'erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un comportement normal du tampon.",
      "Oui. Pour un affichage immédiat : RAISERROR('message', 0, 1) WITH NOWAIT. Gravité 0 = simple information, pas une erreur.",
      "Non. Le tampon existe même sans transaction.",
      "Non. PRINT s'affiche toujours, mais en retard."
    ],
    retenir: "Suivi en direct : RAISERROR(…, 0, 1) WITH NOWAIT."
  },
  {
    id: "m13-q08", dialecte: "SQL Server",
    q: "Pourquoi entourer plusieurs instructions d'un BEGIN … END après un IF ?",
    choix: [
      "Pour la lisibilité seulement, sans effet",
      "Sinon, seule la 1re ligne dépend du IF",
      "C'est obligatoire même pour une seule ligne",
      "Pour ouvrir une transaction implicite"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'effet est réel.",
      "Oui. Sans BEGIN … END, seule la PREMIÈRE instruction dépend du IF ; les suivantes s'exécutent toujours. Bug classique. Mets toujours BEGIN … END.",
      "Non. Mais c'est conseillé.",
      "Non. Ce n'est pas BEGIN TRAN."
    ],
    retenir: "IF … BEGIN … END, toujours."
  },
  {
    id: "m13-q09", dialecte: "SQL Server",
    q: "Dans une boucle WHILE, que font BREAK et CONTINUE ?",
    choix: [
      "Rien, ce sont des mots réservés",
      "BREAK sort ; CONTINUE passe au tour suivant",
      "BREAK met en pause ; CONTINUE reprend",
      "Ils annulent la transaction en cours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils contrôlent la boucle.",
      "Oui. Attention à faire avancer la condition, sinon boucle infinie.",
      "Non. Il n'y a pas de pause : BREAK sort définitivement.",
      "Non. Ils ne touchent pas aux transactions."
    ],
    retenir: "BREAK = sortir. CONTINUE = tour suivant."
  },
  {
    id: "m13-q10", dialecte: "SQL Server",
    q: "Une boucle WHILE @i < 100 n'incrémente jamais @i. Que se passe-t-il ?",
    choix: [
      "Elle s'arrête seule après 100 tours",
      "Boucle infinie",
      "Une erreur de dépassement de pile",
      "Elle ne démarre pas du tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La condition reste vraie : elle ne s'arrête pas.",
      "Oui. Le traitement ne s'arrête jamais : il faut l'annuler à la main. Toujours vérifier que la condition progresse (SET @i += 1).",
      "Non. WHILE n'utilise pas de pile.",
      "Non. Elle démarre si @i < 100."
    ],
    retenir: "WHILE : la condition doit progresser."
  },
  {
    id: "m13-q11", dialecte: "SQL Server",
    q: "Quelle est l'utilité de SET NOCOUNT ON en début de procédure ?",
    choix: [
      "Compter les lignes modifiées",
      "Masquer les messages « n lignes »",
      "Empêcher toute modification de données",
      "Accélérer la lecture des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est plutôt l'inverse : on supprime ce comptage affiché.",
      "Oui. Supprimer les messages « (n lignes affectées) » : moins de trafic réseau, et certains outils (ETL, applis) ne sont plus perturbés. Bonne pratique dans toute procédure.",
      "Non. Les modifications restent permises.",
      "Non. Ça ne touche pas aux index."
    ],
    retenir: "Procédure : SET NOCOUNT ON en première ligne."
  },
  {
    id: "m13-q12", dialecte: "SQL Server",
    q: "Comment donner une valeur par défaut à un paramètre de procédure ?",
    choixCode: true,
    choix: [
      "@annee INT DEFAULT 2026",
      "@annee INT = NULL",
      "@annee INT OPTIONAL = 2026",
      "@annee INT NULLABLE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe invalide : pas de DEFAULT ici.",
      "Oui. L'appelant peut omettre le paramètre ; on gère ensuite le cas NULL. Ex. SET @annee = COALESCE(@annee, YEAR(GETDATE())).",
      "Non. OPTIONAL n'existe pas en T-SQL.",
      "Non. NULLABLE n'existe pas."
    ],
    retenir: "Paramètre facultatif : @p type = valeur_par_défaut."
  },
  {
    id: "m13-q13", dialecte: "SQL Server",
    q: "Pourquoi appeler une procédure avec des paramètres nommés (EXEC p @annee = 2026, @client = 42) ?",
    choix: [
      "C'est obligatoire depuis SQL Server 2016",
      "L'appel reste juste si l'ordre change",
      "C'est plus rapide à l'exécution",
      "Pour forcer les types des valeurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux écritures sont permises.",
      "Oui. Et il est plus lisible. Un appel par position (EXEC p 2026, 42) casse si quelqu'un ajoute un paramètre au milieu.",
      "Non. Même vitesse.",
      "Non. Les types viennent de la procédure."
    ],
    retenir: "Appels de procédures : paramètres nommés."
  },
  {
    id: "m13-q14", dialecte: "SQL Server",
    q: "Comment une procédure renvoie-t-elle une valeur calculée à l'appelant, autrement qu'avec un SELECT ?",
    choix: [
      "Avec RETURN 'texte'",
      "Avec un paramètre OUTPUT",
      "Avec PRINT, lu par l'appelant",
      "Avec une variable globale @@resultat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. RETURN ne renvoie qu'un entier.",
      "Oui. Déclaré OUTPUT dans la procédure ET dans l'appel. Oublier OUTPUT dans l'appel = la valeur n'est pas récupérée, sans erreur.",
      "Non. PRINT envoie un message, pas une valeur exploitable.",
      "Non. On ne crée pas de variables @@."
    ],
    retenir: "Valeur de retour : paramètre OUTPUT."
  },
  {
    id: "m13-q15", dialecte: "SQL Server",
    q: "À quoi sert RETURN dans une procédure ?",
    choix: [
      "À renvoyer un texte à l'appelant",
      "À sortir, avec un code entier",
      "À renvoyer un tableau de lignes",
      "À valider la transaction, puis sortir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. RETURN ne renvoie qu'un entier.",
      "Oui. Il sort de la procédure, en renvoyant éventuellement un code entier (0 = succès, par convention). EXEC @code = dbo.p … récupère ce code.",
      "Non. RETURN renvoie seulement un entier.",
      "Non. RETURN ne fait pas de COMMIT."
    ],
    retenir: "RETURN = sortie + code entier."
  },
  {
    id: "m13-q16", dialecte: "SQL Server",
    q: "Pourquoi éviter de préfixer ses procédures par sp_ ?",
    choix: [
      "C'est interdit par SQL Server",
      "Cherchées d'abord dans la base master",
      "Elles sont plus lentes à écrire",
      "Elles ne peuvent pas avoir de paramètres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le préfixe est permis.",
      "Oui. Les procédures sp_ sont d'abord cherchées dans master (procédures système) : risque de conflit et léger surcoût. Préfère usp_, p_ ou un nom métier clair, dans un schéma dédié.",
      "Non. La vitesse d'écriture n'a rien à voir.",
      "Non. Elles acceptent des paramètres."
    ],
    retenir: "Pas de préfixe sp_ pour ses procédures."
  },
  {
    id: "m13-q17", dialecte: "SQL Server",
    q: "Quel est l'avantage de CREATE OR ALTER PROCEDURE ?",
    choix: [
      "Plus rapide à l'exécution",
      "Crée ou modifie, en gardant les droits",
      "Il garde l'historique des anciennes versions",
      "Il fait un DROP puis un CREATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Même vitesse : c'est un avantage de déploiement.",
      "Oui. Le même script crée la procédure si elle n'existe pas, ou la modifie sinon, en gardant les droits existants. Scripts de déploiement relançables (SQL Server 2016 SP1+).",
      "Non. L'historique, c'est Git.",
      "Non. Un DROP ferait perdre les droits."
    ],
    retenir: "CREATE OR ALTER = déploiement relançable."
  },
  {
    id: "m13-q18", dialecte: "SQL Server",
    q: "Quelles fonctions donnent les détails d'une erreur dans un bloc CATCH ?",
    choixCode: true,
    choix: [
      "ERROR_MESSAGE(), ERROR_LINE()…",
      "@@ERROR seulement",
      "GET_ERROR_MESSAGE(), GET_ERROR_LINE()",
      "ERROR.Message, ERROR.Line"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. ERROR_NUMBER(), ERROR_MESSAGE(), ERROR_LINE(), ERROR_PROCEDURE(), ERROR_SEVERITY(). À enregistrer dans une table de log avant de relancer l'erreur.",
      "Non. Il ne donne que le numéro, et il est remis à 0 par l'instruction suivante.",
      "Non. Ces fonctions n'existent pas.",
      "Non. Syntaxe d'autres langages."
    ],
    retenir: "CATCH : ERROR_MESSAGE(), ERROR_LINE()…"
  },
  {
    id: "m13-q19", dialecte: "SQL Server",
    q: "Dans un CATCH, que fait THROW; (sans paramètre) ?",
    choix: [
      "Rien, sans paramètre",
      "Il relance l'erreur d'origine",
      "Il efface l'erreur, puis continue",
      "Il valide la transaction en cours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans paramètre, il relance l'erreur attrapée.",
      "Oui. Même numéro, même message, vers l'appelant. Après ROLLBACK et log, l'appelant (Agent SQL, ETL) sait que ça a échoué.",
      "Non. Il relance l'erreur, il ne l'efface pas.",
      "Non. THROW ne valide rien."
    ],
    retenir: "CATCH : … puis THROW; pour ne pas cacher l'erreur."
  },
  {
    id: "m13-q20", dialecte: "SQL Server",
    q: "Un CATCH contient seulement PRINT 'erreur'. Quel est le problème ?",
    choix: [
      "Aucun, l'erreur est bien affichée",
      "L'erreur est avalée",
      "PRINT est interdit dans un CATCH",
      "La transaction est validée deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message n'est vu par personne.",
      "Oui. Le travail planifié est vu comme réussi alors qu'il a échoué. Personne n'est alerté. Toujours relancer (THROW) ou signaler l'échec.",
      "Non. PRINT est permis dans un CATCH.",
      "Non. PRINT ne valide rien."
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
      "Non. ERROR() n'existe pas en T-SQL.",
      "Non. Ce n'est pas une erreur."
    ],
    retenir: "THROW numéro (≥ 50000), 'message', état;"
  },
  {
    id: "m13-q22", dialecte: "SQL Server",
    q: "THROW 50001, 'X', 1; donne une erreur de syntaxe. L'instruction juste avant est SET @a = 1 (sans point-virgule). Pourquoi ?",
    choix: [
      "THROW n'existe pas en T-SQL",
      "Il manque le ; avant THROW",
      "Le numéro 50001 est trop grand",
      "THROW doit être dans un CATCH"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il existe depuis SQL Server 2012.",
      "Oui. L'instruction qui précède THROW doit se terminer par ;. Comme pour WITH et MERGE. Termine toutes tes instructions par ;",
      "Non. Les numéros d'erreur utilisateur vont bien au-delà.",
      "Non. THROW avec paramètres marche partout ; c'est THROW; seul qui doit être dans un CATCH."
    ],
    retenir: "Avant THROW : point-virgule."
  },
  {
    id: "m13-q23", dialecte: "SQL Server",
    q: "TRY / CATCH attrape-t-il une faute de frappe dans un nom de table (SELECT * FROM clientt) dans le même bloc ?",
    choix: [
      "Oui, toutes les erreurs du bloc",
      "Non, pas ce CATCH-là (même niveau)",
      "Oui, si XACT_ABORT est activé",
      "Non, aucune erreur de syntaxe jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les erreurs de compilation du même niveau lui échappent.",
      "Oui. Les erreurs de compilation / de résolution de nom au même niveau ne sont pas attrapées par ce CATCH. Un CATCH de niveau supérieur (procédure appelante) les attrape. D'où l'importance des tests.",
      "Non. XACT_ABORT n'y change rien.",
      "Non. Un CATCH de niveau supérieur l'attrape."
    ],
    retenir: "CATCH n'attrape pas les erreurs de compilation du même niveau."
  },
  {
    id: "m13-q24", dialecte: "SQL Server",
    q: "Pourquoi préférer THROW à RAISERROR dans du code neuf ?",
    choix: [
      "RAISERROR n'existe plus",
      "Plus simple et plus fidèle",
      "RAISERROR est plus rapide",
      "THROW accepte plus de paramètres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il existe encore (et reste utile pour WITH NOWAIT).",
      "Oui. THROW est plus simple, respecte XACT_ABORT et relance fidèlement l'erreur d'origine. RAISERROR garde des usages (messages de progression).",
      "Non. La vitesse n'est pas la raison.",
      "Non. Il en accepte moins (pas de gravité, pas de format)."
    ],
    retenir: "Erreurs : THROW. Messages de progression : RAISERROR … WITH NOWAIT."
  },
  {
    id: "m13-q25", dialecte: "SQL Server",
    q: "Une fonction scalaire peut-elle faire un INSERT dans une table ?",
    choix: [
      "Oui, comme une procédure",
      "Non : une fonction ne modifie rien",
      "Seulement dans une #table",
      "Oui, si elle est déterministe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une fonction ne modifie pas les données.",
      "Oui. Une fonction ne peut pas modifier les données de la base. Pour modifier : une procédure stockée.",
      "Non. Les #tables sont aussi interdites dans une fonction (variables table permises).",
      "Non. Déterministe ou pas, l'INSERT est interdit."
    ],
    retenir: "Fonction = lecture seule. Procédure = peut modifier."
  },
  {
    id: "m13-q26", dialecte: "SQL Server",
    q: "Peut-on utiliser NEWID() directement dans une fonction utilisateur ?",
    choix: [
      "Oui, comme GETDATE()",
      "Non : effet de bord interdit",
      "Seulement dans une fonction scalaire",
      "Seulement dans une fonction table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GETDATE() est permis, mais pas NEWID().",
      "Oui. Fonction à « effet de bord » : interdite dans une fonction utilisateur. NEWID() et RAND() non ; GETDATE() oui.",
      "Non. Interdit dans toutes les fonctions utilisateur.",
      "Non. Interdit dans toutes les fonctions utilisateur."
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
      "Non. TRY / CATCH est interdit dans une fonction.",
      "Oui. C'est interdit. Une fonction doit être simple ; la gestion d'erreur va dans la procédure appelante.",
      "Non. Interdit dans toutes les fonctions.",
      "Non. THROW est aussi interdit dans une fonction."
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
      "Non. Une ligne à la fois : lent.",
      "Non. Ligne par ligne : lent."
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
      "Non. Ingérable, et limité à 2 100 paramètres.",
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
      "SELECT * FROM OPENJSON(@json) WITH (…)",
      "SELECT * FROM @json",
      "CAST(@json AS TABLE)",
      "SELECT * FROM JSON_VALUE(@json, '$.lignes')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ex. OPENJSON(@json, '$.lignes') WITH (article VARCHAR(20) '$.art', qte INT '$.qte') : colonnes typées (SQL Server 2016+).",
      "Non. Une variable texte n'est pas une table.",
      "Non. On ne convertit pas un texte en table.",
      "Non. JSON_VALUE renvoie une seule valeur, pas des lignes."
    ],
    retenir: "JSON → lignes : OPENJSON … WITH (…)."
  },
  {
    id: "m13-q31", dialecte: "SQL Server",
    q: "Pourquoi ce code est-il dangereux ?",
    code: "DECLARE @sql NVARCHAR(MAX) =\n  N'SELECT * FROM client WHERE nom = ''' + @nom + N'''';\nEXEC (@sql);",
    choix: [
      "Il est lent à l'exécution",
      "Injection SQL via @nom",
      "Il manque un ORDER BY",
      "Aucun : EXEC protège déjà"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas le problème principal.",
      "Oui. Si @nom contient '; DROP TABLE client; --, la commande est exécutée. Jamais de concaténation d'une valeur saisie : sp_executesql avec @nom en paramètre.",
      "Non. Le danger est la sécurité, pas le tri.",
      "Non. EXEC exécute le texte tel quel."
    ],
    retenir: "Concaténer une saisie dans du SQL = injection."
  },
  {
    id: "m13-q32", dialecte: "SQL Server",
    q: "Quelle écriture du SQL dynamique est sûre ?",
    choixCode: true,
    choix: [
      "EXEC ('SELECT * FROM client WHERE nom = ''' + @nom + '''')",
      "EXEC sp_executesql N'… WHERE nom = @n', N'@n NVARCHAR(100)', @n = @nom",
      "EXEC sp_executesql N'… WHERE nom = ''' + @nom + ''''",
      "EXEC (@nom)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Injection possible.",
      "Oui. La valeur est un paramètre : jamais exécutée comme du code. Et le plan est réutilisé.",
      "Non. sp_executesql ne protège rien si la valeur est concaténée dans le texte.",
      "Non. Exécute la saisie elle-même comme du code."
    ],
    retenir: "sp_executesql + paramètres."
  },
  {
    id: "m13-q33", dialecte: "SQL Server",
    q: "Le nom de la table est variable (@table). Les paramètres ne marchent pas pour un nom d'objet. Comment se protéger ?",
    choixCode: true,
    choix: [
      "Concaténer @table tel quel",
      "QUOTENAME(@table) + liste blanche",
      "Mettre des apostrophes autour de @table",
      "Passer @table en paramètre sp_executesql"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Injection possible.",
      "Oui. QUOTENAME entoure de crochets et neutralise les caractères dangereux ; vérifier aussi que la table existe dans une liste autorisée.",
      "Non. Ça en ferait un texte.",
      "Non. Les paramètres ne marchent pas pour un nom d'objet."
    ],
    retenir: "Nom d'objet dynamique : QUOTENAME + liste blanche."
  },
  {
    id: "m13-q34", dialecte: "SQL Server",
    q: "Une variable @annee déclarée dans la procédure est-elle visible à l'intérieur d'un EXEC sp_executesql @sql ?",
    choix: [
      "Oui, comme dans le reste de la procédure",
      "Non : il faut la passer en paramètre",
      "Seulement si elle s'appelle pareil",
      "Seulement en lecture, pas en écriture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le SQL dynamique a son propre contexte.",
      "Oui. Le SQL dynamique s'exécute dans un contexte séparé. D'où la liste de paramètres de sp_executesql.",
      "Non. Le nom ne la rend pas visible.",
      "Non. Elle n'est pas visible du tout."
    ],
    retenir: "SQL dynamique : variables passées en paramètres."
  },
  {
    id: "m13-q35", dialecte: "SQL Server",
    q: "Une #table créée À L'INTÉRIEUR d'un SQL dynamique est-elle visible après l'EXEC ?",
    choix: [
      "Oui, jusqu'à la fin de la session",
      "Non : crée-la avant",
      "Oui, si elle est créée par SELECT INTO",
      "Oui, si on fait un COMMIT avant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle disparaît à la fin du SQL dynamique.",
      "Oui. Elle disparaît à la fin du SQL dynamique. Crée-la AVANT l'EXEC (elle est visible dedans), et remplis-la dedans.",
      "Non. Elle disparaît de la même façon.",
      "Non. Un COMMIT ne la rend pas visible."
    ],
    retenir: "#table : la créer avant le SQL dynamique."
  },
  {
    id: "m13-q36", dialecte: "SQL Server",
    q: "Comment déboguer un SQL dynamique qui plante ?",
    choix: [
      "Le relancer en boucle jusqu'à ce qu'il passe",
      "Afficher le texte généré (PRINT @sql)",
      "Ajouter NOLOCK dans le texte",
      "Le remplacer par un curseur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'erreur reviendra : il faut voir le texte.",
      "Oui. PRINT @sql ou SELECT @sql, puis copier le texte et l'exécuter seul pour voir l'erreur exacte. On voit souvent tout de suite l'espace ou l'apostrophe manquante.",
      "Non. NOLOCK ne corrige pas une erreur de syntaxe.",
      "Non. Ça ne trouve pas l'erreur."
    ],
    retenir: "SQL dynamique : PRINT @sql avant EXEC."
  },
  {
    id: "m13-q37", dialecte: "SQL Server",
    q: "Pourquoi les curseurs sont-ils souvent déconseillés ?",
    choix: [
      "Ils sont interdits en production",
      "Ils traitent ligne par ligne : lent",
      "Ils suppriment des données",
      "Ils verrouillent toujours toute la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils sont permis.",
      "Oui. Beaucoup plus lent qu'une requête sur l'ensemble des lignes. 100 000 lignes en curseur : minutes. En une requête : secondes.",
      "Non. Ils ne suppriment rien.",
      "Non. Ils ne verrouillent pas toute la base."
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
      "Non. SCROLL est plus lourd que FAST_FORWARD.",
      "Non. Les options LOCAL FAST_FORWARD allègent vraiment."
    ],
    retenir: "Curseur : LOCAL FAST_FORWARD."
  },
  {
    id: "m13-q39", dialecte: "SQL Server",
    q: "Dans une boucle de curseur, que signifie @@FETCH_STATUS = 0 ?",
    choix: [
      "Fin du curseur atteinte",
      "Une ligne a bien été lue",
      "Erreur pendant la lecture",
      "Le curseur est vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. -1 = plus de lignes.",
      "Oui. Le FETCH a réussi : une ligne est disponible. Boucle typique : WHILE @@FETCH_STATUS = 0 BEGIN … FETCH NEXT … END.",
      "Non. Ce serait une autre valeur.",
      "Non. Un curseur vide donne -1 dès le 1er FETCH."
    ],
    retenir: "@@FETCH_STATUS = 0 = ligne lue."
  },
  {
    id: "m13-q40", dialecte: "SQL Server",
    q: "Après une boucle de curseur, qu'est-ce qu'on oublie souvent ?",
    choix: [
      "COMMIT de la transaction",
      "CLOSE puis DEALLOCATE",
      "DROP TABLE du curseur",
      "Remettre @@FETCH_STATUS à 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un curseur n'ouvre pas de transaction.",
      "Oui. Sinon il reste ouvert (surtout s'il est GLOBAL) et bloque une nouvelle exécution.",
      "Non. Un curseur n'est pas une table.",
      "Non. On ne peut pas l'affecter."
    ],
    retenir: "Curseur : OPEN, FETCH, CLOSE, DEALLOCATE."
  },
  {
    id: "m13-q41", dialecte: "SQL Server",
    q: "Dans quel cas un curseur (ou une boucle) reste-t-il acceptable ?",
    choix: [
      "Pour calculer un total par client",
      "Pour une action vraiment unitaire",
      "Pour mettre à jour 1 million de prix",
      "Jamais, dans aucun cas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SUM … GROUP BY.",
      "Oui. Ex. appeler une procédure par élément (envoyer un fichier par client), ou des tâches d'administration sur quelques objets : chaque élément déclenche une action impossible « en masse ».",
      "Non. Un UPDATE.",
      "Non. Utile pour une action vraiment unitaire."
    ],
    retenir: "Boucle : seulement quand l'action est vraiment unitaire."
  },
  {
    id: "m13-q42", dialecte: "SQL Server",
    q: "Comment remplacer ce curseur qui met à jour le prix de chaque article d'une famille, un par un ?",
    choixCode: true,
    choix: [
      "WHILE @@ROWCOUNT > 0 UPDATE TOP (1) article SET prix = prix * 1.05;",
      "UPDATE article SET prix = prix * 1.05 WHERE famille = 'POMPE';",
      "UPDATE article SET prix = prix * 1.05;",
      "SELECT prix * 1.05 FROM article WHERE famille = 'POMPE';"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Toujours une boucle ligne par ligne, et sans filtre sur la famille.",
      "Oui. Une seule instruction pour toutes les lignes.",
      "Non. Sans WHERE, TOUS les articles augmentent.",
      "Non. Affiche les nouveaux prix, sans rien modifier."
    ],
    retenir: "Penser « ensemble »."
  },
  {
    id: "m13-q43", dialecte: "SQL Server",
    q: "Comment empêcher qu'un même traitement planifié tourne deux fois en même temps (s'il dure plus longtemps que prévu) ?",
    choixCode: true,
    choix: [
      "WAITFOR DELAY '00:05:00'",
      "EXEC sp_getapplock @Resource = 'edi', @LockMode = 'Exclusive'",
      "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE",
      "EXEC msdb.dbo.sp_start_job @job_name = 'traitement_edi'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Décaler n'empêche pas deux exécutions en même temps.",
      "Oui. Un verrou « applicatif » (avec @LockOwner = 'Session', @LockTimeout = 0) : la 2e exécution voit que le verrou est pris et s'arrête.",
      "Non. Isole les lectures, mais n'empêche pas deux traitements de démarrer.",
      "Non. Ça lance le job, ça ne l'empêche pas."
    ],
    retenir: "Un seul traitement à la fois : sp_getapplock."
  },
  {
    id: "m13-q44", dialecte: "SQL Server",
    q: "Que fait WAITFOR DELAY '00:00:05' ?",
    choix: [
      "Rien en dehors d'une transaction",
      "Une pause de 5 s",
      "Attend qu'un verrou se libère, 5 s max",
      "Planifie le lot dans 5 secondes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il fait une pause partout.",
      "Oui. Met en pause l'exécution 5 secondes. Utile entre deux lots d'une purge, ou pour réessayer après un deadlock.",
      "Non. Ce serait SET LOCK_TIMEOUT 5000.",
      "Non. Il bloque la session pendant 5 s."
    ],
    retenir: "WAITFOR DELAY = pause."
  },
  {
    id: "m13-q45", dialecte: "SQL Server",
    q: "Comment planifier une procédure chaque nuit à 2 h sur SQL Server ?",
    choix: [
      "Une boucle WHILE avec WAITFOR TIME",
      "Un job de l'Agent SQL, planifié à 2 h",
      "Le planificateur Windows, obligatoirement",
      "Un trigger sur la table des dates"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une session ouverte en permanence, fragile.",
      "Oui. Une étape EXEC dbo.p_… et une planification. Avec historique, alertes par mail en cas d'échec, reprise…",
      "Non. Possible, mais l'Agent est fait pour ça.",
      "Non. Un trigger réagit à une modification, pas à l'heure."
    ],
    retenir: "Planification SQL Server : Agent SQL."
  },
  {
    id: "m13-q46", dialecte: "SQL Server",
    q: "Un job de l'Agent SQL échoue la nuit. Comment le savoir le matin sans regarder l'historique ?",
    choix: [
      "Impossible sans l'historique",
      "Une notification en cas d'échec",
      "Regarder les logs Windows",
      "Un PRINT à la fin de la procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une notification le permet.",
      "Oui. Database Mail + opérateur, notifié en cas d'échec du job. Et pour que l'échec soit détecté, la procédure ne doit pas avaler ses erreurs.",
      "Non. Il faut encore aller les regarder.",
      "Non. Personne ne le lit la nuit."
    ],
    retenir: "Jobs : alertes en cas d'échec."
  },
  {
    id: "m13-q47", dialecte: "SQL Server",
    q: "Un utilisateur a le droit EXEC sur dbo.p_ca_client, mais aucun droit sur la table commande. La procédure (même propriétaire) lit commande. Ça marche ?",
    choix: [
      "Non, erreur de droits sur commande",
      "Oui : chaînage de propriété",
      "Non, sauf avec WITH NOLOCK",
      "Oui, mais seulement pour les admins"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le chaînage de propriété évite cette erreur.",
      "Oui. Même propriétaire : SQL Server ne revérifie pas les droits sur la table. Les procédures sont une bonne façon de donner un accès contrôlé. Exception : le SQL dynamique casse ce chaînage.",
      "Non. NOLOCK ne donne pas de droits.",
      "Non. Ça marche pour tous ceux qui ont EXEC."
    ],
    retenir: "Droits via procédures : chaînage de propriété."
  },
  {
    id: "m13-q48", dialecte: "SQL Server",
    q: "Pourquoi xp_cmdshell (lancer des commandes Windows depuis SQL) est-il désactivé par défaut ?",
    choix: [
      "Il ralentit tout le serveur",
      "Accès au système du serveur",
      "Il ne marche pas sous Linux",
      "Il est payant en édition Standard"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La raison est la sécurité.",
      "Oui. Risque de sécurité : il donne accès au système d'exploitation du serveur. Pour manipuler des fichiers : un outil ETL, PowerShell ou un job dédié.",
      "Non. Il marche aussi sous Linux… et c'est le risque.",
      "Non. Il est inclus, pas payant."
    ],
    retenir: "xp_cmdshell : à laisser désactivé."
  },
  {
    id: "m13-q49", dialecte: "SQL Server",
    q: "Une procédure de 2 000 lignes fait tout (import, contrôle, calcul, export). Quelle amélioration ?",
    choix: [
      "Aucune, une seule procédure c'est plus simple",
      "Découper : une procédure par rôle",
      "Tout mettre dans une fonction",
      "La dupliquer pour chaque étape"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Difficile à tester et à relancer en partie.",
      "Oui. Des procédures plus petites, une par responsabilité, appelées par une procédure « chef d'orchestre ». Plus facile à tester, à relancer partiellement, à maintenir.",
      "Non. Une fonction ne peut pas modifier les données.",
      "Non. On doublerait le code à maintenir."
    ],
    retenir: "Une procédure = une responsabilité."
  },
  {
    id: "m13-q50", dialecte: "SQL Server",
    q: "Que mettre dans une table de log de traitement ?",
    choix: [
      "Seulement l'heure de fin",
      "Quoi, quand, combien, résultat",
      "Le texte complet de chaque requête",
      "Le login et le mot de passe utilisé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Insuffisant pour comprendre un échec.",
      "Oui. Nom du traitement, début, fin, statut, nombre de lignes, message d'erreur éventuel : on sait ce qui a tourné, combien de temps, avec quel volume, et pourquoi ça a échoué.",
      "Non. Trop lourd, et peu utile.",
      "Non. Jamais de mot de passe."
    ],
    retenir: "Log de traitement : qui, quand, combien, résultat."
  },
  {
    id: "m13-q51", dialecte: "SQL Server",
    q: "T-SQL accepte GOTO. Faut-il l'utiliser ?",
    choix: [
      "Oui, partout où c'est pratique",
      "Rarement",
      "Oui, il est obligatoire avec CATCH",
      "Non, il n'existe pas en T-SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le code devient difficile à suivre.",
      "Oui. Il rend le code difficile à suivre. IF / WHILE / TRY-CATCH suffisent presque toujours : le code doit pouvoir être lu de haut en bas.",
      "Non. CATCH n'a pas besoin de GOTO.",
      "Non. Il existe."
    ],
    retenir: "GOTO : à éviter."
  },
  {
    id: "m13-q52", dialecte: "SQL Server",
    q: "Quelle différence entre CASE et IF en T-SQL ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "CASE renvoie une valeur, IF enchaîne",
      "IF marche aussi dans un SELECT",
      "CASE peut exécuter un UPDATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CASE renvoie une valeur ; IF enchaîne des instructions.",
      "Oui. CASE est une expression qui renvoie une valeur (dans une requête) ; IF contrôle l'enchaînement des instructions. On ne peut pas écrire IF dans un SELECT, ni exécuter un UPDATE dans un CASE.",
      "Non. IF ne s'écrit pas dans un SELECT.",
      "Non. CASE renvoie une valeur, il n'exécute rien."
    ],
    retenir: "CASE = valeur. IF = déroulement."
  },
  {
    id: "m13-q53", dialecte: "SQL Server",
    q: "Dans une procédure, pourquoi préférer CREATE TABLE #t (…) explicite à SELECT … INTO #t ?",
    choix: [
      "C'est plus court à écrire",
      "On maîtrise types, NULL et clé",
      "SELECT INTO est interdit en procédure",
      "SELECT INTO verrouille toute la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est plus long à écrire.",
      "Oui. On maîtrise les types, NULL / NOT NULL, et on peut ajouter une clé ; SELECT INTO déduit les types (parfois trop larges ou faux). SELECT INTO reste pratique pour des besoins simples.",
      "Non. SELECT INTO est permis.",
      "Non. Il ne verrouille pas toute la base."
    ],
    retenir: "#table : structure explicite = moins de surprises."
  },
  {
    id: "m13-q54", dialecte: "SQL Server",
    q: "Tu insères des lignes dans une variable table @log, puis tu fais ROLLBACK. Que contient @log ?",
    choix: [
      "Rien, tout est annulé",
      "Toujours les lignes insérées",
      "Une erreur au ROLLBACK",
      "Seulement la dernière ligne insérée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les #tables, elles, seraient annulées.",
      "Oui. Les variables table ne sont pas concernées par le ROLLBACK. Astuce pour garder un journal d'erreurs malgré l'annulation.",
      "Non. Le ROLLBACK marche normalement.",
      "Non. Toutes les lignes restent."
    ],
    retenir: "Variable table : survit au ROLLBACK."
  },
  {
    id: "m13-q55", dialecte: "SQL Server",
    q: "Comment garder une trace de l'erreur dans une table de log permanente, alors que la transaction est annulée ?",
    choix: [
      "Insérer dans le log AVANT le ROLLBACK",
      "ROLLBACK d'abord, puis log",
      "Impossible, tout est annulé",
      "Mettre le log en NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'insertion serait annulée avec le reste.",
      "Oui. Dans le CATCH : ROLLBACK D'ABORD, puis insérer dans la table de log (hors transaction). Ou passer par une variable table pendant la transaction, puis l'écrire après.",
      "Non. ROLLBACK d'abord, puis log : c'est possible.",
      "Non. NOLOCK ne protège pas du ROLLBACK."
    ],
    retenir: "Log d'erreur : après le ROLLBACK."
  },
  {
    id: "m13-q56", dialecte: "SQL Server",
    q: "Une procédure A crée #temp puis appelle une procédure B. B peut-elle lire #temp ?",
    choix: [
      "Non, elle est privée à A",
      "Oui, elle est visible",
      "Seulement si on la nomme ##temp",
      "Seulement si B la recrée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les procédures appelées la voient.",
      "Oui. Une #table est visible dans les procédures appelées par celle qui l'a créée. Pratique, mais crée une dépendance cachée entre A et B : à documenter.",
      "Non. Pas besoin de ##.",
      "Non. La recréer en ferait une autre table."
    ],
    retenir: "#table visible vers le bas (procédures appelées)."
  },
  {
    id: "m13-q57", dialecte: "SQL Server",
    q: "Une procédure contient 3 SELECT. Que reçoit un outil ETL qui l'appelle ?",
    choix: [
      "Les 3 résultats fusionnés en un seul",
      "3 jeux de résultats séparés",
      "Une erreur : un seul SELECT permis",
      "Seulement le dernier SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils restent séparés.",
      "Oui. Beaucoup d'outils ne lisent que le premier. Une procédure appelée par un outil devrait renvoyer un seul jeu de résultats clair.",
      "Non. Plusieurs SELECT sont permis.",
      "Non. Les 3 sont renvoyés."
    ],
    retenir: "Procédure pour un outil : un seul SELECT final."
  },
  {
    id: "m13-q58", dialecte: "SQL Server",
    q: "INSERT INTO #t EXEC dbo.p_A; marche, mais p_A fait elle-même INSERT … EXEC p_B. Que se passe-t-il ?",
    choix: [
      "Ça marche, sur deux niveaux",
      "Une erreur : pas d'imbrication",
      "Seules les lignes de p_B arrivent",
      "Une boucle infinie entre p_A et p_B"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'imbrication est refusée.",
      "Oui. Un INSERT … EXEC ne peut pas être imbriqué : limite connue. Alternative : faire écrire p_A directement dans une #table créée par l'appelant.",
      "Non. Rien n'arrive : c'est une erreur.",
      "Non. C'est une erreur, pas une boucle."
    ],
    retenir: "INSERT … EXEC : pas d'imbrication."
  },
  {
    id: "m13-q59", dialecte: "SQL Server",
    q: "Le code fait souvent référence à Divalto_PROD.dbo.client. Comment éviter d'écrire ce nom en dur partout ?",
    choixCode: true,
    choix: [
      "CREATE SYNONYM dbo.erp_client FOR Divalto_PROD.dbo.client;",
      "DECLARE @base = 'Divalto_PROD'; SELECT * FROM @base.dbo.client;",
      "SELECT * INTO dbo.erp_client FROM Divalto_PROD.dbo.client;",
      "CREATE TABLE dbo.erp_client AS Divalto_PROD.dbo.client;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Si la base change de nom (test, recette), on modifie seulement le synonyme.",
      "Non. Une variable ne peut pas remplacer un nom d'objet (sauf SQL dynamique).",
      "Non. C'est une copie figée, pas un lien.",
      "Non. Syntaxe invalide sur SQL Server."
    ],
    retenir: "Synonyme = alias permanent vers un objet."
  },
  {
    id: "m13-q60", dialecte: "Standard",
    q: "Où doit vivre le code des procédures, vues et fonctions ?",
    choix: [
      "Seulement dans la base de production",
      "Dans un dépôt Git, puis déployé",
      "Sur le poste du développeur",
      "Dans un dossier partagé du réseau"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'historique, pas de retour arrière.",
      "Oui. Scripts versionnés, déployés vers les bases : on sait qui a changé quoi, et on peut revenir en arrière. La base reçoit le code ; Git le garde.",
      "Non. Perdu si le poste change ; aucun partage.",
      "Non. Pas d'historique fiable des changements."
    ],
    retenir: "Le code SQL se versionne dans Git."
  },
  {
    id: "m13-q61", dialecte: "Standard",
    q: "Une procédure contient en dur le taux de TVA 0,20 et le chemin d'un dossier d'export. Meilleure pratique ?",
    choix: [
      "C'est très bien ainsi",
      "Dans une table de paramètres",
      "En commentaire au-dessus",
      "Dans des variables en début de code"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un changement = modifier et redéployer le code.",
      "Oui. Une table (code, valeur, date d'effet) lue par la procédure : un changement = une mise à jour de données, tracée.",
      "Non. Un commentaire ne change pas la valeur utilisée.",
      "Non. Toujours dans le code : il faut redéployer pour changer."
    ],
    retenir: "Valeurs métier variables : table de paramètres."
  },
  {
    id: "m13-q62", dialecte: "SQL Server",
    q: "Pourquoi déclarer @date_debut DATE plutôt que @date_debut VARCHAR(10) dans une procédure ?",
    choix: [
      "Aucune, c'est pareil",
      "DATE refuse les dates invalides",
      "VARCHAR est interdit en paramètre",
      "DATE accepte tous les formats de texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DATE contrôle la valeur ; VARCHAR non.",
      "Oui. Le type DATE refuse les dates invalides à l'appel, évite les problèmes de format et permet des comparaisons efficaces. Avec un texte, '31/02/2026' passerait jusqu'à planter au milieu du traitement.",
      "Non. VARCHAR est permis.",
      "Non. Certains formats texte sont refusés ou mal compris."
    ],
    retenir: "Paramètres typés = erreurs détectées tôt."
  },
  {
    id: "m13-q63", dialecte: "SQL Server",
    q: "Une procédure reçoit @date_debut et @date_fin. Que faire en tout début de procédure ?",
    choixCode: true,
    choix: [
      "IF @date_fin < @date_debut PRINT 'Période invalide';",
      "IF @date_fin < @date_debut THROW 50010, 'Période invalide', 1;",
      "IF @date_fin < @date_debut RETURN;",
      "SET NOCOUNT OFF;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message passe inaperçu et le traitement continue.",
      "Oui. Valider les paramètres d'abord : message clair, aucun travail inutile.",
      "Non. On sort sans erreur : l'appelant croit que tout va bien.",
      "Non. Ça remet les messages « n lignes » : aucun contrôle."
    ],
    retenir: "Valider les paramètres en entrée."
  },
  {
    id: "m13-q64", dialecte: "SQL Server",
    q: "Tu veux construire la liste 'A1;B2;C3' à partir d'une table. Que préférer à une boucle qui concatène ligne par ligne ?",
    choixCode: true,
    choix: [
      "SELECT @liste += code + ';' FROM … ORDER BY …",
      "SELECT @liste = STRING_AGG(code, ';') FROM …",
      "SELECT @liste = CONCAT(code, ';') FROM …",
      "SELECT @liste = SUM(code + ';') FROM …"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Concaténation dans une variable : résultat non garanti, surtout avec ORDER BY.",
      "Oui. Une seule instruction (SQL Server 2017+).",
      "Non. Garde seulement la valeur d'une ligne.",
      "Non. SUM ne marche pas sur du texte."
    ],
    retenir: "Concaténer des lignes : STRING_AGG."
  },
  {
    id: "m13-q65", dialecte: "SQL Server",
    q: "Différence entre CREATE PROCEDURE … WITH RECOMPILE et OPTION (RECOMPILE) sur une requête ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "Toute la procédure vs une requête",
      "OPTION (RECOMPILE) est interdit en procédure",
      "WITH RECOMPILE accélère toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La portée diffère.",
      "Oui. WITH RECOMPILE recompile TOUTE la procédure à chaque appel ; OPTION (RECOMPILE) seulement la requête concernée. Préfère OPTION (RECOMPILE) sur la seule requête sensible.",
      "Non. OPTION (RECOMPILE) est permis.",
      "Non. Recompiler coûte du CPU à chaque appel."
    ],
    retenir: "Recompilation ciblée : OPTION (RECOMPILE)."
  },
  {
    id: "m13-q66", dialecte: "SQL Server",
    q: "À quoi sert EXECUTE AS OWNER dans la définition d'une procédure ?",
    choix: [
      "À changer de base de données",
      "À emprunter les droits du propriétaire",
      "À créer un utilisateur temporaire",
      "À exécuter sous le compte administrateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça ne change pas de base.",
      "Oui. La procédure s'exécute avec les droits de son propriétaire : utile pour une action précise que l'appelant n'a pas le droit de faire. À utiliser avec prudence : la procédure doit être bien contrôlée.",
      "Non. Ça ne crée pas d'utilisateur.",
      "Non. Les droits du propriétaire, pas forcément ceux d'un admin."
    ],
    retenir: "EXECUTE AS = droits empruntés, à encadrer."
  },
  {
    id: "m13-q67", dialecte: "SQL Server",
    q: "Dans un script de déploiement exécuté en mode SQLCMD, à quoi sert :setvar BaseCible Divalto_RECETTE ?",
    choix: [
      "À créer une base de recette",
      "Une variable de script $(BaseCible)",
      "À déclarer une variable T-SQL",
      "À changer de base comme USE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle définit un texte, elle ne crée rien.",
      "Oui. Variable de script, utilisée ensuite comme $(BaseCible) : le même script sert pour recette et production. Remplacement de texte avant l'exécution.",
      "Non. Ce n'est pas un @.",
      "Non. Elle définit un texte ; c'est USE $(BaseCible) qui change de base."
    ],
    retenir: "SQLCMD :setvar = paramètre de script de déploiement."
  },
  {
    id: "m13-q68", dialecte: "SQL Server",
    q: "Que signifie la gravité (severity) d'une erreur SQL Server ?",
    choix: [
      "Le nombre de lignes touchées",
      "Le niveau, de l'info au critique",
      "La durée de l'erreur en secondes",
      "Le numéro de ligne de l'erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le niveau de gravité.",
      "Oui. 0-10 : information ; 11-16 : erreur corrigeable par l'utilisateur ; 17-19 : ressources ; 20+ : grave, connexion coupée. THROW lève en gravité 16. Les messages ≤ 10 ne déclenchent pas le CATCH.",
      "Non. C'est le niveau de gravité.",
      "Non. C'est ERROR_LINE()."
    ],
    retenir: "Gravité ≤ 10 = info ; 16 = erreur classique ; 20+ = critique."
  },
  {
    id: "m13-q69", dialecte: "SQL Server",
    q: "Une procédure renvoie un résultat faux. Méthode simple pour trouver l'étape fautive ?",
    choix: [
      "Tout réécrire depuis le début",
      "Afficher chaque étape",
      "Ajouter NOLOCK partout",
      "Relancer jusqu'à ce que ça marche"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop long ; on ne sait pas où est l'erreur.",
      "Oui. Ajouter temporairement des SELECT (ou PRINT) des tables intermédiaires et des variables après chaque étape. Penser à les retirer ensuite (ou les conditionner à un paramètre @debug).",
      "Non. NOLOCK ne corrige pas un calcul.",
      "Non. Un résultat faux reste faux."
    ],
    retenir: "Déboguer = afficher les étapes intermédiaires."
  },
  {
    id: "m13-q70", dialecte: "SQL Server",
    q: "Comment tester une procédure de calcul de remise de façon fiable et répétable ?",
    choix: [
      "La lancer en production et regarder",
      "Données connues, résultat attendu",
      "Demander à l'utilisateur de valider",
      "Relire le code attentivement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Dangereux et pas répétable.",
      "Oui. Préparer un jeu de données de test connu, l'exécuter, comparer au résultat attendu (des outils comme tSQLt automatisent ces tests). Les tests rejouables évitent les régressions.",
      "Non. Ni fiable, ni répétable.",
      "Non. Utile, mais pas répétable."
    ],
    retenir: "Tests : données connues + résultat attendu."
  },
  {
    id: "m13-q71", dialecte: "Snowflake",
    q: "Quelle est la structure d'un bloc Snowflake Scripting ?",
    choixCode: true,
    choix: [
      "BEGIN TRY … END TRY BEGIN CATCH … END CATCH",
      "DECLARE … BEGIN … EXCEPTION … END;",
      "TRY { … } CATCH { … }",
      "BEGIN … ON ERROR … END;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Déclarations (facultatives), corps, gestion d'erreurs (facultative).",
      "Non. Syntaxe d'autres langages.",
      "Non. ON ERROR n'existe pas ici."
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
      "Non. Syntaxe SQL Server.",
      "Non. VAR n'existe pas ici."
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
      "Non. nb_jours n'est pas une fonction."
    ],
    retenir: "Variable de script dans le SQL : :nom."
  },
  {
    id: "m13-q74", dialecte: "Snowflake",
    q: "Quelle est la forme d'une procédure Snowflake en SQL ?",
    choixCode: true,
    choix: [
      "CREATE PROCEDURE p @a INT AS BEGIN … END",
      "CREATE PROCEDURE p(a INT) RETURNS VARCHAR LANGUAGE SQL AS $$ … $$",
      "CREATE PROCEDURE p(a INT) AS BEGIN … RETURN 'OK'; END;",
      "CREATE FUNCTION p(a INT) RETURNS VARCHAR AS $$ … $$"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Type de retour obligatoire, langage précisé, corps entre $$ (ex. $$ BEGIN … RETURN 'OK'; END; $$).",
      "Non. Il manque RETURNS (obligatoire) et les $$.",
      "Non. Ça crée une fonction, pas une procédure."
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
      "Non. RUN n'existe pas sur Snowflake.",
      "Non. SELECT appelle une fonction, pas une procédure."
    ],
    retenir: "Snowflake : CALL procédure(…)."
  },
  {
    id: "m13-q76", dialecte: "Snowflake",
    q: "Sur Snowflake, comment exécuter une requête construite dans une chaîne ?",
    choixCode: true,
    choix: [
      "EXEC (:sql);",
      "EXECUTE IMMEDIATE :sql;",
      "CALL sp_executesql(:sql);",
      "RUN :sql;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe proche de SQL Server, invalide ici.",
      "Oui. Avec USING (…) pour passer des valeurs en paramètres (contre l'injection).",
      "Non. sp_executesql est propre à SQL Server.",
      "Non. RUN n'existe pas sur Snowflake."
    ],
    retenir: "SQL dynamique Snowflake : EXECUTE IMMEDIATE."
  },
  {
    id: "m13-q77", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment récupérer le message d'une erreur attrapée ?",
    choixCode: true,
    choix: [
      "BEGIN CATCH RETURN ERROR_MESSAGE(); END CATCH",
      "EXCEPTION WHEN OTHER THEN RETURN SQLERRM;",
      "EXCEPTION WHEN OTHER THEN RETURN @@ERROR;",
      "CATCH (e) RETURN e.message;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. SQLERRM = message, SQLCODE = code, SQLSTATE = état.",
      "Non. @@ERROR n'existe pas sur Snowflake.",
      "Non. Syntaxe d'autres langages."
    ],
    retenir: "Snowflake : EXCEPTION WHEN OTHER + SQLERRM."
  },
  {
    id: "m13-q78", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment lever une erreur métier personnalisée ?",
    choixCode: true,
    choix: [
      "THROW 50001, 'Période invalide', 1;",
      "DECLARE e EXCEPTION (-20001, 'Période invalide'); … RAISE e;",
      "SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Période invalide';",
      "RETURN 'Période invalide';"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. On déclare l'exception (numéro entre -20000 et -20999), puis RAISE.",
      "Non. Syntaxe MySQL.",
      "Non. Un retour n'arrête pas l'appelant."
    ],
    retenir: "Snowflake : DECLARE … EXCEPTION puis RAISE."
  },
  {
    id: "m13-q79", dialecte: "Snowflake",
    q: "En Snowflake Scripting, comment parcourir les lignes d'une requête ?",
    choixCode: true,
    choix: [
      "WHILE @@FETCH_STATUS = 0 BEGIN … END",
      "FOR ligne IN c DO … END FOR;",
      "FOREACH ROW IN c LOOP … END LOOP;",
      "FETCH NEXT FROM c INTO :ligne;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server.",
      "Oui. Avec c déclaré avant : DECLARE c CURSOR FOR SELECT …; Mais comme sur SQL Server : à réserver aux actions vraiment unitaires.",
      "Non. Syntaxe inventée.",
      "Non. Lit une seule ligne : il faudrait une boucle autour."
    ],
    retenir: "Snowflake : FOR … IN curseur DO … END FOR."
  },
  {
    id: "m13-q80", dialecte: "Snowflake",
    q: "Une procédure Snowflake s'exécute par défaut avec les droits de qui ?",
    choix: [
      "De l'appelant, toujours",
      "Du propriétaire (OWNER)",
      "De l'administrateur du compte",
      "Du rôle PUBLIC, par sécurité"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement si on précise EXECUTE AS CALLER.",
      "Oui. EXECUTE AS OWNER par défaut ; on peut choisir EXECUTE AS CALLER. OWNER : l'appelant n'a pas besoin de droits sur les tables. CALLER : il les lui faut.",
      "Non. Les droits du propriétaire, pas de l'administrateur.",
      "Non. Les droits du propriétaire."
    ],
    retenir: "Snowflake : droits du propriétaire par défaut."
  },
  {
    id: "m13-q81", dialecte: "Snowflake",
    q: "Tu crées une TASK Snowflake planifiée chaque nuit. Elle ne s'exécute jamais. Oubli classique ?",
    choixCode: true,
    choix: [
      "ALTER WAREHOUSE mon_wh RESUME;",
      "ALTER TASK ma_task RESUME;",
      "GRANT EXECUTE TASK TO ROLE sysadmin;",
      "ALTER TASK ma_task SET SCHEDULE = 'DAILY';"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le warehouse reprend seul (auto-resume).",
      "Oui. Une task est créée suspendue : il faut l'activer explicitement après création.",
      "Non. Même avec ce droit, la task reste suspendue.",
      "Non. Le planning existe déjà ; la task reste suspendue."
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
      "Non. Une boucle ne sait pas quand l'autre task a fini.",
      "Non. AFTER le permet."
    ],
    retenir: "Tasks enchaînées : AFTER."
  },
  {
    id: "m13-q83", dialecte: "Snowflake",
    q: "Une task Snowflake peut-elle s'exécuter sans warehouse dédié ?",
    choix: [
      "Non, un warehouse est toujours requis",
      "Oui : tasks « serverless »",
      "Oui, et c'est gratuit",
      "Seulement pour les tasks SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les tasks serverless n'en ont pas besoin.",
      "Oui. Elles utilisent des ressources gérées par Snowflake (facturées à l'usage). Pratique pour de petites tâches fréquentes.",
      "Non. Ce n'est pas gratuit.",
      "Non. Ça ne dépend pas du langage."
    ],
    retenir: "Tasks serverless : sans warehouse à gérer."
  },
  {
    id: "m13-q84", dialecte: "Snowflake",
    q: "Comment traiter seulement les nouvelles lignes d'une table, toutes les 10 minutes, sur Snowflake ?",
    choix: [
      "Relire toute la table à chaque fois",
      "Un STREAM + une TASK",
      "Un trigger AFTER INSERT",
      "Un index sur la date d'insertion"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Coûteux.",
      "Oui. Le STREAM capte les changements ; la TASK le consomme quand il a des données (WHEN SYSTEM$STREAM_HAS_DATA('mon_stream')).",
      "Non. Pas de triggers sur Snowflake.",
      "Non. Pas d'index classiques sur Snowflake."
    ],
    retenir: "Incrémental Snowflake : STREAM + TASK."
  },
  {
    id: "m13-q85", dialecte: "Snowflake",
    q: "Comment créer une fonction SQL simple sur Snowflake (prix TTC) ?",
    choixCode: true,
    choix: [
      "CREATE FUNCTION ttc(ht NUMBER) RETURNS NUMBER AS 'ht * 1.2';",
      "CREATE PROCEDURE ttc(ht NUMBER) RETURNS NUMBER AS 'ht * 1.2';",
      "CREATE FUNCTION ttc(@ht NUMBER) AS RETURN @ht * 1.2;",
      "DEFINE ttc(ht) = ht * 1.2;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Fonction utilisable dans un SELECT : SELECT ttc(montant) FROM …",
      "Non. Une procédure ne s'utilise pas dans un SELECT.",
      "Non. Syntaxe proche de SQL Server, invalide ici.",
      "Non. DEFINE n'existe pas."
    ],
    retenir: "Snowflake : CREATE FUNCTION … AS 'expression'."
  },
  {
    id: "m13-q86", dialecte: "Snowflake",
    q: "En plus de SQL, dans quels langages peut-on écrire des procédures Snowflake ?",
    choix: [
      "Aucun autre que SQL",
      "JavaScript, Python, Java, Scala",
      "C# et VB.NET seulement",
      "PL/SQL et COBOL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Python, Java, JavaScript et Scala sont acceptés.",
      "Oui. Python est pratique pour des traitements de données complexes (avec Snowpark).",
      "Non. Pas de C# ni de VB.NET.",
      "Non. Ni PL/SQL ni COBOL."
    ],
    retenir: "Snowflake : procédures SQL, JavaScript, Python…"
  },
  {
    id: "m13-q87", dialecte: "Snowflake",
    q: "Comment une procédure Snowflake peut-elle renvoyer un tableau de lignes ?",
    choixCode: true,
    choix: [
      "RETURNS VARCHAR … RETURN 'lignes';",
      "RETURNS TABLE (…) … RETURN TABLE(res);",
      "SELECT … à la fin, comme SQL Server",
      "RETURNS ARRAY … RETURN ARRAY_AGG(*);"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une seule valeur.",
      "Oui. RETURNS TABLE (code VARCHAR, ca NUMBER) … LET res RESULTSET := (SELECT …); RETURN TABLE(res); On déclare la structure du tableau renvoyé.",
      "Non. Sur Snowflake, il faut déclarer RETURNS TABLE.",
      "Non. Renvoie une seule valeur (un tableau), pas des lignes."
    ],
    retenir: "Snowflake : RETURNS TABLE + RETURN TABLE(resultset)."
  },
  {
    id: "m13-q88", dialecte: "Snowflake",
    q: "Snowflake Scripting n'a pas de PRINT. Comment suivre l'avancement d'un traitement ?",
    choix: [
      "Impossible sur Snowflake",
      "Écrire dans une table de log",
      "PRINT marche quand même",
      "Regarder l'activité du warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table de log le permet.",
      "Oui. Ou la journalisation par table d'événements, et renvoyer un résumé en valeur de retour. Une table de log est de toute façon une bonne pratique, sur les deux moteurs.",
      "Non. PRINT n'existe pas sur Snowflake.",
      "Non. On voit la charge, pas l'avancement."
    ],
    retenir: "Snowflake : log en table, pas de PRINT."
  },
  {
    id: "m13-q89", dialecte: "Snowflake",
    q: "Dans une procédure Snowflake, comment rendre plusieurs modifications « tout ou rien » ?",
    choixCode: true,
    choix: [
      "BEGIN TRAN … COMMIT TRAN",
      "BEGIN TRANSACTION; … COMMIT;",
      "SAVEPOINT s1; … RELEASE SAVEPOINT s1;",
      "BEGIN ATOMIC … END;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe SQL Server.",
      "Oui. Et ROLLBACK dans le bloc EXCEPTION. Attention : pas d'instruction DDL au milieu (COMMIT implicite).",
      "Non. Pas de SAVEPOINT sur Snowflake.",
      "Non. Syntaxe d'autres moteurs."
    ],
    retenir: "Snowflake : BEGIN TRANSACTION … COMMIT, ROLLBACK dans EXCEPTION."
  },
  {
    id: "m13-q90", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi servent SET seuil = 1000; puis WHERE montant > $seuil ?",
    choix: [
      "À créer une colonne seuil",
      "Une variable de session ($seuil)",
      "À créer un paramètre de procédure",
      "À définir une constante permanente"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle crée une variable, pas une colonne.",
      "Oui. Variable de SESSION, utilisable dans les requêtes suivantes avec $. Pratique dans une feuille de calcul Snowsight. Dans une procédure, on utilise plutôt LET et :var.",
      "Non. Elle vit dans la session, pas dans une procédure.",
      "Non. Elle disparaît à la fin de la session."
    ],
    retenir: "Snowflake : SET v = … ; $v (variable de session)."
  },
  {
    id: "m13-q91", dialecte: "SQL Server + Snowflake",
    q: "Tu migres une procédure T-SQL vers Snowflake. Que faut-il réécrire au minimum ?",
    choix: [
      "Rien, la syntaxe est la même",
      "Presque toute la syntaxe",
      "Seulement le nom de la procédure",
      "Seulement les commentaires et les GO"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux syntaxes sont très différentes.",
      "Oui. La structure (CREATE PROCEDURE … $$), les @variables, TRY/CATCH, les fonctions propres à SQL Server (GETDATE, ISNULL, TOP…), les #tables. La logique reste. C'est l'occasion de passer en « ensembliste ».",
      "Non. Le corps aussi doit être réécrit.",
      "Non. Le code lui-même doit changer."
    ],
    retenir: "Migration T-SQL → Snowflake : syntaxe à réécrire."
  },
  {
    id: "m13-q92", dialecte: "SQL Server + Snowflake",
    q: "Quelles traductions SQL Server → Snowflake sont correctes ?",
    choix: [
      "GETDATE() → NOW() ; TOP → ROWNUM",
      "ISNULL → COALESCE ; #t → TEMPORARY TABLE",
      "ISNULL → ISNULL ; #t → #t",
      "Aucune traduction n'est nécessaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. ROWNUM vient d'Oracle.",
      "Oui. Aussi GETDATE() → CURRENT_TIMESTAMP, TOP (n) → LIMIT n. Les fonctions standard (COALESCE, CURRENT_TIMESTAMP, CASE) simplifient les migrations.",
      "Non. Ni ISNULL ni les #tables n'existent sur Snowflake.",
      "Non. Beaucoup de fonctions diffèrent."
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
      "Non. VOLATILE n'existe pas sur Snowflake."
    ],
    retenir: "Snowflake : TEMPORARY TABLE."
  },
  {
    id: "m13-q94", dialecte: "Snowflake",
    q: "Pourquoi une boucle qui exécute 10 000 petites requêtes est-elle encore plus pénalisante sur Snowflake que sur SQL Server ?",
    choix: [
      "Elle ne l'est pas, c'est pareil",
      "Un coût fixe par instruction",
      "Snowflake interdit les boucles",
      "À cause des index Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le coût fixe est plus élevé sur Snowflake.",
      "Oui. Chaque instruction a un coût fixe (compilation, coordination dans le cloud) : 10 000 instructions = beaucoup de temps et de crédits. Snowflake excelle sur quelques grosses requêtes.",
      "Non. Les boucles sont permises.",
      "Non. Pas d'index classiques sur Snowflake."
    ],
    retenir: "Snowflake : peu de grosses requêtes, pas beaucoup de petites."
  },
  {
    id: "m13-q95", dialecte: "Standard",
    q: "Lors d'une relecture de code SQL (revue), que vérifier en priorité ?",
    choix: [
      "La mise en forme et les majuscules",
      "Juste, sûr, rapide, lisible",
      "Le nombre de lignes de code",
      "Les noms des variables seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça vient en dernier.",
      "Oui. Dans cet ordre : résultat juste (jointures, NULL, doublons), sûr (erreurs, transactions, injection), rapide (SARGable, ensembliste), lisible.",
      "Non. La longueur ne dit rien de la qualité.",
      "Non. Les noms comptent, mais pas en premier."
    ],
    retenir: "Revue : juste, sûr, rapide, lisible."
  },
  {
    id: "m13-q96", dialecte: "Standard",
    q: "Quel nom de procédure est le plus clair ?",
    choix: [
      "dbo.proc1",
      "dbo.p_integrer_commandes_edi",
      "dbo.sp_traitement_des_commandes",
      "dbo.p_traitement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On ne sait pas ce qu'elle fait.",
      "Oui. Préfixe cohérent + verbe + objet : on sait ce qu'elle fait sans l'ouvrir.",
      "Non. Préfixe sp_ et nom vague.",
      "Non. « traitement » de quoi ?"
    ],
    retenir: "Nom = verbe + objet."
  },
  {
    id: "m13-q97", dialecte: "SQL Server",
    q: "Pour signaler un échec, pourquoi THROW est-il plus sûr que RETURN -1 ?",
    choix: [
      "Il est plus court à écrire",
      "On ne peut pas l'ignorer",
      "RETURN est interdit dans un CATCH",
      "RETURN -1 annule la transaction"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La longueur n'est pas la raison.",
      "Oui. Un code de retour est souvent ignoré par l'appelant ; une erreur levée arrête le traitement et est vue par l'Agent SQL, l'ETL ou l'application.",
      "Non. RETURN est permis dans un CATCH.",
      "Non. RETURN n'annule rien."
    ],
    retenir: "Échec = erreur levée, pas un code ignorable."
  },
  {
    id: "m13-q98", dialecte: "SQL Server",
    q: "Une étape de job échoue parfois à cause d'un deadlock. Quelle option simple de l'Agent SQL aide ?",
    choix: [
      "Aucune option ne le permet",
      "Les tentatives de l'étape",
      "Passer l'étape en NOLOCK",
      "Supprimer et recréer le job"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les tentatives de l'étape le permettent.",
      "Oui. « Retry attempts », avec un délai entre deux essais. À condition que la procédure soit relançable sans doublon (idempotente).",
      "Non. NOLOCK n'empêche pas les deadlocks d'écriture.",
      "Non. Ça ne règle rien."
    ],
    retenir: "Job : tentatives automatiques + procédure idempotente."
  },
  {
    id: "m13-q99", dialecte: "Standard",
    q: "Que mettre dans l'en-tête de commentaire d'une procédure ?",
    choix: [
      "Rien, le code suffit",
      "Objectif, paramètres, effets, règles",
      "L'historique de toutes les versions",
      "Le login et le mot de passe utilisés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le contexte et les règles ne se lisent pas dans le code.",
      "Oui. Son objectif, ses paramètres, ce qu'elle modifie, les tables lues, et les cas particuliers / règles métier.",
      "Non. L'historique est dans Git.",
      "Non. Jamais de secret dans le code."
    ],
    retenir: "En-tête : objectif, paramètres, effets, règles."
  },
  {
    id: "m13-q100", dialecte: "Standard",
    q: "Quelle liste résume une bonne procédure stockée ?",
    choix: [
      "Longue, avec des curseurs",
      "Typée, ensembliste, protégée, tracée",
      "Sans gestion d'erreur, pour aller vite",
      "Avec des valeurs en dur, plus simple"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Longue et lente.",
      "Oui. SET NOCOUNT ON, paramètres typés et validés, ensembliste, transaction + XACT_ABORT + TRY/CATCH + THROW, log, relançable, versionnée : le standard attendu en production.",
      "Non. Les erreurs passeraient inaperçues.",
      "Non. Il faudrait redéployer pour chaque changement."
    ],
    retenir: "Procédure pro : typée, ensembliste, protégée, tracée, versionnée."
  }
];
