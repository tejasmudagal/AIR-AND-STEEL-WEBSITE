import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  // Changed rounded-full to rounded-lg for bevelled corners
  const baseStyle = "px-8 py-3 rounded-lg text-sm uppercase tracking-widest font-sans font-medium transition-all duration-300 ease-out backdrop-blur-sm relative overflow-hidden flex items-center justify-center";
  
  const variants = {
    // Primary: Black on Light, White on Dark
    primary: "bg-black text-white border border-black hover:bg-black/90 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:bg-white dark:text-black dark:border-white dark:hover:bg-white dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]",
    
    // Secondary: Light Gray on Light, Glass on Dark
    secondary: "bg-black/5 text-black border border-black/5 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/20 dark:hover:border-white/40",
    
    // Outline: Black border on Light, White border on Dark
    outline: "bg-transparent border border-black/20 text-black hover:border-black hover:bg-black/5 dark:border-white/40 dark:text-white dark:hover:border-white dark:hover:bg-white/10",
    
    // Text: Dark text on Light, White text on Dark
    text: "px-0 py-2 text-black/60 hover:text-black border-b border-transparent hover:border-black/50 dark:text-white/70 dark:hover:text-white dark:hover:border-white/50 rounded-none shadow-none hover:shadow-none justify-start",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};