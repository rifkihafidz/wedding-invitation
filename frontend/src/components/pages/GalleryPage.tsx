import { useState, useEffect } from 'react';

export const GalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Using placeholder gradients - in production, replace with actual images
  const galleryImages = [
    { id: 1, title: 'Pre-wedding Session', subtitle: 'Captured moments of love', gradient: 'from-amber-600/60 via-rose-500/40 to-amber-700/30' },
    { id: 2, title: 'Engagement Party', subtitle: 'The day we said yes', gradient: 'from-rose-500/60 via-amber-500/40 to-rose-600/30' },
    { id: 3, title: 'Save The Date', subtitle: 'Marking our special day', gradient: 'from-amber-500/60 via-amber-600/40 to-rose-500/30' },
    { id: 4, title: 'Photoshoot', subtitle: 'Behind the scenes', gradient: 'from-rose-600/60 via-amber-500/40 to-amber-600/30' },
    { id: 5, title: 'Our Journey', subtitle: 'Through the years', gradient: 'from-amber-500/60 via-rose-400/40 to-amber-500/30' },
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
    <div className="w-full h-full bg-gradient-dark flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-400/8 blur-[120px]"></div>
      </div>

      {/* Header */}
      <div className={`text-center pt-6 pb-4 px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <h2 className="text-sm font-light tracking-[0.3em] uppercase text-amber-400">Our Gallery</h2>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>
        <p className="text-xs text-amber-100/60 font-light">
          Moments of our beautiful journey together
        </p>
      </div>

      {/* Main Carousel */}
      <div className={`flex-1 px-5 pb-4 flex flex-col min-h-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Image Container */}
        <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-amber-400/20">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-700 ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center`}>
                {/* Placeholder content - replace with actual images */}
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10 text-white/60">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-white font-light mb-2">{image.title}</h3>
                  <p className="text-sm text-white/70 font-light">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-light">
            {currentIndex + 1} / {galleryImages.length}
          </div>

          {/* Current Image Title Overlay */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-xl font-serif text-white font-light mb-1">
              {galleryImages[currentIndex].title}
            </h3>
            <p className="text-sm text-white/60 font-light">
              {galleryImages[currentIndex].subtitle}
            </p>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex
                ? 'w-8 h-2 bg-gradient-to-r from-amber-400 to-amber-500'
                : 'w-2 h-2 bg-amber-400/30 hover:bg-amber-400/50'
                }`}
            />
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-3 justify-center mt-4 px-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${index === currentIndex
                  ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#1f1b18]'
                  : 'opacity-40 hover:opacity-70'
                }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${image.gradient}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
