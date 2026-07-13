import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mic, Volume2, HelpCircle, Flame, Heart } from 'lucide-react';

export const BirthdayCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showNotification, setShowNotification] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      stopMicDetection();
    };
  }, []);

  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      source.connect(analyser);
      setMicActive(true);
      setShowNotification('🎤 Microphone active! Blow on your screen to make a wish!');

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume
        let total = 0;
        for (let i = 0; i < bufferLength; i++) {
          total += dataArray[i];
        }
        const average = total / bufferLength;
        const normalizedVol = average / 255;
        setMicVolume(normalizedVol);

        // If blowing threshold is met, blow candles!
        if (normalizedVol > 0.35 && !candlesBlown) {
          triggerBlowCandles();
        }

        rafRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access denied or unavailable:", err);
      setShowNotification('⚠️ Mic access denied. Use the Blow button to simulate!');
      setMicActive(false);
    }
  };

  const stopMicDetection = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setMicActive(false);
    setMicVolume(0);
  };

  // Sound synthesis on candle extinction
  const playCheeringChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;

      // Create arpeggio nodes
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C major arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.7);
      });
    } catch (e) {
      console.warn("Synthesizer failed to play victory chime", e);
    }
  };

  const triggerBlowCandles = () => {
    setIsBlowing(true);
    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);
      stopMicDetection();
      playCheeringChime();
    }, 800);
  };

  const handleResetCandles = () => {
    setCandlesBlown(false);
    setMicActive(false);
    setMicVolume(0);
    setShowNotification('');
  };

  return (
    <section id="birthday-cake" className="py-20 px-4 bg-gradient-to-b from-pink-50/20 to-transparent relative z-20 text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Flame size={12} /> Birthday Cake
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          Make a Sweet Birthday Wish
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Take a deep breath, close your eyes, think of your biggest dream, and blow out the candles!
        </p>
      </div>

      {/* Mic Status alert notification bar */}
      {showNotification && (
        <div className="mb-6 max-w-sm mx-auto bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl px-4 py-2.5 shadow-sm text-xs font-medium text-slate-600 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span>{showNotification}</span>
        </div>
      )}

      {/* The Interactive Cake Scene container */}
      <div className="relative flex flex-col items-center justify-center min-h-[420px]">
        {/* Dynamic Wish Granted Overlay */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute top-0 z-30 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-6 py-2.5 shadow-xl font-bold font-mono tracking-widest text-sm flex items-center gap-2"
              id="wish-granted-banner"
            >
              <Sparkles size={16} className="animate-spin-slow text-yellow-300 fill-yellow-300" />
              ✨ WISH GRANTED Princess ✨
              <Sparkles size={16} className="text-yellow-300 fill-yellow-300" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Cake visual representation */}
        <div className="relative w-72 h-72 flex items-center justify-center select-none" id="cake-illustration-wrapper">
          {/* Pedestal Base */}
          <div className="absolute bottom-2 w-72 h-8 bg-slate-200 border-b-4 border-slate-300 rounded-full shadow-lg z-0" />
          <div className="absolute bottom-6 w-64 h-4 bg-slate-100 rounded-full z-0" />

          {/* CAKE LAYERS STRUCTURE */}
          {/* Layer 1 (Bottom Layer) */}
          <div className="absolute bottom-10 w-52 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-2xl border-b-4 border-pink-500 flex flex-col justify-end overflow-hidden shadow-inner z-10">
            {/* Chocolate decoration swirls */}
            <div className="h-4 bg-amber-800/20 w-full flex justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`drip1-${i}`} className="w-4 h-6 bg-amber-900 rounded-b-full shadow-sm shrink-0" />
              ))}
            </div>
          </div>

          {/* Layer 2 (Middle Layer) */}
          <div className="absolute bottom-[90px] w-40 h-14 bg-gradient-to-b from-pink-200 to-pink-300 rounded-2xl border-b-4 border-pink-400 flex flex-col justify-end overflow-hidden shadow-inner z-20">
            {/* White icing drops */}
            <div className="h-3 bg-white/20 w-full flex justify-around">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`drip2-${i}`} className="w-4 h-4 bg-white rounded-b-full shrink-0" />
              ))}
            </div>
          </div>

          {/* Layer 3 (Top Layer) */}
          <div className="absolute bottom-[134px] w-28 h-12 bg-gradient-to-b from-pink-100 to-pink-200 rounded-2xl border-b-4 border-pink-300 flex flex-col justify-end overflow-hidden shadow-inner z-30">
            {/* Chocolate drip top */}
            <div className="h-2.5 bg-amber-800/10 w-full flex justify-around">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`drip3-${i}`} className="w-4 h-3 bg-amber-900 rounded-b-full shrink-0" />
              ))}
            </div>
          </div>

          {/* Roses / Frosting Flowers on Cake top */}
          <div className="absolute bottom-[144px] z-30 flex gap-1 items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-rose-400 shadow-sm border border-rose-300 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-purple-400 shadow-sm border border-purple-300" />
            <div className="w-4 h-4 rounded-full bg-rose-400 shadow-sm border border-rose-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* THREE BURNING CANDLES */}
          {/* Left Candle */}
          <div className="absolute bottom-[144px] left-[104px] z-40 flex flex-col items-center">
            {/* Candle stick */}
            <div className="w-2.5 h-10 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-t-sm shadow-sm" />
            {/* Flame */}
            {!candlesBlown && (
              <div className="absolute top-[-16px] w-3 h-5 bg-gradient-to-t from-red-500 via-yellow-400 to-transparent rounded-full animate-flicker origin-bottom" />
            )}
          </div>

          {/* Center Candle */}
          <div className="absolute bottom-[146px] left-[138px] z-40 flex flex-col items-center">
            <div className="w-2.5 h-12 bg-gradient-to-b from-purple-300 to-indigo-400 rounded-t-sm shadow-sm" />
            {!candlesBlown && (
              <div className="absolute top-[-16px] w-3 h-5 bg-gradient-to-t from-red-500 via-yellow-400 to-transparent rounded-full animate-flicker origin-bottom" style={{ animationDelay: '0.2s' }} />
            )}
          </div>

          {/* Right Candle */}
          <div className="absolute bottom-[144px] left-[172px] z-40 flex flex-col items-center">
            <div className="w-2.5 h-10 bg-gradient-to-b from-teal-300 to-emerald-400 rounded-t-sm shadow-sm" />
            {!candlesBlown && (
              <div className="absolute top-[-16px] w-3 h-5 bg-gradient-to-t from-red-500 via-yellow-400 to-transparent rounded-full animate-flicker origin-bottom" style={{ animationDelay: '0.4s' }} />
            )}
          </div>
        </div>

        {/* Dynamic Wind blowing breath simulation UI indicator */}
        {micActive && !candlesBlown && (
          <div className="mt-2 w-48 bg-slate-100 rounded-full h-2 border border-slate-200 overflow-hidden shadow-inner flex">
            <div
              className={`h-full bg-gradient-to-r from-sky-400 to-pink-500 transition-all duration-75`}
              style={{ width: `${Math.min(micVolume * 250, 100)}%` }}
            />
          </div>
        )}

        {/* BUTTON CONTROLS AND WORKFLOWS */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          {!candlesBlown ? (
            <>
              {/* Mic Activation Button */}
              <button
                onClick={micActive ? stopMicDetection : startMicDetection}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold font-mono shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                  micActive
                    ? 'bg-emerald-500 text-white animate-pulse'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-100'
                }`}
                id="mic-blow-btn"
              >
                <Mic size={14} />
                {micActive ? "Microphone ON (Blow Now)" : "Enable Mic Blowing"}
              </button>

              {/* Manual Tap Simulator Button */}
              <button
                onClick={triggerBlowCandles}
                disabled={isBlowing}
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xs font-mono font-bold shadow-md shadow-pink-100 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                id="manual-blow-btn"
              >
                {isBlowing ? "💨 Blowing..." : "🎂 Blow Candles"}
              </button>
            </>
          ) : (
            /* Relight button */
            <button
              onClick={handleResetCandles}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-mono rounded-full border border-slate-200 transition-all cursor-pointer"
              id="relight-candles-btn"
            >
              Relight Candles 🕯️
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
