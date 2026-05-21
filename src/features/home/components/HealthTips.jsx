// src/features/home/components/HealthTips.jsx
import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  BookOpen,
  X,
  Sparkles,
  Heart,
  Brain,
  Activity,
  Stethoscope,
  Smile,
} from 'lucide-react';

const tips = [
  { id: 1, text: 'Stay hydrated – drink at least 8 glasses of water daily for optimal pelvic health.', source: 'World Health Organization (WHO)', icon: Heart },
  { id: 2, text: 'Practice deep breathing exercises to reduce stress and improve core stability.', source: 'American Physical Therapy Association (APTA)', icon: Brain },
  { id: 3, text: 'Kegel exercises can help strengthen pelvic floor muscles – do them correctly.', source: 'National Health Service (NHS UK)', icon: Activity },
  { id: 4, text: 'Good posture reduces back pain – keep your spine aligned when sitting or standing.', source: 'Mayo Clinic', icon: Stethoscope },
  { id: 5, text: 'Regular gentle movement, like walking or Pilates, supports joint health and circulation.', source: 'Harvard Health', icon: Smile },
  { id: 6, text: 'Avoid holding urine for long periods – it weakens pelvic floor muscles.', source: 'Continence Foundation of Australia', icon: Activity },
  { id: 7, text: 'Incorporate fibre‑rich foods to prevent constipation and reduce pelvic pressure.', source: 'Academy of Nutrition and Dietetics', icon: Heart },
  { id: 8, text: 'Sleep on your side with a pillow between knees to align hips and reduce pelvic pain.', source: 'The Chartered Society of Physiotherapy (CSP)', icon: Brain },
  { id: 9, text: 'Avoid high‑impact exercises immediately after childbirth; start with pelvic floor rehab.', source: 'Royal College of Obstetricians and Gynaecologists (RCOG)', icon: Stethoscope },
  { id: 10, text: 'Use correct lifting technique: bend your knees, keep back straight, engage core.', source: 'Occupational Safety and Health Administration (OSHA)', icon: Smile },
];

const cardColors = [
  '#FFF5F7', '#FFF8F5', '#FFF9F6', '#FDF5FF', '#FFF6F4',
  '#FFF7F5', '#FFF8F6', '#FEF5FF', '#FFF7F4', '#FFF6F5',
];

