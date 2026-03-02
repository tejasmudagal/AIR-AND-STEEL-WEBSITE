import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';

interface ArchivesViewProps {
  onViewVolume: (id: number) => void;
  onPreviewVolume: (id: number) => void;
}

export const ArchivesView: React.FC<ArchivesViewProps> = ({ onViewVolume, onPreviewVolume }) => {
  // Parallax Setup
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerBgY = useTransform(headerProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="pt-20 bg-premium-paper dark:bg-premium-black min-h-screen font-sans transition-colors duration-500">
       
       {/* 2A: HARD COPIES COMING SOON */}
       <section ref={headerRef} className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden border-b border-black/5 dark:border-white/5">
          <motion.div 
            style={{ y: headerBgY }}
            className="absolute inset-0 bg-gray-200 dark:bg-zinc-900"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-gray-200 dark:from-black/80 dark:to-zinc-900 z-10" />
          </motion.div>
          <div className="relative z-20 text-center max-w-3xl px-8">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-block py-2 px-4 border border-black/20 dark:border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-black/80 dark:text-white/80 mb-6 md:mb-8">Status Alert</span>
                <h1 className="text-3xl md:text-7xl font-bold text-black dark:text-white mb-6 md:mb-8 tracking-tighter leading-none">THE VAULT.<br/>OPENING SOON.</h1>
                <p className="text-black/60 dark:text-white/60 font-medium text-sm md:text-xl tracking-wide">Retrospective releases. Limited runs.</p>
             </motion.div>
          </div>
       </section>

       {/* 2B: LATEST ISSUE PROMO */}
       <section className="py-20 md:py-24 bg-white dark:bg-zinc-900 relative overflow-hidden transition-colors duration-500 z-10">
          <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/2">
                <div className="w-full aspect-square md:h-80 bg-gray-100 dark:bg-zinc-800 rounded-sm border border-black/10 dark:border-white/10 flex items-center justify-center shadow-2xl">
                    <span className="text-black/20 dark:text-white/20 font-bold text-xl md:text-2xl tracking-tight uppercase">Volume 01</span>
                </div>
             </div>
             <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4 block">In Circulation</span>
                <h2 className="text-2xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tighter">Vol. 01: Genesis</h2>
                <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-md mx-auto md:mx-0">
                   The issue that started it all. 140 pages of premium automotive culture, printed on 120gsm matte paper.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button onClick={() => onViewVolume(1)}>Acquire Vol. 01</Button>
                    <button 
                        onClick={() => onPreviewVolume(1)}
                        className="px-8 py-3 rounded-lg text-sm uppercase tracking-widest font-sans font-medium text-black/70 hover:text-black border border-black/20 hover:border-black dark:text-white/70 dark:hover:text-white dark:border-white/20 dark:hover:border-white transition-all duration-300"
                    >
                        Inspect
                    </button>
                </div>
             </div>
          </div>
       </section>

       {/* 2C: FULL ARCHIVES GRID */}
       <section className="py-24 md:py-32 container mx-auto px-8 md:px-12 z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b border-black/10 dark:border-white/10 pb-8 gap-4">
             <div>
                <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tighter">The Library</h2>
                <p className="text-black/50 dark:text-white/50 font-medium text-sm md:text-base tracking-wide">Digital archives available instantly.</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group cursor-pointer"
                   onClick={() => onViewVolume(i)}
                >
                   <div className="relative aspect-[3/4] bg-gray-200 dark:bg-zinc-800 mb-6 overflow-hidden rounded-sm border border-black/5 dark:border-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-black/20 dark:group-hover:border-white/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent dark:from-black/60 dark:to-transparent opacity-50 group-hover:opacity-100 transition-opacity z-10" />
                      <div className="text-black/5 dark:text-white/5 font-bold text-6xl md:text-[8rem] leading-none group-hover:text-black/10 dark:group-hover:text-white/10 transition-colors tracking-tighter">
                        {i}
                      </div>
                      <div className="absolute bottom-6 left-6 z-20">
                         <span className="text-black dark:text-white text-2xl font-bold tracking-tight">Vol. 0{i}</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-black/50 dark:text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">{i === 1 ? 'Available' : 'Vaulted'}</span>
                      <button 
                          className="text-black dark:text-white text-xs font-medium uppercase tracking-widest border-b border-black/30 dark:border-white/30 pb-1 hover:border-black dark:hover:border-white transition-colors"
                          onClick={(e) => {
                             e.stopPropagation();
                             onPreviewVolume(i);
                          }}
                      >
                          Inspect
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>
       </section>
    </div>
  );
};