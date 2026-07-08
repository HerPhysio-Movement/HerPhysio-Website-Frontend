// src/features/about/components/Supporters.jsx
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const supporters = [
  { name: 'Her Mobility', logo: '/rnrn.jpg', description: 'Women’s health advocacy' },
  { name: 'NeuroRehab Academia', logo: '/neuro.jpg', description: 'Neurological rehabilitation' },
  { name: 'New Seed Foundation', logo: '/newseed.jpg', description: 'Community development' },
  { name: 'Four Women One Truth', logo: '/fourWomenOneTruth.jpeg', description: 'Community development' },
];

const Supporters = () => {
  return (
    <section className="px-4 py-16 bg-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Proud Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Our Partners</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mt-3 rounded-full" />
          <p className="text-[#525560] max-w-2xl mx-auto mt-3">
            <strong>We don't do this alone</strong> - We are proud of our partner organizations, who share our mission of getting health education to women in low-income communities, one outreach at a time.
          </p>
        </div>

        {/* Supporters grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {supporters.map((supporter, idx) => (
            <div
              key={idx}
              className="text-center transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={supporter.logo}
                  alt={supporter.name}
                  className="object-contain w-auto h-16 transition-all duration-300 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="font-semibold text-[#1D2130] text-lg">{supporter.name}</h3>
              <p className="text-sm text-gray-500">{supporter.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FD90A7] text-[#FD90A7] rounded-lg font-semibold hover:bg-[#FD90A7] hover:text-white transition-all duration-300"
          >
            Become a partner today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Supporters;