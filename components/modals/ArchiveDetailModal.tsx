import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ArchiveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  volumeId: number | null;
  imageSrc: string; // Kept for prop compatibility but unused
  onPurchase?: () => void;
}

export const ArchiveDetailModal: React.FC<ArchiveDetailModalProps> = ({ isOpen, onClose, volumeId, imageSrc, onPurchase }) => {
  const [isNotified, setIsNotified] = useState(false);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsNotified(false); // Reset state when opening
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNotify = () => {
    setIsNotified(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans p-4 md:p-6">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
             onClick={onClose}
             className="absolute inset-0 bg-white/60 dark:bg-black/90 backdrop-blur-xl"
           />
           
           {/* Card with spacing from edges */}
           <motion.div
             initial={{ opacity: 0, scale: 0.96 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.96 }}
             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
             className="relative w-full max-w-5xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[85vh] md:max-h-[90vh] transition-colors duration-500"
           >
              {/* Image Side - Increased height for mobile */}
              <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden bg-gray-200 dark:bg-zinc-900 shrink-0">
                <motion.div 
                  layoutId={`archive-img-${volumeId}`}
                  className="w-full h-full bg-zinc-900" 
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/50 dark:from-black/80 dark:md:to-black/50" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                     <span className="text-black/60 dark:text-white/60 font-bold uppercase tracking-[0.2em] text-sm">The Collection</span>
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative bg-white dark:bg-[#0a0a0a] overflow-y-auto transition-colors duration-500">
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors z-20"
                 >
                    <X size={24} />
                 </button>

                 <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 >
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6 block">
                        Archive View
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-black dark:text-white mb-2 tracking-tighter">
                        Volume 0{volumeId}
                    </h2>
                    <p className="text-lg md:text-xl text-black/70 dark:text-white/70 font-medium mb-8 md:mb-10 tracking-wide">
                        {volumeId === 1 ? "The Origin Story." : "In Production."}
                    </p>
                    <div className="w-12 h-[2px] bg-black/20 dark:bg-white/20 mb-8 md:mb-10" />
                    <p className="text-black/60 dark:text-white/60 text-sm leading-[1.8] font-normal tracking-wide mb-10 md:mb-12">
                        {volumeId === 1 
                        ? "The inaugural issue establishing our philosophy. Featuring the lost roads of the Alps, an interview with the last analog watchmaker of Geneva, and a 40-page spread on the Porsche 911 heritage. A definition of what Air & Steel stands for." 
                        : "This volume is currently being crafted. Our editors are curating stories from the Pacific Coast Highway to the neon streets of Tokyo. Expect deep dives into car culture that time forgot."}
                    </p>

                    <div className="mt-auto">
                        {volumeId === 1 ? (
                            <Button className="w-full md:w-auto" onClick={onPurchase}>Purchase Digital Copy</Button>
                        ) : (
                            <Button 
                                variant="outline" 
                                className="w-full md:w-auto" 
                                onClick={handleNotify}
                                disabled={isNotified}
                            >
                                {isNotified ? <span className="flex items-center gap-2"><Check size={16} /> You're on the list</span> : "Notify Upon Release"}
                            </Button>
                        )}
                    </div>
                 </motion.div>
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};