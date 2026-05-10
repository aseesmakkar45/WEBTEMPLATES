"use client";

import { useState, useEffect, useRef } from 'react';
import { useMotionValue } from 'motion/react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Sliders, 
  RotateCcw, 
  Layers, 
  Info,
  MousePointer,
  Compass,
  ArrowRightLeft,
  Maximize2
} from 'lucide-react';
import Carousel3D from './Carousel3D';

// 12 Curated high-quality visual cards representing different themes
const CIRCLE_GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&auto=format&fit=crop&q=80",
    title: "Cosmic Spire",
    tag: "Astro Design",
    desc: "A cluster of newly formed suns radiating intense ultraviolet stellar wind."
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    title: "Hyper Light Pavilion",
    tag: "Architecture",
    desc: "A futuristic modular villa constructed out of smart-switch light prisms."
  },
  {
    src: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=600&auto=format&fit=crop&q=80",
    title: "Rainy Shibuya",
    tag: "Cyberpunk",
    desc: "Multistory glass skyscrapers reflecting bright neon streams on wet concrete."
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    title: "Pacific Horizon",
    tag: "Nature",
    desc: "Emerald tidepools catching the last rays of golden sunlight at sunset."
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    title: "Liquid Chrome",
    tag: "Surrealism",
    desc: "Iridescent metallic tendrils twisting into abstract architectural grids."
  },
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    title: "Vector Solar",
    tag: "Future Concept",
    desc: "Monolithic clean energy arrays absorbing light at high atmospheric heights."
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    title: "Verdant Gorge",
    tag: "Adventure",
    desc: "Lush hanging fern terraces wrapping around narrow river valley canyon walls."
  },
  {
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&auto=format&fit=crop&q=80",
    title: "Holographic Oasis",
    tag: "Creative",
    desc: "Synthesized foliage glowing with light-emitting biological sequences."
  },
  {
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop&q=80",
    title: "Borealis Zenith",
    tag: "Atmosphere",
    desc: "A dense curtain of neon green aurora painting the arctic midnight."
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
    title: "Iron Dunes",
    tag: "Geology",
    desc: "Windblown mineral crests carving sharp dark orange shadows at dawn."
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    title: "Retro Terminal",
    tag: "Vaporwave",
    desc: "A nostalgic workspace featuring vintage glass CRT monitors."
  },
  {
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    title: "Monastery Peak",
    tag: "Mystic",
    desc: "An ancient stone tower situated above cascading fog waterfalls."
  }
];

