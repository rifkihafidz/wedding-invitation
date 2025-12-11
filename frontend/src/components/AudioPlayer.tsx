import { useRef, useEffect } from 'react';
import backsound from '../assets/music/Backsound.mp3';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isOpened: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying, isOpened }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const unmuteAttemptedRef = useRef(false);

  // Step 1: Play audio after invitation is opened
  useEffect(() => {
    if (!isOpened || unmuteAttemptedRef.current) return;

    const audio = audioRef.current;
    if (!audio) return;

    console.log('🎵 Playing audio after user opened invitation...');
    audio.muted = false;
    audio.play()
      .then(() => {
        console.log('✓ Audio playing!');
        setIsPlaying(true);
        unmuteAttemptedRef.current = true;
      })
      .catch((error) => {
        console.log('✗ Play failed:', error.message);
        setIsPlaying(false);
      });
  }, [isOpened, setIsPlaying]);

  // Step 2: Monitor audio play/pause events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      console.log('▶️  Audio playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('⏸️  Audio paused');
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [setIsPlaying]);

  // Step 3: Handle button clicks
  const handlePlayPauseClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      console.log('⏸️  Pause clicked');
      audio.pause();
      setIsPlaying(false);
    } else {
      console.log('▶️  Play clicked');
      audio.muted = false;
      audio.play().catch((error) => {
        console.error('Play failed:', error.message);
      });
      setIsPlaying(true);
    }
  };

  // Step 4: Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        console.log('⏸️  Tab hidden - pausing');
        audio.pause();
        setIsPlaying(false);
      } else {
        console.log('▶️  Tab visible - resuming');
        if (isPlaying && unmuteAttemptedRef.current) {
          audio.play().catch((error) => {
            console.log('Resume failed:', error.message);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, setIsPlaying]);

  return (
    <div className={`absolute bottom-24 right-3 z-50 transition-opacity duration-300 ${isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <audio
        ref={audioRef}
        src={backsound}
        loop
        preload="auto"
      />
      
      {/* Music Play/Pause Button */}
      <button
        onClick={handlePlayPauseClick}
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