export const ThanksPage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center relative overflow-hidden py-8 animate-fade-in">
      <div className="w-full max-w-[360px] mx-auto px-4">
        <div className="bg-white/95 rounded-3xl shadow-xl p-6 text-center">
          <div className="text-4xl mb-2">💝</div>
          <h2 className="text-xl font-serif text-rose-900 font-medium">Terima Kasih</h2>
          <p className="text-sm text-rose-700 mt-3">Terima kasih atas doa dan kehadiran Anda. Semoga kebahagiaan menyertai kita semua.</p>

          <div className="mt-6">
            <p className="text-sm text-rose-500">Selpia & Ernest</p>
            <p className="text-xs text-rose-400 mt-1">bersama keluarga besar</p>
          </div>

          <div className="mt-6">
            <button onClick={() => window.history.back()} className="px-4 py-2 rounded-full bg-rose-50 text-rose-700 text-sm">Kembali</button>
          </div>
        </div>
      </div>

      {/* decorative corners */}
      <div className="absolute top-6 left-6 text-3xl opacity-10">🌿</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-10">💐</div>
    </div>
  )
}