/* Portfolio interactions: theme toggle, mobile nav, scroll-spy, scroll reveal, copy email.
   No dependencies. The page is fully readable if this file never loads. */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.site-header');

  /* ---------- Theme ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const activeTheme = () => root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');

  const labelThemeToggle = () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-label', `Switch to ${next} theme`);
  };

  themeToggle?.addEventListener('click', () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Storage blocked: the theme still applies for this visit. */
    }
    labelThemeToggle();
  });
  prefersDark.addEventListener('change', labelThemeToggle);
  labelThemeToggle();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const isNavOpen = () => header?.classList.contains('nav-open');

  const setNavOpen = (open) => {
    if (!header || !navToggle) return;
    header.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  navToggle?.addEventListener('click', () => setNavOpen(!isNavOpen()));
  navLinks?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setNavOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (isNavOpen() && !header.contains(event.target)) setNavOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isNavOpen()) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
  window.matchMedia('(min-width: 56rem)').addEventListener('change', (event) => {
    if (event.matches) setNavOpen(false);
  });

  /* ---------- Header border once scrolled ---------- */
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 4);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-spy + reveal ---------- */
  if ('IntersectionObserver' in window) {
    const navItems = new Map(
      [...document.querySelectorAll('.nav-links a[href^="#"]')].map((a) => [a.hash.slice(1), a])
    );

    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navItems.forEach((a) => a.removeAttribute('aria-current'));
        navItems.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => spy.observe(section));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px -8% 0px' });

      root.classList.add('reveal-ready');
      document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));
    }
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach((button) => {
    if (!navigator.clipboard) {
      button.hidden = true;
      return;
    }
    const label = button.querySelector('[data-copy-label]');
    let resetTimer;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        label.textContent = 'Copied';
      } catch {
        label.textContent = 'Copy failed';
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { label.textContent = 'Copy'; }, 1800);
    });
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
