import type { CSSProperties } from "react";

interface CountUpProps {
  value: number;
}

export function CountUp({ value }: CountUpProps) {
  return (
    <>
      <span className="sr-only">{value}</span>
      <span
        aria-hidden="true"
        className="count-up"
        style={{ "--target": value } as CSSProperties}
      />
    </>
  );
}
