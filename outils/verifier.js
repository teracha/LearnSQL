// Contrôle des questions. Usage (depuis la racine du dépôt) : node outils/verifier.js [mXX | dvXX]
// Questions Divalto (dialecte « Divalto … ») : une source { titre, url } est obligatoire.
// Vérifie le format (dont : chaque « Non. » explique pourquoi), puis la longueur des choix : on ne doit pas pouvoir
// deviner la bonne réponse parce qu'elle est la plus longue (ou la plus courte).
global.window = global;
const fs = require('fs'), path = require('path');
const racine = path.join(__dirname, '..');
require(path.join(racine, 'data/modules.js'));
for (const f of fs.readdirSync(path.join(racine, 'data')).filter(f => /^[a-z]+\d\d-.*\.js$/.test(f))) require(path.join(racine, 'data', f));

const MAX_PLUS_LONGUE = 30;   // % max de questions où la bonne réponse est la plus longue
const MAX_PLUS_COURTE = 40;   // % max où elle est la plus courte (l'excès inverse est aussi un indice)
const MIN_EXTREME = 10;       // % min plus longue ET plus courte : sinon on élimine les extrêmes sans réfléchir
const ECART = 1.5;            // bonne réponse 1,5 fois plus longue que tous les autres choix…
const ECART_MIN = 10;         // …et d'au moins 10 caractères = indice évident

