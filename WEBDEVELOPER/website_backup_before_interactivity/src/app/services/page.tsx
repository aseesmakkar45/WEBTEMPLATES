"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "Business Websites",
    subtitle: "Professional Online Credibility",
    desc: "A custom multi-page digital presence engineered to establish ultimate authority in your market and generate inquiries.",
    ideal: "Consultants, Clinics, Architects, Law Firms, Professional Service providers.",
    timeline: "3 - 4 Weeks",
    features: [
      "Up to 8 custom designed pages",
      "Headless CMS integration (manage copy/media easily)",
      "Premium contact forms & location integrations",
      "Google Maps & Search Console indexing",
    ],
    href: "/web-design",
  },
  {
    num: "02",
    title: "E-Commerce Stores",
    subtitle: "Optimized Online Sales Pipelines",
    desc: "Speed-optimized shopping portals designed to minimize cart abandonment and make product purchases completely seamless.",
    ideal: "Direct-to-consumer brands, Product founders, Retail outlets scaling online.",
    timeline: "4 - 6 Weeks",
    features: [
      "Custom product catalogs and filter systems",
      "Secure checkout via Razorpay, Stripe & PayPal integrations",
      "Order management backend",
      "Automated customer receipt dispatch",
    ],
    href: "/ecommerce",
  },
  {
    num: "03",
    title: "High-Converting Landing Pages",
    subtitle: "Engineered Lead Generation",
    desc: "Ultra-fast single-page sites built specifically to execute visual marketing campaigns and maximize prospect conversions.",
    ideal: "SaaS founders, Product launches, Book promotions, Campaign builders.",
    timeline: "1 - 2 Weeks",
    features: [
      "A/B testing-friendly layout structures",
      "Embedded lead-capture forms",
      "Interactive FAQs & testimonial carousels",
      "Lighthouse performance rating of 98+",
    ],
    href: "/web-design",
  },
  {
    num: "04",
    title: "Portfolio Websites",
    subtitle: "Personal Branding & Influence",
    desc: "Stunning visual showcases crafted for creative professionals who need to demonstrate absolute quality in their field.",
    ideal: "Photographers, Visual Designers, Artists, Elite Freelancers.",
    timeline: "2 Weeks",
    features: [
      "Smooth scroll layout animations",
      "High-definition lazy loaded graphics",
      "Dynamic case study showcases",
      "Direct social links & bookings integration",
    ],
    href: "/portfolio",
  },
  {
    num: "05",
    title: "Custom Web Applications",
    subtitle: "Tailored Business Software Systems",
    desc: "Fully bespoke web portals featuring user access control, dashboards, custom databases, and real-time operations.",
    ideal: "Startups, Small businesses needing internal tooling, SaaS MVPs.",
    timeline: "6 - 8 Weeks",
    features: [
      "Secure User Auth (Cognito/Supabase/Firebase)",
      "Interactive tables, chart analytics & dashboard layouts",
      "REST API setups & database sync (Postgres/MongoDB)",
      "Automated backup procedures",
    ],
    href: "/web-design",
  },
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hero Header on Cream */}
      <section style={{ padding: "160px 0 80px", background: "var(--bg)" }}>
        <div
          className="container"
          style={{
            textAlign: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span className="eyebrow">What I Do</span>
          <h1
            style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(44px, 7vw, 76px)",
              fontWeight: 800,
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "24px",
            }}
          >
            Premium Web Services
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "520px",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
            I build custom, outcomes-focused web platforms. No templates, no bloat. Just speed, beauty, and results.
          </p>
        </div>
      </section>

      {/* Services List on Sage BG */}
      <section style={{ background: "var(--bg-sage)", padding: "100px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--white)",
                  borderRadius: "20px",
                  padding: "48px",
                  boxShadow: "var(--shadow)",
                }}
                className="service-detail-card"
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: "48px",
                    alignItems: "start",
                  }}
                  className="service-detail-grid"
                >
                  {/* Left block info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#8ab61e",
                        }}
                      >
                        {service.subtitle}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font)",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "rgba(0,0,0,0.15)",
                        }}
                      >
                        {service.num}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font)",
                        fontSize: "clamp(24px, 3.5vw, 32px)",
                        fontWeight: 800,
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.1",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-muted)",
                        lineHeight: "1.65",
                        fontWeight: 400,
                      }}
                    >
                      {service.desc}
                    </p>

                    <div
                      style={{
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        paddingTop: "20px",
                        marginTop: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px", fontSize: "13px" }}>
                        <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>Ideal for:</span>
                        <span style={{ color: "var(--text)", fontWeight: 600 }}>{service.ideal}</span>
                      </div>
                      <div style={{ display: "flex", gap: "8px", fontSize: "13px" }}>
                        <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>Timeline:</span>
                        <span style={{ color: "var(--text)", fontWeight: 600 }}>{service.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Checklist */}
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.02)",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      borderRadius: "16px",
                      padding: "32px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        marginBottom: "16px",
                      }}
                    >
                      What's Included
                    </h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {service.features.map((feat, fidx) => (
                        <li
                          key={fidx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "13px",
                            color: "var(--text-muted)",
                            lineHeight: "1.5",
                          }}
                        >
                          <span style={{ color: "#8ab61e", fontWeight: "bold" }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="btn-outline-dark"
                      style={{
                        marginTop: "24px",
                        width: "100%",
                        justifyContent: "center",
                        fontSize: "12px",
                        padding: "10px 20px",
                      }}
                    >
                      View Service Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Specs section on Cream */}
      <section style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "var(--text)",
              textAlign: "center",
              marginBottom: "64px",
              letterSpacing: "-0.02em",
            }}
          >
            Standard Specs in Every Build
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="standards-grid"
          >
            {[
              { title: "Mobile Layout Audit", desc: "Pixel-perfect rendering optimized specifically for modern handheld browsers." },
              { title: "Google Schema Markup", desc: "Structured data integrated into pages to help search bots map website content." },
              { title: "Lead Optimization", desc: "Embedded dynamic calculator tools or conversion forms to maximize lead counts." },
              { title: "Framer Motion Spicing", desc: "Micro-animations that increase spatial depth and boost user engagement." },
            ].map((std, sidx) => (
              <div
                key={sidx}
                style={{
                  padding: "32px",
                  borderRadius: "16px",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "var(--lime)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "12px",
                  }}
                >
                  {std.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic CTA at bottom */}
      <section style={{ padding: "80px 0 60px", background: "var(--bg)" }}>
        <div className="container reveal" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="eyebrow" style={{ display: "inline-block", marginBottom: "20px" }}>
            Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(32px, 5vw, 52px)",
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
        @media (max-width: 990px) {
          .standards-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .standards-grid {
            grid-template-columns: 1fr !important;
          }
          .service-detail-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
