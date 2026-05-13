// src/features/home/components/KnowAboutUs.jsx
import { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    id: 1,
    label: 'Lives Impacted',
    value: 10000,
    suffix: '+',
    target: 15000,
    color: '#FD90A7',
    description: 'Direct beneficiaries of our health programs and outreach events.',
  },
  {
    id: 2,
    label: 'Professionals Trained',
    value: 400,
    suffix: '+',
    target: 600,
    color: '#C7365B',
    description: 'Physiotherapists, students, and healthcare workers empowered with new skills.',
  },
  {
    id: 3,
    label: 'Communities Reached',
    value: 20,
    suffix: '+',
    target: 30,
    color: '#F08020',
    description: 'Low‑income communities that received free screenings and education.',
  },
  {
    id: 4,
    label: 'Global Awards',
    value: 4,
    suffix: '',
    target: 10,
    color: '#3070F0',
    description: 'Recognitions for innovation and impact in women’s health.',
  },
];

const AnimatedBar = ({ stat, isVisible }) => {
  const [heightPercent, setHeightPercent] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const barRef = useRef(null);

  const percentage = Math.min((stat.value / stat.target) * 100, 100);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const increment = percentage / (duration / stepTime);
    const timer = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        setHeightPercent(percentage);
        clearInterval(timer);
      } else setHeightPercent(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible, percentage]);

  return (
    <div
      className="relative flex flex-col items-center flex-1 h-full"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute bottom-full mb-3 z-20 bg-white/95 backdrop-blur-md border border-[#F3E4E2] rounded-lg shadow-xl p-4 w-60 text-center animate-fade-in-up">
          <h4 className="font-bold text-[#1A1A1A] mb-1">{stat.label}</h4>
          <p className="text-2xl font-bold" style={{ color: stat.color }}>
            {stat.value.toLocaleString()}{stat.suffix}
          </p>
          <p className="text-xs text-[#A19390] mt-1">{stat.description}</p>
          <p className="text-xs text-[#A19390] mt-0.5">
            Target: {stat.target.toLocaleString()}
          </p>
        </div>
      )}

      <div className="flex-1 w-full flex flex-col justify-end items-center max-w-[80px]">
        <div
          ref={barRef}
          className="w-2 sm:w-3 rounded-t-sm transition-all duration-1000 ease-out"
          style={{
            height: `${heightPercent}%`,
            background: `linear-gradient(to top, ${stat.color}CC, ${stat.color})`,
            minHeight: 4,
          }}
        />
      </div>

      <span className="mt-2 text-xs font-medium text-[#A19390] text-center">
        {stat.label}
      </span>
    </div>
  );
};

const KnowAboutUs = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C7365B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F08020]" />
            Our Impact in Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Measurable Change, <br />
            Real Lives
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#F08020] to-[#6020F0] mx-auto mb-5 rounded-full" />
          <p className="text-[#A19390] text-lg max-w-xl mx-auto">
            Every number represents a life touched, a community strengthened, a future transformed.
          </p>
        </div>

        {/* Chart – no border-radius */}
        <div className="relative bg-white/80 backdrop-blur-md border border-[#F3E4E2] shadow-md p-8 md:p-10">
          <div className="absolute left-8 top-8 bottom-16 w-px bg-[#F3E4E2]" />

          <div className="flex justify-evenly items-end gap-4 h-80">
            {statsData.map((stat) => (
              <AnimatedBar
                key={stat.id}
                stat={stat}
                isVisible={hasAnimated}
              />
            ))}
          </div>

          <div className="border-t border-[#F3E4E2] mt-2" />
        </div>

        {/* Refined footer */}
        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#F3E4E2]/30 backdrop-blur-sm border border-[#F3E4E2] text-xs text-[#A19390] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FD90A7]" />
            Impact measured from 2020 to present · Goals set for 2026
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default KnowAboutUs;