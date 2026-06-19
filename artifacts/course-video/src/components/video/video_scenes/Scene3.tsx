import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-7xl flex flex-col h-full justify-center relative z-10">
        <motion.h2 
          className="text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Adaptive Practice & Homework
        </motion.h2>

        <div className="grid grid-cols-3 gap-6">
          {['Multiple Choice', 'Hybrid', 'Written'].map((format, i) => (
            <motion.div 
              key={format}
              className="bg-white p-6 rounded-xl border border-[var(--color-secondary)] shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
            >
              <div className="w-12 h-12 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-[var(--color-primary)] font-bold">
                0{i+1}
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">{format}</h3>
              <div className="text-sm text-[var(--color-text-secondary)]">Pick your format for each section's graded homework. Single attempt.</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 bg-white/60 p-6 rounded-xl border border-[var(--color-accent)] backdrop-blur-sm mx-auto max-w-3xl flex items-center gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-primary)]">Adaptive Practice</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Problems scale in difficulty based on your streak. Immediate feedback on every answer.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
