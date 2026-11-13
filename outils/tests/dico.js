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

  // Les types de données (docs/dico.md) : le lien visible sur la page du dico ; la page « Tous les types de données »
  // (#/types : une famille = un titre et un tableau, dans l'ordre ; INT renvoie à sa fiche ; le sélecteur de moteur garde
  // une colonne ; 390 px : le tableau défile dans son cadre, la page ne déborde pas) ; une fiche de type (« type de
  // donnée », lien vers le tableau de sa famille) ; la recherche par les mots d'une famille.
  const FAMILLES = ['Entiers', 'Décimaux exacts', 'Nombres approchés', 'Booléens', 'Textes', 'Binaires', 'Listes de valeurs',
    'Dates et heures', 'Semi-structurés', 'Autres types', 'Modifier un type', 'Convertir un type'];
  await p.evaluate(() => { location.hash = '#/dico'; }); await p.waitForTimeout(150);
  await p.click('.moteur[data-moteur="tous"]'); await p.waitForTimeout(80);
  const lienTypes = await p.$('#app a[href="#/types"]');
  if (!lienTypes || !(await lienTypes.isVisible())) errs.push('pas de lien visible vers « Tous les types de données » sur la page du dico');
  else { await lienTypes.click(); await p.waitForTimeout(150); }
  const tableau = () => p.evaluate(F => ({
    h1: document.querySelector('h1').textContent, h2: Array.from(document.querySelectorAll('#types-tableaux h2')).map(x => x.textContent),
    attendues: F.filter(f => LEARNSQL.dico.some(x => x.famille === f && x.domaine !== 'divalto')),
    th: Array.from(document.querySelectorAll('#famille-entiers + .types-cadre thead th')).map(x => x.textContent),
    int: !!document.querySelector('#famille-entiers + .types-cadre tbody a[href="#/dico/int"]'),
    sc: document.documentElement.scrollWidth,
    cadres: Array.from(document.querySelectorAll('.types-cadre')).map(c => Math.round(c.getBoundingClientRect().right)),
    glisser: !!document.querySelector('.types-glisser') && getComputedStyle(document.querySelector('.types-glisser')).display !== 'none'
  }), FAMILLES);
  let ty = await tableau();
  console.log('types :', JSON.stringify({ h2: ty.h2, th: ty.th, sc: ty.sc }));
  if (ty.h1 !== 'Tous les types de données') errs.push('page des types : ' + ty.h1);
  if (!ty.h2.length || ty.h2.join('|') !== ty.attendues.join('|')) errs.push('familles : ' + ty.h2.join('|') + ' au lieu de ' + ty.attendues.join('|'));
  if (ty.th.join() !== 'Type,SQL Server,Snowflake,MySQL') errs.push('colonnes (Tous) : ' + ty.th.join());
  if (!ty.int) errs.push('le tableau « Entiers » ne renvoie pas à la fiche INT');
  if (ty.sc > 390 || ty.cadres.some(r => r > 390)) errs.push('page des types : déborde à 390 px (' + ty.sc + ' px ; cadres ' + ty.cadres.join() + ')');
  if (!ty.glisser) errs.push('page des types, 390 px, Tous : pas d\'aide « Fais glisser un tableau »');
  await p.click('.moteur[data-moteur="mysql"]'); await p.waitForTimeout(80);
  ty = await tableau();
  if (ty.th.join() !== 'Type,MySQL' || ty.glisser) errs.push('sélecteur MySQL sur la page des types : ' + ty.th.join() + (ty.glisser ? ' (aide « Fais glisser » encore là)' : ''));
  await p.click('.moteur[data-moteur="tous"]'); await p.waitForTimeout(80);
  // Le nom INT ouvre sa fiche : « type de donnée », et le lien vers le tableau de sa famille
  await p.click('#famille-entiers + .types-cadre a[href="#/dico/int"]'); await p.waitForTimeout(150);
  const fi = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, tags: Array.from(document.querySelectorAll('.tags .tag')).map(x => x.textContent),
    lien: (document.querySelector('.fiche-famille a') || {}).textContent || '', href: (document.querySelector('.fiche-famille a') || { getAttribute: () => '' }).getAttribute('href'),
    sc: document.documentElement.scrollWidth }));
  console.log('fiche INT :', JSON.stringify(fi));
  if (fi.h1 !== 'INT' || fi.tags[0] !== 'type de donnée' || fi.tags[1] !== 'Types de données') errs.push('fiche INT : ' + JSON.stringify(fi));
  if (fi.lien !== 'Voir le tableau de tous les types' || fi.href !== '#/types/entiers') errs.push('fiche INT, lien vers le tableau : ' + fi.lien + ' ' + fi.href);
  if (fi.sc > 390) errs.push('fiche INT : déborde à 390 px');
  await p.click('.fiche-famille a'); await p.waitForTimeout(150);
  // Le titre de la famille est à l'écran : en haut, ou la page est descendue au plus bas (peu de familles).
  const surFamille = id => p.evaluate(id => {
    const h = document.getElementById(id); if (!h) return 'titre absent';
    const r = h.getBoundingClientRect(), max = document.documentElement.scrollHeight - innerHeight;
    return r.top >= 0 && r.bottom <= innerHeight && (r.top < 200 || scrollY >= max - 1) ? '' : 'haut ' + Math.round(r.top) + ', défilement ' + Math.round(scrollY) + ' / ' + max;
  }, id);
  let pb = await surFamille('famille-entiers');
  if (!/#\/types\/entiers$/.test(p.url()) || pb) errs.push('#/types/entiers ne s\'ouvre pas sur la famille « Entiers » : ' + pb);
  // Une carte de résultat : « type de donnée » aussi
  await p.evaluate(() => { location.hash = '#/dico'; }); await p.waitForTimeout(150);
  await p.fill('#dico-q', 'INT'); await p.waitForTimeout(80);
  const cartes = await p.$$eval('.fiche-res', xs => xs.slice(0, 3).map(x => x.querySelector('strong').textContent + ' · ' + x.querySelector('.tag').textContent));
  if (cartes[0] !== 'INT · type de donnée') errs.push('« INT » : la fiche INT n\'est pas la 1re, ou mal étiquetée : ' + cartes.join(' / '));
  // Les mots d'une famille : une fiche de test « Listes de valeurs » (en mémoire) ; elle entre aussi dans le tableau
  await p.evaluate(() => {
    LEARNSQL.dico.push({ id: 'test-type', nom: 'TEST_TYPE', type: 'type', categorie: 'Types de données', famille: 'Listes de valeurs',
      definition: 'Une fiche de test.', moteurs: { sqlserver: 'a', snowflake: 'b', mysql: 'c' },
      apercu: { sqlserver: '— (CHECK)', snowflake: '— (VARCHAR)', mysql: 'Une valeur de la liste' }, motsCles: ['test'] });
  });
  await p.fill('#dico-q', 'listes de valeurs'); await p.waitForTimeout(80);
  const lv = await p.$$eval('.fiche-res', xs => xs.slice(0, 3).map(x => x.getAttribute('href').replace('#/dico/', '')));
  const deLaFamille = await p.evaluate(ids => ids.filter(id => LEARNSQL.dico.some(f => f.id === id && f.famille === 'Listes de valeurs')), lv);
  if (!deLaFamille.length) errs.push('« listes de valeurs » : aucun type de cette famille dans les 3 premières : ' + lv.join(', '));
  await p.evaluate(() => { location.hash = '#/types/listes-de-valeurs'; }); await p.waitForTimeout(150);
  const ligne = await p.$$eval('#famille-listes-de-valeurs + .types-cadre tbody tr', trs => trs.map(tr => tr.innerText.replace(/\s+/g, ' ').trim()));
  if (!ligne.some(l => l === 'TEST_TYPE — (CHECK) — (VARCHAR) Une valeur de la liste')) errs.push('le tableau « Listes de valeurs » sans la fiche de test : ' + ligne.join(' / '));
  pb = await surFamille('famille-listes-de-valeurs');
  if (pb) errs.push('#/types/listes-de-valeurs ne s\'ouvre pas sur sa famille : ' + pb);
  if (await p.evaluate(() => document.documentElement.scrollWidth) > 390) errs.push('page des types (2 familles) : déborde à 390 px');
  console.log('errors', errs); await b.close();
})();
