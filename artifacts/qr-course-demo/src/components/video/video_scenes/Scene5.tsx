import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from '../TypewriterText';

export function Scene5({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '70vw', y: '50vh' }); 
    
    const t1 = setTimeout(() => {
      setPhase(1); 
    }, 500);

    const t2 = setTimeout(() => {
      setCursorPos({ x: '20vw', y: '70vh' }); 
    }, 3000);

    const t3 = setTimeout(() => {
      setIsClicking(true);
      setPhase(2); 
    }, 4500);

    const t4 = setTimeout(() => {
      setIsClicking(false);
      setPhase(3); 
    }, 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5] flex flex-col p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-serif text-[#1e293b] mb-8 tracking-tight">Inverted Partial-Credit Grading</h1>
      
      <div className="flex gap-8 w-full h-full">
        {/* Answer 1: Hedge */}
        <motion.div 
          className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-8 flex flex-col"
          animate={phase >= 2 ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <div className="mb-4">
            <span className="text-sm font-semibold text-[#64748b]">Cautious Hedge</span>
          </div>
          <div className="text-lg text-[#1e293b] mb-8 italic border-l-4 border-[#e2e8f0] pl-4">
            "We can't really conclude anything. Correlation is not causation, and many factors influence patents. It might be demographics or just a coincidence."
          </div>
          <div className="mt-auto">
            <div className="text-sm font-semibold text-red-600 mb-2">Score: 10% credit</div>
            <div className="text-sm text-[#334155] bg-red-50 p-4 rounded-lg border border-red-100">
              This is a zero-risk hedge. It binds to no specific model, anticipates no new data, and is impossible to decisively falsify. The safest answer earns the lowest grade.
            </div>
          </div>
        </motion.div>

        {/* Answer 2: Bold */}
        <motion.div 
          className={`flex-1 bg-white border rounded-xl shadow-sm p-8 flex flex-col transition-colors ${phase >= 3 ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-[#e2e8f0]'}`}
        >
          <div className="mb-4">
            <span className="text-sm font-semibold text-[#64748b]">Fecund Lead</span>
          </div>
          <div className="text-lg text-[#1e293b] mb-8 italic border-l-4 border-emerald-200 pl-4">
            {phase >= 1 && <TypewriterText text='"The presence of coffee shops indicates specialized service hubs, which cluster near universities and tech parks. The driving mechanism is localized high-skill human capital density. Falsification: If patent rates remain high in regions with coffee shops but low tech-sector employment, this model breaks."' speed={20} />}
          </div>
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div 
                className="mt-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-sm font-semibold text-emerald-600 mb-2">Score: 100% credit</div>
                <div className="text-sm text-[#334155] bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  Excellent. You committed to a specific, risky underlying mechanism (human capital clustering) and clearly defined exactly what data would prove you wrong.
                </div>
                
                <div className="mt-4 flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#64748b]">GPTZero & Keystroke-pattern detectors: passed</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
