import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center p-8 lg:p-16"
      initial={{ opacity: 0, rotateY: -10 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 10 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center relative z-10">
        <div className="h-[60vh] bg-white rounded-xl shadow-2xl border border-[var(--color-secondary)] p-6 flex flex-col">
          <motion.div 
            className="font-serif font-bold text-xl border-b pb-4 mb-4"
            initial={{ opacity: 0 }} animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
          >
            Topic Mastery
          </motion.div>
          <div className="space-y-4 flex-1">
            {[
              { topic: 'Abductive Commitment', acc: 92, status: 'Strong' },
              { topic: 'Explanatory Yield', acc: 85, status: 'Strong' },
              { topic: 'Calibrated Boldness', acc: 65, status: 'Developing' },
            ].map((row, i) => (
              <motion.div 
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.15 }}
              >
                <span className="font-medium text-sm">{row.topic}</span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>{row.acc}%</span>
                  <span className={`px-2 py-1 rounded uppercase tracking-wider ${row.status === 'Strong' ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]' : 'bg-[var(--color-warning)]/20 text-orange-700'}`}>{row.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 
            className="text-4xl font-serif font-bold text-[var(--color-primary)] mb-4"
            initial={{ opacity: 0, x: 30 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          >
            Analytics & Diagnostics
          </motion.h2>
          <motion.p
            className="text-lg text-[var(--color-text-secondary)] mb-8"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          >
            Track your progress across all eight sub-skills. Generate narrative AI reports on your performance strengths and weaknesses.
          </motion.p>
          <motion.div
            className="bg-white p-5 rounded-lg border border-[var(--color-secondary)] shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <div className="text-sm font-bold text-[var(--color-primary)] mb-2">Four-Phase Diagnostic Assessments</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Includes operator self-tests and synthetic-student end-to-end runs.</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
