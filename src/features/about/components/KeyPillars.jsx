// src/features/about/components/KeyPillars.jsx
import { GraduationCap, Users, Handshake, Building2 } from 'lucide-react';

const pillars = [
  {
    title: 'Education',
    icon: GraduationCap,
    description: 'Empowering women and professionals with knowledge.',
  },
  {
    title: 'Capacity Building',
    icon: Users,
    description: 'Strengthening skills and leadership in health.',
  },
  {
    title: 'Collaboration',
    icon: Handshake,
    description: 'Partnering with organisations for greater impact.',
  },
  {
    title: 'Community Projects',
    icon: Building2,
    description: 'Local initiatives that bring care to the doorstep.',
  },
];

const KeyPillars = () => {
  return (
    <section className="px-4 py-20 bg-white sm:px-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section header – consistent with other sections */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Our Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Our Key Pillars</h2>
          <div className="w-16 h-0.5 bg-[#FD90A7] mx-auto mb-4" />
          {/* <p className="text-[#525560] max-w-2xl mx-auto">
            Everything we do is rooted in four pillars that hold our work together and guide every decision we make in Her Physio Movement for women across Africa.
          </p> */}
        </div>

        {/* Minimal, no‑card pillar grid – clean and modern */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            // Add staggered top margin on desktop for visual interest
            const marginTop = idx === 1 || idx === 2 ? 'lg:mt-8' : '';
            return (
              <div
                key={idx}
                className={`group text-center transition-all duration-300 hover:-translate-y-1 ${marginTop}`}
              >
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FD90A7]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'scale(1.2)' }} />
                    <div className="relative w-16 h-16 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#FD90A7] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2 group-hover:text-[#FD90A7] transition-colors">
                  {pillar.title}
                </h3>
                <p className="max-w-xs mx-auto text-sm leading-relaxed text-gray-500">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyPillars;