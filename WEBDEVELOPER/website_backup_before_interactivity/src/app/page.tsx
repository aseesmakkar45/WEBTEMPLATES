"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Project data with gradient backgrounds ─── */
const PROJECTS = [
  {
    title: "Luxe Jewelry",
    tags: "E-Commerce · Branding · Development",
    img: "/images/luxe-jewelry.png",
    href: "/portfolio",
  },
  {
    title: "Urban Apparel Co",
    tags: "Web Design · Shopify · Strategy",
    img: "/images/urban-apparel.png",
    href: "/portfolio",
  },
  {
    title: "Zenith Finance",
    tags: "SaaS · Dashboard · UI/UX",
    img: "/images/zenith-finance.png",
    href: "/portfolio",
  },
  {
    title: "Nomad Travel",
    tags: "Booking Platform · Mobile · Web App",
    img: "/images/nomad-travel.png",
    href: "/portfolio",
  },
];

/* ─── Services data ─── */
const SERVICES = [
  {
    num: "01",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: "Web Design",
    desc: "Custom, conversion-focused designs that capture your brand essence and engage your audience.",
    href: "/web-design",
  },
  {
    num: "02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Development",
    desc: "Clean, performant code built with modern technologies. Fast, secure, and scalable solutions.",
    href: "/web-design",
  },
  {
    num: "03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    title: "E-Commerce",
    desc: "Shopify, WooCommerce, custom stores. Built to sell more and provide seamless experiences.",
    href: "/ecommerce",
  },
  {
    num: "04",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    title: "SEO Strategy",
    desc: "Technical SEO, content strategy, and performance optimization to rank higher and grow traffic.",
    href: "/seo",
  },
  {
    num: "05",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: "Brand Identity",
    desc: "Logo design, visual systems, and brand guidelines that make you memorable and consistent.",
    href: "/web-design",
  },
  {
    num: "06",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Consulting",
    desc: "Strategic guidance on digital presence, tech stack, and growth opportunities for your business.",
    href: "/contact",
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    text: "Working with this studio completely transformed our online presence. Sales increased by 3x within the first month after launch.",
    name: "Priya Sharma",
    role: "Founder, Luxe Jewelry",
    avatar: "PS",
    color: "#f9a8d4",
  },
  {
    text: "The best investment we made for our brand. The attention to detail and quality of work is unmatched. Highly recommend!",
    name: "Arjun Mehta",
    role: "CEO, Mehta & Associates",
    avatar: "AM",
    color: "#86efac",
  },
  {
    text: "Delivered exactly what we needed — fast, beautiful, and perfectly optimized. Our bounce rate dropped by 60%.",
    name: "Kavya Reddy",
    role: "Marketing Head, Nomad Travel",
    avatar: "KR",
    color: "#93c5fd",
  },
];

