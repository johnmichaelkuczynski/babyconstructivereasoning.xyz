import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Scene1({ setCursorPos, setIsClicking }: { setCursorPos: (pos: {x: string, y: string}) => void, setIsClicking: (val: boolean) => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 8000ms duration total
    setCursorPos({ x: '80vw', y: '20vh' });

    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 7000), // Pre-exit
    ];

    return () => timers.forEach(clearTimeout);
  }, [setCursorPos]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full bg-[#fdfaf5] flex flex-col items-center justify-center p-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Decorative top elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-16 bg-[#1e293b] text-white rounded-full flex items-center justify-center text-2xl font-serif mb-8 shadow-lg"
        >
          CCR
        </motion.div>

        <motion.h1 
          className="text-6xl font-serif text-[#1e293b] leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Constructive Critical Reasoning
        </motion.h1>

        <motion.div
          className="w-24 h-1 bg-[#e2e8f0] mb-8"
          initial={{ scaleX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        <motion.p
          className="text-2xl text-[#475569] max-w-2xl font-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Where the strongest honest conclusion, not the safest hedge, earns the grade.
        </motion.p>

        <motion.div
          className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[#64748b] text-lg italic">
            "Hedging is the failure mode. The boldest, most-falsifiable conclusion the evidence supports earns top credit."
          </p>
        </motion.div>
      </div>
      
      {/* Background accents */}
      <motion.div 
        className="absolute w-[80vw] h-[80vw] rounded-full border border-[#1e293b]/5 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: phase >= 1 ? 1.2 : 0.8, opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 10, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[120vw] h-[120vw] rounded-full border border-[#1e293b]/5 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: phase >= 2 ? 1.1 : 0.8, opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 12, ease: "linear" }}
      />
    </motion.div>
  );
}