import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const services = [
  { id: 1, title: 'Her Physio Webinar', description: 'Monthly conversations with healthcare specialists on women\'s health topics. Interactive sessions with Q&A and expert insights.', image: '/webinar.jpg', link: '/resources#webinars' },
  { id: 2, title: 'The 360 Panel Session', description: 'Quarterly discussions that bring a diverse group of voices together around women\'s health.', image: '/degreeWomen.jpg', link: '/events' },
  { id: 3, title: 'The Workshop2Outreach (W20)', description: 'Community mini-projects implemented by participants to address local women’s health needs.', image: '/Outreachh.jpg', link: '/gallery' },
  { id: 4, title: 'The 3‑month Mentorship Program', description: 'A cohort‑based program equipping physiotherapists with advanced skills and leadership training.', image: '/hpmMentorss.jpg', link: '/volunteer-signup' },
];

const WhatWeDo = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section id="what-we-do" ref={sectionRef} className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-[#FD90A7]/5 rounded-full blur-[120px] animate-float-slow" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" /><span>Our Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">What We Do</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#525560] text-lg">Whether you are a woman wanting to understand your body better, or a professional ready to serve women, there is a place for you.</p>
        </div>

        <div className="space-y-20">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-center group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} transition-all duration-500 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="flex-shrink-0 w-full md:w-1/2">
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img src={service.image} alt={service.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3"><span className="text-6xl font-black text-[#FD90A7]/10 group-hover:text-[#FD90A7]/20 transition-colors">{(idx+1).toString().padStart(2,'0')}</span></div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-3 group-hover:text-[#FD90A7] transition-colors">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                  <div className="mt-4">
                    <Link to={service.link} className="inline-flex items-center gap-1 text-sm font-medium text-[#FD90A7] hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/volunteer-signup" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7] hover:text-white transition-all shadow-sm hover:shadow-md">
            Get Involved <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes float-slow { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default WhatWeDo;