import React from 'react';
import { useGym } from '../context/GymState';
import { Check } from 'lucide-react';

interface PricingProps {
  onJoinSuccess: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onJoinSuccess }) => {
  const { login, addToast } = useGym();

  const handlePurchase = (tierName: string) => {
    login('member', 'Guest Member');
    addToast(`Successfully enrolled in the ${tierName}! Gated portal unlocked.`, 'success');
    onJoinSuccess(); // Switches view to portal
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-header">
          <h2 className="section-title">MEMBERSHIP PLANS</h2>
          <p className="section-subtitle">
            Transparent rates, no long-term contracts. Join our training facility and elevate your athletic potential with expert coaching.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Trial Pass */}
          <div className="pricing-card">
            <h3 className="tier-name">7-Day Trial</h3>
            <p className="tier-desc">Test our facility, try our coaches, and see the results first-hand.</p>
            <div className="tier-price">
              $19 <span>/ one-time</span>
            </div>
            
            <ul className="tier-features">
              <li><Check size={18} /> Access to all daily HIIT classes</li>
              <li><Check size={18} /> Access to all daily Yoga sessions</li>
              <li><Check size={18} /> Free initial coach evaluation</li>
              <li><Check size={18} /> Gated member portal preview</li>
            </ul>

            <button className="btn btn-secondary" onClick={() => handlePurchase('7-Day Trial Pass')}>
              Select Trial Pass
            </button>
          </div>

          {/* Elite Membership */}
          <div className="pricing-card featured">
            <h3 className="tier-name">Elite Monthly</h3>
            <p className="tier-desc">Our most popular training tier. Designed for committed athletes.</p>
            <div className="tier-price">
              $89 <span>/ month</span>
            </div>
            
            <ul className="tier-features">
              <li><Check size={18} /> Unlimited monthly HIIT & Yoga classes</li>
              <li><Check size={18} /> Full gym floor & locker room access</li>
              <li><Check size={18} /> 1x Monthly personal coaching check-in</li>
              <li><Check size={18} /> Gated member dashboard & video library</li>
              <li><Check size={18} /> 10% off all Forge apparel</li>
            </ul>

            <button className="btn btn-primary" onClick={() => handlePurchase('Elite Monthly Membership')}>
              Enroll Now
            </button>
          </div>

          {/* VIP membership */}
          <div className="pricing-card">
            <h3 className="tier-name">VIP All-Access</h3>
            <p className="tier-desc">For those who want direct trainer access and nutritional blueprints.</p>
            <div className="tier-price">
              $149 <span>/ month</span>
            </div>
            
            <ul className="tier-features">
              <li><Check size={18} /> Everything in the Elite membership</li>
              <li><Check size={18} /> Dedicated coach with 24/7 direct chat</li>
              <li><Check size={18} /> Personalized nutrition & supplement plan</li>
              <li><Check size={18} /> 2x Free guest passes per month</li>
              <li><Check size={18} /> VIP lounge access</li>
            </ul>

            <button className="btn btn-secondary" onClick={() => handlePurchase('VIP All-Access Membership')}>
              Apply for VIP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
