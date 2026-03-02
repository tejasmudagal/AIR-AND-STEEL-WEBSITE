import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Total duration: 1.5s in + 1.5s wait + 0.5s text out + 0.8s screen out
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center cursor-none"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
        transition={{ 
          duration: 1.5, 
          ease: [0.22, 1, 0.36, 1], // Custom luxury ease
          exit: { duration: 0.8 } 
        }}
        className="text-center"
      >
        <h1 className="text-sm md:text-base font-bold text-white tracking-normal uppercase">
          Air & Steel
        </h1>
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            className="h-[1px] bg-white/20 mt-3 mx-auto"
        />
      </motion.div>
    </motion.div>
  );
};