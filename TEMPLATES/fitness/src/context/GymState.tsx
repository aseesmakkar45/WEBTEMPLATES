import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GymClass {
  id: string;
  name: string;
  time: string;
  day: string; // 'Monday', 'Tuesday', etc.
  trainer: string;
  capacity: number;
  registered: string[]; // usernames of registered members
  waitlist: string[];   // usernames of waitlisted members
}

export interface WorkoutVideo {
  id: string;
  title: string;
  category: 'HIIT' | 'Strength' | 'Yoga' | 'Mobility';
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string; // mock video URL or path
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface GymContextType {
  classes: GymClass[];
  videos: WorkoutVideo[];
  userRole: 'guest' | 'member' | 'admin';
  userName: string;
  paymentDetails: PaymentDetails;
  toasts: Toast[];
  login: (role: 'member' | 'admin', name?: string) => void;
  logout: () => void;
  bookClass: (classId: string) => void;
  cancelBooking: (classId: string) => void;
  updatePayment: (details: PaymentDetails) => void;
  addWorkoutVideo: (title: string, category: 'HIIT' | 'Strength' | 'Yoga' | 'Mobility', duration: number, difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => void;
  addScheduledClass: (name: string, day: string, time: string, trainer: string, capacity: number) => void;
  addToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

// Initial mock classes
const initialClasses: GymClass[] = [
  { id: '1', name: 'High-Intensity Conditioning', day: 'Monday', time: '07:30 AM', trainer: 'Alex Mercer', capacity: 15, registered: ['John Doe', 'Sarah Connor', 'Marcus Wright'], waitlist: [] },
  { id: '2', name: 'Dynamic Vinyasa Flow', day: 'Monday', time: '09:00 AM', trainer: 'Clara Oswald', capacity: 3, registered: ['Emily Stone', 'David Tennant', 'Matt Smith'], waitlist: ['Jane Doe'] },
  { id: '3', name: 'Metabolic Conditioning', day: 'Tuesday', time: '06:30 AM', trainer: 'Alex Mercer', capacity: 12, registered: ['John Doe', 'Mark Ruffalo'], waitlist: [] },
  { id: '4', name: 'Functional Core & Mobility', day: 'Tuesday', time: '12:00 PM', trainer: 'Ray Palmer', capacity: 10, registered: ['Sarah Connor', 'Clara Oswald'], waitlist: [] },
  { id: '5', name: 'Barbell Strength & Conditioning', day: 'Wednesday', time: '08:00 AM', trainer: 'Jax Briggs', capacity: 15, registered: ['John Doe', 'Sarah Connor'], waitlist: [] },
  { id: '6', name: 'High-Performance Athleticism', day: 'Wednesday', time: '06:00 PM', trainer: 'Alex Mercer', capacity: 15, registered: ['Marcus Wright'], waitlist: [] },
  { id: '7', name: 'Ashtanga Alignment', day: 'Thursday', time: '10:00 AM', trainer: 'Clara Oswald', capacity: 10, registered: ['Jane Doe', 'David Tennant'], waitlist: [] },
  { id: '8', name: 'Metabolic Endurance Training', day: 'Friday', time: '07:30 AM', trainer: 'Alex Mercer', capacity: 15, registered: ['Emily Stone'], waitlist: [] },
  { id: '9', name: 'Restorative Stretch & Mobility', day: 'Friday', time: '05:30 PM', trainer: 'Clara Oswald', capacity: 20, registered: ['John Doe', 'Jane Doe', 'Matt Smith'], waitlist: [] },
  { id: '10', name: 'Weekend Conditioning Series', day: 'Saturday', time: '09:00 AM', trainer: 'Jax Briggs', capacity: 2, registered: ['John Doe', 'Emily Stone'], waitlist: ['Sarah Connor'] },
  { id: '11', name: 'Restorative Yoga Flow', day: 'Sunday', time: '10:30 AM', trainer: 'Clara Oswald', capacity: 15, registered: [], waitlist: [] }
];

// Initial mock videos
const initialVideos: WorkoutVideo[] = [
  { id: 'v1', title: '15-Min Kettlebell Shred', category: 'HIIT', duration: 15, difficulty: 'Advanced', thumbnail: '/images/hiit-thumb.png', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-kettlebell-training-in-a-gym-42299-large.mp4' },
  { id: 'v2', title: '30-Min Full Body Strength', category: 'Strength', duration: 30, difficulty: 'Intermediate', thumbnail: '/images/gym-hero.png', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-barbell-close-up-42301-large.mp4' },
  { id: 'v3', title: 'Deep Release Yoga Flow', category: 'Yoga', duration: 25, difficulty: 'Beginner', thumbnail: '/images/yoga-thumb.png', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-mat-42302-large.mp4' },
  { id: 'v4', title: '10-Min Core Burn Workout', category: 'Strength', duration: 10, difficulty: 'Intermediate', thumbnail: '/images/hiit-thumb.png', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-abdominal-crunches-on-mat-42303-large.mp4' },
  { id: 'v5', title: 'Full Body Joint Mobility', category: 'Mobility', duration: 20, difficulty: 'Beginner', thumbnail: '/images/yoga-thumb.png', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stretching-exercises-in-gym-42297-large.mp4' }
];

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<GymClass[]>(() => {
    const local = localStorage.getItem('forge_classes');
    return local ? JSON.parse(local) : initialClasses;
  });

  const [videos, setVideos] = useState<WorkoutVideo[]>(() => {
    const local = localStorage.getItem('forge_videos');
    return local ? JSON.parse(local) : initialVideos;
  });

  const [userRole, setUserRole] = useState<'guest' | 'member' | 'admin'>(() => {
    const local = localStorage.getItem('forge_role');
    return (local as 'guest' | 'member' | 'admin') || 'guest';
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('forge_username') || '';
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(() => {
    const local = localStorage.getItem('forge_payment');
    return local ? JSON.parse(local) : {
      cardNumber: '•••• •••• •••• 4242',
      cardHolder: 'CHRIS EVANS',
      expiry: '08/29',
      cvv: '•••'
    };
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('forge_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('forge_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('forge_role', userRole);
    localStorage.setItem('forge_username', userName);
  }, [userRole, userName]);

  useEffect(() => {
    localStorage.setItem('forge_payment', JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  const addToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (role: 'member' | 'admin', name: string = '') => {
    setUserRole(role);
    const resolvedName = name || (role === 'admin' ? 'Coach Alexander' : 'Chris Evans');
    setUserName(resolvedName);
    addToast(`Welcome back, ${resolvedName}.`, 'success');
  };

  const logout = () => {
    setUserRole('guest');
    setUserName('');
    addToast('Logged out successfully.', 'info');
  };

  const bookClass = (classId: string) => {
    if (userRole === 'guest') {
      addToast('Please login as a member to book classes.', 'warning');
      return;
    }

    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== classId) return cls;

        // Check if already registered
        if (cls.registered.includes(userName)) {
          addToast('You are already registered for this session.', 'info');
          return cls;
        }

        // Check if already in waitlist
        if (cls.waitlist.includes(userName)) {
          addToast('You are already on the waitlist for this session.', 'info');
          return cls;
        }

        // Check capacity
        if (cls.registered.length < cls.capacity) {
          addToast(`Session reserved: ${cls.name}.`, 'success');
          return {
            ...cls,
            registered: [...cls.registered, userName]
          };
        } else {
          // Join waitlist
          addToast('Session capacity reached. Added to waitlist.', 'warning');
          return {
            ...cls,
            waitlist: [...cls.waitlist, userName]
          };
        }
      })
    );
  };

  const cancelBooking = (classId: string) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== classId) return cls;

        const isRegistered = cls.registered.includes(userName);
        const isWaitlisted = cls.waitlist.includes(userName);

        if (!isRegistered && !isWaitlisted) return cls;

        let updatedRegistered = [...cls.registered];
        let updatedWaitlist = [...cls.waitlist];

        if (isRegistered) {
          updatedRegistered = updatedRegistered.filter((name) => name !== userName);
          
          // Promote first waitlisted person if exists
          if (updatedWaitlist.length > 0) {
            const nextPerson = updatedWaitlist.shift();
            if (nextPerson) {
              updatedRegistered.push(nextPerson);
              addToast(`Waitlist promotion: ${nextPerson} is now registered.`, 'info');
            }
          }
          addToast(`Registration cancelled: ${cls.name}.`, 'info');
        } else if (isWaitlisted) {
          updatedWaitlist = updatedWaitlist.filter((name) => name !== userName);
          addToast('Removed from session waitlist.', 'info');
        }

        return {
          ...cls,
          registered: updatedRegistered,
          waitlist: updatedWaitlist
        };
      })
    );
  };

  const updatePayment = (details: PaymentDetails) => {
    setPaymentDetails(details);
    addToast('Payment card updated successfully!', 'success');
  };

  const addWorkoutVideo = (
    title: string,
    category: 'HIIT' | 'Strength' | 'Yoga' | 'Mobility',
    duration: number,
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  ) => {
    const newVideo: WorkoutVideo = {
      id: `v-${Date.now()}`,
      title,
      category,
      duration,
      difficulty,
      // Map placeholder thumbnails based on category
      thumbnail: category === 'Yoga' ? '/images/yoga-thumb.png' : category === 'HIIT' ? '/images/hiit-thumb.png' : '/images/gym-hero.png',
      // Dynamic loop video preview
      videoUrl: category === 'Yoga' 
        ? 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-mat-42302-large.mp4'
        : 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-barbell-close-up-42301-large.mp4'
    };

    setVideos((prev) => [newVideo, ...prev]);
    addToast(`Video "${title}" added to the library!`, 'success');
  };

  const addScheduledClass = (
    name: string,
    day: string,
    time: string,
    trainer: string,
    capacity: number
  ) => {
    const newClass: GymClass = {
      id: `c-${Date.now()}`,
      name,
      day,
      time,
      trainer,
      capacity,
      registered: [],
      waitlist: []
    };

    setClasses((prev) => [...prev, newClass]);
    addToast(`New Class "${name}" scheduled for ${day}!`, 'success');
  };

  return (
    <GymContext.Provider
      value={{
        classes,
        videos,
        userRole,
        userName,
        paymentDetails,
        toasts,
        login,
        logout,
        bookClass,
        cancelBooking,
        updatePayment,
        addWorkoutVideo,
        addScheduledClass,
        addToast,
        removeToast
      }}
    >
      {children}
      {/* Dynamic Toast Renderer */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
