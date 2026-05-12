"use client";

import dynamic from "next/dynamic";
import CustomCursor from "./CustomCursor";

const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), { ssr: false });

export default function ClientCanvasWrapper() {
  return (
    <>
      <ThreeCanvas />
      <CustomCursor />
    </>
  );
}
