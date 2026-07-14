// src/features/home/components/HomeHero.jsx
import { useEffect, useState } from 'react';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Splash images – replace with your own Black women photos           */
/* ------------------------------------------------------------------ */
// const portraitMain   = '/Antonia.jpg'; 
const portraitMain   = '/heroImg.jpeg'; 
// const portraitSecond = '/Modupe.jpg';
const portraitSecond = '/event-3.jpg';
const avatar1        = '/Joseph.jpg';
const avatar2        = '/Chijioke.jpg';
const avatar3        = '/womenHealth.jpg';

const partners = [
  { name: 'Her Mobility',        logo: '/rnrn.jpg' },
  { name: 'NeuroRehab Academia', logo: '/neuro.jpg' },
  { name: 'New Seed Foundation', logo: '/newseed.jpg' },
  { name: 'Four Women One Truth', logo: '/fourWomenOneTruth.jpeg' },
];

const heroSlides = [
  {
    id: 'slide-1',
    heading: (
      <>
        Every Woman Deserves{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
          to know her body.
        </span>
      </>
    ),
    paragraph: 'We are bringing health education and physiotherapy services to low-income and marginalised communities.',
    italicParagraph: 'Teaching the woman about her health.',
    buttonLabel: 'Learn More',
    backgroundImage: '/event-2.jpg',
  },
  {
    id: 'slide-2',
    heading: (
      <>
        Women's health physiotherapy{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
          future in Africa
        </span>
      </>
    ),
    paragraph: "We are building the next generation of women's health physiotherapists and changemakers who better understand the woman.",
    italicParagraph: "Championing women's health across Africa.",
    buttonLabel: 'What we do',
    backgroundImage: '/event-6.jpeg',
  },
];

const HomeHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative bg-[#F9F9F6] px-0 sm:px-4 md:px-6 lg:px-8 pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="w-full mx-auto max-w-7xl">
        {/* ---------- MAIN CARD WRAPPER – full width on mobile, rounded on larger screens ---------- */}
        <div
          className="relative overflow-hidden border border-gray-100 bg-white rounded-none sm:rounded-[24px] md:rounded-[24px] shadow-2xl px-4 sm:px-6 md:px-10 pt-4 md:pt-6 pb-8 md:pb-12"
          style={
            currentSlide.backgroundImage
              ? {
                  backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,245,248,0.86)), url(${currentSlide.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          <div className="relative grid items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* ========== LEFT COLUMN (span 5) ========== */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="relative min-h-132
               overflow-hidden sm:min-h-112.5 md:min-h-110 lg:min-h-137.5">
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeSlide === 0 ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0 pointer-events-none'
                  }`}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B132B] leading-tight mb-6">
                    {heroSlides[0].heading}
                  </h1>
                  <p className="text-lg text-[#8A8E99] mb-8 lg:max-w-md xl:max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    {heroSlides[0].paragraph}
                  </p>
                  <p className="max-w-xl mx-auto mb-8 text-lg italic leading-relaxed text-gray-600 lg:mx-0">
                    {heroSlides[0].italicParagraph}
                  </p>

                  <div className="flex flex-col flex-wrap items-center justify-center gap-4 mb-10 sm:flex-row lg:justify-start">
                    <a
                      href="#what-we-do"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FCD172] text-[#0B132B] rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:scale-105"
                    >
                      {heroSlides[0].buttonLabel} <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="/volunteer-signup"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0B132B] text-[#0B132B] rounded-xl font-semibold hover:bg-[#0B132B] hover:text-white transition"
                    >
                      Get Started <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* <div className="inline-block">
                    <p className="text-sm font-semibold text-[#8A8E99] mb-1">
                      Trusted By{' '}
                      <span className="inline-block ml-1 text-[#FD90A7]">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </p>
                    <p className="text-3xl font-black text-[#0B132B]">100k+</p>
                    <p className="text-sm text-[#8A8E99]">Active Women Impacted</p>
                  </div> */}
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeSlide === 1 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0 pointer-events-none'
                  }`}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B132B] leading-tight mb-6">
                    {heroSlides[1].heading}
                  </h1>
                  <p className="text-lg text-[#8A8E99] mb-8 lg:max-w-md xl:max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    {heroSlides[1].paragraph}
                  </p>
                  <p className="max-w-xl mx-auto mb-8 text-lg italic leading-relaxed text-gray-600 lg:mx-0">
                    {heroSlides[1].italicParagraph}
                  </p>

                  <div className="flex flex-col flex-wrap items-center justify-center gap-4 mb-10 sm:flex-row lg:justify-start">
                    <a
                      href="#what-we-do"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FCD172] text-[#0B132B] rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:scale-105"
                    >
                      {heroSlides[1].buttonLabel} <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="/volunteer-signup"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0B132B] text-[#0B132B] rounded-xl font-semibold hover:bg-[#0B132B] hover:text-white transition"
                    >
                      Get Started <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* <div className="inline-block">
                    <p className="text-sm font-semibold text-[#8A8E99] mb-1">
                      Trusted By{' '}
                      <span className="inline-block ml-1 text-[#FD90A7]">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </p>
                    <p className="text-3xl font-black text-[#0B132B]">100k+</p>
                    <p className="text-sm text-[#8A8E99]">Active Women Impacted</p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* ========== RIGHT COLUMN – Responsive Bento Grid ========== */}
            <div className="lg:col-span-5">
              {/* ---- Desktop / Tablet layout (absolute) – adjusted for tablet visibility ---- */}
              <div className="relative">
                {/* Image Card 1 */}
                {/* <div className="absolute left-0 lg:-left-28 bottom-0 lg:-bottom-5 w-56 md:w-[350px] lg:w-72 h-72 md:h-80 rounded-[10px] overflow-hidden bg-[#FD90A7]/10 shadow-xl z-10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:scale-105">
                  <img src={portraitMain} alt="Smiling woman physiotherapist" className="object-cover w-full h-full" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-[#0B132B] shadow">
                    New Seed Foundation
                  </div>
                </div> */}

                {/* Image Card 2 – moved slightly to avoid overlap on tablet */}
                {/* <div className="absolute right-0 md:right-4 lg:left-0 top-10 w-44 md:w-[400px] lg:w-[350px] h-52 md:h-60 rounded-[10px] overflow-hidden bg-[#FCD172] shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 hover:z-20">
                  <img src={portraitSecond} alt="volunteer picture" className="object-cover w-full h-full" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-[#0B132B] shadow">
                    Volunteer Spotlight
                  </div>
                </div> */}

                <div className="rounded-[10px] overflow-hidden shadow-xl lg:h-112.5">
                  <img src={portraitMain} alt="Smiling woman physiotherapist" className="object-cover w-full h-full" />
                </div>

                {/* Metric Badge – repositioned for tablet */}
                {/* <div className="absolute right-0 md:right-4 lg:right-0 top-0 w-36 md:w-40 bg-[#FD90A7] text-white rounded-[10px] px-4 py-2 shadow-xl z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-lg font-bold">100k+</span>
                  </div>
                  <p className="text-xs opacity-90">Women Empowered</p>
                  <div className="absolute bottom-2 right-2">
                    <ArrowUpRight className="w-4 h-4 text-white/80" />
                  </div>
                </div> */}

                {/* Rating Component – centered */}
                {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-[10px] shadow-2xl p-4 flex items-center gap-4 z-20">
                  <div>
                    <p className="text-2xl font-black text-[#0B132B]">4.9</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src={avatar1} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
                    <img src={avatar2} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
                    <img src={avatar3} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-[#0B132B] flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      247
                    </div>
                  </div>
                </div> */}

                {/* Circular Badge */}
                {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#0B132B] bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg z-10">
                  <ArrowUpRight className="w-6 h-6 text-[#FD90A7]" />
                </div> */}
              </div>

              {/* ---- Mobile layout (flex stacked) – full width images, no overlap ---- */}
              {/* <div className="flex flex-col gap-6 md:hidden">
                <div className="w-full rounded-[10px] overflow-hidden bg-[#FD90A7]/10 shadow-xl">
                  <img src={portraitMain} alt="Smiling woman physiotherapist" className="object-cover w-full h-56" />
                  <div className="p-4 bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#0B132B]">
                    Compassionate Care
                    <p className="text-xs text-[#8A8E99] font-normal">Dr. Amina O.</p>
                  </div>
                </div>
                <div className="w-full rounded-[10px] overflow-hidden bg-[#FCD172] shadow-xl">
                  <img src={portraitSecond} alt="Woman with glasses" className="object-cover w-full h-56" />
                  <div className="p-4 bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#0B132B]">
                    Evidence‑Based
                    <p className="text-xs text-[#8A8E99] font-normal">PT. Grace O.</p>
                  </div>
                </div>
                <div className="bg-[#FD90A7] text-white rounded-[10px] p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-2xl font-bold">100k+</span>
                  </div>
                  <p className="text-sm opacity-90">Women Empowered</p>
                </div>
                <div className="bg-white rounded-[10px] shadow-2xl p-5 flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-black text-[#0B132B]">4.9</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center -space-x-2">
                    <img src={avatar1} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
                    <img src={avatar2} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
                    <img src={avatar3} alt="Avatar" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
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
              </div> */}
            </div>
          </div>

          <div className="relative z-10 flex justify-center gap-2 pt-4">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeSlide ? 'w-8 bg-[#FD90A7]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* ---------- TRUST BAR / FOOTER ---------- */}
          {/* <div className="pt-8 mt-12 border-t border-gray-200">
            <p className="text-center text-sm font-semibold text-[#8A8E99] mb-4">
              Over 100k+ Smart Women trusting our care
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 transition-opacity duration-300 opacity-50 hover:opacity-100">
              {partners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="w-auto h-8 transition-all duration-300 grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;