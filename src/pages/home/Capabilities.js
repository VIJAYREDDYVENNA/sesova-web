import React from 'react';
import SmartLink from '../../components/SmartLink';
import { useDemoModal } from '../../components/DemoModal';

// Section 04 — "What SeSova does": a seven-slide capability carousel. Each slide
// pairs a deep-teal story panel with a live-looking product view built in
// HTML/CSS. Slide state (active slide, prev/next, autoplay) comes from
// useHomeVals via `v`; the bottom selector reuses the same per-slide handlers.
const CSS = `
section.cx{position:relative;padding:92px 0;background:#FCFDFC}
.cx-in{width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto}
.cx-top{display:flex;justify-content:space-between;align-items:flex-end;gap:32px}
.cx-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#2F7A50}
.cx-label:before{content:"";width:34px;height:1.5px;background:#2F7A50}
.cx-h2{margin:14px 0 0;font-size:clamp(28px,2.85vw,44px);line-height:1.08;letter-spacing:-.022em;font-weight:300;color:#12324F}
.cx-h2 b{font-weight:600}
.cx-sub{margin:14px 0 0;max-width:470px;font-size:clamp(13.5px,.98vw,15.5px);line-height:1.62;color:#607789}
.cx-ctl{display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex:none}
.cx-btns{display:flex;gap:10px}
.cx-btn{width:44px;height:44px;border-radius:10px;background:#fff;border:1px solid #DDE7EC;box-shadow:0 8px 18px -14px rgba(12,36,52,.4);color:#12324F;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s ease,background .2s ease}
.cx-btn:hover{border-color:#14707A;background:#F4F9F8}
.cx-count{font-size:12px;font-weight:500;letter-spacing:.08em;color:#8A9BA8}
.cx-count b{font-weight:600;color:#14707A}
.cx-card{margin-top:34px;padding:16px;background:#F3F8F7;border:1px solid #DDE7EC;border-radius:22px;box-shadow:0 28px 60px -44px rgba(12,36,52,.35)}
.cx-slide{display:grid;grid-template-columns:minmax(0,45fr) minmax(0,55fr);gap:16px;animation:cxIn .55s cubic-bezier(.2,.7,.2,1) both}
@keyframes cxIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.cx-panel{display:flex;flex-direction:column;padding:34px 34px 30px;background:#0A3742;border-radius:16px;color:#fff;min-height:400px}
.cx-num{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.18em}
.cx-num span:first-child{color:rgba(255,255,255,.5)}
.cx-num span:last-child{color:#86C79A}
.cx-title{margin:18px 0 0;font-size:clamp(22px,1.95vw,30px);line-height:1.16;letter-spacing:-.018em;font-weight:600}
.cx-body{margin:14px 0 0;max-width:420px;font-size:13.5px;line-height:1.65;color:rgba(255,255,255,.72)}
.cx-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.cx-tags span{padding:7px 13px;border:1px solid rgba(255,255,255,.2);border-radius:999px;font-size:11.5px;color:rgba(255,255,255,.86)}
.cx-more{margin-top:auto;padding-top:28px;display:inline-flex;align-items:center;gap:12px;font-size:13px;font-weight:600;color:#fff}
.cx-more:hover{color:#86C79A}
.cx-more i{width:32px;height:32px;border-radius:50%;background:#86C79A;color:#0A3742;display:flex;align-items:center;justify-content:center}
.cx-app{display:flex;flex-direction:column;padding:18px 20px 16px;background:#fff;border:1px solid #E3EBF0;border-radius:16px;min-width:0}
.cx-bar{display:flex;align-items:center;gap:10px;padding-bottom:14px;border-bottom:1px solid #EEF2F5}
.cx-bar strong{font-size:14.5px;font-weight:600;color:#12324F;margin-right:auto}
.cx-drop{display:flex;align-items:center;gap:8px;padding:6px 11px;border:1px solid #E3EBF0;border-radius:8px;font-size:11.5px;color:#3B5163;white-space:nowrap}
.cx-menu{width:30px;height:30px;border:1px solid #E3EBF0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#647B8C}
.cx-mets{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
.cx-met{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;padding:14px 16px;border:1px solid #EEF2F5;border-radius:12px;background:#FBFCFD}
.cx-mk{font-size:9.5px;font-weight:600;letter-spacing:.12em;color:#8A9BA8}
.cx-mv{display:flex;align-items:baseline;gap:8px;margin-top:8px;font-size:21px;font-weight:600;letter-spacing:-.01em;color:#12324F;white-space:nowrap}
.cx-mv em{font-style:normal;font-size:10.5px;font-weight:600;color:#2F7A50;background:#EAF6F1;padding:2px 6px;border-radius:6px}
.cx-spark{display:flex;align-items:flex-end;gap:3px;height:32px;flex:none}
.cx-spark i{width:5px;border-radius:2px;background:#CFE3EA}
.cx-spark i:nth-child(n+6){background:#14707A}
.cx-tbl{margin-top:14px;overflow-x:auto}
.cx-tbl table{width:100%;min-width:500px;border-collapse:collapse}
.cx-tbl th{text-align:left;font-size:9.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#8A9BA8;padding:0 10px 10px;border-bottom:1px solid #EEF2F5}
.cx-tbl td{font-size:12px;color:#3B5163;padding:12px 10px;border-bottom:1px solid #F1F4F6;white-space:nowrap}
.cx-tbl tr:last-child td{border-bottom:0}
.cx-tbl td:first-child{font-weight:600;color:#12324F}
.cx-tbl th:first-child,.cx-tbl td:first-child{padding-left:0}
.cx-tbl td:last-child{color:#8A9BA8}
.cx-badge{display:inline-block;padding:4px 9px;border-radius:999px;font-size:10.5px;font-weight:600}
.cx-dots{display:flex;justify-content:center;gap:8px;margin-top:22px}
.cx-dots button{height:6px;border:0;border-radius:999px;cursor:pointer;padding:0;transition:width .3s ease,background .3s ease}
.cx-nav{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));margin-top:28px;border-top:1px solid #E6EDF1}
.cx-nav button{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 8px 18px;background:none;border:0;cursor:pointer;font:inherit;color:#647B8C}
.cx-nav button+button:before{content:"";position:absolute;left:0;top:26px;bottom:22px;width:1px;background:#E6EDF1}
.cx-nav button:after{content:"";position:absolute;left:28%;right:28%;bottom:0;height:2px;border-radius:2px;background:transparent;transition:background .25s ease}
.cx-nav button[aria-current="true"]:after{background:#14707A}
.cx-ni{width:42px;height:42px;border-radius:50%;background:#F2F6F7;border:1px solid transparent;display:flex;align-items:center;justify-content:center;color:#647B8C;transition:all .25s ease}
.cx-nav button[aria-current="true"] .cx-ni{background:#EAF6F1;border-color:rgba(20,112,122,.35);color:#14707A}
.cx-nl{font-size:12px;font-weight:500;text-align:center;line-height:1.3}
.cx-nav button[aria-current="true"] .cx-nl{color:#12324F;font-weight:600}
.cx-nav button:hover .cx-nl{color:#12324F}
@media (max-width:1100px){
  .cx-slide{grid-template-columns:1fr}
  .cx-panel{min-height:0}
}
@media (max-width:900px){
  section.cx{padding:76px 0!important}
  .cx-in{width:calc(100% - 48px)}
  .cx-top{flex-direction:column;align-items:flex-start}
  .cx-ctl{flex-direction:row;align-items:center;gap:16px}
  .cx-card{padding:10px}
  .cx-panel{padding:26px 22px}
  .cx-nav{display:flex;overflow-x:auto;scrollbar-width:thin}
  .cx-nav button{flex:0 0 118px}
}
@media (max-width:560px){
  .cx-app{padding:14px}
  .cx-mets{gap:8px}
  .cx-met{padding:12px}
  .cx-mets{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cx-mv{font-size:17px;flex-wrap:wrap;gap:4px 6px}
  .cx-spark{display:none}
  .cx-bar strong{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  /* Phones get the first three columns only, so the table fits without sideways scrolling. */
  .cx-tbl{overflow:visible}
  .cx-tbl table{min-width:0}
  .cx-tbl td{white-space:normal}
  .cx-tbl td:nth-child(3){white-space:nowrap}
  .cx-tbl th:nth-child(n+4),.cx-tbl td:nth-child(n+4){display:none}
  .cx-tbl td:nth-child(3){color:#12324F;font-weight:500}
  .cx-tbl th:nth-child(3),.cx-tbl td:nth-child(3){text-align:right;padding-right:0}
}
@media (max-width:380px){
  .cx-in{width:calc(100% - 32px)}
  .cx-panel{padding:22px 18px}
  .cx-mv{font-size:15.5px}
  .cx-tbl td{padding:11px 6px;font-size:11.5px}
}
@media (prefers-reduced-motion:reduce){.cx-slide,.cx [data-rise]{animation:none!important;opacity:1!important;transform:none!important}}
`;

