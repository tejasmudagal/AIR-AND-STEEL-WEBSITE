import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowDown, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { ViewState } from '../../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onOpenCart: () => void;
  onOpenPhilosophy: () => void;
  onViewVolume: (id: number) => void;
  onPreviewVolume: (id: number) => void;
  startAnimation: boolean;
}

const FEATURE_IMAGES = [
  { id: 1, title: "Cover Art", subtitle: "Matte Finish", bg: "bg-[#e5e5e5] dark:bg-[#1a1a1a]" },
  { id: 2, title: "The Pass", subtitle: "Alpine Routes", bg: "bg-[#d4d4d4] dark:bg-[#262626]" },
  { id: 3, title: "Cockpit", subtitle: "Analog Dials", bg: "bg-[#c4c4c4] dark:bg-[#333333]" },
  { id: 4, title: "Typography", subtitle: "Stevie Sans", bg: "bg-[#b0b0b0] dark:bg-[#404040]" },
  { id: 5, title: "Schematics", subtitle: "Technical Drawings", bg: "bg-[#a3a3a3] dark:bg-[#4d4d4d]" },
];

export const HomeView: React.FC<HomeViewProps> = ({ 
    onNavigate, 
    onOpenCart, 
    onOpenPhilosophy, 
    onViewVolume, 
    onPreviewVolume, 
    startAnimation
}) => {
  const [subscribed, setSubscribed] = useState(false);
  
  // 1. HERO PARALLAX
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "40%"]); 
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "120%"]); // Text moves out faster

  // 4. MOCKUP PARALLAX
  const mockupRef = useRef(null);
  const { scrollYProgress: mockupProgress } = useScroll({ target: mockupRef, offset: ["start end", "end start"] });
  const mockupBgY = useTransform(mockupProgress, [0, 1], ["-15%", "15%"]);
  const mockupContentY = useTransform(mockupProgress, [0, 1], ["0%", "-5%"]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const scrollToLatest = () => {
    const element = document.getElementById('latest');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative font-sans transition-colors duration-500">
      
      {/* 1. HERO SECTION */}
      <section id="hero" ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 md:pb-0 md:items-center bg-black">
        <motion.div 
          style={{ y: heroBgY }} 
          className="absolute inset-0 z-0 will-change-transform"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          {/* IMAGE REMOVED: Replaced with dark placeholder */}
          <div className="w-full h-full bg-zinc-900 opacity-50" />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 md:px-12">
          <motion.div 
            style={{ y: heroTextY }}
            className="max-w-7xl"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-[8rem] font-bold tracking-tighter text-white leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 uppercase"
            >
              The Analog<br />Pursuit.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="border-l border-white/40 pl-6 flex flex-col items-start gap-8"
            >
               <p className="text-white/60 text-xs md:text-sm font-medium tracking-widest uppercase max-w-[240px] md:max-w-xs">
                  Automotive culture in print & pixel.
               </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          onClick={scrollToLatest}
          style={{ opacity: useTransform(heroProgress, [0, 0.2], [1, 0]) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-6 md:bottom-8 md:left-1/2 md:-translate-x-1/2 text-white/30 animate-bounce z-10 cursor-pointer hover:text-white transition-colors"
        >
           <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="py-20 md:py-40 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 border-b border-black/5 dark:border-white/5 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl mx-auto flex flex-col items-center"
            >
                <h2 className="text-3xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white tracking-tighter leading-none mb-10 md:mb-12">
                    SLOW<br />
                    <span className="text-black/40 dark:text-white/40">DOWN.</span>
                </h2>

                <Button onClick={onOpenPhilosophy} variant="outline" className="px-8 py-3 md:px-10 md:py-4 text-[10px] md:text-xs">
                    OUR PHILOSOPHY
                </Button>
            </motion.div>
        </div>
      </section>

      {/* 3. THE FEATURE SECTION (Sticky Stack) */}
      <section id="latest" className="relative bg-white dark:bg-zinc-900 transition-colors duration-500 z-10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-start">
          
          {/* 
             ORDER CHANGE FOR MOBILE:
             Mobile: Images (order-1) -> Text (order-2)
             Desktop: Text (order-1) -> Images (order-2)
          */}

          {/* LEFT COLUMN (Desktop) / BOTTOM COLUMN (Mobile): Text Content */}
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center text-center lg:text-left py-16 lg:py-0 order-2 lg:order-1 z-10">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-lg mx-auto lg:mx-0"
             >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4 md:mb-6 block">
                  Latest Issue
                </span>
                
                <h2 className="text-3xl md:text-8xl font-bold text-black dark:text-white tracking-tighter leading-none mb-6 md:mb-8">
                  VOLUME 01.
                </h2>

                <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed font-medium mb-10 md:mb-12 border-l-0 lg:border-l-2 border-black/10 dark:border-white/10 lg:pl-6 px-4 lg:px-0">
                    The inaugural dispatch. 140 pages of high-fidelity storytelling from the forgotten corners of car culture. From Alpine passes to Tokyo underpasses. Printed to last.
                </p>
                
                {/* Structured Data Points */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 border-t border-b border-black/10 dark:border-white/10 py-8 text-left">
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Format</span>
                      <span className="text-sm md:text-base font-bold text-black dark:text-white">Print & Digital</span>
                   </div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Stock</span>
                      <span className="text-sm md:text-base font-bold text-black dark:text-white">120gsm Matte</span>
                   </div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Curation</span>
                      <span className="text-sm md:text-base font-bold text-black dark:text-white">8 Features</span>
                   </div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Shipping</span>
                      <span className="text-sm md:text-base font-bold text-black dark:text-white">Global Priority</span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                   {/* Redirects to ARCHIVES view */}
                   <Button variant="outline" onClick={() => onNavigate('ARCHIVES')} className="w-full sm:w-auto flex items-center gap-2 group justify-center">
                      I'M INTERESTED <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                   </Button>
                </div>
             </motion.div>
          </div>

          {/* RIGHT COLUMN (Desktop) / TOP COLUMN (Mobile): Scrolling Images */}
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2 pb-8 lg:pb-24">
              <div className="flex flex-col gap-[20vh] md:gap-[50vh] pt-16 lg:pt-32 pb-[5vh]">
                  {FEATURE_IMAGES.map((img, index) => {
                      // Minimal alternating rotation
                      const rotation = index % 2 === 0 ? 1.5 : -1.5;
                      
                      return (
                      <div 
                          key={img.id} 
                          className="sticky top-28 md:top-40 flex items-start justify-center"
                          style={{ zIndex: index + 1 }}
                      >
                          <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 40 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
                              viewport={{ once: false, margin: "-10%" }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className={`relative w-[85vw] max-w-xs md:max-w-md aspect-[3/4] ${img.bg} rounded-sm shadow-lg shadow-black/10 dark:shadow-black/40 overflow-hidden border border-black/5 dark:border-white/5 origin-center`}
                          >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[6rem] md:text-[8rem] font-bold text-black/5 dark:text-white/5 tracking-tighter">0{img.id}</span>
                                </div>
                                <div className="absolute bottom-6 left-6 border border-black/10 dark:border-white/10 px-3 py-1 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded shadow-sm">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">{img.title}</span>
                                </div>
                          </motion.div>
                      </div>
                  )})}
              </div>
          </div>

        </div>
      </section>

      {/* 4. MOCKUPS SECTION */}
      <section ref={mockupRef} className="relative h-[80vh] md:h-[110vh] w-full bg-gray-100 dark:bg-zinc-950 overflow-hidden z-0">
          {/* Background Image Container */}
          <motion.div 
             style={{ y: mockupBgY }}
             initial={{ scale: 1.1 }}
             whileInView={{ scale: 1.0 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="absolute inset-0 z-0 will-change-transform"
          >
              {/* IMAGE REMOVED: Replaced with dark placeholder */}
              <div className="w-full h-full bg-zinc-900 opacity-80 dark:opacity-40" />
              
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white dark:from-[#050505] dark:via-[#050505]/80 dark:to-transparent dark:md:to-[#050505] opacity-100" />
          </motion.div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-end md:justify-center items-start md:items-end pb-20 md:pb-0">
             <motion.div 
                style={{ y: mockupContentY }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg text-left md:text-right"
             >
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4 md:mb-6 block">
                   Experience
                 </span>
                 <h2 className="text-3xl md:text-6xl font-bold text-black dark:text-white tracking-tighter mb-6 md:mb-8 leading-none">
                    PRINT &<br/>DIGITAL.
                 </h2>
                 <p className="text-sm md:text-lg text-black/70 dark:text-white/70 leading-relaxed mb-8 md:mb-10 font-medium md:ml-auto">
                    From the heavy grain of 120gsm stock to the absolute black of an OLED screen. Consistently immersive.
                 </p>
                 <p className="text-black/60 dark:text-white/60 text-xs md:text-sm leading-relaxed mb-10 md:ml-auto md:border-r-2 border-black/10 dark:border-white/10 md:pr-6 hidden md:block">
                    We design specifically for each canvas. No PDFs merely resized. A fully responsive reading experience for the digital collector.
                 </p>
                 
                 <Button onClick={onOpenCart} variant="outline" className="w-full md:w-auto md:ml-auto">
                    CHOOSE FORMAT
                 </Button>
             </motion.div>
          </div>
      </section>

      {/* 5. NEWSLETTER */}
      <section className="relative py-20 md:py-32 bg-black flex items-center justify-center border-t border-white/5 z-10">
        <div className="relative z-10 container mx-auto px-6 md:px-6 text-center max-w-2xl">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 tracking-tighter">NEWSLETTER.</h2>
          <p className="text-white/50 text-sm mb-12 max-w-md mx-auto">Quarterly intelligence on releases and restocks.</p>
          <form className="flex flex-col gap-4 max-w-md mx-auto" onSubmit={handleSubscribe}>
             <div className="relative">
                <input type="email" required placeholder="name@example.com" className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base md:text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors" />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white uppercase text-[10px] md:text-xs font-bold tracking-widest">
                   {subscribed ? <Check size={18} className="text-green-500"/> : "SUBSCRIBE"}
                </button>
             </div>
          </form>
        </div>
      </section>
    </div>
  );
};