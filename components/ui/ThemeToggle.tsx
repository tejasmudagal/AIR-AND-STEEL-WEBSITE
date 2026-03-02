import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-2xl group overflow-hidden border bg-white/80 border-black/10 text-black hover:bg-black hover:text-white dark:bg-zinc-900/80 dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
        <div className="relative w-5 h-5">
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon size={20} />
            </motion.div>
            <motion.div
                 initial={false}
                 animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
                 className="absolute inset-0 flex items-center justify-center"
            >
                <Sun size={20} />
            </motion.div>
        </div>
        
        {/* Hover Label */}
        <span className="absolute right-14 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
    </motion.button>
  );
};