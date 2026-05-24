// ─────────────────────────────────────────────────────────
// HDR MODULE
// Detects dynamic-range: high support, shows a toggle button
// if the display qualifies, and applies html.hdr class.
// Enabled by default on HDR-capable displays.
// ─────────────────────────────────────────────────────────

const html = document.documentElement;
let _enabled = false;

function apply(btn, on) {
  _enabled = on;
  if (on) {
    html.classList.add('hdr');
  } else {
    html.classList.remove('hdr');
  }
  btn.dataset.hdr = on ? 'on' : 'off';
  btn.setAttribute('aria-pressed', String(on));
  btn.setAttribute('aria-label', on ? 'Disable HDR mode' : 'Enable HDR mode');
}

export function initHDR() {
  const mq = window.matchMedia('(dynamic-range: high)');
  if (!mq.matches) return;

  const btn = document.getElementById('hdrToggle');
  if (!btn) return;

  btn.hidden = false;

  const saved = localStorage.getItem('hdr');
  apply(btn, saved === null ? true : saved === 'true');

  btn.addEventListener('click', () => {
    const next = !_enabled;
    apply(btn, next);
    localStorage.setItem('hdr', String(next));
  });

  mq.addEventListener('change', (e) => {
    if (!e.matches) {
      apply(btn, false);
      btn.hidden = true;
    } else {
      btn.hidden = false;
      const s = localStorage.getItem('hdr');
      apply(btn, s === null ? true : s === 'true');
    }
  });
}
