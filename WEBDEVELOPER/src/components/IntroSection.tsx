"use client";
import { useEffect, useRef, useState } from "react";

export default function IntroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [wordIndex, setWordIndex] = useState(0);

  const words = ["FURTHER", "NEXT LEVEL", "TO THE EDGE", "BEYOND LIMITS"];

  const handleMouseMove = (e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setCoords({ x: -1000, y: -1000 });
  };

  useEffect(() => {
    // Text reveals after a short delay
    const timer = setTimeout(() => setVisible(true), 800);
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % 4);
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const textStyle: React.CSSProperties = {
    fontFamily:    "'Gloock', serif",
    fontSize:      "clamp(40px, 7vw, 90px)",
    fontWeight:    400,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    lineHeight:    0.88,
    margin:        0,
    textAlign:     "center",
    display:       "block",
  };



  return (
    <section
      id="intro"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight:       "100vh",
        background:      "transparent",   // transparent to show ThreeCanvas behind it
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "space-between",
        position:        "relative",
        paddingTop:      "100px",
        paddingBottom:   "64px",
        overflow:        "hidden",
        cursor:          "default",
        ...({
          "--x": `${coords.x}px`,
          "--y": `${coords.y}px`,
        } as React.CSSProperties),
      }}
    >
      {/* ══════════════════════════════════════════════
          BACKGROUND  — 3D Canvas shows through (transparent)
      ══════════════════════════════════════════════ */}

      {/* ── Film texture overlay — subtle grain on top of canvas ── */}
      <img
        src="/assets/film.jpeg"
        alt=""
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          objectFit:     "cover",
          pointerEvents: "none",
          zIndex:        13,
          opacity:       0.08,
          mixBlendMode:  "screen",
        }}
      />

      {/* ══════════════════════════════════════════════
          TOP BAR  (z:20)
      ══════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
          pointerEvents: "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 1s ease, transform 1s ease",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      >
        {/* Left: Logo */}
        <div style={{ color: "#fff", fontFamily: "var(--font)", fontSize: "28px", fontWeight: 900, letterSpacing: "-1px" }}>
          CORTIZ
        </div>

        {/* Center: Nav */}
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["ABOUT", "WORKS", "LABS", "CONTACT"].map(item => (
            <a key={item} href="#" style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", letterSpacing: "1px", fontWeight: 600, textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}>
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Icons */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
            <path d="M0 6 Q4 0 8 6 T16 6 T24 6 T32 6" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 00-9-9 9.75 9.75 0 00-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 009 9 9.75 9.75 0 006.74-2.74L21 16" />
            <path d="M16 21v-5h5" />
          </svg>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          SCROLLING MARQUEE  (z:12 — cream banner + black overlay)
      ══════════════════════════════════════════════ */}
      {/* TOP BANNER */}
      <div style={{ position: "absolute", top: "68px", left: 0, right: 0, zIndex: 12 }}>
        {/* Cream marquee layer */}
        <div className="marquee-container" style={{ position: "relative" }}>
          <div className="marquee-content">
            FRONTEND DEVELOPER - WEB DEVELOPER - BACKEND DEVELOPER - CREATIVE DEVELOPER - CONSULTATION - FRONTEND DEVELOPER - WEB DEVELOPER - BACKEND DEVELOPER - CREATIVE DEVELOPER - CONSULTATION -
          </div>
        </div>
        {/* Black transparent overlay above cream */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }} />
      </div>

      {/* BOTTOM BANNER */}
      <div style={{ position: "absolute", bottom: "0", left: 0, right: 0, zIndex: 12 }}>
        {/* Cream marquee layer */}
        <div className="marquee-container" style={{ position: "relative" }}>
          <div className="marquee-content reverse">
            CONSULTATION - CREATIVE DEVELOPER - BACKEND DEVELOPER - WEB DEVELOPER - FRONTEND DEVELOPER - CONSULTATION - CREATIVE DEVELOPER - BACKEND DEVELOPER - WEB DEVELOPER - FRONTEND DEVELOPER -
          </div>
        </div>
        {/* Black transparent overlay above cream */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ══════════════════════════════════════════════
          CENTER — Full-screen text over the black film
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          zIndex:     15,
          display:    "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding:    "0 5vw",
          pointerEvents: "none",
          opacity:    1,
        }}
      >
        {/* ── Typography Container with sandwiched eyes image ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none", transform: "translateY(-80px)" }}>
          {/* ── Base (Ghost) Layer ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ ...textStyle, color: "#ffffff" }}>
              <span style={{ fontSize: "0.65em", WebkitTextStroke: "0.5px #ffffff", WebkitTextFillColor: "transparent", color: "transparent", marginRight: "0.5em" }}>TAKE</span>CREATIVITY
            </h1>

            <h1 style={{ 
              ...textStyle, 
              color: "#ffffff", 
              transform: "translateY(220px)",
              overflow: "hidden",
              display: "block"
            }}>
              <span key={wordIndex} className="word-slide">
                {words[wordIndex]}
              </span>
            </h1>
          </div>

          {/* ── Bright revealed layer — only visible under the flashlight ── */}
          <div
            style={{
              position:      "absolute",
              inset:         0,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              clipPath:      "ellipse(280px 180px at var(--x) var(--y))",
              pointerEvents: "none",
            }}
          >
            <h1 style={{ ...textStyle, color: "#ffffff", textShadow: "0 0 80px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)" }}>
              <span style={{ fontSize: "0.65em", WebkitTextStroke: "0.5px #ffffff", WebkitTextFillColor: "transparent", color: "transparent", marginRight: "0.5em" }}>TAKE</span>CREATIVITY
            </h1>

            <h1 style={{ 
              ...textStyle, 
              color: "#ffffff", 
              textShadow: "0 0 80px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)", 
              transform: "translateY(220px)",
              overflow: "hidden",
              display: "block"
            }}>
              <span key={wordIndex} className="word-slide">
                {words[wordIndex]}
              </span>
            </h1>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');

        .marquee-container {
          position: absolute;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          opacity: 1;
          background-color: var(--bg);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 12px 0;
          display: flex;
          align-items: center;
        }

        .marquee-content {
          display: inline-block;
          font-family: var(--font), sans-serif;
          font-weight: 800;
          font-size: 26px;
          letter-spacing: 0.04em;
          color: var(--text);
          animation: marquee 40s linear infinite;
        }

        .marquee-content.reverse {
          animation: marquee-reverse 40s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .word-slide {
          display: inline-block;
          animation: wordSlideIn 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        @keyframes wordSlideIn {
          0%   { opacity: 0; transform: translateY(60%); }
          100% { opacity: 1; transform: translateY(0%); }
        }
      `}</style>
    </section>
  );
}
