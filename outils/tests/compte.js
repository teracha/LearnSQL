const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  let poste = null, remote = { version: 1, tentatives: [{ module: 'm02', titre: 'x', date: '2026-10-01T10:00:00.000Z', note: 15, bonnes: 15, total: 20, erreurs: [], parTheme: {} }], questions: { 'm02-q01': { vues: 3, justes: 2, dernier: true } } };
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = r.request().url(), m = r.request().method(), h = r.request().headers();
    if (h.apikey !== 'sb_publishable_CUaxASwOUJ1c7UWEDDvlSQ__RE0DHTA') return r.fulfill({ status: 401, body: '{}' });
    const json = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.includes('/auth/v1/signup')) return json({ id: 'u1', email: 'a@b.fr' }); // confirmation e-mail activée
    if (u.includes('grant_type=password')) { const c = JSON.parse(r.request().postData()); return c.password === 'motdepasse1' ? json({ access_token: 'T1', refresh_token: 'R1', expires_in: 3600 }) : r.fulfill({ status: 400, body: '{"error_description":"Invalid login credentials"}' }); }
    if (u.includes('/auth/v1/user')) return h.authorization === 'Bearer T1' || h.authorization === 'Bearer T2' ? json({ id: 'u1', email: 'a@b.fr' }) : r.fulfill({ status: 401, body: '{}' });
    if (u.includes('/rest/v1/progression') && m === 'GET') return json(remote ? [{ data: remote }] : []);
    if (u.includes('/rest/v1/progression') && m === 'POST') { poste = JSON.parse(r.request().postData()); remote = poste.data; return r.fulfill({ status: 201, body: '' }); }
    if (u.includes('/auth/v1/logout')) return r.fulfill({ status: 204, body: '' });
    r.fulfill({ status: 404, body: '{}' });
  });
  const url = 'file://' + path + '/index.html';
  await p.goto(url + '#/');
  await p.evaluate(() => localStorage.setItem('learnsql-v1', JSON.stringify({ version: 1, tentatives: [{ module: 'm01', titre: 'y', date: '2026-10-02T10:00:00.000Z', note: 12, bonnes: 6, total: 10, erreurs: [], parTheme: {} }], questions: { 'm02-q01': { vues: 1, justes: 0, dernier: false }, 'm01-q01': { vues: 1, justes: 1, dernier: true } } })));
  await p.goto(url + '#/compte'); await p.reload();
  console.log('nav:', await p.textContent('#lien-compte'));
  await p.fill('#email', 'a@b.fr'); await p.fill('#mdp', 'motdepasse1');
  await p.click('#inscription'); await p.waitForTimeout(300); console.log('inscription:', await p.textContent('#msg'));
  await p.fill('#mdp', 'mauvais12'); await p.click('button[type=submit]'); await p.waitForTimeout(300); console.log('mauvais mdp:', await p.textContent('#msg'));
  await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(600);
  console.log('connecté:', (await p.textContent('#app')).slice(0, 160).replace(/\s+/g, ' '));
  console.log('nav:', await p.textContent('#lien-compte'));
  console.log('posté: tentatives', poste && poste.data.tentatives.length, 'm02-q01 vues', poste && poste.data.questions['m02-q01'].vues, 'user', poste && poste.user_id);
  const loc = await p.evaluate(() => JSON.parse(localStorage.getItem('learnsql-v1')));
  console.log('local fusionné:', loc.tentatives.length, Object.keys(loc.questions).length);
  // QCM → synchro automatique après réponse
  poste = null; await p.goto(url + '#/quiz/m03'); await p.click('.choice'); 
  const btn = await p.$('#valider'); if (btn) await btn.click();
  await p.waitForTimeout(2200); console.log('synchro après réponse:', !!poste, poste && Object.keys(poste.data.questions).some(k => k.startsWith('m03')));
  // déconnexion
  await p.goto(url + '#/compte'); await p.click('#deconnexion'); console.log('après déconnexion nav:', await p.textContent('#lien-compte'), 'session', await p.evaluate(() => localStorage.getItem('learnsql-session')));
  // retour de l'e-mail de confirmation
  await p.goto('about:blank'); await p.goto(url + '#access_token=T2&expires_in=3600&refresh_token=R2&token_type=bearer&type=signup'); await p.waitForTimeout(600);
  console.log('lien e-mail: hash', await p.evaluate(() => location.hash), '|', (await p.textContent('#app')).slice(0, 80).replace(/\s+/g, ' '));
  await p.click('#deconnexion'); await p.goto('about:blank'); await p.goto(url + '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired'); await p.waitForTimeout(300);
  console.log('lien expiré:', (await p.textContent('#app')).slice(0, 110).replace(/\s+/g, ' '));
  console.log('errors', errs); await b.close();
})();
