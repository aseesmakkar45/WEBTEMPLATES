"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track mouse coordinates
    const mouse = { x: 0, y: 0 };
    // Interpolated coordinates for the trailing ring
    const ring = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Interactive hover triggers
    const onMouseOverInteractive = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1.6)";
        dotRef.current.style.background = "var(--theme-b, var(--orange))";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1.5)";
        ringRef.current.style.borderColor = "var(--orange)";
        ringRef.current.style.background = "rgba(255, 255, 255, 0.08)";
      }
    };

    const onMouseOutInteractive = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        dotRef.current.style.background = "var(--orange)";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.35)";
        ringRef.current.style.background = "transparent";
      }
    };

    // Attach listeners to links and buttons
    const attachListeners = () => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], .btn-primary, .btn-outline, .service-card, .project-card, .feature-item, input, textarea, select"
      );
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseOverInteractive);
        el.removeEventListener("mouseleave", onMouseOutInteractive);
        el.addEventListener("mouseenter", onMouseOverInteractive);
        el.addEventListener("mouseleave", onMouseOutInteractive);
      });
    };

    attachListeners();

    // Re-attach when page content changes (like route transitions or CMS rendering)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let animFrameId: number;

    const tick = () => {
      // LERP formula for buttery smooth trailing
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }

      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Hide native cursor for high-end presentation
    document.documentElement.style.cursor = "none";
    const cssStyle = document.createElement("style");
    cssStyle.innerHTML = `
      body, html, a, button, [role="button"], .btn-primary, .btn-outline, .service-card, input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(cssStyle);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      document.documentElement.style.cursor = "auto";
      cssStyle.remove();
    };
  }, []);

  return (
    <>
      {/* Inner solid dot with difference blending (inverts colors beneath it) */}
      <div
        ref={dotRef}
        id="cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--orange)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.25s ease",
          mixBlendMode: "difference",
        }}
      />
      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.25s ease, background-color 0.25s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
