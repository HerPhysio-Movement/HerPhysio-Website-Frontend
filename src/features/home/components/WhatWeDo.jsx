// src/features/home/components/WhatWeDo.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, MonitorPlay, Users, Wrench, GraduationCap, Sparkles, Maximize2, X } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Her Physio Webinar',
    description:
      'Monthly conversations with healthcare specialists on women\'s health topics.',
    image: '/webinar.jpg',
    thumbnail: '/HerPhysio Webinar.svg',
    link: '/resources#webinars',
    icon: MonitorPlay,
    accent: '#FD90A7',
  },
  {
    id: 2,
    title: 'The 360 Panel Session',
    description:
      'Quarterly discussions that bring a diverse group of voices together around women\'s health.',
    image: '/degreeWomen.jpg',
    thumbnail: '/360 Panel.svg',
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
    thumbnail: '/W2O.svg',
    link: '/gallery',
    icon: Wrench,
    accent: '#F08020',
  },
  {
    id: 4,
    title: 'The 3‑Month Mentorship Program',
    description:
      'A cohort-based program that equips physiotherapists in the women\'s health field for 3 months which is completed with a capstone project',
    image: '/hpmMentorss.jpg',
    thumbnail: '/HPM Mentorship.svg',
    link: '/volunteer-signup',
    icon: GraduationCap,
    accent: '#6020F0',
  },
];

const WhatWeDo = () => {
  const [animated, setAnimated] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const location = useLocation(); // Get location
  const sectionRef = useRef(null);

  const openImageModal = (service) => setSelectedService(service);
  const closeImageModal = () => setSelectedService(null);
  
  // Handle hash-based scrolling
  useEffect(() => {
    if (location.hash === '#what-we-do' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [location]);
  
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

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md border border-white/30 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Our Initiatives
          </div>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            What We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="max-w-xl mx-auto text-lg text-gray-500">
            Whether you are a woman wanting to understand your body better, or a professional ready to serve women, there is a place for you.
          </p>
        </div>

        {/* Bento Grid – responsive, no overlapping, 10px border radius */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Card 1 – spans 5 columns, tall image */}
          <div
            className={`lg:col-span-5 bg-white rounded-[10px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="relative h-56 px-6 overflow-hidden sm:h-64 lg:h-72">
              <img
                src={services[0].thumbnail}
                alt={services[0].title}
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => openImageModal(services[0])}
                className="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition rounded-full shadow-sm bottom-4 right-4 bg-white/85 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
                aria-label={`View full image for ${services[0].title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <div className="absolute flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm top-4 left-4 bg-white/80 backdrop-blur-sm border-white/40">
                <MonitorPlay className="w-4 h-4 text-[#FD90A7]" />
                <span className="text-sm font-semibold text-gray-800">{services[0].title}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="flex-1 text-sm leading-relaxed text-gray-600">{services[0].description}</p>
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
            <div className="relative h-48 px-6 overflow-hidden sm:h-56 lg:h-64">
              <img
                src={services[1].thumbnail}
                alt={services[1].title}
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => openImageModal(services[1])}
                className="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition rounded-full shadow-sm bottom-4 right-4 bg-white/85 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
                aria-label={`View full image for ${services[1].title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <div className="absolute flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm top-4 left-4 bg-white/80 backdrop-blur-sm border-white/40">
                <Users className="w-4 h-4 text-[#C7365B]" />
                <span className="text-sm font-semibold text-gray-800">{services[1].title}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="flex-1 text-sm leading-relaxed text-gray-600">{services[1].description}</p>
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
            <div className="relative h-48 px-6 overflow-hidden sm:h-56">
              <img
                src={services[2].thumbnail}
                alt={services[2].title}
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => openImageModal(services[2])}
                className="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition rounded-full shadow-sm bottom-4 right-4 bg-white/85 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
                aria-label={`View full image for ${services[2].title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <div className="absolute flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm top-4 left-4 bg-white/80 backdrop-blur-sm border-white/40">
                <Wrench className="w-4 h-4 text-[#F08020]" />
                <span className="text-sm font-semibold text-gray-800">{services[2].title}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="flex-1 text-sm leading-relaxed text-gray-600">{services[2].description}</p>
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
            <div className="relative h-56 px-6 overflow-hidden sm:h-64">
              <img
                src={services[3].thumbnail}
                alt={services[3].title}
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <button
                type="button"
                onClick={() => openImageModal(services[3])}
                className="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition rounded-full shadow-sm bottom-4 right-4 bg-white/85 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
                aria-label={`View full image for ${services[3].title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <div className="absolute flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm top-4 left-4 bg-white/80 backdrop-blur-sm border-white/40">
                <GraduationCap className="w-4 h-4 text-[#6020F0]" />
                <span className="text-sm font-semibold text-gray-800">{services[3].title}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="flex-1 text-sm leading-relaxed text-gray-600">{services[3].description}</p>
              <Link
                to={services[3].link}
                className="inline-flex items-center gap-1 text-sm font-semibold mt-4 text-[#6020F0] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/70 backdrop-blur-md"
            onClick={closeImageModal}
          >
            <button
              type="button"
              onClick={closeImageModal}
              className="absolute z-10 p-2 text-white transition rounded-full top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/40"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-[10px]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="object-contain max-w-full max-h-[85vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-lg font-semibold">{selectedService.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
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
