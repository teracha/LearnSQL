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
console.log(`total ${ids.size} questions · ${erreurs} erreur(s) · ${alertes} alerte(s)`);
process.exitCode = erreurs ? 1 : 0;
