"use client";

import { useMemo, useRef } from 'react';
import { motion, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import './Carousel3D.css';

function Carousel3DItem({ item, index, total, progress, radius, tilt, itemSize }) {
  // Translate progress in degrees to radians and offset by item index
  const angle = useTransform(progress, (p) => {
    const rad = (p * Math.PI) / 180;
    return ((index / total) * 2 * Math.PI) + rad;
  });

  // 3D coordinates based on circle path in X-Z plane, rotated around X-axis by tilt
  const x = useTransform(angle, (a) => radius * Math.sin(a));
  const y = useTransform(angle, (a) => -radius * Math.cos(a) * Math.sin((tilt * Math.PI) / 180));
  const z = useTransform(angle, (a) => radius * Math.cos(a) * Math.cos((tilt * Math.PI) / 180));

  // Compute maximum depth boundary for linear scaling mappings
  const maxDepth = useMemo(() => {
    return Math.max(1, radius * Math.abs(Math.cos((tilt * Math.PI) / 180)));
  }, [radius, tilt]);

  // Perspective scaling (cards in front look larger, cards in back look smaller)
  const scale = useTransform(z, (depth) => {
    const ratio = depth / maxDepth; // Ranges from -1 (back) to 1 (front)
    return 1 + ratio * 0.28; // Scale from 0.72 to 1.28
  });

  // Stacking z-index: cards in front layer on top of cards in back
  const zIndex = useTransform(z, (depth) => {
    const pct = (depth + maxDepth) / (2 * maxDepth); // Ranges from 0 to 1
    return Math.round(pct * 120) + 10; // zIndex from 10 to 130
  });

  // Opacity fading for background cards
  const opacity = useTransform(z, (depth) => {
    const pct = (depth + maxDepth) / (2 * maxDepth);
    return 0.3 + pct * 0.7; // Opacity from 0.3 to 1.0
  });

  // Camera depth-of-field (blur background cards and dim brightness)
  const filter = useTransform(z, (depth) => {
    const pct = (depth + maxDepth) / (2 * maxDepth); // 0 at back, 1 at front
    const blurAmount = (1 - pct) * 6; // Max 6px blur at the very back
    const brightnessAmount = 0.45 + pct * 0.55; // Brightness from 0.45 to 1.0
    return `blur(${blurAmount.toFixed(1)}px) brightness(${brightnessAmount.toFixed(2)})`;
  });

  return (
    <motion.div
      className="carousel-item-wrapper"
      style={{
        width: itemSize,
        height: itemSize * 1.35, // Portrait grid ratio
        x,
        y,
        scale,
        zIndex,
        opacity,
        filter,
      }}
    >
      <div className="carousel-card group">
        <div className="carousel-card-image-container">
          <img src={item.src} alt={item.title} className="carousel-card-img" draggable={false} />
          <div className="carousel-card-glow-overlay" />
        </div>
        
        <div className="carousel-card-content">
          <span className="carousel-card-tag">
            <Sparkles className="w-2.5 h-2.5 inline mr-1 text-blue-400" />
            {item.tag}
          </span>
          <h4 className="carousel-card-title">{item.title}</h4>
          <p className="carousel-card-desc">{item.desc}</p>
        </div>
        
        <div className="carousel-card-hover-border" />
      </div>
    </motion.div>
  );
}

export default function Carousel3D({
  images = [],
  radius = 360,
  tilt = -20, // Inclination of the 3D ring
  itemSize = 190,
  progress,
}) {
  return (
    <div className="carousel-3d-container">
      {/* 3D Ring Anchor Point */}
      <div className="carousel-3d-ring">
        {images.map((img, index) => (
          <Carousel3DItem
            key={index}
            item={img}
            index={index}
            total={images.length}
            progress={progress}
            radius={radius}
            tilt={tilt}
            itemSize={itemSize}
          />
        ))}
      </div>
    </div>
  );
}
