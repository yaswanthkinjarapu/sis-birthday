import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

interface SkyLantern {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

export const FireworksFinale: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lanterns, setLanterns] = useState<SkyLantern[]>([]);
  const particlesRef = useRef<FireworkParticle[]>([]);

  // Setup Canvas and firework loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 450; // Constrained height for beautiful sectional layout
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#FF8A80', // Soft coral red
      '#FF80AB', // Neon pink
      '#EA80FC', // Lavender purple
      '#80D8FF', // Soft sky blue
      '#FFFF8D', // Bright gold yellow
      '#B9F6CA'  // Soft mint green
    ];

    // Create explosion at coordinates
    const createExplosion = (x: number, y: number) => {
      const particleCount = 60 + Math.floor(Math.random() * 40);
      const explosionColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 6;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: explosionColor,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.015,
          size: 1 + Math.random() * 2
        });
      }
    };

    // Auto launcher timer
    let autoLaunchTimer = setInterval(() => {
      if (!canvas) return;
      const x = 50 + Math.random() * (canvas.width - 100);
      const y = 80 + Math.random() * 150;
      createExplosion(x, y);
    }, 1800);

    // Frame animation loop
    const render = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Deep slate translucent trace
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity pull
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // glowing firework drop shadow
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Delete faded particles
        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Create click interaction
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createExplosion(x, y);
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Initialize sky lanterns
    const initialLanterns = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: 100 + Math.random() * 50,
      size: 20 + Math.random() * 15,
      speed: 0.8 + Math.random() * 0.8,
      wobble: Math.random() * 360,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      opacity: 0.4 + Math.random() * 0.4
    }));
    setLanterns(initialLanterns);

    return () => {
      clearInterval(autoLaunchTimer);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('click', handleCanvasClick);
      }
    };
  }, []);

  // Update Sky Lantern floating loops
  useEffect(() => {
    const lanternTimer = setInterval(() => {
      setLanterns((prev) =>
        prev.map((lat) => {
          const nextY = lat.y - lat.speed;
          // reset to bottom if drifted off top
          const resetY = nextY < -20 ? 110 : nextY;
          return {
            ...lat,
            y: resetY,
            wobble: lat.wobble + lat.wobbleSpeed
          };
        })
      );
    }, 40);

    return () => clearInterval(lanternTimer);
  }, []);

  return (
    <section id="finale-celebration" className="py-20 relative bg-slate-900 overflow-hidden text-center select-none rounded-t-[50px] border-t-4 border-amber-400/50">
      {/* Absolute Firework canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer z-10"
        title="Tap to launch custom fireworks!"
        id="fireworks-canvas"
      />

      {/* FLOATING SKY LANTERNS OVERLAY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {lanterns.map((lat) => (
          <div
            key={`lantern-${lat.id}`}
            className="absolute flex flex-col items-center"
            style={{
              left: `${lat.x + Math.sin(lat.wobble) * 4}%`,
              top: `${lat.y}%`,
              opacity: lat.opacity,
            }}
          >
            {/* Lantern Glow body */}
            <div
              className="rounded-t-lg rounded-b-md shadow-lg shadow-amber-500/20"
              style={{
                width: `${lat.size}px`,
                height: `${lat.size * 1.3}px`,
                background: 'radial-gradient(circle at 50% 80%, #ffffff 5%, #ffb74d 40%, #e65100 100%)',
                boxShadow: '0 0 15px rgba(255,167,38,0.6)',
              }}
            >
              {/* Hot Fire core at bottom of lantern */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[30%] h-[20%] bg-white rounded-full animate-ping" />
            </div>
          </div>
        ))}
      </div>

      {/* Finale Headline Card overlay */}
      <div className="relative z-20 max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
        {/* Glowing floating emblem */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-amber-400 flex items-center justify-center text-white shadow-[0_0_30px_#f59e0b] mb-6"
        >
          <Sparkles size={28} className="animate-spin-slow text-white fill-white" />
        </motion.div>

        {/* Grand Finale message */}
        <h2 className="text-3xl md:text-5xl font-sans font-black text-white tracking-wider leading-snug drop-shadow-lg uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-yellow-200 uppercase">
          Happy Birthday My Dear Sister ❤️
        </h2>

        <p className="text-base sm:text-lg text-amber-200/90 font-sans font-medium leading-relaxed max-w-lg mt-6 drop-shadow-md">
          "Thank you for filling our lives with endless light, warmth, and laughter. You are an incredible gift, and I will protect and cherish our bond forever."
        </p>

        {/* Beats / Hearts stamp footer */}
        <div className="flex items-center gap-2 mt-10 text-xs font-mono tracking-widest text-pink-400 uppercase font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <Heart size={12} className="fill-pink-400 animate-heartbeat text-pink-400" />
          <span>Together For a Lifetime 💕</span>
        </div>

        {/* Small hint on interaction */}
        <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mt-8 animate-pulse">
          * Tap anywhere on the sky to light up fireworks *
        </span>
      </div>
    </section>
  );
};
