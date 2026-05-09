import React from 'react';
import { Play, Shield, Check } from 'lucide-react';

interface PortalPreviewProps {
  onUnlockClick: () => void;
}

export const PortalPreview: React.FC<PortalPreviewProps> = ({ onUnlockClick }) => {
  return (
    <section className="portal-preview-section" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-dark)', borderBottom: 'var(--border-thick)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          
          {/* Left Side: Mock Dashboard visual */}
          <div style={{
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-panel)',
            padding: '2.5rem 2rem',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            borderRadius: '8px'
          }}>
            {/* Header controls mock */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                SECURE MEMBER ACCESS
              </div>
            </div>

            {/* Inner Dashboard Layout Mock */}
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2rem', minHeight: '300px' }}>
              {/* Mock Sidebar */}
              <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--neon-yellow)', marginBottom: '2rem' }}>
                  <Shield size={12} /> C. Evans
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <li style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Bookings</li>
                  <li style={{ color: 'var(--neon-yellow)', borderLeft: '2px solid var(--neon-yellow)', paddingLeft: '0.5rem', cursor: 'pointer' }}>Videos</li>
                  <li style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Billing</li>
                </ul>
              </div>

              {/* Mock Video Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>On-Demand Library</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Category: All</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', flexGrow: 1 }}>
                  <div style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '4px' }}>
                    <div style={{ aspectRatio: '16/9', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexGrow: 1 }}>
                      <div style={{ position: 'absolute', width: '32px', height: '32px', backgroundColor: 'var(--neon-yellow)', borderRadius: '50%', top: 'calc(50% - 16px)', left: 'calc(50% - 16px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={14} style={{ fill: 'var(--text-dark)', color: 'var(--text-dark)' }} />
                      </div>
                    </div>
                    <div style={{ padding: '0.8rem 0.75rem', fontSize: '0.7rem' }}>
                      <div style={{ color: 'var(--neon-yellow)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.6rem', marginBottom: '0.2rem' }}>HIIT</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>15-Min Kettlebell Shred</div>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '4px' }}>
                    <div style={{ aspectRatio: '16/9', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexGrow: 1 }}>
                      <div style={{ position: 'absolute', width: '32px', height: '32px', backgroundColor: 'var(--neon-yellow)', borderRadius: '50%', top: 'calc(50% - 16px)', left: 'calc(50% - 16px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={14} style={{ fill: 'var(--text-dark)', color: 'var(--text-dark)' }} />
                      </div>
                    </div>
                    <div style={{ padding: '0.8rem 0.75rem', fontSize: '0.7rem' }}>
                      <div style={{ color: 'var(--neon-yellow)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.6rem', marginBottom: '0.2rem' }}>Yoga</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Deep Release Yoga Flow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Description & CTA */}
          <div>
            <span className="hero-tag" style={{ marginBottom: '1rem' }}>Gated Library</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              TRAIN ANYWHERE WITH ON-DEMAND PROGRAMS
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Unable to train in person? Our secure members-only portal provides comprehensive access. Stream HD instructional content led by Coach Alexander and Coach Clara, manage your upcoming training sessions, and update your membership profiles on any device.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--neon-yellow)' }} />
                <span>Access to 50+ on-demand training videos</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--neon-yellow)' }} />
                <span>Instructional movement libraries and program guides</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--neon-yellow)' }} />
                <span>Self-serve session scheduling and billing administration</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={onUnlockClick}>
              Unlock Portal Access
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
