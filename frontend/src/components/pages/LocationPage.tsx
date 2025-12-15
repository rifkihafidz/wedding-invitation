export const LocationPage = () => {
  const handleGetDirections = () => {
    window.open(
      'https://www.google.com/maps/search/Millennium+Centennial+Center+Jakarta',
      '_blank'
    );
  };

  return (
    <div className="w-full h-[852px] bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden p-6">
      <div className="w-full max-w-sm z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-cyan-300"></div>
            <h2 className="text-xs font-light tracking-widest uppercase text-cyan-700">The Venue</h2>
            <div className="h-px w-8 bg-cyan-300"></div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-md mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.383580691452!2d106.8213287!3d-6.213037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f531e5c7e941%3A0x43d08834f55d0450!2sMillennium%20Centennial%20Center!5e0!3m2!1sen!2sid!4v1765783719156!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Venue details */}
        <div className="mb-4">
          <p className="text-xs text-cyan-500 font-light tracking-widest uppercase mb-2">Venue</p>
          <h3 className="text-lg font-serif text-cyan-900 font-light mb-2">
            Millennium Centennial Center
          </h3>
          <p className="text-xs text-cyan-700 font-light leading-relaxed mb-1">
            Jl. Gatot Subroto Kav. 26
          </p>
          <p className="text-xs text-cyan-700 font-light leading-relaxed">
            Jakarta Selatan 12950, Indonesia
          </p>
        </div>

        {/* Get directions button */}
        <button
          onClick={handleGetDirections}
          className="w-full py-2 text-xs font-light tracking-widest uppercase text-cyan-900 border border-cyan-400 hover:border-cyan-600 hover:bg-cyan-50 transition-all duration-300"
        >
          Get Directions
        </button>
      </div>
    </div>
  );
};