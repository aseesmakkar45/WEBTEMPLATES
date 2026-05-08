"use client";

import { useState } from 'react';
import CircularGallery from './CircularGallery';

const GALLERY_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80', text: 'Ethereal Garden' },
  { image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', text: 'Abstract Waves' },
  { image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&auto=format&fit=crop&q=80', text: 'Cyberpunk Alley' },
  { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', text: 'Yosemite Valley' },
  { image: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&auto=format&fit=crop&q=80', text: 'Neon Dream' },
  { image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=80', text: 'Misty Mountains' },
  { image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80', text: 'Deep Forest' },
  { image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', text: 'Mystic Lake' }
];

export default function Home() {
  const [bend, setBend] = useState(3);
  const [borderRadius, setBorderRadius] = useState(0.05);
  const [scrollEase, setScrollEase] = useState(0.02);
  const [scrollSpeed, setScrollSpeed] = useState(2);

  const applyPreset = (preset) => {
    switch (preset) {
      case 'classic':
        setBend(3);
        setBorderRadius(0.05);
        setScrollEase(0.02);
        setScrollSpeed(2);
        break;
      case 'flat':
        setBend(0);
        setBorderRadius(0);
        setScrollEase(0.05);
        setScrollSpeed(2);
        break;
      case 'tunnel':
        setBend(-3.5);
        setBorderRadius(0.2);
        setScrollEase(0.03);
        setScrollSpeed(2.5);
        break;
      case 'fluid':
        setBend(2);
        setBorderRadius(0.1);
        setScrollEase(0.008);
        setScrollSpeed(1.5);
        break;
      default:
        break;
    }
  };

  return (
    <main className="min-h-screen bg-[#070509] text-white flex flex-col justify-between overflow-hidden relative selection:bg-purple-900/30 selection:text-purple-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-950/20 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 md:py-8 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-950/10 backdrop-blur-md shadow-lg shadow-purple-500/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#a855f7" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-[0.25em] uppercase text-white/95 leading-none">Aetherius</h1>
            <span className="text-[9px] tracking-[0.2em] uppercase text-purple-400 font-semibold mt-1 block">Immersive Gallery</span>
          </div>
        </div>

        <nav className="flex gap-8 items-center">
          <a href="#" className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Exhibits</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">Archive</a>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
          <button className="text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all active:scale-95 bg-white/5">
            Connect
          </button>
        </nav>
      </header>

      {/* Hero Title & Description */}
      <section className="text-center pt-8 px-6 z-20 pointer-events-none select-none max-w-xl mx-auto">
        <h2 className="serif-font text-4xl md:text-5xl tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          CURVATURE OF VISION
        </h2>
        <p className="sans-font text-xs md:text-sm text-white/50 max-w-[420px] mx-auto mt-4 leading-relaxed tracking-wider">
          Drag horizontally or use your scroll wheel to traverse through the interactive circular canvas. Adjust parameters below to warp the display.
        </p>
      </section>

      {/* Circular Gallery Viewport Container */}
      <section className="flex-grow w-full relative z-10 flex items-center justify-center py-4">
        <div className="w-full h-[520px] md:h-[600px] relative overflow-hidden">
          <CircularGallery
            items={GALLERY_ITEMS}
            bend={bend}
            textColor="#e9d5ff"
            borderRadius={borderRadius}
            scrollEase={scrollEase}
            scrollSpeed={scrollSpeed}
            fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap"
            font="bold 24px Space Grotesk"
          />
        </div>
      </section>

      {/* Dynamic Controls Console */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-8 md:pb-12 z-20">
        <div className="bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative">
          {/* Subtle light band on top rim of card */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Presets Column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-purple-400 font-bold block mb-1">Interactive Presets</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => applyPreset('classic')} 
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold py-3 px-4 rounded-xl border transition-all ${bend === 3 ? 'bg-purple-600/20 border-purple-500/40 text-purple-200' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  Classic Arch
                </button>
                <button 
                  onClick={() => applyPreset('flat')} 
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold py-3 px-4 rounded-xl border transition-all ${bend === 0 ? 'bg-purple-600/20 border-purple-500/40 text-purple-200' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  Flat Wall
                </button>
                <button 
                  onClick={() => applyPreset('tunnel')} 
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold py-3 px-4 rounded-xl border transition-all ${bend === -3.5 ? 'bg-purple-600/20 border-purple-500/40 text-purple-200' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  Convex Tunnel
                </button>
                <button 
                  onClick={() => applyPreset('fluid')} 
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold py-3 px-4 rounded-xl border transition-all ${scrollEase === 0.008 ? 'bg-purple-600/20 border-purple-500/40 text-purple-200' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  Fluid Glide
                </button>
              </div>
            </div>

            {/* Range Sliders Column */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bend Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Bend (Curvature)</span>
                  <span className="font-mono text-purple-400 font-bold">{bend.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="-6" 
                  max="6" 
                  step="0.1" 
                  value={bend} 
                  onChange={(e) => setBend(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Border Radius Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Border Radius (Media)</span>
                  <span className="font-mono text-purple-400 font-bold">{borderRadius.toFixed(3)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="0.3" 
                  step="0.005" 
                  value={borderRadius} 
                  onChange={(e) => setBorderRadius(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Scroll Ease Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Scroll Fluidity (Ease)</span>
                  <span className="font-mono text-purple-400 font-bold">{scrollEase.toFixed(3)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.002" 
                  max="0.2" 
                  step="0.002" 
                  value={scrollEase} 
                  onChange={(e) => setScrollEase(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Scroll Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Scroll Sensitivity</span>
                  <span className="font-mono text-purple-400 font-bold">{scrollSpeed.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="5" 
                  step="0.1" 
                  value={scrollSpeed} 
                  onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
