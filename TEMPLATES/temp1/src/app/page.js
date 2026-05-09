"use client";

import { useEffect, useRef, useState } from 'react';
import { UserPlus, LogIn, Menu, X, Sparkles, Play } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = [];
    const MAX_WIDTH = 720; // Optimised resolution for background video accent
    let capturing = true;
    let captureFrameId = 0;
    let boomerangFrameId = 0;
    let lastTime = -1;

    const handleLoadedMetadata = () => {
      video.play().catch(err => console.log("Video autoplay blocked or interrupted:", err));
      
      const captureFrame = () => {
        if (!capturing) return;
        
        // Only capture when video has enough data and currentTime has advanced
        if (video.readyState >= 2 && video.currentTime !== lastTime) {
          lastTime = video.currentTime;
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          const scale = Math.min(1, MAX_WIDTH / vw);
          const w = Math.round(vw * scale);
          const h = Math.round(vh * scale);
          
          // Use high-performance ImageBitmap to decode and scale frames directly on GPU
          createImageBitmap(video, {
            resizeWidth: w,
            resizeHeight: h,
            resizeQuality: 'medium'
          }).then(bitmap => {
            if (capturing) {
              frames.push(bitmap);
            } else {
              bitmap.close();
            }
          }).catch(err => {
            console.error("Error creating image bitmap:", err);
          });
        }

        if (!video.ended) {
          captureFrameId = requestAnimationFrame(captureFrame);
        } else {
          startBoomerang();
        }
      };

      captureFrameId = requestAnimationFrame(captureFrame);
    };

    function startBoomerang() {
      capturing = false;
      if (frames.length === 0) {
        if (video) {
          video.loop = true;
          video.play().catch(err => console.log("Fallback loop play failed:", err));
        }
        return;
      }
      if (video) video.style.display = 'none';
      if (canvas) canvas.style.display = 'block';
      
      canvas.width = frames[0].width;
      canvas.height = frames[0].height;
      
      let index = 0;
      let direction = 1;
      let last = performance.now();
      const interval = 1000 / 30; // Target a locked 30fps playback matching video content

      const render = (now) => {
        if (now - last >= interval) {
          last = now;
          if (ctx && frames[index]) {
            ctx.drawImage(frames[index], 0, 0);
          }
          index += direction;
          
          if (index >= frames.length - 1) {
            index = frames.length - 1;
            direction = -1;
          } else if (index <= 0) {
            index = 0;
            direction = 1;
          }
        }
        boomerangFrameId = requestAnimationFrame(render);
      };
      
      boomerangFrameId = requestAnimationFrame(render);
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      capturing = false;
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.pause();
      }
      cancelAnimationFrame(captureFrameId);
      cancelAnimationFrame(boomerangFrameId);
      
      // Explicitly close all ImageBitmaps to immediately release GPU textures
      frames.forEach(bitmap => {
        if (typeof bitmap.close === 'function') {
          bitmap.close();
        }
      });
      frames.length = 0;
    };
  }, []);

  return (
    <div id="root" className={menuOpen ? 'menu-open' : ''}>
      <section className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#f8f9f7]">
        {/* Boomerang Video Background */}
        <div id="boomerang-container" className="absolute inset-0 w-full h-full">
          <video 
            ref={videoRef}
            id="source-video" 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4" 
            className="w-full h-full object-cover" 
            autoPlay
            muted 
            playsInline 
            crossOrigin="anonymous" 
            style={{ display: 'block' }}
          />
          <canvas 
            ref={canvasRef}
            id="display-canvas" 
            className="w-full h-full object-cover" 
            style={{ display: 'none' }}
          />
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-[--med-green]">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
              LinkFlow<sup className="text-[10px] sm:text-xs font-medium">TM</sup>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
            <a href="#mission" className="text-sm px-3 py-2 font-semibold text-[--dark-green] transition-colors">Purpose</a>
            <a href="#how" className="text-sm px-3 py-2 font-medium text-[--body-green] hover:text-[--dark-green] transition-colors">The Process</a>
            <a href="#pricing" className="text-sm px-3 py-2 font-medium text-[--body-green] hover:text-[--dark-green] transition-colors">Tariffs</a>
            <button className="ml-2 bg-[--dark-green] hover:bg-[--button-hover] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
              Try it Live
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-[--med-green]">
            <a href="#signup" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
              <UserPlus className="w-4 h-4" />
              Sign Me Up!
            </a>
            <a href="#login" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
              <LogIn className="w-4 h-4" />
              Enter
            </a>
            <button 
              onClick={toggleMenu}
              id="menu-toggle" 
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[--dark-green] transition-all duration-300 hover:bg-white/90"
            >
              <Menu id="menu-icon" className={`w-5 h-5 absolute transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 scale-100'}`} />
              <X id="close-icon" className={`w-5 h-5 absolute transition-all duration-300 ${menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 -rotate-90 scale-50'}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          onClick={toggleMenu}
          id="mobile-overlay" 
          className={`lg:hidden fixed inset-0 z-20 bg-[--dark-green]/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />
        <div 
          id="mobile-drawer" 
          className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            <div className="flex flex-col gap-1">
              <a href="#mission" className={`mobile-link-1 stagger-in text-2xl font-semibold text-[--dark-green] py-4 border-b border-[--dark-green]/10 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>Purpose</a>
              <a href="#how" className={`mobile-link-2 stagger-in text-2xl font-semibold text-[--dark-green] py-4 border-b border-[--dark-green]/10 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>The Process</a>
              <a href="#pricing" className={`mobile-link-3 stagger-in text-2xl font-semibold text-[--dark-green] py-4 border-b border-[--dark-green]/10 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>Tariffs</a>
            </div>
            <div className={`mobile-cta stagger-in mt-8 flex flex-col gap-4 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              <a href="#signup" className="flex items-center gap-2 text-sm font-medium text-[--med-green] sm:hidden">
                <UserPlus className="w-4 h-4" /> Sign Me Up!
              </a>
              <a href="#login" className="flex items-center gap-2 text-sm font-medium text-[--med-green] sm:hidden">
                <LogIn className="w-4 h-4" /> Enter
              </a>
              <button className="mt-2 bg-[--dark-green] hover:bg-[--button-hover] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors">
                Try it Live
              </button>
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
          <h1 className="font-normal leading-[0.95] text-[--heading-primary] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl tracking-[-0.035em]">
            Close the rift <br className="sm:hidden" />
            <span className="text-[--heading-accent]">linking<br className="hidden sm:block" /> signals and action</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-[--body-green] text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
            Shape scattered signals into meaningful outcomes via AI-driven workflows.
          </p>
        </div>

        {/* Bottom-left CTA block */}
        <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
          <div className="flex items-center gap-2 text-[--bottom-left] sm:text-white/95 mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold sm:font-medium">FluxEngine<sup className="text-[10px]">TM</sup></span>
          </div>
          <p className="text-[--bottom-left]/90 sm:text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-medium sm:font-normal">
            LinkFlow smoothly unites your company systems, streamlining data paths between services without having to write custom scripts.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-[--bottom-left] sm:bg-white hover:bg-[#2d4228] sm:hover:bg-white/90 text-white sm:text-[--dark-green] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm">
              Try it Live
            </button>
            <button className="text-[--bottom-left] sm:text-white text-sm font-semibold sm:font-medium hover:opacity-80 transition-opacity">
              Know More.
            </button>
          </div>
        </div>

        {/* Bottom-right video link */}
        <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm">
          <button className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Play className="fill-white text-white ml-0.5 w-3 h-3" />
          </button>
          <span className="font-medium">How we build?</span>
          <span className="text-white/60">1:35</span>
        </div>
      </section>
    </div>
  );
}
