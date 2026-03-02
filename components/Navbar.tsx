import React, { useState, useEffect } from 'react';
import { Package, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  isIntroComplete: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenCart, 
  onOpenAuth,
  isLoggedIn,
  isIntroComplete
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewState) => {
    setMobileMenuOpen(false);
    if (currentView === view) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigate(view);
  };

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: 'HOME' },
    { label: 'Archives', view: 'ARCHIVES' },
    { label: 'Adventure', view: 'ADVENTURE' },
    { label: 'Contact', view: 'CONTACT' },
  ];

  return (
    <>
      <motion.nav 
        initial="hidden"
        animate={isIntroComplete ? "visible" : "hidden"}
        variants={{
          hidden: { y: -100 },
          visible: { y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border-b font-sans ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-black/5 dark:border-white/5 py-4 shadow-sm dark:shadow-2xl' 
            : 'bg-transparent border-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* 1. Logo (Left) */}
          <div 
            onClick={() => handleNavClick('HOME')}
            className="cursor-pointer group relative z-50 flex-shrink-0"
          >
            <motion.h1 
              animate={{ 
                scale: isScrolled ? 0.9 : 1,
                opacity: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.3, 1] }}
              className={`text-xl md:text-2xl font-bold tracking-[0.2em] uppercase transition-colors ${
                  isScrolled || mobileMenuOpen ? 'text-black dark:text-white group-hover:text-black/70 dark:group-hover:text-white/80' : 'text-white'
              }`}
            >
              AIR & STEEL
            </motion.h1>
          </div>

          {/* 2. Desktop Nav (Centered) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 ${
                  currentView === item.view 
                    ? (isScrolled ? 'text-black dark:text-white' : 'text-white') 
                    : (isScrolled ? 'text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white' : 'text-white/60 hover:text-white')
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 3. Actions (Right) */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            {/* Auth Link */}
            <button
              onClick={isLoggedIn ? () => handleNavClick('DASHBOARD') : onOpenAuth}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors flex items-center ${
                  isScrolled ? 'text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white' : 'text-white/60 hover:text-white'
              }`}
              title={isLoggedIn ? "Dashboard" : "Get In"}
            >
              {isLoggedIn ? (
                 <User size={20} strokeWidth={1.5} />
              ) : 'GET IN'}
            </button>
            
            <button 
              onClick={onOpenCart}
              className={`transition-colors ${
                  isScrolled ? 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              <Package size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-6 relative z-50">
             <button 
              onClick={onOpenCart}
              className={`${isScrolled || mobileMenuOpen ? 'text-black/80 dark:text-white/80' : 'text-white/80'}`}
            >
              <Package size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               {mobileMenuOpen ? (
                   <X size={24} className="text-black dark:text-white" />
               ) : (
                   <Menu size={24} className={isScrolled ? 'text-black dark:text-white' : 'text-white'} />
               )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[40] bg-white dark:bg-black flex flex-col items-center justify-center font-sans pt-20"
          >
            <div className="flex flex-col items-center gap-10">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-lg font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                    currentView === item.view 
                      ? 'text-black dark:text-white scale-110' 
                      : 'text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 40 }}
                 className="h-px bg-black/10 dark:bg-white/10 my-4" 
              />

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if(isLoggedIn) handleNavClick('DASHBOARD');
                  else onOpenAuth();
                }}
                className="text-xs font-bold uppercase tracking-[0.25em] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors border border-black/10 dark:border-white/10 px-6 py-3 rounded-full"
              >
                {isLoggedIn ? 'Dashboard' : 'GET IN'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};