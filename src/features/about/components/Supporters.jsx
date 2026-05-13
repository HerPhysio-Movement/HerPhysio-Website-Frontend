// src/features/about/components/Supporters.jsx
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const supporters = [
  { name: 'Her Mobility', logo: '/rnrn.jpg', description: 'Women’s health advocacy' },
  { name: 'NeuroRehab Academia', logo: '/neuro.jpg', description: 'Neurological rehabilitation' },
  { name: 'New Seed Foundation', logo: '/newseed.jpg', description: 'Community development' },
];

const Supporters = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Proud Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Our Supporters</h2>
          <div className="w-16 h-0.5 bg-[#FD90A7] mx-auto mb-4" />
          <p className="text-[#525560] max-w-2xl mx-auto">
            We are deeply grateful to the organisations and individuals who make our work possible.
          </p>
        </div>

        {/* Supporters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {supporters.map((supporter, idx) => (
            <div
              key={idx}
              className="group text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={supporter.logo}
                  alt={supporter.name}
                  className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-semibold text-[#1D2130] text-lg">{supporter.name}</h3>
              <p className="text-sm text-gray-500">{supporter.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FD90A7] text-[#FD90A7] rounded-lg font-semibold hover:bg-[#FD90A7] hover:text-white transition-all duration-300"
          >
            Become a supporter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Supporters;