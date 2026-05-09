import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface HeroProps {
  onTrialClick: () => void;
  onViewScheduleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTrialClick, onViewScheduleClick }) => {
  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url('/images/gym-hero.png')` }}
    >
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">
            <Flame size={16} style={{ fill: 'var(--neon-yellow)' }} /> Forge Fitness
          </div>
          <h1>
            PRECISION TRAINING.<br />
            UNCOMPROMISING <span>RESULTS.</span>
          </h1>
          <p className="hero-desc">
            We are a premium strength and conditioning facility designed for individuals who demand professional results. Train under expert guidance with structured athletic programming, high-performance conditioning, and recovery support.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onTrialClick}>
              Claim 7-Day Trial
            </button>
            <button className="btn btn-secondary" onClick={onViewScheduleClick}>
              <Calendar size={18} /> View Session Timetable
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
