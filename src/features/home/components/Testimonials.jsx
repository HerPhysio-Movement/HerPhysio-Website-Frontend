// src/features/home/components/Testimonials.jsx
import { useState, useEffect, useRef } from 'react';
import { Quote, Sparkles, ChevronRight, X, Users, Star, Activity, Heart, Venus, Video, BriefcaseBusiness } from 'lucide-react';

const testimonials = [
  { id: 1, quote: "Women’s health is important to me because healthy women build healthy families and communities. When women have access to proper healthcare, education, and support, they can thrive physically, mentally, and emotionally. Prioritizing women’s health helps empower women to live fulfilling lives and contribute positively to society.", source: "Jennifer Chinonso Okorie" },
  { id: 2, quote: "Women's health is important to me because I get to learn and understand my body, and in turn help other women understand and navigate all the peculiarities that come with being a woman.", source: "Eniola Anjola-Ade Ojuko" },
  { id: 3, quote: "Women’s health is important to me because it is an area that is most often overlooked. As a physiotherapist, I want to contribute to better care, awareness, and support for women through this field.", source: "Temiloluwa Akanle" },
  { id: 4, quote: "Women’s health is important to me because the health of women directly affects the health of families and communities.When women have access to appropriate health care, education, and support, it improves not only their personal quality of life but also the health, development, and stability of the communities around them.", source: "Gold Enioluwafe Oluleye" },
  { id: 5, quote: "Women are an integral part of the community, there's a need for us to prioritize our health, to function maximally for ourselves and the community at large.", source: "Mariam Jubril" },
  { id: 6, quote: "Women Health is important to me because it provides me the opportunity to contribute positively to the health and wellness of women around me", source: "Oluwadare, Gloria Jesutofunmi" },
  // { id: 7, quote: "The mentorship program gave me the confidence to start my own practice. I'm forever grateful.", source: "Mentee" },
  // { id: 8, quote: "I can finally run and play with my kids again without worrying about leaks. Thank you Her Physio!", source: "Mother of three" },
  // { id: 9, quote: "The online resources are a goldmine. I've learned so much about pelvic health that I wish I knew years ago.", source: "Online Learner" },
  // { id: 10, quote: "The team's compassion and expertise made me feel seen and heard. I'm finally hopeful about my recovery.", source: "Patient" },
];

const partners = [
  { name: 'RNRN Foundation' },
  { name: 'NeuroRehab Academia' },
  { name: 'New Seed Foundation' },
  { name: 'Four Women One Truth' },
  { name: 'Atti Theresa Foundation' },
  { name: 'Swypatune' },
];

const impactMiniStats = [
  { value: '660', label: 'Members in the Community', icon: Users, color: '#FD90A7' },
  { value: '931', label: 'Attended our Webinars', icon: Users, color: '#C7365B' },
  { value: '250', label: 'Women Impacted', icon: Venus, color: '#F08020' },
  { value: '21', label: 'Webinars Hosted', icon: Video, color: '#FD90A7' },
  { value: '3', label: 'Collaborative Projects', icon: BriefcaseBusiness, color: '#C7365B' },
  // { value: '50+', label: 'Workshops Held', icon: Activity, color: '#F08020' },
];
const communityImages = [
  '/community-1.jpeg',
  '/community-2.jpg',
  '/community-3.jpg',
  '/community-4.jpeg',
  '/community-5.jpeg',
  '/community-6.jpeg',
];

