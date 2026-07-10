// src/features/about/components/WhatWeDoCountry.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const WhatWeDoCountry = () => {
  return (
    <section className="px-4 py-16 bg-white sm:px-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            {/* Section label – no dash, just a pill */}
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <MapPin className="w-4 h-4" />
              <span>Across Africa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">
              What We Do
            </h2>
            <p className="text-lg text-[#525560] mb-4 font-medium">
              We are here to change the narrative.
            </p>
            <p className="text-[#525560] mb-6 leading-relaxed">
              Whether you are a woman wanting to understand your body better, or a professional ready to serve women well, there is a place for you in what we do.
            </p>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 text-[#FD90A7] font-semibold group hover:gap-3 transition-all duration-300"
            >
              Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/what-we-do.jpg"
                alt="Woman looking into the distance – representing hope and impact"
                className="object-cover w-full transition-transform duration-500 h-80 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2130]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoCountry;