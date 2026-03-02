import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalType = 'TERMS' | 'PRIVACY' | 'SHIPPING' | 'STOCKISTS' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  // Lock scroll
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

  const getContent = () => {
    switch (type) {
      case 'TERMS':
        return {
          title: 'Terms of Service',
          content: (
            <div className="space-y-4 text-black/60 dark:text-white/60 font-sans text-sm leading-relaxed">
              <p>Welcome to Air & Steel. By accessing our platform, you agree to these terms, which govern the sale of our print and digital goods.</p>
              <ul className="list-disc pl-4 space-y-2 marker:text-black/30 dark:marker:text-white/30">
                <li><strong>Intellectual Property:</strong> All content, photography, and design elements are the exclusive property of Air & Steel. Unauthorized reproduction is strictly prohibited.</li>
                <li><strong>Purchase Terms:</strong> All sales of limited edition prints are final once processed, barring manufacturing defects.</li>
                <li><strong>Liability:</strong> Air & Steel is not liable for indirect damages arising from the use of our products.</li>
                <li><strong>Jurisdiction:</strong> These terms are governed by the laws of India. Disputes are subject to the courts of New Delhi.</li>
              </ul>
            </div>
          )
        };
      case 'PRIVACY':
        return {
          title: 'Privacy Policy',
          content: (
             <div className="space-y-4 text-black/60 dark:text-white/60 font-sans text-sm leading-relaxed">
              <p>We value your digital privacy as much as we value the open road.</p>
              <ul className="list-disc pl-4 space-y-2 marker:text-black/30 dark:marker:text-white/30">
                <li><strong>Data Collection:</strong> We collect only essential information required for order fulfillment and newsletter delivery (Name, Email, Shipping Address).</li>
                <li><strong>Data Usage:</strong> Your data is never sold to third parties. It is used solely for transactional communications and internal analytics.</li>
                <li><strong>Security:</strong> We employ industry-standard encryption to protect your personal information during transmission.</li>
                <li><strong>Cookies:</strong> Minimal cookies are used strictly for cart functionality and session management.</li>
              </ul>
            </div>
          )
        };
      case 'SHIPPING':
        return {
          title: 'Shipping & Returns',
          content: (
             <div className="space-y-4 text-black/60 dark:text-white/60 font-sans text-sm leading-relaxed">
              <p>Our logistics are handled with the same care as our printing.</p>
              <div className="space-y-2">
                <h4 className="text-black dark:text-white text-xs uppercase tracking-widest">Shipping</h4>
                <p><strong>Domestic (India):</strong> 3-5 business days via Blue Dart or Delhivery. Complimentary on orders above ₹2000.</p>
                <p><strong>International:</strong> 10-14 business days via DHL Express. Customs duties are the responsibility of the recipient.</p>
              </div>
               <div className="space-y-2 mt-4">
                <h4 className="text-black dark:text-white text-xs uppercase tracking-widest">Returns</h4>
                <p>Due to the limited nature of our volumes, we do not accept returns for change of mind. Replacements are offered solely for items damaged in transit, reported within 48 hours of delivery with photographic evidence.</p>
              </div>
            </div>
          )
        };
      case 'STOCKISTS':
        return {
          title: 'Stockists',
          content: (
             <div className="space-y-4 text-black/60 dark:text-white/60 font-sans text-sm leading-relaxed">
              <p>Select copies of Air & Steel are available at these fine establishments.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                   <h4 className="text-black dark:text-white text-xs uppercase tracking-widest mb-1">New Delhi</h4>
                   <p>Bahrisons, Khan Market</p>
                   <p>Full Circle, GK-1</p>
                </div>
                 <div>
                   <h4 className="text-black dark:text-white text-xs uppercase tracking-widest mb-1">Mumbai</h4>
                   <p>Title Waves, Bandra</p>
                   <p>Wayword & Wise, Fort</p>
                </div>
                 <div>
                   <h4 className="text-black dark:text-white text-xs uppercase tracking-widest mb-1">Bangalore</h4>
                   <p>Bookworm, Church Street</p>
                   <p>Champaca, Edward Road</p>
                </div>
                 <div>
                   <h4 className="text-black dark:text-white text-xs uppercase tracking-widest mb-1">Pune</h4>
                   <p>The Word Bookshop</p>
                </div>
              </div>
            </div>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  const { title, content } = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Panel - UPDATED for Mobile spacing and rounded corners */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[calc(100%-32px)] md:w-[600px] bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-6 md:p-10 pointer-events-auto mb-6 md:mb-0 max-h-[80vh] overflow-y-auto transition-colors duration-500 mx-auto"
          >
            <div className="flex justify-between items-center mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                <h2 className="text-xl font-serif text-black dark:text-white">{title}</h2>
                <button onClick={onClose} className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>
            
            {content}

            <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center md:text-left">
                <p className="text-[10px] text-black/20 dark:text-white/20 uppercase tracking-widest">
                    Last Updated: March 2024 • Air & Steel Legal Team
                </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};