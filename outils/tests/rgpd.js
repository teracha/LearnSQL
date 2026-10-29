// RGPD : pages légales, aucun appel externe, suppression de son compte, comptes inactifs et suppression par l'admin.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [], externes = [], rpc = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.includes('supabase.co')) externes.push(u); });
  let reponseDialogue = '';
  p.on('dialog', d => d.type() === 'prompt' ? d.accept(reponseDialogue) : d.accept());
  const ilYa3ans = new Date(Date.now() - 3 * 365 * 86400000).toISOString();
  let moi = { id: 'u1', email: 'admin@x.fr', role: 'admin' };
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const j = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return j({ access_token: 'T', refresh_token: 'R', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return j({ id: moi.id, email: moi.email });
    if (u.pathname.startsWith('/rest/v1/rpc/')) { rpc.push(u.pathname.slice(13) + ' ' + (r.request().postData() || '')); return r.fulfill({ status: 204, body: '' }); }
    if (u.pathname === '/rest/v1/profil' && u.searchParams.get('select') === 'role') return j([{ role: moi.role }]);
    if (u.pathname === '/rest/v1/profil') return j([{ user_id: 'u1', email: 'admin@x.fr', role: 'admin', cree: '2026-10-01T00:00:00Z' }, { user_id: 'u2', email: 'vieux@x.fr', role: 'agent', cree: '2023-01-01T00:00:00Z' }]);
    if (u.pathname === '/rest/v1/progression' && m === 'GET' && (u.searchParams.get('select') || '').includes('maj')) return j([{ user_id: 'u2', data: { version: 1, tentatives: [], questions: {} }, maj: ilYa3ans }]);
    if (m === 'GET') return j([]);
    r.fulfill({ status: 201, body: '' });
  });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const texte = async () => (await p.textContent('#app')).replace(/\s+/g, ' ');
  const verifie = (nom, ok) => { console.log(nom, ok ? 'OK' : 'ÉCHEC'); if (!ok) errs.push(nom); };

  await p.goto(U + '#/mentions'); await p.waitForTimeout(300);
  verifie('mentions : hébergeur', (await texte()).includes('GitHub, Inc.') && (await texte()).includes('Terasoft'));
  await p.goto(U + '#/confidentialite');
  verifie('confidentialité : CNIL et 2 ans', (await texte()).includes('CNIL') && (await texte()).includes('2 ans'));
  verifie('liens en pied de page', !!(await p.$('footer a[href="#/mentions"]')) && !!(await p.$('footer a[href="#/confidentialite"]')));
  await p.goto(U + '#/compte');
  verifie('info à la création', (await texte()).includes('Confidentialité'));

  await p.fill('#email', moi.email); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  await p.goto(U + '#/equipe'); await p.waitForTimeout(500);
  verifie('compte inactif signalé', (await texte()).includes('Inactif'));
  verifie('pas de bouton pour se supprimer soi-même', !(await p.$('[data-suppr-compte="u1"]')));
  reponseDialogue = 'mauvais@x.fr'; await p.click('[data-suppr-compte="u2"]'); await p.waitForTimeout(200);
  verifie('mauvaise confirmation : rien', rpc.length === 0);
  reponseDialogue = 'vieux@x.fr'; await p.click('[data-suppr-compte="u2"]'); await p.waitForTimeout(400);
  verifie('admin supprime u2', rpc[0] === 'supprimer_compte {"cible":"u2"}');

  await p.goto(U + '#/compte'); await p.click('details:has(#supprimer-compte) summary');
  reponseDialogue = 'non'; await p.click('#supprimer-compte'); await p.waitForTimeout(200);
  verifie('confirmation refusée : rien', rpc.length === 1);
  reponseDialogue = 'SUPPRIMER'; await p.click('#supprimer-compte'); await p.waitForTimeout(500);
  verifie('suppression de mon compte', rpc[1] === 'supprimer_mon_compte {}');
  verifie('déconnecté ensuite', (await p.evaluate(() => localStorage.getItem('learnsql-session'))) === null && (await texte()).includes('Ton compte a été supprimé'));
  verifie('aucun appel externe (Google…)', externes.length === 0);
  if (externes.length) console.log(externes);
  console.log('errors', errs); await b.close();
})();
