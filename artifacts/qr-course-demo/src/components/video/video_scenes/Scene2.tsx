import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene2({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '50vw', y: '50vh' }); 
    
    const t1 = setTimeout(() => {
      setCursorPos({ x: '35vw', y: '40vh' }); 
    }, 1500);

    const t2 = setTimeout(() => {
      setIsClicking(true);
      setPhase(1); 
    }, 2800);

    const t3 = setTimeout(() => {
      setIsClicking(false);
    }, 3000);

    const t4 = setTimeout(() => {
      setCursorPos({ x: '45vw', y: '23vh' }); 
    }, 4500);

    const t5 = setTimeout(() => {
      setIsClicking(true);
      setPhase(2); 
    }, 5500);

    const t6 = setTimeout(() => {
      setIsClicking(false);
      setPhase(3); 
    }, 5700);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); 
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {phase < 1 ? (
          <motion.div
            key="dashboard"
            className="w-full h-full p-12"
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-serif text-[#1e293b] mb-8 tracking-tight">Course Schedule</h1>
            
            <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm w-3/4">
              <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">Unit 1</div>
              <h4 className="font-serif text-2xl mb-4 text-[#1e293b]">Core Foundations</h4>
              
              <div className="divide-y divide-[#e2e8f0]">
                {['1.1 The Fecund Lead', '1.2 Model Selection by Explanatory Yield', '1.3 Parsimony as a Live Constraint', '1.4 Abductive Commitment', '1.5 From Correlation to Mechanism', '1.6 The Anomaly Cluster', '1.7 The Cheap Decisive Test', '1.8 Calibrated Boldness'].map((title, i) => (
                  <div key={i} className={`px-4 py-3 flex items-center justify-between ${i === 0 ? 'bg-[#f1f5f9] cursor-pointer' : 'opacity-80'}`}>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-[#1e293b]">{title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="lecture"
            className="w-full h-full p-12 overflow-hidden flex flex-col relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-bold tracking-widest text-[#64748b] mb-4 uppercase">Unit 1</div>
            <h1 className="text-4xl font-serif text-[#1e293b] mb-6">1.1 The Fecund Lead</h1>
            
            <div className="flex bg-[#f1f5f9] rounded-lg p-1 w-fit mb-8 border border-[#e2e8f0]">
              <div className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${phase < 2 ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b]'}`}>Short</div>
              <div className="px-4 py-1.5 rounded-md text-sm font-medium text-[#64748b]">Medium</div>
              <div className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${phase >= 2 ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b]'}`}>Long</div>
            </div>

            <div className="prose prose-sm max-w-2xl text-[#334155] space-y-6 text-lg">
              <p>
                In constructing an argument, evidence alone is inert. It requires a generative hypothesis to bind it—a "fecund lead" that not only explains the available data but anticipates new, distinct phenomena.
              </p>
              
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <p>
                      A barren hypothesis merely retrofits itself to what is already known, offering no predictive leverage. The fecund lead, by contrast, takes risks. It commits to a specific underlying mechanism that makes it highly falsifiable.
                    </p>
                    <p>
                      We measure the strength of a model not by how safely it avoids contradiction, but by how much explanatory yield it produces before breaking. Hedging your claims reduces your risk of being wrong, but it completely destroys the utility of your model.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
