// Fiches de révision (#/fiche/mXX) : même rendu que le cours, liens cours ↔ fiche, bouton « Fiche » de la page du
// parcours, page de résultat d'un QCM, page Révision, module sans fiche (aucun lien), droits du module, mobile 390 px.
// Les ids et les titres sont lus dans les données : le test ne dépend pas du contenu des cours ni des fiches.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const racine = path.join(__dirname, '..', '..');
global.window = global;
require(path.join(racine, 'data/modules.js')); require(path.join(racine, 'data/parcours.js'));
const sql = LEARNSQL.parcours.filter(x => x.id === 'sql')[0].modules;
const fiches = fs.readdirSync(path.join(racine, 'data/fiches')).map(f => f.replace(/\.js$/, '')).filter(id => sql.indexOf(id) >= 0);
const AVEC = fiches.indexOf('m04') >= 0 ? 'm04' : fiches[0];
// Un module SQL sans fiche (il a son cours) ; le jour où tous en ont une, le test en retire une.
let SANS = sql.filter(id => fiches.indexOf(id) < 0 && fs.existsSync(path.join(racine, 'data/cours', id + '.js')))[0];
const retiree = SANS ? null : (SANS = fiches.filter(id => id !== AVEC).slice(-1)[0]);
const titre = id => LEARNSQL.modules.filter(m => m.id === id)[0].titre;

