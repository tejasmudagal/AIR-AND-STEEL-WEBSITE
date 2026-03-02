import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface PhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhilosophyModal: React.FC<PhilosophyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans p-4 md:p-6">
          {/* Blurred Background Overlay with lowered exposure */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-xl cursor-default"
          />

          {/* Content Container with Spacing from edges */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden h-auto max-h-[85vh] md:max-h-[90vh] rounded-2xl flex flex-col transition-colors duration-500"
          >
            {/* Header / Close Button */}
            <div className="absolute top-0 right-0 p-4 md:p-6 z-20">
              <button 
                onClick={onClose}
                className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors bg-white/20 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-black/40 rounded-full p-2 backdrop-blur-md"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto custom-scrollbar p-6 md:p-16">
              <motion.div 
                className="max-w-none"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={itemVariants} className="block text-xs font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-10">
                  The Manifesto
                </motion.span>

                <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl font-bold text-black dark:text-white mb-8 leading-[1.1] tracking-tighter">
                  The road unwinds, the story unfolds.
                </motion.h2>
                
                <motion.p variants={itemVariants} className="text-lg md:text-2xl text-black/90 dark:text-white/90 font-medium mb-8 tracking-wide leading-relaxed">
                  At Air & Steel, we celebrate your fine taste in motoring.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-8 text-base md:text-xl text-black/70 dark:text-white/70 leading-relaxed font-normal mb-12 border-b border-black/10 dark:border-white/10 pb-12">
                   <p>
                     We do not chase the twenty-four hour news cycle. We are not interested in spy shots, rumors, or the fleeting viral moment. We are archivists of the internal combustion engine, curators of the curve, and guardians of the analog experience.
                   </p>
                   <p>
                     Air & Steel was born from a fatigue with the ephemeral. In a world of infinite scrolling, we offer a place to stop. We believe that a magazine should be an object of permanence, possessing the same weight and engineering integrity as the machines we document.
                   </p>
                   <p>
                     Our mission is to capture the soul of driving. The silence of an early morning garage, the heat radiating from a hood after a canyon run, the smell of old leather and unburnt fuel. These are moments that cannot be summarized in a caption. They require depth. They require time.
                   </p>
                   <p>
                     Whether it is the heavy grain of our 120gsm matte stock or the absolute black of our digital editions, every pixel and every drop of ink is placed with intention.
                   </p>
                </motion.div>

                <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 tracking-tight">
                  In an age of noise, we choose silence.
                </motion.h3>
                
                <motion.div variants={itemVariants} className="space-y-6 text-black/80 dark:text-white/80 text-base md:text-lg leading-relaxed font-normal">
                  <p>
                    This is not about specifications, horsepower figures, or 0-60 times. It is about the human connection to the machine. It is about the stories etched into steel and the memories forged on the open road.
                  </p>
                  <p className="font-medium text-black dark:text-white">
                    We don't just observe the culture. We preserve it.
                  </p>
                  <div className="pt-8 mt-8 border-t border-black/10 dark:border-white/10">
                    <p className="font-bold text-xs uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
                      Welcome to the culture.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};