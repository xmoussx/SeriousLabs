/* ==========================================================================
   Serious Labs — « La journée »

   Un seul comportement : l'envoi du formulaire de contact. Le reste de la
   page est du HTML et du CSS, et fonctionne sans script.

   Les trois formateurs Intl qui vivaient ici servaient au calculateur retiré
   depuis. Ils ont été supprimés : du code mort finit toujours par être lu
   comme une intention.
   ========================================================================== */

(function () {
  'use strict';

  var isEN = (document.documentElement.lang || 'fr').slice(0, 2) === 'en';

  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

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
      : "Le message n'a pas pu partir. Écrivez-nous à contact@seriouslabs.tech.",
    invalid: isEN
      ? 'Some fields still need filling in. They are marked below.'
      : 'Il manque des champs. Ils sont signalés ci-dessous.'
  };

  function show(kind, text) {
    if (!status) return;
    status.hidden = false;
    status.className = 'reply reply--' + kind;
    status.textContent = text;
  }

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

  // Horodatage posé par le navigateur. Le serveur refuse les envois trop
  // rapides ET ceux qui arrivent sans ce champ : son absence signe un client
  // qui n'a pas exécuté la page.
  var ts = form.querySelector('[name="ts"]');
  if (ts) ts.value = String(Math.round(performance.timeOrigin + performance.now()));

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (markInvalid()) {
      show('ko', say.invalid);
      return;
    }

    show('ok', say.sending);
    if (submit) { submit.disabled = true; submit.textContent = say.sending; }

    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(function (r) {
        return r.json().then(function (data) { return { ok: r.ok, data: data }; });
      })
      .then(function (res) {
        if (res.ok && res.data && res.data.ok) {
          form.reset();
          show('ok', say.ok);
          if (submit) submit.remove();
          return;
        }
        show('ko', (res.data && res.data.error) || say.ko);
        if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
      })
      .catch(function () {
        show('ko', say.ko);
        if (submit) { submit.disabled = false; submit.textContent = submitLabel; }
      });
  });

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
