/* ==========================================================================
   Serious Labs — comportements de la page
   Trois choses seulement : le calculateur, l'apparition au scroll,
   l'envoi du formulaire. Aucune dépendance.
   ========================================================================== */

(function () {
  'use strict';

  var lang = (document.documentElement.lang || 'fr').slice(0, 2);
  var isEN = lang === 'en';
  var locale = isEN ? 'en-GB' : 'fr-FR';

  /* ------------------------------------------------------------ formats -- */

  var fmtInt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  // Le gain hebdomadaire est petit : l'arrondir à l'entier ferait disparaître
  // la différence entre deux réglages voisins. On garde une décimale.
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
    var headcountOut = calc.querySelector('[data-out="effectif"]');
    var tasks = Array.prototype.slice.call(calc.querySelectorAll('[data-rate]'));

    var inCost = calc.querySelector('#cout-horaire');
    var inWeeks = calc.querySelector('#semaines');
    var inAdopt = calc.querySelector('#adoption');

    var outMoney = calc.querySelector('[data-out="money"]');
    var outHours = calc.querySelector('[data-out="hours"]');
    var outDays = calc.querySelector('[data-out="days"]');
    var outWeekly = calc.querySelector('[data-out="weekly"]');

    // Lit un champ numérique en refusant les valeurs absurdes, sans jamais
    // renvoyer NaN : une saisie vide retombe sur la valeur par défaut.
    function readNum(el, fallback, min, max) {
      if (!el) return fallback;
      var v = parseFloat(String(el.value).replace(',', '.'));
      if (!isFinite(v)) return fallback;
      return Math.min(max, Math.max(min, v));
    }

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
      var money = yearHours * cost;
      var days = yearHours / 7;

      if (headcountOut) {
        headcountOut.textContent = isEN
          ? n + (n > 1 ? ' people' : ' person')
          : n + (n > 1 ? ' personnes' : ' personne');
      }

      if (outMoney) outMoney.textContent = fmtMoney.format(Math.round(money));
      if (outHours) outHours.textContent = fmtInt.format(Math.round(yearHours));
      if (outDays) outDays.textContent = fmtInt.format(Math.round(days));
      if (outWeekly) {
        outWeekly.textContent = fmtTenth.format(Math.round(weeklyHours * 10) / 10);
      }
    }

    calc.addEventListener('input', compute);
    calc.addEventListener('change', compute);
    compute();

    // Volet des hypothèses de calcul : masqué par défaut, jamais caché à clé.
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

  /* ------------------------------------------------------ apparition douce -- */

  var risers = document.querySelectorAll('.rise');

  if (risers.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(risers, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(risers, function (el) { el.classList.add('is-in'); });
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
        ? 'Message sent. You will get a confirmation by email, and a reply within one business day.'
        : 'Message envoyé. Vous recevez un accusé de réception par courriel, et une réponse sous un jour ouvré.',
      ko: isEN
        ? 'The message could not be sent. Please write directly to contact@seriouslabs.tech.'
        : "Le message n'a pas pu être envoyé. Écrivez-nous directement à contact@seriouslabs.tech."
    };

    function show(kind, text) {
      if (!status) return;
      status.hidden = false;
      status.className = 'form__status form__status--' + kind;
      status.textContent = text;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

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
            if (submit) {
              submit.disabled = false;
              submit.textContent = submitLabel;
            }
          }
        })
        .catch(function () {
          show('ko', say.ko);
          if (submit) {
            submit.disabled = false;
            submit.textContent = submitLabel;
          }
        });
    });
  }

  /* ------------------------------------------ report du calcul vers le mot -- */

  // Quand on arrive au formulaire depuis le calculateur, on pré-remplit
  // l'effectif : le prospect n'a pas à retaper ce qu'il vient de saisir.
  var bridge = document.querySelector('[data-calc-to-form]');
  if (bridge) {
    bridge.addEventListener('click', function () {
      var src = document.querySelector('#effectif');
      var dst = document.querySelector('#f-effectif');
      if (src && dst) dst.value = src.value;
    });
  }

  /* --------------------------------------------------------------- année -- */

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
