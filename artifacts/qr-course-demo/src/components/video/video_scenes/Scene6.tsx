import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene6({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '10vw', y: '30vh' }); 
    
    const t1 = setTimeout(() => {
      setIsClicking(true);
      setPhase(1); 
    }, 1500);

    const t2 = setTimeout(() => {
      setIsClicking(false);
      setPhase(2); 
    }, 1700);

    const t3 = setTimeout(() => {
      setPhase(3); 
    }, 3000);

    const t4 = setTimeout(() => {
      setPhase(4); 
    }, 8000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {phase >= 2 && phase < 4 && (
          <motion.div 
            key="analytics"
            className="w-full h-full p-12 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-serif text-[#1e293b] mb-8 tracking-tight">Analytics & Diagnostics</h1>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm text-center">
                <div className="text-xs uppercase text-[#64748b] font-bold mb-2">Attempts</div>
                <div className="text-4xl font-light text-[#1e293b]">24</div>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm text-center">
                <div className="text-xs uppercase text-[#64748b] font-bold mb-2">Accuracy</div>
                <div className="text-4xl font-light text-[#1e293b]">87%</div>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm text-center">
                <div className="text-xs uppercase text-[#64748b] font-bold mb-2">Streak</div>
                <div className="text-4xl font-light text-[#1e293b]">5 Days</div>
              </div>
              <div className="bg-[#1e293b] p-6 rounded-xl shadow-sm text-center text-white">
                <div className="text-xs uppercase font-bold mb-2 opacity-80">Reasoning Instrument</div>
                <div className="text-xl font-serif mt-2">Phase 3</div>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e2e8f0] bg-[#f1f5f9]">
                <h3 className="font-serif text-xl text-[#1e293b]">Per-Section Mastery</h3>
              </div>
              
              <div className="divide-y divide-[#e2e8f0]">
                {[
                  { topic: '1.1 The Fecund Lead', status: 'STRONG', color: 'text-emerald-700 bg-emerald-50' },
                  { topic: '1.2 Model Selection by Explanatory Yield', status: 'DEVELOPING', color: 'text-amber-700 bg-amber-50' },
                  { topic: '1.3 Parsimony as a Live Constraint', status: 'UNTESTED', color: 'text-[#64748b] bg-[#f1f5f9]' },
                ].map((row, i) => (
                  <motion.div 
                    key={i}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={phase >= 3 ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: phase >= 3 ? i * 0.1 : 0 }}
                  >
                    <div className="col-span-8 font-medium text-[#1e293b]">{row.topic}</div>
                    <div className="col-span-4 text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wider ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div 
            key="outro"
            className="absolute inset-0 bg-[#1e293b] flex flex-col items-center justify-center text-center p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-serif font-bold text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              CCR
            </motion.h1>
            <motion.p 
              className="text-2xl text-white/80 max-w-3xl italic font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              "Where the strongest honest conclusion, not the safest hedge, earns the grade."
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
