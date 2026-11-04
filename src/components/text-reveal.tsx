"use client";

import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  /** Reveal one word or one character at a time. */
  by?: "words" | "characters";
  /** Opacity of the text that hasn't been revealed yet (0 to 1). */
  dim?: number;
  /** The reveal starts when the paragraph's top edge is this far down the viewport (0 = top, 1 = bottom). */
  start?: number;
  /** The reveal is complete when the paragraph's top edge reaches this point. */
  end?: number;
  className?: string;
}

function splitUnits(text: string, by: "words" | "characters") {
  let index = 0;
  const words = text.split(" ").map((word) => ({
    units: (by === "words" ? [word] : Array.from(word)).map((unit) => ({
      text: unit,
      index: index++,
    })),
  }));
  return { words, total: index };
}

/**
 * Text that brightens word by word (or character by character) as you scroll.
 * JS only measures the scroll position and writes one CSS variable (--p, 0 to 1);
 * the CSS turns that into each unit's opacity (see animation.css).
 */
export function TextReveal({
  text,
  by = "words",
  dim = 0.2,
  start = 0.85,
  end = 0.4,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { words, total } = splitUnits(text, by);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const { top } = node.getBoundingClientRect();
      const raw = (viewport * start - top) / (viewport * (start - end));
      const progress = Math.min(1, Math.max(0, raw));
      if (progress !== last) {
        last = progress;
        node.style.setProperty("--p", String(progress));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [start, end]);

  return (
    <p
      ref={ref}
      className={cn("scroll-reveal", className)}
      style={
        {
          "--dim": dim,
          "--n": total,
          "--w": by === "words" ? 6 : 30, // was 3 : 14
        } as React.CSSProperties
      }
    >
      {/* Screen readers get the sentence once; the visible words are decoration. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ units }, wordIndex) => (
          <Fragment key={wordIndex}>
            <span className="scroll-reveal__word">
              {units.map((unit) => (
                <span
                  key={unit.index}
                  className="scroll-reveal__unit"
                  data-text={unit.text}
                  style={{ "--i": unit.index } as React.CSSProperties}
                />
              ))}
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </p>
  );
}