/* ===== Pulse Testimonial Card ===== */
const PulseCard = ({ quote, source, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-[12px] p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 animate-pulse-glow group"
  >
    <Quote className="w-4 h-4 text-[#FD90A7] mb-2 group-hover:scale-110 transition-transform" />
    <p className="mb-2 text-sm italic text-white/90 line-clamp-3">"{quote}"</p>
    <p className="text-xs text-white/60">— {source}</p>
  </div>
);

/* ===== Main Testimonials Section ===== */
const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const featured = testimonials[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (testimonial) => setSelectedTestimonial(testimonial);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-white md:py-28">
      {/* Subtle overall background bloom */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FD90A7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6020F0]/10 rounded-full blur-3xl" />
      </div>

      {/* Outer container – clean layout */}
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-stretch grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN – Editorial (span 5) */}
          <div className="flex flex-col justify-center py-6 lg:col-span-5 lg:py-12">
            {/* <h2 className="mb-6 font-serif text-4xl font-black leading-tight tracking-tight text-gray-900 lg:text-5xl" style={{ fontFamily: "'Zodiak', serif" }}>
              Real Stories <br />& Impact
            </h2> */}
            <h2 className="mb-6 font-serif text-4xl font-black leading-tight tracking-tight text-gray-900 lg:text-5xl" style={{ fontFamily: "'Zodiak', serif" }}>
              Voices from <br />the Community
            </h2>

            {/* <p className="max-w-md mb-8 text-sm font-medium leading-relaxed text-gray-500">
              Honest, sincere and direct. A community that women can trust. Trust is built through stories that reflect unquestionable integrity and real transformation.
            </p> */}

            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD90A7] text-white rounded-[12px] font-bold shadow-md shadow-[#FD90A7]/20 hover:bg-[#F77997] transition self-start"
            >
              Read all stories <ChevronRight className="w-4 h-4" />
            </button>

            {/* Trusted by – refined pills */}
            <div className="pt-8 mt-10 border-t border-gray-200">
              <p className="mb-3 text-sm font-semibold text-gray-600">Trusted by</p>
              <div className="flex flex-wrap gap-3">
                {partners.map((partner) => (
                  <span key={partner.name} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[12px] text-sm font-semibold text-gray-700 shadow-sm">
                    {partner.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop-only static impact mini cards */}
            <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-3">
              {communityImages.map((image, index) => (
                <div key={index} className="h-40 overflow-hidden text-center border border-gray-100 shadow-sm sm:h-56 lg:h-36 bg-gray-50 rounded-xl">
                  <img src={image} alt={`Community ${index + 1}`} className="object-cover w-full h-full mb-2" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN – Deep Purple Gradient Card (span 7) */}
          <div className="flex items-stretch lg:col-span-7">
            <div className="w-full bg-gradient-to-br from-[#4A148C] via-[#6A1B9A] to-[#2E0A3B] rounded-[12px] p-6 md:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[500px]">
              {/* Purple ambient glows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-48 h-48 bg-[#FD90A7]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#D4A373]/15 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-[#6020F0]/25 rounded-full blur-2xl" />
              </div>

              {/* Subtle dot texture */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

              {/* Decorative spark icons */}
              <Sparkles className="absolute w-5 h-5 top-4 right-4 text-white/30" />
              <Sparkles className="absolute w-4 h-4 bottom-4 left-4 text-white/20" />

              <h2 className="relative z-10 max-w-2xl mb-8 font-serif text-3xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-4xl" style={{ fontFamily: "'Zodiak', serif" }}>
                What our volunteers and mentees say about their journey with us.
              </h2>

              {/* Featured testimonial – large quote */}
              <div className="relative z-10 flex flex-col justify-center flex-1">
                <Quote className="w-10 h-10 text-[#FD90A7] mb-4 animate-pulse" />
                <p className="mb-4 text-xl italic font-light leading-relaxed text-white md:text-xl">
                  "{featured.quote}"
                </p>
                <p className="text-sm text-white/60">— {featured.source}</p>
              </div>

              {/* Pulse testimonial cards grid */}
              <div className="relative z-10 mt-8">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wider uppercase text-white/70">
                  <Heart className="w-4 h-4 text-[#FD90A7]" /> More Stories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {testimonials.slice(1, 5).map((t) => (
                    <PulseCard
                      key={t.id}
                      quote={t.quote}
                      source={t.source}
                      onClick={() => handleCardClick(t)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Testimonial Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTestimonial(null)}>
          <div className="bg-white rounded-[12px] shadow-2xl max-w-md w-full p-6 md:p-8 border border-gray-200 animate-modal-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <Quote className="w-8 h-8 text-[#FD90A7]" />
              <button onClick={() => setSelectedTestimonial(null)} className="p-2 text-gray-400 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4 text-lg italic leading-relaxed text-gray-800">"{selectedTestimonial.quote}"</p>
            <p className="text-sm text-gray-500">— {selectedTestimonial.source}</p>
          </div>
        </div>
      )}

      {/* Full Testimonials Modal */}
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAll(false)}>
          <div className="bg-white rounded-[12px] shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Testimonials</h2>
              <button onClick={() => setShowAll(false)} className="p-2 text-gray-400 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#FD90A7]/5 rounded-[12px] p-4 flex flex-col">
                  <Quote className="w-5 h-5 text-[#FD90A7] mb-2" />
                  <p className="flex-1 text-sm italic leading-relaxed text-gray-800">"{t.quote}"</p>
                  <p className="mt-3 text-xs text-gray-500">— {t.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253, 144, 167, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(253, 144, 167, 0); }
        }
        .animate-modal-pop {
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalPop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
