import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from '../TypewriterText';
import { StreamingText } from '../StreamingText';
import { TypingIndicator } from '../TypingIndicator';

export function Scene3({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCursorPos({ x: '60vw', y: '16vh' }); 
    
    const t1 = setTimeout(() => {
      setCursorPos({ x: '60vw', y: '85vh' }); 
      setPhase(1); 
    }, 1000);

    const t2 = setTimeout(() => {
      setCursorPos({ x: '92vw', y: '88vh' }); 
    }, 4000);

    const t3 = setTimeout(() => {
      setIsClicking(true);
      setPhase(2); 
    }, 4500);

    const t4 = setTimeout(() => {
      setIsClicking(false);
      setPhase(3); 
    }, 5500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [setCursorPos, setIsClicking]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5] flex"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-1/2 h-full border-r border-[#e2e8f0] p-12 overflow-hidden flex flex-col relative opacity-50">
        <div className="text-xs font-bold tracking-widest text-[#64748b] mb-4 uppercase">UNIT 1</div>
        <h1 className="text-4xl font-serif text-[#1e293b] mb-6">1.1 The Fecund Lead</h1>
        <div className="prose prose-sm max-w-none text-[#334155] space-y-6 text-lg">
          <p>A barren hypothesis merely retrofits itself to what is already known, offering no predictive leverage. The fecund lead, by contrast, takes risks. It commits to a specific underlying mechanism that makes it highly falsifiable.</p>
        </div>
      </div>

      <div className="w-1/2 h-full bg-white flex flex-col relative">
        <div className="flex border-b border-[#e2e8f0] px-4 pt-4 bg-[#fdfaf5]">
          <div className="px-6 py-3 font-medium text-sm border-b-2 border-[#1e293b] text-[#1e293b]">Ask the tutor</div>
          <div className="px-6 py-3 font-medium text-sm border-b-2 border-transparent text-[#64748b]">Practice on this</div>
        </div>

        <div className="flex-1 p-8 relative flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 flex flex-col">
            {phase >= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                className="self-end max-w-[85%] bg-[#1e293b] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm mt-auto"
              >
                But what if the evidence points to a safer, less bold claim?
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="self-start max-w-[85%]"
              >
                <TypingIndicator />
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="self-start w-[85%] bg-[#f1f5f9] border border-[#e2e8f0] p-5 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed shadow-sm text-[#1e293b]"
              >
                <StreamingText text="Then you commit to that claim—but only exactly as far as the evidence dictates. The goal isn't to be bold for the sake of being bold. The goal is to make the richest falsifiable statement the data supports, rather than padding your answer with hedges that make it impossible to prove you wrong." delay={0} />
              </motion.div>
            )}
          </div>

          <div className="mt-6 w-full min-h-24 border border-[#e2e8f0] rounded-xl bg-[#fdfaf5] p-3 flex items-end shadow-inner relative z-10">
            <div className="w-full flex justify-between items-center pr-2">
              <div className="text-[#1e293b] text-[15px] font-medium pl-2 relative w-full h-full flex items-center">
                {phase === 1 && <TypewriterText text="But what if the evidence points to a safer, less bold claim?" speed={25} />}
                {phase >= 2 && <span className="text-[#64748b] font-normal">Ask a question about this section...</span>}
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 ${phase === 1 ? 'bg-[#1e293b] text-white cursor-pointer shadow-md' : 'bg-[#e2e8f0] text-[#64748b] opacity-50'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
