"use client";

import GhostCursor from './GhostCursor';

// NOTE: Took note of these controls. They can be modified here when required.
const CURSOR_CONFIG = {
  color: '#B497CF',
  trailLength: 55,
  inertia: 0.45,
  brightness: 1.1,
  grainIntensity: 0.04,
  bloomStrength: 0.12,
  bloomRadius: 0.9,
  bloomThreshold: 0.025,
  edgeIntensity: 0.15,
  zIndex: 1 // Rendered behind the text so the trail silhouettes it
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#050307] flex items-center justify-center relative overflow-hidden select-none">
      
      {/* WebGL Ghost Cursor Trail */}
      <GhostCursor
        color={CURSOR_CONFIG.color}
        trailLength={CURSOR_CONFIG.trailLength}
        inertia={CURSOR_CONFIG.inertia}
        brightness={CURSOR_CONFIG.brightness}
        grainIntensity={CURSOR_CONFIG.grainIntensity}
        bloomStrength={CURSOR_CONFIG.bloomStrength}
        bloomRadius={CURSOR_CONFIG.bloomRadius}
        bloomThreshold={CURSOR_CONFIG.bloomThreshold}
        edgeIntensity={CURSOR_CONFIG.edgeIntensity}
        zIndex={CURSOR_CONFIG.zIndex}
      />

      {/* Centered Spooky Text in solid black */}
      <h1 
        className="text-[16vw] font-black text-black z-10 tracking-widest pointer-events-none select-none drop-shadow-[0_0_2px_rgba(255,255,255,0.05)]"
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        BOO!
      </h1>

    </main>
  );
}
