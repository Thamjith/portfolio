// ─────────────────────────────────────────────────────────
// TYPEWRITER MODULE
// Cycles through roles in the hero subtitle.
// Phrases live in #typed-words-source (index.html) so browser translators
// can rewrite them; a MutationObserver picks up updates and refreshes.
// aria-live="polite" on #typed announces updates for screen readers.
// ─────────────────────────────────────────────────────────

const FALLBACK_WORDS = ['Frontend Dev', 'React Expert', 'TypeScript Fan', 'IBM Tech Lead'];

const TYPE_MS  = 80;
const DEL_MS   = 45;
const PAUSE_MS = 1800;
const GAP_MS   = 300;

function collectWords() {
  const root = document.getElementById('typed-words-source');
  if (!root) return FALLBACK_WORDS.slice();
  const nodes = root.querySelectorAll('[data-typewriter-word]');
  const words = [...nodes]
    .map((n) => n.textContent.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return words.length ? words : FALLBACK_WORDS.slice();
}

function wordsFingerprint(words) {
  return words.join('\u0001');
}

export function initTypewriter() {
  const el = document.getElementById('typed');
  if (!el) return;

  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let words = collectWords();
  let wi = 0;
  let ci = 0;
  let del = false;
  let timer = null;

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function schedule(fn, ms) {
    clearTimer();
    timer = window.setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  }

  function applyReducedMotion() {
    clearTimer();
    el.textContent = words[0] ?? FALLBACK_WORDS[0];
  }

  function tick() {
    const word = words[wi];

    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        del = true;
        schedule(tick, PAUSE_MS);
        return;
      }
      schedule(tick, TYPE_MS);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
        schedule(tick, GAP_MS);
        return;
      }
      schedule(tick, DEL_MS);
    }
  }

  function startAnimatedLoop(initialDelayMs) {
    clearTimer();
    wi = 0;
    ci = 0;
    del = false;
    el.textContent = '';
    schedule(tick, initialDelayMs);
  }

  function refreshWordsFromDom(options = {}) {
    const { resumeDelayMs = GAP_MS } = options;
    const next = collectWords();
    if (wordsFingerprint(next) === wordsFingerprint(words)) return;

    words = next;

    if (prefersReduced) {
      applyReducedMotion();
      return;
    }

    clearTimer();
    el.textContent = '';
    schedule(tick, resumeDelayMs);
  }

  const sourceRoot = document.getElementById('typed-words-source');
  if (sourceRoot) {
    let debounceT = null;
    const mo = new MutationObserver(() => {
      if (debounceT !== null) window.clearTimeout(debounceT);
      debounceT = window.setTimeout(() => {
        debounceT = null;
        refreshWordsFromDom({ resumeDelayMs: 400 });
      }, 350);
    });
    mo.observe(sourceRoot, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  if (prefersReduced) {
    applyReducedMotion();
    return;
  }

  startAnimatedLoop(1500);
}
