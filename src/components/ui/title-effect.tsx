import React, { useRef, useEffect } from "react";

export const TitleEffect = ({ text }: { text: string }) => {
  const noiseRef = useRef<SVGFETurbulenceElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const lastSeedRef = useRef<number | null>(null);
  const lastBfRef = useRef<string | null>(null);

  useEffect(() => {
    const seedInterval = 60;
    const loop = (now: number) => {
      if (noiseRef.current && now - lastUpdateRef.current > seedInterval) {
        lastUpdateRef.current = now;
        const seed = Math.floor(Math.random() * 999) + 1;
        if (lastSeedRef.current !== seed) {
          noiseRef.current.setAttribute("seed", String(seed));
          lastSeedRef.current = seed;
        }
        const bf = (3.5 + (Math.random() - 0.5) * 0.18).toFixed(3);
        if (lastBfRef.current !== bf) {
          noiseRef.current.setAttribute("baseFrequency", bf);
          lastBfRef.current = bf;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none w-full h-full"
    >
      <defs>
        <filter id="grainFilter" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feTurbulence
            ref={noiseRef}
            type="fractalNoise"
            baseFrequency="3.5"
            numOctaves="1"
            seed="1"
            result="noise"
          />
          <feComponentTransfer in="noise" result="sharpGrain">
            <feFuncA type="linear" slope="10" intercept="-4.5" />
          </feComponentTransfer>
          <feOffset in="sharpGrain" dx="0" dy="0" result="offsetNoise" />
          <feColorMatrix
            in="offsetNoise"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.33 0"
            result="visibleGrain"
          />
        </filter>
        <clipPath id="textClip">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="tracking-tighter text-2xl font-bold font-[helvetica]"
          >
            {text}
          </text>
        </clipPath>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#333"
        filter="url(#grainFilter)"
        clipPath="url(#textClip)"
      />
    </svg>
  );
};
