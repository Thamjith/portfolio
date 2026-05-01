// ─────────────────────────────────────────────────────────
// On hover, swap date-range text with computed tenure
// (years + months, or months only if under one year).
// ─────────────────────────────────────────────────────────

function parseMonthStart(iso) {
  const [y, m] = iso.split('-').map(Number);
  return new Date(y, m - 1, 1);
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function monthsInRange(start, end) {
  const m =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  return Math.max(0, m);
}

function formatTenure(totalMonths) {
  if (totalMonths < 12) {
    return totalMonths === 1 ? '1 month' : `${totalMonths} months`;
  }
  const y = Math.floor(totalMonths / 12);
  const mo = totalMonths % 12;
  if (mo === 0) return y === 1 ? '1 year' : `${y} years`;
  const yPart = y === 1 ? '1 year' : `${y} years`;
  const mPart = mo === 1 ? '1 month' : `${mo} months`;
  return `${yPart}, ${mPart}`;
}

function tenureMonthsFromEl(el) {
  const withDt = [...el.querySelectorAll('time')].filter(t =>
    t.getAttribute('datetime')
  );
  if (!withDt.length) return null;

  const start = parseMonthStart(withDt[0].getAttribute('datetime'));

  let end;
  if (withDt.length >= 2) {
    end = parseMonthStart(withDt[1].getAttribute('datetime'));
  } else if (/present/i.test(el.textContent)) {
    end = startOfMonth(new Date());
  } else {
    return null;
  }

  return monthsInRange(start, end);
}

export function initExpDurationHover() {
  const root = document.getElementById('experience');
  if (!root) return;

  const targets = root.querySelectorAll('.exp-role-span, .exp-period');

  targets.forEach(el => {
    const months = tenureMonthsFromEl(el);
    if (months == null) return;

    el.classList.add('exp-duration-hover');
    const original = el.innerHTML;
    const label = formatTenure(months);

    el.addEventListener('mouseenter', () => {
      el.textContent = label;
    });
    el.addEventListener('mouseleave', () => {
      el.innerHTML = original;
    });
  });
}
