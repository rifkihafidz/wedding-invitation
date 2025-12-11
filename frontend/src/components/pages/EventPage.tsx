import { Countdown } from '../Countdown';

export const EventPage = () => {
  const weddingDate = new Date('2026-02-14T08:00:00');
  
  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center relative overflow-hidden animate-fade-in">
      <div className="absolute top-16 left-8 text-5xl opacity-10 animate-float">⏰</div>
      <div className="absolute bottom-16 right-8 text-5xl opacity-10 animate-float animation-delay-500">📅</div>
      
      <div className="text-center w-full max-w-lg px-6 relative z-10">
        <h2 className="text-3xl font-serif text-rose-900 mb-4 font-bold">Save The Date</h2>

        <div className="mb-6 animate-scale-in transform-gpu transition-all-smooth">
          <Countdown targetDate={weddingDate} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="glass rounded-3xl p-5 shadow-md transform-gpu transition-all-smooth hover:-translate-y-1">
            <div className="text-3xl mb-2">💍</div>
            <h3 className="text-lg font-serif text-rose-900 font-bold mb-1">Akad Nikah</h3>
            <p className="text-sm text-rose-700">Sabtu, 14 Februari 2026 • 08:00 - 10:00 WIB</p>
          </div>

          <div className="glass rounded-3xl p-5 shadow-md transform-gpu transition-all-smooth hover:-translate-y-1">
            <div className="text-3xl mb-2">🎊</div>
            <h3 className="text-lg font-serif text-rose-900 font-bold mb-1">Resepsi</h3>
            <p className="text-sm text-rose-700">Sabtu, 14 Februari 2026 • 11:00 - 14:00 WIB</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all-smooth transform-gpu hover:-translate-y-1">
            <span className="text-lg">📅</span>
            <span className="text-sm font-medium">Add to Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};