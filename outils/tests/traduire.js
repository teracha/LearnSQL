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

  // 1. Le menu (lien « Outils », docs/outils.md), la carte « Traduire une requête », puis la page
  await p.goto(U + '#/'); await p.waitForTimeout(150);
  verifier(!(await p.$('nav a[href="#/traduire"]')), 'le lien « Traduire » est encore dans le menu (il est dans Outils)');
  verifier(await p.$('nav a[href="#/outils"]'), 'lien « Outils » absent du menu');
  await p.click('nav a[href="#/outils"]'); await p.waitForTimeout(150);
  await p.click('#app a[href="#/traduire"]'); await p.waitForTimeout(150);
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
  // Une sous-étape porte une barre ; la suite d'une ligne coupée a un retrait suspendu (text-indent négatif).
  const forme = await p.evaluate(() => {
    const sous = document.querySelector('#tr-res .tr-sous'), l0 = document.querySelector('#tr-res .tr-l');
    return { barre: sous ? getComputedStyle(sous).backgroundImage : '', retrait: parseFloat(getComputedStyle(l0).textIndent) };
  });
  verifier(/linear-gradient/.test(forme.barre), 'pas de barre pour les sous-étapes');
  verifier(forme.retrait < 0, 'pas de retrait suspendu pour la suite d\'une ligne');
  // Sur téléphone, après un clic, le résultat est montré : focus sur son titre, et le titre est à l'écran.
  const vu = await p.evaluate(() => { const t = document.getElementById('tr-titre'), b = t.getBoundingClientRect(); return { focus: document.activeElement === t, haut: b.top, h: innerHeight }; });
  verifier(vu.focus, 'le titre du résultat n\'a pas le focus');
  verifier(vu.haut >= -2 && vu.haut < vu.h, 'le résultat n\'est pas à l\'écran (haut du titre : ' + vu.haut + ')');
  verifier(await p.evaluate(() => getComputedStyle(document.getElementById('tr-sql')).fontSize) === '16px', 'zone de texte : pas 16 px sur téléphone (zoom de l\'iPhone)');

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

  // 7. Texte faux, puis texte vide : un seul message, jamais une page blanche ; rien à copier
  await p.fill('#tr-sql', 'Bonjour, peux-tu m\'aider ?'); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(/ne ressemble pas à du SQL/.test(await p.textContent('#tr-res')), 'pas de message pour un texte qui n\'est pas du SQL');
  verifier((await lignes()).length === 1, 'texte qui n\'est pas du SQL : plusieurs messages');
  verifier(await p.isDisabled('#tr-copier'), 'Copier devrait être grisé quand le résultat est une erreur');
  await p.fill('#tr-sql', 'SELECT nom FROM'); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(await p.isDisabled('#tr-copier'), 'Copier devrait être grisé pour une requête illisible');
  await p.fill('#tr-sql', '   '); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(/Rien à traduire/.test(await p.textContent('#tr-res')), 'pas de message pour un texte vide');
  verifier(await p.isDisabled('#tr-copier'), 'Copier devrait être grisé pour un texte vide');

  // 7 bis. Un exemple ne fait pas perdre la requête de l'élève : un lien « Revenir à ma requête », sans boîte de dialogue
  p.on('dialog', d => { errs.push('boîte de dialogue : ' + d.message()); d.dismiss(); });
  const mienne = "SELECT num_cde FROM commande WHERE canal = 'EDI'";
  await p.fill('#tr-sql', mienne); await p.click('#tr-go'); await p.waitForTimeout(80);
  verifier(await p.isHidden('#tr-retour'), 'le lien de retour ne devrait pas être là avant un exemple');
  await p.click('.tr-ex[data-ex="1"]'); await p.waitForTimeout(80);
  verifier(await p.isVisible('#tr-mienne'), 'pas de lien « Revenir à ma requête » après un exemple');
  verifier(await p.textContent('#tr-mienne') === 'Revenir à ma requête', 'texte du lien de retour');
  await p.click('#tr-mienne'); await p.waitForTimeout(80);
  verifier(await p.inputValue('#tr-sql') === mienne, 'la requête de l\'élève n\'est pas revenue');
  verifier((await lignes()).some(x => /canal est égal à 'EDI'/.test(x)), 'la requête de l\'élève n\'est pas traduite au retour');
  verifier(await p.isHidden('#tr-retour'), 'le lien de retour devrait disparaître une fois revenu');
  const traces2 = await p.evaluate(() => { let t = location.href; for (let k = 0; k < localStorage.length; k++) t += localStorage.getItem(localStorage.key(k)); return t; });
  verifier(traces2.indexOf('canal') < 0, 'la requête de l\'élève est enregistrée (localStorage ou URL)');

  // 8. Téléphone : une longue requête ne fait pas défiler la page de côté
  const longue = 'SELECT ' + Array.from({ length: 40 }, (_, k) => 'tres_long_nom_de_colonne_numero_' + k).join(', ') +
    ' FROM base_de_donnees_tres_longue.schema_tres_long.table_au_nom_vraiment_tres_long_pour_le_test WHERE x IN (SELECT y FROM z WHERE w IN (SELECT v FROM u WHERE t = \'' + 'x'.repeat(150) + '\'))';
  await p.fill('#tr-sql', longue); await p.click('#tr-go'); await p.waitForTimeout(150);
  const sc = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log('largeur de la page sur téléphone :', sc);
  verifier(sc <= 390, 'la page déborde sur téléphone : ' + sc);
  // Toute la page (pas seulement le pseudo-code) : une note « À savoir » avec un très long morceau de code.
  const nom = 'colonne_au_nom_vraiment_tres_tres_long_pour_tester_le_debordement_des_notes_sur_un_telephone';
  await p.fill('#tr-sql', 'SELECT * FROM t WHERE ' + nom + " <> 'VALEUR_ELLE_AUSSI_TRES_LONGUE_SANS_AUCUN_ESPACE_POUR_LE_TEST' AND autre_" + nom + ' = NULL');
  await p.click('#tr-go'); await p.waitForTimeout(150);
  const deb = await p.evaluate(() => {
    const l = innerWidth, trop = [];
    document.querySelectorAll('body *').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && b.right > l + 1) trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right)); });
    return { sw: document.documentElement.scrollWidth, trop: trop.slice(0, 5), notes: document.querySelectorAll('.tr-notes li').length };
  });
  verifier(deb.notes >= 2, 'les notes du test de largeur manquent');
  verifier(deb.sw <= 390 && !deb.trop.length, 'une partie de la page déborde sur téléphone : ' + JSON.stringify(deb));

  // 8 bis. Les boutons « ghost » (Copier, Nouvelle recherche…) : contraste d'au moins 4,5 dans les deux thèmes,
  // et pour les deux réglages du thème sombre (choisi sur le site, ou venu du système).
  const contraste = () => p.evaluate(() => {
    function rgb(c) { const m = c.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1 }; }
    function lum(c) { return [c.r, c.g, c.b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((s, v, k) => s + v * [0.2126, 0.7152, 0.0722][k], 0); }
    function fond(e) { for (let x = e; x; x = x.parentElement) { const c = rgb(getComputedStyle(x).backgroundColor); if (c.a > 0.5) return c; } return rgb(getComputedStyle(document.body).backgroundColor); }
    return Array.from(document.querySelectorAll('.btn.ghost')).filter(b => !b.disabled && b.offsetParent).map(b => {
      const a = lum(rgb(getComputedStyle(b).color)), f = lum(fond(b));
      return { texte: b.textContent.trim(), ratio: Math.round((Math.max(a, f) + 0.05) / (Math.min(a, f) + 0.05) * 100) / 100 };
    });
  });
  const pagesGhost = [['#/traduire', true], ['#/dico/sum', false]];
  for (const [mode, theme] of [['clair', null], ['sombre (site)', 'dark'], ['sombre (système)', 'systeme'], ['clair forcé, système sombre', 'light']]) {
    await p.emulateMedia({ colorScheme: theme === 'systeme' || theme === 'light' ? 'dark' : 'light' });
    let vus = 0;
    for (const [h, traduire] of pagesGhost) {
      await p.goto(U + h); await p.waitForTimeout(150);
      await p.evaluate(t => { if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }, theme);
      if (traduire) { await p.click('.tr-ex[data-ex="0"]'); await p.waitForTimeout(100); }
      const r = await contraste();
      vus += r.length;
      r.forEach(x => verifier(x.ratio >= 4.5, 'thème ' + mode + ', ' + h + ' : bouton « ' + x.texte + ' », contraste ' + x.ratio));
    }
    verifier(vus >= 2, 'thème ' + mode + ' : boutons ghost non trouvés (' + vus + ')');
  }
  await p.emulateMedia({ colorScheme: 'light' });

  // 9. Le lien depuis la page du dico
  await p.goto(U + '#/dico'); await p.waitForTimeout(150);
  verifier(await p.$('#app a[href="#/traduire"]'), 'pas de lien vers Traduire sur la page du dico');

  console.log('errors', errs); await b.close();
})();
