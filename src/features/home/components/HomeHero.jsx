// src/features/home/components/HomeHero.jsx

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Heart, Shield, Users, LibraryBig } from 'lucide-react';

const slides = [
  {
    title: 'Every Woman Deserves to Know Her Body.',
    sub: 'Bringing health education & physiotherapy to marginalised communities across Africa.',
    accent: '#F08020',
    image: '/body.jpg',
    imageAlt: 'Woman learning about her body',
    fact: 'Only 1 in 3 women in low‑income countries can name a single pelvic organ.',
    source: 'WHO (2022)',
  },
  {
    title: 'Your Pelvic Health Matters.',
    sub: 'Expert care, compassionate support & evidence‑based resources for every stage of life.',
    accent: '#6020F0',
    image: '/pelvicc.jpg',
    imageAlt: 'Pelvic health representation',
    fact: 'Pelvic floor disorders affect 1 in 4 women globally, yet most cases go untreated.',
    source: 'IUGA (2022)',
  },
  {
    title: 'Together, We Shift the Narrative.',
    sub: 'Building a new generation of women’s health physiotherapists and changemakers.',
    accent: '#3070F0',
    image: '/together.jpg',
    imageAlt: 'Women standing together',
    fact: 'Women’s health physiotherapy can reduce persistent pelvic pain by up to 80%.',
    source: 'JWH (2021)',
  },
  {
    title: 'Movement Is Medicine.',
    sub: 'Free workshops, mentorship & community outreach that transform lives.',
    accent: '#F0A020',
    image: '/movement.jpg',
    imageAlt: 'Pregnant woman moving – movement is medicine',
    fact: 'Regular physical activity during pregnancy lowers the risk of gestational diabetes by 30%.',
    source: 'ACOG (2020)',
  },
];

/* ---------- Stat counter ---------- */
const StatItem = ({ end, label, icon: Icon, suffix = '', accent }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const step = end / (2000 / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center px-4 py-5">
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 transition-colors duration-500"
        style={{ backgroundColor: `${accent}12` }}
      >
        <Icon className="w-6 h-6 transition-colors duration-500" style={{ color: accent }} />
      </div>
      <p className="text-3xl font-bold text-[#1A1A1A]">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-[#A19390] mt-1">{label}</p>
    </div>
  );
};

/* ---------- Main Hero ---------- */
const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto‑rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 350);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  const statAccents = {
    women: '#F08020',
    communities: '#6020F0',
    volunteers: '#3070F0',
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#FFFAF9] pt-20 pb-12 md:pt-28 md:pb-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #FFFFFF 0%, #FFFAF9 40%, #FFF3EB 80%, #FFEFE7 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, #F0A020 1px, transparent 1px),
                              radial-gradient(circle at 70% 60%, #6020F0 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text column – cross‑fade + subtle slide */}
          <div className="text-center lg:text-left relative min-h-[420px]">
            <div
              className={`transition-all duration-500 ease-out ${
                fade
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-6'
              }`}
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 transition-colors duration-500"
                style={{ backgroundColor: `${slide.accent}14`, color: slide.accent }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: slide.accent }}
                />
                Non‑Profit Organisation
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-tight mb-6">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#A19390] mb-10 max-w-xl mx-auto lg:mx-0">
                {slide.sub}
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#what-we-do"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: slide.accent }}
                >
                  What we do <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/volunteer-signup"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 transition-all duration-500 hover:scale-105"
                  style={{ borderColor: slide.accent, color: slide.accent }}
                >
                  Volunteer with us
                </a>
              </div>
            </div>
          </div>

          {/* Image column – auto height, full content, no extra spaces */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-700"
              style={{
                boxShadow: `0 25px 40px -15px ${slide.accent}30`,
              }}
            >
              {/* Image – no fixed height, natural aspect ratio */}
              <div
                className={`transition-opacity duration-500 ease-out ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-auto"
                />
              </div>

              {/* Gradient overlay – constant */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${slide.accent}18, transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />
              {/* Fact badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur-md rounded-xl p-3 border border-[#F3E4E2] flex items-start gap-2">
                <LibraryBig className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: slide.accent }} />
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed">
                    {slide.fact}
                  </p>
                  <p className="text-xs text-[#A19390] mt-1">— {slide.source}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 lg:mt-20 grid grid-cols-3 max-w-2xl mx-auto">
          <StatItem end={100} label="Women Impacted" icon={Heart} suffix="k+" accent={statAccents.women} />
          <StatItem end={20} label="Communities Reached" icon={Shield} suffix="+" accent={statAccents.communities} />
          <StatItem end={200} label="Active Volunteers" icon={Users} suffix="+" accent={statAccents.volunteers} />
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentSlide(idx);
                  setFade(true);
                }, 350);
              }}
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: idx === currentSlide ? s.accent : '#F3E4E2',
                width: idx === currentSlide ? '2.5rem' : '0.625rem',
                boxShadow: idx === currentSlide ? `0 0 6px ${s.accent}80` : 'none',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;