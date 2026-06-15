/* ============================================================
   KASHMIR DIGITAL — scroll-cinematic engine
   Canvas frame-sequence scrub + Lenis + reveals + counters
   + phantom gallery + FAQ + contact modal + cursor
   ============================================================ */

/* ---------- frame scrub ---------- */
function initScrub(cfg) {
  const section = document.querySelector(cfg.section);
  const canvas = section.querySelector('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const lines = [...section.querySelectorAll('.reveal-line')];
  const fill = section.querySelector('.progress-fill');
  const bgFill = cfg.bg || '#04070f';
  const images = [];

  /* fade overlays: fade-to-black at end, optional fade-from-black at start */
  function makeFade(startOpacity) {
    const el = document.createElement('div');
    el.className = 'section-end-fade';
    el.style.opacity = startOpacity;
    if (cfg.transitionText) {
      const txt = document.createElement('span');
      txt.className = 'transition-text';
      txt.textContent = cfg.transitionText;
      el.appendChild(txt);
    }
    section.querySelector('.sticky').appendChild(el);
    return el;
  }
  const endFade = makeFade('0');
  const startFade = cfg.fadeIn ? makeFade('1') : null;
  let loaded = 0, firstDrawn = false;

  for (let i = 0; i < cfg.frameCount; i++) {
    const img = new Image();
    img.src = cfg.framePath(i + 1);
    img.onload = () => {
      loaded++;
      if (cfg.onProgress) cfg.onProgress(loaded / cfg.frameCount);
      if (!firstDrawn) { firstDrawn = true; draw(0); }
    };
    img.onerror = () => { loaded++; if (cfg.onProgress) cfg.onProgress(loaded / cfg.frameCount); };
    images[i] = img;
  }

  let current = -1;
  function draw(index) {
    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let dw, dh, dx, dy;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
    else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(current < 0 ? 0 : current);
  }
  function update() {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;
    const scrollable = rect.height - window.innerHeight;
    const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const idx = Math.min(cfg.frameCount - 1, Math.floor(p * (cfg.frameCount - 1)));
    if (idx !== current) { current = idx; draw(idx); }
    if (fill) fill.style.width = (p * 100).toFixed(2) + '%';
    endFade.style.opacity = Math.max(0, (p - 0.94) / 0.06).toFixed(3);
    if (startFade) startFade.style.opacity = Math.max(0, 1 - p / 0.05).toFixed(3);
    for (const el of lines) {
      const a = parseFloat(el.dataset.in), b = parseFloat(el.dataset.out);
      const mid = (a + b) / 2, half = Math.max((b - a) / 2, 0.001);
      let o = 1 - Math.abs(p - mid) / half;
      o = Math.max(0, Math.min(1, o * 1.6));
      el.style.opacity = o.toFixed(3);
      el.style.transform = 'translateY(' + ((1 - o) * 34).toFixed(1) + 'px)';
      el.classList.toggle('faded-out', o < 0.4);
    }
  }
  window.addEventListener('resize', resize);
  resize();
  return { update, resize };
}

/* ---------- count-up ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
  const dur = 1500, t0 = performance.now();
  function step(t) {
    const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);

  /* loader driven by hero frame preload */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('#loader .loader-bar i');
  const loaderPct = document.getElementById('loaderPct');
  let loaderDone = false;
  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
  }
  setTimeout(finishLoader, 6000);

  const heroCfg = (window.SCRUB_SECTIONS || [])[0];
  if (heroCfg) {
    heroCfg.onProgress = (k) => {
      const pct = Math.round(k * 100);
      if (loaderFill) loaderFill.style.width = pct + '%';
      if (loaderPct) loaderPct.textContent = String(pct).padStart(2, '0') + '%';
      if (k >= 0.55) finishLoader();
    };
  }

  const scrubs = (window.SCRUB_SECTIONS || [])
    .filter((c) => document.querySelector(c.section))
    .map(initScrub);

  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  window.__lenis = lenis;
  let pfUpdate = null;
  function raf(t) { lenis.raf(t); scrubs.forEach((s) => s.update()); if (pfUpdate) pfUpdate(); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  /* reveals + counters */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.classList.contains('stat-num')) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal, .stat-num').forEach((el) => io.observe(el));

  /* scroll hint + navbar */
  const nav = document.getElementById('navbar');
  let lastY = 0;
  lenis.on('scroll', ({ scroll }) => {
    document.querySelectorAll('.scroll-hint').forEach((h) => (h.style.opacity = scroll > 60 ? '0' : '1'));
    nav.classList.toggle('scrolled', scroll > 60);
    if (scroll > 500 && scroll > lastY + 6) nav.classList.add('hidden');
    else if (scroll < lastY - 6 || scroll < 500) nav.classList.remove('hidden');
    lastY = scroll;
  });

  /* anchors via lenis */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); lenis.scrollTo(target, { duration: 1.4 }); }
    });
  });

  /* mobile menu */
  const burger = document.getElementById('navBurger');
  const mMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    mMenu.classList.toggle('open');
    burger.classList.toggle('active');
    const open = mMenu.classList.contains('open');
    document.body.style.overflow = open ? 'hidden' : '';
    open ? lenis.stop() : lenis.start();
  });
  window.closeMobile = function () {
    mMenu.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
    lenis.start();
  };

  /* custom cursor */
  (function cursor() {
    if (isMobile) return;
    const dot = document.getElementById('cDot');
    const ring = document.getElementById('cRing');
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    const hov = 'a, button, .svc-row, .faq-q, .pf-card, input, select, textarea';
    document.addEventListener('mouseover', (e) => { if (e.target.closest(hov)) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout', (e) => { if (e.target.closest(hov)) document.body.classList.remove('cursor-hover'); });
  })();

  /* portfolio — 3D sticky stack (cards scale down as the next slides over) */
  (function pfStack() {
    const cards = Array.from(document.querySelectorAll('.pf-card'));
    if (!cards.length) return;
    cards.forEach((c, i) => { c.style.top = (96 + i * 26) + 'px'; c.style.zIndex = String(i + 1); });
    let wasDesktop = false;
    pfUpdate = function () {
      if (window.innerWidth < 900) {
        if (wasDesktop) { cards.forEach((c) => { c.style.transform = ''; c.style.opacity = ''; c.style.filter = ''; }); wasDesktop = false; }
        return;
      }
      wasDesktop = true;
      const vh = window.innerHeight;
      for (let i = 0; i < cards.length - 1; i++) {
        const next = cards[i + 1].getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh - next.top) / (vh - 130)));
        cards[i].style.transform = 'scale(' + (1 - p * 0.06).toFixed(4) + ')';
        cards[i].style.opacity = (1 - p * 0.45).toFixed(3);
        cards[i].style.filter = 'blur(' + (p * 2).toFixed(2) + 'px)';
      }
      const last = cards[cards.length - 1];
      last.style.transform = ''; last.style.opacity = ''; last.style.filter = '';
    };
  })();

  /* FAQ */
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const ans = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((o) => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* contact modal */
  window.openContact = function () {
    document.getElementById('contact-form-wrap').style.display = 'flex';
    lenis.stop();
  };
  window.closeContact = function () {
    document.getElementById('contact-form-wrap').style.display = 'none';
    lenis.start();
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { window.closeContact(); }
  });
  window.sendContactForm = function (e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('contact-status');
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Se trimite...';
    btn.disabled = true;
    status.style.display = 'block';
    status.textContent = '';
    fetch('https://formsubmit.co/ajax/vladgrigorov1@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          status.style.color = '#4ade80';
          status.textContent = 'Mesajul a fost trimis cu succes!';
          form.reset();
          setTimeout(window.closeContact, 2500);
        } else {
          status.style.color = '#ff6b6b';
          status.textContent = 'Eroare la trimitere. Încearcă din nou.';
        }
      })
      .catch(() => {
        status.style.color = '#ff6b6b';
        status.textContent = 'Eroare de rețea. Încearcă din nou.';
      })
      .finally(() => {
        btn.textContent = origText;
        btn.disabled = false;
      });
  };
});
