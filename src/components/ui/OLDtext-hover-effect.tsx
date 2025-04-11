"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Helper function to generate a random hex color.
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [gradientPosition, setGradientPosition] = useState({ x: "0%", y: "0%" });
  const [gradientStops, setGradientStops] = useState<
    { offset: string; color: string }[]
  >([]);

  // Update the radial mask position immediately as the mouse moves.
  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

    // Update the gradient’s position and random stops on every mouse move (no delay)
  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const xPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const yPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

      // Update the gradient transformation with a slight offset.
      setGradientPosition({
        x: `${xPercentage - 50}%`,
        y: `${yPercentage - 50}%`,
      });

      // Generate new random gradient stops on every mouse move.
      const stops = [
        { offset: "0%", color: "black" },
        { offset: "25%", color: "black" },
        { offset: "50%", color: "black" },
        { offset: "75%", color: "black" },
        { offset: "100%", color: "black" },
      ];
      setGradientStops(stops);
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none w-full h-full"
    >
      <defs>
        {/* Linear gradient follows the mouse with a delay and features dynamic random colors */}
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
          {gradientStops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </motion.linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="100%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ type: "spring", stiffness: 80, damping: 100 }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Base text layer with Tailwind text-shadow and Lexend font */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-lexend text-7xl font-bold fill-current text-white"
      >
        {text}
      </text>

      {/* Gradient overlay on hover */}
        <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="url(#textGradient)"
        mask="url(#textMask)"
        className="font-lexend text-7xl font-bold text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]"
      >
        {text}
      </text>
    </svg>
  );
};
