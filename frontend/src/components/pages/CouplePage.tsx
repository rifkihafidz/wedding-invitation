export const CouplePage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-teal flex items-center justify-center relative overflow-hidden p-6">
      <div className="w-full max-w-sm text-center z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-teal-300"></div>
            <h2 className="text-xs font-light tracking-widest uppercase text-teal-700">The Couple</h2>
            <div className="h-px w-8 bg-teal-300"></div>
          </div>
        </div>

        {/* Bride Section */}
        <div className="mb-10">
          <h3 className="text-4xl font-serif text-teal-900 font-light mb-3">
            Selpia
          </h3>
          <p className="text-xs text-teal-600 font-light mb-2">
            Putri dari
          </p>
          <p className="text-sm text-teal-700 font-light">
            Bapak Satrio & Ibu Dina
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-6 bg-teal-300"></div>
          <span className="text-teal-400 text-xs font-light">&</span>
          <div className="h-px w-6 bg-teal-300"></div>
        </div>

        {/* Groom Section */}
        <div className="mb-10">
          <h3 className="text-4xl font-serif text-teal-900 font-light mb-3">
            Ernest
          </h3>
          <p className="text-xs text-teal-600 font-light mb-2">
            Putra dari
          </p>
          <p className="text-sm text-teal-700 font-light">
            Bapak Sandro & Ibu Cynthia
          </p>
        </div>

        {/* Closing message */}
        <div className="pt-6 border-t border-teal-300">
          <p className="text-xs text-teal-600 font-light leading-relaxed">
            Kami memohon doa dan restu untuk perjalanan hidup kami
          </p>
        </div>
      </div>
    </div>
  );
};
