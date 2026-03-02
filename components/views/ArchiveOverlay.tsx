import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ArchiveOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVolume: (id: number) => void;
}

export const ArchiveOverlay: React.FC<ArchiveOverlayProps> = ({ isOpen, onClose, onSelectVolume }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-premium-black overflow-y-auto pt-28 pb-20 px-6 md:px-12"
        >
          {/* Subtle Close Button for convenience, though Nav exists */}
          <button 
            onClick={onClose}
            className="fixed top-24 right-6 md:right-12 z-50 text-white/20 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>

          <div className="container mx-auto min-h-[80vh]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-white/10 pb-8"
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-4">The Archive</h2>
                <p className="text-white/50 font-serif italic text-xl">A growing library of collectible volumes.</p>
              </div>
              <div className="text-white/40 text-sm font-sans uppercase tracking-widest">
                Full Collection
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (i * 0.1) }}
                  onClick={() => onSelectVolume(i)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 mb-4 border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:bg-transparent transition-colors z-10" />
                    <span className="text-white/10 font-serif text-6xl group-hover:text-white/20 transition-colors">{i}</span>
                    
                    {i === 1 && (
                      <div className="absolute top-4 left-4 bg-white/90 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-20">
                        Current Issue
                      </div>
                    )}
                    {i > 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-20">
                        <span className="text-white/50 font-serif italic text-lg">{i > 3 ? 'Vaulted' : 'Coming Soon'}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-serif text-2xl group-hover:text-white/80 transition-colors">Volume 0{i}</h3>
                  <p className="text-white/40 text-sm font-sans mt-1">
                    {i === 1 ? 'The Origin Story' : (i > 3 ? 'Out of Print' : 'In Production')}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center border-t border-white/5 pt-12"
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
                Missing a volume from your collection?
              </p>
              <Button variant="text" className="text-white">Inquire about Availability <ArrowRight size={14} className="ml-2 inline" /></Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};