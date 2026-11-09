(function () {
  "use strict";

  var DATA = window.LEARNSQL;
  var STORE_KEY = "learnsql-v1";
  var TAILLE_QCM = 10;     // questions tirées par QCM dans la réserve du module
  var REVISION_MIN_THEMES = 2;
  var REVISION_MIN_QUESTIONS = 20;
  var REVISION_MIN_PAR_THEME = 5;
  var app = document.getElementById("app");
  var quiz = null;        // quiz en cours
  var dernierResultat = null;

  // ---------- Sauvegarde locale ----------
  function videStore() { return { version: 1, tentatives: [], questions: {} }; }

  function lire() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.version === 1) return s;
    } catch (e) { /* stockage indisponible : on repart de zéro */ }
    return videStore();
  }

  function ecrireLocal(s) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignoré */ }
  }

  function ecrire(s) {
    ecrireLocal(s);
    planifierSync();
  }

  // ---------- Compte et synchronisation (Supabase) ----------
  // La clé « publishable » est faite pour être visible dans le site :
  // la base ne laisse chaque utilisateur lire que SA ligne (voir outils/supabase.sql).
  var SUPA_URL = "https://kkugxebgeteijhxijohk.supabase.co";
  var SUPA_KEY = "sb_publishable_CUaxASwOUJ1c7UWEDDvlSQ__RE0DHTA";
  var SESSION_KEY = "learnsql-session";
  var etatSync = "";      // texte affiché sur la page Compte
  var minuterieSync = null;

  function lireSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }

  function ecrireSession(s) {
    try {
      if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignoré */ }
  }

  function appelSupa(chemin, options, jeton) {
    options = options || {};
    var entetes = { apikey: SUPA_KEY, "Content-Type": "application/json" };
    if (jeton) entetes.Authorization = "Bearer " + jeton;
    Object.keys(options.entetes || {}).forEach(function (k) { entetes[k] = options.entetes[k]; });
    return fetch(SUPA_URL + chemin, {
      method: options.methode || "GET",
      headers: entetes,
      body: options.corps ? JSON.stringify(options.corps) : undefined
    }).then(function (r) {
      return r.text().then(function (t) {
        var d = null;
        try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
        if (!r.ok) {
          var err = new Error((d && (d.msg || d.error_description || d.message || d.error)) || ("Erreur " + r.status));
          err.status = r.status;
          throw err;
        }
        return d;
      });
    });
  }

  // Jetons reçus (connexion ou lien de l'e-mail) → session complète avec l'utilisateur.
  function ouvrirSession(jetons) {
    return appelSupa("/auth/v1/user", {}, jetons.access_token).then(function (u) {
      var s = {
        access_token: jetons.access_token,
        refresh_token: jetons.refresh_token,
        expire: Date.now() + (Number(jetons.expires_in) || 3600) * 1000,
        id: u.id,
        email: u.email,
        role: (lireSession() || {}).id === u.id ? lireSession().role : "agent"
      };
      ecrireSession(s);
      return s;
    });
  }

  // Renvoie une session valide (rafraîchie si besoin), ou null.
  function sessionValide() {
    var s = lireSession();
    if (!s) return Promise.resolve(null);
    if (s.expire - 60000 > Date.now()) return Promise.resolve(s);
    return appelSupa("/auth/v1/token?grant_type=refresh_token", {
      methode: "POST", corps: { refresh_token: s.refresh_token }
    }).then(ouvrirSession, function (e) {
      if (e.status === 400 || e.status === 401) ecrireSession(null);   // session révoquée
      throw e;
    });
  }

  // Fusionne deux progressions : on ne perd jamais un essai.
  function fusion(a, b) {
    var s = videStore(), vus = {};
    a.tentatives.concat(b.tentatives).forEach(function (t) {
      var k = t.date + "|" + t.module;
      if (!vus[k]) { vus[k] = true; s.tentatives.push(t); }
    });
    s.tentatives.sort(function (x, y) { return x.date < y.date ? -1 : x.date > y.date ? 1 : 0; });
    Object.keys(a.questions).concat(Object.keys(b.questions)).forEach(function (id) {
      var qa = a.questions[id], qb = b.questions[id];
      s.questions[id] = !qb || (qa && qa.vues >= qb.vues) ? qa : qb;
    });
    return s;
  }

  // Lit la progression en ligne, la fusionne avec celle de l'appareil, renvoie le tout.
  function droits() {
    var s = lireSession() || {};
    return JSON.stringify([s.role, s.groupeIds, s.acces]);
  }

  function synchroniser() {
    var avant = droits();
    return sessionValide().then(function (s) {
      if (!s) return false;
      return appelSupa("/rest/v1/progression?select=data", {}, s.access_token).then(function (lignes) {
        var local = lire();
        var distant = lignes && lignes[0] && lignes[0].data;
        var tout = distant && distant.version === 1 ? fusion(local, distant) : local;
        var change = JSON.stringify(tout) !== JSON.stringify(local);
        ecrireLocal(tout);
        return appelSupa("/rest/v1/progression", {
          methode: "POST",
          entetes: { Prefer: "resolution=merge-duplicates,return=minimal" },
          corps: { user_id: s.id, data: tout, maj: new Date().toISOString() }
        }, s.access_token).then(function () {
          return appelSupa("/rest/v1/profil?select=role&user_id=eq." + s.id, {}, s.access_token).then(function (p) {
            var role = p && p[0] ? p[0].role : "agent";
            var cur = lireSession();
            if (cur && cur.role !== role) { cur.role = role; ecrireSession(cur); majNav(); }
            return appelSupa("/rest/v1/membre?select=groupe_id,groupe(nom)&user_id=eq." + s.id, {}, s.access_token);
          }).then(function (m) {
            var cur = lireSession();
            if (cur && m) {
              cur.groupes = m.map(function (x) { return x.groupe && x.groupe.nom; }).filter(Boolean).sort();
              cur.groupeIds = m.map(function (x) { return x.groupe_id; });
              ecrireSession(cur);
            }
          }, function () { /* tables d'équipe absentes : rôle agent, sans groupe */ }).then(function () {
            return appelSupa("/rest/v1/acces?select=element,groupe_id", {}, s.access_token).then(function (a) {
              var cur = lireSession();
              if (cur) { cur.acces = a || []; ecrireSession(cur); }
            }, function () { /* table acces absente : tout est ouvert */ });
          });
        }).then(function () {
          etatSync = "Synchronisé à " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + ".";
          return change || droits() !== avant;
        });
      });
    }).catch(function (e) {
      etatSync = "Synchronisation impossible : " + e.message;
      return false;
    });
  }

  function planifierSync() {
    if (!lireSession()) return;
    clearTimeout(minuterieSync);
    minuterieSync = setTimeout(synchroniser, 1500);
  }

  // Après une synchro, on réaffiche la page, sauf en plein QCM.
  function synchroniserPuisAfficher() {
    synchroniser().then(function (change) {
      if (change && !quiz) route();
      else if (location.hash.indexOf("#/compte") === 0) pageCompte();
    });
  }

  // Retour du lien de l'e-mail : Supabase met les jetons ou l'erreur dans le #.
  var messageCompte = "";
  var nouveauMdp = false;   // vrai après un lien « mot de passe oublié »
  function retourSite() { return encodeURIComponent(location.origin + location.pathname); }

  function lireRetourEmail() {
    var h = location.hash.replace(/^#/, "");
    if (h.indexOf("access_token=") < 0 && h.indexOf("error=") < 0) return Promise.resolve();
    var p = {};
    h.split("&").forEach(function (kv) {
      var i = kv.indexOf("=");
      if (i > 0) p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, " "));
    });
    history.replaceState(null, "", location.pathname + location.search + "#/compte");
    if (p.error) {
      messageCompte = "Le lien n'a pas marché : " + (p.error_description || p.error) + ". Connecte-toi ci-dessous.";
      return Promise.resolve();
    }
    return ouvrirSession(p).then(function () {
      if (p.type === "recovery") {
        nouveauMdp = true;
        messageCompte = "Choisis ton nouveau mot de passe ci-dessous.";
      } else messageCompte = "Adresse confirmée. Tu es connecté.";
    }, function (e) {
      messageCompte = "Connexion impossible : " + e.message;
    });
  }

  function majNav() {
    var lien = document.getElementById("lien-compte");
    var s = lireSession();
    if (lien) lien.textContent = s ? "Compte ✓" : "Connexion";
    var equipe = document.getElementById("lien-equipe");
    if (equipe) equipe.hidden = !(s && (s.role === "admin" || s.role === "formateur"));
    var pied = document.getElementById("pied-compte");
    if (pied) pied.innerHTML = s ? "Tes notes sont enregistrées dans ton compte." :
      'Sans compte, tes notes restent dans ce navigateur. <a href="#/compte">Se connecter</a> pour les retrouver partout.';
  }

  // ---------- Outils ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Texte avec `code` entre accents graves → balise <code>
  function fmt(t) { return esc(t).replace(/`([^`]+)`/g, "<code>$1</code>"); }

  function melange(tab) {
    var a = tab.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function note20(bonnes, total) { return total ? Math.round((bonnes / total) * 200) / 10 : 0; }
  function classeNote(n) { return n >= 14 ? "good" : n < 10 ? "bad" : ""; }
  function fmtNote(n) { return String(n).replace(".", ",") + "/20"; }
  function fmtDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }

  function module(id) {
    for (var i = 0; i < DATA.modules.length; i++) if (DATA.modules[i].id === id) return DATA.modules[i];
    return null;
  }

  // ---------- Parcours et droits ----------
  // Liste à plat : chaque parcours ou sous-parcours avec sa chaîne d'ids (parcours, puis sous-parcours).
  function noeuds() {
    var liste = [];
    (DATA.parcours || []).forEach(function (p) {
      liste.push({ n: p, chaine: [p.id] });
      (p.sous || []).forEach(function (s) { liste.push({ n: s, chaine: [p.id, s.id] }); });
    });
    return liste;
  }

  function noeud(id) {
    return noeuds().filter(function (x) { return x.n.id === id; })[0] || null;
  }

  function chaineModule(mid) {
    var trouve = noeuds().filter(function (x) { return (x.n.modules || []).indexOf(mid) >= 0; })[0];
    return trouve ? trouve.chaine : null;
  }

  function numeroModule(mid) {
    var x = noeud(chaineModule(mid).slice(-1)[0]);
    return x.n.modules.indexOf(mid) + 1;
  }

  // Règle : sans compte, seulement les parcours publics. Admin : tout.
  // Sinon, chaque niveau de la chaîne doit être ouvert à tous, ou à un de mes groupes.
  function accesOK(chaine) {
    var s = lireSession();
    if (!s) return (DATA.parcoursPublics || []).indexOf(chaine[0]) >= 0;
    if (s.role === "admin") return true;
    var regles = s.acces || [], mes = s.groupeIds || [];
    return chaine.every(function (el) {
      var r = regles.filter(function (x) { return x.element === el; });
      return !r.length || r.some(function (x) { return mes.indexOf(x.groupe_id) >= 0; });
    });
  }

  function moduleVisible(mid) {
    var c = chaineModule(mid);
    return !!c && accesOK(c);
  }

  // "m05-q12" → "m05" ; marche aussi pour des ids plus longs ("edi-m01-q03").
  function moduleDe(qid) { return qid.slice(0, qid.lastIndexOf("-q")); }

  function toutesQuestions() {
    var liste = [];
    Object.keys(DATA.questions).forEach(function (m) { liste = liste.concat(DATA.questions[m]); });
    return liste;
  }

  function questionParId(id) {
    var toutes = toutesQuestions();
    for (var i = 0; i < toutes.length; i++) if (toutes[i].id === id) return toutes[i];
    return null;
  }

  function idsEnErreur(store) {
    return Object.keys(store.questions).filter(function (id) {
      return store.questions[id].dernier === false && questionParId(id) && moduleVisible(moduleDe(id));
    });
  }

  function vuesModule(store, qs) {
    return qs.filter(function (q) { return store.questions[q.id]; }).length;
  }

  // Tire n questions : d'abord les jamais vues, puis les ratées, puis les réussies.
  function tirage(qs, store, n) {
    function priorite(q) {
      var st = store.questions[q.id];
      return !st ? 0 : st.dernier === false ? 1 : 2;
    }
    return melange(qs)
      .sort(function (a, b) { return priorite(a) - priorite(b); })
      .slice(0, n || TAILLE_QCM);
  }

  // Révision : répartit total questions entre les thèmes, au moins REVISION_MIN_PAR_THEME chacun.
  function tirageRevision(ids, total, store) {
    var quotas = {};
    var base = Math.floor(total / ids.length);
    ids.forEach(function (id) { quotas[id] = base; });
    melange(ids).slice(0, total - base * ids.length).forEach(function (id) { quotas[id]++; });
    // Un thème trop petit donne son surplus aux autres
    var manque = 0;
    ids.forEach(function (id) {
      var dispo = DATA.questions[id].length;
      if (quotas[id] > dispo) { manque += quotas[id] - dispo; quotas[id] = dispo; }
    });
    melange(ids).forEach(function (id) {
      var place = DATA.questions[id].length - quotas[id];
      var ajout = Math.min(place, manque);
      quotas[id] += ajout; manque -= ajout;
    });
    var liste = [];
    ids.forEach(function (id) { liste = liste.concat(tirage(DATA.questions[id], store, quotas[id])); });
    return liste;
  }

  function themesRevisables() {
    return DATA.modules.filter(function (m) {
      return DATA.questions[m.id] && DATA.questions[m.id].length >= REVISION_MIN_PAR_THEME && moduleVisible(m.id);
    });
  }

  function minRevision(nbThemes) {
    return Math.max(REVISION_MIN_QUESTIONS, REVISION_MIN_PAR_THEME * nbThemes);
  }

  function statsModule(store, id) {
    var t = store.tentatives.filter(function (x) { return x.module === id; });
    if (!t.length) return null;
    var meilleure = Math.max.apply(null, t.map(function (x) { return x.note; }));
    return { nb: t.length, meilleure: meilleure, derniere: t[t.length - 1].note };
  }

  // ---------- Pages ----------
  function carteModule(store, m, num) {
    var qs = DATA.questions[m.id];
    var st = statsModule(store, m.id);
    var droite = !qs ? '<div class="note"><small>À venir</small></div>'
      : st ? '<div class="note ' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) +
             '<small>meilleure · ' + st.nb + ' essai(s)</small></div>'
      : '<div class="note"><small>' + Math.min(TAILLE_QCM, qs.length) + ' questions</small></div>';
    var boutons = (DATA.cours[m.id] ? '<a class="btn small ghost" href="#/cours/' + m.id + '">Cours</a>' : '') +
      (qs ? '<a class="btn small" href="#/quiz/' + m.id + '">QCM</a>' : '');
    return '<div class="card module' + (qs || DATA.cours[m.id] ? '' : ' locked') + '">' +
      '<div class="num">' + num + '</div>' +
      '<div><h3>' + esc(m.titre) + '</h3><p>' + esc(m.resume) + '</p>' +
      '<div class="tags"><span class="tag">' + esc(m.niveau) + '</span>' +
      (qs ? '<span class="tag">' + vuesModule(store, qs) + '/' + qs.length + ' vues</span>' : '') + '</div>' +
      (boutons ? '<div class="mini-actions">' + boutons + '</div>' : '') + '</div>' +
      droite + '</div>';
  }

  // Tous les modules d'un parcours, sous-parcours compris.
  function modulesDe(n) {
    var ids = (n.modules || []).slice();
    (n.sous || []).forEach(function (s) { ids = ids.concat(s.modules || []); });
    return ids;
  }

  function carteParcours(store, n, lien) {
    // Un module « sansNote » (ex. le bilan de départ) ne compte pas dans l'objectif de 16/20.
    var ids = modulesDe(n), prets = ids.filter(function (id) {
      var m = module(id);
      return DATA.questions[id] && !(m && m.sansNote);
    });
    var reussis = prets.filter(function (id) { var st = statsModule(store, id); return st && st.meilleure >= 16; });
    var nbSous = (n.sous || []).length;
    var detail = !prets.length && !nbSous ? 'À venir'
      : (nbSous ? nbSous + ' sous-parcours · ' : '') + ids.length + ' modules';
    return '<a class="card parcours" href="' + lien + '"><div><h3>' + esc(n.titre) + '</h3>' +
      '<p>' + esc(n.resume) + '</p><div class="tags"><span class="tag">' + detail + '</span>' +
      (prets.length ? '<span class="tag">' + reussis.length + '/' + prets.length + ' à 16/20</span>' : '') +
      '</div></div><span class="fleche" aria-hidden="true">›</span></a>';
  }

  function pageAccueil() {
    var store = lire();
    var html = '<h1>Tes parcours</h1>' +
      '<p class="muted">Choisis un parcours. Fais les modules dans l\'ordre. Refais-les jusqu\'à 16/20.</p>';
    var nbErr = idsEnErreur(store).length;
    if (nbErr) {
      html += '<div class="card"><strong>' + nbErr + ' question(s) à revoir.</strong> ' +
        '<a href="#/erreurs">Refaire mes erreurs</a></div>';
    }
    var visibles = (DATA.parcours || []).filter(function (p) { return accesOK([p.id]); });
    visibles.forEach(function (p) { html += carteParcours(store, p, '#/p/' + p.id); });
    if (!lireSession()) {
      html += '<p class="muted"><a href="#/compte">Connecte-toi</a> pour voir les autres parcours.</p>';
    }
    app.innerHTML = html;
  }

  function pageParcours(pid, sid) {
    var p = noeud(pid), s = sid ? noeud(sid) : null;
    if (!p || p.chaine.length !== 1 || (sid && (!s || s.chaine[0] !== pid)) || !accesOK(s ? s.chaine : p.chaine)) {
      location.hash = "#/"; return;
    }
    var store = lire(), n = s ? s.n : p.n;
    var html = '<p class="muted"><a href="#/">Parcours</a>' +
      (s ? ' › <a href="#/p/' + pid + '">' + esc(p.n.titre) + '</a>' : '') + '</p>' +
      '<h1>' + esc(n.titre) + '</h1><p class="muted">' + esc(n.resume) + '</p>';
    (n.sous || []).filter(function (x) { return accesOK([pid, x.id]); }).forEach(function (x) {
      html += carteParcours(store, x, '#/p/' + pid + '/' + x.id);
    });
    (n.modules || []).forEach(function (id, i) {
      var m = module(id);
      if (m) html += carteModule(store, m, i + 1);
    });
    if (!(n.modules || []).length && !(n.sous || []).length) {
      html += '<div class="card"><p>Ce parcours arrive bientôt.</p></div>';
    }
    app.innerHTML = html;
  }

  // Résultat d'un exemple de cours : une phrase, ou un petit tableau (1re ligne = en-têtes).
  function resultatCours(r) {
    if (!Array.isArray(r)) return '<p class="muted">→ ' + fmt(r) + '</p>';
    var cell = function (v) { return v === null ? '<em class="muted">NULL</em>' : esc(String(v)); };
    return '<p class="label">Résultat</p><div class="table-wrap resultat"><table><thead><tr>' +
      r[0].map(function (h) { return '<th>' + esc(String(h)) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      r.slice(1).map(function (row) { return '<tr>' + row.map(function (v) { return '<td>' + cell(v) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }

  function pageCours(id) {
    var m = module(id);
    var c = DATA.cours[id];
    if (!m || !c || !moduleVisible(id)) { location.hash = "#/"; return; }
    var html = '<p class="muted">Cours · Module ' + numeroModule(id) + '</p>' +
      '<h1>' + esc(m.titre) + '</h1>' +
      '<p>' + fmt(c.intro) + '</p>';
    // Hors SQL, l'exemple est une situation en texte : police normale, retour à la ligne.
    var sql = chaineModule(id)[0] === "sql";
    var balise = sql ? '<pre class="code">' : '<pre class="code texte">';
    c.sections.forEach(function (sec, i) {
      html += '<h2>' + (i + 1) + '. ' + esc(sec.titre) + '</h2><div class="card">' +
        (sec.exemple ? '<p class="label">Exemple</p>' + balise + (sql ? esc(sec.exemple) : fmt(sec.exemple)) + '</pre>' : '') +
        (sec.resultat ? resultatCours(sec.resultat) : '') +
        '<ul class="points">' + sec.points.map(function (p) { return '<li>' + fmt(p) + '</li>'; }).join('') + '</ul>' +
        (sec.retenir ? '<div class="feedback ok"><p><strong>À retenir :</strong> ' + fmt(sec.retenir) + '</p></div>' : '') +
        (sec.source ? '<p class="muted">Source : <a href="' + esc(sec.source.url) + '" target="_blank" rel="noopener">' +
          esc(sec.source.titre) + '</a></p>' : '') +
        '</div>';
    });
    if (c.differences && c.differences.length) {
      html += '<h2>SQL Server ou Snowflake ?</h2><div class="card table-wrap"><table><thead><tr>' +
        '<th>Sujet</th><th>SQL Server</th><th>Snowflake</th></tr></thead><tbody>' +
        c.differences.map(function (d) {
          return '<tr><td>' + fmt(d[0]) + '</td><td>' + fmt(d[1]) + '</td><td>' + fmt(d[2]) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    // Les outils qui mettent ce cours en pratique (champ « cours » des outils, docs/outils.md).
    var outils = outilsDuCours(id);
    if (outils.length) html += '<h2>Les outils de ce cours</h2>' + outils.map(carteOutil).join('');
    html += '<div class="actions">' +
      (DATA.questions[id] ? '<a class="btn" href="#/quiz/' + id + '">Faire le QCM</a>' : '') +
      '<a class="btn ghost" href="#/p/' + chaineModule(id).join('/') + '">Retour au parcours</a></div>';
    app.innerHTML = html;
  }

  // Arbre de révision : thème (parcours) > sous-thème (sous-parcours) > modules.
  // Une case de thème ou de sous-thème coche tous ses modules d'un coup.
  function arbreRevision(store, choisis) {
    var revisables = {};
    themesRevisables().forEach(function (m) { revisables[m.id] = m; });

    function caseModule(id, groupes) {
      var m = revisables[id], st = statsModule(store, id);
      return '<label class="theme"><input type="checkbox" value="' + id + '" data-groupes="' + groupes.join(' ') + '"' +
        (choisis.indexOf(id) >= 0 ? ' checked' : '') + '> <span>' + esc(m.titre) +
        (st ? ' <small class="' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) + '</small>' : '') +
        '</span></label>';
    }
    function noeudHtml(n, chaine, niveau) {
      var direct = (n.modules || []).filter(function (id) { return revisables[id]; });
      var sous = (n.sous || []).filter(function (s) { return accesOK(chaine.concat(s.id)); })
        .map(function (s) { return noeudHtml(s, chaine.concat(s.id), niveau + 1); })
        .filter(Boolean);
      var tous = modulesDe(n).filter(function (id) { return revisables[id] && accesOK(chaine); });
      if (!direct.length && !sous.length) return '';
      var ouvert = tous.some(function (id) { return choisis.indexOf(id) >= 0; });
      return '<div class="noeud niv' + niveau + '"><label class="tete"><input type="checkbox" data-groupe="' + n.id + '"> ' +
        '<strong>' + esc(n.titre) + '</strong> <small class="muted">· ' + tous.length + ' module(s)</small></label>' +
        '<details' + (ouvert ? ' open' : '') + '><summary>Choisir les modules</summary><div class="enfants">' +
        direct.map(function (id) { return caseModule(id, chaine); }).join('') + sous.join('') +
        '</div></details></div>';
    }
    return (DATA.parcours || []).filter(function (p) { return accesOK([p.id]); })
      .map(function (p) { return noeudHtml(p, [p.id], 1); }).join('');
  }

  function pageRevision(preselection) {
    var store = lire();
    var choisis = (preselection || "").split(",").filter(Boolean);
    var themes = themesRevisables();
    var html = '<h1>Révision</h1>' +
      '<p>Coche un thème entier, un sous-thème, ou des modules un par un. Il faut au moins ' + REVISION_MIN_THEMES +
      ' modules. Le QCM mélange les questions : ' + REVISION_MIN_QUESTIONS + ' minimum, et au moins ' +
      REVISION_MIN_PAR_THEME + ' par module.</p>';
    if (themes.length < REVISION_MIN_THEMES) {
      app.innerHTML = html + '<p>Il faut au moins ' + REVISION_MIN_THEMES + ' modules avec des questions.</p>';
      return;
    }
    html += '<div class="card arbre">' + arbreRevision(store, choisis) + '</div>' +
      '<p><label>Nombre de questions : <select id="nb"></select></label></p>' +
      '<p id="info" class="muted"></p>' +
      '<div class="actions"><button type="button" class="btn" id="lancer">Lancer la révision</button></div>';
    app.innerHTML = html;

    var nb = document.getElementById("nb");
    var cases = Array.prototype.slice.call(app.querySelectorAll(".theme input"));
    function casesDu(groupe) {
      return cases.filter(function (c) { return c.getAttribute("data-groupes").split(" ").indexOf(groupe) >= 0; });
    }
    // Une case de groupe : cochée si tous ses modules le sont, à moitié (tiret) si certains seulement.
    function majGroupes() {
      app.querySelectorAll("[data-groupe]").forEach(function (g) {
        var liste = casesDu(g.getAttribute("data-groupe"));
        var n = liste.filter(function (c) { return c.checked; }).length;
        g.checked = n > 0 && n === liste.length;
        g.indeterminate = n > 0 && n < liste.length;
      });
    }
    function maj() {
      majGroupes();
      var ids = selection();
      var dispo = ids.reduce(function (t, id) { return t + DATA.questions[id].length; }, 0);
      var min = minRevision(Math.max(ids.length, REVISION_MIN_THEMES));
      var garde = Number(nb.value) || min;
      nb.innerHTML = "";
      for (var n = min; n <= min + 30 && (n <= dispo || n === min); n += 10) {
        nb.innerHTML += '<option value="' + n + '"' + (n === garde ? ' selected' : '') + '>' + n + '</option>';
      }
      var ok = ids.length >= REVISION_MIN_THEMES;
      document.getElementById("lancer").disabled = !ok;
      document.getElementById("info").textContent = ok
        ? ids.length + " modules choisis."
        : "Choisis encore " + (REVISION_MIN_THEMES - ids.length) + " module(s).";
    }
    function selection() {
      return cases.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    }
    cases.forEach(function (c) { c.addEventListener("change", maj); });
    app.querySelectorAll("[data-groupe]").forEach(function (g) {
      g.addEventListener("change", function () {
        casesDu(g.getAttribute("data-groupe")).forEach(function (c) { c.checked = g.checked; });
        maj();
      });
    });
    document.getElementById("lancer").addEventListener("click", function () {
      location.hash = "#/quiz/revision/" + selection().join(",") + "/" + nb.value;
    });
    maj();
  }

  function demarrerQuiz(id, themes, nb) {
    var questions, titre;
    if (id === "revision") {
      var ids = (themes || "").split(",").filter(function (t) {
        return themesRevisables().some(function (m) { return m.id === t; });
      });
      if (ids.length < REVISION_MIN_THEMES) { location.hash = "#/revision"; return; }
      var total = Math.max(minRevision(ids.length), Number(nb) || 0);
      questions = tirageRevision(ids, total, lire());
      titre = "Révision · " + ids.length + " modules";
    } else if (id === "erreurs") {
      questions = idsEnErreur(lire()).map(questionParId);
      titre = "Mes erreurs";
    } else {
      var m = module(id);
      questions = DATA.questions[id] && moduleVisible(id) ? tirage(DATA.questions[id], lire()) : null;
      titre = m ? m.titre : id;
    }
    if (!questions || !questions.length) {
      app.innerHTML = '<h1>' + esc(titre || "Quiz") + '</h1><p>Aucune question ici pour l\'instant.</p>' +
        '<div class="actions"><a class="btn" href="#/">Retour au parcours</a></div>';
      return;
    }
    quiz = {
      module: id,
      titre: titre,
      lien: location.hash,
      items: melange(questions).map(function (q) {
        // On mélange les réponses en gardant l'index d'origine
        return { q: q, ordre: melange(q.choix.map(function (_, i) { return i; })) };
      }),
      idx: 0,
      choisi: null,
      valide: false,
      reponses: []
    };
    afficherQuestion();
  }

  function afficherQuestion() {
    var it = quiz.items[quiz.idx];
    var q = it.q;
    var total = quiz.items.length;
    var lettres = "ABCDEF";

    var html = '<p class="muted">' + esc(quiz.titre) + ' · Question ' + (quiz.idx + 1) + ' sur ' + total +
      ' · <span class="tag">' + esc(q.dialecte) + '</span></p>' +
      '<div class="progress"><div style="width:' + (quiz.idx / total * 100) + '%"></div></div>' +
      '<div class="question">' + esc(q.q) + '</div>' +
      (q.code ? '<pre class="code">' + esc(q.code) + '</pre>' : '') +
      '<div class="choices">';

    it.ordre.forEach(function (orig, pos) {
      var cls = "choice";
      var why = "";
      if (quiz.valide) {
        if (orig === q.bonne) cls += " right";
        else if (orig === quiz.choisi) cls += " wrong";
        if (orig === q.bonne || orig === quiz.choisi) why = '<span class="why">' + fmt(q.pourquoi[orig]) + '</span>';
      } else if (orig === quiz.choisi) {
        cls += " selected";
      }
      html += '<button type="button" class="' + cls + '" data-orig="' + orig + '"' + (quiz.valide ? " disabled" : "") + '>' +
        '<span class="letter">' + lettres[pos] + '.</span>' +
        (q.choixCode ? '<code>' + esc(q.choix[orig]) + '</code>' : esc(q.choix[orig])) + why + '</button>';
    });
    html += '</div>';

    if (quiz.valide) {
      var juste = quiz.choisi === q.bonne;
      html += '<div class="feedback ' + (juste ? "ok" : "ko") + '">' +
        '<h3>' + (juste ? "Bonne réponse !" : "Pas tout à fait.") + '</h3>' +
        '<p><strong>À retenir :</strong> ' + fmt(q.retenir) + '</p>' +
        (q.source ? '<p class="muted">Source : <a href="' + esc(q.source.url) + '" target="_blank" rel="noopener">' +
          esc(q.source.titre) + '</a></p>' : '') + '</div>' +
        '<div class="actions"><button type="button" class="btn" id="suivant">' +
        (quiz.idx + 1 < total ? "Question suivante" : "Voir ma note") + '</button></div>';
    } else {
      html += '<div class="actions"><button type="button" class="btn" id="valider"' +
        (quiz.choisi === null ? " disabled" : "") + '>Valider</button>' +
        '<a class="btn ghost" href="#/">Abandonner</a></div>';
    }
    app.innerHTML = html;

    app.querySelectorAll(".choice").forEach(function (b) {
      b.addEventListener("click", function () {
        quiz.choisi = Number(b.getAttribute("data-orig"));
        afficherQuestion();
      });
    });
    var v = document.getElementById("valider");
    if (v) v.addEventListener("click", valider);
    var s = document.getElementById("suivant");
    if (s) { s.addEventListener("click", suivant); s.focus(); }
  }

  function valider() {
    var q = quiz.items[quiz.idx].q;
    quiz.valide = true;
    quiz.reponses.push({ id: q.id, choisi: quiz.choisi, juste: quiz.choisi === q.bonne });

    var store = lire();
    var st = store.questions[q.id] || { vues: 0, justes: 0 };
    st.vues++;
    if (quiz.choisi === q.bonne) st.justes++;
    st.dernier = quiz.choisi === q.bonne;
    store.questions[q.id] = st;
    ecrire(store);

    afficherQuestion();
  }

  function suivant() {
    if (quiz.idx + 1 < quiz.items.length) {
      quiz.idx++;
      quiz.choisi = null;
      quiz.valide = false;
      afficherQuestion();
      window.scrollTo(0, 0);
      return;
    }
    terminer();
  }

  function terminer() {
    var bonnes = quiz.reponses.filter(function (r) { return r.juste; }).length;
    var total = quiz.reponses.length;
    var t = {
      module: quiz.module,
      titre: quiz.titre,
      date: new Date().toISOString(),
      note: note20(bonnes, total),
      bonnes: bonnes,
      total: total,
      erreurs: quiz.reponses.filter(function (r) { return !r.juste; })
        .map(function (r) { return { id: r.id, choisi: r.choisi }; }),
      lien: quiz.lien,
      parTheme: {}
    };
    quiz.reponses.forEach(function (r) {
      var m = moduleDe(r.id);
      var pt = t.parTheme[m] || (t.parTheme[m] = { bonnes: 0, total: 0 });
      pt.total++;
      if (r.juste) pt.bonnes++;
    });
    var store = lire();
    store.tentatives.push(t);
    ecrire(store);
    dernierResultat = t;
    quiz = null;
    location.hash = "#/resultat";
  }

  function pageResultat() {
    var t = dernierResultat;
    if (!t) { location.hash = "#/"; return; }
    var appreciation = t.note >= 18 ? "Excellent. Tu maîtrises ce thème."
      : t.note >= 14 ? "Bien. Revois les erreurs et vise 18."
      : t.note >= 10 ? "Moyen. Relis les explications et refais le QCM."
      : "À retravailler. Parles-en au prof avant de refaire le QCM.";

    var html = '<h1>' + esc(t.titre) + '</h1>' +
      '<div class="big-note ' + classeNote(t.note) + '">' + fmtNote(t.note) + '</div>' +
      '<p>' + t.bonnes + ' bonne(s) réponse(s) sur ' + t.total + '. ' + appreciation + '</p>';

    var themes = Object.keys(t.parTheme || {});
    if (themes.length > 1) {
      html += '<h2>Par thème</h2><div class="card"><table><tbody>';
      themes.forEach(function (id) {
        var pt = t.parTheme[id];
        var n = note20(pt.bonnes, pt.total);
        html += '<tr><td>' + esc(module(id).titre) + '</td><td>' + pt.bonnes + '/' + pt.total + '</td>' +
          '<td class="' + classeNote(n) + '"><strong>' + fmtNote(n) + '</strong></td></tr>';
      });
      html += '</tbody></table></div>';
    }

    if (t.erreurs.length) {
      html += '<h2>Tes erreurs</h2><ul class="recap">';
      t.erreurs.forEach(function (e) {
        var q = questionParId(e.id);
        if (q) html += '<li><strong>' + esc(q.q) + '</strong><br><span class="muted">À retenir : ' + fmt(q.retenir) + '</span></li>';
      });
      html += '</ul>';
    }
    html += '<div class="actions">' +
      '<a class="btn" href="' + esc(t.lien || "#/quiz/" + t.module) + '">Refaire</a>' +
      '<a class="btn ghost" href="#/">Parcours</a>' +
      '<a class="btn ghost" href="#/export">Exporter pour le prof</a></div>';
    app.innerHTML = html;
  }

  function pageErreurs() {
    var store = lire();
    var ids = idsEnErreur(store);
    var html = '<h1>Mes erreurs</h1>';
    if (!ids.length) {
      html += '<p>Aucune question à revoir. Bravo !</p><div class="actions"><a class="btn" href="#/">Parcours</a></div>';
      app.innerHTML = html;
      return;
    }
    html += '<p>' + ids.length + ' question(s) ratée(s) la dernière fois. Une question réussie sort de la liste.</p>' +
      '<div class="actions"><a class="btn" href="#/quiz/erreurs">Refaire ces questions</a></div><h2>Liste</h2>';
    ids.forEach(function (id) {
      var q = questionParId(id);
      html += '<div class="card"><span class="tag">' + esc(module(moduleDe(id)).titre) + '</span>' +
        '<p style="margin:6px 0 0">' + esc(q.q) + '</p></div>';
    });
    app.innerHTML = html;
  }

  function pageHistorique() {
    var store = lire();
    var html = '<h1>Mes notes</h1>';
    if (!store.tentatives.length) {
      app.innerHTML = html + '<p>Pas encore de note. Commence le module 1 !</p>';
      return;
    }
    var toutes = store.tentatives.map(function (t) { return t.note; });
    var moy = Math.round(toutes.reduce(function (a, b) { return a + b; }, 0) / toutes.length * 10) / 10;
    html += '<p>Moyenne générale : <strong class="' + classeNote(moy) + '">' + fmtNote(moy) + '</strong> sur ' +
      toutes.length + ' QCM.</p><div class="card"><table><thead><tr><th>Date</th><th>Module</th><th>Note</th></tr></thead><tbody>';
    store.tentatives.slice().reverse().forEach(function (t) {
      html += '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.titre) + '</td>' +
        '<td class="' + classeNote(t.note) + '"><strong>' + fmtNote(t.note) + '</strong></td></tr>';
    });
    app.innerHTML = html + '</tbody></table></div>';
  }

  // ---------- Export pour le prof ----------
  function texteExport() {
    var store = lire();
    var l = [];
    l.push("# LearnSQL — export pour le prof");
    l.push("Date : " + fmtDate(new Date().toISOString()));
    l.push("");
    l.push("## Notes par module");
    DATA.modules.forEach(function (m) {
      var st = statsModule(store, m.id);
      if (st) l.push("- " + m.id + " " + m.titre + " : dernière " + fmtNote(st.derniere) +
        ", meilleure " + fmtNote(st.meilleure) + ", " + st.nb + " essai(s)");
    });
    l.push("");
    l.push("## Questions ratées la dernière fois");
    var ids = idsEnErreur(store);
    if (!ids.length) l.push("Aucune.");
    ids.forEach(function (id) {
      var q = questionParId(id);
      var s = store.questions[id];
      l.push("- [" + id + "] " + q.q + " (réussie " + s.justes + "/" + s.vues + ")");
    });
    l.push("");
    l.push("## 10 derniers QCM");
    store.tentatives.slice(-10).forEach(function (t) {
      var det = t.erreurs.map(function (e) {
        var q = questionParId(e.id);
        return e.id + " → répondu « " + (q ? q.choix[e.choisi] : e.choisi) + " »";
      });
      var pt = Object.keys(t.parTheme || {});
      l.push("- " + fmtDate(t.date) + " · " + t.titre + " · " + fmtNote(t.note) +
        (pt.length > 1 ? "\n    par thème : " + pt.map(function (id) {
          return id + " " + t.parTheme[id].bonnes + "/" + t.parTheme[id].total;
        }).join(", ") : "") +
        (det.length ? "\n    erreurs : " + det.join(" | ") : ""));
    });
    l.push("");
    l.push("<!-- SAUVEGARDE (ne pas modifier)");
    l.push(JSON.stringify(store));
    l.push("-->");
    return l.join("\n");
  }

  function pageExport() {
    app.innerHTML = '<h1>Exporter pour le prof</h1>' +
      '<p>Copie ce texte et colle-le dans ton chat avec Claude. Le prof verra tes notes et tes erreurs.</p>' +
      '<textarea id="export" readonly>' + esc(texteExport()) + '</textarea>' +
      '<div class="actions"><button type="button" class="btn" id="copier">Copier</button></div>' +
      '<h2>Restaurer une sauvegarde</h2>' +
      '<p class="muted">Autre ordinateur ? Colle ici un ancien export complet, puis clique sur Restaurer.</p>' +
      '<textarea id="import" style="min-height:120px"></textarea>' +
      '<div class="actions"><button type="button" class="btn ghost" id="restaurer">Restaurer</button></div>' +
      '<p id="msg" class="muted"></p>';

    document.getElementById("copier").addEventListener("click", function () {
      var ta = document.getElementById("export");
      var fini = function () { document.getElementById("msg").textContent = "Copié ! Colle-le dans le chat."; };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(fini, function () { ta.select(); document.execCommand("copy"); fini(); });
      else { ta.select(); document.execCommand("copy"); fini(); }
    });
    document.getElementById("restaurer").addEventListener("click", function () {
      var txt = document.getElementById("import").value;
      var m = txt.match(/SAUVEGARDE[^\n]*\n([\s\S]*?)\n-->/);
      var msg = document.getElementById("msg");
      try {
        var s = JSON.parse(m ? m[1] : txt);
        if (!s || s.version !== 1) throw new Error("format");
        if (!confirm("Remplacer tes notes actuelles par cette sauvegarde ?")) return;
        ecrire(s);
        msg.textContent = "Sauvegarde restaurée.";
        document.getElementById("export").value = texteExport();
      } catch (e) {
        msg.textContent = "Texte non reconnu. Colle l'export complet.";
      }
    });
  }

  function pageCompte() {
    var s = lireSession();
    var html = '<h1>Mon compte</h1>';
    if (messageCompte) html += '<div class="card"><strong>' + esc(messageCompte) + '</strong></div>';

    if (s) {
      var gr = s.groupes || [];
      html += '<p>Connecté avec <strong>' + esc(s.email) + '</strong>.</p>' +
        '<div class="card"><p class="label">Rôle</p><p>' + esc(s.role || "agent") + '</p>' +
        '<p class="label">' + (gr.length > 1 ? 'Mes groupes' : 'Mon groupe') + '</p><p>' +
        (gr.length ? gr.map(esc).join(', ') : 'Pas encore de groupe. L\'admin va te ranger dans le bon.') + '</p></div>' +
        '<p class="muted">Ta progression est enregistrée en ligne. Connecte-toi avec la même adresse ' +
        'sur un autre appareil : tu la retrouves.</p>' +
        '<p class="muted" id="etat-sync">' + esc(etatSync) + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="sync">Synchroniser maintenant</button>' +
        '<button type="button" class="btn ghost" id="deconnexion">Se déconnecter</button></div>' +
        '<details class="card"><summary><strong>Supprimer mon compte</strong></summary>' +
        '<p>Tout est effacé du serveur : ton e-mail, ta progression, tes groupes. C\'est définitif.</p>' +
        '<p class="muted">Avant, tu peux garder une copie de tes notes avec <a href="#/export">Exporter</a>.</p>' +
        '<div class="actions"><button type="button" class="btn danger" id="supprimer-compte">Supprimer définitivement</button></div>' +
        '<p id="msg-suppr" class="muted"></p></details>' +
        '<details class="card"' + (nouveauMdp ? ' open' : '') + '><summary><strong>Changer mon mot de passe</strong></summary>' +
        '<form id="form-mdp" class="form"><label for="mdp-neuf">Nouveau mot de passe (8 caractères minimum)</label>' +
        '<input id="mdp-neuf" type="password" autocomplete="new-password" minlength="8" required>' +
        '<label for="mdp-neuf2">Le même, une 2e fois</label>' +
        '<input id="mdp-neuf2" type="password" autocomplete="new-password" minlength="8" required>' +
        '<div class="actions"><button type="submit" class="btn">Enregistrer</button></div>' +
        '<p id="msg-mdp" class="muted"></p></form></details>';
      app.innerHTML = html;
      document.getElementById("form-mdp").addEventListener("submit", function (e) {
        e.preventDefault();
        var m1 = document.getElementById("mdp-neuf").value, m2 = document.getElementById("mdp-neuf2").value;
        var msgMdp = document.getElementById("msg-mdp");
        if (m1.length < 8) { msgMdp.textContent = "8 caractères minimum."; return; }
        if (m1 !== m2) { msgMdp.textContent = "Les deux mots de passe sont différents."; return; }
        msgMdp.textContent = "Enregistrement…";
        sessionValide().then(function (sv) {
          return appelSupa("/auth/v1/user", { methode: "PUT", corps: { password: m1 } }, sv.access_token);
        }).then(function () {
          nouveauMdp = false;
          messageCompte = "";
          msgMdp.textContent = "Mot de passe changé.";
          document.getElementById("form-mdp").reset();
        }, function (err) {
          msgMdp.textContent = /different|same/i.test(err.message)
            ? "Choisis un mot de passe différent de l'ancien."
            : "Impossible : " + err.message;
        });
      });
      document.getElementById("sync").addEventListener("click", function () {
        document.getElementById("etat-sync").textContent = "Synchronisation…";
        synchroniserPuisAfficher();
      });
      document.getElementById("supprimer-compte").addEventListener("click", function () {
        var msgS = document.getElementById("msg-suppr");
        if (prompt("Pour confirmer, tape SUPPRIMER") !== "SUPPRIMER") { msgS.textContent = "Rien n'a été supprimé."; return; }
        msgS.textContent = "Suppression…";
        sessionValide().then(function (sv) {
          return appelSupa("/rest/v1/rpc/supprimer_mon_compte", { methode: "POST", corps: {} }, sv.access_token);
        }).then(function () {
          ecrireSession(null);
          etatSync = "";
          if (confirm("Compte supprimé. Effacer aussi tes notes de CET appareil ?")) {
            try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignoré */ }
          }
          messageCompte = "Ton compte a été supprimé.";
          majNav();
          pageCompte();
        }, function (err) {
          msgS.textContent = "Suppression impossible : " + err.message;
        });
      });
      document.getElementById("deconnexion").addEventListener("click", function () {
        appelSupa("/auth/v1/logout", { methode: "POST" }, s.access_token).catch(function () { /* déjà expirée */ });
        ecrireSession(null);
        etatSync = "";
        majNav();
        pageCompte();
      });
      return;
    }

    html += '<p class="muted">Sans compte, tes notes restent sur cet appareil. ' +
      'Avec un compte, tu les retrouves sur ton mobile, ton PC, ton Mac…</p>' +
      '<form id="form-compte" class="card form">' +
      '<label for="email">Adresse e-mail</label>' +
      '<input id="email" type="email" autocomplete="email" required>' +
      '<label for="mdp">Mot de passe (8 caractères minimum)</label>' +
      '<input id="mdp" type="password" autocomplete="current-password" minlength="8" required>' +
      '<div class="actions"><button type="submit" class="btn">Se connecter</button>' +
      '<button type="button" class="btn ghost" id="inscription">Créer un compte</button></div>' +
      '<p><button type="button" class="lien" id="oubli">Mot de passe oublié ?</button></p>' +
      '<p class="muted">En créant un compte, ton e-mail et ta progression sont stockés pour te les rendre sur tous tes appareils. ' +
      'Détails et droits : <a href="#/confidentialite">Confidentialité</a>.</p>' +
      '<p id="msg" class="muted"></p></form>';
    app.innerHTML = html;

    var msg = document.getElementById("msg");
    function champs() {
      var email = document.getElementById("email").value.trim();
      var mdp = document.getElementById("mdp").value;
      if (!email || mdp.length < 8) { msg.textContent = "Il faut une adresse e-mail et 8 caractères minimum."; return null; }
      return { email: email, password: mdp };
    }
    function connecte() {
      majNav();
      messageCompte = "Connecté. Ta progression de cet appareil est ajoutée à ton compte.";
      synchroniser().then(pageCompte);
    }

    document.getElementById("form-compte").addEventListener("submit", function (e) {
      e.preventDefault();
      var c = champs();
      if (!c) return;
      msg.textContent = "Connexion…";
      appelSupa("/auth/v1/token?grant_type=password", { methode: "POST", corps: c })
        .then(ouvrirSession)
        .then(connecte, function (err) {
          msg.textContent = /confirm/i.test(err.message)
            ? "Adresse pas encore confirmée : clique d'abord sur le lien reçu par e-mail."
            : "Connexion impossible : adresse ou mot de passe faux.";
        });
    });

    document.getElementById("oubli").addEventListener("click", function () {
      var email = document.getElementById("email").value.trim();
      if (!email) { msg.textContent = "Tape d'abord ton adresse e-mail, puis reclique ici."; return; }
      msg.textContent = "Envoi…";
      appelSupa("/auth/v1/recover?redirect_to=" + retourSite(), { methode: "POST", corps: { email: email } }).then(function () {
        msg.textContent = "Si un compte existe avec cette adresse, un e-mail est parti. Clique sur le lien qu'il contient.";
      }, function (err) {
        msg.textContent = /rate|limit|seconds/i.test(err.message)
          ? "Trop de demandes. Attends quelques minutes, puis réessaie."
          : "Envoi impossible : " + err.message;
      });
    });

    document.getElementById("inscription").addEventListener("click", function () {
      var c = champs();
      if (!c) return;
      msg.textContent = "Création du compte…";
      appelSupa("/auth/v1/signup?redirect_to=" + retourSite(), { methode: "POST", corps: c }).then(function (d) {
        if (d && d.access_token) return ouvrirSession(d).then(connecte);
        msg.textContent = "Compte créé. Ouvre l'e-mail reçu et clique sur le lien pour le confirmer.";
      }, function (err) {
        msg.textContent = "Création impossible : " + err.message;
      });
    });
  }

  // ---------- Équipe (admin et formateurs) ----------
  // La base ne renvoie que ce que le rôle a le droit de voir : l'admin tout, le formateur ses groupes.
  function chargerEquipe(s) {
    function get(chemin) { return appelSupa("/rest/v1/" + chemin, {}, s.access_token); }
    return Promise.all([
      get("profil?select=user_id,email,role,cree&order=email"),
      get("groupe?select=id,nom&order=nom"),
      get("membre?select=groupe_id,user_id"),
      get("progression?select=user_id,data,maj"),
      get("acces?select=element,groupe_id").catch(function () { return []; })
    ]).then(function (r) {
      var prog = {}, actif = {};
      r[3].forEach(function (l) {
        prog[l.user_id] = l.data && l.data.version === 1 ? l.data : videStore();
        actif[l.user_id] = l.maj;
      });
      // Dernière activité = dernière synchro de la progression, sinon la création du compte.
      r[0].forEach(function (p) { p.activite = actif[p.user_id] || p.cree; });
      return { profils: r[0], groupes: r[1], membres: r[2], prog: prog, acces: r[4] };
    });
  }

  var INACTIF_JOURS = 730;   // 2 ans : au-delà, le compte est signalé à l'admin (suppression à la main)
  function estInactif(p) {
    return !!p.activite && Date.now() - new Date(p.activite).getTime() > INACTIF_JOURS * 86400000;
  }

  function resumePersonne(store) {
    var t = store.tentatives;
    if (!t.length) return { nb: 0 };
    var moy = Math.round(t.reduce(function (a, x) { return a + x.note; }, 0) / t.length * 10) / 10;
    return { nb: t.length, moy: moy, der: t[t.length - 1] };
  }

  function tableauPersonnes(liste, eq) {
    if (!liste.length) return '<p class="muted">Personne dans ce groupe.</p>';
    var html = '<div class="card"><table><thead><tr><th>Personne</th><th>QCM</th><th>Moyenne</th><th>Dernier QCM</th></tr></thead><tbody>';
    liste.forEach(function (p) {
      var r = resumePersonne(eq.prog[p.user_id] || videStore());
      html += '<tr><td><a href="#/equipe/' + esc(p.user_id) + '">' + esc(p.email) + '</a>' +
        (p.role !== "agent" ? ' <span class="tag">' + esc(p.role) + '</span>' : '') +
        (estInactif(p) ? ' <span class="tag inactif">Inactif depuis plus de 2 ans</span>' : '') + '</td>' +
        '<td>' + r.nb + '</td>' +
        '<td>' + (r.nb ? '<strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong>' : '—') + '</td>' +
        '<td>' + (r.nb ? esc(r.der.titre) + ' · <span class="' + classeNote(r.der.note) + '">' + fmtNote(r.der.note) + '</span><br><small class="muted">' + fmtDate(r.der.date) + '</small>' : '—') + '</td></tr>';
    });
    return html + '</tbody></table></div>';
  }

  function pageEquipe(cible) {
    var s = lireSession();
    if (!s || (s.role !== "admin" && s.role !== "formateur")) { location.hash = "#/compte"; return; }
    app.innerHTML = '<h1>Équipe</h1><p class="muted">Chargement…</p>';
    chargerEquipe(s).then(function (eq) {
      if (cible) afficherPersonne(eq, cible);
      else afficherEquipe(eq, s);
    }, function (e) {
      app.innerHTML = '<h1>Équipe</h1><p>Chargement impossible : ' + esc(e.message) + '</p>';
    });
  }

  function afficherEquipe(eq, s) {
    var admin = s.role === "admin";
    var parId = {};
    eq.profils.forEach(function (p) { parId[p.user_id] = p; });
    var html = '<h1>Équipe</h1><p class="muted">' + (admin
      ? "Tu es admin : tu vois tout le monde et tu ranges les personnes dans les groupes."
      : "Tu es formateur : tu vois les personnes de tes groupes.") + '</p>';

    eq.groupes.forEach(function (g) {
      var liste = eq.membres.filter(function (m) { return m.groupe_id === g.id && parId[m.user_id]; })
        .map(function (m) { return parId[m.user_id]; });
      html += '<h2>' + esc(g.nom) + '</h2>' + tableauPersonnes(liste, eq);
    });
    if (!eq.groupes.length) html += '<p>Aucun groupe pour l\'instant.</p>';

    if (admin) {
      var rangees = {};
      eq.membres.forEach(function (m) { rangees[m.user_id] = true; });
      var seuls = eq.profils.filter(function (p) { return !rangees[p.user_id]; });
      if (seuls.length) html += '<h2>Sans groupe</h2>' + tableauPersonnes(seuls, eq);
      html += gestionAdmin(eq, s);
    }
    app.innerHTML = html;
    if (admin) brancherGestion(s);
  }

  function gestionAdmin(eq, s) {
    var html = '<h2>Gérer</h2>' +
      '<form id="form-groupe" class="card form"><label for="nom-groupe">Nouveau groupe</label>' +
      '<input id="nom-groupe" required maxlength="60" placeholder="Ex. : Compta">' +
      '<div class="actions"><button type="submit" class="btn">Créer le groupe</button></div></form>' +
      '<div class="card"><table><thead><tr><th>Personne</th><th>Rôle</th><th>Groupes</th><th>Dernière activité</th></tr></thead><tbody>';
    eq.profils.forEach(function (p) {
      html += '<tr><td>' + esc(p.email) + '</td><td><select data-role="' + esc(p.user_id) + '">' +
        ["agent", "formateur", "admin"].map(function (r) {
          return '<option' + (r === p.role ? ' selected' : '') + '>' + r + '</option>';
        }).join('') + '</select></td><td>';
      eq.groupes.forEach(function (g) {
        var dedans = eq.membres.some(function (m) { return m.groupe_id === g.id && m.user_id === p.user_id; });
        html += '<label class="case"><input type="checkbox" data-membre="' + esc(p.user_id) + '" value="' + g.id + '"' +
          (dedans ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      });
      html += (eq.groupes.length ? '' : '<small class="muted">Crée d\'abord un groupe.</small>') + '</td>' +
        '<td>' + (p.activite ? fmtDate(p.activite) : '—') +
        (estInactif(p) ? '<br><span class="tag inactif">Inactif + 2 ans</span>' : '') +
        (p.user_id !== s.id ? '<br><button type="button" class="lien danger" data-suppr-compte="' + esc(p.user_id) +
          '" data-email="' + esc(p.email) + '">Supprimer le compte</button>' : '') + '</td></tr>';
    });
    html += '</tbody></table></div><p id="msg-equipe" class="muted"></p>';
    html += '<h2>Droits des parcours</h2><p class="muted">Aucune case cochée = ouvert à tous les connectés. ' +
      'Pour un sous-parcours, il faut aussi avoir accès au parcours au-dessus.</p><div class="card"><table><tbody>';
    noeuds().forEach(function (x) {
      var regles = eq.acces.filter(function (a) { return a.element === x.n.id; });
      html += '<tr><td>' + (x.chaine.length > 1 ? '<span class="muted">↳ </span>' : '<strong>') + esc(x.n.titre) +
        (x.chaine.length > 1 ? '' : '</strong>') + '<br><small class="muted">' +
        (regles.length ? 'Réservé' : 'Ouvert à tous') + '</small></td><td>';
      eq.groupes.forEach(function (g) {
        var coche = regles.some(function (a) { return a.groupe_id === g.id; });
        html += '<label class="case"><input type="checkbox" data-acces="' + esc(x.n.id) + '" value="' + g.id + '"' +
          (coche ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      });
      html += '</td></tr>';
    });
    html += '</tbody></table></div>';
    if (eq.groupes.length) {
      html += '<p class="muted">Supprimer un groupe (les personnes restent, seul le groupe disparaît) :</p><div class="actions">' +
        eq.groupes.map(function (g) {
          return '<button type="button" class="btn small ghost" data-suppr="' + g.id + '">' + esc(g.nom) + ' ✕</button>';
        }).join('') + '</div>';
    }
    return html;
  }

  function brancherGestion(s) {
    var msg = document.getElementById("msg-equipe");
    function ecrireBase(chemin, methode, corps) {
      msg.textContent = "Enregistrement…";
      return appelSupa("/rest/v1/" + chemin, {
        methode: methode, corps: corps, entetes: { Prefer: "return=minimal" }
      }, s.access_token).then(function () { pageEquipe(); }, function (e) {
        msg.textContent = "Impossible : " + e.message;
      });
    }
    document.getElementById("form-groupe").addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = document.getElementById("nom-groupe").value.trim();
      if (nom) ecrireBase("groupe", "POST", { nom: nom });
    });
    app.querySelectorAll("[data-role]").forEach(function (sel) {
      sel.addEventListener("change", function () {
        var id = sel.getAttribute("data-role");
        if (id === s.id && sel.value !== "admin" &&
            !confirm("Tu vas perdre tes droits d'admin. Continuer ?")) { sel.value = "admin"; return; }
        ecrireBase("profil?user_id=eq." + id, "PATCH", { role: sel.value });
      });
    });
    app.querySelectorAll("[data-membre]").forEach(function (c) {
      c.addEventListener("change", function () {
        var u = c.getAttribute("data-membre");
        if (c.checked) ecrireBase("membre", "POST", { groupe_id: Number(c.value), user_id: u });
        else ecrireBase("membre?groupe_id=eq." + c.value + "&user_id=eq." + u, "DELETE");
      });
    });
    app.querySelectorAll("[data-acces]").forEach(function (c) {
      c.addEventListener("change", function () {
        var el = c.getAttribute("data-acces");
        if (c.checked) ecrireBase("acces", "POST", { element: el, groupe_id: Number(c.value) });
        else ecrireBase("acces?element=eq." + encodeURIComponent(el) + "&groupe_id=eq." + c.value, "DELETE");
      });
    });
    app.querySelectorAll("[data-suppr-compte]").forEach(function (b) {
      b.addEventListener("click", function () {
        var email = b.getAttribute("data-email");
        if (prompt("Supprimer définitivement le compte " + email + " ?\nTape son adresse e-mail pour confirmer.") !== email) return;
        msg.textContent = "Suppression…";
        appelSupa("/rest/v1/rpc/supprimer_compte", { methode: "POST", corps: { cible: b.getAttribute("data-suppr-compte") } }, s.access_token)
          .then(function () { pageEquipe(); }, function (e) { msg.textContent = "Impossible : " + e.message; });
      });
    });
    app.querySelectorAll("[data-suppr]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (confirm("Supprimer ce groupe ?")) ecrireBase("groupe?id=eq." + b.getAttribute("data-suppr"), "DELETE");
      });
    });
  }

  function afficherPersonne(eq, id) {
    var p = eq.profils.filter(function (x) { return x.user_id === id; })[0];
    if (!p) { app.innerHTML = '<h1>Équipe</h1><p>Personne introuvable.</p><a class="btn ghost" href="#/equipe">Retour</a>'; return; }
    var store = eq.prog[id] || videStore();
    var html = '<h1>' + esc(p.email) + '</h1>';
    var r = resumePersonne(store);
    if (!r.nb) {
      app.innerHTML = html + '<p>Pas encore de QCM.</p><a class="btn ghost" href="#/equipe">Retour</a>';
      return;
    }
    html += '<p>Moyenne : <strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong> sur ' + r.nb +
      ' QCM · ' + idsEnErreur(store).length + ' question(s) à revoir.</p>' +
      '<h2>Par module</h2><div class="card"><table><thead><tr><th>Module</th><th>Essais</th><th>Meilleure</th><th>Dernière</th></tr></thead><tbody>';
    DATA.modules.forEach(function (m, i) {
      var st = statsModule(store, m.id);
      if (st) html += '<tr><td>' + (i + 1) + '. ' + esc(m.titre) + '</td><td>' + st.nb + '</td>' +
        '<td class="' + classeNote(st.meilleure) + '"><strong>' + fmtNote(st.meilleure) + '</strong></td>' +
        '<td class="' + classeNote(st.derniere) + '">' + fmtNote(st.derniere) + '</td></tr>';
    });
    html += '</tbody></table></div><h2>Tous les QCM</h2><div class="card"><table><thead><tr><th>Date</th><th>QCM</th><th>Note</th></tr></thead><tbody>';
    store.tentatives.slice().reverse().forEach(function (t) {
      html += '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.titre) + '</td>' +
        '<td class="' + classeNote(t.note) + '"><strong>' + fmtNote(t.note) + '</strong></td></tr>';
    });
    app.innerHTML = html + '</tbody></table></div><div class="actions"><a class="btn ghost" href="#/equipe">Retour à l\'équipe</a></div>';
  }

  // ---------- Mentions légales et confidentialité (texte dans data/legal.js) ----------
  function pageLegale(titre, contenu) {
    var L = DATA.legal || {};
    app.innerHTML = '<h1>' + titre + '</h1>' + (L[contenu] || '<p>Page indisponible.</p>') +
      '<p class="muted">Mise à jour : ' + esc(L.maj || '') + '.</p>' +
      '<div class="actions"><a class="btn ghost" href="#/">Retour</a></div>';
  }

  // ---------- Thème ----------
  function appliquerTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  try { appliquerTheme(localStorage.getItem("learnsql-theme")); } catch (e) { /* ignoré */ }
  document.getElementById("btn-theme").addEventListener("click", function () {
    var sombre = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var t = sombre ? "light" : "dark";
    appliquerTheme(t);
    try { localStorage.setItem("learnsql-theme", t); } catch (e) { /* ignoré */ }
  });

  // ---------- Super dico SQL (docs/dico.md) ----------
  // Recherche sans IA, dans le navigateur : mots vides retirés, racines, fautes tolérées (distance d'édition,
  // squelette de consonnes). Ouvert à tous, sans compte.
  // Deux onglets : « SQL » (fiches sans domaine) et « Divalto » (domaine: "divalto"), ce dernier seulement pour les
  // comptes qui ont le parcours Divalto (masquage d'écran). La recherche ne cherche que dans l'onglet choisi.
  var DICO_MOTEUR_KEY = "learnsql-dico-moteur";
  var DICO_DOMAINE_KEY = "learnsql-dico-domaine";
  var DICO_MOTEURS = [
    { id: "tous", nom: "Tous" },
    { id: "sqlserver", nom: "SQL Server" },
    { id: "snowflake", nom: "Snowflake" },
    { id: "mysql", nom: "MySQL" }
  ];
  var DICO_DOMAINES = [{ id: "sql", nom: "SQL" }, { id: "divalto", nom: "Divalto" }];
  // Les thèmes du dico Divalto, dans cet ordre (le dico SQL range les siens par ordre alphabétique).
  var DICO_CATEGORIES_DIVALTO = ["Tables Divalto", "Champs Divalto", "Vues Divalto", "Requêtes Dataviz"];
  var DICO_MOTS_VIDES = {};
  ("je j tu il elle on nous vous veux voudrais voudrai aimerais aimerai faire fait faut peux peut dois doit comment " +
   "quel quelle quels quelles est c ce cet cette ces que qu qui quoi un une des du de d la le les l au aux a et ou " +
   "sur dans pour par avec sans mon ma mes ton ta tes son sa ses en y ne pas sql requete requetes fonction fonctions " +
   "comme moi me te se ca cela ceci svp stp").split(" ").forEach(function (m) { DICO_MOTS_VIDES[m] = true; });
  var DICO_SUFFIXES = ["ement", "ation", "able", "euse", "eur", "ent", "ez", "er", "ir", "e"];
  var DICO_SEUIL = 25;      // une fiche sous ce score ne s'affiche que si aucune ne l'atteint
  // Réglages de la recherche, par onglet. Le dico SQL garde la recherche d'origine : aucun réglage. Le dico Divalto :
  // - champ : un champ de la fiche (« PINO » → les tables qui l'ont), moins fort que le nom de la fiche. Seulement un
  //   code : pas un mot courant (« référence »), sauf le nom d'une table ou d'un champ tapé seul (« SENS ») ;
  // - motCourant : un mot est courant s'il est le mot-clé d'au moins 3 fiches (dico SQL : d'une seule) ;
  // - nomCourant : un mot courant présent dans le nom de plus de 2 fiches (« commande ») ; dico SQL : 15 ;
  // - motCleEntier, typeSeul : un mot tapé seul donne d'abord la fiche dont c'est un mot-clé entier (« commande » pour
  //   ENT), et la table avant le champ, avant les vues et les requêtes Dataviz ;
  // - nomProche, cleProche : toute la question est un nom (« fiche fourniseur ») ou un mot-clé de plusieurs mots
  //   (« lignes de comande ») de la fiche, à une faute près (deux lettres inversées comptent pour une) ;
  // - ordreTypes : à score égal, la table, puis le champ, la vue, la requête.
  var DICO_REGLAGES = {
    sql: {},
    divalto: {
      champ: 60, motCourant: 3, nomCourant: 0, motCleEntier: 30, typeSeul: { table: 15, champ: 5 },
      nomProche: 300, cleProche: 60, ordreTypes: ["table", "champ", "vue", "requête"]
    }
  };
  // Un index par domaine (« sql », « divalto ») : les deux dicos ne se mêlent pas. Chacun : { taille, liste, connus,
  // freq, codes } ; connus = les racines de tous ses mots-clés (un mot connu, « valeurs », n'est pas un nom mal tapé,
  // « values ») ; freq = combien de fiches ont chaque racine ; codes = les mots des noms de ses tables et champs (« pino »).
  var dicoIndex = {};
  var dicoQuestion = "";   // la dernière recherche, gardée quand on ouvre une fiche (et quand on change d'onglet)

  function sansAccents(t) {
    t = String(t).toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae");
    return t.normalize ? t.normalize("NFD").replace(/[̀-ͯ]/g, "") : t;
  }
  function motsDe(t) { return sansAccents(t).split(/[^a-z0-9]+/).filter(Boolean); }
  function racine(m) {
    if (m.length <= 4) return m;
    if (/[sx]$/.test(m)) m = m.slice(0, -1);                  // le pluriel d'abord : doublons → doublon
    for (var i = 0; i < DICO_SUFFIXES.length; i++) {
      var x = DICO_SUFFIXES[i];
      if (m.length - x.length >= 4 && m.slice(-x.length) === x) return m.slice(0, -x.length);
    }
    return m;
  }
  // Le mot au singulier, sans couper plus loin (« commandes » → « commande », mais « facturation » reste lui-même).
  function singulier(t) { var m = motsDe(t).join(" "); return m.length > 3 ? m.replace(/[sx]$/, "") : m; }
  function squelette(m) { return m.replace(/[aeiouy]/g, "").replace(/(.)\1+/g, "$1"); }
  // Distance d'édition (Levenshtein), arrêtée dès qu'elle dépasse max. echange : deux lettres voisines inversées
  // (« clinet ») ne comptent que pour une faute.
  function distance(a, b, max, echange) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var avant = null, prec = [], cour, i, j;
    for (j = 0; j <= b.length; j++) prec[j] = j;
    for (i = 1; i <= a.length; i++) {
      cour = [i];
      var mini = i;
      for (j = 1; j <= b.length; j++) {
        cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (echange && i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
          cour[j] = Math.min(cour[j], avant[j - 2] + 1);
        }
        if (cour[j] < mini) mini = cour[j];
      }
      if (mini > max) return max + 1;
      avant = prec;
      prec = cour;
    }
    return prec[b.length];
  }

  // Le domaine d'une fiche : « divalto », ou « sql » (pas de domaine).
  function domaineFiche(f) { return f.domaine === "divalto" ? "divalto" : "sql"; }
  // Le nom d'un champ, pour la recherche (« ART.REF » → « art ref ») ; vide s'il n'a que des mots vides ou des nombres.
  function cleChamp(nom) {
    var mots = motsDe(nom || "");
    return mots.some(function (m) { return !DICO_MOTS_VIDES[m] && !/^\d+$/.test(m); }) ? mots.join(" ") : "";
  }
  // Une case « Champ » peut en grouper plusieurs : « REF / SREF1 / SREF2 », « CE7 à CEA », « AXE (1 à 4) ».
  function codesCase(nom) {
    return String(nom || "").replace(/\([^)]*\)/g, " ").split(/\/|\s+à\s+/).map(cleChamp).filter(Boolean);
  }
  function nomsChamps(f) {
    var vus = {};
    (f.champs || []).forEach(function (c) { if (Array.isArray(c)) codesCase(c[0]).forEach(function (k) { vus[k] = true; }); });
    return Object.keys(vus);
  }

  // L'index d'un domaine (« sql » par défaut) : seulement ses fiches. Refait quand des fiches sont ajoutées.
  function indexDico(domaine) {
    domaine = domaine || "sql";
    var toutes = DATA.dico || [];
    if (dicoIndex[domaine] && dicoIndex[domaine].taille === toutes.length) return dicoIndex[domaine].liste;
    var liste = toutes.filter(function (f) { return domaineFiche(f) === domaine; }).map(function (f) {
      var noms = [f.nom].concat(f.noms || []);
      var cles = {}, def = {}, motsNoms = {}, entiers = {};
      var expressions = [], phrasesCles = [], clesLongues = [];
      (f.motsCles || []).forEach(function (k) {
        var tous = motsDe(k);
        if (tous.length >= 2) { phrasesCles.push(" " + tous.join(" ") + " "); clesLongues.push(tous.join(" ")); }
        var r = motsDe(k).filter(function (m) { return !DICO_MOTS_VIDES[m]; }).map(racine);
        r.forEach(function (m) { cles[m] = true; });
        if (r.length >= 2) expressions.push(r);
        if (r.length === 1) entiers[singulier(k)] = true;   // un mot-clé d'un seul mot (« commandes » → « commande »)
      });
      motsDe((f.definition || "") + " " + (f.categorie || "")).forEach(function (m) {
        if (m.length > 3 && !DICO_MOTS_VIDES[m]) def[racine(m)] = true;
      });
      noms.forEach(function (n, i) {
        if (i === 0 || n === n.toUpperCase()) motsDe(n).forEach(function (m) { motsNoms[m] = true; });
      });
      var listeCles = Object.keys(cles);
      return {
        fiche: f,
        brut: noms.map(function (n) { return sansAccents(n).replace(/\s+/g, " ").trim(); }),
        phrases: noms.map(function (n) { return motsDe(n).join(" "); }).filter(Boolean),
        motsNoms: Object.keys(motsNoms),
        cles: listeCles,
        squelettes: listeCles.map(squelette),
        expressions: expressions,
        phrasesCles: phrasesCles,
        def: def,
        entiers: entiers,
        clesLongues: clesLongues,
        champs: domaine === "divalto" ? nomsChamps(f) : []
      };
    });
    // Un mot-clé rare (« aujourd ») compte plus qu'un mot-clé que beaucoup de fiches partagent (« date »).
    var freq = {}, connus = {}, codes = {};
    liste.forEach(function (x) { x.cles.forEach(function (k) { freq[k] = (freq[k] || 0) + 1; connus[k] = true; }); });
    liste.forEach(function (x) {
      x.poids = x.cles.map(function (k) { var n = freq[k]; return n <= 2 ? 45 : n <= 5 ? 40 : n <= 10 ? 32 : 25; });
      if (x.fiche.type === "table" || x.fiche.type === "champ") x.motsNoms.forEach(function (m) { codes[m] = true; });
    });
    dicoIndex[domaine] = { taille: toutes.length, liste: liste, connus: connus, freq: freq, codes: codes };
    return liste;
  }

  // Le mot m désigne-t-il le nom de la fiche ? Le nom exact, son début (« coal »), ou une faute (« coalese »).
  function bonusNom(m, x, seul, connus) {
    var b = 0;
    x.motsNoms.forEach(function (n) {
      if (n === m || ((m.length >= 4 || (seul && m.length === 3)) && n.indexOf(m) === 0)) b = Math.max(b, 120);
      else if (m.length >= 5 && !connus[racine(m)] && distance(m, n, 2) <= (m.length >= 7 ? 2 : 1)) b = Math.max(b, 100);
    });
    return b;
  }

  // Note chaque fiche du domaine (« sql » par défaut) pour la question ; renvoie [{ fiche, score }], du plus proche
  // au moins proche.
  function chercherDico(question, domaine) {
    domaine = domaine || "sql";
    var reg = DICO_REGLAGES[domaine] || DICO_REGLAGES.sql;
    var brut = sansAccents(question).replace(/\s+/g, " ").trim();
    if (!brut) return [];
    var mots = motsDe(brut);
    var phrase = " " + mots.join(" ") + " ";
    var utiles = mots.filter(function (m) { return !DICO_MOTS_VIDES[m]; });
    if (!utiles.length) utiles = mots;
    var racines = {};
    utiles.forEach(function (m) { racines[racine(m)] = true; });
    var index = indexDico(domaine), info = dicoIndex[domaine], connus = info.connus;
    // Un mot qui touche le nom de beaucoup de fiches (« date ») ne départage rien : petit bonus.
    var combien = {};
    var seul = utiles.length === 1;   // un seul mot : « coa » peut être le début d'un nom
    // Un mot courant : un mot-clé (dico SQL), ou le mot-clé d'au moins reg.motCourant fiches (dico Divalto).
    var courant = function (m) {
      var k = racine(m);
      return reg.motCourant ? (info.freq[k] || 0) >= reg.motCourant : !!connus[k];
    };
    // Divalto : un mot inconnu fait penser à une faute ; la question entière est-elle alors proche du texte p ?
    var texte = mots.join(" "), faute = utiles.some(function (m) { return !connus[racine(m)]; });
    var proche = function (p) {
      var tol = p.length >= 7 ? 2 : 1;
      return p.length >= 5 && p !== texte && distance(texte, p, tol, true) <= tol;
    };
    utiles.forEach(function (m) { combien[m] = index.filter(function (x) { return bonusNom(m, x, seul, connus) > 0; }).length; });
    return index.map(function (x) {
      var score = 0;
      if (x.brut.indexOf(brut) >= 0) score += 1000;                       // le nom tapé tel quel (%, ||, ::…)
      x.phrases.forEach(function (p) {                                     // un nom présent dans la question
        if (phrase.indexOf(" " + p + " ") < 0) return;
        // Un nom d'un seul mot qui est aussi un mot courant (« date », « case ») ne compte fort que tapé seul.
        if (p.indexOf(" ") < 0 && utiles.length > 1 && connus[racine(p)]) score += 40;
        else score += 400 + p.length;
      });
      // Divalto : toute la question est un nom de la fiche (« fiche fourniseur »), ou un de ses mots-clés de plusieurs
      // mots (« lignes de comande »), à une faute près.
      if (reg.nomProche && faute) {
        if (x.phrases.some(proche)) score += reg.nomProche;
        else if (x.clesLongues.some(proche)) score += reg.cleProche;
      }
      // Divalto : un champ de la fiche (« PINO » → les tables qui ont ce champ), s'il est un code : un nom de plusieurs
      // mots, un mot absent des mots-clés, ou le nom d'une table ou d'un champ tapé seul. Deux champs au plus.
      if (reg.champ && x.champs.length) {
        var nbChamps = x.champs.filter(function (c) {
          return phrase.indexOf(" " + c + " ") >= 0 && (c.indexOf(" ") >= 0 || !connus[racine(c)] || (seul && info.codes[c]));
        }).length;
        score += Math.min(nbChamps, 2) * reg.champ;
      }
      utiles.forEach(function (m) {
        var b = bonusNom(m, x, seul, connus);
        // Fort si le mot désigne peu de fiches et n'est pas un mot courant noyé dans une phrase (« case vide »).
        if (b) score += combien[m] <= 2 && (seul || !courant(m)) ? b :
          combien[m] > 2 && reg.nomCourant !== undefined ? reg.nomCourant : 15;
        var r = racine(m), meilleur = 0;
        var tol = r.length >= 7 ? 2 : (r.length >= 4 ? 1 : 0), sq = squelette(r);
        for (var i = 0; i < x.cles.length; i++) {
          var k = x.cles[i];
          if (k === r) meilleur = Math.max(meilleur, x.poids[i] + (i === 0 ? 3 : i <= 2 ? 2 : i <= 5 ? 1 : 0)); // exact (les premiers mots-clés d'une fiche comptent un peu plus)
          else if (tol && distance(r, k, tol) <= tol) meilleur = Math.max(meilleur, 25);    // une faute ou deux
          else if (sq.length >= 4 && distance(sq, x.squelettes[i], 1) <= 1) meilleur = Math.max(meilleur, 15);
        }
        if (!meilleur && x.def[r]) meilleur = 8;                                            // mot de la définition
        score += meilleur;
      });
      var expr = 0;                                                        // une expression entière (« date du jour »)
      x.expressions.forEach(function (e) {
        if (e.every(function (m) { return racines[m]; })) expr = Math.min(70, expr + 35);
      });
      x.phrasesCles.forEach(function (k) {                                 // … mot pour mot (« ligne par ligne »)
        if (phrase.indexOf(k) >= 0) expr = Math.min(130, expr + 60);
      });
      score += expr;
      // Divalto, un mot tapé seul : un mot-clé entier de la fiche (« commande » pour ENT) ; puis la table avant le champ.
      if (seul && reg.motCleEntier && x.entiers[singulier(utiles[0])]) score += reg.motCleEntier;
      if (seul && reg.typeSeul && score >= DICO_SEUIL) score += reg.typeSeul[x.fiche.type] || 0;
      return { fiche: x.fiche, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) {
        return b.score - a.score || rangType(a.fiche, reg) - rangType(b.fiche, reg) ||
          rangModule(a.fiche) - rangModule(b.fiche) || a.fiche.nom.localeCompare(b.fiche.nom);
      });
  }
  function rangType(f, reg) { var i = (reg.ordreTypes || []).indexOf(f.type); return i < 0 ? 0 : i; }
  function rangModule(f) {
    var n = f.module && /^m(\d\d)$/.exec(f.module);
    return n ? parseInt(n[1], 10) : 99;
  }

  function dicoMoteur() {
    try {
      var m = localStorage.getItem(DICO_MOTEUR_KEY);
      if (m && DICO_MOTEURS.some(function (x) { return x.id === m; })) return m;
    } catch (e) { /* stockage indisponible */ }
    return "tous";
  }
  function nomMoteur(id) {
    for (var i = 0; i < DICO_MOTEURS.length; i++) if (DICO_MOTEURS[i].id === id) return DICO_MOTEURS[i].nom;
    return id;
  }
  function selecteurMoteurs(actif) {
    return '<div class="moteurs" role="radiogroup" aria-label="Moteur">' + DICO_MOTEURS.map(function (m) {
      return '<button type="button" class="moteur' + (m.id === actif ? ' actif' : '') + '" data-moteur="' + m.id +
        '" role="radio" aria-checked="' + (m.id === actif ? 'true' : 'false') + '">' + esc(m.nom) + '</button>';
    }).join('') + '</div>';
  }
  function brancherMoteurs(apres) {
    Array.prototype.forEach.call(document.querySelectorAll(".moteur"), function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem(DICO_MOTEUR_KEY, b.getAttribute("data-moteur")); } catch (e) { /* ignoré */ }
        Array.prototype.forEach.call(document.querySelectorAll(".moteur"), function (x) {
          var oui = x === b;
          x.classList.toggle("actif", oui);
          x.setAttribute("aria-checked", oui ? "true" : "false");
        });
        apres();
      });
    });
  }
  function syntaxeFiche(f, moteur) {
    var liste = moteur === "tous" ? ["sqlserver", "snowflake", "mysql"] : [moteur];
    return '<dl class="syntaxe">' + liste.map(function (m) {
      return '<dt>' + esc(nomMoteur(m)) + '</dt><dd>' + fmt((f.moteurs || {})[m] || "—") + '</dd>';
    }).join('') + '</dl>';
  }
  // Une requête Dataviz a un titre, pas un nom de code : police normale.
  function classeTitre(f) { return f.type === "requête" ? " titre" : ""; }
  function carteFiche(f, moteur, q) {
    var dv = domaineFiche(f) === "divalto";
    return '<a class="card fiche-res" href="#/dico/' + encodeURIComponent(f.id) + '"><div class="fiche-tete"><strong' +
      (dv && classeTitre(f) ? ' class="titre"' : '') + '>' +
      esc(f.nom) + '</strong><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) +
      '</span></div><p>' + fmt(f.definition) + '</p>' + (dv ? champsCites(f, q) : syntaxeFiche(f, moteur)) + '</a>';
  }
  // Fiche Divalto trouvée par un de ses champs : la carte montre ce champ (« PINO : le numéro de la pièce »).
  function champsCites(f, q) {
    var phrase = " " + motsDe(q || "").join(" ") + " ";
    return (f.champs || []).filter(function (c) {
      return Array.isArray(c) && codesCase(c[0]).some(function (k) { return phrase.indexOf(" " + k + " ") >= 0; });
    }).slice(0, 3).map(function (c) {
      return '<p class="muted">Champ <code>' + esc(c[0]) + '</code> : ' + fmt(c[1] || "") + '</p>';
    }).join('');
  }
  function parNom(a, b) { return a.nom.localeCompare(b.nom); }
  // Les thèmes à parcourir : SQL par ordre alphabétique, Divalto dans l'ordre de DICO_CATEGORIES_DIVALTO.
  function ordreCategories(cats, dv) {
    if (!dv) return cats.sort();
    var rang = function (c) { var i = DICO_CATEGORIES_DIVALTO.indexOf(c); return i < 0 ? 99 : i; };
    return cats.sort(function (a, b) { return rang(a) - rang(b) || a.localeCompare(b); });
  }

  function resultatsDico(q, moteur, domaine) {
    var dv = domaine === "divalto";
    var fiches = (DATA.dico || []).filter(function (f) { return domaineFiche(f) === (dv ? "divalto" : "sql"); });
    q = String(q).trim();
    if (dv && !fiches.length) return '<p class="muted">Le dico Divalto n\'a pas encore de fiche.</p>';
    if (!q) {
      var cats = {};
      fiches.forEach(function (f) { (cats[f.categorie] = cats[f.categorie] || []).push(f); });
      return '<p class="muted">' + fiches.length + (fiches.length > 1 ? ' fiches' : ' fiche') +
        '. Tape une question ou un nom, ou parcours par thème :</p>' +
        ordreCategories(Object.keys(cats), dv).map(function (c) {
          return '<h2>' + esc(c) + '</h2><div class="puces">' + cats[c].sort(parNom).map(function (f) {
            return '<a class="puce' + (dv ? classeTitre(f) : '') + '" href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a>';
          }).join('') + '</div>';
        }).join('');
    }
    var r = chercherDico(q, dv ? "divalto" : "sql");
    var bons = r.filter(function (x) { return x.score >= DICO_SEUIL; }).slice(0, 8);
    if (bons.length) return bons.map(function (x) { return carteFiche(x.fiche, moteur, q); }).join('');
    if (r.length) return '<p>Pas de fiche sûre pour « ' + esc(q) + ' ». Les plus proches :</p>' +
      r.slice(0, 5).map(function (x) { return carteFiche(x.fiche, moteur, q); }).join('');
    return '<p>Aucune fiche ne correspond à « ' + esc(q) + ' ». Essaie un autre mot : ' + (dv ?
      'un nom de table ou de champ (MOUV, PINO…), ou ce que tu cherches (lignes de commande…).' :
      'un verbe (chercher, enlever, arrondir…) ou un nom de fonction.') + '</p>';
  }

  // L'onglet Divalto et les fiches Divalto suivent la règle du parcours Divalto (masquage d'écran, comme les parcours).
  function accesDivalto() { return accesOK(["divalto"]); }
  // L'onglet choisi, gardé dans le navigateur : « divalto » seulement si le compte a le parcours, sinon « sql ».
  function dicoDomaine() {
    var d = "sql";
    try { d = localStorage.getItem(DICO_DOMAINE_KEY) || "sql"; } catch (e) { /* stockage indisponible */ }
    return d === "divalto" && accesDivalto() ? "divalto" : "sql";
  }
  function ecrireDomaine(d) {
    try { localStorage.setItem(DICO_DOMAINE_KEY, d); } catch (e) { /* ignoré */ }
  }
  function ongletsDico(actif) {
    return '<div class="onglets" role="tablist" aria-label="Domaine du dico">' + DICO_DOMAINES.map(function (d) {
      var oui = d.id === actif;
      return '<button type="button" role="tab" class="onglet' + (oui ? ' actif' : '') + '" id="onglet-' + d.id +
        '" data-domaine="' + d.id + '" aria-selected="' + oui + '" aria-controls="dico-panneau" tabindex="' + (oui ? '0' : '-1') +
        '">' + esc(d.nom) + '</button>';
    }).join('') + '</div>';
  }
  // Clic, ou flèches gauche / droite, Début, Fin (comme des onglets) : la page est refaite sur l'autre onglet.
  function brancherOnglets() {
    var boutons = Array.prototype.slice.call(app.querySelectorAll(".onglet"));
    boutons.forEach(function (b, i) {
      b.addEventListener("click", function () { choisirDomaine(b.getAttribute("data-domaine")); });
      b.addEventListener("keydown", function (e) {
        var n = boutons.length, j = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i + n - 1) % n :
          e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
        if (j < 0) return;
        e.preventDefault();
        choisirDomaine(boutons[j].getAttribute("data-domaine"));
      });
    });
  }
  function choisirDomaine(d) {
    ecrireDomaine(d);
    afficherDico(true);
  }
  // Sur une fiche, « Super dico » et « Nouvelle recherche » ramènent à l'onglet de la fiche.
  function retourOnglet(domaine) {
    if (!accesDivalto()) return;
    Array.prototype.forEach.call(app.querySelectorAll('a[href="#/dico"]'), function (a) {
      a.addEventListener("click", function () { ecrireDomaine(domaine); });
    });
  }

  function pageDico(id) {
    if (id) { pageFiche(decodeURIComponent(id)); return; }
    afficherDico(false);
  }
  // Sans le parcours Divalto, la page n'a pas d'onglets : le dico SQL seul.
  function afficherDico(focusOnglet) {
    var onglets = accesDivalto(), domaine = dicoDomaine(), dv = domaine === "divalto";
    var contenu = (dv ? '<h1>Super dico Divalto</h1>' +
      '<p class="muted">Tables, champs, vues SQL et requêtes Dataviz de Divalto 10.13. Pose ta question en mots simples ' +
      '(« lignes de commande »), ou tape un nom (« MOUV », « PINO »). Les fautes de frappe sont tolérées.</p>' :
      '<h1>Super dico SQL</h1>' +
      '<p class="muted">Pose ta question en mots simples (« enlever les espaces »), ou tape un nom (« COALESCE »). ' +
      'Les fautes de frappe sont tolérées. Une requête entière à comprendre ? <a href="#/traduire">Traduire une requête</a>.</p>') +
      '<div class="dico-recherche"><input type="search" id="dico-q" autocomplete="off" spellcheck="false" ' +
      (dv ? 'placeholder="Ex. : lignes de commande, MOUV, PINO…" aria-label="Rechercher dans le dico Divalto">' :
      'placeholder="Ex. : chercher un caractère, COALESCE…" aria-label="Rechercher dans le dico">') + '</div>' +
      (dv ? '' : selecteurMoteurs(dicoMoteur())) + '<div id="dico-res"></div>';
    app.innerHTML = onglets ? ongletsDico(domaine) + '<div id="dico-panneau" role="tabpanel" aria-labelledby="onglet-' +
      domaine + '">' + contenu + '</div>' : contenu;
    var champ = document.getElementById("dico-q"), zone = document.getElementById("dico-res");
    champ.value = dicoQuestion;
    var maj = function () { dicoQuestion = champ.value; zone.innerHTML = resultatsDico(champ.value, dicoMoteur(), domaine); };
    champ.addEventListener("input", maj);
    brancherMoteurs(maj);
    brancherOnglets();
    maj();
    if (focusOnglet) document.getElementById("onglet-" + domaine).focus();
    else champ.focus();
  }

  // « Voir aussi » : les fiches qui existent, sans les fiches Divalto pour qui n'a pas le parcours.
  function voirAussi(f, parId) {
    var dv = accesDivalto();
    return (f.voirAussi || []).filter(function (v) { return parId[v] && (dv || domaineFiche(parId[v]) !== "divalto"); });
  }

  function pageFiche(id) {
    var f = (DATA.dico || []).filter(function (x) { return x.id === id; })[0];
    if (!f) { location.hash = "#/dico"; return; }
    if (domaineFiche(f) === "divalto") { pageFicheDivalto(f); return; }
    var parId = {};
    (DATA.dico || []).forEach(function (x) { parId[x.id] = x; });
    var voir = voirAussi(f, parId);
    var mod = f.module && module(f.module) && moduleVisible(f.module) ? module(f.module) : null;
    app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a> › ' + esc(f.categorie) + '</p>' +
      '<h1 class="fiche-nom">' + esc(f.nom) + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) + '</span></div>' +
      '<p class="definition">' + fmt(f.definition) + '</p>' +
      selecteurMoteurs(dicoMoteur()) + '<div class="card" id="fiche-corps"></div>' +
      (voir.length ? '<h2>Voir aussi</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce" href="#/dico/' + encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (mod && DATA.cours[f.module] ? '<p>Dans le cours : <a href="#/cours/' + esc(f.module) + '">' + esc(mod.titre) + '</a></p>' : '') +
      '<div class="actions"><a class="btn ghost" href="#/dico">Nouvelle recherche</a></div>';
    var rendre = function () {
      var m = dicoMoteur(), ex = f.exemples || {}, html = '<p class="label">Syntaxe</p>' + syntaxeFiche(f, m);
      if (m === "snowflake" || m === "mysql") {
        html += '<p class="label">Exemple · ' + esc(nomMoteur(m)) + '</p><pre class="code">' + esc(ex[m] || f.exemple || "") + '</pre>';
      } else if (f.exemple) {
        var variantes = ["snowflake", "mysql"].filter(function (x) { return ex[x]; });
        html += '<p class="label">Exemple' + (variantes.length ? ' · SQL Server' : '') + '</p><pre class="code">' + esc(f.exemple) + '</pre>';
        if (m === "tous") variantes.forEach(function (x) {
          html += '<p class="label">Exemple · ' + esc(nomMoteur(x)) + '</p><pre class="code">' + esc(ex[x]) + '</pre>';
        });
      }
      if (f.resultat) html += resultatCours(f.resultat);
      if (f.piege) html += '<div class="feedback ko"><p><strong>Le piège :</strong> ' + fmt(f.piege) + '</p></div>';
      if (f.correction) html += '<div class="feedback ok"><p><strong>La correction :</strong> ' + fmt(f.correction) + '</p></div>';
      if (f.pratique) html += '<div class="feedback pratique"><p><strong>En pratique :</strong> ' + fmt(f.pratique) + '</p></div>';
      document.getElementById("fiche-corps").innerHTML = html;
    };
    brancherMoteurs(rendre);
    rendre();
    retourOnglet("sql");
  }

  // Une fiche du dico Divalto (docs/dico.md) : chaque bloc seulement si la fiche a le champ ; pas de moteurs.
  // Sans le parcours Divalto : un message court, pas le contenu.
  function pageFicheDivalto(f) {
    if (!accesDivalto()) {
      app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a></p><h1>Fiche réservée</h1>' +
        '<p>Cette fiche fait partie du dico Divalto, réservé aux comptes qui ont le parcours Divalto.</p>' +
        '<div class="actions">' + (lireSession() ? '' : '<a class="btn" href="#/compte">Se connecter</a>') +
        '<a class="btn ghost" href="#/dico">Retour au dico</a></div>';
      return;
    }
    var parId = {};
    (DATA.dico || []).forEach(function (x) { parId[x.id] = x; });
    var voir = voirAussi(f, parId);
    var corps = (f.champs && f.champs.length ? tableChamps(f) : '') +
      listeFiche("Les liens", f.liens) + listeFiche("Indicateurs", f.indicateurs) + listeFiche("Règles de gestion", f.regles) +
      (f.exemple ? '<p class="label">Exemple</p><pre class="code">' + esc(f.exemple) + '</pre>' : '') +
      (f.piege ? '<div class="feedback ko"><p><strong>Le piège :</strong> ' + fmt(f.piege) + '</p></div>' : '') +
      (f.pratique ? '<div class="feedback pratique"><p><strong>En pratique :</strong> ' + fmt(f.pratique) + '</p></div>' : '');
    app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a> › ' + esc(f.categorie) + '</p>' +
      '<h1 class="fiche-nom' + classeTitre(f) + '">' + esc(f.nom) + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) + '</span></div>' +
      '<p class="definition">' + fmt(f.definition) + '</p>' +
      (corps ? '<div class="card fiche-dv" id="fiche-corps">' + corps + '</div>' : '') +
      (voir.length ? '<h2>Voir aussi</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce' + (domaineFiche(parId[v]) === "divalto" ? classeTitre(parId[v]) : '') + '" href="#/dico/' +
          encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (f.version ? '<p class="muted"><strong>Version :</strong> ' + fmt(f.version) + '</p>' : '') +
      sourcesFiche(f) +
      '<div class="actions"><a class="btn ghost" href="#/dico">Nouvelle recherche</a></div>';
    retourOnglet("divalto");
  }
  // Le tableau « Les champs » (champ | sens). Un champ qui a sa propre fiche Divalto devient un lien vers elle, même
  // dans une case qui en groupe plusieurs (« DOS / TICOD / PICOD / PINO » : TICOD, PICOD et PINO ont leur fiche).
  function tableChamps(f) {
    var fiches = {};   // le code d'un champ (« pino ») → la fiche de ce champ ; ses noms en majuscules comptent aussi
    (DATA.dico || []).forEach(function (x) {
      if (x === f || domaineFiche(x) !== "divalto" || x.type !== "champ") return;
      [x.nom].concat((x.noms || []).filter(function (n) { return /^[A-Z0-9_]+$/.test(n); })).forEach(function (n) {
        codesCase(n).forEach(function (k) { if (!fiches[k]) fiches[k] = x.id; });
      });
    });
    return '<p class="label">Les champs</p><table class="champs"><thead><tr><th>Champ</th><th>Sens</th></tr></thead><tbody>' +
      f.champs.map(function (c) {
        c = Array.isArray(c) ? c : [String(c), ""];
        var cellule = String(c[0]).split(/\s*\/\s*/).map(function (morceau) {
          var id = fiches[codesCase(morceau)[0]], code = '<code>' + esc(morceau) + '</code>';
          return id ? '<a href="#/dico/' + encodeURIComponent(id) + '">' + code + '</a>' : code;
        }).join(' / ');
        return '<tr><td>' + cellule + '</td><td>' + fmt(c[1] || "") + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
  function listeFiche(titre, l) {
    if (!l || !l.length) return '';
    return '<p class="label">' + esc(titre) + '</p><ul class="points">' + l.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
  }
  // La source (comme les questions Divalto) : `source`, ou `sources` (1 à 3 pages). Un lien seulement en https.
  function sourcesFiche(f) {
    var l = (Array.isArray(f.sources) && f.sources.length ? f.sources : f.source ? [f.source] : []).filter(function (s) { return s && s.titre; });
    var lien = function (s) {
      return /^https:\/\//.test(s.url || "") ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.titre) + '</a>' : esc(s.titre);
    };
    if (!l.length) return '';
    if (l.length === 1) return '<p class="muted">Source : ' + lien(l[0]) + '</p>';
    return '<p class="muted">Sources :</p><ul class="points">' + l.map(function (s) { return '<li>' + lien(s) + '</li>'; }).join('') + '</ul>';
  }

  // ---------- Traduire une requête (docs/traducteur.md) ----------
  // Le moteur est dans js/traducteur.js (LEARNSQL.traduire), sans IA. La requête reste dans une variable le temps
  // de l'onglet (pour la retrouver après un clic vers le dico) : jamais dans localStorage ni dans l'URL.
  var TRADUIRE_EXEMPLES = [
    { nom: "Regroupement (GROUP BY)", sql: "SELECT c.nom, SUM(co.montant_ht) AS total\nFROM commande co\nJOIN client c ON c.id = co.client_id\n" +
      "WHERE co.statut <> 'ANNULEE'\nGROUP BY c.nom\nHAVING SUM(co.montant_ht) > 5000\nORDER BY total DESC;" },
    { nom: "Clients sans commande (LEFT JOIN)", sql: "SELECT c.code, c.nom\nFROM client c\nLEFT JOIN commande co ON co.client_id = c.id\n" +
      "WHERE co.id IS NULL;" },
    { nom: "Dernière commande par client (CTE et ROW_NUMBER)", sql: "WITH derniere AS (\n  SELECT co.*,\n" +
      "         ROW_NUMBER() OVER (PARTITION BY co.client_id ORDER BY co.date_cde DESC) AS rn\n  FROM commande co\n)\n" +
      "SELECT client_id, num_cde, date_cde, montant_ht\nFROM derniere\nWHERE rn = 1;" }
  ];
  var traduireSql = "", traduireFait = false, traduireCopie = "", traduireMienne = "";

  // Tout texte venu de la requête passe par esc : aucune balise de l'utilisateur n'arrive dans la page.
  // Une sous-étape (niveau 1 et plus) porte une barre à gauche ; la suite d'une ligne trop longue a un retrait suspendu.
  function htmlTraduction(r) {
    var html = '<h2 id="tr-titre" tabindex="-1">La traduction</h2>';
    html += r.lignes.length ? '<div class="card tr-code">' + r.lignes.map(function (l) {
      var n = Math.min(Number(l.niveau) || 0, 12);
      return '<div class="tr-l' + (n ? ' tr-sous' : '') + (l.genre ? ' tr-' + l.genre : '') + '" style="--n:' + n + '">' +
        (l.verbe ? '<strong class="tr-verbe">' + esc(l.verbe) + '</strong> ' : '') + esc(l.texte) + '</div>';
    }).join('') + '</div>' : '<p class="tr-vide">' + esc(r.erreurs[0] || "Rien à traduire.") + '</p>';
    if (r.notes.length) html += '<h2>À savoir</h2><ul class="tr-notes">' + r.notes.map(function (n) {
      return '<li>' + n.morceaux.map(function (m) { return m.code ? '<code>' + esc(m.t) + '</code>' : esc(m.t); }).join('') + '</li>';
    }).join('') + '</ul>';
    if (r.fiches.length) html += '<h2>Dans le dico</h2><div class="puces">' + r.fiches.map(function (f) {
      return '<a class="puce" href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a>';
    }).join('') + '</div>';
    return html;
  }
  // Copie dans le presse-papiers ; repli (textarea + execCommand) si l'API manque ou refuse.
  function copierTexte(t, fini) {
    function repli() {
      var ta = document.createElement("textarea"), ok = false;
      ta.value = t; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      fini(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { fini(true); }, repli);
    else repli();
  }
  function pageTraduire() {
    app.innerHTML = '<h1>Traduire une requête</h1>' +
      '<p class="muted">Colle une requête SQL. Le site l\'explique en pseudo-code, dans l\'ordre où SQL la calcule. ' +
      'Rien n\'est envoyé : tout reste dans ton navigateur.</p>' +
      '<textarea id="tr-sql" class="tr-sql" spellcheck="false" autocomplete="off" autocapitalize="off" ' +
      'aria-label="Requête SQL" placeholder="SELECT … FROM …"></textarea>' +
      '<div class="actions"><button type="button" class="btn" id="tr-go">Traduire</button>' +
      '<button type="button" class="btn ghost" id="tr-copier" disabled>Copier</button></div>' +
      '<p class="label tr-titre-ex">Exemples</p><div class="tr-exemples">' + TRADUIRE_EXEMPLES.map(function (x, k) {
        return '<button type="button" class="tr-ex" data-ex="' + k + '">' + esc(x.nom) + '</button>';
      }).join('') + '</div>' +
      '<p class="tr-retour" id="tr-retour" hidden><button type="button" class="lien" id="tr-mienne">Revenir à ma requête</button></p>' +
      '<p id="tr-msg" class="muted" role="status"></p><div id="tr-res"></div>';
    var champ = document.getElementById("tr-sql"), zone = document.getElementById("tr-res");
    var msg = document.getElementById("tr-msg"), copier = document.getElementById("tr-copier"), retour = document.getElementById("tr-retour");
    champ.value = traduireSql;
    function estExemple(t) { return TRADUIRE_EXEMPLES.some(function (x) { return x.sql === t; }); }
    function majRetour() { retour.hidden = !traduireMienne || champ.value === traduireMienne; }
    // montrer : après un clic, aller jusqu'au résultat (sur téléphone il est sous l'écran) et mettre le focus sur son titre.
    function traduire(montrer) {
      traduireSql = champ.value; traduireFait = true;
      var r = null;
      try { r = DATA.traduire ? DATA.traduire(champ.value) : null; } catch (e) { r = null; }
      msg.textContent = "";
      if (!r) { zone.innerHTML = '<p class="tr-vide">Le traducteur n\'est pas chargé : recharge la page.</p>'; copier.disabled = true; return; }
      zone.innerHTML = htmlTraduction(r);
      traduireCopie = r.texte;
      // Rien à copier si le résultat n'est qu'une erreur (ou un message).
      copier.disabled = !r.lignes.some(function (l) { return !l.genre && !/^(INSTRUCTION|LOT) /.test(l.verbe); });
      majRetour();
      if (montrer !== true) return;
      var titre = document.getElementById("tr-titre"), b = titre.getBoundingClientRect();
      try { titre.focus({ preventScroll: true }); } catch (e) { titre.focus(); }
      if (b.top < 0 || b.top > (window.innerHeight || document.documentElement.clientHeight) - 80) titre.scrollIntoView(true);
    }
    // Traduire sa propre requête : il n'y a plus de requête à retrouver.
    function traduireLaMienne() { if (!estExemple(champ.value)) traduireMienne = ""; traduire(true); }
    document.getElementById("tr-go").addEventListener("click", traduireLaMienne);
    champ.addEventListener("input", function () { traduireSql = champ.value; });
    champ.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); traduireLaMienne(); }
    });
    // Un exemple remplace le texte : celui de l'élève est gardé (en mémoire seulement), avec un lien pour y revenir.
    Array.prototype.forEach.call(app.querySelectorAll(".tr-ex"), function (b) {
      b.addEventListener("click", function () {
        if (/\S/.test(champ.value) && !estExemple(champ.value)) traduireMienne = champ.value;
        champ.value = TRADUIRE_EXEMPLES[Number(b.getAttribute("data-ex"))].sql;
        traduire(true);
      });
    });
    document.getElementById("tr-mienne").addEventListener("click", function () {
      champ.value = traduireMienne;
      traduireMienne = "";
      traduire(true);
    });
    copier.addEventListener("click", function () {
      copierTexte(traduireCopie, function (ok) {
        msg.textContent = ok ? "Copié : le pseudo-code est prêt à coller." : "Copie impossible : sélectionne le texte et copie-le à la main.";
      });
    });
    if (traduireFait && traduireSql) traduire();
  }

  // ---------- Outils (docs/outils.md) ----------
  // #/outils : une section par sujet (data/outils/sujets.js), une carte par outil. Un sujet lié à un parcours
  // (parcours: "chef-projet") n'apparaît qu'avec ce parcours (accesOK, comme l'onglet Divalto du dico) ; sinon ses pages
  // affichent un message court. #/outils/<id> : l'outil et les documents de l'élève ; #/outils/<id>/<doc> : un document ;
  // #/outils/<id>/exemple : l'exemple, en lecture. Le moteur (calculs, alertes, contrôle d'un fichier, Excel, copie) est
  // dans js/outils.js (LEARNSQL.outilsMoteur) : ici, seulement l'écran, sans code propre à un outil.
  // Les documents restent dans ce navigateur (localStorage, clé learnsql-outils) : jamais envoyés, jamais synchronisés.
  var OUTILS_KEY = "learnsql-outils";
  var OM = DATA.outilsMoteur;
  var TYPE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  var outilsSecours = null, outilsStockageKO = false;   // localStorage refusé : les documents vivent le temps de l'onglet
  var outilCourant = null;   // le document ouvert : { def, doc, lecture }
  var outilsMessage = "";    // un message pour la page suivante (« Fichier ouvert », « Document supprimé »…)

  function definitionOutil(id) {
    return (DATA.outils || []).filter(function (d) { return d.id === id; })[0] || null;
  }
  // Le sujet qui range cet outil (data/outils/sujets.js).
  function sujetOutil(def) {
    return (DATA.outilsSujets || []).filter(function (s) { return s.id === def.sujet && (s.outils || []).indexOf(def.id) >= 0; })[0] || null;
  }
  // Un sujet lié à un parcours suit la règle de ce parcours (masquage d'écran, comme les parcours).
  function sujetVisible(s) {
    if (!s.parcours) return true;
    var n = noeud(s.parcours);
    return accesOK(n ? n.chaine : [s.parcours]);
  }
  // Les outils d'un sujet, dans l'ordre : une définition, ou un lien vers une page du site ({ titre, resume, lien }).
  function outilsDuSujet(s) {
    return (s.outils || []).map(function (o) { return typeof o === "string" ? definitionOutil(o) : o; }).filter(Boolean);
  }
  function carteOutil(o) {
    return '<a class="card parcours o-carte" href="' + esc(o.lien || "#/outils/" + o.id) + '"><div><h3>' + esc(o.titre) + '</h3>' +
      '<p>' + fmt(o.resume) + '</p></div><span class="fleche" aria-hidden="true">›</span></a>';
  }
  // « Les outils de ce cours » : les outils visibles dont le champ cours contient ce module, dans l'ordre des sujets.
  function outilsDuCours(mid) {
    var l = [];
    (DATA.outilsSujets || []).filter(sujetVisible).forEach(function (s) {
      outilsDuSujet(s).forEach(function (o) { if (!o.lien && (o.cours || []).indexOf(mid) >= 0) l.push(o); });
    });
    return l;
  }
  function coursOutil(def) {
    return (def.cours || []).filter(function (m) { return module(m) && DATA.cours[m] && moduleVisible(m); });
  }
  function exporte(def, x) { return !def.export || def.export.indexOf(x) >= 0; }
  function surClic(id, f) { var b = document.getElementById(id); if (b) b.addEventListener("click", f); }
  function prendreMessage() { var m = outilsMessage; outilsMessage = ""; return m; }
  function decoder(t) { try { return decodeURIComponent(t); } catch (e) { return ""; } }

  // Les documents de l'élève : { version: 1, docs: [{ id, outil, nom, cree, maj, contenu }] }.
  function lireOutils() {
    var brut = null, s = null;
    if (outilsStockageKO) return outilsSecours || { version: 1, docs: [] };
    try { brut = localStorage.getItem(OUTILS_KEY); } catch (e) { outilsStockageKO = true; return outilsSecours || { version: 1, docs: [] }; }
    try { s = JSON.parse(brut); } catch (e) { s = null; }
    return s && s.version === 1 && Array.isArray(s.docs) ? s : { version: 1, docs: [] };
  }
  function ecrireOutils(s) {
    outilsSecours = s;
    try { localStorage.setItem(OUTILS_KEY, JSON.stringify(s)); outilsStockageKO = false; return true; }
    catch (e) { outilsStockageKO = true; return false; }
  }
  function docsOutil(id) {
    return lireOutils().docs.filter(function (d) { return d && d.outil === id && typeof d.id === "string"; });
  }
  function docOutil(id, docId) { return docsOutil(id).filter(function (d) { return d.id === docId; })[0] || null; }
  function enregistrerDoc(doc) {
    var s = lireOutils(), trouve = false;
    doc.maj = new Date().toISOString();
    s.docs = s.docs.map(function (d) { if (d && d.id === doc.id) { trouve = true; return doc; } return d; });
    if (!trouve) s.docs.push(doc);
    return ecrireOutils(s);
  }
  function supprimerDoc(docId) {
    var s = lireOutils();
    s.docs = s.docs.filter(function (d) { return d && d.id !== docId; });
    return ecrireOutils(s);
  }
  function creerDoc(def, nom, contenu) {
    var doc = { id: "d" + Date.now().toString(36) + Math.floor(Math.random() * 1679616).toString(36), outil: def.id,
      nom: String(nom || "").slice(0, OM.MAX.nom), cree: new Date().toISOString(), contenu: contenu };
    if (!enregistrerDoc(doc)) outilsMessage = "Attention : ce navigateur ne garde pas les documents. Pense à « Enregistrer dans un fichier ».";
    return doc;
  }
  function depuisExemple(def) {
    var d = creerDoc(def, def.exemple.nom, OM.contenuExemple(def));
    location.hash = "#/outils/" + def.id + "/" + d.id;
  }

  // Les fichiers : « registre-des-risques-demat-2027.xlsx », téléchargés sans rien envoyer (Blob dans le navigateur).
  function nomFichier(def, doc, ext) {
    var t = sansAccents(def.titre + " " + (doc ? doc.nom || "" : "modele vide")).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
    return (t || "document") + "." + ext;
  }
  function telecharger(nom, donnees, type) {
    var url = URL.createObjectURL(new Blob([donnees], { type: type })), a = document.createElement("a");
    a.href = url; a.download = nom; a.hidden = true;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 30000);
  }
  function telechargerExcel(def, doc, msg) {
    try {
      telecharger(nomFichier(def, doc, "xlsx"), OM.xlsx(OM.classeur(def, doc)), TYPE_XLSX);
      msg.textContent = doc ? "Fichier Excel téléchargé." : "Modèle Excel téléchargé.";
    } catch (e) { msg.textContent = "Le fichier Excel n'a pas pu être fait."; }
  }
  // Copier : le HTML mis en forme (pour Word, un e-mail) et le texte simple. Replis : l'événement « copy », puis le
  // texte seul (copierTexte).
  function copierRiche(html, texte, fini) {
    function parEvenement() {
      var ok = false, surCopie = function (e) {
        if (!e.clipboardData) return;
        e.clipboardData.setData("text/html", html);
        e.clipboardData.setData("text/plain", texte);
        e.preventDefault();
        ok = true;
      };
      document.addEventListener("copy", surCopie);
      try { document.execCommand("copy"); } catch (e) { ok = false; }
      document.removeEventListener("copy", surCopie);
      if (ok) fini(true); else copierTexte(texte, fini);
    }
    var item = null;
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      try {
        item = new window.ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([texte], { type: "text/plain" }) });
      } catch (e) { item = null; }
    }
    if (item) navigator.clipboard.write([item]).then(function () { fini(true); }, parEvenement);
    else parEvenement();
  }

  function pageOutils() {
    var sujets = DATA.outilsSujets || [], visibles = sujets.filter(sujetVisible);
    var html = '<h1>Outils</h1><p class="muted">Des outils pour ton travail, rangés par sujet.</p>';
    visibles.forEach(function (s) {
      var liste = outilsDuSujet(s);
      if (liste.length) html += '<section class="o-sujet" id="sujet-' + esc(s.id) + '"><h2>' + esc(s.titre) + '</h2>' +
        (s.resume ? '<p class="muted">' + fmt(s.resume) + '</p>' : '') + liste.map(carteOutil).join('') + '</section>';
    });
    if (visibles.length < sujets.length && !lireSession()) {
      html += '<p class="muted"><a href="#/compte">Connecte-toi</a> pour voir les autres outils.</p>';
    }
    app.innerHTML = html;
  }

  function pageOutil(id, docId) {
    var def = OM ? definitionOutil(id) : null, s = def ? sujetOutil(def) : null;
    if (!def || !s) { location.hash = "#/outils"; return; }
    if (!sujetVisible(s)) { pageOutilReserve(s); return; }
    if (docId) pageOutilDoc(def, docId);
    else pageOutilAccueil(def, s);
  }
  // Sans le parcours du sujet : un message court, pas le contenu (même règle que les fiches Divalto du dico).
  function pageOutilReserve(s) {
    var n = noeud(s.parcours);
    app.innerHTML = '<p class="muted"><a href="#/outils">Outils</a></p><h1>Outil réservé</h1>' +
      '<p>Cet outil fait partie du parcours « ' + esc(n ? n.n.titre : s.titre) + ' ». Il est réservé aux comptes qui ont ce parcours.</p>' +
      '<div class="actions">' + (lireSession() ? '' : '<a class="btn" href="#/compte">Se connecter</a>') +
      '<a class="btn ghost" href="#/outils">Retour aux outils</a></div>';
  }

  function pageOutilAccueil(def, s) {
    var docs = docsOutil(def.id).sort(function (a, b) { return String(b.maj || "").localeCompare(String(a.maj || "")); });
    var cours = coursOutil(def), ex = !!def.exemple;
    app.innerHTML = '<p class="muted"><a href="#/outils">Outils</a> › ' + esc(s.titre) + '</p>' +
      '<h1>' + esc(def.titre) + '</h1><p class="o-resume">' + fmt(def.resume) + '</p>' +
      '<div class="card o-guide"><p class="label">Quand s\'en servir</p><p>' + fmt(def.quand) + '</p>' +
      '<p class="label">Comment faire</p><ol class="o-etapes">' + (def.etapes || []).map(function (e) { return '<li>' + fmt(e) + '</li>'; }).join('') + '</ol>' +
      (ex ? '<div class="actions"><a class="btn ghost" id="o-voir-exemple" href="#/outils/' + esc(def.id) + '/exemple">Voir l\'exemple</a></div>' : '') +
      '</div>' +
      '<h2>Tes documents</h2><p class="muted">Tes documents restent dans ce navigateur : rien n\'est envoyé sur Internet.</p>' +
      (docs.length ? '<div class="o-docs">' + docs.map(function (d) { return carteDoc(def, d); }).join('') + '</div>' : '<p>Pas encore de document.</p>') +
      '<div class="actions"><button type="button" class="btn" id="o-nouveau">Nouveau</button>' +
      (ex ? '<button type="button" class="btn ghost" id="o-depuis-exemple">Partir de l\'exemple</button>' : '') +
      '<button type="button" class="btn ghost" id="o-ouvrir">Ouvrir un fichier</button></div>' +
      '<input type="file" id="o-fichier" accept=".json,application/json" hidden>' +
      '<p id="o-msg" class="muted" role="status">' + esc(prendreMessage()) + '</p>' +
      (exporte(def, "excel") ? '<h2>Le modèle vide</h2><p class="muted">Pour t\'en servir au travail, sans le site.</p>' +
        '<div class="actions"><button type="button" class="btn ghost" id="o-modele">Télécharger le modèle vide (Excel)</button></div>' : '') +
      (cours.length ? '<h2>Dans les cours</h2><ul class="points">' + cours.map(function (m) {
        return '<li><a href="#/cours/' + esc(m) + '">' + esc(module(m).titre) + '</a></li>';
      }).join('') + '</ul>' : '');
    var msg = document.getElementById("o-msg");
    surClic("o-nouveau", function () {
      var d = creerDoc(def, "Nouveau document", OM.contenuVide(def));
      location.hash = "#/outils/" + def.id + "/" + d.id;
    });
    surClic("o-depuis-exemple", function () { depuisExemple(def); });
    surClic("o-modele", function () { telechargerExcel(def, null, msg); });
    brancherOuvrir(def, msg);
  }
  function carteDoc(def, d) {
    var c = OM.examiner(def, d.contenu).contenu;
    return '<a class="card parcours o-doc" href="#/outils/' + esc(def.id) + '/' + esc(encodeURIComponent(d.id)) + '"><div>' +
      '<h3>' + esc(d.nom || "Sans nom") + '</h3><p>' + esc(c ? OM.resumeDocument(def, c) : "Document abîmé") +
      (d.maj ? ' · modifié le ' + esc(fmtDate(d.maj)) : '') + '</p></div><span class="fleche" aria-hidden="true">›</span></a>';
  }
  // « Ouvrir un fichier » : le fichier est contrôlé par le moteur ; un fichier faux donne un message, jamais une erreur.
  function brancherOuvrir(def, msg) {
    var entree = document.getElementById("o-fichier");
    surClic("o-ouvrir", function () { entree.click(); });
    entree.addEventListener("change", function () {
      var f = entree.files && entree.files[0];
      if (!f) return;
      if (f.size > 2000000) { msg.textContent = "Ce fichier est trop gros pour un document d'outil."; entree.value = ""; return; }
      var lecteur = new FileReader();
      lecteur.onload = function () {
        var r = OM.lireFichier(String(lecteur.result || ""), def, DATA.outils || []);
        if (!r.ok) { msg.textContent = r.message; return; }
        var d = creerDoc(def, r.doc.nom, r.doc.contenu);
        outilsMessage = outilsMessage || "Fichier ouvert : « " + d.nom + " »." +
          (r.corrections ? " " + r.corrections + " valeur(s) corrigée(s) ou vidée(s)." : "");
        location.hash = "#/outils/" + def.id + "/" + d.id;
      };
      lecteur.onerror = function () { msg.textContent = "Ce fichier n'a pas pu être lu."; };
      lecteur.readAsText(f);
      entree.value = "";
    });
  }

  // Un document (ou l'exemple, en lecture) : l'éditeur, les totaux, les alertes, les sorties.
  function pageOutilDoc(def, docId) {
    var lecture = docId === "exemple", doc = null;
    // L'exemple se lit à sa date (exemple.date) : ses alertes « date passée » ne changent pas avec le temps.
    if (lecture) doc = def.exemple ? { id: "exemple", nom: def.exemple.nom, contenu: OM.contenuExemple(def),
      aujourdhui: def.exemple.date ? OM.jour(def.exemple.date) : undefined } : null;
    else {
      doc = docOutil(def.id, docId);
      if (doc) doc.contenu = OM.examiner(def, doc.contenu).contenu || OM.contenuVide(def);
    }
    var fil = '<p class="muted"><a href="#/outils">Outils</a> › <a href="#/outils/' + esc(def.id) + '">' + esc(def.titre) + '</a></p>';
    if (!doc) {
      app.innerHTML = fil + '<h1>Document introuvable</h1><p>Ce document n\'est pas dans ce navigateur. Il a peut-être été ' +
        'supprimé, ou fait sur un autre appareil.</p><div class="actions"><a class="btn" href="#/outils/' + esc(def.id) + '">Retour à l\'outil</a></div>';
      return;
    }
    outilCourant = { def: def, doc: doc, lecture: lecture, auj: doc.aujourdhui };
    app.classList.add("large");
    document.body.classList.add("o-imprimable");
    app.innerHTML = '<div class="o-ecran">' + fil + '<h1>' + esc(def.titre) + '</h1>' +
      (lecture ? '<p class="o-exemple"><span class="tag">Exemple</span> <strong>' + esc(doc.nom) + '</strong>' +
        (def.exemple.date ? ' <span class="muted">· situation au ' + esc(OM.dateFr(def.exemple.date)) + '</span>' : '') + '</p>' :
        '<div class="o-nom"><label for="o-nom">Nom du document</label><input type="text" id="o-nom" maxlength="' + OM.MAX.nom +
        '" value="' + esc(doc.nom) + '"></div><p class="muted o-local" id="o-etat">Enregistré dans ce navigateur à chaque saisie. Rien n\'est envoyé.</p>') +
      '<div id="o-editeur" class="o-editeur">' + htmlEditeur(def, doc.contenu, lecture, doc.aujourdhui) + '</div>' +
      '<div id="o-alertes" aria-live="polite"></div>' +
      '<div class="actions o-sorties">' +
      (exporte(def, "excel") ? '<button type="button" class="btn" id="o-excel">Télécharger en Excel</button>' : '') +
      (exporte(def, "copier") ? '<button type="button" class="btn ghost" id="o-copier">Copier</button>' : '') +
      (exporte(def, "imprimer") ? '<button type="button" class="btn ghost" id="o-imprimer">Imprimer / PDF</button>' : '') + '</div>' +
      (lecture ? '<div class="actions"><button type="button" class="btn" id="o-depuis-exemple">Partir de cet exemple</button>' +
        '<a class="btn ghost" href="#/outils/' + esc(def.id) + '">Retour à l\'outil</a></div>' :
        '<div class="actions"><button type="button" class="btn ghost" id="o-enregistrer">Enregistrer dans un fichier</button>' +
        '<button type="button" class="btn ghost" id="o-dupliquer">Dupliquer</button>' +
        '<button type="button" class="btn danger" id="o-supprimer">Supprimer</button></div>') +
      '<p id="o-msg" class="muted" role="status">' + esc(prendreMessage()) + '</p></div>' +
      '<div class="o-impression" id="o-impression"></div>';
    modeZones();
    majSuivi();
    brancherEditeur();
    brancherDocument(def, doc, lecture);
  }
  function brancherDocument(def, doc, lecture) {
    var msg = document.getElementById("o-msg");
    surClic("o-excel", function () { telechargerExcel(def, doc, msg); });
    surClic("o-copier", function () {
      copierRiche(OM.htmlDocument(def, doc), OM.texteDocument(def, doc), function (ok) {
        msg.textContent = ok ? "Copié : colle-le dans Word ou dans un e-mail." : "Copie impossible : utilise Imprimer / PDF.";
      });
    });
    surClic("o-imprimer", function () { remplirImpression(); window.print(); });
    if (lecture) { surClic("o-depuis-exemple", function () { depuisExemple(def); }); return; }
    var nom = document.getElementById("o-nom");
    nom.addEventListener("input", function () { doc.nom = nom.value.slice(0, OM.MAX.nom); sauverOutil(); });
    surClic("o-enregistrer", function () {
      telecharger(nomFichier(def, doc, "json"), OM.fichier(def, doc), "application/json");
      msg.textContent = "Fichier enregistré. Pour le rouvrir : « Ouvrir un fichier », sur la page de l'outil.";
    });
    surClic("o-dupliquer", function () {
      var d = creerDoc(def, "Copie de " + (doc.nom || "sans nom"), JSON.parse(JSON.stringify(doc.contenu)));
      outilsMessage = outilsMessage || "Copie faite : tu travailles maintenant sur la copie.";
      location.hash = "#/outils/" + def.id + "/" + d.id;
    });
    surClic("o-supprimer", function () {
      if (!confirm("Supprimer « " + (doc.nom || "sans nom") + " » ? C'est définitif.")) return;
      supprimerDoc(doc.id);
      outilsMessage = "Document supprimé.";
      location.hash = "#/outils/" + def.id;
    });
  }

  // L'éditeur, selon le type de l'outil (tableau, matrice, document). lecture : l'exemple, sans champs.
  function htmlEditeur(def, c, lecture, auj) {
    var parent = OM.parentDe(def, c, auj);
    if (def.type === "tableau") return htmlZone(def, "", c.lignes, lecture, parent);
    if (def.type === "matrice") return htmlMatrice(def, c, lecture);
    return def.rubriques.map(function (r) { return htmlRubrique(r, c.rubriques[r.id], lecture, parent); }).join('');
  }
  // Un tableau (l'outil, ou une rubrique « tableau » d'un document) : un tableau sur PC ; une carte par ligne quand la
  // place manque, sur téléphone (modeZones). Chaque champ a son étiquette, visible sur les cartes.
  function htmlZone(t, r, lignes, lecture, parent) {
    var nomL = OM.ligneDef(t).titre, aides = t.colonnes.filter(function (c) { return c.aide; });
    // Les aides des colonnes, une seule fois au-dessus du tableau (une liste ou une date n'a pas de texte d'attente).
    var html = (lecture || !aides.length ? '' : '<details class="o-aides"><summary>Comment remplir les colonnes</summary><ul>' +
      aides.map(function (c) { return '<li><strong>' + esc(c.titre) + ' :</strong> ' + fmt(c.aide) + '</li>'; }).join('') + '</ul></details>') +
      '<div class="o-zone" data-min="' + largeurMin(t.colonnes) + '"><table class="o-table"><thead><tr><th class="o-n">N°</th>' +
      t.colonnes.map(function (c) { return '<th>' + esc(c.titre) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      lignes.map(function (l, i) { return htmlLigneZone(t, r, l, i, lecture, parent); }).join('') + '</tbody></table></div>';
    if (!lignes.length) html += '<p class="muted">Aucune ligne.</p>';
    if (!lecture) html += '<div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-ligne" data-r="' +
      esc(r) + '">+ ' + esc(nomL) + '</button></div>';
    if ((t.totaux || []).length) html += '<div class="o-totaux" data-totaux="' + esc(r) + '"></div>' +
      (t.aideTotaux ? '<p class="muted o-aide-totaux">' + fmt(t.aideTotaux) + '</p>' : '');
    return html;
  }
  function teteLigne(nomL, i, r, lecture) {
    return '<td class="o-n o-plein"><span class="o-num"><span class="o-cartes-seul">' + esc(nomL) + ' </span>' + (i + 1) + '</span>' +
      ' <span class="o-marque" hidden>Alerte</span>' + (lecture ? '' : ' <button type="button" class="lien danger o-suppr" ' +
      'data-action="suppr-ligne" data-r="' + esc(r) + '" data-l="' + i + '" aria-label="Supprimer : ' + esc(nomL) + ' ' + (i + 1) + '">Supprimer</button>') + '</td>';
  }
  function htmlLigneZone(t, r, l, i, lecture, parent) {
    var calc = OM.calculerLigne(t.colonnes, l, parent);
    return '<tr data-r="' + esc(r) + '" data-l="' + i + '">' + teteLigne(OM.ligneDef(t).titre, i, r, lecture) + t.colonnes.map(function (c) {
      var id = "o-" + (r ? r + "-" : "") + i + "-" + c.id, large = c.type === "texte" || c.type === "texte-long";
      var td = '<td class="o-t-' + c.type + (large ? ' o-plein' : '') + '">';
      if (c.type === "calcul") return td + '<span class="o-lib">' + esc(c.titre) + '</span><span class="o-calc" data-c="' + esc(c.id) + '">' +
        htmlCalcul(c, calc) + '</span></td>';
      if (lecture) return td + '<span class="o-lib">' + esc(c.titre) + '</span><span class="o-val">' + valeurLue(c, l[c.id], calc.couleurs[c.id]) +
        badge(calc.niveaux[c.id]) + '</span></td>';
      return td + '<label class="o-lib" for="' + id + '">' + esc(c.titre) + '</label>' +
        champHtml(c, l[c.id], id, 'data-champ="cellule" data-r="' + esc(r) + '" data-l="' + i + '" data-c="' + esc(c.id) + '"', calc.couleurs[c.id]) +
        (c.niveaux ? '<span class="o-calc" data-c="' + esc(c.id) + '">' + badge(calc.niveaux[c.id]) + '</span>' : '') + '</td>';
    }).join('') + '</tr>';
  }
  function htmlCalcul(c, calc) {
    var v = calc.valeurs[c.id];
    return v === null || v === undefined ? '<span class="muted">—</span>' : esc(OM.fmtNombre(v)) + badge(calc.niveaux[c.id]);
  }
  // Un niveau : toujours un mot, avec sa couleur.
  function badge(nv) {
    return nv ? ' <span class="o-niveau o-' + esc(nv.couleur || "neutre") + '">' + esc(nv.libelle) + '</span>' : '';
  }
  // Une valeur en lecture (l'exemple) ; un choix qui a une couleur s'écrit sur sa couleur.
  function valeurLue(c, v, couleur) {
    var t = OM.texteValeur(c, v);
    return couleur ? '<span class="o-niveau o-' + esc(couleur) + '">' + esc(t) + '</span>' : esc(t);
  }
  // couleur : celle du choix (couleurs: [...]) ; la liste se colore, le mot reste écrit dedans.
  // La hauteur d'une zone de texte : tout son contenu visible (environ 40 caractères par ligne), de 2 à 8 lignes.
  function lignesTexte(v) {
    var n = String(v || "").split("\n").reduce(function (t, l) { return t + Math.max(1, Math.ceil(l.length / 40)); }, 0);
    return Math.min(8, Math.max(2, n));
  }
  // sansAttente : l'aide est déjà écrite sous l'étiquette (rubrique d'un document), pas en texte d'attente.
  function champHtml(c, v, id, attrs, couleur, sansAttente) {
    var base = ' id="' + id + '" ' + attrs, aide = c.aide && !sansAttente ? ' placeholder="' + esc(c.aide) + '"' : '';
    v = v === undefined || v === null ? "" : v;
    if (c.type === "texte-long") return '<textarea' + base + aide + ' rows="' + lignesTexte(v) + '" maxlength="' + OM.MAX.texteLong + '">' + esc(v) + '</textarea>';
    if (c.type === "date") return '<input type="date"' + base + ' value="' + esc(v) + '">';
    if (c.type === "nombre") return '<input type="text" inputmode="decimal"' + base + aide + ' value="' + esc(String(v).replace(".", ",")) + '">';
    if (c.type === "choix") {
      var k = OM.indexValeur(c.valeurs, v);
      return '<select' + base + (couleur ? ' class="o-c-' + esc(couleur) + '"' : '') + '><option value="">—</option>' + c.valeurs.map(function (x, j) {
        return '<option value="' + esc(String(x)) + '"' + (j === k ? ' selected' : '') + '>' + esc(OM.texteChoix(c, j)) + '</option>';
      }).join('') + '</select>';
    }
    return '<input type="text"' + base + aide + ' maxlength="' + OM.MAX.texte + '" value="' + esc(v) + '">';
  }
  // La matrice : les colonnes que l'élève ajoute (personnes…), puis une ligne par livrable, une valeur par case.
  function htmlMatrice(def, c, lecture) {
    var nomC = def.colonne.titre, html = '';
    if (!lecture) html = '<section class="o-rubrique"><h2 class="o-h2">' + esc(def.colonne.pluriel || nomC + "s") + '</h2>' +
      (def.colonne.aide ? '<p class="muted">' + fmt(def.colonne.aide) + '</p>' : '') + '<ul class="o-items">' + c.colonnes.map(function (n, k) {
        return '<li><label class="o-lib" for="o-col-' + k + '">' + esc(nomC) + ' ' + (k + 1) + '</label><input type="text" id="o-col-' + k +
          '" data-champ="colonne" data-k="' + k + '" maxlength="' + OM.MAX.nom + '" value="' + esc(n) + '" placeholder="' + esc(nomC) + ' ' + (k + 1) + '">' +
          '<button type="button" class="lien danger" data-action="suppr-colonne" data-k="' + k + '" aria-label="Supprimer : ' + esc(nomC) + ' ' +
          (k + 1) + '">Supprimer</button></li>';
      }).join('') + '</ul><div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-colonne">+ ' +
      esc(nomC) + '</button></div></section>';
    return html + '<section class="o-rubrique"><h2 class="o-h2">' + esc(def.ligne.pluriel || def.ligne.titre + "s") + '</h2>' +
      (def.aides ? '<ul class="o-legende">' + def.valeurs.map(function (v, k) {
        return '<li><strong>' + esc(v) + '</strong> = ' + esc(def.libelles ? def.libelles[k] : v) + ' : ' + fmt(def.aides[k]) + '</li>';
      }).join('') + '</ul>' : '<p class="o-legende">' + def.valeurs.map(function (v, k) {
        return '<strong>' + esc(v) + '</strong> = ' + esc(def.libelles ? def.libelles[k] : v);
      }).join(' · ') + '</p>') + '<div id="o-matrice">' + htmlMatriceTable(def, c, lecture) + '</div>' +
      (lecture ? '' : '<div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-ligne" data-r="">+ ' +
        esc(def.ligne.titre) + '</button></div>') + '</section>';
  }
  function htmlMatriceTable(def, c, lecture) {
    var nomL = def.ligne.titre, choix = { type: "choix", valeurs: def.valeurs };
    var noms = c.colonnes.map(function (n, k) { return n || def.colonne.titre + " " + (k + 1); });
    return '<div class="o-zone o-matrice" data-min="' + (270 + 64 * noms.length) + '"><table class="o-table"><thead><tr><th class="o-n">N°</th>' +
      '<th>' + esc(nomL) + '</th>' + noms.map(function (n) { return '<th class="o-case">' + esc(n) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      c.lignes.map(function (l, i) {
        return '<tr data-r="" data-l="' + i + '">' + teteLigne(nomL, i, "", lecture) + '<td class="o-plein">' +
          (lecture ? '<span class="o-lib">' + esc(nomL) + '</span><span class="o-val">' + esc(l.nom) + '</span>' :
            '<label class="o-lib" for="o-m-' + i + '">' + esc(nomL) + '</label><input type="text" id="o-m-' + i + '" data-champ="nom-ligne" data-l="' + i +
            '" maxlength="' + OM.MAX.nom + '" value="' + esc(l.nom) + '"' + (def.ligne.aide ? ' placeholder="' + esc(def.ligne.aide) + '"' : '') + '>') + '</td>' +
          noms.map(function (n, k) {
            var id = "o-m-" + i + "-" + k;
            return '<td class="o-case' + (lecture && OM.estVide(l.cases[k]) ? ' o-vide' : '') + '">' + (lecture ?
              '<span class="o-lib">' + esc(n) + '</span><span class="o-val">' + esc(l.cases[k] || "") + '</span>' :
              '<label class="o-lib" for="' + id + '">' + esc(n) + '</label>' + champHtml(choix, l.cases[k], id, 'data-champ="case" data-l="' + i + '" data-k="' + k + '"')) + '</td>';
          }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>' + (c.lignes.length ? '' : '<p class="muted">Aucune ligne.</p>');
  }
  // Une rubrique d'un document : un champ, une liste (une ligne par élément) ou un tableau.
  function htmlRubrique(r, v, lecture, parent) {
    var id = "o-r-" + r.id, titre = '<h2 class="o-h2">' + esc(r.titre) + '</h2>';
    if (r.type === "tableau") return '<section class="o-rubrique">' + titre + (r.aide && !lecture ? '<p class="muted">' + fmt(r.aide) + '</p>' : '') +
      htmlZone(r, r.id, v, lecture, parent) + '</section>';
    if (r.type === "liste") {
      var nomL = OM.ligneDef(r).titre, items = v.filter(function (x) { return !OM.estVide(x); });
      if (lecture) return '<section class="o-rubrique">' + titre + (items.length ? '<ul class="points o-val">' + items.map(function (x) {
        return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '<p class="muted">—</p>') + '</section>';
      return '<section class="o-rubrique">' + titre + (r.aide ? '<p class="muted">' + fmt(r.aide) + '</p>' : '') + '<ul class="o-items">' +
        v.map(function (x, k) {
          return '<li><label class="o-lib" for="' + id + '-' + k + '">' + esc(nomL) + ' ' + (k + 1) + '</label><textarea id="' + id + '-' + k +
            '" data-champ="item" data-r="' + esc(r.id) + '" data-i="' + k + '" rows="2" maxlength="' + OM.MAX.texte + '">' + esc(x) + '</textarea>' +
            '<button type="button" class="lien danger" data-action="suppr-item" data-r="' + esc(r.id) + '" data-i="' + k + '" aria-label="Supprimer : ' +
            esc(nomL) + ' ' + (k + 1) + '">Supprimer</button></li>';
        }).join('') + '</ul><div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-item" data-r="' +
        esc(r.id) + '">+ ' + esc(nomL) + '</button></div></section>';
    }
    if (lecture) return '<div class="o-rubrique o-champ"><p class="label">' + esc(r.titre) + '</p><p class="o-val">' +
      (OM.estVide(v) ? '—' : valeurLue(r, v, OM.couleurChoix(r, v))) + '</p></div>';
    return '<div class="o-rubrique o-champ"><label for="' + id + '">' + esc(r.titre) + '</label>' +
      (r.aide ? '<p class="muted o-aide" id="' + id + '-aide">' + fmt(r.aide) + '</p>' : '') +
      champHtml(r, v, id, 'data-champ="rubrique" data-r="' + esc(r.id) + '"' + (r.aide ? ' aria-describedby="' + id + '-aide"' : ''),
        OM.couleurChoix(r, v), true) + '</div>';
  }
  // La largeur (px) sous laquelle un tableau passe en cartes : la somme des largeurs utiles de ses colonnes
  // (une liste de choix : la largeur de son plus long choix).
  function largeurMin(cols) {
    return cols.reduce(function (t, c) {
      if (c.type === "choix") return t + 34 + 8.5 * Math.max.apply(null, c.valeurs.map(function (v, k) { return OM.texteChoix(c, k).length; }));
      return t + ({ "texte-long": 150, texte: 110, date: 140, nombre: 80, calcul: c.niveaux ? 120 : 70 }[c.type] || 110);
    }, 70);
  }
  function modeZones() {
    Array.prototype.forEach.call(app.querySelectorAll(".o-zone[data-min]"), function (z) {
      var cartes = z.clientWidth < Number(z.getAttribute("data-min"));
      if (z.classList.contains("o-cartes") !== cartes) z.classList.toggle("o-cartes", cartes);
    });
  }

  // La saisie : le document est mis à jour, les calculs et les alertes aussi, et tout est enregistré tout de suite.
  function brancherEditeur() {
    var ed = document.getElementById("o-editeur");
    if (!ed || !outilCourant || outilCourant.lecture) return;
    ed.addEventListener("input", function (e) { surSaisie(e.target); });
    ed.addEventListener("change", function (e) { surSaisie(e.target); });
    ed.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-action]") : null;
      if (b && ed.contains(b)) surAction(b);
    });
  }
  function rubriqueDe(def, r) { return (def.rubriques || []).filter(function (x) { return x.id === r; })[0] || null; }
  function tableauDe(def, r) { return r ? rubriqueDe(def, r) : def; }
  function lignesDe(def, c, r) { return r ? c.rubriques[r] : c.lignes; }
  function colonneDe(t, id) { return t ? t.colonnes.filter(function (x) { return x.id === id; })[0] || null : null; }
  function valeurChamp(c, el) {
    var v = el.value;
    if (c.type === "choix") { var k = OM.indexValeur(c.valeurs, v); return k < 0 ? "" : c.valeurs[k]; }
    if (c.type === "date") return OM.jour(v) === null ? "" : v;
    if (c.type === "nombre") {
      var n = OM.lireNombre(v), faux = v.trim() !== "" && n === null;
      el.classList.toggle("o-invalide", faux);
      if (faux) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      return n === null ? "" : n;
    }
    return v.slice(0, c.type === "texte-long" ? OM.MAX.texteLong : OM.MAX.texte);
  }
  function surSaisie(el) {
    var oc = outilCourant, champ = el.getAttribute ? el.getAttribute("data-champ") : null;
    if (!oc || oc.lecture || !champ) return;
    var def = oc.def, c = oc.doc.contenu, r = el.getAttribute("data-r") || "";
    var l = Number(el.getAttribute("data-l")), k = Number(el.getAttribute("data-k")), i = Number(el.getAttribute("data-i"));
    if (champ === "cellule") {
      var t = tableauDe(def, r), col = colonneDe(t, el.getAttribute("data-c")), ligne = (lignesDe(def, c, r) || [])[l];
      if (!col || !ligne) return;
      ligne[col.id] = valeurChamp(col, el);
      colorer(el, col, ligne[col.id]);
      majCalculs(t, r, l, ligne);
    } else if (champ === "rubrique") {
      var rub = rubriqueDe(def, r);
      if (rub) { c.rubriques[r] = valeurChamp(rub, el); colorer(el, rub, c.rubriques[r]); majTousCalculs(); }
    } else if (champ === "item") {
      if (c.rubriques[r]) c.rubriques[r][i] = el.value.slice(0, OM.MAX.texte);
    } else if (champ === "nom-ligne") {
      if (c.lignes[l]) c.lignes[l].nom = el.value.slice(0, OM.MAX.nom);
    } else if (champ === "case") {
      if (c.lignes[l]) c.lignes[l].cases[k] = valeurChamp({ type: "choix", valeurs: def.valeurs }, el);
    } else if (champ === "colonne") {
      c.colonnes[k] = el.value.slice(0, OM.MAX.nom);
      nommerColonne(def, k, c.colonnes[k]);
    }
    majSuivi();
    sauverOutil();
  }
  // Renommer une colonne de la matrice : l'en-tête et les étiquettes changent sur place (refaire le tableau ferait perdre
  // la case que l'élève vient de cliquer).
  function nommerColonne(def, k, nom) {
    var t = nom || def.colonne.titre + " " + (k + 1), th = app.querySelectorAll("#o-matrice th.o-case")[k];
    if (th) th.textContent = t;
    Array.prototype.forEach.call(app.querySelectorAll("#o-matrice tbody tr"), function (tr) {
      var td = tr.querySelectorAll("td.o-case")[k], lib = td ? td.querySelector(".o-lib") : null;
      if (lib) lib.textContent = t;
    });
  }
  // Un choix qui a des couleurs : la liste prend la couleur de la valeur choisie.
  function colorer(el, c, v) {
    if (!c.couleurs || el.tagName !== "SELECT") return;
    el.className = el.className.replace(/\bo-c-\S+/g, "").trim();
    var couleur = OM.couleurChoix(c, v);
    if (couleur) el.classList.add("o-c-" + couleur);
  }
  function majCalculs(t, r, l, ligne) {
    var tr = app.querySelector('#o-editeur tr[data-r="' + r + '"][data-l="' + l + '"]'), oc = outilCourant;
    if (!tr || !oc) return;
    var calc = OM.calculerLigne(t.colonnes, ligne, OM.parentDe(oc.def, oc.doc.contenu, oc.auj));
    Array.prototype.forEach.call(tr.querySelectorAll(".o-calc"), function (s) {
      var col = colonneDe(t, s.getAttribute("data-c"));
      if (col) s.innerHTML = col.type === "calcul" ? htmlCalcul(col, calc) : badge(calc.niveaux[col.id]);
    });
  }
  // Une rubrique a changé (une tolérance, un plafond…) : les calculs des tableaux qui la lisent sont refaits.
  function majTousCalculs() {
    var oc = outilCourant;
    if (!oc || oc.def.type !== "document") return;
    Array.prototype.forEach.call(app.querySelectorAll("#o-editeur tr[data-r]"), function (tr) {
      var r = tr.getAttribute("data-r"), l = Number(tr.getAttribute("data-l")), t = tableauDe(oc.def, r), ligne = (lignesDe(oc.def, oc.doc.contenu, r) || [])[l];
      if (t && ligne) majCalculs(t, r, l, ligne);
    });
  }
  // Les totaux sous chaque tableau (un total peut avoir un niveau : mot et couleur), la marque « Alerte » des lignes,
  // et les alertes en phrases sous le document.
  function majSuivi() {
    var oc = outilCourant;
    if (!oc) return;
    var s = OM.suivi(oc.def, oc.doc.contenu, oc.auj);
    Array.prototype.forEach.call(app.querySelectorAll("[data-totaux]"), function (z) {
      var r = z.getAttribute("data-totaux"), t = s.totaux.filter(function (x) { return x.rubrique === r; });
      z.innerHTML = t.length ? '<p class="label">Totaux</p><ul class="o-liste">' + t.map(function (x) {
        return '<li>' + esc(x.libelle) + ' : <strong>' + esc(x.texte) + '</strong>' + badge(x.niveau) + '</li>';
      }).join('') + '</ul>' : '';
    });
    Array.prototype.forEach.call(app.querySelectorAll("#o-editeur tr[data-l]"), function (tr) {
      var r = tr.getAttribute("data-r") || "", l = Number(tr.getAttribute("data-l")), m = tr.querySelector(".o-marque");
      if (m) m.hidden = !s.alertes.some(function (a) { return a.rubrique === r && a.ligne === l; });
    });
    var boite = document.getElementById("o-alertes");
    if (boite) boite.innerHTML = !OM.aDesAlertes(oc.def) ? '' : s.alertes.length ?
      '<div class="o-alertes"><p class="label">Alertes</p><ul>' + s.alertes.map(function (a) { return '<li>' + esc(a.texte) + '</li>'; }).join('') + '</ul></div>' :
      '<p class="o-sans-alerte">Aucune alerte.</p>';
  }
  function sauverOutil() {
    var oc = outilCourant;
    if (!oc || oc.lecture) return;
    var ok = enregistrerDoc(oc.doc), etat = document.getElementById("o-etat");
    if (etat) etat.textContent = ok ? "Enregistré dans ce navigateur à chaque saisie. Rien n'est envoyé." :
      "Attention : ce navigateur n'enregistre pas. Utilise « Enregistrer dans un fichier » avant de partir.";
  }
  // Ajouter ou supprimer une ligne, une colonne (matrice), un élément de liste : l'éditeur est refait.
  function surAction(b) {
    var oc = outilCourant;
    if (!oc || oc.lecture) return;
    var def = oc.def, c = oc.doc.contenu, a = b.getAttribute("data-action"), r = b.getAttribute("data-r") || "", focus = "";
    var l = Number(b.getAttribute("data-l")), k = Number(b.getAttribute("data-k")), i = Number(b.getAttribute("data-i"));
    if (a === "ajouter-ligne") {
      if (def.type === "matrice") {
        c.lignes.push({ nom: "", cases: c.colonnes.map(function () { return ""; }) });
        focus = "#o-m-" + (c.lignes.length - 1);
      } else {
        var ls = lignesDe(def, c, r);
        ls.push(OM.ligneVide(tableauDe(def, r).colonnes));
        focus = '#o-editeur tr[data-r="' + r + '"][data-l="' + (ls.length - 1) + '"] [data-champ]';
      }
    } else if (a === "suppr-ligne") {
      var liste = def.type === "matrice" ? c.lignes : lignesDe(def, c, r);
      var remplie = def.type === "matrice" ? !OM.estVide(liste[l]) : OM.ligneRemplie(tableauDe(def, r).colonnes, liste[l]);
      if (remplie && !confirm("Supprimer la ligne " + (l + 1) + " ? Ce qu'elle contient sera perdu.")) return;
      liste.splice(l, 1);
      focus = '#o-editeur [data-action="ajouter-ligne"][data-r="' + r + '"]';
    } else if (a === "ajouter-colonne") {
      c.colonnes.push("");
      c.lignes.forEach(function (x) { x.cases.push(""); });
      focus = "#o-col-" + (c.colonnes.length - 1);
    } else if (a === "suppr-colonne") {
      var pleine = !OM.estVide(c.colonnes[k]) || c.lignes.some(function (x) { return !OM.estVide(x.cases[k]); });
      if (pleine && !confirm("Supprimer la colonne « " + (c.colonnes[k] || k + 1) + " » et ses cases ?")) return;
      c.colonnes.splice(k, 1);
      c.lignes.forEach(function (x) { x.cases.splice(k, 1); });
      focus = '#o-editeur [data-action="ajouter-colonne"]';
    } else if (a === "ajouter-item") {
      c.rubriques[r].push("");
      focus = "#o-r-" + r + "-" + (c.rubriques[r].length - 1);
    } else if (a === "suppr-item") {
      if (!OM.estVide(c.rubriques[r][i]) && !confirm("Supprimer cette ligne ? Ce qu'elle contient sera perdu.")) return;
      c.rubriques[r].splice(i, 1);
      focus = '#o-editeur [data-action="ajouter-item"][data-r="' + r + '"]';
    } else return;
    document.getElementById("o-editeur").innerHTML = htmlEditeur(def, c, false, oc.auj);
    modeZones();
    majSuivi();
    sauverOutil();
    var cible = focus ? app.querySelector(focus) : null;
    if (cible) cible.focus();
  }
  // Imprimer / PDF : le document mis en forme (le même HTML que Copier) ; le CSS d'impression n'imprime que lui.
  function remplirImpression() {
    var z = document.getElementById("o-impression"), oc = outilCourant;
    if (!z || !oc) return;
    z.className = "o-impression" + (oc.def.type === "document" ? "" : " o-paysage");
    z.innerHTML = OM.htmlDocument(oc.def, oc.doc);
  }
  window.addEventListener("beforeprint", remplirImpression);
  window.addEventListener("resize", modeZones);

  // ---------- Routeur ----------
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    window.scrollTo(0, 0);
    outilCourant = null;
    app.classList.remove("large");
    document.body.classList.remove("o-imprimable");
    if (parts[0] !== "compte") messageCompte = "";
    if (parts[0] === "quiz" && parts[1]) demarrerQuiz(parts[1], parts[2], parts[3]);
    else if (parts[0] === "cours" && parts[1]) pageCours(parts[1]);
    else if (parts[0] === "revision") pageRevision(parts[1]);
    else if (parts[0] === "resultat") pageResultat();
    else if (parts[0] === "erreurs") pageErreurs();
    else if (parts[0] === "historique") pageHistorique();
    else if (parts[0] === "export") pageExport();
    else if (parts[0] === "p" && parts[1]) pageParcours(parts[1], parts[2]);
    else if (parts[0] === "compte") pageCompte();
    else if (parts[0] === "mentions") pageLegale("Mentions légales", "mentions");
    else if (parts[0] === "confidentialite") pageLegale("Confidentialité", "confidentialite");
    else if (parts[0] === "equipe") pageEquipe(parts[1]);
    else if (parts[0] === "dico") pageDico(parts[1]);
    else if (parts[0] === "traduire") pageTraduire();
    else if (parts[0] === "outils") {
      if (parts[1]) pageOutil(decoder(parts[1]), parts[2] ? decoder(parts[2]) : "");
      else pageOutils();
    }
    else pageAccueil();
  }
  window.addEventListener("hashchange", route);
  // Revenir sur l'onglet = récupérer ce qui a été fait sur un autre appareil.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && lireSession()) synchroniserPuisAfficher();
  });
  lireRetourEmail().then(function () {
    majNav();
    route();
    if (lireSession()) synchroniserPuisAfficher();
  });
})();
