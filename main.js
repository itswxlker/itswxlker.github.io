// Shared behavior. Each part checks that its elements exist first.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Interactive name on the home page: letters near the cursor lift, tilt, and turn yellow.
const nameEl = document.getElementById('name');
if (nameEl) {
  const letters = [];
  nameEl.querySelectorAll('.line').forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    for (const c of text) {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      s.setAttribute('aria-hidden', 'true');
      line.appendChild(s);
      letters.push({ el: s, y: 0, r: 0, ty: 0, tr: 0 });
    }
  });
  if (!reduceMotion) {
    let px = -9999, py = -9999, running = false;
    const tick = () => {
      let moving = false;
      for (const L of letters) {
        const b = L.el.getBoundingClientRect();
        const dx = px - (b.left + b.width / 2), dy = py - (b.top + b.height / 2);
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
        L.ty = -f * f * 34;
        L.tr = f * Math.max(-14, Math.min(14, dx / 14));
        L.y += (L.ty - L.y) * 0.18;
        L.r += (L.tr - L.r) * 0.18;
        L.el.style.transform = `translateY(${L.y.toFixed(2)}px) rotate(${L.r.toFixed(2)}deg)`;
        L.el.classList.toggle('hot', f > 0.55);
        if (Math.abs(L.ty - L.y) > 0.05 || Math.abs(L.tr - L.r) > 0.05) moving = true;
      }
      running = moving;
      if (moving) requestAnimationFrame(tick);
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
    addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; kick(); }, { passive: true });
    nameEl.addEventListener('pointerleave', () => { px = py = -9999; kick(); });
    // On touch screens, a tap sends a quick ripple through the letters.
    nameEl.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      px = e.clientX; py = e.clientY; kick();
      setTimeout(() => { px = py = -9999; kick(); }, 450);
    });
  }
}

// Copy-email button on the contact page.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = 'Copied';
    } catch {
      const target = document.querySelector(btn.dataset.copyTarget);
      if (target) window.getSelection().selectAllChildren(target);
      btn.textContent = 'Press Ctrl or Cmd + C';
    }
    setTimeout(() => { btn.textContent = label; }, 1800);
  });
});

// Footer year.
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// "Make larger" buttons on writing sample boxes.
document.querySelectorAll('[data-expand]').forEach((btn) => {
  const box = btn.closest('.doc-box');
  btn.addEventListener('click', () => {
    const big = box.classList.toggle('big');
    btn.textContent = big ? 'Make smaller' : 'Make larger';
    btn.setAttribute('aria-expanded', big);
    box.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
});