// Astuces SQL (#/astuces, docs/astuces.md), sans compte : la carte sur la page Outils, la liste par famille, la recherche
// (« numéro client avec des zéros devant » → zeros-devant en 1er), le sélecteur de moteur, la page d'une astuce (solution,
// exemple, résultat, piège, « En pratique », « Voir aussi » vers le dico), « Nouvelle recherche », une recherche sans
// réponse (lien vers le dico qui garde la phrase), une réponse peu sûre, 390 px sans débordement, aucune erreur JavaScript.
// Les familles et les liens attendus sont lus dans les données (LEARNSQL.astuces, LEARNSQL.dico), pas écrits ici.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const verifier = (ok, m) => { if (!ok) errs.push(m); };
  const attendre = (ms) => p.waitForTimeout(ms || 120);
  const texte = s => p.$eval(s, x => x.textContent.replace(/\s+/g, ' ').trim()).catch(() => '');
  const largeur = async ou => { const l = await p.evaluate(() => document.documentElement.scrollWidth); verifier(l <= 390, ou + ' : la page déborde (' + l + ' px)'); };
  const chercher = async q => { await p.fill('#astuces-q', q); await attendre(80); return p.$$eval('#astuces-res .fiche-res', xs => xs.map(x => x.getAttribute('href'))); };

  // 1. La carte « Astuces SQL » sur la page Outils, sans compte
  await p.goto(U + '#/outils'); await attendre(200);
  const carte = await p.$('.o-carte[href="#/astuces"]');
  verifier(carte && /Astuces SQL/.test(await carte.textContent()), 'pas de carte « Astuces SQL » sur la page Outils (sans compte)');
  await p.click('.o-carte[href="#/astuces"]'); await attendre();
  verifier(await texte('h1') === 'Astuces SQL', 'la carte ne mène pas aux astuces : ' + await texte('h1'));
  verifier(/sortir un numéro client avec des zéros devant/.test(await p.getAttribute('#astuces-q', 'placeholder')), 'texte d\'exemple de la recherche');

  // 2. Sans phrase : toutes les astuces, rangées par famille (ordre : Compléter, Formater, Nettoyer du texte, Manipuler,
  // Dates utiles, Contrôler les données)
  const ORDRE = ['Compléter', 'Formater', 'Nettoyer du texte', 'Manipuler', 'Dates utiles', 'Contrôler les données'];
  const familles = await p.$$eval('#astuces-res h2', xs => xs.map(x => x.textContent));
  const attendues = await p.evaluate(o => o.filter(f => LEARNSQL.astuces.some(a => a.famille === f)), ORDRE);
  verifier(familles.join('|') === attendues.join('|') && familles.length >= 1, 'familles : ' + familles.join('|') + ' au lieu de ' + attendues.join('|'));
  const nbLiens = await p.$$eval('#astuces-res .astuces-liste a', xs => xs.length), nb = await p.evaluate(() => LEARNSQL.astuces.length);
  verifier(nbLiens === nb, 'liste : ' + nbLiens + ' astuces au lieu de ' + nb);
  verifier(await p.$('#astuces-res a[href="#/astuces/zeros-devant"]'), 'zeros-devant absente de la liste');
  await largeur('liste des astuces');

  // 3. La recherche : la phrase de l'élève, et des variantes
  let res = await chercher('numéro client avec des zéros devant');
  console.log('« numéro client avec des zéros devant » →', res.slice(0, 3).join(', '));
  verifier(res[0] === '#/astuces/zeros-devant', 'zeros-devant n\'est pas en 1er : ' + res.join(', '));
  res = await chercher("j'aimerais bien sortir un numero client avec des zeros");
  verifier(res[0] === '#/astuces/zeros-devant', 'phrase sans accents : ' + res.join(', '));
  await largeur('résultats de la recherche');

  // 4. Le sélecteur de moteur (celui du dico) : MySQL seul, puis les 3
  await chercher('numéro client avec des zéros devant');
  await p.click('.moteur[data-moteur="mysql"]'); await attendre(80);
  let dt = await p.$$eval('#astuces-res .fiche-res:first-child .syntaxe dt', xs => xs.map(x => x.textContent));
  verifier(dt.join() === 'MySQL' && /LPAD/.test(await texte('#astuces-res .fiche-res:first-child .syntaxe dd')), 'sélecteur MySQL : ' + dt.join());
  await p.click('.moteur[data-moteur="tous"]'); await attendre(80);
  dt = await p.$$eval('#astuces-res .fiche-res:first-child .syntaxe dt', xs => xs.map(x => x.textContent));
  verifier(dt.join() === 'SQL Server,Snowflake,MySQL', 'sélecteur Tous : ' + dt.join());

  // 5. La page d'une astuce : solution, exemple, résultat, piège, « En pratique », « Voir aussi » vers le dico
  await p.click('.moteur[data-moteur="sqlserver"]'); await attendre(80);
  await p.click('#astuces-res a[href="#/astuces/zeros-devant"]'); await attendre(150);
  const a = await p.evaluate(() => LEARNSQL.astuces.filter(x => x.id === 'zeros-devant')[0]);
  const page = await p.evaluate(() => ({
    h1: document.querySelector('h1').textContent, tags: Array.from(document.querySelectorAll('.tags .tag')).map(x => x.textContent),
    actif: (document.querySelector('.moteur.actif') || {}).textContent, dt: Array.from(document.querySelectorAll('#astuce-corps .syntaxe dt')).map(x => x.textContent),
    labels: Array.from(document.querySelectorAll('#astuce-corps .label')).map(x => x.textContent),
    ex: Array.from(document.querySelectorAll('#astuce-corps pre')).map(x => x.textContent),
    th: Array.from(document.querySelectorAll('#astuce-corps .resultat th')).map(x => x.textContent),
    lignes: document.querySelectorAll('#astuce-corps .resultat tbody tr').length,
    piege: (document.querySelector('#astuce-corps .feedback.ko') || {}).textContent || '',
    pratique: (document.querySelector('#astuce-corps .feedback.pratique') || {}).textContent || '',
    voir: Array.from(document.querySelectorAll('.puces a.puce')).map(x => x.getAttribute('href')),
    sc: document.documentElement.scrollWidth }));
  console.log('page zeros-devant :', JSON.stringify({ h1: page.h1, labels: page.labels, th: page.th, voir: page.voir }));
  verifier(page.h1 === a.titre && page.tags.join() === a.famille, 'titre ou famille : ' + page.h1 + ' / ' + page.tags.join());
  verifier(page.actif === 'SQL Server' && page.dt.join() === 'SQL Server' && page.labels[0] === 'La solution', 'moteur gardé ou solution : ' + page.actif + ' ' + page.dt.join());
  verifier(page.ex.length === 1 && page.ex[0] === a.exemple, 'exemple SQL Server : ' + page.ex.join(' // '));
  verifier(page.th.join() === a.resultat[0].join() && page.lignes === a.resultat.length - 1, 'résultat : ' + page.th.join() + ' · ' + page.lignes + ' lignes');
  verifier(page.piege.indexOf('Le piège :') === 0 && page.pratique.indexOf('En pratique :') === 0, 'piège ou « En pratique » absent');
  const voirAttendus = await p.evaluate(() => LEARNSQL.astuces.filter(x => x.id === 'zeros-devant')[0].voirAussi
    .filter(v => LEARNSQL.dico.some(f => f.id === v && f.domaine !== 'divalto')).map(v => '#/dico/' + v));
  verifier(page.voir.length >= 1 && page.voir.join() === voirAttendus.join(), '« Voir aussi » : ' + page.voir.join() + ' au lieu de ' + voirAttendus.join());
  verifier(/Voir aussi dans le dico/.test(await texte('#app')), 'titre « Voir aussi dans le dico »');
  verifier(page.sc <= 390, 'page d\'une astuce : la page déborde (' + page.sc + ' px)');
  // Snowflake : son exemple à lui
  await p.click('.moteur[data-moteur="snowflake"]'); await attendre(80);
  const exSf = await p.$$eval('#astuce-corps pre', xs => xs.map(x => x.textContent));
  verifier(exSf.length === 1 && exSf[0] === (a.exemples || {}).snowflake, 'exemple Snowflake : ' + exSf.join(' // '));
  await p.click('.moteur[data-moteur="tous"]'); await attendre(80);
  await largeur('page d\'une astuce (Tous)');
  // Un lien « Voir aussi » ouvre la fiche du dico
  const premier = page.voir[0];
  await p.click('.puces a[href="' + premier + '"]'); await attendre(150);
  const nomFiche = await p.evaluate(id => LEARNSQL.dico.filter(f => f.id === id)[0].nom, premier.replace('#/dico/', ''));
  verifier(await texte('h1') === nomFiche, '« Voir aussi » → ' + premier + ' : ' + await texte('h1'));
  await p.goBack(); await attendre(150);
  // « Nouvelle recherche » : la phrase est gardée
  await p.click('.actions a[href="#/astuces"]'); await attendre(150);
  verifier(await p.inputValue('#astuces-q') === 'numéro client avec des zéros devant', 'la phrase n\'est pas gardée : ' + await p.inputValue('#astuces-q'));
  verifier((await p.$$eval('#astuces-res .fiche-res', xs => xs.length)) >= 1, 'résultats perdus après « Nouvelle recherche »');

  // 6. Aucune réponse : le message, et le lien vers le dico qui garde la phrase
  res = await chercher('zzqxw');
  verifier(!res.length && await texte('#astuces-aucune') === 'Aucune astuce ne correspond. Essaie d\'autres mots, ou cherche dans le dico.', 'aucune réponse : ' + await texte('#astuces-res'));
  await largeur('aucune réponse');
  await p.click('#astuces-aucune a.vers-dico'); await attendre(150);
  verifier(await texte('h1') === 'Super dico SQL' && await p.inputValue('#dico-q') === 'zzqxw', 'le lien vers le dico ne garde pas la phrase : ' + await p.inputValue('#dico-q').catch(() => '?'));

  // 7. Une réponse peu sûre : « Les plus proches » (une astuce d'essai en mémoire, trouvée par un seul mot de sa solution)
  await p.evaluate(() => {
    LEARNSQL.astuces.push({ id: 'test-proche', titre: 'Une astuce de test', famille: 'Manipuler', besoins: ['aaa bbb', 'ccc ddd'], essais: ['eee', 'fff'],
      moteurs: { sqlserver: 'Avec le mot zorglub', snowflake: '`F(x)`', mysql: '`F(x)`' }, exemple: 'SELECT 1;', piege: 'Le piège.', motsCles: ['test'] });
    location.hash = '#/astuces';
  });
  await attendre(150);
  res = await chercher('zorglub');
  verifier(res.join() === '#/astuces/test-proche' && /Pas d'astuce sûre pour « zorglub »\. Les plus proches :/.test(await texte('#astuces-res')) &&
    await p.$('#astuces-res a.vers-dico'), 'réponse peu sûre : ' + await texte('#astuces-res'));
  await p.click('.moteur[data-moteur="tous"]'); await attendre(80);

  console.log('astuces : carte Outils, liste par famille, recherche, moteurs, page d\'une astuce, aucune réponse, réponse peu sûre, 390 px');
  console.log('errors', errs); await b.close();
})();
