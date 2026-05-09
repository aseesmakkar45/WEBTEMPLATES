import React from 'react';
import { useGym } from '../context/GymState';
import { Dumbbell, User, LogOut, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { userRole, userName, logout, login } = useGym();

  const handleScrollToSection = (elementId: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#" className="logo" onClick={() => setActiveTab('home')}>
          <Dumbbell className="logo-icon" size={28} />
          FORGE<span>FITNESS</span>
        </a>

        <ul className="nav-links">
          <li>
            <span
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </span>
          </li>
          <li>
            <span
              className="nav-link"
              onClick={() => handleScrollToSection('schedule')}
            >
              Schedule
            </span>
          </li>
          <li>
            <span
              className="nav-link"
              onClick={() => handleScrollToSection('pricing')}
            >
              Memberships
            </span>
          </li>
          <li>
            <span
              className={`nav-link ${activeTab === 'portal' ? 'active' : ''}`}
              onClick={() => setActiveTab('portal')}
            >
              Member Portal
            </span>
          </li>
          {userRole === 'admin' && (
            <li>
              <span
                className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin')}
                style={{ color: 'var(--neon-yellow)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <ShieldAlert size={16} /> Admin Panel
              </span>
            </li>
          )}

          {/* User profile controls / Quick Logins */}
          <li style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {userRole === 'guest' ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
                  onClick={() => login('member')}
                >
                  Member Login
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', borderColor: 'rgba(204, 255, 0, 0.3)' }}
                  onClick={() => login('admin')}
                >
                  Trainer Login
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <User size={16} style={{ color: 'var(--neon-yellow)' }} />
                  <span style={{ fontWeight: '600', textTransform: 'uppercase' }}>{userName.split(' ')[0]}</span>
                </div>
                <button
                  className="btn btn-danger"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
