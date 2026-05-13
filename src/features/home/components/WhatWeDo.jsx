// src/features/home/components/WhatWeDo.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Her Physio Webinar',
    description:
      'Monthly conversations with healthcare specialists on women’s health topics. Interactive sessions with Q&A and expert insights.',
    image: '/webinar.jpg',
    link: '/resources#webinars',
  },
  {
    id: 2,
    title: 'The 360 Panel Session',
    description:
      'Quarterly discussions that bring a diverse group of voices together around women’s health, including experts, advocates, and community members.',
    image: '/degreeWomen.jpg',
    link: '/events',
  },
  {
    id: 3,
    title: 'The Workshop2Outreach (W20)',
    description:
      'Community mini-projects implemented by participants to address the health needs of women in their local communities.',
    image: '/Outreachh.jpg',
    link: '/gallery',
  },
  {
    id: 4,
    title: 'The 3‑Month Mentorship Program',
    description:
      'A cohort‑based program that equips physiotherapists in the women’s health field with advanced skills and leadership training.',
    image: '/hpmMentorss.jpg',
    link: '/volunteer-signup',
  },
];

const WhatWeDo = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, #F0A020 1px, transparent 1px), radial-gradient(circle at 70% 50%, #6020F0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F08020]" />
            Our Initiatives
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            What We Do
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#F08020] to-[#6020F0] mx-auto mb-4 rounded-full" />
          <p className="text-[#A19390] text-lg max-w-2xl mx-auto">
            Whether you are a woman wanting to understand your body better, or a
            professional ready to serve women, there is a place for you.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center transition-all duration-700 ${
                  animated
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                {/* Image – fixed height, object-cover, minimal border-radius */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-72 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <span className="text-6xl font-black text-[#F3E4E2] select-none">
                    {String(service.id).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-2 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#A19390] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#F08020] hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/volunteer-signup"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#F08020] text-[#F08020] rounded-full font-semibold hover:bg-[#F08020] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Get Involved
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;