export default function Home() {
  // Customizable Ring parameters
  const [radius, setRadius] = useState(380);
  const [tilt, setTilt] = useState(-15); // Kept -15 degrees as default/requested
  const [itemSize, setItemSize] = useState(195);
  const [scrollSensitivity, setScrollSensitivity] = useState(1.0);
  
  // Autoplay options
  const [autoplay, setAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(25); // Speed multiplier
  
  // Control Panel state
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Central progress motion value tracking rotation angle in degrees (0 to 360 = 1 full spin)
  const progress = useMotionValue(0);

  // 1. Mouse Wheel Scroll Event Interceptor
  useEffect(() => {
    if (autoplay) return;

    const handleWheel = (e) => {
      const current = progress.get();
      // Scroll down increments progress, scroll up decrements it
      const delta = e.deltaY * 0.08 * scrollSensitivity;
      progress.set(current + delta);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [autoplay, scrollSensitivity, progress]);

  // 2. Touch Swipe Gesture Interceptor (Mobile support)
  useEffect(() => {
    if (autoplay) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      // Calculate horizontal & vertical deltas. Horizontal swipes also drive the circle.
      const deltaX = (touchStartX - touchCurrentX) * 0.3 * scrollSensitivity;
      const deltaY = (touchStartY - touchCurrentY) * 0.3 * scrollSensitivity;
      
      // Combine swipes to rotate circular timeline smoothly
      const deltaCombined = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      const current = progress.get();
      progress.set(current + deltaCombined);

      touchStartX = touchCurrentX;
      touchStartY = touchCurrentY;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [autoplay, scrollSensitivity, progress]);

  // 3. Autoplay Loop (smooth requestAnimationFrame loop)
  useEffect(() => {
    if (!autoplay) return;

    let active = true;
    const speedCoeff = autoplaySpeed * 0.03;

    const frame = () => {
      if (!active) return;
      progress.set(progress.get() + speedCoeff);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
    return () => {
      active = false;
    };
  }, [autoplay, autoplaySpeed, progress]);

  // Layout Presets
  const applyPreset = (preset) => {
    switch (preset) {
      case 'dramatic-tilt':
        setTilt(-35);
        setRadius(420);
        setItemSize(180);
        break;
      case 'eye-level':
        setTilt(0);
        setRadius(350);
        setItemSize(210);
        break;
      case 'compact':
        setRadius(280);
        setTilt(-12);
        setItemSize(160);
        break;
      case 'wide-immersive':
        setRadius(500);
        setTilt(-18);
        setItemSize(210);
        break;
    }
  };

  const resetAllSettings = () => {
    setRadius(380);
    setTilt(-15);
    setItemSize(195);
    setScrollSensitivity(1.0);
    setAutoplay(false);
    setAutoplaySpeed(25);
    progress.set(0);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#040307] text-white flex flex-col justify-between relative selection:bg-blue-950/40 selection:text-blue-300">
      
      {/* Background ambient glowing radial gradients */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-950/15 blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-950/15 blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-[25%] left-[30%] w-[45%] h-[45%] rounded-full bg-[#1b1035]/10 blur-[150px] pointer-events-none z-0" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#040307]/80 to-transparent py-5 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-blue-500/20 flex items-center justify-center bg-blue-950/10 shadow-lg shadow-blue-500/5">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-[0.25em] uppercase text-white/90 leading-none">Orbital3D</h1>
              <span className="text-[9px] tracking-[0.2em] uppercase text-cyan-400 font-semibold mt-1.5 block">Z-Axis Ring Projection Template</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!autoplay ? (
              <div className="flex items-center gap-1.5 bg-blue-950/25 border border-blue-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                <MousePointer className="w-3 h-3 text-blue-400 animate-bounce" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300">Wheel Scroll Engaged</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-cyan-950/25 border border-cyan-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-300">Autoplay Loop Active</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Info Description Card Overlay (Top Left) */}
      <div className="absolute top-24 left-6 md:left-10 z-40 max-w-sm pointer-events-none select-none">
        <div className="bg-black/35 border border-white/5 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
          <span className="text-[9.5px] tracking-[0.25em] uppercase text-cyan-400 font-extrabold block mb-2">Depth Mechanics</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white uppercase mb-3">
            Circular Ring <br/>
            <span className="text-blue-400">Projection</span>
          </h2>
          <p className="text-[11px] text-white/50 leading-relaxed mb-4">
            Image cards are spaced evenly along a 3D circle in the Z-axis (X-Z plane). 
            <strong> Scroll your wheel or drag the viewport</strong> to rotate. Background items automatically scale down, dim, and blur for a professional depth-of-field lens.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-[10px]">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>X-Axis Ring Inclination: <span className="font-mono text-blue-300">{tilt}°</span></span>
          </div>
        </div>
      </div>

      {/* Main Immersive Canvas Area */}
      <div className="w-full flex-grow relative z-10 flex items-center justify-center min-h-0 overflow-visible">
        <div className="w-full h-full max-w-7xl flex items-center justify-center px-6 relative overflow-visible">
          <Carousel3D
            images={CIRCLE_GALLERY_IMAGES}
            radius={radius}
            tilt={tilt}
            itemSize={itemSize}
            progress={progress}
          />
        </div>
      </div>

      {/* Floating Control Sliders Console (Bottom Right) - Commented out but preserved for future reference
      <div className="absolute bottom-6 right-6 z-40 max-w-md w-full sm:w-auto">
        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button 
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors text-left"
            >
              <Sliders className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Settings Console</span>
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={resetAllSettings}
                className="p-1 rounded hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                title="Reset Settings"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {isPanelOpen && (
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>Ring Radius (R)</span>
                  <span className="font-mono text-blue-300">{radius}px</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="600" 
                  value={radius} 
                  onChange={(e) => setRadius(parseInt(e.target.value))} 
                  className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>X-Axis Tilt (Angle)</span>
                  <span className="font-mono text-blue-300">{tilt}°</span>
                </div>
                <input 
                  type="range" 
                  min="-60" 
                  max="60" 
                  value={tilt} 
                  onChange={(e) => setTilt(parseInt(e.target.value))} 
                  className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>Card Width</span>
                  <span className="font-mono text-blue-300">{itemSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="280" 
                  value={itemSize} 
                  onChange={(e) => setItemSize(parseInt(e.target.value))} 
                  className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>Scroll Sensitivity</span>
                  <span className="font-mono text-blue-300">{scrollSensitivity.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.2" 
                  max="2.5" 
                  step="0.1"
                  value={scrollSensitivity} 
                  onChange={(e) => setScrollSensitivity(parseFloat(e.target.value))} 
                  className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Ring Presets</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => applyPreset('dramatic-tilt')}
                    className="text-[10px] py-1 px-2 rounded bg-white/5 hover:bg-blue-500/10 hover:text-blue-300 transition-all border border-transparent hover:border-blue-500/20 text-center"
                  >
                    Dramatic Tilt
                  </button>
                  <button 
                    onClick={() => applyPreset('eye-level')}
                    className="text-[10px] py-1 px-2 rounded bg-white/5 hover:bg-blue-500/10 hover:text-blue-300 transition-all border border-transparent hover:border-blue-500/20 text-center"
                  >
                    Eye Level
                  </button>
                  <button 
                    onClick={() => applyPreset('compact')}
                    className="text-[10px] py-1 px-2 rounded bg-white/5 hover:bg-blue-500/10 hover:text-blue-300 transition-all border border-transparent hover:border-blue-500/20 text-center"
                  >
                    Compact Ring
                  </button>
                  <button 
                    onClick={() => applyPreset('wide-immersive')}
                    className="text-[10px] py-1 px-2 rounded bg-white/5 hover:bg-blue-500/10 hover:text-blue-300 transition-all border border-transparent hover:border-blue-500/20 text-center"
                  >
                    Wide Space
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    autoplay 
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' 
                      : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {autoplay ? (
                    <>
                      <Pause className="w-3 h-3 fill-cyan-300" />
                      <span>Pause Autoplay</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-white/70" />
                      <span>Start Autoplay</span>
                    </>
                  )}
                </button>

                {autoplay && (
                  <div className="flex items-center gap-2 flex-grow max-w-[120px] ml-4">
                    <span className="text-[9px] text-white/40">Speed</span>
                    <input 
                      type="range" 
                      min="5" 
                      max="80" 
                      value={autoplaySpeed} 
                      onChange={(e) => setAutoplaySpeed(parseInt(e.target.value))} 
                      className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      */}
    </main>
  );
}
