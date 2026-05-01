// ─────────────────────────────────────────────────────────
// ENTRY POINT
// Import SCSS first (Vite handles compilation), then init
// all feature modules.
// ─────────────────────────────────────────────────────────

import './styles/main.scss';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { initTheme }       from './modules/theme.js';
import { initCursor }      from './modules/cursor.js';
import { initParticles }   from './modules/particles.js';
import { initNav }         from './modules/nav.js';
import { initTypewriter }  from './modules/typewriter.js';
import { initReveal }      from './modules/reveal.js';
import { initTilt }        from './modules/tilt.js';
import { initSkillStagger } from './modules/skillStagger.js';
import { initExpDurationHover } from './modules/expDurationHover.js';

/** First role started Feb 2020. Whole months elapsed; if remainder > 6 months, count rounds up. */
function experienceYearCount(now = new Date()) {
  const start = new Date(2020, 1, 1);
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);
  const fullYears = Math.floor(months / 12);
  const remainderMonths = months % 12;
  return remainderMonths > 6 ? fullYears + 1 : fullYears;
}

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

const expYears = experienceYearCount();
const statExp = document.getElementById('stat-exp-years');
if (statExp) {
  statExp.textContent = `${expYears}+`;
  statExp.setAttribute('aria-label', `${expYears} plus years`);
}
const aboutExp = document.getElementById('about-exp-years');
if (aboutExp) aboutExp.textContent = `${expYears}+`;

// Enable Vercel Analytics only for production builds.
if (import.meta.env.PROD) {
  inject();
  injectSpeedInsights();
}

// Theme must initialise first (sets html.light before paint)
initTheme();

// Visual effects
initCursor();
initParticles();

// UI interactions
initNav();
initTypewriter();
initReveal();
initTilt();
initSkillStagger();
initExpDurationHover();
