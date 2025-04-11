"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text }: { text: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });;

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - rect.left) / rect.width) * 100;
      const cy = ((cursor.y - rect.top) / rect.height) * 100;
      setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
      setGradientPosition({ x: cx - 50, y: cy - 50 });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none w-full h-full"
    >
      <defs>
        <motion.linearGradient
          id="textGradient"
          gradientUnits="objectBoundingBox"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          animate={{
            gradientTransform: `translate(${gradientPosition.x}, ${gradientPosition.y})`,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <stop offset="0%" stopColor="black" />
          <stop offset="100%" stopColor="black" />
        </motion.linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="50%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ type: "spring", stiffness: 100, damping: 100 }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="url(#textGradient)"
        mask="url(#textMask)"
        className="font-lexend tracking-wider text-4xl font-bold opacity-80"
      >
        {text}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="transparent"
        stroke="black"
        strokeWidth=".15"
        className="tracking-tighter text-2xl font-bold font-[helvetica]"
      >
        {text}
      </text>
    </svg>
  );
};