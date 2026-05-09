import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cameraState } from "../store/cameraState";

gsap.registerPlugin(ScrollTrigger);

export const Overlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero to Craftsmanship (Macro shot from the right)
      gsap.to(cameraState.position, {
        x: 3, y: 1, z: 2,
        scrollTrigger: { trigger: "#section-craftsmanship", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState.lookAt, {
        x: 0, y: 0.5, z: 0,
        scrollTrigger: { trigger: "#section-craftsmanship", start: "top bottom", end: "top top", scrub: true },
      });
      // Dramatic Shift in Focus and Lighting for the macro shot
      gsap.to(cameraState, {
        dofFocus: 2, // Focus extremely close
        scrollTrigger: { trigger: "#section-craftsmanship", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState.lightPosition, {
        x: -5, y: 5, z: 2, // Move light to create a rim-light effect
        scrollTrigger: { trigger: "#section-craftsmanship", start: "top bottom", end: "top top", scrub: true },
      });


      // 2. Craftsmanship to Materials (Top-down view)
      gsap.to(cameraState.position, {
        x: 0, y: 4, z: 0.5,
        scrollTrigger: { trigger: "#section-materials", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState.lookAt, {
        x: 0, y: 0, z: 0,
        scrollTrigger: { trigger: "#section-materials", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState, {
        dofFocus: 4, // Focus on the top of the ring
        scrollTrigger: { trigger: "#section-materials", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState.lightPosition, {
        x: 0, y: 10, z: -5, // Spotlight from the back
        scrollTrigger: { trigger: "#section-materials", start: "top bottom", end: "top top", scrub: true },
      });


      // 3. Materials to Contact (Zoom out drastically)
      gsap.to(cameraState.position, {
        x: -2, y: -1, z: 8,
        scrollTrigger: { trigger: "#section-contact", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState, {
        dofFocus: 8, // Deep focus to see the whole scene
        scrollTrigger: { trigger: "#section-contact", start: "top bottom", end: "top top", scrub: true },
      });
      gsap.to(cameraState.lightPosition, {
        x: 10, y: 10, z: 10, // Back to standard lighting
        scrollTrigger: { trigger: "#section-contact", start: "top bottom", end: "top top", scrub: true },
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
      {/* SECTION 1: HERO */}
      <section id="section-hero" className="h-screen w-full flex items-center justify-center pointer-events-auto">
        <div className="text-center text-white mix-blend-difference">
          <h1 className="text-6xl md:text-8xl font-light tracking-widest uppercase">Elegance</h1>
          <p className="mt-4 text-xl font-light tracking-widest">Redefined.</p>
        </div>
      </section>

      {/* SECTION 2: CRAFTSMANSHIP */}
      <section id="section-craftsmanship" className="h-screen w-full flex items-center justify-start px-10 md:px-32 pointer-events-auto">
        <div className="max-w-md text-white mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-light mb-6">Craftsmanship</h2>
          <p className="text-lg font-light leading-relaxed opacity-80">
            Every curve is meticulously sculpted by master artisans. We blend traditional techniques with modern precision to create pieces that transcend time.
          </p>
        </div>
      </section>

      {/* SECTION 3: MATERIALS */}
      <section id="section-materials" className="h-screen w-full flex items-end justify-center pb-24 pointer-events-auto">
        <div className="text-center text-white mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-light mb-6">Pure Gold</h2>
          <p className="text-lg font-light leading-relaxed opacity-80 max-w-lg mx-auto">
            Sourced ethically, refined to perfection. Our gold catches the light in ways you've never seen before.
          </p>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="section-contact" className="h-[120vh] w-full flex items-center justify-center pointer-events-auto">
        <div className="text-center text-white mix-blend-difference">
          <h2 className="text-5xl md:text-7xl font-light mb-10">Forever Yours</h2>
          <button className="px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors duration-500 uppercase tracking-widest text-sm pointer-events-auto">
            Discover the Collection
          </button>
        </div>
      </section>
    </div>
  );
};