const filtre = process.argv[2];
const ids = new Set(), textes = new Map();
let erreurs = 0, alertes = 0;
for (const [m, qs] of Object.entries(LEARNSQL.questions)) {
  if (filtre && m !== filtre) continue;
  let longue = 0, courte = 0;
  const ecarts = [];
  qs.forEach(q => {
    if (ids.has(q.id)) { console.log('ERREUR id en double', q.id); erreurs++; } ids.add(q.id);
    if (!q.id.startsWith(m + '-')) { console.log('ERREUR mauvais module', q.id); erreurs++; }
    if (q.choix.length !== 4 || q.pourquoi.length !== 4 || !(q.bonne >= 0 && q.bonne <= 3) || !q.retenir || !q.q || !q.dialecte) { console.log('ERREUR format', q.id); erreurs++; }
    if (/^Divalto/.test(q.dialecte) && !(q.source && q.source.titre && /^https:\/\//.test(q.source.url))) { console.log('ERREUR source manquante', q.id); erreurs++; }
    if (new Set(q.choix).size !== 4) { console.log('ERREUR choix en double', q.id); erreurs++; }
    if (!/^Oui/.test(q.pourquoi[q.bonne])) { console.log('ALERTE « Oui » manquant', q.id); alertes++; }
    q.pourquoi.forEach((p, j) => { if (j !== q.bonne && !/^Non/.test(p)) { console.log('ALERTE « Non » manquant', q.id, j); alertes++; } });
    q.pourquoi.forEach((p, j) => { if (/^(Oui|Non)\.?$/.test(p.trim())) { console.log('ALERTE explication vide', q.id, j); alertes++; } });
    if (/^(Même|Mêmes|Rappel|Idem)/.test(q.q)) { console.log('ALERTE dépend d\'une autre question', q.id); alertes++; }
    const k = q.q + (q.code || '');
    if (textes.has(k)) { console.log('ALERTE question identique', q.id, textes.get(k)); alertes++; }
    textes.set(k, q.id);
    const l = q.choix.map(c => c.length), b = l[q.bonne], autres = l.filter((_, i) => i !== q.bonne);
    if (autres.every(x => b > x)) longue++;
    if (autres.every(x => b < x)) courte++;
    if (b >= ECART * Math.max(...autres) && b - Math.max(...autres) >= ECART_MIN) ecarts.push(q.id);
  });
  const pl = Math.round(100 * longue / qs.length), pc = Math.round(100 * courte / qs.length);
  const ok = pl <= MAX_PLUS_LONGUE && pc <= MAX_PLUS_COURTE && pl >= MIN_EXTREME && pc >= MIN_EXTREME && ecarts.length === 0;
  console.log(`${m} ${qs.length} questions · bonne = plus longue ${pl} % · plus courte ${pc} % · écarts évidents ${ecarts.length}${ok ? '' : '  ← À CORRIGER'}`);
  if (ecarts.length) console.log('   écarts :', ecarts.join(' '));
  if (!ok) alertes++;
}
// ---------- Super dico (docs/dico.md) ----------
const dossierDico = path.join(racine, 'data/dico');
// Le conseil pratique (champ `pratique`, règle 9 de docs/dico.md) : obligatoire, chaque fiche SQL en a un.
// Dans le dico Divalto, `pratique` et `piege` sont facultatifs, mais contrôlés de la même façon s'ils sont là.
const PRATIQUE_OBLIGATOIRE = true;
const PRATIQUE_MAX_MOTS = 40;
// Le dico Divalto (domaine: "divalto", section « Le dico Divalto » de docs/dico.md).
const DV_TYPES = ['table', 'champ', 'vue', 'requête'];
const DV_CATEGORIES = ['Tables Divalto', 'Champs Divalto', 'Vues Divalto', 'Requêtes Dataviz'];
const DV_DEFINITION_MAX_MOTS = 20;
const DV_CHAMPS_AFFICHES = ['id', 'nom', 'type', 'domaine', 'categorie', 'definition', 'noms', 'champs', 'liens', 'indicateurs',
  'regles', 'exemple', 'piege', 'pratique', 'motsCles', 'voirAussi', 'source', 'sources', 'version'];
if (!filtre && fs.existsSync(dossierDico)) {
  for (const f of fs.readdirSync(dossierDico).filter(f => f.endsWith('.js'))) require(path.join(dossierDico, f));
  const fiches = LEARNSQL.dico || [], idsDico = new Set(), modules = new Set((LEARNSQL.modules || []).map(m => m.id));
  const typesOk = ['fonction', 'mot-clé', 'erreur'], moteurs = ['sqlserver', 'snowflake', 'mysql'];
  const texte = t => typeof t === 'string' && t.trim() !== '';
  const nbMots = t => t.trim().split(/\s+/).length;
  let avecPratique = 0, nbDivalto = 0;
  // Le conseil pratique : non vide, 40 mots au plus, différent du piège.
  const verifierPratique = f => {
    const p = typeof f.pratique === 'string' ? f.pratique.trim() : '';
    const pareil = t => String(t || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (!p) { console.log('ERREUR dico pratique vide', f.id); erreurs++; return; }
    avecPratique++;
    const mots = p.split(/\s+/).length;
    if (mots > PRATIQUE_MAX_MOTS) { console.log('ERREUR dico pratique trop long (' + mots + ' mots, ' + PRATIQUE_MAX_MOTS + ' au plus)', f.id); erreurs++; }
    if (pareil(p) === pareil(f.piege)) { console.log('ERREUR dico pratique identique au piège', f.id); erreurs++; }
  };
  const verifierDivalto = f => {
    const err = (...m) => { console.log('ERREUR dico Divalto', f.id, ...m); erreurs++; };
    const sourceOk = s => !!s && texte(s.titre) && /^https:\/\/\S+$/.test(s.url || '');
    const listeTextes = l => Array.isArray(l) && l.length > 0 && l.every(texte);
    nbDivalto++;
    if (!/^dv-[a-z0-9-]+$/.test(f.id || '')) err('id : « dv-… »');
    if (!texte(f.nom)) err('nom manquant');
    if (DV_TYPES.indexOf(f.type) < 0) err('type (' + DV_TYPES.join(', ') + ') :', f.type);
    if (DV_CATEGORIES.indexOf(f.categorie) < 0) err('catégorie (' + DV_CATEGORIES.join(', ') + ') :', f.categorie);
    if (!texte(f.definition)) err('définition manquante');
    else if (nbMots(f.definition) > DV_DEFINITION_MAX_MOTS) err('définition longue (' + nbMots(f.definition) + ' mots, ' + DV_DEFINITION_MAX_MOTS + ' au plus)');
    if (!Array.isArray(f.motsCles) || f.motsCles.length < 8 || f.motsCles.length > 20 || !f.motsCles.every(texte)) err('motsCles (8 à 20) :', (f.motsCles || []).length);
    if (f.source !== undefined && f.sources !== undefined) err('source et sources : un seul des deux');
    else if (f.sources !== undefined) { if (!Array.isArray(f.sources) || f.sources.length < 1 || f.sources.length > 3 || !f.sources.every(sourceOk)) err('sources : 1 à 3 { titre, url https }'); }
    else if (!sourceOk(f.source)) err('source manquante : { titre, url https }');
    if (f.champs !== undefined && !(Array.isArray(f.champs) && f.champs.length > 0 &&
        f.champs.every(c => Array.isArray(c) && c.length === 2 && texte(c[0]) && texte(c[1])))) err('champs : des paires [nom, sens]');
    ['noms', 'liens', 'indicateurs', 'regles'].forEach(k => { if (f[k] !== undefined && !listeTextes(f[k])) err(k + ' : une liste de textes'); });
    ['exemple', 'version'].forEach(k => { if (f[k] !== undefined && !texte(f[k])) err(k + ' vide'); });
    if (f.piege !== undefined && !texte(f.piege)) err('piège vide');
    if (f.pratique !== undefined) verifierPratique(f);
    Object.keys(f).filter(k => DV_CHAMPS_AFFICHES.indexOf(k) < 0).forEach(k => { console.log('ALERTE dico Divalto champ inconnu (non affiché)', f.id, k); alertes++; });
  };
  fiches.forEach(f => {
    if (!f.id || !/^[a-z0-9-]+$/.test(f.id)) { console.log('ERREUR dico id', f.id); erreurs++; }
    if (idsDico.has(f.id)) { console.log('ERREUR dico id en double', f.id); erreurs++; } idsDico.add(f.id);
    if (f.domaine !== undefined && f.domaine !== 'divalto') { console.log('ERREUR dico domaine inconnu', f.id, f.domaine); erreurs++; return; }
    if (f.domaine === 'divalto') { verifierDivalto(f); return; }
    if (/^dv-/.test(f.id || '')) { console.log('ERREUR dico id « dv-… » sans domaine "divalto"', f.id); erreurs++; }
    if (!f.nom || !f.categorie || !f.definition || typesOk.indexOf(f.type) < 0) { console.log('ERREUR dico format', f.id); erreurs++; }
    if (!f.moteurs || moteurs.some(m => !f.moteurs[m])) { console.log('ERREUR dico moteur manquant', f.id); erreurs++; }
    if (!Array.isArray(f.motsCles) || f.motsCles.length < 8 || f.motsCles.length > 20) { console.log('ALERTE dico motsCles (8 à 20)', f.id, (f.motsCles || []).length); alertes++; }
    if (f.definition && f.definition.split(/\s+/).length > 25) { console.log('ALERTE dico définition longue', f.id); alertes++; }
    if (f.module && !modules.has(f.module)) { console.log('ERREUR dico module inconnu', f.id, f.module); erreurs++; }
    if (f.exemples && Object.keys(f.exemples).some(k => ['snowflake', 'mysql'].indexOf(k) < 0)) { console.log('ERREUR dico exemples (snowflake, mysql)', f.id); erreurs++; }
    if (f.resultat !== undefined && !(typeof f.resultat === 'string' || (Array.isArray(f.resultat) && f.resultat.length >= 1 &&
        f.resultat.every(r => Array.isArray(r) && r.length === f.resultat[0].length)))) { console.log('ERREUR dico résultat', f.id); erreurs++; }
    if (f.pratique !== undefined) verifierPratique(f);
    else if (PRATIQUE_OBLIGATOIRE) { console.log('ERREUR dico pratique manquant', f.id); erreurs++; }
  });
  // « Voir aussi » : des fiches qui existent (une fiche Divalto peut renvoyer vers une fiche SQL).
  fiches.forEach(f => (f.voirAussi || []).forEach(v => { if (!idsDico.has(v)) { console.log('ERREUR dico voirAussi inconnu', f.id, v); erreurs++; } }));
  console.log(`dico ${fiches.length - nbDivalto} fiches SQL + ${nbDivalto} Divalto (conseil pratique : ${avecPratique})`);
}
// ---------- Outils (docs/outils.md) ----------
// Les sujets (data/outils/sujets.js) et les définitions (data/outils/<id>.js, un outil par fichier, chargé dans index.html) :
// ids uniques, sujet connu, types valides, formules lues sans erreur, qui ne citent que des colonnes existantes, avec des
// types justes (un calcul donne un nombre, une alerte une condition), cours qui existent, exemple conforme aux colonnes
// et aux valeurs permises, sorties (texte, HTML, Excel) faites sans erreur.
const dossierOutils = path.join(racine, 'data/outils');
if (!filtre && fs.existsSync(dossierOutils)) {
  require(path.join(racine, 'data/parcours.js'));
  require(path.join(racine, 'js/outils.js'));
  const OM = LEARNSQL.outilsMoteur, index = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
  const err = (...m) => { console.log('ERREUR outils', ...m); erreurs++; };
  const alerte = (...m) => { console.log('ALERTE outils', ...m); alertes++; };
  const texte = t => typeof t === 'string' && t.trim() !== '';
  // Les mots d'un texte : « : », « → » ou « · » seuls ne comptent pas.
  const nbMots = t => String(t).trim().split(/\s+/).filter(m => /[0-9A-Za-zÀ-ÿ]/.test(m)).length;
  for (const f of fs.readdirSync(dossierOutils).filter(f => f.endsWith('.js')).sort()) {
    const avant = (LEARNSQL.outils || []).length;
    require(path.join(dossierOutils, f));
    const nouveaux = (LEARNSQL.outils || []).slice(avant);
    if (f === 'sujets.js') { if (nouveaux.length) err(f, ': les sujets seulement, pas d\'outil'); }
    else if (nouveaux.length !== 1 || nouveaux[0].id + '.js' !== f) err(f, ': un fichier = un outil, nommé <id>.js');
    if (index.indexOf('<script src="data/outils/' + f + '"></script>') < 0) err(f, 'absent de index.html');
  }
  if (index.indexOf('<script src="js/outils.js"></script>') < 0) err('js/outils.js absent de index.html');
  const sujets = LEARNSQL.outilsSujets || [], outils = LEARNSQL.outils || [];
  // Les droits (table « acces », page Équipe) : un id ne nomme qu'une chose dans tout le site. Un sujet ou un outil n'a
  // pas l'id d'un parcours, d'un sous-parcours ou d'un module ; « outils » est la ligne de toute la section.
  const idsSite = new Map();
  (LEARNSQL.parcours || []).forEach(p => { idsSite.set(p.id, 'le parcours'); (p.sous || []).forEach(s => idsSite.set(s.id, 'le sous-parcours')); });
  (LEARNSQL.modules || []).forEach(m => { if (!idsSite.has(m.id)) idsSite.set(m.id, 'le module'); });
  idsSite.set('outils', 'la ligne « Outils » des droits');
  const nommer = (id, quoi) => {
    if (idsSite.has(id)) err(quoi, id, ': même id que', idsSite.get(id), '(les droits se mêleraient)');
    else idsSite.set(id, quoi + ' ' + id);
  };
  const idOK = id => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id || '');
  const idsSujets = new Set(), idsLiens = new Set(), range = {};
  if (!Array.isArray(LEARNSQL.outilsSujets) || !sujets.length) err('data/outils/sujets.js : LEARNSQL.outilsSujets manquant');
  sujets.forEach(s => {
    if (!idOK(s.id)) err('sujet : id', s.id);
    if (idsSujets.has(s.id)) err('sujet en double', s.id);
    else if (idOK(s.id)) nommer(s.id, 'le sujet');
    idsSujets.add(s.id);
    if (!texte(s.titre) || !texte(s.resume)) err('sujet', s.id, ': titre et résumé');
    // Le lien avec un parcours n'existe plus : un sujet a ses propres droits (page Équipe, « Droits des outils »).
    if (s.parcours !== undefined) err('sujet', s.id, ': « parcours » n\'existe plus, ses droits se règlent sur la page Équipe (Droits des outils)');
    Object.keys(s).filter(k => ['id', 'titre', 'resume', 'outils', 'groupes', 'parcours'].indexOf(k) < 0)
      .forEach(k => alerte('sujet', s.id, ': champ inconnu (ignoré)', k));
    // outils (une liste), ou groupes (des étapes : [{ titre, outils }]), pas les deux.
    if ((s.outils === undefined) === (s.groupes === undefined)) err('sujet', s.id, ': outils ou groupes (l\'un des deux)');
    if (s.groupes !== undefined) {
      if (!Array.isArray(s.groupes) || !s.groupes.length) err('sujet', s.id, ': groupes, une liste non vide');
      (Array.isArray(s.groupes) ? s.groupes : []).forEach((g, k) => {
        if (!g || !texte(g.titre)) err('sujet', s.id, ': groupe', k + 1, ', titre manquant');
        if (g) Object.keys(g).filter(x => ['titre', 'outils'].indexOf(x) < 0).forEach(x => alerte('sujet', s.id, ': groupe', k + 1, ', champ inconnu (ignoré)', x));
      });
    }
    const listes = s.groupes !== undefined ? (Array.isArray(s.groupes) ? s.groupes : []).map(g => (g && g.outils)) : [s.outils];
    listes.forEach(l => {
      if (!Array.isArray(l) || !l.length) { err('sujet', s.id, ': outils, une liste non vide'); return; }
      l.forEach(o => {
        if (typeof o === 'string') { if (range[o]) err('outil rangé deux fois', o); range[o] = s.id; }
        else if (!o || !idOK(o.id) || !texte(o.titre) || !texte(o.resume) || !/^#\/[a-z]/.test(o.lien || '')) err('sujet', s.id, ': un lien = { id, titre, resume, lien: "#/…" }');
        else { nommer(o.id, "l'outil"); idsLiens.add(o.id); }
      });
    });
  });
  // Sans compte : les sujets publics. Le dico et Traduire suivent le droit de leur lien (js/app.js, outilOuvert).
  if (!Array.isArray(LEARNSQL.outilsPublics)) err('data/outils/sujets.js : LEARNSQL.outilsPublics manquant (les sujets ouverts sans compte)');
  else LEARNSQL.outilsPublics.forEach(id => { if (!idsSujets.has(id)) err('outilsPublics : sujet inconnu', id); });
  ['dico', 'traduire'].forEach(id => { if (!idsLiens.has(id)) err('sujets : pas de lien d\'id « ' + id + ' » (le droit de la page #/' + id + ')'); });
  const modules = new Set((LEARNSQL.modules || []).map(m => m.id)), idsOutils = new Set(), parType = {};
  const CHAMPS_OUTIL = ['id', 'sujet', 'titre', 'resume', 'quand', 'etapes', 'cours', 'type', 'colonnes', 'alertes', 'totaux', 'aideTotaux',
    'modele', 'ligne', 'colonne', 'valeurs', 'libelles', 'aides', 'rubriques', 'exemple', 'export'];
  const CHAMPS_COLONNE = ['id', 'titre', 'type', 'aide', 'valeurs', 'libelles', 'couleurs', 'formule', 'niveaux', 'defaut', 'largeur',
    'resultat', 'facultatif'];
  const CHAMPS_RUBRIQUE = ['id', 'titre', 'type', 'aide', 'valeurs', 'libelles', 'couleurs', 'defaut', 'colonnes', 'alertes', 'totaux',
    'aideTotaux', 'modele', 'ligne'];
  const CHAMPS_TOTAL = ['id', 'libelle', 'calcul', 'colonne', 'si', 'niveaux', 'formule'];
  // Le genre d'une colonne dans une formule : nombre (nombre, date, calcul, choix de nombres), texte, liste ou tableau.
  const genre = c => c.type === 'texte' || c.type === 'texte-long' ? 'texte' : c.type === 'liste' || c.type === 'tableau' ? c.type :
    c.type === 'choix' ? ((c.valeurs || []).every(v => typeof v === 'number') ? 'nombre' : 'texte') : 'nombre';
  // Une date : saisie (type date), ou calculée (resultat: "date"). Pour les formules, c'est un nombre de jours ; natureDate
  // contrôle ce qu'on en fait (une date ± des jours, une date moins une date, mois(date, n)).
  const estDate = c => c.type === 'date' || (c.type === 'calcul' && c.resultat === 'date');
  const entree = c => ({ type: genre(c), valeurs: c.type === 'choix' ? c.valeurs : undefined, date: estDate(c) });
  // resultat : pour un nombre, ce que la formule doit donner : "date" (une date calculée), "nombre", ou "total".
  const formule = (ou, f, env, voulu, resultat) => {
    let a = null;
    try { a = OM.lire(f); } catch (e) { err(ou, ':', e.message); return null; }
    try {
      const t = OM.typer(a, env, f);
      if (t !== voulu) err(ou, ': « ' + f + ' » donne ' + (t === 'condition' ? 'une condition' : 'un ' + t) + ', il faut ' + (voulu === 'condition' ? 'une condition' : 'un nombre'));
      const nature = OM.natureDate(a, nom => !!(env.colonnes[nom] && env.colonnes[nom].date), f);
      if (t === 'nombre' && voulu === 'nombre') {
        if (resultat === 'date' && nature !== 'date') err(ou, ': « ' + f + ' » ne donne pas une date (une date ± des jours, ou mois(date, n))');
        else if (resultat === 'total' && nature === 'date') err(ou, ': « ' + f + ' » donne une date ; un total calculé donne un nombre');
        else if (resultat !== 'date' && resultat !== 'total' && nature === 'date') err(ou, ': « ' + f + ' » donne une date : écris resultat: "date" (affichée JJ/MM/AAAA)');
      }
    } catch (e) { err(ou, ':', e.message); }
    return a;
  };
  const verifierChoix = (ou, c) => {
    if (!Array.isArray(c.valeurs) || !c.valeurs.length) { err(ou, ': valeurs, une liste non vide'); return; }
    if (new Set(c.valeurs.map(String)).size !== c.valeurs.length) err(ou, ': valeurs en double');
    if (!c.valeurs.every(v => typeof v === 'number' && isFinite(v)) && !c.valeurs.every(texte)) err(ou, ': valeurs, toutes des nombres ou toutes des textes');
    if (c.libelles !== undefined && !(Array.isArray(c.libelles) && c.libelles.length === c.valeurs.length && c.libelles.every(texte))) err(ou, ': libelles, un texte par valeur');
    if (c.valeurs.some(v => /[,"]/.test(String(v)))) alerte(ou, ': une valeur avec une virgule ou un guillemet n\'a pas de liste déroulante dans Excel');
    if (c.couleurs !== undefined && !(Array.isArray(c.couleurs) && c.couleurs.length === c.valeurs.length &&
        c.couleurs.every(x => x === '' || x === null || OM.COULEURS.indexOf(x) >= 0))) err(ou, ': couleurs, une par valeur (' + OM.COULEURS.join(', ') + ', ou "")');
  };
  // Une valeur par défaut doit être une valeur permise (même contrôle qu'un fichier ouvert).
  const verifierDefaut = (ou, c) => {
    if (c.defaut === undefined) return;
    if (['calcul', 'liste', 'tableau'].indexOf(c.type) >= 0) { err(ou, ': pas de valeur par défaut pour le type', c.type); return; }
    const r = OM.examiner({ type: 'tableau', colonnes: [Object.assign({}, c, { id: 'x' })] }, { lignes: [{ x: c.defaut }] });
    if (r.problemes.length || OM.estVide(c.defaut)) err(ou, ': valeur par défaut', JSON.stringify(c.defaut), r.problemes.join(' ; '));
  };
  const verifierNiveaux = (ou, c) => {
    if (c.type !== 'calcul' && c.type !== 'nombre' && c.type !== 'total') { err(ou, ': niveaux seulement pour un nombre, un calcul ou un total'); return; }
    if (!Array.isArray(c.niveaux) || !c.niveaux.length) { err(ou, ': niveaux, une liste non vide'); return; }
    // max : jusqu'à max compris ; sous : en dessous de sous (strictement). Des bornes croissantes ; le dernier, sans borne.
    let avant = -Infinity, avantSous = false;
    c.niveaux.forEach((n, k) => {
      if (!n || !texte(n.libelle)) err(ou, ': niveau ' + (k + 1) + ', libellé manquant (une couleur a toujours son mot)');
      if (OM.COULEURS.indexOf(n && n.couleur) < 0) err(ou, ': niveau ' + (k + 1) + ', couleur (' + OM.COULEURS.join(', ') + ')');
      if (n && n.max !== undefined && n.sous !== undefined) err(ou, ': niveau ' + (k + 1) + ', max ou sous, pas les deux');
      Object.keys(n || {}).filter(x => ['max', 'sous', 'libelle', 'couleur'].indexOf(x) < 0).forEach(x => alerte(ou, ': niveau ' + (k + 1) + ', champ inconnu (ignoré)', x));
      const borne = n ? (n.sous !== undefined ? n.sous : n.max) : undefined;
      if (borne === undefined) { if (k !== c.niveaux.length - 1) err(ou, ': niveau ' + (k + 1) + ', seul le dernier peut être sans borne (max ou sous)'); }
      else if (!(typeof borne === 'number' && isFinite(borne) && (borne > avant || (borne === avant && avantSous && n.sous === undefined)))) err(ou, ': niveau ' + (k + 1) + ', bornes croissantes');
      else { avant = borne; avantSous = n.sous !== undefined; }
    });
  };
  const verifierAlertes = (ou, liste, env) => {
    if (liste === undefined) return;
    if (!Array.isArray(liste)) { err(ou, ': alertes, une liste'); return; }
    liste.forEach((a, k) => {
      const lieu = ou + ' alerte ' + (k + 1);
      if (!a || !texte(a.message)) err(lieu, ': message manquant');
      else if (nbMots(a.message) > 30) alerte(lieu, ': message long (' + nbMots(a.message) + ' mots, 30 au plus)');
      if (a && texte(a.si)) formule(lieu, a.si, env, 'condition'); else err(lieu, ': si manquant');
    });
  };
  // rubriques : dans un document, ses rubriques simples (texte, nombre, date, choix), lisibles par les formules du tableau.
  const verifierTableau = (ou, t, rubriques, defsRubriques) => {
    if (!Array.isArray(t.colonnes) || !t.colonnes.length) { err(ou, ': colonnes, une liste non vide'); return; }
    const ids = new Set(), env = { colonnes: Object.assign({}, rubriques || {}) }, deps = {};
    t.colonnes.forEach((c, k) => {
      const lieu = ou + ' colonne ' + ((c && c.id) || k + 1);
      if (!c || !/^[a-z][a-z0-9_]*$/.test(c.id || '') || OM.MOTS_RESERVES.indexOf(c.id) >= 0) err(lieu, ': id en a-z, 0-9, _ (pas un mot réservé : ' + OM.MOTS_RESERVES.join(', ') + ')');
      if (!c) return;
      if (ids.has(c.id)) err(lieu, ': id en double');
      if (rubriques && rubriques[c.id]) err(lieu, ': même nom qu\'une rubrique du document (la formule ne saurait pas laquelle lire)');
      ids.add(c.id);
      if (!texte(c.titre)) err(lieu, ': titre manquant');
      if (OM.TYPES_CHAMP.indexOf(c.type) < 0) err(lieu, ': type (' + OM.TYPES_CHAMP.join(', ') + ') :', c.type);
      if (c.couleurs !== undefined && c.type !== 'choix') err(lieu, ': couleurs seulement pour un choix');
      if (c.type === 'choix') verifierChoix(lieu, c);
      if (c.type === 'calcul' && !texte(c.formule)) err(lieu, ': formule manquante');
      if (c.type !== 'calcul' && c.formule !== undefined) err(lieu, ': formule seulement pour une colonne calculée');
      // resultat: "date" : une date calculée (JJ/MM/AAAA), sans niveaux (un niveau se lit sur un nombre).
      if (c.resultat !== undefined && (c.type !== 'calcul' || OM.RESULTATS.indexOf(c.resultat) < 0)) err(lieu, ': resultat ("nombre" ou "date") seulement pour une colonne calculée');
      if (c.resultat === 'date' && c.niveaux !== undefined) err(lieu, ': pas de niveaux sur une date calculée');
      // facultatif: true : une colonne saisie qu'on peut laisser vide partout (l'offre C), sans valeur par défaut.
      if (c.facultatif !== undefined && (c.facultatif !== true || c.type === 'calcul' || c.defaut !== undefined)) {
        err(lieu, ': facultatif: true, seulement pour une colonne saisie sans valeur par défaut');
      }
      if (c.largeur !== undefined && !(typeof c.largeur === 'number' && c.largeur > 0 && c.largeur <= 120)) err(lieu, ': largeur (Excel) de 1 à 120');
      Object.keys(c).filter(x => CHAMPS_COLONNE.indexOf(x) < 0).forEach(x => alerte(lieu, ': champ inconnu (ignoré)', x));
      env.colonnes[c.id] = entree(c);
    });
    t.colonnes.forEach(c => {
      if (!c) return;
      const lieu = ou + ' colonne ' + c.id;
      if (c.type === 'calcul' && texte(c.formule)) {
        const a = formule(lieu, c.formule, env, 'nombre', c.resultat === 'date' ? 'date' : 'nombre');
        if (a && OM.citees(a).indexOf(c.id) >= 0) err(lieu, ': la formule se cite elle-même');
        if (a) deps[c.id] = OM.citees(a).filter(x => t.colonnes.some(y => y && y.id === x && y.type === 'calcul'));
      }
      if (c.niveaux !== undefined) verifierNiveaux(lieu, c);
      verifierDefaut(lieu, c);
    });
    const etat = {}, boucle = id => {
      if (etat[id] === 1) return true;
      if (etat[id] === 2) return false;
      etat[id] = 1;
      const b = (deps[id] || []).some(boucle);
      etat[id] = 2;
      return b;
    };
    Object.keys(deps).forEach(id => { if (boucle(id)) err(ou, ': colonnes calculées en boucle, dont', id); });
    verifierAlertes(ou, t.alertes, env);
    // Les cases qui, vides, rendent un calcul vide : un seul message par ligne (formule Excel CHOISIR), 5 cases au plus.
    if (!Object.keys(deps).length || t.colonnes.every(c => !c || c.type !== 'calcul' || deps[c.id])) {
      try { if (OM.incompletes(t, defsRubriques || []).trop) err(ou, ': plus de ' + OM.MAX_CASES_VIDES + ' cases qui peuvent manquer à un calcul (le message des cases vides)'); }
      catch (e) { /* formule fausse : déjà signalée */ }
    }
    if (t.totaux !== undefined && !Array.isArray(t.totaux)) err(ou, ': totaux, une liste');
    // Un total calculé (calcul: "formule") lit les totaux qui ont un id, placés avant lui, et les rubriques simples du document.
    const totauxAvant = { colonnes: Object.assign({}, rubriques || {}) }, idsTotaux = new Set();
    (Array.isArray(t.totaux) ? t.totaux : []).forEach((x, k) => {
      const lieu = ou + ' total ' + (k + 1);
      if (!x || !texte(x.libelle)) err(lieu, ': libellé manquant');
      if (x && x.id !== undefined && (!/^[a-z][a-z0-9_]*$/.test(x.id) || OM.MOTS_RESERVES.indexOf(x.id) >= 0)) err(lieu, ': id en a-z, 0-9, _ (pas un mot réservé)');
      if (x && x.niveaux !== undefined) verifierNiveaux(lieu, Object.assign({}, x, { type: 'total' }));
      if (x) Object.keys(x).filter(y => CHAMPS_TOTAL.indexOf(y) < 0).forEach(y => alerte(lieu, ': champ inconnu (ignoré)', y));
      if (!x || OM.CALCULS_TOTAL.indexOf(x.calcul) < 0) { err(lieu, ': calcul (' + OM.CALCULS_TOTAL.join(', ') + ')'); return; }
      if (x.calcul === 'nombre' && x.colonne !== undefined) err(lieu, ': « nombre » compte des lignes, sans colonne (une condition va dans si)');
      if (x.calcul === 'formule') {
        if (x.colonne !== undefined || x.si !== undefined) err(lieu, ': un total calculé (formule) n\'a ni colonne ni si : il lit d\'autres totaux');
        if (!texte(x.formule)) err(lieu, ': formule manquante (ex. effort_doit / effort_prevu * 100)');
        else formule(lieu, x.formule, totauxAvant, 'nombre', 'total');
      } else {
        if (x.formule !== undefined) err(lieu, ': formule seulement pour calcul: "formule"');
        if (x.calcul !== 'nombre') {
          const c = env.colonnes[x.colonne];
          if (!c) err(lieu, ': colonne inconnue', x.colonne);
          else if (c.type !== 'nombre') err(lieu, ': la colonne', x.colonne, 'n\'est pas un nombre');
          else if (c.date) err(lieu, ': la colonne', x.colonne, 'est une date : un total (somme, moyenne, min, max) se calcule sur des nombres');
        }
        if (x.si !== undefined) {
          const a = formule(lieu, x.si, env, 'condition');
          if (a && OM.aMois(a)) err(lieu, ': mois() ne va pas dans le si d\'un total (Excel le refuse sur une plage) : passe par une colonne calculée');
        }
      }
      if (x.id !== undefined) {
        if (idsTotaux.has(x.id)) err(lieu, ': id en double', x.id);
        idsTotaux.add(x.id);
        totauxAvant.colonnes[x.id] = { type: 'nombre' };
      }
    });
    if (t.ligne !== undefined && !(t.ligne && texte(t.ligne.titre))) err(ou, ': ligne, { titre }');
    if (t.aideTotaux !== undefined && (!texte(t.aideTotaux) || !Array.isArray(t.totaux) || !t.totaux.length)) err(ou, ': aideTotaux, un texte sous des totaux');
    // Les lignes déjà écrites du modèle vide : des valeurs permises, comme un exemple.
    if (t.modele !== undefined) {
      if (!Array.isArray(t.modele) || !t.modele.length || t.modele.length > 20) err(ou, ': modele, 1 à 20 lignes');
      else OM.examiner({ type: 'tableau', colonnes: t.colonnes }, { lignes: t.modele }).problemes.forEach(pb => err(ou, ': modele,', pb));
    }
  };
  outils.forEach(def => {
    const id = def && def.id;
    if (!def || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id || '')) { err('outil : id', id); return; }
    if (idsOutils.has(id)) err('outil en double', id);
    else nommer(id, "l'outil");
    idsOutils.add(id);
    parType[def.type] = (parType[def.type] || 0) + 1;
    if (!idsSujets.has(def.sujet)) err(id, ': sujet inconnu', def.sujet);
    else if (range[id] !== def.sujet) err(id, ': le sujet « ' + def.sujet + ' » ne le range pas (data/outils/sujets.js)');
    if (!texte(def.titre) || !texte(def.resume) || !texte(def.quand)) err(id, ': titre, resume et quand');
    if (texte(def.resume) && (nbMots(def.resume) > 25 || (def.resume.match(/[.!?](\s|$)/g) || []).length > 1)) alerte(id, ': resume, une phrase courte (25 mots au plus)');
    if (!Array.isArray(def.etapes) || def.etapes.length < 1 || def.etapes.length > 3 || !def.etapes.every(texte)) err(id, ': etapes, 1 à 3 textes');
    else def.etapes.forEach((e, k) => { if (nbMots(e) > 25) alerte(id, ': étape ' + (k + 1) + ' longue (' + nbMots(e) + ' mots, 25 au plus)'); });
    if (!Array.isArray(def.cours)) err(id, ': cours, une liste de modules (vide si aucun)');
    (def.cours || []).forEach(m => {
      if (!modules.has(m)) err(id, ': cours inconnu', m);
      else if (!fs.existsSync(path.join(racine, 'data/cours', m + '.js'))) err(id, ': pas de fiche de cours pour', m);
    });
    if (def.export !== undefined && !(Array.isArray(def.export) && def.export.every(x => ['excel', 'copier', 'imprimer'].indexOf(x) >= 0))) err(id, ': export, parmi excel, copier, imprimer');
    Object.keys(def).filter(x => CHAMPS_OUTIL.indexOf(x) < 0).forEach(x => alerte(id, ': champ inconnu (ignoré)', x));
    if (def.type === 'tableau') verifierTableau(id, def, null);
    else if (def.type === 'matrice') {
      if (!def.ligne || !texte(def.ligne.titre)) err(id, ': ligne, { titre }');
      if (!def.colonne || !texte(def.colonne.titre)) err(id, ': colonne, { titre } (les colonnes, l\'élève les ajoute)');
      if (def.colonnes !== undefined || def.totaux !== undefined) err(id, ': une matrice n\'a ni colonnes fixes ni totaux');
      verifierChoix(id, def);
      if (def.aides !== undefined && !(Array.isArray(def.aides) && def.aides.length === (def.valeurs || []).length && def.aides.every(texte))) err(id, ': aides, un texte par valeur');
      verifierAlertes(id, def.alertes, { colonnes: {}, nb: def.valeurs || [] });
    } else if (def.type === 'document') {
      if (!Array.isArray(def.rubriques) || !def.rubriques.length) err(id, ': rubriques, une liste non vide');
      const env = { colonnes: {} }, ids = new Set(), simples = {};
      // Les rubriques simples d'abord : les formules des tableaux du document peuvent les lire.
      (def.rubriques || []).forEach(r => {
        if (r && /^[a-z][a-z0-9_]*$/.test(r.id || '') && ['texte', 'texte-long', 'nombre', 'date', 'choix'].indexOf(r.type) >= 0) {
          simples[r.id] = entree(r);
        }
      });
      (def.rubriques || []).forEach((r, k) => {
        const lieu = id + ' rubrique ' + ((r && r.id) || k + 1);
        if (!r || !/^[a-z][a-z0-9_]*$/.test(r.id || '') || OM.MOTS_RESERVES.indexOf(r.id) >= 0) { err(lieu, ': id en a-z, 0-9, _ (pas un mot réservé)'); return; }
        if (ids.has(r.id)) err(lieu, ': id en double');
        ids.add(r.id);
        if (!texte(r.titre)) err(lieu, ': titre manquant');
        if (OM.TYPES_RUBRIQUE.indexOf(r.type) < 0) err(lieu, ': type (' + OM.TYPES_RUBRIQUE.join(', ') + ') :', r.type);
        if (r.type === 'choix') verifierChoix(lieu, r);
        else if (r.couleurs !== undefined) err(lieu, ': couleurs seulement pour un choix');
        if (r.type === 'tableau') verifierTableau(lieu, r, simples, def.rubriques);
        else if (r.colonnes !== undefined || r.alertes !== undefined || r.totaux !== undefined || r.modele !== undefined || r.aideTotaux !== undefined) {
          err(lieu, ': colonnes, alertes, totaux, modele et aideTotaux seulement pour une rubrique « tableau »');
        }
        if ((r.type === 'tableau' || r.type === 'liste') && r.ligne !== undefined && !(r.ligne && texte(r.ligne.titre))) err(lieu, ': ligne, { titre }');
        Object.keys(r).filter(x => CHAMPS_RUBRIQUE.indexOf(x) < 0).forEach(x => alerte(lieu, ': champ inconnu (ignoré)', x));
        verifierDefaut(lieu, r);
        env.colonnes[r.id] = entree(r);
      });
      // Un total qui a un id se lit dans les alertes du document (« total_atterrissage > plafond »).
      (def.rubriques || []).forEach(r => (r && r.type === 'tableau' && Array.isArray(r.totaux) ? r.totaux : []).forEach(x => {
        if (!x || x.id === undefined) return;
        if (env.colonnes[x.id]) err(id, ': le total', x.id, 'a le même nom qu\'une rubrique ou qu\'un autre total');
        env.colonnes[x.id] = { type: 'nombre' };
      }));
      verifierAlertes(id, def.alertes, env);
      if (def.totaux !== undefined) err(id, ': les totaux d\'un document vont dans sa rubrique « tableau »');
    } else { err(id, ': type (tableau, document, matrice) :', def.type); return; }
    // L'exemple : rempli, conforme aux colonnes et aux valeurs permises ; les sorties se font sans erreur.
    if (!def.exemple || !texte(def.exemple.nom)) { err(id, ': exemple { nom, … } manquant'); return; }
    const contenu = Object.assign({}, def.exemple);
    delete contenu.nom;
    if (contenu.date !== undefined && OM.jour(contenu.date) === null) err(id, ': exemple.date, une date AAAA-MM-JJ (la date à laquelle l\'exemple se lit)');
    delete contenu.date;
    const r = OM.examiner(def, contenu);
    r.problemes.forEach(pb => err(id, ': exemple,', pb));
    if (!r.contenu) return;
    if (OM.estVide(r.contenu)) err(id, ': exemple vide');
    try {
      const doc = { nom: def.exemple.nom, contenu: r.contenu };
      OM.suivi(def, doc.contenu); OM.texteDocument(def, doc); OM.htmlDocument(def, doc);
      OM.xlsx(OM.classeur(def, doc)); OM.xlsx(OM.classeur(def, null));
    } catch (e) { err(id, ': sorties (texte, HTML, Excel) :', e.message); }
  });
  Object.keys(range).forEach(o => { if (!idsOutils.has(o)) err('sujet', range[o], ': outil inconnu', o); });
  console.log(`outils ${outils.length} (${Object.keys(parType).map(t => t + ' ' + parType[t]).join(', ')}) · ${sujets.length} sujets`);
}
console.log(`total ${ids.size} questions · ${erreurs} erreur(s) · ${alertes} alerte(s)`);
process.exitCode = erreurs ? 1 : 0;
