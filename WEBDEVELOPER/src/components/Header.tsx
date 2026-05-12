"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "68px",
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          background: scrolled ? "rgba(27,36,27,0.96)" : "#1b241b",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginRight: "auto" }}>
          <img
            src="/assets/LOGO_CROPPED.png"
            alt="WebMolders Logo"
            style={{ height: "68px", width: "auto", display: "block", transform: "translateY(-8px)" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="desk-nav" style={{
          display: "flex",
          alignItems: "center",
          gap: "36px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const linkColor = active ? "#ffffff" : "rgba(255,255,255,0.65)";
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "14px",
                  fontWeight: active ? 700 : 500,
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = linkColor)}
              >
                {link.label}
                {active && (
                  <span style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--lime)",
                    borderRadius: "1px",
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="btn-lime desk-nav"
          style={{ fontSize: "13px", padding: "10px 20px" }}
        >
          Let&apos;s Talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Mobile Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mob-burger"
          style={{
            display: "none",
            background: "none",
            border: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "7px 9px",
            color: "#ffffff",
            lineHeight: 0,
          }}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 199,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 32px 48px",
        pointerEvents: menuOpen ? "auto" : "none",
        opacity: menuOpen ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font)",
                fontSize: "clamp(32px, 8vw, 48px)",
                fontWeight: 800,
                color: pathname === link.href ? "#8ab61e" : "var(--text)",
                textDecoration: "none",
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                padding: "14px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: menuOpen ? "none" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
              }}
            >
              {link.label}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}>
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="btn-lime"
          style={{ marginTop: "40px", width: "fit-content", opacity: menuOpen ? 1 : 0, transition: `opacity 0.4s ease ${NAV_LINKS.length * 0.06 + 0.15}s` }}
        >
          Let&apos;s Talk →
        </Link>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desk-nav { display: none !important; }
          .mob-burger { display: flex !important; }
          header { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
