import React from 'react';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onLinkClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const handleScrollToSection = (elementId: string) => {
    onLinkClick('home');
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Logo & Description */}
          <div className="footer-logo-desc">
            <a href="#" className="logo" onClick={() => onLinkClick('home')}>
              <Dumbbell className="logo-icon" size={24} />
              FORGE<span>FITNESS</span>
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '350px', lineHeight: '1.6' }}>
              We are a premium industrial training facility. No gimmicks, no shortcuts—just raw training, custom class schedules, and dedicated elite coaches.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" className="nav-link" style={{ padding: 0 }} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="nav-link" style={{ padding: 0 }} aria-label="Youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="nav-link" style={{ padding: 0 }} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="footer-title">TRAINING PORTALS</h4>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onLinkClick('home'); }}>
                  Homepage View
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToSection('schedule'); }}>
                  Weekly Schedule
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToSection('pricing'); }}>
                  Trial & Memberships
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onLinkClick('portal'); }}>
                  Exclusive Member Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="footer-title">THE BOUTIQUE</h4>
            <ul className="footer-links" style={{ gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--neon-yellow)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem' }}>
                  128 Forge Way, Suite 10, Industrial District
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--neon-yellow)' }} />
                <span style={{ fontSize: '0.9rem' }}>+1 (555) 367-4348</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--neon-yellow)' }} />
                <span style={{ fontSize: '0.9rem' }}>coaching@forgefitness.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} FORGE FITNESS. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className="nav-link" style={{ fontSize: '0.8rem', padding: 0 }}>Privacy Policy</a>
            <a href="#" className="nav-link" style={{ fontSize: '0.8rem', padding: 0 }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
