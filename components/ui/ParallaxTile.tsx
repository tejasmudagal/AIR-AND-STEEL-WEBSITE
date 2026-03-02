import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxTileProps {
  src: string;
  alt: string;
  className?: string;
  yOffset?: number; // How much it moves vertically relative to scroll
  delay?: number;
}

export const ParallaxTile: React.FC<ParallaxTileProps> = ({ 
  src, 
  alt, 
  className = "", 
  yOffset = 50,
  delay = 0 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity, scale }}
      className={`absolute z-10 shadow-2xl ${className}`}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-sm w-full h-full bg-stone-900 border border-white/10">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700 hover:scale-110 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};