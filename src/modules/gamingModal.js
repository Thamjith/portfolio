// ─────────────────────────────────────────────────────────
// GAMING MODAL MODULE
// Opens a modal with Steam and PlayStation profile links.
// ─────────────────────────────────────────────────────────

export function initGamingModal() {
  const btn      = document.getElementById('gaming-btn');
  const modal    = document.getElementById('gaming-modal');
  if (!btn || !modal) return;

  const closeBtn  = modal.querySelector('.gaming-modal__close');
  const backdrop  = modal.querySelector('.gaming-modal__backdrop');
  const mainContent = document.getElementById('main-content');
  const footer    = document.querySelector('footer[role="contentinfo"]');
  const nav       = document.getElementById('nav');

  function open() {
    modal.removeAttribute('aria-hidden');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (mainContent) mainContent.inert = true;
    if (footer) footer.inert = true;
    if (nav) nav.inert = true;
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (mainContent) mainContent.inert = false;
    if (footer) footer.inert = false;
    if (nav) nav.inert = false;
    document.removeEventListener('keydown', onKeydown);
    btn.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'Tab') trapFocus(e);
  }

  function trapFocus(e) {
    const focusable = Array.from(
      modal.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.closest('[inert]'));

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
}
