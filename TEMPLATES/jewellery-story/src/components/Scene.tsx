import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import { cameraState } from "../store/cameraState";
import { Model as RingModel } from "./RingModel";

// The CameraRig reads from cameraState and smoothly lerps the actual camera, lighting, and post-processing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CameraRig = ({ spotLightRef, dofRef }: any) => {
  useFrame((state) => {
    // 1. Camera Transform
    state.camera.position.lerp(cameraState.position, 0.05);
    lookAtTarget.lerp(cameraState.lookAt, 0.05);
    state.camera.lookAt(lookAtTarget);

    // 2. Light Position
    if (spotLightRef.current) {
      spotLightRef.current.position.lerp(cameraState.lightPosition, 0.05);
    }

    // 3. Depth of Field Focus
    if (dofRef.current) {
      // Smoothly interpolate the focus distance
      dofRef.current.focusDistance = THREE.MathUtils.lerp(dofRef.current.focusDistance, cameraState.dofFocus * 0.01, 0.05);
    }
  });
  return null;
};

// Global vector to track the current lookAt
const lookAtTarget = new THREE.Vector3(0, 0, 0);

export const Scene = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dofRef = useRef<any>(null);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <CameraRig spotLightRef={spotLightRef} dofRef={dofRef} />
        
        {/* Environment map provides realistic studio lighting and reflections for the gold */}
        <Environment preset="studio" />
        
        {/* Ambient light for base visibility */}
        <ambientLight intensity={0.2} />
        
        {/* Scroll-Driven Spotlight to create dramatic moving highlights */}
        <spotLight 
          ref={spotLightRef}
          position={[10, 10, 10]} 
          angle={0.25} 
          penumbra={1} 
          intensity={5} 
          castShadow 
          color="#ffd700"
        />

        {/* The Pedestal (Dark Obsidian Marble) */}
        <mesh position={[0, -1.5, 0]} receiveShadow>
          <cylinderGeometry args={[4, 4, 0.2, 64]} />
          <meshPhysicalMaterial 
            color="#050505" 
            metalness={0.8} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Floating Golden Particles */}
        <Sparkles 
          count={100} 
          scale={5} 
          size={2} 
          speed={0.4} 
          opacity={0.5} 
          color="#ffdd88" 
        />

        {/* The Ring Model floating gently */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <RingModel scale={1.5} />
          </PresentationControls>
        </Float>

        {/* Cinematic Post-Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={1.2} 
          />
          <DepthOfField 
            ref={dofRef} 
            target={[0, 0, 0]} 
            focalLength={0.02} 
            bokehScale={5} 
            height={480} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
