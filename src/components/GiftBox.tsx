import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift } from 'lucide-react';

export const GiftBox: React.FC = () => {
  const [boxState, setBoxState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [clickCount, setClickCount] = useState(0);

  const handleBoxClick = () => {
    if (boxState === 'closed') {
      // Shakes on first click, opens on next, or directly
      if (clickCount < 1) {
        setClickCount((c) => c + 1);
        return;
      }
      setBoxState('opening');
      setTimeout(() => {
        setBoxState('opened');
      }, 1000); // lid fly off and ribbon untie animation duration
    }
  };

  const resetBox = () => {
    setBoxState('closed');
    setClickCount(0);
  };

  return (
    <section id="gift-surprise" className="py-20 px-4 max-w-4xl mx-auto relative z-20 text-center">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Gift size={12} /> Interactive Gift
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          Unwrap Your Special Birthday Blessing
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          I wrapped a beautiful blessing just for you. {boxState === 'closed' ? "Click the box twice to untie the ribbon and open it!" : "Look inside!"}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {boxState !== 'opened' ? (
            <motion.div
              key="closed-box"
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex flex-col items-center cursor-pointer select-none"
              onClick={handleBoxClick}
            >
              {/* Box pedestal shadows */}
              <div className="absolute bottom-[-10px] w-48 h-5 bg-pink-200/50 blur-lg rounded-full animate-pulse" />

              {/* Box Container with shake helper */}
              <div
                className={`relative w-48 h-48 transition-transform duration-300 ${
                  boxState === 'opening'
                    ? 'scale-105'
                    : clickCount > 0
                    ? 'animate-shake'
                    : 'hover:scale-105 animate-float'
                }`}
                id="interactive-gift-wrapper"
              >
                {/* SVG Gift Box */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                  {/* Box shadow base */}
                  <ellipse cx="100" cy="180" rx="60" ry="10" fill="rgba(0,0,0,0.1)" />

                  {/* Ribbon untying animation paths */}
                  {boxState === 'opening' ? (
                    <>
                      {/* Ribbon sliding away */}
                      <path d="M 50 110 Q 30 90 20 120" fill="none" stroke="#FFD700" strokeWidth="8" strokeLinecap="round" className="animate-fade-out" />
                      <path d="M 150 110 Q 170 90 180 120" fill="none" stroke="#FFD700" strokeWidth="8" strokeLinecap="round" className="animate-fade-out" />
                    </>
                  ) : (
                    <>
                      {/* Ribbon Bow ties */}
                      <path d="M 100 70 Q 70 30 100 50 Q 130 30 100 70" fill="#FFD700" stroke="#E6C200" strokeWidth="2.5" />
                      <path d="M 100 70 Q 60 40 85 60" fill="none" stroke="#FFD700" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 100 70 Q 140 40 115 60" fill="none" stroke="#FFD700" strokeWidth="8" strokeLinecap="round" />
                    </>
                  )}

                  {/* Lid (Top lid flying off in state opening) */}
                  <g className={boxState === 'opening' ? 'animate-lid-flyoff' : ''}>
                    {/* Lid Main */}
                    <rect x="35" y="70" width="130" height="25" rx="5" fill="#EC4899" stroke="#DB2777" strokeWidth="2" />
                    {/* Ribbon slice on lid */}
                    <rect x="90" y="70" width="20" height="25" fill="#FFD700" />
                  </g>

                  {/* Box Body */}
                  <rect x="42" y="93" width="116" height="80" rx="3" fill="#F472B6" stroke="#EC4899" strokeWidth="2" />
                  {/* Ribbon slice on box */}
                  <rect x="90" y="93" width="20" height="80" fill="#FFD700" />

                  {/* Sparkles around closed box */}
                  <g className="opacity-75">
                    <circle cx="20" cy="60" r="2" fill="#FFD700" className="animate-ping" />
                    <circle cx="180" cy="140" r="3" fill="#FFD700" className="animate-ping" style={{ animationDelay: '1s' }} />
                    <circle cx="160" cy="50" r="1.5" fill="#FF8A80" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                  </g>
                </svg>

                {/* Shaking tap hint overlay */}
                {clickCount === 0 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md whitespace-nowrap animate-bounce">
                    Tap Me 💝
                  </div>
                )}
                {clickCount === 1 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md whitespace-nowrap animate-pulse">
                    One More Tap! ✨
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Opened Blessing Card */
            <motion.div
              key="opened-box-card"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="max-w-md w-full relative"
            >
              {/* Sparkling glowing core behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-3xl blur-2xl -z-10 animate-pulse" />

              {/* Real Blessing Glassmorphic Card */}
              <div className="bg-white/80 backdrop-blur-2xl border-2 border-pink-100 rounded-3xl p-8 shadow-[0_20px_50px_rgba(244,143,177,0.3)] relative overflow-hidden">
                {/* Sparkle corners decoration */}
                <div className="absolute top-4 left-4 text-pink-400 animate-spin-slow">
                  <Sparkles size={16} />
                </div>
                <div className="absolute bottom-4 right-4 text-purple-400 animate-bounce">
                  <Sparkles size={16} />
                </div>

                {/* Blessing Content Header */}
                <div className="flex flex-col items-center mb-6">
                  {/* Floating decorative mini-hearts */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center border border-pink-100 text-pink-500 shadow-inner">
                      <Heart size={28} className="fill-pink-500 animate-heartbeat" />
                    </div>
                    {/* Glowing expanding rings */}
                    <div className="absolute w-20 h-20 border-2 border-pink-300 rounded-full animate-ping opacity-45" />
                    <div className="absolute w-24 h-24 border border-purple-200 rounded-full animate-ping opacity-25" style={{ animationDelay: '0.4s' }} />
                  </div>

                  <h3 className="text-xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    💝 Happy Birthday Sister!
                  </h3>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-pink-300 to-purple-300 mt-2 rounded-full" />
                </div>

                {/* Heartfelt Blessing Paragraphs */}
                <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium italic border-l-4 border-pink-400 pl-4 py-1 text-left bg-gradient-to-r from-pink-50/20 to-transparent">
                  "You are my biggest blessing. Thank you for always being beside me, supporting my dreams, and laughing at my worst jokes. May all your beautiful dreams come true, and may your paths overflow with joy."
                </p>

                <p className="text-base text-pink-500 font-bold font-mono tracking-wide text-center mt-6 flex items-center justify-center gap-1.5 animate-pulse">
                  I love you forever ❤️
                </p>

                {/* Close/Reset option */}
                <button
                  onClick={resetBox}
                  className="mt-8 px-5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-mono rounded-full border border-slate-200 transition-all cursor-pointer hover:text-slate-700"
                  id="gift-reset-btn"
                >
                  Unwrap Again 🎁
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
