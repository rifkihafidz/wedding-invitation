import { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="absolute bottom-24 right-3 z-50">
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />
      
      {/* Music Play/Pause Button - Transparent & matching theme */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 bg-rose-400/70 backdrop-blur-sm border border-rose-300/50 text-white hover:bg-rose-500/80"
      >
        {isPlaying ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  );
};