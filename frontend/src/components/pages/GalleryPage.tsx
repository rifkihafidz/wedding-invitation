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
    <div className="w-full h-[852px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden animate-fade-in flex flex-col items-center justify-center">
      {/* Decorative elements */}
      <div className="fixed top-16 left-8 text-5xl opacity-10 animate-float pointer-events-none">📸</div>
      <div className="fixed bottom-32 right-8 text-5xl opacity-10 animate-float animation-delay-500 pointer-events-none">🖼️</div>

      <div className="flex flex-col items-center justify-center h-full w-full px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-3xl font-serif text-indigo-900 font-bold">Galeri Kami</h2>
          <p className="text-xs text-indigo-700 mt-1">Momen berharga dalam perjalanan cinta kami</p>
        </div>

        {/* Main Carousel Container */}
        <div className="w-full max-w-2xl relative z-10 flex flex-col items-center gap-2">
          {/* Carousel Track */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-2xl">
            {/* Images */}
            <div className="relative w-full h-full">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Dummy Image Background */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center flex-col gap-4`}
                  >
                    <span className="text-8xl">{image.emoji}</span>
                    <p className="text-white text-lg font-semibold text-center px-4">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <span className="text-xl">‹</span>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <span className="text-xl">›</span>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 py-1">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-indigo-600'
                    : 'w-3 h-3 bg-indigo-300 hover:bg-indigo-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 justify-center flex-wrap py-1">
            {galleryImages.slice(0, 4).map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`w-14 h-14 rounded-xl transition-all flex items-center justify-center text-xl shadow-md ${
                  index === currentIndex
                    ? `bg-gradient-to-br ${image.gradient} ring-2 ring-indigo-600 scale-110`
                    : `bg-gradient-to-br ${image.gradient} opacity-60 hover:opacity-80`
                }`}
              >
                {image.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
