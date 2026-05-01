// ─────────────────────────────────────────────────────────
// THEME MODULE
// Manages dark/light toggle. Exports isLight() so other
// modules (canvas) can read the current theme at paint time.
// ─────────────────────────────────────────────────────────

const html = document.documentElement;
const btn  = document.getElementById('themeToggle');

let _light = false;

function applyTheme(light) {
  _light = light;
  html.classList.toggle('light', light);

  const label = light ? 'Switch to dark mode' : 'Switch to light mode';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('aria-pressed', String(light));
}

export function isLight() {
  return _light;
}

export function initTheme() {
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'light');

  btn.addEventListener('click', () => {
    const next = !_light;
    applyTheme(next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  });
}
