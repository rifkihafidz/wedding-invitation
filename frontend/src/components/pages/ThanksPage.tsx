import { useEffect, useState } from 'react';

export const ThanksPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-dark-rose flex items-center justify-center relative overflow-hidden p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-rose-400/12 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-amber-400/10 blur-[80px] animate-pulse-soft animation-delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-24 left-16 w-2 h-2 rounded-full bg-rose-300/40 animate-particle"></div>
      <div className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-amber-300/35 animate-particle animation-delay-300"></div>
      <div className="absolute bottom-32 left-24 w-1.5 h-1.5 rounded-full bg-rose-400/30 animate-particle animation-delay-600"></div>
      <div className="absolute bottom-48 right-16 w-2 h-2 rounded-full bg-amber-400/25 animate-particle animation-delay-900"></div>

      <div className="w-full max-w-sm text-center z-10">
        {/* Heart icon */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-20 h-20 mx-auto rounded-full glass-gold flex items-center justify-center animate-glow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-rose-400 animate-pulse-soft">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        </div>

        {/* Thank you text */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-serif text-amber-50 font-light mb-5 tracking-wide"
            style={{ textShadow: '0 0 40px rgba(212, 148, 157, 0.3)' }}>
            Terima Kasih
          </h2>
          <p className="text-sm text-amber-100/80 font-light leading-relaxed">
            Terima kasih atas doa, restu, dan kehadiran Anda.
            <br />Semoga kebahagiaan dan berkah selalu menyertai kita semua.
          </p>
        </div>

        {/* Divider */}
        <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400/60 animate-pulse-soft"></div>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>

        {/* Couple names */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-2xl md:text-3xl font-serif text-amber-50 font-light mb-3 tracking-wide animate-glow-text">
            Selpia & Ernest
          </p>
          <p className="text-xs text-amber-300/80 font-light tracking-widest uppercase">
            Bersama Keluarga Besar
          </p>
        </div>

        {/* Bottom decoration */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300/50"></div>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-rose-300/60">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300/50"></div>
          </div>
        </div>
      </div>
    </div>
  )
}