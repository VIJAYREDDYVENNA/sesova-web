import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV, FOOTER, TEAL } from '../data/content';

// Eased 1.5s glide back to the top of the page.
function smoothToTop(rafRef) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.scrollTo(0, 0); return; }
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  const from = window.scrollY;
  const t0 = performance.now();
  const dur = 1500;
  const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, Math.round(from * (1 - ease(p))));
    if (p < 1) rafRef.current = requestAnimationFrame(step);
    else root.style.scrollBehavior = prev;
  };
  rafRef.current = requestAnimationFrame(step);
}

// Header, mobile menu, back-to-top button and footer values.
export default function useLayoutVals() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const glide = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--flow', '7s');
    document.documentElement.style.setProperty('--flowplay', 'running');
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      if (Math.abs(delta) < 4) return;
      lastY = y;
      setHidden(delta > 0 && y > 140);
      setShowTop(y > 520);
      let current = '';
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = n.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const raf = glide;
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const toTop = useCallback(() => smoothToTop(glide), []);

  return {
    nav: NAV.map((n) => {
      const on = active === n.id;
      return { ...n, c: on ? TEAL : '#3B5163', w: on ? 600 : 500 };
    }),
    headerT: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
    menuOpen,
    menuLabel: menuOpen ? 'Close menu' : 'Open menu',
    barW: menuOpen ? '20px' : '13px',
    // Open height fits the five nav links plus the Sign In and Request a Demo buttons.
    panelH: menuOpen ? '390px' : '0px',
    panelO: menuOpen ? 1 : 0,
    toggleMenu: () => setMenuOpen((o) => !o),
    closeMenu: () => setMenuOpen(false),
    topOpacity: showTop ? 1 : 0,
    topT: showTop ? 'translateY(0) scale(1)' : 'translateY(14px) scale(.9)',
    topPE: showTop ? 'auto' : 'none',
    toTop,
    footer: FOOTER
  };
}
