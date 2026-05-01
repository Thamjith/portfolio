// ─────────────────────────────────────────────────────────
// TYPEWRITER MODULE
// Cycles through roles in the hero subtitle.
// aria-live="polite" on the element ensures screen readers
// announce updates without interrupting current speech.
// ─────────────────────────────────────────────────────────

const WORDS    = ['Frontend Dev', 'React Expert', 'TypeScript Fan', 'IBM Tech Lead'];
const TYPE_MS  = 80;
const DEL_MS   = 45;
const PAUSE_MS = 1800;
const GAP_MS   = 300;

export function initTypewriter() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show a static label instead of animating
    const el = document.getElementById('typed');
    if (el) el.textContent = WORDS[0];
    return;
  }

  const el = document.getElementById('typed');
  if (!el) return;

  let wi  = 0;
  let ci  = 0;
  let del = false;

  function tick() {
    const word = WORDS[wi];

    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        del = true;
        setTimeout(tick, PAUSE_MS);
        return;
      }
      setTimeout(tick, TYPE_MS);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        del = false;
        wi  = (wi + 1) % WORDS.length;
        setTimeout(tick, GAP_MS);
        return;
      }
      setTimeout(tick, DEL_MS);
    }
  }

  setTimeout(tick, 1500);
}
