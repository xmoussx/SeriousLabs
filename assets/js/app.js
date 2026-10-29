/* ==========================================================================
   Serious Labs — « Vous gardez les clés »

   Quatre comportements : le trousseau (choisir ses clés), l'exemple (ce
   qu'une clé prépare), l'envoi du formulaire, et la vidéo du matin. Sans
   script, la page reste entière : les étiquettes ne font rien, l'exemple 03
   reste affiché et le formulaire part en POST classique.
   ========================================================================== */

(function () {
  'use strict';

  var isEN = (document.documentElement.lang || 'fr').slice(0, 2) === 'en';
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* ------------------------------------------------------- le trousseau -- */

  var keys = document.querySelectorAll('[data-key]');
  var ring = document.querySelector('[data-ring]');
  var ringCount = document.querySelector('[data-ring-count]');
  var ringKeys = document.querySelector('[data-ring-keys]');
  var ringCta = document.querySelector('[data-ring-cta]');
  var dock = document.querySelector('[data-dock]');
  var dockCount = document.querySelector('[data-dock-count]');
  var formKeys = document.querySelector('[data-form-keys]');
  var message = document.querySelector('#f-message');
  var chosen = [];
  var autoText = '';

  var say = {
    empty: isEN ? 'Your key ring is empty.' : 'Votre trousseau est vide.',
    count: function (n, nums) {
      if (isEN) return (n === 1 ? '1 key on your ring: ' : n + ' keys on your ring: ') + nums + '.';
      return (n === 1 ? '1 clé sur votre trousseau : ' : n + ' clés sur votre trousseau : ') + nums + '.';
    },
    short: function (n) {
      if (isEN) return n === 1 ? '1 key' : n + ' keys';
      return n === 1 ? '1 clé' : n + ' clés';
    },
    lead: isEN ? 'What takes us the most time: ' : 'Ce qui nous prend le plus de temps : '
  };

  function label(btn) {
    var l = btn.querySelector('.key__l');
    return l ? l.textContent.trim() : btn.dataset.key;
  }

  // La couleur de l'étiquette est lue sur le bouton lui-même : le CSS reste
  // la seule source des plastiques.
  function paint(el, btn) {
    var cs = getComputedStyle(btn);
    el.style.setProperty('--plastic', cs.getPropertyValue('--plastic').trim());
    el.style.setProperty('--on', cs.getPropertyValue('--on').trim());
  }

  function render() {
    var n = chosen.length;
    var nums = chosen.map(function (b) { return b.dataset.key; }).sort().join(', ');
    if (ringCount) ringCount.textContent = n ? say.count(n, nums) : say.empty;

    // Les étiquettes pendent en éventail sous l'anneau, chacune avec son
    // numéro : la couleur seule ne dirait pas laquelle est laquelle.
    if (ringKeys) {
      ringKeys.replaceChildren();
      // Chaque étiquette est décalée de 15 px sur la précédente : sa moitié
      // gauche, où est frappé le numéro, reste visible.
      chosen.forEach(function (btn, i) {
        var li = document.createElement('li');
        var rang = i - (n - 1) / 2;
        li.textContent = btn.dataset.key;
        li.dataset.key = btn.dataset.key;
        paint(li, btn);
        li.style.setProperty('--x', rang * 15 + 'px');
        li.style.setProperty('--a', rang * -5 + 'deg');
        ringKeys.appendChild(li);
      });
    }

    if (ringCta) {
      var t = n === 0 ? ringCta.dataset.ctaZero
            : n === 1 ? ringCta.dataset.ctaOne
            : ringCta.dataset.ctaMany.replace('{n}', n);
      ringCta.textContent = t;
    }

    if (formKeys) {
      formKeys.replaceChildren();
      chosen.forEach(function (btn) {
        var s = document.createElement('span');
        s.textContent = btn.dataset.key + ' · ' + label(btn);
        paint(s, btn);
        formKeys.appendChild(s);
      });
      formKeys.hidden = n === 0;
    }

    // Le message n'est rempli que s'il est vide ou s'il porte encore notre
    // propre texte : ce que le visiteur a écrit ne s'écrase jamais.
    if (message && (message.value.trim() === '' || message.value === autoText)) {
      autoText = n ? say.lead + chosen.map(label).join(', ') + '.' : '';
      message.value = autoText;
    }

    if (dockCount) dockCount.textContent = say.short(n);
    updateDock();
  }

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)');

  // L'étiquette vole du crochet jusqu'à sa place sur l'anneau : un double
  // part de la position de l'original et se pose sur la miniature.
  function vole(btn) {
    if (reduit.matches || !ringKeys || !btn.animate) return;
    var mini = ringKeys.querySelector('[data-key="' + btn.dataset.key + '"]');
    if (!mini) return;
    var a = btn.getBoundingClientRect();
    var b = mini.getBoundingClientRect();
    var vol = btn.cloneNode(true);
    vol.removeAttribute('data-key');
    vol.setAttribute('aria-hidden', 'true');
    vol.setAttribute('aria-pressed', 'false');
    vol.tabIndex = -1;
    vol.classList.add('key--vol');
    vol.style.left = a.left + 'px';
    vol.style.top = a.top + 'px';
    vol.style.width = a.width + 'px';
    vol.style.height = a.height + 'px';
    document.body.appendChild(vol);
    mini.style.visibility = 'hidden';
    var dx = b.left - a.left, dy = b.top - a.top;
    var sx = b.width / a.width, sy = b.height / a.height;
    var anim = vol.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0)' },
      { transform: 'translate(' + dx * 0.45 + 'px, ' + (dy * 0.45 - 40) + 'px) scale(' + (0.4 + sx * 0.6) + ', ' + (0.4 + sy * 0.6) + ') rotate(-14deg)', offset: 0.45 },
      { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + sx + ', ' + sy + ') rotate(0)' }
    ], { duration: 720, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    var fin = function () { vol.remove(); mini.style.visibility = ''; };
    anim.onfinish = fin;
    anim.oncancel = fin;
  }

  each(keys, function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.classList.remove('is-back');
      if (on) {
        chosen.push(btn);
        showDemo(btn.dataset.key);
      } else {
        chosen = chosen.filter(function (b) { return b !== btn; });
        void btn.offsetWidth;
        btn.classList.add('is-back');
      }
      render();
      if (on) vole(btn);
    });
    btn.addEventListener('animationend', function () { btn.classList.remove('is-back'); });
  });

  // La barre basse n'apparaît que lorsqu'il y a des clés, que l'anneau est
  // sorti de l'écran, et que le formulaire n'y est pas encore.
  var ringSeen = true;
  var formSeen = false;
  function updateDock() {
    if (!dock) return;
    dock.hidden = !(chosen.length && !ringSeen && !formSeen);
  }
  if (dock && 'IntersectionObserver' in window) {
    var devis = document.querySelector('#devis');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target === ring) ringSeen = e.isIntersecting;
        if (e.target === devis) formSeen = e.isIntersecting;
      });
      updateDock();
    }).observe(ring);
    if (devis) {
      new IntersectionObserver(function (entries) {
        formSeen = entries[0].isIntersecting;
        updateDock();
      }).observe(devis);
    }
  }

  /* ------------------------------------------------------- l'exemple -- */

  var demo = document.querySelector('[data-demo]');
  var data = document.querySelector('[data-demo-data]');
  var tabs = demo ? demo.querySelectorAll('[data-demo-key]') : [];
  var dTitle = document.querySelector('[data-demo-title]');
  var dIn = document.querySelector('[data-demo-in]');
  var dDraft = document.querySelector('[data-demo-draft]');
  var dCheck = document.querySelector('[data-demo-check]');
  var dSend = document.querySelector('[data-demo-send]');
  var dState = document.querySelector('[data-demo-state]');
  var waiting = dState ? dState.textContent : '';

  function resetSign(text) {
    if (dCheck) dCheck.checked = false;
    if (dSend) dSend.disabled = true;
    if (dState) { dState.textContent = text || waiting; dState.classList.remove('is-done'); }
  }

  // Le passage faux devient un bouton. Tant qu'il n'est pas corrigé, la case
  // « J'ai relu » reste fermée : la correction humaine arrive en dernier, et
  // c'est le visiteur qui la fait.
  function arme() {
    var del = dDraft.querySelector('del');
    var ins = dDraft.querySelector('ins');
    if (!del || !ins || !dSend) return;
    var fix = document.createElement('button');
    fix.type = 'button';
    fix.className = 'fix';
    fix.textContent = del.textContent;
    var gap = ins.previousSibling;
    if (gap && gap.nodeType === 3 && gap.textContent === ' ') gap.remove();
    ins.remove();
    del.replaceWith(fix);
    if (dCheck) dCheck.disabled = true;
    resetSign(dSend.dataset.fix);
    fix.addEventListener('click', function () {
      fix.replaceWith(del, document.createTextNode(' '), ins);
      if (dCheck) { dCheck.disabled = false; dCheck.focus(); }
      resetSign(dSend.dataset.fixed);
    });
  }

  function showDemo(k) {
    if (!data || !dDraft) return;
    var src = data.content.querySelector('[data-k="' + k + '"]');
    if (!src) return;
    dTitle.textContent = src.dataset.t;
    dIn.textContent = src.dataset.in;
    // Des nœuds neufs : la correction rejoue son apparition à chaque clé.
    dDraft.replaceChildren.apply(dDraft, Array.prototype.map.call(src.childNodes, function (n) {
      return n.cloneNode(true);
    }));
    each(tabs, function (t) {
      var on = t.dataset.demoKey === k;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    arme();
  }

  each(tabs, function (t, i) {
    t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
    t.addEventListener('click', function () { showDemo(t.dataset.demoKey); });
    t.addEventListener('keydown', function (ev) {
      var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
      if (!d) return;
      ev.preventDefault();
      var next = tabs[(i + d + tabs.length) % tabs.length];
      next.focus();
      showDemo(next.dataset.demoKey);
    });
  });

  if (demo) {
    var actif = demo.querySelector('[aria-selected="true"]');
    showDemo(actif ? actif.dataset.demoKey : '03');
  }

  if (dCheck && dSend) {
    dCheck.addEventListener('change', function () {
      dSend.disabled = !dCheck.checked;
      if (!dCheck.checked) resetSign(dSend.dataset.fixed);
    });
    dSend.addEventListener('click', function () {
      dState.textContent = dSend.dataset.sent;
      dState.classList.add('is-done');
    });
  }

  /* ----------------------------------------------------- le formulaire -- */

  var form = document.querySelector('[data-contact-form]');

  if (form) {
    var status = form.querySelector('[data-status]');
    var submit = form.querySelector('[type="submit"]');
    var submitLabel = submit ? submit.textContent : '';

    var msg = {
      sending: isEN ? 'Sending…' : 'Envoi en cours…',
      ok: isEN
        ? 'Received. We reply within one working day.'
        : 'Reçu. Nous répondons sous un jour ouvré.',
      ko: isEN
        ? 'The message could not be sent. Please write to contact@seriouslabs.tech.'
        : "Le message n'a pas pu partir. Écrivez-nous à contact@seriouslabs.tech.",
      invalid: isEN
        ? 'Some fields still need filling in. They are marked below.'
        : 'Il manque des champs. Ils sont signalés ci-dessous.'
    };

    var show = function (kind, text) {
      if (!status) return;
      status.hidden = false;
      status.className = 'reply f--wide reply--' + kind;
      status.textContent = text;
    };

    // Le formulaire porte novalidate et l'envoi est intercepté : sans ce
    // contrôle, un champ manquant ne serait signalé à personne.
    var markInvalid = function () {
      var bad = form.querySelectorAll(':invalid');
      each(form.querySelectorAll('[aria-invalid]'), function (el) { el.removeAttribute('aria-invalid'); });
      each(bad, function (el) { if (el.name) el.setAttribute('aria-invalid', 'true'); });
      if (bad.length && bad[0].focus) bad[0].focus();
      return bad.length;
    };

    // Horodatage posé par le navigateur. Le serveur refuse les envois trop
    // rapides ET ceux qui arrivent sans ce champ : son absence signe un client
    // qui n'a pas exécuté la page.
    var ts = form.querySelector('[name="ts"]');
    if (ts) ts.value = String(Math.round(performance.timeOrigin + performance.now()));

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      if (markInvalid()) {
        show('ko', msg.invalid);
        return;
      }

      show('ok', msg.sending);
      if (submit) { submit.disabled = true; submit.textContent = msg.sending; }

      // Les clés choisies partent avec la demande, même si le visiteur a
      // écrit son message avant de les décrocher.
      var corps = new FormData(form);
      var texte = String(corps.get('message') || '');
      var manque = chosen.filter(function (b) { return texte.indexOf(label(b)) === -1; });
      if (manque.length) {
        var tete = (isEN ? 'Keys chosen: ' : 'Clés choisies : ')
          + chosen.map(function (b) { return b.dataset.key + ' ' + label(b); }).join(', ') + '.';
        corps.set('message', tete + '\n\n' + texte);
      }

      fetch(form.action, { method: 'POST', body: corps })
        .then(function (r) {
          return r.json().then(function (d) { return { ok: r.ok, data: d }; });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok) {
            form.reset();
            show('ok', msg.ok);
            if (submit) submit.remove();
            return;
          }
          show('ko', (res.data && res.data.error) || msg.ko);
          if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
        })
        .catch(function () {
          show('ko', msg.ko);
          if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
        });
    });
  }

  /* ------------------------------------------------------- la vidéo -- */

  /* Le poster est le premier état et il suffit. Le fichier n'est demandé qu'à
     l'approche du cadre, et en mouvement réduit rien n'est chargé du tout.
     La commande d'arrêt est celle qu'impose la règle WCAG 2.2.2 dès qu'une
     boucle dépasse cinq secondes. */

  var films = document.querySelectorAll('video[data-film]');
  var arrete = false;

  function joue(v) {
    if (arrete || reduit.matches) return;
    if (!v.dataset.charge) {
      v.dataset.charge = '1';
      v.src = v.dataset.film;
    }
    var p = v.play();
    // Lecture refusée (économie d'énergie, onglet en arrière-plan) : le poster
    // reste affiché, il n'y a rien à rattraper.
    if (p && p.catch) p.catch(function () {});
  }

  if (films.length && !reduit.matches) {
    if ('IntersectionObserver' in window) {
      var veille = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) {
          if (e.isIntersecting) joue(e.target);
          else if (!e.target.paused) e.target.pause();
        });
      }, { rootMargin: '250px' });
      each(films, function (v) { veille.observe(v); });
    } else {
      each(films, joue);
    }

    each(document.querySelectorAll('[data-arret]'), function (b) {
      b.hidden = false;
      b.addEventListener('click', function () {
        arrete = !arrete;
        each(films, function (v) { arrete ? v.pause() : joue(v); });
        b.textContent = arrete ? b.dataset.arretRelance : b.dataset.arretStop;
        b.setAttribute('aria-pressed', String(arrete));
      });
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
