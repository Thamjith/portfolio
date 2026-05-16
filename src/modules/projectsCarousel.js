// ─────────────────────────────────────────────────────────
// PROJECTS CAROUSEL
// Wraps from last slide to first. Touch swipe + keyboard.
// ─────────────────────────────────────────────────────────

export function initProjectsCarousel() {
  const root = document.getElementById('projects-carousel');
  if (!root) return;

  const track = root.querySelector('.projects-carousel__track');
  const slides = [...root.querySelectorAll('.projects-carousel__slide')];
  const prevBtn = root.querySelector('.projects-carousel__btn--prev');
  const nextBtn = root.querySelector('.projects-carousel__btn--next');
  const dots = [...root.querySelectorAll('.projects-carousel__dot')];
  const counterCurrent = root.querySelector('.projects-carousel__counter-current');
  const counterTotal = root.querySelector('.projects-carousel__counter-total');

  const total = slides.length;
  if (total < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let touchStartX = 0;
  let touchDeltaX = 0;

  if (counterTotal) counterTotal.textContent = String(total).padStart(2, '0');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function setIndex(next, { animate = true } = {}) {
    index = ((next % total) + total) % total;

    track.style.transition =
      reducedMotion || !animate ? 'none' : 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

    slides.forEach((slide, i) => {
      const active = i === index;
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.classList.toggle('is-active', active);
    });

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.classList.toggle('is-active', active);
    });

    if (counterCurrent) counterCurrent.textContent = pad(index + 1);

    slides.forEach((slide, i) => {
      const name = slide.getAttribute('aria-label')?.split(': ').pop() ?? `Project ${i + 1}`;
      slide.setAttribute('aria-label', `${i + 1} of ${total}: ${name}`);
    });
  }

  function step(delta) {
    setIndex(index + delta);
  }

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setIndex(i));
  });

  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
  });

  const viewport = root.querySelector('.projects-carousel__viewport');
  viewport?.addEventListener(
    'touchstart',
    e => {
      touchStartX = e.changedTouches[0].clientX;
      touchDeltaX = 0;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    'touchmove',
    e => {
      touchDeltaX = e.changedTouches[0].clientX - touchStartX;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    'touchend',
    () => {
      if (Math.abs(touchDeltaX) < 48) return;
      step(touchDeltaX < 0 ? 1 : -1);
    },
    { passive: true }
  );

  setIndex(0, { animate: false });
}
