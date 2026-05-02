/**
 * One-shot DevTools console easter egg (browser only).
 */
export function initConsoleEasterEgg() {
  if (typeof window === 'undefined') return;
  if (window.__portfolioConsoleEgg) return;
  window.__portfolioConsoleEgg = true;

  console.log("// you weren't supposed to find this.");
  console.log('// but since you did... hello, curious one.');

  const headlineStyle = 'color: #aaff00; font-size: 14px; font-weight: bold';
  console.log(
    "%c✦ You opened DevTools.\nMost people never look this deep.\nYou're already one of the weird ones. I like that.",
    headlineStyle
  );

  console.log(
    '%c⚠ CONFIDENTIAL INTERNAL MEMO ⚠',
    'color: #f5c842; font-size: 12px; font-weight: bold; letter-spacing: 2px'
  );

  const boxLine = 'color: #00ffee';
  console.log('%c╔════════════════════════════════════════════╗', boxLine);
  console.log('%c║  NOW HIRING: Senior Console Log Reader     ║', boxLine);
  console.log('%c║  Level: You (obviously)                   ║', boxLine);
  console.log('%c╚════════════════════════════════════════════╝', boxLine);

  console.log('✔ Must have opened DevTools in a production app');
  console.log("✔ Must know what you're looking at right now");
  console.log("✔ 3+ years of judging other people's code");
  console.log('✔ Can write a for loop without googling it*');

  console.log('★ Unlimited coffee (results may vary)');
  console.log('★ Flexible hours (core hours: always)');
  console.log('★ Free therapy after code reviews');

  const applyStyle = 'color: #aaff00';
  console.log(
    "%cApply: jithuthah8+fromtheguywholooksatotherpeoplesconsole@gmail.com\nSubject: 'I read the console. I am the one.'",
    applyStyle
  );

  console.log("*we will google it together, it's fine.");
  console.log(`P.S. it's ${new Date().toLocaleTimeString()}. Go touch grass.`);
}
