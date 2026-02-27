import React, { useRef, useEffect, useState } from "react";

export const Hero = () => {
  const noiseRef = useRef<SVGFETurbulenceElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const [viewBox, setViewBox] = useState("0 0 1000 300");

  useEffect(() => {
    const updateViewBox = () => {
      if (!textRef.current) {
        return;
      }

      const bbox = textRef.current.getBBox();
      const padding = 10;
      setViewBox(
        `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`,
      );
    };

    updateViewBox();

    const fonts = document.fonts;
    fonts?.ready.then(updateViewBox);

    window.addEventListener("resize", updateViewBox);

    let rafId: number;
    let lastUpdate = 0;
    const seedInterval = 60;

    const loop = (now: number) => {
      if (noiseRef.current && now - lastUpdate > seedInterval) {
        lastUpdate = now;
        const seed = Math.floor(Math.random() * 999) + 1;
        const bf = (3.5 + (Math.random() - 0.5) * 0.18).toFixed(3);

        noiseRef.current.setAttribute("seed", String(seed));
        noiseRef.current.setAttribute("baseFrequency", bf);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", updateViewBox);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="select-none w-full max-h-[30vh] block"
      preserveAspectRatio="xMidYMid meet"
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
          <feOffset in="sharpGrain" result="offsetNoise" />
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
            ref={textRef}
            x="0"
            y="0"
            textAnchor="start"
            dominantBaseline="hanging"
            className="tracking-tighter font-bold font-[helvetica] text-[12.5rem]"
          >
            pablo belló
          </text>
        </clipPath>
      </defs>
      <rect
        x="-100%"
        y="-100%"
        width="300%"
        height="300%"
        fill="#333"
        filter="url(#grainFilter)"
        clipPath="url(#textClip)"
      />
    </svg>
  );
};
