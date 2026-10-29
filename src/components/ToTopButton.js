import React from 'react';

// Generated from the SeSova design export; values come from the page hook via `v`.
export default function ToTopButton({ v }) {
  return (
    <button className="hover-1" onClick={v.toTop} aria-label="Back to top" style={{ position: "fixed", right: "28px", bottom: "28px", zIndex: "70", width: "46px", height: "52px", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: "#0A3742", color: "#fff", border: "0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity .45s ease,transform .45s cubic-bezier(.4,0,.2,1),background .3s ease", opacity: v.topOpacity, transform: v.topT, pointerEvents: v.topPE }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
