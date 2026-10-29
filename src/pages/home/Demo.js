import React from 'react';
import useReveal from '../../hooks/useReveal';

// Section 08 — Request a demo: message and three benefits on the dark teal
// background, with the enquiry form in a white card on the right. Benefits,
// organisation types, interest pills and the submit/sent state come from
// useHomeVals via `v`.
const CSS = `
.dm-grid{position:relative;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(40px,5.5vw,88px);align-items:center}
.dm-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#86C79A}
.dm-label:before{content:"";width:34px;height:1.5px;background:#86C79A}
.dm-h2{margin:16px 0 0;font-size:clamp(32px,3.3vw,50px);line-height:1.08;letter-spacing:-.025em;font-weight:400;color:#fff}
.dm-h2 b{display:block;font-weight:600;color:#86C79A}
.dm-lead{margin:20px 0 0;max-width:440px;font-size:clamp(14.5px,1.05vw,16px);line-height:1.7;color:rgba(255,255,255,.74)}
.dm-bens{list-style:none;margin:40px 0 0;padding:0}
.dm-ben{display:grid;grid-template-columns:52px minmax(0,1fr);gap:18px;align-items:center;padding:20px 0;border-top:1px solid rgba(255,255,255,.1)}
.dm-ben:last-child{border-bottom:1px solid rgba(255,255,255,.1)}
.dm-bi{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--c);background:var(--t);box-shadow:inset 0 0 0 1px var(--r)}
.dm-bt{font-size:15.5px;font-weight:600;color:#fff}
.dm-bd{margin:4px 0 0;font-size:13.5px;line-height:1.55;color:rgba(255,255,255,.66)}
.dm-card{position:relative;background:#fff;color:#0C2434;border-radius:24px;padding:clamp(28px,3.2vw,46px);box-shadow:0 50px 90px -40px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06)}
.dm-ch{display:grid;grid-template-columns:52px minmax(0,1fr);gap:18px;align-items:start}
.dm-ci{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#E9F5EE;color:#2F7A50}
.dm-ck{font-size:10.4px;font-weight:600;letter-spacing:.18em;color:#2F7A50}
.dm-ct{margin:6px 0 0;font-size:clamp(20px,1.75vw,25px);line-height:1.2;letter-spacing:-.015em;font-weight:600;color:#12324F}
.dm-cs{margin:6px 0 0;font-size:13.5px;line-height:1.55;color:#607789}
.dm-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 20px;margin-top:30px;padding-top:28px;border-top:1px solid #EDF2F5}
.dm-f{display:flex;flex-direction:column;gap:8px;min-width:0}
.dm-l{font-size:12px;font-weight:500;color:#3B5163}
.dm-l em{font-style:normal;font-weight:400;color:#8A9BA8}
.dm-in{position:relative}
.dm-in>svg{position:absolute;left:15px;top:50%;margin-top:-9px;color:#8A9BA8;pointer-events:none;transition:color .2s ease}
.dm-in.ta>svg{top:15px;margin-top:0}
.dm-in .chev{left:auto;right:14px}
.dm-in input,.dm-in select,.dm-in textarea{width:100%;height:48px;padding:0 14px 0 44px;border:1px solid #DCE5EB;border-radius:12px;background:#fff;font:inherit;font-size:14px;color:#0C2434;outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.dm-in select{appearance:none;-webkit-appearance:none;padding-right:40px;cursor:pointer}
.dm-in select:invalid{color:#8A9BA8}
.dm-in textarea{height:auto;min-height:120px;padding:13px 14px 13px 44px;line-height:1.55;resize:vertical}
.dm-in ::placeholder{color:#9AAAB6}
.dm-in input:hover,.dm-in select:hover,.dm-in textarea:hover{border-color:#C6D4DD}
.dm-in input:focus,.dm-in select:focus,.dm-in textarea:focus{border-color:#14707A;box-shadow:0 0 0 4px rgba(20,112,122,.12)}
.dm-in:focus-within>svg{color:#14707A}
.dm-areas{margin-top:24px}
.dm-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.dm-pill{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:10px;border:1px solid #DCE5EB;background:#fff;font:inherit;font-size:12.5px;font-weight:500;color:#12324F;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease,transform .2s ease}
.dm-pill svg{color:#14707A;transition:color .2s ease}
.dm-pill:hover{border-color:#14707A;transform:translateY(-1px)}
.dm-pill[aria-pressed="true"]{background:#0A3742;border-color:#0A3742;color:#fff}
.dm-pill[aria-pressed="true"] svg{color:#86C79A}
.dm-msg{margin-top:24px}
.dm-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin-top:28px;padding:16px 20px;border:0;border-radius:12px;background:#12324F;color:#fff;font:inherit;font-size:14px;font-weight:600;letter-spacing:.06em;cursor:pointer;box-shadow:0 18px 30px -18px rgba(18,50,79,.8);transition:background .25s ease,transform .25s ease,box-shadow .25s ease}
.dm-btn svg{transition:transform .25s ease}
.dm-btn:hover{background:#0A3742;transform:translateY(-2px);box-shadow:0 22px 34px -18px rgba(10,55,66,.85)}
.dm-btn:hover svg{transform:translateX(4px)}
.dm-sent{padding:56px 0;text-align:center}
.dm-sent .dm-ci{width:64px;height:64px;border-radius:50%;margin:0 auto}
.dm-sent h3{margin:22px 0 0;font-size:22px;font-weight:600;color:#12324F}
.dm-sent p{margin:10px auto 0;max-width:380px;font-size:14.5px;line-height:1.6;color:#41586A}
/* Entrance: left column, then benefits one by one, then the card. */
.dm-grid .dm-left,.dm-grid .dm-ben,.dm-grid .dm-card{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .9s cubic-bezier(.16,1,.3,1)}
.dm-grid.seen .dm-left,.dm-grid.seen .dm-ben,.dm-grid.seen .dm-card{opacity:1;transform:none}
.dm-grid.seen .dm-ben:nth-child(1){transition-delay:.25s}
.dm-grid.seen .dm-ben:nth-child(2){transition-delay:.4s}
.dm-grid.seen .dm-ben:nth-child(3){transition-delay:.55s}
.dm-grid.seen .dm-card{transition-delay:.15s}
@media (max-width:1100px){
  .dm-grid{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:40px}
}
@media (max-width:900px){
  section.dm{padding:80px 0!important}
  .dm-grid{width:calc(100% - 40px);grid-template-columns:1fr;gap:44px}
  .dm-lead{max-width:none}
}
@media (max-width:560px){
  .dm-card{border-radius:20px;padding:26px 20px 24px}
  .dm-ch{grid-template-columns:44px minmax(0,1fr);gap:14px}
  .dm-ch .dm-ci{width:44px;height:44px;border-radius:12px}
  .dm-fields{grid-template-columns:1fr;gap:16px}
}
@media (prefers-reduced-motion:reduce){
  .dm-grid .dm-left,.dm-grid .dm-ben,.dm-grid .dm-card{opacity:1!important;transform:none!important;transition:none!important}
  .dm-btn,.dm-btn svg,.dm-pill{transition:none}
  .dm-btn:hover,.dm-pill:hover{transform:none}
}
`;

