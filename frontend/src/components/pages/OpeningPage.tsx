import React, { useEffect, useState } from 'react'

interface OpeningPageProps {
  onOpen?: () => void
}

export const OpeningPage: React.FC<OpeningPageProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    if (guest) {
      const decodedName = decodeURIComponent(guest);
      setGuestName(decodedName);
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-dark">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-amber-400/30 animate-particle"></div>
        <div className="absolute top-40 right-16 w-1.5 h-1.5 rounded-full bg-amber-300/40 animate-particle animation-delay-300"></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 rounded-full bg-amber-400/25 animate-particle animation-delay-600"></div>
        <div className="absolute bottom-48 right-12 w-1 h-1 rounded-full bg-amber-300/35 animate-particle animation-delay-900"></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-500/10 blur-[80px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-rose-400/8 blur-[60px] animate-pulse-soft animation-delay-500"></div>
      </div>

      {/* Corner decorations with animation */}
      <div className={`absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-amber-400/40 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-x-4 -translate-y-4'}`}></div>
      <div className={`absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-amber-400/40 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-x-4 -translate-y-4'}`}></div>
      <div className={`absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-amber-400/40 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-x-4 translate-y-4'}`}></div>
      <div className={`absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-amber-400/40 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-x-4 translate-y-4'}`}></div>

      <div className="px-8 max-w-sm text-center z-10">
        {/* Top decorative line */}
        <div className={`mx-auto mb-8 overflow-hidden ${isLoaded ? 'w-16' : 'w-0'} transition-all duration-1000`}>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>

        {/* The Wedding of */}
        <p className={`text-xs text-amber-300/90 font-light tracking-[0.4em] uppercase mb-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          The Wedding of
        </p>

        {/* Bride Name */}
        <h1 className={`text-5xl md:text-6xl font-serif text-amber-50 font-light mb-2 tracking-wider transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ textShadow: '0 0 40px rgba(232, 200, 114, 0.3)' }}>
          Selpia
        </h1>

        {/* Ampersand */}
        <div className={`flex items-center justify-center gap-4 my-3 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <span className="text-2xl font-serif text-amber-400 animate-glow-text">&</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>

        {/* Groom Name */}
        <h1 className={`text-5xl md:text-6xl font-serif text-amber-50 font-light mb-6 tracking-wider transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ textShadow: '0 0 40px rgba(232, 200, 114, 0.3)' }}>
          Ernest
        </h1>

        {/* Date */}
        <div className={`mb-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm text-amber-100/90 font-light tracking-[0.2em]">
            14 • 02 • 2026
          </p>
        </div>

        {/* Guest greeting */}
        {guestName && (
          <div className={`mb-8 py-5 border-y border-amber-400/30 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-[10px] text-amber-300/80 font-light tracking-[0.3em] uppercase mb-2">
              Kepada Yth.
            </p>
            <p className="text-xl text-amber-50 font-serif font-light">
              {guestName}
            </p>
          </div>
        )}

        {/* Invitation text */}
        <p className={`text-sm text-amber-100/80 font-light leading-relaxed mb-8 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Dengan penuh kebahagiaan, kami mengundang Anda
          <br /> untuk merayakan hari bahagia kami
        </p>

        {/* Open button */}
        <button
          onClick={onOpen}
          className={`group relative px-10 py-3.5 text-sm font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
          <span className="relative z-10 text-amber-950 font-medium">Buka Undangan</span>
        </button>

        {/* Bottom decorative line */}
        <div className={`mx-auto mt-8 overflow-hidden ${isLoaded ? 'w-16' : 'w-0'} transition-all duration-1000 delay-900`}>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};