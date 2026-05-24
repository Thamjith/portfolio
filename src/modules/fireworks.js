import { confetti } from '@tsparticles/confetti';

const SECRET = 'firework';

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

async function launchFireworks() {
  const duration = 3000;
  const end = Date.now() + duration;

  async function burst() {
    await confetti({
      count: 60,
      angle: 90,
      spread: 360,
      startVelocity: randomInRange(30, 50),
      decay: 0.93,
      gravity: 0.4,
      scalar: randomInRange(0.8, 1.4),
      ticks: 300,
      position: {
        x: randomInRange(20, 80),
        y: randomInRange(10, 50),
      },
    });

    if (Date.now() < end) {
      setTimeout(burst, 400);
    }
  }

  burst();
}

export function initFireworksTrigger() {
  let buffer = '';

  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);
    if (buffer === SECRET) {
      buffer = '';
      launchFireworks();
    }
  });
}
