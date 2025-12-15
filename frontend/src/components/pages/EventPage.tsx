import { Countdown } from '../Countdown';

export const EventPage = () => {
  const weddingDate = new Date('2026-02-14T08:00:00');
  
  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center relative overflow-hidden p-6">
      <div className="w-full max-w-sm text-center z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-rose-300"></div>
            <h2 className="text-xs font-light tracking-widest uppercase text-rose-700">The Moment</h2>
            <div className="h-px w-8 bg-rose-300"></div>
          </div>
          <p className="text-sm text-rose-600 font-light">
            Sabtu, 14 Februari 2026
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-10">
          <Countdown targetDate={weddingDate} />
        </div>

        {/* Events */}
        <div className="space-y-6">
          {/* Ceremony */}
          <div className="pb-6 border-b border-rose-200">
            <p className="text-xs text-rose-500 font-light tracking-widest uppercase mb-2">Ceremony</p>
            <p className="text-lg font-serif text-rose-900 font-light mb-1">Akad Nikah</p>
            <p className="text-xs text-rose-600 font-light">08:00 - 10:00 WIB</p>
          </div>

          {/* Reception */}
          <div>
            <p className="text-xs text-rose-500 font-light tracking-widest uppercase mb-2">Reception</p>
            <p className="text-lg font-serif text-rose-900 font-light mb-1">Resepsi</p>
            <p className="text-xs text-rose-600 font-light">11:00 - 14:00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
};