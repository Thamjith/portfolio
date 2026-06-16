import './styles/main.scss';

import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { initTheme } from './modules/theme.js';
import { initCursor } from './modules/cursor.js';
import { initParticles } from './modules/particles.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';

initTheme();
initCursor();
initParticles();
initNav();
initReveal();

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

inject();
injectSpeedInsights();
