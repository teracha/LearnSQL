// Outils (docs/outils.md) : le menu, la page Outils (sans compte, sans le parcours, avec le parcours Chef de projet),
// les trois types d'outils (tableau, matrice, document : saisie, calcul, niveau, alerte, une carte par ligne à 390 px
// sans débordement, un tableau sur PC), les ajouts du moteur (rubrique lue par un tableau, total lu par le document,
// niveau d'un total, lignes du modèle, couleur d'un choix), les documents (nouveau, partir de l'exemple, renommer,
// dupliquer, supprimer, recharger la page), Enregistrer et Ouvrir un fichier (dont des fichiers faux), Excel (un vrai
// zip, pour les 12 outils), Copier, Imprimer, les liens avec les cours, du HTML dans les textes de l'élève, rien
// d'envoyé, aucune erreur JavaScript. Supabase simulé : julie (agent) ; le parcours chef-projet est réservé au groupe 1.
// L'horloge du navigateur est fixée au 15 janvier 2027 : les alertes « date passée » ne dépendent pas du jour du test.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), zlib = require('zlib');
const lireZip = require('./lire-zip.js');
const racine = path.join(__dirname, '..', '..');
const OUTILS = ['gp-cadrage', 'gp-risques', 'gp-raci', 'gp-compte-rendu', 'gp-rapport', 'gp-options', 'gp-decisions', 'gp-changements',
  'gp-budget', 'gp-business-case', 'gp-recette', 'gp-bascule'];
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, locale: 'fr-FR', acceptDownloads: true });
  const p = await ctx.newPage();
  await p.clock.setFixedTime(new Date('2027-01-15T10:00:00'));
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const verifier = (ok, msg) => { if (!ok) errs.push(msg); };
  const dialogues = []; p.on('dialog', d => { dialogues.push(d.message()); d.accept(); });
  // Impression et presse-papiers simulés : on garde ce qui est imprimé ou copié.
  await p.addInitScript(() => {
    window.__imprime = 0; window.print = () => { window.__imprime++; };
    window.__copie = null;
    try {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: t => { window.__copie = { 'text/plain': t }; return Promise.resolve(); },
        write: items => Promise.all(items[0].types.map(t => items[0].getType(t).then(bl => bl.text()).then(v => [t, v])))
          .then(l => { window.__copie = {}; l.forEach(([t, v]) => { window.__copie[t] = v; }); })
      } });
    } catch (e) { /* ignoré */ }
  });
  // Supabase simulé ; chaque envoi est gardé, pour vérifier qu'aucun document ne part.
  const envois = [];
  const db = { profil: [{ user_id: 'u2', role: 'agent' }], groupe: [{ id: 1, nom: 'Pôle projet' }, { id: 2, nom: 'Invité' }],
    membre: [{ groupe_id: 2, user_id: 'u2' }], progression: [], acces: [{ element: 'chef-projet', groupe_id: 1 }] };
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method();
    const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (r.request().postData()) envois.push(r.request().postData());
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T', refresh_token: 'R', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u2', email: 'julie@x.fr' });
    const tab = u.pathname.replace('/rest/v1/', ''), rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET' && tab === 'membre') return json(rows.filter(match).map(x => ({ groupe_id: x.groupe_id, groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
    if (m === 'GET') return json(rows.filter(match));
    return r.fulfill({ status: m === 'POST' ? 201 : 204, body: '' });
  });
  const U = 'file://' + racine + '/index.html';
  const attendre = ms => p.waitForTimeout(ms || 150);
  const aller = async h => { await p.evaluate(x => { location.hash = x; }, h); await attendre(); };
  const hash = () => p.evaluate(() => location.hash);
  const texte = s => p.textContent(s);
  const alertes = () => texte('#o-alertes');
  const lignes = sel => p.$$eval((sel || '#o-editeur') + ' tbody tr', xs => xs.length);
  // Rien ne dépasse à droite (390 px) : ni la page, ni un élément visible.
  const largeur = async ou => {
    const r = await p.evaluate(() => {
      const l = innerWidth, trop = [];
      document.querySelectorAll('body *').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.width && b.right > l + 1 && getComputedStyle(e).position !== 'absolute') trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right));
      });
      return { sw: document.documentElement.scrollWidth, trop: trop.slice(0, 4) };
    });
    verifier(r.sw <= 390 && !r.trop.length, ou + ' déborde sur téléphone : ' + JSON.stringify(r));
  };
  const telecharger = async sel => {
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click(sel)]);
    return { nom: dl.suggestedFilename(), octets: fs.readFileSync(await dl.path()) };
  };
  const ouvrir = async (nom, contenu) => {
    await p.setInputFiles('#o-fichier', { name: nom, mimeType: 'application/json', buffer: Buffer.from(contenu) });
    await attendre(300);
  };
  const calc = (sel) => p.evaluate(s => {
    const c = document.querySelector(s), n = c ? c.querySelector('.o-niveau') : null;
    return { t: c ? c.textContent.replace(/\s+/g, ' ').trim() : '', cl: n ? n.className : '' };
  }, sel);

  // 1. Le menu : un seul lien « Outils », à la place de « Dico » et « Traduire »
  await p.goto(U + '#/'); await attendre();
  const menu = await p.$$eval('nav a', xs => xs.map(x => x.getAttribute('href')));
  verifier(menu.indexOf('#/outils') >= 0, 'lien « Outils » absent du menu : ' + menu.join(' '));
  verifier(menu.indexOf('#/dico') < 0 && menu.indexOf('#/traduire') < 0, 'Dico ou Traduire encore dans le menu : ' + menu.join(' '));
  verifier(await texte('nav a[href="#/outils"]') === 'Outils', 'texte du lien « Outils »');

  // 2. Sans compte : le sujet SQL seul ; les pages de la gestion de projet donnent un message court
  await p.click('nav a[href="#/outils"]'); await attendre();
  verifier(await texte('h1') === 'Outils', 'titre de la page Outils');
  let sujets = await p.$$eval('.o-sujet h2', xs => xs.map(x => x.textContent));
  verifier(sujets.join('|') === 'SQL', 'sans compte : sujets ' + sujets.join('|'));
  const cartesSql = await p.$$eval('.o-sujet .o-carte', xs => xs.map(x => x.getAttribute('href')));
  verifier(cartesSql.join(' ') === '#/dico #/traduire', 'cartes du sujet SQL : ' + cartesSql.join(' '));
  verifier(/Connecte-toi/.test(await texte('#app')), 'sans compte : pas d\'invitation à se connecter');
  await largeur('page Outils (sans compte)');
  await p.click('.o-carte[href="#/dico"]'); await attendre();
  verifier(await texte('h1') === 'Super dico SQL', 'la carte du dico ne mène pas au dico');
  for (const h of ['#/outils/gp-risques', '#/outils/gp-risques/exemple', '#/outils/gp-raci/exemple', '#/outils/gp-cadrage/d123']) {
    await aller(h);
    const t = await texte('#app');
    verifier(/Outil réservé/.test(t) && /Chef de projet SI/.test(t) && !(await p.$('.o-table')) && !/DEMAT|Registre/.test(t), h + ' sans compte : ' + t.slice(0, 120));
    verifier(await p.$('#app .actions a[href="#/compte"]'), h + ' sans compte : pas de bouton « Se connecter »');
  }
  await aller('#/outils/inconnu');
  verifier(await hash() === '#/outils', 'un outil inconnu ne ramène pas à #/outils');

  // 3. Avec un compte, sans le parcours : toujours pas de gestion de projet
  await aller('#/compte'); await p.fill('#email', 'julie@x.fr'); await p.fill('#mdp', 'motdepasse1');
  await p.click('button[type=submit]'); await attendre(800);
  await aller('#/outils');
  sujets = await p.$$eval('.o-sujet h2', xs => xs.map(x => x.textContent));
  verifier(sujets.join('|') === 'SQL', 'compte sans le parcours : sujets ' + sujets.join('|'));
  await aller('#/outils/gp-raci');
  verifier(/Outil réservé/.test(await texte('#app')) && !(await p.$('#app .actions a[href="#/compte"]')), 'compte sans le parcours : message court, sans « Se connecter »');

  // 4. Avec le parcours (groupe 1) : le sujet « Gestion de projet » et ses 12 outils, dans l'ordre
  db.membre.push({ groupe_id: 1, user_id: 'u2' });
  await aller('#/compte'); await p.click('#sync'); await attendre(800);
  await aller('#/outils');
  sujets = await p.$$eval('.o-sujet h2', xs => xs.map(x => x.textContent));
  verifier(sujets.join('|') === 'SQL|Gestion de projet', 'avec le parcours : sujets ' + sujets.join('|'));
  const cartesGp = await p.$$eval('#sujet-gestion-projet .o-carte', xs => xs.map(x => x.getAttribute('href').replace('#/outils/', '')));
  verifier(cartesGp.join(' ') === OUTILS.join(' '), 'cartes de la gestion de projet : ' + cartesGp.join(' '));
  await largeur('page Outils (avec le parcours)');

  // 5. La page d'un outil : à quoi il sert, quand, « Comment faire » (3 étapes), « Voir l'exemple », ses cours
  await p.click('.o-carte[href="#/outils/gp-risques"]'); await attendre();
  const page = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, resume: (document.querySelector('.o-resume') || {}).textContent,
    etapes: document.querySelectorAll('.o-etapes li').length, exemple: !!document.querySelector('#o-voir-exemple'),
    cours: Array.from(document.querySelectorAll('#app a[href^="#/cours/"]')).map(a => a.getAttribute('href')), t: document.querySelector('#app').textContent }));
  verifier(page.h1 === 'Registre des risques' && page.resume && page.etapes === 3 && page.exemple && /Quand s'en servir/.test(page.t), 'page de l\'outil : ' + JSON.stringify(page).slice(0, 200));
  verifier(page.cours.join() === '#/cours/cp07,#/cours/cp08', 'liens vers les cours : ' + page.cours.join());
  verifier(/restent dans ce navigateur : rien n'est envoyé/.test(page.t), 'la page ne dit pas que les documents restent dans le navigateur');
  await largeur('page de l\'outil');

  // 6. L'exemple, en lecture, à sa date (8 février 2027) : niveaux (mot + couleur), totaux, aucune alerte, des cartes
  await p.click('#o-voir-exemple'); await attendre();
  const ex = await p.evaluate(() => ({ champs: document.querySelectorAll('#o-editeur input, #o-editeur select, #o-editeur textarea').length,
    lignes: document.querySelectorAll('#o-editeur tbody tr').length, cartes: !!document.querySelector('.o-zone.o-cartes'),
    ko: document.querySelectorAll('.o-niveau.o-ko').length, ok: document.querySelectorAll('.o-niveau.o-ok').length,
    att: document.querySelectorAll('.o-niveau.o-attention').length, date: document.querySelector('.o-exemple').textContent,
    alertes: document.querySelector('#o-alertes').textContent, totaux: document.querySelector('.o-totaux').textContent }));
  verifier(ex.champs === 0 && ex.lignes === 8 && ex.cartes && /situation au 08\/02\/2027/.test(ex.date), 'exemple : ' + JSON.stringify(ex).slice(0, 300));
  verifier(ex.ko === 5 && ex.ok === 1 && ex.att === 2, 'niveaux de l\'exemple : ' + JSON.stringify(ex));
  verifier(/Aucune alerte/.test(ex.alertes), 'l\'exemple du registre a une alerte : ' + ex.alertes);
  verifier(/les 5 plus gros au COPIL\) : 7/.test(ex.totaux) && /dont priorités \(6 ou 9\) : 4/.test(ex.totaux) && /Arrivés : 0/.test(ex.totaux), 'totaux de l\'exemple : ' + ex.totaux);
  await largeur('exemple du registre');

  // 7. Partir de l'exemple : un document modifiable
  await p.click('#o-depuis-exemple'); await attendre();
  verifier(/^#\/outils\/gp-risques\/d/.test(await hash()), 'Partir de l\'exemple : pas de document');
  verifier(await p.inputValue('#o-nom') === 'DEMAT 2027' && await lignes() === 8, 'le document tiré de l\'exemple');

  // 8. Le registre (tableau) : saisir, calculer, niveaux, alertes, totaux
  await aller('#/outils/gp-risques'); await p.click('#o-nouveau'); await attendre();
  const docRisques = await hash();
  verifier(await p.inputValue('#o-0-statut') === 'Ouvert', 'statut par défaut d\'un nouveau risque');
  verifier(/Propriétaire : Une personne nommée/.test(await texte('.o-aides')) && /Arrivé : c'est devenu un problème/.test(await texte('.o-aides')),
    'les aides des colonnes ne sont pas au-dessus du tableau');
  let tot = await texte('.o-totaux');
  verifier(/COPIL\) : 0/.test(tot), 'une ligne neuve (seulement le statut par défaut) compte comme un risque : ' + tot);
  await p.fill('#o-0-risque', 'Parce que seule Julie connaît les flux EDI, il peut arriver que personne ne la remplace, ce qui bloquerait les flux.');
  await p.selectOption('#o-0-proba', '3'); await p.selectOption('#o-0-impact', '2'); await attendre(80);
  let n = await calc('#o-editeur tr[data-l="0"] .o-calc');
  verifier(n.t === '6 Priorité' && /o-ko/.test(n.cl), 'note 3 × 2 : ' + JSON.stringify(n));
  let al = await alertes();
  verifier(/liste d'inquiétudes/.test(al) && /Nomme un propriétaire/.test(al), 'alertes d\'un risque sans action ni propriétaire : ' + al);
  verifier(await p.isVisible('#o-editeur tr[data-l="0"] .o-marque'), 'la ligne en alerte n\'a pas sa marque « Alerte »');
  await p.fill('#o-0-reponse', 'Réduire : former Sophie aux flux EDI.'); await p.fill('#o-0-quand', '2027-03-01'); await attendre(80);
  al = await alertes();
  verifier(!/liste d'inquiétudes/.test(al) && /Nomme un propriétaire/.test(al), 'alerte après l\'action et la date : ' + al);
  await p.fill('#o-0-proprietaire', 'Marc'); await attendre(80);
  verifier(/Aucune alerte/.test(await alertes()) && await p.isHidden('#o-editeur tr[data-l="0"] .o-marque'), 'il reste une alerte : ' + await alertes());
  tot = await texte('.o-totaux');
  verifier(/COPIL\) : 1/.test(tot) && /dont priorités \(6 ou 9\) : 1/.test(tot) && /Arrivés : 0/.test(tot), 'totaux : ' + tot);
  await p.fill('#o-0-quand', '2027-01-10'); await attendre(80);
  verifier(/La date est passée/.test(await alertes()), 'date passée (horloge au 15/01/2027) : pas d\'alerte');
  await p.fill('#o-0-quand', '2027-03-01'); await p.selectOption('#o-0-statut', 'Arrivé'); await attendre(80);
  verifier(/Le risque est arrivé/.test(await alertes()) && /Arrivés : 1/.test(await texte('.o-totaux')), 'risque arrivé');
  await p.selectOption('#o-0-statut', 'Ouvert');
  await p.selectOption('#o-0-proba', '1'); await attendre(80); n = await calc('#o-editeur tr[data-l="0"] .o-calc');
  verifier(n.t === '2 On surveille' && /o-ok/.test(n.cl), 'note 1 × 2 : ' + JSON.stringify(n));
  await p.selectOption('#o-0-impact', '3'); await attendre(80); n = await calc('#o-editeur tr[data-l="0"] .o-calc');
  verifier(n.t === '3 Action simple' && /o-attention/.test(n.cl), 'note 1 × 3 : ' + JSON.stringify(n));
  await p.selectOption('#o-0-impact', ''); await attendre(80); n = await calc('#o-editeur tr[data-l="0"] .o-calc');
  verifier(n.t === '—' && !n.cl, 'note sans impact : ' + JSON.stringify(n));
  await p.selectOption('#o-0-proba', '3'); await p.selectOption('#o-0-impact', '3'); await attendre(80); n = await calc('#o-editeur tr[data-l="0"] .o-calc');
  verifier(n.t === '9 Priorité', 'note 3 × 3 : ' + JSON.stringify(n));
  // + Risque (le focus va dans la nouvelle ligne), puis supprimer cette ligne vide : sans question
  await p.click('#o-editeur [data-action="ajouter-ligne"]'); await attendre(80);
  verifier(await lignes() === 2 && await p.evaluate(() => document.activeElement && document.activeElement.id) === 'o-1-risque', '+ Risque : ligne ou focus');
  verifier(await p.evaluate(() => !!document.querySelector('.o-zone.o-cartes') && getComputedStyle(document.querySelector('.o-table thead')).display === 'none'),
    'à 390 px : pas une carte par ligne');
  await largeur('document du registre');
  let nd = dialogues.length;
  await p.click('#o-editeur tr[data-l="1"] [data-action="suppr-ligne"]'); await attendre(80);
  verifier(await lignes() === 1 && dialogues.length === nd, 'supprimer une ligne vide : ' + dialogues.slice(nd).join());

  // 9. Renommer (avec du HTML : il reste du texte), puis recharger la page : tout est là
  const NOM = 'Mon registre <img src=x onerror="window.__xss=1">';
  await p.fill('#o-nom', NOM); await attendre(80);
  await p.reload(); await attendre(400);
  const apres = await p.evaluate(() => ({ nom: document.getElementById('o-nom').value, risque: document.getElementById('o-0-risque').value,
    proba: document.getElementById('o-0-proba').value, note: document.querySelector('#o-editeur .o-calc').textContent, stock: localStorage.getItem('learnsql-outils') }));
  verifier(apres.nom === NOM && /seule Julie connaît/.test(apres.risque) && apres.proba === '3' && /^9/.test(apres.note), 'après rechargement : ' + JSON.stringify(apres).slice(0, 300));
  verifier(apres.stock && JSON.parse(apres.stock).version === 1, 'documents absents de la clé learnsql-outils');

  // 10. La liste des documents (le nom reste du texte), Dupliquer, Supprimer (avec confirmation)
  await aller('#/outils/gp-risques');
  let docs = await p.$$eval('.o-doc h3', xs => xs.map(x => x.textContent));
  verifier(docs.length === 2 && docs.indexOf(NOM) >= 0, 'liste des documents : ' + docs.join(' | '));
  verifier(/1 risque · modifié le/.test(await texte('#app .o-docs')), 'résumé d\'un document dans la liste');
  verifier(await p.evaluate(() => window.__xss === undefined && !document.querySelector('#app img')), 'le HTML du nom a été exécuté (liste)');
  await aller(docRisques); await p.click('#o-dupliquer'); await attendre();
  const docCopie = await hash();
  verifier(docCopie !== docRisques && await p.inputValue('#o-nom') === 'Copie de ' + NOM && /Copie faite/.test(await texte('#o-msg')), 'Dupliquer : ' + docCopie);
  verifier(await p.inputValue('#o-0-risque') === apres.risque, 'la copie n\'a pas le contenu');
  await aller('#/outils/gp-risques');
  verifier((await p.$$('.o-doc')).length === 3, 'après Dupliquer : pas 3 documents');
  await aller(docCopie); nd = dialogues.length;
  await p.click('#o-supprimer'); await attendre();
  verifier(dialogues.length === nd + 1 && /Supprimer « Copie de/.test(dialogues[nd]), 'pas de confirmation avant Supprimer');
  verifier(await hash() === '#/outils/gp-risques' && /Document supprimé/.test(await texte('#o-msg')) && (await p.$$('.o-doc')).length === 2, 'après Supprimer');
  await aller(docCopie);
  verifier(await texte('h1') === 'Document introuvable', 'un document supprimé n\'affiche pas de message');

  // 11. Excel : un vrai fichier .xlsx (un zip) avec la formule de la note ; le modèle vide aussi
  await aller(docRisques);
  let f = await telecharger('#o-excel');
  verifier(/^registre-des-risques-mon-registre.*\.xlsx$/.test(f.nom) && f.octets.slice(0, 4).toString('hex') === '504b0304', 'Excel : ' + f.nom);
  let z = {};
  try { z = lireZip(f.octets); } catch (e) { verifier(false, 'Excel : zip illisible ' + e.message); }
  verifier(['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/styles.xml', 'xl/worksheets/sheet1.xml'].every(k => z[k]),
    'Excel : parties du classeur ' + Object.keys(z).join(' '));
  if (zlib.crc32) verifier(Object.keys(z).every(k => zlib.crc32(z[k].data) === z[k].crc), 'Excel : CRC32 faux');
  let feuille = z['xl/worksheets/sheet1.xml'] ? z['xl/worksheets/sheet1.xml'].data.toString('utf8') : '';
  verifier(feuille.indexOf('<f>IF(OR(B2="",C2=""),"",B2*C2)</f><v>9</v>') >= 0, 'Excel : formule de la note absente');
  verifier(/seule Julie connaît les flux EDI/.test(feuille) && /<t>Probabilité<\/t>/.test(feuille) && /Niveau : Note/.test(feuille), 'Excel : valeurs ou en-têtes absents');
  verifier(/Fichier Excel téléchargé/.test(await texte('#o-msg')), 'Excel : pas de message');
  await aller('#/outils/gp-risques');
  f = await telecharger('#o-modele');
  z = lireZip(f.octets); feuille = z['xl/worksheets/sheet1.xml'].data.toString('utf8');
  verifier(f.nom === 'registre-des-risques-modele-vide.xlsx' && feuille.indexOf('<f>IF(OR(B31="",C31=""),"",B31*C31)</f>') >= 0 && !/Julie/.test(feuille),
    'modèle vide : ' + f.nom);

  // 12. Enregistrer dans un fichier (.json), puis Ouvrir un fichier : un nouveau document identique
  await aller(docRisques);
  f = await telecharger('#o-enregistrer');
  const json = JSON.parse(f.octets.toString('utf8'));
  verifier(/\.json$/.test(f.nom) && json.format === 'learnsql-outil' && json.outil === 'gp-risques' && json.nom === NOM && json.contenu.lignes[0].proba === 3,
    'fichier enregistré : ' + JSON.stringify(json).slice(0, 200));
  await aller('#/outils/gp-risques');
  await ouvrir('mon-registre.json', f.octets.toString('utf8'));
  verifier(/^#\/outils\/gp-risques\/d/.test(await hash()) && await p.inputValue('#o-nom') === NOM && /Fichier ouvert/.test(await texte('#o-msg')),
    'Ouvrir un fichier : ' + await hash() + ' ' + await texte('#o-msg'));
  verifier(await p.inputValue('#o-0-risque') === json.contenu.lignes[0].risque && await p.inputValue('#o-0-quand') === '2027-03-01', 'contenu du fichier ouvert');
  // Des fichiers faux : un message, jamais une erreur, aucun document créé
  await aller('#/outils/gp-risques');
  const nbDocs = (await p.$$('.o-doc')).length;
  const enTete = { format: 'learnsql-outil', version: 1, nom: 'x' };
  for (const [nom, contenu, attendu] of [
    ['image.json', 'pas du JSON du tout', /pas au bon format/],
    ['vide.json', '', /pas au bon format/],
    ['autre.json', JSON.stringify({ format: 'autre' }), /n'est pas un document/],
    ['raci.json', JSON.stringify(Object.assign({ outil: 'gp-raci', contenu: { colonnes: [], lignes: [] } }, enTete)), /Matrice RACI/],
    ['abime.json', JSON.stringify(Object.assign({ outil: 'gp-risques', contenu: { lignes: 'oups' } }, enTete)), /abîmé/]
  ]) {
    await ouvrir(nom, contenu);
    const r = await p.evaluate(() => ({ h: location.hash, msg: document.getElementById('o-msg').textContent }));
    verifier(r.h === '#/outils/gp-risques' && attendu.test(r.msg), 'fichier faux ' + nom + ' : ' + JSON.stringify(r));
  }
  verifier((await p.$$('.o-doc')).length === nbDocs, 'un fichier faux a créé un document');
  // Des valeurs non permises : le document s'ouvre, elles sont vidées, et c'est dit
  await ouvrir('valeurs.json', JSON.stringify(Object.assign({ outil: 'gp-risques', contenu: { lignes: [{ risque: 'Un risque', proba: 7, impact: '2', inconnue: 'x', quand: '2027-02-30', note: 99 }] } }, enTete, { nom: 'Valeurs fausses' })));
  verifier(await p.inputValue('#o-nom') === 'Valeurs fausses' && await p.inputValue('#o-0-proba') === '' && await p.inputValue('#o-0-impact') === '2' &&
    /5 valeur\(s\) corrigée\(s\)/.test(await texte('#o-msg')), 'valeurs fausses : ' + await texte('#o-msg'));

  // 13. Copier : HTML mis en forme et texte simple ; puis le repli (sans l'API du presse-papiers)
  await aller(docRisques);
  await p.evaluate(() => { window.__copie = null; });
  await p.click('#o-copier'); await attendre();
  let copie = await p.evaluate(() => window.__copie) || {};
  const html = copie['text/html'] || '', simple = copie['text/plain'] || '';
  verifier(/<table/.test(html) && /seule Julie connaît les flux EDI/.test(html) && /&lt;img/.test(html) && !/<img/.test(html), 'copie HTML : ' + html.slice(0, 200));
  verifier(simple.indexOf('Registre des risques : ' + NOM) === 0 && /- Note : 9 · Priorité/.test(simple), 'copie texte : ' + simple.slice(0, 200));
  verifier(/Copié/.test(await texte('#o-msg')), 'pas de message après Copier');
  await p.evaluate(() => {
    window.__copie = null;
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    window.addEventListener('copy', e => { window.__copie = { 'text/html': e.clipboardData.getData('text/html'), 'text/plain': e.clipboardData.getData('text/plain') }; });
  });
  await p.click('#o-copier'); await attendre();
  copie = await p.evaluate(() => window.__copie) || {};
  verifier(/<table/.test(copie['text/html'] || '') && /^Registre des risques/.test(copie['text/plain'] || ''), 'repli de la copie : ' + JSON.stringify(copie).slice(0, 200));

  // 14. Imprimer / PDF : seulement le document mis en forme
  await p.click('#o-imprimer'); await attendre();
  verifier(await p.evaluate(() => window.__imprime) === 1, 'Imprimer n\'appelle pas l\'impression');
  await p.emulateMedia({ media: 'print' });
  const impr = await p.evaluate(() => {
    const vu = s => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0; };
    const z = document.querySelector('.o-impression');
    return { menu: vu('.topbar'), pied: vu('.foot'), ecran: vu('.o-ecran'), doc: vu('.o-impression'), table: !!(z && z.querySelector('table')),
      t: z ? z.textContent : '', img: !!(z && z.querySelector('img')), paysage: !!(z && z.classList.contains('o-paysage')) };
  });
  verifier(!impr.menu && !impr.pied && !impr.ecran && impr.doc && impr.table && impr.paysage && /seule Julie connaît/.test(impr.t) && /Totaux/.test(impr.t) && !impr.img,
    'impression : ' + JSON.stringify(impr).slice(0, 200));
  await p.emulateMedia({ media: 'screen' });
  verifier(await p.isHidden('.o-impression'), 'la zone d\'impression se voit à l\'écran');

  // 15. La matrice (RACI) : des colonnes ajoutées par l'élève, une valeur par case, les 2 règles du cours en alerte
  await aller('#/outils/gp-raci'); await p.click('#o-nouveau'); await attendre();
  await p.fill('#o-col-0', 'DAF'); await p.fill('#o-col-1', 'Toi');
  await p.click('[data-action="ajouter-colonne"]'); await attendre(80);
  verifier(await p.evaluate(() => document.activeElement.id) === 'o-col-2', 'le focus n\'est pas sur la nouvelle colonne');
  await p.fill('#o-col-2', 'Julie'); await p.fill('#o-m-0', 'Format de facture');
  await p.selectOption('#o-m-0-0', 'A'); await p.selectOption('#o-m-0-1', 'R'); await attendre(80);
  verifier(/Aucune alerte/.test(await alertes()), 'RACI juste : ' + await alertes());
  await p.selectOption('#o-m-0-2', 'A'); await attendre(80);
  verifier(/Livrable 1 \(« Format de facture »\) : Deux A, c'est aucun/.test(await alertes()), 'deux A : ' + await alertes());
  await p.selectOption('#o-m-0-2', ''); await p.selectOption('#o-m-0-0', 'C'); await p.selectOption('#o-m-0-1', 'I'); await attendre(80);
  al = await alertes();
  verifier(/Personne n'approuve ce livrable/.test(al) && !/Deux A/.test(al) && !/réalise/.test(al), 'sans A (et sans R : pas d\'alerte, décision du superviseur) : ' + al);
  const mat = await p.evaluate(() => ({ cartes: !!document.querySelector('#o-matrice .o-zone.o-cartes'),
    libs: Array.from(document.querySelectorAll('#o-matrice tr[data-l="0"] .o-case .o-lib')).map(x => x.textContent),
    th: Array.from(document.querySelectorAll('#o-matrice th.o-case')).map(x => x.textContent), aides: document.querySelectorAll('ul.o-legende li').length }));
  verifier(mat.cartes && mat.libs.join() === 'DAF,Toi,Julie' && mat.th.join() === 'DAF,Toi,Julie' && mat.aides === 4, 'matrice sur téléphone : ' + JSON.stringify(mat));
  await largeur('matrice RACI');
  nd = dialogues.length;
  await p.click('[data-action="suppr-colonne"][data-k="0"]'); await attendre(80);
  verifier(dialogues.length === nd + 1 && await p.inputValue('#o-col-0') === 'Toi' && (await p.$$('#o-matrice tr[data-l="0"] .o-case')).length === 2,
    'supprimer une colonne remplie (avec confirmation)');
  await aller('#/outils/gp-raci/exemple');
  verifier(await lignes() === 7 && /Aucune alerte/.test(await alertes()), 'exemple du RACI : ' + await alertes());
  await largeur('exemple du RACI');

  // 16. Le compte rendu (document) : rubriques, 3 tableaux, alerte du document (sous 24 h), alertes et totaux des actions
  await aller('#/outils/gp-compte-rendu'); await p.click('#o-nouveau'); await attendre();
  verifier(/Aucune alerte/.test(await alertes()) && await p.inputValue('#o-actions-0-fait') === 'Non', 'compte rendu neuf : ' + await alertes());
  await p.fill('#o-r-reunion', 'COPIL de février'); await p.fill('#o-r-date', '2027-02-09'); await p.fill('#o-r-envoye_le', '2027-02-12'); await attendre(80);
  verifier(/Envoie le compte rendu sous 24 h/.test(await alertes()), 'compte rendu envoyé 3 jours après : pas d\'alerte');
  await p.fill('#o-r-envoye_le', '2027-02-10'); await attendre(80);
  verifier(!/sous 24 h/.test(await alertes()), 'compte rendu envoyé le lendemain : alerte');
  await p.fill('#o-decisions-0-decision', 'Changement n° 7 accepté.');
  await p.click('[data-action="ajouter-ligne"][data-r="decisions"]'); await attendre(80);
  verifier(await p.evaluate(() => document.activeElement.id) === 'o-decisions-1-decision', 'le focus n\'est pas sur la 2e décision');
  await p.fill('#o-decisions-1-decision', 'Changement n° 9 accepté.');
  await p.fill('#o-actions-0-action', 'Signer les commandes.'); await attendre(80);
  al = await alertes();
  verifier(/Action 1 \(« Signer les commandes\. »\) : Chaque action : un nom et une date/.test(al), 'alertes des actions : ' + al);
  await p.fill('#o-actions-0-qui', 'Le DAF'); await p.fill('#o-actions-0-quand', '2027-01-10'); await attendre(80);
  verifier(/Action en retard/.test(await alertes()), 'action en retard (horloge au 15/01/2027) : pas d\'alerte');
  await p.selectOption('#o-actions-0-fait', 'Oui'); await attendre(80);
  verifier(/Aucune alerte/.test(await alertes()), 'compte rendu : il reste une alerte : ' + await alertes());
  tot = await texte('.o-totaux[data-totaux="actions"]');
  verifier(/Actions : 1/.test(tot) && /pas encore faites : 0/.test(tot), 'totaux des actions : ' + tot);
  await largeur('compte rendu');
  f = await telecharger('#o-excel'); z = lireZip(f.octets);
  verifier(((z['xl/workbook.xml'] || { data: '' }).data.toString('utf8').match(/<sheet name="[^"]+"/g) || []).join() ===
    '<sheet name="Compte rendu de réunion",<sheet name="Décisions",<sheet name="Actions",<sheet name="Points ouverts"', 'compte rendu en Excel : 4 feuilles');
  await p.click('#o-copier'); await attendre();
  copie = await p.evaluate(() => window.__copie) || {};
  verifier(/Décision 2\n- Décision : Changement n° 9 accepté\./.test(copie['text/plain'] || '') && /Actions pas encore faites : 0/.test(copie['text/plain'] || ''),
    'copie du compte rendu : ' + (copie['text/plain'] || '').slice(0, 200));

  // 17. Le rapport : la météo (4 axes déjà écrits, couleur d'un choix, météo globale avec son mot) et les jalons, dont le
  //     reste de tolérance lit la rubrique « Tolérance » (changée : les calculs se refont tout de suite)
  await aller('#/outils/gp-rapport'); await p.click('#o-nouveau'); await attendre();
  const axes = await p.$$eval('[data-r="meteo"][data-c="axe"]', xs => xs.map(x => x.value));
  verifier(axes.join('|') === 'Délai|Budget|Périmètre|Qualité et risques' && await p.inputValue('#o-r-tolerance') === '14', 'rapport neuf : axes ' + axes.join('|'));
  await p.selectOption('#o-meteo-0-couleur', '3'); await p.selectOption('#o-meteo-1-couleur', '1'); await attendre(80);
  verifier(/o-c-ko/.test(await p.getAttribute('#o-meteo-0-couleur', 'class')) && /o-c-ok/.test(await p.getAttribute('#o-meteo-1-couleur', 'class')), 'couleur d\'un choix');
  tot = await p.evaluate(() => { const z = document.querySelector('.o-totaux[data-totaux="meteo"]'); return { t: z.textContent, ko: !!z.querySelector('.o-niveau.o-ko') }; });
  verifier(/l'axe le plus mauvais : 3 Rouge/.test(tot.t) && tot.ko, 'météo globale : ' + JSON.stringify(tot));
  al = await alertes();
  verifier(/Rouge : le sponsor doit décider/.test(al) && /Orange ou rouge : écris la cause/.test(al), 'alertes de la météo : ' + al);
  await p.fill('#o-jalons-0-jalon', 'PV de recette signé'); await p.fill('#o-jalons-0-prevu', '2027-04-30'); await p.fill('#o-jalons-0-prevision', '2027-05-07'); await attendre(80);
  n = await calc('#o-editeur tr[data-r="jalons"][data-l="0"] .o-t-calcul:last-child .o-calc');
  verifier(n.t === '7 Dans la tolérance' && /o-ok/.test(n.cl), 'reste de tolérance : ' + JSON.stringify(n));
  await p.fill('#o-r-tolerance', '5'); await attendre(80);
  n = await calc('#o-editeur tr[data-r="jalons"][data-l="0"] .o-t-calcul:last-child .o-calc');
  verifier(n.t === '-2 Hors tolérance' && /o-ko/.test(n.cl) && /Jalon hors tolérance/.test(await alertes()), 'tolérance changée à 5 jours : ' + JSON.stringify(n));
  await largeur('rapport');

  // 18. Le budget : un total lu par le document (atterrissage au-dessus du plafond)
  await aller('#/outils/gp-budget/exemple');
  tot = await texte('.o-totaux[data-totaux="postes"]');
  verifier(/Engagé \(€\) : 81\s100/.test(tot) && /Consommé \(€\) : 30\s350/.test(tot) && /Atterrissage \(€\) : 87\s500/.test(tot) && /Écart \(€\) : 2\s250/.test(tot) &&
    /Aucune alerte/.test(await alertes()), 'budget de l\'exemple : ' + tot);
  await p.click('#o-depuis-exemple'); await attendre();
  await p.fill('#o-r-plafond', '85000'); await attendre(80);
  verifier(/L'atterrissage dépasse le plafond/.test(await alertes()), 'atterrissage au-dessus du plafond : pas d\'alerte du document');

  // 19. Les 12 outils : la page, l'exemple (sans débordement à 390 px) et son fichier Excel (un zip, avec des formules)
  for (const id of OUTILS) {
    await aller('#/outils/' + id + '/exemple');
    verifier(await p.$('#o-editeur') && !(await p.$('#o-editeur input, #o-editeur textarea, #o-editeur select')), id + ' : exemple en lecture');
    await largeur(id + ' (exemple)');
    f = await telecharger('#o-excel');
    try {
      z = lireZip(f.octets);
      const formules = Object.keys(z).filter(k => /worksheets/.test(k)).some(k => /<f[ >]/.test(z[k].data.toString('utf8')));
      verifier(f.octets.slice(0, 4).toString('hex') === '504b0304' && z['xl/workbook.xml'] && formules, id + ' : fichier Excel sans formule');
    } catch (e) { verifier(false, id + ' : Excel illisible ' + e.message); }
  }
  await aller('#/outils/gp-recette/exemple');
  const couleurs = await p.$$eval('.o-t-choix .o-niveau', xs => xs.map(x => x.className.replace('o-niveau ', '') + ' ' + x.textContent));
  verifier(couleurs.indexOf('o-ko Anomalie') >= 0 && couleurs.indexOf('o-ok OK') >= 0 && couleurs.indexOf('o-attention Mineure') >= 0, 'recette : couleurs des choix ' + couleurs.slice(0, 6).join(', '));
  verifier((await alertes()).split('Pas de PV').length - 1 === 4, 'recette : les 4 alertes « Pas de PV » de l\'exemple');

  // 20. Les cours : « Les outils de ce cours » en bas des cours ; rien sur un cours sans outil
  await aller('#/cours/cp07');
  verifier(/Les outils de ce cours/.test(await texte('#app')) && await p.$('#app a.o-carte[href="#/outils/gp-risques"]'), 'cp07 sans ses outils');
  await aller('#/cours/cp17');
  verifier(await p.$('#app a.o-carte[href="#/outils/gp-compte-rendu"]') && await p.$('#app a.o-carte[href="#/outils/gp-options"]') &&
    !(await p.$('#app a.o-carte[href="#/outils/gp-risques"]')), 'cp17 : outils');
  await aller('#/cours/cp01');
  verifier(!/Les outils de ce cours/.test(await texte('#app')), 'cp01 affiche des outils');
  await largeur('cours cp07');

  // 21. Sur PC (1280 px) : un tableau classique ; retour au téléphone : les cartes reviennent
  await p.setViewportSize({ width: 1280, height: 900 });
  await aller(docRisques); await attendre(200);
  const pc = await p.evaluate(() => ({ cartes: document.querySelectorAll('.o-zone.o-cartes').length, thead: getComputedStyle(document.querySelector('.o-table thead')).display,
    tr: getComputedStyle(document.querySelector('.o-table tbody tr')).display, sw: document.documentElement.scrollWidth,
    proba: document.getElementById('o-0-proba').getBoundingClientRect().width }));
  verifier(pc.cartes === 0 && pc.thead === 'table-header-group' && pc.tr === 'table-row' && pc.sw <= 1280 && pc.proba >= 90, 'registre sur PC : ' + JSON.stringify(pc));
  await aller('#/outils/gp-raci/exemple'); await attendre(200);
  verifier(await p.evaluate(() => !document.querySelector('.o-zone.o-cartes') && document.querySelectorAll('.o-matrice th.o-case').length === 10), 'RACI sur PC : pas un tableau');
  await p.setViewportSize({ width: 390, height: 844 }); await attendre(200);
  verifier(await p.evaluate(() => !!document.querySelector('.o-zone.o-cartes')), 'retour au téléphone : pas de cartes');

  // 22. Thème sombre : un niveau reste lisible (contraste d'au moins 4,5)
  await p.emulateMedia({ colorScheme: 'dark' });
  await aller('#/outils/gp-risques/exemple');
  const ratios = await p.evaluate(() => {
    const rgb = c => c.match(/[\d.]+/g).map(Number);
    const lum = c => rgb(c).slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((s, v, k) => s + v * [0.2126, 0.7152, 0.0722][k], 0);
    return ['o-ok', 'o-attention', 'o-ko'].map(c => {
      const e = document.querySelector('.o-niveau.' + c), s = getComputedStyle(e), a = lum(s.color), f = lum(s.backgroundColor);
      return Math.round((Math.max(a, f) + 0.05) / (Math.min(a, f) + 0.05) * 100) / 100;
    });
  });
  verifier(ratios.every(r => r >= 4.5), 'contraste des niveaux en thème sombre : ' + ratios.join(', '));
  await p.emulateMedia({ colorScheme: 'light' });

  // 23. Rien n'est envoyé : aucun document dans les envois à Supabase
  verifier(envois.length > 0 && !envois.some(x => /Mon registre|Format de facture|learnsql-outil|seule Julie connaît/.test(x)), 'un document est parti vers Supabase');

  console.log('outils : menu, sujets, 3 types, ajouts du moteur, documents, fichiers, Excel des 12 outils, copie, impression, cours, téléphone et PC');
  console.log('errors', errs); await b.close();
})();
