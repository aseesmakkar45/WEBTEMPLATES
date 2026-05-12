"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    name: "Essential Care",
    ideal: "Ideal for small business websites",
    features: [
      "Monthly security & plugin updates",
      "Weekly automated backups",
      "Uptime monitoring (24/7)",
      "Up to 2 content change requests / month",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth Care",
    ideal: "Ideal for growing businesses & e-commerce",
    features: [
      "Everything in Essential",
      "Up to 6 content change requests / month",
      "Quarterly UX review",
      "Priority 24-hour response",
      "Database optimisation",
      "Core Web Vitals monitoring",
    ],
    featured: true,
  },
  {
    name: "Enterprise Care",
    ideal: "Ideal for high-traffic & custom platforms",
    features: [
      "Everything in Growth",
      "Unlimited content changes",
      "Dedicated Slack channel",
      "1-hour emergency response",
      "Monthly analytics deep-dive",
      "Proactive security patching",
    ],
  },
];

export default function MaintenancePage() {
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
            <p className="eyebrow" style={{ marginBottom: "24px" }}>Maintenance</p>
            <h1 style={{ 
              fontFamily: "var(--font)", 
              fontSize: "clamp(44px, 8vw, 84px)", 
              fontWeight: 800,
              lineHeight: "1.05", 
              letterSpacing: "-0.03em", 
              color: "var(--text)", 
              marginBottom: "32px" 
            }}>
              Your site, always<br />at its <span style={{ color: "#8ab61e" }}>best.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.7", maxWidth: "520px", marginBottom: "48px", fontWeight: 400 }}>
              Security patches, uptime monitoring, backups, and content updates — handled quietly in the background so you can focus on your business.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-lime" style={{ fontSize: "14px", padding: "14px 28px" }}>Discuss Maintenance</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section style={{ padding: "80px 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ marginBottom: "60px" }}>
            <p className="eyebrow" style={{ marginBottom: "20px" }}>Why It Matters</p>
            <h2 className="section-h2" style={{ maxWidth: "580px" }}>
              A neglected website is a liability.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="why-grid">
            {[
              { stat: "43%", label: "of cyber attacks target small businesses", note: "Most of them exploit unpatched CMS vulnerabilities." },
              { stat: "1s", label: "of extra load time = 7% fewer conversions", note: "Performance degrades without regular maintenance." },
              { stat: "88%", label: "of users won't return after a bad experience", note: "Broken links, 404s, and outdated content cost you customers." },
              { stat: "∞", label: "peace of mind when someone else handles it", note: "Focus on your business. Leave the technical upkeep to us." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "36px",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                boxShadow: "var(--shadow)",
              }}>
                <p style={{ fontFamily: "var(--font)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, color: "#8ab61e", marginBottom: "12px", lineHeight: 1 }}>
                  {item.stat}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>{item.label}</p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "100px 0", background: "var(--bg-sage)" }}>
        <div className="container">
          <div style={{ marginBottom: "60px", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "rgba(0,0,0,0.55)", marginBottom: "20px" }}>Care Plans</p>
            <h2 className="section-h2">
              Scope-based care.
            </h2>
          </div>

          <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {PLANS.map((plan, i) => (
              <div key={i} className="plan-card" style={{
                background: "var(--white)",
                border: plan.featured ? "3px solid var(--lime)" : "1px solid var(--border)",
                borderRadius: "24px",
                padding: "48px 40px",
                position: "relative",
                boxShadow: "var(--shadow)",
              }}>
                {plan.featured && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "40px",
                    background: "var(--lime)", color: "var(--text)",
                    fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em",
                    textTransform: "uppercase", padding: "5px 16px", borderRadius: "100px",
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontFamily: "var(--font)", fontSize: "24px", fontWeight: 800, color: "var(--text)", marginBottom: "10px", letterSpacing: "-0.01em" }}>{plan.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "36px", lineHeight: "1.5" }}>{plan.ideal}</p>
                <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "28px" }} />
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      <span style={{ color: "#8ab61e", fontSize: "16px", fontWeight: "bold", lineHeight: "1.2", flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={plan.featured ? "btn-lime" : "btn-outline-dark"} style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
