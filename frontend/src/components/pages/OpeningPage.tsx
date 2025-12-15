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
    <div className="w-full h-[852px] flex items-center justify-center relative overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

      <div className="px-8 max-w-sm text-center z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl font-serif text-rose-900 font-light mb-6 tracking-wide">
            Selpia & Ernest
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-rose-300"></div>
            <span className="text-rose-400 text-sm font-light tracking-widest">Wedding</span>
            <div className="h-px w-8 bg-rose-300"></div>
          </div>

          <p className="text-sm text-rose-600 font-light tracking-wide mb-2">
            Sabtu, 14 Februari 2026
          </p>
        </div>

        {/* Guest greeting */}
        {guestName && (
          <div className="mb-8 pb-8 border-b border-rose-200">
            <p className="text-xs text-rose-500 font-light tracking-widest uppercase mb-2">
              Dear
            </p>
            <p className="text-xl text-rose-800 font-serif font-light">
              {guestName}
            </p>
          </div>
        )}

        {/* Invitation text */}
        <p className="text-sm text-rose-700 font-light leading-relaxed mb-8">
          Together with their families, 
          <br /> Selpia and Ernest cordially invite you 
          <br /> to celebrate their wedding
        </p>

        {/* Open button */}
        <button
          onClick={onOpen}
          className="px-8 py-3 text-sm font-light tracking-widest uppercase text-rose-900 border border-rose-400 hover:border-rose-600 hover:bg-rose-50 transition-all duration-300"
        >
          Open Invitation
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
    </div>
  );
};