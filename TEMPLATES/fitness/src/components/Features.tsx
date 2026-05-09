import React from 'react';
import { Shield, Zap, Video, CalendarDays } from 'lucide-react';

export const Features: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Industrial Facilities',
      icon: <Shield size={24} style={{ color: 'var(--neon-yellow)' }} />,
      desc: 'Our gym is built for pure strength. Concrete floors, heavy Eleiko plates, Rogue barbell racks, and high-performance turf. No gimmicks, just raw iron.'
    },
    {
      num: '02',
      title: 'Expert Strength Coaches',
      icon: <Zap size={24} style={{ color: 'var(--neon-yellow)' }} />,
      desc: 'Every session is guided by active strength and conditioning specialists. Get custom evaluations, form critiques, and professional programming.'
    },
    {
      num: '03',
      title: 'On-Demand Member Library',
      icon: <Video size={24} style={{ color: 'var(--neon-yellow)' }} />,
      desc: 'Active members unlock our gated portal, featuring full HD instructional video loops of kettlebell workouts, deep yoga sequences, and mobility routines.'
    },
    {
      num: '04',
      title: 'Smart Class Booking',
      icon: <CalendarDays size={24} style={{ color: 'var(--neon-yellow)' }} />,
      desc: 'Ditch the spreadsheets. Easily reserve spots in daily HIIT or yoga sessions, manage waitlist queues automatically, and update billing all in one place.'
    }
  ];

  return (
    <section className="features-section" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-panel)', borderBottom: 'var(--border-thick)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="hero-tag" style={{ marginBottom: '1rem' }}>Core Pillars</span>
          <h2 className="section-title">THE FORGE STANDARD</h2>
          <p className="section-subtitle">
            We operate differently. We focus on heavy weights, high-intensity conditioning, and seamless digital scheduling.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {pillars.map((p, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'border-color var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--neon-yellow)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: 'rgba(255,255,255,0.05)',
                    fontWeight: 900
                  }}>{p.num}</span>
                  <div style={{
                    backgroundColor: 'var(--bg-panel)',
                    padding: '0.6rem',
                    border: '1px solid var(--border-color)'
                  }}>
                    {p.icon}
                  </div>
                </div>
                
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
