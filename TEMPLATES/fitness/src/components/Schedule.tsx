import React, { useState } from 'react';
import { useGym } from '../context/GymState';
import type { GymClass } from '../context/GymState';
import { Clock, AlertTriangle, ChevronRight } from 'lucide-react';

interface ScheduleProps {
  onAuthPrompt: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onAuthPrompt }) => {
  const { classes, bookClass, cancelBooking, userRole, userName } = useGym();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const filteredClasses = classes.filter((cls) => cls.day === selectedDay);

  const getBookingStatus = (cls: GymClass) => {
    if (cls.registered.includes(userName)) return 'booked';
    if (cls.waitlist.includes(userName)) return 'waitlisted';
    return 'none';
  };

  return (
    <section id="schedule" className="schedule-section" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="hero-tag" style={{ marginBottom: '1rem' }}>Timetable</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>WEEKLY SESSION TIMETABLE</h2>
          <p className="section-subtitle">
            Reserve your position in our high-intensity conditioning, strength, and active recovery sessions. Real-time capacity tracking.
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '2.5rem',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-panel)',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          {/* Day Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: '1.25rem', fontWeight: 700 }}>SELECT DAY</h4>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  background: selectedDay === day ? 'rgba(255, 255, 255, 0.03)' : 'none',
                  border: 'none',
                  borderLeft: selectedDay === day ? '3px solid var(--neon-yellow)' : '3px solid transparent',
                  color: selectedDay === day ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  padding: '0.8rem 1rem',
                  paddingLeft: selectedDay === day ? '1rem' : 'calc(1rem + 3px)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all var(--transition-fast)',
                  borderRadius: '0 4px 4px 0'
                }}
              >
                <span>{day}</span>
                <ChevronRight size={14} style={{ opacity: selectedDay === day ? 1 : 0.3, color: selectedDay === day ? 'var(--neon-yellow)' : 'inherit' }} />
              </button>
            ))}
          </div>

          {/* Classes Timetable */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>SESSION DETAILS & TIME</span>
              <span style={{ marginRight: '150px' }}>AVAILABILITY</span>
            </div>

            {filteredClasses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)', border: '1px dashed var(--border-color)' }}>
                No training sessions scheduled for {selectedDay} yet.
              </div>
            ) : (
              filteredClasses.map((cls) => {
                const fillPercent = Math.min((cls.registered.length / cls.capacity) * 100, 100);
                const isFull = cls.registered.length >= cls.capacity;
                const status = getBookingStatus(cls);

                return (
                  <div 
                    key={cls.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1fr 180px',
                      alignItems: 'center',
                      gap: '2rem',
                      padding: '1.5rem 1rem',
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(255, 255, 255, 0.01)',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)'}
                  >
                    {/* Class Info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--neon-yellow)',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Clock size={14} /> {cls.time}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>·</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Coach {cls.trainer}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{cls.name}</h4>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        <span>
                          {cls.registered.length} / {cls.capacity} spots filled
                        </span>
                        {isFull ? (
                          <span style={{ color: '#ef4444', fontWeight: '700' }}>FULL</span>
                        ) : (
                          <span style={{ color: 'var(--neon-yellow)' }}>{cls.capacity - cls.registered.length} available</span>
                        )}
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--bg-dark)', width: '100%', position: 'relative', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          backgroundColor: isFull ? '#ef4444' : 'var(--neon-yellow)',
                          width: `${fillPercent}%`,
                          transition: 'width 0.4s ease',
                          borderRadius: '3px'
                        }}></div>
                      </div>
                      {cls.waitlist.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#f59e0b', marginTop: '0.25rem' }}>
                          <AlertTriangle size={10} /> {cls.waitlist.length} waitlisted
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ textAlign: 'right' }}>
                      {userRole === 'guest' ? (
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%' }}
                          onClick={onAuthPrompt}
                        >
                          Login to Book
                        </button>
                      ) : userRole === 'admin' ? (
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%', opacity: 0.5, cursor: 'not-allowed' }}
                          disabled
                        >
                          Coach View
                        </button>
                      ) : (
                        <>
                          {status === 'booked' && (
                            <button
                              className="btn btn-danger"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%' }}
                              onClick={() => cancelBooking(cls.id)}
                            >
                              Cancel Spot
                            </button>
                          )}
                          {status === 'waitlisted' && (
                            <button
                              className="btn btn-danger"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)' }}
                              onClick={() => cancelBooking(cls.id)}
                            >
                              Leave Waitlist
                            </button>
                          )}
                          {status === 'none' && !isFull && (
                            <button
                              className="btn btn-primary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%' }}
                              onClick={() => bookClass(cls.id)}
                            >
                              Book Spot
                            </button>
                          )}
                          {status === 'none' && isFull && (
                            <button
                              className="btn btn-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%', borderColor: '#f59e0b', color: '#f59e0b' }}
                              onClick={() => bookClass(cls.id)}
                            >
                              Join Waitlist
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
