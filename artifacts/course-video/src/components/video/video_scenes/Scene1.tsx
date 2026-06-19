import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-4xl relative z-10">
        <motion.div
          className="w-16 h-16 rounded-sm bg-[var(--color-primary)] mx-auto mb-6 flex items-center justify-center text-[var(--color-text-inverse)] font-serif text-3xl font-bold"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          CCR
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-bold text-[var(--color-primary)] leading-tight tracking-tight"
        >
          {'Constructive Critical Reasoning'.split(' ').map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block mr-[2vw]"
              initial={{ opacity: 0, y: 40 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-[var(--color-text-secondary)] mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8 }}
        >
          A self-paced, AI-powered discipline in committing to the richest, most-falsifiable conclusion the evidence supports.
        </motion.p>
      </div>
    </motion.div>
  );
}
