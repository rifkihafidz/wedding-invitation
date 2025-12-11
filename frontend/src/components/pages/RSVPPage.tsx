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
  const itemsPerPage = 5;

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = date.getDate();
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${hours}.${minutes}, ${day} ${month} ${year}`;
  };

  // Fetch wishes on mount and after submission
  const fetchWishes = async () => {
    try {
      const response = await guestService.getAllGuests();
      if (response.data) {
        const fetchedWishes = response.data
          .map(guest => ({
            name: guest.name,
            message: guest.message && guest.message.trim() ? guest.message : '-',
            rsvpStatus: guest.rsvpStatus || 'pending',
            respondedAt: guest.respondedAt || new Date().toISOString(),
          }));
        setWishes(fetchedWishes);
        setCurrentPage(1); // Reset to first page when fetching new data
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    }
  };

  useEffect(() => {
    // Only fetch on first mount to avoid double requests in Strict Mode
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
      const rsvpStatusMap: Record<string, 'confirmed' | 'declined'> = {
        yes: 'confirmed',
        no: 'declined',
      };

      const guestData = {
        name,
        phone,
        rsvpStatus: rsvpStatusMap[attendance],
        message,
      };

      const response = await guestService.createGuest(guestData);

      if (response.status === 'success') {
        setIsSubmitted(true);
        // Reset form
        setName('');
        setPhone('');
        setAttendance('');
        setMessage('');
        // Refresh wishes to show new guest
        await fetchWishes();
      } else {
        setError(response.message || 'Failed to submit RSVP');
      }
    } catch (err) {
      setError('Error submitting RSVP. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
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
            onClick={() => {
              setIsSubmitted(false);
              // Refresh wishes when returning to form
              fetchWishes();
            }}
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
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-xs">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
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

          {/* Phone Input */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-1.5">
              Nomor Telepon <span className="text-amber-400">(opsional)</span>
            </label>
            <input
              type="tel"
              placeholder="Masukkan nomor telepon Anda"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Attendance Selection */}
          <div>
            <label className="block text-xs font-medium text-amber-800 mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-2">
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
            disabled={!name || !attendance || isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Mengirim...
              </>
            ) : (
              <>
                <span>Kirim Konfirmasi</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>
        
        {/* Wishes Section */}
        <div className="mt-5 bg-white/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <p className="text-xs font-semibold text-amber-800">Ucapan Tamu ({wishes.length})</p>
          </div>
          <div className="space-y-2.5">
            {wishes.length > 0 ? (
              <>
                {wishes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, i) => (
                  <div key={i} className="bg-white/70 rounded-xl p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-amber-900">{item.name}</p>
                        <p className="text-[11px] text-amber-600 mt-0.5 leading-relaxed">{item.message}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap ${
                        item.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                        item.rsvpStatus === 'declined' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.rsvpStatus === 'confirmed' ? 'Hadir' :
                         item.rsvpStatus === 'declined' ? 'Tidak' :
                         'Pending'}
                      </span>
                    </div>
                    <p className="text-[10px] text-amber-500 mt-1.5">{formatDate(item.respondedAt)}</p>
                  </div>
                ))}
                
                {/* Pagination */}
                {Math.ceil(wishes.length / itemsPerPage) > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4 pt-2 border-t border-amber-200">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-[11px] font-semibold bg-white text-amber-700 rounded-lg border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Sebelumnya
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.ceil(wishes.length / itemsPerPage) }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-7 h-7 text-[10px] font-semibold rounded-lg transition-colors ${
                            currentPage === i + 1
                              ? 'bg-amber-500 text-white'
                              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(wishes.length / itemsPerPage), p + 1))}
                      disabled={currentPage === Math.ceil(wishes.length / itemsPerPage)}
                      className="px-3 py-1.5 text-[11px] font-semibold bg-white text-amber-700 rounded-lg border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-[11px] text-amber-600">Jadilah yang pertama memberikan ucapan! 💌</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};