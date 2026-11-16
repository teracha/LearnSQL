// Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md). FICHIER GÉNÉRÉ par
// outils/mots-reserves/extraire.py à partir des pages officielles : ne pas le modifier à la main.
// Statuts : SQL Server « réservé » ou « futur » (peut le devenir) ; Snowflake « réservé » ou « limité » (interdit
// dans certains emplois, voir noteSnowflake) ; MySQL 8.4 « réservé » ou « mot-clé » (permis comme nom). Absent = libre.
LEARNSQL.motsReserves = {
  "sources": {
   "sqlserver": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql",
   "snowflake": "https://docs.snowflake.com/en/sql-reference/reserved-keywords",
   "mysql": "https://dev.mysql.com/doc/refman/8.4/en/keywords.html",
   "date": "2026-11-16"
  },
  "mots": {
   "ABSOLUTE": {
    "sqlserver": "futur"
   },
   "ACCESSIBLE": {
    "mysql": "réservé"
   },
   "ACCOUNT": {
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "mot-clé"
   },
   "ACTION": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ACTIVE": {
    "mysql": "mot-clé"
   },
   "ADD": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "ADMIN": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "AFTER": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "AGAINST": {
    "mysql": "mot-clé"
   },
   "AGGREGATE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ALGORITHM": {
    "mysql": "mot-clé"
   },
   "ALIAS": {
    "sqlserver": "futur"
   },
   "ALL": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ALLOCATE": {
    "sqlserver": "futur"
   },
   "ALTER": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ALWAYS": {
    "mysql": "mot-clé"
   },
   "ANALYZE": {
    "mysql": "réservé"
   },
   "AND": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ANY": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "mot-clé"
   },
   "ARE": {
    "sqlserver": "futur"
   },
   "ARRAY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "AS": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ASC": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé (cité dans le texte de la page, pas dans son tableau).",
    "mysql": "réservé"
   },
   "ASCII": {
    "mysql": "mot-clé"
   },
   "ASENSITIVE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "ASSERTION": {
    "sqlserver": "futur"
   },
   "ASYMMETRIC": {
    "sqlserver": "futur"
   },
   "AT": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ATOMIC": {
    "sqlserver": "futur"
   },
   "ATTRIBUTE": {
    "mysql": "mot-clé"
   },
   "AUTHENTICATION": {
    "mysql": "mot-clé"
   },
   "AUTHORIZATION": {
    "sqlserver": "réservé"
   },
   "AUTO": {
    "mysql": "mot-clé"
   },
   "AUTOEXTEND_SIZE": {
    "mysql": "mot-clé"
   },
   "AUTO_INCREMENT": {
    "mysql": "mot-clé"
   },
   "AVG": {
    "mysql": "mot-clé"
   },
   "AVG_ROW_LENGTH": {
    "mysql": "mot-clé"
   },
   "BACKUP": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "BEFORE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "BEGIN": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "BERNOULLI": {
    "mysql": "mot-clé"
   },
   "BETWEEN": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "BIGINT": {
    "mysql": "réservé"
   },
   "BINARY": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "BINLOG": {
    "mysql": "mot-clé"
   },
   "BIT": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "BLOB": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "BLOCK": {
    "mysql": "mot-clé"
   },
   "BOOL": {
    "mysql": "mot-clé"
   },
   "BOOLEAN": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "BOTH": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "BREADTH": {
    "sqlserver": "futur"
   },
   "BREAK": {
    "sqlserver": "réservé"
   },
   "BROWSE": {
    "sqlserver": "réservé"
   },
   "BTREE": {
    "mysql": "mot-clé"
   },
   "BUCKETS": {
    "mysql": "mot-clé"
   },
   "BULK": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "BY": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "BYTE": {
    "mysql": "mot-clé"
   },
   "CACHE": {
    "mysql": "mot-clé"
   },
   "CALL": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CALLED": {
    "sqlserver": "futur"
   },
   "CARDINALITY": {
    "sqlserver": "futur"
   },
   "CASCADE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "CASCADED": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "CASE": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul.",
    "mysql": "réservé"
   },
   "CAST": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul."
   },
   "CATALOG": {
    "sqlserver": "futur"
   },
   "CATALOG_NAME": {
    "mysql": "mot-clé"
   },
   "CHAIN": {
    "mysql": "mot-clé"
   },
   "CHALLENGE_RESPONSE": {
    "mysql": "mot-clé"
   },
   "CHANGE": {
    "mysql": "réservé"
   },
   "CHANGED": {
    "mysql": "mot-clé"
   },
   "CHANNEL": {
    "mysql": "mot-clé"
   },
   "CHAR": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CHARACTER": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CHARSET": {
    "mysql": "mot-clé"
   },
   "CHECK": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "CHECKPOINT": {
    "sqlserver": "réservé"
   },
   "CHECKSUM": {
    "mysql": "mot-clé"
   },
   "CIPHER": {
    "mysql": "mot-clé"
   },
   "CLASS": {
    "sqlserver": "futur"
   },
   "CLASS_ORIGIN": {
    "mysql": "mot-clé"
   },
   "CLIENT": {
    "mysql": "mot-clé"
   },
   "CLOB": {
    "sqlserver": "futur"
   },
   "CLONE": {
    "mysql": "mot-clé"
   },
   "CLOSE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "CLUSTERED": {
    "sqlserver": "réservé"
   },
   "COALESCE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "CODE": {
    "mysql": "mot-clé"
   },
   "COLLATE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "COLLATION": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "COLLECT": {
    "sqlserver": "futur"
   },
   "COLUMN": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "COLUMNS": {
    "mysql": "mot-clé"
   },
   "COLUMN_FORMAT": {
    "mysql": "mot-clé"
   },
   "COLUMN_NAME": {
    "mysql": "mot-clé"
   },
   "COMMENT": {
    "mysql": "mot-clé"
   },
   "COMMIT": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "COMMITTED": {
    "mysql": "mot-clé"
   },
   "COMPACT": {
    "mysql": "mot-clé"
   },
   "COMPLETION": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "COMPONENT": {
    "mysql": "mot-clé"
   },
   "COMPRESSED": {
    "mysql": "mot-clé"
   },
   "COMPRESSION": {
    "mysql": "mot-clé"
   },
   "COMPUTE": {
    "sqlserver": "réservé"
   },
   "CONCURRENT": {
    "mysql": "mot-clé"
   },
   "CONDITION": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CONNECT": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI."
   },
   "CONNECTION": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "mot-clé"
   },
   "CONSISTENT": {
    "mysql": "mot-clé"
   },
   "CONSTRAINT": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne dans un CREATE TABLE.",
    "mysql": "réservé"
   },
   "CONSTRAINTS": {
    "sqlserver": "futur"
   },
   "CONSTRAINT_CATALOG": {
    "mysql": "mot-clé"
   },
   "CONSTRAINT_NAME": {
    "mysql": "mot-clé"
   },
   "CONSTRAINT_SCHEMA": {
    "mysql": "mot-clé"
   },
   "CONSTRUCTOR": {
    "sqlserver": "futur"
   },
   "CONTAINS": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "CONTAINSTABLE": {
    "sqlserver": "réservé"
   },
   "CONTEXT": {
    "mysql": "mot-clé"
   },
   "CONTINUE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "CONVERT": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "CORR": {
    "sqlserver": "futur"
   },
   "CORRESPONDING": {
    "sqlserver": "futur"
   },
   "COVAR_POP": {
    "sqlserver": "futur"
   },
   "COVAR_SAMP": {
    "sqlserver": "futur"
   },
   "CPU": {
    "mysql": "mot-clé"
   },
   "CREATE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "CROSS": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "CUBE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CUME_DIST": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "CURRENT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "mot-clé"
   },
   "CURRENT_CATALOG": {
    "sqlserver": "futur"
   },
   "CURRENT_DATE": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "CURRENT_DEFAULT_TRANSFORM_GROUP": {
    "sqlserver": "futur"
   },
   "CURRENT_PATH": {
    "sqlserver": "futur"
   },
   "CURRENT_ROLE": {
    "sqlserver": "futur"
   },
   "CURRENT_SCHEMA": {
    "sqlserver": "futur"
   },
   "CURRENT_TIME": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "CURRENT_TIMESTAMP": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "CURRENT_TRANSFORM_GROUP_FOR_TYPE": {
    "sqlserver": "futur"
   },
   "CURRENT_USER": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "CURSOR": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "CURSOR_NAME": {
    "mysql": "mot-clé"
   },
   "CYCLE": {
    "sqlserver": "futur"
   },
   "DATA": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "DATABASE": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "réservé"
   },
   "DATABASES": {
    "mysql": "réservé"
   },
   "DATAFILE": {
    "mysql": "mot-clé"
   },
   "DATE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "DATETIME": {
    "mysql": "mot-clé"
   },
   "DAY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "DAY_HOUR": {
    "mysql": "réservé"
   },
   "DAY_MICROSECOND": {
    "mysql": "réservé"
   },
   "DAY_MINUTE": {
    "mysql": "réservé"
   },
   "DAY_SECOND": {
    "mysql": "réservé"
   },
   "DBCC": {
    "sqlserver": "réservé"
   },
   "DEALLOCATE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "DEC": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "DECIMAL": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "DECLARE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "DEFAULT": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "DEFAULT_AUTH": {
    "mysql": "mot-clé"
   },
   "DEFERRABLE": {
    "sqlserver": "futur"
   },
   "DEFERRED": {
    "sqlserver": "futur"
   },
   "DEFINER": {
    "mysql": "mot-clé"
   },
   "DEFINITION": {
    "mysql": "mot-clé"
   },
   "DELAYED": {
    "mysql": "réservé"
   },
   "DELAY_KEY_WRITE": {
    "mysql": "mot-clé"
   },
   "DELETE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "DENSE_RANK": {
    "mysql": "réservé"
   },
   "DENY": {
    "sqlserver": "réservé"
   },
   "DEPTH": {
    "sqlserver": "futur"
   },
   "DEREF": {
    "sqlserver": "futur"
   },
   "DESC": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé (cité dans le texte de la page, pas dans son tableau).",
    "mysql": "réservé"
   },
   "DESCRIBE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "DESCRIPTION": {
    "mysql": "mot-clé"
   },
   "DESCRIPTOR": {
    "sqlserver": "futur"
   },
   "DESTROY": {
    "sqlserver": "futur"
   },
   "DESTRUCTOR": {
    "sqlserver": "futur"
   },
   "DETERMINISTIC": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "DIAGNOSTICS": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "DICTIONARY": {
    "sqlserver": "futur"
   },
   "DIRECTORY": {
    "mysql": "mot-clé"
   },
   "DISABLE": {
    "mysql": "mot-clé"
   },
   "DISCARD": {
    "mysql": "mot-clé"
   },
   "DISCONNECT": {
    "sqlserver": "futur"
   },
   "DISK": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "DISTINCT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "DISTINCTROW": {
    "mysql": "réservé"
   },
   "DISTRIBUTED": {
    "sqlserver": "réservé"
   },
   "DIV": {
    "mysql": "réservé"
   },
   "DO": {
    "mysql": "mot-clé"
   },
   "DOMAIN": {
    "sqlserver": "futur"
   },
   "DOUBLE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "DROP": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "DUAL": {
    "mysql": "réservé"
   },
   "DUMP": {
    "sqlserver": "réservé"
   },
   "DUMPFILE": {
    "mysql": "mot-clé"
   },
   "DUPLICATE": {
    "mysql": "mot-clé"
   },
   "DYNAMIC": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "EACH": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "ELEMENT": {
    "sqlserver": "futur"
   },
   "ELSE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ELSEIF": {
    "mysql": "réservé"
   },
   "EMPTY": {
    "mysql": "réservé"
   },
   "ENABLE": {
    "mysql": "mot-clé"
   },
   "ENCLOSED": {
    "mysql": "réservé"
   },
   "ENCRYPTION": {
    "mysql": "mot-clé"
   },
   "END": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "ENDS": {
    "mysql": "mot-clé"
   },
   "ENFORCED": {
    "mysql": "mot-clé"
   },
   "ENGINE": {
    "mysql": "mot-clé"
   },
   "ENGINES": {
    "mysql": "mot-clé"
   },
   "ENGINE_ATTRIBUTE": {
    "mysql": "mot-clé"
   },
   "ENUM": {
    "mysql": "mot-clé"
   },
   "EQUALS": {
    "sqlserver": "futur"
   },
   "ERRLVL": {
    "sqlserver": "réservé"
   },
   "ERROR": {
    "mysql": "mot-clé"
   },
   "ERRORS": {
    "mysql": "mot-clé"
   },
   "ESCAPE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "ESCAPED": {
    "mysql": "réservé"
   },
   "EVENT": {
    "mysql": "mot-clé"
   },
   "EVENTS": {
    "mysql": "mot-clé"
   },
   "EVERY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "EXCEPT": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "EXCEPTION": {
    "sqlserver": "futur"
   },
   "EXCHANGE": {
    "mysql": "mot-clé"
   },
   "EXCLUDE": {
    "mysql": "mot-clé"
   },
   "EXEC": {
    "sqlserver": "réservé"
   },
   "EXECUTE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "EXISTS": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "EXIT": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "EXPANSION": {
    "mysql": "mot-clé"
   },
   "EXPIRE": {
    "mysql": "mot-clé"
   },
   "EXPLAIN": {
    "mysql": "réservé"
   },
   "EXPORT": {
    "mysql": "mot-clé"
   },
   "EXTENDED": {
    "mysql": "mot-clé"
   },
   "EXTENT_SIZE": {
    "mysql": "mot-clé"
   },
   "EXTERNAL": {
    "sqlserver": "réservé"
   },
   "FACTOR": {
    "mysql": "mot-clé"
   },
   "FAILED_LOGIN_ATTEMPTS": {
    "mysql": "mot-clé"
   },
   "FALSE": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul.",
    "mysql": "réservé"
   },
   "FAST": {
    "mysql": "mot-clé"
   },
   "FAULTS": {
    "mysql": "mot-clé"
   },
   "FETCH": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "FIELDS": {
    "mysql": "mot-clé"
   },
   "FILE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "FILE_BLOCK_SIZE": {
    "mysql": "mot-clé"
   },
   "FILLFACTOR": {
    "sqlserver": "réservé"
   },
   "FILTER": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "FINISH": {
    "mysql": "mot-clé"
   },
   "FIRST": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "FIRST_VALUE": {
    "mysql": "réservé"
   },
   "FIXED": {
    "mysql": "mot-clé"
   },
   "FLOAT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "FLOAT4": {
    "mysql": "réservé"
   },
   "FLOAT8": {
    "mysql": "réservé"
   },
   "FLUSH": {
    "mysql": "mot-clé"
   },
   "FOLLOWING": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "mot-clé"
   },
   "FOLLOWS": {
    "mysql": "mot-clé"
   },
   "FOR": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "FORCE": {
    "mysql": "réservé"
   },
   "FOREIGN": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "FORMAT": {
    "mysql": "mot-clé"
   },
   "FOUND": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "FREE": {
    "sqlserver": "futur"
   },
   "FREETEXT": {
    "sqlserver": "réservé"
   },
   "FREETEXTTABLE": {
    "sqlserver": "réservé"
   },
   "FROM": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "FULL": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "mot-clé"
   },
   "FULLTEXT": {
    "mysql": "réservé"
   },
   "FULLTEXTTABLE": {
    "sqlserver": "futur"
   },
   "FUNCTION": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "FUSION": {
    "sqlserver": "futur"
   },
   "GENERAL": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "GENERATE": {
    "mysql": "mot-clé"
   },
   "GENERATED": {
    "mysql": "réservé"
   },
   "GEOMCOLLECTION": {
    "mysql": "mot-clé"
   },
   "GEOMETRY": {
    "mysql": "mot-clé"
   },
   "GEOMETRYCOLLECTION": {
    "mysql": "mot-clé"
   },
   "GET": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "GET_FORMAT": {
    "mysql": "mot-clé"
   },
   "GET_SOURCE_PUBLIC_KEY": {
    "mysql": "mot-clé"
   },
   "GLOBAL": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "GO": {
    "sqlserver": "futur"
   },
   "GOTO": {
    "sqlserver": "réservé"
   },
   "GRANT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "GRANTS": {
    "mysql": "mot-clé"
   },
   "GROUP": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "GROUPING": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "GROUPS": {
    "mysql": "réservé"
   },
   "GROUP_REPLICATION": {
    "mysql": "mot-clé"
   },
   "GSCLUSTER": {
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom)."
   },
   "GTIDS": {
    "mysql": "mot-clé"
   },
   "GTID_ONLY": {
    "mysql": "mot-clé"
   },
   "HANDLER": {
    "mysql": "mot-clé"
   },
   "HASH": {
    "mysql": "mot-clé"
   },
   "HAVING": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "HELP": {
    "mysql": "mot-clé"
   },
   "HIGH_PRIORITY": {
    "mysql": "réservé"
   },
   "HISTOGRAM": {
    "mysql": "mot-clé"
   },
   "HISTORY": {
    "mysql": "mot-clé"
   },
   "HOLD": {
    "sqlserver": "futur"
   },
   "HOLDLOCK": {
    "sqlserver": "réservé"
   },
   "HOST": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "HOSTS": {
    "mysql": "mot-clé"
   },
   "HOUR": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "HOUR_MICROSECOND": {
    "mysql": "réservé"
   },
   "HOUR_MINUTE": {
    "mysql": "réservé"
   },
   "HOUR_SECOND": {
    "mysql": "réservé"
   },
   "IDENTIFIED": {
    "mysql": "mot-clé"
   },
   "IDENTITY": {
    "sqlserver": "réservé"
   },
   "IDENTITYCOL": {
    "sqlserver": "réservé"
   },
   "IDENTITY_INSERT": {
    "sqlserver": "réservé"
   },
   "IF": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "IGNORE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "IGNORE_SERVER_IDS": {
    "mysql": "mot-clé"
   },
   "ILIKE": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake."
   },
   "IMMEDIATE": {
    "sqlserver": "futur"
   },
   "IMPORT": {
    "mysql": "mot-clé"
   },
   "IN": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "INACTIVE": {
    "mysql": "mot-clé"
   },
   "INCREMENT": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake et d'autres moteurs."
   },
   "INDEX": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "INDEXES": {
    "mysql": "mot-clé"
   },
   "INDICATOR": {
    "sqlserver": "futur"
   },
   "INFILE": {
    "mysql": "réservé"
   },
   "INITIAL": {
    "mysql": "mot-clé"
   },
   "INITIALIZE": {
    "sqlserver": "futur"
   },
   "INITIALLY": {
    "sqlserver": "futur"
   },
   "INITIAL_SIZE": {
    "mysql": "mot-clé"
   },
   "INITIATE": {
    "mysql": "mot-clé"
   },
   "INNER": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "INOUT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "INPUT": {
    "sqlserver": "futur"
   },
   "INSENSITIVE": {
    "mysql": "réservé"
   },
   "INSERT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "INSERT_METHOD": {
    "mysql": "mot-clé"
   },
   "INSTALL": {
    "mysql": "mot-clé"
   },
   "INSTANCE": {
    "mysql": "mot-clé"
   },
   "INT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "INT1": {
    "mysql": "réservé"
   },
   "INT2": {
    "mysql": "réservé"
   },
   "INT3": {
    "mysql": "réservé"
   },
   "INT4": {
    "mysql": "réservé"
   },
   "INT8": {
    "mysql": "réservé"
   },
   "INTEGER": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "INTERSECT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "INTERSECTION": {
    "sqlserver": "futur"
   },
   "INTERVAL": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "INTO": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "INVISIBLE": {
    "mysql": "mot-clé"
   },
   "INVOKER": {
    "mysql": "mot-clé"
   },
   "IO": {
    "mysql": "mot-clé"
   },
   "IO_AFTER_GTIDS": {
    "mysql": "réservé"
   },
   "IO_BEFORE_GTIDS": {
    "mysql": "réservé"
   },
   "IO_THREAD": {
    "mysql": "mot-clé"
   },
   "IPC": {
    "mysql": "mot-clé"
   },
   "IS": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ISOLATION": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ISSUE": {
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom)."
   },
   "ISSUER": {
    "mysql": "mot-clé"
   },
   "ITERATE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "JOIN": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "JSON": {
    "mysql": "mot-clé"
   },
   "JSON_TABLE": {
    "mysql": "réservé"
   },
   "JSON_VALUE": {
    "mysql": "mot-clé"
   },
   "KEY": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "KEYRING": {
    "mysql": "mot-clé"
   },
   "KEYS": {
    "mysql": "réservé"
   },
   "KEY_BLOCK_SIZE": {
    "mysql": "mot-clé"
   },
   "KILL": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "LAG": {
    "mysql": "réservé"
   },
   "LANGUAGE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "LARGE": {
    "sqlserver": "futur"
   },
   "LAST": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "LAST_VALUE": {
    "mysql": "réservé"
   },
   "LATERAL": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "LEAD": {
    "mysql": "réservé"
   },
   "LEADING": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "LEAVE": {
    "mysql": "réservé"
   },
   "LEAVES": {
    "mysql": "mot-clé"
   },
   "LEFT": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "LESS": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "LEVEL": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "LIKE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "LIKE_REGEX": {
    "sqlserver": "futur"
   },
   "LIMIT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "LINEAR": {
    "mysql": "réservé"
   },
   "LINENO": {
    "sqlserver": "réservé"
   },
   "LINES": {
    "mysql": "réservé"
   },
   "LINESTRING": {
    "mysql": "mot-clé"
   },
   "LIST": {
    "mysql": "mot-clé"
   },
   "LN": {
    "sqlserver": "futur"
   },
   "LOAD": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "LOCAL": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "LOCALTIME": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "LOCALTIMESTAMP": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de colonne (norme ANSI).",
    "mysql": "réservé"
   },
   "LOCATOR": {
    "sqlserver": "futur"
   },
   "LOCK": {
    "mysql": "réservé"
   },
   "LOCKED": {
    "mysql": "mot-clé"
   },
   "LOCKS": {
    "mysql": "mot-clé"
   },
   "LOG": {
    "mysql": "mot-clé"
   },
   "LOGFILE": {
    "mysql": "mot-clé"
   },
   "LOGS": {
    "mysql": "mot-clé"
   },
   "LONG": {
    "mysql": "réservé"
   },
   "LONGBLOB": {
    "mysql": "réservé"
   },
   "LONGTEXT": {
    "mysql": "réservé"
   },
   "LOOP": {
    "mysql": "réservé"
   },
   "LOW_PRIORITY": {
    "mysql": "réservé"
   },
   "MANUAL": {
    "mysql": "mot-clé"
   },
   "MAP": {
    "sqlserver": "futur"
   },
   "MASTER": {
    "mysql": "mot-clé"
   },
   "MATCH": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "MAXVALUE": {
    "mysql": "réservé"
   },
   "MAX_CONNECTIONS_PER_HOUR": {
    "mysql": "mot-clé"
   },
   "MAX_QUERIES_PER_HOUR": {
    "mysql": "mot-clé"
   },
   "MAX_ROWS": {
    "mysql": "mot-clé"
   },
   "MAX_SIZE": {
    "mysql": "mot-clé"
   },
   "MAX_UPDATES_PER_HOUR": {
    "mysql": "mot-clé"
   },
   "MAX_USER_CONNECTIONS": {
    "mysql": "mot-clé"
   },
   "MEDIUM": {
    "mysql": "mot-clé"
   },
   "MEDIUMBLOB": {
    "mysql": "réservé"
   },
   "MEDIUMINT": {
    "mysql": "réservé"
   },
   "MEDIUMTEXT": {
    "mysql": "réservé"
   },
   "MEMBER": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "MEMORY": {
    "mysql": "mot-clé"
   },
   "MERGE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "MESSAGE_TEXT": {
    "mysql": "mot-clé"
   },
   "METHOD": {
    "sqlserver": "futur"
   },
   "MICROSECOND": {
    "mysql": "mot-clé"
   },
   "MIDDLEINT": {
    "mysql": "réservé"
   },
   "MIGRATE": {
    "mysql": "mot-clé"
   },
   "MINUS": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake et d'autres moteurs."
   },
   "MINUTE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "MINUTE_MICROSECOND": {
    "mysql": "réservé"
   },
   "MINUTE_SECOND": {
    "mysql": "réservé"
   },
   "MIN_ROWS": {
    "mysql": "mot-clé"
   },
   "MOD": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "MODE": {
    "mysql": "mot-clé"
   },
   "MODIFIES": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "MODIFY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "MODULE": {
    "sqlserver": "futur"
   },
   "MONTH": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "MULTILINESTRING": {
    "mysql": "mot-clé"
   },
   "MULTIPOINT": {
    "mysql": "mot-clé"
   },
   "MULTIPOLYGON": {
    "mysql": "mot-clé"
   },
   "MULTISET": {
    "sqlserver": "futur"
   },
   "MUTEX": {
    "mysql": "mot-clé"
   },
   "MYSQL_ERRNO": {
    "mysql": "mot-clé"
   },
   "NAME": {
    "mysql": "mot-clé"
   },
   "NAMES": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NATIONAL": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "NATURAL": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "NCHAR": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NCLOB": {
    "sqlserver": "futur"
   },
   "NDB": {
    "mysql": "mot-clé"
   },
   "NDBCLUSTER": {
    "mysql": "mot-clé"
   },
   "NESTED": {
    "mysql": "mot-clé"
   },
   "NETWORK_NAMESPACE": {
    "mysql": "mot-clé"
   },
   "NEVER": {
    "mysql": "mot-clé"
   },
   "NEW": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NEXT": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NO": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NOCHECK": {
    "sqlserver": "réservé"
   },
   "NODEGROUP": {
    "mysql": "mot-clé"
   },
   "NONCLUSTERED": {
    "sqlserver": "réservé"
   },
   "NONE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "NORMALIZE": {
    "sqlserver": "futur"
   },
   "NOT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "NOWAIT": {
    "mysql": "mot-clé"
   },
   "NO_WAIT": {
    "mysql": "mot-clé"
   },
   "NO_WRITE_TO_BINLOG": {
    "mysql": "réservé"
   },
   "NTH_VALUE": {
    "mysql": "réservé"
   },
   "NTILE": {
    "mysql": "réservé"
   },
   "NULL": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "NULLIF": {
    "sqlserver": "réservé"
   },
   "NULLS": {
    "mysql": "mot-clé"
   },
   "NUMBER": {
    "mysql": "mot-clé"
   },
   "NUMERIC": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "NVARCHAR": {
    "mysql": "mot-clé"
   },
   "OBJECT": {
    "sqlserver": "futur"
   },
   "OCCURRENCES_REGEX": {
    "sqlserver": "futur"
   },
   "OF": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "OFF": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "OFFSET": {
    "mysql": "mot-clé"
   },
   "OFFSETS": {
    "sqlserver": "réservé"
   },
   "OJ": {
    "mysql": "mot-clé"
   },
   "OLD": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ON": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ONE": {
    "mysql": "mot-clé"
   },
   "ONLY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "OPEN": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "OPENDATASOURCE": {
    "sqlserver": "réservé"
   },
   "OPENQUERY": {
    "sqlserver": "réservé"
   },
   "OPENROWSET": {
    "sqlserver": "réservé"
   },
   "OPENXML": {
    "sqlserver": "réservé"
   },
   "OPERATION": {
    "sqlserver": "futur"
   },
   "OPTIMIZE": {
    "mysql": "réservé"
   },
   "OPTIMIZER_COSTS": {
    "mysql": "réservé"
   },
   "OPTION": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "OPTIONAL": {
    "mysql": "mot-clé"
   },
   "OPTIONALLY": {
    "mysql": "réservé"
   },
   "OPTIONS": {
    "mysql": "mot-clé"
   },
   "OR": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ORDER": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ORDINALITY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ORGANIZATION": {
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "mot-clé"
   },
   "OTHERS": {
    "mysql": "mot-clé"
   },
   "OUT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "OUTER": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "OUTFILE": {
    "mysql": "réservé"
   },
   "OUTPUT": {
    "sqlserver": "futur"
   },
   "OVER": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "OVERLAY": {
    "sqlserver": "futur"
   },
   "OWNER": {
    "mysql": "mot-clé"
   },
   "PACK_KEYS": {
    "mysql": "mot-clé"
   },
   "PAD": {
    "sqlserver": "futur"
   },
   "PAGE": {
    "mysql": "mot-clé"
   },
   "PARALLEL": {
    "mysql": "mot-clé"
   },
   "PARAMETER": {
    "sqlserver": "futur"
   },
   "PARAMETERS": {
    "sqlserver": "futur"
   },
   "PARSER": {
    "mysql": "mot-clé"
   },
   "PARSE_TREE": {
    "mysql": "mot-clé"
   },
   "PARTIAL": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "PARTITION": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "PARTITIONING": {
    "mysql": "mot-clé"
   },
   "PARTITIONS": {
    "mysql": "mot-clé"
   },
   "PASSWORD": {
    "mysql": "mot-clé"
   },
   "PASSWORD_LOCK_TIME": {
    "mysql": "mot-clé"
   },
   "PATH": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "PERCENT": {
    "sqlserver": "réservé"
   },
   "PERCENTILE_CONT": {
    "sqlserver": "futur"
   },
   "PERCENTILE_DISC": {
    "sqlserver": "futur"
   },
   "PERCENT_RANK": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "PERSIST": {
    "mysql": "mot-clé"
   },
   "PERSIST_ONLY": {
    "mysql": "mot-clé"
   },
   "PHASE": {
    "mysql": "mot-clé"
   },
   "PIVOT": {
    "sqlserver": "réservé"
   },
   "PLAN": {
    "sqlserver": "réservé"
   },
   "PLUGIN": {
    "mysql": "mot-clé"
   },
   "PLUGINS": {
    "mysql": "mot-clé"
   },
   "PLUGIN_DIR": {
    "mysql": "mot-clé"
   },
   "POINT": {
    "mysql": "mot-clé"
   },
   "POLYGON": {
    "mysql": "mot-clé"
   },
   "PORT": {
    "mysql": "mot-clé"
   },
   "POSITION_REGEX": {
    "sqlserver": "futur"
   },
   "POSTFIX": {
    "sqlserver": "futur"
   },
   "PRECEDES": {
    "mysql": "mot-clé"
   },
   "PRECEDING": {
    "mysql": "mot-clé"
   },
   "PRECISION": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "PREFIX": {
    "sqlserver": "futur"
   },
   "PREORDER": {
    "sqlserver": "futur"
   },
   "PREPARE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "PRESERVE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "PREV": {
    "mysql": "mot-clé"
   },
   "PRIMARY": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "PRINT": {
    "sqlserver": "réservé"
   },
   "PRIOR": {
    "sqlserver": "futur"
   },
   "PRIVILEGES": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "PRIVILEGE_CHECKS_USER": {
    "mysql": "mot-clé"
   },
   "PROC": {
    "sqlserver": "réservé"
   },
   "PROCEDURE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "PROCESS": {
    "mysql": "mot-clé"
   },
   "PROCESSLIST": {
    "mysql": "mot-clé"
   },
   "PROFILE": {
    "mysql": "mot-clé"
   },
   "PROFILES": {
    "mysql": "mot-clé"
   },
   "PROXY": {
    "mysql": "mot-clé"
   },
   "PUBLIC": {
    "sqlserver": "réservé"
   },
   "PURGE": {
    "mysql": "réservé"
   },
   "QUALIFY": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake.",
    "mysql": "réservé"
   },
   "QUARTER": {
    "mysql": "mot-clé"
   },
   "QUERY": {
    "mysql": "mot-clé"
   },
   "QUICK": {
    "mysql": "mot-clé"
   },
   "RAISERROR": {
    "sqlserver": "réservé"
   },
   "RANDOM": {
    "mysql": "mot-clé"
   },
   "RANGE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "RANK": {
    "mysql": "réservé"
   },
   "READ": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "READS": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "READTEXT": {
    "sqlserver": "réservé"
   },
   "READ_ONLY": {
    "mysql": "mot-clé"
   },
   "READ_WRITE": {
    "mysql": "réservé"
   },
   "REAL": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "REBUILD": {
    "mysql": "mot-clé"
   },
   "RECONFIGURE": {
    "sqlserver": "réservé"
   },
   "RECOVER": {
    "mysql": "mot-clé"
   },
   "RECURSIVE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "REDO_BUFFER_SIZE": {
    "mysql": "mot-clé"
   },
   "REDUNDANT": {
    "mysql": "mot-clé"
   },
   "REF": {
    "sqlserver": "futur"
   },
   "REFERENCE": {
    "mysql": "mot-clé"
   },
   "REFERENCES": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "REFERENCING": {
    "sqlserver": "futur"
   },
   "REGEXP": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake.",
    "mysql": "réservé"
   },
   "REGISTRATION": {
    "mysql": "mot-clé"
   },
   "REGR_AVGX": {
    "sqlserver": "futur"
   },
   "REGR_AVGY": {
    "sqlserver": "futur"
   },
   "REGR_COUNT": {
    "sqlserver": "futur"
   },
   "REGR_INTERCEPT": {
    "sqlserver": "futur"
   },
   "REGR_SLOPE": {
    "sqlserver": "futur"
   },
   "REGR_SXX": {
    "sqlserver": "futur"
   },
   "REGR_SXY": {
    "sqlserver": "futur"
   },
   "REGR_SYY": {
    "sqlserver": "futur"
   },
   "RELATIVE": {
    "sqlserver": "futur"
   },
   "RELAY": {
    "mysql": "mot-clé"
   },
   "RELAYLOG": {
    "mysql": "mot-clé"
   },
   "RELAY_LOG_FILE": {
    "mysql": "mot-clé"
   },
   "RELAY_LOG_POS": {
    "mysql": "mot-clé"
   },
   "RELAY_THREAD": {
    "mysql": "mot-clé"
   },
   "RELEASE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "RELOAD": {
    "mysql": "mot-clé"
   },
   "REMOVE": {
    "mysql": "mot-clé"
   },
   "RENAME": {
    "mysql": "réservé"
   },
   "REORGANIZE": {
    "mysql": "mot-clé"
   },
   "REPAIR": {
    "mysql": "mot-clé"
   },
   "REPEAT": {
    "mysql": "réservé"
   },
   "REPEATABLE": {
    "mysql": "mot-clé"
   },
   "REPLACE": {
    "mysql": "réservé"
   },
   "REPLICA": {
    "mysql": "mot-clé"
   },
   "REPLICAS": {
    "mysql": "mot-clé"
   },
   "REPLICATE_DO_DB": {
    "mysql": "mot-clé"
   },
   "REPLICATE_DO_TABLE": {
    "mysql": "mot-clé"
   },
   "REPLICATE_IGNORE_DB": {
    "mysql": "mot-clé"
   },
   "REPLICATE_IGNORE_TABLE": {
    "mysql": "mot-clé"
   },
   "REPLICATE_REWRITE_DB": {
    "mysql": "mot-clé"
   },
   "REPLICATE_WILD_DO_TABLE": {
    "mysql": "mot-clé"
   },
   "REPLICATE_WILD_IGNORE_TABLE": {
    "mysql": "mot-clé"
   },
   "REPLICATION": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "REQUIRE": {
    "mysql": "réservé"
   },
   "REQUIRE_ROW_FORMAT": {
    "mysql": "mot-clé"
   },
   "RESET": {
    "mysql": "mot-clé"
   },
   "RESIGNAL": {
    "mysql": "réservé"
   },
   "RESOURCE": {
    "mysql": "mot-clé"
   },
   "RESPECT": {
    "mysql": "mot-clé"
   },
   "RESTART": {
    "mysql": "mot-clé"
   },
   "RESTORE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "RESTRICT": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "RESULT": {
    "sqlserver": "futur"
   },
   "RESUME": {
    "mysql": "mot-clé"
   },
   "RETAIN": {
    "mysql": "mot-clé"
   },
   "RETURN": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "RETURNED_SQLSTATE": {
    "mysql": "mot-clé"
   },
   "RETURNING": {
    "mysql": "mot-clé"
   },
   "RETURNS": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "REUSE": {
    "mysql": "mot-clé"
   },
   "REVERSE": {
    "mysql": "mot-clé"
   },
   "REVERT": {
    "sqlserver": "réservé"
   },
   "REVOKE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "RIGHT": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "RLIKE": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake.",
    "mysql": "réservé"
   },
   "ROLE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ROLLBACK": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "ROLLUP": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ROTATE": {
    "mysql": "mot-clé"
   },
   "ROUTINE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "ROW": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ROWCOUNT": {
    "sqlserver": "réservé"
   },
   "ROWGUIDCOL": {
    "sqlserver": "réservé"
   },
   "ROWS": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "ROW_COUNT": {
    "mysql": "mot-clé"
   },
   "ROW_FORMAT": {
    "mysql": "mot-clé"
   },
   "ROW_NUMBER": {
    "mysql": "réservé"
   },
   "RTREE": {
    "mysql": "mot-clé"
   },
   "RULE": {
    "sqlserver": "réservé"
   },
   "S3": {
    "mysql": "mot-clé"
   },
   "SAMPLE": {
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI."
   },
   "SAVE": {
    "sqlserver": "réservé"
   },
   "SAVEPOINT": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "SCHEDULE": {
    "mysql": "mot-clé"
   },
   "SCHEMA": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "réservé"
   },
   "SCHEMAS": {
    "mysql": "réservé"
   },
   "SCHEMA_NAME": {
    "mysql": "mot-clé"
   },
   "SCOPE": {
    "sqlserver": "futur"
   },
   "SCROLL": {
    "sqlserver": "futur"
   },
   "SEARCH": {
    "sqlserver": "futur"
   },
   "SECOND": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "SECONDARY": {
    "mysql": "mot-clé"
   },
   "SECONDARY_ENGINE": {
    "mysql": "mot-clé"
   },
   "SECONDARY_ENGINE_ATTRIBUTE": {
    "mysql": "mot-clé"
   },
   "SECONDARY_LOAD": {
    "mysql": "mot-clé"
   },
   "SECONDARY_UNLOAD": {
    "mysql": "mot-clé"
   },
   "SECOND_MICROSECOND": {
    "mysql": "réservé"
   },
   "SECTION": {
    "sqlserver": "futur"
   },
   "SECURITY": {
    "mysql": "mot-clé"
   },
   "SECURITYAUDIT": {
    "sqlserver": "réservé"
   },
   "SELECT": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "SEMANTICKEYPHRASETABLE": {
    "sqlserver": "réservé"
   },
   "SEMANTICSIMILARITYDETAILSTABLE": {
    "sqlserver": "réservé"
   },
   "SEMANTICSIMILARITYTABLE": {
    "sqlserver": "réservé"
   },
   "SENSITIVE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SEPARATOR": {
    "mysql": "réservé"
   },
   "SEQUENCE": {
    "sqlserver": "futur"
   },
   "SERIAL": {
    "mysql": "mot-clé"
   },
   "SERIALIZABLE": {
    "mysql": "mot-clé"
   },
   "SERVER": {
    "mysql": "mot-clé"
   },
   "SESSION": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "SESSION_USER": {
    "sqlserver": "réservé"
   },
   "SET": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "SETS": {
    "sqlserver": "futur"
   },
   "SETUSER": {
    "sqlserver": "réservé"
   },
   "SHARE": {
    "mysql": "mot-clé"
   },
   "SHOW": {
    "mysql": "réservé"
   },
   "SHUTDOWN": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "SIGNAL": {
    "mysql": "réservé"
   },
   "SIGNED": {
    "mysql": "mot-clé"
   },
   "SIMILAR": {
    "sqlserver": "futur"
   },
   "SIMPLE": {
    "mysql": "mot-clé"
   },
   "SIZE": {
    "sqlserver": "futur"
   },
   "SKIP": {
    "mysql": "mot-clé"
   },
   "SLAVE": {
    "mysql": "mot-clé"
   },
   "SLOW": {
    "mysql": "mot-clé"
   },
   "SMALLINT": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SNAPSHOT": {
    "mysql": "mot-clé"
   },
   "SOCKET": {
    "mysql": "mot-clé"
   },
   "SOME": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par Snowflake.",
    "mysql": "mot-clé"
   },
   "SONAME": {
    "mysql": "mot-clé"
   },
   "SOUNDS": {
    "mysql": "mot-clé"
   },
   "SOURCE": {
    "mysql": "mot-clé"
   },
   "SOURCE_AUTO_POSITION": {
    "mysql": "mot-clé"
   },
   "SOURCE_BIND": {
    "mysql": "mot-clé"
   },
   "SOURCE_COMPRESSION_ALGORITHMS": {
    "mysql": "mot-clé"
   },
   "SOURCE_CONNECT_RETRY": {
    "mysql": "mot-clé"
   },
   "SOURCE_DELAY": {
    "mysql": "mot-clé"
   },
   "SOURCE_HEARTBEAT_PERIOD": {
    "mysql": "mot-clé"
   },
   "SOURCE_HOST": {
    "mysql": "mot-clé"
   },
   "SOURCE_LOG_FILE": {
    "mysql": "mot-clé"
   },
   "SOURCE_LOG_POS": {
    "mysql": "mot-clé"
   },
   "SOURCE_PASSWORD": {
    "mysql": "mot-clé"
   },
   "SOURCE_PORT": {
    "mysql": "mot-clé"
   },
   "SOURCE_PUBLIC_KEY_PATH": {
    "mysql": "mot-clé"
   },
   "SOURCE_RETRY_COUNT": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CA": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CAPATH": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CERT": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CIPHER": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CRL": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_CRLPATH": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_KEY": {
    "mysql": "mot-clé"
   },
   "SOURCE_SSL_VERIFY_SERVER_CERT": {
    "mysql": "mot-clé"
   },
   "SOURCE_TLS_CIPHERSUITES": {
    "mysql": "mot-clé"
   },
   "SOURCE_TLS_VERSION": {
    "mysql": "mot-clé"
   },
   "SOURCE_USER": {
    "mysql": "mot-clé"
   },
   "SOURCE_ZSTD_COMPRESSION_LEVEL": {
    "mysql": "mot-clé"
   },
   "SPACE": {
    "sqlserver": "futur"
   },
   "SPATIAL": {
    "mysql": "réservé"
   },
   "SPECIFIC": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SPECIFICTYPE": {
    "sqlserver": "futur"
   },
   "SQL": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SQLEXCEPTION": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SQLSTATE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SQLWARNING": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SQL_AFTER_GTIDS": {
    "mysql": "mot-clé"
   },
   "SQL_AFTER_MTS_GAPS": {
    "mysql": "mot-clé"
   },
   "SQL_BEFORE_GTIDS": {
    "mysql": "mot-clé"
   },
   "SQL_BIG_RESULT": {
    "mysql": "réservé"
   },
   "SQL_BUFFER_RESULT": {
    "mysql": "mot-clé"
   },
   "SQL_CALC_FOUND_ROWS": {
    "mysql": "réservé"
   },
   "SQL_NO_CACHE": {
    "mysql": "mot-clé"
   },
   "SQL_SMALL_RESULT": {
    "mysql": "réservé"
   },
   "SQL_THREAD": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_DAY": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_HOUR": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_MINUTE": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_MONTH": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_QUARTER": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_SECOND": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_WEEK": {
    "mysql": "mot-clé"
   },
   "SQL_TSI_YEAR": {
    "mysql": "mot-clé"
   },
   "SRID": {
    "mysql": "mot-clé"
   },
   "SSL": {
    "mysql": "réservé"
   },
   "STACKED": {
    "mysql": "mot-clé"
   },
   "START": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "mot-clé"
   },
   "STARTING": {
    "mysql": "réservé"
   },
   "STARTS": {
    "mysql": "mot-clé"
   },
   "STATE": {
    "sqlserver": "futur"
   },
   "STATEMENT": {
    "sqlserver": "futur"
   },
   "STATIC": {
    "sqlserver": "futur"
   },
   "STATISTICS": {
    "sqlserver": "réservé"
   },
   "STATS_AUTO_RECALC": {
    "mysql": "mot-clé"
   },
   "STATS_PERSISTENT": {
    "mysql": "mot-clé"
   },
   "STATS_SAMPLE_PAGES": {
    "mysql": "mot-clé"
   },
   "STATUS": {
    "mysql": "mot-clé"
   },
   "STDDEV_POP": {
    "sqlserver": "futur"
   },
   "STDDEV_SAMP": {
    "sqlserver": "futur"
   },
   "STOP": {
    "mysql": "mot-clé"
   },
   "STORAGE": {
    "mysql": "mot-clé"
   },
   "STORED": {
    "mysql": "réservé"
   },
   "STRAIGHT_JOIN": {
    "mysql": "réservé"
   },
   "STREAM": {
    "mysql": "mot-clé"
   },
   "STRING": {
    "mysql": "mot-clé"
   },
   "STRUCTURE": {
    "sqlserver": "futur"
   },
   "SUBCLASS_ORIGIN": {
    "mysql": "mot-clé"
   },
   "SUBJECT": {
    "mysql": "mot-clé"
   },
   "SUBMULTISET": {
    "sqlserver": "futur"
   },
   "SUBPARTITION": {
    "mysql": "mot-clé"
   },
   "SUBPARTITIONS": {
    "mysql": "mot-clé"
   },
   "SUBSTRING_REGEX": {
    "sqlserver": "futur"
   },
   "SUPER": {
    "mysql": "mot-clé"
   },
   "SUSPEND": {
    "mysql": "mot-clé"
   },
   "SWAPS": {
    "mysql": "mot-clé"
   },
   "SWITCHES": {
    "mysql": "mot-clé"
   },
   "SYMMETRIC": {
    "sqlserver": "futur"
   },
   "SYSTEM": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "SYSTEM_USER": {
    "sqlserver": "réservé"
   },
   "TABLE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "TABLES": {
    "mysql": "mot-clé"
   },
   "TABLESAMPLE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "TABLESPACE": {
    "mysql": "mot-clé"
   },
   "TABLE_CHECKSUM": {
    "mysql": "mot-clé"
   },
   "TABLE_NAME": {
    "mysql": "mot-clé"
   },
   "TEMPORARY": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "TEMPTABLE": {
    "mysql": "mot-clé"
   },
   "TERMINATE": {
    "sqlserver": "futur"
   },
   "TERMINATED": {
    "mysql": "réservé"
   },
   "TEXT": {
    "mysql": "mot-clé"
   },
   "TEXTSIZE": {
    "sqlserver": "réservé"
   },
   "THAN": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "THEN": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "THREAD_PRIORITY": {
    "mysql": "mot-clé"
   },
   "TIES": {
    "mysql": "mot-clé"
   },
   "TIME": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "TIMESTAMP": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "TIMESTAMPADD": {
    "mysql": "mot-clé"
   },
   "TIMESTAMPDIFF": {
    "mysql": "mot-clé"
   },
   "TIMEZONE_HOUR": {
    "sqlserver": "futur"
   },
   "TIMEZONE_MINUTE": {
    "sqlserver": "futur"
   },
   "TINYBLOB": {
    "mysql": "réservé"
   },
   "TINYINT": {
    "mysql": "réservé"
   },
   "TINYTEXT": {
    "mysql": "réservé"
   },
   "TLS": {
    "mysql": "mot-clé"
   },
   "TO": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "TOP": {
    "sqlserver": "réservé"
   },
   "TRAILING": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "TRAN": {
    "sqlserver": "réservé"
   },
   "TRANSACTION": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "TRANSLATE_REGEX": {
    "sqlserver": "futur"
   },
   "TRANSLATION": {
    "sqlserver": "futur"
   },
   "TREAT": {
    "sqlserver": "futur"
   },
   "TRIGGER": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "TRIGGERS": {
    "mysql": "mot-clé"
   },
   "TRUE": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul.",
    "mysql": "réservé"
   },
   "TRUNCATE": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "TRY_CAST": {
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul."
   },
   "TRY_CONVERT": {
    "sqlserver": "réservé"
   },
   "TSEQUAL": {
    "sqlserver": "réservé"
   },
   "TYPE": {
    "mysql": "mot-clé"
   },
   "TYPES": {
    "mysql": "mot-clé"
   },
   "UESCAPE": {
    "sqlserver": "futur"
   },
   "UNBOUNDED": {
    "mysql": "mot-clé"
   },
   "UNCOMMITTED": {
    "mysql": "mot-clé"
   },
   "UNDEFINED": {
    "mysql": "mot-clé"
   },
   "UNDER": {
    "sqlserver": "futur"
   },
   "UNDO": {
    "mysql": "réservé"
   },
   "UNDOFILE": {
    "mysql": "mot-clé"
   },
   "UNDO_BUFFER_SIZE": {
    "mysql": "mot-clé"
   },
   "UNICODE": {
    "mysql": "mot-clé"
   },
   "UNINSTALL": {
    "mysql": "mot-clé"
   },
   "UNION": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "UNIQUE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "UNKNOWN": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "UNLOCK": {
    "mysql": "réservé"
   },
   "UNNEST": {
    "sqlserver": "futur"
   },
   "UNPIVOT": {
    "sqlserver": "réservé"
   },
   "UNREGISTER": {
    "mysql": "mot-clé"
   },
   "UNSIGNED": {
    "mysql": "réservé"
   },
   "UNTIL": {
    "mysql": "mot-clé"
   },
   "UPDATE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "UPDATETEXT": {
    "sqlserver": "réservé"
   },
   "UPGRADE": {
    "mysql": "mot-clé"
   },
   "URL": {
    "mysql": "mot-clé"
   },
   "USAGE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "USE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "USER": {
    "sqlserver": "réservé",
    "mysql": "mot-clé"
   },
   "USER_RESOURCES": {
    "mysql": "mot-clé"
   },
   "USE_FRM": {
    "mysql": "mot-clé"
   },
   "USING": {
    "sqlserver": "futur",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom de table ou alias dans le FROM.",
    "mysql": "réservé"
   },
   "UTC_DATE": {
    "mysql": "réservé"
   },
   "UTC_TIME": {
    "mysql": "réservé"
   },
   "UTC_TIMESTAMP": {
    "mysql": "réservé"
   },
   "VALIDATION": {
    "mysql": "mot-clé"
   },
   "VALUE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "VALUES": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "VARBINARY": {
    "mysql": "réservé"
   },
   "VARCHAR": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "VARCHARACTER": {
    "mysql": "réservé"
   },
   "VARIABLE": {
    "sqlserver": "futur"
   },
   "VARIABLES": {
    "mysql": "mot-clé"
   },
   "VARYING": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "VAR_POP": {
    "sqlserver": "futur"
   },
   "VAR_SAMP": {
    "sqlserver": "futur"
   },
   "VCPU": {
    "mysql": "mot-clé"
   },
   "VIEW": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme nom dans une commande SHOW (SHOW … IN nom).",
    "mysql": "mot-clé"
   },
   "VIRTUAL": {
    "mysql": "réservé"
   },
   "VISIBLE": {
    "mysql": "mot-clé"
   },
   "WAIT": {
    "mysql": "mot-clé"
   },
   "WAITFOR": {
    "sqlserver": "réservé"
   },
   "WARNINGS": {
    "mysql": "mot-clé"
   },
   "WEEK": {
    "mysql": "mot-clé"
   },
   "WEIGHT_STRING": {
    "mysql": "mot-clé"
   },
   "WHEN": {
    "sqlserver": "réservé",
    "snowflake": "limité",
    "noteSnowflake": "Interdit comme colonne dans un calcul.",
    "mysql": "réservé"
   },
   "WHENEVER": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI."
   },
   "WHERE": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "WHILE": {
    "sqlserver": "réservé",
    "mysql": "réservé"
   },
   "WIDTH_BUCKET": {
    "sqlserver": "futur"
   },
   "WINDOW": {
    "sqlserver": "futur",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "WITH": {
    "sqlserver": "réservé",
    "snowflake": "réservé",
    "noteSnowflake": "Réservé par la norme ANSI.",
    "mysql": "réservé"
   },
   "WITHIN": {
    "sqlserver": "futur"
   },
   "WITHOUT": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "WORK": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "WRAPPER": {
    "mysql": "mot-clé"
   },
   "WRITE": {
    "sqlserver": "futur",
    "mysql": "réservé"
   },
   "WRITETEXT": {
    "sqlserver": "réservé"
   },
   "X509": {
    "mysql": "mot-clé"
   },
   "XA": {
    "mysql": "mot-clé"
   },
   "XID": {
    "mysql": "mot-clé"
   },
   "XML": {
    "mysql": "mot-clé"
   },
   "XMLAGG": {
    "sqlserver": "futur"
   },
   "XMLATTRIBUTES": {
    "sqlserver": "futur"
   },
   "XMLBINARY": {
    "sqlserver": "futur"
   },
   "XMLCAST": {
    "sqlserver": "futur"
   },
   "XMLCOMMENT": {
    "sqlserver": "futur"
   },
   "XMLCONCAT": {
    "sqlserver": "futur"
   },
   "XMLDOCUMENT": {
    "sqlserver": "futur"
   },
   "XMLELEMENT": {
    "sqlserver": "futur"
   },
   "XMLEXISTS": {
    "sqlserver": "futur"
   },
   "XMLFOREST": {
    "sqlserver": "futur"
   },
   "XMLITERATE": {
    "sqlserver": "futur"
   },
   "XMLNAMESPACES": {
    "sqlserver": "futur"
   },
   "XMLPARSE": {
    "sqlserver": "futur"
   },
   "XMLPI": {
    "sqlserver": "futur"
   },
   "XMLQUERY": {
    "sqlserver": "futur"
   },
   "XMLSERIALIZE": {
    "sqlserver": "futur"
   },
   "XMLTABLE": {
    "sqlserver": "futur"
   },
   "XMLTEXT": {
    "sqlserver": "futur"
   },
   "XMLVALIDATE": {
    "sqlserver": "futur"
   },
   "XOR": {
    "mysql": "réservé"
   },
   "YEAR": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   },
   "YEAR_MONTH": {
    "mysql": "réservé"
   },
   "ZEROFILL": {
    "mysql": "réservé"
   },
   "ZONE": {
    "sqlserver": "futur",
    "mysql": "mot-clé"
   }
  }
};
