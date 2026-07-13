import React, { useEffect, useState, useRef } from 'react';

// Interfaces for our floating particles
interface Particle {
  id: number;
  x: number; // percentage left
  y: number; // percentage top
  size: number;
  speed: number;
  delay: number;
  color: string;
  wobble: number;
}

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
}

export const BackgroundElements: React.FC = () => {
  const [balloons, setBalloons] = useState<Particle[]>([]);
  const [hearts, setHearts] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Particle[]>([]);
  const [petals, setPetals] = useState<Particle[]>([]);
  const [butterflies, setButterflies] = useState<Particle[]>([]);
  const [cursorSparkles, setCursorSparkles] = useState<CursorSparkle[]>([]);

  const sparkleIdRef = useRef(0);

  useEffect(() => {
    // Generate static/dynamic positions for balloons (rising)
    const balloonColors = [
      'rgba(244, 143, 177, 0.45)', // Pink
      'rgba(179, 157, 219, 0.45)', // Lavender
      'rgba(144, 202, 249, 0.35)', // Blue
      'rgba(255, 224, 130, 0.45)', // Gold
      'rgba(248, 187, 208, 0.45)', // Rose Pink
    ];

    const generatedBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: 100 + Math.random() * 50,
      size: 40 + Math.random() * 40,
      speed: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      color: balloonColors[i % balloonColors.length],
      wobble: 5 + Math.random() * 15,
    }));
    setBalloons(generatedBalloons);

    // Generate floating hearts (rising)
    const generatedHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: 100 + Math.random() * 40,
      size: 15 + Math.random() * 20,
      speed: 10 + Math.random() * 12,
      delay: Math.random() * 8,
      color: i % 2 === 0 ? 'rgba(244, 143, 177, 0.4)' : 'rgba(233, 30, 99, 0.25)',
      wobble: 10 + Math.random() * 20,
    }));
    setHearts(generatedHearts);

    // Generate twinkling stars (ambient background)
    const generatedStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 6,
      speed: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      color: 'rgba(255, 215, 0, 0.6)',
      wobble: 0,
    }));
    setStars(generatedStars);

    // Generate falling flower petals
    const generatedPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 30,
      size: 12 + Math.random() * 14,
      speed: 8 + Math.random() * 10,
      delay: Math.random() * 12,
      color: i % 2 === 0 ? 'rgba(255, 192, 203, 0.6)' : 'rgba(255, 182, 193, 0.4)',
      wobble: 15 + Math.random() * 25,
    }));
    setPetals(generatedPetals);

    // Generate floating butterflies
    const generatedButterflies = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: 20 + Math.random() * 70,
      size: 20 + Math.random() * 15,
      speed: 20 + Math.random() * 20,
      delay: Math.random() * 15,
      color: i % 2 === 0 ? 'rgba(224, 64, 251, 0.5)' : 'rgba(244, 143, 177, 0.5)',
      wobble: 30 + Math.random() * 40,
    }));
    setButterflies(generatedButterflies);

    // Listen to mousemove for cursor sparkles
    const handleMouseMove = (e: MouseEvent) => {
      // Limit sparkle density
      if (Math.random() > 0.15) return;

      const colors = ['#F48FBF', '#B39DDB', '#FFD700', '#90CAF9', '#FF8A80'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newSparkle: CursorSparkle = {
        id: sparkleIdRef.current++,
        x: e.clientX,
        y: e.clientY + window.scrollY, // align with document height
        size: 8 + Math.random() * 14,
        color: randomColor,
        createdAt: Date.now(),
      };

      setCursorSparkles((prev) => [...prev.slice(-30), newSparkle]); // keep max 30 sparkles
    };

    const cleanupInterval = setInterval(() => {
      setCursorSparkles((prev) => {
        if (prev.length === 0) return prev;
        const now = Date.now();
        const filtered = prev.filter((s) => now - s.createdAt < 800);
        return filtered.length === prev.length ? prev : filtered;
      });
    }, 200);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* 🎈 FLOATING BALLOONS (Rising upward) */}
      {balloons.map((b) => (
        <div
          key={`balloon-${b.id}`}
          className="absolute flex flex-col items-center animate-float-up"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            animationDuration: `${b.speed}s`,
            animationDelay: `${b.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {/* Balloon Body */}
          <div
            className="rounded-full relative shadow-md"
            style={{
              width: `${b.size}px`,
              height: `${b.size * 1.2}px`,
              background: `radial-gradient(circle at 35% 30%, #ffffff 4%, ${b.color} 30%, rgba(0,0,0,0.15) 100%)`,
            }}
          >
            {/* Glossy highlight */}
            <div className="absolute top-[10%] left-[15%] w-[15%] h-[20%] bg-white/50 rounded-full rotate-[-30deg]" />
            {/* Knot */}
            <div
              className="absolute bottom-[-4px] left-[50%] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent"
              style={{ borderBottom: `8px solid ${b.color}` }}
            />
          </div>
          {/* String */}
          <svg className="w-2 h-16 overflow-visible" style={{ marginTop: '2px' }}>
            <path
              d="M 4 0 Q 0 20 4 40 T 4 80"
              fill="none"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="1.2"
              className="animate-string-wobble"
              style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}
            />
          </svg>
        </div>
      ))}

      {/* ❤️ FLOATING HEARTS (Rising upward) */}
      {hearts.map((h) => (
        <div
          key={`heart-${h.id}`}
          className="absolute animate-float-up-hearts"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            animationDuration: `${h.speed}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              width: `${h.size}px`,
              height: `${h.size}px`,
              filter: 'drop-shadow(0px 2px 4px rgba(255,182,193,0.3))',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* ⭐ TWINKLING STARS */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: 'radial-gradient(circle, #ffffff 30%, rgba(255,215,0,0.8) 80%)',
            boxShadow: '0 0 8px #ffd700, 0 0 12px #fff',
            animationDuration: `${s.speed}s`,
            animationDelay: `${s.delay}s`,
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* 🌸 FLOWER PETAL RAIN (Falling downward) */}
      {petals.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.speed}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {/* Petal Shape */}
          <div
            className="rounded-br-[50%] rounded-tl-[50%] rotate-[45deg] shadow-sm shadow-pink-200"
            style={{
              width: `${p.size}px`,
              height: `${p.size * 0.7}px`,
              backgroundColor: p.color,
              border: '1px solid rgba(255,255,255,0.2)',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}

      {/* 🦋 FLOATING BUTTERFLIES */}
      {butterflies.map((bf) => (
        <div
          key={`butterfly-${bf.id}`}
          className="absolute animate-butterfly-drift"
          style={{
            left: `${bf.x}%`,
            top: `${bf.y}%`,
            animationDuration: `${bf.speed}s`,
            animationDelay: `${bf.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          {/* Wings flapping container */}
          <div className="flex items-center space-x-[1px]">
            {/* Left wing */}
            <div
              className="rounded-l-full origin-right animate-wing-flap-left"
              style={{
                width: `${bf.size * 0.6}px`,
                height: `${bf.size}px`,
                background: `linear-gradient(135deg, ${bf.color}, rgba(255,255,255,0.3))`,
                border: '1.5px solid rgba(224, 64, 251, 0.4)',
                animationDuration: '0.8s',
                animationIterationCount: 'infinite',
              }}
            />
            {/* Body */}
            <div className="w-[3px] h-[75%] bg-slate-700/80 rounded-full z-20" style={{ height: `${bf.size * 0.7}px` }} />
            {/* Right wing */}
            <div
              className="rounded-r-full origin-left animate-wing-flap-right"
              style={{
                width: `${bf.size * 0.6}px`,
                height: `${bf.size}px`,
                background: `linear-gradient(225deg, ${bf.color}, rgba(255,255,255,0.3))`,
                border: '1.5px solid rgba(224, 64, 251, 0.4)',
                animationDuration: '0.8s',
                animationIterationCount: 'infinite',
              }}
            />
          </div>
        </div>
      ))}

      {/* ✨ CURSOR SPARKLES (Renders sparks at mouse position) */}
      {cursorSparkles.map((sp) => (
        <div
          key={`sparkle-${sp.id}`}
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-sparkle-fade"
          style={{
            left: sp.x,
            top: sp.y,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill={sp.color} className="w-full h-full">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
