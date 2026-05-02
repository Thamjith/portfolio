// ─────────────────────────────────────────────────────────
// NAV MODULE
// Handles: scroll-glass effect, hamburger toggle,
// closing menu on outside-click / Escape / link-click.
// ─────────────────────────────────────────────────────────

export function initNav() {
  const nav         = document.getElementById('nav');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mainContent = document.getElementById('main-content');
  const footer      = document.querySelector('footer[role="contentinfo"]');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // ── Scroll → frosted-glass ─────────────────────────────
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── Hamburger toggle ───────────────────────────────────
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    // Keep keyboard / AT out of page content behind the overlay (native inert).
    if (mainContent) mainContent.inert = true;
    if (footer) footer.inert = true;
    mobileLinks[0]?.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    if (mainContent) mainContent.inert = false;
    if (footer) footer.inert = false;
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  // Close on any mobile nav link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (
      hamburger.getAttribute('aria-expanded') === 'true' &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });
}
