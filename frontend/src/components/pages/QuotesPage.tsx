export const QuotesPage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-amber flex items-center justify-center relative overflow-hidden p-6">
      <div className="w-full max-w-sm text-center z-10">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-6 bg-amber-300"></div>
          <span className="text-amber-400 text-sm font-light">"</span>
          <div className="h-px w-6 bg-amber-300"></div>
        </div>

        {/* Quote */}
        <blockquote className="mb-8">
          <p className="text-base font-serif text-amber-900 font-light leading-relaxed mb-6">
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
            agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.
          </p>
          <p className="text-xs text-amber-700 font-light tracking-widest uppercase">
            QS. Ar-Rum: 21
          </p>
        </blockquote>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 pt-8 border-t border-amber-200">
          <div className="h-px w-6 bg-amber-300"></div>
          <span className="text-amber-400 text-sm font-light">"</span>
          <div className="h-px w-6 bg-amber-300"></div>
        </div>
      </div>
    </div>
  );
};