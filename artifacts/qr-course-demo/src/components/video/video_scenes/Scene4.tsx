import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene4({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '65vw', y: '90vh' }); 
    
    const t1 = setTimeout(() => {
      setCursorPos({ x: '10vw', y: '30vh' }); 
    }, 500);

    const t2 = setTimeout(() => {
      setIsClicking(true);
      setPhase(1); 
    }, 1500);

    const t3 = setTimeout(() => {
      setIsClicking(false);
      setPhase(2); 
    }, 1700);

    const t4 = setTimeout(() => {
      setCursorPos({ x: '70vw', y: '50vh' }); 
    }, 4000);

    const t5 = setTimeout(() => {
      setIsClicking(true);
      setPhase(3); 
    }, 5500);

    const t6 = setTimeout(() => {
      setIsClicking(false);
      setPhase(4); 
    }, 6000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6);
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <motion.div 
            className="w-full h-full p-12 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif text-[#1e293b] mb-4 tracking-tight">Homework 1.1</h1>
            <p className="text-[#64748b] mb-8 max-w-2xl text-lg">Pick how you want to answer. You get <strong>one graded attempt</strong> — once you submit, this homework locks.</p>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm hover:border-[#1e293b] transition-colors">
                <h4 className="font-serif text-xl mb-2 text-[#1e293b]">Multiple Choice</h4>
                <p className="text-[#64748b] text-sm mb-4">Pick the strongest conclusion for each scenario. No typing.</p>
                <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">8 Questions</div>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm hover:border-[#1e293b] transition-colors">
                <h4 className="font-serif text-xl mb-2 text-[#1e293b]">Hybrid</h4>
                <p className="text-[#64748b] text-sm mb-4">Mostly multiple choice, with a few one-to-two sentence written answers.</p>
                <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">6 Questions</div>
              </div>
              <motion.div 
                className={`bg-white border p-6 rounded-xl shadow-sm transition-colors cursor-pointer ${phase >= 3 ? 'border-[#1e293b] bg-[#f1f5f9]' : 'border-[#e2e8f0]'}`}
              >
                <h4 className="font-serif text-xl mb-2 text-[#1e293b]">Written</h4>
                <p className="text-[#64748b] text-sm mb-4">Short written answers — commit to a conclusion and the test that would falsify it.</p>
                <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">4 Questions</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div 
            className="w-full h-full p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-4 mb-8">
              <div>
                <h1 className="text-3xl font-serif font-bold text-[#1e293b]">Homework 1.1</h1>
                <p className="text-sm text-[#64748b]">Question 1 of 4</p>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-3xl text-lg text-[#1e293b] mb-8">
              <p>Scenario: A study finds that regions with more coffee shops have higher rates of patent filings per capita. Provide a fecund lead that explains this, and state exactly what data would falsify your model.</p>
            </div>
            
            <div className="w-full h-40 border border-[#e2e8f0] rounded-xl bg-white shadow-inner p-4 text-[#64748b] text-lg">
              Type your answer...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
