import React, { useState } from 'react';
import { useGym } from '../context/GymState';
import { Shield, Users, Film, Calendar, PlusCircle } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { classes, addWorkoutVideo, addScheduledClass } = useGym();
  
  // Selection state for checking class attendance
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  
  // Video Creation Form State
  const [vidTitle, setVidTitle] = useState('');
  const [vidCategory, setVidCategory] = useState<'HIIT' | 'Strength' | 'Yoga' | 'Mobility'>('HIIT');
  const [vidDuration, setVidDuration] = useState<number>(20);
  const [vidDifficulty, setVidDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  // Class Creation Form State
  const [clsName, setClsName] = useState('');
  const [clsDay, setClsDay] = useState('Monday');
  const [clsTime, setClsTime] = useState('08:00 AM');
  const [clsTrainer, setClsTrainer] = useState('Coach Alexander');
  const [clsCapacity, setClsCapacity] = useState<number>(15);

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle) return;
    
    addWorkoutVideo(vidTitle, vidCategory, vidDuration, vidDifficulty);
    setVidTitle('');
  };

  const handleAddClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clsName || !clsTime || !clsTrainer) return;

    addScheduledClass(clsName, clsDay, clsTime, clsTrainer, clsCapacity);
    setClsName('');
    setClsTime('08:00 AM');
  };

  return (
    <div className="container" style={{ padding: '4rem 0 8rem' }}>
      <div className="content-card-title" style={{ marginBottom: '3rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <Shield size={28} /> TRAINER DASHBOARD / ADMIN
      </div>

      <div className="admin-grid">
        {/* Left Side: Attendance Sheet */}
        <div className="admin-form-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Users size={20} style={{ color: 'var(--neon-yellow)' }} /> Class Attendance Lists
          </h3>
          <label className="form-label">Select Scheduled Class</label>
          <select 
            className="admin-class-selector" 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.day} - {c.time} | {c.name} (Coach {c.trainer})
              </option>
            ))}
          </select>

          {selectedClass ? (
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Spots Filled: {selectedClass.registered.length} / {selectedClass.capacity} (Waitlist: {selectedClass.waitlist.length})
              </h4>

              {selectedClass.registered.length === 0 && selectedClass.waitlist.length === 0 ? (
                <div style={{ padding: '2rem', border: '1px dashed var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No members are currently booked in this class.
                </div>
              ) : (
                <div className="attendance-list">
                  {/* Registered List */}
                  {selectedClass.registered.map((name, index) => (
                    <div key={`reg-${index}`} className="attendance-item">
                      <span className="attendance-name">{name}</span>
                      <span className="attendance-status booked">Booked Spot</span>
                    </div>
                  ))}
                  {/* Waitlisted List */}
                  {selectedClass.waitlist.map((name, index) => (
                    <div key={`wait-${index}`} className="attendance-item">
                      <span className="attendance-name">{name}</span>
                      <span className="attendance-status waitlisted">Waitlisted (#{index + 1})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>No class selected.</div>
          )}
        </div>

        {/* Add Class Form */}
        <div className="admin-form-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Calendar size={20} style={{ color: 'var(--neon-yellow)' }} /> Add Class to Schedule
          </h3>
          <form onSubmit={handleAddClassSubmit}>
            <div className="form-group">
              <label className="form-label">Class Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. HIIT Power Hour"
                required
                value={clsName}
                onChange={(e) => setClsName(e.target.value)}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Day</label>
                <select 
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                  value={clsDay}
                  onChange={(e) => setClsDay(e.target.value)}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 08:30 AM"
                  required
                  value={clsTime}
                  onChange={(e) => setClsTime(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Trainer Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  value={clsTrainer}
                  onChange={(e) => setClsTrainer(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Max Capacity</label>
                <input 
                  type="number" 
                  className="form-input" 
                  required
                  min={1}
                  value={clsCapacity}
                  onChange={(e) => setClsCapacity(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <PlusCircle size={18} /> Schedule Class
            </button>
          </form>
        </div>

        {/* Add Workout Video Form */}
        <div className="admin-form-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Film size={20} style={{ color: 'var(--neon-yellow)' }} /> Add Workout Video
          </h3>
          <form onSubmit={handleAddVideoSubmit}>
            <div className="form-group">
              <label className="form-label">Video Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 20-Min Core Conditioning"
                required
                value={vidTitle}
                onChange={(e) => setVidTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-input"
                style={{ cursor: 'pointer' }}
                value={vidCategory}
                onChange={(e) => setVidCategory(e.target.value as any)}
              >
                <option value="HIIT">HIIT</option>
                <option value="Strength">Strength</option>
                <option value="Yoga">Yoga</option>
                <option value="Mobility">Mobility</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Duration (min)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  required
                  min={1}
                  value={vidDuration}
                  onChange={(e) => setVidDuration(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select 
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                  value={vidDifficulty}
                  onChange={(e) => setVidDifficulty(e.target.value as any)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <PlusCircle size={18} /> Upload Video
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
