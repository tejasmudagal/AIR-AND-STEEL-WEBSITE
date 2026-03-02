import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { EditionType } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, isLoggedIn, onLogin }) => {
  const [edition, setEdition] = useState<EditionType>(EditionType.PRINT);
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  const handleProceed = () => {
    if (!isLoggedIn) {
      onLogin();
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
          {/* Heavy Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/60 dark:bg-black/90 backdrop-blur-2xl"
          />

          {/* Minimal "Spec Sheet" Modal - Added Rounded Corners for Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row rounded-2xl md:rounded-lg max-h-[85vh] md:max-h-none overflow-y-auto"
          >
             {/* Left Column: Product Spec */}
             <div className="w-full md:w-1/3 bg-gray-50 dark:bg-zinc-900/50 p-6 md:p-8 border-r border-black/5 dark:border-white/5 flex flex-col">
                <div className="mb-6">
                    <span className="text-[9px] font-mono text-black/40 dark:text-white/40 uppercase block mb-2">Item Ref</span>
                    <h2 className="text-2xl font-bold text-black dark:text-white tracking-tighter leading-none">VOL. 01</h2>
                    <p className="text-xs text-black/60 dark:text-white/60 font-medium mt-1">The Origin Story</p>
                </div>

                <div className="space-y-4 mb-auto">
                    <span className="text-[9px] font-mono text-black/40 dark:text-white/40 uppercase block border-b border-black/5 dark:border-white/5 pb-2">Configuration</span>
                    
                    {/* Toggle */}
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={() => setEdition(EditionType.PRINT)}
                            className={`w-full text-left p-3 border transition-all duration-300 ${
                                edition === EditionType.PRINT 
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                                : 'bg-transparent text-black/40 border-black/10 hover:border-black/30 dark:text-white/40 dark:border-white/10 dark:hover:border-white/30'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Print</span>
                                <span className="text-xs font-bold">₹950</span>
                            </div>
                            <span className="text-[9px] opacity-60 block">120gsm Matte Stock</span>
                        </button>

                        <button 
                            onClick={() => setEdition(EditionType.DIGITAL)}
                            className={`w-full text-left p-3 border transition-all duration-300 ${
                                edition === EditionType.DIGITAL 
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                                : 'bg-transparent text-black/40 border-black/10 hover:border-black/30 dark:text-white/40 dark:border-white/10 dark:hover:border-white/30'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Digital</span>
                                <span className="text-xs font-bold">₹350</span>
                            </div>
                            <span className="text-[9px] opacity-60 block">High-Res PDF + Interactive</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-end">
                        <span className="text-[9px] font-mono uppercase text-black/40 dark:text-white/40">Total</span>
                        <span className="text-xl font-bold text-black dark:text-white tracking-tight">
                            {edition === EditionType.PRINT ? '₹950' : '₹350'}
                        </span>
                    </div>
                </div>
             </div>

             {/* Right Column: Manifest Data */}
             <div className="w-full md:w-2/3 p-6 md:p-8 relative">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-black/20 hover:text-black dark:text-white/20 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="h-full flex flex-col">
                    <div className="mb-8">
                        <span className="text-[9px] font-mono text-black/40 dark:text-white/40 uppercase block mb-1">Manifest // {edition}</span>
                        <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">Required Data</h3>
                    </div>

                    <div className="space-y-8 flex-grow">
                       {/* Identity */}
                       <div className="group relative">
                          <label className="text-[9px] font-mono uppercase text-black/40 dark:text-white/40 absolute -top-3 left-0 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Recipient Email</label>
                          <input 
                            type="email" 
                            className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors font-medium placeholder-transparent"
                            placeholder="Email"
                          />
                       </div>

                       <AnimatePresence mode="wait">
                         {edition === EditionType.PRINT && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="space-y-8 overflow-hidden"
                           >
                              <div className="group relative">
                                <label className="text-[9px] font-mono uppercase text-black/40 dark:text-white/40 absolute -top-3 left-0 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Shipping Address</label>
                                <input 
                                  type="text" 
                                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors font-medium placeholder-transparent"
                                  placeholder="Address"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div className="group relative">
                                    <label className="text-[9px] font-mono uppercase text-black/40 dark:text-white/40 absolute -top-3 left-0 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">City</label>
                                    <input 
                                    type="text" 
                                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors font-medium placeholder-transparent"
                                    placeholder="City"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[9px] font-mono uppercase text-black/40 dark:text-white/40 absolute -top-3 left-0 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Postal Code</label>
                                    <input 
                                    type="text" 
                                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors font-medium placeholder-transparent"
                                    placeholder="Postal Code"
                                    />
                                </div>
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>

                    <div className="mt-8">
                      <Button 
                        className="w-full rounded-sm" 
                        onClick={handleProceed}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'PROCESSING...' : 'SECURE ALLOCATION'}
                        {!isProcessing && <ChevronRight size={14} className="ml-2" />}
                      </Button>
                      
                      <div className="flex justify-center items-center gap-2 mt-4 text-black/30 dark:text-white/30">
                          <Lock size={10} />
                          <span className="text-[9px] uppercase tracking-widest font-mono">Encrypted 256-bit</span>
                      </div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};