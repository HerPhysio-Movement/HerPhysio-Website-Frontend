// src/features/home/components/HealthTips.jsx
import { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const tips = [
  { id: 1, text: 'Stay hydrated – drink at least 8 glasses of water daily for optimal pelvic health.', source: 'World Health Organization (WHO)' },
  { id: 2, text: 'Practice deep breathing exercises to reduce stress and improve core stability.', source: 'American Physical Therapy Association (APTA)' },
  { id: 3, text: 'Kegel exercises can help strengthen pelvic floor muscles – do them correctly.', source: 'National Health Service (NHS UK)' },
  { id: 4, text: 'Good posture reduces back pain – keep your spine aligned when sitting or standing.', source: 'Mayo Clinic' },
  { id: 5, text: 'Regular gentle movement, like walking or Pilates, supports joint health and circulation.', source: 'Harvard Health' },
  { id: 6, text: 'Avoid holding urine for long periods – it weakens pelvic floor muscles.', source: 'Continence Foundation of Australia' },
  { id: 7, text: 'Incorporate fibre‑rich foods to prevent constipation and reduce pelvic pressure.', source: 'Academy of Nutrition and Dietetics' },
  { id: 8, text: 'Sleep on your side with a pillow between knees to align hips and reduce pelvic pain.', source: 'The Chartered Society of Physiotherapy (CSP)' },
  { id: 9, text: 'Avoid high‑impact exercises immediately after childbirth; start with pelvic floor rehab.', source: 'Royal College of Obstetricians and Gynaecologists (RCOG)' },
  { id: 10, text: 'Use correct lifting technique: bend your knees, keep back straight, engage core.', source: 'Occupational Safety and Health Administration (OSHA)' },
];

// Vibrant pastel palette – each card gets a distinct, soft colour (now 10 entries)
const cardColors = [
  '#FFF5F7', // soft pink
  '#FFF3EB', // peach cream
  '#F9F1EC', // warm cream
  '#F0F7FF', // icy blue
  '#F5FFF5', // mint mist
  '#FDF6FF', // lavender blush
  '#FFF8F0', // pale apricot
  '#F0FFF4', // honeydew
  '#F3F0FF', // periwinkle
  '#FFF4F4', // rose white
];

const HealthTips = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // relative to active card
  const autoSwipeRef = useRef(null);
  const activeCardRef = useRef(null);

  const totalTips = tips.length;

  const goTo = (index) => {
    if (index === currentIndex || index < 0 || index >= totalTips) return;
    setSwipeDirection(index > currentIndex ? 'right' : 'left');
    setTimeout(() => {
      setCurrentIndex(index);
      setSwipeDirection(null);
    }, 350);
  };

  const nextTip = () => {
    if (currentIndex < totalTips - 1) goTo(currentIndex + 1);
  };

  const prevTip = () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  };

  // Auto‑swipe every 3.5 seconds (a bit slower for the 3D feel)
  useEffect(() => {
    autoSwipeRef.current = setInterval(nextTip, 3500);
    return () => clearInterval(autoSwipeRef.current);
  }, [currentIndex]);

  // Touch support
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextTip();
      else prevTip();
    }
  };

  // Mouse tracking for the active card (3D tilt)
  const handleMouseMove = (e) => {
    if (!activeCardRef.current) return;
    const rect = activeCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Generate visible cards with 3D transforms
  const getVisibleCards = () => {
    const cards = [];
    for (let i = -2; i <= 2; i++) {
      const idx = currentIndex + i;
      if (idx >= 0 && idx < totalTips) {
        cards.push({ index: idx, offset: i });
      }
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C7365B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <Sparkles className="w-4 h-4" />
            Daily Wellness
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">Health Tips For You</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#A19390] text-sm max-w-md mx-auto">
            Swipe through 10 powerful pelvic health tips.
          </p>
        </div>

        {/* 3D Card Carousel */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* Left arrow */}
          <button
            onClick={prevTip}
            disabled={currentIndex === 0}
            className="absolute left-0 md:-left-12 z-20 p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm disabled:opacity-30"
            aria-label="Previous tip"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards container */}
          <div
            className="relative w-full max-w-md mx-auto"
            style={{ height: '380px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visibleCards.map(({ index, offset }) => {
              const isCurrent = offset === 0;
              const scale = 1 - Math.abs(offset) * 0.12;
              const translateZ = isCurrent ? 50 : 0;
              const rotateY = offset * 30; // side cards rotate away
              const translateX = offset * 25; // shift horizontally
              const translateY = Math.abs(offset) * 3;
              const zIndex = 10 - Math.abs(offset);
              const opacity = 1 - Math.abs(offset) * 0.4;
              const blur = Math.abs(offset) > 0 ? `blur(${Math.abs(offset) * 1.5}px)` : 'none';

              // For the active card, incorporate mouse tilt
              let extraTilt = {};
              if (isCurrent) {
                const tiltX = mousePos.y * 8; // up/down tilt
                const tiltY = mousePos.x * -8; // left/right tilt
                extraTilt = {
                  transform: `translateX(${translateX}%) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px) rotateX(${tiltX}deg) rotateY(${rotateY + tiltY}deg)`,
                  boxShadow: `${mousePos.x * 10}px ${mousePos.y * 10}px 20px rgba(0,0,0,0.1), 0 25px 40px -15px rgba(0,0,0,0.15)`,
                };
              } else {
                extraTilt = {
                  transform: `translateX(${translateX}%) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
                };
              }

              const tip = tips[index];
              const bgColor = cardColors[index % cardColors.length];

              return (
                <div
                  key={tip.id}
                  ref={isCurrent ? activeCardRef : null}
                  className={`absolute inset-0 w-full transition-all duration-[0.4s] ease-out ${
                    isCurrent ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    zIndex,
                    opacity,
                    filter: blur,
                    ...extraTilt,
                    transitionProperty: 'transform, opacity, filter, box-shadow',
                  }}
                >
                  <div
                    className="rounded-2xl shadow-lg p-6 md:p-8 h-full flex flex-col border border-[#F3E4E2]"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FD90A7]/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-[#FD90A7]">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-[#1A1A1A] leading-relaxed mb-4">
                          {tip.text}
                        </p>
                        <div className="mt-auto">
                          <span className="text-xs text-[#A19390] italic">— {tip.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={nextTip}
            className="absolute right-0 md:-right-12 z-20 p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
            aria-label="Next tip"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {tips.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-[#FD90A7]'
                  : 'w-2 bg-[#F3E4E2] hover:bg-[#FD90A7]/50'
              }`}
              aria-label={`Go to tip ${idx + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-xs text-[#A19390] mt-4">
          Swipe or click arrows to navigate.
        </p>
      </div>
    </section>
  );
};

export default HealthTips;