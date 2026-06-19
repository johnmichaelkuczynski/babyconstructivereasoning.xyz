import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-7xl grid grid-cols-12 gap-8 h-full items-center">
        {/* Left text */}
        <div className="col-span-5 pr-8 relative z-10">
          <motion.h2 
            className="text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            Eight rigorous sections.
          </motion.h2>
          <motion.p
            className="text-lg lg:text-xl text-[var(--color-text-secondary)] mb-8"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          >
            Every lesson available at three depths. Choose your intensity: Short, Medium, or Long.
          </motion.p>
        </div>

        {/* Right UI Mockup */}
        <div className="col-span-7 h-[70vh] relative">
          <motion.div 
            className="w-full h-full bg-white rounded-xl shadow-2xl border border-[var(--color-secondary)] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, rotateY: 10, perspective: 1000 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.95, rotateY: 10 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-12 border-b border-[var(--color-secondary)] flex items-center px-4 justify-between bg-[var(--color-bg-light)]">
              <div className="font-serif font-bold text-sm">Unit 1: The Fecund Lead</div>
              <div className="flex rounded-md border border-[var(--color-secondary)] overflow-hidden text-xs">
                <div className="px-3 py-1 bg-[var(--color-primary)] text-white font-medium uppercase tracking-wider">Short</div>
                <div className="px-3 py-1 bg-white text-[var(--color-text-secondary)] font-medium uppercase tracking-wider">Medium</div>
                <div className="px-3 py-1 bg-white text-[var(--color-text-secondary)] font-medium uppercase tracking-wider">Long</div>
              </div>
            </div>
            <div className="p-8 flex-1 relative overflow-hidden">
              <motion.div 
                className="h-4 w-3/4 bg-slate-200 rounded mb-4"
                initial={{ width: 0 }}
                animate={phase >= 2 ? { width: '75%' } : { width: 0 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div 
                className="h-3 w-full bg-slate-100 rounded mb-2"
                initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
              />
              <motion.div 
                className="h-3 w-5/6 bg-slate-100 rounded mb-6"
                initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
              />

              {/* AI Tutor Callout */}
              <motion.div 
                className="absolute right-4 top-24 w-64 bg-[var(--color-primary)] text-white p-4 rounded-lg shadow-xl text-sm"
                initial={{ opacity: 0, x: 50 }}
                animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="font-bold mb-2">AI Tutor</div>
                <div className="opacity-80 leading-relaxed">Highlight any passage to ask the tutor for clarification or to generate practice problems specifically on what you selected.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
