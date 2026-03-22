import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const partners = [
  {
    name: "RNRN Foundation",
    logo: "/rnrn.jpg",
    description: "Advancing maternal health through community programs.",
  },
  {
    name: "NeuroRehab Institute",
    logo: "/neuro.jpg",
    description: "Specialized neuro-rehabilitation and research.",
  },
  {
    name: "New Seed Foundation",
    logo: "/newseed.jpg",
    description: "Empowering women through education and livelihood support.",
  },
];

const Partners = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16 relative overflow-hidden">
      {/* Subtle pattern overlay (unchanged) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="partners-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#FD90A7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#partners-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            OUR PARTNERS
          </h2>
        </div>
        <p className="text-[#1D2130] text-lg mb-12 max-w-2xl">
          We don't do this alone. We are proud of our partner organizations, who
          share our mission of getting health education to women in low-income
          communities, one outreach at a time.
        </p>

        {/* Partner Grid with 3D effect and rounded edges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* 3D Image Container with rounded edges */}
              <div className="flex items-center justify-center h-24 mb-4 perspective-500">
                <div className="transition-transform duration-500 transform-gpu group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-110">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain rounded-lg"
                  />
                </div>
              </div>
              <h3 className="text-center font-bold text-[#1D2130] text-lg mb-2">
                {partner.name}
              </h3>
              <p className="text-center text-sm text-[#525560] leading-relaxed">
                {partner.description}
              </p>
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-1 text-xs text-[#FD90A7]">
                  <Building2 className="w-3 h-3" /> Collaborator
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Become a partner today
          </Link>
        </div>
      </div>

      {/* Custom CSS for 3D effect (unchanged) */}
      <style jsx>{`
        .perspective-500 {
          perspective: 500px;
        }
        .transform-gpu {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .group-hover\\:rotate-y-12 {
          transform: rotateY(12deg);
        }
        .group-hover\\:rotate-x-6 {
          transform: rotateX(6deg);
        }
        .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Partners;
