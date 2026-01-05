import { useEffect, useState } from 'react';

export const LocationPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/search/Millennium+Centennial+Center+Jakarta', '_blank');
  };

  return (
    <div className="w-full h-full bg-gradient-dark flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-400/8 blur-[100px] animate-pulse-soft"></div>
      </div>

      <div className="w-full max-w-md z-10 flex flex-col h-full">
        {/* Header */}
        <div className={`mb-3 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="flex items-center justify-center gap-4 mb-1">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <h2 className="text-xs font-light tracking-[0.4em] uppercase text-amber-400">The Venue</h2>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        {/* Map */}
        <div className={`flex-1 rounded-2xl overflow-hidden mb-3 ring-2 ring-amber-400/30 shadow-gold-lg min-h-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.383580691452!2d106.8213287!3d-6.213037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f531e5c7e941%3A0x43d08834f55d0450!2sMillennium%20Centennial%20Center!5e0!3m2!1sen!2sid!4v1765783719156!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Venue Card */}
        <div className={`glass-gold rounded-2xl p-4 mb-3 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-[10px] text-amber-400 font-light tracking-[0.25em] uppercase">Venue</p>
          </div>
          <h3 className="text-base font-serif text-amber-50 font-light mb-2">
            Millennium Centennial Center
          </h3>
          <p className="text-xs text-amber-100/80 font-light leading-relaxed">
            Jl. Gatot Subroto Kav. 26, Jakarta Selatan 12950
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleGetDirections}
          className={`group relative w-full py-3 overflow-hidden rounded-xl transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-amber-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-amber-950">Get Directions</span>
          </div>
        </button>
      </div>
    </div>
  );
};