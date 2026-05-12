"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#1a1a1a",
      color: "rgba(255,255,255,0.7)",
      padding: "80px 0 40px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>

        {/* Top grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "#C5F135",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4.5 13.5H11L11 22L19.5 10.5H13L13 2Z" fill="#161616"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "var(--font)",
                fontWeight: 800,
                fontSize: "15px",
                color: "#ffffff",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                Antigravity
              </span>
            </Link>
            <p style={{ fontSize: "14px", lineHeight: "1.7", maxWidth: "260px", color: "rgba(255,255,255,0.45)" }}>
              Crafting extraordinary web experiences that make businesses impossible to ignore.
            </p>
            {/* Availability */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "24px" }}>
              <div style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.7)",
              }}/>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Available for Projects
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C5F135", marginBottom: "20px" }}>
              Services
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/web-design", label: "Web Design" },
                { href: "/ecommerce", label: "E-Commerce" },
                { href: "/seo", label: "SEO & Marketing" },
                { href: "/maintenance", label: "Maintenance" },
              ].map((s) => (
                <Link key={s.href} href={s.href} style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C5F135", marginBottom: "20px" }}>
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { href: "/portfolio", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C5F135", marginBottom: "20px" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:hello@antigravity.in" style={{
                fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
              >
                hello@antigravity.in
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{
                fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
              >
                WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Antigravity Studio. All rights reserved.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            Crafted with obsession in India 🇮🇳
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          footer > div { padding: 0 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
