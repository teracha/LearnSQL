const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {}); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => { const u = new URL(r.request().url()); const j = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return j({ access_token: 'T', refresh_token: 'R', expires_in: 3600 }); if (u.pathname === '/auth/v1/user') return j({ id: 'u1', email: 'a@x.fr' });
    if (u.pathname === '/rest/v1/profil') return j([{ role: 'admin' }]); if (r.request().method() === 'GET') return j([]); r.fulfill({ status: 201, body: '' }); });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  await p.goto(U + '#/compte'); await p.fill('#email', 'a@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(700);
  for (const id of ['cp04', 'cp01', 'dv01', 'm05']) { await p.goto(U + '#/cours/' + id); await p.waitForTimeout(150);
    const r = await p.evaluate(() => ({ h1: document.querySelector('h1') && document.querySelector('h1').textContent, sc: document.documentElement.scrollWidth, pre: [...document.querySelectorAll('pre.code')].map(x => getComputedStyle(x).whiteSpace)[0] }));
    console.log(id, JSON.stringify(r)); if (r.sc > 390) errs.push(id + ' déborde sur mobile'); if (!r.h1) errs.push(id + ' sans titre'); }
  console.log('errors', errs); await b.close(); })();
