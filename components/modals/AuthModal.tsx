import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

type AuthStep = 'EMAIL' | 'SENDING' | 'OTP' | 'VERIFYING' | 'SUCCESS';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<AuthStep>('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

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

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => {
            setStep('EMAIL');
            setEmail('');
            setOtp('');
            setError('');
        }, 500);
    }
  }, [isOpen]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
    }
    
    setError('');
    setStep('SENDING');
    
    // Simulate API call to send email
    setTimeout(() => {
        setStep('OTP');
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
        setError('Invalid code.');
        return;
    }

    setStep('VERIFYING');

    // Simulate verification
    setTimeout(() => {
        setStep('SUCCESS');
        setTimeout(() => {
            onLoginSuccess(email);
            onClose();
        }, 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-10 overflow-hidden shadow-2xl transition-colors duration-500"
          >
            <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white z-10">
              <X size={20} />
            </button>

            <div className="mt-4">
                {/* STEP 1: EMAIL INPUT */}
                {step === 'EMAIL' && (
                    <motion.form 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSendOTP}
                    >
                        <h2 className="text-2xl font-serif text-black dark:text-white mb-2">Member Login</h2>
                        <p className="text-black/50 dark:text-white/50 font-sans text-xs mb-8 leading-relaxed">
                            Enter your email to receive a secure login code. No password required.
                        </p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    autoFocus
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-black/10 text-black dark:bg-white/5 dark:border-white/10 rounded-lg px-4 py-3 dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/40 dark:focus:border-white/40 focus:bg-white/10 transition-all"
                                />
                            </div>
                            
                            {error && <p className="text-red-500 text-xs">{error}</p>}

                            <Button className="w-full justify-center">
                                Send Code <ArrowRight size={14} className="ml-2"/>
                            </Button>
                        </div>
                    </motion.form>
                )}

                {/* STEP 2: LOADING / SENDING */}
                {(step === 'SENDING' || step === 'VERIFYING') && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <Loader2 className="animate-spin text-black/60 dark:text-white/60 mb-4" size={32} />
                        <p className="text-black/60 dark:text-white/60 text-xs uppercase tracking-widest">
                            {step === 'SENDING' ? 'Sending Code...' : 'Verifying...'}
                        </p>
                    </motion.div>
                )}

                {/* STEP 3: OTP INPUT */}
                {step === 'OTP' && (
                    <motion.form 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleVerifyOTP}
                    >
                        <h2 className="text-2xl font-serif text-black dark:text-white mb-2">Check your Inbox</h2>
                        <p className="text-black/50 dark:text-white/50 font-sans text-xs mb-8 leading-relaxed">
                            We've sent a 6-digit code to <span className="text-black dark:text-white">{email}</span>.
                        </p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Secure Code</label>
                                <input 
                                    type="text" 
                                    autoFocus
                                    placeholder="123456"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    className="w-full bg-gray-50 border border-black/10 text-black dark:bg-white/5 dark:border-white/10 rounded-lg px-4 py-3 dark:text-white placeholder-black/20 dark:placeholder-white/20 text-center tracking-[0.5em] text-lg focus:outline-none focus:border-black/40 dark:focus:border-white/40 focus:bg-white/10 transition-all"
                                />
                            </div>

                            {error && <p className="text-red-500 text-xs">{error}</p>}

                            <Button className="w-full justify-center">
                                Verify Access
                            </Button>
                            
                            <button 
                                type="button"
                                onClick={() => setStep('EMAIL')}
                                className="w-full text-center text-[10px] uppercase tracking-widest text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white transition-colors"
                            >
                                Wrong Email?
                            </button>
                        </div>
                    </motion.form>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 'SUCCESS' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="flex flex-col items-center justify-center py-6 text-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mb-4 text-black dark:text-white">
                            <Check size={24} />
                        </div>
                        <h2 className="text-2xl font-serif text-black dark:text-white mb-2">Access Granted</h2>
                        <p className="text-black/50 dark:text-white/50 text-xs">Entering the garage...</p>
                    </motion.div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};