// src/features/home/components/HomeHero.jsx
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Splash images – replace with your own Black women photos           */
/* ------------------------------------------------------------------ */
const portraitMain   = '/Antonia.jpg'; 
const portraitSecond = '/Modupe.jpg';
const avatar1        = '/Joseph.jpg';
const avatar2        = '/Chijioke.jpg';
const avatar3        = '/womenHealth.jpg';

const partners = [
  { name: 'Her Mobility',        logo: '/rnrn.jpg' },
  { name: 'NeuroRehab Academia', logo: '/neuro.jpg' },
  { name: 'New Seed Foundation', logo: '/newseed.jpg' },
];

const HomeHero = () => {
  return (
    <section className="relative bg-[#F9F9F6] px-0 sm:px-4 md:px-6 lg:px-8 pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="w-full max-w-7xl mx-auto">
        {/* ---------- MAIN CARD WRAPPER – full width on mobile, rounded on larger screens ---------- */}
        <div className="bg-white border border-gray-100 rounded-none sm:rounded-[24px] md:rounded-[24px] shadow-2xl px-4 sm:px-6 md:px-10 pt-4 md:pt-6 pb-8 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* ========== LEFT COLUMN (span 5) ========== */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B132B] leading-tight mb-6">
                Every Woman Deserves{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
                  Top‑Tier Health Care
                </span>
              </h1>
              <p className="text-lg text-[#8A8E99] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Her Physio Movement brings expert‑led courses, compassionate mentorship,
                and community support to women across Africa – because your pelvic health matters.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <a
                  href="#what-we-do"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FCD172] text-[#0B132B] rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/volunteer-signup"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0B132B] text-[#0B132B] rounded-xl font-semibold hover:bg-[#0B132B] hover:text-white transition"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Social Proof Metric */}
              <div className="inline-block">
                <p className="text-sm font-semibold text-[#8A8E99] mb-1">
                  Trusted By{' '}
                  <span className="inline-block ml-1 text-[#FD90A7]">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </p>
                <p className="text-3xl font-black text-[#0B132B]">100k+</p>
                <p className="text-sm text-[#8A8E99]">Active Women Impacted</p>
              </div>
            </div>

            {/* ========== RIGHT COLUMN – Responsive Bento Grid ========== */}
            <div className="lg:col-span-7">
              {/* ---- Desktop / Tablet layout (absolute) – adjusted for tablet visibility ---- */}
              <div className="hidden md:block relative h-[550px]">
                {/* Image Card 1 */}
                <div className="absolute left-0 top-0 w-56 md:w-64 lg:w-72 h-72 md:h-80 rounded-[10px] overflow-hidden bg-[#FD90A7]/10 shadow-xl">
                  <img src={portraitMain} alt="Smiling woman physiotherapist" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-[#0B132B] shadow">
                    Compassionate Care
                    <p className="text-xs text-[#8A8E99] font-normal">Dr. Amina O.</p>
                  </div>
                </div>

                {/* Image Card 2 – moved slightly to avoid overlap on tablet */}
                <div className="absolute right-0 md:right-4 lg:right-0 top-8 w-44 md:w-48 lg:w-56 h-56 md:h-64 rounded-[10px] overflow-hidden bg-[#FCD172] shadow-xl">
                  <img src={portraitSecond} alt="Woman with glasses" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-[#0B132B] shadow">
                    Evidence‑Based
                    <p className="text-xs text-[#8A8E99] font-normal">PT. Grace O.</p>
                  </div>
                </div>

                {/* Metric Badge – repositioned for tablet */}
                <div className="absolute right-0 md:right-4 lg:right-0 top-0 w-40 md:w-44 bg-[#FD90A7] text-white rounded-[10px] p-4 shadow-xl z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-lg font-bold">100k+</span>
                  </div>
                  <p className="text-xs opacity-90">Women Empowered</p>
                  <div className="absolute bottom-2 right-2">
                    <ArrowUpRight className="w-4 h-4 text-white/80" />
                  </div>
                </div>

                {/* Rating Component – centered */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-[10px] shadow-2xl p-4 flex items-center gap-4 z-20">
                  <div>
                    <p className="text-2xl font-black text-[#0B132B]">4.9</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src={avatar1} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <img src={avatar2} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <img src={avatar3} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <div className="w-8 h-8 rounded-full bg-[#0B132B] flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      247
                    </div>
                  </div>
                </div>

                {/* Circular Badge */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#0B132B] bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-10">
                  <ArrowUpRight className="w-6 h-6 text-[#FD90A7]" />
                </div>
              </div>

              {/* ---- Mobile layout (flex stacked) – full width images, no overlap ---- */}
              <div className="md:hidden flex flex-col gap-6">
                <div className="w-full rounded-[10px] overflow-hidden bg-[#FD90A7]/10 shadow-xl">
                  <img src={portraitMain} alt="Smiling woman physiotherapist" className="w-full h-56 object-cover" />
                  <div className="p-4 bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#0B132B]">
                    Compassionate Care
                    <p className="text-xs text-[#8A8E99] font-normal">Dr. Amina O.</p>
                  </div>
                </div>
                <div className="w-full rounded-[10px] overflow-hidden bg-[#FCD172] shadow-xl">
                  <img src={portraitSecond} alt="Woman with glasses" className="w-full h-56 object-cover" />
                  <div className="p-4 bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#0B132B]">
                    Evidence‑Based
                    <p className="text-xs text-[#8A8E99] font-normal">PT. Grace O.</p>
                  </div>
                </div>
                <div className="bg-[#FD90A7] text-white rounded-[10px] p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-2xl font-bold">100k+</span>
                  </div>
                  <p className="text-sm opacity-90">Women Empowered</p>
                </div>
                <div className="bg-white rounded-[10px] shadow-2xl p-5 flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-black text-[#0B132B]">4.9</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src={avatar1} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <img src={avatar2} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <img src={avatar3} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <div className="w-8 h-8 rounded-full bg-[#0B132B] flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      247
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-[#0B132B] bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-6 h-6 text-[#FD90A7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- TRUST BAR / FOOTER ---------- */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-sm font-semibold text-[#8A8E99] mb-4">
              Over 100k+ Smart Women trusting our care
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 hover:opacity-100 transition-opacity duration-300">
              {partners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;