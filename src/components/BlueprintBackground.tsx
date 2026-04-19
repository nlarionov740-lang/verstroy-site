"use client";

import { motion } from "framer-motion";

export default function BlueprintBackground() {
  return (
    <>
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* SVG blueprint — правая часть */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <motion.path
            d="M80,240 L80,120 L200,80 L320,120 L320,240 Z
               M140,240 L140,180 L180,180 L180,240
               M220,160 L260,160 L260,200 L220,200 Z
               M100,140 L100,100 L300,100"
            stroke="rgba(212,168,67,0.35)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              times: [0, 0.4, 0.85, 1],
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
          {/* Размерные линии */}
          <motion.path
            d="M60,120 L60,240 M55,120 L65,120 M55,240 L65,240
               M80,260 L320,260 M80,255 L80,265 M320,255 L320,265"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 6,
              times: [0, 0.5, 0.85, 1],
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </>
  );
}