const TONES = {
  blue: { bg: '#E6EFF8', c: '#1F5588' },
  green: { bg: '#E4F1E9', c: '#2F6B47' },
  amber: { bg: '#FAEEE2', c: '#9C5424' },
  grey: { bg: '#EDF0F2', c: '#4A6072' }
};

// Stroke icons on a 24px grid.
const PATHS = {
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.3 3.3 0 0 1 0 6.4M18 14.2c2.1.6 3.5 2.6 3.5 5.8',
  wallet: 'M4 7h14.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 7l11-3v3M15.5 13.5h2',
  layers: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  cart: 'M3 4h2.5l2.2 11h10.6L20.5 8H7M9.5 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
  doc: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15.5h7',
  chart: 'M5 20V13M10 20V8M15 20v-5M20 20V5M3 20.5h18',
  leaf: 'M20 4C10.5 3.5 4.5 8 4.5 14.5c0 1.8.5 3.3 1.4 4.6M20 4c.8 10.5-2.6 16-8.6 16-1.6 0-3-.4-4.1-1.1M5.9 19.1C8 14.5 11.5 11 16 9',
  left: 'M19 12H5M11 6l-6 6 6 6',
  right: 'M5 12h14M13 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  dots: 'M5 12h.01M12 12h.01M19 12h.01'
};
const Icon = ({ name, size = 18, width = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

// Mini bar chart for a metric card (static, decorative).
const SPARKS = [[34, 52, 40, 64, 56, 78, 70, 92], [44, 38, 58, 50, 66, 60, 82, 76]];

export default function Capabilities({ v }) {
  const openDemo = useDemoModal();
  const slides = v.carousel;
  const active = Math.max(0, slides.findIndex((c) => c.opacity === 1));
  const s = slides[active];
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="cx" aria-labelledby="cx-title">
      <style>{CSS}</style>
      <div className="cx-in">
        <div className="cx-top" data-rise="">
          <div>
            <div className="cx-label">04 — WHAT SESOVA DOES</div>
            <h2 id="cx-title" className="cx-h2">
              Seven capabilities. <b>One record.</b>
            </h2>
            <p className="cx-sub">SeSova connects the functions a business runs on, from customers and finance to projects and compliance, through one shared record.</p>
          </div>
          <div className="cx-ctl">
            <div className="cx-btns">
              <button type="button" className="cx-btn" onClick={v.prevSlide} aria-label="Previous capability"><Icon name="left" /></button>
              <button type="button" className="cx-btn" onClick={v.nextSlide} aria-label="Next capability"><Icon name="right" /></button>
            </div>
            <div className="cx-count" aria-live="polite">
              <b>{pad(active + 1)}</b> / {pad(slides.length)}
            </div>
          </div>
        </div>

        <div className="cx-card">
          <div className="cx-slide" key={s.id} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slides.length}: ${s.nav}`}>
            <div className="cx-panel">
              <div className="cx-num"><span>{pad(active + 1)}</span><span>{s.kicker}</span></div>
              <h3 className="cx-title">{s.title}</h3>
              <p className="cx-body">{s.body}</p>
              <div className="cx-tags">
                {s.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <SmartLink className="cx-more" href="/#demo" onClick={openDemo}>
                <i><Icon name="right" size={15} width={2.2} /></i>
                Learn More
              </SmartLink>
            </div>

            {/* Sample product view (presentation data) */}
            <div className="cx-app" aria-label={`${s.ui.title} sample view`}>
              <div className="cx-bar">
                <strong>{s.ui.title}</strong>
                <span className="cx-drop">{s.ui.filter}<Icon name="down" size={13} /></span>
                <span className="cx-menu"><Icon name="dots" size={16} width={3} /></span>
              </div>
              <div className="cx-mets">
                {s.ui.metrics.map((m, i) => (
                  <div className="cx-met" key={m.k}>
                    <div>
                      <div className="cx-mk">{m.k}</div>
                      <div className="cx-mv">{m.v}<em>{m.d}</em></div>
                    </div>
                    <div className="cx-spark" aria-hidden="true">
                      {SPARKS[i % SPARKS.length].map((h, j) => <i key={j} style={{ height: h + '%' }} />)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cx-tbl">
                <table>
                  <thead>
                    <tr>{s.ui.cols.map((c) => <th key={c}>{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.ui.rows.map((r) => (
                      <tr key={r[0]}>
                        <td>{r[0]}</td>
                        <td>{r[1]}</td>
                        <td>{r[2]}</td>
                        <td><span className="cx-badge" style={{ background: TONES[r[3][1]].bg, color: TONES[r[3][1]].c }}>{r[3][0]}</span></td>
                        <td>{r[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="cx-dots">
          {v.dots.map((d, i) => (
            <button key={i} type="button" onClick={d.onClick} aria-label={`Show ${slides[i].nav}`} style={{ width: i === active ? '28px' : '8px', background: i === active ? '#14707A' : '#CBD8DF' }} />
          ))}
        </div>

        <div className="cx-nav" role="tablist" aria-label="Capabilities">
          {slides.map((c, i) => (
            <button key={c.id} type="button" role="tab" aria-selected={i === active} aria-current={i === active} onClick={v.dots[i].onClick}>
              <span className="cx-ni"><Icon name={c.icon} size={19} /></span>
              <span className="cx-nl">{c.nav}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
