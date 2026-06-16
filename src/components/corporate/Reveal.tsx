"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
}

/**
 * Scroll-reveal wrapper. Fades + slides children in once when they enter the
 * viewport. Respects prefers-reduced-motion (renders static).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
