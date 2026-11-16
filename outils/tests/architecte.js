// Conseils d'architecte (#/architecte, docs/architecte.md), sans compte : la carte sur la page Outils ; la liste par
// famille (titre, résumé, nombre de questions et de cases cochées ; « Aller à » une famille) ; la recherche (« je crée une
// table pour les commandes EDI » → creer-table en 1er ; une réponse peu sûre ; aucune réponse et « regarde toute la
// liste » ; « Nouvelle recherche » garde la phrase) ; une situation (l'exemple avant la checklist, le code du moteur
// choisi, les étapes repliables et leurs questions, les notes des moteurs, « Voir aussi », les sources) ; le sélecteur de
// moteur (notes, questions « seulement », étapes renumérotées, exemple) ; cocher (gardé après rechargement), les comptes
// par étape et en tout, l'étape ouverte par défaut ; « Tout décocher » (et « Annuler ») ; « Copier la checklist » (le
// presse-papiers, puis ses replis) ; une question retirée des données et un stockage illisible ; le navigateur qui refuse
// d'enregistrer ; 390 px sans débordement ; aucune erreur JavaScript.
// Les attendus sont lus dans les données (LEARNSQL.architecte) : le nombre de situations va grandir. Des situations
// d'essai, injectées dans la page, couvrent ce que les vraies n'ont pas encore (une question « seulement », d'autres
// familles, un exemple sans code, des liens vers une situation à venir et vers un outil réservé). Les droits :
// outils/tests/outils.js.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  let refuser = false;   // true : la prochaine question (confirm) reçoit « Annuler »
  const dialogues = []; p.on('dialog', d => { dialogues.push(d.message()); if (refuser) d.dismiss(); else d.accept(); });
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  // Le presse-papiers simulé : __refus = 0, il marche ; 1, il refuse (repli : execCommand) ; 2, tout refuse.
  await p.addInitScript(() => {
    window.__copie = null; window.__repli = null; window.__refus = 0;
    try {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: t => { if (window.__refus) return Promise.reject(new Error('refusé')); window.__copie = t; return Promise.resolve(); }
      } });
    } catch (e) { /* ignoré */ }
    const exec = document.execCommand.bind(document);
    document.execCommand = (c, ...r) => {
      if (c !== 'copy') return exec(c, ...r);
      if (window.__refus === 2) return false;
      const t = Array.from(document.querySelectorAll('body > textarea')).pop();
      window.__repli = t ? t.value : null;
      return true;
    };
  });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const verifier = (ok, m) => { if (!ok) errs.push(m); };
  const attendre = ms => p.waitForTimeout(ms || 120);
  const net = t => String(t || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();   // le texte vu (espaces insécables comprises)
  const brut = t => net(String(t || '').replace(/`/g, ''));                              // un texte des données, sans accents graves
  const texte = s => p.$eval(s, x => x.textContent).then(net).catch(() => '');
  const aller = async h => { await p.evaluate(x => { location.hash = x; }, h); await attendre(150); };
  const moteur = async m => { await p.click('.moteur[data-moteur="' + m + '"]'); await attendre(100); };
  const chercher = async q => { await p.fill('#ar-q', q); await attendre(100); return p.$$eval('#ar-res .ar-carte', xs => xs.map(x => x.getAttribute('href'))); };
  // Ni la page ni un élément ne dépassent à droite (un code long défile dans son cadre <pre>).
  const largeur = async ou => {
    const r = await p.evaluate(() => {
      const l = innerWidth, trop = [];
      document.querySelectorAll('body *').forEach(e => {
        if (e.closest('pre')) return;
        const b = e.getBoundingClientRect();
        if (b.width && b.right > l + 1 && getComputedStyle(e).position !== 'absolute') trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right));
      });
      return { l: l, sw: document.documentElement.scrollWidth, trop: trop.slice(0, 4) };
    });
    verifier(r.sw <= r.l && !r.trop.length, ou + ' : la page déborde ' + JSON.stringify(r));
  };
  const NOMS = { sqlserver: 'SQL Server', snowflake: 'Snowflake', mysql: 'MySQL' }, MOTEURS = Object.keys(NOMS);
  const listeEt = l => l.length > 1 ? l.slice(0, -1).join(', ') + ' et ' + l[l.length - 1] : l[0];
  const visible = (q, m) => m === 'tous' || !q.seulement || q.seulement.indexOf(m) >= 0;
  // Les étapes attendues pour un moteur : celles qui ont une question visible, numérotées de 1 à n.
  const etapesDe = (s, m) => s.etapes.map((e, i) => ({ i: i, titre: e.titre, qs: e.questions.filter(q => visible(q, m)) })).filter(e => e.qs.length);
  const nbQuestions = (s, m) => etapesDe(s, m).reduce((n, e) => n + e.qs.length, 0);
  const coches = (n, total) => n + (n > 1 ? ' cochées' : ' cochée') + ' sur ' + total;
  // Le texte attendu de « Copier la checklist ».
  const copieAttendue = (s, m, c) => {
    const et = etapesDe(s, m), total = nbQuestions(s, m), n = et.reduce((k, e) => k + e.qs.filter(q => c[q.id]).length, 0);
    const l = [s.titre.replace(/`/g, '') + ' : la checklist (' + (m === 'tous' ? 'SQL Server, Snowflake et MySQL' : NOMS[m]) + ')', coches(n, total)];
    et.forEach((e, k) => {
      l.push('', (k + 1) + '. ' + e.titre.replace(/`/g, ''));
      e.qs.forEach(q => l.push((c[q.id] ? '[x] ' : '[ ] ') + q.q.replace(/`/g, '') +
        (m === 'tous' && q.seulement ? ' (seulement sur ' + listeEt(q.seulement.map(x => NOMS[x])) + ')' : '')));
    });
    return l.join('\n');
  };
  // Ce que montre la page d'une situation.
  const lu = () => p.evaluate(() => {
    const t = x => x ? x.textContent.replace(/ /g, ' ').replace(/\s+/g, ' ').trim() : '';
    const ex = document.getElementById('ar-exemple');
    return {
      h1: t(document.querySelector('h1')), tags: Array.from(document.querySelectorAll('.tags .tag')).map(t),
      resume: t(document.querySelector('.ar-resume')), total: t(document.getElementById('ar-total')),
      barre: document.getElementById('ar-barre').style.width,
      exTexte: t(ex.querySelector('p')), exLabels: Array.from(ex.querySelectorAll('p.label')).map(t),
      exPre: Array.from(ex.querySelectorAll(':scope > pre')).map(x => x.textContent),
      exVariantes: Array.from(ex.querySelectorAll('details.ar-variante')).map(d => ({ titre: t(d.querySelector('summary')), code: d.querySelector('pre').textContent, open: d.open })),
      avantChecklist: !!(ex.compareDocumentPosition(document.getElementById('ar-etapes')) & Node.DOCUMENT_POSITION_FOLLOWING),
      etapes: Array.from(document.querySelectorAll('details.ar-etape')).map(d => ({
        i: d.getAttribute('data-etape'), titre: t(d.querySelector('.ar-etape-titre')), compte: t(d.querySelector('.ar-etape-compte')),
        open: d.open, complete: d.classList.contains('ar-complete'),
        qs: Array.from(d.querySelectorAll('.ar-q')).map(li => ({ id: li.querySelector('input').getAttribute('data-q'), coche: li.querySelector('input').checked,
          fait: li.classList.contains('ar-fait'), q: t(li.querySelector('.ar-texte')), seul: t(li.querySelector('.ar-seul')),
          label: t(li.querySelector('input').closest('label')),
          detail: Array.from(li.querySelectorAll('.ar-detail > p:not(.ar-seul):not(.ar-note)')).map(t),
          notes: Array.from(li.querySelectorAll('.ar-note')).map(t), code: (li.querySelector('.ar-detail pre') || {}).textContent || '' }))
      })),
      ouvrir: t(document.getElementById('ar-ouvrir')),
      voirSit: Array.from(document.querySelectorAll('.ar-voir-situations a')).map(a => a.getAttribute('href')),
      voirDico: Array.from(document.querySelectorAll('.ar-voir-dico a')).map(a => a.getAttribute('href')),
      voirOutils: Array.from(document.querySelectorAll('.ar-voir-outils a')).map(a => a.getAttribute('href')),
      pieges: Array.from(document.querySelectorAll('.ar-pieges li')).map(t), pratique: t(document.querySelector('.feedback.pratique')),
      sources: Array.from(document.querySelectorAll('.ar-sources a')).map(a => a.getAttribute('href')),
      h2: Array.from(document.querySelectorAll('#app h2')).map(t), msg: t(document.getElementById('ar-msg')),
      stockage: !document.getElementById('ar-stockage').hidden, copie: document.getElementById('ar-copie').hidden ? null : document.getElementById('ar-copie').value
    };
  });
  const stocke = () => p.evaluate(() => { try { return JSON.parse(localStorage.getItem('learnsql-architecte')); } catch (e) { return 'illisible'; } });
  const cocher = async (id, oui) => { await p.setChecked('input[data-q="' + id + '"]', oui !== false); await attendre(60); };
  const ouvrirEtape = async i => { if (!(await p.$eval('details[data-etape="' + i + '"]', d => d.open))) { await p.click('details[data-etape="' + i + '"] > summary'); await attendre(80); } };

  // 1. La carte sur la page Outils, sans compte
  await p.goto(U + '#/outils'); await attendre(200);
  const carte = await p.$('.o-carte[href="#/architecte"]');
  verifier(carte && /Conseils d'architecte/.test(await carte.textContent()), 'pas de carte « Conseils d\'architecte » sur la page Outils (sans compte)');
  await p.click('.o-carte[href="#/architecte"]'); await attendre();
  verifier(await texte('h1') === 'Conseils d\'architecte', 'la carte ne mène pas aux conseils : ' + await texte('h1'));
  verifier(/je crée une table pour les commandes EDI/.test(await p.getAttribute('#ar-q', 'placeholder')), 'texte d\'exemple de la recherche');
  verifier((await p.$$eval('.moteurs .moteur', xs => xs.map(x => x.textContent))).join() === 'Tous,SQL Server,Snowflake,MySQL', 'sélecteur de moteur');
  await moteur('tous');
  const D = await p.evaluate(() => JSON.parse(JSON.stringify(LEARNSQL.architecte)));
  const T = D.filter(s => s.id === 'creer-table')[0];
  verifier(D.length >= 1 && T, 'données : pas de situation creer-table');

  // 2. Sans phrase : toutes les situations, par famille (dans l'ordre), avec leur nombre de questions et de cases cochées
  const ORDRE = ['Concevoir', 'Écrire et charger', 'Interroger', 'Exploiter'];
  const listeVue = () => p.evaluate(() => ({
    h2: Array.from(document.querySelectorAll('#ar-res h2')).map(x => x.textContent),
    cartes: Array.from(document.querySelectorAll('#ar-res .ar-carte')).map(a => ({ href: a.getAttribute('href'),
      titre: a.querySelector('strong').textContent, compte: a.querySelector('.ar-compte').textContent.replace(/\s+/g, ' ').trim() })),
    aller: Array.from(document.querySelectorAll('#ar-res .ar-familles button')).map(x => x.textContent) }));
  let L = await listeVue();
  const famillesAttendues = situations => ORDRE.filter(f => situations.some(s => s.famille === f));
  verifier(L.h2.join('|') === famillesAttendues(D).join('|'), 'familles : ' + L.h2.join('|'));
  verifier(L.cartes.length === D.length && D.every(s => L.cartes.some(c => c.href === '#/architecte/' + s.id && c.titre === s.titre &&
    c.compte === nbQuestions(s, 'tous') + ' questions · 0 cochée')), 'liste : ' + JSON.stringify(L.cartes.slice(0, 3)));
  verifier(/situations?\. Écris ta situation, ou choisis dans la liste\./.test(await texte('#ar-res > p.muted')), 'phrase de la liste : ' + await texte('#ar-res > p.muted'));
  await largeur('liste des situations');

  // 3. La recherche : la phrase de l'exemple ; aucune réponse ; « regarde toute la liste »
  let res = await chercher('je crée une table pour les commandes edi');
  console.log('« je crée une table pour les commandes edi » →', res.slice(0, 3).join(', '));
  verifier(res[0] === '#/architecte/creer-table', 'creer-table n\'est pas en 1er : ' + res.join(', '));
  verifier(/Concevoir/.test(await texte('#ar-res .ar-carte .tag')), 'une carte de la recherche sans sa famille');
  await largeur('résultats de la recherche');
  res = await chercher('zzqxw');
  verifier(!res.length && await texte('#ar-aucune') === 'Aucune situation ne correspond. Essaie d\'autres mots, ou regarde toute la liste.', 'aucune réponse : ' + await texte('#ar-res'));
  await p.click('#ar-aucune .ar-tout'); await attendre();
  verifier(await p.inputValue('#ar-q') === '' && (await p.$$('#ar-res .ar-carte')).length === D.length, '« regarde toute la liste » ne vide pas la recherche');
  // « Nouvelle recherche » (depuis une situation) garde la phrase
  await chercher('je crée une table pour les commandes edi');
  await p.click('#ar-res a[href="#/architecte/creer-table"]'); await attendre(150);
  await p.click('.actions a[href="#/architecte"]'); await attendre(150);
  verifier(await p.inputValue('#ar-q') === 'je crée une table pour les commandes edi' && (await p.$$('#ar-res .ar-carte')).length >= 1, 'la phrase n\'est pas gardée');

  // 4. Une situation (Tous) : le titre, la famille, le résumé, l'exemple AVANT la checklist, les étapes, les notes
  await aller('#/architecte/creer-table');
  let v = await lu();
  verifier(v.h1 === T.titre && v.tags.join() === T.famille && v.resume === brut(T.resume), 'titre, famille ou résumé : ' + v.h1 + ' / ' + v.tags + ' / ' + v.resume);
  verifier(v.avantChecklist && v.h2.indexOf('L\'exemple') < v.h2.indexOf('La checklist'), 'l\'exemple n\'est pas avant la checklist : ' + v.h2.join('|'));
  verifier(v.exTexte === brut(T.exemple.texte), 'texte de l\'exemple : ' + v.exTexte);
  const variantes = MOTEURS.slice(1).filter(m => (T.exemple.codes || {})[m]);
  verifier(v.exPre.length === (T.exemple.code ? 1 : 0) && (!T.exemple.code || v.exPre[0] === T.exemple.code), 'code SQL Server de l\'exemple (Tous)');
  verifier(v.exVariantes.length === variantes.length && v.exVariantes.every((x, k) => x.titre === 'Le code · ' + NOMS[variantes[k]] &&
    x.code === T.exemple.codes[variantes[k]] && !x.open), 'les autres écritures de l\'exemple, repliées : ' + JSON.stringify(v.exVariantes.map(x => x.titre)));
  const ET = etapesDe(T, 'tous');
  verifier(v.etapes.length === ET.length && v.etapes.every((e, k) => e.titre === (k + 1) + '. ' + ET[k].titre && e.qs.length === ET[k].qs.length &&
    e.qs.every((q, j) => q.id === ET[k].qs[j].id && q.q === brut(ET[k].qs[j].q))), 'les étapes et leurs questions : ' + JSON.stringify(v.etapes.map(e => e.titre + ' ' + e.qs.length)));
  verifier(v.total === coches(0, nbQuestions(T, 'tous')) && v.barre === '0%', 'le total : ' + v.total + ' ' + v.barre);
  verifier(v.etapes.every(e => e.compte === '0 / ' + e.qs.length + ' cochées'), 'le compte des étapes : ' + v.etapes.map(e => e.compte).join(', '));
  verifier(v.etapes[0].open && v.etapes.slice(1).every(e => !e.open) && v.ouvrir === 'Ouvrir toutes les étapes', 'l\'étape ouverte par défaut (la 1re pas finie) : ' +
    v.etapes.map(e => e.open).join());
  // Chaque question : la case et la question (son étiquette), « Pourquoi : », « Le bon réflexe : », les notes (Tous : les 3, avec leur nom), le code
  const Q = [].concat(...ET.map(e => e.qs)), VQ = [].concat(...v.etapes.map(e => e.qs));
  verifier(VQ.every((q, k) => q.label === q.q && q.detail[0] === 'Pourquoi : ' + brut(Q[k].pourquoi) && q.detail[1] === 'Le bon réflexe : ' + brut(Q[k].reflexe) &&
    q.notes.join('|') === MOTEURS.filter(m => (Q[k].moteurs || {})[m]).map(m => NOMS[m] + ' : ' + brut(Q[k].moteurs[m])).join('|') &&
    q.code === (Q[k].code || '')), 'le détail d\'une question (Tous) : ' + JSON.stringify(VQ.filter((q, k) => q.notes.length !== MOTEURS.filter(m => (Q[k].moteurs || {})[m]).length).slice(0, 1)));
  verifier(VQ.some(q => q.notes.length === 3), 'données : aucune question de creer-table n\'a les notes des 3 moteurs');
  // Les pièges, « En pratique », « Voir aussi » (seulement ce qui existe), les sources
  verifier(v.pieges.join('|') === T.pieges.map(brut).join('|') && (!T.pratique || v.pratique === 'En pratique : ' + brut(T.pratique)), 'pièges ou « En pratique »');
  const sitAttendues = (T.voirAussi || []).filter(id => D.some(s => s.id === id)).map(id => '#/architecte/' + id);
  const dicoAttendu = await p.evaluate(l => l.filter(id => LEARNSQL.dico.some(f => f.id === id && f.domaine !== 'divalto')).map(id => '#/dico/' + id), T.dico || []);
  // Les outils : ceux des sujets publics (sans compte), un lien (« #/mots-reserves ») ou une définition (« #/outils/<id> »).
  const outilsAttendus = await p.evaluate(ids => ids.map(id => {
    let lien = null;
    LEARNSQL.outilsSujets.filter(s => LEARNSQL.outilsPublics.indexOf(s.id) >= 0).forEach(s => (s.outils || []).forEach(x => {
      if (x === id) lien = '#/outils/' + id; else if (x && x.id === id) lien = x.lien;
    }));
    return lien;
  }).filter(Boolean), T.outils || []);
  verifier(v.voirSit.join() === sitAttendues.join() && v.voirDico.join() === dicoAttendu.join() && v.voirDico.length >= 1 &&
    v.voirOutils.join() === outilsAttendus.join(), '« Voir aussi » : ' + JSON.stringify([v.voirSit, v.voirDico, v.voirOutils]));
  verifier(v.sources.join() === T.sources.map(x => x.url).join() && await p.$$eval('.ar-sources a', xs => xs.every(a => a.target === '_blank')), 'les sources');
  // « Aller à » : la page défile jusqu'à la checklist, qui prend le focus
  await p.click('.ar-aller [data-aller="ar-checklist"]'); await attendre();
  verifier(await p.evaluate(() => { const t = document.getElementById('ar-checklist').getBoundingClientRect().top; return document.activeElement.id === 'ar-checklist' && t >= 0 && t < innerHeight - 40; }),
    '« Aller à : La checklist »');
  await p.click('#ar-ouvrir'); await attendre();
  v = await lu();
  verifier(v.etapes.every(e => e.open) && v.ouvrir === 'Fermer toutes les étapes', '« Ouvrir toutes les étapes »');
  await largeur('une situation (Tous, toutes les étapes ouvertes)');
  await p.click('#ar-ouvrir'); await attendre();
  verifier((await lu()).etapes.every(e => !e.open), '« Fermer toutes les étapes »');
  await p.click('#ar-ouvrir'); await attendre();

  // 5. Le moteur choisi : sa note seulement, son code ; « Tous » de nouveau : tout. Le choix est gardé (learnsql-dico-moteur).
  for (const m of MOTEURS) {
    await moteur(m);
    v = await lu();
    const VQm = [].concat(...v.etapes.map(e => e.qs)), Qm = [].concat(...etapesDe(T, m).map(e => e.qs));
    verifier(VQm.length === Qm.length && VQm.every((q, k) => q.notes.join('|') === ((Qm[k].moteurs || {})[m] ? NOMS[m] + ' : ' + brut(Qm[k].moteurs[m]) : '')),
      m + ' : les notes des moteurs : ' + JSON.stringify(VQm.filter(q => q.notes.length > 1).slice(0, 1)));
    const code = m === 'sqlserver' ? T.exemple.code : ((T.exemple.codes || {})[m] || T.exemple.code);
    verifier(v.exPre.length === 1 && v.exPre[0] === code && !v.exVariantes.length && v.exLabels.join() === (m === 'sqlserver' && !variantes.length ? 'Le code' : 'Le code · ' + NOMS[m]),
      m + ' : le code de l\'exemple : ' + v.exLabels.join());
    verifier(v.etapes.every(e => e.open), m + ' : les étapes ouvertes ne restent pas ouvertes');
  }
  verifier(await p.evaluate(() => localStorage.getItem('learnsql-dico-moteur')) === 'mysql', 'le moteur choisi n\'est pas gardé');
  await moteur('tous');

  // 6. Cocher : 3 cases (2 de l'étape 1, 1 de l'étape 2) ; les comptes ; gardées dans le navigateur et après rechargement
  const e1 = ET[0], e2 = ET[1];
  await cocher(e1.qs[0].id); await cocher(e1.qs[1].id); await cocher(e2.qs[0].id);
  const trois = {}; [e1.qs[0].id, e1.qs[1].id, e2.qs[0].id].forEach(id => { trois[id] = true; });
  const total = nbQuestions(T, 'tous');
  v = await lu();
  verifier(v.total === coches(3, total) && v.barre === Math.round(300 / total) + '%', '3 cases : le total ' + v.total + ' ' + v.barre);
  verifier(v.etapes[0].compte === '2 / ' + e1.qs.length + ' cochées' && v.etapes[1].compte === '1 / ' + e2.qs.length + ' cochées' && !v.etapes[0].complete,
    '3 cases : les comptes des étapes ' + v.etapes.map(e => e.compte).join(', '));
  verifier([].concat(...v.etapes.map(e => e.qs)).every(q => q.coche === !!trois[q.id] && q.fait === !!trois[q.id]), '3 cases : les questions cochées');
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ 'creer-table': trois }), 'learnsql-architecte : ' + JSON.stringify(await stocke()));
  await p.reload(); await attendre(250);
  v = await lu();
  verifier(v.total === coches(3, total) && [].concat(...v.etapes.map(e => e.qs)).filter(q => q.coche).map(q => q.id).sort().join() === Object.keys(trois).sort().join(),
    'après rechargement : ' + v.total);
  await largeur('une situation, 3 cases cochées');
  await aller('#/architecte'); await p.fill('#ar-q', ''); await attendre();
  L = await listeVue();
  verifier(L.cartes.filter(c => c.href === '#/architecte/creer-table')[0].compte === total + ' questions · 3 cochées', 'la liste ne compte pas les cases cochées');
  // L'étape 1 finie : elle passe au vert, et au rechargement c'est l'étape 2 qui s'ouvre
  await aller('#/architecte/creer-table');
  for (const q of e1.qs) await cocher(q.id);
  v = await lu();
  verifier(v.etapes[0].complete && v.etapes[0].compte === e1.qs.length + ' / ' + e1.qs.length + ' cochées', 'étape 1 finie : ' + v.etapes[0].compte);
  await p.reload(); await attendre(250);
  v = await lu();
  verifier(!v.etapes[0].open && v.etapes[1].open, 'après rechargement, l\'étape ouverte n\'est pas la 1re pas finie : ' + v.etapes.map(e => e.open).join());
  for (const q of e1.qs.slice(2)) { await ouvrirEtape(0); await cocher(q.id, false); }
  verifier((await lu()).total === coches(3, total), 'décocher une case : ' + (await lu()).total);

  // 7. « Copier la checklist » : les questions seulement, par étape, pour le moteur choisi ; puis les replis
  await moteur('sqlserver');
  await p.click('#ar-copier'); await attendre(150);
  let copie = await p.evaluate(() => window.__copie);
  verifier(copie === copieAttendue(T, 'sqlserver', trois) && !/Pourquoi/.test(copie), 'la copie (SQL Server) :\n' + copie);
  verifier((await lu()).msg === 'Copié : la checklist est prête à coller.', 'message de la copie : ' + (await lu()).msg);
  await moteur('tous');
  await p.evaluate(() => { window.__refus = 1; });
  await p.click('#ar-copier'); await attendre(150);
  verifier(await p.evaluate(() => window.__repli) === copieAttendue(T, 'tous', trois) && (await lu()).msg === 'Copié : la checklist est prête à coller.', 'copie par le repli (execCommand)');
  await p.evaluate(() => { window.__refus = 2; });
  await p.click('#ar-copier'); await attendre(150);
  v = await lu();
  verifier(v.msg === 'Copie impossible. Le texte est ci-dessous : copie-le à la main.' && v.copie === copieAttendue(T, 'tous', trois) &&
    await p.evaluate(() => document.activeElement.id === 'ar-copie'), 'copie impossible : le texte à copier à la main ' + v.msg);
  await largeur('copie impossible (le texte affiché)');
  await p.evaluate(() => { window.__refus = 0; });

  // 8. « Tout décocher » : « Annuler » ne change rien ; « OK » décoche tout (et la situation quitte le stockage)
  refuser = true; await p.click('#ar-decocher'); await attendre(); refuser = false;
  verifier(/Décocher toutes les cases de « Je crée une table » \?/.test(dialogues[dialogues.length - 1] || '') && (await lu()).total === coches(3, total), '« Tout décocher » puis « Annuler »');
  await p.click('#ar-decocher'); await attendre();
  v = await lu();
  verifier(v.total === coches(0, total) && v.msg === 'C\'est fait : toutes les cases sont décochées.' && [].concat(...v.etapes.map(e => e.qs)).every(q => !q.coche && !q.fait) &&
    v.etapes.every(e => e.compte === '0 / ' + e.qs.length + ' cochées') && v.copie === null, '« Tout décocher » : ' + v.total + ' ' + v.msg);
  verifier(JSON.stringify(await stocke()) === '{}', 'après « Tout décocher », le stockage : ' + JSON.stringify(await stocke()));
  const nbDialogues = dialogues.length;
  await p.click('#ar-decocher'); await attendre();
  verifier((await lu()).msg === 'Aucune case n\'est cochée.' && dialogues.length === nbDialogues, '« Tout décocher » sans case cochée');

  // 9. Une question retirée des données : sa case est oubliée, sans erreur ; un stockage illisible : la page marche
  await p.evaluate(id => localStorage.setItem('learnsql-architecte', JSON.stringify({ 'creer-table': { [id]: true, 'question-retiree': true }, 'situation-retiree': { x: true } })), e1.qs[0].id);
  await p.reload(); await attendre(250);
  verifier((await lu()).total === coches(1, total), 'une question retirée compte encore : ' + (await lu()).total);
  await ouvrirEtape(ET[0].i); await cocher(e1.qs[1].id);
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ 'creer-table': { [e1.qs[0].id]: true, [e1.qs[1].id]: true }, 'situation-retiree': { x: true } }),
    'la question retirée n\'est pas oubliée : ' + JSON.stringify(await stocke()));
  await p.evaluate(() => localStorage.setItem('learnsql-architecte', 'pas du JSON'));
  await p.reload(); await attendre(250);
  verifier((await lu()).total === coches(0, total), 'stockage illisible : ' + (await lu()).total);
  await ouvrirEtape(ET[0].i); await cocher(e1.qs[0].id);
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ 'creer-table': { [e1.qs[0].id]: true } }), 'stockage illisible, puis une case : ' + JSON.stringify(await stocke()));
  await p.evaluate(() => localStorage.removeItem('learnsql-architecte'));

  // 10. Des situations d'essai : une question « seulement », d'autres familles, un exemple sans code, des liens vers une
  // situation à venir, une fiche inconnue et un outil réservé (la Gestion de projet, sans compte)
  const ESSAI = [{
    id: 'essai-moteurs', titre: 'Je teste les moteurs', famille: 'Exploiter', resume: 'Une situation d\'essai, sans code.',
    besoins: ['je teste les moteurs', 'essai des moteurs'], essais: ['tester moteurs', 'moteurs essai'],
    exemple: { texte: 'Un exemple sans code.' },
    etapes: [
      { titre: 'Pour tous', questions: [
        { id: 'tous', q: 'Une question pour tous ?', pourquoi: 'P1.', reflexe: 'R1.' },
        { id: 'sf', q: 'Une question `QUALIFY` zorglub ?', pourquoi: 'P2.', reflexe: 'R2.', seulement: ['snowflake'], moteurs: { snowflake: 'La note Snowflake.' } }] },
      { titre: 'Deux moteurs', questions: [
        { id: 'ss-my', q: 'Une question SQL Server et MySQL ?', pourquoi: 'P3.', reflexe: 'R3.', seulement: ['sqlserver', 'mysql'], code: 'SELECT 1;' }] },
      { titre: 'MySQL seul', questions: [{ id: 'my', q: 'Une question MySQL ?', pourquoi: 'P4.', reflexe: 'R4.', seulement: ['mysql'] }] }
    ],
    pieges: ['Piège 1.', 'Piège 2.', 'Piège 3.'], motsCles: ['essai', 'moteurs', 'test', 'seulement', 'note', 'code'],
    voirAussi: ['creer-table', 'situation-pas-encore-ecrite'], dico: ['create-table', 'pas-une-fiche'], outils: ['mots-reserves', 'gp-risques'],
    sources: [{ titre: 'Source', url: 'https://example.com/a' }]
  }, {
    id: 'essai-interroger', titre: 'J\'interroge pour l\'essai', famille: 'Interroger', resume: 'Une autre famille.',
    besoins: ['j interroge pour l essai', 'interroger essai'], essais: ['essai interroger', 'interrogation'],
    exemple: { texte: 'Texte.', code: 'SELECT 2;' },
    etapes: [1, 2, 3].map(n => ({ titre: 'Étape ' + n, questions: [{ id: 'q' + n, q: 'Question ' + n + ' ?', pourquoi: 'P.', reflexe: 'R.' }] })),
    pieges: ['a', 'b', 'c'], motsCles: ['a', 'b', 'c', 'd', 'e', 'f'], sources: [{ titre: 'S', url: 'https://example.com/b' }]
  }];
  await p.evaluate(l => { l.forEach(s => LEARNSQL.architecte.push(s)); location.hash = '#/architecte'; }, ESSAI);
  await attendre(200);
  await p.fill('#ar-q', ''); await attendre();
  const D2 = D.concat(ESSAI);
  L = await listeVue();
  verifier(L.h2.join('|') === famillesAttendues(D2).join('|') && L.aller.join('|') === famillesAttendues(D2).join('|') && L.cartes.length === D2.length,
    'liste avec les situations d\'essai : ' + L.h2.join('|') + ' / ' + L.aller.join('|'));
  verifier(L.cartes.filter(c => c.href === '#/architecte/essai-moteurs')[0].compte === '4 questions · 0 cochée', 'Tous : une question « seulement » compte');
  await p.click('#ar-res .ar-familles [data-aller="ar-f-' + (famillesAttendues(D2).length - 1) + '"]'); await attendre();
  verifier(await p.evaluate(() => (document.activeElement || {}).textContent) === 'Exploiter', '« Aller à » une famille');
  await moteur('sqlserver');
  L = await listeVue();
  verifier(L.cartes.filter(c => c.href === '#/architecte/essai-moteurs')[0].compte === '2 questions · 0 cochée', 'SQL Server : les questions « seulement » d\'autres moteurs comptent encore');
  await largeur('liste avec les situations d\'essai');
  // Une réponse peu sûre : un mot des questions seulement (8 points)
  res = await chercher('zorglub');
  verifier(res.join() === '#/architecte/essai-moteurs' && /Pas de situation sûre pour « zorglub »\. Les plus proches :/.test(await texte('#ar-res')) &&
    await p.$('#ar-res .ar-tout'), 'réponse peu sûre : ' + await texte('#ar-res'));
  await p.fill('#ar-q', ''); await attendre();
  // La situation d'essai : Tous montre tout (avec le nom du moteur), un moteur seul cache le reste et renumérote les étapes
  await moteur('tous');
  await aller('#/architecte/essai-moteurs');
  await p.click('#ar-ouvrir'); await attendre();
  const E = ESSAI[0];
  v = await lu();
  verifier(v.etapes.map(e => e.titre).join('|') === '1. Pour tous|2. Deux moteurs|3. MySQL seul' && v.total === '0 cochée sur 4', 'essai, Tous : ' + v.etapes.map(e => e.titre).join('|'));
  VQ.length = 0; VQ.push(...[].concat(...v.etapes.map(e => e.qs)));
  verifier(VQ.map(q => q.seul).join('|') === '|Seulement sur Snowflake|Seulement sur SQL Server et MySQL|Seulement sur MySQL' &&
    VQ[1].notes.join() === 'Snowflake : La note Snowflake.' && VQ[1].q === 'Une question QUALIFY zorglub ?' && VQ[2].code === 'SELECT 1;', 'essai, Tous : ' + JSON.stringify(VQ.map(q => [q.seul, q.notes])));
  verifier(v.exTexte === 'Un exemple sans code.' && !v.exPre.length && !v.exVariantes.length && !v.exLabels.length, 'un exemple sans code affiche du code');
  verifier(v.voirSit.join() === '#/architecte/creer-table' && v.voirDico.join() === '#/dico/create-table' && v.voirOutils.join() === '#/mots-reserves',
    'essai, « Voir aussi » (situation à venir, fiche inconnue, outil réservé) : ' + JSON.stringify([v.voirSit, v.voirDico, v.voirOutils]));
  await cocher('sf'); await cocher('ss-my');
  await moteur('sqlserver');
  v = await lu();
  verifier(v.etapes.map(e => e.titre).join('|') === '1. Pour tous|2. Deux moteurs' && v.etapes.map(e => e.qs.map(q => q.id).join()).join('|') === 'tous|ss-my' &&
    v.total === '1 cochée sur 2' && v.etapes.map(e => e.compte).join() === '0 / 1 cochées,1 / 1 cochées', 'essai, SQL Server : ' + JSON.stringify(v.etapes.map(e => [e.titre, e.compte])));
  verifier(!/Snowflake/.test([].concat(...v.etapes.map(e => e.qs)).map(q => q.notes.join() + q.seul).join()), 'essai, SQL Server : une note ou une question Snowflake visible');
  await p.click('#ar-copier'); await attendre(150);
  copie = await p.evaluate(() => window.__copie);
  verifier(copie === copieAttendue(E, 'sqlserver', { sf: true, 'ss-my': true }) && !/zorglub/.test(copie), 'essai, la copie (SQL Server) :\n' + copie);
  await moteur('snowflake');
  v = await lu();
  verifier(v.etapes.map(e => e.titre).join('|') === '1. Pour tous' && v.total === '1 cochée sur 2' && v.etapes[0].qs[1].notes.join() === 'Snowflake : La note Snowflake.',
    'essai, Snowflake : ' + JSON.stringify(v.etapes.map(e => [e.titre, e.compte])));
  await moteur('tous');
  await p.click('#ar-copier'); await attendre(150);
  copie = await p.evaluate(() => window.__copie);
  verifier(copie === copieAttendue(E, 'tous', { sf: true, 'ss-my': true }) && /\[x\] Une question QUALIFY zorglub \? \(seulement sur Snowflake\)/.test(copie), 'essai, la copie (Tous) :\n' + copie);
  await largeur('situation d\'essai (Tous)');
  // Une situation inconnue : retour à la liste
  await aller('#/architecte/inconnue');
  verifier(await p.evaluate(() => location.hash) === '#/architecte', 'une situation inconnue ne ramène pas à la liste');

  // 11. Le navigateur refuse d'enregistrer : la page marche, les cases vivent le temps de l'onglet, et c'est dit
  const p2 = await ctx.newPage();
  p2.on('pageerror', e => errs.push('stockage refusé : ' + e.message));
  await p2.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await p2.addInitScript(() => {
    const lire = Storage.prototype.getItem, ecrire = Storage.prototype.setItem;
    Storage.prototype.getItem = function (k) { if (k === 'learnsql-architecte') throw new Error('refusé'); return lire.call(this, k); };
    Storage.prototype.setItem = function (k, x) { if (k === 'learnsql-architecte') throw new Error('refusé'); return ecrire.call(this, k, x); };
  });
  await p2.goto(U + '#/architecte/creer-table'); await p2.waitForTimeout(250);
  verifier(await p2.isHidden('#ar-stockage'), 'stockage refusé : le message est là avant toute case');
  await p2.setChecked('input[data-q="' + e1.qs[0].id + '"]', true); await p2.waitForTimeout(80);
  verifier(await p2.isVisible('#ar-stockage') && /1 cochée sur/.test(await p2.textContent('#ar-total')), 'stockage refusé : ' + await p2.textContent('#ar-total'));
  await p2.evaluate(() => { location.hash = '#/architecte'; }); await p2.waitForTimeout(150);
  verifier(/1 cochée/.test(await p2.textContent('#ar-res a[href="#/architecte/creer-table"] .ar-compte')), 'stockage refusé : la case est perdue dans l\'onglet');
  await p2.close();

  console.log('architecte : carte Outils, liste par famille, recherche, situation, moteurs, cases, copie, décocher, stockage, 390 px');
  console.log('errors', errs); await b.close();
})();
