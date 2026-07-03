"use client";

/**
 * Global page-transition overlay.
 * Sits at z-index 9999, covers the entire viewport.
 * Controlled imperatively via document.getElementById('page-transition-overlay').
 * Starts invisible (opacity:0, pointer-events:none).
 */
export default function PageTransitionOverlay() {
  return (
    <div
      id="page-transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "opacity 900ms ease-in-out",
      }}
      aria-hidden="true"
    />
  );
}
