const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  const T = (n, d) => ({ module: 'm0' + n, titre: 'Module ' + n, date: d, note: 8 + n * 2, bonnes: 5, total: 10, erreurs: [], parTheme: {} });
  const db = {
    profil: [{ user_id: 'u1', email: 'moi@x.fr', role: 'admin' }, { user_id: 'u2', email: 'julie@x.fr', role: 'agent' }, { user_id: 'u3', email: 'marc@x.fr', role: 'formateur' }],
    groupe: [{ id: 1, nom: 'Pôle métier' }, { id: 2, nom: 'Invité' }],
    membre: [{ groupe_id: 1, user_id: 'u2' }],
    progression: [{ user_id: 'u1', data: { version: 1, tentatives: [], questions: {} } }, { user_id: 'u2', data: { version: 1, tentatives: [T(1, '2026-10-20T09:00:00Z'), T(2, '2026-10-21T09:00:00Z')], questions: { 'm01-q01': { vues: 1, justes: 0, dernier: false } } } }]
  };
  let nextId = 3;
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T1', refresh_token: 'R1', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u1', email: 'moi@x.fr' });
    const tab = u.pathname.replace('/rest/v1/', ''); let rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET' && tab === 'membre' && u.searchParams.get('select') === 'groupe(nom)') return json(rows.filter(match).map(x => ({ groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
    if (m === 'GET') return json(rows.filter(match));
    const body = r.request().postData() ? JSON.parse(r.request().postData()) : null;
    if (m === 'POST') { if (tab === 'groupe') body.id = nextId++; if (tab === 'progression') db.progression = rows.filter(x => x.user_id !== body.user_id); db[tab].push(body); return r.fulfill({ status: 201, body: '' }); }
    if (m === 'PATCH') { rows.filter(match).forEach(x => Object.assign(x, body)); return r.fulfill({ status: 204, body: '' }); }
    if (m === 'DELETE') { db[tab] = rows.filter(x => !match(x)); return r.fulfill({ status: 204, body: '' }); }
  });
  const url = 'file://' + path + '/index.html';
  await p.goto(url + '#/compte'); await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  console.log('lien équipe visible:', await p.isVisible('#lien-equipe'));
  await p.goto(url + '#/equipe'); await p.waitForTimeout(500);
  const txt = async () => (await p.textContent('#app')).replace(/\s+/g, ' ');
  console.log('page:', (await txt()).slice(0, 300));
  await p.fill('#nom-groupe', 'Compta'); await p.click('#form-groupe button'); await p.waitForTimeout(500);
  console.log('groupes:', db.groupe.map(g => g.nom).join(', '));
  await p.check('input[data-membre="u3"][value="1"]'); await p.waitForTimeout(500);
  console.log('membres:', JSON.stringify(db.membre));
  await p.selectOption('select[data-role="u2"]', 'formateur'); await p.waitForTimeout(500);
  console.log('rôle julie:', db.profil[1].role);
  await p.click('[data-suppr="3"]'); await p.waitForTimeout(500); console.log('après suppression:', db.groupe.map(g => g.nom).join(', '));
  await p.goto(url + '#/equipe/u2'); await p.waitForTimeout(500); console.log('détail:', (await txt()).slice(0, 260));
  // agent : pas d'accès
  db.profil[0].role = 'agent'; await p.goto(url + '#/compte'); await p.click('#sync'); await p.waitForTimeout(800);
  console.log('compte agent:', (await txt()).slice(0, 140)); db.membre.push({ groupe_id: 1, user_id: 'u1' }, { groupe_id: 2, user_id: 'u1' }); await p.click('#sync'); await p.waitForTimeout(800); console.log('avec groupes:', (await txt()).slice(40, 130));
  console.log('agent: lien visible', await p.isVisible('#lien-equipe')); await p.goto(url + '#/equipe'); await p.waitForTimeout(300); console.log('agent redirigé vers', await p.evaluate(() => location.hash));
  console.log('errors', errs); await b.close();
})();
