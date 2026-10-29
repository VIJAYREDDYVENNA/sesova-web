import React, { Fragment } from 'react';

// Generated from the SeSova design export; values come from the page hook via `v`.
export default function Intelligence({ v }) {
  return (
    <section id="intelligence" style={{ padding: "120px 0", background: "#F1F7F9" }}>
      <div className="wrap" style={{ maxWidth: "calc(var(--page-max) + 80px)", margin: "0 auto", padding: "0 40px" }}>
        <div className="sgrid sgrid-c">
          <div data-rise="">
            <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".2em", color: "#14707A" }}>07 — PORTFOLIO INTELLIGENCE</div>
            <h2 style={{ margin: "20px 0 0", fontSize: "40px", lineHeight: "1.14", letterSpacing: "-.025em", fontWeight: "300", color: "#12324F" }}>
              Connected operations become{" "}
              <span style={{ fontWeight: "600" }}>decision-ready insight.</span>
            </h2>
            <p style={{ margin: "22px 0 0", fontSize: "16px", lineHeight: "1.65", fontWeight: "300", color: "#41586A" }}>Because financing, execution, procurement and assets sit on one model, portfolio views are a query rather than a reconciliation exercise.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginTop: "34px", background: "rgba(12,36,52,.12)" }}>
              {v.intel.map((i, iIdx) => (
                <Fragment key={iIdx}>
                  <div style={{ background: "#F1F7F9", padding: "18px 0", display: "flex", gap: "18px", alignItems: "baseline" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: ".12em", color: "#4E9E6A", flex: "none", width: "26px" }}>{i.n}</span>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#12324F" }}>{i.t}</div>
                      <div style={{ fontSize: "13.5px", lineHeight: "1.55", fontWeight: "300", color: "#5B7183", marginTop: "4px" }}>{i.s}</div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div data-rise="" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div data-wipe="" style={{ border: "1px solid rgba(12,36,52,.14)", background: "#fff", padding: "24px 26px 26px" }}>
              <div style={{ fontSize: "10.5px", fontWeight: "600", letterSpacing: ".12em", color: "#7A8C99" }}>SIGNAL FEED — LIVE RECORD</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginTop: "16px", background: "rgba(12,36,52,.1)" }}>
                {v.signalFeed.map((s, sIdx) => (
                  <Fragment key={sIdx}>
                    <div style={{ background: "#fff", padding: "12px 0", display: "flex", gap: "12px", alignItems: "center" }}>
                      <span style={{ width: "3px", alignSelf: "stretch", background: s.c, flex: "none" }} />
                      <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#12324F", flex: "1" }}>{s.t}</span>
                      <span style={{ fontSize: "11px", fontWeight: "600", color: s.c, whiteSpace: "nowrap" }}>{s.v}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="ichart" style={{ border: "1px solid rgba(12,36,52,.14)", background: "#fff", padding: "30px 32px 34px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#12324F" }}>Portfolio exposure by stage</div>
                <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".1em", color: "#7A8C99" }}>DEMO DATA</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8,minmax(0,1fr))", gap: "7px", alignItems: "flex-end", height: "190px", marginTop: "28px" }}>
                {v.chart.map((c, cIdx) => (
                  <Fragment key={cIdx}>
                    <div style={{ minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: "9px", height: "100%" }}>
                      <div className="cval" style={{ fontSize: "9px", fontWeight: "600", color: "#3B5163", whiteSpace: "nowrap" }}>{c.v}</div>
                      <div data-bar="" style={{ width: "100%", height: c.h, background: c.c, animationDelay: c.d, animationTimeline: "view()", animationRange: "entry 0% entry 60%" }} />
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className="clabels">
                {v.chart.map((c, cIdx) => (
                  <Fragment key={cIdx}>
                    <div className="clabel">{c.label}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
