// src/features/home/components/WhatWeDo.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MonitorPlay, Users, Wrench, GraduationCap, Sparkles } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Her Physio Webinar',
    description:
      'Monthly live sessions with women’s health specialists. Interactive Q&A, expert insights, and practical guidance.',
    image: '/webinar.jpg',
    link: '/resources#webinars',
    icon: MonitorPlay,
    accent: '#FD90A7',
  },
  {
    id: 2,
    title: 'The 360 Panel Session',
    description:
      'Quarterly multi‑voice discussions bringing together experts, advocates, and community members for impactful dialogue.',
    image: '/degreeWomen.jpg',
    link: '/events',
    icon: Users,
    accent: '#C7365B',
  },
  {
    id: 3,
    title: 'The Workshop2Outreach (W20)',
    description:
      'Hands‑on mini‑projects that turn learning into action, directly impacting women in your local community.',
    image: '/Outreachh.jpg',
    link: '/gallery',
    icon: Wrench,
    accent: '#F08020',
  },
  {
    id: 4,
    title: 'The 3‑Month Mentorship Program',
    description:
      'Cohort‑based advanced training for physiotherapists, combining leadership skills with clinical expertise.',
    image: '/hpmMentorss.jpg',
    link: '/volunteer-signup',
    icon: GraduationCap,
    accent: '#6020F0',
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
      className="relative py-24 md:py-32 bg-[#F3F4F6] overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FD90A7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C7365B]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md border border-white/30 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Our Initiatives
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            What We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Whether you are a woman wanting to understand your body better, or a professional ready to serve women, there is a place for you.
          </p>
        </div>

        {/* Bento Grid – responsive, no overlapping, 10px border radius */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1 – spans 5 columns, tall image */}
          <div
            className={`lg:col-span-5 bg-white rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/40">
                <MonitorPlay className="w-4 h-4 text-[#FD90A7]" />
                <span className="text-sm font-semibold text-gray-800">{services[0].title}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{services[0].description}</p>
              <Link
                to={services[0].link}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4 text-[#FD90A7] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 – spans 7 columns, wide image */}
          <div
            className={`lg:col-span-7 bg-white rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
              <img
                src={services[1].image}
                alt={services[1].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/40">
                <Users className="w-4 h-4 text-[#C7365B]" />
                <span className="text-sm font-semibold text-gray-800">{services[1].title}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{services[1].description}</p>
              <Link
                to={services[1].link}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4 text-[#C7365B] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3 – spans 4 columns */}
          <div
            className={`lg:col-span-4 bg-white rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={services[2].image}
                alt={services[2].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/40">
                <Wrench className="w-4 h-4 text-[#F08020]" />
                <span className="text-sm font-semibold text-gray-800">{services[2].title}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{services[2].description}</p>
              <Link
                to={services[2].link}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4 text-[#F08020] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 4 – spans 8 columns (sits below card 3 in grid), wider image */}
          <div
            className={`lg:col-span-8 bg-white rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={services[3].image}
                alt={services[3].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/40">
                <GraduationCap className="w-4 h-4 text-[#6020F0]" />
                <span className="text-sm font-semibold text-gray-800">{services[3].title}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{services[3].description}</p>
              <Link
                to={services[3].link}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4 text-[#6020F0] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/volunteer-signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#F77997] transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98"
          >
            Get Involved <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;