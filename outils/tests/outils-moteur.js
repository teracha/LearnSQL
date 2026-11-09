// Moteur des outils (js/outils.js, docs/outils.md), sans navigateur : le lecteur d'expressions (calculs, erreurs, types,
// formules Excel), les valeurs (dates, nombres), les calculs d'un document (niveaux, alertes, totaux), le contrôle d'un
// document ou d'un fichier, le texte et le HTML, l'écrivain zip (CRC32) et xlsx.
// Usage : node outils/tests/outils-moteur.js
// En plus, quand c'est possible : « unzip -t » contrôle les zip ; python3 + openpyxl ouvre chaque classeur et compare
// cellule par cellule (en-têtes, valeurs, formules, valeurs calculées). Avec OUTILS_LIBREOFFICE=1, LibreOffice recalcule
// chaque formule (fichiers sans valeurs en cache) et doit trouver les mêmes résultats que le site.
global.window = global;
const fs = require('fs'), path = require('path'), os = require('os'), zlib = require('zlib'), cp = require('child_process');
const lireZip = require('./lire-zip.js');
const racine = path.join(__dirname, '..', '..');
require(path.join(racine, 'data/modules.js'));
fs.readdirSync(path.join(racine, 'data/outils')).filter(f => f.endsWith('.js')).forEach(f => require(path.join(racine, 'data/outils', f)));
require(path.join(racine, 'js/outils.js'));
const OM = LEARNSQL.outilsMoteur, OUTILS = LEARNSQL.outils;
const outil = id => OUTILS.filter(o => o.id === id)[0];
let echecs = 0, total = 0;
function ok(cond, msg) { total++; if (!cond) { echecs++; console.log('ÉCHEC', msg); } }
function egal(a, b, msg) { ok(JSON.stringify(a) === JSON.stringify(b), msg + ' : ' + JSON.stringify(a) + ' au lieu de ' + JSON.stringify(b)); }
function erreurDe(f) { try { f(); return ''; } catch (e) { return e.message || 'erreur'; } }
const NBSP = String.fromCharCode(0xA0);

// ---------- 1. Le lecteur d'expressions : calculs (null = case vide) ----------
const ctx = vals => ({ valeur: n => (n in vals ? vals[n] : null), aujourdhui: 46461, nb: v => ({ A: 1, R: 2 }[v] || 0) });
[
  ['proba * impact', { proba: 3, impact: 2 }, 6],
  ['proba × impact', { proba: 3, impact: 3 }, 9],
  ['10 ÷ 4', {}, 2.5],
  ['10 / 4', {}, 2.5],
  ['(1 + 2) * 3', {}, 9],
  ['1 + 2 * 3', {}, 7],
  ['10 - 4 - 3', {}, 3],
  ['12 / 2 / 3', {}, 2],
  ['−2 + 5', {}, 3],
  ['-(2 + 3) * 2', {}, -10],
  ['0.1 + 0.2', {}, 0.3],
  ['a / b', { a: 1, b: 0 }, null],
  ['a + b', { a: 1, b: null }, null],
  ['a + b', { a: 1, b: '   ' }, null],
  ['fin - debut', { fin: 46470, debut: 46461 }, 9],
  ['aujourdhui - debut', { debut: 46451 }, 10],
  ["aujourd'hui + 1", {}, 46462],
  ['note >= 6', { note: 6 }, true],
  ['note >= 6', { note: null }, false],
  ['note < 6', { note: null }, false],
  ['note <> 6', { note: null }, false],
  ['note ≥ 6 et note ≤ 9', { note: 9 }, true],
  ['note ≠ 9', { note: 9 }, false],
  ['note != 9', { note: 8 }, true],
  ['statut = "Ouvert"', { statut: 'ouvert' }, true],
  ['statut = "Ouvert"', { statut: null }, false],
  ['statut <> "Fermé"', { statut: 'Ouvert' }, true],
  ['action vide', { action: '  ' }, true],
  ['action vide', { action: 'Former Julie' }, false],
  ['action non vide', { action: 'x' }, true],
  ['note >= 6 et action vide', { note: 9, action: null }, true],
  ['note >= 6 ET action vide', { note: 9, action: 'x' }, false],
  ['a vide ou b vide', { a: 'x', b: null }, true],
  ['non (statut = "Fait")', { statut: null }, true],
  ['non (statut = "Fait")', { statut: 'Fait' }, false],
  ['non a vide et b = 1', { a: 'x', b: 1 }, true],
  ['liste vide', { liste: ['', ' '] }, true],
  ['liste non vide', { liste: ['', 'une décision'] }, true],
  ['nb("A") > 1', {}, false],
  ['nb("R") = 2', {}, true],
  ['nb("C") = 0', {}, true]
].forEach(([f, v, attendu]) => egal(OM.evaluer(OM.lire(f), ctx(v)), attendu, 'calcul « ' + f + ' »'));

// ---------- 2. Les formules fausses : une erreur claire, jamais un plantage ----------
['', '   ', 'proba *', '(proba * impact', 'proba * impact)', 'proba § 2', '"Ouvert', 'statut = ', 'a b', 'note >= 6 et',
  'somme(a)', 'nb()', 'nb(a)', 'nb("A", "R")', '1 < 2 < 3', '= 3', 'non', 'a vide vide', 'eval("1")', 'a ; b', '2 ** 3']
  .forEach(f => { const m = erreurDe(() => OM.lire(f)); ok(/formule/.test(m), 'erreur attendue pour « ' + f + ' » : ' + m); });
ok(/position 7/.test(erreurDe(() => OM.lire('proba § 2'))), 'la position de l\'erreur est donnée');

// ---------- 3. Les types (vérificateur) ----------
const env = { colonnes: { proba: { type: 'nombre', valeurs: [1, 2, 3] }, note: { type: 'nombre' }, risque: { type: 'texte' },
  statut: { type: 'texte', valeurs: ['Ouvert', 'Fermé'] }, decisions: { type: 'liste' } } };
[['proba * 2', 'nombre'], ['note >= 6 et risque vide', 'condition'], ['statut = "Fermé"', 'condition'], ['decisions vide', 'condition'],
  ['aujourdhui - 3', 'nombre'], ['non (statut = "Ouvert")', 'condition']]
  .forEach(([f, t]) => egal(OM.typer(OM.lire(f), env, f), t, 'type de « ' + f + ' »'));
