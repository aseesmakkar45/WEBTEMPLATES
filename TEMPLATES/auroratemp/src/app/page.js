"use client";

import { useState } from 'react';
import Aurora from '../components/Aurora/Aurora';
import './App.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const skills = [
    'Three.js', 'React Three Fiber', 'WebGL / GLSL',
    'GSAP & ScrollTrigger', 'Framer Motion', 'Lenis Smooth Scroll',
    'Blender 3D Modeling', 'Draco compression', 'Shader Materials'
  ];

  const works = [
    {
      id: 1,
      title: 'Aetherial Canvas',
      description: 'An interactive 3D WebGL experience featuring fluid simulation, particle morphing, and custom vertex distortion shaders.',
      tag: 'shaders',
      image: '/assets/1.png'
    },
    {
      id: 2,
      title: 'Neon Odyssey',
      description: 'Immersive portfolio landing page crafted using React Three Fiber, custom lighting, shadows, and Lenis smooth scrolling.',
      tag: 'interactive',
      image: '/assets/2.png'
    },
    {
      id: 3,
      title: 'Chronos Portal',
      description: 'Physics-based 3D world with interactive mouse gravity fields, scroll-driven camera transitions, and post-processing bloom.',
      tag: 'physics',
      image: '/assets/3.png'
    }
  ];

  return (
    <>
      {/* Background Aurora WebGL Component */}
      <div className="aurora-bg">
        <Aurora
          colorStops={["#7cff67", "#B497CF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Navigation Header */}
      <header className="navbar">
        <a href="#" className="logo-container">
          AUREON
        </a>
        <nav className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="mailto:hello@aureon.design" className="nav-link">Contact</a>
        </nav>
      </header>

      <main className="container">
        {/* Hero Banner */}
        <section className="hero-section">
          <div className="badge">3D Web Designer & Creative Developer</div>
          <h1 className="hero-title">
            Crafting Immersive 3D Experiences on the Web
          </h1>
          <p className="hero-description">
            Hi, I'm Aureon. I design and build highly interactive, responsive, and performance-optimized WebGL environments that push the boundaries of modern browser design.
          </p>
          <div className="cta-group">
            <a href="#work" className="btn btn-primary">
              View Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </section>

        {/* Profile Card Section */}
        <section id="about" className="profile-section">
          <div className="glass-card">
            <div className="profile-grid">
              <div className="profile-img-container">
                <div className="profile-img-glow">
                  <img
                    src="/assets/logo.png"
                    alt="Aureon Logo"
                    className="profile-img"
                    onError={(e) => { e.currentTarget.src = '/assets/1.png' }}
                  />
                </div>
              </div>
              <div className="profile-content">
                <h2>About Myself</h2>
                <p>
                  As a passionate 3D Web Designer, I specialize in bringing high-fidelity visual concepts to life inside the browser. I combine mathematics, design, and code to engineer stunning interactive products.
                </p>
                <p>
                  My weapon of choice includes Three.js, React Three Fiber, custom GLSL fragment/vertex shaders, and smooth animation frameworks like GSAP and Motion. I focus on optimizing assets to ensure rapid page load times and butter-smooth 60fps frame rates across all mobile and desktop devices.
                </p>
                <div id="skills" style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-h)' }}>Core Toolkit</h3>
                  <div className="skills-list">
                    {skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work / Portfolio Section */}
        <section id="work" style={{ paddingBottom: '100px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>Featured Projects</h2>
          <p style={{ textAlign: 'center', color: 'var(--text)', marginBottom: '48px', fontSize: '16px' }}>
            A curated selection of WebGL and 3D design experiments.
          </p>
          <div className="projects-grid">
            {works.map(work => (
              <div key={work.id} className="project-card">
                <div className="project-icon">
                  {work.tag === 'shaders' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>}
                  {work.tag === 'interactive' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4M8 12h8" /></svg>}
                  {work.tag === 'physics' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
                </div>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} AUREON. Engineered with React, Next.js & OGL.</p>
        </div>
      </footer>
    </>
  );
}
