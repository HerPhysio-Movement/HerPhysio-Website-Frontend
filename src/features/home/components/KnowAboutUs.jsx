// src/features/home/components/KnowAboutUs.jsx
import { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    id: 1,
    label: 'Community Members',
    value: 696,
    suffix: '',
    target: 15000,
    color: '#FD90A7',
    delay: 0,
  },
  {
    id: 2,
    label: 'Webinar Attendees',
    value: 1217,
    suffix: '',
    target: 5000,
    color: '#C7365B',
    delay: 200,
  },
  {
    id: 3,
    label: 'Women Impacted',
    value: 911,
    suffix: '',
    target: 10000,
    color: '#F08020',
    delay: 400,
  },
  {
    id: 4,
    label: 'Webinars Hosted',
    value: 27,
    suffix: '',
    target: 200,
    color: '#3070F0',
    delay: 600,
  },
  {
    id: 5,
    label: 'Collaborative Projects',
    value: 4,
    suffix: '',
    target: 20,
    color: '#307050',
    delay: 800,
  },
];

/* ---------- Animated Ring + Counter ---------- */
const AnimatedRing = ({ stat, isVisible, delay }) => {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const percentage = Math.min((stat.value / stat.target) * 100, 100);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      let startVal = 0;
      const endVal = stat.value;
      const duration = 1500;
      const stepTime = 16;
      const increment = endVal / (duration / stepTime);
      const counter = setInterval(() => {
        startVal += increment;
        if (startVal >= endVal) {
          setCount(endVal);
          clearInterval(counter);
        } else setCount(Math.floor(startVal));
      }, stepTime);

      let startProgress = 0;
      const progressIncrement = percentage / (duration / stepTime);
      const progressTimer = setInterval(() => {
        startProgress += progressIncrement;
        if (startProgress >= percentage) {
          setProgress(percentage);
          clearInterval(progressTimer);
        } else setProgress(startProgress);
      }, stepTime);

      return () => {
        clearInterval(counter);
        clearInterval(progressTimer);
      };
    }, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, stat.value, percentage, delay]);

  return (
    <div
      className="flex flex-col items-center transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative w-40 h-40 sm:w-48 sm:h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#F3E4E2"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={stat.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
            {count.toLocaleString()}
            {stat.suffix}
          </span>
          <span className="mt-1 text-xs text-slate-400">{stat.label}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Main Section ---------- */
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#F9F9F6] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C7365B 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <div className="mb-16">
          {/* <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <span className="w-2 h-2 bg-[#FD90A7] rounded-full" />
            Our Impact in Numbers
          </span> */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
              Impact
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-5 rounded-full" />
          {/* <p className="max-w-xl mx-auto text-lg text-slate-500">
            Every number represents a life touched, a community strengthened, a future transformed.
          </p> */}
        </div>

        <div className="grid items-center justify-center grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {statsData.map((stat) => (
            <AnimatedRing
              key={stat.id}
              stat={stat}
              isVisible={hasAnimated}
              delay={stat.delay}
            />
          ))}
        </div>

        <p className="mt-12 text-xs text-center text-slate-400">
          Impact numbers from 2025 till date.
        </p>
      </div>
    </section>
  );
};

export default KnowAboutUs;