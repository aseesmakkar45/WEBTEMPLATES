"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TECH_BADGES = [
  "React", "Next.js", "Tailwind CSS", "Figma", "Shopify", "Webflow", "WordPress", "Node.js"
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Change body background color when About page is mounted
    document.body.style.backgroundColor = "#1b241b";
    return () => {
      document.body.style.backgroundColor = ""; // revert on unmount
    };
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#1b241b",
        color: "#EEE9DF",
        paddingTop: "120px",
        paddingBottom: "80px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
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
          <div>
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
            <h1
              style={{
                fontFamily: "var(--font)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "32px",
              }}
            >
              Design-driven developer with a passion for craft.
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "rgba(238,233,223,0.75)",
                marginBottom: "24px",
                fontWeight: 400,
              }}
            >
              I'm a freelance web designer and developer based in creating premium digital experiences for brands worldwide. With 8+ years of experience, I blend strategic thinking with meticulous design execution.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "rgba(238,233,223,0.75)",
                marginBottom: "40px",
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
              {TECH_BADGES.map((badge) => (
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
    </section>
  );
}
