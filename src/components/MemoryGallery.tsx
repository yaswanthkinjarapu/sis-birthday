import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Eye, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { memoryPhotos } from '../data';
import { MemoryPhoto } from '../types';

export const MemoryGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Childhood', 'Adventures', 'Best Friends', 'Milestones', 'Funny'];

  const filteredPhotos = activeCategory === 'All'
    ? memoryPhotos
    : memoryPhotos.filter(p => p.category === activeCategory);

  const openLightbox = (index: number) => {
    // Find index in overall list
    const actualIndex = memoryPhotos.findIndex(p => p.id === filteredPhotos[index].id);
    setSelectedPhotoIndex(actualIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % memoryPhotos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + memoryPhotos.length) % memoryPhotos.length);
  };

  return (
    <section id="photos-gallery" className="py-20 px-4 max-w-7xl mx-auto relative z-20">
      {/* Category Tabs */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-pink-500 font-bold bg-pink-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Camera size={12} /> Captured Moments ({memoryPhotos.length})
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-800 mt-3 tracking-tight">
          Our Precious Photo Memories
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
          Every photo is a beautiful puzzle piece of our story. Scroll or filter to relive our happiest moments together.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-2xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105 shadow-md shadow-pink-100'
                  : 'bg-white/80 hover:bg-pink-50 text-slate-600 hover:text-pink-500 border border-slate-100'
              }`}
              id={`category-btn-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => openLightbox(index)}
              className="cursor-pointer"
            >
              {/* Polaroid Frame */}
              <div
                className="bg-white p-4 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(244,143,177,0.25)] border border-slate-100 transition-all rounded-sm group relative"
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                }}
                id={`polaroid-card-${photo.id}`}
              >
                {/* Photo container */}
                <div className="relative overflow-hidden aspect-square bg-slate-100 rounded-sm">
                  {/* Category Badge */}
                  <span className="absolute top-2 left-2 z-10 text-[9px] font-semibold text-white bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {photo.category}
                  </span>

                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <span className="p-2.5 bg-white/90 rounded-full text-pink-500 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Eye size={16} />
                    </span>
                  </div>
                </div>

                {/* Handwritten Style Caption */}
                <div className="mt-4 text-center">
                  <h3 className="font-mono italic text-xs font-semibold text-slate-700 tracking-wide flex items-center justify-center gap-1">
                    <Heart size={10} className="text-pink-400 fill-pink-400 shrink-0" />
                    {photo.title}
                  </h3>
                  <p className="text-[10px] text-pink-400 font-mono tracking-widest mt-1">
                    #ForeverSisters
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            id="gallery-lightbox"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-55 cursor-pointer"
              id="lightbox-close-btn"
            >
              <X size={24} />
            </button>

            {/* Left Nav Control */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-55 hidden md:block"
              id="lightbox-prev-btn"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Polaroid Body inside Lightbox */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 pb-8 max-w-xl w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(244,143,177,0.4)] border border-pink-100 flex flex-col relative"
              id="lightbox-card"
            >
              {/* Main Glowing Frame Visual */}
              <div className="relative overflow-hidden aspect-video bg-slate-900 rounded-xl shadow-inner border border-slate-100">
                <img
                  src={memoryPhotos[selectedPhotoIndex].imageUrl}
                  alt={memoryPhotos[selectedPhotoIndex].title}
                  className="w-full h-full object-cover animate-soft-glow"
                  referrerPolicy="no-referrer"
                />
                {/* Category tag */}
                <div className="absolute top-3 left-3 bg-pink-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles size={8} /> {memoryPhotos[selectedPhotoIndex].category}
                </div>
                {/* Image Count index */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-2 py-0.5 rounded-full">
                  {selectedPhotoIndex + 1} / {memoryPhotos.length}
                </div>
              </div>

              {/* Heartfelt Story Details */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-pink-50 rounded text-pink-500">
                    <Heart size={14} className="fill-pink-500" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">
                    {memoryPhotos[selectedPhotoIndex].title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-sans font-normal border-l-2 border-pink-100 pl-3">
                  {memoryPhotos[selectedPhotoIndex].description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                  <span>Photo Memory ID: #{memoryPhotos[selectedPhotoIndex].id}</span>
                  <span className="text-pink-400 font-bold flex items-center gap-1">
                    <Camera size={10} /> Sisters for Life ❤️
                  </span>
                </div>
              </div>

              {/* Mobile quick swipe overlay */}
              <div className="flex justify-between items-center mt-6 md:hidden border-t border-slate-100 pt-4">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Right Nav Control */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-55 hidden md:block"
              id="lightbox-next-btn-desktop"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