// Stroke icons on a 24px grid.
const PATHS = {
  workflow: 'M9 4h6v5H9zM3 15h6v5H3zM15 15h6v5h-6zM12 9v3M6 15v-3h12v3',
  layers: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  team: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M21 19v-1a4 4 0 0 0-3-3.9M15.5 4.1a3 3 0 0 1 0 5.8',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2',
  user: 'M20 20v-1a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  building: 'M4 21V4h10v17M14 9h6v12M2 21h20M8 8h2M8 12h2M8 16h2M17 13h.01M17 17h.01',
  org: 'M12 3v5M5 13v-2h14v2M3 13h4v5H3zM10 13h4v5h-4zM17 13h4v5h-4zM9 3h6v5H9z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  chat: 'M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z',
  chev: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M20 6 9 17l-5-5',
  // Interest pills.
  crm: 'M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 8l2 2 3-3',
  finance: 'M7 5h10M7 9h10M13 5c2.5 0 4 1.8 4 4s-1.5 4-4 4H8l7 7',
  projects: 'M8 4h8v3H8zM6 5.5H5v15h14v-15h-1M9 12l2 2 4-4',
  epc: 'M4 17a8 8 0 0 1 16 0zM12 9V5M9.5 5h5M2.5 17h19v2.5h-19z',
  procurement: 'M3 4h2.5l2.2 11h10.6L20.5 8H7M9.5 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
  portfolio: 'M12 3v9h9A9 9 0 1 1 12 3zM15 3.5A8 8 0 0 1 20.5 9H15z',
  ai: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z',
  analytics: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  platform: 'M3 4h18v12H3zM8 20h8M12 16v4M7 8h4M7 11h7'
};
const Icon = ({ name, size = 18, width = 1.8, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

// Benefit icon and accent (green, blue, purple) in the order of v.demoPoints.
const BENEFITS = [
  { icon: 'workflow', c: '#86C79A', t: 'rgba(134,199,154,.14)', r: 'rgba(134,199,154,.34)' },
  { icon: 'layers', c: '#8CB8EC', t: 'rgba(44,111,181,.2)', r: 'rgba(140,184,236,.34)' },
  { icon: 'team', c: '#B9A8F2', t: 'rgba(125,96,214,.2)', r: 'rgba(185,168,242,.34)' }
];
const AREA_ICONS = {
  CRM: 'crm', Finance: 'finance', Projects: 'projects', EPC: 'epc', Procurement: 'procurement',
  Portfolio: 'portfolio', AI: 'ai', Analytics: 'analytics', 'Enterprise Platform': 'platform'
};
const FIELDS = [
  { id: 'dm-name', label: 'Full Name', type: 'text', icon: 'user', ph: 'Enter your full name', ac: 'name' },
  { id: 'dm-email', label: 'Work Email', type: 'email', icon: 'mail', ph: 'name@company.com', ac: 'email' },
  { id: 'dm-company', label: 'Company', type: 'text', icon: 'building', ph: 'Your company name', ac: 'organization' },
  { id: 'dm-org', label: 'Organization Type', select: true, icon: 'org' },
  { id: 'dm-phone', label: 'Phone', type: 'tel', icon: 'phone', ph: '+91 98765 43210', ac: 'tel' },
  { id: 'dm-country', label: 'Country', type: 'text', icon: 'globe', ph: 'e.g. India', ac: 'country-name' }
];

export default function Demo({ v }) {
  useReveal('.dm-grid', 0.15);

  return (
    <section id="demo" className="dm" aria-labelledby="dm-title" style={{ position: "relative", padding: "120px 0", background: "#0A3742", color: "#fff", overflow: "hidden" }}>
      <style>{CSS}</style>
      {v.watercolor && (
        <div style={{ position: "absolute", right: "-140px", top: "-80px", width: "680px", height: "620px", background: "radial-gradient(45% 42% at 50% 50%,rgba(78,158,106,.34),transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
      )}
      <div className="dm-grid">
        <div>
          <div className="dm-left">
            <div className="dm-label">08 — REQUEST A DEMO</div>
            <h2 id="dm-title" className="dm-h2">
              See your ecosystem
              <b>on one architecture.</b>
            </h2>
            <p className="dm-lead">Tell us where you sit in the renewable value chain and we will configure the walkthrough around it.</p>
          </div>
          <ul className="dm-bens">
            {v.demoPoints.map((d, i) => {
              const b = BENEFITS[i % BENEFITS.length];
              return (
                <li className="dm-ben" key={d.t}>
                  <span className="dm-bi" style={{ '--c': b.c, '--t': b.t, '--r': b.r }}><Icon name={b.icon} size={22} width={1.7} /></span>
                  <div>
                    <div className="dm-bt">{d.t}</div>
                    <p className="dm-bd">{d.d}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="dm-card">
          {v.sent && (
            <div className="dm-sent" role="status">
              <span className="dm-ci"><Icon name="check" size={28} width={2.4} /></span>
              <h3>Request received.</h3>
              <p>A SESOVA specialist will be in touch to schedule your walkthrough.</p>
            </div>
          )}
          {v.notSent && (
            <div>
              <div className="dm-ch">
                <span className="dm-ci"><Icon name="calendar" size={24} width={1.7} /></span>
                <div>
                  <div className="dm-ck">REQUEST A DEMO</div>
                  <h3 className="dm-ct">Let's show you SESOVA in action.</h3>
                  <p className="dm-cs">Share a few details and we will tailor the demo to your needs.</p>
                </div>
              </div>

              <div className="dm-fields">
                {FIELDS.map((f) => (
                  <div className="dm-f" key={f.id}>
                    <label className="dm-l" htmlFor={f.id}>{f.label}</label>
                    <div className="dm-in">
                      <Icon name={f.icon} />
                      {f.select ? (
                        <>
                          <select id={f.id} defaultValue="" required>
                            <option value="" disabled>Select organization type</option>
                            {v.orgTypes.map((o) => <option key={o}>{o}</option>)}
                          </select>
                          <Icon name="chev" size={16} width={2} className="chev" />
                        </>
                      ) : (
                        <input id={f.id} type={f.type} placeholder={f.ph} autoComplete={f.ac} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="dm-areas">
                <div className="dm-l" id="dm-areas-l">Areas of Interest</div>
                <div className="dm-pills" role="group" aria-labelledby="dm-areas-l">
                  {v.areas.map((a) => (
                    <button key={a.label} type="button" className="dm-pill" aria-pressed={a.on} onClick={a.onClick}>
                      <Icon name={AREA_ICONS[a.label] || 'layers'} size={15} width={1.9} />
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dm-f dm-msg">
                <label className="dm-l" htmlFor="dm-message">Message <em>(Optional)</em></label>
                <div className="dm-in ta">
                  <Icon name="chat" />
                  <textarea id="dm-message" rows="4" placeholder="Tell us about your requirements or specific use case..." />
                </div>
              </div>

              <button type="button" className="dm-btn" onClick={v.submit}>
                REQUEST A DEMO
                <Icon name="arrow" size={17} width={2.2} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