(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const verifie = (nom, vu, attendu) => { console.log(nom, vu); if (vu !== attendu) errs.push(nom + ' ' + vu + ' au lieu de ' + attendu); };
  if (retiree) await p.route('**/data/fiches/' + retiree + '.js', r => r.fulfill({ contentType: 'application/javascript', body: '' }));
  // Compte « agent » : le parcours SQL est réservé à un groupe dont il n'est pas membre.
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => { const u = new URL(r.request().url()); const j = o => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return j({ access_token: 'T', refresh_token: 'R', expires_in: 3600 }); if (u.pathname === '/auth/v1/user') return j({ id: 'u1', email: 'a@x.fr' });
    if (u.pathname === '/rest/v1/profil') return j([{ role: 'agent' }]); if (u.pathname === '/rest/v1/acces') return j([{ element: 'sql', groupe_id: 1 }]);
    if (r.request().method() === 'GET') return j([]); r.fulfill({ status: 201, body: '' }); });
  const U = 'file://' + path.join(racine, 'index.html');
  const aller = async h => { await p.goto(U + h); await p.waitForTimeout(150); };
  const etat = () => p.evaluate(() => ({ hash: location.hash, h1: (document.querySelector('h1') || {}).textContent || '',
    fiches: [...document.querySelectorAll('#app a[href^="#/fiche/"]')].map(a => a.getAttribute('href')).join(','),
    large: document.documentElement.scrollWidth }));
  const mobile = async nom => { const l = (await etat()).large; if (l > 390) errs.push(nom + ' déborde sur mobile (' + l + ' px)'); };
  // Répond au hasard jusqu'à la page de résultat.
  const finirQCM = async () => {
    while (await p.$('#valider')) { await p.click('.choice'); await p.click('#valider'); await p.click('#suivant'); await p.waitForTimeout(20); }
    await p.waitForTimeout(150);
  };

  // 1. La fiche : titre, toutes ses sections, lien vers le cours complet.
  await aller('#/fiche/' + AVEC);
  verifie('fiche, titre :', (await etat()).h1, 'Fiche de révision · ' + titre(AVEC));
  verifie('fiche, sections :', await p.$$eval('#app .card .points', l => l.length), await p.evaluate(id => LEARNSQL.fiches[id].sections.length, AVEC));
  verifie('fiche → cours :', await p.$$eval('#app a[href="#/cours/' + AVEC + '"]', l => l.map(a => a.textContent).join()), 'Le cours complet');
  await mobile('fiche');
  // 2. Même rendu que le cours : le cours, affiché avec le contenu de la fiche, donne la même page (en-tête à part).
  const corps = () => p.evaluate(() => {
    const a = document.getElementById('app').cloneNode(true); a.querySelector('p.muted').remove(); a.querySelector('h1').remove(); return a.innerHTML; });
  const corpsFiche = await corps();
  await p.evaluate(id => { LEARNSQL.cours[id] = LEARNSQL.fiches[id]; }, AVEC);
  await aller('#/cours/' + AVEC);
  verifie('même rendu que le cours :', (await corps()) === corpsFiche, true);
  await p.reload(); await p.waitForTimeout(150);   // les vraies données
  // 3. Le cours : lien « La fiche de révision ».
  verifie('cours → fiche :', await p.$$eval('#app a[href^="#/fiche/"]', l => l.map(a => a.getAttribute('href') + ' ' + a.textContent).join()),
    '#/fiche/' + AVEC + ' La fiche de révision');
  await mobile('cours');
  // 4. Un module sans fiche : aucun lien sur son cours ; sa fiche donne un message court (et le lien vers le cours).
  await aller('#/cours/' + SANS);
  verifie('cours sans fiche, liens :', (await etat()).fiches, '');
  await aller('#/fiche/' + SANS);
  const e4 = await etat();
  verifie('fiche absente, page :', e4.hash + ' ' + e4.h1, '#/fiche/' + SANS + ' Fiche de révision · ' + titre(SANS));
  verifie('fiche absente, message :', (await p.textContent('#app')).includes('Pas encore de fiche de révision pour ce module.') &&
    !(await p.$('#app .points')) && !!(await p.$('#app a[href="#/cours/' + SANS + '"]')), true);
  await mobile('fiche absente');
  await aller('#/fiche/m99');
  verifie('fiche d\'un module inconnu →', (await etat()).hash, '#/');
  // 5. Page du parcours : « Fiche » juste après « Cours », seulement pour les modules qui ont une fiche.
  await aller('#/p/sql');
  const boutons = await p.$$eval('.module', l => l.map(c => [...c.querySelectorAll('.mini-actions a')].map(a => a.getAttribute('href')).join(' ')));
  verifie('parcours, ' + AVEC + ' :', boutons[sql.indexOf(AVEC)], '#/cours/' + AVEC + ' #/fiche/' + AVEC + ' #/quiz/' + AVEC);
  verifie('parcours, ' + SANS + ' :', boutons[sql.indexOf(SANS)], '#/cours/' + SANS + ' #/quiz/' + SANS);
  verifie('parcours, fiches :', (await etat()).fiches, sql.filter(id => fiches.indexOf(id) >= 0 && id !== retiree).map(id => '#/fiche/' + id).join(','));
  verifie('parcours, boutons sur une ligne :', await p.$$eval('.mini-actions', l => l.every(d => [...d.children].every(a => a.offsetTop === d.children[0].offsetTop))), true);
  await mobile('parcours');
  // 6. Page de résultat d'un QCM : la fiche du module ; rien pour un module sans fiche.
  await aller('#/quiz/' + AVEC); await finirQCM();
  const e6 = await etat();
  verifie('résultat ' + AVEC + ' :', e6.hash + ' ' + e6.fiches, '#/resultat #/fiche/' + AVEC);
  await mobile('résultat');
  await aller('#/quiz/' + SANS); await finirQCM();
  const e6b = await etat();
  verifie('résultat ' + SANS + ' :', e6b.hash + ' ' + e6b.fiches, '#/resultat ');
  // 7. Page Révision : les fiches des modules choisis ; au retour d'une fiche, les modules sont encore cochés.
  await aller('#/revision'); await p.click('.noeud summary');
  await p.check('.theme input[value="' + SANS + '"]');
  verifie('révision, module sans fiche :', (await etat()).fiches, '');
  await p.check('.theme input[value="' + AVEC + '"]');
  verifie('révision, fiches :', (await etat()).fiches, '#/fiche/' + AVEC);
  await mobile('révision');
  await p.click('#app a[href="#/fiche/' + AVEC + '"]'); await p.waitForTimeout(150);
  verifie('révision → fiche :', (await etat()).h1, 'Fiche de révision · ' + titre(AVEC));
  await p.goBack(); await p.waitForTimeout(150);
  verifie('retour, cochés :', (await p.$$eval('.theme input:checked', l => l.map(c => c.value))).sort().join(), [AVEC, SANS].sort().join());
  // … et le résultat de cette révision : seulement les fiches qui existent.
  await p.click('#lancer'); await p.waitForTimeout(150); await finirQCM();
  const e7 = await etat();
  verifie('résultat de la révision :', e7.hash + ' ' + e7.fiches, '#/resultat #/fiche/' + AVEC);
  // 8. Mêmes droits que le module : parcours SQL fermé à ce compte → pas de fiche (retour à l'accueil).
  await aller('#/compte'); await p.fill('#email', 'a@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(700);
  await aller('#/fiche/' + AVEC);
  verifie('fiche, SQL fermé →', (await etat()).hash, '#/');
  console.log('errors', errs); await b.close();
})();
