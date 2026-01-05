import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance > 0) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="glass-gold rounded-2xl px-4 py-4 min-w-[70px] shadow-gold">
            <div className="text-3xl font-light text-amber-400 tabular-nums tracking-wide animate-glow-text">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] text-amber-100/70 font-light uppercase tracking-widest mt-1.5">
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
