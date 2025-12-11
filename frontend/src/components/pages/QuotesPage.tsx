export const QuotesPage = () => {
  return (
    <div className="w-full h-[852px] bg-gradient-amber flex flex-col items-center justify-center relative overflow-hidden animate-fade-in px-6">
      <div className="absolute top-16 left-8 text-4xl opacity-8 animate-float">📚</div>
      <div className="absolute bottom-16 right-8 text-4xl opacity-8 animate-float animation-delay-500">✨</div>

      <div className="glass rounded-3xl p-6 max-w-lg text-center z-10 shadow-md animate-scale-in transform-gpu transition-all-smooth hover:-translate-y-1 mx-auto">
        <div className="text-3xl mb-3">📖</div>
        <h2 className="text-2xl font-serif text-amber-900 mb-3 font-bold">Our Love Story</h2>

        <blockquote className="text-base text-amber-900 leading-relaxed mb-4 italic font-serif animate-fade-in-up">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
          agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </blockquote>

        <p className="text-sm text-amber-700 font-medium animate-fade-in">~ QS. Ar-Rum: 21 ~</p>
      </div>
    </div>
  );
};