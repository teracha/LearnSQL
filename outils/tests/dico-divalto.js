// Dico Divalto (docs/dico.md, « Le dico Divalto ») : l'onglet (réservé au parcours Divalto), la recherche par onglet,
// la fiche Divalto et ses blocs, le message sans droit, mobile 390 px. Supabase simulé.
// Des fiches de test (en mémoire) remplacent data/dico/divalto.js ; à la fin, les vraies fiches sont contrôlées aussi.
const { chromium } = require('playwright'); const fs = require('fs'), vm = require('vm');
const racine = require('path').join(__dirname, '..', '..');
const src = n => ({ titre: 'Page de test ' + n, url: 'https://divalto.atlassian.net/wiki/test-' + n });
const FICHES = [
  { id: 'dv-test-mouv', nom: 'MOUV', type: 'table', domaine: 'divalto', categorie: 'Tables Divalto',
    definition: "Les lignes des pièces commerciales : une ligne par article d'une commande, d'un BL ou d'une facture.",
    noms: ['mouvements'], champs: [['PINO', 'le numéro de la pièce'], ['REF', "la référence de l'article (`ART.REF`)"]],
    liens: ["ENT : l'en-tête de la pièce (une pièce ENT, plusieurs lignes MOUV)"],
    exemple: 'SELECT m.PINO, m.REF\nFROM MOUV m\nJOIN ENT e ON e.PINO = m.PINO  -- un commentaire assez long pour dépasser la largeur d\'un téléphone',
    piege: 'Le piège de test.', pratique: 'Le conseil de test.',
    motsCles: ['ligne', 'lignes de commande', 'detail', 'article', 'piece', 'mouvement', 'quantite', 'commande'],
    voirAussi: ['dv-test-ent', 'inner-join', 'dv-test-pino'], source: src('mouv') },
  { id: 'dv-test-ent', nom: 'ENT', type: 'table', domaine: 'divalto', categorie: 'Tables Divalto',
    definition: "L'en-tête des pièces commerciales : une ligne par commande, BL ou facture.",
    champs: [['DOS / PINO', 'le dossier et le numéro de la pièce'], ['TICOD', 'le type de tiers']],
    motsCles: ['entete', 'en-tete', 'piece', 'commande', 'facture', 'bon de livraison', 'tiers', 'client'], source: src('ent') },
  { id: 'dv-test-pino', nom: 'PINO', type: 'champ', domaine: 'divalto', categorie: 'Champs Divalto',
    definition: "Le numéro d'une pièce : il relie l'en-tête et ses lignes.",
    motsCles: ['numero de piece', 'numero', 'piece', 'cle', 'commande', 'facture', 'identifiant', 'relier'], source: src('pino') },
  { id: 'dv-test-vue', nom: 'VUE_TEST_STOCK_ARTICLE_DEPOT_DETAILLE', type: 'vue', domaine: 'divalto', categorie: 'Vues Divalto',
    definition: 'Une vue de test <b>sans</b> autre bloc.',
    motsCles: ['vue', 'stock', 'depot', 'article', 'quantite', 'disponible', 'magasin', 'inventaire'], source: src('vue') },
  { id: 'dv-test-ca', nom: "Chiffre d'affaires par client", type: 'requête', domaine: 'divalto', categorie: 'Requêtes Dataviz',
    definition: "Le chiffre d'affaires de chaque client, sur les factures de vente.",
    indicateurs: ['Client', "Chiffre d'affaires"], regles: ['Basé sur les factures de vente (C, CPV)'],
    motsCles: ["chiffre d'affaires", 'client', 'ventes', 'facture', 'dataviz', 'tableau de bord', 'indicateur', 'montant'],
    sources: [src('ca-1'), src('ca-2')], version: 'Une ancienne page (10.12) dit autre chose.' }
];
const MESSAGE = 'Cette fiche fait partie du dico Divalto, réservé aux comptes qui ont le parcours Divalto.';
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const verifier = (ok, msg) => { if (!ok) errs.push(msg); };
  const vraies = fs.readFileSync(racine + '/data/dico/divalto.js', 'utf8');
  let servir = 'test';
  await p.route('**/data/dico/divalto.js', r => r.fulfill({ contentType: 'application/javascript',
    body: servir === 'test' ? 'LEARNSQL.dico = (LEARNSQL.dico || []).concat(' + JSON.stringify(FICHES) + ');' : vraies }));
  // Supabase : julie (agent) ; le parcours Divalto est réservé au groupe 1.
  const db = { profil: [{ user_id: 'u2', role: 'agent' }], groupe: [{ id: 1, nom: 'Pôle métier' }, { id: 2, nom: 'Invité' }],
    membre: [{ groupe_id: 2, user_id: 'u2' }], progression: [], acces: [{ element: 'divalto', groupe_id: 1 }] };
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T', refresh_token: 'R', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u2', email: 'julie@x.fr' });
    if (u.pathname === '/auth/v1/logout') return r.fulfill({ status: 204, body: '' });
    const tab = u.pathname.replace('/rest/v1/', ''), rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET' && tab === 'membre') return json(rows.filter(match).map(x => ({ groupe_id: x.groupe_id, groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
    if (m === 'GET') return json(rows.filter(match));
    return r.fulfill({ status: m === 'POST' ? 201 : 204, body: '' });
  });
  const U = 'file://' + racine + '/index.html';
  const attendre = () => p.waitForTimeout(150);
  const largeur = async (ou) => { const sc = await p.evaluate(() => document.documentElement.scrollWidth); verifier(sc <= 390, ou + ' déborde sur mobile (' + sc + ' px)'); };
  const resultats = async q => { await p.fill('#dico-q', q); await p.waitForTimeout(80); return p.$$eval('.fiche-res', xs => xs.map(x => x.getAttribute('href').replace('#/dico/', ''))); };
  const puces = () => p.$$eval('#dico-res .puce', xs => xs.map(x => x.getAttribute('href').replace('#/dico/', '')));
  const etat = () => p.evaluate(() => ({ h1: document.querySelector('h1').textContent, onglets: !!document.querySelector('.onglets'),
    moteurs: !!document.querySelector('.moteurs'), actif: (document.querySelector('.onglet[aria-selected="true"]') || {}).id || '',
    garde: localStorage.getItem('learnsql-dico-domaine'), focus: document.activeElement && document.activeElement.id }));
  const QUESTIONS = ['coalesce', 'enlever les espaces', 'PINO', 'MOUV', 'lignes de commande', 'jointure', 'mouvements'];
  // Une fiche SQL de test dont « Voir aussi » vise une fiche Divalto.
  const ajouterFicheSql = () => p.evaluate(() => {
    if (window.LEARNSQL.dico.some(f => f.id === 'test-sql-voir')) return;
    window.LEARNSQL.dico.push({ id: 'test-sql-voir', nom: 'TEST_SQL', type: 'mot-clé', categorie: 'Requête', definition: 'Une fiche SQL de test.',
      moteurs: { sqlserver: 'a', snowflake: 'b', mysql: 'c' }, motsCles: ['test'], voirAussi: ['dv-test-mouv', 'coalesce'] });
  });
  // Sans le parcours Divalto : le dico SQL seul, même si l'onglet Divalto est gardé dans le navigateur.
  const fichesSansDroit = async (qui, connecte) => {
    await p.evaluate(() => localStorage.setItem('learnsql-dico-domaine', 'divalto'));
    await p.goto(U + '#/dico'); await p.reload(); await attendre();
    await ajouterFicheSql();
    const e = await etat();
    verifier(!e.onglets && e.h1 === 'Super dico SQL' && e.moteurs, qui + ' : la page du dico a changé ' + JSON.stringify(e));
    const l = await puces(); verifier(l.length >= 30 && !l.some(id => /^dv-/.test(id)), qui + ' : fiches Divalto dans le dico SQL');
    const res = {};
    for (const q of QUESTIONS) { res[q] = await resultats(q); verifier(!res[q].some(id => /^dv-/.test(id)), qui + ' : « ' + q + ' » donne une fiche Divalto'); }
    await p.fill('#dico-q', '');
    await p.goto(U + '#/dico/dv-test-mouv'); await attendre();
    const t = await p.textContent('#app');
    verifier(t.indexOf(MESSAGE) >= 0, qui + ' : pas de message sur une fiche Divalto');
    verifier(t.indexOf('MOUV') < 0 && t.indexOf('lignes des pièces') < 0 && !(await p.$('.champs, #fiche-corps, a[target="_blank"]')), qui + ' : contenu de la fiche Divalto visible');
    verifier(!!(await p.$('#app a.btn[href="#/compte"]')) === !connecte, qui + ' : lien « Se connecter »');
    await largeur(qui + ' : message');
    // « Voir aussi » d'une fiche SQL : pas de lien vers une fiche Divalto.
    await p.evaluate(() => { location.hash = '#/dico/test-sql-voir'; }); await attendre();
    verifier(!(await p.$('.puce[href="#/dico/dv-test-mouv"]')) && (await p.$('.puce[href="#/dico/coalesce"]')), qui + ' : « Voir aussi » montre une fiche Divalto');
    return res;
  };

  // 1. Sans compte : pas d'onglet (même si l'onglet Divalto est gardé), le message sur une fiche dv-…
  await p.goto(U + '#/dico'); await attendre();
  const sansCompte = await fichesSansDroit('sans compte', false);
  console.log('sans compte : PINO →', sansCompte.PINO.slice(0, 3).join(', ') || '(rien)');

  // 2. Compte sans le parcours Divalto (groupe 2) : pareil.
  await p.goto(U + '#/compte'); await p.fill('#email', 'julie@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await p.waitForTimeout(800);
  await fichesSansDroit('compte sans le parcours', true);

  // 3. Le compte a le parcours (groupe 1) : deux onglets, SQL par défaut ; l'onglet SQL n'a aucune fiche Divalto.
  db.membre.push({ groupe_id: 1, user_id: 'u2' }); await p.goto(U + '#/compte'); await p.click('#sync'); await p.waitForTimeout(800);
  await p.evaluate(() => localStorage.removeItem('learnsql-dico-domaine'));
  await p.goto(U + '#/dico'); await attendre();
  await ajouterFicheSql();
  let e = await etat();
  const onglets = await p.$$eval('.onglet', xs => xs.map(x => x.textContent + ':' + x.getAttribute('aria-selected') + ':' + x.getAttribute('tabindex')));
  verifier(onglets.join() === 'SQL:true:0,Divalto:false:-1', 'onglets : ' + onglets.join());
  verifier(e.h1 === 'Super dico SQL' && e.moteurs && e.actif === 'onglet-sql', 'onglet SQL par défaut : ' + JSON.stringify(e));
  const pucesSql = await puces(); verifier(pucesSql.length >= 30 && !pucesSql.some(id => /^dv-/.test(id)), 'onglet SQL : fiches Divalto');
  for (const q of QUESTIONS) {
    const r = await resultats(q);
    verifier(JSON.stringify(r) === JSON.stringify(sansCompte[q]), 'onglet SQL : « ' + q + ' » ne donne pas la même chose que sans compte : ' + r.join(', '));
  }
  await largeur('onglet SQL');

  // 4. L'onglet Divalto : titre, pas de sélecteur de moteur, thèmes Divalto dans l'ordre, recherche dans ses fiches seulement.
  await p.fill('#dico-q', ''); await p.click('#onglet-divalto'); await attendre();
  e = await etat();
  verifier(e.h1 === 'Super dico Divalto' && !e.moteurs && e.actif === 'onglet-divalto' && e.garde === 'divalto' && e.focus === 'onglet-divalto', 'onglet Divalto : ' + JSON.stringify(e));
  const themes = await p.$$eval('#dico-res h2', xs => xs.map(x => x.textContent));
  verifier(themes.join() === 'Tables Divalto,Champs Divalto,Vues Divalto,Requêtes Dataviz', 'thèmes Divalto : ' + themes.join());
  const pucesDv = await puces(); verifier(pucesDv.length === FICHES.length && pucesDv.every(id => /^dv-test-/.test(id)), 'onglet Divalto : ' + pucesDv.join(', '));
  await largeur('onglet Divalto');
  // ids : les premiers résultats attendus (le premier à sa place, les suivants dans n'importe quel ordre) ; [] : aucun.
  const attendu = async (q, ids) => {
    const r = await resultats(q); console.log('Divalto', JSON.stringify(q), '→', r.join(', ') || '(rien)');
    const ok = ids.length ? r[0] === ids[0] && JSON.stringify(r.slice(0, ids.length).sort()) === JSON.stringify(ids.slice().sort()) : !r.length;
    verifier(ok, 'Divalto « ' + q + ' » : ' + r.join(', '));
  };
  await attendu('PINO', ['dv-test-pino', 'dv-test-ent', 'dv-test-mouv']);       // la fiche du champ, puis les tables qui l'ont
  const carte = await p.$eval('.fiche-res[href="#/dico/dv-test-mouv"]', x => x.textContent).catch(() => '(pas de carte)');
  verifier(/Champ PINO : le numéro de la pièce/.test(carte), 'la carte de MOUV ne dit pas son champ PINO : ' + carte);
  const carteEnt = await p.$eval('.fiche-res[href="#/dico/dv-test-ent"]', x => x.textContent).catch(() => '(pas de carte)');
  verifier(/Champ DOS \/ PINO : le dossier/.test(carteEnt), 'la carte de ENT ne dit pas sa case « DOS / PINO » : ' + carteEnt);
  await attendu('TICOD', ['dv-test-ent']);
  await attendu('lignes de commande', ['dv-test-mouv']);
  await attendu('mouvements', ['dv-test-mouv']);
  await attendu("chiffre d'affaires", ['dv-test-ca']);
  await attendu('coalesce', []);
  await attendu('zzqxw', []);
  verifier((await p.textContent('#dico-res')).indexOf('nom de table ou de champ') >= 0, 'onglet Divalto : message « aucune fiche »');
  // L'onglet est gardé ; flèche gauche → onglet SQL.
  await p.fill('#dico-q', ''); await p.reload(); await attendre();
  e = await etat(); verifier(e.actif === 'onglet-divalto' && e.h1 === 'Super dico Divalto', 'onglet Divalto non gardé : ' + JSON.stringify(e));
  await p.focus('#onglet-divalto'); await p.keyboard.press('ArrowLeft'); await attendre();
  e = await etat(); verifier(e.actif === 'onglet-sql' && e.garde === 'sql' && e.focus === 'onglet-sql' && e.moteurs, 'flèche gauche : ' + JSON.stringify(e));

  // 5. La fiche Divalto : chaque bloc seulement s'il existe, la source, pas de moteurs.
  const fiche = async id => {
    await p.goto(U + '#/dico/' + id); await attendre();
    return p.evaluate(() => {
      const t = s => Array.from(document.querySelectorAll(s)).map(x => x.textContent.trim());
      return { h1: document.querySelector('h1').textContent, police: getComputedStyle(document.querySelector('h1')).fontFamily,
        labels: t('#fiche-corps .label'), entetes: t('.champs th'), lignes: t('.champs tbody tr'),
        lienChamp: (document.querySelector('.champs a') || {}).hash || '', code: !!document.querySelector('.champs td:nth-child(2) code'),
        points: t('#fiche-corps .points li'), exemple: (document.querySelector('#fiche-corps pre.code') || {}).textContent || '',
        piege: t('#fiche-corps .feedback.ko'), pratique: t('#fiche-corps .feedback.pratique'), voir: t('.puces .puce'),
        sources: Array.from(document.querySelectorAll('#app a[target="_blank"]')).map(a => a.textContent + '|' + a.getAttribute('href') + '|' + a.getAttribute('rel')),
        texte: document.querySelector('#app').textContent, gras: !!document.querySelector('.definition b'),
        moteurs: !!document.querySelector('.moteurs, .syntaxe'), corps: !!document.querySelector('#fiche-corps') };
    });
  };
  let f = await fiche('dv-test-mouv');
  console.log('fiche MOUV :', f.labels.join(' / '), '| voir :', f.voir.join(', '), '| source :', f.sources.join());
  verifier(f.h1 === 'MOUV' && /JetBrains/.test(f.police), 'MOUV : titre ' + f.h1 + ' ' + f.police);
  verifier(f.labels.join() === 'Les champs,Les liens,Exemple', 'MOUV : blocs ' + f.labels.join());
  verifier(f.entetes.join() === 'Champ,Sens' && f.lignes.length === 2 && f.lignes[0] === 'PINOle numéro de la pièce', 'MOUV : tableau des champs ' + f.lignes.join(' / '));
  verifier(f.lienChamp === '#/dico/dv-test-pino', 'MOUV : le champ PINO ne renvoie pas vers sa fiche');
  verifier(f.code, 'MOUV : `ART.REF` pas en police code');
  verifier(f.points.length === 1 && /^ENT : /.test(f.points[0]), 'MOUV : liens ' + f.points.join());
  verifier(/FROM MOUV m/.test(f.exemple) && f.piege.length === 1 && f.pratique.length === 1 && /^En pratique :/.test(f.pratique[0]), 'MOUV : exemple, piège ou conseil');
  verifier(f.voir.join() === 'ENT,INNER JOIN,PINO', 'MOUV : voir aussi ' + f.voir.join());
  verifier(f.sources.join() === 'Page de test mouv|https://divalto.atlassian.net/wiki/test-mouv|noopener' && /Source : Page de test mouv/.test(f.texte), 'MOUV : source');
  verifier(!f.moteurs && !/Indicateurs|Règles de gestion|Version/.test(f.texte), 'MOUV : bloc en trop');
  await largeur('fiche MOUV');
  // Une case qui groupe plusieurs champs : chaque code a sa police code, seul PINO (qui a sa fiche) est un lien.
  await fiche('dv-test-ent');
  const caseGroupee = await p.$eval('.champs tbody tr td', td => ({ codes: Array.from(td.querySelectorAll('code')).map(c => c.textContent),
    liens: Array.from(td.querySelectorAll('a')).map(a => a.textContent + ' ' + a.hash) }));
  verifier(caseGroupee.codes.join() === 'DOS,PINO' && caseGroupee.liens.join() === 'PINO #/dico/dv-test-pino', 'ENT : case « DOS / PINO » ' + JSON.stringify(caseGroupee));
  f = await fiche('dv-test-ca');
  verifier(f.h1 === "Chiffre d'affaires par client" && !/JetBrains/.test(f.police), 'requête : titre ' + f.police);
  verifier(f.labels.join() === 'Indicateurs,Règles de gestion' && f.points.join('|') === "Client|Chiffre d'affaires|Basé sur les factures de vente (C, CPV)", 'requête : ' + f.labels.join() + ' ' + f.points.join('|'));
  verifier(f.sources.length === 2 && /Sources :/.test(f.texte) && /Version : Une ancienne page/.test(f.texte), 'requête : sources ou version');
  verifier(!f.voir.length && !f.piege.length && !f.pratique.length && !f.exemple && !f.entetes.length, 'requête : bloc en trop');
  await largeur('fiche requête');
  f = await fiche('dv-test-vue');
  verifier(!f.corps && !f.voir.length && f.sources.length === 1 && !/Version/.test(f.texte), 'vue sans bloc : ' + JSON.stringify(f.labels));
  verifier(!f.gras && f.texte.indexOf('<b>sans</b>') >= 0, 'vue : le texte de la fiche n\'est pas échappé');
  await largeur('fiche au nom long');
  // « Nouvelle recherche » ramène à l'onglet de la fiche.
  await p.evaluate(() => localStorage.setItem('learnsql-dico-domaine', 'sql'));
  await fiche('dv-test-mouv'); await p.click('.actions a[href="#/dico"]'); await attendre();
  e = await etat(); verifier(e.h1 === 'Super dico Divalto', 'fiche Divalto → nouvelle recherche : ' + e.h1);
  await fiche('dv-test-mouv'); await p.click('.puce[href="#/dico/inner-join"]'); await attendre();
  verifier(await p.$('.moteurs'), 'fiche SQL (depuis une fiche Divalto) sans sélecteur de moteur');
  await p.click('.actions a[href="#/dico"]'); await attendre();
  e = await etat(); verifier(e.h1 === 'Super dico SQL' && e.garde === 'sql', 'fiche SQL → nouvelle recherche : ' + e.h1);

  // 6. Traduire une requête ne renvoie jamais vers une fiche Divalto, même si elle porte un nom SQL.
  await p.evaluate(() => { window.LEARNSQL.dico.unshift({ id: 'dv-test-traduire', nom: 'PARTITION BY', domaine: 'divalto', type: 'vue', categorie: 'Vues Divalto', definition: 'Test.' }); });
  await p.goto(U + '#/traduire'); await attendre();
  await p.fill('#tr-sql', 'SELECT client_id, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde) AS rn FROM commande;');
  await p.click('#tr-go'); await attendre();
  const liens = await p.$$eval('#tr-res .puce', xs => xs.map(x => x.getAttribute('href')));
  verifier(liens.length && !liens.some(h => /dv-/.test(h)), 'Traduire renvoie vers une fiche Divalto : ' + liens.join());

  // 7. Les vraies fiches (data/dico/divalto.js) : rien dans l'onglet SQL ; chaque fiche s'affiche avec sa source.
  servir = 'vraies';
  const ctx = { LEARNSQL: {} }; vm.runInNewContext(vraies, ctx);
  const reelles = (ctx.LEARNSQL.dico || []).filter(x => x.domaine === 'divalto');
  await p.evaluate(() => localStorage.setItem('learnsql-dico-domaine', 'divalto'));
  await p.goto(U + '#/dico'); await p.reload(); await attendre();
  if (!reelles.length) verifier(/pas encore de fiche/.test(await p.textContent('#dico-res')), 'dico Divalto vide : pas de message');
  else verifier((await puces()).length === reelles.length, 'vraies fiches : ' + (await puces()).length + ' puces pour ' + reelles.length + ' fiches');
  await p.click('#onglet-sql'); await attendre();
  verifier(!(await puces()).some(id => /^dv-/.test(id)), 'vraies fiches : fiche Divalto dans l\'onglet SQL');
  for (const x of reelles) {
    await p.evaluate(id => { location.hash = '#/dico/' + id; }, x.id); await p.waitForTimeout(40);
    const r = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, src: document.querySelectorAll('#app a[target="_blank"][href^="https://"]').length,
      sc: document.documentElement.scrollWidth }));
    verifier(r.h1 === x.nom && r.src >= 1 && r.sc <= 390, 'vraie fiche ' + x.id + ' : ' + JSON.stringify(r));
  }
  console.log('vraies fiches Divalto contrôlées :', reelles.length);

  // 8. Déconnexion : plus d'onglet, même si l'onglet Divalto est gardé.
  await p.goto(U + '#/compte'); await p.click('#deconnexion'); await p.waitForTimeout(300);
  await p.evaluate(() => localStorage.setItem('learnsql-dico-domaine', 'divalto'));
  await p.goto(U + '#/dico'); await attendre();
  e = await etat(); verifier(!e.onglets && e.h1 === 'Super dico SQL', 'déconnecté : ' + JSON.stringify(e));
  console.log('errors', errs); await b.close();
})();
