// Page Révision : arbre thème > sous-thème > modules, cases de groupe (tout cocher, état « à moitié »).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => { const u = new URL(r.request().url()); const j = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return j({ access_token: 'T', refresh_token: 'R', expires_in: 3600 }); if (u.pathname === '/auth/v1/user') return j({ id: 'u1', email: 'a@x.fr' });
    if (u.pathname === '/rest/v1/profil') return j([{ role: 'admin' }]); if (r.request().method() === 'GET') return j([]); r.fulfill({ status: 201, body: '' }); });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const info = () => p.textContent('#info');
  const etat = sel => p.$eval(sel, c => (c.checked ? 'coché' : c.indeterminate ? 'moitié' : 'vide'));
  const verifie = (nom, vu, attendu) => { console.log(nom, vu); if (vu !== attendu) errs.push(nom + ' : ' + vu + ' au lieu de ' + attendu); };

  await p.goto(U + '#/revision');
  verifie('sans compte, thèmes :', (await p.$$eval('[data-groupe]', l => l.map(x => x.getAttribute('data-groupe')))).join(','), 'sql');
  await p.check('[data-groupe="sql"]');
  verifie('SQL entier :', await info(), '16 modules choisis.');
  await p.click('.noeud summary');
  await p.uncheck('.theme input[value="m03"]');
  verifie('après un décoché :', await etat('[data-groupe="sql"]'), 'moitié');
  verifie('info :', await info(), '15 modules choisis.');
  await p.check('[data-groupe="sql"]');
  await p.uncheck('[data-groupe="sql"]');
  await p.check('.theme input[value="m01"]');
  verifie('un seul module :', await info(), 'Choisis encore 1 module(s).');

  await p.goto(U + '#/compte'); await p.fill('#email', 'a@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(700);
  await p.goto(U + '#/revision');
  verifie('admin, thèmes :', (await p.$$eval('.noeud.niv1 > .tete input', l => l.map(x => x.getAttribute('data-groupe')))).join(','), 'sql,chef-projet,divalto');
  await p.click('.noeud.niv1:has([data-groupe="chef-projet"]) > details > summary');
  // Nombre de modules lu dans la page (« · N module(s) ») : le test ne dépend pas du contenu publié.
  const nbDe = g => p.$eval('.noeud:has(> .tete [data-groupe="' + g + '"]) > .tete small', s => parseInt(s.textContent.replace(/\D+/g, ''), 10));
  const nDem = await nbDe('cp-demarrer');
  await p.check('[data-groupe="cp-demarrer"]');
  verifie('sous-thème Démarrer :', await info(), nDem >= 2 ? nDem + ' modules choisis.' : 'Choisis encore ' + (2 - nDem) + ' module(s).');
  verifie('thème CP à moitié :', await etat('[data-groupe="chef-projet"]'), 'moitié');
  const nCP = await nbDe('chef-projet'), nDV = await nbDe('divalto');
  await p.check('[data-groupe="chef-projet"]');
  verifie('thème CP entier :', await info(), nCP + ' modules choisis.');
  await p.check('[data-groupe="divalto"]');
  verifie('+ Divalto :', await info(), (nCP + nDV) + ' modules choisis.');
  verifie('scroll horizontal :', await p.evaluate(() => document.documentElement.scrollWidth), 390);
  await p.click('#lancer'); await p.waitForTimeout(200);
  verifie('quiz :', (await p.textContent('#app')).includes('Révision · ' + (nCP + nDV) + ' modules') && !!(await p.$('.choice')), true);
  console.log('errors', errs); await b.close();
})();
