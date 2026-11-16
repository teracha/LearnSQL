# Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md) : construit data/reserves/liste.js à partir des
# 3 pages officielles, téléchargées avant dans un dossier :
#   curl -sSL -o <dossier>/sqlserver.html https://learn.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql
#   curl -sS  -o <dossier>/snowflake.md   https://docs.snowflake.com/en/sql-reference/reserved-keywords.md
#   curl -sSL -o <dossier>/mysql.html     https://dev.mysql.com/doc/refman/8.4/en/keywords.html
# Usage : python3 -I outils/mots-reserves/extraire.py <dossier> <date AAAA-MM-JJ> > data/reserves/liste.js
# Ne pas modifier liste.js à la main : relancer ce script quand une page change.
import sys, re, html, json

dossier, date = sys.argv[1], sys.argv[2]
def sans_balises(t):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', t))).strip()

# SQL Server : des cases <div class="column"><p>MOT</p>, sous 3 titres : réservés, ODBC, futurs.
ss = open(dossier + '/sqlserver.html', encoding='utf-8').read()
def bloc(debut, fin):
    a = ss.find(debut); b = ss.find(fin, a) if fin else len(ss)
    if a < 0 or b < 0: sys.exit('SQL Server : repère introuvable : ' + debut)
    # « WITHIN GROUP » (deux mots) n'est pas un nom possible ; WITHIN (futur) et GROUP (réservé) sont déjà listés.
    return set(re.findall(r'<div class="column">\s*<p>([A-Z_]+)</p>', ss[a:b]))
ss_res = bloc('The following table lists SQL Server and Azure Synapse Analytics reserved keywords', 'ODBC Reserved Keywords')
ss_fut = bloc('Future Keywords', 'Related content')

# Snowflake : un tableau MOT | commentaire ; ASC et DESC sont cités dans le texte, pas dans le tableau.
sf = open(dossier + '/snowflake.md', encoding='utf-8').read()
cases = [sans_balises(c) for c in re.findall(r'<td>(.*?)</td>', sf, re.S)]
SF_COM = {
    'Reserved by ANSI.': ('réservé', 'Réservé par la norme ANSI.'),
    'Reserved by Snowflake.': ('réservé', 'Réservé par Snowflake.'),
    'Reserved by Snowflake and others.': ('réservé', 'Réservé par Snowflake et d\'autres moteurs.'),
    'Cannot be used as column name (reserved by ANSI).': ('limité', 'Interdit comme nom de colonne (norme ANSI).'),
    'Cannot be used as table name or alias in a FROM clause.': ('limité', 'Interdit comme nom de table ou alias dans le FROM.'),
    "Cannot be used as an identifier in a SHOW command (e.g. 'SHOW ... IN <identifier>').": ('limité', 'Interdit comme nom dans une commande SHOW (SHOW … IN nom).'),
    'Cannot be used as column reference in a scalar expression.': ('limité', 'Interdit comme colonne dans un calcul.'),
    'Cannot be used as a column name in CREATE TABLE DDL.': ('limité', 'Interdit comme nom de colonne dans un CREATE TABLE.'),
}
sf_mots = {}
for i in range(0, len(cases) - 1, 2):
    mot, com = cases[i], cases[i + 1]
    if not re.fullmatch(r'[A-Z_]+', mot): continue
    if com not in SF_COM: sys.exit('Snowflake : commentaire inconnu, à traduire : ' + com)
    sf_mots[mot] = SF_COM[com]
intro = sans_balises(sf[:sf.find('<div')])
for mot in ('ASC', 'DESC'):
    if mot in intro and mot not in sf_mots:
        sf_mots[mot] = ('réservé', 'Réservé (cité dans le texte de la page, pas dans son tableau).')

# MySQL 8.4 : une liste « MOT (R) » ; (R) = réservé, sinon mot-clé permis comme nom.
my = open(dossier + '/mysql.html', encoding='utf-8').read()
my_res, my_cle = set(), set()
# Seulement la liste « MySQL 8.4 Keywords and Reserved Words » (pas le sommaire, ni les mots ajoutés ou retirés en 8.4).
a = my.find('MySQL 8.4 Keywords and Reserved Words</h3>'); b = my.find('MySQL 8.4 New Keywords and Reserved Words</h3>', a)
if a < 0 or b < 0: sys.exit('MySQL : repère introuvable')
for li in re.findall(r'<li class="listitem"><p>(.*?)</p>', my[a:b], re.S):
    m = re.match(r'([A-Z_][A-Z0-9_]*)\s*(\(R\))?(;|$)', sans_balises(li))
    if m: (my_res if m.group(2) else my_cle).add(m.group(1))

if len(ss_res) < 150 or len(sf_mots) < 80 or len(my_res) < 200: sys.exit('Listes trop courtes : la page a changé ?')
mots = {}
for w in sorted(ss_res | ss_fut | set(sf_mots) | my_res | my_cle):
    e = {}
    if w in ss_res: e['sqlserver'] = 'réservé'
    elif w in ss_fut: e['sqlserver'] = 'futur'
    if w in sf_mots: e['snowflake'] = sf_mots[w][0]; e['noteSnowflake'] = sf_mots[w][1]
    if w in my_res: e['mysql'] = 'réservé'
    elif w in my_cle: e['mysql'] = 'mot-clé'
    mots[w] = e
print('// Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md). FICHIER GÉNÉRÉ par')
print('// outils/mots-reserves/extraire.py à partir des pages officielles : ne pas le modifier à la main.')
print('// Statuts : SQL Server « réservé » ou « futur » (peut le devenir) ; Snowflake « réservé » ou « limité » (interdit')
print('// dans certains emplois, voir noteSnowflake) ; MySQL 8.4 « réservé » ou « mot-clé » (permis comme nom). Absent = libre.')
print('LEARNSQL.motsReserves = ' + json.dumps({
    'sources': {
        'sqlserver': 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql',
        'snowflake': 'https://docs.snowflake.com/en/sql-reference/reserved-keywords',
        'mysql': 'https://dev.mysql.com/doc/refman/8.4/en/keywords.html',
        'date': date
    },
    'mots': mots
}, ensure_ascii=False, indent=1).replace('\n ', '\n  ') + ';')
sys.stderr.write('SQL Server %d réservés, %d futurs · Snowflake %d · MySQL %d réservés, %d mots-clés · %d mots en tout\n'
                 % (len(ss_res), len(ss_fut), len(sf_mots), len(my_res), len(my_cle), len(mots)))
