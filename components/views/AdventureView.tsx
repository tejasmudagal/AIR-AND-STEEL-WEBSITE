import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// Configuration for floating collage items with Responsive Classes
// Modified positions to ensure center text remains clear on mobile
const COLLAGE_ITEMS = [
  { 
    id: 1, 
    // Top Left - Pushed further out
    posClass: 'top-[5%] left-[-15%] md:top-[10%] md:left-[10%]', 
    sizeClass: 'w-24 h-32 md:w-[200px] md:h-[260px]', 
    depth: 0.05, 
    rotation: -6, 
    z: 1, 
    color: 'bg-zinc-800' 
  },
  { 
    id: 2, 
    // Top Right - Pushed further out
    posClass: 'top-[8%] right-[-15%] md:top-[15%] md:left-[75%] md:right-auto', 
    sizeClass: 'w-28 h-20 md:w-[240px] md:h-[180px]', 
    depth: 0.08, 
    rotation: 12, 
    z: 2, 
    color: 'bg-zinc-700' 
  },
  { 
    id: 3, 
    // Bottom Left - Pushed further out
    posClass: 'bottom-[8%] left-[-10%] md:top-[60%] md:left-[5%] md:bottom-auto', 
    sizeClass: 'w-28 h-36 md:w-[180px] md:h-[220px]', 
    depth: 0.06, 
    rotation: 15, 
    z: 3, 
    color: 'bg-neutral-800' 
  },
  { 
    id: 4, 
    // Bottom Right - Pushed further out
    posClass: 'bottom-[10%] right-[-10%] md:top-[65%] md:left-[80%] md:bottom-auto md:right-auto', 
    sizeClass: 'w-32 h-40 md:w-[220px] md:h-[280px]', 
    depth: 0.09, 
    rotation: -12, 
    z: 1, 
    color: 'bg-stone-800' 
  },
  { 
    id: 5, 
    // Mid-Upper Left - Small, less intrusive
    posClass: 'top-[22%] left-[-5%] md:top-[5%] md:left-[45%]', 
    sizeClass: 'w-16 h-16 md:w-[150px] md:h-[150px]', 
    depth: 0.03, 
    rotation: 45, 
    z: 0, 
    color: 'bg-zinc-900' 
  },
  { 
    id: 6, 
    // Mid-Lower Right - Small
    posClass: 'bottom-[25%] right-[-5%] md:top-[80%] md:left-[40%]', 
    sizeClass: 'w-24 h-16 md:w-[300px] md:h-[200px]', 
    depth: 0.07, 
    rotation: -5, 
    z: 2, 
    color: 'bg-neutral-900' 
  },
  { 
    id: 7, 
    // Upper Right - Tucked away
    posClass: 'top-[28%] right-[-8%] md:top-[35%] md:left-[20%]', 
    sizeClass: 'w-16 h-20 md:w-[160px] md:h-[200px]', 
    depth: 0.12, 
    rotation: -15, 
    z: 0, 
    color: 'bg-zinc-600' 
  },
  { 
    id: 8, 
    // Lower Left - Tucked away
    posClass: 'bottom-[35%] left-[-8%] md:top-[40%] md:left-[70%] md:right-auto', 
    sizeClass: 'w-20 h-20 md:w-[180px] md:h-[180px]', 
    depth: 0.10, 
    rotation: 10, 
    z: 0, 
    color: 'bg-stone-700' 
  },
];

const FloatingImage: React.FC<{ item: any; mouseX: any; mouseY: any; scrollYProgress: any }> = ({ item, mouseX, mouseY, scrollYProgress }) => {
  // Desktop Mouse Parallax
  const x = useTransform(mouseX, (val: number) => val * item.depth);
  const mouseYVal = useTransform(mouseY, (val: number) => val * item.depth);
  
  // Mobile/Scroll Parallax: Move vertically based on scroll position
  const scrollYVal = useTransform(scrollYProgress, [0, 1], [0, item.depth * 200]);

  // Combine Y movements
  const y = useTransform([mouseYVal, scrollYVal], ([m, s]) => (m as number) + (s as number));
  
  return (
    <motion.div
      style={{ 
        rotate: item.rotation,
        zIndex: item.z,
        x,
        y
      }}
      className={`absolute shadow-2xl rounded-sm border md:border-4 border-white dark:border-zinc-800 pointer-events-none ${item.color} ${item.posClass} ${item.sizeClass} opacity-80 md:opacity-100`}
    >
       {/* Placeholder for image content */}
       <div className="w-full h-full opacity-50 bg-gradient-to-br from-white/10 to-transparent" />
       <div className="absolute bottom-2 right-2 text-[6px] md:text-[8px] text-white/40 font-mono uppercase">Img_0{item.id}</div>
    </motion.div>
  );
};

