const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T', refresh_token: 'R', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u1', email: 'moi@x.fr' });
    if (u.pathname === '/rest/v1/profil') return json([{ role: 'admin' }]);
    if (m === 'GET') return json([]);
    return r.fulfill({ status: 201, body: '' });
  });
  const url = 'file://' + path + '/index.html';
  await p.goto(url + '#/p/divalto'); console.log('sans compte →', await p.evaluate(() => location.hash));
  await p.goto(url + '#/compte'); await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  await p.goto(url + '#/p/divalto'); console.log('divalto:', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 120));
  await p.goto(url + '#/p/divalto/divalto-gc'); console.log('gc:', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 160));
  await p.goto(url + '#/quiz/dv01');
  for (let i = 0; i < 10; i++) { await p.click('.choice'); await p.click('#valider'); if (i === 0) console.log('feedback:', (await p.textContent('.feedback')).replace(/\s+/g, ' ').slice(0, 200), '| lien:', await p.getAttribute('.feedback a', 'href')); await p.click('#suivant'); }
  await p.waitForTimeout(200); console.log('fin:', await p.textContent('h1'));
  await p.goto(url + '#/revision'); console.log('révision thèmes:', await p.$$eval('.theme', l => l.length));
  console.log('errors', errs); await b.close();
})();
