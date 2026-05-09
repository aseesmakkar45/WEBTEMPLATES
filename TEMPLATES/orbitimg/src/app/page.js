"use client";

import { useState } from 'react';
import OrbitImages from './OrbitImages';

const IMAGES = [
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&auto=format&fit=crop&q=80"
];

export default function Home() {
  const [shape, setShape] = useState('ellipse');
  const [radiusX, setRadiusX] = useState(380);
  const [radiusY, setRadiusY] = useState(120);
  const [radius, setRadius] = useState(250);
  const [rotation, setRotation] = useState(-8);
  const [duration, setDuration] = useState(25);
  const [itemSize, setItemSize] = useState(80);
  const [showPath, setShowPath] = useState(true);
  const [direction, setDirection] = useState('normal');

  const applyPreset = (preset) => {
    switch (preset) {
      case 'saturn':
        setShape('ellipse');
        setRadiusX(480);
        setRadiusY(110);
        setRotation(-12);
        setDuration(30);
        setItemSize(75);
        setShowPath(true);
        break;
      case 'infinity':
        setShape('infinity');
        setRadiusX(460);
        setRadiusY(200);
        setRotation(0);
        setDuration(25);
        setItemSize(80);
        setShowPath(true);
        break;
      case 'star':
        setShape('star');
        setRadius(340);
        setRotation(15);
        setDuration(20);
        setItemSize(70);
        setShowPath(true);
        break;
      case 'pulse-wave':
        setShape('wave');
        setRadiusX(550);
        setRadiusY(80); // amplitude
        setRotation(0);
        setDuration(15);
        setItemSize(85);
        setShowPath(true);
        break;
      default:
        break;
    }
  };


  return (
    <main className="min-h-screen bg-[#060408] text-white flex flex-col justify-between overflow-hidden relative selection:bg-purple-950/30 selection:text-purple-300">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-950/20 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[65%] h-[65%] rounded-full bg-indigo-950/20 blur-[180px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 md:py-8 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-purple-500/20 flex items-center justify-center bg-purple-950/10 backdrop-blur-md shadow-lg shadow-purple-500/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#a855f7" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-[0.25em] uppercase text-white/90 leading-none">OrbitImg</h1>
            <span className="text-[9px] tracking-[0.2em] uppercase text-purple-400 font-semibold mt-1 block">Dynamic Gravity</span>
          </div>
        </div>

        <nav className="flex gap-8 items-center">
          <a href="#" className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Pathways</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Core</a>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
          <button className="text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all bg-white/5 active:scale-95">
            Access Console
          </button>
        </nav>
      </header>

      {/* Intro */}
      <section className="text-center pt-6 px-6 z-20 pointer-events-none select-none max-w-xl mx-auto">
        <h2 className="serif-font text-3xl md:text-5xl tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
          GRAVITATIONAL FLUX
        </h2>
        <p className="sans-font text-xs md:text-sm text-white/40 max-w-[440px] mx-auto mt-4 leading-relaxed tracking-wider">
          An orbiting array of images rotating smoothly on configurable path mathematics. Adjust parameters below to morph the gravity field.
        </p>
      </section>

      {/* Interactive Orbit Images Viewport */}
      <section className="flex-grow w-full relative z-10 flex items-center justify-center py-6 min-h-[360px] md:min-h-[460px]">
        {/* We use a fixed-height layout matching the scale size */}
        <div className="w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] flex items-center justify-center relative px-6">
          <OrbitImages
            images={IMAGES}
            shape={shape}
            radiusX={radiusX}
            radiusY={radiusY}
            radius={radius}
            rotation={rotation}
            duration={duration}
            itemSize={itemSize}
            responsive={true}
            showPath={showPath}
            pathColor="rgba(168, 85, 247, 0.35)"
            pathWidth={1.5}
            direction={direction}
          />
        </div>
      </section>

      {/* Control Station Panel */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-8 md:pb-12 z-20">
        <div className="bg-black/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Shape & Direction Controls */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-purple-400 font-bold block mb-3">Path Preset Shape</span>
                <select 
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white/90 rounded-xl py-3 px-4 text-xs tracking-widest uppercase cursor-pointer hover:bg-white/10 focus:outline-none focus:border-purple-500/50"
                >
                  <option value="ellipse" className="bg-[#0b080f]">Ellipse</option>
                  <option value="circle" className="bg-[#0b080f]">Circle</option>
                  <option value="square" className="bg-[#0b080f]">Square</option>
                  <option value="rectangle" className="bg-[#0b080f]">Rectangle</option>
                  <option value="triangle" className="bg-[#0b080f]">Triangle</option>
                  <option value="star" className="bg-[#0b080f]">Star</option>
                  <option value="heart" className="bg-[#0b080f]">Heart</option>
                  <option value="infinity" className="bg-[#0b080f]">Infinity</option>
                  <option value="wave" className="bg-[#0b080f]">Wave</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-purple-400 font-bold block mb-3">Quick Presets</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => applyPreset('saturn')} className="text-[9px] uppercase tracking-wider py-2.5 px-3 rounded-lg border border-white/5 bg-white/5 text-white/70 hover:bg-white/10 transition-all font-semibold">
                    Saturn Ring
                  </button>
                  <button onClick={() => applyPreset('infinity')} className="text-[9px] uppercase tracking-wider py-2.5 px-3 rounded-lg border border-white/5 bg-white/5 text-white/70 hover:bg-white/10 transition-all font-semibold">
                    Infinity Loop
                  </button>
                  <button onClick={() => applyPreset('star')} className="text-[9px] uppercase tracking-wider py-2.5 px-3 rounded-lg border border-white/5 bg-white/5 text-white/70 hover:bg-white/10 transition-all font-semibold">
                    Star Orbit
                  </button>
                  <button onClick={() => applyPreset('pulse-wave')} className="text-[9px] uppercase tracking-wider py-2.5 px-3 rounded-lg border border-white/5 bg-white/5 text-white/70 hover:bg-white/10 transition-all font-semibold">
                    Pulse Wave
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs uppercase text-white/60 tracking-wider">Show Path Trace</span>
                <button 
                  onClick={() => setShowPath(!showPath)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showPath ? 'bg-purple-600' : 'bg-white/10'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showPath ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs uppercase text-white/60 tracking-wider">Reverse Orbit</span>
                <button 
                  onClick={() => setDirection(direction === 'normal' ? 'reverse' : 'normal')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${direction === 'reverse' ? 'bg-purple-600' : 'bg-white/10'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${direction === 'reverse' ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
              
              {/* Radius X Slider */}
              <div className={`space-y-2.5 transition-opacity duration-300 ${(shape === 'ellipse' || shape === 'rectangle' || shape === 'infinity' || shape === 'wave') ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Radius X (Horizontal)</span>
                  <span className="font-mono text-purple-400 font-bold">{radiusX}px</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="600" 
                  step="10" 
                  value={radiusX} 
                  onChange={(e) => setRadiusX(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  disabled={!(shape === 'ellipse' || shape === 'rectangle' || shape === 'infinity' || shape === 'wave')}
                />
              </div>

              {/* Radius Y Slider */}
              <div className={`space-y-2.5 transition-opacity duration-300 ${(shape === 'ellipse' || shape === 'rectangle' || shape === 'infinity' || shape === 'wave') ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Radius Y (Vertical / Amp)</span>
                  <span className="font-mono text-purple-400 font-bold">{radiusY}px</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="350" 
                  step="5" 
                  value={radiusY} 
                  onChange={(e) => setRadiusY(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  disabled={!(shape === 'ellipse' || shape === 'rectangle' || shape === 'infinity' || shape === 'wave')}
                />
              </div>

              {/* Radius Slider */}
              <div className={`space-y-2.5 transition-opacity duration-300 ${(shape === 'circle' || shape === 'square' || shape === 'star' || shape === 'heart' || shape === 'triangle') ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Core Radius (Circular)</span>
                  <span className="font-mono text-purple-400 font-bold">{radius}px</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="450" 
                  step="5" 
                  value={radius} 
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  disabled={!(shape === 'circle' || shape === 'square' || shape === 'star' || shape === 'heart' || shape === 'triangle')}
                />
              </div>

              {/* Orbit Speed Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Orbit Duration (Speed)</span>
                  <span className="font-mono text-purple-400 font-bold">{duration}s</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="80" 
                  step="1" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rotation Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Orbit Inclination (Rotation)</span>
                  <span className="font-mono text-purple-400 font-bold">{rotation}°</span>
                </div>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  step="1" 
                  value={rotation} 
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Item Size Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs tracking-wider">
                  <span className="text-white/60 uppercase">Item Dimension (Size)</span>
                  <span className="font-mono text-purple-400 font-bold">{itemSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="150" 
                  step="5" 
                  value={itemSize} 
                  onChange={(e) => setItemSize(parseInt(e.target.value))}
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
