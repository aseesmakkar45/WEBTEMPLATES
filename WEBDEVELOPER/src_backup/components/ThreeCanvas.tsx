"use client";

import { useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════════
   SHARED ANIMATION STATE
═══════════════════════════════════════════════════════════════════════ */
interface AnimState {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  targetMouseX: number;
  targetMouseY: number;
  /** Live primary color – updated each frame by PaletteUpdater */
  colorA: THREE.Color;
  /** Live accent color – updated each frame by PaletteUpdater */
  colorB: THREE.Color;
}

/* ═══════════════════════════════════════════════════════════════════════
   VIVID DUAL-COLOR PALETTES  (one per scroll section 0→1)
   colorA = primary   colorB = accent  – both BRIGHT & SATURATED
═══════════════════════════════════════════════════════════════════════ */
const PALETTES = [
  { a: new THREE.Color("#ff2d9b"), b: new THREE.Color("#7c3aed") }, // §0 Hot-Pink  + Electric-Violet
  { a: new THREE.Color("#aaff00"), b: new THREE.Color("#0066ff") }, // §1 Neon-Lime + Electric-Blue
  { a: new THREE.Color("#ffb800"), b: new THREE.Color("#e0007a") }, // §2 Amber     + Magenta
  { a: new THREE.Color("#00f5ff"), b: new THREE.Color("#ff5500") }, // §3 Cyan      + Neon-Orange
  { a: new THREE.Color("#ffe500"), b: new THREE.Color("#6600ff") }, // §4 Yellow    + Ultra-Violet
];

/* Dark-but-vivid CSS gradient pairs  [inner , outer] per section */
const BG_STOPS: [string, string][] = [
  ["#1a0520", "#0a001a"], // §0 violet-rose
  ["#071a00", "#000e28"], // §1 lime-navy
  ["#1a0e00", "#160012"], // §2 amber-wine
  ["#001618", "#1a0900"], // §3 teal-charcoal
  ["#1a1700", "#0c0025"], // §4 gold-indigo
];

/* ═══════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════ */
const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** Returns interpolated colorA, colorB and CSS bg-stops for scroll 0→1 */
function getPalette(scroll: number) {
  const n = PALETTES.length;
  const raw = Math.max(0, Math.min(1, scroll)) * (n - 1);
  const lo  = Math.min(Math.floor(raw), n - 2);
  const hi  = lo + 1;
  const t   = raw - lo;

  const colorA = new THREE.Color().copy(PALETTES[lo].a).lerp(PALETTES[hi].a, t);
  const colorB = new THREE.Color().copy(PALETTES[lo].b).lerp(PALETTES[hi].b, t);

  const lerpCss = (c1: string, c2: string) =>
    "#" + new THREE.Color(c1).lerp(new THREE.Color(c2), t).getHexString();

  return {
    colorA,
    colorB,
    inner: lerpCss(BG_STOPS[lo][0], BG_STOPS[hi][0]),
    outer: lerpCss(BG_STOPS[lo][1], BG_STOPS[hi][1]),
  };
}

/** Shared wave-height formula (used by TerrainWave & LightNeedle) */
function getWaveHeight(x: number, z: number, time: number, scroll: number): number {
  let amp = 0.08;
  let speedMult = 0.12;

  if (scroll > 0.85) {
    const f = easeInOutCubic((scroll - 0.85) / 0.15);
    amp = 0.08 + f * 0.65;
    speedMult = 0.12 + f * 0.18;
  } else if (scroll > 0.20 && scroll <= 0.45) {
    const f = easeInOutCubic((scroll - 0.20) / 0.25);
    amp = 0.08 * (1.0 - Math.min(1.0, f * 1.2));
  } else if (scroll > 0.45 && scroll <= 0.85) {
    amp = 0.0;
  }

  const spd = time * speedMult;
  const h1  = Math.sin(x * 0.28 + spd) * Math.cos(z * 0.28 + spd * 0.8) * amp;
  const h2  = Math.cos(x * 0.14 - spd * 0.4) * Math.sin(z * 0.18 + spd * 0.6) * (amp * 0.5);
  const vs  = scroll > 0.85 ? 0.22 : scroll > 0.20 && scroll <= 0.85 ? 0.04 : 0.22;
  return h1 + h2 + Math.pow(Math.abs(x) / 10, 1.8) * vs - 1.2;
}

/* ═══════════════════════════════════════════════════════════════════════
   PALETTE UPDATER  – runs inside Canvas, updates stateRef + bg gradient
═══════════════════════════════════════════════════════════════════════ */
function PaletteUpdater({
  stateRef,
  bgRef,
}: {
  stateRef: React.MutableRefObject<AnimState>;
  bgRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  useFrame(() => {
    const { colorA, colorB, inner, outer } = getPalette(stateRef.current.scrollProgress);
    stateRef.current.colorA.copy(colorA);
    stateRef.current.colorB.copy(colorB);

    // Mutate the DOM directly – no React re-render needed
    if (bgRef.current) {
      bgRef.current.style.background =
        `radial-gradient(ellipse at center, ${inner} 0%, ${outer} 68%, #020202 100%)`;
    }

    // Bind document variables to current vivid dual-color palette
    if (typeof document !== "undefined") {
      const hexA = "#" + colorA.getHexString();
      const hexB = "#" + colorB.getHexString();
      document.documentElement.style.setProperty("--orange", hexA);
      document.documentElement.style.setProperty("--theme-b", hexB);
      document.documentElement.style.setProperty(
        "--border-warm",
        `rgba(${Math.floor(colorA.r * 255)}, ${Math.floor(colorA.g * 255)}, ${Math.floor(colorA.b * 255)}, 0.18)`
      );
    }
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   A.  GLASS ORB CLUSTER  (Hero: scroll 0 → 0.22)
═══════════════════════════════════════════════════════════════════════ */
function GlassOrbs({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const groupRef = useRef<THREE.Group>(null);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        roughness: 0.12,
        metalness: 0.0,
        transmission: 0.97,
        thickness: 2.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        ior: 1.5,
        reflectivity: 0.5,
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.15,
        metalness: 0.55,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  const orbs = useMemo(
    () => [
      { pos: [0,    0.0,  0.0] as [number, number, number], r: 1.35, isGlass: true  },
      { pos: [2.2,  0.8, -1.0] as [number, number, number], r: 0.65, isGlass: false },
      { pos: [-2.0,-0.5, -0.8] as [number, number, number], r: 0.85, isGlass: true  },
      { pos: [1.0, -1.8, -0.4] as [number, number, number], r: 0.45, isGlass: false },
      { pos: [-1.2, 1.6, -1.2] as [number, number, number], r: 0.55, isGlass: true  },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t      = state.clock.getElapsedTime();
    const scroll = stateRef.current.scrollProgress;
    const { colorA, colorB } = stateRef.current;

    // Fade out as user scrolls past hero
    let activeScale = 1.0;
    if (scroll > 0.18) activeScale = Math.max(0.0, 1.0 - (scroll - 0.18) / 0.12);

    groupRef.current.position.y = Math.sin(t * 0.4) * 0.12;

    // Drive material colors from live palette
    accentMat.color.copy(colorA);
    accentMat.emissive = colorA.clone();
    accentMat.emissiveIntensity = (0.35 + Math.sin(t * 1.2) * 0.10) * activeScale;

    glassMat.emissive = colorB.clone();
    glassMat.emissiveIntensity = (0.12 + Math.sin(t * 0.7) * 0.04) * activeScale;

    orbs.forEach((o, idx) => {
      const mesh = groupRef.current!.children[idx] as THREE.Mesh;
      if (!mesh) return;

      mesh.scale.setScalar(activeScale);

      const dir   = new THREE.Vector3(...o.pos).normalize();
      const drift = scroll * 0.8;
      mesh.position.set(
        o.pos[0] + dir.x * drift + Math.sin(t * 0.5 + idx) * 0.05,
        o.pos[1] + dir.y * drift + Math.cos(t * 0.6 + idx) * 0.05,
        o.pos[2] + dir.z * drift
      );

      (mesh.material as THREE.MeshPhysicalMaterial).opacity =
        activeScale * (o.isGlass ? 0.55 : 0.50);
    });

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, stateRef.current.mouseX * 0.22, 0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -stateRef.current.mouseY * 0.15, 0.04
    );
  });

  return (
    <group ref={groupRef}>
      {orbs.map((o, i) => (
        <mesh key={i} material={o.isGlass ? glassMat : accentMat}>
          <sphereGeometry args={[o.r, 32, 32]} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   B.  CONSTELLATION NETWORK  (Services: scroll 0.20 → 0.48)
═══════════════════════════════════════════════════════════════════════ */
function ConstellationNetwork({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const COUNT = 45;
  const MAX_CONNECTIONS = 90;

  // Initialize random positions, velocities, and drift phases
  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vels = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6 + 0.5;
      pos[i * 3 + 2] = -(Math.random() * 5 + 1);

      vels[i * 3] = (Math.random() - 0.5) * 0.4;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      phases[i] = Math.random() * Math.PI * 2;
    }
    return { pos, vels, phases };
  }, []);

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.pos), 3));
    return g;
  }, [data]);

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_CONNECTIONS * 2 * 3), 3));
    return g;
  }, []);

  const pointMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    const scroll = stateRef.current.scrollProgress;
    const { colorA, colorB } = stateRef.current;
    const t = state.clock.getElapsedTime();

    // Scale/opacity gating for Services (0.20 -> 0.48)
    let opacity = 0;
    if (scroll > 0.18 && scroll <= 0.50) {
      const fadeIn = Math.min(1, (scroll - 0.18) / 0.08);
      const fadeOut = scroll > 0.42 ? Math.max(0, 1 - (scroll - 0.42) / 0.08) : 1;
      opacity = fadeIn * fadeOut;
    }

    pointMat.color.copy(colorA);
    pointMat.opacity = opacity * 0.85;

    lineMat.color.copy(colorB);
    lineMat.opacity = opacity * 0.45;

    if (!pointsRef.current || !linesRef.current) return;

    const pAttr = pointsGeo.attributes.position;
    const pArr = pAttr.array as Float32Array;

    // 1. Move nodes organically
    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      pArr[idx] += data.vels[idx] * 0.016 + Math.sin(t * 0.3 + data.phases[i]) * 0.003;
      pArr[idx + 1] += data.vels[idx + 1] * 0.016 + Math.cos(t * 0.4 + data.phases[i]) * 0.002;
      pArr[idx + 2] += data.vels[idx + 2] * 0.016;

      if (Math.abs(pArr[idx]) > 7) data.vels[idx] *= -1;
      if (pArr[idx + 1] < -2.5 || pArr[idx + 1] > 3.5) data.vels[idx + 1] *= -1;
      if (pArr[idx + 2] < -7 || pArr[idx + 2] > 0) data.vels[idx + 2] *= -1;
    }
    pAttr.needsUpdate = true;

    // 2. Compute connection lines dynamically based on distance
    const lAttr = linesGeo.attributes.position;
    const lArr = lAttr.array as Float32Array;
    let lineIdx = 0;

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (lineIdx >= MAX_CONNECTIONS) break;

        const dx = pArr[i * 3] - pArr[j * 3];
        const dy = pArr[i * 3 + 1] - pArr[j * 3 + 1];
        const dz = pArr[i * 3 + 2] - pArr[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 7.8) {
          const lPos = lineIdx * 6;
          lArr[lPos] = pArr[i * 3];
          lArr[lPos + 1] = pArr[i * 3 + 1];
          lArr[lPos + 2] = pArr[i * 3 + 2];
          lArr[lPos + 3] = pArr[j * 3];
          lArr[lPos + 4] = pArr[j * 3 + 1];
          lArr[lPos + 5] = pArr[j * 3 + 2];
          lineIdx++;
        }
      }
    }

    for (let k = lineIdx * 6; k < MAX_CONNECTIONS * 6; k++) {
      lArr[k] = 0;
    }
    lAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeo} material={pointMat} />
      <lineSegments ref={linesRef} geometry={linesGeo} material={lineMat} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   C.  CRYSTAL CLUSTER (Works: scroll 0.48 → 0.72)