const HealthTips = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (index) => {
    if (index === activeIndex || index < 0 || index >= tips.length) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextTip = () => goTo((activeIndex + 1) % tips.length);
  const prevTip = () => goTo((activeIndex - 1 + tips.length) % tips.length);

  const activeTip = tips[activeIndex];
  const progressPercent = ((activeIndex + 1) / tips.length) * 100;

  // First 4 tips shown always; the 5th tip is hidden on tablet (md) but visible on small and large screens
  const visibleTips = tips.slice(0, 4);
  const fifthTip = tips[4];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FEFCFB' }}
    >
      {/* Ambient blobs – nearly invisible */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FD90A7]/5 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#6020F0]/5 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FCD172]/5 rounded-full blur-[80px] animate-pulse-slower" />
      </div>

      {/* Floating sparkle particles */}
      <ParticleField isVisible={isVisible} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/90 backdrop-blur-md border border-[#FD90A7]/20 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <Lightbulb className="w-4 h-4" />
            Daily Wellness
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Health Tips For You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FD90A7] via-[#6020F0] to-[#FCD172] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Swipe through 10 powerful pelvic health tips.
          </p>
        </div>

        {/* ========== UPPER BANNER WITH POPPING IMAGE ========== */}
        <div
          className={`relative bg-gradient-to-r from-[#FD90A7]/8 via-[#6020F0]/5 to-[#FCD172]/8 rounded-[10px] p-6 md:p-10 mb-12 overflow-visible transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } border border-[#FD90A7]/20`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* ---- POPPING IMAGE (bigger, with bounce entrance) ---- */}
            <div
              className={`relative lg:absolute lg:-top-16 lg:left-8 w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-[10px] overflow-hidden shadow-2xl z-20 flex-shrink-0 ${
                isVisible ? 'animate-pop-in' : 'opacity-0 scale-75'
              }`}
              style={{
                boxShadow: '0 30px 60px rgba(253,144,167,0.3), 0 12px 24px rgba(96,32,240,0.2)',
                transitionDelay: '400ms',
              }}
            >
              <img
                src="/Chijioke.jpg"
                alt="Chijioke - Her Physio Movement"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-[8px] px-3 py-2 shadow-lg border border-white/50">
                <p className="text-xs font-semibold text-gray-800">Chijioke O.</p>
                <p className="text-[10px] text-gray-500">Research & Development</p>
              </div>
            </div>

            {/* ---- Right content ---- */}
            <div className="flex-1 lg:ml-80 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-[#6020F0] shadow-sm border border-[#6020F0]/20">
                <Sparkles className="w-3 h-3" />
                Featured Tip
              </div>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium italic">
                "{activeTip.text}"
              </p>
              <p className="text-sm text-gray-400">— {activeTip.source}</p>

              {/* Navigation arrows */}
              <div className="flex items-center gap-3 justify-center lg:justify-start mt-4">
                <button
                  onClick={prevTip}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold text-gray-500">
                  {activeIndex + 1} / {tips.length}
                </span>
                <button
                  onClick={nextTip}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MINI TIPS GRID (4 always visible, 5th hidden on tablet) ========== */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {visibleTips.map((tip, idx) => {
            const IconComponent = tip.icon;
            const isActive = idx === activeIndex;
            const isHovered = hoveredCard === idx;
            return (
              <div
                key={tip.id}
                onClick={() => goTo(idx)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`cursor-pointer rounded-[10px] p-5 shadow-sm transition-all duration-300 transform hover:-translate-y-1 border flex flex-col gap-3 ${
                  isActive
                    ? 'ring-2 ring-[#FD90A7] bg-white shadow-lg'
                    : 'bg-white/80 hover:shadow-md border-gray-100'
                }`}
                style={{
                  backgroundColor: isActive ? '#FFF' : cardColors[idx % cardColors.length],
                  transform: isHovered ? 'translateY(-4px)' : isActive ? 'translateY(-2px)' : 'none',
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-[#FD90A7] text-white' : 'bg-[#FD90A7]/10'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#FD90A7]'}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">Tip {idx + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{tip.text}</p>
                <p className="text-[10px] text-gray-400 italic mt-auto truncate">— {tip.source}</p>
              </div>
            );
          })}

          {/* Fifth tip – hidden on tablet (md), visible on small and large screens */}
          {(() => {
            const IconComponent = fifthTip.icon;
            const isActive = 4 === activeIndex;
            const isHovered = hoveredCard === 4;
            return (
              <div
                key={fifthTip.id}
                onClick={() => goTo(4)}
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`cursor-pointer rounded-[10px] p-5 shadow-sm transition-all duration-300 transform hover:-translate-y-1 border flex flex-col gap-3 md:hidden lg:flex ${
                  isActive
                    ? 'ring-2 ring-[#FD90A7] bg-white shadow-lg'
                    : 'bg-white/80 hover:shadow-md border-gray-100'
                }`}
                style={{
                  backgroundColor: isActive ? '#FFF' : cardColors[4 % cardColors.length],
                  transform: isHovered ? 'translateY(-4px)' : isActive ? 'translateY(-2px)' : 'none',
                  transitionDelay: '320ms',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-[#FD90A7] text-white' : 'bg-[#FD90A7]/10'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#FD90A7]'}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">Tip 5</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{fifthTip.text}</p>
                <p className="text-[10px] text-gray-400 italic mt-auto truncate">— {fifthTip.source}</p>
              </div>
            );
          })()}
        </div>

        {/* ========== SPINNING RING + READ ALL ========== */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Spinning ring */}
          <div className="relative w-36 h-36 md:w-40 md:h-40 flex-shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full spinning-ring">
              <defs>
                <path id="tipsCircle" d="M 60,60 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9.5" fill="#6020F0" fontWeight="bold" letterSpacing="2">
                <textPath href="#tipsCircle" startOffset="0%">
                  PELVIC HEALTH • WELLNESS • TIPS • EXPLORE •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FD90A7] to-[#FCD172] text-white flex items-center justify-center text-xl font-black shadow-lg animate-pulse-glow">
                {activeIndex + 1}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-1 max-w-xs w-full">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="font-semibold text-[#FD90A7]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FD90A7] via-[#6020F0] to-[#FCD172] transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 animate-wave" />
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#6020F0] text-[#6020F0] rounded-full font-semibold shadow-sm hover:bg-[#6020F0]/5 transition group"
            >
              <BookOpen className="w-4 h-4" />
              Read all {tips.length} tips
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========== MODAL WITH ALL TIPS ========== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-[10px] shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-gray-200 animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All 10 Health Tips</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip) => {
                const IconComponent = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className="p-4 rounded-[10px] border border-gray-100 shadow-sm flex items-start gap-3"
                    style={{ backgroundColor: cardColors[tip.id - 1] }}
                  >
                    <div className="w-10 h-10 rounded-[8px] bg-[#FD90A7]/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#FD90A7]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#FD90A7]">Tip {tip.id}</span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{tip.text}</p>
                      <p className="text-xs text-gray-400 mt-1.5 italic">— {tip.source}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spinning-ring { animation: permanentRotation 20s linear infinite; }
        @keyframes permanentRotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.03); }
        }

        .animate-float-delayed { animation: float-delayed 12s ease-in-out infinite; }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(25px) scale(1.03); }
        }

        .animate-pulse-slower { animation: pulse-slower 7s ease-in-out infinite; }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }

        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253, 144, 167, 0.5); }
          50% { box-shadow: 0 0 0 14px rgba(253, 144, 167, 0); }
        }

        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

        .animate-modal-pop { animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes modal-pop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        /* Pop-in for the Chijioke image */
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Wave animation for progress bar */
        .animate-wave {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: wave 2s linear infinite;
        }
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

const ParticleField = ({ isVisible }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 2,
    delay: `${Math.random() * 6}s`,
    duration: `${Math.random() * 10 + 5}s`,
    color: ['#FD90A7', '#6020F0', '#FCD172', '#C7365B'][i % 4],
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.45,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          20% { transform: translateY(-35px) translateX(12px); opacity: 0.75; }
          40% { transform: translateY(-15px) translateX(-18px); opacity: 0.4; }
          60% { transform: translateY(-45px) translateX(8px); opacity: 0.65; }
          80% { transform: translateY(-5px) translateX(-10px); opacity: 0.35; }
        }
        .animate-particle-float { animation: particle-float linear infinite; }
      `}</style>
    </div>
  );
};

export default HealthTips;