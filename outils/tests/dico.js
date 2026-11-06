// Super dico SQL : recherche (question, nom, fautes), sélecteur de moteur, fiche, mobile. Sans compte.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const premiers = async (q, n) => {
    await p.fill('#dico-q', q); await p.waitForTimeout(80);
    return p.$$eval('.fiche-res strong', xs => xs.map(x => x.textContent)).then(t => t.slice(0, n));
  };
  const attendu = (nom, liste, q) => { console.log(JSON.stringify(q), '→', liste.join(', ')); if (liste.indexOf(nom) < 0) errs.push(q + ' : ' + nom + ' absent'); };
  await p.goto(U + '#/dico'); await p.waitForTimeout(200);
  const h1 = await p.textContent('h1'); if (h1 !== 'Super dico SQL') errs.push('titre : ' + h1);
  const nb = await p.$$eval('.puce', xs => xs.length); console.log('fiches à parcourir :', nb); if (nb < 30) errs.push('trop peu de fiches : ' + nb);
  attendu('COALESCE', await premiers('coalesce', 1), 'coalesce');
  attendu('COALESCE', await premiers('coalese', 1), 'coalese');
  attendu('CHARINDEX', await premiers('je veux faire une recherche sur un carreceete', 3), 'recherche sur un carreceete');
  attendu('CHARINDEX', await premiers('position d\'un caractère', 3), 'position d\'un caractère');
  attendu('TRIM', await premiers('enlever les espaces', 3), 'enlever les espaces');
  attendu('ROUND', await premiers('arrondir un montant', 3), 'arrondir un montant');
  attendu('DATEADD', await premiers('ajouter des jours à une date', 3), 'ajouter des jours à une date');
  attendu('ORDER BY', await premiers('trier', 3), 'trier');
  attendu('CHARINDEX', await premiers('LOCATE', 1), 'LOCATE (nom MySQL)');
  const rien = await premiers('zzqxw', 1); if (rien.length) errs.push('zzqxw ne devrait rien trouver');
  await p.fill('#dico-q', 'coalesce'); await p.waitForTimeout(80);
  await p.click('.moteur[data-moteur="mysql"]'); await p.waitForTimeout(80);
  const dt = await p.$$eval('.fiche-res .syntaxe dt', xs => xs.map(x => x.textContent));
  if (dt.join() !== 'MySQL') errs.push('sélecteur MySQL : ' + dt.join());
  await p.goto(U + '#/dico/charindex'); await p.waitForTimeout(150);
  const r = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, ex: (document.querySelector('#fiche-corps pre') || {}).textContent || '',
    actif: (document.querySelector('.moteur.actif') || {}).textContent, sc: document.documentElement.scrollWidth }));
  console.log('fiche', JSON.stringify(r));
  if (r.h1 !== 'CHARINDEX') errs.push('fiche : ' + r.h1);
  if (r.actif !== 'MySQL') errs.push('le moteur choisi n\'est pas gardé : ' + r.actif);
  if (!/LOCATE/.test(r.ex)) errs.push('exemple MySQL sans LOCATE');
  if (r.sc > 390) errs.push('fiche déborde sur mobile');
  await p.click('.moteur[data-moteur="tous"]'); await p.waitForTimeout(80);
  const tous = await p.$$eval('#fiche-corps .syntaxe dt', xs => xs.length); if (tous !== 3) errs.push('« Tous » : ' + tous + ' moteurs');
  await p.goto(U + '#/dico'); await p.waitForTimeout(100);
  const sc = await p.evaluate(() => document.documentElement.scrollWidth); if (sc > 390) errs.push('page dico déborde sur mobile');
  // Le conseil pratique (champ « pratique ») : une fiche de test ajoutée en mémoire, avec piège, correction et conseil.
  await p.evaluate(() => {
    window.LEARNSQL.dico.push({ id: 'test-pratique', nom: 'TEST_PRATIQUE', type: 'erreur', categorie: 'Requête', definition: 'Une fiche de test.',
      moteurs: { sqlserver: 'a', snowflake: 'b', mysql: 'c' }, piege: 'Le piège de test.', correction: 'La correction de test.',
      pratique: 'Le conseil de test, avec `CHARINDEX(x, y) > 0`.', motsCles: ['test'] });
    location.hash = '#/dico/test-pratique';
  });
  await p.waitForTimeout(150);
  const encadres = await p.$$eval('#fiche-corps .feedback', xs => xs.map(x => ({ c: x.className, t: x.textContent, code: !!x.querySelector('code') })));
  console.log('encadrés de la fiche de test :', encadres.map(e => e.c).join(' / '));
  const pr = encadres[encadres.length - 1] || {};
  if (encadres.length !== 3 || !/pratique/.test(pr.c) || pr.t.indexOf('En pratique :') !== 0 || !pr.code) errs.push('« En pratique » mal affiché : ' + JSON.stringify(encadres));
  if (/\bko\b|\bok\b/.test(pr.c || '')) errs.push('« En pratique » a la couleur du piège ou de la correction');
  // Une fiche sans conseil (fiche de test) : pas d'encadré. Une vraie fiche : toutes ont maintenant leur conseil.
  await p.evaluate(() => {
    window.LEARNSQL.dico.push({ id: 'test-sans-pratique', nom: 'TEST_SANS', type: 'mot-clé', categorie: 'Requête', definition: 'Une fiche de test.',
      moteurs: { sqlserver: 'a', snowflake: 'b', mysql: 'c' }, piege: 'Le piège de test.', motsCles: ['test'] });
    location.hash = '#/dico/test-sans-pratique';
  });
  await p.waitForTimeout(150);
  if (await p.$('#fiche-corps .pratique')) errs.push('« En pratique » affiché sur une fiche sans conseil');
  await p.evaluate(() => { location.hash = '#/dico/charindex'; }); await p.waitForTimeout(150);
  if (!(await p.$('#fiche-corps .pratique'))) errs.push('« En pratique » absent de la fiche CHARINDEX');
  console.log('errors', errs); await b.close();
})();
