import { useState, useEffect } from 'react';

export const GalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const galleryImages = [
    { id: 1, title: 'Pre-wedding Session', gradient: 'from-amber-600/40 via-rose-500/30 to-amber-700/20', emoji: '💕' },
    { id: 2, title: 'Engagement Party', gradient: 'from-rose-500/40 via-amber-500/30 to-rose-600/20', emoji: '💍' },
    { id: 3, title: 'Save The Date', gradient: 'from-amber-500/40 via-amber-600/30 to-rose-500/20', emoji: '📅' },
    { id: 4, title: 'Photoshoot', gradient: 'from-rose-600/40 via-amber-500/30 to-amber-600/20', emoji: '📸' },
    { id: 5, title: 'Wedding Prep', gradient: 'from-amber-500/40 via-rose-400/30 to-amber-500/20', emoji: '🎀' },
    { id: 6, title: 'Celebration', gradient: 'from-amber-400/50 via-amber-500/30 to-rose-500/20', emoji: '🎉' },
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, galleryImages.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-full bg-gradient-dark overflow-hidden flex flex-col p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-400/8 blur-[100px] animate-pulse-soft"></div>
      </div>

      {/* Header */}
      <div className={`text-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <div className="flex items-center justify-center gap-4 mb-1">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <h2 className="text-xs font-light tracking-[0.4em] uppercase text-amber-400">Gallery</h2>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>
        <p className="text-[10px] text-amber-100/70 font-light">
          Momen berharga dalam perjalanan cinta kami
        </p>
      </div>

      {/* Carousel */}
      <div className={`flex-1 w-full max-w-md mx-auto flex flex-col min-h-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Main Image */}
        <div className="relative flex-1 rounded-2xl overflow-hidden mb-3 glass-dark shadow-gold min-h-0">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-700 ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center flex-col gap-3`}>
                <span className="text-6xl animate-float">{image.emoji}</span>
                <p className="text-amber-50/90 text-sm font-light tracking-wide">{image.title}</p>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 glass-dark rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400/20 transition-all text-lg">‹</button>
          <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 glass-dark rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400/20 transition-all text-lg">›</button>

          {/* Counter */}
          <div className="absolute top-2 right-2 z-20 glass-dark px-3 py-1 rounded-full text-amber-400 text-[10px] font-light">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-3">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${index === currentIndex ? 'w-6 h-2 bg-gradient-to-r from-amber-400 to-amber-500 shadow-gold' : 'w-2 h-2 bg-amber-400/30 hover:bg-amber-400/50'
                }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-1 scrollbar-hide">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-11 h-11 rounded-lg transition-all duration-300 text-base ${index === currentIndex
                  ? `bg-gradient-to-br ${image.gradient} ring-2 ring-amber-400 shadow-gold`
                  : `bg-gradient-to-br ${image.gradient} opacity-40 hover:opacity-70`
                }`}
            >
              {image.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
