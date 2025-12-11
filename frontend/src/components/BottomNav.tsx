import React, { useRef, useEffect, useState } from 'react';

interface BottomNavProps {
  currentPage: number;
  onNavigate: (page: number) => void;
  isOpened: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, isOpened }) => {
  const navItems = [
    { label: 'Opening', icon: '🏠' },
    { label: 'Quotes', icon: '💬' },
    { label: 'Couple', icon: '💑' },
    { label: 'Gallery', icon: '📷' },
    { label: 'Event', icon: '📅' },
    { label: 'Lokasi', icon: '📍' },
    { label: 'RSVP', icon: '✉️' },
    { label: 'Thanks', icon: '🙏' },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(80);

  // compute item width so that up to 5 items fit the visible width
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const visibleWidth = container.offsetWidth || 430;
      const w = Math.floor(visibleWidth / 5);
      setItemWidth(w);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // scroll to active item so it's centered in the viewport
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
    <div className={`w-full h-full transition-opacity duration-300 ${isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative h-full bg-white border-t border-gray-200">
        <div
          ref={containerRef}
          className="flex items-center h-full overflow-x-auto scrollbar-hide px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {navItems.map((item, index) => {
            const isActive = currentPage === index;
            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`flex flex-col items-center justify-center gap-1 flex-shrink-0 py-2 rounded-xl mx-0.5 transition-all duration-300 ${
                  isActive ? 'bg-rose-50' : 'hover:bg-gray-50'
                }`}
                style={{ scrollSnapAlign: 'center', width: `${itemWidth}px` }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-rose-100' : 'bg-transparent'
                  }`}
                >
                  <span className={`text-xl transition-all duration-300 ${isActive ? '' : 'grayscale opacity-40'}`}>
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? 'text-rose-600' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
