// ─────────────────────────────────────────────────────────
// PARTICLE CANVAS MODULE
// Reads theme CSS vars at paint time so colors update
// instantly when the theme toggle fires — no extra callback.
// Shooting stars spawn on light → dark (see theme.js).
// ─────────────────────────────────────────────────────────

import { THEME_TO_DARK } from './theme.js';

const PARTICLE_COUNT = 120;
const MAX_DIST       = 120;
const MOUSE_DIST     = 180;

export function initParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;
  let particles = [];
  let shootingStars = [];
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

  class ShootingStar {
    constructor() {
      if (Math.random() < 0.5) {
        this.x = Math.random() * W;
        this.y = -12;
      } else {
        this.x = W + 12;
        this.y = Math.random() * H * 0.45;
      }
      const angle = Math.PI * 0.58 + Math.random() * 0.22;
      const speed = 14 + Math.random() * 8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.tail = 70 + Math.random() * 50;
      this.life = 0;
      this.maxLife = 45 + Math.random() * 25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life += 1;
      return this.life < this.maxLife;
    }

    draw() {
      const lineRgb = cssVar('--particle-line-rgb') || '0, 200, 220';
      const t = this.life / this.maxLife;
      const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;

      const tailX = this.x - (this.vx / 15) * this.tail;
      const tailY = this.y - (this.vy / 15) * this.tail;
      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      grad.addColorStop(0, `rgba(${lineRgb}, ${alpha * 0.95})`);
      grad.addColorStop(0.4, `rgba(${lineRgb}, ${alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${lineRgb}, 0)`);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
      ctx.fill();
    }
  }

  function spawnShootingStars() {
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      shootingStars.push(new ShootingStar());
    }
  }

  spawnParticles();

  document.addEventListener(THEME_TO_DARK, spawnShootingStars);

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
    shootingStars = shootingStars.filter(s => s.update());
    shootingStars.forEach(s => s.draw());
    requestAnimationFrame(loop);
  }

  loop();
}
