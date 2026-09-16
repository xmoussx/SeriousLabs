/* ==========================================================================
   Serious Labs — le carnet à souche
   Deux comportements seulement : l'envoi du formulaire et la date du jour
   portée par le bandeau. Aucune dépendance.
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

  /* ------------------------------------------------------------ formulaire -- */

  var form = document.querySelector('[data-contact-form]');

  if (form) {
    var status = form.querySelector('[data-status]');
    var submit = form.querySelector('[type="submit"]');
    var submitLabel = submit ? submit.textContent : '';

    var say = {
      sending: isEN ? 'Sending…' : 'Envoi en cours…',
      ok: isEN
        ? 'Received. We reply within one working day.'
        : 'Reçu. Nous répondons sous un jour ouvré.',
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

  /* ------------------------------------------- mentions du pré-imprimé -- */

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Le carnet porte la date du jour, comme un vrai bordereau.
  // Le carnet porte la date à deux endroits : le bandeau et le bordereau.
  var stamped = new Date().toLocaleDateString(locale, {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-today]'), function (el) {
    el.textContent = stamped;
  });
})();