/* ═══════════════════════════════════════════════ */

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ paddingTop: "68px", background: "var(--bg)", minHeight: "100vh" }}>
        <div
          className="container hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
            minHeight: "calc(100vh - 68px)",
            paddingTop: "40px",
            paddingBottom: "60px",
          }}
        >
          {/* Left: Text */}
          <div>
            {/* Availability badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "100px",
              marginBottom: "36px",
            }}>
              <div style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.8)",
                flexShrink: 0,
              }}/>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#3a3a3a" }}>
                Available for new projects
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(44px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "24px",
            }}>
              I craft{" "}
              <span style={{ color: "#8ab61e" }}>digital</span>
              <br />
              experiences
              <br />
              that convert.
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: "15px",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "340px",
              marginBottom: "40px",
              fontWeight: 400,
            }}>
              Premium web design &amp; development for ambitious brands ready to stand out and scale.
            </p>

            {/* CTAs */}
            <div className="hero-btns" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "56px" }}>
              <Link href="/portfolio" className="btn-lime" style={{ fontSize: "14px", padding: "14px 28px" }}>
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline-dark" style={{ fontSize: "14px", padding: "12px 28px" }}>
                Start a Project
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-row" style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
              {[
                { val: "50+", label: "Projects Delivered" },
                { val: "8+", label: "Years Experience" },
                { val: "100%", label: "Client Satisfaction" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "var(--text)", lineHeight: 1, marginBottom: "4px" }}>
                      {s.val}
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)" }}>
                      {s.label}
                    </p>
                  </div>
                  {i < 2 && <div className="stat-divider" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image box */}
          <div style={{ position: "relative" }}>
            {/* Lime circle — top right */}
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--lime)",
              zIndex: 2,
            }}/>

            {/* Lime square outline — bottom left */}
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "-20px",
              width: "80px",
              height: "80px",
              borderRadius: "12px",
              border: "3px solid var(--lime)",
              zIndex: 2,
            }}/>

            {/* Main image/portrait box */}
            <div style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              maxWidth: "520px",
              marginLeft: "auto",
            }}>
              <img
                src="/images/portrait.png"
                alt="Landon Norris"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════ */}
      <div style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "16px 0",
        background: "rgba(0,0,0,0.02)",
      }}>
        <div className="marquee-track">
          {[
            "Web Design", "★", "E-Commerce", "★", "SEO Strategy", "★", "Next.js", "★",
            "Shopify", "★", "Brand Identity", "★", "React", "★", "Consulting", "★",
            "Web Design", "★", "E-Commerce", "★", "SEO Strategy", "★", "Next.js", "★",
            "Shopify", "★", "Brand Identity", "★", "React", "★", "Consulting", "★",
          ].map((word, i) => (
            <span key={i} style={{
              fontSize: word === "★" ? "10px" : "13px",
              fontWeight: 600,
              color: word === "★" ? "#8ab61e" : "rgba(0,0,0,0.4)",
              padding: "0 20px",
              whiteSpace: "nowrap",
              letterSpacing: word !== "★" ? "0.04em" : "0",
              textTransform: "uppercase",
            }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="container">
          {/* Header row */}
          <div className="reveal" style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div>
              <span className="eyebrow">Selected Work</span>
              <h2 className="section-h2">Featured Projects</h2>
            </div>
            <Link href="/portfolio" style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* 2-column project grid */}
          <div className="projects-grid reveal" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}>
            {PROJECTS.map((project, i) => (
              <Link key={i} href={project.href} className="project-card">
                {/* Image */}
                <div className="project-card-img" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={project.img}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 400 }}>
                      {project.tags}
                    </p>
                  </div>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "var(--text)",
                    transition: "background 0.2s, border-color 0.2s",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — sage background
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--bg-sage)", padding: "100px 0" }}>
        <div className="container">
          {/* Centered header */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow">What I Do</span>
            <h2 className="section-h2" style={{ marginBottom: "20px" }}>Services</h2>
            <p style={{
              fontSize: "16px",
              color: "#4a5a40",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.65",
            }}>
              End-to-end digital solutions that help your business grow and make an impact online.
            </p>
          </div>

          {/* 3-col service cards */}
          <div className="svc-grid reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}>
            {SERVICES.map((svc, i) => (
              <Link key={i} href={svc.href} style={{ textDecoration: "none" }}>
                <div className="svc-card">
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}>
                    <div className="svc-icon">{svc.icon}</div>
                    <span style={{
                      fontFamily: "var(--font)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "rgba(0,0,0,0.12)",
                      letterSpacing: "-0.01em",
                    }}>
                      {svc.num}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.65" }}>
                    {svc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--bg)", padding: "100px 0" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-h2">What Clients Say</h2>
          </div>

          <div className="testi-grid reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#8ab61e">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: "1.7",
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: t.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT ME — Dark olive background
      ══════════════════════════════════════ */}
      <section style={{ background: "#1b241b", color: "#EEE9DF", padding: "100px 0" }}>
        <div className="container reveal">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "64px",
              alignItems: "center",
            }}
            className="about-grid"
          >
            {/* Left Column: Bio */}
            <div style={{ textAlign: "left" }}>
              <span
                className="eyebrow"
                style={{
                  color: "var(--lime)",
                  display: "inline-block",
                  marginBottom: "20px",
                }}
              >
                About Me
              </span>
              <h2
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  marginBottom: "24px",
                }}
              >
                Design-driven developer with a passion for craft.
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "rgba(238,233,223,0.75)",
                  marginBottom: "20px",
                  fontWeight: 400,
                }}
              >
                I'm a freelance web designer and developer based in creating premium digital experiences for brands worldwide. With 8+ years of experience, I blend strategic thinking with meticulous design execution.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "rgba(238,233,223,0.75)",
                  marginBottom: "36px",
                  fontWeight: 400,
                }}
              >
                Every project is an opportunity to push boundaries and create something that truly resonates with your audience and drives real business results.
              </p>

              {/* Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {[
                  "React", "Next.js", "Tailwind CSS", "Figma", "Shopify", "Webflow", "WordPress", "Node.js"
                ].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      display: "inline-block",
                      padding: "8px 18px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "100px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Portrait */}
            <div style={{ position: "relative" }}>
              {/* Image Wrapper */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  maxWidth: "480px",
                  marginLeft: "auto",
                }}
              >
                <img
                  src="/images/portrait.png"
                  alt="Landon Norris Portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Experience overlay badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  background: "var(--lime)",
                  color: "var(--text)",
                  padding: "24px 32px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  zIndex: 10,
                  width: "200px",
                  textAlign: "left",
                }}
                className="experience-badge"
              >
                <p
                  style={{
                    fontFamily: "var(--font)",
                    fontSize: "48px",
                    fontWeight: 800,
                    lineHeight: "1",
                    marginBottom: "4px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  8+
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    lineHeight: "1.3",
                    color: "rgba(22,22,22,0.7)",
                  }}
                >
                  Years of Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .experience-badge {
            left: 20px !important;
            bottom: -10px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════
          PROCESS / HOW IT WORKS
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--bg-sage)", padding: "100px 0" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow">Process</span>
            <h2 className="section-h2">How I Work</h2>
          </div>

          <div className="reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}>
            {[
              { num: "01", title: "Discovery", desc: "Deep-dive into your goals, audience, and competitors in a focused strategy call." },
              { num: "02", title: "Strategy", desc: "Architecture, wireframes, and user flow mapped out before design begins." },
              { num: "03", title: "Build", desc: "Design and development in parallel with weekly previews and unlimited revisions." },
              { num: "04", title: "Launch", desc: "Multi-device testing, Lighthouse audit, and 30-day post-launch support." },
            ].map((step, i) => (
              <div key={i} style={{
                background: "var(--white)",
                borderRadius: "16px",
                padding: "36px 28px",
                marginLeft: i > 0 ? "2px" : "0",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--lime)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--text)",
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontFamily: "var(--font)",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.65" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — Cream section (Exact replica of screenshot)
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--bg)", padding: "100px 0 60px" }}>
        <div className="container reveal" style={{ maxWidth: "800px", textAlign: "center" }}>
          {/* Eyebrow */}
          <span className="eyebrow" style={{ display: "inline-block", marginBottom: "20px" }}>
            Get In Touch
          </span>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "24px",
            }}
          >
            Let's create something
            <br />
            amazing together.
          </h2>

          {/* Subtitle */}
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
    </>
  );
}
