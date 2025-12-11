export const LocationPage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 flex items-center justify-center relative overflow-hidden animate-fade-in">
      <div className="absolute top-16 left-8 text-5xl opacity-10 animate-float">📍</div>
      <div className="absolute bottom-16 right-8 text-5xl opacity-10 animate-float animation-delay-500">🗺️</div>

      <div className="text-center w-full max-w-lg px-6 relative z-10">
        <h2 className="text-3xl font-serif text-cyan-900 mb-4 font-bold">Lokasi Acara</h2>

        <div className="glass rounded-3xl p-4 mb-4 animate-scale-in transform-gpu transition-all-smooth hover:-translate-y-1">
          <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-3">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-xs text-cyan-600">Tap untuk buka maps</p>
            </div>
          </div>

          <h3 className="text-lg font-serif text-cyan-900 font-bold mb-2">Gedung Serbaguna</h3>
          <p className="text-sm text-cyan-700 leading-relaxed mb-3">Jl. Contoh Alamat No. 123, Kota, Provinsi</p>

          <div className="flex justify-center">
            <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all-smooth transform-gpu hover:-translate-y-1">
              <span className="text-lg">🧭</span>
              <span className="text-sm font-medium">Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};