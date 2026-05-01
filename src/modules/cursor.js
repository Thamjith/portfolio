// ─────────────────────────────────────────────────────────
// CUSTOM CURSOR MODULE
// Skipped entirely on coarse-pointer (touch) devices.
// ─────────────────────────────────────────────────────────

export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('cursor');
  const dot    = cursor.querySelector('.cursor-dot');
  const ring   = cursor.querySelector('.cursor-ring');

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    // Ring lags behind with lerp
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(animate);
  }

  animate();

  // Expand ring on interactive elements
  const targets = 'a, button, .skill-tag, .exp-card, .stat-card';
  document.querySelectorAll(targets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}
