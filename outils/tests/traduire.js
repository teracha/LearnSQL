// Traduire une requête (#/traduire) : la page, un exemple, Traduire, Copier, un lien vers le dico, du HTML dans la
// requête (rien ne s'exécute), rien d'enregistré, l'écran de téléphone, aucune erreur JavaScript. Sans compte.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  // Presse-papiers simulé : on garde le texte copié.
  await p.addInitScript(() => {
    window.__copie = null;
    try { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: t => { window.__copie = t; return Promise.resolve(); } } }); } catch (e) { /* ignoré */ }
  });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const lignes = () => p.$$eval('#tr-res .tr-l', xs => xs.map(x => x.textContent));
  const verifier = (ok, m) => { if (!ok) errs.push(m); };

  // 1. Le menu, puis la page
  await p.goto(U + '#/'); await p.waitForTimeout(150);
  verifier(await p.$('nav a[href="#/traduire"]'), 'lien « Traduire » absent du menu');
  await p.click('nav a[href="#/traduire"]'); await p.waitForTimeout(150);
  const h1 = await p.textContent('h1'); verifier(h1 === 'Traduire une requête', 'titre : ' + h1);
  verifier(await p.isDisabled('#tr-copier'), 'Copier devrait attendre une traduction');

  // 2. Un exemple
  await p.click('.tr-ex[data-ex="0"]'); await p.waitForTimeout(100);
  let l = await lignes();
  console.log('exemple 1 :', l.length, 'lignes ;', l[0]);
  verifier(l[0] === 'PRENDRE la table commande (appelée co)', 'exemple 1, 1re ligne : ' + l[0]);
  verifier(l.some(x => x.indexOf('REGROUPER par c.nom') === 0), 'exemple 1 sans REGROUPER');
  verifier(await p.textContent('#tr-res .tr-verbe') === 'PRENDRE', 'le verbe n\'est pas mis en valeur');
  verifier(/À savoir/.test(await p.textContent('#tr-res')), 'exemple 1 sans « À savoir »');
  const dec = await p.$$eval('#tr-res .tr-l', xs => xs.map(x => getComputedStyle(x).paddingLeft));
  verifier(new Set(dec).size >= 2, 'pas de sous-étape en retrait');

  // 3. Le bouton Traduire, avec une requête tapée
  await p.fill('#tr-sql', "SELECT nom FROM client WHERE ville = NULL"); await p.click('#tr-go'); await p.waitForTimeout(80);
  l = await lignes();
  verifier(l.join('|') === 'PRENDRE la table client|GARDER les lignes où ville est égal à NULL|AFFICHER nom', 'Traduire : ' + l.join('|'));
  verifier(/IS NULL/.test(await p.textContent('.tr-notes')), 'note 1 absente');

  // 4. Le bouton Copier (presse-papiers), puis le repli sans l'API
  await p.click('#tr-copier'); await p.waitForTimeout(80);
  const copie = await p.evaluate(() => window.__copie);
  verifier(copie && copie.indexOf('PRENDRE la table client') === 0 && /À savoir :/.test(copie), 'copie : ' + copie);
  verifier(/Copié/.test(await p.textContent('#tr-msg')), 'pas de message après la copie');
  await p.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
  await p.click('#tr-copier'); await p.waitForTimeout(80);
  const msgRepli = await p.textContent('#tr-msg');
  console.log('repli sans presse-papiers :', msgRepli);
  verifier(/Copi/.test(msgRepli), 'repli : pas de message');

  // 5. Un lien vers le dico, puis retour : la requête est retrouvée
  await p.click('.tr-ex[data-ex="0"]'); await p.waitForTimeout(80);
  const lienSum = await p.$('#tr-res .puce[href="#/dico/sum"]');
  verifier(lienSum, 'pas de lien vers la fiche SUM');
  if (lienSum) {
    await lienSum.click(); await p.waitForTimeout(150);
    verifier(await p.textContent('h1') === 'SUM', 'le lien ne mène pas à la fiche SUM');
    await p.goBack(); await p.waitForTimeout(200);
    verifier(/SUM\(co\.montant_ht\)/.test(await p.inputValue('#tr-sql')), 'requête perdue après le dico');
    verifier((await lignes()).length > 5, 'traduction perdue après le dico');
  }
  // Rien n'est enregistré : ni localStorage, ni URL.
  const traces = await p.evaluate(() => { let t = location.href; for (let k = 0; k < localStorage.length; k++) t += localStorage.getItem(localStorage.key(k)); return t; });
  verifier(traces.indexOf('montant_ht') < 0, 'la requête est enregistrée (localStorage ou URL)');

  // 6. Du HTML dans la requête : rien ne s'exécute, tout reste du texte
  await p.fill('#tr-sql', "SELECT '<script>window.__xss = 1</script>' AS x, '<img src=x onerror=\"window.__xss = 2\">' AS y FROM t");
  await p.click('#tr-go'); await p.waitForTimeout(150);
  const xss = await p.evaluate(() => ({ v: window.__xss, balises: document.querySelectorAll('#tr-res script, #tr-res img').length, texte: document.querySelector('#tr-res').textContent }));
  verifier(xss.v === undefined && xss.balises === 0, 'HTML exécuté : ' + JSON.stringify(xss));
  verifier(xss.texte.indexOf('<script>') >= 0, 'le texte <script> devrait rester affiché comme du texte');

  // 7. Texte faux, puis texte vide : un message, jamais une page blanche
  await p.fill('#tr-sql', 'Bonjour, peux-tu m\'aider ?'); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(/Je n'arrive pas à lire la requête/.test(await p.textContent('#tr-res')), 'pas de message pour un texte faux');
  await p.fill('#tr-sql', '   '); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(/Rien à traduire/.test(await p.textContent('#tr-res')), 'pas de message pour un texte vide');

  // 8. Téléphone : une longue requête ne fait pas défiler la page de côté
  const longue = 'SELECT ' + Array.from({ length: 40 }, (_, k) => 'tres_long_nom_de_colonne_numero_' + k).join(', ') +
    ' FROM base_de_donnees_tres_longue.schema_tres_long.table_au_nom_vraiment_tres_long_pour_le_test WHERE x IN (SELECT y FROM z WHERE w IN (SELECT v FROM u WHERE t = \'' + 'x'.repeat(150) + '\'))';
  await p.fill('#tr-sql', longue); await p.click('#tr-go'); await p.waitForTimeout(150);
  const sc = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log('largeur de la page sur téléphone :', sc);
  verifier(sc <= 390, 'la page déborde sur téléphone : ' + sc);

  // 9. Le lien depuis la page du dico
  await p.goto(U + '#/dico'); await p.waitForTimeout(150);
  verifier(await p.$('#app a[href="#/traduire"]'), 'pas de lien vers Traduire sur la page du dico');

  console.log('errors', errs); await b.close();
})();
