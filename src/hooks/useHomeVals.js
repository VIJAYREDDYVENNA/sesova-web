import { useEffect, useState } from 'react';
import useReveal from './useReveal';
import {
  STAGES, AREAS, CAROUSEL, MARQUEE, MODS, HERO_PILLARS, ECOSYSTEM, FRAGMENTS, RESOLVED,
  LAYERS, SIGNAL_FEED, INTEL, CHART, DEMO_POINTS, ORG_TYPES, SOLUTIONS,
  NAVY, DEEP
} from '../data/content';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// How long each product screen stays up before the presentation moves on.
const PRODUCT_DELAY = 6000;

// State and derived values for the Home page (ported from the design's renderVals).
export default function useHomeVals() {
  const [stage, setStage] = useState(2);
  const [stagePinned, setStagePinned] = useState(false);
  const [archVisible, setArchVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [mod, setMod] = useState(0);
  const [shot, setShot] = useState(0);
  const [prodVisible, setProdVisible] = useState(false);
  const [prodHold, setProdHold] = useState(false);
  const [prodKey, setProdKey] = useState(0);
  const [frag, setFrag] = useState(-1);
  const [list, setList] = useState({ top: 0, bot: 1 });
  const [areas, setAreas] = useState({ CRM: true, Portfolio: true });
  const [sent, setSent] = useState(false);

  useReveal('.eco', 0.25);
  useReveal('.lrow', 0.45);
  useReveal('.alist-wrap', 0.15);

  // Carousel autoplay; restarts whenever the user navigates slides.
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % CAROUSEL.length), 6500);
    return () => clearInterval(id);
  }, [autoKey]);
  const go = (step) => {
    setSlide((s) => (s + step + CAROUSEL.length) % CAROUSEL.length);
    setAutoKey((k) => k + 1);
  };

  // Architecture stages advance every 3s while the section is visible, until pinned.
  useEffect(() => {
    const el = document.getElementById('architecture');
    if (!el) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => setArchVisible(e.isIntersecting)), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!archVisible || stagePinned || reducedMotion()) return undefined;
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 3000);
    return () => clearInterval(id);
  }, [archVisible, stagePinned]);

  // Product screens advance through every module in order while the section is
  // visible and the visitor isn't hovering or focused inside it. Any manual pick
  // restarts the countdown (mod/shot/prodKey are effect dependencies).
  useEffect(() => {
    const el = document.getElementById('product');
    if (!el) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => setProdVisible(e.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const prodRunning = prodVisible && !prodHold && !reducedMotion();
  useEffect(() => {
    if (!prodRunning) return undefined;
    const id = setTimeout(() => {
      const last = shot + 1 >= MODS[mod].shots.length;
      setMod(last ? (mod + 1) % MODS.length : mod);
      setShot(last ? 0 : shot + 1);
    }, PRODUCT_DELAY);
    return () => clearTimeout(id);
  }, [prodRunning, mod, shot, prodKey]);
  const pickProduct = (m, s) => {
    setMod(m);
    setShot(s);
    setProdKey((k) => k + 1);
  };

  return {
    watercolor: true,
    heroPillars: HERO_PILLARS,
    ecosystem: ECOSYSTEM,
    marquee: [...MARQUEE, ...MARQUEE],
    fragments: FRAGMENTS.map((label, i) => {
      const on = frag === i;
      return {
        label, on,
        tag: on ? 'CONNECTED' : 'SEPARATE',
        bg: on ? 'rgba(134,199,154,.14)' : 'rgba(255,255,255,.03)',
        bc: on ? 'rgba(134,199,154,.5)' : 'rgba(255,255,255,.16)',
        dot: on ? '#86C79A' : 'rgba(255,255,255,.34)',
        tagC: on ? '#86C79A' : 'rgba(255,255,255,.34)',
        onClick: () => setFrag((f) => (f === i ? -1 : i))
      };
    }),
    listTopO: list.top,
    listBotO: list.bot,
    onListScroll: (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const bottom = scrollHeight - (scrollTop + clientHeight);
      const top = Math.min(scrollTop / 44, 1);
      const bot = scrollHeight <= clientHeight ? 0 : Math.min(bottom / 44, 1);
      setList((l) => (l.top === top && l.bot === bot ? l : { top, bot }));
    },
    resolved: RESOLVED,
    carousel: CAROUSEL.map((c, i) => {
      const on = i === slide;
      return { ...c, opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(1.04)', filter: on ? 'blur(0)' : 'blur(6px)', pe: on ? 'auto' : 'none' };
    }),
    dots: CAROUSEL.map((c, i) => ({
      label: 'Slide ' + (i + 1),
      w: i === slide ? '38px' : '16px',
      bg: i === slide ? '#86C79A' : 'rgba(255,255,255,.42)',
      onClick: () => { setSlide(i); setAutoKey((k) => k + 1); }
    })),
    prevSlide: () => go(-1),
    nextSlide: () => go(1),
    stages: STAGES.map((s, i) => ({
      n: s.n, label: s.label,
      bg: i === stage ? DEEP : '#fff',
      fg: i === stage ? '#fff' : NAVY,
      onClick: () => { setStage(i); setStagePinned(true); }
    })),
    active: STAGES[stage],
    layers: LAYERS,
    mods: MODS.map((m, i) => ({
      n: String(i + 1).padStart(2, '0'), label: m.label, on: i === mod,
      onClick: () => pickProduct(i, 0)
    })),
    subs: MODS[mod].shots.map((s, i) => ({ label: s.label, on: i === shot, onClick: () => pickProduct(mod, i) })),
    shotDesc: MODS[mod].shots[shot].desc,
    // Flat list of all 14 screens in presentation order.
    screens: MODS.flatMap((m, mi) => m.shots.map((s, si) => ({
      file: s.file, alt: `SOSEVA CRM — ${m.label}: ${s.label}`, on: mi === mod && si === shot
    }))),
    prodRunning,
    prodDelay: PRODUCT_DELAY,
    // Changes whenever the countdown restarts, so the progress bar can restart with it.
    prodTick: `${mod}.${shot}.${prodKey}.${prodRunning}`,
    holdProduct: setProdHold,
    solutions: SOLUTIONS.map((s) => {
      const pick = s.flow.length > 5 ? [0, 2, 3, 4, s.flow.length - 1] : s.flow.map((_, i) => i);
      return {
        ...s,
        wash: s.c + '26', line: s.c + '55', halo: s.c + '22',
        nodes: pick.map((idx, k) => ({ i: String(k + 1).padStart(2, '0'), label: s.flow[idx], fill: k < 3 ? s.c : '#fff', fg: k < 3 ? '#fff' : s.c }))
      };
    }),
    intel: INTEL,
    chart: CHART,
    signalFeed: SIGNAL_FEED,
    demoPoints: DEMO_POINTS,
    orgTypes: ORG_TYPES,
    areas: AREAS.map((a) => {
      const on = !!areas[a];
      return {
        label: a, on,
        bg: on ? DEEP : 'transparent', fg: on ? '#fff' : '#3B5163', bc: on ? DEEP : 'rgba(12,36,52,.2)',
        onClick: () => setAreas((s) => ({ ...s, [a]: !s[a] }))
      };
    }),
    sent,
    notSent: !sent,
    submit: () => setSent(true)
  };
}
