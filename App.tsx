import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/ui/IntroScreen'; // Import new intro
import { CheckoutModal } from './components/modals/CheckoutModal';
import { AuthModal } from './components/modals/AuthModal';
import { PhilosophyModal } from './components/modals/PhilosophyModal';
import { ArchiveDetailModal } from './components/modals/ArchiveDetailModal';
import { ArchivePreviewModal } from './components/modals/ArchivePreviewModal';
import { LegalModal, LegalType } from './components/modals/LegalModal';
import { HomeView } from './components/views/HomeView';
import { ArchivesView } from './components/views/ArchivesView';
import { AdventureView } from './components/views/AdventureView';
import { DashboardView } from './components/views/DashboardView';
import { ContactView } from './components/views/ContactView';
import { ViewState, UserSession } from './types';
import { Instagram, Mail, Twitter, Plus, Minus, ChevronRight, X } from 'lucide-react';

// Transition Configuration
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    filter: 'blur(8px)',
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: 'blur(8px)',
    scale: 0.98
  }
};

const pageTransition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number] // Custom "luxury" ease curve
};

function App() {
  // Theme State - Enforced Dark Mode (Premium Default)
  const isDark = true;

  // Navigation & Modals
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<LegalType>(null);

  // Mobile Footer Info State
  const [isFooterInfoOpen, setIsFooterInfoOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  // Auth
  const [user, setUser] = useState<UserSession>({ isLoggedIn: false });

  // Enforce Dark Mode Class
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Navigation Wrapper
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    handleNavigate('HOME');
  };

  const openLegal = (type: LegalType) => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Footer Accordion Content
  const FOOTER_ACCORDION_ITEMS = [
    {
        id: 'LEGAL',
        label: 'Legal / Terms',
        content: (
            <div className="space-y-4 text-xs leading-relaxed text-white/70">
                <p>By accessing Air & Steel, you agree to our terms governing the sale of print and digital goods.</p>
                <ul className="list-disc pl-4 space-y-1 marker:text-white/30">
                    <li><strong>IP:</strong> Content is exclusive property.</li>
                    <li><strong>Sales:</strong> Final once processed.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'SHIPPING',
        label: 'Global Shipping',
        content: (
            <div className="space-y-2 text-xs leading-relaxed text-white/70">
                <p><strong>Domestic (India):</strong> 3-5 days via Blue Dart.</p>
                <p><strong>International:</strong> 10-14 days via DHL Express.</p>
            </div>
        )
    },
    {
        id: 'STOCKISTS',
        label: 'Stockists',
        content: (
            <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
                <div><h5 className="font-bold text-white mb-1">Delhi</h5><p>Bahrisons</p><p>Full Circle</p></div>
                <div><h5 className="font-bold text-white mb-1">Mumbai</h5><p>Title Waves</p><p>Wayword & Wise</p></div>
            </div>
        )
    },
    {
        id: 'CONTACT',
        label: 'Studio Contact',
        content: (
            <div className="space-y-3 text-xs leading-relaxed text-white/70">
                 <div>
                    <a href="mailto:hello@airandsteel.com" className="text-white underline decoration-1 underline-offset-4">hello@airandsteel.com</a>
                 </div>
                 <p>124, Hauz Khas Village<br/>New Delhi, 110016</p>
                 <button onClick={() => { setIsFooterInfoOpen(false); handleNavigate('CONTACT'); }} className="mt-2 text-[10px] font-bold uppercase tracking-wide border-b border-white/20 pb-1">
                    Open Contact Form
                 </button>
            </div>
        )
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ease-in-out dark`}>
        
        {/* INTRO SCREEN OVERLAY */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <IntroScreen onComplete={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <Navbar 
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            isLoggedIn={user.isLoggedIn}
            isIntroComplete={!showIntro}
        />

        <main className="flex-grow relative">
            <AnimatePresence 
                mode="wait"
                onExitComplete={() => {
                    // Instantly scroll to top only after the exit animation is finished
                    window.scrollTo(0, 0);
                }}
            >
                {currentView === 'HOME' && (
                    <motion.div 
                        key="HOME"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full"
                    >
                        <HomeView 
                            onNavigate={handleNavigate}
                            onOpenCart={() => setIsCartOpen(true)}
                            onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
                            onViewVolume={(id) => setSelectedVolume(id)}
                            onPreviewVolume={(id) => { setSelectedVolume(id); setIsPreviewOpen(true); }}
                            startAnimation={!showIntro}
                        />
                    </motion.div>
                )}
                {currentView === 'ARCHIVES' && (
                    <motion.div 
                        key="ARCHIVES"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full"
                    >
                        <ArchivesView 
                            onViewVolume={(id) => setSelectedVolume(id)}
                            onPreviewVolume={(id) => { setSelectedVolume(id); setIsPreviewOpen(true); }}
                        />
                    </motion.div>
                )}
                {currentView === 'ADVENTURE' && (
                    <motion.div 
                        key="ADVENTURE"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full"
                    >
                        <AdventureView />
                    </motion.div>
                )}
                {currentView === 'DASHBOARD' && (
                    <motion.div 
                        key="DASHBOARD"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full"
                    >
                        <DashboardView 
                            user={user}
                            onLogout={handleLogout}
                            onRead={(id) => { setSelectedVolume(id); setIsPreviewOpen(true); }}
                            onOpenAuth={() => setIsAuthOpen(true)}
                        />
                    </motion.div>
                )}
                {currentView === 'CONTACT' && (
                    <motion.div 
                        key="CONTACT"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full"
                    >
                        <ContactView />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>

        {/* ULTRA MINIMAL FOOTER - STRUCTURED & LINED */}
        <footer className="bg-[#050505] border-t border-white/10 relative z-10">
             
             {/* Desktop Footer (Unchanged) */}
             <div className="hidden md:flex container mx-auto px-6 py-20 flex-row justify-between items-end">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-white font-bold text-xl tracking-tight mb-2">AIR & STEEL</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed max-w-[200px]">
                            Automotive Preservation in<br/>Print & Pixel.
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-white/30 mt-3">
                            &copy; 2024. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-6 justify-start">
                        <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail size={18} /></a>
                    </div>
                </div>
                <div className="flex flex-row gap-8 text-[11px] font-bold uppercase tracking-widest text-white/50">
                    <button onClick={() => openLegal('TERMS')} className="hover:text-white transition-colors text-left">Legal</button>
                    <button onClick={() => openLegal('SHIPPING')} className="hover:text-white transition-colors text-left">Shipping</button>
                    <button onClick={() => openLegal('STOCKISTS')} className="hover:text-white transition-colors text-left">Stockists</button>
                    <button onClick={() => handleNavigate('CONTACT')} className="hover:text-white transition-colors text-left">Contact</button>
                </div>
             </div>

             {/* Mobile Footer - Redesigned: Minimal, Lined, Tight Spacing */}
             <div className="md:hidden flex flex-col">
                
                {/* Brand Section */}
                <div className="px-6 pt-6 pb-4 flex justify-between items-end">
                    <div>
                        <h3 className="text-white font-bold text-lg tracking-tight mb-0.5">AIR & STEEL</h3>
                        <p className="text-[10px] text-white/50 font-medium tracking-normal">
                            Automotive Preservation.
                        </p>
                    </div>
                    <span className="text-[10px] text-white/30 font-mono tracking-tight">2024</span>
                </div>

                {/* Divider Line */}
                <div className="border-t border-white/10 w-full" />

                {/* Action Bar */}
                <div className="px-6 py-5 flex justify-start items-center bg-[#0a0a0a]">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-white/30 hover:text-white transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="text-white/30 hover:text-white transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-white/30 hover:text-white transition-colors"><Mail size={18} /></a>
                        
                        <button 
                            onClick={() => setIsFooterInfoOpen(true)}
                            className="flex items-start text-white hover:text-white/80 transition-colors ml-2"
                        >
                            <span className="font-bold text-xl leading-none">i</span>
                            <span className="text-[10px] font-bold -mt-0.5 ml-0.5">+</span>
                        </button>
                    </div>
                </div>
             </div>
        </footer>

        {/* Mobile Info Overlay (Accordion) */}
        <AnimatePresence>
            {isFooterInfoOpen && (
                <div className="fixed inset-0 z-[100] md:hidden flex flex-col justify-end">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFooterInfoOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Sheet - Matching styling to footer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full bg-[#0a0a0a] rounded-t-xl shadow-2xl border-t border-white/10 overflow-hidden max-h-[85vh] flex flex-col"
                    >
                        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#050505]">
                            <span className="text-xs font-bold uppercase tracking-tight text-white">Index</span>
                            <button onClick={() => setIsFooterInfoOpen(false)} className="text-white/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto px-6 py-2 pb-12">
                            {FOOTER_ACCORDION_ITEMS.map((item) => (
                                <div key={item.id} className="border-b border-white/5 last:border-0">
                                    <button 
                                        onClick={() => toggleAccordion(item.id)}
                                        className="w-full flex justify-between items-center py-4 text-left group"
                                    >
                                        <span className={`text-sm font-bold uppercase tracking-tight transition-colors ${activeAccordion === item.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                            {item.label}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: activeAccordion === item.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {activeAccordion === item.id ? <Minus size={14} className="text-white"/> : <Plus size={14} className="text-white/40"/>}
                                        </motion.div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {activeAccordion === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 pt-0 pl-1">
                                                    {item.content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        
        {/* Modals */}
        <CheckoutModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            isLoggedIn={user.isLoggedIn}
            onLogin={() => { setIsCartOpen(false); setIsAuthOpen(true); }}
        />
        <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
            onLoginSuccess={(email) => setUser({ isLoggedIn: true, name: email.split('@')[0], email })}
        />
        <PhilosophyModal isOpen={isPhilosophyOpen} onClose={() => setIsPhilosophyOpen(false)} />
        <ArchiveDetailModal 
            isOpen={!!selectedVolume && !isPreviewOpen} 
            onClose={() => setSelectedVolume(null)} 
            volumeId={selectedVolume}
            imageSrc="" 
            onPurchase={() => { setSelectedVolume(null); setIsCartOpen(true); }}
        />
        <ArchivePreviewModal 
            isOpen={isPreviewOpen} 
            onClose={() => setIsPreviewOpen(false)} 
            volumeId={selectedVolume}
        />
        <LegalModal 
            isOpen={legalModalOpen} 
            onClose={() => setLegalModalOpen(false)} 
            type={legalType}
        />

    </div>
  );
}

export default App;