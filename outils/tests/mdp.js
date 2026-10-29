const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  let recover = null, nouveau = null;
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/recover') { recover = { body: JSON.parse(r.request().postData()), redirect: u.searchParams.get('redirect_to') }; return json({}); }
    if (u.pathname === '/auth/v1/user' && m === 'PUT') { nouveau = JSON.parse(r.request().postData()).password; return json({ id: 'u1', email: 'a@b.fr' }); }
    if (u.pathname === '/auth/v1/user') return json({ id: 'u1', email: 'a@b.fr' });
    if (u.pathname.startsWith('/rest/v1/') && m === 'GET') return json([]);
    return r.fulfill({ status: 201, body: '' });
  });
  const url = 'file://' + path + '/index.html';
  await p.goto(url + '#/compte');
  await p.click('#oubli'); console.log('sans email:', await p.textContent('#msg'));
  await p.fill('#email', 'a@b.fr'); await p.click('#oubli'); await p.waitForTimeout(300);
  console.log('envoi:', await p.textContent('#msg'), JSON.stringify(recover));
  await p.goto('about:blank'); await p.goto(url + '#access_token=T&expires_in=3600&refresh_token=R&token_type=bearer&type=recovery'); await p.waitForTimeout(700);
  console.log('retour lien:', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 90), '| ouvert:', await p.$eval('details', d => d.open));
  await p.fill('#mdp-neuf', 'nouveau123'); await p.fill('#mdp-neuf2', 'autre1234'); await p.click('#form-mdp button'); console.log('différents:', await p.textContent('#msg-mdp'));
  await p.fill('#mdp-neuf2', 'nouveau123'); await p.click('#form-mdp button'); await p.waitForTimeout(300); console.log('ok:', await p.textContent('#msg-mdp'), nouveau);
  console.log('errors', errs); await b.close();
})();
