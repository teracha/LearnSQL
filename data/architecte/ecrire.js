// Conseils d'architecte, famille « Écrire et charger » (format : docs/architecte.md).
// Expert « Écrire et charger », 16/11/2026. Chaque règle propre à un moteur vient de sa doc officielle (pages gardées
// dans le scratchpad architecte/ecrire/pages) : Microsoft Learn (sql-server-ver17), docs.snowflake.com, MySQL 8.4.
// Essais refaits sur MySQL 8.0.46 (serveur de la session, base jetable essai_ecrire) : code = 0 sur une colonne texte
// (SELECT : 3 lignes et des avertissements ; UPDATE en mode strict : erreur 1292), texte trop long (1406 ; coupé avec
// INSERT IGNORE ou sans mode strict, avertissement 1265), '12/03/2026' et '' dans un DATE (1292), 12.345 dans un
// DECIMAL(10,2) = 12.35 (note 1265), SET de gauche à droite, ROW_COUNT() = 0 pour une valeur identique, sous-requête sur
// la table supprimée (1093), sql_safe_updates (1175), BOM ignoré par le client, arrêt à la 1re erreur sans --force,
// DDL dans une transaction = COMMIT implicite, LOAD DATA LOCAL (refusé : 3948 serveur, 2068 client ; accepté : '125,50'
// → 125.00, '12/03/2026' → 0000-00-00, 'x' et '' → 0, avec avertissements), LOAD DATA sans LOCAL (1re erreur : tout
// est annulé), fichier hors secure_file_priv (1290). SQL générique vérifié avec SQLite sur docs/base-exemple.sql.
LEARNSQL.architecte = (LEARNSQL.architecte || []).concat([
  {
    id: "ecrire-valeur",
    titre: "J'écris une valeur dans une requête",
    famille: "Écrire et charger",
    resume: "Les questions à te poser avant d'écrire une date, un nombre, un texte ou NULL dans une requête : le format, le type de la colonne, les apostrophes, le paramètre.",
    besoins: [
      "j'écris une valeur dans une requête",
      "comment écrire une date en dur dans un where",
      "écrire un texte avec une apostrophe en sql",
      "quel format pour écrire une date ou un montant"
    ],
    essais: [
      "format date sql server 20260312 ou 12/03/2026",
      "mettre une valeur en dur dans la requete",
      "l'isle adam apostrophe erreur de syntaxe",
      "N devant le texte unicode"
    ],
    exemple: {
      texte: "Tu cherches les commandes EDI des clients de L'Isle-Adam, passées depuis le 1er mars 2026, de plus de 1 500,50 € HT. Trois valeurs à écrire : un texte avec une apostrophe, une date, un montant à virgule. Voici la requête, écrite sans piège.",
      code: "SELECT c.num_cde, c.date_cde, c.montant_ht\nFROM dbo.commande AS c\nJOIN dbo.client AS cl ON cl.id = c.client_id\nWHERE cl.ville = 'L''Isle-Adam'     -- l'apostrophe doublée\n  AND c.date_cde >= '20260301'       -- AAAAMMJJ : lu pareil dans toutes les langues\n  AND c.montant_ht > 1500.50         -- un point, sans guillemets ni espace\n  AND c.canal = 'EDI';               -- un code : du texte, entre apostrophes",
      codes: {
        snowflake: "SELECT c.num_cde, c.date_cde, c.montant_ht\nFROM ventes.commande AS c\nJOIN ventes.client AS cl ON cl.id = c.client_id\nWHERE cl.ville = 'L''Isle-Adam'     -- l'apostrophe doublée\n  AND c.date_cde >= '2026-03-01'     -- AAAA-MM-JJ ; jamais '20260301' ici\n  AND c.montant_ht > 1500.50\n  AND c.canal = 'EDI';               -- la casse compte : 'edi' ne trouve rien",
        mysql: "SELECT c.num_cde, c.date_cde, c.montant_ht\nFROM commande AS c\nJOIN client AS cl ON cl.id = c.client_id\nWHERE cl.ville = 'L''Isle-Adam'     -- l'apostrophe doublée\n  AND c.date_cde >= '2026-03-01'     -- AAAA-MM-JJ : l'année d'abord\n  AND c.montant_ht > 1500.50\n  AND c.canal = 'EDI';"
      }
    },
    etapes: [
      {
        titre: "La colonne d'abord",
        questions: [
          {
            id: "type-colonne",
            q: "Quel est le type exact de la colonne que tu compares ou que tu remplis ?",
            pourquoi: "Une valeur d'un autre type force une conversion. Selon le moteur, la requête plante, devient lente ou compare de travers, sans message.",
            reflexe: "Lis la définition de la colonne, puis écris la valeur dans ce type : un code texte entre apostrophes ('0123'), une date au bon format, un nombre sans apostrophes.",
            moteurs: {
              sqlserver: "`EXEC sp_help 'dbo.commande';`, ou le dossier Colonnes de la table dans SSMS.",
              snowflake: "`DESCRIBE TABLE ventes.commande;`. Dans `information_schema`, les noms écrits sans guillemets sont en MAJUSCULES : `table_name = 'COMMANDE'`.",
              mysql: "`DESCRIBE commande;`, ou `SHOW CREATE TABLE commande;` pour voir aussi le jeu de caractères."
            }
          },
          {
            id: "texte-nombre",
            q: "Compares-tu une colonne texte à un nombre, ou une colonne nombre à un texte ?",
            pourquoi: "Le moteur convertit seul : c'est la conversion implicite. Souvent, il convertit la colonne, ligne par ligne : l'index (la table des matières de la table) ne sert plus, et une seule valeur non numérique peut tout faire planter.",
            reflexe: "Écris la valeur dans le type de la colonne. `siren` est un texte : `siren = '423456789'`, pas `siren = 423456789`. Dans Divalto, `CE4 = '1'`, pas `CE4 = 1`.",
            moteurs: {
              sqlserver: "Le nombre a la priorité : toute la colonne `siren` est convertie en INT. Un SIREN avec une lettre donne l'erreur 245. Le plan d'exécution (le chemin choisi par le moteur) montre `CONVERT_IMPLICIT`.",
              snowflake: "Snowflake essaie lui aussi de changer le texte en nombre : un code comme 'C001' fait échouer la requête.",
              mysql: "Texte et nombre sont comparés comme des nombres à virgule : `code = 0` est vrai pour 'C001', avec un simple avertissement. L'index ne sert plus (doc MySQL)."
            }
          }
        ]
      },
      {
        titre: "Les dates",
        questions: [
          {
            id: "date-format",
            q: "Ta date est-elle écrite dans un format que le moteur lit toujours de la même façon ?",
            pourquoi: "Une même date écrite peut être lue de plusieurs façons. Le 12/03 devient le 3 décembre, sans erreur : la requête rend d'autres commandes, et personne ne le voit.",
            reflexe: "Prends le format sûr de ton moteur et garde-le dans tous tes scripts. Une date reçue dans un autre format se convertit avec ce format écrit en toutes lettres.",
            moteurs: {
              sqlserver: "`'20260312'` (AAAAMMJJ) : lu pareil, quelles que soient la langue et `SET DATEFORMAT`. Avec l'heure : `'2026-03-12T14:30:00'`, avec le T.",
              snowflake: "`'2026-03-12'` (AAAA-MM-JJ). Jamais `'20260312'` : une chaîne de chiffres est lue comme des secondes depuis 1970 (le 23/08/1970), sans erreur.",
              mysql: "`'2026-03-12'` (AAAA-MM-JJ) ; `'20260312'` passe aussi. L'année vient toujours en premier."
            }
          },
          {
            id: "date-jjmmaaaa",
            q: "Ta date arrive-t-elle au format JJ/MM/AAAA, comme dans un fichier ou une saisie ?",
            pourquoi: "Ce format change de sens selon le moteur et ses réglages. Le 12/03/2026 peut devenir le 3 décembre, et le 22/10/2026 faire planter la requête (il n'y a pas de mois 22).",
            reflexe: "Ne laisse jamais le moteur deviner : convertis avec le format écrit. Exemple sur SQL Server : `CONVERT(date, '12/03/2026', 103)`, où 103 veut dire jour/mois/année.",
            moteurs: {
              sqlserver: "Sans style, tout dépend de la langue de la connexion et de `SET DATEFORMAT` : en français jour/mois, en anglais mois/jour. Le style 103 lit toujours jour/mois/année.",
              snowflake: "En format automatique (AUTO), une date avec des / est lue mois/jour/année : 05/02/2026 = 2 mai. Écris `TO_DATE('12/03/2026', 'DD/MM/YYYY')`.",
              mysql: "Refusée en mode strict, le réglage par défaut qui refuse une valeur invalide (« Incorrect date value »). Écris `STR_TO_DATE('12/03/2026', '%d/%m/%Y')` ; un texte qui ne colle pas au format donne NULL."
            }
          },
          {
            id: "date-datetime",
            q: "Ta colonne est-elle en DATETIME, l'ancien type date et heure de SQL Server ?",
            pourquoi: "Pour DATETIME, `'2026-03-12'` dépend de la langue : sur une connexion en français, il devient le 3 décembre. Le type DATE, lui, lit ce format toujours pareil.",
            reflexe: "Avec DATETIME, écris `'20260312'` ou `'2026-03-12T00:00:00'`, avec le T. Pour une nouvelle colonne, préfère DATE ou DATETIME2.",
            seulement: ["sqlserver"]
          },
          {
            id: "annee-2-chiffres",
            q: "Ta date a-t-elle une année sur deux chiffres, comme le format EDI 101 (AAMMJJ) ?",
            pourquoi: "Le moteur choisit le siècle à ta place, et pas pareil partout : 55 donne 1955 sur SQL Server, mais 2055 sur Snowflake et MySQL.",
            reflexe: "Passe toi-même l'année à 4 chiffres, avec la règle du métier : « 20 » devant, pour des commandes récentes (260312 → 20260312). Puis convertis avec le format à 4 chiffres.",
            moteurs: {
              sqlserver: "Le siècle suit l'option du serveur « two digit year cutoff » (2049 par défaut) : 49 donne 2049, 50 donne 1950.",
              snowflake: "Le siècle suit le paramètre `TWO_DIGIT_CENTURY_START` (1970 par défaut) : 69 donne 2069, 70 donne 1970.",
              mysql: "00 à 69 donnent 2000 à 2069 ; 70 à 99 donnent 1970 à 1999."
            }
          },
          {
            id: "fin-periode",
            q: "Ta borne de fin prend-elle toute la dernière journée, heures comprises ?",
            pourquoi: "Une borne « jusqu'au 16 mars » écrite avec `<=` s'arrête le 16 mars à 0 h 00 : le flux EDI reçu ce jour-là à 6 h 05 n'est pas compté.",
            reflexe: "Écris une borne de fin exclue : à partir du 1er mars inclus (`>=`), avant le 1er avril (`<`). Elle marche pour une date seule comme pour une date avec heure.",
            moteurs: {
              sqlserver: "`date_recu >= '20260301' AND date_recu < '20260401'`",
              snowflake: "`date_recu >= '2026-03-01' AND date_recu < '2026-04-01'`",
              mysql: "`date_recu >= '2026-03-01' AND date_recu < '2026-04-01'`"
            }
          },
          {
            id: "heure-fuseau",
            q: "La valeur a-t-elle une heure, et dans quel fuseau horaire est-elle ?",
            pourquoi: "Un flux reçu à 0 h 30 à Paris est encore la veille en UTC (le temps universel). Comparés sans précaution, les horaires de deux sources se décalent d'une ou deux heures.",
            reflexe: "Range les horodatages en UTC, ou avec leur décalage, et convertis seulement à l'affichage. Dis le fuseau dans le nom de la colonne : `recu_le_utc`.",
            moteurs: {
              sqlserver: "`SYSUTCDATETIME()` donne l'heure UTC ; `GETDATE()`, celle du serveur. Pour l'heure de Paris : `AT TIME ZONE 'Romance Standard Time'`.",
              snowflake: "Le fuseau de la session (`TIMEZONE`) vaut America/Los_Angeles par défaut : `CURRENT_TIMESTAMP()` donne alors l'heure de Los Angeles. Règle-le : `ALTER SESSION SET TIMEZONE = 'Europe/Paris';`.",
              mysql: "Une colonne `TIMESTAMP` est convertie selon le fuseau de la connexion (`time_zone`) ; une colonne `DATETIME`, jamais."
            }
          }
        ]
      },
      {
        titre: "Les nombres",
        questions: [
          {
            id: "point-decimal",
            q: "Tes décimales sont-elles écrites avec un point, sans espace ni guillemets ?",
            pourquoi: "En SQL, la virgule sépare deux valeurs : `SELECT 1500,50` rend deux colonnes, 1500 et 50. Dans un WHERE, c'est une erreur de syntaxe.",
            reflexe: "Écris `1500.50`, sans séparateur de milliers ni symbole €. Un montant français reçu en texte se convertit après remplacement de la virgule : `REPLACE('1500,50', ',', '.')`."
          },
          {
            id: "precision",
            q: "La valeur tient-elle dans la colonne : nombre de chiffres et de décimales ?",
            pourquoi: "Trop de décimales sont arrondies sans prévenir : 12,345 devient 12,35 dans un `DECIMAL(10,2)`. Trop de chiffres avant la virgule : erreur de dépassement.",
            reflexe: "Compare la valeur au type : `DECIMAL(10,2)` garde 8 chiffres avant la virgule et 2 après. Arrondis toi-même, avec la règle du métier : `ROUND(prix, 2)`.",
            moteurs: {
              sqlserver: "Arrondi sans message. Trop grand : erreur 8115 (dépassement arithmétique).",
              mysql: "Arrondi, avec une simple note (1265, « Data truncated »). Trop grand : erreur en mode strict."
            }
          }
        ]
      },
      {
        titre: "Les textes",
        questions: [
          {
            id: "apostrophe",
            q: "Le texte contient-il une apostrophe, comme L'Isle-Adam ou O'Neill ?",
            pourquoi: "L'apostrophe ferme le texte trop tôt. Au mieux, erreur de syntaxe ; au pire, la fin du texte est lue comme du SQL.",
            reflexe: "Double-la : `'L''Isle-Adam'`. Deux apostrophes collées valent une apostrophe dans le texte. Ce n'est pas un guillemet double.",
            moteurs: {
              snowflake: "Aussi `\\'`. Un texte plein d'apostrophes peut s'écrire entre `$$` : `$$L'Isle-Adam$$`.",
              mysql: "Aussi `\\'`, sauf si le mode `NO_BACKSLASH_ESCAPES` est actif."
            }
          },
          {
            id: "antislash",
            q: "Le texte contient-il un antislash, comme le chemin Windows C:\\edi\\new ?",
            pourquoi: "Sur Snowflake et MySQL, l'antislash annonce un caractère spécial : `\\n` devient un retour à la ligne, `\\t` une tabulation. Le chemin est abîmé, sans erreur.",
            reflexe: "Double chaque antislash : `'C:\\\\edi\\\\new'`. Ou écris le chemin avec des `/` : `'C:/edi/new'`.",
            moteurs: {
              snowflake: "Un texte entre `$$` garde les antislashs tels quels : `$$C:\\edi\\new$$`.",
              mysql: "Le mode `NO_BACKSLASH_ESCAPES` fait de l'antislash un caractère normal : regarde `SELECT @@sql_mode;`."
            },
            seulement: ["snowflake", "mysql"]
          },
          {
            id: "unicode",
            q: "Le texte a-t-il des lettres hors de l'alphabet français, comme Łódź, ou des symboles ?",
            pourquoi: "Si le texte passe par une page de codes (un alphabet limité) qui ne connaît pas la lettre, elle devient « ? » à l'enregistrement. Le nom du client est abîmé pour de bon.",
            reflexe: "Garde le texte en Unicode de bout en bout : la colonne, la valeur écrite, la connexion. Puis relis la ligne enregistrée.",
            moteurs: {
              sqlserver: "Colonne `NVARCHAR` : écris `N'Łódź'`, le N en majuscule. Sur une colonne `VARCHAR`, pas de N : il fait convertir toute la colonne (NVARCHAR passe avant VARCHAR), et l'index peut ne plus servir.",
              snowflake: "Rien à faire : tout texte est en UTF-8.",
              mysql: "Pas de N : il donnerait de l'utf8mb3. La connexion doit être en utf8mb4 (`SET NAMES utf8mb4`), sinon les accents arrivent abîmés."
            }
          },
          {
            id: "casse",
            q: "Ta valeur est-elle écrite exactement comme dans les données : majuscules, accents, espaces ?",
            pourquoi: "Selon le moteur, 'edi' et 'EDI' sont égaux ou non ; 'EDI ' (avec un espace à la fin) et 'EDI' aussi. Sur un moteur sensible à la casse (majuscules et minuscules) ou aux espaces, ton filtre ne trouve rien, sans erreur.",
            reflexe: "Regarde les vraies valeurs avant d'écrire le filtre : `SELECT DISTINCT canal FROM commande;`. Puis copie la valeur exacte. Un code de longueur fixe (`CHAR`) copié de SQL Server vers Snowflake garde ses espaces de fin : enlève-les au chargement (`RTRIM`).",
            moteurs: {
              sqlserver: "En général insensible à la casse et sensible aux accents : la collation (la règle qui compare les textes) contient `_CI_AS`. Les espaces de fin sont ignorés : `'EDI ' = 'EDI'` est vrai.",
              snowflake: "Sensible à la casse par défaut : `canal = 'edi'` ne trouve pas 'EDI'. Les espaces de fin comptent aussi : `'EDI ' = 'EDI'` est faux.",
              mysql: "Collation par défaut `utf8mb4_0900_ai_ci` : insensible à la casse et aux accents ('e' = 'é'), mais les espaces de fin comptent (collation NO PAD) : `'EDI ' = 'EDI'` est faux."
            }
          }
        ]
      },
      {
        titre: "Vide, NULL ou zéro",
        questions: [
          {
            id: "null-sens",
            q: "Veux-tu écrire NULL, un texte vide ou zéro ?",
            pourquoi: "Ce sont trois valeurs différentes. NULL veut dire « inconnu », '' un texte vide, 0 un nombre. Un mauvais choix fausse les comptes et les moyennes : un prix inconnu n'est pas un prix à 0.",
            reflexe: "Décide avec le métier ce que veut dire « pas de valeur ». Une date de livraison pas encore connue : NULL, pas '' ni 0.",
            moteurs: {
              sqlserver: "Un texte vide `''` écrit dans une colonne de date donne le 01/01/1900 (la valeur par défaut du type), sans erreur. À vérifier sur ta version : `SELECT CAST('' AS date);`.",
              mysql: "En mode strict, `''` dans une colonne de date est refusé (erreur 1292)."
            }
          },
          {
            id: "null-test",
            q: "Compares-tu une colonne à NULL avec = ou avec <> ?",
            pourquoi: "`ville = NULL` n'est jamais vrai, même pour une case vide : 0 ligne, sans erreur. Et `ville <> 'Lyon'` oublie aussi les clients sans ville.",
            reflexe: "Écris `ville IS NULL` ou `ville IS NOT NULL`. Pour garder les cases vides dans un « différent » : `ville <> 'Lyon' OR ville IS NULL`."
          }
        ]
      },
      {
        titre: "En dur ou en paramètre",
        questions: [
          {
            id: "parametre",
            q: "La valeur vient-elle d'une saisie, d'un fichier ou d'un autre programme ?",
            pourquoi: "Collée dans le texte de la requête, elle peut devenir du code. Avec la saisie `x' OR '1'='1`, tous les clients sortent : c'est l'injection SQL.",
            reflexe: "Passe la valeur en paramètre : elle voyage à part du texte et ne peut pas changer la requête. Doubler les apostrophes à la main ne suffit pas (Microsoft le dit).",
            moteurs: {
              sqlserver: "`EXEC sp_executesql N'SELECT code, nom FROM dbo.client WHERE nom = @n', N'@n varchar(60)', @n = @saisie;`",
              snowflake: "Dans un programme, des variables liées `?` ; dans un bloc, `EXECUTE IMMEDIATE :texte USING (v_nom)`.",
              mysql: "`PREPARE s FROM 'SELECT code, nom FROM client WHERE nom = ?'; EXECUTE s USING @saisie;`"
            }
          },
          {
            id: "liste-in",
            q: "Colles-tu une longue liste de valeurs dans un IN, par exemple 2 000 codes venus d'Excel ?",
            pourquoi: "Des milliers de valeurs écrites en dur rendent la requête lente, ou la font échouer. Et un code copié depuis Excel a pu perdre son zéro devant (01200 → 1200) : il ne trouve rien, sans erreur.",
            reflexe: "Au-delà de quelques dizaines de valeurs, charge la liste dans une table de travail (sur SQL Server, une table temporaire `#codes`), puis fais une jointure sur le code. Compte ses lignes : autant que dans Excel ?",
            moteurs: {
              sqlserver: "La doc le dit : des milliers de valeurs dans un `IN` peuvent donner les erreurs 8623 ou 8632. Elle conseille de les ranger dans une table."
            }
          },
          {
            id: "date-du-jour",
            q: "La valeur doit-elle suivre le calendrier, comme « hier » ou « le mois en cours » ?",
            pourquoi: "Une date écrite en dur se périme. Le 10 avril, le rapport « du mois » montre encore mars.",
            reflexe: "Calcule-la à partir de la date du jour, lue une seule fois en début de traitement, puis réutilisée partout.",
            moteurs: {
              sqlserver: "`DECLARE @jour date = CAST(GETDATE() AS date);`",
              snowflake: "`SET jour = CURRENT_DATE();`, puis `$jour`. `CURRENT_DATE()` suit le fuseau de la session : avec America/Los_Angeles (le défaut), un traitement lancé à 7 h à Paris calcule encore la veille.",
              mysql: "`SET @jour = CURRENT_DATE;`, puis `@jour`."
            }
          },
          {
            id: "valeur-magique",
            q: "Qui saura, dans six mois, ce que veut dire cette valeur ?",
            pourquoi: "Un `100` ou un `PICOD = 4` sans explication ne dit rien. Copié dans 15 rapports, il faudra le changer 15 fois, et un sera oublié.",
            reflexe: "Mets un commentaire qui dit le sens (`PICOD = 4 -- 4 = facture`). Si la valeur sert souvent, range-la dans une table de paramètres, jointe par chaque rapport."
          }
        ]
      }
    ],
    pieges: [
      "`'12/03/2026'` sur SQL Server : le 12 mars sur une connexion en français, le 3 décembre sur une connexion en anglais, sans erreur.",
      "`'20260312'` sur Snowflake : lu comme des secondes depuis 1970, donc le 23/08/1970, sans erreur.",
      "Une borne « <= 16 mars » sur une colonne avec heure : tout le 16 mars après minuit est perdu.",
      "`siren = 423456789` sur une colonne texte : SQL Server convertit toute la colonne ; l'index ne sert plus et un SIREN avec une lettre fait planter.",
      "MySQL : `WHERE code = 0` sur une colonne texte ressort tous les codes qui ne commencent pas par un chiffre.",
      "La virgule décimale : `SELECT 1500,50` rend deux colonnes, 1500 et 50.",
      "Une saisie collée dans la requête : `x' OR '1'='1` fait sortir tous les clients (injection SQL).",
      "Un chemin `'C:\\edi\\new.csv'` sur Snowflake ou MySQL : `\\n` devient un retour à la ligne.",
      "Snowflake : `canal = 'edi'` ne trouve pas 'EDI' ; la casse compte.",
      "Un code avec un espace à la fin : `'EDI ' = 'EDI'` est vrai sur SQL Server, faux sur Snowflake et sur MySQL 8 (collation par défaut)."
    ],
    pratique: "Avant d'écrire une valeur en dur sur la base de Divalto, regarde le type exact de la colonne : un code fait de chiffres y est souvent un texte (`CE4 = '1'`, pas `= 1`).",
    motsCles: ["valeur en dur", "littéral", "constante", "format de date", "aaaammjj", "apostrophe", "unicode", "null", "virgule décimale", "conversion implicite", "paramètre", "injection sql", "fuseau horaire", "casse", "date"],
    voirAussi: ["choisir-types", "dates", "filtrer", "comparer-texte", "inserer", "importer-fichier"],
    dico: ["conversion-implicite", "convert", "to-date", "cast", "is-null", "nvarchar", "datetime", "decimal", "sql-dynamique", "timestamp-ntz"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "SET DATEFORMAT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/set-dateformat-transact-sql" },
      { titre: "datetime (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/datetime-transact-sql" },
      { titre: "Constantes (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/constants-transact-sql" },
      { titre: "Injection SQL", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/security/sql-injection" },
      { titre: "Snowflake : formats d'entrée et de sortie des dates", url: "https://docs.snowflake.com/en/sql-reference/date-time-input-output" },
      { titre: "Snowflake : les types texte (constantes)", url: "https://docs.snowflake.com/en/sql-reference/data-types-text" },
      { titre: "MySQL 8.4 : Date and Time Literals", url: "https://dev.mysql.com/doc/refman/8.4/en/date-and-time-literals.html" },
      { titre: "MySQL 8.4 : Type Conversion in Expression Evaluation", url: "https://dev.mysql.com/doc/refman/8.4/en/type-conversion.html" }
    ]
  },
  {
    id: "inserer",
    titre: "J'insère des lignes",
    famille: "Écrire et charger",
    resume: "Les questions avant un INSERT : la liste des colonnes, les valeurs par défaut, le numéro automatique, les doublons, le contrôle après, et les gros volumes.",
    besoins: [
      "j'insère des lignes dans une table",
      "faire un insert into propre",
      "insérer le résultat d'un select dans une table",
      "ajouter des lignes sans créer de doublons"
    ],
    essais: [
      "insert into values plusieurs lignes d'un coup",
      "recuperer l'id cree apres un insert",
      "inserer un million de lignes rapidement",
      "insert ignore ou on duplicate key update mysql"
    ],
    exemple: {
      texte: "Le flux EDI de la nuit a rempli une table d'arrivée, `stg.commande_edi`. Tu ajoutes ses commandes à `edi.commande_edi` (la table de « Je crée une table ») : sans doublon, sans fournir le numéro automatique, et en gardant les numéros créés.",
      code: "INSERT INTO edi.commande_edi (partenaire, num_cde, date_cde, montant_ht, fichier)\nOUTPUT inserted.id, inserted.partenaire, inserted.num_cde     -- les numéros créés\nSELECT s.partenaire, s.num_cde, s.date_cde, s.montant_ht, s.fichier\nFROM stg.commande_edi AS s\nWHERE NOT EXISTS (SELECT 1 FROM edi.commande_edi AS c        -- déjà reçue ?\n                  WHERE c.partenaire = s.partenaire\n                    AND c.num_cde = s.num_cde);\n-- id : IDENTITY ; statut et date_creation : leurs valeurs par défaut (DEFAULT)",
      codes: {
        snowflake: "INSERT INTO edi.commande_edi (partenaire, num_cde, date_cde, montant_ht, fichier)\nSELECT s.partenaire, s.num_cde, s.date_cde, s.montant_ht, s.fichier\nFROM stg.commande_edi AS s\nWHERE NOT EXISTS (SELECT 1 FROM edi.commande_edi AS c\n                  WHERE c.partenaire = s.partenaire\n                    AND c.num_cde = s.num_cde);\n-- UNIQUE n'est pas appliqué : ce NOT EXISTS est ta seule protection.\n-- Pas d'OUTPUT : relis les numéros créés par la clé (partenaire, num_cde).",
        mysql: "INSERT INTO commande_edi (partenaire, num_cde, date_cde, montant_ht, fichier)\nSELECT s.partenaire, s.num_cde, s.date_cde, s.montant_ht, s.fichier\nFROM stg_commande_edi AS s\nWHERE NOT EXISTS (SELECT 1 FROM commande_edi AS c\n                  WHERE c.partenaire = s.partenaire\n                    AND c.num_cde = s.num_cde);\nSELECT ROW_COUNT() AS lignes_ajoutees;   -- puis relis les id par la clé"
      }
    },
    etapes: [
      {
        titre: "La cible et ses colonnes",
        questions: [
          {
            id: "liste-colonnes",
            q: "As-tu écrit la liste des colonnes, dans l'INSERT … VALUES comme dans l'INSERT … SELECT ?",
            pourquoi: "Sans liste, les valeurs vont dans l'ordre actuel des colonnes. Le jour où la table change, l'INSERT plante, ou remplit les mauvaises colonnes sans erreur.",
            reflexe: "Écris toujours `INSERT INTO t (col1, col2, …)`. Cite seulement les colonnes que tu remplis vraiment : les autres prennent leur valeur par défaut."
          },
          {
            id: "colonnes-absentes",
            q: "Que reçoivent les colonnes que tu ne cites pas ?",
            pourquoi: "Une colonne absente prend sa valeur par défaut (DEFAULT), sinon NULL. Si elle est NOT NULL sans défaut, l'INSERT est refusé.",
            reflexe: "Pour chaque colonne absente, vérifie qu'elle a un DEFAULT utile (`statut = 'RECU'`, `date_creation`) ou qu'un NULL a un sens. Un `NULL` écrit en toutes lettres n'est pas remplacé par le DEFAULT."
          },
          {
            id: "identity",
            q: "La table a-t-elle un numéro automatique (IDENTITY, AUTO_INCREMENT) ?",
            pourquoi: "Ce numéro est donné par le moteur. Fourni à la main, il est refusé, ou il risque de doubler un numéro que le moteur donnera plus tard.",
            reflexe: "Ne cite pas la colonne `id` : le moteur la remplit. Seule une reprise de données qui garde les anciens numéros les fournit, avec précaution.",
            moteurs: {
              sqlserver: "Refusé sans `SET IDENTITY_INSERT edi.commande_edi ON;` (une seule table à la fois par session), à remettre à OFF juste après.",
              snowflake: "Accepté sans contrôle. La doc prévient : un 5 inséré à la main peut être donné à nouveau par le moteur, d'où un doublon.",
              mysql: "Accepté : le compteur repart après la plus grande valeur. Un 0 ou un NULL fait générer le numéro suivant."
            }
          }
        ]
      },
      {
        titre: "La source",
        questions: [
          {
            id: "select-dabord",
            q: "As-tu lancé le SELECT seul, et compté ses lignes, avant l'INSERT … SELECT ?",
            pourquoi: "L'INSERT ajoute tout ce que rend le SELECT, sans rien demander. Une jointure qui double les lignes double aussi les commandes insérées.",
            reflexe: "Lance le SELECT seul. Compte ses lignes et regardes-en quelques-unes. Garde ce nombre : c'est celui que l'INSERT doit annoncer."
          },
          {
            id: "ordre-colonnes",
            q: "Chaque colonne du SELECT est-elle en face de la bonne colonne de la liste ?",
            pourquoi: "INSERT … SELECT range par position, pas par nom. Deux colonnes du même type inversées, comme `date_cde` et `date_livr`, se remplissent à l'envers, sans erreur.",
            reflexe: "Écris le SELECT dans le même ordre que la liste, une colonne par ligne. Donne-lui les mêmes noms (`AS date_cde`) : l'écart se voit d'un coup d'œil."
          },
          {
            id: "types-longueurs",
            q: "Chaque valeur a-t-elle le type et la longueur de sa colonne ?",
            pourquoi: "Un texte trop long fait échouer tout l'INSERT, ou il est coupé sans bruit, selon le moteur. Une date en texte peut être mal lue (voir « J'écris une valeur dans une requête »).",
            reflexe: "Avant, cherche les valeurs trop longues dans la source : `WHERE LEN(num_cde) > 35` sur SQL Server. Convertis toi-même les dates et les montants, avec leur format.",
            moteurs: {
              sqlserver: "Erreur 2628 depuis SQL Server 2019 (niveau de compatibilité 150) : elle donne la table, la colonne et la valeur coupée. Avant : 8152, sans détail.",
              snowflake: "Erreur : un INSERT ne coupe jamais un texte trop long. Mesure avec `LENGTH`.",
              mysql: "En mode strict (le défaut), erreur 1406 « Data too long ». Sans mode strict, ou avec `INSERT IGNORE`, le texte est coupé avec un simple avertissement. Mesure avec `CHAR_LENGTH`."
            }
          },
          {
            id: "references",
            q: "Chaque ligne pointe-t-elle vers un client ou un article qui existe ?",
            pourquoi: "Un code article inconnu dans le flux : la clé étrangère refuse tout l'INSERT, ou la ligne entre orpheline (sans parent), selon le moteur. La commande est bloquée, ou part incomplète.",
            reflexe: "Cherche les codes inconnus avant : `SELECT s.* FROM stg.ligne_edi AS s LEFT JOIN article AS a ON a.code = s.article WHERE a.id IS NULL`. Range ces lignes à part, avec le motif, et insère le reste.",
            moteurs: {
              sqlserver: "Erreur 547 (conflit avec la clé étrangère) : aucune ligne de l'instruction n'est insérée.",
              snowflake: "La clé étrangère n'est pas appliquée : la ligne orpheline entre, sans erreur.",
              mysql: "Erreur 1452 (« a foreign key constraint fails ») : aucune ligne de l'instruction n'est insérée."
            }
          }
        ]
      },
      {
        titre: "Les doublons",
        questions: [
          {
            id: "doublon-cible",
            q: "Certaines lignes existent-elles déjà dans la table ?",
            pourquoi: "Le même message EDI chargé deux fois donne deux commandes, et deux livraisons. Une contrainte UNIQUE le refuse, mais fait alors échouer tout l'INSERT.",
            reflexe: "Filtre ce qui existe déjà : `WHERE NOT EXISTS (…même partenaire, même num_cde…)`. Garde la contrainte UNIQUE comme dernier filet.",
            moteurs: {
              sqlserver: "Un doublon sur la clé : erreur 2627, et aucune ligne de l'instruction n'est insérée.",
              snowflake: "UNIQUE et PRIMARY KEY ne sont pas appliqués : le doublon entre sans erreur. Le `NOT EXISTS` est ta seule protection ; contrôle après avec `GROUP BY … HAVING COUNT(*) > 1`.",
              mysql: "Erreur 1062 (« Duplicate entry ») : l'instruction est annulée."
            }
          },
          {
            id: "doublon-source",
            q: "La source contient-elle elle-même des doublons ?",
            pourquoi: "`NOT EXISTS` compare à la table, pas aux autres lignes de la source. Une commande présente deux fois dans le fichier entre deux fois, ou bloque tout sur la contrainte.",
            reflexe: "Cherche-les avant : `GROUP BY partenaire, num_cde HAVING COUNT(*) > 1` sur la source. Garde une ligne par clé (la plus récente), ou rejette le fichier."
          },
          {
            id: "relancer",
            q: "Que se passe-t-il si l'INSERT est relancé, après une panne ou par erreur ?",
            pourquoi: "Un traitement de nuit est souvent relancé. S'il insère tout à chaque passage, la 2e exécution double les lignes déjà passées.",
            reflexe: "Écris un INSERT rejouable : le relancer ne change rien de plus. Le `NOT EXISTS` sur la clé métier suffit. Teste-le : lancé deux fois en recette, le 2e passage insère 0 ligne."
          },
          {
            id: "mysql-ignore",
            q: "Penses-tu à INSERT IGNORE ou à ON DUPLICATE KEY UPDATE pour gérer les doublons ?",
            pourquoi: "`INSERT IGNORE` saute les doublons, mais change aussi les autres erreurs en avertissements : textes coupés, valeurs ajustées. Les données fausses entrent sans bruit.",
            reflexe: "Préfère `NOT EXISTS`. `ON DUPLICATE KEY UPDATE` met à jour la ligne existante : la doc conseille de l'éviter sur une table qui a plusieurs clés UNIQUE. Lis toujours `SHOW WARNINGS;`.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Après l'insertion",
        questions: [
          {
            id: "compter",
            q: "Combien de lignes devaient entrer, et combien sont entrées ?",
            pourquoi: "0 ligne insérée n'est pas une erreur. Un fichier vide ou un filtre trop strict passent sans message : la commande manque, et personne ne le voit.",
            reflexe: "Compare le nombre annoncé à celui du SELECT. Écris-le dans ta table de suivi des flux : fichier, lignes reçues, lignes insérées.",
            moteurs: {
              sqlserver: "`@@ROWCOUNT`, lu juste après l'INSERT : la plupart des instructions suivantes le changent.",
              snowflake: "L'INSERT rend « number of rows inserted » ; dans un bloc, `SQLROWCOUNT`.",
              mysql: "`ROW_COUNT()`, juste après l'INSERT."
            }
          },
          {
            id: "parent-enfants",
            q: "Insères-tu un en-tête et ses lignes, comme une commande et ses lignes de commande ?",
            pourquoi: "Si le traitement s'arrête entre les deux, la commande existe sans ses lignes : elle part vide en préparation, ou elle est intégrée deux fois à la relance.",
            reflexe: "Insère le parent, puis les enfants, dans une même transaction (un bloc validé ou annulé en entier). Une erreur annule tout : rien n'est à moitié fait.",
            moteurs: {
              sqlserver: "`SET XACT_ABORT ON;` avant `BEGIN TRAN` : sans lui, une erreur de contrainte n'annule que l'instruction fautive, et le COMMIT valide le reste.",
              snowflake: "`BEGIN` … `COMMIT`. Une erreur n'annule que l'instruction fautive, sauf avec `ALTER SESSION SET TRANSACTION_ABORT_ON_ERROR = TRUE;`.",
              mysql: "`START TRANSACTION` … `COMMIT`. Une erreur n'annule que l'instruction fautive : prévois le ROLLBACK toi-même."
            }
          },
          {
            id: "numero-cree",
            q: "As-tu besoin des numéros créés, par exemple pour insérer ensuite les lignes de commande ?",
            pourquoi: "Relire le plus grand numéro (`MAX(id)`) donne celui d'une autre session si deux flux tournent en même temps : les lignes partent sur la mauvaise commande.",
            reflexe: "Demande le numéro au moteur, ou relis la ligne par sa clé métier (partenaire, num_cde). Jamais `MAX(id)`.",
            moteurs: {
              sqlserver: "`SCOPE_IDENTITY()` pour une ligne ; pas `@@IDENTITY`, faussé par un trigger qui insère ailleurs. Pour plusieurs lignes : `OUTPUT inserted.id, inserted.num_cde INTO @nouvelles`.",
              snowflake: "Pas d'OUTPUT : relis par la clé métier, ou prends le numéro avant (`SELECT seq.NEXTVAL`) et insère-le.",
              mysql: "`LAST_INSERT_ID()`, propre à ta connexion. Après un INSERT de plusieurs lignes, il donne l'id de la première."
            }
          },
          {
            id: "triggers",
            q: "La table a-t-elle des déclencheurs (triggers) qui réagissent à l'INSERT ?",
            pourquoi: "Un trigger est du code lancé à chaque modification de la table. Il peut écrire dans d'autres tables, ralentir un gros INSERT, ou le faire échouer : tout est annulé avec lui.",
            reflexe: "Avant un gros chargement, liste les triggers de la table et lis ce qu'ils font. Teste l'INSERT en recette, avec le vrai volume.",
            moteurs: {
              sqlserver: "Un trigger tourne une fois par instruction. Liste : `SELECT name FROM sys.triggers WHERE parent_id = OBJECT_ID('edi.commande_edi');`. `BULK INSERT` ne les lance pas, sauf avec `FIRE_TRIGGERS`.",
              snowflake: "Pas de triggers : un stream (le journal des changements d'une table) et une tâche planifiée font ce travail après coup.",
              mysql: "Un trigger tourne pour chaque ligne (`FOR EACH ROW`). Liste : `SHOW TRIGGERS LIKE 'commande_edi';`."
            }
          }
        ]
      },
      {
        titre: "Les gros volumes",
        questions: [
          {
            id: "volume-outil",
            q: "Combien de lignes vas-tu insérer, et d'où viennent-elles ?",
            pourquoi: "Des milliers d'INSERT … VALUES écrits à la main, ou envoyés un par un par une boucle, sont lents et dépassent vite les limites. Un fichier se charge avec l'outil prévu.",
            reflexe: "Des lignes déjà en base : un seul `INSERT … SELECT`. Un fichier : l'outil de chargement du moteur. Quelques lignes : un `INSERT … VALUES` à plusieurs lignes.",
            moteurs: {
              sqlserver: "`VALUES` : 1 000 lignes au plus par instruction. Fichier : `BULK INSERT` ou `bcp`.",
              snowflake: "`VALUES` : 200 000 lignes au plus. Fichier : `COPY INTO`, conseillé par la doc pour les chargements en masse. Les tables standard sont faites pour de gros lots : pas d'INSERT ligne à ligne depuis une boucle.",
              mysql: "Fichier : `LOAD DATA`, en général 20 fois plus rapide que des INSERT, dit la doc. Sinon, un INSERT à plusieurs lignes : `VALUES (…), (…)`."
            }
          },
          {
            id: "lots-journal",
            q: "Un seul gros INSERT, ou des lots validés un par un ?",
            pourquoi: "Un INSERT de 2 millions de lignes forme une seule transaction. Le journal (où le moteur note chaque modification) grossit, les verrous (les lignes réservées) restent jusqu'au bout, et un échec annule tout.",
            reflexe: "Dans une table que l'ERP lit en même temps : des lots validés un par un, et le dernier lot noté pour reprendre après une panne. Dans une table de chargement que personne ne lit : un seul INSERT … SELECT.",
            moteurs: {
              sqlserver: "Lots de moins de 5 000 lignes : au-delà, SQL Server peut verrouiller toute la table d'un coup (l'escalade). Table de chargement : `WITH (TABLOCK)` peut réduire le journal (journalisation minimale, selon le mode de récupération).",
              snowflake: "Pas de verrou par ligne : un seul INSERT … SELECT, même gros, est la bonne forme."
            }
          }
        ]
      }
    ],
    pieges: [
      "`INSERT INTO t VALUES (…)` sans liste de colonnes : le jour où une colonne s'ajoute, il plante, ou remplit la mauvaise colonne.",
      "`@@IDENTITY` après un INSERT dans une table qui a un trigger : tu lis le numéro créé dans une autre table.",
      "`MAX(id)` pour retrouver la commande créée : avec deux flux en même temps, tu prends celle de l'autre.",
      "Snowflake n'applique pas UNIQUE : un fichier chargé deux fois double les commandes, sans erreur.",
      "MySQL : `INSERT IGNORE` cache aussi les textes coupés et les valeurs ajustées, pas seulement les doublons.",
      "Un INSERT … SELECT relancé après une panne : sans `NOT EXISTS`, il insère une 2e fois ce qui était déjà passé.",
      "Le DEFAULT ne remplace pas un NULL écrit en toutes lettres : `VALUES (…, NULL)` donne NULL.",
      "MySQL : après un INSERT de 3 lignes, `LAST_INSERT_ID()` donne l'id de la 1re, pas de la dernière."
    ],
    pratique: "Certaines tables de Divalto ont des déclencheurs (triggers) qui tiennent à jour des tables intermédiaires : ton INSERT les fait tourner. Mais l'ERP a aussi ses règles (compteurs, contrôles) : écris en direct seulement avec l'accord de l'éditeur.",
    motsCles: ["insert", "insert into", "insérer", "ajouter des lignes", "insert select", "values", "doublons", "identity", "auto_increment", "scope_identity", "default", "trigger", "gros volume", "insert ignore"],
    voirAussi: ["creer-table", "ecrire-valeur", "importer-fichier", "fusionner", "transaction", "doublons", "charger-snowflake"],
    dico: ["insert", "insert-select", "identity", "default", "output", "rowcount", "unique", "copy-into"],
    outils: ["dico"],
    sources: [
      { titre: "INSERT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/insert-transact-sql" },
      { titre: "SCOPE_IDENTITY (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/scope-identity-transact-sql" },
      { titre: "Snowflake : INSERT", url: "https://docs.snowflake.com/en/sql-reference/sql/insert" },
      { titre: "Snowflake : CREATE TABLE (AUTOINCREMENT)", url: "https://docs.snowflake.com/en/sql-reference/sql/create-table" },
      { titre: "MySQL 8.4 : INSERT Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/insert.html" },
      { titre: "MySQL 8.4 : INSERT … ON DUPLICATE KEY UPDATE", url: "https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html" },
      { titre: "MySQL 8.4 : Optimizing INSERT Statements", url: "https://dev.mysql.com/doc/refman/8.4/en/insert-optimization.html" },
      { titre: "Divalto : Déclaration des index dans le dictionnaire (les déclencheurs)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10558210300/D+claration+des+index+dans+le+dictionnaire" }
    ]
  },
  {
    id: "mettre-a-jour",
    titre: "Je mets à jour des lignes",
    famille: "Écrire et charger",
    resume: "Les questions avant un UPDATE : quelles lignes et combien, la nouvelle valeur, la jointure, le retour en arrière, la trace, et sans bloquer l'ERP.",
    besoins: [
      "je mets à jour des lignes",
      "faire un update sans risque",
      "mettre à jour une table à partir d'une autre table",
      "modifier une colonne sur beaucoup de lignes"
    ],
    essais: [
      "update avec jointure sql server snowflake mysql",
      "comment eviter un update sans where",
      "mettre a jour les prix des articles depuis un fichier"
    ],
    exemple: {
      texte: "Le fournisseur envoie son nouveau tarif par EDI. Le fichier est chargé dans `stg.tarif` (code, prix) : 4 articles, dont 3 changent de prix. Tu mets à jour `prix_tarif` dans `article` : seulement ce qui change, avec la trace de l'ancien prix, et la possibilité d'annuler.",
      code: "-- 1. Le SELECT d'abord : quels articles, quel prix ? (3 lignes attendues)\nSELECT a.code, a.prix_tarif AS avant, t.prix AS apres\nFROM dbo.article AS a\nJOIN stg.tarif AS t ON t.code = a.code\nWHERE a.prix_tarif <> t.prix;\n\n-- 2. Le même FROM et le même WHERE, dans une transaction, avec la trace\nBEGIN TRAN;\nUPDATE a\nSET a.prix_tarif = t.prix\nOUTPUT deleted.code, deleted.prix_tarif, inserted.prix_tarif\n  INTO sauv.article_prix (code, avant, apres)\nFROM dbo.article AS a\nJOIN stg.tarif AS t ON t.code = a.code\nWHERE a.prix_tarif <> t.prix;\nIF @@ROWCOUNT = 3 COMMIT; ELSE ROLLBACK;",
      codes: {
        snowflake: "-- 1. Le SELECT d'abord (même jointure, même WHERE)\nSELECT a.code, a.prix_tarif AS avant, t.prix AS apres\nFROM ventes.article AS a\nJOIN stg.tarif AS t ON t.code = a.code\nWHERE a.prix_tarif <> t.prix;\n\n-- 2. L'UPDATE : la source dans FROM, le lien dans WHERE\nALTER SESSION SET ERROR_ON_NONDETERMINISTIC_UPDATE = TRUE;  -- un code en double = erreur\nBEGIN;\nUPDATE ventes.article\nSET prix_tarif = t.prix\nFROM stg.tarif AS t\nWHERE t.code = article.code\n  AND article.prix_tarif <> t.prix;   -- « number of rows updated » : 3 ? alors COMMIT\nCOMMIT;\n-- Après coup : la table d'avant se relit avec BEFORE (STATEMENT => '<id de la requête>')",
        mysql: "-- 1. Le SELECT d'abord\nSELECT a.code, a.prix_tarif AS avant, t.prix AS apres\nFROM article AS a\nJOIN stg_tarif AS t ON t.code = a.code\nWHERE a.prix_tarif <> t.prix;\n\n-- 2. L'UPDATE : la jointure avant le SET\nSTART TRANSACTION;\nUPDATE article AS a\nJOIN stg_tarif AS t ON t.code = a.code\nSET a.prix_tarif = t.prix\nWHERE a.prix_tarif <> t.prix;\nSELECT ROW_COUNT();   -- 3 ? alors COMMIT ; sinon ROLLBACK"
      }
    },
    etapes: [
      {
        titre: "Les lignes visées",
        questions: [
          {
            id: "select-dabord",
            q: "As-tu lancé un SELECT avec exactement le même FROM et le même WHERE ?",
            pourquoi: "L'UPDATE change toutes les lignes que garde le WHERE, sans rien demander. Le SELECT montre ces lignes avant, sans risque : ce qu'il rend, l'UPDATE le touchera.",
            reflexe: "Écris d'abord le SELECT, avec la valeur d'avant et celle d'après côte à côte. Puis transforme-le en UPDATE, sans toucher au FROM ni au WHERE."
          },
          {
            id: "nombre-attendu",
            q: "Combien de lignes doivent changer, et as-tu noté ce nombre avant de lancer ?",
            pourquoi: "0 ligne ou 8 000 lignes ne sont jamais une erreur pour le moteur. Sans nombre attendu, tu ne vois pas qu'un WHERE trop large a tout changé.",
            reflexe: "Note le nombre du SELECT. Juste après l'UPDATE, compare-le au nombre annoncé ; s'il diffère : ROLLBACK.",
            moteurs: {
              sqlserver: "`@@ROWCOUNT`, lu juste après : la plupart des instructions suivantes le changent. Il compte aussi les lignes réécrites avec la même valeur.",
              snowflake: "L'UPDATE rend « number of rows updated » ; dans un bloc, `SQLROWCOUNT`.",
              mysql: "`ROW_COUNT()` compte seulement les lignes vraiment changées : une ligne déjà à la bonne valeur compte 0."
            }
          },
          {
            id: "where-null",
            q: "Ton WHERE garde-t-il bien les lignes où la colonne est vide (NULL) ?",
            pourquoi: "`WHERE ville <> 'Lyon'` oublie les clients sans ville, et `a.prix_tarif <> t.prix` rate le passage de NULL à un prix : NULL n'est ni égal ni différent.",
            reflexe: "Ajoute `OR colonne IS NULL`, ou compare en comptant NULL comme une valeur : `a.prix_tarif IS DISTINCT FROM t.prix`.",
            moteurs: {
              sqlserver: "`IS DISTINCT FROM` existe depuis SQL Server 2022.",
              mysql: "Écris `NOT (a.prix_tarif <=> t.prix)` : `<=>` est l'égal qui compte NULL comme une valeur."
            }
          },
          {
            id: "selection-editeur",
            q: "Exécutes-tu tout le texte de l'UPDATE, ou seulement une partie surlignée ?",
            pourquoi: "SSMS exécute seulement le texte surligné. Si le WHERE reste hors de la sélection, toute la table change, sans question.",
            reflexe: "Sélectionne le bloc entier, de UPDATE jusqu'au point-virgule, et relis la sélection avant F5. Avec une transaction ouverte avant (un bloc validé ou annulé en entier), une erreur reste annulable."
          },
          {
            id: "safe-updates",
            q: "Le mode sql_safe_updates est-il actif dans ta session ?",
            pourquoi: "Ce mode refuse un UPDATE ou un DELETE dont le WHERE n'utilise pas de clé et qui n'a pas de LIMIT (erreur 1175). Il arrête net le WHERE oublié.",
            reflexe: "Active-le pour tes corrections à la main : `SET sql_safe_updates = 1;`, ou lance le client avec `--safe-updates`.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "La nouvelle valeur",
        questions: [
          {
            id: "jointure-unique",
            q: "Avec une jointure, chaque ligne à modifier trouve-t-elle une seule ligne source ?",
            pourquoi: "Si CHL-5 est deux fois dans le tarif, l'article prend l'un des deux prix, au hasard, sans erreur. Le prix de vente devient une loterie.",
            reflexe: "Avant l'UPDATE : `SELECT code FROM stg.tarif GROUP BY code HAVING COUNT(*) > 1;` doit rendre 0 ligne. Sinon, garde une ligne par code (la plus récente).",
            moteurs: {
              sqlserver: "Microsoft le dit : le résultat est « indéfini » quand la jointure donne plusieurs valeurs.",
              snowflake: "`ALTER SESSION SET ERROR_ON_NONDETERMINISTIC_UPDATE = TRUE;` fait échouer l'UPDATE dans ce cas. Par défaut (FALSE), une des lignes source est prise au hasard.",
              mysql: "Chaque ligne n'est mise à jour qu'une fois, même si elle trouve plusieurs lignes source : une des valeurs gagne, sans erreur."
            }
          },
          {
            id: "set-null",
            q: "Ta nouvelle valeur peut-elle être NULL sans que tu le veuilles ?",
            pourquoi: "`SET prix_tarif = (SELECT prix FROM stg.tarif WHERE …)` rend NULL pour un article absent du fichier : son prix est effacé. Un `CASE` sans `ELSE` fait pareil.",
            reflexe: "Préfère une jointure interne : seuls les articles présents dans la source changent. Avec un CASE, écris toujours un ELSE (`ELSE prix_tarif`)."
          },
          {
            id: "mysql-set-ordre",
            q: "Dans ton SET, une colonne recopie-t-elle une autre colonne que tu modifies aussi ?",
            pourquoi: "MySQL lit le SET de gauche à droite : `SET prix_tarif = prix_tarif * 1.10, ancien_prix = prix_tarif` met le nouveau prix dans ancien_prix. SQL Server, lui, lirait l'ancien.",
            reflexe: "Mets d'abord la copie : `SET ancien_prix = prix_tarif, prix_tarif = prix_tarif * 1.10`. Vérifie le résultat sur une ligne avant de tout lancer.",
            seulement: ["mysql"]
          },
          {
            id: "ce-qui-change",
            q: "Réécris-tu des lignes dont la valeur ne change pas ?",
            pourquoi: "Une ligne réécrite à l'identique est réservée (un verrou), lance les triggers (le code lancé à chaque modification) et fausse `date_modif`. Sur un tarif de 50 000 articles dont 300 changent : 49 700 écritures pour rien.",
            reflexe: "Ajoute au WHERE la différence : `AND a.prix_tarif <> t.prix` (avec la règle des NULL). Le nombre de lignes devient celui des vrais changements."
          },
          {
            id: "trace-modif",
            q: "Faut-il remplir date_modif et modifie_par dans le même UPDATE ?",
            pourquoi: "Un DEFAULT ne joue qu'à l'INSERT : un UPDATE ne le recalcule jamais. Sans ces colonnes, impossible de dire qui a changé un prix, et quand.",
            reflexe: "Mets-les dans le SET de chaque UPDATE : `date_modif = SYSDATETIME(), modifie_par = SUSER_SNAME()` sur SQL Server.",
            moteurs: {
              snowflake: "`date_modif = CURRENT_TIMESTAMP(), modifie_par = CURRENT_USER()`.",
              mysql: "Une colonne `DATETIME … ON UPDATE CURRENT_TIMESTAMP` se met à jour seule ; `modifie_par = CURRENT_USER()` reste à écrire."
            }
          }
        ]
      },
      {
        titre: "Pouvoir revenir en arrière",
        questions: [
          {
            id: "transaction",
            q: "As-tu ouvert une transaction, pour annuler si le compte est faux ?",
            pourquoi: "Sans transaction, l'UPDATE est validé dès qu'il finit (l'autocommit) : plus de retour possible, sauf une sauvegarde. Avec une transaction, ROLLBACK remet tout comme avant.",
            reflexe: "`BEGIN TRAN`, l'UPDATE, le contrôle du nombre, puis `COMMIT` ou `ROLLBACK`, tout de suite. Une transaction oubliée ouverte garde ses verrous : l'ERP attend.",
            moteurs: {
              snowflake: "`BEGIN` … `COMMIT`. Un ordre de structure (DDL, comme `CREATE TABLE`) au milieu valide la transaction en cours.",
              mysql: "`START TRANSACTION` … `COMMIT`. Un ordre de structure (DDL : CREATE, ALTER, DROP) au milieu valide aussi la transaction : le ROLLBACK n'annule plus ce qui précède."
            }
          },
          {
            id: "anciennes-valeurs",
            q: "Garderas-tu les anciennes valeurs, pour les remettre si on te le demande demain ?",
            pourquoi: "Après le COMMIT, l'ancienne valeur a disparu de la table. Si le métier conteste une semaine plus tard, il faut la retrouver ligne par ligne.",
            reflexe: "Copie les lignes visées juste avant, dans une table datée : `SELECT * INTO sauv.article_20261116 FROM dbo.article WHERE …;` sur SQL Server. Ou garde l'avant et l'après pendant l'UPDATE.",
            moteurs: {
              sqlserver: "`OUTPUT deleted.code, deleted.prix_tarif, inserted.prix_tarif INTO sauv.article_prix` garde l'avant et l'après, dans la même instruction.",
              snowflake: "Time Travel relit la table d'avant : `BEFORE (STATEMENT => '<id de la requête>')`, 1 jour par défaut. Pour plus longtemps : un `CLONE` (une copie rapide, sans doubler le stockage) juste avant l'UPDATE.",
              mysql: "Pas d'OUTPUT : `CREATE TABLE sauv_article_20261116 AS SELECT * FROM article WHERE …;` avant l'UPDATE."
            }
          }
        ]
      },
      {
        titre: "Sans bloquer les autres",
        questions: [
          {
            id: "volume-lots",
            q: "Combien de lignes vas-tu modifier, et faut-il découper en lots ?",
            pourquoi: "Un très gros UPDATE garde ses verrous jusqu'au bout et gonfle le journal des transactions (où le moteur note chaque modification). Pendant ce temps, les saisies de l'ERP attendent.",
            reflexe: "Au-delà de quelques milliers de lignes, découpe en lots validés un par un. Chaque lot doit exclure les lignes déjà faites, sinon la boucle tourne sans fin.",
            moteurs: {
              sqlserver: "Lots de moins de 5 000 lignes (`UPDATE TOP (1000) … WHERE …`) : au-delà, SQL Server peut verrouiller toute la table d'un coup (l'escalade).",
              snowflake: "Pas de verrou par ligne : un seul UPDATE. Mais deux UPDATE sur la même table s'attendent.",
              mysql: "`UPDATE … LIMIT 1000`, relancé jusqu'à 0 ligne. LIMIT n'existe pas dans un UPDATE à plusieurs tables."
            }
          },
          {
            id: "moment",
            q: "Les utilisateurs de l'ERP travaillent-ils pendant ta mise à jour ?",
            pourquoi: "Une mise à jour longue en pleine journée fige les écrans de saisie. Un tarif changé en cours de journée donne deux prix différents dans la même journée de commandes.",
            reflexe: "Lance les grosses mises à jour hors des heures de saisie, et préviens les utilisateurs. Note l'heure de début et de fin dans ton suivi."
          },
          {
            id: "index",
            q: "Le WHERE et la jointure sont-ils servis par un index ?",
            pourquoi: "Sans index (la table des matières d'une table), le moteur lit toute la table pour trouver les lignes. Sur SQL Server, il pose aussi plus de verrous, et bloque plus longtemps.",
            reflexe: "Regarde le plan d'exécution (le chemin choisi par le moteur) du SELECT avant de lancer. Une jointure sur `code` demande un index sur `article.code`, et sur `code` dans la table du tarif.",
            moteurs: {
              snowflake: "En général, pas d'index à créer : un filtre sur une valeur fixe laisse Snowflake sauter des blocs (micro-partitions).",
              mysql: "Avec `sql_safe_updates`, un WHERE sans index utilisable est refusé : c'est aussi un moyen de le voir."
            }
          }
        ]
      }
    ],
    pieges: [
      "Le WHERE oublié, ou laissé hors de la sélection dans SSMS : toute la table change, sans question.",
      "Un code en double dans le fichier de tarif : un des deux prix est pris au hasard, sans erreur.",
      "`SET prix = (SELECT …)` sans correspondance : la sous-requête rend NULL et efface le prix.",
      "`WHERE ville <> 'Lyon'` oublie les clients sans ville : NULL n'est ni égal ni différent.",
      "MySQL : `SET prix = prix * 1.10, ancien_prix = prix` met le nouveau prix dans ancien_prix.",
      "MySQL : `ROW_COUNT()` compte seulement les lignes vraiment changées ; il peut être plus petit que le SELECT.",
      "Un `BEGIN TRAN` sans `COMMIT` dans SSMS : la table reste verrouillée et l'ERP attend.",
      "Un UPDATE de 500 000 lignes en journée sur SQL Server : l'escalade verrouille toute la table."
    ],
    pratique: "Avant une mise à jour en masse dans Divalto, demande à l'éditeur : certaines tables ont des déclencheurs qui tiennent à jour des tables intermédiaires. Garde l'avant et l'après dans une table datée, avec le numéro du ticket.",
    motsCles: ["update", "mettre à jour", "modifier", "update jointure", "update from", "where", "rowcount", "transaction", "rollback", "output", "lots", "safe updates", "time travel", "verrous"],
    voirAussi: ["supprimer", "fusionner", "transaction", "corriger-prod", "historiser", "requete-lente"],
    dico: ["update", "output", "rowcount", "begin-transaction", "rollback", "is-distinct-from", "time-travel", "xact-abort"],
    outils: ["dico"],
    sources: [
      { titre: "UPDATE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/queries/update-transact-sql" },
      { titre: "@@ROWCOUNT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/rowcount-transact-sql" },
      { titre: "Guide du verrouillage des transactions et du contrôle de version de ligne", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide" },
      { titre: "Snowflake : UPDATE", url: "https://docs.snowflake.com/en/sql-reference/sql/update" },
      { titre: "Snowflake : les paramètres (ERROR_ON_NONDETERMINISTIC_UPDATE)", url: "https://docs.snowflake.com/en/sql-reference/parameters" },
      { titre: "Snowflake : les transactions", url: "https://docs.snowflake.com/en/sql-reference/transactions" },
      { titre: "MySQL 8.4 : UPDATE Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/update.html" },
      { titre: "MySQL 8.4 : mysql Client Tips (safe-updates)", url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-tips.html" }
    ]
  },
  {
    id: "supprimer",
    titre: "Je supprime des lignes",
    famille: "Écrire et charger",
    resume: "Les questions avant de supprimer : DELETE, TRUNCATE ou DROP, quelles lignes, la copie avant, les clés étrangères, les grosses purges, et l'effacement réel (RGPD).",
    besoins: [
      "je supprime des lignes",
      "faire un delete sans risque",
      "purger les vieilles lignes d'une grosse table",
      "delete, truncate ou drop table"
    ],
    essais: [
      "vider une table avant le chargement",
      "purge des flux edi de plus de 2 ans",
      "supprimer un client rgpd droit a l'effacement",
      "delete par lots sql server"
    ],
    exemple: {
      texte: "La table `flux_edi` garde tous les messages reçus depuis 5 ans. La règle de l'entreprise : 2 ans. Tu purges les plus anciens sans bloquer l'ERP, en gardant une copie datée, au cas où on te les redemande.",
      code: "-- 1. Combien ? Note le nombre.\nSELECT COUNT(*) AS a_purger FROM dbo.flux_edi WHERE date_recu < '20241101';\n\n-- 2. La copie datée, avant tout\nSELECT * INTO sauv.flux_edi_20261116 FROM dbo.flux_edi WHERE date_recu < '20241101';\n\n-- 3. La purge par lots de 1 000 : sous 5 000 lignes, SQL Server ne bloque pas toute la table\nWHILE 1 = 1\nBEGIN\n  DELETE TOP (1000) FROM dbo.flux_edi WHERE date_recu < '20241101';\n  IF @@ROWCOUNT < 1000 BREAK;   -- le dernier lot : on sort\nEND;",
      codes: {
        snowflake: "-- 1. Combien ?\nSELECT COUNT(*) AS a_purger FROM edi.flux_edi WHERE date_recu < '2024-11-01';\n\n-- 2. La copie datée (ou un CLONE de toute la table, sans recopier les données)\nCREATE TABLE sauv.flux_edi_20261116 AS\n  SELECT * FROM edi.flux_edi WHERE date_recu < '2024-11-01';\n\n-- 3. Un seul DELETE : pas de verrou par ligne, pas de lots\nDELETE FROM edi.flux_edi WHERE date_recu < '2024-11-01';",
        mysql: "-- 1. Combien ?\nSELECT COUNT(*) AS a_purger FROM flux_edi WHERE date_recu < '2024-11-01';\n\n-- 2. La copie datée\nCREATE TABLE sauv_flux_edi_20261116 AS\n  SELECT * FROM flux_edi WHERE date_recu < '2024-11-01';\n\n-- 3. Par lots : relance jusqu'à ce que ROW_COUNT() rende moins de 1 000\nDELETE FROM flux_edi WHERE date_recu < '2024-11-01' LIMIT 1000;\nSELECT ROW_COUNT();"
      }
    },
    etapes: [
      {
        titre: "Le bon geste",
        questions: [
          {
            id: "delete-truncate-drop",
            q: "Veux-tu enlever certaines lignes, vider toute la table, ou supprimer la table elle-même ?",
            pourquoi: "Les trois ne font pas la même chose. `DROP` détruit aussi la structure ; `TRUNCATE` vide tout, sans WHERE ; seul `DELETE` choisit ses lignes.",
            reflexe: "Quelques lignes : `DELETE … WHERE`. Une table de chargement à vider : `TRUNCATE TABLE`, très rapide. Une table inutile : `DROP TABLE`, après avoir vérifié que personne ne la lit.",
            moteurs: {
              sqlserver: "`TRUNCATE` s'annule dans une transaction (un bloc annulable par ROLLBACK), remet l'IDENTITY (le numéro automatique) au départ, et est refusé si une clé étrangère pointe vers la table. Il demande le droit ALTER.",
              snowflake: "`TRUNCATE` efface aussi l'historique de chargement : le `COPY INTO` suivant recharge les fichiers déjà chargés. Un `DROP` se rattrape par `UNDROP` pendant le Time Travel (la durée où Snowflake garde l'état d'avant).",
              mysql: "`TRUNCATE` valide tout de suite (COMMIT implicite) : pas de ROLLBACK. Il remet l'AUTO_INCREMENT au départ."
            }
          },
          {
            id: "logique-physique",
            q: "Faut-il vraiment effacer la ligne, ou seulement la marquer comme supprimée ?",
            pourquoi: "Une ligne effacée disparaît des historiques, et ses liens cassent : une facture ne retrouve plus son client. Une ligne marquée reste, mais tous les rapports doivent la filtrer.",
            reflexe: "Données métier (clients, articles) : marque-les (`est_supprime = 1`, avec la date) et filtre dans une vue. Efface pour de vrai les données techniques (flux, journaux) et ce que la loi oblige à effacer."
          },
          {
            id: "garder-loi",
            q: "Une règle impose-t-elle de garder ces lignes, ou au contraire de les effacer ?",
            pourquoi: "En France, les pièces comptables se gardent 10 ans. À l'inverse, le RGPD (le règlement européen sur les données personnelles) interdit de garder les données d'un client plus longtemps que nécessaire.",
            reflexe: "Écris la durée de conservation de chaque table avec la comptabilité et le délégué à la protection des données (DPO). La purge suit cette règle, pas l'envie de gagner de la place."
          }
        ]
      },
      {
        titre: "Les lignes visées",
        questions: [
          {
            id: "select-dabord",
            q: "As-tu compté les lignes avec un SELECT qui a exactement le même WHERE ?",
            pourquoi: "Le DELETE supprime tout ce que garde le WHERE, sans rien demander. Un WHERE oublié ou trop large vide la table, et 0 ligne supprimée n'est pas une erreur non plus.",
            reflexe: "`SELECT COUNT(*) … WHERE …` : note le nombre. Puis remplace `SELECT COUNT(*)` par `DELETE`, sans toucher au WHERE, et compare le nombre annoncé.",
            moteurs: {
              mysql: "Active `SET sql_safe_updates = 1;` : un DELETE sans clé dans le WHERE et sans LIMIT est refusé (erreur 1175)."
            }
          },
          {
            id: "delete-jointure",
            q: "Choisis-tu les lignes à supprimer d'après une autre table ?",
            pourquoi: "Avec une jointure, une petite erreur d'écriture coûte cher : la mauvaise table perd ses lignes, ou le lien saute, et toute la table part.",
            reflexe: "Préfère `WHERE EXISTS (SELECT 1 FROM … WHERE lien)` : la table touchée est écrite une seule fois, et le lien se voit. Teste-le d'abord en SELECT.",
            moteurs: {
              sqlserver: "`DELETE l FROM dbo.ligne_cde AS l JOIN …` : seule la table de l'alias `l` perd des lignes.",
              snowflake: "`DELETE FROM … USING …` : sans le lien dans le WHERE, toute la table part dès qu'une seule ligne de USING remplit le reste du WHERE.",
              mysql: "Une sous-requête sur la table même que tu supprimes est refusée (erreur 1093). Passe par une table de travail."
            }
          }
        ]
      },
      {
        titre: "Avant d'effacer",
        questions: [
          {
            id: "copie",
            q: "As-tu une copie datée des lignes que tu vas supprimer ?",
            pourquoi: "Une fois validé, un DELETE ne se défait pas d'un clic. Sans copie, il faut restaurer toute la base pour retrouver quelques lignes.",
            reflexe: "Copie les lignes visées juste avant, dans une table datée : `SELECT * INTO sauv.flux_edi_20261116 FROM … WHERE …;` sur SQL Server. Supprime cette copie quand le délai de contestation est passé.",
            moteurs: {
              snowflake: "`CREATE TABLE sauv.flux_edi_20261116 AS SELECT …`, ou un `CLONE` de toute la table, sans recopier les données.",
              mysql: "`CREATE TABLE sauv_flux_edi_20261116 AS SELECT …` : MySQL n'a pas de `SELECT … INTO` vers une nouvelle table."
            }
          },
          {
            id: "transaction",
            q: "Peux-tu annuler la suppression si le nombre annoncé n'est pas le bon ?",
            pourquoi: "En autocommit (le mode par défaut), chaque DELETE est validé dès qu'il finit. Une erreur de WHERE devient alors définitive.",
            reflexe: "Ouvre une transaction, supprime, compare le nombre, puis `COMMIT` ou `ROLLBACK`. Garde-la courte : les lignes restent verrouillées tant qu'elle est ouverte.",
            moteurs: {
              snowflake: "`BEGIN` … `COMMIT`. Un ordre de structure (DDL, comme `DROP TABLE`) au milieu valide la transaction, et ne s'annule pas.",
              mysql: "`START TRANSACTION` … `COMMIT`. `TRUNCATE` et `DROP` valident tout de suite et ne s'annulent pas."
            }
          },
          {
            id: "retour-apres-commit",
            q: "Comment retrouverais-tu les lignes après le COMMIT, demain ou dans un mois ?",
            pourquoi: "Une erreur se voit souvent tard : un rapport faux, un client qui appelle. Il faut savoir, avant de supprimer, jusqu'à quand le retour reste possible.",
            reflexe: "Vérifie qu'une sauvegarde récente existe, et combien de temps elle est gardée. Avec ta copie datée, c'est ton filet.",
            moteurs: {
              sqlserver: "Restaurer une sauvegarde : à un instant précis si la base est en mode de récupération complet, avec les sauvegardes du journal.",
              snowflake: "Time Travel : la table d'avant se relit avec `AT` ou `BEFORE`, 1 jour par défaut, jusqu'à 90 jours (Enterprise). `UNDROP TABLE` rend une table supprimée.",
              mysql: "Restaurer une sauvegarde, puis rejouer le journal binaire (binlog) jusqu'à juste avant l'erreur."
            }
          }
        ]
      },
      {
        titre: "Les tables liées",
        questions: [
          {
            id: "cles-etrangeres",
            q: "D'autres tables pointent-elles vers les lignes que tu supprimes ?",
            pourquoi: "Supprimer une commande qui a encore des lignes est refusé, ou laisse des lignes orphelines (sans parent), selon le moteur. Les totaux par commande deviennent faux.",
            reflexe: "Supprime les enfants d'abord, puis le parent : les lignes de commande, puis la commande. Cherche les orphelins après, avec `NOT EXISTS`.",
            moteurs: {
              sqlserver: "Refusé : erreur 547 (conflit avec la clé étrangère).",
              snowflake: "Accepté : la clé étrangère n'est pas appliquée. Les lignes de commande restent, orphelines.",
              mysql: "Refusé par InnoDB, qui applique la clé étrangère."
            }
          },
          {
            id: "cascade",
            q: "Une clé étrangère a-t-elle une règle ON DELETE CASCADE ?",
            pourquoi: "Avec CASCADE, supprimer un client efface aussi ses commandes, puis leurs lignes, sans message. Tu crois supprimer une ligne, tu en effaces mille.",
            reflexe: "Regarde les règles des clés qui pointent vers ta table avant de supprimer. Une cascade doit être voulue, et écrite dans la documentation.",
            moteurs: {
              sqlserver: "`SELECT name, delete_referential_action_desc FROM sys.foreign_keys WHERE referenced_object_id = OBJECT_ID('dbo.client');`",
              mysql: "`SELECT constraint_name, delete_rule FROM information_schema.referential_constraints WHERE referenced_table_name = 'client';`"
            },
            seulement: ["sqlserver", "mysql"]
          },
          {
            id: "lecteurs",
            q: "Qui lit encore ces lignes : un rapport Power BI, une vue, l'ERP, un autre flux ?",
            pourquoi: "Une purge peut casser un rapport qui calcule un historique sur 3 ans, ou une vue qui lit la table supprimée. On le découvre au prochain comité.",
            reflexe: "Cherche les dépendances avant : les vues et procédures qui citent la table, les rapports qui la lisent. Préviens leurs propriétaires de la date de purge.",
            moteurs: {
              sqlserver: "`SELECT * FROM sys.dm_sql_referencing_entities('dbo.flux_edi', 'OBJECT');` liste les vues et procédures qui citent la table.",
              snowflake: "Une vue qui lit une table supprimée devient invalide : « object does not exist » à chaque lecture."
            }
          }
        ]
      },
      {
        titre: "Les grosses purges",
        questions: [
          {
            id: "lots",
            q: "Combien de lignes vas-tu supprimer, et faut-il purger par lots ?",
            pourquoi: "Un seul DELETE de 2 millions de lignes garde ses verrous (ses lignes réservées) jusqu'au bout, et gonfle le journal (où le moteur note chaque modification). Pendant ce temps, l'ERP attend.",
            reflexe: "Purge par petits lots validés un par un, en boucle jusqu'au dernier, hors des heures de saisie. Une courte pause entre deux lots laisse travailler les autres.",
            moteurs: {
              sqlserver: "Lots de moins de 5 000 lignes : `DELETE TOP (1000) … WHERE …`, jusqu'à ce que `@@ROWCOUNT` passe sous 1 000. Au-delà de 5 000 verrous, SQL Server peut verrouiller toute la table (l'escalade).",
              snowflake: "Un seul DELETE suffit : pas de verrou par ligne, et pas de TOP dans un DELETE.",
              mysql: "`DELETE … LIMIT 1000`, relancé jusqu'à ce que `ROW_COUNT()` passe sous 1 000 : c'est la méthode de la doc."
            }
          },
          {
            id: "journal-stockage",
            q: "Le journal de transactions, ou le stockage, supportera-t-il la purge ?",
            pourquoi: "Chaque ligne supprimée est d'abord écrite dans le journal. Un très gros DELETE peut le remplir, et la base ne peut plus écrire du tout.",
            reflexe: "Vérifie la place du journal avant une grosse purge, et purge par lots. Préviens l'administrateur : il peut sauvegarder le journal entre deux lots.",
            moteurs: {
              sqlserver: "En mode de récupération complet, le journal ne se vide qu'après une sauvegarde du journal : planifie-les pendant la purge.",
              snowflake: "Pas de journal à surveiller, mais les lignes supprimées restent payées en stockage pendant le Time Travel, puis 7 jours de Fail-safe (un secours que seul Snowflake peut rendre, table permanente)."
            }
          },
          {
            id: "garder-plutot",
            q: "Supprimes-tu la plus grande partie de la table ?",
            pourquoi: "Effacer 90 % des lignes est lent et lourd. Il est souvent plus simple de garder les 10 % restants.",
            reflexe: "Copie les lignes à garder dans une nouvelle table de même structure, échange les noms, puis supprime l'ancienne table. Fais-le à un moment où personne n'écrit.",
            moteurs: {
              sqlserver: "Sur une table partitionnée (découpée par date), `TRUNCATE TABLE … WITH (PARTITIONS (1))` vide une partition entière d'un coup.",
              mysql: "C'est la méthode de la doc : `INSERT INTO t_copie SELECT … WHERE …`, puis `RENAME TABLE t TO t_old, t_copie TO t;`."
            }
          }
        ]
      },
      {
        titre: "Après la purge",
        questions: [
          {
            id: "controle-apres",
            q: "Le nombre de lignes supprimées est-il celui que tu attendais ?",
            pourquoi: "Un écart veut dire un WHERE différent de celui du SELECT, ou des lignes ajoutées entre-temps. Sans contrôle, l'erreur reste cachée.",
            reflexe: "Compare le total supprimé au compte du départ. Recompte avec le même WHERE : il doit rendre 0. Note les deux nombres dans ton suivi."
          },
          {
            id: "rgpd-copies",
            q: "Si ce sont des données personnelles, sont-elles effacées partout, copies comprises ?",
            pourquoi: "Un client qui demande l'effacement doit disparaître partout. Ta table `sauv_…`, un export Excel ou un rapport Power BI peuvent encore garder son nom et son adresse.",
            reflexe: "Liste toutes les copies : tables de sauvegarde, tables d'arrivée, exports, rapports. Efface-les aussi, ou rends les lignes anonymes (le nom et l'adresse remplacés).",
            moteurs: {
              sqlserver: "Les sauvegardes de la base gardent aussi les lignes : leur durée de conservation compte.",
              snowflake: "Les lignes supprimées restent lisibles par Time Travel jusqu'à la fin de la rétention, puis 7 jours en Fail-safe (table permanente). Une rétention courte réduit ce délai."
            }
          }
        ]
      }
    ],
    pieges: [
      "`DELETE` sans WHERE, ou WHERE laissé hors de la sélection : toute la table part, sans question.",
      "MySQL : `TRUNCATE` valide tout de suite ; un ROLLBACK ne le rattrape pas.",
      "Snowflake : `TRUNCATE` efface aussi l'historique de chargement ; le `COPY INTO` suivant recharge les anciens fichiers.",
      "`ON DELETE CASCADE` : supprimer un client efface ses commandes et leurs lignes, sans message.",
      "Snowflake n'applique pas les clés étrangères : supprimer une commande laisse ses lignes orphelines.",
      "Un DELETE de 2 millions de lignes en journée sur SQL Server : l'escalade verrouille toute la table, l'ERP attend.",
      "La copie `sauv_client` oubliée : les données « effacées » pour le RGPD sont toujours là.",
      "MySQL : `DELETE … WHERE id IN (SELECT … FROM la même table)` est refusé (erreur 1093).",
      "Snowflake : après un `CREATE OR REPLACE TABLE`, `UNDROP` échoue, le nom est pris : renomme d'abord la nouvelle table."
    ],
    pratique: "Dans Divalto, ne supprime pas en direct dans les tables de l'ERP : passe par les fonctions de l'application. Pour tes tables de flux EDI, écris la durée de conservation dès la création et planifie la purge.",
    motsCles: ["delete", "supprimer", "purge", "truncate", "drop table", "vider une table", "par lots", "suppression logique", "clé étrangère", "cascade", "rgpd", "time travel", "undrop", "sauvegarde"],
    voirAussi: ["mettre-a-jour", "transaction", "sauvegarder", "donnees-personnelles", "relier-tables", "historiser"],
    dico: ["delete", "truncate", "drop-table", "foreign-key", "time-travel", "undrop", "clone", "rowcount"],
    outils: ["dico"],
    sources: [
      { titre: "DELETE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/delete-transact-sql" },
      { titre: "TRUNCATE TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/truncate-table-transact-sql" },
      { titre: "DROP TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/drop-table-transact-sql" },
      { titre: "Guide du verrouillage des transactions et du contrôle de version de ligne", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide" },
      { titre: "Snowflake : TRUNCATE TABLE", url: "https://docs.snowflake.com/en/sql-reference/sql/truncate-table" },
      { titre: "Snowflake : DROP TABLE", url: "https://docs.snowflake.com/en/sql-reference/sql/drop-table" },
      { titre: "MySQL 8.4 : DELETE Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/delete.html" },
      { titre: "MySQL 8.4 : TRUNCATE TABLE Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/truncate-table.html" }
    ]
  },
  {
    id: "script-fichier",
    titre: "J'exécute un script SQL depuis un fichier",
    famille: "Écrire et charger",
    resume: "Les questions avant de lancer un fichier .sql : la bonne cible, l'encodage, l'arrêt à la première erreur, les transactions, les variables, le journal, un script rejouable.",
    besoins: [
      "j'exécute un script sql depuis un fichier",
      "lancer un fichier .sql en ligne de commande",
      "exécuter un script avec sqlcmd",
      "mon script doit s'arrêter à la première erreur"
    ],
    essais: [
      "sqlcmd -i script.sql -o journal",
      "snow sql -f fichier snowflake cli",
      "mysql < script.sql les accents sont casses",
      "lancer plusieurs scripts dans l'ordre"
    ],
    exemple: {
      texte: "Tu livres le script `v12_flux_edi.sql` : il crée une table, ajoute une colonne et met à jour des statuts. Il passe en recette, puis en production. Voici son en-tête, et la commande qui le lance proprement.",
      code: "-- En tête de v12_flux_edi.sql\n-- Arrêt à la 1re erreur (sqlcmd, et SSMS en mode SQLCMD) : la commande seule sur sa ligne\n:on error exit\nSET XACT_ABORT ON;                -- une erreur annule toute la transaction\nSELECT @@SERVERNAME AS serveur, DB_NAME() AS base, SYSDATETIME() AS debut;  -- la cible, au journal\nIF DB_NAME() <> N'$(base)' RAISERROR(N'Mauvaise base : arrêt.', 16, 1);\nGO\n-- Lancement avec sqlcmd version ODBC (celle livrée avec SQL Server) :\n-- sqlcmd -S SRV-SQL-RECETTE -d ventes -b -I -f 65001 -v base=ventes -i v12_flux_edi.sql -o v12_recette.log\n-- sqlcmd (Go) ne connaît pas -f : enlève -f 65001 (il lit déjà l'UTF-8).",
      codes: {
        snowflake: "-- En tête de v12_flux_edi.sql : le contexte, écrit en clair\nUSE ROLE r_deploiement;\nUSE WAREHOUSE wh_deploiement;\nUSE DATABASE ventes;\nUSE SCHEMA edi;\nSELECT CURRENT_ACCOUNT(), CURRENT_ROLE(), CURRENT_WAREHOUSE(),\n       CURRENT_DATABASE(), CURRENT_SCHEMA();   -- la cible, au journal\n-- Lancement, avec Snowflake CLI (le client conseillé) :\n-- snow sql -c recette -f v12_flux_edi.sql --enhanced-exit-codes > v12_recette.log",
        mysql: "-- En tête de v12_flux_edi.sql\nSELECT @@hostname AS serveur, DATABASE() AS base, NOW() AS debut;   -- la cible, au journal\n-- Lancement, dans l'invite de commandes :\n-- mysql --host=srv-mysql-recette --database=ventes --default-character-set=utf8mb4\n--       --verbose < v12_flux_edi.sql > v12_recette.log 2>&1\n-- Sans --force, mysql s'arrête à la 1re erreur ; ce qui est passé avant reste validé."
      }
    },
    etapes: [
      {
        titre: "Le fichier",
        questions: [
          {
            id: "relu-git",
            q: "Le script est-il relu par un collègue, et rangé dans Git avec son ticket ?",
            pourquoi: "Un script lancé depuis un dossier de téléchargement n'a pas d'histoire. Le jour où une donnée est fausse, personne ne sait quelle version a tourné, ni pourquoi.",
            reflexe: "Garde chaque script dans Git (l'outil qui garde l'historique des fichiers), avec la date, l'auteur et le ticket en commentaire d'en-tête. Fais-le relire avant la production."
          },
          {
            id: "encodage",
            q: "En quel encodage le fichier est-il enregistré, et l'outil le lira-t-il pareil ?",
            pourquoi: "Un fichier UTF-8 lu comme du Windows-1252 abîme les accents : « Électricité » devient « Ã‰lectricitÃ© » dans la table, pour de bon.",
            reflexe: "Enregistre tes scripts en UTF-8 (l'encodage qui connaît toutes les lettres), et dis-le à l'outil qui les lance. Relis une ligne accentuée juste après le premier passage en recette.",
            moteurs: {
              sqlserver: "sqlcmd (version ODBC) lit le fichier avec la page de codes de la console, sauf fichier Unicode reconnu : ajoute `-f 65001` (UTF-8). sqlcmd (Go) lit l'UTF-8 seul, et refuse `-f`. Pour une colonne NVARCHAR, écris `N'Électricité'`.",
              mysql: "Le client ignore la marque BOM (des octets invisibles en tête d'un fichier UTF-8), mais ne change pas pour autant de jeu de caractères : ajoute `--default-character-set=utf8mb4`."
            }
          },
          {
            id: "lots-blocs",
            q: "Le script contient-il des séparateurs de lots, ou des blocs de code comme une procédure ?",
            pourquoi: "Chaque outil découpe le fichier à sa façon. Un découpage mal compris donne une erreur de syntaxe, ou une procédure coupée en deux.",
            reflexe: "Repère où l'outil coupe le fichier, et écris les blocs comme il l'attend. Relis le journal : chaque morceau doit avoir son résultat.",
            moteurs: {
              sqlserver: "`GO` n'est pas du SQL : sqlcmd et SSMS envoient au serveur le lot (le texte depuis le GO précédent) à chaque GO. Une variable meurt au GO ; `CREATE PROCEDURE` doit ouvrir son lot.",
              snowflake: "Un bloc Snowflake Scripting (`BEGIN … END`) s'écrit dans `EXECUTE IMMEDIATE $$ … $$` quand le fichier passe par Snowflake CLI ou SnowSQL.",
              mysql: "Pour une procédure ou un trigger, change le séparateur : `DELIMITER //` avant, `DELIMITER ;` après. Sinon, le premier `;` du corps coupe l'instruction."
            }
          }
        ]
      },
      {
        titre: "L'outil de lancement",
        questions: [
          {
            id: "outil-sqlserver",
            q: "Lances-tu le script avec sqlcmd, ou dans SSMS en mode SQLCMD ?",
            pourquoi: "Les commandes `:on error exit`, `:setvar` ou `:r` ne marchent que dans sqlcmd, ou dans SSMS en mode SQLCMD. Ailleurs, elles donnent une erreur, et la suite du script tourne quand même.",
            reflexe: "Dans SSMS : menu Requête, Mode SQLCMD, avant de lancer. En ligne de commande : `sqlcmd -S serveur -d base -i script.sql`.",
            moteurs: {
              sqlserver: "Deux versions existent : `sqlcmd -?` affiche « Version: 1.… » pour sqlcmd (Go). La version ODBC démarre avec QUOTED_IDENTIFIER (le réglage des guillemets doubles) à OFF : ajoute `-I`, sinon un index filtré ne se crée pas, et un UPDATE sur sa table échoue."
            },
            seulement: ["sqlserver"]
          },
          {
            id: "outil-snowflake",
            q: "Lances-tu le script avec Snowflake CLI ou avec SnowSQL ?",
            pourquoi: "SnowSQL est l'ancien client : Snowflake n'y ajoute plus de fonctions (seulement des correctifs) et le supporte jusqu'en avril 2028 (version 1.5). Et lancé avec `-f`, il continue après une erreur.",
            reflexe: "Pour un nouveau script : `snow sql -c recette -f script.sql`. Avec SnowSQL : `snowsql -c recette -f script.sql -o exit_on_error=true`.",
            seulement: ["snowflake"]
          },
          {
            id: "outil-mysql",
            q: "Lances-tu le fichier par `mysql < fichier.sql`, ou par SOURCE dans le client ?",
            pourquoi: "En redirection (`<`), sans `--force`, mysql s'arrête à la première erreur ; ce qui est passé avant reste validé. SOURCE, tapé dans le client, continue après une erreur (vu sur MySQL 8 : vérifie sur ta version).",
            reflexe: "En ligne de commande : `mysql --database=ventes --verbose < script.sql > journal.txt 2>&1`. `--verbose` écrit chaque instruction avant son résultat : le journal dit où ça s'est arrêté.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "La cible",
        questions: [
          {
            id: "cible",
            q: "Sur quel serveur et quelle base le script va-t-il vraiment tourner ?",
            pourquoi: "La connexion par défaut n'est pas toujours celle que tu crois. Un script de recette lancé sur la production modifie les vraies données, sans erreur.",
            reflexe: "Écris la cible dans la commande, et fais-la afficher par le script, en tête du journal. Un script qui se trompe de base doit s'arrêter seul.",
            moteurs: {
              sqlserver: "`SELECT @@SERVERNAME, DB_NAME();` en tête, et `-S`, `-d` dans la commande. Un `USE ventes;` dans le script fixe la base, quelle que soit la connexion.",
              snowflake: "`SELECT CURRENT_ACCOUNT(), CURRENT_DATABASE(), CURRENT_SCHEMA();` en tête du script.",
              mysql: "`SELECT @@hostname, DATABASE();` en tête, et `--host`, `--database` dans la commande."
            }
          },
          {
            id: "contexte-snowflake",
            q: "Le rôle, le warehouse (le moteur de calcul), la base et le schéma sont-ils écrits en tête du script ?",
            pourquoi: "Sinon, ce sont ceux de la connexion qui s'appliquent. Une table créée dans le mauvais schéma, ou par le mauvais rôle, appartient à ce rôle ; sans warehouse, les requêtes échouent.",
            reflexe: "Commence par `USE ROLE`, `USE WAREHOUSE`, `USE DATABASE`, `USE SCHEMA`, puis un SELECT qui les affiche. Prends un rôle de déploiement, jamais ACCOUNTADMIN.",
            seulement: ["snowflake"]
          },
          {
            id: "compte-droits",
            q: "Avec quel compte le script tourne-t-il, et ce compte a-t-il juste les droits utiles ?",
            pourquoi: "Un compte trop faible fait planter le script au milieu. Un compte administrateur laisse passer une erreur grave, comme un DROP sur la mauvaise base.",
            reflexe: "Lance avec un compte de déploiement, qui a les droits du script et pas plus. Aucun mot de passe écrit dans le script ou la commande. Vérifie les droits en recette, avec ce même compte.",
            moteurs: {
              sqlserver: "L'authentification Windows (`-E`, le défaut) évite tout mot de passe ; la doc de sqlcmd la conseille.",
              snowflake: "Une connexion nommée (`-c recette`), définie dans la configuration du client, garde les identifiants hors du script.",
              mysql: "`mysql_config_editor` range les identifiants hors du script ; la commande les lit avec `--login-path=recette`."
            }
          },
          {
            id: "variables",
            q: "Le nom de la base ou de l'environnement est-il écrit en dur dans le script ?",
            pourquoi: "Un script qui cite `ventes_prod` partout doit être modifié pour la recette. Une modification oubliée, et la recette écrit en production.",
            reflexe: "Mets ce qui change d'un environnement à l'autre dans des variables, données au lancement. Le même fichier passe alors en recette et en production.",
            moteurs: {
              sqlserver: "`-v base=ventes` à la ligne de commande, puis `$(base)` dans le script. Pas de `:setvar base` dans le script : il passe avant le `-v`, et la base redevient écrite en dur.",
              snowflake: "Snowflake CLI : `-D base=ventes` à la ligne de commande, et `<% base %>` dans le script.",
              mysql: "Le client n'a pas de variable de script : donne la base par `--database`, et n'écris pas son nom dans le script."
            }
          }
        ]
      },
      {
        titre: "Les erreurs",
        questions: [
          {
            id: "arret-erreur",
            q: "Le script s'arrête-t-il à la première erreur, ou continue-t-il ?",
            pourquoi: "Un script qui continue après une erreur exécute la suite sur une base à moitié modifiée : une table manque, l'UPDATE suivant échoue ou touche les mauvaises lignes.",
            reflexe: "Demande l'arrêt à la première erreur, dans la commande comme dans le script. Puis teste-le : glisse une erreur volontaire en recette, et regarde où ça s'arrête.",
            moteurs: {
              sqlserver: "Par défaut, sqlcmd et SSMS passent au lot suivant. `:on error exit` en tête du script, seul sur sa ligne (sans commentaire derrière), et `-b` pour sqlcmd.",
              snowflake: "Snowflake CLI (`snow sql -f`) s'arrête à la première erreur et rend un code différent de 0 ; il n'a pas d'option pour continuer. SnowSQL avec `-f` continue (exit_on_error vaut False) : ajoute `-o exit_on_error=true`.",
              mysql: "En redirection (`<`), arrêt à la première erreur. `--force` continue malgré les erreurs : à éviter pour un déploiement."
            }
          },
          {
            id: "transaction-milieu",
            q: "Que reste-t-il dans la base si le script s'arrête au milieu ?",
            pourquoi: "Chaque instruction est validée dès qu'elle finit (l'autocommit). Arrêté au milieu, le script laisse un travail à moitié fait : la table est créée, mais vide.",
            reflexe: "Mets les modifications de données qui vont ensemble dans une transaction. Pour le reste, écris le script rejouable : relancé, il termine le travail.",
            moteurs: {
              sqlserver: "`SET XACT_ABORT ON;` puis `BEGIN TRAN … COMMIT` : une erreur annule tout le bloc. Un CREATE TABLE s'annule aussi par ROLLBACK.",
              snowflake: "Un ordre de structure (DDL : CREATE, ALTER, DROP) valide la transaction en cours et ne s'annule pas. `snow sql --single-transaction` n'y change rien : garde le DDL hors des transactions.",
              mysql: "Un ordre de structure (DDL : CREATE, ALTER, DROP, TRUNCATE) valide la transaction en cours, avant et après lui : pas de retour arrière."
            }
          },
          {
            id: "code-retour",
            q: "Le programme qui lance le script (tâche planifiée, agent) voit-il l'échec ?",
            pourquoi: "Un script qui échoue mais rend 0 (« tout va bien ») passe pour réussi. Le flux suivant tourne sur des données fausses, et personne n'est prévenu.",
            reflexe: "Lis le code retour juste après l'outil : `if errorlevel 1` sous Windows, `$?` sous Linux. Un code différent de 0 doit arrêter la chaîne et prévenir quelqu'un.",
            moteurs: {
              sqlserver: "Avec `-b`, sqlcmd rend 1 pour une erreur de gravité supérieure à 10.",
              snowflake: "`snow sql --enhanced-exit-codes` rend 5 pour une erreur de requête ; SnowSQL rend 5 quand `exit_on_error` l'a arrêté."
            }
          },
          {
            id: "journal",
            q: "Où sera écrit le journal de l'exécution, et que contiendra-t-il ?",
            pourquoi: "Sans journal, impossible de dire après coup ce qui a tourné, sur quelle base, et combien de lignes chaque instruction a touchées.",
            reflexe: "Envoie la sortie dans un fichier daté, gardé avec le ticket. Fais écrire au script sa cible, son heure de début et de fin, et les nombres de lignes.",
            moteurs: {
              sqlserver: "`-o v12_recette.log` ; le fichier est écrasé s'il existe déjà.",
              snowflake: "Snowflake CLI : redirige la sortie (`> v12_recette.log`). SnowSQL : `-o output_file=v12_recette.log`.",
              mysql: "Redirige la sortie (`> journal.txt 2>&1`) ; `--tee` ne marche qu'en mode interactif."
            }
          }
        ]
      },
      {
        titre: "Rejouer sans dégât",
        questions: [
          {
            id: "rejouable",
            q: "Peut-on relancer le script sans dégât, après un arrêt au milieu ?",
            pourquoi: "Un script arrêté au milieu se relance. S'il recrée une table qui existe, il plante ; s'il la recrée vide, il efface ses données.",
            reflexe: "Teste ce qui existe avant d'agir : créer seulement si absent, ajouter une colonne seulement si elle manque, insérer avec `NOT EXISTS`. Lancé deux fois en recette, le 2e passage ne doit rien changer.",
            moteurs: {
              sqlserver: "`IF OBJECT_ID(N'edi.flux', N'U') IS NULL CREATE TABLE …` ; `CREATE OR ALTER VIEW` (depuis SQL Server 2016 SP1) ; `IF COL_LENGTH('edi.flux', 'motif') IS NULL ALTER TABLE …`.",
              snowflake: "`CREATE TABLE IF NOT EXISTS`. Jamais `CREATE OR REPLACE TABLE` dans un script relancé : la table revient vide.",
              mysql: "`CREATE TABLE IF NOT EXISTS` ; pour une colonne, teste d'abord `information_schema.columns`."
            }
          },
          {
            id: "ordre",
            q: "Dans quel ordre les scripts doivent-ils passer, et qui note ceux déjà passés ?",
            pourquoi: "Une vue créée avant sa table échoue. Un script passé deux fois, ou oublié, rend la recette et la production différentes, sans que personne le sache.",
            reflexe: "Numérote les fichiers dans l'ordre de passage (`010_creer_table.sql`, `020_vue.sql`). Note chaque script passé, avec sa date, dans une table de suivi ou dans le ticket.",
            moteurs: {
              sqlserver: "Un script chef d'orchestre enchaîne les fichiers avec `:r 010_creer_table.sql` (mode SQLCMD). Le chemin part du dossier de lancement : dans une tâche planifiée, écris le chemin complet.",
              snowflake: "`snow sql -f 010.sql -f 020.sql` les passe dans l'ordre, sur une seule connexion ; ou `!source` dans un fichier chef d'orchestre.",
              mysql: "Un fichier chef d'orchestre, avec une ligne `SOURCE 010_creer_table.sql` par script."
            }
          }
        ]
      },
      {
        titre: "Avant de lancer",
        questions: [
          {
            id: "sauvegarde",
            q: "As-tu une sauvegarde, ou une copie des tables touchées, prise juste avant ?",
            pourquoi: "Un script relu et testé peut encore surprendre en production : un volume différent, une donnée inattendue. Sans copie, revenir en arrière prend des heures.",
            reflexe: "Juste avant : une sauvegarde de la base, ou une copie datée des tables que le script modifie. Note où elle est, et combien de temps elle est gardée.",
            moteurs: {
              snowflake: "Un `CLONE` des tables touchées, juste avant : rapide. Time Travel couvre aussi la durée de rétention (1 jour par défaut)."
            }
          },
          {
            id: "recette",
            q: "Le script a-t-il tourné en recette, sur une copie récente et un vrai volume ?",
            pourquoi: "1 seconde sur 10 000 lignes en recette peut devenir 25 minutes sur 40 millions en production, avec des verrous pendant tout ce temps.",
            reflexe: "Lance-le en recette, sur une copie récente de la production, avec le même outil et les mêmes options qu'en production. Note sa durée pour choisir l'heure de passage."
          }
        ]
      }
    ],
    pieges: [
      "SSMS ou sqlcmd sans `:on error exit` (ni `-b`) : un lot plante, les lots suivants s'exécutent quand même.",
      "SnowSQL lancé avec `-f` continue après une erreur, comme le dit sa doc : ajoute `-o exit_on_error=true`.",
      "Un fichier UTF-8 lu comme du Windows-1252 : « Électricité » devient « Ã‰lectricitÃ© » dans la table.",
      "La connexion par défaut pointait sur la production : le script de recette a modifié les vraies données.",
      "`CREATE OR REPLACE TABLE` dans un script Snowflake relancé : la table revient vide.",
      "MySQL et Snowflake : un CREATE ou un ALTER au milieu valide la transaction ; le ROLLBACK ne rattrape plus ce qui précède.",
      "`mysql --force` va au bout du script malgré les erreurs : il faut lire tout le journal pour les voir.",
      "sqlcmd (ODBC) sans `-I` : QUOTED_IDENTIFIER est à OFF ; créer un index filtré, ou modifier une table qui en a un, échoue.",
      "Une variable `DECLARE @x` utilisée après un `GO` : erreur, elle n'existe plus dans ce nouveau lot.",
      "`sqlcmd … -f 65001` dans une commande de lancement : sqlcmd (Go), installé par winget, prend la place de la version ODBC et refuse `-f`."
    ],
    pratique: "Nomme tes scripts dans l'ordre de passage (`010_…`, `020_…`) et range chaque journal avec le ticket. En cas de doute sur une donnée, c'est la preuve de ce qui a tourné, et quand.",
    motsCles: ["script", "fichier sql", "sqlcmd", "ligne de commande", "go", "snowsql", "snow sql", "snowflake cli", "source", "encodage", "utf-8", "erreur", "journal", "déploiement", "rejouable"],
    voirAussi: ["mettre-en-prod", "transaction", "droits", "sauvegarder", "automatiser", "creer-table"],
    dico: ["xact-abort", "begin-transaction", "commit", "rollback", "trancount", "try-catch", "create-table", "drop-table"],
    outils: ["dico"],
    sources: [
      { titre: "Utilitaire sqlcmd", url: "https://learn.microsoft.com/fr-fr/sql/tools/sqlcmd/sqlcmd-utility" },
      { titre: "Commandes de l'utilitaire sqlcmd", url: "https://learn.microsoft.com/fr-fr/sql/tools/sqlcmd/sqlcmd-commands" },
      { titre: "GO (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/sql-server-utilities-statements-go" },
      { titre: "Snowflake CLI : snow sql", url: "https://docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/sql-commands/sql" },
      { titre: "Snowflake : passer de SnowSQL à Snowflake CLI", url: "https://docs.snowflake.com/en/user-guide/snowsql-migrate" },
      { titre: "Snowflake : les transactions", url: "https://docs.snowflake.com/en/sql-reference/transactions" },
      { titre: "MySQL 8.4 : Executing SQL Statements from a Text File", url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-batch-commands.html" },
      { titre: "MySQL 8.4 : mysql Client Options", url: "https://dev.mysql.com/doc/refman/8.4/en/mysql-command-options.html" }
    ]
  },
  {
    id: "importer-fichier",
    titre: "J'importe un fichier (CSV, Excel, EDI)",
    famille: "Écrire et charger",
    resume: "Les questions avant de charger un fichier : son format exact, une table d'arrivée tout en texte, les contrôles, le comptage, les rejets, et le fichier déjà chargé.",
    besoins: [
      "j'importe un fichier csv dans une table",
      "charger un fichier excel dans la base",
      "importer un fichier dans sql server",
      "intégrer un fichier csv sans erreur"
    ],
    essais: [
      "bulk insert csv point virgule",
      "load data infile mysql csv",
      "import csv les accents sont casses",
      "importer un fichier edi edifact dans la base"
    ],
    exemple: {
      texte: "Un client envoie ses commandes en Excel, chaque semaine. Tu enregistres le classeur en « CSV UTF-8 » : point-virgule, virgule décimale, dates JJ/MM/AAAA. Tu le charges d'abord dans une table d'arrivée (une table de passage) tout en texte, puis tu contrôles avant de convertir.",
      code: "-- 1. La table d'arrivée : les colonnes du fichier, tout en texte\nCREATE TABLE stg.cde_client (\n  num_cde VARCHAR(100), date_txt VARCHAR(100), article VARCHAR(100),\n  qte_txt VARCHAR(100), prix_txt VARCHAR(100));\n\n-- 2. Le chargement (le chemin est vu par le serveur, pas par ton poste)\nBULK INSERT stg.cde_client\nFROM 'D:\\edi\\entrant\\cde_aquableu_0412.csv'\nWITH (FORMAT = 'CSV', FIELDTERMINATOR = ';', FIRSTROW = 2, CODEPAGE = '65001',\n      ERRORFILE = 'D:\\edi\\rejets\\cde_aquableu_0412');\n\n-- 3. Le contrôle : une valeur qui ne se convertit pas donne NULL\nSELECT num_cde, date_txt, prix_txt\nFROM stg.cde_client\nWHERE TRY_CONVERT(date, date_txt, 103) IS NULL\n   OR TRY_CAST(REPLACE(prix_txt, ',', '.') AS decimal(10,2)) IS NULL;   -- les rejets",
      codes: {
        snowflake: "-- 1. Le format du fichier, écrit une fois\nCREATE FILE FORMAT stg.ff_csv_fr\n  TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1\n  FIELD_OPTIONALLY_ENCLOSED_BY = '\"' ENCODING = 'UTF8';\n\n-- 2. Le chargement, tout en texte, avec le fichier et la ligne\nCOPY INTO stg.cde_client (fichier, ligne, num_cde, date_txt, article, qte_txt, prix_txt)\nFROM (SELECT METADATA$FILENAME, METADATA$FILE_ROW_NUMBER, $1, $2, $3, $4, $5\n      FROM @stg.stage_edi/cde_aquableu/)\nFILE_FORMAT = (FORMAT_NAME = 'stg.ff_csv_fr');\n\n-- 3. Le contrôle : TRY_ rend NULL au lieu de planter\nSELECT fichier, ligne, num_cde, date_txt, prix_txt\nFROM stg.cde_client\nWHERE TRY_TO_DATE(date_txt, 'DD/MM/YYYY') IS NULL\n   OR TRY_TO_NUMBER(REPLACE(prix_txt, ',', '.'), 10, 2) IS NULL;",
        mysql: "-- 1. Le chargement, tout en texte (fichier dans le dossier secure_file_priv)\nLOAD DATA INFILE '/var/lib/mysql-files/cde_aquableu_0412.csv'\nINTO TABLE stg_cde_client\nCHARACTER SET utf8mb4\nFIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '\"'\nLINES TERMINATED BY '\\r\\n'\nIGNORE 1 LINES\n(num_cde, date_txt, article, qte_txt, prix_txt)\nSET fichier = 'cde_aquableu_0412.csv';\nSHOW WARNINGS;\n\n-- 2. Le contrôle : STR_TO_DATE rend NULL si le texte ne colle pas au format\nSELECT fichier, ligne, num_cde, date_txt, prix_txt\nFROM stg_cde_client\nWHERE STR_TO_DATE(date_txt, '%d/%m/%Y') IS NULL\n   OR prix_txt NOT REGEXP '^[0-9]+(,[0-9]{1,2})?$';"
      }
    },
    etapes: [
      {
        titre: "Le fichier tel qu'il est",
        questions: [
          {
            id: "ouvrir-texte",
            q: "As-tu ouvert le fichier dans un éditeur de texte, et pas dans Excel ?",
            pourquoi: "Excel montre le fichier à sa façon : il cache les guillemets, change les dates, enlève les zéros. Tu crois connaître le format, et le chargement plante.",
            reflexe: "Ouvre-le dans un éditeur de texte (Notepad++, VS Code). Note le séparateur, les guillemets, l'en-tête, le format des dates et des nombres, et l'encodage affiché en bas."
          },
          {
            id: "separateur-guillemets",
            q: "Quel est le séparateur, et que se passe-t-il s'il apparaît dans une valeur ?",
            pourquoi: "Un nom comme « Piscines; Spa » coupe la ligne et crée une colonne de trop. Tout se décale : le prix part dans la quantité.",
            reflexe: "Vérifie que les valeurs qui contiennent le séparateur sont entre guillemets, et dis-le à l'outil de chargement. Sans guillemets, demande un autre séparateur à l'émetteur.",
            moteurs: {
              sqlserver: "`FORMAT = 'CSV'` (depuis SQL Server 2017) lit les guillemets selon la norme CSV ; `FIELDQUOTE` change le caractère.",
              snowflake: "`FIELD_OPTIONALLY_ENCLOSED_BY = '\"'` : sans lui (défaut NONE), les guillemets restent dans les valeurs.",
              mysql: "`FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '\"'`."
            }
          },
          {
            id: "entete",
            q: "Le fichier a-t-il une ligne d'en-tête, et ses colonnes sont-elles toujours dans le même ordre ?",
            pourquoi: "Un partenaire ajoute une colonne au milieu, sans prévenir : chargée par position, chaque valeur glisse dans la colonne voisine. Et un en-tête chargé comme une donnée fait une ligne fausse.",
            reflexe: "Saute l'en-tête, mais compare-le, à chaque fichier, à l'en-tête attendu. S'il change, arrête le chargement et préviens l'émetteur.",
            moteurs: {
              sqlserver: "`FIRSTROW = 2`. La doc prévient : FIRSTROW ne lit pas l'en-tête, il compte seulement les séparateurs. L'en-tête doit en avoir autant que les lignes de données.",
              snowflake: "`SKIP_HEADER = 1` saute des lignes sans les lire. `PARSE_HEADER = TRUE` avec `MATCH_BY_COLUMN_NAME` charge par nom de colonne.",
              mysql: "`IGNORE 1 LINES`."
            }
          },
          {
            id: "fins-ligne",
            q: "Les lignes finissent-elles par CR+LF (Windows) ou par LF seul (Linux) ?",
            pourquoi: "Avec le mauvais réglage, le caractère CR, invisible, reste collé à la dernière valeur : 'PRO' devient 'PRO\\r', et ne vaut plus 'PRO' dans aucun filtre.",
            reflexe: "Regarde la fin de ligne dans ton éditeur (souvent affichée en bas : CRLF ou LF) et règle l'outil en conséquence. Après le chargement, cherche un CR à la fin de la dernière colonne.",
            moteurs: {
              sqlserver: "Le défaut est CR+LF. Pour un fichier en LF seul : `ROWTERMINATOR = '0x0a'` (un `'\\n'` est lu comme CR+LF).",
              mysql: "Le défaut est `'\\n'` : pour un fichier Windows, `LINES TERMINATED BY '\\r\\n'`."
            }
          },
          {
            id: "encodage",
            q: "En quel encodage est le fichier : UTF-8, Windows-1252, UTF-16 ?",
            pourquoi: "Lu avec le mauvais encodage, « Électricité » devient « Ã‰lectricitÃ© », ou l'import refuse le fichier. Les noms des clients sont abîmés en base.",
            reflexe: "Demande de l'UTF-8 à l'émetteur, et écris l'encodage dans la commande de chargement, même s'il est déjà le défaut. Relis une ligne accentuée après chaque premier chargement.",
            moteurs: {
              sqlserver: "`CODEPAGE = '65001'` pour l'UTF-8 (depuis SQL Server 2016). Le défaut, OEM (une ancienne page de codes de Windows), abîme les accents d'un fichier UTF-8.",
              snowflake: "`ENCODING = 'UTF8'` (le défaut). Un caractère UTF-8 invalide fait échouer le chargement, sauf avec `REPLACE_INVALID_CHARACTERS = TRUE`.",
              mysql: "`CHARACTER SET utf8mb4` dans LOAD DATA. Un fichier UTF-16 (le « Texte Unicode » d'Excel) ne peut pas être chargé."
            }
          }
        ]
      },
      {
        titre: "Les valeurs du fichier",
        questions: [
          {
            id: "dates-decimales",
            q: "Les nombres ont-ils une virgule décimale, et les dates le format JJ/MM/AAAA ?",
            pourquoi: "Laissé au moteur, `12/03/2026` peut devenir le 3 décembre, et `125,50` devenir 125, ou une erreur. Les montants et les dates de livraison sont faux sans bruit.",
            reflexe: "Charge ces valeurs en texte, puis convertis-les toi-même, avec le format écrit. Sur SQL Server : `TRY_CONVERT(date, date_txt, 103)`, et `REPLACE(prix_txt, ',', '.')` avant `TRY_CAST`.",
            moteurs: {
              snowflake: "`DATE_FORMAT` vaut AUTO par défaut : une date avec des / y est lue mois/jour/année. Écris `DATE_FORMAT = 'DD/MM/YYYY'`, ou convertis avec `TRY_TO_DATE`.",
              mysql: "Avec `LOAD DATA LOCAL`, les erreurs deviennent des avertissements : `125,50` entre en 125.00 et `12/03/2026` en 0000-00-00."
            }
          },
          {
            id: "passe-par-excel",
            q: "Le fichier est-il passé par Excel avant d'arriver chez toi ?",
            pourquoi: "Excel enlève les zéros devant (code postal 01200 → 1200), garde 15 chiffres au plus, et change certains codes en dates. Un SSCC (18 chiffres, le numéro des palettes EDI) est abîmé.",
            reflexe: "Demande l'export directement au logiciel source. Sinon, dans Excel, ouvre le CSV par Données, À partir d'un fichier texte/CSV, colonnes de codes en Texte, avant de l'enregistrer."
          },
          {
            id: "vide-null",
            q: "Une case vide du fichier doit-elle devenir NULL, un texte vide ou zéro ?",
            pourquoi: "Chaque outil a sa règle par défaut. Une quantité vide devient 0 au lieu de NULL : la ligne passe les contrôles, et la commande part avec 0 article.",
            reflexe: "Décide la règle avec le métier, puis écris-la dans le chargement. Ensuite, compte les cases vides de chaque colonne.",
            moteurs: {
              sqlserver: "Par défaut, une case vide prend la valeur par défaut de la colonne ; `KEEPNULLS` garde NULL. Sans valeur par défaut, la colonne doit accepter NULL (la doc le dit).",
              snowflake: "`EMPTY_FIELD_AS_NULL = TRUE` par défaut : `;;` donne NULL. `NULL_IF = ('', 'NULL')` change aussi ces textes en NULL.",
              mysql: "Avec LOCAL ou IGNORE, une case vide donne '' pour un texte, 0 pour un nombre, la date zéro pour une date. Sans eux, en mode strict, elle fait échouer le chargement (nombre, date). Seul `\\N` donne NULL."
            }
          }
        ]
      },
      {
        titre: "La table d'arrivée",
        questions: [
          {
            id: "staging-texte",
            q: "Charges-tu d'abord dans une table d'arrivée, avec toutes les colonnes en texte ?",
            pourquoi: "Chargée directement dans la vraie table, une seule valeur fausse bloque tout le fichier, ou entre convertie sans bruit. Tu ne sais plus quelle ligne était fausse.",
            reflexe: "Une table d'arrivée (staging : une table de passage, vidée avant chaque chargement), avec les colonnes du fichier en texte assez long. Elle accepte tout ; tu contrôles ensuite, en SQL.",
            moteurs: {
              snowflake: "Vide-la avec `DELETE`, pas `TRUNCATE` : TRUNCATE efface l'historique de chargement, et le COPY INTO suivant recharge les anciens fichiers restés dans le stage."
            }
          },
          {
            id: "fichier-ligne",
            q: "Chaque ligne chargée garde-t-elle le nom de son fichier et son numéro de ligne ?",
            pourquoi: "Quand une valeur est rejetée, l'émetteur demande : quel fichier, quelle ligne ? Sans ces deux colonnes, tu cherches à la main dans des milliers de lignes.",
            reflexe: "Ajoute `fichier` et `ligne` à la table d'arrivée, et garde-les jusqu'à la table des rejets.",
            moteurs: {
              sqlserver: "BULK INSERT ne les remplit pas : charge par une vue qui montre seulement les colonnes du fichier, puis `UPDATE … SET fichier = 'cde_0412.csv' WHERE fichier IS NULL`.",
              snowflake: "`METADATA$FILENAME` et `METADATA$FILE_ROW_NUMBER`, dans un COPY INTO avec SELECT.",
              mysql: "`SET fichier = 'cde_0412.csv'` dans LOAD DATA ; une colonne AUTO_INCREMENT numérote les lignes chargées."
            }
          },
          {
            id: "controle-conversion",
            q: "Comment chaque valeur est-elle contrôlée avant d'entrer dans la vraie table ?",
            pourquoi: "Une conversion directe s'arrête à la première valeur fausse : tout le fichier est bloqué pour une date mal écrite.",
            reflexe: "Convertis avec les fonctions TRY (NULL au lieu d'une erreur) et liste les échecs. Vérifie aussi les références (l'article existe ?), les doublons et les valeurs hors bornes. Seules les lignes propres passent.",
            moteurs: {
              sqlserver: "`TRY_CONVERT(date, date_txt, 103)`, `TRY_CAST(… AS decimal(10,2))`.",
              snowflake: "`TRY_TO_DATE(date_txt, 'DD/MM/YYYY')`, `TRY_TO_NUMBER(…, 10, 2)`.",
              mysql: "`STR_TO_DATE(date_txt, '%d/%m/%Y')` rend NULL si le texte ne colle pas ; pour un nombre, teste d'abord avec `REGEXP`."
            }
          }
        ]
      },
      {
        titre: "Compter et rejeter",
        questions: [
          {
            id: "compter",
            q: "Lignes du fichier = lignes chargées + lignes rejetées : le compte tombe-t-il juste ?",
            pourquoi: "Une ligne peut disparaître sans erreur : sautée comme un en-tête, écartée par une tolérance, collée à une autre par un retour à la ligne dans une valeur. Seul le compte le montre.",
            reflexe: "Compte les lignes du fichier avant (`(Get-Content f.csv).Count` sous PowerShell), puis celles chargées et rejetées. Écris les trois nombres dans ta table de suivi des fichiers.",
            moteurs: {
              snowflake: "Le COPY INTO rend, par fichier, `rows_parsed` et `rows_loaded`. La fonction `COPY_HISTORY` montre les 14 derniers jours.",
              mysql: "`ROW_COUNT()` après LOAD DATA, puis `SHOW WARNINGS;` : chaque avertissement est une valeur changée."
            }
          },
          {
            id: "rejets",
            q: "Où vont les lignes rejetées, avec quel motif, et qui les traite ?",
            pourquoi: "Un rejet que personne ne lit est une commande perdue. Le client relance trois jours plus tard, et personne ne sait pourquoi elle manque.",
            reflexe: "Range les rejets dans une table, avec fichier, ligne et motif (« date invalide »). Envoie la liste au responsable du flux à chaque chargement, même vide.",
            moteurs: {
              sqlserver: "`ERRORFILE` garde les lignes illisibles, avec un fichier `.ERROR.txt` qui dit pourquoi ; s'il existe déjà, BULK INSERT échoue : date son nom. `MAXERRORS` vaut 10 par défaut : jusqu'à 10 lignes sont écartées, et le reste est chargé.",
              snowflake: "`ON_ERROR = ABORT_STATEMENT` (le défaut) arrête tout. Avec `CONTINUE`, liste ensuite les erreurs : `VALIDATE(stg.cde_client, JOB_ID => '_last')`, pour un COPY sans transformation.",
              mysql: "Avec `LOCAL` ou `IGNORE`, les erreurs deviennent des avertissements : lis `SHOW WARNINGS` à chaque fois. Sans eux, la première erreur arrête tout."
            }
          },
          {
            id: "tester-avant",
            q: "As-tu essayé le chargement sur de vrais fichiers avant la mise en service ?",
            pourquoi: "Un vrai fichier a toujours une surprise : un nom avec un point-virgule, une date vide, une ligne en trop à la fin. Mieux vaut la voir en recette.",
            reflexe: "Charge plusieurs vrais fichiers en recette, dont un « sale ». Vérifie le compte, les rejets, et trois lignes prises au hasard, comparées au fichier.",
            moteurs: {
              snowflake: "`VALIDATION_MODE = RETURN_ERRORS` liste toutes les erreurs sans rien charger ; il ne marche pas avec un COPY qui transforme (SELECT)."
            }
          }
        ]
      },
      {
        titre: "Le fichier déjà chargé",
        questions: [
          {
            id: "deja-charge",
            q: "Ce fichier a-t-il déjà été chargé, même sous un autre nom ?",
            pourquoi: "Un partenaire renvoie le même fichier, ou ton traitement est relancé : les commandes entrent deux fois, et partent deux fois en livraison.",
            reflexe: "Tiens une table des fichiers chargés : nom, taille, empreinte (un calcul qui identifie le contenu, comme SHA-256), date, lignes. Refuse un fichier dont l'empreinte est déjà connue.",
            moteurs: {
              sqlserver: "`BULK INSERT` recharge un fichier relancé : doublons, ou erreur de clé.",
              snowflake: "`COPY INTO` saute un fichier déjà chargé, grâce à son historique de chargement (64 jours ; au-delà, il le saute aussi, par défaut). Mais `TRUNCATE` efface cet historique, `FORCE = TRUE` recharge tout, et un même contenu sous un autre nom est rechargé.",
              mysql: "`LOAD DATA` recharge un fichier relancé : doublons, ou erreur de clé (`REPLACE` et `IGNORE` changent ce comportement)."
            }
          },
          {
            id: "recharger",
            q: "Si tu dois recharger un fichier corrigé, comment enlèves-tu d'abord l'ancien chargement ?",
            pourquoi: "Recharger par-dessus l'ancien double les lignes déjà bonnes. Supprimer « à vue » les mauvaises lignes en oublie toujours une.",
            reflexe: "Grâce à la colonne `fichier`, supprime toutes les lignes de ce fichier, puis recharge-le en entier, dans une transaction. Note le rechargement dans la table des fichiers.",
            moteurs: {
              snowflake: "Un fichier modifié puis déposé à nouveau se recharge. Le même fichier, inchangé, demande `FORCE = TRUE`."
            }
          }
        ]
      },
      {
        titre: "Le dépôt du fichier",
        questions: [
          {
            id: "chemin",
            q: "Le serveur voit-il le fichier, ou seulement ton poste ?",
            pourquoi: "Le chemin `C:\\Users\\toi\\cde.csv` existe sur ton poste, pas sur le serveur. L'import marche sur ta machine de test, et échoue en production.",
            reflexe: "Dépose les fichiers dans un dossier partagé que le serveur lit, avec un compte de service qui a le droit d'y lire. Écris ce chemin dans la documentation du flux.",
            moteurs: {
              sqlserver: "`BULK INSERT` lit le fichier depuis le serveur : un chemin local au serveur, ou un partage `\\\\serveur\\partage\\…`. Il lit avec le compte du service SQL Server (login SQL), ou avec le tien (connexion Windows). Droits : INSERT et ADMINISTER BULK OPERATIONS.",
              snowflake: "Le fichier part d'abord dans un stage (une zone de dépôt) : `PUT` depuis Snowflake CLI, ou un stockage externe (S3, Azure).",
              mysql: "Sans LOCAL : fichier sur le serveur, dans le dossier `secure_file_priv`, avec le droit FILE. Avec LOCAL : `local_infile` doit être actif sur le serveur et dans le client (`--local-infile=1`)."
            }
          },
          {
            id: "fichier-complet",
            q: "Le fichier est-il complet quand ton traitement le lit ?",
            pourquoi: "Un traitement qui part pendant que le partenaire dépose encore le fichier lit un fichier coupé : la moitié des commandes est chargée, sans erreur, et le fichier est noté comme chargé.",
            reflexe: "Fais déposer le fichier sous un nom provisoire (`.tmp`), renommé à la fin, ou suivi d'un fichier témoin (`.ok`). Ne lis que les fichiers terminés. Une ligne de total en fin de fichier permet aussi de vérifier."
          }
        ]
      },
      {
        titre: "Les cas à part",
        questions: [
          {
            id: "edifact",
            q: "Le fichier est-il un message EDIFACT (ORDERS, DESADV, INVOIC) ?",
            pourquoi: "Un message EDIFACT n'est pas un CSV : ce sont des segments (UNH, BGM, DTM, LIN…) terminés par une apostrophe, avec des niveaux imbriqués. Découpé en SQL, il casse au premier cas imprévu.",
            reflexe: "Fais-le passer par le traducteur EDI (le logiciel qui convertit le message), qui produit un fichier à plat ou remplit des tables. Tu charges et contrôles cette sortie, avec le numéro du message."
          },
          {
            id: "excel-xlsx",
            q: "Le fichier est-il un classeur Excel (.xlsx) ?",
            pourquoi: "BULK INSERT, COPY INTO et LOAD DATA ne lisent pas un classeur Excel. Et un classeur peut cacher plusieurs onglets, des lignes de total et des cellules fusionnées.",
            reflexe: "Enregistre l'onglet utile en « CSV UTF-8 (délimité par des virgules) », après avoir retiré les totaux et les lignes vides. Le séparateur suit les réglages régionaux de Windows : vérifie-le dans un éditeur.",
            moteurs: {
              snowflake: "`COPY INTO` lit CSV, JSON, Avro, ORC, Parquet et XML : pas de .xlsx."
            }
          }
        ]
      }
    ],
    pieges: [
      "BULK INSERT et bcp écartent jusqu'à 10 lignes en erreur par défaut (`MAXERRORS`, `-m`) : le reste est chargé, et le compte ne tombe plus juste.",
      "MySQL `LOAD DATA LOCAL` : '125,50' devient 125.00 et '12/03/2026' devient 0000-00-00, avec de simples avertissements.",
      "Snowflake : sans `FIELD_OPTIONALLY_ENCLOSED_BY`, les guillemets restent dans les valeurs, et un ; dans un nom décale les colonnes.",
      "Excel enlève les zéros devant (01200 → 1200) et garde 15 chiffres au plus : un SSCC de 18 chiffres est abîmé.",
      "Un fichier rechargé : BULK INSERT et LOAD DATA le chargent une 2e fois ; Snowflake le saute, sauf après un TRUNCATE ou avec `FORCE = TRUE`.",
      "BULK INSERT sans `CHECK_CONSTRAINTS` ne vérifie ni les CHECK ni les clés étrangères ; sans `FIRE_TRIGGERS`, les triggers ne tournent pas.",
      "Snowflake en AUTO : '05/02/2026' est lu comme le 2 mai.",
      "Le CR de fin de ligne Windows collé à la dernière valeur : 'PRO\\r' ne vaut plus 'PRO'.",
      "Le chemin du fichier est celui de ton poste : en production, le serveur ne le trouve pas."
    ],
    pratique: "Fais écrire le format attendu dans un contrat d'interface avec l'émetteur : CSV UTF-8, séparateur, point décimal, dates AAAA-MM-JJ, en-tête. Un écart devient un rejet clair, pas une correction chaque semaine.",
    motsCles: ["import", "importer", "csv", "fichier", "bulk insert", "bcp", "copy into", "load data", "excel", "encodage", "séparateur", "staging", "rejets", "edifact", "point-virgule"],
    voirAussi: ["table-import", "charger-snowflake", "ecrire-valeur", "inserer", "doublons", "automatiser", "exporter"],
    dico: ["copy-into", "stage", "try-cast", "to-date", "convert", "insert-select", "truncate", "varchar"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "BULK INSERT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/bulk-insert-transact-sql" },
      { titre: "Utilitaire bcp", url: "https://learn.microsoft.com/fr-fr/sql/tools/bcp-utility" },
      { titre: "Conserver les valeurs NULL ou les valeurs par défaut lors de l'importation en bloc", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/import-export/keep-nulls-or-use-default-values-during-bulk-import-sql-server" },
      { titre: "Snowflake : COPY INTO <table>", url: "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table" },
      { titre: "Snowflake : CREATE FILE FORMAT", url: "https://docs.snowflake.com/en/sql-reference/sql/create-file-format" },
      { titre: "Snowflake : préparer le chargement (historique de chargement)", url: "https://docs.snowflake.com/en/user-guide/data-load-considerations-load" },
      { titre: "MySQL 8.4 : LOAD DATA Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/load-data.html" },
      { titre: "Excel : garder les zéros devant et les grands nombres", url: "https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/excel/last-digits-changed-to-zeros" }
    ]
  },
  // Vague 2 (17/11/2026), expert « Écrire et charger » : fusionner, transaction, charger-snowflake, exporter, corriger-prod.
  // Pages officielles lues et gardées dans le scratchpad architecte/v2-ecrire/pages (Microsoft Learn sql-server-ver17,
  // docs.snowflake.com, MySQL 8.4, base Divalto). Essais refaits sur MySQL 8.0.46 (serveur jetable, bases essai_v2 et base) :
  // ON DUPLICATE KEY UPDATE (table dérivée, alias AS n, VALUES() = avertissement 1287, ROW_COUNT 1/2/0, doublon source : la
  // dernière gagne), REPLACE (supprime puis insère : cascade des commandes, triggers DELETE + INSERT, colonne non citée remise
  // à NULL, nouvel id ; erreur 1451 avec une clé étrangère sans cascade), START TRANSACTION imbriqué = COMMIT implicite, DDL =
  // COMMIT implicite, MyISAM + ROLLBACK = avertissement 1196, script arrêté sur erreur = transaction annulée à la déconnexion
  // (avec --force : COMMIT du reste, code retour 0), interblocage 1213 (toute la transaction annulée), attente 1205 (seule
  // l'instruction), handler EXIT + ROLLBACK + RESIGNAL, INTO OUTFILE (1086, 1290, \N, guillemet écrit \", pas de BOM,
  // ROW_COUNT = lignes écrites), client --batch (en-tête, NULL écrit NULL). Nombres des exemples vérifiés avec SQLite sur
  // docs/base-exemple.sql (2 factures pour 2 464,80 ; 4 commandes ANNULEE dont CDE-1004 ; 1 ajout, 1 modification, 1 disparu).
  {
    id: "fusionner",
    titre: "Je fusionne deux tables (MERGE)",
    famille: "Écrire et charger",
    resume: "Les questions avant un MERGE : la clé de rapprochement, une seule ligne source par clé, ce qui change vraiment, les lignes disparues, la concurrence, et MySQL sans MERGE.",
    besoins: [
      "je fusionne deux tables avec merge",
      "mettre à jour si la ligne existe sinon l'insérer",
      "synchroniser une table avec une table de chargement",
      "faire un upsert"
    ],
    essais: [
      "merge when matched when not matched sql server",
      "upsert snowflake merge into",
      "on duplicate key update mysql à la place de merge",
      "synchronisation incrementale d'une table"
    ],
    exemple: {
      texte: "Chaque nuit, l'extraction complète des clients de Divalto arrive dans `stg.client_jour` (7 clients). Tu synchronises `dw.client`, la table lue par Power BI : 1 client nouveau (C007), 1 client modifié (C003 a maintenant une ville), 1 client disparu de Divalto (C009), à désactiver sans l'effacer. Les 5 autres ne doivent pas être réécrits.",
      code: "-- Avant : une ligne par code (0 ligne attendue), et une extraction complète\nSELECT code FROM stg.client_jour GROUP BY code HAVING COUNT(*) > 1;\nSELECT COUNT(*) FROM stg.client_jour;   -- 7 : pas beaucoup moins que la veille ?\n\nMERGE INTO dw.client AS c\nUSING stg.client_jour AS s\n   ON c.code = s.code                                   -- la clé, et rien d'autre\nWHEN MATCHED AND (c.nom IS DISTINCT FROM s.nom           -- SQL Server 2022 ou plus\n               OR c.ville IS DISTINCT FROM s.ville OR c.est_actif = 0) THEN\n  UPDATE SET nom = s.nom, ville = s.ville, est_actif = 1, date_modif = SYSDATETIME()\nWHEN NOT MATCHED BY TARGET THEN\n  INSERT (code, nom, ville, est_actif, date_modif)\n  VALUES (s.code, s.nom, s.ville, 1, SYSDATETIME())\nWHEN NOT MATCHED BY SOURCE AND c.est_actif = 1 THEN\n  UPDATE SET est_actif = 0, date_modif = SYSDATETIME()   -- désactivé, pas effacé\nOUTPUT $action, inserted.code INTO suivi.merge_client (action, code);\n-- Attendu : 1 INSERT (C007), 2 UPDATE (C003, et C009 désactivé), 5 clients non touchés",
      codes: {
        snowflake: "-- Avant : une ligne par code (0 ligne attendue), et une extraction complète\nSELECT code FROM stg.client_jour GROUP BY code HAVING COUNT(*) > 1;\n\nBEGIN TRANSACTION;\nMERGE INTO dw.client c\nUSING stg.client_jour s\n   ON c.code = s.code\nWHEN MATCHED AND (c.nom IS DISTINCT FROM s.nom\n               OR c.ville IS DISTINCT FROM s.ville OR NOT c.est_actif) THEN\n  UPDATE SET nom = s.nom, ville = s.ville, est_actif = TRUE, date_modif = CURRENT_TIMESTAMP()\nWHEN NOT MATCHED THEN\n  INSERT (code, nom, ville, est_actif, date_modif)\n  VALUES (s.code, s.nom, s.ville, TRUE, CURRENT_TIMESTAMP());\n-- « number of rows inserted » : 1, « updated » : 1\n-- Pas de NOT MATCHED BY SOURCE : les disparus, par un UPDATE à part\nUPDATE dw.client SET est_actif = FALSE, date_modif = CURRENT_TIMESTAMP()\nWHERE est_actif\n  AND NOT EXISTS (SELECT 1 FROM stg.client_jour AS s WHERE s.code = client.code);\nCOMMIT;",
        mysql: "-- Pas de MERGE : INSERT … ON DUPLICATE KEY UPDATE, sur la clé UNIQUE (code)\nSTART TRANSACTION;\nINSERT INTO dw_client (code, nom, ville, est_actif)\nSELECT * FROM (SELECT code AS s_code, nom AS s_nom, ville AS s_ville, 1 AS s_actif\n               FROM stg_client_jour) AS s\nON DUPLICATE KEY UPDATE nom = s_nom, ville = s_ville, est_actif = 1;\nSELECT ROW_COUNT();   -- 3 : C007 ajouté (1) + C003 modifié (2) ; inchangé : 0\n-- Les disparus, à part\nUPDATE dw_client AS c LEFT JOIN stg_client_jour AS s ON s.code = c.code\nSET c.est_actif = 0\nWHERE s.code IS NULL AND c.est_actif = 1;\nCOMMIT;\n-- date_modif (ON UPDATE CURRENT_TIMESTAMP) ne change que si une valeur change"
      }
    },
    etapes: [
      {
        titre: "Le bon outil",
        questions: [
          {
            id: "bon-outil",
            q: "MERGE est-il le bon outil, ou un INSERT et un UPDATE séparés suffisent-ils ?",
            pourquoi: "Un MERGE fait en une seule instruction l'ajout, la mise à jour, et même la suppression : c'est un « upsert ». Pour seulement ajouter des lignes nouvelles, il complique le code sans rien apporter.",
            reflexe: "Seulement des lignes nouvelles : un `INSERT … WHERE NOT EXISTS` (voir « J'insère des lignes »). Des nouvelles et des modifiées : un MERGE. Écris d'abord, en français, ce que chaque cas doit faire.",
            moteurs: {
              sqlserver: "La doc prévient : à grande échelle, MERGE peut poser des problèmes de concurrence difficiles. Avec beaucoup d'écritures en même temps, un INSERT, un UPDATE et un DELETE séparés peuvent moins bloquer.",
              mysql: "Pas de MERGE : `INSERT … ON DUPLICATE KEY UPDATE`, ou un UPDATE puis un INSERT. Voir l'étape « MySQL : sans MERGE »."
            }
          }
        ]
      },
      {
        titre: "La clé de rapprochement",
        questions: [
          {
            id: "cle",
            q: "Sur quelle clé rapproches-tu la source et la cible, et est-elle complète ?",
            pourquoi: "Une clé incomplète, comme le code client sans la société, ou l'article sans le dépôt, rapproche les mauvaises lignes. Le MERGE met à jour le mauvais client, ou crée des doublons, sans erreur.",
            reflexe: "Prends la clé métier entière : `ON c.societe = s.societe AND c.code = s.code`. Vérifie qu'elle a le même type et le même format des deux côtés : zéros devant, espaces, majuscules.",
            moteurs: {
              sqlserver: "En collation insensible à la casse, 'c001' trouve 'C001', et les espaces de fin sont ignorés.",
              snowflake: "La casse et les espaces de fin comptent : 'C001 ' ne trouve pas 'C001', et la ligne est ajoutée une 2e fois.",
              mysql: "Collation par défaut : la casse ne compte pas, mais les espaces de fin comptent (NO PAD)."
            }
          },
          {
            id: "on-cle",
            q: "Le ON ne contient-il que la clé, sans autre filtre ?",
            pourquoi: "Un filtre dans le ON, comme `AND c.depot_id = 1`, fait passer les autres lignes de la cible pour absentes. Le MERGE ajoute en double les lignes de la source, ou désactive des lignes qui n'ont rien à voir.",
            reflexe: "Mets dans le ON seulement les colonnes de la clé. Filtre la source avant (une vue, ou la table d'arrivée), et limite chaque cas par sa condition : `WHEN NOT MATCHED BY SOURCE AND c.depot_id = 1`.",
            moteurs: {
              sqlserver: "La doc le dit : filtrer la cible dans le ON « peut rendre des résultats inattendus et faux ». Elle conseille la condition des WHEN, ou une vue."
            }
          },
          {
            id: "source-unique",
            q: "Chaque clé apparaît-elle une seule fois dans la source ?",
            pourquoi: "Un client présent deux fois dans l'extraction : le moteur ne sait pas quelle ligne prendre. Selon le moteur, tout le MERGE échoue, une des lignes est prise sans dire laquelle, ou le client est ajouté deux fois.",
            reflexe: "Avant le MERGE : `SELECT code FROM stg.client_jour GROUP BY code HAVING COUNT(*) > 1;` doit rendre 0 ligne. Sinon, garde une ligne par clé (la plus récente, avec `ROW_NUMBER()`), ou rejette le fichier.",
            moteurs: {
              sqlserver: "Erreur 8672 : une ligne de la cible serait modifiée plusieurs fois, et tout le MERGE est refusé. Si la clé est nouvelle, les deux lignes sont ajoutées : seule une clé UNIQUE l'empêche.",
              snowflake: "Erreur par défaut (`ERROR_ON_NONDETERMINISTIC_MERGE = TRUE`) ; avec FALSE, une des lignes est prise, sans dire laquelle. Si la clé est nouvelle, chaque copie est ajoutée (doc), et UNIQUE n'est pas appliqué.",
              mysql: "Avec `ON DUPLICATE KEY UPDATE`, la 2e ligne met à jour la 1re : la dernière gagne, sans erreur (vu sur MySQL 8.0)."
            }
          },
          {
            id: "cle-null",
            q: "La clé peut-elle être vide (NULL) dans la source ?",
            pourquoi: "NULL n'est égal à rien, pas même à NULL. Une ligne sans clé ne trouve jamais la cible : elle est ajoutée à chaque passage, et les doublons grossissent chaque nuit.",
            reflexe: "Écarte les clés NULL avant le MERGE (`WHERE code IS NOT NULL`) et range-les dans tes rejets, avec le motif « clé absente ». Compte-les à chaque passage."
          },
          {
            id: "cible-unique",
            q: "La clé est-elle protégée par une contrainte UNIQUE dans la cible ?",
            pourquoi: "Sans contrainte, un doublon entré par un autre chemin (un INSERT à la main, un 2e flux) reste invisible. Le MERGE met alors à jour les deux lignes, et Power BI compte le client deux fois.",
            reflexe: "Pose une clé primaire ou un index UNIQUE sur la clé de la cible. Sur SQL Server, la doc conseille aussi un index sur la clé côté source, unique si possible.",
            moteurs: {
              snowflake: "UNIQUE n'est pas appliqué sur une table standard : le MERGE est ta seule protection. Contrôle après chaque passage : `GROUP BY code HAVING COUNT(*) > 1`.",
              mysql: "`ON DUPLICATE KEY UPDATE` ne marche que sur une clé primaire ou UNIQUE. Avec plusieurs clés UNIQUE, la doc conseille de l'éviter : une seule ligne est mise à jour."
            }
          }
        ]
      },
      {
        titre: "Ce que fait chaque cas",
        questions: [
          {
            id: "que-change",
            q: "Ne mets-tu à jour que les lignes qui ont vraiment changé ?",
            pourquoi: "Sans condition, chaque ligne trouvée est réécrite à chaque passage, même identique. Les déclencheurs tournent, `date_modif` change pour tous les clients, et un rapport qui suit cette date croit que tout a bougé.",
            reflexe: "Ajoute la différence au cas des lignes trouvées : `WHEN MATCHED AND (c.nom IS DISTINCT FROM s.nom OR …)`. Le compte des mises à jour devient celui des vrais changements.",
            moteurs: {
              snowflake: "Une ligne réécrite à l'identique compte comme mise à jour (exemple de la doc). Et Snowflake réécrit chaque micro-partition (bloc de stockage) qu'il touche.",
              mysql: "Une ligne remise à ses valeurs compte 0 dans `ROW_COUNT()`, et une colonne `ON UPDATE CURRENT_TIMESTAMP` ne change pas (doc)."
            }
          },
          {
            id: "null-compare",
            q: "Ta comparaison voit-elle le passage d'une valeur vide (NULL) à une vraie valeur ?",
            pourquoi: "`c.ville <> s.ville` n'est jamais vrai quand un des deux est NULL. C003 passe de « sans ville » à Nice : la condition ne le voit pas, et Power BI garde la case vide.",
            reflexe: "Compare en comptant NULL comme une valeur : `IS DISTINCT FROM`, ou son équivalent. Teste avec une ligne qui passe de NULL à une valeur, et une qui passe d'une valeur à NULL.",
            moteurs: {
              sqlserver: "`IS DISTINCT FROM` depuis SQL Server 2022. Avant : `WHEN MATCHED AND EXISTS (SELECT c.nom, c.ville EXCEPT SELECT s.nom, s.ville)` ; EXCEPT compte deux NULL comme égaux (doc).",
              snowflake: "`IS DISTINCT FROM`, ou `NOT EQUAL_NULL(c.ville, s.ville)`.",
              mysql: "`NOT (c.ville <=> s.ville)` : `<=>` est l'égal qui compte NULL comme une valeur."
            }
          },
          {
            id: "disparus",
            q: "Que deviennent les lignes de la cible absentes de la source : supprimées, désactivées, ou gardées ?",
            pourquoi: "Un client absent de l'extraction n'est pas forcément supprimé dans Divalto : il peut être filtré, ou l'extraction a échoué. Le supprimer efface aussi ses ventes passées dans les rapports.",
            reflexe: "Décide-le avec le métier. Souvent : désactiver (`est_actif = 0`), pas effacer. Sur SQL Server : `WHEN NOT MATCHED BY SOURCE AND c.est_actif = 1 THEN UPDATE SET est_actif = 0`.",
            moteurs: {
              sqlserver: "`WHEN NOT MATCHED BY SOURCE` : deux clauses au plus, l'une UPDATE, l'autre DELETE. Leur condition ne peut citer que des colonnes de la cible.",
              snowflake: "Pas de `NOT MATCHED BY SOURCE` (doc actuelle) : un UPDATE ou un DELETE à part, avec `NOT EXISTS`, dans la même transaction.",
              mysql: "Un UPDATE ou un DELETE à part : `LEFT JOIN` sur la source, `WHERE s.code IS NULL`."
            }
          },
          {
            id: "source-complete",
            q: "La source est-elle complète, ou seulement un morceau : un dépôt, un jour, un fichier coupé ?",
            pourquoi: "Avec un fichier partiel, tout ce qui manque passe pour disparu. Une extraction vide ou coupée, et le MERGE désactive, ou supprime, la moitié des clients, sans erreur.",
            reflexe: "Avant de traiter les disparus, compare le nombre de lignes de la source à celui de la veille : arrête tout sous un seuil (moins de 90 %, ou 0 ligne). Une source partielle : limite le cas des disparus à son périmètre."
          }
        ]
      },
      {
        titre: "MySQL : sans MERGE",
        questions: [
          {
            id: "odku",
            q: "Remplaces-tu le MERGE par INSERT … ON DUPLICATE KEY UPDATE ?",
            pourquoi: "MySQL n'a pas de MERGE. `ON DUPLICATE KEY UPDATE` ajoute la ligne, ou met à jour celle qui a la même clé primaire ou UNIQUE. Sans clé UNIQUE sur le code, il ajoute toujours : doublons.",
            reflexe: "Vérifie la clé UNIQUE de la cible. Lis `ROW_COUNT()` : 1 par ligne ajoutée, 2 par ligne modifiée, 0 si elle était déjà à jour (doc). Les disparus : un UPDATE à part.",
            seulement: ["mysql"]
          },
          {
            id: "values-alias",
            q: "Écris-tu encore VALUES(col) dans la partie ON DUPLICATE KEY UPDATE ?",
            pourquoi: "La doc 8.4 dit `VALUES()` dépréciée, et à retirer dans une prochaine version. MySQL renvoie déjà un avertissement (1287, vu sur MySQL 8.0) : ton script cassera à une montée de version.",
            reflexe: "Avec VALUES, un alias de ligne : `VALUES (…) AS n ON DUPLICATE KEY UPDATE nom = n.nom`. Avec un SELECT, une table dérivée dont tu cites les colonnes (`nom = s_nom`), comme dans l'exemple.",
            seulement: ["mysql"]
          },
          {
            id: "replace",
            q: "Penses-tu à REPLACE pour remplacer les lignes existantes ?",
            pourquoi: "REPLACE supprime l'ancienne ligne, puis insère la nouvelle. Une clé étrangère `ON DELETE CASCADE` efface ses commandes ; les déclencheurs DELETE tournent ; les colonnes non citées reprennent leur valeur par défaut ; l'id automatique change.",
            reflexe: "Préfère `ON DUPLICATE KEY UPDATE` : il modifie la ligne en place, garde son id et ne touche pas aux tables liées. Avec une clé étrangère sans cascade, REPLACE échoue (erreur 1451, vu sur MySQL 8.0).",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Concurrence et volume",
        questions: [
          {
            id: "concurrence",
            q: "Un autre traitement peut-il écrire dans la table pendant ton MERGE ?",
            pourquoi: "Deux MERGE lancés en même temps voient tous les deux un client comme nouveau, et l'ajoutent tous les deux : une erreur de clé, ou un doublon là où la clé n'est pas appliquée.",
            reflexe: "Un seul chargement à la fois par table : enchaîne les traitements, ne les lance pas en parallèle. Teste le MERGE en recette, avec la charge réelle, avant la production.",
            moteurs: {
              sqlserver: "La doc : `MERGE dw.client WITH (HOLDLOCK) AS c …` évite les violations de clé unique quand des clés sont ajoutées et modifiées en même temps. HOLDLOCK = SERIALIZABLE : plus sûr, mais il bloque davantage.",
              snowflake: "Deux MERGE, UPDATE ou DELETE sur la même table s'attendent en général ; un INSERT ou un COPY peut parfois passer en même temps (doc). La clé n'étant pas appliquée, un doublon peut entrer."
            }
          },
          {
            id: "volume",
            q: "Combien de lignes passent dans le MERGE, et la source se limite-t-elle aux changements ?",
            pourquoi: "Un MERGE de toute la table, chaque nuit, lit les deux tables en entier et garde ses verrous (les lignes réservées) jusqu'au bout. Découpé avec TOP, il relit tout à chaque lot.",
            reflexe: "Envoie seulement le delta : les lignes modifiées depuis le dernier passage. Les disparus, eux, demandent la source complète. Indexe la clé des deux côtés, et découpe par tranches de clés, pas avec TOP.",
            moteurs: {
              sqlserver: "La doc : avec TOP, chaque lot relit la source et la cible en entier, et des doublons peuvent entrer si les lots ne visent pas des lignes neuves.",
              snowflake: "Pas de verrou par ligne : un seul MERGE. Mais il réécrit chaque micro-partition touchée : un delta en touche moins qu'une table entière."
            }
          }
        ]
      },
      {
        titre: "Déclencheurs et comptes",
        questions: [
          {
            id: "triggers",
            q: "La table cible a-t-elle des déclencheurs (triggers) ?",
            pourquoi: "Un trigger est du code lancé à chaque modification de la table. Un MERGE en lance pour chaque cas, sans ordre garanti : un trigger écrit pour un simple INSERT peut se tromper.",
            reflexe: "Liste les triggers de la cible et lis ce qu'ils font, avant le premier MERGE. Teste en recette un MERGE qui ajoute, modifie et désactive des lignes.",
            moteurs: {
              sqlserver: "Les triggers AFTER tournent pour chaque action, sans ordre garanti. Dedans, `@@ROWCOUNT` donne le total du MERGE : un trigger d'INSERT voit 3 pour 1 ajout, 1 modification et 1 suppression (doc).",
              snowflake: "Pas de triggers.",
              mysql: "`ON DUPLICATE KEY UPDATE` lance le trigger BEFORE INSERT, puis AFTER INSERT, ou BEFORE et AFTER UPDATE (doc). REPLACE lance les triggers DELETE et INSERT."
            }
          },
          {
            id: "compter",
            q: "Sais-tu combien de lignes chaque cas a ajoutées, modifiées ou supprimées ?",
            pourquoi: "Un MERGE ne dit pas seul s'il a bien travaillé. 0 ajout un jour de nouveaux clients, ou 5 000 désactivations, ne sont pas des erreurs pour le moteur.",
            reflexe: "Garde les comptes de chaque passage dans une table de suivi. Contrôle : cible après = cible avant + ajouts − suppressions. Ici : 7 + 1 − 0 = 8 lignes, dont 7 actives.",
            moteurs: {
              sqlserver: "`OUTPUT $action, inserted.code INTO suivi.merge_client` : une ligne par ligne touchée, avec INSERT, UPDATE ou DELETE ; la doc le conseille pour compter. `@@ROWCOUNT` ne donne que le total.",
              snowflake: "Le MERGE rend « number of rows inserted », « updated » et « deleted » : garde-les avec `RESULT_SCAN(LAST_QUERY_ID())`.",
              mysql: "`ROW_COUNT()` compte 1 par ajout, 2 par mise à jour, 0 par ligne inchangée : 3 dans l'exemple, pour 1 ajout et 1 mise à jour."
            }
          }
        ]
      },
      {
        titre: "Transaction et reprise",
        questions: [
          {
            id: "transaction",
            q: "Le MERGE et les étapes autour sont-ils dans une même transaction ?",
            pourquoi: "Sur Snowflake et MySQL, les disparus demandent une 2e instruction. Si elle échoue après le MERGE, la table est à moitié synchronisée : les nouveaux sont là, les disparus encore actifs.",
            reflexe: "Ouvre une transaction (un bloc validé ou annulé en entier) : contrôles, MERGE, disparus, comptes, puis COMMIT seulement si les comptes sont bons. Le détail : « J'utilise une transaction ».",
            moteurs: {
              sqlserver: "`SET XACT_ABORT ON;` avant `BEGIN TRAN` : sans lui, une erreur n'annule que l'instruction fautive.",
              snowflake: "Une instruction en erreur est annulée seule, et la transaction reste ouverte. Un ordre de structure (DDL) au milieu valide tout ce qui précède.",
              mysql: "`START TRANSACTION` … `COMMIT`. Un DDL au milieu, comme un `CREATE TABLE` de travail, valide tout ce qui précède."
            }
          },
          {
            id: "rejouable",
            q: "Peut-on relancer le MERGE sans fausser les données ?",
            pourquoi: "Un traitement de nuit se relance. Avec `SET qte = c.qte + s.qte`, le 2e passage ajoute la quantité une 2e fois : le stock double, sans erreur.",
            reflexe: "Écris des valeurs absolues (`SET qte = s.qte`), jamais des cumuls, ou note chaque fichier déjà traité. Teste : le même MERGE lancé deux fois ne doit rien changer au 2e passage."
          }
        ]
      }
    ],
    pieges: [
      "Un client deux fois dans la source : erreur 8672 sur SQL Server, erreur par défaut sur Snowflake, la dernière ligne gagne sur MySQL.",
      "Une clé nouvelle en double dans la source : Snowflake ajoute chaque copie, et UNIQUE ne l'arrête pas.",
      "Un filtre dans le ON (`AND c.depot_id = 1`) : les autres lignes passent pour absentes, puis sont ajoutées en double ou désactivées.",
      "`WHEN NOT MATCHED BY SOURCE THEN DELETE` avec une extraction vide ou coupée : la moitié de la table est effacée, sans erreur.",
      "`c.ville <> s.ville` ne voit pas le passage de NULL à Nice : la mise à jour n'a pas lieu.",
      "SQL Server : un MERGE sans `;` final est refusé (erreur 10713).",
      "MySQL : `REPLACE` supprime puis insère ; avec `ON DELETE CASCADE`, les commandes du client partent avec lui.",
      "Un `SET qte = c.qte + s.qte` dans un MERGE relancé : la quantité est ajoutée deux fois."
    ],
    pratique: "Pour une table lue par Power BI, désactive les clients disparus au lieu de les supprimer : leurs ventes passées gardent leur client. Note les comptes de chaque MERGE, avec la date, dans une table de suivi.",
    motsCles: ["merge", "fusionner", "upsert", "synchroniser", "synchronisation", "synchro", "insérer ou mettre à jour", "when matched", "not matched by source", "on duplicate key update", "replace into", "clé de rapprochement", "$action", "8672"],
    voirAussi: ["inserer", "mettre-a-jour", "supprimer", "transaction", "doublons", "importer-fichier", "table-import", "historiser"],
    dico: ["merge", "output", "is-distinct-from", "insert-select", "update", "row-number", "unique", "rowcount"],
    outils: ["dico"],
    sources: [
      { titre: "MERGE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/merge-transact-sql" },
      { titre: "Erreurs 8000 à 8999 du moteur de base de données (8672)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/errors-events/database-engine-events-and-errors-8000-to-8999" },
      { titre: "Opérateurs EXCEPT et INTERSECT (deux NULL égaux)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql" },
      { titre: "Snowflake : MERGE", url: "https://docs.snowflake.com/en/sql-reference/sql/merge" },
      { titre: "Snowflake : les transactions (verrous)", url: "https://docs.snowflake.com/en/sql-reference/transactions" },
      { titre: "MySQL 8.4 : INSERT … ON DUPLICATE KEY UPDATE", url: "https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html" },
      { titre: "MySQL 8.4 : REPLACE Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/replace.html" },
      { titre: "MySQL 8.4 : CREATE TRIGGER (REPLACE, ON DUPLICATE KEY UPDATE)", url: "https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html" }
    ]
  },
  {
    id: "transaction",
    titre: "J'utilise une transaction",
    famille: "Écrire et charger",
    resume: "Les questions avant BEGIN : ce qui doit réussir ensemble, l'annulation sur erreur, une transaction courte, ce que voient les autres, les interblocages, et les règles de chaque moteur.",
    besoins: [
      "j'utilise une transaction",
      "tout annuler si une erreur arrive au milieu du traitement",
      "enregistrer une commande et ses lignes ensemble ou pas du tout",
      "begin tran commit rollback"
    ],
    essais: [
      "set xact_abort on try catch rollback",
      "deadlock victime erreur 1205",
      "transaction imbriquee trancount procedure",
      "nolock ou read committed snapshot"
    ],
    exemple: {
      texte: "Le flux EDI de ce matin apporte une commande d'AquaBleu : 10 sacs de chlore CHL-5 à 35,90 €, soit 359,00 € HT. Tu enregistres l'en-tête, la ligne et le suivi du flux. Les trois écritures réussissent ensemble, ou aucune : jamais une commande sans ses lignes.",
      code: "SET XACT_ABORT ON;          -- une erreur annule toute la transaction\nBEGIN TRY\n  BEGIN TRAN;\n    INSERT INTO dbo.commande (id, num_cde, client_id, date_cde, statut, canal, montant_ht)\n    VALUES (9, 'CDE-1009', 1, '20260414', 'EN_COURS', 'EDI', 359.00);\n    INSERT INTO dbo.ligne_cde (id, cde_id, article_id, qte, prix_unit)\n    VALUES (12, 9, 1, 10, 35.90);\n    INSERT INTO dbo.flux_edi (id, type, partenaire, date_recu, statut, cde_id)\n    VALUES (7, 'ORDERS', 'AquaBleu', '2026-04-14T06:09:00', 'OK', 9);\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF XACT_STATE() <> 0 ROLLBACK;   -- rien n'est à moitié fait\n  THROW;                           -- l'erreur remonte au traitement EDI\nEND CATCH;",
      codes: {
        snowflake: "EXECUTE IMMEDIATE $$\nBEGIN\n  BEGIN TRANSACTION;\n  INSERT INTO ventes.commande (id, num_cde, client_id, date_cde, statut, canal, montant_ht)\n    VALUES (9, 'CDE-1009', 1, '2026-04-14', 'EN_COURS', 'EDI', 359.00);\n  INSERT INTO ventes.ligne_cde (id, cde_id, article_id, qte, prix_unit)\n    VALUES (12, 9, 1, 10, 35.90);\n  INSERT INTO ventes.flux_edi (id, type, partenaire, date_recu, statut, cde_id)\n    VALUES (7, 'ORDERS', 'AquaBleu', '2026-04-14 06:09:00', 'OK', 9);\n  COMMIT;\nEXCEPTION\n  WHEN OTHER THEN\n    ROLLBACK;   -- annule les trois écritures\n    RAISE;      -- l'erreur remonte\nEND;\n$$;\n-- Hors d'un bloc, une instruction en erreur est annulée seule, et COMMIT valide le reste.",
        mysql: "START TRANSACTION;\nINSERT INTO commande (id, num_cde, client_id, date_cde, statut, canal, montant_ht)\nVALUES (9, 'CDE-1009', 1, '2026-04-14', 'EN_COURS', 'EDI', 359.00);\nINSERT INTO ligne_cde (id, cde_id, article_id, qte, prix_unit)\nVALUES (12, 9, 1, 10, 35.90);\nINSERT INTO flux_edi (id, type, partenaire, date_recu, statut, cde_id)\nVALUES (7, 'ORDERS', 'AquaBleu', '2026-04-14 06:09:00', 'OK', 9);\nCOMMIT;\n-- Une erreur ? Sans --force, le client mysql s'arrête, et la transaction ouverte\n-- est annulée à la déconnexion (vu sur MySQL 8.0). Dans une procédure :\n-- DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;"
      }
    },
    etapes: [
      {
        titre: "Le besoin",
        questions: [
          {
            id: "ensemble",
            q: "Quelles écritures doivent réussir ou échouer ensemble ?",
            pourquoi: "Arrêté entre deux écritures, un traitement laisse une commande sans ses lignes, ou un stock baissé sans son mouvement. La donnée est fausse, et le flux, relancé, l'enregistre une 2e fois.",
            reflexe: "Liste les écritures liées : l'en-tête, ses lignes, le suivi du flux. Mets-les, et seulement elles, dans une transaction : un bloc validé (COMMIT) ou annulé (ROLLBACK) en entier."
          },
          {
            id: "autocommit",
            q: "Sais-tu que, sans BEGIN, chaque instruction est validée seule, dès qu'elle finit ?",
            pourquoi: "C'est l'autocommit, le mode par défaut des trois moteurs. Un ROLLBACK lancé ensuite n'annule rien : l'UPDATE d'avant est déjà définitif.",
            reflexe: "Ouvre la transaction avant la première écriture, et ferme-la toi-même. Vérifie aussi que ton outil n'a pas changé le mode : une session sans autocommit garde tout ouvert jusqu'à ton COMMIT.",
            moteurs: {
              sqlserver: "`SET IMPLICIT_TRANSACTIONS ON`, ou un pilote réglé sans autocommit, ouvre une transaction dès la première instruction, même un SELECT : elle reste ouverte jusqu'au COMMIT (doc).",
              snowflake: "Paramètre `AUTOCOMMIT`, vrai par défaut. La doc conseille de le garder, et d'écrire des transactions explicites (`BEGIN TRANSACTION`).",
              mysql: "`autocommit` vaut 1 par défaut. Avec `SET autocommit = 0`, une transaction est toujours ouverte ; si la session finit sans COMMIT, MySQL l'annule (doc)."
            }
          }
        ]
      },
      {
        titre: "Ouvrir et fermer",
        questions: [
          {
            id: "fermer",
            q: "Chaque BEGIN a-t-il son COMMIT ou son ROLLBACK, sur tous les chemins du code ?",
            pourquoi: "Une transaction restée ouverte, dans une fenêtre SSMS ou après une erreur, garde ses verrous (les lignes réservées). L'ERP attend, et le journal des transactions (où le moteur note chaque modification) ne se vide plus.",
            reflexe: "Écris le BEGIN, le COMMIT et le ROLLBACK ensemble, avant le reste. Avant de fermer ta fenêtre ou de partir en pause, vérifie qu'aucune transaction n'est ouverte.",
            moteurs: {
              sqlserver: "`SELECT @@TRANCOUNT;` : plus de 0, une transaction est ouverte. La doc : une transaction en attente empêche de vider le journal, qui grossit jusqu'à se remplir.",
              snowflake: "`SHOW TRANSACTIONS;`. Une session coupée net laisse sa transaction et ses verrous : annulée après 5 minutes d'inactivité si elle bloque une autre transaction, sinon après 4 heures (doc).",
              mysql: "Dans une procédure, `BEGIN` ouvre un bloc, pas une transaction : écris `START TRANSACTION` (doc)."
            }
          }
        ]
      },
      {
        titre: "Les erreurs",
        questions: [
          {
            id: "erreur-milieu",
            q: "Une erreur au milieu annule-t-elle toute la transaction, ou seulement l'instruction fautive ?",
            pourquoi: "Souvent, seule l'instruction fautive est annulée, et la transaction continue. Le COMMIT final valide alors la commande sans sa ligne, en silence.",
            reflexe: "Demande au moteur de tout annuler à la première erreur, et teste-le : glisse une erreur volontaire en recette (un article qui n'existe pas), puis vérifie qu'il ne reste rien.",
            moteurs: {
              sqlserver: "`SET XACT_ABORT ON;` avant `BEGIN TRAN`. Sans lui (OFF, le défaut), une violation de contrainte n'annule que l'instruction. Il ne couvre pas les erreurs de compilation, comme une faute de syntaxe (doc).",
              snowflake: "Par défaut, l'instruction en erreur est annulée, la transaction reste active, et COMMIT valide le reste. Avec `TRANSACTION_ABORT_ON_ERROR = TRUE`, la transaction est annulée : la suite échoue jusqu'au COMMIT ou ROLLBACK.",
              mysql: "InnoDB annule l'instruction en erreur seule (doublon, valeur refusée) ; la transaction reste ouverte. Un interblocage, lui, annule toute la transaction (doc)."
            }
          },
          {
            id: "rattraper",
            q: "Qui fait le ROLLBACK quand une erreur arrive, et l'erreur remonte-t-elle au traitement ?",
            pourquoi: "Sans bloc de secours, une erreur laisse la transaction ouverte, ou à moitié faite. Et un bloc qui « avale » l'erreur fait croire au traitement EDI que la commande est intégrée.",
            reflexe: "Un bloc de secours : il annule ce qui est ouvert, puis relance l'erreur pour que le traitement, ou l'ordonnanceur, la voie. Jamais un simple message à la place.",
            moteurs: {
              sqlserver: "`BEGIN CATCH IF XACT_STATE() <> 0 ROLLBACK; THROW; END CATCH`. `XACT_STATE() = -1` : la transaction ne peut plus qu'être annulée. Le CATCH n'attrape pas une table mal nommée au même niveau (doc).",
              snowflake: "Dans un bloc : `EXCEPTION WHEN OTHER THEN ROLLBACK; RAISE;` (`RAISE;` seul relance l'erreur d'origine).",
              mysql: "Dans une procédure : `DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;`. Dans un script : sans `--force`, le client s'arrête, et la transaction ouverte est annulée à la déconnexion (vu sur MySQL 8.0)."
            }
          },
          {
            id: "journal-erreur",
            q: "Ta trace de l'erreur survit-elle au ROLLBACK ?",
            pourquoi: "Une ligne écrite dans ta table de suivi avant le ROLLBACK est annulée avec le reste. Le flux a échoué, et ton journal ne garde aucune trace de l'échec.",
            reflexe: "Écris le journal après le ROLLBACK, dans le bloc de secours : le nom du flux, l'erreur, l'heure. Garde le message dans une variable en attendant.",
            moteurs: {
              sqlserver: "Une variable de table (`DECLARE @t TABLE …`) n'est pas touchée par un ROLLBACK (doc) : remplis-la pendant le traitement, recopie-la dans le journal après.",
              snowflake: "Une procédure qui ouvre sa propre transaction garde la ligne de journal, que la transaction appelante réussisse ou échoue (exemple de la doc)."
            }
          },
          {
            id: "interblocage",
            q: "Que fait ton traitement s'il est choisi comme victime d'un interblocage ?",
            pourquoi: "Un interblocage (deadlock) : deux sessions s'attendent l'une l'autre. Le moteur annule le travail d'une des deux. Si le programme ignore l'erreur, la commande n'est jamais intégrée, et personne ne le voit.",
            reflexe: "Prends les tables dans le même ordre partout (la commande, puis ses lignes), garde les transactions courtes, et relance la transaction entière après une courte pause, trois fois au plus.",
            moteurs: {
              sqlserver: "Erreur 1205 : toute la transaction de la victime est annulée. La doc conseille de l'attraper (TRY…CATCH) et de relancer après une courte pause.",
              snowflake: "Seule l'instruction la plus récente est annulée ; la transaction reste active : à toi de faire COMMIT ou ROLLBACK (doc). Pas d'interblocage entre instructions en autocommit sur une table standard.",
              mysql: "Erreur 1213 : toute la transaction est annulée. Attention : 1205 veut dire ici « attente de verrou trop longue » (50 s par défaut), et seule l'instruction est annulée."
            }
          }
        ]
      },
      {
        titre: "Une transaction courte",
        questions: [
          {
            id: "courte",
            q: "Ta transaction reste-t-elle courte : quelques instructions, quelques secondes ?",
            pourquoi: "Les verrous restent posés jusqu'au COMMIT. Une transaction de 20 minutes bloque les saisies de l'ERP pendant 20 minutes, et fait grossir le journal des transactions.",
            reflexe: "Prépare tout avant (lectures, calculs, contrôles), puis écris vite. Un gros volume : des lots, chacun dans sa transaction (voir « Je mets à jour des lignes »).",
            moteurs: {
              snowflake: "La doc : une transaction trop grosse réduit le parallélisme et augmente les interblocages ; mais 10 lignes dans une transaction coûtent moins que 10 transactions d'une ligne."
            }
          },
          {
            id: "attente",
            q: "Ta transaction attend-elle une personne, un clic, ou un autre système avant son COMMIT ?",
            pourquoi: "Une personne met des minutes à répondre, ou part déjeuner : les lignes restent bloquées tout ce temps. La doc de SQL Server le dit : jamais de saisie de l'utilisateur pendant une transaction.",
            reflexe: "Demande tout avant d'ouvrir la transaction. Dans SSMS, contrôle par le code, avec le nombre de lignes attendu, plutôt qu'à l'œil, et ne laisse jamais une fenêtre avec un BEGIN sans fin."
          }
        ]
      },
      {
        titre: "Ce que voient les autres",
        questions: [
          {
            id: "isolation",
            q: "Que doivent voir les autres sessions pendant ta transaction, et que vois-tu de la leur ?",
            pourquoi: "C'est le niveau d'isolation : ce qu'une transaction voit des autres. Mal choisi, il bloque les rapports pendant tes écritures, ou te fait lire des chiffres qui changent entre deux SELECT.",
            reflexe: "Connais le niveau de ta base. Un rapport qui enchaîne plusieurs SELECT et doit rester cohérent : une photo prise au départ (SNAPSHOT), ou une table figée pour l'occasion.",
            moteurs: {
              sqlserver: "READ COMMITTED par défaut : sans RCSI, un lecteur attend tes verrous. RCSI (`READ_COMMITTED_SNAPSHOT`) lit la dernière version validée : désactivé par défaut sur SQL Server, actif sur Azure SQL Database (doc).",
              snowflake: "READ COMMITTED seulement : chaque instruction voit ce qui était validé à son départ. Deux SELECT de la même transaction peuvent donc voir des données différentes.",
              mysql: "REPEATABLE READ par défaut (InnoDB) : les lectures de la transaction voient la photo prise à la première lecture."
            }
          },
          {
            id: "nolock",
            q: "Lis-tu avec NOLOCK (READ UNCOMMITTED) pour ne plus attendre ?",
            pourquoi: "NOLOCK lit des données pas encore validées : une lecture sale. Le chiffre lu peut être annulé une seconde après, et des lignes peuvent être lues deux fois, ou pas du tout (doc).",
            reflexe: "Jamais pour des chiffres qui servent à facturer ou à décider. Pour ne plus attendre : RCSI, à tester avec l'éditeur de l'ERP. Cherche aussi les NOLOCK cachés dans les vues.",
            moteurs: {
              sqlserver: "`WITH (NOLOCK)` vaut `READUNCOMMITTED`. Il est ignoré sur la table que modifie un UPDATE ou un DELETE (doc).",
              mysql: "`SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED` permet aussi la lecture sale. Rarement utile : un SELECT simple n'attend pas les écritures."
            },
            seulement: ["sqlserver", "mysql"]
          }
        ]
      },
      {
        titre: "Procédures et imbrication",
        questions: [
          {
            id: "imbriquees",
            q: "Ta transaction appelle-t-elle une procédure qui ouvre sa propre transaction ?",
            pourquoi: "Sur SQL Server, un BEGIN imbriqué ne crée pas une 2e transaction : le COMMIT intérieur ne valide rien, et un ROLLBACK intérieur annule tout, y compris le travail de l'appelant.",
            reflexe: "Une seule partie possède la transaction : l'appelant. La procédure appelée regarde s'il y en a déjà une, et pose un point de sauvegarde pour n'annuler que son propre travail.",
            moteurs: {
              sqlserver: "`@@TRANCOUNT` compte les BEGIN. `SAVE TRANSACTION p1;` puis `ROLLBACK TRANSACTION p1;` annule ce qui suit le point, et la transaction reste ouverte (doc).",
              snowflake: "Une transaction ne peut pas commencer hors d'une procédure et finir dedans, ni l'inverse : erreur (doc). Pas de point de sauvegarde.",
              mysql: "Pas de transaction imbriquée : un 2e `START TRANSACTION` valide d'abord celle en cours (doc). Point de sauvegarde : `SAVEPOINT p1;` puis `ROLLBACK TO SAVEPOINT p1;`."
            }
          }
        ]
      },
      {
        titre: "Les règles de chaque moteur",
        questions: [
          {
            id: "ddl",
            q: "Ta transaction contient-elle un ordre de structure : CREATE, ALTER, DROP, TRUNCATE ?",
            pourquoi: "Sur Snowflake et MySQL, un tel ordre (un DDL) valide d'abord la transaction en cours, puis s'exécute seul. Le ROLLBACK qui suit n'annule plus ce qui précède.",
            reflexe: "Garde les DDL hors des transactions de données : la structure d'abord, puis les données dans une transaction. Une table de travail : crée-la avant le BEGIN.",
            moteurs: {
              sqlserver: "Un `CREATE TABLE` ou un `TRUNCATE` fait dans une transaction s'annule avec elle. Mais un DDL pose un verrou de structure qui bloque même les lectures en NOLOCK (doc).",
              snowflake: "Chaque DDL est sa propre transaction : il valide la transaction active, et ne s'annule pas (doc). Un `CREATE TABLE … AS SELECT` compte comme un DDL.",
              mysql: "CREATE, ALTER, DROP, RENAME et TRUNCATE valident la transaction en cours. Un `CREATE TEMPORARY TABLE` ne valide rien, mais ne s'annule pas non plus (doc)."
            }
          },
          {
            id: "innodb",
            q: "Toutes les tables touchées sont-elles en InnoDB, le moteur transactionnel de MySQL ?",
            pourquoi: "Une table MyISAM ne connaît pas les transactions : ses changements sont enregistrés tout de suite. Le ROLLBACK annule le reste, sauf elle, avec un simple avertissement (1196).",
            reflexe: "Liste les tables qui ne sont pas en InnoDB : `SELECT table_name, engine FROM information_schema.tables WHERE table_schema = DATABASE() AND engine <> 'InnoDB';`. Convertis-les, ou sors-les de la transaction.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Avant le COMMIT",
        questions: [
          {
            id: "controle",
            q: "Que contrôles-tu entre la dernière écriture et le COMMIT ?",
            pourquoi: "Après le COMMIT, il n'y a plus de retour simple. Un total d'en-tête différent de la somme des lignes, ou un nombre de lignes faux, doit être vu avant.",
            reflexe: "Contrôle dans la transaction : le nombre de lignes écrites, et le total de l'en-tête égal à la somme des lignes (359,00 € ici). Faux : ROLLBACK et erreur. Juste : COMMIT."
          }
        ]
      }
    ],
    pieges: [
      "Sans `SET XACT_ABORT ON`, une violation de contrainte n'annule que l'instruction : le COMMIT valide la commande sans sa ligne.",
      "Un `BEGIN TRAN` oublié dans une fenêtre SSMS : les lignes restent verrouillées, l'ERP attend, le journal grossit.",
      "Un CATCH qui ne fait qu'un PRINT : l'erreur est avalée, et le flux EDI passe pour intégré.",
      "Une ligne de journal écrite avant le ROLLBACK : elle est annulée avec le reste.",
      "SQL Server : un ROLLBACK dans une procédure appelée annule aussi le travail de l'appelant.",
      "MySQL : un 2e `START TRANSACTION` valide la 1re transaction, sans message.",
      "Snowflake et MySQL : un `CREATE TABLE` au milieu valide tout ce qui précède.",
      "MySQL : l'erreur 1205 n'est pas un interblocage mais une attente trop longue ; seule l'instruction est annulée, la transaction continue.",
      "MySQL lancé avec `--force` : l'erreur est sautée, le COMMIT valide le reste, et le code retour vaut 0 (vu sur MySQL 8.0).",
      "NOLOCK dans un rapport de stock : un chiffre jamais validé, ou des lignes comptées deux fois."
    ],
    pratique: "Dans un flux EDI, une transaction par message : l'en-tête, ses lignes et le statut du flux. Un message en erreur est annulé seul, rangé en rejet avec son motif, et le flux continue avec le suivant.",
    motsCles: ["transaction", "1205", "commit", "rollback", "xact_abort", "try catch", "xact_state", "trancount", "imbriquée", "isolation", "nolock", "deadlock", "interblocage", "autocommit", "savepoint"],
    voirAussi: ["mettre-a-jour", "supprimer", "script-fichier", "inserer", "fusionner", "procedure", "requete-lente", "corriger-prod"],
    dico: ["begin-transaction", "commit", "rollback", "xact-abort", "try-catch", "throw", "trancount", "savepoint", "isolation", "nolock"],
    outils: ["dico"],
    sources: [
      { titre: "SET XACT_ABORT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/set-xact-abort-transact-sql" },
      { titre: "TRY...CATCH (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/try-catch-transact-sql" },
      { titre: "ROLLBACK TRANSACTION (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/language-elements/rollback-transaction-transact-sql" },
      { titre: "Guide du verrouillage des transactions et du contrôle de version de ligne", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide" },
      { titre: "Guide des interblocages (erreur 1205)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/sql-server-deadlocks-guide" },
      { titre: "Snowflake : les transactions", url: "https://docs.snowflake.com/en/sql-reference/transactions" },
      { titre: "MySQL 8.4 : START TRANSACTION, COMMIT, and ROLLBACK", url: "https://dev.mysql.com/doc/refman/8.4/en/commit.html" },
      { titre: "MySQL 8.4 : InnoDB Error Handling", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html" }
    ]
  },
  {
    id: "charger-snowflake",
    titre: "Je charge des fichiers dans Snowflake",
    famille: "Écrire et charger",
    resume: "Les questions avant un COPY INTO : le stage, l'accès sans clé écrite, le format, les erreurs, les fichiers déjà chargés, Snowpipe, la taille des fichiers et le contrôle après.",
    besoins: [
      "je charge des fichiers dans snowflake",
      "importer un fichier csv dans snowflake",
      "mettre en place snowpipe pour charger les fichiers automatiquement",
      "copy into depuis un stage s3 ou azure"
    ],
    essais: [
      "copy into on_error continue ou abort_statement",
      "le fichier a deja ete charge snowflake force",
      "storage integration au lieu des cles aws",
      "snowpipe auto ingest combien ca coute"
    ],
    exemple: {
      texte: "Le prestataire EDI dépose les commandes en CSV dans un conteneur Azure, toutes les 15 minutes, dans un dossier par jour. Tu les charges dans `stg.cde_edi`, une table d'arrivée, puis tu contrôles avant de passer à la table métier. Voici la mise en place, faite une fois, puis le chargement du jour.",
      codes: {
        snowflake: "-- Une fois, par un administrateur : l'accès au conteneur, sans clé écrite\nCREATE STORAGE INTEGRATION int_azure_edi\n  TYPE = EXTERNAL_STAGE  STORAGE_PROVIDER = 'AZURE'  ENABLED = TRUE\n  AZURE_TENANT_ID = '<id du locataire Azure>'\n  STORAGE_ALLOWED_LOCATIONS = ('azure://compteedi.blob.core.windows.net/edi/orders/');\n-- Une fois : le format, le stage, la table d'arrivée (tout en VARCHAR)\nCREATE FILE FORMAT stg.ff_orders TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1\n  FIELD_OPTIONALLY_ENCLOSED_BY = '\"' ENCODING = 'UTF8';\nCREATE STAGE stg.stage_orders URL = 'azure://compteedi.blob.core.windows.net/edi/orders/'\n  STORAGE_INTEGRATION = int_azure_edi FILE_FORMAT = stg.ff_orders;\nCREATE TRANSIENT TABLE stg.cde_edi\n  (num_cde VARCHAR, date_cde VARCHAR, code_article VARCHAR, qte VARCHAR, prix VARCHAR);\n-- Chaque jour : tester, puis charger le dossier du jour\nCOPY INTO stg.cde_edi FROM @stg.stage_orders/2026/04/14/ VALIDATION_MODE = RETURN_ERRORS;\nCOPY INTO stg.cde_edi FROM @stg.stage_orders/2026/04/14/ ON_ERROR = ABORT_STATEMENT;\n-- Par fichier : rows_parsed = rows_loaded ? « 0 files processed » : rien de nouveau"
      }
    },
    etapes: [
      {
        titre: "Le stage et l'accès",
        questions: [
          {
            id: "stage",
            q: "Les fichiers arrivent-ils dans un stage interne à Snowflake, ou dans ton stockage cloud (stage externe) ?",
            pourquoi: "Un stage est la zone de dépôt d'où COPY INTO lit les fichiers. Interne : il faut y déposer les fichiers (PUT). Externe (Azure, S3) : le partenaire dépose chez toi, et Snowpipe peut charger seul.",
            reflexe: "Prends un stage nommé (`CREATE STAGE`), pas le stage personnel `@~` ni celui d'une table `@%t` : un stage nommé a ses propres droits. Range les fichiers par flux et par jour : `orders/2026/04/14/`.",
            moteurs: {
              sqlserver: "Pas de stage : `BULK INSERT` lit un chemin que le serveur voit (voir « J'importe un fichier »).",
              mysql: "Pas de stage : `LOAD DATA` lit un fichier du dossier `secure_file_priv` du serveur, ou de ton poste avec LOCAL."
            }
          },
          {
            id: "integration",
            q: "L'accès au stockage passe-t-il par une intégration de stockage, sans clé écrite dans le SQL ?",
            pourquoi: "Une clé écrite dans `CREDENTIALS = (…)` se retrouve dans les scripts et dans Git. Si elle fuit, tout le conteneur est lisible ; si elle change, tous les chargements tombent.",
            reflexe: "Un administrateur crée une `STORAGE INTEGRATION`, limitée au dossier du flux (`STORAGE_ALLOWED_LOCATIONS`) ; le stage s'y réfère. La doc le recommande fortement. Le rôle propriétaire du stage a besoin du droit USAGE sur l'intégration."
          }
        ]
      },
      {
        titre: "Le format du fichier",
        questions: [
          {
            id: "file-format",
            q: "Le format du fichier est-il décrit une seule fois, dans un FILE FORMAT nommé ?",
            pourquoi: "Des options recopiées dans chaque COPY finissent par diverger. Le chargement de nuit lit les guillemets, la reprise à la main les oublie : les mêmes fichiers donnent deux résultats.",
            reflexe: "`CREATE FILE FORMAT stg.ff_orders TYPE = CSV …`, rattaché au stage ou cité dans le COPY (`FORMAT_NAME`). Ne mets pas `FORMAT_NAME` et `TYPE` dans le même COPY : la doc prévient d'un résultat inattendu.",
            moteurs: {
              sqlserver: "L'équivalent : un fichier de format (`FORMATFILE` de BULK INSERT, option `-f` de bcp).",
              mysql: "Pas de format nommé : les options `FIELDS` et `LINES` se répètent dans chaque LOAD DATA."
            }
          },
          {
            id: "encodage-dates",
            q: "L'encodage et le format des dates sont-ils écrits, au lieu d'être devinés ?",
            pourquoi: "En `AUTO`, la date 05/02/2026 est lue mois/jour : le 2 mai. Un fichier Windows-1252 lu comme de l'UTF-8 (le défaut) fait échouer le chargement, ou, avec `REPLACE_INVALID_CHARACTERS`, remplace les accents par �.",
            reflexe: "Écris `ENCODING = 'WINDOWS1252'` si le fichier l'est. Pour une colonne DATE : `DATE_FORMAT = 'DD/MM/YYYY'`. Ou charge en VARCHAR, et convertis toi-même avec `TRY_TO_DATE(date_cde, 'DD/MM/YYYY')`."
          },
          {
            id: "fuseau",
            q: "Les heures du fichier ont-elles un fuseau, et dans quel type les ranges-tu ?",
            pourquoi: "Un horodatage sans décalage, chargé dans `TIMESTAMP_TZ` ou `TIMESTAMP_LTZ`, prend le fuseau de la session : America/Los_Angeles par défaut. Les heures de réception des commandes se décalent de plusieurs heures.",
            reflexe: "Une heure sans fuseau : `TIMESTAMP_NTZ`, et dis dans le nom de la colonne de quel fuseau elle est (`recu_le_paris`). Sinon, règle `TIMEZONE` dans la session qui charge, ou demande un décalage dans le fichier (+02:00)."
          },
          {
            id: "colonnes-changent",
            q: "Que se passe-t-il le jour où le fichier gagne ou perd une colonne ?",
            pourquoi: "Chargé par position, un fichier avec une colonne de plus au milieu décale toutes les valeurs : le prix part dans la quantité. Avec un COPY qui transforme (`SELECT $1, $2…`), aucune erreur ne prévient.",
            reflexe: "Garde `ERROR_ON_COLUMN_COUNT_MISMATCH = TRUE` (le défaut) : un nombre de colonnes différent arrête le chargement. Pour charger par nom : `PARSE_HEADER = TRUE` et `MATCH_BY_COLUMN_NAME`. `INFER_SCHEMA` montre les colonnes d'un nouveau fichier."
          },
          {
            id: "evolution",
            q: "Faut-il que la table s'adapte seule aux nouvelles colonnes (l'évolution du schéma) ?",
            pourquoi: "Avec l'évolution du schéma, Snowflake ajoute lui-même les colonnes nouvelles du fichier. Pratique pour du brut ; mais une faute de frappe du partenaire devient une colonne, sans que personne ne décide.",
            reflexe: "Réserve-la aux tables brutes, et décide-le avec le métier. Il faut `ENABLE_SCHEMA_EVOLUTION = TRUE`, `MATCH_BY_COLUMN_NAME`, et le droit EVOLVE SCHEMA ; en CSV, aussi `PARSE_HEADER` et `ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE`."
          },
          {
            id: "taille-fichiers",
            q: "Quelle taille font tes fichiers, une fois compressés ?",
            pourquoi: "Un fichier = un travail de chargement. Un fichier géant ne se charge pas en parallèle, et un échec le fait recommencer ; des milliers de tout petits fichiers ajoutent un travail fixe pour chacun.",
            reflexe: "Vise des fichiers de 100 à 250 Mo compressés, comme le conseille la doc, et évite les fichiers de 100 Go ou plus. Compresse en gzip : `COMPRESSION = AUTO` le reconnaît ; le Brotli, lui, s'écrit `BROTLI`."
          }
        ]
      },
      {
        titre: "Les erreurs",
        questions: [
          {
            id: "on-error",
            q: "Une ligne fausse doit-elle tout arrêter, faire sauter son fichier, ou être laissée de côté ?",
            pourquoi: "Par défaut, COPY arrête tout à la première erreur (`ABORT_STATEMENT`) : le rapport du matin n'a pas les commandes du jour. Avec `CONTINUE`, les lignes fausses manquent, sans alerte.",
            reflexe: "Décide-le par flux avec le métier : des commandes, plutôt tout ou rien, puis correction ; des journaux techniques, `CONTINUE`. Dans les deux cas, compare `rows_parsed` et `rows_loaded` de chaque fichier.",
            moteurs: {
              sqlserver: "BULK INSERT : `MAXERRORS` (10 par défaut) écarte jusqu'à 10 lignes, et `ERRORFILE` les garde dans un fichier.",
              mysql: "LOAD DATA : en mode strict, sans LOCAL ni IGNORE, la 1re erreur arrête tout ; avec eux, les erreurs deviennent des avertissements."
            }
          },
          {
            id: "valider",
            q: "Sais-tu lister toutes les erreurs d'un fichier, et pas seulement la première ?",
            pourquoi: "Le résultat du COPY ne montre que la 1re erreur de chaque fichier. Corriger une erreur, relancer, trouver la suivante : une matinée perdue.",
            reflexe: "Avant : `VALIDATION_MODE = RETURN_ERRORS` liste toutes les erreurs, sans rien charger. Après un chargement en `CONTINUE` : `SELECT * FROM TABLE(VALIDATE(stg.cde_edi, JOB_ID => '_last'));`. Ni l'un ni l'autre avec un COPY qui transforme."
          },
          {
            id: "check",
            q: "La table cible a-t-elle une contrainte CHECK ?",
            pourquoi: "Pour l'instant, COPY INTO échoue sur une table qui a un CHECK, et un pipe ne se crée pas dessus (doc). Le chargement de nuit tombe le jour où quelqu'un ajoute un CHECK.",
            reflexe: "Pas de CHECK sur la table d'arrivée : les contrôles se font en SQL, après le chargement. Mets le CHECK sur la table métier, remplie ensuite par INSERT ou MERGE."
          }
        ]
      },
      {
        titre: "La table d'arrivée",
        questions: [
          {
            id: "table-arrivee",
            q: "Charges-tu dans une table d'arrivée TRANSIENT, en VARCHAR, avant la table métier ?",
            pourquoi: "Chargé droit dans la table métier, une valeur fausse bloque tout, ou entre convertie de travers. Une table TRANSIENT n'a pas les 7 jours de Fail-safe (un secours payé en stockage) : moins chère pour des données qu'on peut recharger.",
            reflexe: "`CREATE TRANSIENT TABLE stg.cde_edi (…)`, colonnes en VARCHAR, plus le fichier et la ligne (`METADATA$FILENAME`). Garde les fichiers d'origine : sans Fail-safe, ils sont ton seul secours. Le détail : « Je crée une table pour recevoir un import »."
          }
        ]
      },
      {
        titre: "Ne pas charger deux fois",
        questions: [
          {
            id: "historique",
            q: "Sais-tu quand COPY INTO saute un fichier, et quand il le recharge ?",
            pourquoi: "COPY garde l'historique de chargement de chaque table : un fichier déjà chargé est sauté, même après 64 jours. Mais un `TRUNCATE`, une table recréée ou clonée, ou `FORCE = TRUE`, font tout recharger : des doublons.",
            reflexe: "Vide la table d'arrivée avec DELETE, pas TRUNCATE, ou retire du stage les fichiers chargés. `FORCE = TRUE` seulement exprès, après avoir supprimé les lignes de ce fichier. Un fichier modifié (nouveau contenu) est rechargé."
          },
          {
            id: "fichiers-charges",
            q: "Que deviennent les fichiers une fois chargés : supprimés, archivés, ou laissés dans le stage ?",
            pourquoi: "Laissés dans le stage, ils coûtent du stockage (stage interne) et reviennent après un TRUNCATE. Supprimés par `PURGE = TRUE`, l'original est perdu ; et si la purge échoue, aucune erreur ne le dit (doc).",
            reflexe: "Archive chaque fichier chargé dans un autre dossier, daté, avant de le retirer du stage. Avec `PURGE = TRUE`, vérifie de temps en temps, par `LIST @stg.stage_orders`, qu'il ne reste rien."
          }
        ]
      },
      {
        titre: "Snowpipe ou COPY planifié",
        questions: [
          {
            id: "snowpipe",
            q: "Faut-il un chargement continu avec Snowpipe, ou un COPY INTO lancé à heure fixe ?",
            pourquoi: "Snowpipe charge chaque fichier à son arrivée, en général en moins d'une minute (sans garantie), sans warehouse, payé au Go chargé (texte : taille décompressée). Mais par défaut, il saute tout un fichier en erreur.",
            reflexe: "Des fichiers toute la journée, des données attendues vite : Snowpipe (`AUTO_INGEST = TRUE`). Un lot de nuit : un COPY lancé par une tâche planifiée. Dans les deux cas, surveille les fichiers en échec."
          },
          {
            id: "snowpipe-nom",
            q: "Avec Snowpipe, que devient un fichier corrigé, déposé à nouveau sous le même nom ?",
            pourquoi: "Snowpipe retient chaque fichier vu pendant 14 jours, même en échec : le fichier corrigé, au même nom, est ignoré. Après 14 jours, le même nom est rechargé : des doublons. Et un TRUNCATE ne vide pas cette mémoire.",
            reflexe: "Dépose un fichier corrigé sous un nouveau nom (`cde_0414_v2.csv`). Ne charge jamais le même dossier par Snowpipe et par un COPY à la main : chacun a sa propre mémoire, et ne voit pas les fichiers de l'autre."
          },
          {
            id: "warehouse",
            q: "Le COPY tourne-t-il sur un warehouse dédié au chargement, à la bonne taille ?",
            pourquoi: "Un warehouse est le moteur de calcul, payé à la seconde. Chargé sur celui des analystes, le COPY ralentit leurs rapports ; un grand warehouse pour trois fichiers coûte plus, sans aller plus vite.",
            reflexe: "Un warehouse à part (`wh_chargement`), petit, avec un arrêt automatique court. La doc : Small, Medium ou Large suffisent en général, sauf pour des centaines ou des milliers de fichiers à la fois."
          }
        ]
      },
      {
        titre: "Contrôler après",
        questions: [
          {
            id: "controle",
            q: "Lignes du fichier = lignes chargées : le compte tombe-t-il juste, fichier par fichier ?",
            pourquoi: "« Copy executed with 0 files processed » n'est pas une erreur : rien de neuf, ou un mauvais chemin. Et un chargement arrêté n'apparaît pas dans COPY_HISTORY (doc) : sans contrôle, le trou passe inaperçu.",
            reflexe: "Garde le résultat de chaque COPY dans une table de suivi : fichier, `rows_parsed`, `rows_loaded`, erreurs. Compare au nombre de lignes annoncé par l'émetteur (ligne de total, fichier `.ok`). `COPY_HISTORY` montre les 14 derniers jours."
          },
          {
            id: "doublons-apres",
            q: "Contrôles-tu les doublons après chaque chargement ?",
            pourquoi: "PRIMARY KEY et UNIQUE ne sont pas appliqués sur une table standard. Un fichier rechargé (FORCE, TRUNCATE, Snowpipe et COPY mélangés) double les commandes, sans aucune erreur.",
            reflexe: "Après chaque chargement : `SELECT num_cde, code_article, COUNT(*) FROM stg.cde_edi GROUP BY num_cde, code_article HAVING COUNT(*) > 1;`. Passe ensuite dans la table métier par un MERGE sur la clé (voir « Je fusionne deux tables »)."
          }
        ]
      }
    ],
    pieges: [
      "Un `TRUNCATE` de la table d'arrivée : le COPY suivant recharge tous les fichiers encore dans le stage.",
      "Un fichier corrigé, redéposé sous le même nom : COPY le recharge (son contenu a changé), Snowpipe l'ignore pendant 14 jours.",
      "`ON_ERROR = CONTINUE` sans contrôle : des commandes manquent, et rien ne le dit.",
      "Une date 05/02/2026 en format AUTO : chargée comme le 2 mai.",
      "Un CHECK ajouté sur la table d'arrivée : COPY INTO échoue, et le pipe ne se crée pas.",
      "`PURGE = TRUE` qui échoue ne renvoie aucune erreur : les fichiers restent, et coûtent.",
      "PUT et GET ne se lancent pas depuis une feuille de calcul (Worksheet) de Snowsight : passe par Snowflake CLI.",
      "VALIDATE ne rend rien après un chargement en `ABORT_STATEMENT` (le défaut), ni après un COPY qui transforme.",
      "Un COPY avec `SELECT $1, $2…` ignore `ERROR_ON_COLUMN_COUNT_MISMATCH` : une colonne ajoutée au fichier décale les valeurs, sans erreur."
    ],
    pratique: "Pour les flux EDI : un dossier par flux et par jour (`orders/2026/04/14/`), un COPY par dossier, et une table de suivi des fichiers : nom, lignes lues, lignes chargées, statut. C'est elle que tu regardes chaque matin.",
    motsCles: ["copy into", "snowpipe", "stage", "storage integration", "file format", "on_error", "validation_mode", "purge", "force", "historique de chargement", "infer_schema", "évolution du schéma", "transient", "put", "auto_ingest"],
    voirAussi: ["importer-fichier", "table-import", "fusionner", "couts-snowflake", "automatiser", "semi-structure", "doublons"],
    dico: ["copy-into", "stage", "warehouse", "check", "to-date", "timestamp-tz", "timestamp-ntz", "varchar"],
    outils: ["dico"],
    sources: [
      { titre: "Snowflake : COPY INTO <table>", url: "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table" },
      { titre: "Snowflake : préparer les fichiers (taille conseillée)", url: "https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare" },
      { titre: "Snowflake : charger les fichiers (historique de chargement)", url: "https://docs.snowflake.com/en/user-guide/data-load-considerations-load" },
      { titre: "Snowflake : planifier un chargement (le warehouse)", url: "https://docs.snowflake.com/en/user-guide/data-load-considerations-plan" },
      { titre: "Snowflake : CREATE STORAGE INTEGRATION", url: "https://docs.snowflake.com/en/sql-reference/sql/create-storage-integration" },
      { titre: "Snowflake : Snowpipe", url: "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro" },
      { titre: "Snowflake : les coûts de Snowpipe", url: "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-billing" },
      { titre: "Snowflake : l'évolution automatique du schéma", url: "https://docs.snowflake.com/en/user-guide/data-load-schema-evolution" }
    ]
  },
  {
    id: "exporter",
    titre: "J'exporte des données vers un fichier",
    famille: "Écrire et charger",
    resume: "Les questions avant un export : le format attendu, l'encodage, les séparateurs, les valeurs qui cassent un CSV, Excel, le volume, les données personnelles, l'outil de chaque moteur et le contrôle.",
    besoins: [
      "j'exporte des données vers un fichier",
      "exporter le résultat d'une requête en csv",
      "exporter des données dans un fichier excel",
      "générer un fichier pour un partenaire"
    ],
    essais: [
      "bcp queryout csv avec point virgule",
      "select into outfile mysql secure_file_priv",
      "copy into @stage puis get snowflake",
      "les accents sont casses quand j'ouvre l'export dans excel"
    ],
    exemple: {
      texte: "Chaque lundi, le service recouvrement veut, dans Excel, les factures en retard ou seulement émises : numéro, client, date, montant, statut. Cette semaine : 2 factures, 2 464,80 € HT. Le fichier part en CSV UTF-8, avec point-virgule, virgule décimale et dates JJ/MM/AAAA.",
      code: "-- La requête : les colonnes dans l'ordre du fichier, triées sur une clé\nSELECT f.num_fact, c.code, c.nom,\n       CONVERT(char(10), f.date_fact, 103) AS date_fact,              -- JJ/MM/AAAA\n       REPLACE(CAST(f.montant_ht AS varchar(20)), '.', ',') AS montant_ht,\n       f.statut\nFROM dbo.facture AS f\nJOIN dbo.commande AS cd ON cd.id = f.cde_id\nJOIN dbo.client AS c ON c.id = cd.client_id\nWHERE f.statut IN ('RETARD', 'EMISE')\nORDER BY f.date_fact, f.num_fact;\n-- L'export, dans l'invite de commandes (bcp n'écrit ni en-tête ni guillemets) :\n-- bcp \"<la requête>\" queryout relances_20260413.csv -S SRV-SQL -d ventes -T -c -t \";\" -C 65001\n-- Le contrôle : 2 lignes, total 2 464,80",
      codes: {
        snowflake: "COPY INTO @stg.stage_export/relances/relances_20260413.csv\nFROM (SELECT f.num_fact, c.code, c.nom, TO_CHAR(f.date_fact, 'DD/MM/YYYY') AS date_fact,\n             REPLACE(TO_CHAR(f.montant_ht, 'FM999999990.00'), '.', ',') AS montant_ht,\n             f.statut\n      FROM ventes.facture AS f\n      JOIN ventes.commande AS cd ON cd.id = f.cde_id\n      JOIN ventes.client AS c ON c.id = cd.client_id\n      WHERE f.statut IN ('RETARD', 'EMISE')\n      ORDER BY f.date_fact, f.num_fact)\nFILE_FORMAT = (TYPE = CSV FIELD_DELIMITER = ';' FIELD_OPTIONALLY_ENCLOSED_BY = '\"'\n               COMPRESSION = NONE NULL_IF = ())\nHEADER = TRUE SINGLE = TRUE OVERWRITE = TRUE MAX_FILE_SIZE = 104857600;\n-- Puis, avec Snowflake CLI : snow stage copy @stg.stage_export/relances/ ./export/",
        mysql: "SELECT f.num_fact, c.code, c.nom, DATE_FORMAT(f.date_fact, '%d/%m/%Y') AS date_fact,\n       REPLACE(CAST(f.montant_ht AS CHAR), '.', ',') AS montant_ht, f.statut\nFROM facture AS f\nJOIN commande AS cd ON cd.id = f.cde_id\nJOIN client AS c ON c.id = cd.client_id\nWHERE f.statut IN ('RETARD', 'EMISE')\nORDER BY f.date_fact, f.num_fact\nINTO OUTFILE '/var/lib/mysql-files/relances_20260413.csv'\n  CHARACTER SET utf8mb4\n  FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '\"'\n  LINES TERMINATED BY '\\r\\n';\nSELECT ROW_COUNT();   -- 2 lignes écrites, sur le serveur (dossier secure_file_priv)"
      }
    },
    etapes: [
      {
        titre: "Le format attendu",
        questions: [
          {
            id: "contrat",
            q: "Le format attendu est-il écrit, et validé par celui qui lit le fichier ?",
            pourquoi: "Sans format écrit, chacun devine : séparateur, décimales, dates, en-tête. Le fichier part, le partenaire le rejette, ou pire : son programme le charge de travers, sans rien dire.",
            reflexe: "Écris le contrat d'interface : colonnes et ordre, séparateur, guillemets, encodage, décimales, dates, en-tête, nom du fichier, fin de ligne. Fais-le valider, puis compare chaque export à ce contrat."
          },
          {
            id: "format",
            q: "CSV, Excel ou JSON : quel format sert vraiment le destinataire ?",
            pourquoi: "Un CSV ne porte aucun type : Excel devine, et change les codes et les dates. Un programme ou une API attend souvent du JSON. Un classeur Excel garde les types, mais les moteurs SQL n'écrivent pas de fichier .xlsx.",
            reflexe: "Un programme : CSV ou JSON, selon sa spécification. Une personne : un CSV qu'elle ouvre par Données > À partir d'un fichier texte/CSV, ou un .xlsx produit par un outil (SSMS, Power Query).",
            moteurs: {
              sqlserver: "JSON : `FOR JSON PATH`. SSMS 22.4.1 et plus enregistre aussi la grille de résultats en Excel ou en JSON (doc).",
              snowflake: "`COPY INTO @stage` écrit du CSV, du Parquet, ou du JSON depuis une colonne VARIANT (par exemple avec `OBJECT_CONSTRUCT`).",
              mysql: "JSON : `JSON_OBJECT` et `JSON_ARRAYAGG`."
            }
          }
        ]
      },
      {
        titre: "Les caractères",
        questions: [
          {
            id: "encodage",
            q: "Le fichier est-il en UTF-8, avec ou sans BOM, et le lecteur le sait-il ?",
            pourquoi: "Le BOM est une marque invisible en tête d'un fichier UTF-8. Sans elle, Excel peut afficher « GenÃ¨ve » au lieu de « Genève » ; avec elle, un programme peut lire un caractère en trop devant la 1re colonne.",
            reflexe: "Toujours UTF-8. Avec BOM pour un fichier ouvert dans Excel, sans BOM pour un programme, sauf si sa spécification le demande. Teste avec une vraie valeur accentuée, comme Genève, ouverte chez le destinataire.",
            moteurs: {
              sqlserver: "bcp : `-c -C 65001` écrit de l'UTF-8 (Windows seulement, et pas avant la version 13, SQL Server 2016). sqlcmd (ODBC) : `-f 65001`. sqlcmd (Go) n'a pas `-f` ; son `-u` écrit de l'UTF-16 avec un BOM.",
              snowflake: "`COPY INTO @stage` écrit toujours en UTF-8 (doc).",
              mysql: "`INTO OUTFILE … CHARACTER SET utf8mb4` ; sans cette clause, les octets sont recopiés sans conversion (doc). Pas de BOM (vu sur MySQL 8.0)."
            }
          },
          {
            id: "separateur",
            q: "Une valeur peut-elle contenir le séparateur, un guillemet ou un retour à la ligne ?",
            pourquoi: "« Piscines; Spa », un commentaire sur deux lignes, un guillemet dans un libellé : le lecteur coupe la ligne au mauvais endroit, et toutes les colonnes suivantes se décalent.",
            reflexe: "Entoure les textes de guillemets doubles, en doublant ceux qu'ils contiennent. Sinon, nettoie les valeurs dans la requête : voir l'astuce « Enlever les retours à la ligne et les tabulations ». Teste avec une valeur piégée.",
            moteurs: {
              sqlserver: "bcp et sqlcmd n'ont pas d'option pour entourer les textes de guillemets : choisis un séparateur absent des données, et nettoie les retours à la ligne dans la requête.",
              snowflake: "`FIELD_OPTIONALLY_ENCLOSED_BY = '\"'` (pas de guillemets par défaut) : Snowflake double les guillemets contenus, comme Excel l'attend (doc).",
              mysql: "`OPTIONALLY ENCLOSED BY '\"'` écrit un guillemet contenu sous la forme `\\\"`, qu'Excel ne comprend pas (vu sur MySQL 8.0) : retire-les dans la requête, avec REPLACE."
            }
          },
          {
            id: "nulls",
            q: "Comment s'écrit une valeur vide (NULL) dans le fichier : rien, \\N, ou le mot NULL ?",
            pourquoi: "Chaque outil a son habitude. Le lecteur charge le mot « NULL » comme un vrai texte, ou `\\N` comme une valeur bizarre. Et sans guillemets, une case NULL et un texte vide ne se distinguent plus.",
            reflexe: "Décide-le avec le lecteur ; souvent : rien entre les deux séparateurs. Écris-le dans la requête (`COALESCE(ville, '')`) ou dans les options de l'outil, puis regarde le fichier produit.",
            moteurs: {
              snowflake: "`NULL_IF = ()` écrit NULL comme une case vide ; avec des guillemets, un texte vide s'écrit `\"\"`, et les deux restent distincts (doc).",
              mysql: "`INTO OUTFILE` écrit `\\N` ; avec `ESCAPED BY ''`, il écrit le mot NULL (doc). Le client `mysql --batch` écrit aussi NULL (vu sur MySQL 8.0)."
            }
          },
          {
            id: "nombres-dates",
            q: "Les montants et les dates sont-ils écrits comme le lecteur les attend ?",
            pourquoi: "Un Excel en français prend 2385.00 pour du texte, et ne l'additionne pas. Un programme, lui, refuse 2385,00 ou 10/03/2026 s'il attend 2385.00 et 2026-03-10.",
            reflexe: "Suis le contrat : pour un Excel en français, virgule décimale et JJ/MM/AAAA ; pour un programme, point et AAAA-MM-JJ. Le détail, moteur par moteur : « Je formate une valeur pour l'affichage »."
          },
          {
            id: "excel-ouvre",
            q: "Le fichier sera-t-il ouvert dans Excel, qui enlève les zéros devant et arrondit les longs nombres ?",
            pourquoi: "Excel enlève les zéros devant (01200 devient 1200) et garde 15 chiffres au plus : un SSCC de 18 chiffres (le numéro des palettes EDI) est abîmé. Le fichier est juste ; c'est l'ouverture qui casse.",
            reflexe: "Fais ouvrir le CSV par Données > À partir d'un fichier texte/CSV, avec les colonnes de codes en Texte. Excel pour Microsoft 365 et Excel 2024 permettent aussi de couper ces conversions automatiques (doc Microsoft)."
          }
        ]
      },
      {
        titre: "Le contenu",
        questions: [
          {
            id: "ordre",
            q: "Les lignes doivent-elles sortir dans un ordre précis ?",
            pourquoi: "Sans ORDER BY, l'ordre n'est jamais garanti : deux exports des mêmes données diffèrent, la comparaison avec la semaine passée devient pénible, et un programme qui attend l'en-tête avant les lignes se trompe.",
            reflexe: "Termine la requête par un ORDER BY sur une clé unique : `ORDER BY f.date_fact, f.num_fact`. Vérifie l'ordre dans le fichier produit, pas seulement dans la requête.",
            moteurs: {
              snowflake: "Par défaut, l'export se répartit en plusieurs fichiers. Avec PARTITION BY, la doc dit que l'ORDER BY n'est pas garanti dans les fichiers. Pour un seul fichier : `SINGLE = TRUE`.",
              mysql: "`ORDER BY` vient avant `INTO OUTFILE`, placé à la fin de la requête : la position conseillée par la doc."
            }
          },
          {
            id: "en-tete",
            q: "Faut-il une ligne d'en-tête, et avec quels noms de colonnes ?",
            pourquoi: "Un lecteur qui attend un en-tête prend ta 1re ligne de données pour des titres, et la perd. À l'inverse, un en-tête non prévu devient une ligne fausse dans son programme.",
            reflexe: "Suis le contrat. Pour un programme : des noms sans accent ni espace (`num_fact`). Pour une personne : des titres clairs, identiques d'une semaine à l'autre.",
            moteurs: {
              sqlserver: "bcp n'écrit pas d'en-tête : ajoute-le devant les données (un fichier d'en-tête mis avant). sqlcmd écrit les titres ; `-h -1` les enlève.",
              snowflake: "`HEADER = TRUE` (FALSE par défaut) ; avec plusieurs fichiers, chaque fichier a son en-tête (doc).",
              mysql: "`INTO OUTFILE` n'écrit pas d'en-tête. Le client `mysql --batch` en écrit un ; `--skip-column-names` l'enlève."
            }
          },
          {
            id: "volume",
            q: "Combien de lignes contient l'export, et le lecteur peut-il les ouvrir ?",
            pourquoi: "Une feuille Excel s'arrête à 1 048 576 lignes : au-delà, les lignes en trop ne sont pas chargées. Un fichier de plusieurs Go ne passe pas par mail, et un programme peut avoir sa propre limite.",
            reflexe: "Compte avant d'exporter. Plus d'un million de lignes : découpe (un fichier par mois), ou donne plutôt un accès à un rapport Power BI. Pour l'envoi, compresse et passe par un dépôt partagé, pas par mail.",
            moteurs: {
              snowflake: "Plusieurs fichiers de 16 Mo par défaut (`MAX_FILE_SIZE`, jusqu'à 5 Go). `SINGLE = TRUE` écrit un seul fichier : monte alors `MAX_FILE_SIZE`. Compressé en gzip par défaut : `COMPRESSION = NONE` pour un CSV lisible tel quel."
            }
          }
        ]
      },
      {
        titre: "Les données sensibles",
        questions: [
          {
            id: "donnees-perso",
            q: "Le fichier contient-il des données personnelles, et où va-t-il ?",
            pourquoi: "Un fichier envoyé par mail ou posé sur un partage échappe à tous les droits de la base. Des noms, des mails, des téléphones de clients peuvent y rester des années, ou partir chez la mauvaise personne.",
            reflexe: "Exporte seulement les colonnes utiles. Dépose le fichier sur un espace sécurisé, et supprime-le après usage. Les règles à suivre : vois-les avec ton DPO (délégué à la protection des données).",
            moteurs: {
              snowflake: "Une politique de masquage s'applique aussi à `COPY INTO @stage` : un rôle non autorisé exporte la valeur masquée (doc)."
            }
          },
          {
            id: "nom-fichier",
            q: "Le nom du fichier dit-il ce qu'il contient, sans écraser le précédent ?",
            pourquoi: "Un `export.csv` réécrit chaque lundi efface celui de la semaine passée. Personne ne sait de quel jour il date, et deux lancements le même jour se marchent dessus.",
            reflexe: "Mets le contenu et la date : `relances_20260413.csv`, sans espace ni accent. Écris sous un nom provisoire, puis renomme à la fin : le lecteur ne prend jamais un fichier à moitié écrit.",
            moteurs: {
              sqlserver: "sqlcmd `-o` écrase un fichier du même nom (doc).",
              snowflake: "`OVERWRITE = FALSE` par défaut : les fichiers s'accumulent dans le dossier. La doc conseille `INCLUDE_QUERY_ID = TRUE`, ou un dossier vide par export.",
              mysql: "`INTO OUTFILE` refuse un fichier qui existe déjà (erreur 1086)."
            }
          }
        ]
      },
      {
        titre: "L'outil de chaque moteur",
        questions: [
          {
            id: "outil-sqlserver",
            q: "Exportes-tu avec bcp, avec sqlcmd, ou à la main depuis SSMS ?",
            pourquoi: "SSMS (« Enregistrer les résultats sous ») ne s'automatise pas. bcp est rapide, sans en-tête ni guillemets. sqlcmd ajoute des espaces et « (2 rows affected) », et coupe les textes `varchar(max)` à 256 caractères par défaut.",
            reflexe: "Fichier automatique : `bcp \"<requête>\" queryout f.csv -S srv -d ventes -T -c -t \";\"`. Avec sqlcmd : `SET NOCOUNT ON;` dans la requête, puis `-s \";\" -W -h -1 -o f.csv`. Pour des textes longs, préfère bcp.",
            moteurs: {
              sqlserver: "Deux sqlcmd existent, ODBC et Go : `-s`, `-W`, `-h`, `-o` et `-u` existent dans les deux ; `-f` (l'encodage), seulement dans la version ODBC. `-W` ne va pas avec `-y` (doc)."
            },
            seulement: ["sqlserver"]
          },
          {
            id: "outil-snowflake",
            q: "Exportes-tu par COPY INTO vers un stage, puis GET, ou depuis l'interface ?",
            pourquoi: "Les défauts de `COPY INTO @stage` surprennent : fichiers gzip (.csv.gz), sans en-tête, sans guillemets, découpés en plusieurs morceaux. Et GET ne se lance pas depuis une feuille de calcul de Snowsight.",
            reflexe: "Écris les options : `COMPRESSION = NONE`, `HEADER = TRUE`, `FIELD_OPTIONALLY_ENCLOSED_BY`, `SINGLE = TRUE`. Puis récupère le fichier avec Snowflake CLI : `snow stage copy @stg.stage_export/relances/ ./export/`.",
            seulement: ["snowflake"]
          },
          {
            id: "outil-mysql",
            q: "Exportes-tu par SELECT … INTO OUTFILE, ou par le client mysql ?",
            pourquoi: "`INTO OUTFILE` écrit le fichier sur le serveur, pas sur ton poste : dans le dossier `secure_file_priv`, avec le droit FILE, jamais par-dessus un fichier existant. Sans en-tête, et NULL y devient `\\N`.",
            reflexe: "Le fichier doit arriver sur ton poste : `mysql --batch -e \"SELECT …\" > f.tsv` (tabulations, en-tête). Sur le serveur : `INTO OUTFILE`, puis lis `ROW_COUNT()`, qui donne le nombre de lignes écrites (doc).",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Contrôler et livrer",
        questions: [
          {
            id: "controle",
            q: "Le fichier a-t-il le bon nombre de lignes et le bon total ?",
            pourquoi: "Un filtre changé, une jointure qui double, un retour à la ligne dans un texte : le fichier est faux, et c'est le destinataire qui le découvre. Ici : 2 factures, 2 464,80 € HT.",
            reflexe: "Calcule le nombre de lignes et la somme dans la base, puis recompte dans le fichier (lignes moins l'en-tête). Si le contrat le permet, ajoute une ligne de total ou un fichier de contrôle (`.ok`) avec ces chiffres.",
            moteurs: {
              snowflake: "`COPY INTO @stage` rend le nombre de lignes exportées ; `DETAILED_OUTPUT = TRUE` le donne fichier par fichier (doc).",
              mysql: "Après `INTO OUTFILE`, `ROW_COUNT()` donne le nombre de lignes écrites."
            }
          },
          {
            id: "vide-echec",
            q: "Que se passe-t-il si l'export échoue, ou ne trouve aucune ligne ?",
            pourquoi: "Un export planifié qui échoue lundi : pas de fichier, et personne ne s'en aperçoit avant l'appel du client. Un fichier vide, envoyé comme les autres, fait croire qu'il n'y a rien à relancer.",
            reflexe: "Fais vérifier le code retour par l'ordonnanceur, et alerte en cas d'échec. Zéro ligne : décide avec le métier (fichier vide ou alerte), et ne l'envoie jamais sans le signaler. Le détail : « J'automatise un traitement ».",
            moteurs: {
              snowflake: "Avec 0 ligne, `COPY INTO @stage` n'écrit aucun fichier (doc) : le lecteur qui attend un fichier n'en trouve pas."
            }
          }
        ]
      }
    ],
    pieges: [
      "Snowflake : `COPY INTO @stage` écrit par défaut des fichiers gzip (.csv.gz), sans en-tête, sans guillemets, et en plusieurs morceaux.",
      "Un CSV UTF-8 sans BOM, ouvert d'un double-clic : Excel peut afficher « GenÃ¨ve ».",
      "Excel enlève les zéros devant et garde 15 chiffres : le code postal 01200 et le SSCC sont abîmés à l'ouverture.",
      "Un « ; » ou un retour à la ligne dans un libellé, sans guillemets : toutes les colonnes suivantes se décalent.",
      "MySQL : `INTO OUTFILE` écrit sur le serveur, pas sur ton poste, et refuse un fichier qui existe déjà (erreur 1086).",
      "sqlcmd sans `-W` ni `SET NOCOUNT ON` : des espaces en fin de colonne, et « (2 rows affected) » en bas du fichier.",
      "Plus de 1 048 576 lignes : Excel ne charge pas la fin du fichier.",
      "Snowflake : `GET` ne lit que les stages internes, et ne se lance pas depuis une feuille de calcul de Snowsight.",
      "Un export sans ORDER BY : deux exports des mêmes données ne sortent pas dans le même ordre."
    ],
    pratique: "Sur Divalto en SaaS, la doc décrit l'export depuis le studio SQL (Azure Data Studio) : « Save As CSV » dans le dossier DATATRANSFER, puis récupération par FTP. Garde chaque fichier envoyé avec son nombre de lignes.",
    motsCles: ["export", "exporter", "extraction", "extrait", "csv", "bcp", "sqlcmd", "into outfile", "copy into @stage", "get", "bom", "utf-8", "excel", "séparateur", "queryout"],
    voirAussi: ["formater", "importer-fichier", "donnees-personnelles", "automatiser", "donnees-powerbi", "dates"],
    dico: ["copy-into", "stage", "order-by", "replace", "coalesce", "convert", "to-char", "format"],
    outils: ["astuces", "dico"],
    sources: [
      { titre: "Utilitaire bcp", url: "https://learn.microsoft.com/fr-fr/sql/tools/bcp-utility" },
      { titre: "Utilitaire sqlcmd (versions ODBC et Go)", url: "https://learn.microsoft.com/fr-fr/sql/tools/sqlcmd/sqlcmd-utility" },
      { titre: "Snowflake : COPY INTO <location>", url: "https://docs.snowflake.com/en/sql-reference/sql/copy-into-location" },
      { titre: "MySQL 8.4 : SELECT … INTO Statement", url: "https://dev.mysql.com/doc/refman/8.4/en/select-into.html" },
      { titre: "Excel : garder les zéros devant et les grands nombres", url: "https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/excel/last-digits-changed-to-zeros" },
      { titre: "Power Query : fichier texte ou CSV (UTF-8 reconnu avec le BOM)", url: "https://learn.microsoft.com/fr-fr/power-query/connectors/text-csv" },
      { titre: "Exporter vers Excel : les limites d'une feuille", url: "https://learn.microsoft.com/fr-fr/sql/reporting-services/report-builder/exporting-to-microsoft-excel-report-builder-and-ssrs" },
      { titre: "Divalto : utiliser Azure Data Studio (SaaS)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10586488856/Utiliser+Azure+Data+Studio+SAAS" }
    ]
  },
  {
    id: "corriger-prod",
    titre: "Je corrige des données en production",
    famille: "Écrire et charger",
    resume: "Les questions avant de corriger des données après un incident : la cause, la demande écrite, le périmètre exact, la copie, l'ERP, les effets en aval, puis vérifier et documenter.",
    besoins: [
      "je corrige des données en production",
      "corriger des données fausses après un incident",
      "réparer la base de prod après une erreur de traitement",
      "remettre les bonnes valeurs suite à un bug"
    ],
    essais: [
      "un traitement de nuit a annule des commandes par erreur",
      "patch de donnees en prod sur divalto",
      "corriger une facture fausse dans la base",
      "script de correction suite a un incident"
    ],
    exemple: {
      texte: "Ticket INC-0412 : le traitement de nuit du 14/04 a passé à tort 3 commandes en cours (CDE-1005, 1006 et 1007) au statut ANNULEE. Sa cause est trouvée et corrigée. Tu remets le bon statut dans ta base d'intégration, sans toucher CDE-1004, annulée pour de vrai par le client.",
      code: "-- INC-0412 · demandé par l'ADV · validé par le responsable des ventes · relu par Marc\n-- 1. Le périmètre exact : 3 lignes attendues (pas CDE-1004)\nSELECT id, num_cde, statut FROM dbo.commande\nWHERE id IN (5, 6, 7) AND statut = 'ANNULEE';\n-- 2. La copie des lignes, telles qu'elles sont, avec le ticket\nSELECT *, 'INC-0412' AS ticket INTO sauv.commande_inc0412\nFROM dbo.commande WHERE id IN (5, 6, 7);\n-- 3. La correction, validée seulement si le compte est bon\nSET XACT_ABORT ON;\nBEGIN TRAN;\nUPDATE dbo.commande SET statut = 'EN_COURS'\nWHERE id IN (5, 6, 7) AND statut = 'ANNULEE';     -- relancée, elle ne touche plus rien\nIF @@ROWCOUNT = 3 COMMIT; ELSE ROLLBACK;\n-- Retour arrière prêt : UPDATE c SET c.statut = s.statut\n--   FROM dbo.commande AS c JOIN sauv.commande_inc0412 AS s ON s.id = c.id;",
      codes: {
        snowflake: "-- 1. Le périmètre exact : 3 lignes attendues (pas CDE-1004)\nSELECT id, num_cde, statut FROM ventes.commande\nWHERE id IN (5, 6, 7) AND statut = 'ANNULEE';\n-- 2. La copie : un clone de la table, juste avant\nCREATE TABLE sauv.commande_inc0412 CLONE ventes.commande;\n-- 3. La correction, contrôlée avant de valider\nEXECUTE IMMEDIATE $$\nDECLARE\n  compte_faux EXCEPTION (-20001, 'INC-0412 : nombre de lignes inattendu');\nBEGIN\n  BEGIN TRANSACTION;\n  UPDATE ventes.commande SET statut = 'EN_COURS'\n  WHERE id IN (5, 6, 7) AND statut = 'ANNULEE';\n  IF (SQLROWCOUNT = 3) THEN COMMIT;\n  ELSE ROLLBACK; RAISE compte_faux; END IF;\nEND;\n$$;",
        mysql: "-- 1. Le périmètre exact : 3 lignes attendues (pas CDE-1004)\nSELECT id, num_cde, statut FROM commande\nWHERE id IN (5, 6, 7) AND statut = 'ANNULEE';\n-- 2. La copie des lignes, telles qu'elles sont (un DDL : avant la transaction)\nCREATE TABLE sauv_commande_inc0412 AS\n  SELECT * FROM commande WHERE id IN (5, 6, 7);\n-- 3. La correction\nSTART TRANSACTION;\nUPDATE commande SET statut = 'EN_COURS'\nWHERE id IN (5, 6, 7) AND statut = 'ANNULEE';\nSELECT ROW_COUNT();   -- 3 ? alors COMMIT ; sinon ROLLBACK"
      }
    },
    etapes: [
      {
        titre: "Comprendre d'abord",
        questions: [
          {
            id: "cause",
            q: "As-tu trouvé, et arrêté, la cause de l'erreur avant de corriger les données ?",
            pourquoi: "Corriger les données sans toucher la cause, c'est recommencer demain : le traitement de nuit repasse les commandes en ANNULEE, et tu corriges encore, sans fin.",
            reflexe: "Trouve l'origine : un flux, un programme, une saisie, un paramètre. Arrête-la d'abord (traitement suspendu, flux bloqué), ou corrige-la. Puis seulement les données."
          },
          {
            id: "ampleur",
            q: "Depuis quand l'erreur existe-t-elle, et combien de lignes touche-t-elle vraiment ?",
            pourquoi: "On te signale 3 commandes ; le défaut tourne peut-être depuis 10 nuits. Corriger seulement les exemples du ticket laisse les autres fausses, et l'incident revient par un autre client.",
            reflexe: "Cherche la première occurrence (journaux du traitement, dates de modification), puis toutes les lignes qui portent la marque de l'erreur. Compare ce nombre à celui du ticket, et fais valider l'écart."
          },
          {
            id: "contourner",
            q: "Faut-il un geste immédiat, en attendant une correction préparée et relue ?",
            pourquoi: "Sous la pression, on corrige en direct, vite, et on ajoute une 2e erreur à la 1re. Une commande qui ne doit pas partir peut souvent être bloquée sans toucher aux données.",
            reflexe: "Si l'activité est bloquée : un geste réversible d'abord (bloquer la facturation de ces commandes, suspendre le flux). Puis la correction, écrite, relue et testée."
          }
        ]
      },
      {
        titre: "La demande et la décision",
        questions: [
          {
            id: "demande",
            q: "Qui demande la correction, et qui valide par écrit les nouvelles valeurs ?",
            pourquoi: "Changer des statuts, des prix ou des montants sur une demande orale, c'est en porter seul la responsabilité. Le jour d'un audit, personne ne sait qui a décidé, ni pourquoi.",
            reflexe: "Un ticket : l'incident, les lignes, les valeurs d'avant et d'après, le demandeur, et le validateur, propriétaire de la donnée (l'ADV, c'est-à-dire l'administration des ventes, ou la compta). Cite le ticket en tête du script."
          },
          {
            id: "valeur-juste",
            q: "Pour chaque ligne, sais-tu quelle est la bonne valeur, et d'où elle vient ?",
            pourquoi: "« Remettre comme avant » : mais avant, c'était quoi ? Une valeur reprise de mémoire remplace une erreur par une autre, sans que personne le voie.",
            reflexe: "Prends une source sûre : le message EDI d'origine, le journal du traitement, une sauvegarde, la pièce papier. Écris-la dans le ticket, à côté de chaque valeur.",
            moteurs: {
              sqlserver: "Une sauvegarde restaurée sous un autre nom, à l'heure juste avant l'erreur (mode de récupération complet), donne les anciennes valeurs sans toucher la production.",
              snowflake: "Time Travel relit la table juste avant le traitement fautif : `SELECT … FROM ventes.commande BEFORE (STATEMENT => '<id de la requête>')`, pendant la rétention (1 jour par défaut).",
              mysql: "Une sauvegarde restaurée ailleurs, puis le journal binaire (binlog) rejoué jusqu'à juste avant l'erreur."
            }
          }
        ]
      },
      {
        titre: "Le périmètre exact",
        questions: [
          {
            id: "perimetre",
            q: "Ton WHERE vise-t-il exactement les lignes abîmées, et aucune autre ?",
            pourquoi: "`WHERE statut = 'ANNULEE'` rend 4 commandes : il remettrait en cours CDE-1004, annulée pour de vrai par le client. La correction crée alors un nouvel incident.",
            reflexe: "Vise la marque de l'erreur (les id du journal, la date du traitement, le nom du fichier) et la valeur fausse actuelle : `WHERE id IN (5, 6, 7) AND statut = 'ANNULEE'`. Fais valider la liste par le demandeur."
          },
          {
            id: "entre-temps",
            q: "Des lignes ont-elles été modifiées depuis l'erreur, par un utilisateur ou un autre flux ?",
            pourquoi: "L'ADV a peut-être déjà corrigé une commande à la main, ou un flux l'a fait avancer. Ta correction écrase alors leur travail avec une valeur dépassée.",
            reflexe: "Garde la valeur fausse dans le WHERE (`AND statut = 'ANNULEE'`) : une ligne déjà changée n'est plus touchée. Liste à part les lignes modifiées depuis l'erreur, et vois-les avec le métier."
          }
        ]
      },
      {
        titre: "Ne pas contourner l'ERP",
        questions: [
          {
            id: "erp",
            q: "La donnée est-elle dans les tables de l'ERP (Divalto), ou dans ta propre base ?",
            pourquoi: "Un UPDATE direct dans les tables de l'ERP saute ses contrôles et ses traitements : la donnée change, mais pas ce que l'application aurait fait avec elle. La pièce peut devenir incohérente.",
            reflexe: "Dans l'ERP : corrige par l'application (écran, traitement prévu, import), ou avec l'éditeur ou l'intégrateur, et leur accord écrit dans le ticket. Le SQL direct, seulement dans ta propre base (intégration, rapports)."
          }
        ]
      },
      {
        titre: "Avant de lancer",
        questions: [
          {
            id: "copie-retour",
            q: "As-tu une copie des lignes touchées, et le script qui les remet, prêts avant de lancer ?",
            pourquoi: "Si le demandeur dit « ce n'était pas ça », il faut défaire la correction, et seulement elle. Restaurer toute la base efface le travail fait depuis ; écrire le retour sous pression ajoute des erreurs.",
            reflexe: "Copie les lignes visées juste avant, avec le ticket (`sauv.commande_inc0412`). Écris et teste le script qui remet ces valeurs. Garde la copie jusqu'à la date notée dans le ticket, puis supprime-la.",
            moteurs: {
              snowflake: "Un `CLONE` de la table (une copie rapide, sans doubler le stockage), juste avant ; et Time Travel (relire la table dans le passé) pendant la rétention.",
              mysql: "`CREATE TABLE … AS SELECT` est un DDL, qui valide la transaction en cours : fais la copie avant `START TRANSACTION`."
            }
          },
          {
            id: "relu-teste",
            q: "Même en urgence, le script est-il relu par un autre, et essayé sur une copie ?",
            pourquoi: "Un incident pousse à aller vite : la mauvaise base, un WHERE trop large, une valeur mal tapée. Un collègue repère en deux minutes ce que l'auteur ne voit plus.",
            reflexe: "Fais relire le WHERE, les valeurs et le retour arrière. Lance le script sur une copie récente qui contient l'erreur (une recette rafraîchie, un clone), avec le compte attendu. Le détail : « Je mets un script en production »."
          },
          {
            id: "compte-controle",
            q: "La correction ne se valide-t-elle que si le nombre de lignes est le bon ?",
            pourquoi: "0 ligne ou 4 000 lignes ne sont pas des erreurs pour le moteur. Sans contrôle, un WHERE trop large est validé, et la production prend un 2e incident.",
            reflexe: "Dans une transaction : l'UPDATE, puis COMMIT seulement si le compte est celui du ticket (3 ici), sinon ROLLBACK. Le détail : « J'utilise une transaction ».",
            moteurs: {
              sqlserver: "`SET XACT_ABORT ON;` puis `IF @@ROWCOUNT = 3 COMMIT; ELSE ROLLBACK;`, comme dans l'exemple.",
              snowflake: "Dans un bloc : `IF (SQLROWCOUNT = 3) THEN COMMIT; ELSE ROLLBACK; …`, comme dans l'exemple.",
              mysql: "`SELECT ROW_COUNT();` juste après l'UPDATE, puis COMMIT ou ROLLBACK, à la main."
            }
          },
          {
            id: "moment",
            q: "Les flux et les utilisateurs qui écrivent sur ces lignes sont-ils arrêtés pendant la correction ?",
            pourquoi: "Un flux qui tourne pendant ta correction réécrit la mauvaise valeur derrière toi, ou se bloque sur tes verrous (les lignes réservées). Une correction en pleine clôture change des chiffres que la compta arrête.",
            reflexe: "Suspends le traitement fautif et les flux qui touchent ces lignes, corrige hors des heures de saisie et de clôture, puis relance-les, et regarde leur premier passage."
          }
        ]
      },
      {
        titre: "Les effets en aval",
        questions: [
          {
            id: "pieces-legales",
            q: "Des factures ou des écritures comptables ont-elles déjà été faites avec la donnée fausse ?",
            pourquoi: "Une facture émise ne se corrige pas en base : la doc Divalto le dit pour une facture signée, non modifiable et non annulable, sauf par un avoir (la facture qui annule). Et l'écriture comptable déjà passée ne suit pas ton UPDATE.",
            reflexe: "Demande à la compta et à l'ADV ce qui est déjà parti. Une facture fausse : un avoir, puis une nouvelle facture, dans l'ERP. Une écriture déjà passée : la compta la corrige elle-même, surtout sur une période close."
          },
          {
            id: "copies-aval",
            q: "Qui a déjà reçu ou lu la donnée fausse : partenaire EDI, Power BI, exports ?",
            pourquoi: "Ta base est juste, mais le client a peut-être reçu une annulation par EDI, le rapport Power BI d'hier montre 3 commandes en moins, et un export est déjà parti chez le transporteur.",
            reflexe: "Liste chaque destinataire depuis l'erreur. Pour chacun, une action : un message EDI de correction (selon l'accord avec le partenaire), un rafraîchissement Power BI, un fichier corrigé, ou au moins un mot d'explication."
          },
          {
            id: "donnees-derivees",
            q: "D'autres données sont-elles calculées à partir de celles que tu corriges ?",
            pourquoi: "Corriger une ligne de commande sans recalculer le total de l'en-tête, le stock réservé ou les statistiques laisse d'autres chiffres faux. Le rapport ne colle plus, et personne ne sait pourquoi.",
            reflexe: "Liste ce qui dépend de la donnée : totaux, cumuls, stocks, tables de rapport. Relance le traitement normal qui les calcule, plutôt qu'un calcul à la main. Contrôle : total de l'en-tête = somme des lignes."
          },
          {
            id: "prevenir",
            q: "Qui prévenir, et quand : avant la correction, et une fois finie ?",
            pourquoi: "Un utilisateur qui voit ses commandes changer sans explication les « corrige » à son tour. Le support cherche une panne, et le métier ne sait pas quoi refaire de son côté.",
            reflexe: "Avant : le demandeur, les utilisateurs de ces données, le support. Après : ce qui était faux, depuis quand, ce qui est corrigé, ce qu'ils doivent refaire (une facture, un appel au client)."
          }
        ]
      },
      {
        titre: "Vérifier et documenter",
        questions: [
          {
            id: "verifier",
            q: "As-tu vérifié la correction avec le demandeur, dans la base et dans l'application ?",
            pourquoi: "La table est juste, mais l'écran de l'ERP ou le rapport montre autre chose : une autre table, un rapport pas encore rafraîchi. Seul le demandeur sait si son problème est réglé.",
            reflexe: "Recompte avec la marque de l'erreur : il doit rester 0 ligne fausse. Regarde trois cas dans l'écran et dans le rapport. Fais confirmer le demandeur dans le ticket."
          },
          {
            id: "documenter",
            q: "As-tu écrit ce qui s'est passé : cause, lignes, script, contrôles, et actions pour éviter le retour ?",
            pourquoi: "Dans six mois, le même incident revient, et personne ne se souvient du correctif. Un audit demande qui a changé ces commandes : sans trace, impossible de répondre.",
            reflexe: "Dans le ticket : la cause, les dates, le nombre de lignes, le script et son journal, la copie et sa date de suppression, les contrôles, qui a validé. Puis un retour d'expérience, sans chercher de coupable."
          },
          {
            id: "detection",
            q: "Quel contrôle automatique aurait vu l'erreur avant le client ?",
            pourquoi: "L'erreur a été vue par un client, après plusieurs jours. Un simple contrôle chaque nuit l'aurait signalée le matin même, avec 3 lignes à corriger au lieu de 30.",
            reflexe: "Ajoute un contrôle au traitement ou à ta supervision : une alerte si plus de N commandes changent de statut en une nuit, ou si un total s'écarte de la veille. Note-le dans le ticket comme action de prévention."
          }
        ]
      }
    ],
    pieges: [
      "`WHERE statut = 'ANNULEE'` au lieu du périmètre de l'incident : CDE-1004, annulée pour de vrai, repart en cours.",
      "Corriger les données sans arrêter la cause : le traitement de nuit refait l'erreur, et la correction est à refaire chaque matin.",
      "Une facture émise corrigée par UPDATE : la base ne colle plus au document envoyé ; il fallait un avoir.",
      "Restaurer toute la base pour quelques lignes : le travail fait depuis est perdu.",
      "Une correction lancée pendant que le flux tourne : il réécrit la valeur fausse derrière toi.",
      "Sans la valeur fausse dans le WHERE : une commande déjà corrigée à la main par l'ADV est écrasée.",
      "La copie `sauv_…` gardée pour toujours : des données de clients oubliées dans un coin de la base.",
      "Un UPDATE direct dans les tables de l'ERP : la donnée change, mais pas ce que l'application aurait fait avec elle."
    ],
    pratique: "Sur Divalto, la doc réserve le studio SQL du SaaS à la consultation (SELECT). Ses déclencheurs tiennent à jour les tables intermédiaires, mais pas les règles de l'application : corrige par l'ERP, ou avec l'éditeur.",
    motsCles: ["correction", "corriger", "production", "prod", "incident", "données fausses", "patch", "réparer", "rattrapage", "bug", "ticket", "par erreur", "retour arrière", "divalto"],
    voirAussi: ["mettre-en-prod", "mettre-a-jour", "transaction", "sauvegarder", "supprimer", "documenter", "automatiser"],
    dico: ["update", "begin-transaction", "commit", "rollback", "xact-abort", "rowcount", "time-travel", "clone"],
    outils: ["gp-decisions", "dico"],
    sources: [
      { titre: "Divalto : utiliser Azure Data Studio (SaaS), pour consulter seulement", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10586488856/Utiliser+Azure+Data+Studio+SAAS" },
      { titre: "Divalto : déclaration des index dans le dictionnaire (les déclencheurs)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10558210300/D+claration+des+index+dans+le+dictionnaire" },
      { titre: "Divalto : dématérialiser les factures clients (facture signée non modifiable)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516500826/D+mat+rialiser+les+pi+ces+commerciales+factures+clients" },
      { titre: "Restaurer une base SQL Server à un point dans le temps (mode complet)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/backup-restore/restore-a-sql-server-database-to-a-point-in-time-full-recovery-model" },
      { titre: "@@ROWCOUNT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/rowcount-transact-sql" },
      { titre: "Snowflake : Time Travel", url: "https://docs.snowflake.com/en/user-guide/data-time-travel" },
      { titre: "Snowflake : CREATE … CLONE", url: "https://docs.snowflake.com/en/sql-reference/sql/create-clone" },
      { titre: "MySQL 8.4 : Point-in-Time (Incremental) Recovery", url: "https://dev.mysql.com/doc/refman/8.4/en/point-in-time-recovery.html" }
    ]
  }
]);
