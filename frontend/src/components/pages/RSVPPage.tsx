import { useState, useEffect, useRef } from 'react';
import { guestService } from '../../services/api';

export const RSVPPage = () => {
  const hasInitialized = useRef(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wishes, setWishes] = useState<Array<{ name: string; message: string; rsvpStatus: string; respondedAt: string }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day} ${month} ${year}`;
  };

  const fetchWishes = async () => {
    try {
      const response = await guestService.getAllGuests();
      if (response.data) {
        const fetchedWishes = response.data.map(guest => ({
          name: guest.name,
          message: guest.message && guest.message.trim() ? guest.message : '-',
          rsvpStatus: guest.rsvpStatus || 'pending',
          respondedAt: guest.respondedAt || new Date().toISOString(),
        }));
        setWishes(fetchedWishes);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    }
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchWishes();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const rsvpStatusMap: Record<string, 'confirmed' | 'declined'> = { yes: 'confirmed', no: 'declined' };
      const guestData = { name, phone, rsvpStatus: rsvpStatusMap[attendance], message };
      const response = await guestService.createGuest(guestData);

      if (response.status === 'success') {
        setIsSubmitted(true);
        setName(''); setPhone(''); setAttendance(''); setMessage('');
        await fetchWishes();
      } else {
        setError(response.message || 'Gagal mengirim konfirmasi');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full bg-gradient-dark-gold flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-400/10 blur-[100px] animate-pulse-soft"></div>
        </div>
        <div className="text-center max-w-sm z-10 animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full glass-gold flex items-center justify-center animate-glow">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-serif text-amber-50 font-light mb-3">Terima Kasih!</h3>
          <p className="text-sm text-amber-100/80 font-light mb-8 leading-relaxed">
            Konfirmasi kehadiran Anda telah kami terima dengan baik.
          </p>
          <button
            onClick={() => { setIsSubmitted(false); fetchWishes(); }}
            className="group relative w-full py-3 overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 text-sm font-medium tracking-[0.15em] uppercase text-amber-950">Kirim Lagi</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-dark-gold flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-400/8 blur-[100px] animate-pulse-soft"></div>
      </div>

      {/* Header */}
      <div className={`text-center pt-5 pb-3 px-5 border-b border-amber-400/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <h2 className="text-base font-serif text-amber-50 font-light">Konfirmasi Kehadiran</h2>
        </div>
        <p className="text-[10px] text-amber-100/70 font-light">Kami menantikan kehadiran Anda</p>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide z-10">
        <form onSubmit={handleSubmit} className={`space-y-3 max-w-md mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {error && (
            <div className="glass-dark border border-rose-400/50 text-rose-300 px-3 py-2 rounded-xl text-xs font-light animate-scale-in">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-[10px] text-amber-400 font-light mb-1.5 tracking-[0.15em] uppercase">Nama Lengkap *</label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/10 border border-amber-400/30 rounded-xl text-sm text-amber-50 placeholder-amber-100/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 font-light transition-all"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] text-amber-400 font-light mb-1.5 tracking-[0.15em] uppercase">Nomor Telepon</label>
            <input
              type="tel"
              placeholder="Opsional"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/10 border border-amber-400/30 rounded-xl text-sm text-amber-50 placeholder-amber-100/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 font-light transition-all"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-[10px] text-amber-400 font-light mb-1.5 tracking-[0.15em] uppercase">Konfirmasi *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAttendance('yes')}
                className={`py-2.5 px-3 rounded-xl text-sm font-light transition-all duration-300 ${attendance === 'yes'
                  ? 'bg-emerald-500/30 text-emerald-300 border-2 border-emerald-400/60'
                  : 'bg-white/10 text-amber-100/80 border border-amber-400/30 hover:border-emerald-400/50'
                  }`}
              >
                ✓ Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('no')}
                className={`py-2.5 px-3 rounded-xl text-sm font-light transition-all duration-300 ${attendance === 'no'
                  ? 'bg-rose-500/30 text-rose-300 border-2 border-rose-400/60'
                  : 'bg-white/10 text-amber-100/80 border border-amber-400/30 hover:border-rose-400/50'
                  }`}
              >
                ✗ Tidak Bisa
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] text-amber-400 font-light mb-1.5 tracking-[0.15em] uppercase">Ucapan & Doa</label>
            <textarea
              placeholder="Tulis ucapan untuk mempelai... (opsional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-white/10 border border-amber-400/30 rounded-xl text-sm text-amber-50 placeholder-amber-100/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 font-light resize-none transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name || !attendance || isLoading}
            className="group relative w-full py-3 overflow-hidden rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 text-sm font-medium tracking-[0.15em] uppercase text-amber-950">
              {isLoading ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </span>
          </button>
        </form>

        {/* Wishes Section */}
        <div className={`mt-6 max-w-md mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-amber-400/40"></div>
            <p className="text-[10px] text-amber-400 font-light tracking-[0.15em] uppercase">Ucapan ({wishes.length})</p>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-amber-400/40"></div>
          </div>

          <div className="space-y-2">
            {wishes.length > 0 ? (
              <>
                {wishes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, i) => (
                  <div key={i} className="glass-dark-subtle rounded-xl p-3 transition-all duration-300 hover:bg-white/10">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-xs font-medium text-amber-50">{item.name}</p>
                      <span className={`text-[9px] font-light px-2 py-0.5 rounded-full ${item.rsvpStatus === 'confirmed' ? 'bg-emerald-500/25 text-emerald-300' :
                        item.rsvpStatus === 'declined' ? 'bg-rose-500/25 text-rose-300' : 'bg-amber-500/25 text-amber-300'
                        }`}>
                        {item.rsvpStatus === 'confirmed' ? '✓ Hadir' : item.rsvpStatus === 'declined' ? '✗ Tidak' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-amber-100/70 font-light leading-relaxed mb-1">{item.message}</p>
                    <p className="text-[9px] text-amber-100/40 font-light">{formatDate(item.respondedAt)}</p>
                  </div>
                ))}

                {/* Pagination */}
                {Math.ceil(wishes.length / itemsPerPage) > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-amber-400/15">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1.5 text-xs font-light glass-dark-subtle text-amber-400 rounded-lg hover:bg-amber-400/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >←</button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.ceil(wishes.length / itemsPerPage) }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-6 h-6 text-xs font-light rounded-lg transition-all ${currentPage === i + 1 ? 'bg-amber-400 text-amber-950' : 'glass-dark-subtle text-amber-400 hover:bg-amber-400/15'
                            }`}
                        >{i + 1}</button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(wishes.length / itemsPerPage), p + 1))}
                      disabled={currentPage === Math.ceil(wishes.length / itemsPerPage)}
                      className="px-2 py-1.5 text-xs font-light glass-dark-subtle text-amber-400 rounded-lg hover:bg-amber-400/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >→</button>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-dark-subtle rounded-xl p-4 text-center">
                <p className="text-xs text-amber-100/60 font-light">Jadilah yang pertama memberikan ucapan!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};