[['inconnue * 2', /Colonne inconnue/], ['risque * 2', /calcul/], ['note = "6"', /nombre et un texte/], ['statut = "Ouvrt"', /n'est pas une valeur/],
  ['proba = 4', /n'est pas une valeur/], ['note et risque vide', /relie deux conditions/], ['(note * 2) vide', /vide/],
  ['nb("A") > 1', /matrice/], ['decisions = "x"', /vide ou non vide/], ['non note', /condition/], ['(note > 1) = (note < 3)', /conditions/],
  ['inconnue vide', /Colonne inconnue/]]
  .forEach(([f, re]) => { const m = erreurDe(() => OM.typer(OM.lire(f), env, f)); ok(re.test(m), 'type refusé pour « ' + f + ' » : ' + m); });
egal(OM.typer(OM.lire('nb("A") > 1'), { colonnes: {}, nb: ['R', 'A', 'C', 'I'] }), 'condition', 'nb() dans une matrice');
ok(/pas dans la liste/.test(erreurDe(() => OM.typer(OM.lire('nb("X") > 1'), { colonnes: {}, nb: ['R', 'A', 'C', 'I'] }))), 'nb("X") refusé');
egal(OM.citees(OM.lire('note >= 6 et (action vide ou note < proba)')), ['note', 'action', 'proba'], 'colonnes citées');

// ---------- 4. Les formules Excel ----------
const refs = { cellule: n => ({ proba: 'B2', impact: 'C2', note: 'D2', action: 'G2', proprietaire: 'H2', echeance: 'I2', statut: 'J2', fin: 'K2', debut: 'L2' })[n] };
[
  ['proba * impact', 'B2*C2'],
  ['(proba + impact) * 2', '(B2+C2)*2'],
  ['proba - (impact - 1)', 'B2-(C2-1)'],
  ['proba / (impact * 2)', 'B2/(C2*2)'],
  ['-proba', '-B2'],
  ['proba * -impact', 'B2*(-C2)'],
  ['0.5 * proba', '0.5*B2'],
  ['note >= 6', 'IF(D2="",FALSE,D2>=6)'],
  ['note >= 6 et action vide', 'AND(IF(D2="",FALSE,D2>=6),G2="")'],
  ['action non vide et (proprietaire vide ou echeance vide)', 'AND(G2<>"",OR(H2="",I2=""))'],
  ['statut = "Ouvert"', 'J2="Ouvert"'],
  ['statut <> "Fermé"', 'IF(J2="",FALSE,J2<>"Fermé")'],
  ['non (statut = "Fait")', 'NOT(J2="Fait")'],
  ['echeance < aujourdhui', 'IF(I2="",FALSE,I2<TODAY())'],
  ['fin - debut > 7', 'IF(OR(K2="",L2=""),FALSE,K2-L2>7)']
].forEach(([f, x]) => egal(OM.excel(OM.lire(f), refs), x, 'Excel de « ' + f + ' »'));
egal(OM.excel(OM.lire('nb("A") > 1'), { cellule: () => 'A2', nb: v => 'COUNTIF(B2:K2,"' + v + '")' }), 'COUNTIF(B2:K2,"A")>1', 'Excel de nb()');
const plage = { cellule: n => ({ note: 'D2:D31', statut: 'J2:J31', action: 'G2:G31', proba: 'B2:B31' })[n] };
egal(OM.excelPlage(OM.lire('note >= 6 et statut = "Ouvert"'), plage), '(((D2:D31<>"")*(D2:D31>=6))*(J2:J31="Ouvert"))', 'Excel (plage) : et');
egal(OM.excelPlage(OM.lire('action vide ou non (statut = "Ouvert")'), plage), '(((G2:G31="")+(1-(J2:J31="Ouvert")))>0)', 'Excel (plage) : ou, non');
egal(OM.excelPlage(OM.lire('note * 2 > proba'), plage), '((D2:D31<>"")*(B2:B31<>"")*IFERROR(D2:D31*2>B2:B31,FALSE))', 'Excel (plage) : calcul protégé');

// ---------- 5. Les valeurs ----------
egal(OM.jour('2027-03-15'), 46461, 'jour Excel du 15/03/2027');
egal(OM.jour('2027-02-30'), null, 'une date qui n\'existe pas');
egal(OM.jour('15/03/2027'), null, 'une date au mauvais format');
egal(OM.jour(46461), null, 'un nombre n\'est pas une date');
egal(OM.isoDuJour(46461), '2027-03-15', 'retour du jour Excel');
egal(OM.dateFr('2027-03-15'), '15/03/2027', 'date en français');
egal([2.5, 12000, 2250, 999, -1600, 1 / 3, 0.05, 6].map(OM.fmtNombre), ['2,5', '12' + NBSP + '000', '2' + NBSP + '250', '999', '-1' + NBSP + '600', '0,33', '0,05', '6'], 'nombres en français');
egal(['12,5', ' 1 000 ', 'abc', '', '3', '-2.5'].map(OM.lireNombre), [12.5, 1000, null, null, 3, -2.5], 'lire un nombre');

// ---------- 6. CRC32, UTF-8, zip ----------
const crc = t => OM.crc32(OM.utf8(t));
egal([crc(''), crc('123456789'), crc('The quick brown fox jumps over the lazy dog')], [0, 0xCBF43926, 0x414FA339], 'CRC32 connus');
if (zlib.crc32) { const t = 'Échéance : 15/03/2027 → plan B'; egal(crc(t), zlib.crc32(Buffer.from(t)), 'CRC32 comme zlib'); }
egal(Array.from(OM.utf8('é€' + String.fromCodePoint(0x1F600))), [0xC3, 0xA9, 0xE2, 0x82, 0xAC, 0xF0, 0x9F, 0x98, 0x80], 'UTF-8');
const dossier = fs.mkdtempSync(path.join(os.tmpdir(), 'learnsql-outils-'));
const zipTest = Buffer.from(OM.zip([{ nom: 'a.txt', octets: OM.utf8('Bonjour') }, { nom: 'dossier/b.xml', octets: OM.utf8('<a>é</a>') }], new Date(2027, 2, 15, 10, 30, 0)));
const lu = lireZip(zipTest);
egal(Object.keys(lu), ['a.txt', 'dossier/b.xml'], 'noms du zip');
egal(lu['dossier/b.xml'].data.toString('utf8'), '<a>é</a>', 'contenu du zip');
ok(lu['a.txt'].methode === 0 && lu['a.txt'].crc === crc('Bonjour'), 'zip « stocké » avec CRC');
let unzip = false;
try { cp.execFileSync('unzip', ['-v'], { stdio: 'ignore' }); unzip = true; } catch (e) { unzip = false; }
function unzipOk(octets, nom) {
  if (!unzip) return;
  const f = path.join(dossier, nom);
  fs.writeFileSync(f, octets);
  let sortie = '';
  try { sortie = cp.execFileSync('unzip', ['-t', f], { encoding: 'utf8' }); } catch (e) { sortie = String(e.stdout || e.message); }
  ok(/No errors detected/.test(sortie), 'unzip -t ' + nom + ' : ' + sortie.slice(-200));
}
unzipOk(zipTest, 'test.zip');

// ---------- 7. Les calculs d'un document : niveaux, alertes, totaux (outil de test, avec dates) ----------
const TACHES = { id: 'test-taches', titre: 'Outil de test', type: 'tableau', ligne: { titre: 'Tâche' },
  colonnes: [
    { id: 'tache', titre: 'Tâche', type: 'texte' },
    { id: 'debut', titre: 'Début', type: 'date' },
    { id: 'fin', titre: 'Fin', type: 'date' },
    { id: 'jours', titre: 'Jours', type: 'calcul', formule: 'fin - debut',
      niveaux: [{ max: 5, libelle: 'Court', couleur: 'ok' }, { libelle: 'Long', couleur: 'ko' }] },
    { id: 'cout', titre: 'Coût', type: 'nombre', niveaux: [{ max: 1000, libelle: 'Petit', couleur: 'neutre' }, { libelle: 'Gros', couleur: 'attention' }] },
    { id: 'etat', titre: 'État', type: 'choix', valeurs: ['À faire', 'Fait'], defaut: 'À faire' }
  ],
  alertes: [{ si: 'fin < debut', message: 'Fin avant le début.' }, { si: 'etat = "À faire" et fin < aujourdhui', message: 'En retard.' }],
  totaux: [
    { libelle: 'Tâches', calcul: 'nombre' },
    { libelle: 'Coût total', calcul: 'somme', colonne: 'cout' },
    { libelle: 'Coût à faire', calcul: 'somme', colonne: 'cout', si: 'etat = "À faire"' },
    { libelle: 'Jours en moyenne', calcul: 'moyenne', colonne: 'jours' },
    { libelle: 'Plus court', calcul: 'min', colonne: 'jours' },
    { libelle: 'Plus long à faire', calcul: 'max', colonne: 'jours', si: 'etat = "À faire"' },
    { libelle: 'Moyenne à faire', calcul: 'moyenne', colonne: 'cout', si: 'etat = "À faire"' },
    { libelle: 'Plus petit coût fait', calcul: 'min', colonne: 'cout', si: 'non (etat = "À faire")' }
  ],
  exemple: { nom: 'Test', lignes: [] } };
const LIGNES = [
  { tache: 'Recette', debut: '2027-03-16', fin: '2027-04-30', cout: 1500.5, etat: 'À faire' },
  { tache: 'Pilote', debut: '2027-05-03', fin: '2027-05-07', cout: 750, etat: 'Fait' },
  { tache: 'Erreur', debut: '2027-06-14', fin: '2027-06-10', cout: '', etat: 'À faire' },
  { tache: '', debut: '', fin: '', cout: '', etat: 'À faire' }
];
OM.fixerAujourdhui(OM.jour('2027-05-01'));
let st = OM.suivi(TACHES, { lignes: LIGNES });
egal(st.totaux.map(t => t.valeur), [3, 2250.5, 1500.5, 15, -4, 45, 1500.5, 750], 'totaux (nombre, somme, moyenne, min, max, avec ou sans « si »)');
egal(st.alertes.map(a => a.ligne + ' ' + a.message), ['0 En retard.', '2 Fin avant le début.'], 'alertes par ligne (une ligne vide n\'en a pas)');
egal(st.alertes[0].texte, 'Tâche 1 (« Recette ») : En retard.', 'phrase d\'une alerte');
egal(LIGNES.slice(0, 3).map(l => { const c = OM.calculerLigne(TACHES.colonnes, l); return [c.valeurs.jours, c.niveaux.jours.libelle, (c.niveaux.cout || {}).libelle]; }),
  [[45, 'Long', 'Gros'], [4, 'Court', 'Petit'], [-4, 'Court', undefined]], 'calcul et niveaux');
egal(OM.ligneRemplie(TACHES.colonnes, LIGNES[3]), false, 'une ligne avec sa seule valeur par défaut est vide');
egal(OM.ligneVide(TACHES.colonnes), { tache: '', debut: '', fin: '', cout: '', etat: 'À faire' }, 'une ligne neuve prend la valeur par défaut');
egal(OM.resumeDocument(TACHES, { lignes: LIGNES }), '3 tâches', 'résumé d\'un document');
OM.fixerAujourdhui();

// Un document de test : rubriques, liste, tableau, alertes du document
const REUNION = { id: 'test-reunion', titre: 'Réunion de test', type: 'document',
  rubriques: [
    { id: 'jour', titre: 'Jour', type: 'date' }, { id: 'budget', titre: 'Budget', type: 'nombre' },
    { id: 'meteo', titre: 'Météo', type: 'choix', valeurs: ['Vert', 'Orange', 'Rouge'] }, { id: 'resume', titre: 'Résumé', type: 'texte-long' },
    { id: 'points', titre: 'Points ouverts', type: 'liste', ligne: { titre: 'Point' } },
    { id: 'taches', titre: 'Tâches', type: 'tableau', ligne: { titre: 'Tâche' },
      colonnes: [{ id: 'quoi', titre: 'Quoi', type: 'texte' }, { id: 'jours', titre: 'Jours', type: 'nombre' }],
      alertes: [{ si: 'quoi non vide et jours vide', message: 'Combien de jours ?' }],
      totaux: [{ libelle: 'Jours', calcul: 'somme', colonne: 'jours' }] }
  ],
  alertes: [{ si: 'meteo = "Rouge" et points vide', message: 'Rouge sans point ouvert.' }, { si: 'budget > 90000', message: 'Hors tolérance.' },
    { si: 'taches vide', message: 'Aucune tâche.' }],
  exemple: { nom: 'Test', rubriques: {} } };
st = OM.suivi(REUNION, OM.contenuVide(REUNION));
egal(st.alertes.map(a => a.message), ['Aucune tâche.'], 'document vide : alertes');
const reunion = { rubriques: { jour: '2027-02-09', budget: 95000, meteo: 'Rouge', resume: 'Ligne 1\nLigne 2', points: [''],
  taches: [{ quoi: 'Signer', jours: 2 }, { quoi: 'Planifier', jours: '' }] } };
st = OM.suivi(REUNION, reunion);
egal(st.alertes.map(a => (a.rubrique === null ? 'doc' : a.rubrique + ' ' + a.ligne) + ' ' + a.message),
  ['doc Rouge sans point ouvert.', 'doc Hors tolérance.', 'taches 1 Combien de jours ?'], 'document : alertes du document et des rubriques');
egal(st.totaux.map(t => t.rubrique + ' ' + t.texte), ['taches 2'], 'document : totaux d\'une rubrique');
egal(OM.resumeDocument(REUNION, reunion), '5 rubriques remplies sur 6', 'résumé d\'un document à rubriques (une liste vide ne compte pas)');

// La matrice : nb() par ligne, une ligne vide n'a pas d'alerte
const raci = outil('gp-raci');
st = OM.suivi(raci, { colonnes: ['DAF', 'Toi', 'Julie'], lignes: [{ nom: 'A', cases: ['A', 'R', 'A'] }, { nom: 'B', cases: ['', 'R', ''] },
  { nom: 'C', cases: ['a', 'I', ''] }, { nom: '', cases: ['', '', ''] }] });
egal(st.alertes.map(a => a.ligne + ' ' + a.message.split(' :')[0]), ['0 Deux A, c\'est aucun', '1 Personne n\'approuve ce livrable'],
  'matrice : alertes par ligne (un « a » minuscule compte comme un A)');

// Les exemples des 12 outils, lus à leur date (exemple.date) : les totaux et les alertes annoncés par l'expert
const suiviEx = id => { const d = outil(id); return OM.suivi(d, OM.contenuExemple(d), d.exemple.date ? OM.jour(d.exemple.date) : undefined); };
const ATTENDU = {
  'gp-cadrage': { totaux: [3], alertes: [] },
  'gp-risques': { totaux: [7, 4, 0], alertes: [] },
  'gp-raci': { totaux: [], alertes: [] },
  'gp-compte-rendu': { totaux: [4, 4], alertes: [] },
  'gp-rapport': { totaux: [2, 5], alertes: [] },
  'gp-options': { totaux: [3], alertes: [] },
  'gp-decisions': { totaux: [7, 0], alertes: [] },
  'gp-changements': { totaux: [7, 5250, 0], alertes: [] },
  'gp-budget': { totaux: [85250, 81100, 30350, 57150, 87500, 2250], alertes: [] },
  'gp-business-case': { totaux: [2, 80000, 100, 3000], alertes: ['options 1 Gain en temps'] },
  'gp-recette': { totaux: [8, 7, 2, 2, 2, 1, 4], alertes: [0, 3, 4, 5].map(k => 'cas ' + k + ' Pas de PV tant que cette anomalie est ouverte') },
  'gp-bascule': { totaux: [6, 6], alertes: [] }
};
egal(OUTILS.map(o => o.id).sort(), Object.keys(ATTENDU).sort(), 'les 12 outils');
Object.keys(ATTENDU).forEach(id => {
  const s = suiviEx(id);
  egal(s.totaux.map(t => t.valeur), ATTENDU[id].totaux, id + ' : totaux de l\'exemple');
  egal(s.alertes.map(a => (a.rubrique ? a.rubrique + ' ' : '') + a.ligne + ' ' + a.message.split(' :')[0]), ATTENDU[id].alertes, id + ' : alertes de l\'exemple');
});
egal(suiviEx('gp-rapport').totaux[0].niveau.libelle, 'Orange', 'rapport : la météo globale a son mot (niveau d\'un total)');

// ---------- 7 bis. Les ajouts du moteur : abs(), une rubrique lue par un tableau, un total lu par le document, le niveau
// d'un total, les lignes du modèle, la couleur d'un choix, la date de l'exemple ----------
egal(OM.evaluer(OM.lire('abs(a - b)'), ctx({ a: 3, b: 10 })), 7, 'abs()');
egal(OM.evaluer(OM.lire('abs(a)'), ctx({ a: null })), null, 'abs() d\'une case vide');
egal(OM.excel(OM.lire('abs(ecart) > tolerance'), { cellule: n => ({ ecart: 'E2', tolerance: "'Rapport'!$B$7" })[n] }),
  "IF(OR(E2=\"\",'Rapport'!$B$7=\"\"),FALSE,ABS(E2)>'Rapport'!$B$7)", 'Excel de abs() et d\'une rubrique');
egal(OM.typer(OM.lire('abs(ecart) - 1'), { colonnes: { ecart: { type: 'nombre' } } }), 'nombre', 'type de abs()');
ok(/abs/.test(erreurDe(() => OM.typer(OM.lire('abs(nom)'), { colonnes: { nom: { type: 'texte' } } }))), 'abs() d\'un texte refusé');
// Une rubrique lue par un tableau (rapport : la tolérance des jalons, ± : l'avance compte comme le retard)
const rap = outil('gp-rapport'), cRap = OM.contenuExemple(rap), jal = rap.rubriques.filter(r => r.id === 'jalons')[0];
const reste = c => c.rubriques.jalons.map(l => OM.calculerLigne(jal.colonnes, l, OM.contexteDocument(rap, c)).valeurs.reste);
egal(reste(cRap), [14, 14, 7, 7, 14], 'rapport : reste de tolérance (14 jours)');
cRap.rubriques.tolerance = 5;
egal(reste(cRap), [5, 5, -2, -2, 5], 'rapport : la tolérance changée (5 jours)');
egal(OM.suivi(rap, cRap).alertes.map(a => a.rubrique + ' ' + a.ligne), ['jalons 2', 'jalons 3'], 'rapport : jalons hors tolérance');
cRap.rubriques.tolerance = 14;
cRap.rubriques.jalons[4].prevision = '2027-05-24';
egal(OM.suivi(rap, cRap).alertes.map(a => a.rubrique + ' ' + a.ligne), ['jalons 4'], 'rapport : 21 jours d\'avance sortent de la tolérance');
// Un total lu par le document (budget : l'atterrissage au-dessus du plafond)
const bud = outil('gp-budget'), cBud = OM.contenuExemple(bud);
egal(OM.suivi(bud, cBud).alertes.length, 0, 'budget : sous le plafond, pas d\'alerte');
cBud.rubriques.plafond = 85000;
egal(OM.suivi(bud, cBud).alertes.map(a => (a.rubrique === null ? 'document ' : '') + a.message.split(' :')[0]), ['document L\'atterrissage dépasse le plafond'],
  'budget : au-dessus du plafond, l\'alerte du document');
// Les lignes du modèle ; la couleur d'un choix ; la date de l'exemple
egal(OM.contenuVide(rap).rubriques.meteo.map(l => l.axe), ['Délai', 'Budget', 'Périmètre', 'Qualité et risques'], 'modèle : les 4 axes de la météo');
egal(OM.contenuVide(outil('gp-options')).rubriques.options.map(l => l.option), ['A. Ne rien changer'], 'modèle : « Ne rien changer »');
const colResultat = outil('gp-recette').rubriques.filter(r => r.id === 'cas')[0].colonnes.filter(c => c.id === 'resultat')[0];
egal(['OK', 'Anomalie', 'Pas joué'].map(v => OM.couleurChoix(colResultat, v)), ['ok', 'ko', ''], 'couleur d\'un choix');
egal(OM.suivi(outil('gp-risques'), OM.contenuExemple(outil('gp-risques')), OM.jour('2027-03-20')).alertes.map(a => a.ligne), [0, 1, 2, 3, 4, 6],
  'registre lu au 20/03/2027 : des dates passées');

// ---------- 7 ter. Les cases vides (novembre 2026) : vide = 0 dans une somme ; un produit vide a son alerte ; une ligne
// vide n'a pas de calcul ; la tolérance (niveau et alerte : la même condition) ; la note du rapport ; limites et messages
// d'un fichier ouvert ; les alertes du document dans Excel ; « Sans nom » ----------
const ctxS = (vals, souples) => Object.assign(ctx(vals), { souple: n => souples.indexOf(n) >= 0 });
[
  ['a + b', { a: 1, b: null }, ['a', 'b'], 1],
  ['a - b', { a: null, b: 5 }, ['a', 'b'], -5],
  ['a + b', { a: null, b: null }, ['a', 'b'], 0],
  ['a * b', { a: 2, b: null }, ['a', 'b'], null],
  ['a / b', { a: null, b: 2 }, ['a', 'b'], null],
  ['a + b * c', { a: 1, b: null, c: 2 }, ['a', 'b', 'c'], null],
  ['-a + 3', { a: null }, ['a'], 3],
  ['abs(a) + 1', { a: null }, ['a'], null],
  ['fin - debut', { fin: null, debut: 46461 }, [], null],
  ['calc - a', { calc: null, a: 2 }, ['a'], null],
  ['a + b > 0', { a: null, b: null }, ['a', 'b'], false],
  ['a + b >= 0', { a: null, b: null }, ['a', 'b'], true],
  ['a > 0', { a: null }, ['a'], false]
].forEach(([f, vals, souples, attendu]) => egal(OM.evaluer(OM.lire(f), ctxS(vals, souples)), attendu, 'case vide : ' + f + ' ' + JSON.stringify(vals)));
const so = n => ['consomme', 'reste', 'reference', 'tolerance', 'quantite', 'prix', 'engage'].indexOf(n) >= 0;
[['consomme + reste', []], ['atterrissage - reference', ['atterrissage']], ['quantite * prix', ['quantite', 'prix']],
  ['tolerance - abs(ecart)', ['ecart']], ['consomme >= engage * 0.8', ['consomme', 'engage']], ['consomme + reste > engage', ['engage']]]
  .forEach(([f, a]) => egal(OM.strictes(OM.lire(f), so, false), a, 'les cases qui rendent vide : ' + f));
egal(OM.excel(OM.lire('consomme + reste > engage'), { cellule: n => ({ consomme: 'D2', reste: 'E2', engage: 'C2' })[n], souple: so }),
  'IF(C2="",FALSE,D2+E2>C2)', 'Excel : la comparaison ne teste pas les termes de la somme (vides = 0, comme dans Excel)');
// Le budget du testeur : plafond 50 000, un consommé vide, une référence vide
const casBudget = () => {
  const c = OM.contenuVide(bud);
  c.rubriques.plafond = 50000;
  c.rubriques.postes = [
    { poste: 'Intégrateur', reference: 30000, engage: 30000, consomme: 18000, reste: 12000, cause: '' },
    { poste: 'Formation (pas commencée)', reference: 4000, engage: 4000, consomme: '', reste: 4000, cause: '' },
    { poste: 'Avenant archivage (hors référence)', reference: '', engage: 20000, consomme: 0, reste: 20000, cause: '' }];
  return c;
};
st = OM.suivi(bud, casBudget());
egal(st.totaux.map(t => t.valeur), [34000, 54000, 18000, 36000, 54000, 20000], 'budget du testeur : atterrissage 54 000, écart + 20 000');
egal(st.alertes.map(a => a.texte), ['L\'atterrissage dépasse le plafond : le DAF décide, prévenu le jour même.',
  'Poste 3 (« Avenant archivage (hors référence) ») : Écart sans cause : écris-la.'], 'budget du testeur : les 2 alertes, et seulement elles');
const postes = bud.rubriques.filter(r => r.id === 'postes')[0];
egal(casBudget().rubriques.postes.map(l => OM.calculerLigne(postes.colonnes, l, OM.contexteDocument(bud, casBudget())).valeurs),
  [{ atterrissage: 30000, ecart: 0 }, { atterrissage: 4000, ecart: 0 }, { atterrissage: 20000, ecart: 20000 }], 'budget du testeur : chaque ligne');
egal(OM.calculerLigne(postes.colonnes, OM.ligneVide(postes.colonnes), OM.contexteDocument(bud, casBudget())).valeurs,
  { atterrissage: null, ecart: null }, 'une ligne vide n\'a pas de calcul (pas de 0)');
// Le business case du testeur : un forfait sans quantité ; et une option sans surcoût, un gain sans volume ni coût horaire
const bc = outil('gp-business-case'), casBc = OM.contenuVide(bc);
casBc.rubriques.tco = [{ poste: 'Abonnement', quantite: 36, prix: 850, nature: '' }, { poste: 'Mise en service (forfait)', quantite: '', prix: 7400, nature: '' }];
casBc.rubriques.options = [{ option: 'A', surcout: 0, gain_mois: 0, gain_en: 'Argent' }, { option: 'B', surcout: '', gain_mois: 3000, gain_en: 'Argent' }];
casBc.rubriques.gains = [{ gain: 'G1', volume: 2000, minutes: 3, cout_horaire: 30, mesure: 'x' }, { gain: 'G2', volume: '', minutes: 2, cout_horaire: '', mesure: 'y' }];
st = OM.suivi(bc, casBc);
egal(st.totaux.filter(t => t.rubrique !== 'options').map(t => t.valeur), [30600, 100, 3000], 'business case du testeur : le forfait sans quantité n\'est pas compté (30 600)');
egal(st.alertes.filter(a => a.rubrique).map(a => a.texte), [
  'Option 2 (« B ») : « Surcoût (€) » est vide, donc pas de « Délai de retour (mois) » sur cette ligne.',
  'Poste 2 (« Mise en service (forfait) ») : « Quantité » est vide, donc pas de « Total (€) » sur cette ligne, ni dans les totaux.',
  'Gain 2 (« G2 ») : « Volume par mois » et « Coût horaire chargé (€) » sont vides, donc pas d\'« Heures par mois » ni de « Valeur par mois (€) » sur cette ligne, ni dans les totaux.'],
  'business case du testeur : chaque alerte dit quelles cases manquent (une division par zéro n\'en a pas)');
// Le registre : un seul message par ligne pour ses cases vides ; une ligne avec sa seule valeur par défaut n'a rien
const reg = outil('gp-risques');
st = OM.suivi(reg, { lignes: [{ risque: 'Un risque', proba: '', impact: '', reponse: 'Réduire', proprietaire: 'Le DAF', quand: '2099-01-01', statut: 'Ouvert' },
  { risque: 'Deux', proba: 2, impact: '', reponse: 'x', proprietaire: 'y', quand: '2099-05-01', statut: 'Ouvert' }, { statut: 'Ouvert' }] });
egal(st.alertes.map(a => a.texte), ['Risque 1 (« Un risque ») : « Probabilité » et « Impact » sont vides, donc pas de « Note » sur cette ligne, ni dans les totaux.',
  'Risque 2 (« Deux ») : « Impact » est vide, donc pas de « Note » sur cette ligne, ni dans les totaux.'], 'registre : un message par ligne pour ses cases vides');
// Les jalons : une date vide ; pas deux messages pour la même case
const casRap = OM.contenuExemple(rap);
casRap.rubriques.jalons = [{ jalon: 'Sans prévision', prevu: '2027-04-30', reel: '', prevision: '' },
  { jalon: 'Tenu sans prévision', prevu: '2027-04-30', reel: '2027-04-30', prevision: '' }, { jalon: 'Sans dates', prevu: '', reel: '', prevision: '' },
  { jalon: 'Hors tolérance', prevu: '2027-04-30', reel: '', prevision: '2027-05-15' }];
casRap.rubriques.tolerance = 14.5;
egal(OM.suivi(rap, casRap).alertes.filter(a => a.rubrique === 'jalons').map(a => a.ligne + ' ' + a.message), [
  '0 Donne une prévision : la date prévue aujourd\'hui.',
  '1 « Prévision » est vide, donc pas d\'« Écart, en jours » ni de « Reste de tolérance, en jours » sur cette ligne.',
  '2 Donne une prévision : la date prévue aujourd\'hui.',
  '2 « Prévu » est vide, donc pas d\'« Écart, en jours » ni de « Reste de tolérance, en jours » sur cette ligne.',
  '3 Jalon hors tolérance : le délai est rouge, et le DAF le sait le jour même.'], 'rapport : une date vide est dite, une seule fois');
// La tolérance avec une virgule : le niveau et l'alerte suivent la même condition
const toler = (tol, e) => {
  const c = OM.contenuExemple(rap);
  c.rubriques.tolerance = tol;
  c.rubriques.jalons = [{ jalon: 'J', prevu: '2027-04-30', reel: '', prevision: OM.isoDuJour(OM.jour('2027-04-30') + e) }];
  const calc = OM.calculerLigne(jal.colonnes, c.rubriques.jalons[0], OM.contexteDocument(rap, c));
  return [calc.niveaux.reste.libelle, OM.suivi(rap, c).alertes.some(a => a.rubrique === 'jalons' && /hors tolérance/.test(a.message))];
};
egal(toler(14.5, 15), ['Hors tolérance', true], 'tolérance 14,5 j, écart 15 j : hors tolérance, et l\'alerte');
egal(toler(14.5, -14), ['Dans la tolérance', false], 'tolérance 14,5 j, avance de 14 j : dans la tolérance, pas d\'alerte');
egal(toler(14, 14), ['Dans la tolérance', false], 'tolérance 14 j, écart 14 j : dans la tolérance (la borne comprise)');
let contraires = 0;
for (let tol = 0; tol <= 20; tol += 0.5) for (let e = -22; e <= 22; e++) { const [nv, hors] = toler(tol, e); if ((nv === 'Hors tolérance') !== hors) contraires++; }
egal(contraires, 0, 'tolérance : le niveau et l\'alerte ne se contredisent jamais (1 845 cas)');
// La note du rapport : seulement 1, 2, 3, 4, 6, 9 (probabilité × impact)
const noteRap = rap.rubriques.filter(r => r.id === 'risques')[0].colonnes.filter(c => c.id === 'note')[0];
egal([noteRap.type, noteRap.valeurs], ['choix', [1, 2, 3, 4, 6, 9]], 'rapport : la note se choisit parmi 1, 2, 3, 4, 6, 9');
const exNote = OM.examiner(rap, { rubriques: { risques: [{ risque: 'x', note: 12 }, { risque: 'y', note: 5 }, { risque: 'z', note: 6 }] } });
egal(exNote.contenu.rubriques.risques.map(l => l.note), ['', '', 6], 'rapport : une note hors liste (12, 5) est vidée à l\'ouverture');
ok(exNote.problemes.some(p => /« 12 » n'est pas une valeur permise \(1, 2, 3, 4, 6, 9\)/.test(p)), 'rapport : la note 12 est signalée');
ok(Object.keys(ATTENDU).every(id => suiviEx(id).alertes.every(a => !/ (est|sont) vides?, donc pas /.test(a.message))), 'les 12 exemples : aucune case vide');
// Limites et messages d'un fichier ouvert
let rf2 = OM.lireFichier(JSON.stringify({ format: 'learnsql-outil', version: 1, outil: 'gp-risques', nom: 'Gros',
  contenu: { lignes: Array.from({ length: 305 }, (v, k) => ({ risque: 'R' + k })) } }), reg, OUTILS);
ok(rf2.ok && rf2.doc.contenu.lignes.length === 300 && rf2.annonce.texte === 'Fichier ouvert : « Gros ». Ce qui a été corrigé ou coupé :' &&
  rf2.annonce.details[0] === 'Plus de 300 lignes, la fin est coupée (5 en trop).', 'fichier de 305 risques : coupé à 300, et le message le dit');
rf2 = OM.lireFichier(JSON.stringify({ format: 'learnsql-outil', version: 1, outil: 'gp-raci', nom: 'x',
  contenu: { colonnes: Array.from({ length: 42 }, (v, k) => 'P' + k), lignes: [] } }), raci, OUTILS);
egal(rf2.annonce.details, ['Plus de 40 personnes et rôles, la fin est coupée (2 en trop).'], 'fichier RACI de 42 personnes : le message dit ce qui est coupé');
rf2 = OM.lireFichier(JSON.stringify({ format: 'learnsql-outil', version: 1, outil: 'gp-risques', nom: 'N'.repeat(130), contenu: { lignes: [1, 2, 3, 4, 5, 6, 7] } }), reg, OUTILS);
ok(rf2.ok && rf2.doc.nom.length === 120 && rf2.annonce.details.length === 6 && rf2.annonce.details[0] === 'Nom trop long, coupé à 120 caractères.' &&
  rf2.annonce.details[5] === 'Et 3 autres corrections.', 'fichier avec 8 corrections : 5 dites, puis « Et 3 autres corrections. » : ' + JSON.stringify(rf2.annonce));
const exListe = OM.examiner(REUNION, { rubriques: { points: Array.from({ length: 103 }, (v, k) => 'x' + k) } });
ok(exListe.contenu.rubriques.points.length === 100 && exListe.problemes.indexOf('Points ouverts : plus de 100 lignes, la fin est coupée') >= 0,
  'liste de 103 lignes : coupée à 100, et dit');
// Les alertes du document dans Excel : du texte, avec la date de l'export (et celle de la situation, pour un exemple)
OM.fixerAujourdhui(OM.jour('2026-11-09'));
const lignesF1 = cl => cl.feuilles[0].lignes.map(l => l.map(c => c && c.v).join(' | '));
let f1 = lignesF1(OM.classeur(bud, { nom: 'Cas', contenu: casBudget() }));
ok(f1.indexOf('Alertes du document | Export du 09/11/2026 : ce texte ne se recalcule pas dans Excel.') >= 0 &&
  f1.indexOf(' | L\'atterrissage dépasse le plafond : le DAF décide, prévenu le jour même.') >= 0, 'Excel : les alertes du document, avec la date de l\'export');
f1 = lignesF1(OM.classeur(bud, { nom: 'DEMAT', contenu: OM.contenuExemple(bud), aujourdhui: OM.jour(bud.exemple.date) }));
ok(f1.indexOf('Alertes du document | Export du 09/11/2026, situation au 31/03/2027 : ce texte ne se recalcule pas dans Excel.') >= 0 &&
  f1.indexOf(' | Aucune alerte.') >= 0, 'Excel de l\'exemple : la date de la situation, et « Aucune alerte. »');
ok(!lignesF1(OM.classeur(bud, null)).some(t => /Alertes du document/.test(t)), 'modèle vide : pas d\'alertes du document');
OM.fixerAujourdhui();
// Un nom fait d'espaces
ok(/^Registre des risques\n/.test(OM.texteDocument(reg, { nom: '   ', contenu: { lignes: [] } })) &&
  OM.htmlDocument(reg, { nom: ' ', contenu: { lignes: [] } }).indexOf('color:#444444">') < 0, 'un nom fait d\'espaces : rien d\'écrit après le titre');

// ---------- 8. Contrôle d'un document et d'un fichier : jamais d'erreur ----------
const risques = outil('gp-risques');
egal(OM.examiner(risques, null).contenu, null, 'contenu null');
egal(OM.examiner(risques, { lignes: 'x' }).contenu, null, 'lignes qui ne sont pas une liste');
let ex = OM.examiner(risques, { lignes: [{ risque: 12, proba: '3', impact: 7, statut: 'fermé', note: 4, zzz: 1, quand: '2027-13-01' }], autre: 1 });
egal(ex.contenu.lignes[0], { risque: '12', proba: 3, impact: '', reponse: '', proprietaire: '', quand: '', statut: 'Fermé' }, 'valeurs remises au propre');
ok(ex.problemes.length === 8 && ex.problemes.some(m => /« 7 » n'est pas une valeur permise/.test(m)) && ex.problemes.some(m => /calculée/.test(m)),
  'problèmes notés : ' + ex.problemes.join(' | '));
ex = OM.examiner(risques, { lignes: Array.from({ length: 400 }, () => ({ risque: 'x'.repeat(6000) })) });
ok(ex.contenu.lignes.length === 300 && ex.contenu.lignes[0].risque.length === OM.MAX.texteLong, 'contenu trop gros : coupé');
ex = OM.examiner(raci, { colonnes: ['DAF', 3, null], lignes: [{ nom: 'X', cases: ['A', 'Z', 'r', 'en trop'] }, 'pas une ligne'] });
egal(ex.contenu, { colonnes: ['DAF', '3', ''], lignes: [{ nom: 'X', cases: ['A', '', 'R'] }] }, 'matrice remise au propre');
ex = OM.examiner(REUNION, { rubriques: { jour: '2027-02-09', points: 'pas une liste', taches: [{ quoi: 'x', jours: '3' }], zzz: 1 } });
ok(ex.contenu && ex.contenu.rubriques.points.length === 0 && ex.contenu.rubriques.taches[0].jours === 3 && ex.problemes.length === 3,
  'document remis au propre : ' + ex.problemes.join(' | '));
ex = OM.examiner(outil('gp-compte-rendu'), { rubriques: { actions: [{ action: 'x', fait: 'oui' }], decisions: 'pas une liste' } });
ok(ex.contenu === null, 'document dont un tableau n\'est pas une liste : abîmé');
ex = OM.examiner(outil('gp-compte-rendu'), { rubriques: { actions: [{ action: 'x', fait: 'oui' }] } });
ok(ex.contenu && ex.contenu.rubriques.actions[0].fait === 'Oui' && ex.contenu.rubriques.decisions.length === 0, 'document : valeurs remises au propre');
const tous = OUTILS;
[['pas du json', /pas au bon format/], ['', /pas au bon format/], ['null', /pas un document/], ['[]', /pas un document/], ['{"format":"autre"}', /pas un document/],
  [JSON.stringify({ format: 'learnsql-outil', outil: 'gp-raci', contenu: {} }), /Matrice RACI/],
  [JSON.stringify({ format: 'learnsql-outil', outil: 'inconnu', contenu: {} }), /outil inconnu/],
  [JSON.stringify({ format: 'learnsql-outil', version: 1, outil: 'gp-risques', contenu: { lignes: {} } }), /abîmé/],
  [JSON.stringify({ format: 'learnsql-outil', version: 2, outil: 'gp-risques', contenu: {} }), /version inconnue des outils \(version 2\) : il ne peut pas être ouvert/],
  [JSON.stringify({ format: 'learnsql-outil', outil: 'gp-risques', contenu: {} }), /version inconnue des outils : il ne peut/]]
  .forEach(([t, re]) => { const r = OM.lireFichier(t, risques, tous); ok(r.ok === false && re.test(r.message), 'fichier faux ' + t.slice(0, 40) + ' : ' + JSON.stringify(r)); });
const docEx = { nom: 'Mon registre', contenu: OM.contenuExemple(risques) };
let rf = OM.lireFichier(String.fromCharCode(0xFEFF) + OM.fichier(risques, docEx), risques, tous);
ok(rf.ok && rf.corrections === 0 && rf.doc.nom === 'Mon registre' && JSON.stringify(rf.doc.contenu) === JSON.stringify(docEx.contenu), 'aller-retour d\'un fichier (avec BOM)');
rf = OM.lireFichier(JSON.stringify({ format: 'learnsql-outil', version: 1, outil: 'gp-risques', nom: '   ', contenu: {} }), risques, tous);
ok(rf.ok && rf.doc.nom === 'Sans nom' && rf.doc.contenu.lignes.length === 0 && rf.annonce.texte === 'Fichier ouvert : « Sans nom ».' &&
  rf.annonce.details.length === 0, 'fichier sans nom ni lignes : « Sans nom »');
// Des fichiers au hasard : jamais d'exception
let graine = 7;
const hasard = n => { graine = (graine * 1103515245 + 12345) % 2147483648; return graine % n; };
const valeur = p => { const k = hasard(p > 3 ? 5 : 8); return k === 0 ? null : k === 1 ? hasard(20) - 5 : k === 2 ? 'Ouvert' : k === 3 ? '2027-0' + (1 + hasard(9)) + '-31' :
  k === 4 ? '' : k === 5 ? Array.from({ length: hasard(4) }, () => valeur(p + 1)) : k === 6 ? { proba: valeur(p + 1), risque: valeur(p + 1), cases: valeur(p + 1) } : true; };
let plantages = 0;
for (let k = 0; k < 400; k++) {
  const d = outil(['gp-risques', 'gp-raci', 'gp-compte-rendu'][k % 3]);
  const contenu = { lignes: valeur(0), colonnes: valeur(0), rubriques: hasard(2) ? valeur(0) : { date: valeur(1), decisions: valeur(1), actions: valeur(1) } };
  try {
    const r = OM.lireFichier(JSON.stringify({ format: 'learnsql-outil', version: 1, outil: d.id, nom: valeur(3), contenu: contenu }), d, tous);
    if (r.ok) { OM.suivi(d, r.doc.contenu); OM.texteDocument(d, r.doc); OM.htmlDocument(d, r.doc); OM.xlsx(OM.classeur(d, r.doc)); }
  } catch (e) { plantages++; if (plantages < 3) console.log('plantage', e.message); }
}
egal(plantages, 0, '400 fichiers au hasard : aucune exception');

// ---------- 9. Texte simple et HTML : tout texte de l'élève est échappé ----------
const docX = { nom: '<script>alert(1)</script>', contenu: { lignes: [{ risque: '<img src=x onerror=alert(1)>', proba: 3, impact: 3, statut: 'Ouvert' }] } };
let h = OM.htmlDocument(risques, docX);
ok(h.indexOf('<script') < 0 && h.indexOf('<img') < 0 && h.indexOf('&lt;img') >= 0 && /<table/.test(h), 'HTML échappé');
let t = OM.texteDocument(risques, docX);
ok(/^Registre des risques : <script>/.test(t) && /- Note : 9 · Priorité/.test(t) && /Alertes\n- Risque 1/.test(t), 'texte simple : ' + t.slice(0, 120));
t = OM.texteDocument(raci, { nom: 'DEMAT', contenu: OM.contenuExemple(raci) });
ok(/Format de facture\n- R · Réalise : Toi, Intégrateur\n- A · Approuve : DAF/.test(t), 'texte de la matrice : ' + t.slice(0, 160));
t = OM.texteDocument(outil('gp-compte-rendu'), { nom: 'COPIL', contenu: OM.contenuExemple(outil('gp-compte-rendu')) });
ok(/Date : 09\/02\/2027/.test(t) && /Décisions\n\nDécision 1\n- Décision : Changement n° 7 accepté/.test(t) &&
  /Points ouverts\n\nPoint ouvert 1\n- Point ouvert : Clôture de mars/.test(t) && /Actions pas encore faites : 4/.test(t), 'texte du compte rendu : ' + t.slice(0, 300));
t = OM.texteDocument(outil('gp-rapport'), { nom: 'Avril', contenu: OM.contenuExemple(outil('gp-rapport')) });
ok(/Météo globale : l'axe le plus mauvais : 2 · Orange/.test(t) && /- Couleur : 2 · Orange/.test(t) && /- Reste de tolérance, en jours : 7 · Dans la tolérance/.test(t),
  'texte du rapport : niveaux des totaux et des calculs');

// ---------- 10. Les classeurs Excel : un zip valide, un XML bien formé, des formules ----------
function xmlBienForme(x) {
  x = x.replace(/^<\?xml[^?]*\?>\s*/, '');
  const pile = [], re = /<([^>]*)>/g;
  let pos = 0, m;
  while ((m = re.exec(x))) {
    const texte = x.slice(pos, m.index);
    pos = re.lastIndex;
    if (/[<>]|&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(texte)) return 'texte « ' + texte.slice(0, 40) + ' »';
    if (m[1][0] === '/') { const n = m[1].slice(1).trim(); if (pile.pop() !== n) return 'fermeture de ' + n; continue; }
    const b = /^([A-Za-z_][\w:.-]*)((?:\s+[\w:.-]+="[^"<]*")*)\s*(\/?)$/.exec(m[1]);
    if (!b) return 'balise « ' + m[1].slice(0, 40) + ' »';
    if (!b[3]) pile.push(b[1]);
  }
  return /\S/.test(x.slice(pos)) ? 'fin' : pile.length ? 'non fermées : ' + pile.join(',') : '';
}
const PARTIES = ['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/styles.xml'];
// Des textes difficiles : &, <, guillemets, espaces au début, retours à la ligne, caractères de contrôle, demi-caractère.
const PIEGE = ' Début & fin <b>"ici"</b>' + String.fromCharCode(1) + String.fromCharCode(0xD800) + '\r\nligne 2 ';
const classeurs = [];
for (const def of OUTILS.concat([TACHES, REUNION])) {
  const exemple = def === TACHES ? { nom: 'Test', contenu: { lignes: LIGNES } } : def === REUNION ? { nom: 'Test', contenu: reunion } :
    { nom: def.exemple.nom, contenu: OM.contenuExemple(def) };
  const piege = { nom: PIEGE, contenu: JSON.parse(JSON.stringify(exemple.contenu)) };
  if (piege.contenu.lignes && piege.contenu.lignes[0] && def.type === 'tableau') piege.contenu.lignes[0][def.colonnes[0].id] = PIEGE;
  if (def.type === 'matrice') { piege.contenu.colonnes[0] = PIEGE; piege.contenu.lignes[0].nom = PIEGE; }
  if (def.type === 'document') piege.contenu.rubriques[def.rubriques.filter(r => r.type === 'texte' || r.type === 'texte-long')[0].id] = PIEGE;
  for (const [quoi, doc] of [['modele', null], ['exemple', exemple], ['piege', piege]]) ajouterClasseur(def, quoi, doc);
}
// Les cas des cases vides : mêmes contrôles (openpyxl), et LibreOffice doit trouver les mêmes résultats que le site.
ajouterClasseur(bud, 'vides', { nom: 'Cas du testeur', contenu: casBudget() });
ajouterClasseur(bc, 'vides', { nom: 'Cas du testeur', contenu: casBc });
ajouterClasseur(rap, 'vides', { nom: 'Jalons', contenu: casRap });
ajouterClasseur(reg, 'vides', { nom: 'Incomplet', contenu: { lignes: [
  { risque: 'Un risque', proba: '', impact: '', reponse: 'Réduire', proprietaire: 'Le DAF', quand: '2099-01-01', statut: 'Ouvert' },
  { risque: 'Deux', proba: 2, impact: '', reponse: 'x', proprietaire: 'y', quand: '2099-05-01', statut: 'Ouvert' },
  { risque: 'Trois', proba: '', impact: 3, reponse: 'x', proprietaire: 'y', quand: '2099-05-01', statut: 'Fermé' }, { statut: 'Ouvert' }] } });
function ajouterClasseur(def, quoi, doc) {
  const cl = OM.classeur(def, doc), octets = Buffer.from(OM.xlsx(cl));
  let parts = {};
  try { parts = lireZip(octets); } catch (e) { ok(false, def.id + ' ' + quoi + ' : zip illisible ' + e.message); return; }
  const attendues = PARTIES.concat(cl.feuilles.map((f, i) => 'xl/worksheets/sheet' + (i + 1) + '.xml'));
  egal(Object.keys(parts).sort(), attendues.sort(), def.id + ' ' + quoi + ' : parties du classeur');
  Object.keys(parts).forEach(n => {
    ok(parts[n].methode === 0 && (!zlib.crc32 || zlib.crc32(parts[n].data) === parts[n].crc), def.id + ' ' + quoi + ' ' + n + ' : CRC');
    const e = xmlBienForme(parts[n].data.toString('utf8'));
    ok(!e, def.id + ' ' + quoi + ' ' + n + ' : XML mal formé (' + e + ')');
  });
  unzipOk(octets, def.id + '-' + quoi + '.xlsx');
  const fichier = path.join(dossier, def.id + '-' + quoi + '.xlsx');
  fs.writeFileSync(fichier, octets);
  classeurs.push({ def, quoi, cl, fichier, doc });
}
const feuille = (id, quoi, n) => {
  const c = classeurs.filter(x => x.def.id === id && x.quoi === quoi)[0];
  return lireZip(fs.readFileSync(c.fichier))['xl/worksheets/sheet' + (n || 1) + '.xml'].data.toString('utf8');
};
let x = feuille('gp-risques', 'exemple');
ok(x.indexOf('<f>IF(OR(B2="",C2=""),"",B2*C2)</f><v>6</v>') >= 0, 'registre : formule et valeur de la note');
ok(x.indexOf('<f>IF(D2="","",IF(D2&lt;=2,"On surveille",IF(D2&lt;=4,"Action simple",IF(D2&lt;=9,"Priorité",""))))</f><v>Priorité</v>') >= 0, 'registre : niveau en mot');
ok(/<f t="array" ref="B36">SUM\(/.test(x) && /<conditionalFormatting sqref="E2:E31">/.test(x) && /type="list"[^>]*sqref="B2:B31"><formula1>"1,2,3"<\/formula1>/.test(x),
  'registre : totaux (formules matricielles), couleurs des niveaux, listes de choix');
ok(/<pane ySplit="1"/.test(x) && /<c r="A1" s="1" t="inlineStr"><is><t>Risque<\/t><\/is><\/c>/.test(x) && /<col min="1" max="1" width="45"/.test(x), 'registre : en-tête figé, en gras, largeurs');
x = feuille('gp-raci', 'exemple');
ok(x.indexOf('<f>IF(COUNTA(A2:K2)=0,"",TRIM(IF(COUNTIF(B2:K2,"A")&gt;1,"Deux A, c\'est aucun : un seul A par livrable. ","")&amp;IF(COUNTIF(B2:K2,"A")=0,') >= 0,
  'RACI : alertes par ligne en formule');
ok(/<t>R = Réalise : Fait le travail\. Il peut y en avoir plusieurs\.<\/t>/.test(x), 'RACI : les aides des valeurs sous la matrice');
ok(/<dataValidation type="list"[^>]*sqref="B2:K21"><formula1>"R,A,C,I"<\/formula1>/.test(x), 'RACI : liste R, A, C, I');
x = lireZip(fs.readFileSync(classeurs.filter(c => c.def.id === 'gp-compte-rendu' && c.quoi === 'exemple')[0].fichier));
egal((x['xl/workbook.xml'].data.toString('utf8').match(/<sheet name="[^"]+"/g) || []).map(m => m.slice(13, -1)),
  ['Compte rendu de réunion', 'Décisions', 'Actions', 'Points ouverts'], 'compte rendu : une feuille pour les rubriques, une par tableau');
ok(/Voir la feuille « Actions »/.test(x['xl/worksheets/sheet1.xml'].data.toString('utf8')), 'compte rendu : les rubriques en texte');
x = feuille('gp-rapport', 'exemple', 4);
ok(x.indexOf("<f>IF(E2=\"\",\"\",'Rapport du COPIL et météo'!$B$9-ABS(E2))</f><v>14</v>") >= 0,
  'rapport : le reste de tolérance lit la rubrique sur la 1re feuille (vide = 0 dans une différence)');
x = feuille('gp-rapport', 'exemple', 3);
ok(/<c r="C34" s="6" t="str"><f>IF\(B34="","",IF\(B34&lt;=1,"Vert",IF\(B34&lt;=2,"Orange",IF\(B34&lt;=3,"Rouge",""\)\)\)\)<\/f><v>Orange<\/v><\/c>/.test(x) &&
  /<conditionalFormatting sqref="B2:B31"><cfRule type="cellIs" dxfId="0"[^>]*><formula>1<\/formula>/.test(x), 'rapport : niveau du total et couleurs du choix');
ok(/<t>Délai<\/t>/.test(feuille('gp-rapport', 'modele', 3)), 'modèle vide : les axes de la météo déjà écrits');
x = feuille('gp-budget', 'exemple', 2);
ok(['85250', '81100', '30350', '57150', '87500', '2250'].every(v => x.indexOf('<v>' + v + '</v>') >= 0), 'budget : les totaux de la fiche dans le fichier Excel');
x = feuille('gp-risques', 'modele');
ok(x.indexOf('<f>IF(OR(B31="",C31=""),"",B31*C31)</f>') >= 0 && !/DEMAT/.test(x) && !/<c r="A2"/.test(x), 'modèle vide : 30 lignes de formules, sans données');
x = feuille('gp-risques', 'piege');
ok(/xml:space="preserve"> Début &amp; fin &lt;b&gt;"ici"&lt;\/b&gt;\nligne 2 <\/t>/.test(x), 'texte difficile : échappé, sans caractère de contrôle');

// ---------- 11. openpyxl (si python3 et openpyxl sont là) : chaque cellule relue ----------
const PY = [
  'import sys, json, datetime',
  'import openpyxl',
  'res = {}',
  'for chemin in sys.argv[1:]:',
  '    wb = openpyxl.load_workbook(chemin); wv = openpyxl.load_workbook(chemin, data_only=True); fs = []',
  '    for ws in wb.worksheets:',
  '        cel = {}',
  '        for ligne in ws.iter_rows():',
  '            for c in ligne:',
  '                if c.value is None: continue',
  '                f = getattr(c.value, "text", None) or (c.value if isinstance(c.value, str) and c.value.startswith("=") else None)',
  '                v = wv[ws.title][c.coordinate].value if f else c.value',
  '                if isinstance(v, datetime.datetime): v = v.date().isoformat()',
  '                cel[c.coordinate] = {"f": f, "v": v, "gras": bool(c.font and c.font.b)}',
  '        fs.append({"titre": ws.title, "cellules": cel, "fige": ws.freeze_panes})',
  '    res[chemin] = fs',
  'print(json.dumps(res, default=str))'
].join('\n');
let py = null;
try { py = JSON.parse(cp.execFileSync('python3', ['-I', '-c', PY].concat(classeurs.map(c => c.fichier)), { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] })); }
catch (e) { py = null; console.log('openpyxl : contrôle sauté (' + String(e.stderr || e.message).trim().split('\n').pop() + ')'); }
if (py) {
  let cellules = 0;
  const propre = s => String(s).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]|[\ud800-\udfff]/g, '');
  classeurs.forEach(c => {
    const fs2 = py[c.fichier] || [];
    egal(fs2.map(f => f.titre), c.cl.feuilles.map(f => f.nom), c.def.id + ' ' + c.quoi + ' (openpyxl) : feuilles');
    c.cl.feuilles.forEach((f, i) => {
      const lues = (fs2[i] || {}).cellules || {};
      if (f.figer) egal(fs2[i] && fs2[i].fige, 'A2', c.def.id + ' ' + c.quoi + ' (openpyxl) : en-tête figé');
      let ecarts = [];
      f.lignes.forEach((ligne, r) => ligne.forEach((m, k) => {
        if (!m) return;
        cellules++;
        const ref = OM.lettre(k + 1) + (r + 1), p = lues[ref];
        if (!p) { ecarts.push(ref + ' absente'); return; }
        let attendu = m.t === 'date' ? OM.isoDuJour(m.v) : m.t === 'formule' ? m.v : m.t === 'texte' ? propre(m.v) : m.v;
        let lu = p.v;
        if (m.t === 'formule' && p.f !== '=' + m.f) ecarts.push(ref + ' formule ' + p.f);
        if (attendu === '' || attendu === null) attendu = null;
        if (lu === '' || lu === undefined) lu = null;
        if (JSON.stringify(lu) !== JSON.stringify(attendu)) ecarts.push(ref + ' valeur ' + JSON.stringify(lu) + ' au lieu de ' + JSON.stringify(attendu));
        if (m.s === 'entete' && !p.gras) ecarts.push(ref + ' en-tête pas en gras');
      }));
      ok(!ecarts.length, c.def.id + ' ' + c.quoi + ' feuille ' + (i + 1) + ' (openpyxl) : ' + ecarts.slice(0, 4).join(' | '));
    });
  });
  console.log('openpyxl : ' + classeurs.length + ' classeurs relus, ' + cellules + ' cellules comparées');
}

// ---------- 12. LibreOffice (OUTILS_LIBREOFFICE=1) : recalcule toutes les formules, mêmes résultats que le site ----------
if (process.env.OUTILS_LIBREOFFICE) {
  const lo = path.join(dossier, 'lo'), profil = path.join(dossier, 'profil');
  fs.mkdirSync(lo);
  const sansCache = classeurs.filter(c => c.quoi !== 'piege').map(c => {
    const f = path.join(dossier, 'sc-' + path.basename(c.fichier));
    fs.writeFileSync(f, Buffer.from(OM.xlsx(c.cl, { sansCache: true })));
    return Object.assign({}, c, { sc: f });
  });
  cp.execFileSync('soffice', ['-env:UserInstallation=file://' + profil, '--headless', '--calc', '--convert-to',
    'csv:Text - txt - csv (StarCalc):44,34,76,1,,0,false,true,false,false,false,-1', '--outdir', lo].concat(sansCache.map(c => c.sc)),
    { stdio: 'ignore', env: Object.assign({}, process.env, { LANG: 'C.UTF-8' }), timeout: 300000 });
  const csv = t => {
    const lignes = [[]];
    let champ = '', guillemets = false;
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      if (guillemets) { if (ch === '"' && t[i + 1] === '"') { champ += '"'; i++; } else if (ch === '"') guillemets = false; else champ += ch; }
      else if (ch === '"') guillemets = true;
      else if (ch === ',') { lignes[lignes.length - 1].push(champ); champ = ''; }
      else if (ch === '\n') { lignes[lignes.length - 1].push(champ); champ = ''; lignes.push([]); }
      else if (ch !== '\r') champ += ch;
    }
    return lignes;
  };
  let formules = 0;
  sansCache.forEach(c => {
    const base = path.basename(c.sc, '.xlsx');
    c.cl.feuilles.forEach(f => {
      const nomCsv = path.join(lo, base + '-' + f.nom + '.csv');
      if (!fs.existsSync(nomCsv)) { ok(false, 'LibreOffice : pas de fichier ' + nomCsv); return; }
      const t = csv(fs.readFileSync(nomCsv, 'utf8')), ecarts = [];
      f.lignes.forEach((ligne, r) => ligne.forEach((m, k) => {
        if (!m || m.t !== 'formule') return;
        formules++;
        const lu = ((t[r] || [])[k] || ''), attendu = m.v === null || m.v === undefined ? '' : m.v;
        const pareil = typeof attendu === 'number' ? Math.abs(Number(lu) - attendu) < 1e-9 && lu !== '' : lu === String(attendu);
        if (!pareil) ecarts.push(OM.lettre(k + 1) + (r + 1) + ' : ' + JSON.stringify(lu) + ' au lieu de ' + JSON.stringify(attendu));
      }));
      ok(!ecarts.length, 'LibreOffice ' + c.def.id + ' ' + c.quoi + ' « ' + f.nom + ' » : ' + ecarts.slice(0, 4).join(' | '));
    });
  });
  console.log('LibreOffice : ' + formules + ' formules recalculées et comparées');
} else console.log('LibreOffice : contrôle non demandé (OUTILS_LIBREOFFICE=1 pour le lancer)');

fs.rmSync(dossier, { recursive: true, force: true });
console.log(echecs + ' échec(s) sur ' + total);
process.exitCode = echecs ? 1 : 0;
