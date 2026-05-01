// ─────────────────────────────────────────────────────────
// SKILL TAG STAGGER MODULE
// Tags start hidden and cascade-fade in when #skills
// enters the viewport.
// ─────────────────────────────────────────────────────────

export function initSkillStagger() {
  const tags     = document.querySelectorAll('.skill-tag');
  const section  = document.getElementById('skills');

  if (!section || tags.length === 0) return;

  // Reduced-motion: show immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tags.forEach(tag => {
      tag.style.opacity   = '1';
      tag.style.transform = 'none';
    });
    return;
  }

  // Set initial hidden state
  tags.forEach((tag, i) => {
    tag.style.opacity          = '0';
    tag.style.transform        = 'translateY(16px)';
    tag.style.transitionDelay  = `${i * 40}ms`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tags.forEach(tag => {
          tag.style.opacity    = '1';
          tag.style.transform  = 'translateY(0)';
          tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease';
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  obs.observe(section);
}
