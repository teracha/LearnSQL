// Page Équipe (admin et formateurs), Supabase simulé. « Cocher, puis valider » : aucune requête avant « Valider » ;
// la barre en bas de l'écran (compte, marques des cases changées, « Réservé » / « Ouvert à tous » à jour) ; « Annuler »
// remet tout comme avant, sans requête ; « Valider » envoie le lot (un POST avec un tableau pour les ajouts) puis
// recharge les données une fois, avec le message ; la confirmation en quittant la page (lien, Retour, rechargement),
// avec un historique juste après « Annuler » ; un échec partiel (ce qui a échoué reste à valider) ; un lot refusé en
// entier, repris ligne par ligne (une ligne déjà là compte comme enregistrée) ; un groupe supprimé ailleurs (retiré,
// avec son nom) ; les messages (une phrase en tête, en français, le rechargement à part) ; quitter pendant l'envoi ;
// une page lente qui ne s'affiche pas par-dessus la suivante ; mon rôle d'admin (la question ; il part en dernier ;
// ensuite la session recharge mes droits) ; créer ou supprimer un groupe tout de suite, mais pas avec des changements en
// attente ; la grille « Droits des outils » ; téléphone 390 px sans débordement (barre comprise), PC, Tab jamais caché
// sous la barre, fenêtre qui tourne (la marge suit la barre, la liste des échecs défile) ; un agent n'a pas accès.
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
  let lectureKO = null;   // (table) → vrai : cette lecture est refusée (500)
  let latence = 0, latenceLecture = 0;   // ms avant de répondre (écritures, lectures)
  let chargements = 0;    // les chargements de la page Équipe (lecture de la liste des personnes)
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', async r => {
    const u = new URL(r.request().url()), m = r.request().method(); const json = (o, s) => r.fulfill({ status: s || 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (u.pathname === '/auth/v1/token') return json({ access_token: 'T1', refresh_token: 'R1', expires_in: 3600 });
    if (u.pathname === '/auth/v1/user') return json({ id: 'u1', email: 'moi@x.fr' });
    if (u.pathname === '/auth/v1/logout') return r.fulfill({ status: 204, body: '' });
    const tab = u.pathname.replace('/rest/v1/', ''); let rows = db[tab]; if (!rows) return json({}, 404);
    const filt = []; for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) filt.push([k, v.slice(3)]);
    const match = x => filt.every(([k, v]) => String(x[k]) === v);
    if (m === 'GET') {
      if (tab === 'profil' && /email/.test(u.searchParams.get('select'))) chargements++;
      if (latenceLecture) await new Promise(res => setTimeout(res, latenceLecture));
      if (lectureKO && lectureKO(tab)) return json({ message: 'lecture refusée par le test' }, 500);
      if (tab === 'membre' && /groupe\(nom\)/.test(u.searchParams.get('select'))) return json(rows.filter(match).map(x => ({ groupe_id: x.groupe_id, groupe: { nom: db.groupe.find(g => g.id === x.groupe_id).nom } })));
      return json(JSON.parse(JSON.stringify(rows.filter(match))));
    }
    const body = r.request().postData() ? JSON.parse(r.request().postData()) : null;
    if (tab !== 'progression') ecritures.push(m + ' ' + tab + decodeURIComponent(u.search) + (body ? ' ' + JSON.stringify(body) : ''));
    if (latence) await new Promise(res => setTimeout(res, latence));
    if (echec && echec(m, tab)) return json({ message: 'refusé par le test' }, 500);
    if (m === 'POST') {
      const lignes = [].concat(body);   // un objet, ou un tableau (un envoi groupé) : tout passe, ou rien (comme la vraie base)
      // Clé étrangère : le groupe doit exister. Clé primaire : pas deux fois la même ligne (même nom pour un groupe).
      if ((tab === 'acces' || tab === 'membre') && lignes.some(x => !db.groupe.some(g => g.id === x.groupe_id)))
        return json({ code: '23503', message: 'insert or update on table "' + tab + '" violates foreign key constraint' }, 409);
      const cle = { acces: x => x.element + '|' + x.groupe_id, membre: x => x.groupe_id + '|' + x.user_id, groupe: x => x.nom }[tab];
      if (cle && lignes.some(x => rows.some(y => cle(y) === cle(x)))) return json({ code: '23505', message: 'duplicate key value violates unique constraint' }, 409);
      if (tab === 'groupe') lignes.forEach(x => { x.id = nextId++; });
      if (tab === 'progression') db.progression = rows.filter(x => x.user_id !== body.user_id);
      lignes.forEach(x => db[tab].push(x)); return r.fulfill({ status: 201, body: '' });
    }
    if (m === 'PATCH') { rows.filter(match).forEach(x => Object.assign(x, body)); return r.fulfill({ status: 204, body: '' }); }
    if (m === 'DELETE') { db[tab] = rows.filter(x => !match(x)); return r.fulfill({ status: 204, body: '' }); }
  });
  const url = 'file://' + path + '/index.html';
  const attendre = ms => p.waitForTimeout(ms || 150);
  const aller = async (h, ms) => { await p.evaluate(x => { location.hash = x; }, h); await attendre(ms || 500); };
  const hash = () => p.evaluate(() => location.hash);
  const txt = async () => (await p.textContent('#app')).replace(/\s+/g, ' ');
  const titre = async () => (await p.textContent('#app h1')) || '';
  const barre = () => p.evaluate(() => {
    const b = document.getElementById('eq-barre'), r = b ? b.getBoundingClientRect() : null;
    return b ? { vue: !b.hidden && r.height > 0, bas: Math.round(r.bottom), haut: innerHeight, h: Math.round(r.height), texte: document.getElementById('eq-compte').textContent,
      boutons: !document.getElementById('eq-boutons').hidden, msg: document.getElementById('eq-msg').innerText.replace(/\s+/g, ' ').trim(),
      genre: document.getElementById('eq-msg').className, marques: document.querySelectorAll('#app .change').length,
      paras: Array.from(document.querySelectorAll('#eq-msg > *')).map(x => x.tagName + (x.className ? '.' + x.className : '')).join(' ') } : null;
  });
  const coche = sel => p.evaluate(s => { const e = document.querySelector(s); return e ? e.checked : null; }, sel);
  const etat = el => p.evaluate(x => { const e = document.querySelector('[data-etat="' + x + '"]'); return e ? e.textContent : null; }, el);
  const sansAcces = el => !db.acces.some(a => a.element === el);
  const aAcces = (el, g) => db.acces.some(a => a.element === el && a.groupe_id === g);
  const dansGroupe = (u, g) => db.membre.some(x => x.user_id === u && x.groupe_id === g);
  const anglais = t => /refusé par le test|duplicate|violates|constraint|foreign|lecture refusée|Invalid|Failed/i.test(t);
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
  // Tout en bas de la page : le pied et les boutons « Supprimer un groupe » restent au-dessus de la barre.
  const basVisible = async ou => {
    const r = await p.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
      const b = document.getElementById('eq-barre'), haut = b && !b.hidden ? b.getBoundingClientRect().top : innerHeight;
      const bas = Array.from(document.querySelectorAll('.foot a, [data-suppr]')).map(x => Math.round(x.getBoundingClientRect().bottom));
      return { barreHaut: Math.round(haut), bas: Math.max.apply(null, bas), marge: document.body.style.paddingBottom, h: b ? Math.round(b.getBoundingClientRect().height) : 0 };
    });
    verifier(r.bas <= r.barreHaut && r.marge === (r.h + 16) + 'px', ou + ' : le bas de la page passe sous la barre ' + JSON.stringify(r));
  };

  await p.goto(url + '#/compte'); await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await attendre(800);
  verifier(await p.isVisible('#lien-equipe'), 'admin : pas de lien « Équipe »');
  await aller('#/equipe');
  verifier(/Tu es admin/.test(await txt()) && /julie@x\.fr/.test(await txt()) && /Module 2/.test(await txt()), 'page Équipe : ' + (await txt()).slice(0, 200));
  verifier(await p.isHidden('#eq-barre'), 'la barre est là sans changement');

  // 1. Créer un groupe : tout de suite (pas de « Valider ») ; un nom déjà pris : un message en français
  await p.fill('#nom-groupe', 'Compta'); await p.click('#form-groupe button'); await attendre(500);
  verifier(db.groupe.map(g => g.nom).join(', ') === 'Pôle métier, Invité, Compta', 'créer un groupe : ' + db.groupe.map(g => g.nom).join(', '));
  await p.fill('#nom-groupe', 'Compta'); await p.click('#form-groupe button'); await attendre(300);
  verifier(await p.textContent('#msg-equipe') === 'Ce groupe existe déjà.', 'groupe en double : ' + await p.textContent('#msg-equipe'));

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
  await basVisible('390 px, 5 changements');
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
  verifier(await p.evaluate(() => document.body.style.paddingBottom + '|' + document.documentElement.style.scrollPaddingBottom) === '|', 'marge restée après « Annuler »');

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
  await basVisible('avec le message seul');
  // Un nouveau changement efface le message
  await p.uncheck('input[data-membre="u3"][value="2"]'); await attendre(80);
  e = await barre();
  verifier(e.texte === '1 changement à enregistrer' && !e.msg, 'nouveau changement après le message : ' + JSON.stringify(e));

  // 5. Quitter la page avec un changement en attente : la question ; « Annuler » garde tout
  let nd = dialogues.length; refuser = true;
  await p.click('nav a[href="#/"]'); await attendre(); refuser = false;
  verifier(dialogues[nd] === 'confirm 1 changement n\'est pas enregistré. Quitter la page sans l\'enregistrer ?', 'question en quittant : ' + dialogues.slice(nd));
  verifier(await hash() === '#/equipe' && (await barre()).texte === '1 changement à enregistrer' && !(await coche('input[data-membre="u3"][value="2"]')),
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
  verifier(dialogues.length === nd + 1 && await hash() === '#/' && /Tes parcours/.test(await txt()), 'quitter avec « OK »');
  verifier(await p.evaluate(() => getComputedStyle(document.body).paddingBottom) === '0px', 'la marge de la barre reste après la page Équipe');
  await aller('#/equipe');
  verifier(await coche('input[data-membre="u3"][value="2"]') && await p.isHidden('#eq-barre') && dansGroupe('u3', 2), 'retour sur la page : pas la base');
  // L'historique reste juste après « Annuler » : un seul Retour suffit ensuite, aucune étape ne disparaît
  await p.click('nav a[href="#/revision"]'); await attendre(300);
  await p.click('nav a[href="#/equipe"]'); await attendre(600);
  await p.check('input[data-acces="edi"][value="1"]'); await attendre(80);
  const longueur = await p.evaluate(() => history.length);
  nd = dialogues.length; refuser = true;
  await p.goBack({ timeout: 3000 }).catch(() => {}); await attendre(400); refuser = false;
  verifier(dialogues.length === nd + 1 && await hash() === '#/equipe' && await p.evaluate(() => history.length) === longueur && (await barre()).texte === '1 changement à enregistrer',
    'Retour + « Annuler » : ' + await hash() + ' · ' + (await p.evaluate(() => history.length)) + '/' + longueur);
  nd = dialogues.length;
  await p.goBack({ timeout: 3000 }).catch(() => {}); await attendre(400);
  verifier(dialogues.length === nd + 1 && await hash() === '#/revision' && await titre() === 'Révision', 'Retour + « Annuler », puis un Retour : ' + await hash());
  await p.click('nav a[href="#/equipe"]'); await attendre(600);
  await p.check('input[data-acces="edi"][value="1"]'); await attendre(80);
  refuser = true; await p.click('nav a[href="#/historique"]'); await attendre(300); refuser = false;
  verifier(await hash() === '#/equipe' && (await barre()).texte === '1 changement à enregistrer', 'lien + « Annuler » : ' + await hash());
  nd = dialogues.length;
  await p.goBack({ timeout: 3000 }).catch(() => {}); await attendre(400);
  verifier(dialogues.length === nd + 1 && await hash() === '#/revision', 'lien + « Annuler », puis un Retour : ' + await hash());
  await aller('#/equipe');

  // 6. Créer ou supprimer un groupe, supprimer un compte : d'abord valider ou annuler
  await p.check('input[data-acces="edi"][value="2"]'); await attendre(80);
  n = ecritures.length; nd = dialogues.length;
  await p.fill('#nom-groupe', 'RH'); await p.click('#form-groupe button'); await attendre();
  await p.click('[data-suppr="3"]'); await attendre();
  await p.click('[data-suppr-compte="u2"]'); await attendre();
  e = await barre();
  verifier(ecritures.length === n && dialogues.length === nd && e.msg === 'D\'abord, valide ou annule tes changements.' && e.texte === '1 changement à enregistrer',
    'action immédiate avec un changement en attente : ' + JSON.stringify(e) + ' ' + ecritures.slice(n).join(' | '));
  await p.click('#eq-annuler'); await attendre();
  await p.click('[data-suppr="3"]'); await attendre(500);
  verifier(db.groupe.map(g => g.nom).join(', ') === 'Pôle métier, Invité', 'supprimer un groupe : ' + db.groupe.map(g => g.nom).join(', '));

  // 7. Un échec partiel : le reste est enregistré ; ce qui a échoué reste à valider. Le message : une seule phrase en tête,
  // puis la liste, en français (le détail technique va dans la console)
  echec = (m, tab) => m === 'DELETE' && tab === 'membre';
  await p.uncheck('input[data-membre="u3"][value="1"]'); await p.check('input[data-acces="outils"][value="2"]');
  await p.selectOption('select[data-role="u3"]', 'agent'); await attendre(80);
  await p.click('#eq-valider'); await attendre(700);
  e = await barre();
  verifier(e.msg === '1 changement sur 3 n\'a pas pu être enregistré : marc@x.fr : groupe « Pôle métier » retiré (le serveur a refusé)' && /ko/.test(e.genre) &&
    e.paras === 'P.barre-tete UL' && !anglais(e.msg), 'message d\'un échec partiel : ' + e.msg + ' · ' + e.paras);
  verifier(e.texte === '1 changement à enregistrer' && e.boutons && e.marques === 1 && !(await coche('input[data-membre="u3"][value="1"]')), 'échec : pas resté à valider ' + JSON.stringify(e));
  verifier(aAcces('outils', 2) && db.profil[2].role === 'agent' && dansGroupe('u3', 1), 'échec partiel : la base ' + JSON.stringify({ acces: db.acces, marc: db.profil[2].role }));
  echec = null;
  await p.click('#eq-valider'); await attendre(700);
  e = await barre();
  verifier(e.msg === '1 changement enregistré.' && !e.boutons && !dansGroupe('u3', 1), 'nouvel essai : ' + JSON.stringify(e));

  // 8. Un lot refusé en entier : ses lignes repartent une par une. Une ligne déjà là (ajoutée ailleurs) compte comme
  // enregistrée ; un groupe supprimé ailleurs : ses changements sont retirés, avec son nom ; aucun changement invisible
  await p.fill('#nom-groupe', 'Achats'); await p.click('#form-groupe button'); await attendre(500);
  const achats = db.groupe.find(g => g.nom === 'Achats').id;
  await p.check('input[data-acces="gp-raci"][value="1"]'); await p.check('input[data-acces="gp-budget"][value="2"]'); await attendre(80);
  db.acces.push({ element: 'gp-raci', groupe_id: 1 });   // ajoutée ailleurs (un autre onglet de l'admin)
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(800);
  const repris = ecritures.slice(n);
  verifier(repris.length === 3 && repris[0] === 'POST acces [{"element":"gp-raci","groupe_id":1},{"element":"gp-budget","groupe_id":2}]' &&
    repris.slice(1).sort().join(' | ') === 'POST acces [{"element":"gp-budget","groupe_id":2}] | POST acces [{"element":"gp-raci","groupe_id":1}]',
    'lot refusé, puis ligne par ligne : ' + repris.join(' | '));
  e = await barre();
  verifier(e.msg === '2 changements enregistrés.' && db.acces.filter(a => a.element === 'gp-raci' && a.groupe_id === 1).length === 1 && aAcces('gp-budget', 2),
    'ligne déjà là : ' + e.msg + ' ' + JSON.stringify(db.acces));
  await p.check('input[data-membre="u2"][value="2"]'); await p.check(`input[data-membre="u3"][value="${achats}"]`);
  await p.check(`input[data-acces="gp-options"][value="${achats}"]`); await p.check('input[data-acces="dico"][value="2"]'); await attendre(80);
  db.groupe = db.groupe.filter(g => g.id !== achats);   // « Achats » supprimé ailleurs
  await p.click('#eq-valider'); await attendre(900);
  e = await barre();
  verifier(dansGroupe('u2', 2) && aAcces('dico', 2), 'groupe disparu : les changements valables ne passent pas ' + JSON.stringify({ membre: db.membre, acces: db.acces }));
  verifier(e.msg === '2 changements enregistrés. Le groupe « Achats » n\'existe plus : 2 changements retirés.' && e.paras === 'P.barre-tete P.barre-note' && !anglais(e.msg),
    'groupe disparu, message : ' + e.msg + ' · ' + e.paras);
  verifier(!e.texte && !e.boutons && e.marques === 0, 'groupe disparu : un changement invisible reste compté ' + JSON.stringify(e));

  // 9. Rechargement impossible après « Valider » : la phrase est à part, après la liste
  echec = (m, tab) => m === 'POST' && tab === 'acces'; lectureKO = tab => tab === 'profil';
  await p.check('input[data-acces="edi"][value="1"]'); await p.check('input[data-membre="u3"][value="1"]'); await attendre(80);
  await p.click('#eq-valider'); await attendre(800);
  e = await barre();
  verifier(e.msg === '1 changement sur 2 n\'a pas pu être enregistré : Droit « EDI / EDIFACT » : groupe « Pôle métier » ajouté (le serveur a refusé) ' +
    'La page n\'a pas pu se recharger : recharge-la plus tard.' && e.paras === 'P.barre-tete UL P.barre-note' && dansGroupe('u3', 1) && await coche('input[data-membre="u3"][value="1"]'),
    'rechargement impossible : ' + e.msg + ' · ' + e.paras);
  echec = null; lectureKO = null;
  await p.click('#eq-annuler'); await attendre();

  // 10. Quitter pendant « Enregistrement… » : la question aussi ; si l'élève part quand même, l'échec est dit, et la page
  // Équipe le reprend à son retour
  await aller('#/'); await aller('#/equipe');
  latence = 900; echec = (m, tab) => m === 'DELETE' && tab === 'acces';
  await p.uncheck('input[data-acces="gp-budget"][value="2"]'); await attendre(80);
  await p.click('#eq-valider'); await attendre(150);
  verifier((await barre()).texte === 'Enregistrement…', 'pendant l\'envoi : ' + (await barre()).texte);
  n = ecritures.length;
  await p.fill('#nom-groupe', 'Pendant'); await p.click('#form-groupe button'); await attendre(80);
  verifier((await barre()).msg === 'Attends la fin de l\'enregistrement.' && ecritures.length === n, 'créer un groupe pendant l\'envoi : ' + (await barre()).msg);
  nd = dialogues.length; refuser = true;
  await p.click('nav a[href="#/"]'); await attendre(200); refuser = false;
  verifier(dialogues[nd] === 'confirm L\'enregistrement n\'est pas fini. Quitter la page quand même ?' && await hash() === '#/equipe', 'quitter pendant l\'envoi, « Annuler » : ' + dialogues.slice(nd));
  await attendre(1200);
  e = await barre();
  verifier(/^Le changement n'a pas pu être enregistré :/.test(e.msg) && e.texte === '1 changement à enregistrer', 'après l\'envoi, resté sur la page : ' + JSON.stringify(e));
  await p.click('#eq-valider'); await attendre(150);
  nd = dialogues.length;
  await p.click('nav a[href="#/"]'); await attendre(1500);
  verifier(dialogues.slice(nd).join(' | ') === 'confirm L\'enregistrement n\'est pas fini. Quitter la page quand même ? | ' +
    'alert Page Équipe : Le changement n\'a pas pu être enregistré. Ouvre la page Équipe pour les revoir.', 'parti pendant l\'envoi : ' + dialogues.slice(nd).join(' | '));
  verifier(await hash() === '#/' && /Tes parcours/.test(await txt()), 'parti pendant l\'envoi : la page suivante');
  latence = 0; echec = null;
  await aller('#/equipe');
  e = await barre();
  verifier(e.texte === '1 changement à enregistrer' && e.marques === 1 && /^Le changement n'a pas pu être enregistré : Droit « Suivi du budget » : groupe « Invité » retiré \(le serveur a refusé\)$/.test(e.msg) &&
    !(await coche('input[data-acces="gp-budget"][value="2"]')), 'retour sur la page Équipe : l\'échec n\'est pas repris ' + JSON.stringify(e));
  await p.click('#eq-valider'); await attendre(700);
  verifier((await barre()).msg === '1 changement enregistré.' && !aAcces('gp-budget', 2), 'reprise, puis « Valider »');

  // 11. Une page lente ne s'affiche pas par-dessus la page suivante (toutes les pages qui chargent depuis Supabase)
  latenceLecture = 700;
  await aller('#/', 100); await p.click('nav a[href="#/equipe"]'); await attendre(150);
  await p.click('nav a[href="#/revision"]'); await attendre(1300);
  verifier(await hash() === '#/revision' && await titre() === 'Révision' && !(await p.$('#eq-barre')), 'Équipe lente, puis Révision : ' + await titre());
  await aller('#/equipe/u2', 150); await p.click('nav a[href="#/"]'); await attendre(1300);
  verifier(await hash() === '#/' && await titre() === 'Tes parcours', 'personne lente, puis Parcours : ' + await titre());
  latenceLecture = 0;
  await aller('#/equipe');
  latence = 700;
  await p.fill('#nom-groupe', 'Lent'); await p.click('#form-groupe button'); await attendre(150);
  await p.click('nav a[href="#/historique"]'); await attendre(1300);
  verifier(await hash() === '#/historique' && await titre() === 'Mes notes', 'groupe créé lentement, puis Notes : ' + await titre());
  latence = 0;
  await aller('#/compte'); await p.click('#deconnexion'); await attendre();
  latenceLecture = 700;
  await p.fill('#email', 'moi@x.fr'); await p.fill('#mdp', 'motdepasse1'); await p.click('button[type=submit]'); await attendre(200);
  await p.click('nav a[href="#/revision"]'); await attendre(3800);   // la synchro de la connexion : 4 lectures lentes
  verifier(await hash() === '#/revision' && await titre() === 'Révision', 'connexion lente, puis Révision : ' + await titre());
  latenceLecture = 0;
  db.groupe = db.groupe.filter(g => g.nom !== 'Lent');

  // 12. La grille « Droits des outils » : la ligne Outils, chaque sujet, ses outils en retrait
  await aller('#/equipe');
  const grille = await p.$$eval('#droits-outils tr', trs => trs.map(tr => [tr.querySelector('td').innerText.replace(/\s+/g, ' ').trim(),
    (tr.querySelector('input[data-acces]') || {}).getAttribute ? tr.querySelector('input[data-acces]').getAttribute('data-acces') : '', tr.querySelectorAll('input').length]));
  const ids = grille.map(x => x[1]).join(' ');
  verifier(ids === 'outils outils-sql dico traduire gestion-projet gp-cadrage gp-business-case gp-raci gp-risques gp-rapport gp-budget gp-compte-rendu gp-options ' +
    'gp-decisions gp-changements gp-recette gp-bascule', 'lignes des droits des outils : ' + ids);
  verifier(grille.every(x => x[2] === 2), 'une case par groupe : ' + JSON.stringify(grille.map(x => x[2])));
  verifier(grille[0][0] === 'Outils (toute la section) Réservé' && grille[1][0] === 'SQL Ouvert à tous' && grille[2][0] === '↳ Super dico SQL Réservé' &&
    grille[8][0] === '↳ Registre des risques Réservé', 'textes de la grille : ' + JSON.stringify(grille.slice(0, 9).map(x => x[0])));
  const nbParcours = await p.evaluate(() => LEARNSQL.parcours.reduce((k, x) => k + 1 + (x.sous || []).length, 0));
  verifier(/Droits des parcours/.test(await txt()) && (await p.$$('#droits-parcours tr')).length === nbParcours && nbParcours > 5, 'la grille des parcours');
  await p.check('input[data-acces="gestion-projet"][value="1"]'); await p.check('input[data-acces="traduire"][value="2"]'); await attendre(80);
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(700);
  verifier(ecritures.slice(n).join(' | ') === 'POST acces [{"element":"gestion-projet","groupe_id":1},{"element":"traduire","groupe_id":2}]', 'droits des outils envoyés : ' + ecritures.slice(n).join(' | '));

  // 13. Sur PC : la barre en bas de l'écran, un tableau classique ; Tab : la case qui a le focus n'est jamais sous la barre
  await p.setViewportSize({ width: 1280, height: 800 }); await attendre();
  await p.check('input[data-acces="edi"][value="2"]'); await attendre(80);
  e = await barre();
  verifier(e.vue && e.bas === 800 && await p.evaluate(() => getComputedStyle(document.querySelector('table.empile thead')).display) === 'table-header-group', 'sur PC : ' + JSON.stringify(e));
  await largeur('page Équipe sur PC');
  await p.evaluate(() => window.scrollTo(0, 0)); await p.focus('#nom-groupe');
  let cache = null, vus = 0;
  for (let i = 0; i < 90 && !cache; i++) {
    await p.keyboard.press('Tab');
    cache = await p.evaluate(() => {
      const a = document.activeElement, b = document.getElementById('eq-barre');
      if (!a || a === document.body || b.contains(a)) return null;
      const r = a.getBoundingClientRect(), bb = b.getBoundingClientRect();
      return r.bottom > bb.top ? a.outerHTML.slice(0, 80) + ' bas=' + Math.round(r.bottom) + ' barre=' + Math.round(bb.top) : null;
    });
    vus++;
  }
  verifier(!cache && vus === 90, 'Tab : une case sous la barre : ' + cache);
  await p.click('#eq-annuler'); await attendre();

  // 14. Une fenêtre basse (téléphone en paysage) : la barre reste sous un tiers de l'écran environ, la liste des échecs
  // défile ; la fenêtre tourne : la marge du bas suit la barre
  await p.setViewportSize({ width: 844, height: 390 }); await attendre();
  echec = (m, tab) => m === 'POST';
  for (const el of ['edi', 'gp-cadrage', 'gp-business-case', 'gp-raci', 'gp-rapport', 'gp-compte-rendu', 'gp-options', 'gp-decisions']) await p.check(`input[data-acces="${el}"][value="2"]`);
  await p.click('#eq-valider'); await attendre(900);
  const bas = await p.evaluate(() => {
    const b = document.getElementById('eq-barre'), m = document.getElementById('eq-msg'), v = document.getElementById('eq-valider').getBoundingClientRect();
    return { h: b.getBoundingClientRect().height, ecran: innerHeight, defile: m.scrollHeight > m.clientHeight + 2 && getComputedStyle(m).overflowY === 'auto',
      valider: v.bottom <= innerHeight && v.top >= b.getBoundingClientRect().top };
  });
  verifier(bas.h <= Math.max(bas.ecran * 0.34, 150) + 1 && bas.defile && bas.valider, 'écran bas : la barre ' + JSON.stringify(bas));
  await basVisible('844 × 390, liste des échecs');
  await p.setViewportSize({ width: 390, height: 844 }); await attendre(300);
  await basVisible('la fenêtre a tourné (390 × 844)');
  await p.setViewportSize({ width: 1280, height: 800 }); await attendre(300);
  await basVisible('la fenêtre s\'agrandit (1280 × 800)');
  echec = null;
  await p.click('#eq-annuler'); await attendre();
  await p.setViewportSize({ width: 390, height: 844 }); await attendre();

  // 15. Mon rôle d'admin : la question au moment du choix ; il part en dernier, et seulement si le reste est passé ;
  // ensuite, la session recharge mes droits tout de suite (groupes, acces, rôle) : « Outils » réservé à un groupe dont je
  // ne suis pas → plus de lien « Outils », plus d'outil
  nd = dialogues.length; refuser = true;
  await p.selectOption('select[data-role="u1"]', 'formateur'); await attendre(80); refuser = false;
  verifier(dialogues[nd] === 'confirm Tu vas perdre tes droits d\'admin. Continuer ?' && await p.inputValue('select[data-role="u1"]') === 'admin' && await p.isHidden('#eq-barre'),
    '« Annuler » à la question sur mon rôle : ' + dialogues.slice(nd));
  echec = (m, tab) => m === 'POST' && tab === 'acces';
  await p.check('input[data-acces="outils"][value="1"]'); await p.check('input[data-acces="edi"][value="1"]');
  await p.selectOption('select[data-role="u1"]', 'formateur'); await attendre(80);
  n = ecritures.length;
  await p.click('#eq-valider'); await attendre(800);
  e = await barre();
  verifier(!ecritures.slice(n).some(x => /^PATCH profil\?user_id=eq\.u1/.test(x)) && e.texte === '3 changements à enregistrer' &&
    /^Les 3 changements n'ont pas pu être enregistrés :.*moi@x\.fr : rôle « formateur » \(pas encore envoyé : il part après les autres\)/.test(e.msg) && db.profil[0].role === 'admin',
    'mon rôle malgré un échec : ' + JSON.stringify(e));
  echec = null; n = ecritures.length;
  await p.click('#eq-valider'); await attendre(1200);
  const fin = ecritures.slice(n);
  verifier(fin.length === 2 && /^POST acces/.test(fin[0]) && fin[1] === 'PATCH profil?user_id=eq.u1 {"role":"formateur"}', 'mon rôle part en dernier : ' + fin.join(' | '));
  const session = await p.evaluate(() => JSON.parse(localStorage.getItem('learnsql-session')));
  verifier(/Tu es formateur/.test(await txt()) && !(await p.$('#eq-barre')) && session.role === 'formateur' && session.acces.some(a => a.element === 'outils' && a.groupe_id === 1),
    'après avoir quitté le rôle d\'admin : ' + (await txt()).slice(0, 100) + ' ' + JSON.stringify(session.acces));
  verifier(await p.isHidden('#lien-outils'), 'ex-admin hors du groupe : le lien « Outils » reste');
  await aller('#/outils');
  verifier(/Aucun outil n'est ouvert à ton compte/.test(await txt()), 'ex-admin hors du groupe : des outils restent visibles');
  db.profil[0].role = 'admin'; db.acces = db.acces.filter(a => a.element !== 'outils');

  // 16. La page d'une personne (téléphone : sans débordement)
  await aller('#/equipe/u2');
  verifier(/julie@x\.fr/.test(await txt()) && /Module 2/.test(await txt()), 'page d\'une personne : ' + (await txt()).slice(0, 160));
  await largeur('page d\'une personne');

  // 17. Un agent : pas d'accès à la page
  db.profil[0].role = 'agent'; await aller('#/compte'); await p.click('#sync'); await attendre(800);
  verifier(/Rôle\s*agent/.test(await txt()), 'compte agent : ' + (await txt()).slice(0, 140));
  db.membre.push({ groupe_id: 1, user_id: 'u1' }, { groupe_id: 2, user_id: 'u1' }); await p.click('#sync'); await attendre(800);
  verifier(/Mes groupes\s*Invité, Pôle métier/.test(await txt()), 'groupes de l\'agent : ' + (await txt()).slice(40, 130));
  verifier(!(await p.isVisible('#lien-equipe')), 'agent : lien « Équipe » visible');
  await aller('#/equipe', 300);
  verifier(await hash() === '#/compte', 'agent : pas redirigé vers #/compte');
  console.log('équipe : cocher puis valider (lot, un rechargement, message), annuler, quitter la page et historique, actions immédiates, échec partiel, ' +
    'lot repris ligne par ligne, groupe disparu, rechargement impossible, quitter pendant l\'envoi, page lente, droits des outils, PC et Tab, ' +
    'écran bas et rotation, mon rôle et mes droits, agent');
  console.log('errors', errs); await b.close();
})();
