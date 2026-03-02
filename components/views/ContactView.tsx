import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Check, Minus } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-premium-paper dark:bg-premium-black font-sans transition-colors duration-500 flex flex-col justify-center">
       <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Header & Direct Info */}
            <div className="w-full md:w-5/12">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                 <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-6 block">
                    Contact
                 </span>
                 <h1 className="text-3xl md:text-6xl font-serif text-black dark:text-white mb-6 md:mb-8 leading-tight">
                    Correspondence.
                 </h1>
                 <p className="text-black/60 dark:text-white/60 mb-10 md:mb-12 text-sm md:text-base leading-relaxed font-normal">
                    For inquiries regarding the archive, partnerships, or editorial submissions. We value depth over speed in our discourse.
                 </p>

                 <div className="space-y-8 pt-8 border-t border-black/10 dark:border-white/10">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-2">General Inquiries</h4>
                        <a href="mailto:hello@airandsteel.com" className="text-black/60 dark:text-white/60 text-sm hover:text-black dark:hover:text-white transition-colors">hello@airandsteel.com</a>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-2">The Office</h4>
                        <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                            124, Hauz Khas Village<br/>
                            New Delhi, India 110016
                        </p>
                    </div>
                 </div>
               </motion.div>
            </div>

            {/* Minimalist Form */}
            <div className="w-full md:w-7/12">
               <motion.form 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="space-y-10 md:space-y-12" 
                 onSubmit={handleSubmit}
               >
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Full Name</label>
                     <input 
                        required 
                        type="text" 
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 md:py-4 text-base md:text-2xl text-black dark:text-white placeholder-black/10 dark:placeholder-white/10 focus:outline-none focus:border-black dark:focus:border-white transition-all font-serif"
                        placeholder="e.g. Julian Vane"
                     />
                  </div>

                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Email Address</label>
                     <input 
                        required 
                        type="email" 
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 md:py-4 text-base md:text-2xl text-black dark:text-white placeholder-black/10 dark:placeholder-white/10 focus:outline-none focus:border-black dark:focus:border-white transition-all font-serif"
                        placeholder="e.g. julian@example.com"
                     />
                  </div>

                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Message</label>
                     <textarea 
                        required 
                        rows={3} 
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 md:py-4 text-base md:text-xl text-black dark:text-white placeholder-black/10 dark:placeholder-white/10 focus:outline-none focus:border-black dark:focus:border-white transition-all resize-none font-serif leading-relaxed"
                        placeholder="Your detailed thoughts..."
                     />
                  </div>

                  <div className="pt-6">
                      <Button className="w-full md:w-auto px-12" type="submit" disabled={isSent}>
                          {isSent ? (
                              <span className="flex items-center gap-2 justify-center"><Check size={16} /> Transmitted</span>
                          ) : (
                              <span className="flex items-center gap-2 justify-center">Transmit <ArrowRight size={16} /></span>
                          )}
                      </Button>
                  </div>
               </motion.form>
            </div>

          </div>
       </div>
    </div>
  );
};