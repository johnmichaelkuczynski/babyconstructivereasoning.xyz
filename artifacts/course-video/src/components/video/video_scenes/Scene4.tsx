import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 4000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-5xl relative z-10 text-center">
        <motion.h2 
          className="text-4xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        >
          Inverted Grading
        </motion.h2>
        <motion.p
          className="text-lg lg:text-xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        >
          The boldest well-supported model earns top credit.
        </motion.p>

        <div className="space-y-4 text-left max-w-3xl mx-auto">
          {[
            { label: 'Bold, supported claim', points: '100% Credit', color: 'bg-[var(--color-success)]', width: '100%' },
            { label: 'Refusal to conclude ("could be anything")', points: 'Near Zero', color: 'bg-slate-300', width: '20%' },
            { label: 'Overreach defeated by data', points: 'Zero', color: 'bg-[var(--color-error)]', width: '5%' },
          ].map((bar, i) => (
            <div key={i} className="relative">
              <motion.div 
                className="flex items-center justify-between mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.2 }}
              >
                <span className="font-semibold text-sm">{bar.label}</span>
                <span className="text-sm font-mono text-[var(--color-text-secondary)]">{bar.points}</span>
              </motion.div>
              <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <motion.div 
                  className={`h-full ${bar.color}`}
                  initial={{ width: 0 }}
                  animate={phase >= 3 ? { width: bar.width } : { width: 0 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: i * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          className="mt-12 inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg shadow-xl text-sm font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          AI Authorship Detection verifies every submission.
        </motion.div>
      </div>
    </motion.div>
  );
}
