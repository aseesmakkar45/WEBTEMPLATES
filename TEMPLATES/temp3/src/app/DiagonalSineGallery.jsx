"use client";

import { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Sparkles, Eye } from 'lucide-react';
import './DiagonalSineGallery.css';

// Generates a sine-wave SVG path string
function generateSineWavePath(cx, cy, width, amplitude, waves) {
  const pts = [];
  const segs = 120; // High resolution for smooth rendering
  const startX = cx - width / 2;
  
  for (let i = 0; i <= segs; i++) {
    const pct = i / segs;
    const x = startX + pct * width;
    const y = cy + Math.sin(pct * waves * 2 * Math.PI) * amplitude;
    pts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return pts.join(' ');
}

function DiagonalSineItem({ item, index, totalItems, path, itemSize, rotation, progress, scrollSensitivity }) {
  // Distribute items evenly along the path
  const itemOffset = (index / totalItems) * 100;

  // Track the raw offset percentage (0 to 100)
  const offsetDistanceVal = useTransform(progress, (p) => {
    // Keeps value cycling between 0 and 100
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return offset;
  });

  // Convert raw value to CSS percentage
  const offsetDistance = useTransform(offsetDistanceVal, (v) => `${v}%`);

  // Fade out cards as they approach the start (0%) or end (100%) of the path to avoid harsh snapping
  const opacity = useTransform(
    offsetDistanceVal,
    [0, 8, 18, 82, 92, 100],
    [0, 0.4, 1, 1, 0.4, 0]
  );

  // Apply a 3D depth effect by scaling up in the center and down at the edges
  const scale = useTransform(
    offsetDistanceVal,
    [0, 50, 100],
    [0.85, 1.15, 0.85]
  );

  // Sequential stacking z-index: cards further along the path are layered on top of previous cards
  const zIndex = useTransform(
    offsetDistanceVal,
    [0, 100],
    [10, 150]
  );

  // Map progress value to active blur values for depth of field
  const filter = useTransform(
    offsetDistanceVal,
    [0, 15, 35, 65, 85, 100],
    [
      'blur(5px) brightness(0.6)',
      'blur(2px) brightness(0.8)',
      'blur(0px) brightness(1)',
      'blur(0px) brightness(1)',
      'blur(2px) brightness(0.8)',
      'blur(5px) brightness(0.6)'
    ]
  );

  return (
    <motion.div
      className="sine-item"
      style={{
        width: itemSize,
        height: itemSize * 1.35, // Premium portrait aspect ratio
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
        opacity,
        scale,
        zIndex,
        filter,
      }}
    >
      <div 
        className="sine-item-rotation-compensator"
        style={{ 
          transform: `rotate(${-rotation}deg)`, 
          width: '100%', 
          height: '100%' 
        }}
      >
        <div className="card-box group">
          <div className="card-image-wrapper">
            <img src={item.src} alt={item.title} className="card-img" draggable={false} />
            <div className="card-glow-overlay" />
          </div>
          
          <div className="card-content">
            <span className="card-tag">
              <Sparkles className="w-2.5 h-2.5 inline mr-1 text-purple-400" />
              {item.tag}
            </span>
            <h4 className="card-title">{item.title}</h4>
            <p className="card-desc">{item.desc}</p>
          </div>
          
          <div className="card-hover-border" />
        </div>
      </div>
    </motion.div>
  );
}

export default function DiagonalSineGallery({
  images = [],
  amplitude = 120,
  frequency = 2,
  rotation = 45,
  itemSize = 180,
  showPath = true,
  pathColor = 'rgba(168, 85, 247, 0.25)',
  pathWidth = 1.5,
  autoplay = false,
  autoplaySpeed = 25,
  scrollSensitivity = 1,
  progress,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const baseWidth = 1600; // Large virtual design space
  
  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  // Generate sine path
  const path = useMemo(() => {
    // Generate a horizontal sine wave centered in our design space
    // and spanning beyond the boundaries so items can enter/exit off-screen
    return generateSineWavePath(designCenterX, designCenterY, baseWidth + 400, amplitude, frequency);
  }, [amplitude, frequency, designCenterX, designCenterY, baseWidth]);

  // Handle responsive scaling of the SVG coordinate space
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [baseWidth]);



  // Autoplay animation
  useEffect(() => {
    if (!autoplay) return;
    
    const controls = animate(progress, 100, {
      duration: autoplaySpeed,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    
    return () => controls.stop();
  }, [progress, autoplay, autoplaySpeed]);

  return (
    <div
      ref={containerRef}
      className="sine-gallery-container"
      aria-hidden="true"
    >
      <div
        className="sine-scaling-container"
        style={{
          width: baseWidth,
          height: baseWidth,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div
          className="sine-rotation-wrapper"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${baseWidth} ${baseWidth}`}
              className="sine-path-svg"
            >
              <path 
                d={path} 
                fill="none" 
                stroke={pathColor} 
                strokeWidth={pathWidth / scale} 
                strokeDasharray="6,6"
              />
            </svg>
          )}

          {images.map((img, index) => (
            <DiagonalSineItem
              key={index}
              item={img}
              index={index}
              totalItems={images.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              scrollSensitivity={scrollSensitivity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