export const AdventureView: React.FC = () => {
  // 7A: Header Parallax Setup
  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerBgY = useTransform(headerProgress, [0, 1], ["0%", "30%"]);
  
  // 7B: Collage Interaction (Scroll + Mouse)
  const collageRef = useRef(null);
  const { scrollYProgress: collageScrollProgress } = useScroll({ 
      target: collageRef, 
      offset: ["start end", "end start"] 
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - width / 2;
    const y = clientY - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="bg-premium-paper dark:bg-premium-black min-h-screen pt-20 font-sans transition-colors duration-500">
       
       {/* 7A: LANDING PAGE */}
       <section ref={headerRef} className="relative h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ y: headerBgY }}
            className="absolute inset-0 bg-gradient-to-b from-gray-200 to-black dark:from-zinc-900 dark:to-black z-10" 
          />
          
          <div className="relative z-20 text-center max-w-4xl px-8">
             <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1 }}
                className="text-4xl md:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[0.9]"
             >
                THE PURSUIT.
             </motion.h1>
             <p className="text-white/60 font-medium text-xs md:text-lg tracking-[0.3em] uppercase">Beyond the road.</p>
          </div>
       </section>

       {/* 7B: COLLAGE SECTION (Interactive) */}
       {/* Increased min-h to prevent clipping of floating items on mobile */}
       <section 
          ref={collageRef}
          className="relative min-h-[100vh] md:min-h-[120vh] bg-white dark:bg-zinc-950 overflow-hidden flex items-center justify-center z-20 cursor-crosshair"
          onMouseMove={handleMouseMove}
       >
          {/* Floating Items Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             {COLLAGE_ITEMS.map((item) => (
                <FloatingImage 
                  key={item.id} 
                  item={item} 
                  mouseX={smoothX} 
                  mouseY={smoothY}
                  scrollYProgress={collageScrollProgress}
                />
             ))}
          </div>

          {/* Center Text (High Z-Index) with Liquid Glass Effect */}
          <div className="relative z-50 container mx-auto px-6 md:px-8 pointer-events-none">
             {/* REMOVED colored shadow, refined glass background and border for pure blur effect */}
             <div className="max-w-4xl mx-auto text-center backdrop-blur-3xl bg-white/5 dark:bg-black/30 p-8 md:p-16 rounded-3xl border border-white/10 transition-colors duration-300">
                <h2 className="text-xl md:text-6xl font-bold text-black dark:text-white leading-tight tracking-tighter mb-8 drop-shadow-sm">
                   "We do not just drive. We document the silence between the gears."
                </h2>
                <div className="w-12 md:w-20 h-1 bg-black/20 dark:bg-white/20 mx-auto rounded-full" />
             </div>
          </div>
       </section>

       {/* Visual Connector Line */}
       <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent mx-auto relative z-20" />

       {/* 7C: WHO WE ARE */}
       <section className="py-20 md:py-32 bg-gray-50 dark:bg-black transition-colors duration-500 z-20 relative">
          <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
             
             {/* Left: Text Content */}
             <div className="w-full md:w-1/2 order-2 md:order-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-6 block">
                   Our Ethos
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 md:mb-8 tracking-tighter">THE COLLECTIVE.</h2>
                <div className="text-black/70 dark:text-white/70 text-sm md:text-lg leading-relaxed space-y-6 font-normal">
                   <p>
                      Air & Steel is a collective of photographers, writers, and drivers. We grew tired of the fast-paced, disposable content of the modern internet.
                   </p>
                   <p>
                      We believe in slow journalism. We believe in taking the long way home. We believe that a car is more than a machine—it is a vessel for memory.
                   </p>
                </div>
             </div>

             {/* Right: Image Visual */}
             <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="w-full aspect-square md:aspect-[4/5] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-sm flex items-center justify-center shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                   <div className="text-center transform transition-transform duration-700 group-hover:scale-110">
                      <span className="text-black/20 dark:text-white/20 font-bold text-6xl md:text-8xl tracking-tighter">EST.</span>
                      <span className="block text-black/20 dark:text-white/20 font-bold text-6xl md:text-8xl tracking-tighter">2024</span>
                   </div>
                </div>
             </div>

          </div>
       </section>
    </div>
  );
};