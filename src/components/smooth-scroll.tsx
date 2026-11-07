"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, allowNestedScroll: true }}>
      {children}
    </ReactLenis>
  );
}
