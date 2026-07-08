// src/features/home/components/ContributionCTA.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Heart } from 'lucide-react';

const ContributionCTA = () => {
  const canvasRef = useRef(null);
  const floatingCardRef = useRef(null);

  // ----- Mouse‑track parallax for the floating card -----
  useEffect(() => {
    const canvas = canvasRef.current;
    const card = floatingCardRef.current;
    if (!canvas || !card) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -15;
      const rotateY = x * 15;
      card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(50px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-white md:py-28">
      {/* Subtle cream gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FEFCFB] to-white" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ========== LEFT COLUMN – 3D Volumetric Canvas with dominant image (span 5) ========== */}
          <div
            ref={canvasRef}
            className="relative flex items-center justify-center order-2 lg:col-span-5 lg:order-1"
            style={{ perspective: '1200px' }}
          >
            <div className="relative w-full max-w-sm mx-auto h-[500px] preserve-3d">
              {/* Ambient glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FD90A7]/10 rounded-full blur-3xl -z-10" />

              {/* ---------- DOMINANT BRAND IMAGE ---------- */}
              <div className="absolute z-10 w-64 overflow-hidden -translate-x-1/2 -translate-y-1/2 shadow-xl top-1/2 left-1/2 md:w-72 rounded-2xl translate-z-10">
                <img
                  src="/event-4.jpeg"
                  alt="Her Physio Movement"
                  className="object-cover w-full h-auto"
                  style={{ filter: 'none' }}
                />
              </div>

              {/* ---------- FLOATING IMPACT CARD ---------- */}
              <div
                ref={floatingCardRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 rotate-[8deg] z-40 w-44 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 transition-transform duration-300 ease-out"
                style={{
                  boxShadow:
                    '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.1), 0 25px 40px -10px rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FCD172] flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-900">100k+</span>
                </div>
                <p className="text-[10px] text-gray-500">Women Impacted</p>
              </div>

              {/* ---------- LEFT CAPSULE TAGS ---------- */}
              <div className="absolute left-0 z-30 flex items-center gap-3 px-4 py-3 -translate-x-8 bg-white border border-gray-100 shadow-lg top-10 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-[#FCD172] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-800">One movement for all</span>
              </div>
              <div className="absolute left-0 bottom-20 -translate-x-6 z-30 bg-[#EAF2E9] rounded-2xl shadow-lg border border-green-100 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6020F0]/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#6020F0]" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Secure donation</span>
              </div>
            </div>
          </div>

          {/* ========== RIGHT COLUMN – Conversion Copy (span 7) ========== */}
          <div className="order-1 text-center lg:col-span-7 lg:text-left lg:order-2 md:max-w-2xl md:mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tighter leading-[1.08] mb-6 max-w-xl">
              Become The {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
               Change
              </span> You Wish To See
            </h2>
            <p className="max-w-md mb-10 text-base leading-relaxed text-gray-500 lg:text-lg">
              From easy money management, to financial goals and investments. Open your account in a flash.
            </p>

            {/* CTA buttons – visible on desktop only */}
            <div className="flex-row justify-center hidden gap-4 lg:flex lg:justify-start">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FCD172] text-gray-900 rounded-full font-semibold shadow-sm hover:bg-[#f5c542] transition"
              >
                Donate Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/volunteer-signup"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-gray-900 transition border-2 border-gray-300 rounded-full hover:border-gray-900"
              >
                Volunteer <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CTA buttons – visible on mobile only, placed after the image, side by side */}
          <div className="flex flex-row justify-center order-3 gap-4 lg:hidden">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FCD172] text-gray-900 rounded-full font-semibold shadow-sm hover:bg-[#f5c542] transition text-sm"
            >
              Donate Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/volunteer-signup"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 transition border-2 border-gray-300 rounded-full hover:border-gray-900"
            >
              Volunteer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionCTA;