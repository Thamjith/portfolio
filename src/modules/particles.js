// ─────────────────────────────────────────────────────────
// PARTICLE CANVAS MODULE
// Reads theme CSS vars at paint time so colors update
// instantly when the theme toggle fires — no extra callback.
// ─────────────────────────────────────────────────────────

const PARTICLE_COUNT = 120;
const MAX_DIST       = 120;
const MOUSE_DIST     = 180;

export function initParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;
  let particles = [];
  let mouseX, mouseY;

  // ── Resize ─────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    mouseX = W / 2;
    mouseY = H / 2;
  }

  resize();
  window.addEventListener('resize', () => { resize(); spawnParticles(); });

  // ── Read CSS vars for theme-aware colors ───────────────
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // ── Particle class ─────────────────────────────────────
  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.35;
      this.vy    = (Math.random() - 0.5) * 0.35;
      this.r     = Math.random() * 1.5 + 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.hue   = Math.random() > 0.7 ? 270 : 195;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }

    draw() {
      const lightness = cssVar('--particle-lightness') || '70%';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, ${lightness}, ${this.alpha})`;
      ctx.fill();
    }
  }

  function spawnParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  spawnParticles();

  // ── Mouse tracking ─────────────────────────────────────
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // ── Draw particle network connections ──────────────────
  function drawConnections() {
    const lineRgb    = cssVar('--particle-line-rgb')    || '0, 200, 220';
    const mouseRgb   = cssVar('--particle-mouse-rgb')   || '0, 220, 200';
    const lineAlpha  = parseFloat(cssVar('--particle-line-alpha'))  || 0.15;
    const mouseAlpha = parseFloat(cssVar('--particle-mouse-alpha')) || 0.4;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Particle-to-particle lines
      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const a = (1 - d / MAX_DIST) * lineAlpha;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${lineRgb}, ${a})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }

      // Particle-to-mouse lines
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_DIST) {
        const a = (1 - d / MOUSE_DIST) * mouseAlpha;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(${mouseRgb}, ${a})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  // ── Animation loop ──────────────────────────────────────
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }

  loop();
}
