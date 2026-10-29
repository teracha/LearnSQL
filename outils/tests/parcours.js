const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..'); const fs=require('fs');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  // Ajoute un sous-parcours de test à Divalto
  const src = fs.readFileSync(path + '/data/parcours.js', 'utf8').replace('sous: [', 'sous: [{ id: "divalto-achats", titre: "Achats", resume: "Cycle achat.", modules: [] }, { id: "divalto-ventes", titre: "Ventes", resume: "Cycle vente.", modules: [] }, ');
  if (!src.includes('divalto-achats')) throw new Error('parcours.js : sous-parcours de test non injectés');
  await p.route('**/data/parcours.js', r => r.fulfill({ contentType: 'application/javascript', body: src }));
  let me = { id: 'u2', email: 'julie@x.fr' };
  const db = { profil: [{ user_id: 'u1', email: 'moi@x.fr', role: 'admin' }, { user_id: 'u2', email: 'julie@x.fr', role: 'agent' }],
    groupe: [{ id: 1, nom: 'Pôle métier' }, { id: 2, nom: 'Invité' }], membre: [{ groupe_id: 2, user_id: 'u2' }],
    progression: [], acces: [{ element: 'divalto', groupe_id: 1 }, { element: 'edi', groupe_id: 2 }, { element: 'divalto-achats', groupe_id: 1 }] };
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T', refresh_token: 'R', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json(me);
    const tab = u.pathname.replace('/rest/v1/', ''); let rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET' && tab === 'membre' && /groupe\(nom\)/.test(u.searchParams.get('select'))) return json(rows.filter(match).map(x => ({ groupe_id: x.groupe_id, groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
    if (m === 'GET') return json(rows.filter(match));
    const body = r.request().postData() ? JSON.parse(r.request().postData()) : null;
    if (m === 'POST') { if (tab === 'progression') db.progression = rows.filter(x => x.user_id !== body.user_id); db[tab].push(body); return r.fulfill({ status: 201, body: '' }); }
    if (m === 'PATCH') { rows.filter(match).forEach(x => Object.assign(x, body)); return r.fulfill({ status: 204, body: '' }); }
    if (m === 'DELETE') { db[tab] = rows.filter(x => !match(x)); return r.fulfill({ status: 204, body: '' }); }
  });
  const url = 'file://' + path + '/index.html';
  const titres = async () => (await p.$$eval('.parcours h3', l => l.map(x => x.textContent))).join(' | ');
  await p.goto(url + '#/'); console.log('sans compte:', await titres());
  await p.goto(url + '#/p/edi'); console.log('sans compte #/p/edi →', await p.evaluate(() => location.hash));
  await p.goto(url + '#/p/sql'); console.log('SQL modules:', await p.$$eval('.module', l => l.length));
  await p.goto(url + '#/compte'); await p.fill('#email', 'julie@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  await p.goto(url + '#/'); await p.waitForTimeout(200); console.log('julie (Invité):', await titres());
  db.membre.push({ groupe_id: 1, user_id: 'u2' }); await p.goto(url + '#/compte'); await p.click('#sync'); await p.waitForTimeout(800);
  await p.goto(url + '#/'); console.log('julie (Invité + Pôle):', await titres());
  await p.goto(url + '#/p/divalto'); console.log('divalto:', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 140));
  db.membre = db.membre.filter(x => x.groupe_id !== 1); db.acces = db.acces.filter(a => a.element !== 'divalto'); db.acces.push({ element: 'divalto-ventes', groupe_id: 2 }, { element: 'divalto-gc', groupe_id: 1 });
  await p.goto(url + '#/compte'); await p.click('#sync'); await p.waitForTimeout(800);
  await p.goto(url + '#/p/divalto'); console.log('divalto ouvert, Invité:', await titres());
  await p.goto(url + '#/p/divalto/divalto-achats'); console.log('achats direct →', await p.evaluate(() => location.hash));
  // admin
  await p.goto(url + '#/compte'); await p.click('#deconnexion'); me = { id: 'u1', email: 'moi@x.fr' };
  await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  await p.goto(url + '#/'); console.log('admin:', await titres());
  await p.goto(url + '#/equipe'); await p.waitForTimeout(600);
  await p.check('input[data-acces="chef-projet"][value="1"]'); await p.waitForTimeout(500);
  await p.uncheck('input[data-acces="edi"][value="2"]'); await p.waitForTimeout(500);
  console.log('acces:', JSON.stringify(db.acces));
  await p.goto(url + '#/quiz/m01'); console.log('quiz m01 ok:', !!(await p.$('.choice')));
  await p.goto(url + '#/revision'); console.log('révision thèmes:', await p.$$eval('.theme', l => l.length));
  console.log('errors', errs); await b.close();
})();
