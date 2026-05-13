// src/features/about/components/WhatWeDoCountry.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const WhatWeDoCountry = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
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
              We are working across Africa
            </p>
            <p className="text-[#525560] mb-6 leading-relaxed">
              Her Physio Movement is on a mission to build women's health physiotherapists across Africa through education, mentorship, and community engagement. Our strategy blends online and offline engagement: social media advocacy, community outreaches, training programs, and collaborations with like‑minded organizations.
            </p>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 text-[#FD90A7] font-semibold group hover:gap-3 transition-all duration-300"
            >
              Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img
                src="/ladylooking.jpg"
                alt="Woman looking into the distance – representing hope and impact"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
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