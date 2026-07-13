import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Sparkles, Heart, FileText, X } from 'lucide-react';

export const SecretLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaperRevealed, setIsPaperRevealed] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Delay paper slide-out to match flap opening
    setTimeout(() => {
      setIsPaperRevealed(true);
    }, 600);
  };

  const handleCloseEnvelope = () => {
    setIsPaperRevealed(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <section id="secret-envelope" className="py-20 bg-gradient-to-b from-transparent to-purple-50/20 relative z-20 text-center px-4">
      <div className="max-w-4xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Mail size={12} /> Confidential Message
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          A Handwritten Secret Letter
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          I penned down some thoughts that are hard to say out loud. Click the wax seal to open the letter and unfold my message.
        </p>
      </div>

      {/* Interactive Envelope Wrapper */}
      <div className="flex flex-col items-center justify-center min-h-[350px] relative select-none">
        <AnimatePresence mode="wait">
          {!isPaperRevealed ? (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative cursor-pointer"
              onClick={handleOpenEnvelope}
              id="interactive-envelope-body"
            >
              {/* Envelope base layout */}
              <div className="relative w-64 h-44 bg-gradient-to-b from-pink-100 to-rose-100 rounded-lg shadow-xl border border-pink-200/50 flex items-center justify-center transition-all hover:shadow-2xl group">
                {/* Back of the envelope body - SVG polygons for flaps */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 176">
                  {/* Left flap */}
                  <polygon points="0,0 128,110 0,176" fill="rgba(244,143,177,0.15)" stroke="rgba(244,143,177,0.2)" strokeWidth="1" />
                  {/* Right flap */}
                  <polygon points="256,0 128,110 256,176" fill="rgba(244,143,177,0.15)" stroke="rgba(244,143,177,0.2)" strokeWidth="1" />
                  {/* Bottom flap */}
                  <polygon points="0,176 128,88 256,176" fill="rgba(244,143,177,0.25)" stroke="rgba(244,143,177,0.3)" strokeWidth="1" />

                  {/* Top Flap (flips up on open) */}
                  <g className={`origin-top transition-transform duration-500 ${isOpen ? 'rotate-x-180 -translate-y-2' : ''}`} style={{ transformOrigin: 'top center' }}>
                    <polygon points="0,0 128,88 256,0" fill="#F48FBF" stroke="rgba(244,143,177,0.4)" strokeWidth="1" />
                  </g>
                </svg>

                {/* Wax Seal / Stamp Button in the center */}
                <div className="absolute z-30 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {/* Golden Wax Circle */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-amber-600 shadow-md flex items-center justify-center text-white relative animate-pulse">
                    <Heart size={20} className="fill-white animate-heartbeat" />
                    {/* Tiny decorative star spark */}
                    <div className="absolute top-1 right-1 text-yellow-200">
                      <Sparkles size={8} />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mt-2 bg-slate-50 px-2 py-0.5 rounded shadow-sm border border-slate-100">
                    {isOpen ? "Opening..." : "Click to Break Seal"}
                  </span>
                </div>

                {/* Floating Hearts floating up out of envelope */}
                <div className="absolute -top-4 text-pink-400 animate-bounce">
                  <Mail size={20} className="text-pink-300/60" />
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Beautiful Full Screen Sheet Modal */
            <motion.div
              key="opened-parchment"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
              id="secret-letter-modal"
            >
              {/* Main Sheet Container */}
              <div
                className="bg-[#FAF6F0] w-full max-w-xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-[#EADAC2] p-6 sm:p-10 relative overflow-hidden"
                id="parchment-sheet"
              >
                {/* Traditional Editorial Corner Borders */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#CBB393]" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#CBB393]" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#CBB393]" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#CBB393]" />

                {/* Close Button top-right */}
                <button
                  onClick={handleCloseEnvelope}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all z-10 cursor-pointer"
                  id="close-letter-btn"
                >
                  <X size={18} />
                </button>

                {/* Golden Wax Seal Header */}
                <div className="flex justify-center mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border border-amber-600 flex items-center justify-center text-white shadow shadow-amber-200">
                      <Heart size={14} className="fill-white" />
                    </div>
                    <span className="text-[10px] font-serif italic text-amber-800 tracking-widest mt-1.5 uppercase font-semibold">
                      Dearest Sisterhood Seal
                    </span>
                  </div>
                </div>

                {/* Heartfelt Story Message */}
                <div className="text-left font-serif text-slate-800 space-y-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                  <p className="font-bold text-lg text-slate-800 border-b border-[#EADAC2] pb-2 font-mono">
                    My Dearest Sister,
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 font-sans">
                    Words will never be enough to express how incredibly lucky I am to have you as my sister. You are my sunshine during storms, my anchor in moments of chaos, and my ultimate best friend.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 font-sans">
                    Remember our endless sibling secrets, our silly bickering that turned into laughing fits, and how we've grown together hand-in-hand? Every milestone in my life is sweet because you are there to celebrate it. Thank you for your warmth, your pure kindness, and your eternal grace.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 font-sans">
                    No matter where we travel, what careers we chase, or how old we become, my shield will always stand between you and the wind, and my hand will always be ready to hold yours. You will always be my princess.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 font-sans font-semibold">
                    Wishing you the most magical, glorious, and happiest birthday! May all your dreams take flight today.
                  </p>
                  <div className="pt-4 border-t border-[#EADAC2]/60 mt-6 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Written with Love</p>
                      <p className="text-xs font-mono font-bold text-pink-500 mt-0.5">July 19, 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs italic text-slate-500 font-sans">Your Loving Brother,</p>
                      <p className="text-sm font-bold text-slate-800 font-mono mt-0.5 flex items-center justify-end gap-1">
                        Yaswanth  <Heart size={12} className="text-pink-500 fill-pink-500" />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Watermark background leaf ornament */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 text-amber-100 opacity-20 pointer-events-none">
                  <FileText size={128} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
