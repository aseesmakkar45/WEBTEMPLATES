import React, { useState } from 'react';
import { useGym } from '../context/GymState';
import type { WorkoutVideo } from '../context/GymState';
import { Calendar, Play, CreditCard, Video, LogIn, X, Info } from 'lucide-react';

export const MemberPortal: React.FC = () => {
  const {
    userRole,
    userName,
    classes,
    videos,
    paymentDetails,
    updatePayment,
    cancelBooking,
    login,
    addToast
  } = useGym();

  const [activeTab, setActiveTab] = useState<'bookings' | 'videos' | 'billing'>('bookings');
  const [videoFilter, setVideoFilter] = useState<string>('All');
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'member' | 'admin'>('member');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Card Edit Form State
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState(paymentDetails.cardNumber);
  const [cardHolder, setCardHolder] = useState(paymentDetails.cardHolder);
  const [expiry, setExpiry] = useState(paymentDetails.expiry);
  const [cvv, setCvv] = useState(paymentDetails.cvv);

  // Active Video Player Overlay State
  const [activeVideo, setActiveVideo] = useState<WorkoutVideo | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      addToast('Please fill out all credentials.', 'warning');
      return;
    }

    if (authMode === 'admin' && usernameInput === 'admin' && passwordInput === 'admin') {
      login('admin', 'Coach Alexander');
    } else if (authMode === 'member' && usernameInput === 'member' && passwordInput === 'member') {
      login('member', 'Chris Evans');
    } else {
      addToast('Invalid credentials. Check mock login tips.', 'warning');
    }
  };

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    updatePayment({
      cardNumber,
      cardHolder: cardHolder.toUpperCase(),
      expiry,
      cvv
    });
    setIsEditingCard(false);
  };

  // Extract booked classes
  const myBookings = classes.filter((cls) => cls.registered.includes(userName));
  const myWaitlists = classes.filter((cls) => cls.waitlist.includes(userName));

  // Video Filter logic
  const filteredVideos = videoFilter === 'All' 
    ? videos 
    : videos.filter((vid) => vid.category === videoFilter);

  // If user is guest, show login screen
  if (userRole === 'guest') {
    return (
      <div className="container">
        <div className="auth-container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              className={`btn ${authMode === 'member' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '0.6rem 0' }}
              onClick={() => { setAuthMode('member'); setUsernameInput(''); setPasswordInput(''); }}
            >
              Member Auth
            </button>
            <button 
              className={`btn ${authMode === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '0.6rem 0' }}
              onClick={() => { setAuthMode('admin'); setUsernameInput(''); setPasswordInput(''); }}
            >
              Trainer Auth
            </button>
          </div>

          <h2 className="auth-title">
            {authMode === 'admin' ? 'TRAINER PORTAL' : 'MEMBER PORTAL'}
          </h2>
          <p className="auth-subtitle">
            {authMode === 'admin' ? 'Manage workout libraries and schedules' : 'Book classes and play exclusive workouts'}
          </p>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder={authMode === 'admin' ? 'admin' : 'member'}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary auth-btn">
              <LogIn size={18} /> Sign In
            </button>
          </form>

          <div className="mock-credentials">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--neon-yellow)', marginBottom: '0.5rem' }}>
              <Info size={14} /> MOCK LOGIN TIPS
            </h4>
            <p>
              Use <strong>{authMode === 'admin' ? 'admin' : 'member'}</strong> as both username and password to log in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view for members/trainers
  return (
    <div className="container member-dashboard">
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="member-sidebar">
          <div className="member-profile-info">
            <div className="avatar-placeholder">
              {userName.substring(0, 1).toUpperCase()}
            </div>
            <h3 className="member-name">{userName}</h3>
            <span className="membership-badge">
              {userRole === 'admin' ? 'Trainer Account' : 'VIP Membership'}
            </span>
          </div>

          <ul className="sidebar-menu">
            <li>
              <button 
                className={`sidebar-item-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar size={18} /> My Bookings
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-item-btn ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                <Video size={18} /> Workout Library
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-item-btn ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                <CreditCard size={18} /> Billing & Card
              </button>
            </li>
          </ul>
        </aside>

        {/* Content Display Card */}
        <main className="dashboard-content-card">
          {activeTab === 'bookings' && (
            <div>
              <h2 className="content-card-title">
                <Calendar size={24} /> UPCOMING SESSIONS
              </h2>
              
              {myBookings.length === 0 && myWaitlists.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                  <p style={{ marginBottom: '1.5rem' }}>You don't have any classes booked yet.</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      const element = document.getElementById('schedule');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Schedule to Book
                  </button>
                </div>
              ) : (
                <div className="portal-bookings-list">
                  {/* Booked Spots */}
                  {myBookings.map((cls) => (
                    <div key={cls.id} className="portal-booking-item">
                      <div>
                        <h4 className="booking-info-title">{cls.name}</h4>
                        <div className="booking-info-details">
                          <span>Day: {cls.day}</span>
                          <span>Time: {cls.time}</span>
                          <span>Coach: {cls.trainer}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span className="badge" style={{ backgroundColor: 'rgba(204, 255, 0, 0.1)', color: 'var(--neon-yellow)', border: '1px solid var(--neon-yellow)' }}>
                          Spot Confirmed
                        </span>
                        <button 
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          onClick={() => cancelBooking(cls.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Waitlisted Spots */}
                  {myWaitlists.map((cls) => (
                    <div key={cls.id} className="portal-booking-item">
                      <div>
                        <h4 className="booking-info-title">{cls.name}</h4>
                        <div className="booking-info-details">
                          <span>Day: {cls.day}</span>
                          <span>Time: {cls.time}</span>
                          <span>Coach: {cls.trainer}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span className="badge badge-warning">
                          Waitlisted (#{cls.waitlist.indexOf(userName) + 1})
                        </span>
                        <button 
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          onClick={() => cancelBooking(cls.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <h2 className="content-card-title">
                <Video size={24} /> ON-DEMAND EXCLUSIVES
              </h2>

              <div className="videos-filter-bar">
                {['All', 'HIIT', 'Strength', 'Yoga', 'Mobility'].map((category) => (
                  <button
                    key={category}
                    className={`video-filter-btn ${videoFilter === category ? 'active' : ''}`}
                    onClick={() => setVideoFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No videos available in this category.
                </div>
              ) : (
                <div className="videos-grid">
                  {filteredVideos.map((vid) => (
                    <div 
                      key={vid.id} 
                      className="video-card"
                      onClick={() => setActiveVideo(vid)}
                    >
                      <div className="video-thumbnail-wrapper">
                        <img src={vid.thumbnail} alt={vid.title} className="video-thumbnail" />
                        <div className="video-play-overlay">
                          <Play size={20} style={{ fill: 'currentColor' }} />
                        </div>
                      </div>
                      <div className="video-info">
                        <span className="video-tag">{vid.category}</span>
                        <h4 className="video-title">{vid.title}</h4>
                        <div className="video-meta">
                          <span>{vid.duration} Mins</span>
                          <span>{vid.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 className="content-card-title">
                <CreditCard size={24} /> PAYMENT ACCOUNT
              </h2>

              {isEditingCard ? (
                <form onSubmit={handleUpdateCard} style={{ maxWidth: '450px' }}>
                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      value={cardHolder} 
                      onChange={(e) => setCardHolder(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)} 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required
                        placeholder="MM/YY"
                        value={expiry} 
                        onChange={(e) => setExpiry(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input 
                        type="password" 
                        className="form-input" 
                        required
                        placeholder="•••"
                        value={cvv} 
                        onChange={(e) => setCvv(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setIsEditingCard(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="payment-card-visual">
                    <div className="card-chip"></div>
                    <div className="card-number">{paymentDetails.cardNumber}</div>
                    <div className="card-details">
                      <div>
                        <div className="card-label">Card Holder</div>
                        <div>{paymentDetails.cardHolder}</div>
                      </div>
                      <div>
                        <div className="card-label">Expires</div>
                        <div>{paymentDetails.expiry}</div>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-secondary" onClick={() => setIsEditingCard(true)}>
                    Update Payment Method
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Video Overlay Player Modal */}
      {activeVideo && (
        <div className="video-player-overlay">
          <div className="player-container">
            <button className="close-player-btn" onClick={() => setActiveVideo(null)}>
              <X size={20} /> Close Workout
            </button>
            <div className="player-aspect-wrapper">
              <div className="player-content">
                <video 
                  className="player-video-loop" 
                  controls 
                  autoPlay 
                  loop
                  src={activeVideo.videoUrl}
                ></video>
              </div>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-panel)' }}>
              <span className="video-tag">{activeVideo.category}</span>
              <h3 className="class-title" style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{activeVideo.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Duration: {activeVideo.duration} Mins · Difficulty: {activeVideo.difficulty} · Full HD Member Stream
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
