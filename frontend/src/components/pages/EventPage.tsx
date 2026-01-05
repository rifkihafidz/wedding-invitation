import { useEffect, useState } from 'react';
import { Countdown } from '../Countdown';

export const EventPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const weddingDate = new Date('2026-02-14T08:00:00');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-dark-gold flex items-center justify-center relative overflow-hidden p-5">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-rose-400/8 blur-[80px] animate-pulse-soft animation-delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-amber-400/40 animate-particle"></div>
      <div className="absolute bottom-28 left-12 w-1.5 h-1.5 rounded-full bg-amber-300/35 animate-particle animation-delay-600"></div>

      <div className="w-full max-w-sm text-center z-10">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <h2 className="text-xs font-light tracking-[0.4em] uppercase text-amber-400">Save The Date</h2>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
          <p className="text-lg text-amber-50 font-serif font-light tracking-wide">
            Sabtu, 14 Februari 2026
          </p>
        </div>

        {/* Countdown */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Countdown targetDate={weddingDate} />
        </div>

        {/* Events */}
        <div className="space-y-4">
          {/* Ceremony */}
          <div className={`glass-gold rounded-2xl p-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
              <p className="text-[10px] text-amber-400 font-light tracking-[0.25em] uppercase">Holy Matrimony</p>
            </div>
            <p className="text-xl font-serif text-amber-50 font-light mb-1">Akad Nikah</p>
            <div className="flex items-center justify-center gap-2 text-amber-100/80">
              <span className="text-amber-400/60 text-xs">✦</span>
              <p className="text-sm font-light">08:00 - 10:00 WIB</p>
              <span className="text-amber-400/60 text-xs">✦</span>
            </div>
          </div>

          {/* Divider */}
          <div className={`flex items-center justify-center gap-3 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/40"></div>
            <div className="w-2 h-2 rounded-full border border-amber-400/60 animate-pulse-soft"></div>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/40"></div>
          </div>

          {/* Reception */}
          <div className={`glass-gold rounded-2xl p-5 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-rose-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              <p className="text-[10px] text-amber-400 font-light tracking-[0.25em] uppercase">Wedding Reception</p>
            </div>
            <p className="text-xl font-serif text-amber-50 font-light mb-1">Resepsi</p>
            <div className="flex items-center justify-center gap-2 text-amber-100/80">
              <span className="text-amber-400/60 text-xs">✦</span>
              <p className="text-sm font-light">11:00 - 14:00 WIB</p>
              <span className="text-amber-400/60 text-xs">✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};