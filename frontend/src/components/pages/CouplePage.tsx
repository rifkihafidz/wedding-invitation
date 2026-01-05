import { useEffect, useState } from 'react';

export const CouplePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-dark-rose flex items-center justify-center relative overflow-hidden p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-rose-400/10 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-400/8 blur-[80px] animate-pulse-soft animation-delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-28 left-12 w-2 h-2 rounded-full bg-rose-300/40 animate-particle"></div>
      <div className="absolute bottom-36 right-16 w-1.5 h-1.5 rounded-full bg-amber-300/35 animate-particle animation-delay-500"></div>

      <div className="w-full max-w-sm text-center z-10">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300/60"></div>
            <h2 className="text-xs font-light tracking-[0.4em] uppercase text-rose-300">The Couple</h2>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300/60"></div>
          </div>
        </div>

        {/* Bride Section */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <h3 className="text-4xl md:text-5xl font-serif text-amber-50 font-light mb-2 tracking-wide"
            style={{ textShadow: '0 0 40px rgba(212, 148, 157, 0.3)' }}>
            Selpia
          </h3>
          <p className="text-[10px] text-rose-300/80 font-light tracking-wide mb-1">
            Putri dari
          </p>
          <p className="text-sm text-amber-100/90 font-light">
            Bapak Satrio & Ibu Dina
          </p>
        </div>

        {/* Divider with emoji */}
        <div className={`flex items-center justify-center gap-5 my-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <div className="w-11 h-11 rounded-full glass-gold flex items-center justify-center animate-pulse-soft">
            <span className="text-xl">💑</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>

        {/* Groom Section */}
        <div className={`mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <h3 className="text-4xl md:text-5xl font-serif text-amber-50 font-light mb-2 tracking-wide"
            style={{ textShadow: '0 0 40px rgba(212, 148, 157, 0.3)' }}>
            Ernest
          </h3>
          <p className="text-[10px] text-rose-300/80 font-light tracking-wide mb-1">
            Putra dari
          </p>
          <p className="text-sm text-amber-100/90 font-light">
            Bapak Sandro & Ibu Cynthia
          </p>
        </div>

        {/* Closing message */}
        <div className={`pt-6 border-t border-amber-400/25 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs text-amber-100/70 font-light leading-relaxed tracking-wide">
            Kami memohon doa dan restu
            <br />untuk perjalanan hidup kami
          </p>
        </div>
      </div>
    </div>
  );
};
