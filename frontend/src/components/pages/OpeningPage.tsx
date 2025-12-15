import React, { useEffect, useState } from 'react'

interface OpeningPageProps {
  onOpen?: () => void
}

export const OpeningPage: React.FC<OpeningPageProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    if (guest) {
      const decodedName = decodeURIComponent(guest);
      setGuestName(decodedName);
    }
  }, []);
  return (
    <div className="w-full h-[852px] bg-gradient-pink flex items-center justify-center relative overflow-hidden animate-fade-in">
      {/* Soft decorative elements */}
      <div className="absolute top-12 left-6 text-3xl opacity-10 animate-float">🌿</div>
      <div className="absolute top-28 right-8 text-3xl opacity-10 animate-float animation-delay-600">🌸</div>
      <div className="absolute bottom-28 left-12 text-3xl opacity-10 animate-float animation-delay-900">🌺</div>

      <div className="glass rounded-3xl p-10 max-w-xl text-center z-10 shadow-xl animate-scale-in transform-gpu transition-all-smooth">
        <div className="text-7xl mb-3">💎</div>

        <p className="text-xs text-rose-400 tracking-[0.3em] uppercase mb-3 font-medium animate-fade-in-down">The Wedding Of</p>

        <div className="flex flex-col items-center justify-center space-y-4 py-2">
          <h1 className="text-6xl md:text-7xl font-serif text-rose-900 font-extrabold leading-none">Selpia</h1>

          <p className="text-2xl text-amber-500 font-medium">&</p>

          <h1 className="text-6xl md:text-7xl font-serif text-rose-900 font-extrabold leading-none">Ernest</h1>
        </div>

        <div className="flex items-center justify-center gap-3 my-4 opacity-90">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="text-amber-400 text-lg">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        <p className="text-sm text-rose-700 mb-3">Sabtu, 14 Februari 2026</p>

        {guestName && (
          <p className="text-sm text-rose-600 mb-4 font-medium">
            Kepada: <span className="font-semibold">{guestName}</span>
          </p>
        )}

        <div className="mt-3">
          <button onClick={onOpen} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-200/90 to-amber-100/70 text-amber-900 text-base shadow-md hover:shadow-lg transition-all-smooth hover:scale-105">Buka Undangan</button>
        </div>

      </div>
    </div>
  );
};