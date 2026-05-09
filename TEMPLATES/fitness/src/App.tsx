import { useState } from 'react';
import { GymProvider } from './context/GymState';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Schedule } from './components/Schedule';
import { PortalPreview } from './components/PortalPreview';
import { Pricing } from './components/Pricing';
import { MemberPortal } from './components/MemberPortal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

function GymAppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <>
            <Hero 
              onTrialClick={() => scrollToSection('pricing')} 
              onViewScheduleClick={() => scrollToSection('schedule')} 
            />
            <Features />
            <Schedule onAuthPrompt={() => setActiveTab('portal')} />
            <PortalPreview onUnlockClick={() => setActiveTab('portal')} />
            <Pricing onJoinSuccess={() => setActiveTab('portal')} />
          </>
        )}
        
        {activeTab === 'portal' && <MemberPortal />}
        
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Footer onLinkClick={setActiveTab} />
    </>
  );
}

function App() {
  return (
    <GymProvider>
      <GymAppContent />
    </GymProvider>
  );
}

export default App;
