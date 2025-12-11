export const GalleryPage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden animate-fade-in">
      {/* Decorative elements */}
      <div className="absolute top-16 left-8 text-5xl opacity-10 animate-float">📸</div>
      <div className="absolute bottom-16 right-8 text-5xl opacity-10 animate-float animation-delay-500">🖼️</div>

      <div className="w-full max-w-3xl px-6 text-center z-10">
        <h2 className="text-3xl font-serif text-indigo-900 mb-3 font-bold">Our Gallery</h2>
        <p className="text-sm text-indigo-700 mb-6">Momen berharga dalam perjalanan cinta kami</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {['📷','💖','💐','🎉'].map((icon, i) => (
            <div key={i} className="aspect-square glass rounded-2xl flex items-center justify-center text-4xl transform-gpu transition-all-smooth hover:scale-105 hover:shadow-2xl cursor-pointer animate-scale-in">
              <span>{icon}</span>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-5 animate-scale-in hover:scale-105 transition-all-smooth">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm text-indigo-700 font-medium">Tap untuk melihat semua foto</p>
        </div>
      </div>
    </div>
  );
};
