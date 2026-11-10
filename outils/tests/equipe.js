// Page Équipe (admin et formateurs), Supabase simulé. « Cocher, puis valider » : aucune requête avant « Valider » ;
// la barre en bas de l'écran (compte, marques des cases changées, « Réservé » / « Ouvert à tous » à jour) ; « Annuler »
// remet tout comme avant, sans requête ; « Valider » envoie le lot (un POST avec un tableau pour les ajouts) puis
// recharge les données une fois, avec le message ; la confirmation en quittant la page (lien, rechargement) ; un échec
// partiel (ce qui a échoué reste à valider) ; mon rôle d'admin (la question, et il part en dernier) ; créer ou supprimer
// un groupe tout de suite, mais pas avec des changements en attente ; la grille « Droits des outils » ; téléphone
// 390 px sans débordement (barre comprise), puis PC ; un agent n'a pas accès à la page.
const { chromium } = require('playwright'); const path = require('path').join(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const verifier = (ok, msg) => { if (!ok) errs.push(msg); };
  let refuser = false;   // true : la prochaine question (confirm) reçoit « Annuler »
  const dialogues = []; p.on('dialog', d => { dialogues.push(d.type() + ' ' + d.message()); if (refuser) d.dismiss(); else d.accept(); });
  const T = (n, d) => ({ module: 'm0' + n, titre: 'Module ' + n, date: d, note: 8 + n * 2, bonnes: 5, total: 10, erreurs: [], parTheme: {} });
  const db = {
    profil: [{ user_id: 'u1', email: 'moi@x.fr', role: 'admin' }, { user_id: 'u2', email: 'julie@x.fr', role: 'agent' }, { user_id: 'u3', email: 'marc@x.fr', role: 'formateur' }],
    groupe: [{ id: 1, nom: 'Pôle métier' }, { id: 2, nom: 'Invité' }],
    membre: [{ groupe_id: 1, user_id: 'u2' }],
    progression: [{ user_id: 'u1', data: { version: 1, tentatives: [], questions: {} } }, { user_id: 'u2', data: { version: 1, tentatives: [T(1, '2026-10-20T09:00:00Z'), T(2, '2026-10-21T09:00:00Z')], questions: { 'm01-q01': { vues: 1, justes: 0, dernier: false } } } }],
    acces: [{ element: 'divalto', groupe_id: 1 }]
  };
  let nextId = 3;
  const ecritures = [];   // chaque écriture (sauf la progression) : « POST acces [{…}] », « DELETE membre?… »
  let echec = null;       // (méthode, table) → vrai : cette écriture est refusée (500)
  let chargements = 0;    // les chargements de la page Équipe (lecture de la liste des personnes)
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T1', refresh_token: 'R1', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u1', email: 'moi@x.fr' });
    const tab = u.pathname.replace('/rest/v1/', ''); let rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET' && tab === 'profil' && /email/.test(u.searchParams.get('select'))) chargements++;
    if (m === 'GET' && tab === 'membre' && /groupe\(nom\)/.test(u.searchParams.get('select'))) return json(rows.filter(match).map(x => ({ groupe_id: x.groupe_id, groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
    if (m === 'GET') return json(rows.filter(match));
    const body = r.request().postData() ? JSON.parse(r.request().postData()) : null;
    if (tab !== 'progression') ecritures.push(m + ' ' + tab + decodeURIComponent(u.search) + (body ? ' ' + JSON.stringify(body) : ''));
    if (echec && echec(m, tab)) return json({ message: 'refusé par le test' }, 500);
    if (m === 'POST') {
      const lignes = [].concat(body);   // un objet, ou un tableau (un envoi groupé)
      if (tab === 'groupe') lignes.forEach(x => { x.id = nextId++; });
      if (tab === 'progression') db.progression = rows.filter(x => x.user_id !== body.user_id);
      lignes.forEach(x => db[tab].push(x)); return r.fulfill({ status: 201, body: '' });
    }
    if (m === 'PATCH') { rows.filter(match).forEach(x => Object.assign(x, body)); return r.fulfill({ status: 204, body: '' }); }
    if (m === 'DELETE') { db[tab] = rows.filter(x => !match(x)); return r.fulfill({ status: 204, body: '' }); }
  });
  const url = 'file://' + path + '/index.html';
  const attendre = ms => p.waitForTimeout(ms || 150);
  const txt = async () => (await p.textContent('#app')).replace(/\s+/g, ' ');
  const barre = () => p.evaluate(() => {
    const b = document.getElementById('eq-barre'), r = b ? b.getBoundingClientRect() : null;
    return b ? { vue: !b.hidden && r.height > 0, bas: Math.round(r.bottom), haut: innerHeight, texte: document.getElementById('eq-compte').textContent,
      boutons: !document.getElementById('eq-boutons').hidden, msg: document.getElementById('eq-msg').textContent.replace(/\s+/g, ' ').trim(),
      genre: document.getElementById('eq-msg').className, marques: document.querySelectorAll('#app .change').length } : null;
  });
  const coche = sel => p.evaluate(s => { const e = document.querySelector(s); return e ? e.checked : null; }, sel);
  const etat = el => p.evaluate(x => { const e = document.querySelector('[data-etat="' + x + '"]'); return e ? e.textContent : null; }, el);
  const sansAcces = el => !db.acces.some(a => a.element === el);
  const aAcces = (el, g) => db.acces.some(a => a.element === el && a.groupe_id === g);
  const dansGroupe = (u, g) => db.membre.some(x => x.user_id === u && x.groupe_id === g);
  // Rien ne dépasse à droite : ni la page, ni un élément visible (la barre fixe comprise).
  const largeur = async ou => {
    const r = await p.evaluate(() => {
      const l = innerWidth, trop = [];
      document.querySelectorAll('body *').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.width && b.right > l + 1 && getComputedStyle(e).position !== 'absolute') trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right));
      });
      return { l: l, sw: document.documentElement.scrollWidth, trop: trop.slice(0, 4) };
    });
    verifier(r.sw <= r.l && !r.trop.length, ou + ' déborde : ' + JSON.stringify(r));
  };

  await p.goto(url + '#/compte'); await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await attendre(800);
  verifier(await p.isVisible('#lien-equipe'), 'admin : pas de lien « Équipe »');
  await p.goto(url + '#/equipe'); await attendre(500);
  verifier(/Tu es admin/.test(await txt()) && /julie@x\.fr/.test(await txt()) && /Module 2/.test(await txt()), 'page Équipe : ' + (await txt()).slice(0, 200));
  verifier(await p.isHidden('#eq-barre'), 'la barre est là sans changement');

  // 1. Créer un groupe : tout de suite (pas de « Valider »)
  await p.fill('#nom-groupe', 'Compta'); await p.click('#form-groupe button'); await attendre(500);
  verifier(db.groupe.map(g => g.nom).join(', ') === 'Pôle métier, Invité, Compta', 'créer un groupe : ' + db.groupe.map(g => g.nom).join(', '));

  // 2. Cocher, choisir un rôle : rien n'est envoyé ; la barre compte, les cases changées sont marquées
  let n = ecritures.length;
  await p.check('input[data-membre="u3"][value="1"]');
  await p.selectOption('select[data-role="u2"]', 'formateur');
  await p.check('input[data-acces="chef-projet"][value="1"]');
  await p.check('input[data-acces="gp-risques"][value="2"]');
  await p.uncheck('input[data-acces="divalto"][value="1"]');
  await attendre();
  verifier(ecritures.length === n, 'requête avant « Valider » : ' + ecritures.slice(n).join(' | '));
  let e = await barre();
  verifier(e.vue && e.bas === e.haut && e.texte === '5 changements à enregistrer' && e.boutons && e.marques === 5, 'barre après 5 changements : ' + JSON.stringify(e));
  verifier(await etat('gp-risques') === 'Réservé' && await etat('divalto') === 'Ouvert à tous' && await etat('chef-projet') === 'Réservé',
    '« Réservé » / « Ouvert à tous » pas à jour : ' + [await etat('gp-risques'), await etat('divalto'), await etat('chef-projet')]);
  await largeur('page Équipe à 390 px (barre comprise)');
  // Revenir à la valeur de départ : ce n'est plus un changement
  await p.uncheck('input[data-acces="gp-risques"][value="2"]'); await attendre(80);
  e = await barre();
  verifier(e.texte === '4 changements à enregistrer' && e.marques === 4 && await etat('gp-risques') === 'Ouvert à tous', 'case remise comme avant : ' + JSON.stringify(e));
  await p.check('input[data-acces="gp-risques"][value="2"]'); await attendre(80);

  // 3. Annuler : tout redevient comme avant, sans requête
  await p.click('#eq-annuler'); await attendre();
  verifier(ecritures.length === n, '« Annuler » a envoyé : ' + ecritures.slice(n).join(' | '));
  const apresAnnuler = await p.evaluate(() => [document.querySelector('input[data-membre="u3"][value="1"]').checked, document.querySelector('select[data-role="u2"]').value,
    document.querySelector('input[data-acces="chef-projet"][value="1"]').checked, document.querySelector('input[data-acces="gp-risques"][value="2"]').checked,
    document.querySelector('input[data-acces="divalto"][value="1"]').checked]);
  verifier(JSON.stringify(apresAnnuler) === '[false,"agent",false,false,true]', '« Annuler » ne remet pas tout : ' + JSON.stringify(apresAnnuler));
  e = await barre();
  verifier(!e.vue && e.marques === 0 && await etat('divalto') === 'Réservé' && await etat('chef-projet') === 'Ouvert à tous', 'après « Annuler » : ' + JSON.stringify(e));

  // 4. Valider : le lot (les ajouts en un tableau par table), un seul rechargement, le message
  await p.check('input[data-membre="u3"][value="1"]'); await p.check('input[data-membre="u3"][value="2"]');
  await p.selectOption('select[data-role="u2"]', 'formateur');
  await p.check('input[data-acces="chef-projet"][value="1"]'); await p.check('input[data-acces="gp-risques"][value="2"]');
  await p.uncheck('input[data-acces="divalto"][value="1"]'); await attendre();
  verifier((await barre()).texte === '6 changements à enregistrer', 'avant « Valider » : ' + (await barre()).texte);
  n = ecritures.length; let avant = chargements;
  await p.click('#eq-valider'); await attendre(700);
  const lot = ecritures.slice(n);
  const ajoutAcces = lot.filter(x => /^POST acces /.test(x)), ajoutMembre = lot.filter(x => /^POST membre /.test(x));
  verifier(lot.length === 4 && ajoutAcces.length === 1 && ajoutMembre.length === 1, 'le lot envoyé : ' + lot.join(' | '));
  verifier(ajoutAcces[0] && JSON.stringify(JSON.parse(ajoutAcces[0].replace(/^POST acces /, '')).sort((x, y) => x.element < y.element ? -1 : 1)) ===
    '[{"element":"chef-projet","groupe_id":1},{"element":"gp-risques","groupe_id":2}]', 'POST acces : ' + ajoutAcces[0]);
  verifier(ajoutMembre[0] && JSON.parse(ajoutMembre[0].replace(/^POST membre /, '')).length === 2, 'POST membre : ' + ajoutMembre[0]);
  verifier(lot.some(x => x === 'PATCH profil?user_id=eq.u2 {"role":"formateur"}') && lot.some(x => x === 'DELETE acces?element=eq.divalto&groupe_id=eq.1'), 'PATCH ou DELETE : ' + lot.join(' | '));
  verifier(chargements === avant + 1, 'rechargements après « Valider » : ' + (chargements - avant));
  verifier(dansGroupe('u3', 1) && dansGroupe('u3', 2) && db.profil[1].role === 'formateur' && aAcces('chef-projet', 1) && aAcces('gp-risques', 2) && sansAcces('divalto'),
    'la base après « Valider » : ' + JSON.stringify({ membre: db.membre, acces: db.acces, julie: db.profil[1].role }));
  e = await barre();
  verifier(e.vue && e.msg === '6 changements enregistrés.' && /ok/.test(e.genre) && !e.boutons && !e.texte && e.marques === 0, 'après « Valider » : ' + JSON.stringify(e));
  verifier(await coche('input[data-membre="u3"][value="2"]') && await coche('input[data-acces="gp-risques"][value="2"]') && !(await coche('input[data-acces="divalto"][value="1"]')) &&
    await p.inputValue('select[data-role="u2"]') === 'formateur', 'la page rechargée ne montre pas la base');
  await largeur('page Équipe après « Valider »');
  // Un nouveau changement efface le message
  await p.uncheck('input[data-membre="u3"][value="2"]'); await attendre(80);
  e = await barre();
  verifier(e.texte === '1 changement à enregistrer' && !e.msg, 'nouveau changement après le message : ' + JSON.stringify(e));

  // 5. Quitter la page avec un changement en attente : la question ; « Annuler » garde tout
  let nd = dialogues.length; refuser = true;
  await p.click('nav a[href="#/"]'); await attendre(); refuser = false;
  verifier(dialogues[nd] === 'confirm 1 changement n\'est pas enregistré. Quitter la page sans l\'enregistrer ?', 'question en quittant : ' + dialogues.slice(nd));
  verifier(await p.evaluate(() => location.hash) === '#/equipe' && (await barre()).texte === '1 changement à enregistrer' && !(await coche('input[data-membre="u3"][value="2"]')),
    'rester sur la page : les changements sont perdus');
  // Recharger ou fermer : le navigateur demande aussi
  verifier(await p.evaluate(() => { const ev = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(ev); return ev.defaultPrevented; }), 'beforeunload : pas de question');
  nd = dialogues.length;
  await p.reload(); await attendre(700);
  verifier(dialogues.slice(nd).some(x => /^beforeunload/.test(x)), 'recharger la page : pas de question (' + dialogues.slice(nd).join(' | ') + ')');
  verifier(await coche('input[data-membre="u3"][value="2"]') && await p.isHidden('#eq-barre'), 'après le rechargement : la base');
  verifier(await p.evaluate(() => { const ev = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(ev); return !ev.defaultPrevented; }), 'beforeunload sans changement : une question');
  // Quitter en répondant oui : la page suivante s'affiche, les changements sont oubliés
  await p.uncheck('input[data-membre="u3"][value="2"]'); await attendre(80);
  nd = dialogues.length;
  await p.click('nav a[href="#/"]'); await attendre();
  verifier(dialogues.length === nd + 1 && await p.evaluate(() => location.hash) === '#/' && /Tes parcours/.test(await txt()), 'quitter avec « OK »');
  verifier(await p.evaluate(() => getComputedStyle(document.body).paddingBottom) === '0px', 'la marge de la barre reste après la page Équipe');
  await p.goto(url + '#/equipe'); await attendre(500);
  verifier(await coche('input[data-membre="u3"][value="2"]') && await p.isHidden('#eq-barre') && dansGroupe('u3', 2), 'retour sur la page : pas la base');

  // 6. Créer ou supprimer un groupe, supprimer un compte : d'abord valider ou annuler
  await p.check('input[data-acces="edi"][value="2"]'); await attendre(80);
  n = ecritures.length; nd = dialogues.length;
  await p.fill('#nom-groupe', 'RH'); await p.click('#form-groupe button'); await attendre();
  await p.click('[data-suppr="3"]'); await attendre();
  await p.click('[data-suppr-compte="u2"]'); await attendre();
  e = await barre();
  verifier(ecritures.length === n && dialogues.length === nd && /valide ou annule tes changements/.test(e.msg) && e.texte === '1 changement à enregistrer',
    'action immédiate avec un changement en attente : ' + JSON.stringify(e) + ' ' + ecritures.slice(n).join(' | '));
  await p.click('#eq-annuler'); await attendre();
  await p.click('[data-suppr="3"]'); await attendre(500);
  verifier(db.groupe.map(g => g.nom).join(', ') === 'Pôle métier, Invité', 'supprimer un groupe : ' + db.groupe.map(g => g.nom).join(', '));

  // 7. Un échec partiel : le reste est enregistré ; ce qui a échoué reste à valider, avec son message
  echec = (m, tab) => m === 'DELETE' && tab === 'membre';
  await p.uncheck('input[data-membre="u3"][value="1"]'); await p.check('input[data-acces="outils"][value="2"]');
  await p.selectOption('select[data-role="u3"]', 'agent'); await attendre(80);
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(700);
  e = await barre();
  verifier(/^2 changements enregistrés\. Pas enregistré \(toujours à valider\) :/.test(e.msg) && /marc@x\.fr : groupe «\s?Pôle métier\s?» retiré : refusé par le test/.test(e.msg) && /ko/.test(e.genre),
    'message d\'un échec partiel : ' + e.msg);
  verifier(e.texte === '1 changement à enregistrer' && e.boutons && e.marques === 1 && !(await coche('input[data-membre="u3"][value="1"]')), 'échec : pas resté à valider ' + JSON.stringify(e));
  verifier(aAcces('outils', 2) && db.profil[2].role === 'agent' && dansGroupe('u3', 1), 'échec partiel : la base ' + JSON.stringify({ acces: db.acces, marc: db.profil[2].role }));
  echec = null;
  await p.click('#eq-valider'); await attendre(700);
  e = await barre();
  verifier(e.msg === '1 changement enregistré.' && !e.boutons && !dansGroupe('u3', 1), 'nouvel essai : ' + JSON.stringify(e));

  // 8. La grille « Droits des outils » : la ligne Outils, chaque sujet, ses outils en retrait
  const grille = await p.$$eval('#droits-outils tr', trs => trs.map(tr => [tr.querySelector('td').innerText.replace(/\s+/g, ' ').trim(),
    (tr.querySelector('input[data-acces]') || {}).getAttribute ? tr.querySelector('input[data-acces]').getAttribute('data-acces') : '', tr.querySelectorAll('input').length]));
  const ids = grille.map(x => x[1]).join(' ');
  verifier(ids === 'outils outils-sql dico traduire gestion-projet gp-cadrage gp-business-case gp-raci gp-risques gp-rapport gp-budget gp-compte-rendu gp-options ' +
    'gp-decisions gp-changements gp-recette gp-bascule', 'lignes des droits des outils : ' + ids);
  verifier(grille.every(x => x[2] === 2), 'une case par groupe : ' + JSON.stringify(grille.map(x => x[2])));
  verifier(grille[0][0] === 'Outils (toute la section) Réservé' && grille[1][0] === 'SQL Ouvert à tous' && grille[2][0] === '↳ Super dico SQL Ouvert à tous' &&
    grille[8][0] === '↳ Registre des risques Réservé', 'textes de la grille : ' + JSON.stringify(grille.slice(0, 9).map(x => x[0])));
  const nbParcours = await p.evaluate(() => LEARNSQL.parcours.reduce((k, x) => k + 1 + (x.sous || []).length, 0));
  verifier(/Droits des parcours/.test(await txt()) && (await p.$$('#droits-parcours tr')).length === nbParcours && nbParcours > 5, 'la grille des parcours');
  await p.check('input[data-acces="gestion-projet"][value="1"]'); await p.check('input[data-acces="dico"][value="2"]'); await attendre(80);
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(700);
  verifier(ecritures.slice(n).join(' | ') === 'POST acces [{"element":"gestion-projet","groupe_id":1},{"element":"dico","groupe_id":2}]', 'droits des outils envoyés : ' + ecritures.slice(n).join(' | '));

  // 9. Sur PC : la barre en bas de l'écran, un tableau classique
  await p.setViewportSize({ width: 1280, height: 800 }); await attendre();
  await p.check('input[data-acces="traduire"][value="1"]'); await attendre(80);
  e = await barre();
  verifier(e.vue && e.bas === 800 && await p.evaluate(() => getComputedStyle(document.querySelector('table.empile thead')).display) === 'table-header-group', 'sur PC : ' + JSON.stringify(e));
  await largeur('page Équipe sur PC');
  await p.click('#eq-annuler');
  await p.setViewportSize({ width: 390, height: 844 }); await attendre();

  // 10. Mon rôle d'admin : la question au moment du choix ; il part en dernier, et seulement si le reste est passé
  nd = dialogues.length; refuser = true;
  await p.selectOption('select[data-role="u1"]', 'formateur'); await attendre(80); refuser = false;
  verifier(dialogues[nd] === 'confirm Tu vas perdre tes droits d\'admin. Continuer ?' && await p.inputValue('select[data-role="u1"]') === 'admin' && await p.isHidden('#eq-barre'),
    '« Annuler » à la question sur mon rôle : ' + dialogues.slice(nd));
  echec = (m, tab) => m === 'POST' && tab === 'acces';
  await p.check('input[data-acces="edi"][value="1"]'); await p.selectOption('select[data-role="u1"]', 'formateur'); await attendre(80);
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(700);
  e = await barre();
  verifier(!ecritures.slice(n).some(x => /^PATCH profil\?user_id=eq\.u1/.test(x)) && e.texte === '2 changements à enregistrer' &&
    /moi@x\.fr : rôle «\s?formateur\s?» : pas envoyé, car un autre changement a échoué/.test(e.msg) && db.profil[0].role === 'admin', 'mon rôle malgré un échec : ' + JSON.stringify(e));
  echec = null; n = ecritures.length;
  await p.click('#eq-valider'); await attendre(800);
  const fin = ecritures.slice(n);
  verifier(fin.length === 2 && /^POST acces/.test(fin[0]) && fin[1] === 'PATCH profil?user_id=eq.u1 {"role":"formateur"}', 'mon rôle part en dernier : ' + fin.join(' | '));
  verifier(/Tu es formateur/.test(await txt()) && !(await p.$('#eq-barre')) && await p.evaluate(() => JSON.parse(localStorage.getItem('learnsql-session')).role) === 'formateur',
    'après avoir quitté le rôle d\'admin : ' + (await txt()).slice(0, 120));
  db.profil[0].role = 'admin';

  // 11. La page d'une personne (téléphone : sans débordement)
  await p.goto(url + '#/equipe/u2'); await attendre(500);
  verifier(/julie@x\.fr/.test(await txt()) && /Module 2/.test(await txt()), 'page d\'une personne : ' + (await txt()).slice(0, 160));
  await largeur('page d\'une personne');

  // 12. Un agent : pas d'accès à la page
  db.profil[0].role = 'agent'; await p.goto(url + '#/compte'); await p.click('#sync'); await attendre(800);
  verifier(/Rôle\s*agent/.test(await txt()), 'compte agent : ' + (await txt()).slice(0, 140));
  db.membre.push({ groupe_id: 1, user_id: 'u1' }, { groupe_id: 2, user_id: 'u1' }); await p.click('#sync'); await attendre(800);
  verifier(/Mes groupes\s*Invité, Pôle métier/.test(await txt()), 'groupes de l\'agent : ' + (await txt()).slice(40, 130));
  verifier(!(await p.isVisible('#lien-equipe')), 'agent : lien « Équipe » visible');
  await p.goto(url + '#/equipe'); await attendre(300);
  verifier(await p.evaluate(() => location.hash) === '#/compte', 'agent : pas redirigé vers #/compte');
  console.log('équipe : cocher puis valider (lot, un rechargement, message), annuler, quitter la page, échec partiel, mon rôle, actions immédiates, ' +
    'droits des outils, 390 px et PC, agent');
  console.log('errors', errs); await b.close();
})();
