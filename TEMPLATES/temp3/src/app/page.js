"use client";

import { useState, useEffect, useRef } from 'react';
import { useMotionValue, animate } from 'motion/react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Sliders, 
  RotateCcw, 
  Move, 
  Layers, 
  Eye, 
  Info,
  MousePointer,
  HelpCircle
} from 'lucide-react';
import DiagonalSineGallery from './DiagonalSineGallery';

const CURATED_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=80",
    title: "Orion Nebula",
    tag: "Deep Space",
    desc: "Vast cosmic clouds of stellar nurseries glowing in ionized gas."
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80",
    title: "Glass Pavilion",
    tag: "Architecture",
    desc: "Sleek, transparent structure harmonizing light and space."
  },
  {
    src: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=500&auto=format&fit=crop&q=80",
    title: "Neo Tokyo",
    tag: "Cyberpunk",
    desc: "Rain-slicked avenues illuminated by towering holographic advertisements."
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    title: "Malibu Beach",
    tag: "Landscape",
    desc: "Golden waves crashing against dramatic cliffs at sunset."
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    title: "Abstract Flow",
    tag: "Surrealism",
    desc: "Sculptural liquid ribbons suspended in a digital void."
  },
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80",
    title: "Citadel Solaria",
    tag: "Future Concept",
    desc: "Self-sustaining solar spires rising above alpine valleys."
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
    title: "Emerald Valley",
    tag: "Adventure",
    desc: "Misty evergreen forest canyons carved by pristine glacier streams."
  },
  {
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=80",
    title: "Cyber Oasis",
    tag: "Creative",
    desc: "Lush digital flora simulated inside chromatic server bays."
  },
  {
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=80",
    title: "Auroral Arch",
    tag: "Atmosphere",
    desc: "Breathtaking green northern lights framing frozen Arctic horizons."
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format&fit=crop&q=80",
    title: "Crimson Dunes",
    tag: "Geology",
    desc: "Sculpted rust-red sands shifting under a burning alien sky."
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80",
    title: "Radiant Prism",
    tag: "Vaporwave",
    desc: "Retro computer grids displaying chromatic refractions."
  },
  {
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    title: "Zenith Temple",
    tag: "Mystic",
    desc: "A quiet sanctuary perched above sea-cliffs at sunrise."
  }
];

export default function Home() {
  // Real-time animation and path properties
  const [amplitude, setAmplitude] = useState(130);
  const [frequency, setFrequency] = useState(1.6);
  const [rotation, setRotation] = useState(-15); // Set default inclination to -15 degrees
  const [itemSize, setItemSize] = useState(210);  // Bigger cards
  const [showPath, setShowPath] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(30);
  const [scrollSensitivity, setScrollSensitivity] = useState(1.2);

  // Central progress motion value (0 to 100)
  const progress = useMotionValue(0);

  // 1. Mouse Wheel Scroll Event Interceptor
  useEffect(() => {
    if (autoplay) return;

    const handleWheel = (e) => {
      // deltaY is positive when scrolling down (wheel toward user)
      // deltaY is negative when scrolling up (wheel away from user)
      const current = progress.get();
      // Apply delta movement to progress value (infinitely increments/decrements)
      const delta = e.deltaY * 0.05 * scrollSensitivity;
      progress.set(current + delta);
    };

    // Attach to window. Since overflow is hidden on the body, the page won't scroll,
    // but this listener captures the wheel action.
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [autoplay, scrollSensitivity, progress]);

  // 2. Touch Swipe Swipe Gesture Interceptor for mobile
  useEffect(() => {
    if (autoplay) return;

    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchCurrentY) * 0.25 * scrollSensitivity;
      
      const current = progress.get();
      progress.set(current + deltaY);
      
      // Update tracking variable to keep swiping smooth
      touchStartY = touchCurrentY;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [autoplay, scrollSensitivity, progress]);

  // Apply Presets
  const applyPreset = (preset) => {
    switch (preset) {
      case 'diagonal-desc':
        setRotation(-45);
        setAmplitude(130);
        setFrequency(1.6);
        setItemSize(210);
        setScrollSensitivity(1.2);
        break;
      case 'sine-surge':
        setRotation(15);
        setAmplitude(260);
        setFrequency(2.2);
        setItemSize(180);
        setScrollSensitivity(1.5);
        break;
      case 'vertical-spiral':
        setRotation(90);
        setAmplitude(160);
        setFrequency(1.5);
        setItemSize(200);
        setScrollSensitivity(1.0);
        break;
      case 'subtle-float':
        setRotation(0);
        setAmplitude(70);
        setFrequency(1.0);
        setItemSize(230);
        setScrollSensitivity(1.8);
        break;
      default:
        break;
    }
  };

  const resetControls = () => {
    setAmplitude(130);
    setFrequency(1.6);
    setRotation(-45);
    setItemSize(210);
    setShowPath(true);
    setAutoplay(false);
    setAutoplaySpeed(30);
    setScrollSensitivity(1.2);
    progress.set(0);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#07050a] text-white flex flex-col justify-between relative selection:bg-purple-950/40 selection:text-purple-300">
      
      {/* Background ambient glowing radial effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-purple-900/10 blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-fuchsia-950/10 blur-[150px] pointer-events-none z-0" />

      {/* FIXED Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#07050a]/80 to-transparent py-5 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-purple-500/30 flex items-center justify-center bg-purple-950/20 shadow-lg shadow-purple-500/5">
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-[0.25em] uppercase text-white/90 leading-none">SineFlux</h1>
              <span className="text-[9px] tracking-[0.2em] uppercase text-purple-400 font-semibold mt-1.5 block">Full-Screen Scroll-Driven Canvas</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!autoplay ? (
              <div className="flex items-center gap-1.5 bg-purple-950/25 border border-purple-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                <MousePointer className="w-3 h-3 text-purple-400 animate-bounce" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-purple-300">Scroll Wheel Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-green-950/25 border border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-green-300">Autoplay Engaged</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Floating Info Overlay (Hero text on the left, floating glass panel) */}
      <div className="absolute top-24 left-6 md:left-10 z-40 max-w-sm pointer-events-none select-none">
        <div className="bg-black/45 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-xl">
          <span className="text-[9px] tracking-[0.25em] uppercase text-purple-400 font-extrabold block mb-2">Space Dynamics</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white uppercase mb-3">
            Diagonal Sine <br/>
            <span className="text-purple-400">Trajectory</span>
          </h2>
          <p className="text-[11px] text-white/50 leading-relaxed mb-4">
            Image cards slide smoothly along an imaginary rotated sine wave. <strong>Scroll your mouse wheel or swipe the screen</strong> to float the timeline.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-[10px]">
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>Path rotation is locked at <span className="font-mono text-purple-300">{rotation}°</span></span>
          </div>
        </div>
      </div>

      {/* Immersive Trajectory Canvas */}
      <div className="w-full flex-grow relative z-10 flex items-center justify-center min-h-0 overflow-visible">
        <div className="w-full h-full max-w-6xl flex items-center justify-center px-6 relative overflow-visible">
          <DiagonalSineGallery
            images={CURATED_GALLERY}
            amplitude={amplitude}
            frequency={frequency}
            rotation={rotation}
            itemSize={itemSize}
            showPath={showPath}
            pathColor="rgba(168, 85, 247, 0.25)"
            pathWidth={1.5}
            autoplay={autoplay}
            autoplaySpeed={autoplaySpeed}
            scrollSensitivity={scrollSensitivity}
            progress={progress}
          />
        </div>
      </div>


    </main>
  );
}
