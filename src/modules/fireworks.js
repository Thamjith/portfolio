import { confetti } from '@tsparticles/confetti';

const SECRETS = {
	firework: launchFireworks,
	snow: launchSnow,
};

const MAX_SECRET_LEN = Math.max(...Object.keys(SECRETS).map((s) => s.length));

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

async function launchSnow() {
	const duration = 6000;
	const end = Date.now() + duration;
	let skew = 1;

	async function flurry() {
		const timeLeft = end - Date.now();
		const ticks = Math.max(200, 500 * (timeLeft / duration));
		skew = Math.max(0.8, skew - 0.001);

		await confetti({
			particleCount: 1,
			startVelocity: 0,
			ticks,
			origin: {
				x: Math.random(),
				y: Math.random() * skew - 0.2,
			},
			colors: ['#ffffff'],
			shapes: ['circle'],
			gravity: randomInRange(0.4, 0.6),
			scalar: randomInRange(0.4, 1),
			drift: randomInRange(-0.4, 0.4),
		});

		if (timeLeft > 0) {
			requestAnimationFrame(flurry);
		}
	}

	flurry();
}

export function initFireworksTrigger() {
	let buffer = '';

	window.addEventListener('keydown', (e) => {
		if (e.key.length !== 1) return;
		buffer = (buffer + e.key.toLowerCase()).slice(-MAX_SECRET_LEN);

		for (const [secret, action] of Object.entries(SECRETS)) {
			if (buffer.endsWith(secret)) {
				buffer = '';
				action();
				break;
			}
		}
	});
}
