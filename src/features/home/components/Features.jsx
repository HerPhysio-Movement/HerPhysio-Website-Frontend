import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Globe, Heart, Shield, Users, Coffee } from 'lucide-react';

const features = [
  { id: 1, title: 'Certified Professionals', description: 'Our team consists of licensed physiotherapists and women’s health specialists.', icon: GraduationCap },
  { id: 2, title: 'Free Health Guides', description: 'Access a growing library of downloadable resources, videos, and articles – completely free.', icon: Coffee },
  { id: 3, title: 'Global Network', description: 'We connect with partners across Africa and beyond to maximise impact.', icon: Globe },
  { id: 4, title: 'Personalised Support', description: 'Get tailored advice and one‑on‑one consultations for your unique health needs.', icon: Heart },
  { id: 5, title: 'Evidence‑Based Practices', description: 'All our resources and programs are rooted in the latest clinical research.', icon: Shield },
  { id: 6, title: 'Community Building', description: 'Join a supportive network of women, volunteers, and healthcare advocates.', icon: Users },
];

const Features = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section ref={sectionRef} className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#FD90A7]/5 rounded-full blur-[100px] animate-float-slow" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <span className="w-2 h-2 bg-[#FD90A7] rounded-full" /> Our Promise
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Why Choose Us?</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 text-lg">We are committed to excellence, education, and empowerment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className={`group flex flex-col items-center text-center transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-[#FD90A7]/5 group-hover:bg-[#FD90A7]/15 transition-all duration-500 transform scale-0 group-hover:scale-150 -z-10" />
                  <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm shadow-md flex items-center justify-center border border-gray-100 group-hover:border-[#FD90A7]/30 transition-all">
                    <Icon className="w-8 h-8 text-[#FD90A7] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2 group-hover:text-[#FD90A7] transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{feature.description}</p>
                <div className="mt-4 w-8 h-0.5 bg-gray-200 group-hover:w-12 group-hover:bg-[#FD90A7] transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes float-slow { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Features;