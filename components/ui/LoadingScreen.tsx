import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_TEXTS = [
  "IGNITION SEQUENCE",
  "CHECKING OIL PRESSURE",
  "CALIBRATING GAUGES",
  "WARMING TIRES",
  "ENGAGING CLUTCH",
  "READY TO LAUNCH"
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Progress Timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Randomize speed for "organic" load feel
        const jump = Math.random() > 0.8 ? 15 : 2;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    // Text Cycler
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay at 100% before unmounting
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* 1. Background Grid / Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      
      {/* 2. Central Car Visualization */}
      <div className="relative w-[300px] md:w-[500px] h-[150px] md:h-[200px] flex items-center justify-center">
        
        {/* Speed Lines (Wind Tunnel Effect) */}
        <div className="absolute inset-0 overflow-hidden">
             {[...Array(5)].map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute h-[1px] bg-white/10"
                   style={{ 
                       top: `${20 + i * 15}%`, 
                       left: -100, 
                       width: 100 
                   }}
                   animate={{ 
                       x: ["0vw", "100vw"],
                       opacity: [0, 1, 0]
                   }}
                   transition={{ 
                       duration: 1 + Math.random(), 
                       repeat: Infinity, 
                       ease: "linear",
                       delay: Math.random() * 2 
                   }}
                />
             ))}
        </div>

        <svg viewBox="0 0 500 180" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
           {/* Abstract Sports Car Silhouette */}
           <motion.path
             d="M40,130 L70,130 M100,130 L220,130 M250,130 L460,130 
                M40,130 C40,110 50,100 70,90 L130,70 C160,55 220,55 250,70 L380,85 C420,90 460,110 460,130"
             fill="none"
             stroke="white"
             strokeWidth="2"
             strokeLinecap="round"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 1 }}
             transition={{ duration: 2, ease: "easeInOut" }}
           />
           
           {/* Wheels */}
           <motion.circle 
              cx="85" cy="130" r="18" 
              stroke="white" strokeWidth="2" fill="none" strokeDasharray="5 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
           />
           <motion.circle 
              cx="415" cy="130" r="18" 
              stroke="white" strokeWidth="2" fill="none" strokeDasharray="5 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
           />

           {/* Aerodynamic Flow Lines (Top) */}
           <motion.path
             d="M20,100 L100,60 L250,50 L480,90"
             fill="none"
             stroke="white"
             strokeWidth="1"
             strokeOpacity="0.3"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
           />
        </svg>
      </div>

      {/* 3. Tech Data & Progress */}
      <div className="absolute bottom-12 md:bottom-20 w-full px-12 flex flex-col items-center">
         
         <div className="flex justify-between items-end w-full max-w-md mb-2">
            <motion.span 
               key={textIndex}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 font-mono"
            >
               {LOADING_TEXTS[textIndex]}...
            </motion.span>
            <span className="text-4xl font-bold text-white font-mono tracking-tighter">
               {progress}<span className="text-sm align-top opacity-50">%</span>
            </span>
         </div>

         {/* Progress Bar */}
         <div className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 bottom-0 bg-white"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ ease: "linear" }}
            />
         </div>

         <div className="mt-8 flex gap-4 opacity-30">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75" />
             <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-150" />
         </div>
      </div>

    </motion.div>
  );
};