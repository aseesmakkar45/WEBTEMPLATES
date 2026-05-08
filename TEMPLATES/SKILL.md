---
name: trajectory-animation-templates
description: >-
  Provides step-by-step instructions and reference templates for creating custom scroll-driven or autoplay card/image animations along mathematical trajectories (ellipses, waves, circles) in Next.js using CSS motion paths and Framer Motion.
---

# Trajectory Animation Templates

- [x] Define new database models in `app.py`
- [x] Add database seeding script for classes, coachings, default syllabus, and practice tests
- [x] Add onboarding routes and view (`/compass/onboarding`)
- [x] Add student dashboard routes and view (`/compass`)
- [x] Add individual chapter detail tracker view (`/compass/chapter/<id>`)
- [x] Add API routes for progress tracking (check/uncheck questions)
- [x] Add CBT test player routes and view (`/compass/cbt/<test_id>`)
- [x] Add CBT submission and scoreboard view (`/compass/cbt/result/<attempt_id>`)
- [x] Create `compass.css` style file for all student-facing layouts
- [x] Build Admin login changes & Dashboard overview page (`/admin/dashboard`)
- [x] Build Admin Student Management roster & details page (`/admin/students`)
- [x] Build Admin Content Management system (`/admin/content`)
- [x] Create `admin_compass.css` style file for the Admin views
- [x] Create validation script `test_compass.py` and run automated checks

## Overview
This skill provides comprehensive instructions on how to build, customize, and maintain creative, interactive layouts where card/image components float along mathematical trajectories (such as orbits, circles, and sine waves). 

The animations use native **CSS Motion Paths** linked either to autoplay timers or viewport scroll gestures (intercepted via mouse wheel and swipe handlers) while locking window vertical movement.

## Dependencies
- **Core Technology**: Next.js 15+ (App Router), React 19+, Tailwind CSS v4, Lucide React
- **Animation Engine**: Framer Motion (`motion/react`)
- **WebGL Extension**: If the user requests rendering templates in WebGL or 3D space, reference the `threejs-helper` skill.

---

## Quick Start (Base Sine Wave Animation)
Below is a minimal React component structure demonstrating a card sliding on a horizontal sine wave:

```jsx
import { useMotionValue, useTransform, motion } from 'motion/react';
import { useEffect } from 'react';

export default function BasicSinePath({ progress }) {
  const path = "M 0 100 Q 150 0, 300 100 T 600 100"; // SVG path syntax
  const offsetDistance = useTransform(progress, (p) => `${p}%`);

  return (
    <div className="relative w-[600px] h-[200px]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d={path} fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,5" />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          background: 'purple',
          offsetPath: `path("${path}")`,
          offsetDistance,
          offsetRotate: '0deg', // Keep card angle locked
        }}
      />
    </div>
  );
}
```

---

## Workflow

### 1. Scaffold the Project Directory
Initialize the Next.js workspace folders with consistent configurations:
- **`package.json`**: Ensure `motion/react` is specified for React 19 compatibility.
- **`globals.css`**: Lock viewport height and hide scrollbars if page vertical movement should be disabled:
  ```css
  html, body {
    height: 100%;
    overflow: hidden;
  }
  ```
- **`postcss.config.mjs`**: Include `@tailwindcss/postcss` plugin for Tailwind CSS v4 compiles.

### 2. Formulate Trajectory Curves
Use these standard equations to generate SVG path coordinates programmatically:
- **Elliptical Orbit**:
  `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`
- **Horizontal Sine Wave**:
  Loop through coordinates to draw lines: `y = cy + Math.sin(x / width * cycles * 2 * Math.PI) * amplitude`. Join points using path drawing commands `M x0 y0 L x1 y1 L x2 y2 ...`
- **Rotated Coordinates**: 
  Instead of rotating coordinate values mathematically inside the generator, wrap the path and items inside a wrapper div and rotate the entire container using CSS: `transform: rotate(rotation deg)`.
- **3D Z-Axis Circular Ring Projection**:
  For circular orbits projected in 3D (X-Z plane) and tilted around the X-axis by angle $\phi$, calculate $x, y, z$ coordinates directly in React using Framer Motion's `useTransform`:
  ```javascript
  const x = useTransform(angle, (a) => radius * Math.sin(a));
  const y = useTransform(angle, (a) => -radius * Math.cos(a) * Math.sin((tilt * Math.PI) / 180));
  const z = useTransform(angle, (a) => radius * Math.cos(a) * Math.cos((tilt * Math.PI) / 180));
  ```
  Map the calculated depth `z` to perspective scale, opacity, blur, and stacking `zIndex` to produce realistic depth of field.


### 3. Handle Stacking & Depth Options
- **Linear Overlaying (Cascading Deck)**: To layer cards sequentially (e.g. rightmost card on top of leftmost), map `zIndex` directly to the `offsetDistance`:
  `const zIndex = useTransform(offsetDistanceVal, [0, 100], [10, 150]);`
- **Boundary Fading**: Prevent cards from clipping harshly at path ends by interpolating opacity near `0%` and `100%`:
  `const opacity = useTransform(offsetDistanceVal, [0, 8, 18, 82, 92, 100], [0, 0.4, 1, 1, 0.4, 0]);`
- **Counter-Rotation**: Keep cards oriented vertically (upright) even when the trajectory angle is tilted: apply `transform: rotate(-rotation deg)` on the child compensator container.

### 4. Wire Gesture Event Listeners
When locking document scrollbars, drive card movement by intercepting wheel and touch swipes:
```javascript
// Mouse Wheel delta listener
useEffect(() => {
  if (autoplay) return;
  const handleWheel = (e) => {
    progress.set(progress.get() + e.deltaY * 0.05 * scrollSensitivity);
  };
  window.addEventListener('wheel', handleWheel, { passive: true });
  return () => window.removeEventListener('wheel', handleWheel);
}, [autoplay, scrollSensitivity, progress]);

// Touch move swipe listener (mobile)
useEffect(() => {
  if (autoplay) return;
  let touchStart = 0;
  const handleStart = (e) => touchStart = e.touches[0].clientY;
  const handleMove = (e) => {
    const deltaY = (touchStart - e.touches[0].clientY) * 0.25 * scrollSensitivity;
    progress.set(progress.get() + deltaY);
    touchStart = e.touches[0].clientY;
  };
  window.addEventListener('touchstart', handleStart, { passive: true });
  window.addEventListener('touchmove', handleMove, { passive: true });
  return () => {
    window.removeEventListener('touchstart', handleStart);
    window.removeEventListener('touchmove', handleMove);
  };
}, [autoplay, scrollSensitivity, progress]);
```

---

## Common Mistakes & Troubleshooting

### Next.js package not found (Turbopack Panic)
- **Problem**: Running `next dev` under Turbopack in some developer workspaces throws a Rust panic pointing to `hmr_version_state` or `Next.js package not found` errors.
- **Solution**: Start the dev server in Webpack mode instead:
  ```powershell
  npx next dev --webpack -p <port>
  ```

### TypeError: useScroll is not a function / useTransform is undefined
- **Problem**: React 19 runtime crash when importing animation hooks.
- **Solution**: Ensure hooks are imported from `'motion/react'` instead of `'motion'` or `'framer-motion'`.

### Sticky elements or scroll locks fail
- **Problem**: Document scrollbars are still visible or the page jitters on trackpads.
- **Solution**: Both `html` AND `body` tags must have `height: 100%; overflow: hidden;` defined in the global stylesheet.
