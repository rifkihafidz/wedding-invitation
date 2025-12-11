import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

// Calculate initial time immediately
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
  // Initialize with calculated value immediately (no delay)
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
    <div className="flex gap-2 justify-center">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2 min-w-[60px] shadow-sm border border-rose-100">
            <div className="text-2xl font-bold text-rose-600 tabular-nums">{unit.value}</div>
            <div className="text-[9px] text-rose-400 font-medium uppercase tracking-wide">{unit.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
