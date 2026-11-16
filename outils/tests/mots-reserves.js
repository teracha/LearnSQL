// Mots réservés (#/mots-reserves, docs/mots-reserves.md), sans compte : la carte sur la page Outils ; « Vérifier un nom »
// (« order » : réservé sur les 3 moteurs, verdict « À éviter », l'écriture entourée de chaque moteur ; « [order] »,
// "order", `order` : la même chose ; « statut » : libre ; « nom client » : à entourer, un espace ; plus de 128
// caractères : trop long pour SQL Server ; d'autres raisons (accent, chiffre en tête, signe interdit) ; un nom vide :
// rien) ; le sélecteur de moteur (vérification, pièges, liste) ; les pièges : les vrais (pieges.js), puis des pièges
// d'essai injectés dans la page ; la liste complète (le nombre de mots, de A à Z, une lettre, la case MySQL, une colonne
// par moteur, la note d'un mot « limité », les sources) ; 390 px sans débordement (et 320 px : le tableau défile dans son
// cadre) ; aucune erreur JavaScript. Les attendus sont lus dans les données (LEARNSQL.motsReserves, motsRegles,
// motsPieges), pas écrits ici. Les droits (l'outil réservé à un groupe) : outils/tests/outils.js.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const verifier = (ok, m) => { if (!ok) errs.push(m); };
  const attendre = ms => p.waitForTimeout(ms || 120);
  const texte = s => p.$eval(s, x => x.textContent.replace(/\s+/g, ' ').trim()).catch(() => '');
  const moteur = async m => { await p.click('.moteur[data-moteur="' + m + '"]'); await attendre(80); };
  const taper = async nom => { await p.fill('#mr-nom', nom); await attendre(60); };
  const MOTEURS = ['sqlserver', 'snowflake', 'mysql'];
  // Ni la page ni un élément ne dépassent à droite ; seul le tableau défile, dans son cadre (qui tient dans l'écran).
  const largeur = async ou => {
    const r = await p.evaluate(() => {
      const l = innerWidth, trop = [];
      document.querySelectorAll('body *').forEach(e => {
        if (e.closest('.mr-cadre') && !e.classList.contains('mr-cadre')) return;
        const b = e.getBoundingClientRect();
        if (b.width && b.right > l + 1 && getComputedStyle(e).position !== 'absolute') trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right));
      });
      return { l: l, sw: document.documentElement.scrollWidth, trop: trop.slice(0, 4) };
    });
    verifier(r.sw <= r.l && !r.trop.length, ou + ' : la page déborde (' + r.l + ' px) ' + JSON.stringify(r));
  };
  // « Vérifier un nom » : le verdict, et pour chaque moteur affiché son statut, sa règle et son écriture (le texte vu à
  // l'écran : innerText sépare les paragraphes).
  const lu = () => p.evaluate(() => {
    const t = x => x ? x.innerText.replace(/\s+/g, ' ').trim() : '';
    return { html: document.getElementById('mr-res').innerHTML, verdict: t(document.querySelector('#mr-verdict .mr-titre')),
      phrase: t(document.querySelector('#mr-verdict p:last-child')), classe: (document.getElementById('mr-verdict') || {}).className || '',
      place: t(document.getElementById('mr-place')), annonce: document.getElementById('mr-annonce').textContent,
      moteurs: Array.from(document.querySelectorAll('#mr-res .mr-moteur')).map(x => ({ m: x.getAttribute('data-moteur'),
        pastille: t(x.querySelector('.mr-statut .o-niveau')), statut: t(x.querySelector('.mr-statut')), regle: t(x.querySelector('.mr-regle')),
        ecrit: t(x.querySelector('.mr-ecrire code')), ecrire: t(x.querySelector('.mr-ecrire')) })) };
  });
  const de = (r, m) => r.moteurs.filter(x => x.m === m)[0] || {};

  // 1. La carte « Mots réservés » sur la page Outils, sans compte ; la page et ses 3 parties
  await p.goto(U + '#/outils'); await attendre(200);
  const carte = await p.$('.o-carte[href="#/mots-reserves"]');
  verifier(carte && /Mots réservés/.test(await carte.textContent()), 'pas de carte « Mots réservés » sur la page Outils (sans compte)');
  await p.click('.o-carte[href="#/mots-reserves"]'); await attendre();
  verifier(await texte('h1') === 'Mots réservés', 'la carte ne mène pas aux mots réservés : ' + await texte('h1'));
  const intro = await texte('#app > p.muted');
  verifier(/planter/.test(intro) && /entourer partout/.test(intro), 'la phrase d\'intro ne dit pas pourquoi : ' + intro);
  const h2 = await p.$$eval('#app h2', xs => xs.map(x => x.textContent));
  verifier(h2.join('|') === '1. Vérifier un nom|2. Les pièges fréquents|3. La liste complète', 'les 3 parties : ' + h2.join('|'));
  verifier(await p.evaluate(() => (document.activeElement || {}).id) === 'mr-nom', 'la zone du nom n\'a pas le focus');
  verifier((await p.$$eval('.moteurs .moteur', xs => xs.map(x => x.textContent))).join() === 'Tous,SQL Server,Snowflake,MySQL', 'sélecteur de moteur');
  await moteur('tous');
  const D = await p.evaluate(() => ({ mots: LEARNSQL.motsReserves.mots, sources: LEARNSQL.motsReserves.sources, regles: LEARNSQL.motsRegles,
    pieges: LEARNSQL.motsPieges || [] }));
  // L'écriture attendue d'un nom à entourer, sur un moteur : le modèle de regles.js (le signe fermant doublé dans le nom).
  const entoure = (m, nom) => {
    const tpl = D.regles[m].echapper, f = tpl.slice(-1), n = nom.split(f).join(f + f);
    return tpl.split('{nom}').join(n).split('{NOM}').join(n.toUpperCase());
  };
  const sansCode = t => String(t).replace(/`([^`]+)`/g, '$1').replace(/\s+/g, ' ').trim();   // le texte de fmt() à l'écran

  // 2. Un nom vide n'affiche rien (aussi des espaces seuls, ou des crochets vides)
  for (const vide of ['', '   ', '[]', '""']) {
    await taper(vide);
    verifier(await p.evaluate(() => document.getElementById('mr-res').innerHTML) === '' && await p.evaluate(() => document.getElementById('mr-annonce').textContent) === '',
      'un nom vide (' + JSON.stringify(vide) + ') affiche quelque chose');
  }

  // 3. « order » : réservé sur les 3 moteurs, « À éviter », l'écriture entourée de chaque moteur (sans bouton : à la frappe)
  verifier(MOTEURS.every(m => (D.mots.ORDER || {})[m] === 'réservé'), 'données : ORDER n\'est pas réservé sur les 3 moteurs');
  await taper('order');
  let r = await lu();
  console.log('« order » →', r.verdict, '·', r.moteurs.map(x => x.m + ' ' + x.ecrit).join(' · '));
  verifier(r.verdict === 'À éviter' && /mr-ko/.test(r.classe) && r.phrase === 'Réservé sur SQL Server, Snowflake et MySQL.', 'order, verdict : ' + r.verdict + ' / ' + r.phrase);
  verifier(r.annonce === 'À éviter : Réservé sur SQL Server, Snowflake et MySQL.', 'order, annonce pour un lecteur d\'écran : ' + r.annonce);
  verifier(r.moteurs.map(x => x.m).join() === MOTEURS.join(), 'order, les blocs des moteurs : ' + r.moteurs.map(x => x.m).join());
  r.moteurs.forEach(x => {
    verifier(x.pastille === 'réservé' && /Refusé tel quel comme nom/.test(x.statut), 'order, ' + x.m + ', statut : ' + x.statut);
    verifier(/^oui /.test(x.regle), 'order, ' + x.m + ', règle : ' + x.regle);
    verifier(x.ecrit === entoure(x.m, 'order') && x.ecrire.indexOf(sansCode(D.regles[x.m].echapperTexte)) >= 0,
      'order, ' + x.m + ', écriture : ' + x.ecrit + ' au lieu de ' + entoure(x.m, 'order') + ' (' + x.ecrire + ')');
  });
  verifier(de(r, 'snowflake').statut.indexOf(D.mots.ORDER.noteSnowflake) >= 0, 'order, Snowflake : la note ' + D.mots.ORDER.noteSnowflake);
  verifier(!(await p.$('#mr-res button')), 'la vérification a un bouton (elle doit suivre la frappe)');
  await largeur('vérifier « order »');
  // « [order] », "order", `order`, avec des espaces : la même chose
  for (const v of ['[order]', '"order"', '`order`', '  order  ', '[order']) {
    await taper(v);
    verifier((await lu()).html === r.html, JSON.stringify(v) + ' ne donne pas la même chose que « order »');
  }

  // 4. « statut » : libre partout
  verifier(!D.mots.STATUT, 'données : STATUT est dans liste.js');
  await taper('statut');
  r = await lu();
  verifier(r.verdict === 'Libre' && /mr-ok/.test(r.classe) && r.phrase === 'Ni réservé, ni à entourer sur SQL Server, Snowflake et MySQL.', 'statut, verdict : ' + r.verdict + ' / ' + r.phrase);
  r.moteurs.forEach(x => verifier(x.pastille === 'libre' && /^oui /.test(x.regle) && x.ecrit === 'statut' && /tel quel/.test(x.ecrire), 'statut, ' + x.m + ' : ' + JSON.stringify(x)));
  verifier(r.moteurs.length === 3 && !r.place, 'statut : ' + r.moteurs.length + ' moteurs, « à la place » : ' + r.place);

  // 5. « nom client » : à entourer partout (un espace), et une proposition (nom_client)
  await taper('nom client');
  r = await lu();
  verifier(r.verdict === 'À éviter' && /mr-ko/.test(r.classe) && r.phrase === 'À entourer partout sur SQL Server, Snowflake et MySQL : un espace.', 'nom client, verdict : ' + r.phrase);
  r.moteurs.forEach(x => verifier(x.pastille === 'libre' && /^non Il ne suit pas la règle : un espace\./.test(x.regle) && x.ecrit === entoure(x.m, 'nom client'),
    'nom client, ' + x.m + ' : ' + x.regle + ' · ' + x.ecrit));
  verifier(/^Plutôt : nom_client/.test(r.place), 'nom client, la proposition : ' + r.place);
  await largeur('vérifier « nom client »');

  // 6. Plus de 128 caractères : trop long pour SQL Server (même entouré) ; 128 : permis
  verifier(D.regles.sqlserver.longueurMax === 128, 'données : SQL Server, 128 caractères au plus (' + D.regles.sqlserver.longueurMax + ')');
  const long = 'client_' + 'x'.repeat(122);
  await taper(long);
  r = await lu();
  const ss = de(r, 'sqlserver');
  verifier(long.length === 129 && r.verdict === 'À éviter' && /Trop long sur SQL Server/.test(r.phrase), '129 caractères, verdict : ' + r.phrase);
  verifier(/^non /.test(ss.regle) && ss.regle.indexOf('trop long, 129 caractères (128 au plus)') >= 0 && !ss.ecrit && /raccourcis-le/.test(ss.ecrire),
    '129 caractères, SQL Server : ' + ss.regle + ' · ' + ss.ecrire);
  MOTEURS.filter(m => m !== 'sqlserver').forEach(m => {
    const x = de(r, m), trop = long.length > D.regles[m].longueurMax;
    verifier(trop ? /trop long/.test(x.regle) && !x.ecrit : /^oui /.test(x.regle) && x.ecrit === long, '129 caractères, ' + m + ' : ' + x.regle);
  });
  await largeur('vérifier un nom de 129 caractères');
  await taper(long.slice(0, 128));
  verifier(/^oui /.test(de(await lu(), 'sqlserver').regle), '128 caractères : trop long pour SQL Server ?');

  // 7. D'autres raisons, en mots simples, quand le motif d'un moteur refuse le nom (selon regles.js) ; un signe fermant
  // dans le nom est doublé ; « $& » reste tel quel dans l'écriture
  const cas = [['société', 'une lettre accentuée « é »'], ['1client', 'il commence par un chiffre'], ['commande-ligne', 'un signe interdit « - »'],
    ['a]b', 'un signe interdit « ] »'], ['x$&y', 'un signe interdit « & »']];
  let refus = 0;
  for (const [nom, raison] of cas) {
    await taper(nom);
    r = await lu();
    for (const x of r.moteurs) {
      const permis = await p.evaluate(a => new RegExp(LEARNSQL.motsRegles[a[0]].motif).test(a[1]), [x.m, nom]);
      if (!permis) refus++;
      verifier(permis ? /^oui /.test(x.regle) && x.ecrit === nom : x.regle.indexOf(raison) >= 0 && x.ecrit === entoure(x.m, nom),
        nom + ', ' + x.m + ' : ' + x.regle + ' · ' + x.ecrit + (permis ? '' : ' (attendu : ' + raison + ', ' + entoure(x.m, nom) + ')'));
    }
  }
  verifier(refus >= 9, 'ces noms devraient être refusés tels quels sur la plupart des moteurs (' + refus + ' refus)');

  // 8. Le sélecteur de moteur : Snowflake seul (un bloc, les autres moteurs en une ligne), puis Tous
  await taper('order');
  await moteur('snowflake');
  r = await lu();
  verifier(r.moteurs.map(x => x.m).join() === 'snowflake' && r.verdict === 'À éviter' && r.phrase === 'Réservé sur Snowflake.', 'sélecteur Snowflake : ' + r.moteurs.map(x => x.m).join() + ' / ' + r.phrase);
  verifier(await texte('#mr-autres') === 'Sur les autres moteurs : réservé sur SQL Server, réservé sur MySQL.', 'sélecteur Snowflake, les autres moteurs : ' + await texte('#mr-autres'));
  // Un mot-clé de MySQL seulement (le premier de liste.js, sans piège) : libre sur Snowflake, « Possible, mais à éviter » ailleurs
  const cle = Object.keys(D.mots).filter(k => JSON.stringify(D.mots[k]) === '{"mysql":"mot-clé"}' && !D.pieges.some(x => x.mot === k))[0] || '';
  await taper(cle.toLowerCase());
  verifier(cle && (await lu()).verdict === 'Libre', cle + ', Snowflake seul : pas « Libre »');
  await moteur('mysql');
  r = await lu();
  verifier(r.verdict === 'Possible, mais à éviter' && /mr-attention/.test(r.classe) && de(r, 'mysql').pastille === 'mot-clé', cle + ', MySQL : ' + r.verdict);
  await moteur('tous');
  verifier((await lu()).verdict === 'Possible, mais à éviter', cle + ', Tous : ' + (await lu()).verdict);

  // 9. Les pièges : les vrais (pieges.js) ; leurs statuts viennent de liste.js
  const cartes = () => p.$$eval('.mr-piege', xs => xs.map(x => ({ mot: x.getAttribute('data-mot'), texte: x.innerText.replace(/\s+/g, ' ').trim(),
    st: Array.from(x.querySelectorAll('.mr-st')).map(s => s.getAttribute('data-moteur') + ':' + s.querySelector('.o-niveau').textContent) })));
  const statuts = (mot, ms) => ms.map(m => m + ':' + ((D.mots[mot] || {})[m] || 'libre')).join();
  let cs = await cartes();
  console.log('pièges (pieges.js) :', D.pieges.length);
  if (!D.pieges.length) verifier(await texte('#mr-pieges-vide') === 'Pas encore de piège.' && !cs.length, 'pas de piège : pas de message');
  else {
    verifier(cs.length === D.pieges.length, 'pièges : ' + cs.length + ' cartes au lieu de ' + D.pieges.length);
    D.pieges.forEach((pg, i) => {
      const c = cs[i] || {};
      verifier(c.mot === pg.mot && (c.st || []).join() === statuts(pg.mot, MOTEURS) && pg.aLaPlace.every(n => c.texte.indexOf(n) >= 0) &&
        c.texte.indexOf('On le choisit pour : ' + sansCode(pg.pourquoi)) > 0 && !/Le piège/.test(c.texte) &&
        (pg.conseil ? /Conseil :/.test(c.texte) : !/Conseil :/.test(c.texte)), 'piège ' + pg.mot + ' : ' + JSON.stringify(c));
    });
    // Un piège tapé dans « Vérifier un nom » : « À la place », puis pourquoi on le choisit
    const pg = D.pieges[0];
    await taper(pg.mot.toLowerCase());
    r = await lu();
    verifier(r.place.indexOf('À la place : ' + pg.aLaPlace.join(' · ')) === 0 && r.place.indexOf('On le choisit pour : ' + sansCode(pg.pourquoi)) > 0,
      'vérifier le piège ' + pg.mot + ' : ' + r.place);
    // Chaque nom « à la place » s'écrit tel quel, réservé nulle part (un mot-clé MySQL : une alerte du vérificateur)
    for (const n of D.pieges.reduce((l, x) => l.concat(x.aLaPlace), [])) {
      await taper(n);
      r = await lu();
      verifier(r.verdict === 'Libre' || r.verdict === 'Possible, mais à éviter', 'à la place, « ' + n + ' » est à éviter : ' + r.phrase);
    }
  }
  await largeur('les pièges (pieges.js)');

  // 10. Les pièges : des pièges d'essai, injectés dans la page (le format de pieges.js)
  const ESSAI = [
    { mot: 'ORDER', pourquoi: 'Essai : la commande d\'un client.', aLaPlace: ['ordre_tri', 'num_ordre'], conseil: 'Essai : un conseil, avec `commande`.' },
    { mot: 'USER', pourquoi: 'Essai : la table des utilisateurs.', aLaPlace: ['utilisateur'] }
  ];
  await taper('order');
  await p.evaluate(e => { window.__vraisPieges = LEARNSQL.motsPieges; LEARNSQL.motsPieges = e; location.hash = '#/outils'; }, ESSAI);
  await attendre();
  await p.evaluate(() => { location.hash = '#/mots-reserves'; }); await attendre(150);
  verifier(await p.inputValue('#mr-nom') === 'order', 'le nom tapé n\'est pas gardé en revenant sur la page');
  r = await lu();
  verifier(r.place === 'À la place : ordre_tri · num_ordre On le choisit pour : Essai : la commande d\'un client. Conseil : Essai : un conseil, avec commande.' &&
    !(await p.$('#mr-conseil')), 'piège d\'essai, « order » : ' + r.place);
  cs = await cartes();
  verifier(cs.length === 2 && cs[0].mot === 'ORDER' && cs[1].mot === 'USER', 'pièges d\'essai : ' + cs.map(c => c.mot).join());
  verifier(cs[0].st.join() === statuts('ORDER', MOTEURS) && cs[1].st.join() === statuts('USER', MOTEURS), 'pièges d\'essai, statuts : ' + JSON.stringify(cs.map(c => c.st)));
  verifier(/^ORDER /.test(cs[0].texte) && /On le choisit pour : Essai : la commande d'un client\./.test(cs[0].texte) && /À la place : ordre_tri · num_ordre/.test(cs[0].texte) &&
    /Conseil : Essai : un conseil, avec commande\./.test(cs[0].texte) && !/Conseil/.test(cs[1].texte), 'pièges d\'essai, textes : ' + JSON.stringify(cs.map(c => c.texte)));
  verifier(await p.$eval('.mr-piege .mr-a-la-place code', x => x.textContent) === 'ordre_tri', 'pièges d\'essai : « à la place » en police code');
  await largeur('les pièges (essai)');
  await moteur('mysql');
  cs = await cartes();
  verifier(cs.every(c => c.st.length === 1) && cs[0].st.join() === statuts('ORDER', ['mysql']) && cs[1].st.join() === statuts('USER', ['mysql']), 'pièges, MySQL seul : ' + JSON.stringify(cs.map(c => c.st)));
  await moteur('tous');
  // Un nom réservé sans piège : le conseil général (un mot qui précise)
  await taper('alter');
  verifier(!(await p.$('#mr-place')) && /Choisis un autre nom/.test(await texte('#mr-conseil')), 'alter, sans piège : pas de conseil');
  await p.evaluate(() => { LEARNSQL.motsPieges = window.__vraisPieges; location.hash = '#/outils'; });
  await attendre();
  await p.evaluate(() => { location.hash = '#/mots-reserves'; }); await attendre(150);

  // 11. La liste complète : les mots réservés, futurs ou limités sur au moins un moteur, de A à Z, une colonne par moteur
  const A = await p.evaluate(() => {
    const M = LEARNSQL.motsReserves.mots, k = Object.keys(M), ms = ['sqlserver', 'snowflake', 'mysql'];
    return { sans: k.filter(w => ms.some(m => M[w][m] && M[w][m] !== 'mot-clé')).length, avec: k.filter(w => ms.some(m => M[w][m])).length,
      mysql: k.filter(w => M[w].mysql === 'réservé').length, mysqlAvec: k.filter(w => M[w].mysql).length,
      sqlserver: k.filter(w => M[w].sqlserver).length, snowflake: k.filter(w => M[w].snowflake).length,
      cleSeul: k.filter(w => M[w].mysql === 'mot-clé' && !M[w].sqlserver && !M[w].snowflake)[0],
      limite: k.filter(w => M[w].snowflake === 'limité')[0], mysqlSeul: k.filter(w => M[w].mysql === 'réservé' && !M[w].sqlserver && !M[w].snowflake)[0] };
  });
  const tableau = () => p.evaluate(() => ({ th: Array.from(document.querySelectorAll('#mr-table thead th')).map(x => x.textContent),
    mots: Array.from(document.querySelectorAll('#mr-table tbody tr:not(.mr-sep):not(.mr-sous) th')).map(x => x.textContent),
    vides: Array.from(document.querySelectorAll('#mr-table tbody tr:not(.mr-sep):not(.mr-sous)')).filter(tr => !tr.querySelector('td .o-niveau')).length,
    compte: (document.getElementById('mr-compte') || {}).textContent, cache: document.getElementById('mr-case').hidden,
    lettres: Array.from(document.querySelectorAll('#mr-lettres .mr-lettre')).map(x => x.textContent) }));
  const ligne = mot => p.evaluate(m => {
    const th = Array.from(document.querySelectorAll('#mr-table th[scope="row"]')).filter(x => x.textContent === m)[0];
    if (!th) return null;
    const tr = th.parentNode, sous = tr.nextElementSibling && tr.nextElementSibling.classList.contains('mr-sous') ? tr.nextElementSibling.textContent : '';
    return { cellules: Array.from(tr.querySelectorAll('td')).map(x => x.textContent.replace(/\s+/g, ' ').trim()), note: sous };
  }, mot);
  let t = await tableau();
  console.log('liste complète :', t.compte, '· lettres', t.lettres.join(''));
  verifier(t.th.join() === 'Mot,SQL Server,Snowflake,MySQL', 'liste, colonnes : ' + t.th.join());
  verifier(t.mots.length === A.sans && t.compte === A.sans + ' mots.' && t.vides === 0, 'liste : ' + t.mots.length + ' mots (' + t.compte + ') au lieu de ' + A.sans);
  verifier(t.mots.join() === t.mots.slice().sort().join(), 'liste : pas rangée de A à Z');
  verifier(t.mots.indexOf(A.cleSeul) < 0 && !t.cache, 'liste : un mot-clé MySQL seul (' + A.cleSeul + ') affiché sans la case, ou case cachée');
  let lg = await ligne('ORDER');
  verifier(lg && lg.cellules.join() === 'réservé,réservé,réservé', 'liste, ORDER : ' + JSON.stringify(lg));
  lg = await ligne(A.mysqlSeul);
  verifier(lg && lg.cellules.join() === '—libre,—libre,réservé', 'liste, ' + A.mysqlSeul + ' (libre : un tiret, et « libre » pour un lecteur d\'écran) : ' + JSON.stringify(lg));
  lg = await ligne(A.limite);
  verifier(lg && lg.cellules[1] === 'limité' && lg.note.indexOf(D.mots[A.limite].noteSnowflake) >= 0, 'liste, ' + A.limite + ' limité sur Snowflake, sa note : ' + JSON.stringify(lg));
  verifier(t.lettres.join('') === Array.from(new Set(t.mots.map(m => m.charAt(0)))).join(''), 'les lettres : ' + t.lettres.join(''));
  await largeur('liste complète (Tous)');
  verifier(await p.evaluate(() => document.getElementById('mr-glisser').hidden), '390 px : le tableau tient, l\'aide « Fais glisser » est de trop');
  // Une lettre : la page va à cette lettre, qui prend le focus
  await p.click('#mr-lettres .mr-lettre[data-lettre="O"]'); await attendre(150);
  const o = await p.evaluate(() => {
    const th = document.querySelector('#mr-l-O .mr-sep th'), premier = document.querySelector('#mr-l-O tr:not(.mr-sep) th');
    return { top: Math.round(th.getBoundingClientRect().top), focus: document.activeElement === th, premier: premier && premier.textContent, y: Math.round(scrollY) };
  });
  verifier(o.top >= 0 && o.top <= 40 && o.y > 1000 && o.focus && /^O/.test(o.premier), 'la lettre O : ' + JSON.stringify(o));
  // La case « mots-clés permis (MySQL) »
  await p.check('#mr-cle'); await attendre(80);
  t = await tableau();
  verifier(t.mots.length === A.avec && t.mots.indexOf(A.cleSeul) >= 0 && t.compte === A.avec + ' mots.', 'avec les mots-clés : ' + t.mots.length + ' au lieu de ' + A.avec);
  lg = await ligne(A.cleSeul);
  verifier(lg && lg.cellules.join() === '—libre,—libre,mot-clé', 'avec les mots-clés, ' + A.cleSeul + ' : ' + JSON.stringify(lg));
  await largeur('liste complète, avec les mots-clés');
  // Un moteur seul : sa colonne seulement, ses mots seulement
  await moteur('mysql');
  t = await tableau();
  verifier(t.th.join() === 'Mot,MySQL' && t.mots.length === A.mysqlAvec && t.compte === A.mysqlAvec + ' mots sur MySQL.' && !t.cache && t.vides === 0, 'MySQL, avec les mots-clés : ' + JSON.stringify([t.th, t.mots.length, t.compte, t.cache]));
  await p.uncheck('#mr-cle'); await attendre(80);
  t = await tableau();
  verifier(t.mots.length === A.mysql && t.vides === 0, 'MySQL, sans les mots-clés : ' + t.mots.length + ' au lieu de ' + A.mysql);
  await moteur('snowflake');
  t = await tableau();
  verifier(t.th.join() === 'Mot,Snowflake' && t.mots.length === A.snowflake && t.cache && t.vides === 0, 'Snowflake : ' + JSON.stringify([t.th, t.mots.length, t.cache]));
  await moteur('sqlserver');
  t = await tableau();
  verifier(t.th.join() === 'Mot,SQL Server' && t.mots.length === A.sqlserver && t.cache && t.vides === 0, 'SQL Server : ' + JSON.stringify([t.th, t.mots.length, t.cache]));
  await moteur('tous');
  // Les sources : les 3 pages officielles (nouvel onglet) et leur date
  const src = await p.evaluate(() => ({ liens: Array.from(document.querySelectorAll('#mr-sources a')).map(a => a.getAttribute('href') + ' ' + a.target),
    texte: (document.getElementById('mr-sources') || {}).textContent || '' }));
  const jour = D.sources.date.split('-').reverse().join('/');
  verifier(src.liens.join(' | ') === MOTEURS.map(m => D.sources[m] + ' _blank').join(' | ') && src.texte.indexOf('lues le ' + jour) >= 0, 'sources : ' + JSON.stringify(src));
  // Les règles d'un nom, repliées sous la vérification : les 3 moteurs, leur règle, leur page officielle
  await p.click('#mr-regles summary'); await attendre(80);
  const regles = await p.evaluate(() => ({ h3: Array.from(document.querySelectorAll('#mr-regles h3')).map(x => x.textContent),
    liens: Array.from(document.querySelectorAll('#mr-regles a')).map(a => a.getAttribute('href')), texte: document.getElementById('mr-regles').textContent.replace(/\s+/g, ' ') }));
  verifier(regles.h3.join() === 'SQL Server,Snowflake,MySQL' && regles.liens.join() === MOTEURS.map(m => D.regles[m].source).join() &&
    MOTEURS.every(m => regles.texte.indexOf(sansCode(D.regles[m].regle)) >= 0), 'les règles d\'un nom : ' + JSON.stringify(regles.h3));
  await moteur('snowflake');
  verifier(await p.evaluate(() => document.getElementById('mr-regles').open && document.querySelectorAll('#mr-regles h3').length === 1), 'les règles : Snowflake seul, ou repliées en changeant de moteur');
  await moteur('tous');
  // « Aller à : La liste complète »
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.click('[data-aller="mr-liste"]'); await attendre(120);
  const aller = await p.evaluate(() => ({ top: Math.round(document.getElementById('mr-liste').getBoundingClientRect().top), focus: document.activeElement.id }));
  verifier(aller.top >= 0 && aller.top <= 40 && aller.focus === 'mr-liste', '« Aller à : La liste complète » : ' + JSON.stringify(aller));
  verifier(await p.evaluate(() => location.hash) === '#/mots-reserves', 'un saut dans la page change l\'adresse');

  // 12. 320 px : la page ne déborde pas, le tableau défile dans son cadre, avec l'aide « Fais glisser »
  await p.setViewportSize({ width: 320, height: 700 }); await moteur('tous');
  await largeur('liste complète à 320 px');
  verifier(await p.evaluate(() => { const c = document.getElementById('mr-cadre'); return c.scrollWidth > c.clientWidth && !document.getElementById('mr-glisser').hidden; }),
    '320 px : le tableau ne défile pas dans son cadre, ou pas d\'aide « Fais glisser »');
  await taper('nom client'); await largeur('vérifier « nom client » à 320 px');
  await p.setViewportSize({ width: 390, height: 844 });

  console.log('mots réservés : carte Outils, vérifier un nom (order, [order], statut, nom client, 129 caractères, raisons), moteurs, pièges, liste complète, 390 et 320 px');
  console.log('errors', errs); await b.close();
})();
