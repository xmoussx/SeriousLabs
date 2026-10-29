/* Serious Labs — l'accueil.
   L'aperçu : la colonne de droite montre l'écran de la réalisation survolée
   ou focalisée dans le registre, ou son poinçon quand l'outil est privé. */
(() => {
  // La formation occupait l'accueil jusqu'au 29.10.2026 : ses anciennes
  // ancres (#devis dans les courriels envoyés) mènent désormais à sa page.
  const ancres = ['#cles', '#exemple', '#journee', '#a-vous', '#budget', '#devis'];
  if (ancres.includes(location.hash)) {
    const page = document.documentElement.lang === 'en' ? '/en/training/' : '/formation/';
    location.replace(page + location.hash);
    return;
  }

  const peek = document.querySelector('[data-peek]');
  const entries = [...document.querySelectorAll('.entry')];
  if (!peek || !entries.length) return;

  const img = peek.querySelector('[data-peek-img]');
  const use = peek.querySelector('[data-peek-mark] use');
  const name = peek.querySelector('[data-peek-name]');
  const note = peek.querySelector('[data-peek-note]');
  const wide = matchMedia('(min-width: 72rem)');
  let cur = null;

  const show = (entry) => {
    if (entry === cur) return;
    cur?.classList.remove('is-on');
    entry.classList.add('is-on');
    cur = entry;

    name.textContent = entry.querySelector('.entry__name').textContent;
    const link = entry.querySelector('a.entry__go');
    note.textContent = link
      ? new URL(link.href).hostname.replace(/^www\./, '')
      : entry.querySelector('.entry__go').textContent;

    const shot = entry.dataset.shot;
    if (!shot) {
      use.setAttribute('href', '/assets/img/poincons.svg#' + entry.dataset.mark);
      peek.classList.add('is-private');
      return;
    }
    peek.classList.remove('is-private');
    if (img.getAttribute('src') === shot) return;
    img.classList.add('is-swap');
    img.src = shot;
    img.decode()
      .catch(() => {})
      .then(() => requestAnimationFrame(() => img.classList.remove('is-swap')));
  };

  for (const entry of entries) {
    entry.addEventListener('pointerenter', () => wide.matches && show(entry));
    entry.addEventListener('focusin', () => show(entry));
  }
  // Sur téléphone, aucune ligne n'est « active » : l'aperçu n'existe pas et
  // la capture est déjà dans chaque ligne.
  const reset = () => {
    if (wide.matches) { if (!cur) show(entries[0]); }
    else { cur?.classList.remove('is-on'); cur = null; }
  };
  wide.addEventListener('change', reset);
  reset();

  // Les captures sont légères : on les charge d'avance sur grand écran pour
  // que l'aperçu change sans attendre.
  const warm = () => {
    if (!wide.matches) return;
    for (const e of entries) if (e.dataset.shot) new Image().src = e.dataset.shot;
  };
  if ('requestIdleCallback' in window) requestIdleCallback(warm);
  else setTimeout(warm, 1500);
})();
