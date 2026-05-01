// ─────────────────────────────────────────────────────────
// SCROLL REVEAL MODULE
// Uses IntersectionObserver to add .visible to .reveal
// and .timeline-item elements as they enter the viewport.
// Falls back to immediate visibility for reduced-motion.
// ─────────────────────────────────────────────────────────

export function initReveal() {
  const reveals   = document.querySelectorAll('.reveal');
  const timeItems = document.querySelectorAll('.timeline-item');
  const all       = [...reveals, ...timeItems];

  // Reduced-motion: skip animation, show everything now
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    all.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1 }
  );

  all.forEach(el => observer.observe(el));
}
