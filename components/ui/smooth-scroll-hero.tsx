"use client";
import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

interface SmoothScrollHeroProps {
  desktopImage: string;
  mobileImage: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  desktopImage,
  mobileImage,
  initialClipPercentage = 20,
  finalClipPercentage = 80,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Track while the section travels through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Clip expands as the section enters; fully open once it reaches centre
  const clipStart = useTransform(scrollYProgress, [0, 0.5], [initialClipPercentage, 0]);
  const clipEnd   = useTransform(scrollYProgress, [0, 0.5], [finalClipPercentage, 100]);
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const bgSize    = useTransform(scrollYProgress, [0, 0.5], ["170%", "100%"]);

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Mobile */}
      <motion.div
        className="absolute inset-0 md:hidden bg-black"
        style={{
          clipPath,
          backgroundImage: `url(${mobileImage})`,
          backgroundSize: bgSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Desktop */}
      <motion.div
        className="absolute inset-0 hidden md:block bg-black"
        style={{
          clipPath,
          backgroundImage: `url(${desktopImage})`,
          backgroundSize: bgSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default SmoothScrollHero;
