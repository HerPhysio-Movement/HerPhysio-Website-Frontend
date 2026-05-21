// src/features/home/components/Partners.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const partners = [
  {
    name: 'Her Mobility',
    logo: '/rnrn.jpg',
    testimonial:
      'Partnering with Her Physio Movement has amplified our reach tenfold. Their dedication to pelvic health education is unmatched.',
    author: 'Dr. Amina O.',
    role: 'Founder, Her Mobility',
  },
  {
    name: 'NeuroRehab Academia',
    logo: '/neuro.jpg',
    testimonial:
      'The collaboration has allowed us to bring cutting‑edge neurological rehab training to communities that need it most.',
    author: 'Prof. Chuka E.',
    role: 'Director, NeuroRehab Academia',
  },
  {
    name: 'New Seed Foundation',
    logo: '/newseed.jpg',
    testimonial:
      'Together we’ve built sustainable health infrastructure. Her Physio Movement’s community model is truly transformative.',
    author: 'Martha W.',
    role: 'Program Lead, New Seed Foundation',
  },
];

const Partners = () => {
  const [activePartner, setActivePartner] = useState(0);

  // Auto‑rotate the phone screen logo and testimonial every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePartner((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = partners[activePartner];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* ========== UPPER BANNER ========== */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#FD90A7] to-[#C7365B] rounded-[22px] p-8 lg:p-12 min-h-[320px] flex flex-col lg:flex-row items-center justify-between gap-8 overflow-visible">
          {/* ---- PHONE MOCKUP (pops out) ---- */}
          <div className="relative lg:absolute lg:-top-12 lg:left-12 w-56 sm:w-64 lg:w-72 filter drop-shadow-2xl transition-transform duration-500 hover:scale-105 z-20">
            {/* Phone frame */}
            <div className="relative mx-auto bg-black rounded-[2.5rem] p-3 shadow-xl">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-10" />
              {/* Screen */}
              <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/16] flex items-center justify-center">
                <img
                  src={current.logo}
                  alt={current.name}
                  className="w-4/5 h-auto object-contain transition-all duration-500"
                />
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* ---- Right text block ---- */}
          <div className="flex-1 lg:max-w-xl text-white space-y-6 lg:ml-auto text-center lg:text-left">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-2xl text-sm font-semibold tracking-wide">
              Trusted by Partners
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              We Don’t Do It Alone
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Proud to collaborate with organisations that share our mission of
              health equity. Together we deliver real impact.
            </p>
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 bg-white text-[#FD90A7] font-semibold px-8 py-3.5 rounded-full hover:bg-[#FFFAF9] shadow-lg transition-all active:scale-98"
            >
              Become a partner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========== LOWER TESTIMONIAL BLOCK ========== */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 text-center transition-all duration-500">
        {/* Quotation mark */}
        <span className="text-6xl text-[#EC4899] font-serif opacity-90 block leading-none mb-4">
          “
        </span>
        <blockquote className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-gray-800 italic leading-relaxed max-w-2xl mx-auto">
          {current.testimonial}
        </blockquote>
        <div className="mt-6">
          <p className="font-bold text-[#1A1A1A] text-lg">{current.author}</p>
          <p className="text-sm text-slate-500">{current.role}</p>
        </div>
        {/* Trusted Partner star */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>Trusted Partner</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;