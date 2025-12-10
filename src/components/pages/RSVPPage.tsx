import { useState } from 'react';

export const RSVPPage = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [attendance, setAttendance] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-[852px] bg-gradient-amber flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h3 className="text-2xl font-serif text-amber-900 font-bold mb-2">Terima Kasih!</h3>
          <p className="text-sm text-amber-700 mb-6">Konfirmasi kehadiran Anda telah kami terima</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            Kirim Lagi
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[852px] bg-gradient-amber flex flex-col relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center pt-6 pb-4 px-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3">
          <span className="text-2xl">💌</span>
        </div>
        <h2 className="text-xl font-serif text-amber-900 font-bold">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-xs text-amber-600 mt-1">
          Kami menantikan kehadiran Anda
        </p>
      </div>
      
      {/* Form Section - Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              required
            />
          </div>
          
          {/* Number of Guests */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1.5">
              Jumlah Tamu
            </label>
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-amber-200 rounded-xl text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4">4 Orang</option>
              <option value="5">5 Orang</option>
            </select>
          </div>
          
          {/* Attendance Selection */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAttendance('yes')}
                className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                  attendance === 'yes' 
                    ? 'bg-green-500 text-white shadow-md scale-[1.02]' 
                    : 'bg-white/80 text-amber-700 border border-amber-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <span className="block text-lg mb-1">😊</span>
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('maybe')}
                className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                  attendance === 'maybe' 
                    ? 'bg-amber-500 text-white shadow-md scale-[1.02]' 
                    : 'bg-white/80 text-amber-700 border border-amber-200 hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                <span className="block text-lg mb-1">🤔</span>
                Mungkin
              </button>
              <button
                type="button"
                onClick={() => setAttendance('no')}
                className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                  attendance === 'no' 
                    ? 'bg-rose-500 text-white shadow-md scale-[1.02]' 
                    : 'bg-white/80 text-amber-700 border border-amber-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <span className="block text-lg mb-1">😔</span>
                Tidak Bisa
              </button>
            </div>
          </div>
          
          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1.5">
              Ucapan & Doa <span className="text-amber-400">(opsional)</span>
            </label>
            <textarea
              placeholder="Tulis ucapan untuk kedua mempelai..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/80 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || !attendance}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Kirim Konfirmasi</span>
            <span>→</span>
          </button>
        </form>
        
        {/* Wishes Section */}
        <div className="mt-5 bg-white/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <p className="text-xs font-semibold text-amber-800">Ucapan Tamu</p>
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'Budi & Keluarga', message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah 🤲' },
              { name: 'Ani Lestari', message: 'Bahagia selalu untuk kalian berdua! 💕' },
              { name: 'Rudi Hermawan', message: 'Semoga langgeng sampai kakek nenek ya! 🎊' },
            ].map((item, i) => (
              <div key={i} className="bg-white/70 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-900">{item.name}</p>
                <p className="text-[11px] text-amber-600 mt-0.5 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};