import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Heart } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false
  });

  useEffect(() => {
    // Target Birthday: July 19, 2026 (or dynamic current year)
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`July 19, ${currentYear} 00:00:00`).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // If past or exact birthday
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthday: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isBirthday: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-20 py-10 px-4 max-w-xl mx-auto text-center select-none" id="countdown-card-wrapper">
      {/* Premium Glass Panel */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_-15px_rgba(244,143,177,0.25)] relative overflow-hidden">
        {/* Subtle glowing orb */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-pink-300/15 rounded-full blur-xl" />

        {timeLeft.isBirthday ? (
          /* Today is Birthday View */
          <div className="animate-fade-in flex flex-col items-center">
            <div className="relative mb-3 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-100">
                <Heart size={24} className="fill-white animate-heartbeat" />
              </div>
              <div className="absolute w-18 h-18 border-2 border-pink-400 rounded-full animate-ping" />
            </div>

            <h3 className="text-xl sm:text-2xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 uppercase tracking-widest leading-relaxed">
              🎉 TODAY IS YOUR BIRTHDAY 🎉
            </h3>
            <p className="text-xs font-mono font-bold text-pink-500 tracking-wider mt-1 uppercase flex items-center gap-1">
              <Sparkles size={10} className="animate-spin-slow" /> Let the Magic Begin <Sparkles size={10} />
            </p>
          </div>
        ) : (
          /* Counting Down View */
          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              <Calendar size={12} className="text-pink-400" />
              <span>Surprise Countdown to July 19</span>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
              {/* Days column */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 bg-white/75 rounded-2xl border border-pink-50 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-slate-800 shadow-sm animate-float">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2">Days</span>
              </div>

              {/* Hours column */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 bg-white/75 rounded-2xl border border-pink-50 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-slate-800 shadow-sm animate-float" style={{ animationDelay: '0.2s' }}>
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2">Hours</span>
              </div>

              {/* Minutes column */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 bg-white/75 rounded-2xl border border-pink-50 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-slate-800 shadow-sm animate-float" style={{ animationDelay: '0.4s' }}>
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2">Mins</span>
              </div>

              {/* Seconds column */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-sm shadow-pink-100 animate-float" style={{ animationDelay: '0.6s' }}>
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2">Secs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
