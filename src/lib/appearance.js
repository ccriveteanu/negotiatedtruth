// Runs in the head before paint, then enhances the native appearance selector.
(() => {
  const key = 'negotiatedtruth:appearance';
  const root = document.documentElement;
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const normalize = (value) =>
    ['light', 'dark', 'system'].includes(value) ? value : 'system';
  let preference = 'system';
  try {
    preference = normalize(window.localStorage.getItem(key));
  } catch {
    /* Storage can be unavailable. */
  }

  function apply() {
    const theme =
      preference === 'system' ? (query.matches ? 'dark' : 'light') : preference;
    root.dataset.appearance = preference;
    root.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#191a18' : '#f7f5ef');
    document.querySelectorAll('[data-appearance-select]').forEach((select) => {
      select.value = preference;
      select.disabled = false;
    });
  }
  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  document.addEventListener('change', (event) => {
    const select = event.target;
    if (
      !(select instanceof HTMLSelectElement) ||
      !select.matches('[data-appearance-select]')
    )
      return;
    preference = normalize(select.value);
    try {
      window.localStorage.setItem(key, preference);
    } catch {
      /* The current page still responds. */
    }
    apply();
  });
  query.addEventListener('change', () => {
    if (preference === 'system') apply();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      preference = normalize(event.newValue);
      apply();
    }
  });
})();
