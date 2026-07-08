// src/features/about/components/WhatWeDoSpecial.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Activity, BookOpen, Shield } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Her Physio Webinar',
    description: 'Monthly conversations with healthcare specialists on women\'s health topics.',
    icon: Heart,
  },
  {
    id: 2,
    title: 'The 360 Panel Session',
    description: 'Quarterly discussions that bring a diverse group of voices together around women\'s health.',
    icon: Activity,
  },
  {
    id: 3,
    title: 'The Workshop2Outreach (W20)',
    description: 'Community mini-projects are implemented, to address the health needs of women in the community.',
    icon: BookOpen,
  },
  {
    id: 4,
    title: 'The 3-months Mentorship Program',
    description: 'A cohort-based program that equips physiotherapists in the women\'s health field for 3 months which is completed with a capstone project.',
    icon: Shield,
  },
];

const WhatWeDoSpecial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Auto‑rotate every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
        setIsVisible(true);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, [currentIndex]);

  // Track mouse for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 10, y: y * 10 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentService = services[currentIndex];
  const Icon = currentService.icon;
  const number = (currentIndex + 1).toString().padStart(2, '0');

  return (
    <section className="relative bg-gradient-to-b from-white via-[#FFF5F7] to-white px-4 sm:px-8 md:px-16 py-20 overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FD90A7]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C7365B]/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FD90A7]/5 to-[#C7365B]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4 border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Our Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">
            What we do for women with special needs
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#525560] text-lg max-w-2xl mx-auto">
            4 ways we are changing the narratives around women's health in Africa.
          </p>
        </div>

        {/* Cinematic 3D card carousel */}
        <div className="flex justify-center items-center min-h-[500px] perspective-1200">
          <div
            ref={cardRef}
            className={`
              w-full max-w-lg md:max-w-2xl transition-all duration-700 ease-out transform-gpu
              ${isVisible ? 'opacity-100 scale-100 rotate-y-0' : 'opacity-0 scale-90 rotate-y-12'}
            `}
            style={{
              transformStyle: 'preserve-3d',
              transform: isVisible
                ? `perspective(1200px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) scale(1)`
                : 'perspective(1200px) rotateX(10deg) rotateY(-10deg) scale(0.9)',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease',
            }}
          >
            <div className="relative overflow-hidden border shadow-2xl bg-white/90 backdrop-blur-md rounded-2xl border-white/30">
              {/* Glowing border gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FD90A7] via-[#C7365B] to-[#FD90A7] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10 p-8 md:p-10">
                {/* Floating icon background (subtle) */}
                <div className="absolute top-0 right-0 w-32 h-32 text-[#FD90A7]/5 transform translate-x-8 -translate-y-8">
                  <Icon className="w-full h-full" />
                </div>

                {/* Number + icon row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-7xl sm:text-8xl font-black text-[#FD90A7]/20 drop-shadow-lg">
                    {number}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FD90A7]/30 rounded-full blur-md" />
                    <div className="relative p-3 bg-white border border-gray-100 rounded-full shadow-lg">
                      <Icon className="w-6 h-6 text-[#FD90A7]" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4 tracking-tight">
                  {currentService.title}
                </h3>

                {/* Description */}
                <p className="text-[#525560] text-base leading-relaxed">
                  {currentService.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Indicator dots with glow */}
        <div className="flex justify-center gap-3 mt-10">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsVisible(true);
                }, 200);
              }}
              className={`transition-all duration-500 rounded-full ${
                idx === currentIndex
                  ? 'bg-[#FD90A7] w-10 h-2 shadow-[0_0_8px_#FD90A7]'
                  : 'bg-gray-300 w-2 h-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7] hover:text-white transition-all duration-300 shadow-md group"
          >
            Contact our team to learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(30px) translateX(-15px); }
          66% { transform: translateY(-20px) translateX(15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 15s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSpecial;