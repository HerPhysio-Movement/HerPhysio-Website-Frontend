// src/features/about/components/MissionVision.jsx
import { useState } from 'react';
import { FaBullseye, FaEye } from 'react-icons/fa';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  {
    type: 'vision',
    title: 'Shift the narrative',
    icon: FaEye,
    iconBg: '#FD90A7',
    iconColor: '#C7365B',
    description: 'We build awareness, dispel myths, and bring professional development and advocacy to the forefront – especially in marginalized communities.',
    quote: '“We speak in a way that makes women feel seen, heard, and empowered – without judgment or jargon.”',
    badge: 'Vision',
    badgeBg: '#FD90A7',
  },
  {
    type: 'mission',
    title: 'Close the knowledge gap',
    icon: FaBullseye,
    iconBg: '#C7365B',
    iconColor: '#C7365B',
    description: 'We combine clinical expertise with simple, relatable language to bridge the gap between medical knowledge and real‑life health experiences.',
    quote: '“Physiotherapy is not a luxury – it\'s a necessity. We\'re here to make it accessible to every woman.”',
    badge: 'Mission',
    badgeBg: '#C7365B',
  },
];

const MissionVision = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getCardStyle = (index) => {
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);
    // Coverflow effect: center card is full size, side cards are scaled and rotated
    const scale = 1 - absOffset * 0.2;
    const translateX = offset * 180;
    const rotateY = offset * -35;
    const opacity = 1 - absOffset * 0.4;
    const zIndex = 10 - absOffset;
    const display = absOffset > 1 ? 'none' : 'block';
    return {
      transform: `perspective(1000px) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      display,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <section className="relative px-4 sm:px-8 md:px-16 py-20 bg-white overflow-hidden">
      {/* Floating decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FD90A7]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C7365B]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FD90A7]/10 to-[#C7365B]/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Our Compass</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130]">Vision & Mission</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mt-3 rounded-full" />
          <p className="text-[#525560] mt-4 max-w-xl mx-auto">
            Purpose that drives every decision, every action.
          </p>
        </div>

        {/* Coverflow Carousel */}
        <div className="relative flex justify-center items-center min-h-[500px]">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const style = getCardStyle(idx);
            if (style.display === 'none') return null;
            return (
              <div
                key={idx}
                className="absolute w-80 md:w-96 bg-white rounded-lg border border-gray-100 p-6 shadow-lg"
                style={style}
              >
                <div className="absolute -top-4 left-6 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md" style={{ backgroundColor: card.badgeBg }}>
                  {card.badge}
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-md flex items-center justify-center mb-5 transition-colors duration-300" style={{ backgroundColor: `${card.iconBg}20` }}>
                    <Icon className="w-8 h-8 transition-transform duration-300" style={{ color: card.iconColor }} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1D2130] mb-4 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#525560] leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <div className="w-full bg-[#FFF5F7] rounded-md p-4 border-l-4 transition-all duration-300" style={{ borderLeftColor: card.iconBg }}>
                    <p className="text-sm italic text-[#1D2130]/80">
                      {card.quote}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-md hover:bg-[#FD90A7]/10 hover:border-[#FD90A7] transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex gap-2 items-center">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-[#FD90A7] w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to ${cards[idx].badge}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-md hover:bg-[#FD90A7]/10 hover:border-[#FD90A7] transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="text-center mt-8">
          <span className="inline-flex items-center gap-2 text-sm text-gray-400">
            <span className="w-6 h-px bg-gray-300" />
            Join the movement
            <span className="w-6 h-px bg-gray-300" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;