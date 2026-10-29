import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the hash target (20px above it) or to the top on navigation.
// Same-page anchors glide; switching pages jumps instantly.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    const root = document.documentElement;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    const top = el ? el.getBoundingClientRect().top + window.scrollY - 20 : 0;
    if (samePage && el) {
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, top);
    root.style.scrollBehavior = '';
  }, [pathname, hash]);

  return null;
}
