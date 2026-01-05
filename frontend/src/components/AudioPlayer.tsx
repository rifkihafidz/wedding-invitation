import { useRef, useCallback, useEffect } from 'react';
import backsound from '../assets/music/Backsound.mp3';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInitialized = useRef(false);

  // Auto-play on first mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [setIsPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  return (
    <div className="absolute bottom-24 right-4 z-50">
      <audio ref={audioRef} src={backsound} loop preload="auto" />

      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center glass-gold shadow-gold-lg hover:scale-110 transition-transform ${isPlaying ? 'animate-glow' : ''
          }`}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
};