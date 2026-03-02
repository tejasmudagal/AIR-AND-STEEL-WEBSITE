import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserSession } from '../../types';
import { LogOut, Package, CreditCard, User, MapPin, ChevronRight, CheckCircle2, Save, X, Bell } from 'lucide-react';

interface DashboardViewProps {
  user: UserSession;
  onLogout: () => void;
  onRead: (id: number) => void;
  onOpenAuth: () => void;
}

// Mock Data
const VOLUMES = [
  { id: 1, title: 'Volume One: Origin', status: 'Owned', description: 'The inaugural issue. 140 pages exploring the origins of speed.' },
  { id: 2, title: 'Volume Two: Night', status: 'Coming Soon', description: 'Tokyo highways and underground drift culture.' },
  { id: 3, title: 'Volume Three: Dust', status: 'Locked', description: 'Rally heritage and the Sahara crossing.' },
  { id: 4, title: 'Volume Four: Ice', status: 'Locked', description: 'Scandinavian flick. Frozen lakes and spiked tires.' },
];

const HISTORY = [
  { id: 'ORD-7782', date: 'Oct 24', item: 'Vol. 1 (Print)', status: 'Delivered' },
  { id: 'ORD-9921', date: 'Oct 24', item: 'Vol. 1 (Digital)', status: 'Fulfilled' },
];

