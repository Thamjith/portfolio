// ─────────────────────────────────────────────────────────
// THEME MODULE
// Three modes: 'dark' | 'light' | 'auto'
// Auto resolves to system preference (defaults to light).
// Exports isLight() so canvas modules can read paint-time state.
// ─────────────────────────────────────────────────────────

const html = document.documentElement;
const btn  = document.getElementById('themeToggle');

const MODES = ['dark', 'light', 'auto'];

const NEXT_LABEL = {
  dark:  'Switch to light mode',
  light: 'Switch to auto (system) mode',
  auto:  'Switch to dark mode',
};

export const THEME_TO_DARK = 'theme:to-dark';

let _mode = 'auto';
let _wasLight = null;

function systemPrefersLight() {
  return !window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyMode(mode) {
  _mode = mode;

  const light = mode === 'light' || (mode === 'auto' && systemPrefersLight());
  const enteringDark = _wasLight === true && !light;

  html.classList.toggle('light', light);

  if (enteringDark) {
    document.dispatchEvent(new CustomEvent(THEME_TO_DARK));
  }
  _wasLight = light;

  btn.dataset.mode = mode;
  btn.setAttribute('aria-label', NEXT_LABEL[mode]);
}

export function isLight() {
  return html.classList.contains('light');
}

export function initTheme() {
  const saved = localStorage.getItem('theme');
  applyMode(MODES.includes(saved) ? saved : 'light');

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (_mode === 'auto') applyMode('auto');
  });

  btn.addEventListener('click', () => {
    const next = MODES[(MODES.indexOf(_mode) + 1) % MODES.length];
    applyMode(next);
    localStorage.setItem('theme', next);
  });
}
