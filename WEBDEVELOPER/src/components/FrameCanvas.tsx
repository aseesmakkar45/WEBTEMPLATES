"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIG
────────────────────────────────────────────────────────────────────────────── */
const TOTAL_FRAMES  = 288;
const FPS           = 24;                          // target playback speed
const FRAME_MS      = 1000 / FPS;                  // ~41.67 ms per frame
const BASE_PATH     = "/frames/ezgif-frame-";      // served from public/frames/
const NATIVE_W      = 1920;
const NATIVE_H      = 1080;

/* Zero-pad a number to 3 digits */
const pad3 = (n: number) => String(n).padStart(3, "0");

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────────────────────────────────────── */
export default function FrameCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const frameIdxRef  = useRef(0);
  const lastTimeRef  = useRef(0);
  const rafRef       = useRef<number>(0);
  const loadedRef    = useRef(0);
  const readyRef     = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize canvas to fill its container while preserving 16:9 ── */
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    /* ── Draw a single frame cover-fit onto the canvas ── */
    const drawFrame = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / NATIVE_W, ch / NATIVE_H);
      const drawW = NATIVE_W * scale;
      const drawH = NATIVE_H * scale;
      const ox    = (cw - drawW) / 2;
      const oy    = (ch - drawH) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, ox, oy, drawW, drawH);
    };

    /* ── rAF loop ── */
    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      if (!readyRef.current) return;           // still loading first batch

      const elapsed = now - lastTimeRef.current;
      if (elapsed < FRAME_MS) return;          // not yet time for next frame

      lastTimeRef.current = now - (elapsed % FRAME_MS); // keep timing tight

      const imgs = imagesRef.current;
      const img  = imgs[frameIdxRef.current];
      if (img?.complete) {
        drawFrame(img);
      }
      // advance — seamless loop back to 0
      frameIdxRef.current = (frameIdxRef.current + 1) % TOTAL_FRAMES;
    };

    rafRef.current = requestAnimationFrame(tick);

    /* ── Preload strategy: load first 30 frames eagerly, rest lazily ── */
    const EAGER = Math.min(30, TOTAL_FRAMES);
    let eagerDone = 0;

    const onEagerLoad = () => {
      eagerDone++;
      if (eagerDone >= EAGER) {
        readyRef.current = true;      // playback can start
        lastTimeRef.current = performance.now();
      }
    };

    imagesRef.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src   = `${BASE_PATH}${pad3(i + 1)}.jpg`;
      img.decoding = "async";

      if (i < EAGER) {
        img.onload = onEagerLoad;
        img.onerror = onEagerLoad; // count even on error so we don't stall
      }
      return img;
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      // Release image references so the GC can collect them
      imagesRef.current = [];
      readyRef.current  = false;
      loadedRef.current = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:    "absolute",
        inset:       0,
        width:       "100%",
        height:      "100%",
        display:     "block",
        objectFit:   "cover",
        zIndex:      0,           // background layer — UI sits on top
        pointerEvents: "none",
      }}
    />
  );
}
