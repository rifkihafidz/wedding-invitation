import { useState, useEffect } from 'react';

export const GalleryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Dummy gallery images with beautiful gradient colors (simulating real photos)
  const galleryImages = [
    {
      id: 1,
      title: 'Pre-wedding Session',
      gradient: 'from-rose-300 via-pink-300 to-orange-300',
      emoji: '💕',
    },
    {
      id: 2,
      title: 'Engagement Party',
      gradient: 'from-purple-300 via-pink-300 to-rose-300',
      emoji: '💍',
    },
    {
      id: 3,
      title: 'Save The Date',
      gradient: 'from-indigo-300 via-purple-300 to-pink-300',
      emoji: '📅',
    },
    {
      id: 4,
      title: 'Photoshoot',
      gradient: 'from-orange-300 via-rose-300 to-pink-300',
      emoji: '📸',
    },
    {
      id: 5,
      title: 'Wedding Prep',
      gradient: 'from-pink-300 via-rose-300 to-red-300',
      emoji: '🎀',
    },
    {
      id: 6,
      title: 'Celebration',
      gradient: 'from-amber-300 via-yellow-300 to-orange-300',
      emoji: '🎉',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Change image every 5 seconds

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
    <div className="w-full h-[852px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden flex flex-col p-5">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-6 bg-indigo-300"></div>
          <h2 className="text-xs font-light tracking-widest uppercase text-indigo-700">Gallery</h2>
          <div className="h-px w-6 bg-indigo-300"></div>
        </div>
        <p className="text-xs text-indigo-600 font-light">
          Momen berharga dalam perjalanan cinta kami
        </p>
      </div>

      {/* Carousel */}
      <div className="flex-1 w-full max-w-sm mx-auto flex flex-col">
        {/* Image Display */}
        <div className="relative w-full flex-1 rounded-lg overflow-hidden shadow-lg mb-3 bg-white/50 min-h-0">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center flex-col gap-2`}
              >
                <span className="text-5xl">{image.emoji}</span>
                <p className="text-white text-xs font-light text-center px-3">
                  {image.title}
                </p>
              </div>
            </div>
          ))}

          {/* Arrow Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/70 hover:bg-white rounded-full flex items-center justify-center transition-all text-sm font-light text-indigo-700"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/70 hover:bg-white rounded-full flex items-center justify-center transition-all text-sm font-light text-indigo-700"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute top-2 right-2 z-20 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-light">
            {currentIndex + 1}/{galleryImages.length}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 mb-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-5 h-2 bg-indigo-600'
                  : 'w-2 h-2 bg-indigo-300 hover:bg-indigo-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-1.5 justify-center overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg transition-all text-sm ${
                index === currentIndex
                  ? `bg-gradient-to-br ${image.gradient} ring-2 ring-indigo-600`
                  : `bg-gradient-to-br ${image.gradient} opacity-50 hover:opacity-75`
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
