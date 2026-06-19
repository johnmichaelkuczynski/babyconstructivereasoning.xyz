import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-12 bg-[var(--color-bg-dark)] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center relative z-10">
        <motion.div
          className="w-20 h-20 rounded-md bg-[var(--color-bg-light)] mx-auto mb-8 flex items-center justify-center text-[var(--color-primary)] font-serif text-4xl font-bold shadow-2xl"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          CCR
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-serif font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Constructive Critical Reasoning
        </motion.h1>

        <motion.p 
          className="text-xl text-slate-400 font-mono tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        >
          Available Now
        </motion.p>
      </div>
    </motion.div>
  );
}
