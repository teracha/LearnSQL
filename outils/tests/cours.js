const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {}); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => { const u = new URL(r.request().url()); const j = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return j({ access_token: 'T', refresh_token: 'R', expires_in: 3600 }); if (u.pathname === '/auth/v1/user') return j({ id: 'u1', email: 'a@x.fr' });
    if (u.pathname === '/rest/v1/profil') return j([{ role: 'admin' }]); if (r.request().method() === 'GET') return j([]); r.fulfill({ status: 201, body: '' }); });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  await p.goto(U + '#/compte'); await p.fill('#email', 'a@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(700);
  for (const id of ['cp04', 'cp01', 'dv01', 'm05', 'm01', 'm02', 'm03']) { await p.goto(U + '#/cours/' + id); await p.waitForTimeout(150);
    const r = await p.evaluate(() => ({ h1: document.querySelector('h1') && document.querySelector('h1').textContent, sc: document.documentElement.scrollWidth, pre: [...document.querySelectorAll('pre.code')].map(x => getComputedStyle(x).whiteSpace)[0] }));
    console.log(id, JSON.stringify(r)); if (r.sc > 390) errs.push(id + ' déborde sur mobile'); if (!r.h1) errs.push(id + ' sans titre'); }
  // La règle générale (champ « regle ») : m05 en a une par partie (7), après l'exemple et le résultat, avant les points.
  await p.goto(U + '#/cours/m05'); await p.waitForTimeout(150);
  const rg = await p.evaluate(() => [...document.querySelectorAll('.card .regle')].map(x => { const s = [...x.parentNode.children], i = s.indexOf(x);
    return { label: x.querySelector('.label').textContent, texte: x.textContent.length, avant: s.slice(0, i).some(e => e.matches('pre.code')) && s.slice(0, i).some(e => e.matches('.resultat')),
      apres: s.slice(i + 1).some(e => e.matches('ul.points')) }; }));
  console.log('m05 règles générales', rg.length); if (rg.length !== 7) errs.push('m05 : 7 règles générales attendues, ' + rg.length);
  rg.forEach((r, i) => { if (r.label !== 'La règle générale' || r.texte < 100 || !r.avant || !r.apres) errs.push('m05 : règle ' + (i + 1) + ' mal placée ou vide'); });
  // Un cours sans règle générale (m01) n'affiche aucun bloc vide.
  await p.goto(U + '#/cours/m01'); await p.waitForTimeout(150);
  if (await p.locator('.regle').count()) errs.push('m01 : bloc de règle générale sans texte');
  console.log('errors', errs); await b.close(); })();
