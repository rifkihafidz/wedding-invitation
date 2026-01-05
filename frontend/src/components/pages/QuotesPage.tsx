import { useEffect, useState } from 'react';

export const QuotesPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-dark-gold flex items-center justify-center relative overflow-hidden p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-amber-300/8 blur-[80px] animate-pulse-soft animation-delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-24 right-20 w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-particle"></div>
      <div className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-amber-300/30 animate-particle animation-delay-400"></div>

      <div className="w-full max-w-sm text-center z-10">
        {/* Opening quote mark */}
        <div className={`flex items-center justify-center gap-5 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <span className="text-4xl font-serif text-amber-400 animate-glow-text">"</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>

        {/* Quote */}
        <blockquote className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-base font-serif text-amber-50 font-light leading-loose"
            style={{ textShadow: '0 0 30px rgba(232, 200, 114, 0.15)' }}>
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
            agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.
          </p>
        </blockquote>

        {/* Source */}
        <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="h-px w-6 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <p className="text-xs text-amber-400 font-light tracking-[0.25em] uppercase">
            QS. Ar-Rum: 21
          </p>
          <div className="h-px w-6 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>

        {/* Closing quote mark */}
        <div className={`flex items-center justify-center gap-5 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60"></div>
          <span className="text-4xl font-serif text-amber-400 animate-glow-text">"</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60"></div>
        </div>
      </div>
    </div>
  );
};