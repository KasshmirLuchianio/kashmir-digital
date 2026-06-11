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
  function raf(t) { lenis.raf(t); scrubs.forEach((s) => s.update()); requestAnimationFrame(raf); }
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

  /* marquee */
  (function marquee() {
    const items = ['Website-uri Premium', 'Agenți AI', 'Voice Agents', 'High-Conversion Ads', 'SEO & Copywriting', 'Audio Branding', 'Visual Assets'];
    const html = items.map((t) => '<span class="marquee-item">' + t + '<em>✦</em></span>').join('');
    document.getElementById('mqA').innerHTML = html;
    document.getElementById('mqB').innerHTML = html;
  })();

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
    const hov = 'a, button, .svc-row, .faq-q, .pg-item, input, select, textarea';
    document.addEventListener('mouseover', (e) => { if (e.target.closest(hov)) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout', (e) => { if (e.target.closest(hov)) document.body.classList.remove('cursor-hover'); });
  })();

  /* phantom gallery */
  (function gallery() {
    const stage = document.getElementById('pgStage');
    const plane = document.getElementById('pgPlane');
    if (!stage || !window.PG_ITEMS) return;
    const COLS = 4, GX = 42, GY = 40;
    const iw = isMobile ? 250 : 340, ih = isMobile ? 158 : 215;
    const cellW = iw + GX, cellH = ih + GY;
    const rows = Math.ceil(PG_ITEMS.length / COLS);
    const els = [];

    PG_ITEMS.forEach((it, i) => {
      const c = i % COLS, r = Math.floor(i / COLS);
      const x = (c - (COLS - 1) / 2) * cellW;
      const y = (r - (rows - 1) / 2) * cellH;
      const el = document.createElement('div');
      el.className = 'pg-item';
      el.style.cssText = 'left:' + (x - iw / 2) + 'px;top:' + (y - ih / 2) + 'px;width:' + iw + 'px;height:' + ih + 'px;';
      let inner = '';
      if (it.poster) inner += '<img src="' + it.poster + '" alt="" loading="lazy" draggable="false">';
      else inner += '<div class="pg-cover" style="background:linear-gradient(150deg,' + it.g[0] + ',' + it.g[1] + ');"><small>' + it.tag + '</small><b>' + it.title + '</b></div>';
      if (it.kind !== 'site') inner += '<div class="pg-play"></div>';
      if (it.poster) inner += '<div class="pg-meta"><b>' + it.title + '</b><span>' + it.tag + '</span></div>';
      el.innerHTML = inner;
      el.dataset.idx = i;
      plane.appendChild(el);
      els.push({ el, x, y });
    });

    const maxX = ((COLS - 1) / 2) * cellW, maxY = ((rows - 1) / 2) * cellH;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let dragging = false, moved = 0, sx = 0, sy = 0, ox = 0, oy = 0;

    stage.addEventListener('pointerdown', (e) => {
      dragging = true; moved = 0;
      sx = e.clientX; sy = e.clientY; ox = tx; oy = ty;
      stage.classList.add('grabbing');
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
      tx = Math.max(-maxX, Math.min(maxX, ox + dx));
      ty = Math.max(-maxY, Math.min(maxY, oy + dy));
    });
    stage.addEventListener('pointerup', (e) => {
      dragging = false;
      stage.classList.remove('grabbing');
      if (moved < 8) {
        const item = e.target.closest('.pg-item');
        if (item) openItem(PG_ITEMS[+item.dataset.idx]);
      }
    });
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      tx = Math.max(-maxX, Math.min(maxX, tx - e.deltaX * 0.8 - (e.shiftKey ? e.deltaY * 0.8 : 0)));
      ty = Math.max(-maxY, Math.min(maxY, ty - (e.shiftKey ? 0 : e.deltaY * 0.8)));
    }, { passive: false });

    function openItem(it) {
      if (it.kind === 'site' || it.kind === 'yt') { window.open(it.url, '_blank', 'noopener'); return; }
      const l = document.getElementById('pgLight');
      const v = document.getElementById('pglVideo');
      document.getElementById('pglTitle').textContent = it.title;
      v.src = it.src;
      l.classList.add('open');
      lenis.stop();
      v.play().catch(() => {});
    }

    (function tilt() {
      requestAnimationFrame(tilt);
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      plane.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      const w2 = stage.clientWidth / 2;
      for (const o of els) {
        const offX = (o.x + cx) / w2;
        const ry2 = Math.max(-1, Math.min(1, offX)) * -16;
        const tz = -Math.min(180, Math.abs(offX) * 160);
        o.el.style.transform = 'perspective(1200px) rotateY(' + ry2.toFixed(2) + 'deg) translateZ(' + tz.toFixed(1) + 'px)';
      }
    })();
  })();

  window.closeLight = function () {
    const l = document.getElementById('pgLight');
    const v = document.getElementById('pglVideo');
    v.pause(); v.removeAttribute('src'); v.load();
    l.classList.remove('open');
    lenis.start();
  };

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
    if (e.key === 'Escape') { window.closeContact(); window.closeLight(); }
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
