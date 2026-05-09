"use client";

import { useEffect, useRef, useState } from 'react';

// Assets Mapping
const PORTAL_BG = 'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779974947/portal_bg_mu60k9.png';
const CURTAIN_LEFT = 'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/curtain_left_cdht6q.png';
const CURTAIN_RIGHT = 'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975071/curtain_right_a9bn3i.png';
const WORLD_BG = 'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975077/world_bg_jzzcn1.jpg';

// The cards MUST remain in this exact order (Card 3, Card 1, Card 2)
const CARD_IMAGES = [
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_3_nbwm25.jpg',
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_2_wr6al6.jpg',
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_1_jz8otj.jpg',
];

// Parallax Magnitudes
const MAG = { world: 6, portal: 7, curtainL: 14, curtainR: 14 };

// Math Helpers
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// Responsiveness Hook
function useScreenType(): 'mobile' | 'tablet' | 'desktop' {
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      setScreenType(w < 768 ? 'mobile' : w < 1100 ? 'tablet' : 'desktop');
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return screenType;
}

interface CardProps { img: string; label: string; isStat?: boolean; }

function Card({ img, label, isStat = false }: CardProps) {
  return (
    <div className="relative w-[140px] h-[140px] md:w-[158px] md:h-[158px] rounded-[24px] md:rounded-[28px] overflow-hidden flex-shrink-0 shadow-2xl glass-card group cursor-pointer transition-transform duration-500 hover:-translate-y-1">
      <img src={img} alt={label} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isStat ? 'opacity-40' : 'opacity-60'}`} />
      {isStat ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <span className="serif-font text-3xl md:text-4xl text-white tracking-tight leading-none">32</span>
          <span className="sans-font text-[9px] uppercase tracking-widest text-white/60 mt-1.5 leading-tight">World Patrons</span>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex items-center gap-2"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
            <svg width="7" height="8" viewBox="0 0 8 10" fill="none"><path d="M7 5L1 9V1L7 5Z" fill="#000"/></svg>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/90 font-bold">{label}</span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const screenType = useScreenType();

  const [isCurtainsOpened, setIsCurtainsOpened] = useState(false);
  const [isHeroAnimated, setIsHeroAnimated] = useState(false);
  const [isUiVisible, setIsUiVisible] = useState(false);
  const [isEntryDone, setIsEntryDone] = useState(false);

  const worldLayerRef = useRef<HTMLDivElement>(null);
  const portalLayerRef = useRef<HTMLDivElement>(null);
  const curtainLRef = useRef<HTMLDivElement>(null);
  const curtainRRef = useRef<HTMLDivElement>(null);
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const ctaSceneRef = useRef<HTMLDivElement>(null);
  // Separate ref for the fixed background parallax
  const bgParallaxRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => setIsCurtainsOpened(true), 100);
    const t2 = setTimeout(() => setIsHeroAnimated(true), 300);
    const t3 = setTimeout(() => setIsUiVisible(true), 600);
    const t4 = setTimeout(() => setIsEntryDone(true), 2200);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = totalHeight > 0 ? window.pageYOffset / totalHeight : 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    let animId: number;
    const tick = () => {
      mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, 0.07);
      mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, 0.07);

      const rx = mouseRef.current.x;
      const ry = mouseRef.current.y;
      const sp = scrollProgressRef.current;
      const easedSp = easeInOut(sp);

      // Fixed BG subtle parallax (slight drift for depth feel)
      if (bgParallaxRef.current) {
        bgParallaxRef.current.style.transform = `scale(1.08) translate3d(${rx * 12}px, ${ry * 12}px, 0)`;
      }

      // 1. World Layer Transform
      const worldScale = lerp(1, 1.18, sp);
      if (worldLayerRef.current) {
        worldLayerRef.current.style.transform = `scale(${worldScale}) translate3d(${rx * MAG.world}px, ${ry * MAG.world}px, 0)`;
      }

      // 2. Portal Layer
      const portalScale = lerp(1, 7.5, sp);
      const portalAlpha = clamp(1 - (sp - 0.65) / 0.2, 0, 1);
      if (portalLayerRef.current) {
        portalLayerRef.current.style.transform = `scale(${portalScale}) translate3d(${rx * MAG.portal}px, ${ry * MAG.portal}px, 0)`;
        portalLayerRef.current.style.opacity = portalAlpha.toString();
      }

      // 3. Curtains
      const baseShift = isCurtainsOpened ? lerp(62, 150, easedSp) : 0;
      const curtainScrollScale = lerp(1, 1.3, sp);
      if (curtainLRef.current) {
        curtainLRef.current.style.transform = `translateX(calc(-${baseShift}% + ${rx * MAG.curtainL}px)) translateY(${ry * MAG.curtainL * 0.3}px) scale(${curtainScrollScale}) translateZ(0)`;
      }
      if (curtainRRef.current) {
        curtainRRef.current.style.transform = `translateX(calc(${baseShift}% + ${rx * MAG.curtainR}px)) translateY(${ry * MAG.curtainR * 0.3}px) scale(${curtainScrollScale}) translateZ(0)`;
      }

      // 4. Hero
      const heroOpacity = clamp(1 - sp / 0.22, 0, 1);
      if (heroSceneRef.current) {
        heroSceneRef.current.style.opacity = (isHeroAnimated ? heroOpacity : 0).toString();
        heroSceneRef.current.style.transform = `translate3d(0, ${-sp * 150 + (isHeroAnimated ? 0 : 20)}px, 0)`;
        heroSceneRef.current.style.pointerEvents = heroOpacity > 0.1 ? 'auto' : 'none';
      }

      // 5. CTA
      const ctaOpacity = clamp((sp - 0.68) / 0.16, 0, 1);
      if (ctaSceneRef.current) {
        ctaSceneRef.current.style.opacity = ctaOpacity.toString();
        ctaSceneRef.current.style.transform = `translate3d(0, ${lerp(80, 0, ctaOpacity)}px, 0) translate3d(${rx * 8}px, ${ry * 8}px, 0)`;
        ctaSceneRef.current.style.pointerEvents = ctaOpacity > 0.1 ? 'auto' : 'none';
      }

      // Dots
      const activeIdx = Math.min(3, Math.floor(sp * 4));
      for (let idx = 1; idx <= 4; idx++) {
        const dot = document.getElementById(`dot${idx}`);
        if (dot) {
          dot.style.opacity = (idx - 1 === activeIdx ? 1 : 0.4).toString();
          dot.style.width = idx - 1 === activeIdx ? '28px' : '14px';
        }
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [isCurtainsOpened, isHeroAnimated]);

  const layerTransition = isEntryDone ? 'none' : 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.2s ease';

  const starLogo = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2l2.09 6.42H23l-5.45 3.96 2.08 6.42L14 14.84l-5.63 3.96 2.08-6.42L5 8.42h6.91L14 2z" fill="white"/>
    </svg>
  );

  const navBar = screenType === 'mobile' ? (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-[18px_20px] pointer-events-auto">
      <a href="#" className="nav-link">Explore</a>
      <div className="flex-shrink-0 opacity-80">{starLogo}</div>
      <a href="#" className="nav-link">Connect</a>
    </nav>
  ) : (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-[22px_48px] pointer-events-auto">
      <div className="flex gap-10">
        <a href="#" className="nav-link">Worlds</a>
        <a href="#" className="nav-link">Atelier</a>
        <a href="#" className="nav-link">Immersions</a>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 opacity-90">{starLogo}</div>
      <div className="flex gap-10">
        <a href="#" className="nav-link">Craft</a>
        <a href="#" className="nav-link">Codex</a>
        <a href="#" className="nav-link">Connect</a>
      </div>
    </nav>
  );

  const renderHeroContent = () => {
    switch (screenType) {
      case 'mobile':
        return (
          <div className="w-full flex flex-col items-center px-6 text-center text-[#3b1a0a]">
            <h1 className="serif-font text-[40px] mb-5 leading-[1.05] tracking-[0.02em]">FALL › INTO<br/>REVERIE</h1>
            <p className="sans-font text-[14px] leading-relaxed max-w-[280px] opacity-90 mb-8">
              Crafting boundless digital worlds where the edge between AI, vision, and living myth dissolves.
            </p>
            <Card img={CARD_IMAGES[0]} label="View Reel" />
          </div>
        );
      case 'tablet':
        return (
          <div className="w-full flex flex-col items-center px-8 text-center text-[#3b1a0a]">
            <h1 className="serif-font text-[64px] mb-6 leading-[1.02] tracking-[0.03em]">FALL › INTO<br/>REVERIE</h1>
            <p className="sans-font text-[16px] leading-relaxed max-w-[400px] opacity-90 mb-10">
              Crafting boundless digital worlds where the edge between AI, vision, and living myth dissolves.
            </p>
            <div className="flex gap-4">
              <Card img={CARD_IMAGES[0]} label="View Reel" />
              <Card img={CARD_IMAGES[1]} label="Stats" isStat={true} />
              <Card img={CARD_IMAGES[2]} label="View Reel" />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full relative text-white">
            <div className="absolute left-[60px] top-[46%] -translate-y-1/2 max-w-[440px]">
              <h1 className="serif-font text-[88px] leading-[0.95] tracking-[0.03em] mb-8 drop-shadow-2xl">FALL › INTO<br/>REVERIE</h1>
              <p className="sans-font text-[17px] text-white/80 leading-relaxed tracking-wide">
                Crafting boundless digital worlds where the edge between AI, vision, and living myth dissolves.
              </p>
            </div>
            <div className="absolute right-[40px] top-[50%] -translate-y-1/2 flex gap-5">
              <Card img={CARD_IMAGES[0]} label="View Reel" />
              <Card img={CARD_IMAGES[1]} label="Stats" isStat={true} />
              <Card img={CARD_IMAGES[2]} label="View Reel" />
            </div>
          </div>
        );
    }
  };

  // Padding around the floating panel
  const panelPadding = screenType === 'mobile' ? '24px' : '48px';

  return (
    // Root scroller
    <div style={{ height: '290vh', background: '#0a0608' }}>

      {/* ── LAYER 0: Fixed blurred forest background ───────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        overflow: 'hidden',
      }}>
        <div
          ref={bgParallaxRef}
          style={{
            position: 'absolute', inset: '-8%',
            backgroundImage: `url('${WORLD_BG}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px) brightness(0.45) saturate(0.8)',
            willChange: 'transform',
          }}
        />
        {/* subtle dark vignette to deepen edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,3,4,0.72) 100%)',
        }} />
      </div>

      {/* ── LAYER 1: Floating glass panel wrapper ──────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10,
        padding: panelPadding,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'stretch',
      }}>
        {/* Glass border shell */}
        <div style={{
          flex: 1,
          borderRadius: screenType === 'mobile' ? '20px' : '28px',
          overflow: 'hidden',
          position: 'relative',
          // Glassmorphic edges
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.10)',          // thin bright rim
            '0 0 0 1.5px rgba(255,255,255,0.04)',        // softer halo
            'inset 0 1px 0 rgba(255,255,255,0.16)',      // top inner light
            'inset 0 -1px 0 rgba(255,255,255,0.06)',     // bottom inner shadow
            '0 32px 80px rgba(0,0,0,0.65)',              // depth shadow underneath
            '0 8px 24px rgba(0,0,0,0.45)',               // closer ambient shadow
          ].join(', '),
          // Subtle glass tint on the shell itself
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}>

          {/* The actual canvas layers live inside here */}
          {/* 1. World Layer */}
          <div ref={worldLayerRef} className="layer"
            style={{ backgroundImage: `url('${WORLD_BG}')`, transition: layerTransition }} />

          {/* 2. Portal Layer */}
          <div ref={portalLayerRef} className="layer portal-layer"
            style={{ backgroundImage: `url('${PORTAL_BG}')`, zIndex: 5, transition: layerTransition }} />

          {/* 3. Curtains */}
          <div ref={curtainLRef} className="curtain"
            style={{ backgroundImage: `url('${CURTAIN_LEFT}')`, left: 0, transition: layerTransition }} />
          <div ref={curtainRRef} className="curtain"
            style={{ backgroundImage: `url('${CURTAIN_RIGHT}')`, right: 0, transition: layerTransition }} />

          {/* UI Overlay */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ease-out ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            {navBar}

            {/* Scene 1: Hero */}
            <div ref={heroSceneRef} className="absolute inset-0 flex items-center pointer-events-auto"
              style={{
                opacity: 0,
                transition: isEntryDone ? 'none' : 'transform 0.9s ease, opacity 0.9s ease',
                transitionDelay: isEntryDone ? '0ms' : '300ms'
              }}>
              {renderHeroContent()}
            </div>

            {/* Scene 2: CTA */}
            <div ref={ctaSceneRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none opacity-0 z-[46]">
              <div className="max-w-4xl px-6 pointer-events-auto">
                <h2 className="serif-font leading-[1.05] tracking-[0.03em] mb-6 drop-shadow-2xl text-white"
                  style={{ fontSize: 'clamp(38px, 8vw, 78px)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                  FORGE BEYOND THE REAL
                </h2>
                <p className="sans-font text-white/80 mx-auto leading-relaxed"
                  style={{ fontSize: screenType === 'mobile' ? '14px' : '20px', maxWidth: screenType === 'mobile' ? '260px' : '480px' }}>
                  Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary and the known.
                </p>
              </div>
            </div>

            {/* Bottom UI */}
            <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between items-end">
              <div className="flex gap-2"
                style={{
                  left: screenType === 'mobile' ? '50%' : '60px',
                  transform: screenType === 'mobile' ? 'translateX(-50%)' : 'none',
                  position: screenType === 'mobile' ? 'absolute' : 'relative'
                }}>
                <div className="h-[2px] bg-white w-7 opacity-100 transition-all duration-300" id="dot1" />
                <div className="h-[2px] bg-white w-3.5 opacity-40 transition-all duration-300" id="dot2" />
                <div className="h-[2px] bg-white w-3.5 opacity-40 transition-all duration-300" id="dot3" />
                <div className="h-[2px] bg-white w-3.5 opacity-40 transition-all duration-300" id="dot4" />
              </div>

              {screenType !== 'mobile' && (
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ bottom: '36px' }}>
                  <span className="uppercase text-[10px] tracking-[0.22em] text-white/60 font-medium">Descend</span>
                  <div className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center animate-bob">
                    <svg fill="none" height="6" viewBox="0 0 12 7" width="10" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Glass edge highlight — thin shimmer overlay on top rim */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 100,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.03) 100%)',
          }} />
        </div>
      </div>
    </div>
  );
}
