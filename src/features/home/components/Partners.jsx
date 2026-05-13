// src/features/home/components/Partners.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const partners = [
  {
    name: 'Her Mobility',
    logo: '/rnrn.jpg',
    description: 'Women’s health advocacy',
    detail:
      'Her Mobility leads grassroots advocacy and education programs focused on maternal and pelvic health across Nigeria, empowering women with the knowledge and support they need to live healthier lives.',
  },
  {
    name: 'NeuroRehab Academia',
    logo: '/neuro.jpg',
    description: 'Neurological rehabilitation',
    detail:
      'NeuroRehab Academia provides specialised training for physiotherapists in neurological rehabilitation, bringing cutting‑edge, evidence‑based care to underserved communities.',
  },
  {
    name: 'New Seed Foundation',
    logo: '/newseed.jpg',
    description: 'Community development',
    detail:
      'New Seed Foundation works on the ground to build sustainable health infrastructure, ensuring that every community has access to basic health services and education.',
  },
];

const Partners = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoTimer = useRef(null);

  const total = partners.length;

  // Auto‑rotate every 4 seconds, but pause on hover / interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(autoTimer.current);
  }, [isAutoPlaying, total]);

  const goTo = (index) => {
    setActiveIndex((index + total) % total);
    setIsAutoPlaying(false);
    clearInterval(autoTimer.current);
    // Resume after 8 seconds of no interaction
    const resumeTimer = setTimeout(() => setIsAutoPlaying(true), 8000);
    return () => clearTimeout(resumeTimer);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  // Compute coverflow styles for each card
  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    const translateX = offset * 50;   // horizontal spread (percentage of card width)
    const scale = 1 - absOffset * 0.15;
    const rotateY = offset * 45;      // degrees
    const zIndex = 10 - absOffset;
    const opacity = 1 - absOffset * 0.4;
    const blur = absOffset > 0 ? `blur(${absOffset * 2}px)` : 'none';
    const brightness = absOffset > 0 ? 0.8 : 1;

    return {
      transform: `translateX(${translateX}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter: blur,
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      pointerEvents: absOffset === 0 ? 'auto' : 'none',
    };
  };

  const activePartner = partners[activeIndex];

  return (
    <section
      className="relative py-24 overflow-hidden bg-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #F08020 1px, transparent 1px),
                            radial-gradient(circle at 80% 70%, #6020F0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F08020]" />
            Trusted by Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            We Don’t Do It Alone
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#F08020] to-[#6020F0] mx-auto mb-5 rounded-full" />
          <p className="text-[#A19390] max-w-xl mx-auto text-sm leading-relaxed">
            Proud to collaborate with organisations that share our mission of health equity.
          </p>
        </div>

        {/* Coverflow container */}
        <div className="relative flex items-center justify-center py-8">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-2xl h-72 sm:h-80 flex items-center justify-center">
            {partners.map((partner, idx) => (
              <div
                key={partner.name}
                className="absolute w-48 sm:w-56"
                style={{
                  ...getCardStyle(idx),
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center',
                  marginLeft: '-6rem',  // half of w-48
                  marginTop: '-3.5rem',
                }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-[#F3E4E2] rounded-xl shadow-lg p-6 flex flex-col items-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 w-auto object-contain mb-3"
                  />
                  <h3 className="text-sm font-semibold text-[#1A1A1A] text-center line-clamp-1">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-[#A19390] mt-1 text-center line-clamp-2">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 z-20 p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
            aria-label="Next partner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active partner detail card */}
        <div className="text-center mt-8 max-w-lg mx-auto">
          <div className="bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{activePartner.name}</h3>
            <p className="text-sm text-[#A19390] leading-relaxed">{activePartner.detail}</p>
            <Link
              to="/partner"
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#F08020] hover:underline"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 bg-[#FD90A7]'
                  : 'w-2 bg-[#F3E4E2] hover:bg-[#FD90A7]/50'
              }`}
              aria-label={`Go to partner ${idx + 1}`}
            />
          ))}
        </div>

        {/* Become a partner */}
        <div className="text-center mt-10">
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 text-[#F08020] font-medium text-sm hover:gap-3 transition-all group"
          >
            Become a partner
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;