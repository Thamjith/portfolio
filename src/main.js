// ─────────────────────────────────────────────────────────
// ENTRY POINT
// Import SCSS first (Vite handles compilation), then init
// all feature modules.
// ─────────────────────────────────────────────────────────

import './styles/main.scss';

import { initTheme }       from './modules/theme.js';
import { initCursor }      from './modules/cursor.js';
import { initParticles }   from './modules/particles.js';
import { initNav }         from './modules/nav.js';
import { initTypewriter }  from './modules/typewriter.js';
import { initReveal }      from './modules/reveal.js';
import { initTilt }        from './modules/tilt.js';
import { initSkillStagger } from './modules/skillStagger.js';

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
