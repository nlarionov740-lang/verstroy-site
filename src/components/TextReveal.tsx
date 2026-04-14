"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  animate = true,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={animate ? { y: "110%", rotateX: 45 } : false}
            animate={animate ? { y: "0%", rotateX: 0 } : false}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
