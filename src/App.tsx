import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Camera, Mail, Flame, Volume2 } from 'lucide-react';
import { BackgroundElements } from './components/BackgroundElements';
import { MemoryGallery } from './components/MemoryGallery';
import { GiftBox } from './components/GiftBox';
import { SecretLetter } from './components/SecretLetter';
import { BirthdayCake } from './components/BirthdayCake';
import { CakeCutting } from './components/CakeCutting';
import { Countdown } from './components/Countdown';
import { FireworksFinale } from './components/FireworksFinale';
import { VideoSection } from './components/VideoSection';

interface ConfettiPiece {
  id: number;
  x: number; // percentage horizontal
  y: number; // percentage vertical
  color: string;
  size: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle';
}

export default function App() {
  const [isSurpriseOpened, setIsSurpriseOpened] = useState(false);
  const [confettiBlast, setConfettiBlast] = useState<ConfettiPiece[]>([]);

  // Triggered on Opening Surprise
  const handleOpenSurprise = () => {
    setIsSurpriseOpened(true);

    // Synthesize physical-like confetti pieces in state
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const colors = ['#FF80AB', '#EC4899', '#80D8FF', '#FFFF8D', '#B9F6CA', '#B39DDB', '#F48FBF'];

    const pieces = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: -10 - Math.random() * 40,
      color: colors[i % colors.length],
      size: 8 + Math.random() * 12,
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
      shape: shapes[i % shapes.length]
    }));

    setConfettiBlast(pieces);

    // Play initial chime
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}

    // Clean up confetti after 8 seconds
    setTimeout(() => {
      setConfettiBlast([]);
    }, 8000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-pink-50 via-purple-50 to-rose-50 text-slate-800 font-sans overflow-x-hidden selection:bg-pink-200 selection:text-pink-800">
      {/* 🔮 MULTI-ATMOSPHERIC BACKDROP (Balloons, Hearts, Butterflies, Sparkles) */}
      <BackgroundElements />

      {/* --- CONFETTI SHOWER ON OPEN --- */}
      <AnimatePresence>
        {confettiBlast.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confettiBlast.map((p) => (
              <div
                key={`confetti-${p.id}`}
                className="absolute animate-petal-fall"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  animationDelay: `${p.delay}s`,
                  animationIterationCount: 1,
                  animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Custom Confetti piece */}
                <div
                  style={{
                    width: `${p.size}px`,
                    height: p.shape === 'triangle' ? '0' : `${p.size}px`,
                    backgroundColor: p.shape === 'triangle' ? 'transparent' : p.color,
                    borderRadius: p.shape === 'circle' ? '50%' : '2px',
                    borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
                    borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
                    borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : 'none',
                    transform: `rotate(${p.rotation}deg)`,
                  }}
                  className="animate-spin-slow"
                />
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isSurpriseOpened ? (
          /* ========================================================
             LANDING PAGE SURPRISE GATEWAY
             ======================================================== */
          <motion.div
            key="landing-gateway"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-gradient-to-tr from-[#FFF0F5] via-[#E6E6FA] to-[#FFF5EE] flex flex-col items-center justify-center text-center p-6"
            id="landing-surprise-gateway"
          >
            {/* Background elements running inside gateway as well */}
            <BackgroundElements />

            {/* Glowing Center Core */}
            <div className="absolute inset-0 bg-radial-gradient from-white/30 to-transparent pointer-events-none" />

            <div className="relative max-w-2xl mx-auto z-10 flex flex-col items-center select-none">
              {/* Floating animated central emblem */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 border border-white/50 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(244,143,177,0.4)] mb-8"
              >
                <Heart size={36} className="fill-white animate-heartbeat text-white" />
              </motion.div>

              {/* Magical Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight leading-none text-slate-800">
                🎉 Happy Birthday <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600">
                  My Dearest Sister
                </span> 🎉
              </h1>

              {/* Heartwarming Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-sans font-medium mt-6 leading-relaxed max-w-lg">
                "To the most amazing, kind-hearted, and brilliant sister in the world... Today is your special day and I made this little surprise just for you ❤️"
              </p>

              {/* Opening surprise button action */}
              <button
                onClick={handleOpenSurprise}
                className="mt-10 px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full text-sm font-bold font-mono tracking-widest uppercase shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                id="open-surprise-btn"
              >
                <span>Open My Surprise</span>
                <Sparkles size={16} className="animate-spin-slow text-yellow-200 fill-yellow-200" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             THE MAGICAL BIRTHDAY SCROLLING APP WONDERLAND
             ======================================================== */
          <motion.main
            key="magical-wonderland"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative z-30"
          >
            {/* Elegant glassmorphism sticky header */}
            <header className="sticky top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4 flex justify-between items-center shadow-sm select-none">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-sm">
                  <Heart size={16} className="fill-white" />
                </span>
                <span className="font-mono font-black text-xs uppercase tracking-widest text-slate-700">
                  Sister Birthday Surprise 💝
                </span>
              </div>

              {/* Navigation Anchors for easy room hopping */}
              <nav className="hidden md:flex items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <a href="#photos-gallery" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  <Camera size={10} /> Memories
                </a>
                <a href="#cinema-memories" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  <Volume2 size={10} /> Cinema
                </a>
                <a href="#gift-surprise" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  <Gift size={10} /> Gift
                </a>
                <a href="#secret-envelope" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  <Mail size={10} /> Letter
                </a>
                <a href="#birthday-cake" className="hover:text-pink-500 transition-colors flex items-center gap-1">
                  <Flame size={10} /> Cake
                </a>
              </nav>
            </header>

            {/* COUNTDOWN TIMER ROOM */}
            <div className="pt-10">
              <Countdown />
            </div>

            {/* POLAROID PICTURE GALLERY ROOM */}
            <MemoryGallery />

            {/* CINEMA VIDEO THEATER ROOM */}
            <VideoSection />

            {/* THREE LAYERED GIFT BOX SURPRISE ROOM */}
            <GiftBox />

            {/* SECRET WAX SEAL ENVELOPE LETTER ROOM */}
            <SecretLetter />

            {/* MICROPHONIC BLOWABLE BIRTHDAY CAKE ROOM */}
            <BirthdayCake />

            {/* SLICING CAKE CEREMONY PLATTER */}
            <CakeCutting />

            {/* GRAND FINALE FIREWORKS CANVAS */}
            <FireworksFinale />

            {/* LOVING BROTHERLY FOOTER */}
            <footer className="py-12 bg-slate-950 text-white select-none relative z-20 border-t border-white/10 text-center px-4">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/15 text-pink-500 mb-4 animate-bounce">
                  <Heart size={20} className="fill-pink-500 text-pink-500" />
                </div>
                <p className="text-sm font-sans font-medium text-slate-300">
                  Made with ❤️ by Your Loving Brother
                </p>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                  Forever Together <Heart size={10} className="fill-pink-500 text-pink-500 inline" /> Always & Forever
                </p>
                <div className="mt-6 text-[10px] font-mono text-slate-600 uppercase border-t border-white/5 pt-4 w-full">
                  July 19, 2026 Celebration Event • Sister Surprises
                </div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
