import { useEffect } from 'react';

// Toggles `cls` on elements matching `selector`: it is added when an element
// scrolls into view (from above or below) and removed once the element is
// completely off screen, so its entrance animation plays again on every visit.
// Elements rendered later (carousel slides, tab panels) are picked up too.
export default function useReveal(selector, threshold = 0, cls = 'seen') {
  useEffect(() => {
    // Enter: a little inside the bottom edge, so the animation is seen starting.
    const enter = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(cls); });
    }, { threshold, rootMargin: '0px 0px -8% 0px' });
    // Exit: only once nothing of the element is left on screen.
    const exit = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (!e.isIntersecting) e.target.classList.remove(cls); });
    }, { threshold: 0 });

    const watched = new WeakSet();
    const watch = (el) => {
      if (watched.has(el)) return;
      watched.add(el);
      enter.observe(el);
      exit.observe(el);
    };
    document.querySelectorAll(selector).forEach(watch);

    const added = new MutationObserver((records) => records.forEach((r) => r.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return;
      if (n.matches(selector)) watch(n);
      n.querySelectorAll(selector).forEach(watch);
    })));
    added.observe(document.body, { childList: true, subtree: true });

    return () => {
      enter.disconnect();
      exit.disconnect();
      added.disconnect();
    };
  }, [selector, threshold, cls]);
}
