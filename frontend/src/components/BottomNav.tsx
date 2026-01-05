import React, { useRef, useEffect, useState } from 'react';

interface BottomNavProps {
  currentPage: number;
  onNavigate: (page: number) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Quote', icon: '💬' },
    { label: 'Couple', icon: '💑' },
    { label: 'Gallery', icon: '📷' },
    { label: 'Event', icon: '📅' },
    { label: 'Lokasi', icon: '📍' },
    { label: 'RSVP', icon: '✉️' },
    { label: 'Thanks', icon: '🙏' },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(80);

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const visibleWidth = containerRef.current.offsetWidth || 430;
      const w = Math.floor(visibleWidth / 5);
      setItemWidth(Math.max(w, 70));
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    let targetScroll = (currentPage * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, [currentPage, itemWidth]);

  return (
    <div className="w-full flex-shrink-0 glass-dark border-t border-amber-400/15">
      <div
        ref={containerRef}
        className="flex items-center overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {navItems.map((item, index) => {
          const isActive = currentPage === index;

          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`flex flex-col items-center justify-center gap-1 flex-shrink-0 py-3 transition-colors ${isActive ? 'bg-amber-400/15' : 'active:bg-white/10'
                }`}
              style={{
                scrollSnapAlign: 'center',
                width: `${itemWidth}px`,
                paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
              }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-amber-400/25' : 'bg-transparent'
                  }`}
              >
                <span className={`text-lg ${isActive ? '' : 'grayscale opacity-50'}`}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-amber-400' : 'text-amber-100/40'
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
