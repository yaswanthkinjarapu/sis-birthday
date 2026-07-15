import React, { useRef, useState, useEffect } from 'react';
import { Film, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import birthdayVideo from '../assets/images/Happy Birthday Sister.mp4';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback if blocked
        });
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Intersection observer to auto-play video when scrolled in
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // standard browser safety - fail silently
          });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section id="cinema-memories" className="py-20 px-4 max-w-5xl mx-auto relative z-20">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Film size={12} /> Cinematic Experience
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          Our Beautiful Memories Movie
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Sit back, put on headphones, and take a stroll down memory lane. This film captures our beautiful journey of sisterhood!
        </p>
      </div>

      {/* Cinematic Frame wrapper with glowing neon pink/gold borders */}
      <div className="relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-pink-500 via-amber-400 to-purple-600 shadow-[0_15px_60px_-15px_rgba(244,143,177,0.45)] group">
        {/* Animated glowing neon overlay border */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-amber-400 to-purple-600 opacity-75 blur-md group-hover:scale-[1.02] transition-transform duration-500 -z-10" />

        {/* Video core display */}
        <div className="relative rounded-[22px] overflow-hidden aspect-video bg-slate-950 flex items-center justify-center z-10 shadow-inner">
          <video
            ref={videoRef}
            src={birthdayVideo}
            loop
            autoPlay
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-80"
            id="cinema-video-core"
            onClick={handlePlayPause}
          />

          {/* Glowing Play Overlay if paused */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            {!isPlaying && (
              <div className="p-5 bg-white/10 border border-white/20 rounded-full text-white shadow-lg backdrop-blur-md animate-pulse">
                <Play size={36} fill="white" />
              </div>
            )}
          </div>

          {/* Real-time floating control overlay buttons */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            {/* Play/Pause control */}
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider"
              id="video-play-btn"
            >
              {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" />}
              <span>{isPlaying ? 'PAUSE FILM' : 'PLAY FILM'}</span>
            </button>

            {/* Sparkles Center tag */}
            <span className="text-[10px] font-mono text-yellow-300 font-bold uppercase tracking-widest hidden sm:flex items-center gap-1">
              <Sparkles size={10} className="animate-spin-slow" /> Cinema Mode <Sparkles size={10} />
            </span>

            {/* Mute/Volume control */}
            <button
              onClick={handleMuteToggle}
              className="text-white hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              id="video-mute-btn"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
