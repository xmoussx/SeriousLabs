/* ==========================================================================
   Serious Labs — le carnet à souche
   Trois comportements seulement : le calcul, le coup de tampon qui marque la
   valeur, et l'envoi du formulaire. Aucune dépendance.
   ========================================================================== */

(function () {
  'use strict';

  var lang = (document.documentElement.lang || 'fr').slice(0, 2);
  var isEN = lang === 'en';
  var locale = isEN ? 'en-GB' : 'fr-FR';

  var fmtInt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  var fmtTenth = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  var fmtMoney = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  /* --------------------------------------------------------- calculateur -- */

  var calc = document.querySelector('[data-calc]');

  if (calc) {
    var headcount = calc.querySelector('#effectif');
    var tasks = Array.prototype.slice.call(calc.querySelectorAll('[data-rate]'));

    var inCost = calc.querySelector('#cout-horaire');
    var inWeeks = calc.querySelector('#semaines');
    var inAdopt = calc.querySelector('#adoption');

    var out = {
      head:   calc.querySelector('[data-out="effectif"]'),
      money:  calc.querySelector('[data-out="money"]'),
      hours:  calc.querySelector('[data-out="hours"]'),
      days:   calc.querySelector('[data-out="days"]'),
      weekly: calc.querySelector('[data-out="weekly"]'),
      echo:   calc.querySelector('[data-out="echo"]')
    };

    // Une saisie vide ou absurde retombe sur la valeur par défaut : le
    // calculateur ne doit jamais afficher NaN devant un prospect.
    function readNum(el, fallback, min, max) {
      if (!el) return fallback;
      var v = parseFloat(String(el.value).replace(',', '.'));
      if (!isFinite(v)) return fallback;
      return Math.min(max, Math.max(min, v));
    }

    var lastMoney = null;

    function compute() {
      var n = readNum(headcount, 8, 1, 40);
      var cost = readNum(inCost, 45, 10, 300);
      var weeks = readNum(inWeeks, 45, 1, 52);
      var adopt = readNum(inAdopt, 60, 5, 100) / 100;

      var perPersonWeek = 0;
      tasks.forEach(function (t) {
        if (t.checked) perPersonWeek += parseFloat(t.getAttribute('data-rate')) || 0;
      });

      var weeklyHours = perPersonWeek * n * adopt;
      var yearHours = weeklyHours * weeks;
      var money = Math.round(yearHours * cost);

      if (out.head) {
        out.head.textContent = isEN
          ? n + (n > 1 ? ' people' : ' person')
          : n + (n > 1 ? ' personnes' : ' personne');
      }
      if (out.money) out.money.textContent = fmtMoney.format(money);
      if (out.hours) out.hours.textContent = fmtInt.format(Math.round(yearHours));
      if (out.days) out.days.textContent = fmtInt.format(Math.round(yearHours / 7));
      if (out.weekly) {
        out.weekly.textContent = fmtTenth.format(Math.round(weeklyHours * 10) / 10);
      }

      // La provenance est imprimée à côté du chiffre qu'elle produit : le
      // visiteur lit toujours l'hypothèse en même temps que le résultat.
      if (out.echo) {
        out.echo.textContent = isEN
          ? 'Basis: €' + fmtInt.format(cost) + '/h loaded cost, '
            + fmtInt.format(weeks) + ' working weeks, '
            + fmtInt.format(adopt * 100) + '% adoption.'
          : 'Base retenue : ' + fmtInt.format(cost) + ' €/h chargés, '
            + fmtInt.format(weeks) + ' semaines travaillées, '
            + fmtInt.format(adopt * 100) + ' % d’adoption.';
      }

      // L'unique moment animé : le tampon ne retombe que si le total a bougé.
      if (out.money && lastMoney !== null && money !== lastMoney) {
        out.money.classList.remove('is-struck');
        void out.money.offsetWidth;
        out.money.classList.add('is-struck');
      }
      lastMoney = money;
    }

    calc.addEventListener('input', compute);
    calc.addEventListener('change', compute);
    compute();

    var toggle = calc.querySelector('[data-assump-toggle]');
    var body = calc.querySelector('[data-assump-body]');
    if (toggle && body) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        body.hidden = open;
      });
    }
  }

  /* ------------------------------------------------------------ formulaire -- */

  var form = document.querySelector('[data-contact-form]');

  if (form) {
    var status = form.querySelector('[data-status]');
    var submit = form.querySelector('[type="submit"]');
    var submitLabel = submit ? submit.textContent : '';

    var say = {
      sending: isEN ? 'Sending…' : 'Envoi en cours…',
      ok: isEN
        ? 'Received. A confirmation is on its way, and a reply within one business day.'
        : 'Reçu. Vous recevez un accusé de réception, et une réponse sous un jour ouvré.',
      ko: isEN
        ? 'The message could not be sent. Please write to contact@seriouslabs.tech.'
        : "Le message n'a pas pu partir. Écrivez-nous à contact@seriouslabs.tech."
    };

    function show(kind, text) {
      if (!status) return;
      status.hidden = false;
      status.className = 'status status--' + kind;
      status.textContent = text;
    }

    var invalidMsg = isEN
      ? 'Some fields still need filling in. They are marked below.'
      : 'Il manque des champs. Ils sont signalés ci-dessous.';

    // Le formulaire porte novalidate et l'envoi est intercepté : sans ce
    // contrôle, un champ manquant ne serait signalé à personne.
    function markInvalid() {
      var bad = form.querySelectorAll(':invalid');
      Array.prototype.forEach.call(form.querySelectorAll('[aria-invalid]'), function (el) {
        el.removeAttribute('aria-invalid');
      });
      Array.prototype.forEach.call(bad, function (el) {
        if (el.name) el.setAttribute('aria-invalid', 'true');
      });
      if (bad.length && bad[0].focus) bad[0].focus();
      return bad.length;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        markInvalid();
        show('ko', invalidMsg);
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = say.sending;
      }
      if (status) status.hidden = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (r) {
          return r.json().then(function (data) { return { ok: r.ok, data: data }; });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok) {
            form.reset();
            show('ok', say.ok);
            if (submit) submit.hidden = true;
          } else {
            show('ko', (res.data && res.data.error) || say.ko);
            if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
          }
        })
        .catch(function () {
          show('ko', say.ko);
          if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
        });
    });
  }

  /* --------------------------------------- report du calcul vers le mot -- */

  var bridge = document.querySelector('[data-calc-to-form]');
  if (bridge) {
    bridge.addEventListener('click', function () {
      var src = document.querySelector('#effectif');
      var dst = document.querySelector('#f-effectif');
      if (src && dst) dst.value = src.value;
    });
  }

  /* ------------------------------------------- mentions du pré-imprimé -- */

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Le carnet porte la date du jour, comme un vrai bordereau.
  var today = document.querySelector('[data-today]');
  if (today) {
    today.textContent = new Date().toLocaleDateString(locale, {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
})();
