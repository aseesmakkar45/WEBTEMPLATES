"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SEO_SERVICES = [
  { title: "Technical SEO Audit", desc: "Deep crawl identifying crawl errors, broken links, duplicate content, missing tags, and Core Web Vitals failures. You get a prioritised fix list." },
  { title: "On-Page Optimisation", desc: "Title tags, meta descriptions, heading hierarchy, internal linking, and keyword placement — every page tuned to rank." },
  { title: "Local SEO", desc: "Google Business Profile optimisation, local citations, and geo-targeted content to dominate your city's search results." },
  { title: "Content Strategy", desc: "Keyword research, topic cluster mapping, and a content calendar that builds topical authority in your niche." },
  { title: "Link Building", desc: "White-hat outreach to earn quality backlinks from relevant Indian and international publications. No spam, no PBNs." },
  { title: "Performance & CWV", desc: "Lighthouse 100 is our standard. LCP, FID, CLS — we optimise every Core Web Vitals metric that Google uses as a ranking signal." },
];

export default function SeoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", padding: "140px 0 100px", background: "var(--bg)" }}>
        <div 
          className="container"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ maxWidth: "820px" }}>
            <p className="eyebrow" style={{ marginBottom: "24px" }}>SEO & Marketing</p>
            <h1 style={{ 
              fontFamily: "var(--font)", 
              fontSize: "clamp(44px, 8vw, 84px)", 
              fontWeight: 800,
              lineHeight: "1.05", 
              letterSpacing: "-0.03em", 
              color: "var(--text)", 
              marginBottom: "32px" 
            }}>
              Rank higher.<br />Grow <span style={{ color: "#8ab61e" }}>faster.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.7", maxWidth: "520px", marginBottom: "48px", fontWeight: 400 }}>
              Technical SEO, content strategy, and performance optimisation that drives consistent, compounding organic traffic — no paid ads required.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-lime" style={{ fontSize: "14px", padding: "14px 28px" }}>Get an SEO Audit</Link>
              <Link href="/portfolio" className="btn-outline-dark" style={{ fontSize: "14px", padding: "13px 28px" }}>See Results</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What matters banner */}
      <div 
        style={{
          background: "rgba(197, 241, 53, 0.08)",
          borderTop: "1px solid rgba(138, 182, 30, 0.15)",
          borderBottom: "1px solid rgba(138, 182, 30, 0.15)",
          padding: "56px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font)",
            fontSize: "clamp(18px, 3vw, 26px)",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: "1.4",
            maxWidth: "760px",
            margin: "0 auto",
          }}>
            &ldquo;Every rupee you spend on SEO compounds forever. Every rupee on ads disappears the moment you stop paying.&rdquo;
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ marginBottom: "64px" }}>
            <p className="eyebrow" style={{ marginBottom: "20px" }}>Services</p>
            <h2 className="section-h2">
              Full-spectrum SEO.
            </h2>
          </div>

          <div className="seo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {SEO_SERVICES.map((s, i) => (
              <div key={i} className="seo-card" style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "36px",
                boxShadow: "var(--shadow)",
              }}>
                <div style={{ 
                  fontFamily: "var(--font)", 
                  fontSize: "32px", 
                  fontWeight: 800,
                  color: "#8ab61e", 
                  marginBottom: "20px", 
                  opacity: 0.35 
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ 
                  fontFamily: "var(--font)", 
                  fontSize: "18px", 
                  fontWeight: 700,
                  color: "var(--text)", 
                  marginBottom: "12px" 
                }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.65" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section style={{ padding: "80px 0 60px", background: "var(--bg)" }}>
        <div className="container reveal" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="eyebrow" style={{ display: "inline-block", marginBottom: "20px" }}>
            Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: "1.15",
              marginBottom: "24px",
            }}
          >
            Let's create something
            <br />
            amazing together.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "520px",
              margin: "0 auto 40px",
              fontWeight: 400,
            }}
          >
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
          </p>

          {/* Buttons Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "56px",
            }}
          >
            {/* Email button */}
            <a
              href="mailto:hello@antigravity.in"
              className="btn-lime"
              style={{
                padding: "14px 28px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              hello@antigravity.in
            </a>

            {/* Schedule button */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
              style={{
                padding: "13px 28px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a Call
            </a>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.07)",
              width: "100%",
              marginBottom: "40px",
            }}
          />

          {/* Social Links Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {[
              {
                name: "Twitter",
                href: "https://twitter.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                name: "Dribbble",
                href: "https://dribbble.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                  </svg>
                ),
              },
              {
                name: "GitHub",
                href: "https://github.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                ),
              },
              {
                name: "Instagram",
                href: "https://instagram.com",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(0, 0, 0, 0.04)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .seo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
