import React, { Fragment } from 'react';

// Generated from the SeSova design export; values come from the page hook via `v`.
export default function PlatformLayers({ v }) {
  return (
    <section id="platform" style={{ padding: "120px 0", background: "#FCFBF8" }}>
      <div className="wrap" style={{ maxWidth: "calc(var(--page-max) + 80px)", margin: "0 auto", padding: "0 40px" }}>
        <div className="sgrid sgrid-b">
          <div className="stick" data-rise="" style={{ position: "sticky", top: "120px" }}>
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".2em", color: "#4E9E6A" }}>04 — PLATFORM</div>
            <h2 style={{ margin: "20px 0 0", fontSize: "40px", lineHeight: "1.14", letterSpacing: "-.025em", fontWeight: "300", color: "#12324F" }}>
              One operating architecture.
              <br />
              <span style={{ fontWeight: "600" }}>Every critical workflow.</span>
            </h2>
            <p style={{ margin: "22px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "300", color: "#41586A" }}>Seven layers on one data model. Nothing is re-entered, reconciled or exported between them.</p>
          </div>
          <div className="lstack" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {v.layers.map((l, lIdx) => (
              <Fragment key={lIdx}>
                <div className="lrow hover-3" style={{ display: "grid", gridTemplateColumns: "64px 1fr auto", gap: "24px", alignItems: "center", padding: "26px 28px", border: "1px solid rgba(12,36,52,.12)", borderBottom: "0", background: l.bg, marginLeft: l.indent }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".12em", color: "#7A8C99" }}>{l.n}</div>
                  <div>
                    <div style={{ fontSize: "17px", fontWeight: "600", color: "#12324F" }}>{l.label}</div>
                    <div style={{ fontSize: "13.5px", lineHeight: "1.5", fontWeight: "300", color: "#5B7183", marginTop: "5px" }}>{l.desc}</div>
                  </div>
                  <div style={{ width: "12px", height: "14px", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: l.c }} />
                </div>
              </Fragment>
            ))}
            <div style={{ height: "1px", background: "rgba(12,36,52,.12)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
