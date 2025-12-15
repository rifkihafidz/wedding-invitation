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
      <div className="w-full h-[852px] bg-gradient-amber flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-6">✓</p>
          <h3 className="text-xl font-serif text-amber-900 font-light mb-3">Terima Kasih</h3>
          <p className="text-sm text-amber-700 font-light mb-8 leading-relaxed">
            Konfirmasi kehadiran Anda telah kami terima. Terima kasih atas dukungannya.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              fetchWishes();
            }}
            className="w-full py-2 text-xs font-light tracking-widest uppercase text-amber-900 border border-amber-400 hover:border-amber-600 hover:bg-amber-50 transition-all duration-300"
          >
            Kirim Lagi
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[852px] bg-gradient-amber flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="text-center pt-6 pb-4 px-6 border-b border-amber-200">
        <h2 className="text-lg font-serif text-amber-900 font-light mb-1">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-xs text-amber-600 font-light">
          Kami menantikan kehadiran Anda
        </p>
      </div>
      
      {/* Form Section */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-xs font-light">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs text-amber-700 font-light mb-2 tracking-widest uppercase">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/60 border border-amber-200 rounded-lg text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-light transition-all"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-xs text-amber-700 font-light mb-2 tracking-widest uppercase">
              Nomor Telepon (Opsional)
            </label>
            <input
              type="tel"
              placeholder="Masukkan nomor telepon Anda"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-white/60 border border-amber-200 rounded-lg text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-light transition-all"
            />
          </div>
          
          {/* Attendance Selection */}
          <div>
            <label className="block text-xs text-amber-700 font-light mb-2 tracking-widest uppercase">
              Konfirmasi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendance('yes')}
                className={`py-2.5 px-3 rounded-lg text-sm font-light transition-all ${
                  attendance === 'yes' 
                    ? 'bg-green-500 text-white border border-green-600' 
                    : 'bg-white/60 text-amber-700 border border-amber-200 hover:bg-green-50'
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('no')}
                className={`py-2.5 px-3 rounded-lg text-sm font-light transition-all ${
                  attendance === 'no' 
                    ? 'bg-red-500 text-white border border-red-600' 
                    : 'bg-white/60 text-amber-700 border border-amber-200 hover:bg-red-50'
                }`}
              >
                Tidak Bisa
              </button>
            </div>
          </div>
          
          {/* Message */}
          <div>
            <label className="block text-xs text-amber-700 font-light mb-2 tracking-widest uppercase">
              Ucapan & Doa (Opsional)
            </label>
            <textarea
              placeholder="Tulis ucapan untuk kedua mempelai..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white/60 border border-amber-200 rounded-lg text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-light resize-none transition-all"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || !attendance || isLoading}
            className="w-full py-2.5 bg-amber-600 text-white rounded-lg text-sm font-light hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </button>
        </form>
        
        {/* Wishes Section */}
        <div className="mt-6 max-w-sm mx-auto">
          <p className="text-xs text-amber-700 font-light tracking-widest uppercase mb-3">
            Ucapan Tamu ({wishes.length})
          </p>
          <div className="space-y-2">
            {wishes.length > 0 ? (
              <>
                {wishes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, i) => (
                  <div key={i} className="bg-white/50 rounded-lg p-3">
                    <p className="text-xs font-light text-amber-900 mb-1">{item.name}</p>
                    <p className="text-xs text-amber-700 font-light mb-2 leading-relaxed">{item.message}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-light px-2 py-1 rounded-md ${
                        item.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                        item.rsvpStatus === 'declined' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.rsvpStatus === 'confirmed' ? 'Hadir' :
                         item.rsvpStatus === 'declined' ? 'Tidak' :
                         'Pending'}
                      </span>
                      <p className="text-[10px] text-amber-500 font-light">{formatDate(item.respondedAt)}</p>
                    </div>
                  </div>
                ))}
                
                {/* Pagination */}
                {Math.ceil(wishes.length / itemsPerPage) > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-amber-200">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1 text-[10px] font-light bg-white text-amber-700 rounded border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ← 
                    </button>
                    
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.ceil(wishes.length / itemsPerPage) }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-6 h-6 text-[10px] font-light rounded transition-colors ${
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
                      className="px-2 py-1 text-[10px] font-light bg-white text-amber-700 rounded border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/50 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-600 font-light">Jadilah yang pertama memberikan ucapan!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};