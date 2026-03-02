import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointerClick } from 'lucide-react';

interface ArchivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  volumeId: number | null;
}

// Preview Items (IDs only, images removed)
const PREVIEW_ITEMS = [1, 2, 3, 4, 5];

export const ArchivePreviewModal: React.FC<ArchivePreviewModalProps> = ({ isOpen, onClose, volumeId }) => {
  const [items, setItems] = useState(PREVIEW_ITEMS);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset items order on open
      setItems(PREVIEW_ITEMS);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const moveToEnd = (fromIndex: number) => {
    if (fromIndex !== 0) return; // Only allow clicking the top card
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = newItems.shift(); // Remove first
      if (item !== undefined) newItems.push(item); // Add to end
      return newItems;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 font-sans">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-sm aspect-[3/4] flex items-center justify-center pointer-events-none"
          >
             {/* Instructional Hint */}
             <div className="absolute -top-16 left-0 right-0 text-center flex flex-col items-center gap-2 animate-pulse">
                <MousePointerClick size={20} className="text-black/40 dark:text-white/40" />
                <span className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    Tap to cycle
                </span>
             </div>

             <button 
                onClick={onClose}
                className="absolute -right-2 -top-14 md:-right-16 md:top-0 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white pointer-events-auto transition-colors bg-white/10 dark:bg-black/10 rounded-full p-2"
             >
                <X size={24} />
             </button>

             {/* Stacked Cards */}
             <div className="relative w-full h-full pointer-events-auto cursor-pointer perspective-1000">
                {items.map((item, index) => {
                  // Only render the top 3 items to save resources, but keep DOM structure simple
                  if (index > 3) return null;

                  return (
                    <motion.div
                      key={item}
                      layoutId={`preview-${item}`}
                      onClick={() => moveToEnd(index)}
                      className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/5"
                      style={{
                        zIndex: items.length - index,
                        cursor: index === 0 ? 'pointer' : 'default'
                      }}
                      animate={{
                        scale: index === 0 ? 1 : 1 - index * 0.05,
                        y: index * 15,
                        rotate: index % 2 === 0 ? index * 2 : index * -2,
                        filter: index === 0 ? "brightness(1) grayscale(0)" : "brightness(0.5) grayscale(100%)",
                        opacity: 1 - index * 0.15
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      whileHover={index === 0 ? { scale: 1.02 } : {}}
                      whileTap={index === 0 ? { scale: 0.98 } : {}}
                    >
                       {/* Replaced image with just the dark bg and overlay */}
                       
                       {/* Overlay Gradient for depth */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                       
                       {/* Card Number Indicator */}
                       <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">
                          Page 0{item}
                       </div>

                       {/* Centered Text for placeholder */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/10 font-bold text-4xl">
                            {item}
                          </span>
                       </div>
                    </motion.div>
                  );
                })}
             </div>
             
             <div className="absolute -bottom-20 left-0 right-0 text-center">
                <span className="text-black dark:text-white text-2xl font-bold tracking-tighter block">
                    Volume 0{volumeId}
                </span>
                <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-[0.2em] mt-2 block">
                    Inside the Issue
                </span>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};