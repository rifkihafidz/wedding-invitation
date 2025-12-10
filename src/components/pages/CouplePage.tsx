export const CouplePage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-teal flex items-center justify-center relative overflow-hidden">
      {/* soft decorative florals */}
      <div className="absolute top-6 left-6 text-3xl opacity-8 animate-float">🌿</div>
      <div className="absolute bottom-12 right-8 text-3xl opacity-8 animate-float animation-delay-600">🌸</div>

      <div className="w-full max-w-3xl px-6 relative z-10">
        <h2 className="text-2xl font-serif text-teal-900 mb-6 font-medium text-center tracking-widest opacity-90">
          The Bride & Groom
        </h2>

        <div className="glass texture-overlay rounded-3xl p-10 shadow-xl mx-auto max-w-lg animate-scale-in flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Top name */}
            <div className="text-center">
              <h3 className="text-5xl md:text-6xl font-serif text-rose-900 font-extrabold leading-tight">
                Selpia
              </h3>
              <p className="mt-3 text-xs text-teal-700 italic">Putri dari</p>
              <p className="text-xs text-teal-700 font-medium mt-1">
                Bapak [Nama Ayah] & Ibu [Nama Ibu]
              </p>
            </div>

            {/* Ornament (delicate SVG) */}
            <div aria-hidden className="flex items-center justify-center">
              <svg
                width="120"
                height="20"
                viewBox="0 0 120 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80"
              >
                <path
                  d="M10 10 C30 0, 50 20, 70 10 C90 0, 110 20, 130 10"
                  stroke="#b88746"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  fill="none"
                />
              </svg>
            </div>

            {/* Bottom name */}
            <div className="text-center">
              <h3 className="text-5xl md:text-6xl font-serif text-rose-900 font-extrabold leading-tight">
                Ernest
              </h3>
              <p className="mt-3 text-xs text-teal-700 italic">Putra dari</p>
              <p className="text-xs text-teal-700 font-medium mt-1">
                Bapak [Nama Ayah] & Ibu [Nama Ibu]
              </p>
            </div>

            {/* Separator + invitation text */}
            <div className="w-full">
              <div className="h-px w-36 mx-auto bg-gradient-to-r from-transparent via-accent-gold to-transparent my-4" />
              <p className="text-sm text-teal-700 text-center">
                Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa
                restu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
