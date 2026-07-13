import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Slice, RotateCcw, Heart } from 'lucide-react';

export const CakeCutting: React.FC = () => {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  const triggerCakeCut = () => {
    setIsCutting(true);
    // Play synthesis chime sound for slice
    setTimeout(() => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {}
    }, 400);

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
    }, 1000);
  };

  const handleResetCake = () => {
    setIsCut(false);
    setIsCutting(false);
  };

  return (
    <section id="cake-cutting-surprise" className="py-20 px-4 bg-gradient-to-b from-transparent to-pink-50/20 relative z-20 text-center max-w-4xl mx-auto">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Slice size={12} /> Cutting Ceremony
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          Time to Share the Sweetness
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          No birthday is complete without sharing a slice! Click below to slide the knife and separate the cake!
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[360px] max-w-md mx-auto">
        {/* Confetti Princess Header on Cut */}
        <AnimatePresence>
          {isCut && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="absolute top-0 z-30 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-full px-6 py-2.5 shadow-xl font-bold font-mono tracking-widest text-xs flex items-center gap-1.5"
              id="princess-cheer-banner"
            >
              <Heart size={14} className="animate-pulse fill-white" />
              🍰 HAPPY BIRTHDAY PRINCESS ❤️
              <Heart size={14} className="animate-pulse fill-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Circular Platter */}
        <div className="relative w-64 h-64 bg-slate-100 rounded-full border-4 border-slate-200 flex items-center justify-center shadow-md overflow-hidden">
          {/* Slices Separation View */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* LEFT HALF OF CAKE */}
            <motion.div
              animate={{
                x: isCut ? -25 : 0,
                rotate: isCut ? -10 : 0,
              }}
              transition={{ type: 'spring', damping: 12, stiffness: 80 }}
              className="absolute left-0 w-24 h-48 overflow-hidden origin-right z-10 select-none"
            >
              {/* Full cake drawing shifted to align left portion */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-r-4 border-pink-300 relative flex items-center justify-center shadow-inner">
                {/* Topping strawberries */}
                <div className="absolute top-6 left-12 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                <div className="absolute top-24 left-6 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                <div className="absolute top-36 left-14 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                {/* White cream swirls decoration */}
                <div className="absolute inset-4 rounded-full border-2 border-white/30 border-dashed" />
                <span className="text-white text-xs font-mono font-bold tracking-widest uppercase rotate-90 ml-12 opacity-80">
                  Happy
                </span>
              </div>
            </motion.div>

            {/* RIGHT HALF OF CAKE */}
            <motion.div
              animate={{
                x: isCut ? 25 : 0,
                rotate: isCut ? 10 : 0,
              }}
              transition={{ type: 'spring', damping: 12, stiffness: 80 }}
              className="absolute right-0 w-24 h-48 overflow-hidden origin-left z-10 select-none"
            >
              {/* Full cake drawing shifted right */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-l-4 border-pink-300 relative flex items-center justify-center shadow-inner -translate-x-24">
                {/* Toppings right portion */}
                <div className="absolute top-8 right-12 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                <div className="absolute top-24 right-6 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                <div className="absolute top-36 right-14 w-4 h-4 rounded-full bg-red-500 border border-red-600" />
                {/* Cream swirls */}
                <div className="absolute inset-4 rounded-full border-2 border-white/30 border-dashed" />
                <span className="text-white text-xs font-mono font-bold tracking-widest uppercase -rotate-90 mr-12 opacity-80">
                  Bday!
                </span>
              </div>
            </motion.div>

            {/* KNIFE ANIMATION OVERLAY */}
            <AnimatePresence>
              {isCutting && (
                <motion.div
                  initial={{ y: -160, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: -45 }}
                  exit={{ y: 160, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute z-20 pointer-events-none"
                >
                  {/* Steel Knife visual */}
                  <div className="w-4 h-24 bg-gradient-to-r from-slate-300 to-slate-400 rounded shadow-md relative border-l-2 border-white/50">
                    <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-700 rounded-full border border-amber-800" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons Controls */}
        <div className="mt-8">
          {!isCut ? (
            <button
              onClick={triggerCakeCut}
              disabled={isCutting}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xs font-mono font-bold shadow-md shadow-pink-100 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 mx-auto"
              id="cut-cake-btn"
            >
              <Slice size={14} className="animate-pulse" />
              {isCutting ? "Cutting Cake..." : "🍰 Cut the Cake"}
            </button>
          ) : (
            <button
              onClick={handleResetCake}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 text-xs font-mono rounded-full border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
              id="bake-new-cake-btn"
            >
              <RotateCcw size={12} /> Bake Whole Cake
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