═══════════════════════════════════════════════════════════════════════ */
function CrystalCluster({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const groupRef = useRef<THREE.Group>(null);

  const crystalData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      return {
        angle,
        radius: 2.8 + Math.random() * 0.8,
        y: (Math.random() - 0.5) * 1.5 + 0.5,
        size: 0.28 + Math.random() * 0.2,
        speed: 0.2 + Math.random() * 0.3,
        rotSpeed: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
        ] as [number, number, number],
        geometryType: i % 3 === 0 ? "icosahedron" : i % 3 === 1 ? "octahedron" : "tetrahedron",
      };
    });
  }, []);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.18,
        metalness: 0.35,
        transmission: 0.85,
        thickness: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = stateRef.current.scrollProgress;
    const { colorA, colorB } = stateRef.current;
    const t = state.clock.getElapsedTime();

    // Scale/opacity gating for Works (0.48 -> 0.72)
    let opacity = 0;
    if (scroll > 0.44 && scroll <= 0.76) {
      const fadeIn = Math.min(1, (scroll - 0.44) / 0.08);
      const fadeOut = scroll > 0.68 ? Math.max(0, 1 - (scroll - 0.68) / 0.08) : 1;
      opacity = fadeIn * fadeOut;
    }

    glassMat.color.copy(colorA).lerp(colorB, 0.4);
    glassMat.emissive.copy(colorB);
    glassMat.emissiveIntensity = opacity * 0.45;
    glassMat.opacity = opacity * 0.75;

    crystalData.forEach((data, idx) => {
      const mesh = groupRef.current!.children[idx] as THREE.Mesh;
      if (!mesh) return;

      mesh.scale.setScalar(opacity * data.size);

      const curAngle = data.angle + t * data.speed * 0.35;
      mesh.position.set(
        Math.cos(curAngle) * data.radius,
        data.y + Math.sin(t * 0.8 + idx) * 0.12,
        Math.sin(curAngle) * data.radius - 2.5
      );

      mesh.rotation.x += data.rotSpeed[0] * 0.016;
      mesh.rotation.y += data.rotSpeed[1] * 0.016;
      mesh.rotation.z += data.rotSpeed[2] * 0.016;
    });

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      stateRef.current.mouseX * 0.3,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {crystalData.map((data, i) => (
        <mesh key={i} material={glassMat}>
          {data.geometryType === "icosahedron" ? (
            <icosahedronGeometry args={[1, 0]} />
          ) : data.geometryType === "octahedron" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <tetrahedronGeometry args={[1, 0]} />
          )}
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   D.  CONCENTRIC HOLOGRAM  (Maintenance: scroll 0.72 → 0.85)
═══════════════════════════════════════════════════════════════════════ */
function ConcentricHologram({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const ringData = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      r: 1.1 + i * 0.55,
      tube: 0.012 + i * 0.003,
      tiltX: (Math.random() - 0.5) * Math.PI * 0.35,
      tiltZ: (Math.random() - 0.5) * Math.PI * 0.35,
      speed: (0.3 + i * 0.15) * (i % 2 === 0 ? 1 : -1),
    }));
  }, []);

  const ringMats = useMemo(
    () =>
      ringData.map(() =>
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        })
      ),
    [ringData]
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const satelliteData = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      radius: 1.2 + Math.random() * 1.8,
      speed: 0.6 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      size: 0.04 + Math.random() * 0.06,
      tilt: (Math.random() - 0.5) * 0.8,
      isA: i % 2 === 0,
    }));
  }, []);

  const satellitesRef = useRef<THREE.Points>(null);
  const satellitesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(15 * 3), 3));
    return g;
  }, []);

  const satellitesMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = stateRef.current.scrollProgress;
    const { colorA, colorB } = stateRef.current;
    const t = state.clock.getElapsedTime();

    // Scale/opacity gating for Maintenance (0.72 -> 0.85)
    let opacity = 0;
    if (scroll > 0.68 && scroll <= 0.88) {
      const fadeIn = Math.min(1, (scroll - 0.68) / 0.06);
      const fadeOut = scroll > 0.80 ? Math.max(0, 1 - (scroll - 0.80) / 0.08) : 1;
      opacity = fadeIn * fadeOut;
    }

    coreMat.color.copy(colorA);
    coreMat.opacity = opacity * (0.35 + Math.sin(t * 3.5) * 0.08);
    if (coreRef.current) {
      coreRef.current.scale.setScalar(opacity * (0.35 + Math.sin(t * 3.5) * 0.03));
    }

    ringData.forEach((ring, i) => {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      if (!mesh) return;

      ringMats[i].color.copy(ring.speed > 0 ? colorA : colorB);
      ringMats[i].opacity = opacity * 0.8;

      mesh.rotation.x = ring.tiltX + t * ring.speed * 0.4;
      mesh.rotation.z = ring.tiltZ + t * ring.speed * 0.25;
      mesh.rotation.y += 0.003 * Math.abs(ring.speed);
      mesh.scale.setScalar(opacity * (1.0 + Math.sin(t * 1.2 + i) * 0.03));
    });

    satellitesMat.color.copy(colorB);
    satellitesMat.opacity = opacity * 0.9;

    const sArr = satellitesGeo.attributes.position.array as Float32Array;
    satelliteData.forEach((sat, i) => {
      const angle = sat.phase + t * sat.speed;
      const x = Math.cos(angle) * sat.radius;
      const z = Math.sin(angle) * sat.radius;
      const y = Math.sin(angle * 2) * sat.tilt;

      const idx = i * 3;
      sArr[idx] = x;
      sArr[idx + 1] = y;
      sArr[idx + 2] = z - 2.5;
    });
    satellitesGeo.attributes.position.needsUpdate = true;

    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.z = t * 0.04;
  });

  return (
    <group ref={groupRef}>
      {ringData.map((ring, i) => (
        <mesh key={i} material={ringMats[i]}>
          <torusGeometry args={[ring.r, ring.tube, 8, 80]} />
        </mesh>
      ))}
      <mesh ref={coreRef} material={coreMat}>
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>
      <points ref={satellitesRef} geometry={satellitesGeo} material={satellitesMat} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   E.  WIREFRAME LANDSCAPE  (Contact: scroll 0.85 → 1.00)
═══════════════════════════════════════════════════════════════════════ */
function WireframeLandscape({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  const COLS = 45, ROWS = 45;

  const initPositions = useMemo(() => {
    const width = 26;
    const depth = 20;
    const pos = new Float32Array((COLS + 1) * (ROWS + 1) * 3);

    let i = 0;
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        pos[i]     = (c / COLS - 0.5) * width;
        pos[i + 1] = -1.5;
        pos[i + 2] = -(r / ROWS) * depth;
        i += 3;
      }
    }
    return pos;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    const scroll = stateRef.current.scrollProgress;
    const { colorA, colorB } = stateRef.current;
    const t = state.clock.getElapsedTime();

    let opacity = 0;
    if (scroll > 0.80) {
      opacity = Math.min(1, (scroll - 0.80) / 0.12);
    }

    mat.color.copy(colorA).lerp(colorB, 0.45);
    mat.opacity = opacity * 0.28;

    if (!geomRef.current) return;

    const posAttr = geomRef.current.attributes.position;
    const pArr = posAttr.array as Float32Array;

    let i = 0;
    const amp = 1.35;
    const spd = t * 0.25;

    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        const x = pArr[i];
        const z = pArr[i + 2];

        const wave1 = Math.sin(x * 0.22 + spd) * Math.cos(z * 0.25 + spd * 0.7);
        const wave2 = Math.cos(x * 0.12 - spd * 0.3) * Math.sin(z * 0.15 + spd * 0.5) * 0.5;

        const distanceToCenter = Math.abs(x) / 13.0;
        const sideRise = Math.pow(distanceToCenter, 1.8) * 1.5;
        const backRise = (Math.abs(z) / 20.0) * 1.0;

        pArr[i + 1] = -1.4 + (wave1 + wave2) * amp * (0.2 + sideRise) + sideRise + backRise;
        i += 3;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <mesh rotation={[-Math.PI / 12, 0, 0]}>
      <planeGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[initPositions, 3]} />
      </planeGeometry>
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   F.  DYNAMIC SCENE LIGHTING  – point lights track palette colors
═══════════════════════════════════════════════════════════════════════ */
function SceneLighting({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const lightARef = useRef<THREE.PointLight>(null);
  const lightBRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightARef.current || !lightBRef.current) return;
    lightARef.current.color.copy(stateRef.current.colorA);
    lightBRef.current.color.copy(stateRef.current.colorB);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 2]} intensity={1.5} color="#ffffff" />
      <pointLight ref={lightARef} position={[-4, 1, -2]} intensity={5.0} />
      <pointLight ref={lightBRef} position={[ 4, 1, -2]} intensity={5.0} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   G.  CAMERA CONTROLLER  – mouse parallax + scroll-driven push-back
═══════════════════════════════════════════════════════════════════════ */
function CameraController({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = stateRef.current.scrollProgress;

    stateRef.current.mouseX = THREE.MathUtils.lerp(
      stateRef.current.mouseX, stateRef.current.targetMouseX, 0.06
    );
    stateRef.current.mouseY = THREE.MathUtils.lerp(
      stateRef.current.mouseY, stateRef.current.targetMouseY, 0.06
    );

    const targetCamY = 2.2 - scroll * 1.8;
    const targetCamZ = 6.0 - scroll * 0.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, stateRef.current.mouseX * 1.15, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY + stateRef.current.mouseY * 0.75, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);
    camera.lookAt(0, 0.3 - scroll * 0.2, -1.8);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════ */
export default function ThreeCanvas() {
  const pathname    = usePathname();
  const pathnameRef = useRef(pathname);
  const bgRef       = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef<AnimState>({
    scrollProgress: 0,
    mouseX:         0,
    mouseY:         0,
    targetMouseX:   0,
    targetMouseY:   0,
    colorA:         new THREE.Color("#ff2d9b"),
    colorB:         new THREE.Color("#7c3aed"),
  });

  const getTargetScrollProgress = (path: string, rawScroll: number) => {
    switch (path) {
      case "/about":      return 0.12 + rawScroll * 0.08;
      case "/services":
      case "/web-design": return 0.30 + rawScroll * 0.12;
      case "/ecommerce":
      case "/seo":
      case "/portfolio":  return 0.52 + rawScroll * 0.12;
      case "/maintenance":return 0.72 + rawScroll * 0.12;
      case "/contact":    return 0.86 + rawScroll * 0.14;
      default:            return rawScroll;          // Home: full 0→1
    }
  };

  // Sync scroll position on route change
  useEffect(() => {
    pathnameRef.current = pathname;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    stateRef.current.scrollProgress = getTargetScrollProgress(pathname, raw);
  }, [pathname]);

  // Attach mouse + scroll listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      stateRef.current.targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      stateRef.current.scrollProgress = getTargetScrollProgress(pathnameRef.current, raw);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll",    onScroll);
    onScroll(); // initial read

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        /* Initial gradient – overwritten per-frame by PaletteUpdater */
        background:    "radial-gradient(ellipse at center, #1a0520 0%, #0a001a 68%, #020202 100%)",
        overflow:      "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 2.2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        {/* Updates stateRef colors + CSS bg each frame */}
        <PaletteUpdater stateRef={stateRef} bgRef={bgRef} />

        {/* Lights driven by live palette */}
        <SceneLighting stateRef={stateRef} />

        {/* Scene objects */}
        <GlassOrbs            stateRef={stateRef} />
        <ConstellationNetwork stateRef={stateRef} />
        <CrystalCluster       stateRef={stateRef} />
        <ConcentricHologram   stateRef={stateRef} />
        <WireframeLandscape   stateRef={stateRef} />

        <CameraController stateRef={stateRef} />
      </Canvas>
    </div>
  );
}
