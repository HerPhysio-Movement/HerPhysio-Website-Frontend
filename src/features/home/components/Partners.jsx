// src/features/home/components/Partners.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

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
  // Only hover-based state
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Close popup on mouse leave
  const handleMouseEnter = (idx) => setHoveredIndex(idx);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Faint background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #F08020 1px, transparent 1px),
                            radial-gradient(circle at 80% 70%, #6020F0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        {/* Partners grid – no cards, clean alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center px-4 py-6 transition-all duration-300"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Logo – always full color, no hover effect */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto object-contain mb-3"
              />
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {partner.name}
              </h3>
              <p className="text-xs text-[#A19390] mt-1">{partner.description}</p>

              {/* Detail modal – only on hover */}
              {hoveredIndex === idx && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border border-[#F3E4E2] rounded-2xl shadow-2xl p-5 w-72 md:w-80 animate-modal-pop">
                  <button
                    onClick={() => setHoveredIndex(null)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#F3E4E2] transition"
                  >
                    <X className="w-4 h-4 text-[#A19390]" />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={partner.logo} alt={partner.name} className="h-8 w-auto" />
                    <h4 className="font-bold text-[#1A1A1A]">{partner.name}</h4>
                  </div>
                  <p className="text-sm text-[#A19390] leading-relaxed">
                    {partner.detail}
                  </p>
                  <Link
                    to="/partner"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#F08020] hover:underline"
                    onClick={() => setHoveredIndex(null)}
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 text-[#F08020] font-medium text-sm hover:gap-3 transition-all group"
          >
            Become a partner
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Modal pop animation */}
      <style>{`
        @keyframes modal-pop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-modal-pop {
          animation: modal-pop 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Partners;