const EXTRA_HISTORY = [
    { id: 'ORD-5541', date: 'Sep 24', item: 'Founder Pass', status: 'Active' },
    { id: 'ORD-1120', date: 'Aug 24', item: 'Pre-Order Vol 1', status: 'Processed' },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ user, onLogout, onRead, onOpenAuth }) => {
  const [selectedVolume, setSelectedVolume] = useState(VOLUMES[0]);
  
  // Interactive States
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notifiedVolumes, setNotifiedVolumes] = useState<number[]>([]);
  
  // State to track if a user tried to notify while logged out
  const [pendingNotifyId, setPendingNotifyId] = useState<number | null>(null);
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    line1: '124, Hauz Khas Village',
    line2: 'New Delhi, 110016'
  });

  const activeHistory = showAllOrders ? [...HISTORY, ...EXTRA_HISTORY] : HISTORY;

  // Effect: Handle pending notification after successful login
  useEffect(() => {
    if (user.isLoggedIn && pendingNotifyId !== null) {
        if (!notifiedVolumes.includes(pendingNotifyId)) {
            setNotifiedVolumes(prev => [...prev, pendingNotifyId]);
        }
        setPendingNotifyId(null); // Clear pending action
    }
  }, [user.isLoggedIn, pendingNotifyId, notifiedVolumes]);

  const handleNotify = (id: number) => {
    if (!user.isLoggedIn) {
        setPendingNotifyId(id); // Set intent
        onOpenAuth(); // Trigger Auth Modal
        return;
    }

    if (!notifiedVolumes.includes(id)) {
        setNotifiedVolumes([...notifiedVolumes, id]);
    }
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // In a real app, save to backend here
  };

  return (
    <div className="pt-28 min-h-screen bg-premium-paper dark:bg-[#050505] font-sans pb-20 transition-colors duration-500">
      <div className="container mx-auto px-8 md:px-12 max-w-7xl">

        {/* HEADER: Identity & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-2 block">
                    Control
                </span>
                <h1 className="text-2xl md:text-4xl font-bold text-black dark:text-white tracking-tighter">
                    COCKPIT: {user.name || 'Member'}.
                </h1>
            </div>
            <button 
                onClick={onLogout} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-400 transition-colors flex items-center gap-2 border border-transparent hover:border-red-600/20 dark:hover:border-red-400/20 px-4 py-2 rounded-lg"
            >
                Eject <LogOut size={12} />
            </button>
        </div>

        {/* MAIN LAYOUT: 1 Col Mobile, 2 Col Tablet, 12 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
            
            {/* PRIMARY COLUMN (Content & Reading) - Span 8 on Desktop, 1 on Tablet */}
            <div className="md:col-span-2 lg:col-span-8 flex flex-col gap-8 md:gap-10">
                
                {/* 1. FEATURED / SELECTED VOLUME */}
                <motion.div 
                    key={selectedVolume.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl transition-colors duration-500 min-h-[400px]"
                >
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Cover Image Area */}
                        <div className="w-full md:w-5/12 aspect-[3/4] md:aspect-auto bg-gray-200 dark:bg-zinc-900 relative border-r border-black/5 dark:border-white/5 group">
                             {/* Placeholder visual */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-8xl font-bold text-black/5 dark:text-white/5">{selectedVolume.id}</span>
                            </div>
                            {/* Decorative noise/gradient */}
                            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            
                            <div className="absolute top-4 left-4">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border backdrop-blur-md ${
                                    selectedVolume.status === 'Owned' 
                                    ? 'bg-black/80 text-white dark:bg-white/90 dark:text-black border-transparent' 
                                    : 'bg-white/50 dark:bg-black/50 text-black/60 dark:text-white/60 border-black/10 dark:border-white/10'
                                }`}>
                                    {selectedVolume.status}
                                </span>
                            </div>
                        </div>

                        {/* Details Area */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-auto">
                                <h2 className="text-xl md:text-3xl font-bold text-black dark:text-white mb-4 tracking-tighter">
                                    {selectedVolume.title}
                                </h2>
                                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-6 font-medium">
                                    {selectedVolume.description}
                                </p>
                            </div>
                            
                            <div className="space-y-6 pt-8 border-t border-black/5 dark:border-white/5 mt-8 md:mt-0">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40">
                                    <span>Format: Digital & Print</span>
                                    <span>Released: Oct 2024</span>
                                </div>
                                
                                {selectedVolume.status === 'Owned' ? (
                                    <button 
                                        onClick={() => onRead(selectedVolume.id)}
                                        className="w-full bg-black text-white dark:bg-white dark:text-black h-12 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black/90 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Read Issue <ChevronRight size={14} />
                                    </button>
                                ) : selectedVolume.status === 'Coming Soon' ? (
                                    <button 
                                        onClick={() => handleNotify(selectedVolume.id)}
                                        disabled={notifiedVolumes.includes(selectedVolume.id)}
                                        className={`w-full h-12 rounded-lg text-xs font-bold uppercase tracking-widest border flex items-center justify-center gap-2 transition-all ${
                                            notifiedVolumes.includes(selectedVolume.id)
                                            ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                            : 'bg-transparent border-black/20 text-black/60 hover:border-black hover:text-black dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white'
                                        }`}
                                    >
                                        {notifiedVolumes.includes(selectedVolume.id) ? (
                                            <>On Waitlist <CheckCircle2 size={14} /></>
                                        ) : (
                                            <>Notify Me <Bell size={14} /></>
                                        )}
                                    </button>
                                ) : (
                                    <button 
                                        disabled
                                        className="w-full bg-black/5 text-black/40 dark:bg-white/5 dark:text-white/40 h-12 rounded-lg text-xs font-bold uppercase tracking-widest cursor-not-allowed border border-black/5 dark:border-white/5 flex items-center justify-center gap-2"
                                    >
                                        Access Locked
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. COLLECTION STRIP - Stretches across full width on tablet */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-6 flex items-center gap-2">
                        <Package size={12} />
                        Acquisitions
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {VOLUMES.map((vol) => (
                            <div 
                                key={vol.id}
                                onClick={() => setSelectedVolume(vol)}
                                className={`group cursor-pointer relative aspect-[3/4] rounded-lg border overflow-hidden transition-all duration-300 ${
                                    selectedVolume.id === vol.id 
                                    ? 'border-black dark:border-white ring-1 ring-black dark:ring-white scale-100 opacity-100' 
                                    : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100 hover:border-black/30 dark:hover:border-white/30 scale-95 hover:scale-100'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
                                    <span className="text-lg font-bold text-black/20 dark:text-white/20">{vol.id}</span>
                                </div>
                                {selectedVolume.id === vol.id && (
                                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />
                                )}
                                {/* Status Dot */}
                                {vol.status === 'Owned' && (
                                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* SECONDARY COLUMN (Utilities) - Span 4 on Desktop, split into 2 cols on Tablet */}
            <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 content-start">

                {/* 1. MEMBERSHIP CARD */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-black text-white rounded-2xl p-8 relative overflow-hidden shadow-xl border border-white/10"
                >
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                <CreditCard size={12} /> Status
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                                <CheckCircle2 size={10} /> Active
                            </span>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold tracking-tight mb-1">Founding Member</h3>
                            <p className="text-white/40 text-xs">Valid thru 12/25</p>
                        </div>
                    </div>
                </motion.div>

                {/* Wrapper for Recent Orders & Profile on Tablet to sit side-by-side or stacked depending on height */}
                <div className="contents md:flex md:flex-col lg:contents gap-6">

                {/* 2. RECENT ORDERS */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl p-8 transition-colors duration-500"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Manifest</h3>
                        <button 
                            onClick={() => setShowAllOrders(!showAllOrders)}
                            className="text-[10px] text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors uppercase tracking-widest"
                        >
                            {showAllOrders ? 'Show Less' : 'View All'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {activeHistory.map((order) => (
                                <motion.div 
                                    key={order.id} 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="group flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black/40 dark:text-white/40">
                                            <Package size={14} />
                                        </div>
                                        <div>
                                            <p className="text-black dark:text-white text-xs font-bold">{order.item}</p>
                                            <p className="text-black/30 dark:text-white/30 text-[10px] uppercase tracking-wide">{order.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-black/60 dark:text-white/60">{order.status}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* 3. PROFILE SNAPSHOT */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-50 dark:bg-[#0f0f0f] border border-black/5 dark:border-white/5 rounded-2xl p-8 transition-colors duration-500"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Coordinates</h3>
                        {isEditingProfile && (
                            <button 
                                onClick={() => setIsEditingProfile(false)}
                                className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 flex items-center justify-center text-black/40 dark:text-white/40 mt-1 shrink-0">
                            <MapPin size={14} />
                        </div>
                        <div className="w-full">
                            <p className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest mb-2">Primary Address</p>
                            
                            {isEditingProfile ? (
                                <div className="space-y-3">
                                    <input 
                                        type="text" 
                                        value={profileData.line1}
                                        onChange={(e) => setProfileData({...profileData, line1: e.target.value})}
                                        className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded px-2 py-1 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40"
                                    />
                                    <input 
                                        type="text" 
                                        value={profileData.line2}
                                        onChange={(e) => setProfileData({...profileData, line2: e.target.value})}
                                        className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded px-2 py-1 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40"
                                    />
                                    <button 
                                        onClick={handleSaveProfile}
                                        className="w-full mt-2 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest py-2 rounded hover:opacity-90 flex items-center justify-center gap-2"
                                    >
                                        Save Changes <Save size={12} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-black dark:text-white text-sm leading-relaxed font-medium">
                                        {profileData.line1}<br/>
                                        {profileData.line2}
                                    </p>
                                    <button 
                                        onClick={() => setIsEditingProfile(true)}
                                        className="text-[10px] text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors uppercase tracking-widest mt-4 underline underline-offset-4 decoration-black/10 dark:decoration-white/10 hover:decoration-black/40 dark:hover:decoration-white/40"
                                    >
                                        Update
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};