import React from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { Scene } from "./components/Scene";
import { Overlay } from "./components/Overlay";

function App() {
  return (
    <SmoothScroll>
      <main className="relative w-full text-white selection:bg-white selection:text-black">
        {/* The 3D Canvas sits fixed in the background */}
        <Scene />
        
        {/* The HTML overlays scroll normally, driving the GSAP ScrollTriggers */}
        <Overlay />
      </main>
    </SmoothScroll>
  );
}

export default App;
