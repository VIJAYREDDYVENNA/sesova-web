import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Quick "Request a Demo" popup: name, mobile and email. Every Request a Demo
// button opens it through useDemoModal(); the Contact link still goes to the
// full demo section (#demo). Like that section's form, it has no backend yet —
// submitting shows the confirmation only.
const CSS = `
.dmm-back{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(6,28,36,.62);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:dmmFade .25s ease both}
.dmm{position:relative;width:100%;max-width:460px;max-height:calc(100vh - 40px);overflow:auto;background:#fff;color:#0C2434;border-radius:22px;padding:34px 32px 30px;box-shadow:0 40px 90px -30px rgba(0,0,0,.55);animation:dmmIn .35s cubic-bezier(.16,1,.3,1) both}
@keyframes dmmFade{from{opacity:0}to{opacity:1}}
@keyframes dmmIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
.dmm-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:#F1F6F8;color:#3B5163;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s ease}
.dmm-x:hover{background:#E3ECF0}
.dmm-ic{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#E9F5EE;color:#2F7A50}
.dmm-k{margin-top:18px;font-size:10.4px;font-weight:600;letter-spacing:.18em;color:#2F7A50}
.dmm-t{margin:6px 0 0;font-size:22px;line-height:1.2;letter-spacing:-.015em;font-weight:600;color:#12324F}
.dmm-s{margin:6px 0 0;font-size:13.5px;line-height:1.55;color:#607789}
.dmm-form{display:flex;flex-direction:column;gap:16px;margin-top:24px}
.dmm-f{display:flex;flex-direction:column;gap:7px}
.dmm-l{font-size:12px;font-weight:500;color:#3B5163}
.dmm-in{position:relative}
.dmm-in svg{position:absolute;left:15px;top:50%;margin-top:-9px;color:#8A9BA8;pointer-events:none;transition:color .2s ease}
.dmm-in input{width:100%;height:48px;padding:0 14px 0 44px;border:1px solid #DCE5EB;border-radius:12px;background:#fff;font:inherit;font-size:14px;color:#0C2434;outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.dmm-in input::placeholder{color:#9AAAB6}
.dmm-in input:hover{border-color:#C6D4DD}
.dmm-in input:focus{border-color:#14707A;box-shadow:0 0 0 4px rgba(20,112,122,.12)}
.dmm-in:focus-within svg{color:#14707A}
.dmm-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin-top:6px;padding:15px 20px;border:0;border-radius:12px;background:#12324F;color:#fff;font:inherit;font-size:14px;font-weight:600;letter-spacing:.06em;cursor:pointer;box-shadow:0 18px 30px -18px rgba(18,50,79,.8);transition:background .25s ease,transform .25s ease}
.dmm-btn svg{transition:transform .25s ease}
.dmm-btn:hover{background:#0A3742;transform:translateY(-2px)}
.dmm-btn:hover svg{transform:translateX(4px)}
.dmm-done{padding:18px 0 6px;text-align:center}
.dmm-done .dmm-ic{width:60px;height:60px;border-radius:50%;margin:0 auto}
.dmm-done .dmm-btn{margin-top:26px}
@media (max-width:480px){.dmm{padding:30px 22px 24px;border-radius:18px}}
@media (prefers-reduced-motion:reduce){.dmm-back,.dmm{animation:none}.dmm-btn,.dmm-btn svg{transition:none}.dmm-btn:hover{transform:none}}
`;

const PATHS = {
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2',
  user: 'M20 20v-1a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  close: 'M6 6l12 12M18 6 6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M20 6 9 17l-5-5'
};
const Icon = ({ name, size = 18, width = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

const DemoModalContext = createContext(() => {});

// Returns an onClick handler that opens the popup instead of following the link.
export function useDemoModal() {
  return useContext(DemoModalContext);
}

function Modal({ onClose }) {
  const [sent, setSent] = useState(false);
  const boxRef = useRef(null);

  // Focus the first field, close on Escape, keep Tab inside the dialog and
  // stop the page behind from scrolling while it is open.
  useEffect(() => {
    const box = boxRef.current;
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = box.querySelector('input,button:not(.dmm-x)');
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = [...box.querySelectorAll('button,input')];
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (!sent) return;
    const done = boxRef.current.querySelector('.dmm-done .dmm-btn');
    if (done) done.focus();
  }, [sent]);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return createPortal(
    <div className="dmm-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{CSS}</style>
      <div className="dmm" ref={boxRef} role="dialog" aria-modal="true" aria-labelledby="dmm-title">
        <button type="button" className="dmm-x" onClick={onClose} aria-label="Close"><Icon name="close" size={18} width={2} /></button>
        {sent ? (
          <div className="dmm-done" role="status">
            <span className="dmm-ic"><Icon name="check" size={28} width={2.4} /></span>
            <h2 id="dmm-title" className="dmm-t">Request received.</h2>
            <p className="dmm-s">A SESOVA specialist will be in touch to schedule your walkthrough.</p>
            <button type="button" className="dmm-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <span className="dmm-ic"><Icon name="calendar" size={24} width={1.7} /></span>
            <div className="dmm-k">REQUEST A DEMO</div>
            <h2 id="dmm-title" className="dmm-t">Let's show you SESOVA in action.</h2>
            <p className="dmm-s">Leave your details and we will get in touch to schedule it.</p>
            <form className="dmm-form" onSubmit={submit}>
              <div className="dmm-f">
                <label className="dmm-l" htmlFor="dmm-name">Name</label>
                <div className="dmm-in">
                  <Icon name="user" />
                  <input id="dmm-name" name="name" type="text" placeholder="Enter your full name" autoComplete="name" required />
                </div>
              </div>
              <div className="dmm-f">
                <label className="dmm-l" htmlFor="dmm-mobile">Mobile</label>
                <div className="dmm-in">
                  <Icon name="phone" />
                  <input id="dmm-mobile" name="mobile" type="tel" placeholder="+91 98765 43210" autoComplete="tel" inputMode="tel" pattern="[+0-9 ()-]{7,}" title="Enter a valid mobile number" required />
                </div>
              </div>
              <div className="dmm-f">
                <label className="dmm-l" htmlFor="dmm-email">Email</label>
                <div className="dmm-in">
                  <Icon name="mail" />
                  <input id="dmm-email" name="email" type="email" placeholder="name@company.com" autoComplete="email" required />
                </div>
              </div>
              <button type="submit" className="dmm-btn">SUBMIT<Icon name="arrow" size={17} width={2.2} /></button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openDemo = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <DemoModalContext.Provider value={openDemo}>
      {children}
      {open && <Modal onClose={close} />}
    </DemoModalContext.Provider>
  );
}
