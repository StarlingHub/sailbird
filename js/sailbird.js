/**
 * FROiD Cooling Products — main.js
 * Handles: Navbar, Mobile Menu, Carousel, Product Sliders, FAQ, Scroll Reveal, Back-to-Top
 */

'use strict';

document.getElementById("cp-year").textContent = new Date().getFullYear();

/* ================================================================
   HELPERS
================================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ================================================================
   NAVBAR — scroll shadow + active link tracking
================================================================ */
function initNav() {
  const nav = $('#nav');
  if (!nav) return;

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active link on scroll
  const sectionIds = ['hero', 'products', 'how', 'features', 'why', 'about', 'faq', 'contact'];
  const navLinks = $$('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 110) current = id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

/* ================================================================
   MOBILE MENU
================================================================ */
function initMobileMenu() {
  const burger = $('#hamburger');
  const menu   = $('#mobileMenu');
  const close  = $('#mobClose');
  if (!burger || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);

  // Close when any link is clicked
  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

/* ================================================================
   GALLERY CAROUSEL
================================================================ */
function initGallery() {
  const track  = $('#carTrack');
  const dotsEl = $('#carDots');
  const prevBtn = $('#gPrev');
  const nextBtn = $('#gNext');
  if (!track) return;

  const images = $$('img', track);
  const total  = images.length;
  let current  = 0;
  let autoTimer;

  // Build dot buttons
  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'cdot' + (i === 0 ? ' on' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => go(i));
    dotsEl.appendChild(dot);
  });

  function go(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    $$('.cdot', dotsEl).forEach((d, j) => {
      d.classList.toggle('on', j === current);
      d.setAttribute('aria-selected', j === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => go(current + 1), 4800);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn?.addEventListener('click', () => { go(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { go(current + 1); startAuto(); });

  // Touch/swipe
  let touchStartX = 0;
  track.parentElement.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });
  track.parentElement.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) go(current + (delta > 0 ? 1 : -1));
    startAuto();
  }, { passive: true });

  // Keyboard navigation
  track.parentElement.setAttribute('tabindex', '0');
  track.parentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { go(current + 1); startAuto(); }
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);

  startAuto();
}

/* ================================================================
   PRODUCT IMAGE SLIDERS (per product card)
================================================================ */
function initProductSliders() {
  $$('.pimg').forEach(wrap => {
    const slider = wrap.querySelector('.psl');
    const images = $$('img', slider);
    const dotsWrap = wrap.querySelector('.pdots');
    const total = images.length;
    let current = 0;

    // Build dots
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'pdot' + (i === 0 ? ' on' : '');
      dot.setAttribute('aria-label', `Product image ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    });

    function go(index) {
      current = ((index % total) + total) % total;
      slider.style.transform = `translateX(-${current * 100}%)`;
      $$('.pdot', dotsWrap).forEach((d, j) => d.classList.toggle('on', j === current));
    }

    // Arrow buttons
    const prev = wrap.querySelector('.pprev');
    const next = wrap.querySelector('.pnext');
    prev?.addEventListener('click', () => go(current - 1));
    next?.addEventListener('click', () => go(current + 1));

    // Touch/swipe
    let touchStartX = 0;
    wrap.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    wrap.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 30) go(current + (delta > 0 ? 1 : -1));
    }, { passive: true });
  });
}

/* ================================================================
   FAQ ACCORDION
================================================================ */
function initFAQ() {
  $$('.fq').forEach(btn => {
    btn.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      // Close all
      $$('.fq').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const answer = document.getElementById(b.getAttribute('aria-controls'));
        if (answer) answer.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
        const answer = document.getElementById(this.getAttribute('aria-controls'));
        if (answer) answer.classList.add('open');
      }
    });
  });
}

/* ================================================================
   SCROLL REVEAL — IntersectionObserver
================================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.rv').forEach(el => observer.observe(el));
}

/* ================================================================
   BACK TO TOP BUTTON
================================================================ */
function initBackToTop() {
  const btn = $('#btt');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================================
   SMOOTH ANCHOR SCROLL (offset for sticky nav)
================================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('nav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });
}

/* ================================================================
   INIT — run all modules when DOM is ready
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initGallery();
  initProductSliders();
  initFAQ();
  initScrollReveal();
  initBackToTop();
  initSmoothScroll();
});

