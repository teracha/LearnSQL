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
        email: u.email
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
  function synchroniser() {
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
          etatSync = "Synchronisé à " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + ".";
          return change;
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
      messageCompte = "Adresse confirmée. Tu es connecté.";
    }, function (e) {
      messageCompte = "Connexion impossible : " + e.message;
    });
  }

  function majNav() {
    var lien = document.getElementById("lien-compte");
    var s = lireSession();
    if (lien) lien.textContent = s ? "Compte ✓" : "Connexion";
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
      return store.questions[id].dernier === false && questionParId(id);
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
      return DATA.questions[m.id] && DATA.questions[m.id].length >= REVISION_MIN_PAR_THEME;
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
  function pageAccueil() {
    var store = lire();
    var html = '<h1>Ton parcours SQL</h1>' +
      '<p class="muted">SQL Server et Snowflake. Fais les modules dans l\'ordre. Refais-les jusqu\'à 16/20.</p>';

    var nbErr = idsEnErreur(store).length;
    if (nbErr) {
      html += '<div class="card"><strong>' + nbErr + ' question(s) à revoir.</strong> ' +
        '<a href="#/erreurs">Refaire mes erreurs</a></div>';
    }

    DATA.modules.forEach(function (m, i) {
      var qs = DATA.questions[m.id];
      var st = statsModule(store, m.id);
      var droite = !qs ? '<div class="note"><small>À venir</small></div>'
        : st ? '<div class="note ' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) +
               '<small>meilleure · ' + st.nb + ' essai(s)</small></div>'
        : '<div class="note"><small>' + Math.min(TAILLE_QCM, qs.length) + ' questions</small></div>';
      var boutons = (DATA.cours[m.id] ? '<a class="btn small ghost" href="#/cours/' + m.id + '">Cours</a>' : '') +
        (qs ? '<a class="btn small" href="#/quiz/' + m.id + '">QCM</a>' : '');
      html += '<div class="card module' + (qs || DATA.cours[m.id] ? '' : ' locked') + '">' +
        '<div class="num">' + (i + 1) + '</div>' +
        '<div><h3>' + esc(m.titre) + '</h3><p>' + esc(m.resume) + '</p>' +
        '<div class="tags"><span class="tag">' + esc(m.niveau) + '</span>' +
        (qs ? '<span class="tag">' + vuesModule(store, qs) + '/' + qs.length + ' vues</span>' : '') + '</div>' +
        (boutons ? '<div class="mini-actions">' + boutons + '</div>' : '') + '</div>' +
        droite + '</div>';
    });

    html += '<p class="muted">Un module « À venir » ? Demande au prof de le créer : <code>/qcm</code> dans Claude Code.</p>';
    app.innerHTML = html;
  }

  function pageCours(id) {
    var m = module(id);
    var c = DATA.cours[id];
    if (!m || !c) { location.hash = "#/"; return; }
    var html = '<p class="muted">Cours · Module ' + (DATA.modules.indexOf(m) + 1) + '</p>' +
      '<h1>' + esc(m.titre) + '</h1>' +
      '<p>' + fmt(c.intro) + '</p>';
    c.sections.forEach(function (sec, i) {
      html += '<h2>' + (i + 1) + '. ' + esc(sec.titre) + '</h2><div class="card">' +
        (sec.exemple ? '<p class="label">Exemple</p><pre class="code">' + esc(sec.exemple) + '</pre>' : '') +
        (sec.resultat ? '<p class="muted">→ ' + fmt(sec.resultat) + '</p>' : '') +
        '<ul class="points">' + sec.points.map(function (p) { return '<li>' + fmt(p) + '</li>'; }).join('') + '</ul>' +
        (sec.retenir ? '<div class="feedback ok"><p><strong>À retenir :</strong> ' + fmt(sec.retenir) + '</p></div>' : '') +
        '</div>';
    });
    if (c.differences && c.differences.length) {
      html += '<h2>SQL Server ou Snowflake ?</h2><div class="card table-wrap"><table><thead><tr>' +
        '<th>Sujet</th><th>SQL Server</th><th>Snowflake</th></tr></thead><tbody>' +
        c.differences.map(function (d) {
          return '<tr><td>' + fmt(d[0]) + '</td><td>' + fmt(d[1]) + '</td><td>' + fmt(d[2]) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    html += '<div class="actions">' +
      (DATA.questions[id] ? '<a class="btn" href="#/quiz/' + id + '">Faire le QCM</a>' : '') +
      '<a class="btn ghost" href="#/">Parcours</a></div>';
    app.innerHTML = html;
  }

  function pageRevision(preselection) {
    var store = lire();
    var choisis = (preselection || "").split(",").filter(Boolean);
    var themes = themesRevisables();
    var html = '<h1>Révision</h1>' +
      '<p>Choisis au moins ' + REVISION_MIN_THEMES + ' thèmes. Le QCM mélange les questions : ' +
      REVISION_MIN_QUESTIONS + ' minimum, et au moins ' + REVISION_MIN_PAR_THEME + ' par thème.</p>';
    if (themes.length < REVISION_MIN_THEMES) {
      app.innerHTML = html + '<p>Il faut au moins ' + REVISION_MIN_THEMES + ' modules avec des questions.</p>';
      return;
    }
    html += '<div class="card themes">';
    themes.forEach(function (m) {
      var st = statsModule(store, m.id);
      html += '<label class="theme"><input type="checkbox" value="' + m.id + '"' +
        (choisis.indexOf(m.id) >= 0 ? ' checked' : '') + '> <span>' + esc(m.titre) +
        (st ? ' <small class="' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) + '</small>' : '') +
        '</span></label>';
    });
    html += '</div>' +
      '<p><label>Nombre de questions : <select id="nb"></select></label></p>' +
      '<p id="info" class="muted"></p>' +
      '<div class="actions"><button type="button" class="btn" id="lancer">Lancer la révision</button></div>';
    app.innerHTML = html;

    var nb = document.getElementById("nb");
    function maj() {
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
        ? ids.length + " thèmes choisis."
        : "Choisis encore " + (REVISION_MIN_THEMES - ids.length) + " thème(s).";
    }
    function selection() {
      return Array.prototype.slice.call(app.querySelectorAll(".theme input:checked")).map(function (c) { return c.value; });
    }
    app.querySelectorAll(".theme input").forEach(function (c) { c.addEventListener("change", maj); });
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
      titre = "Révision · " + ids.length + " thèmes";
    } else if (id === "erreurs") {
      questions = idsEnErreur(lire()).map(questionParId);
      titre = "Mes erreurs";
    } else {
      var m = module(id);
      questions = DATA.questions[id] ? tirage(DATA.questions[id], lire()) : null;
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
        '<p><strong>À retenir :</strong> ' + fmt(q.retenir) + '</p></div>' +
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
    if (parts[0] !== "compte") messageCompte = "";
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
      var m = r.id.slice(0, 3);
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
      html += '<div class="card"><span class="tag">' + esc(module(id.slice(0, 3)).titre) + '</span>' +
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
      html += '<p>Connecté avec <strong>' + esc(s.email) + '</strong>.</p>' +
        '<p class="muted">Ta progression est enregistrée en ligne. Connecte-toi avec la même adresse ' +
        'sur un autre appareil : tu la retrouves.</p>' +
        '<p class="muted" id="etat-sync">' + esc(etatSync) + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="sync">Synchroniser maintenant</button>' +
        '<button type="button" class="btn ghost" id="deconnexion">Se déconnecter</button></div>';
      app.innerHTML = html;
      document.getElementById("sync").addEventListener("click", function () {
        document.getElementById("etat-sync").textContent = "Synchronisation…";
        synchroniserPuisAfficher();
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

    document.getElementById("inscription").addEventListener("click", function () {
      var c = champs();
      if (!c) return;
      msg.textContent = "Création du compte…";
      appelSupa("/auth/v1/signup?redirect_to=" + encodeURIComponent(location.origin + location.pathname), { methode: "POST", corps: c }).then(function (d) {
        if (d && d.access_token) return ouvrirSession(d).then(connecte);
        msg.textContent = "Compte créé. Ouvre l'e-mail reçu et clique sur le lien pour le confirmer.";
      }, function (err) {
        msg.textContent = "Création impossible : " + err.message;
      });
    });
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

  // ---------- Routeur ----------
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    window.scrollTo(0, 0);
    if (parts[0] === "quiz" && parts[1]) demarrerQuiz(parts[1], parts[2], parts[3]);
    else if (parts[0] === "cours" && parts[1]) pageCours(parts[1]);
    else if (parts[0] === "revision") pageRevision(parts[1]);
    else if (parts[0] === "resultat") pageResultat();
    else if (parts[0] === "erreurs") pageErreurs();
    else if (parts[0] === "historique") pageHistorique();
    else if (parts[0] === "export") pageExport();
    else if (parts[0] === "compte") pageCompte();
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
