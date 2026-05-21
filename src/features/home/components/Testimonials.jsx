// src/features/home/components/Testimonials.jsx
import { useState, useEffect, useRef } from 'react';
import { Quote, Sparkles, ChevronRight, X, Users, Star, Activity, Heart } from 'lucide-react';

const testimonials = [
  { id: 1, quote: "After my delivery, I struggled with pelvic pain. The support group and physiotherapy sessions gave me my life back.", source: "Beneficiary, Lagos" },
  { id: 2, quote: "Volunteering here has been incredibly fulfilling. We're not just treating symptoms; we're empowering women with knowledge and care.", source: "Volunteer Physiotherapist" },
  { id: 3, quote: "As a first‑time mom, I felt isolated. This community welcomed me with open arms. The weekly chats and expert advice have been a lifeline.", source: "New Mom" },
  { id: 4, quote: "Guiding young physiotherapists and seeing them grow into confident practitioners is the most rewarding part of my week.", source: "Mentor" },
  { id: 5, quote: "I never knew there were other women going through the same thing. Sharing experiences has been healing in so many ways.", source: "Community Member" },
  { id: 6, quote: "The pelvic floor workshop changed my life. I finally understand my body and no longer suffer in silence.", source: "Workshop Attendee" },
  { id: 7, quote: "The mentorship program gave me the confidence to start my own practice. I'm forever grateful.", source: "Mentee" },
  { id: 8, quote: "I can finally run and play with my kids again without worrying about leaks. Thank you Her Physio!", source: "Mother of three" },
  { id: 9, quote: "The online resources are a goldmine. I've learned so much about pelvic health that I wish I knew years ago.", source: "Online Learner" },
  { id: 10, quote: "The team's compassion and expertise made me feel seen and heard. I'm finally hopeful about my recovery.", source: "Patient" },
];

const partners = [
  { name: 'Her Mobility' },
  { name: 'NeuroRehab Academia' },
  { name: 'New Seed Foundation' },
];

const impactMiniStats = [
  { value: '10k+', label: 'Women Impacted', icon: Users, color: '#FD90A7' },
  { value: '98%', label: 'Satisfaction Rate', icon: Star, color: '#C7365B' },
  { value: '50+', label: 'Workshops Held', icon: Activity, color: '#F08020' },
];

/* ===== Pulse Testimonial Card ===== */
const PulseCard = ({ quote, source, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-[12px] p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 animate-pulse-glow group"
  >
    <Quote className="w-4 h-4 text-[#FD90A7] mb-2 group-hover:scale-110 transition-transform" />
    <p className="text-sm text-white/90 italic line-clamp-3 mb-2">"{quote}"</p>
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
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Subtle overall background bloom */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FD90A7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6020F0]/10 rounded-full blur-3xl" />
      </div>

      {/* Outer container – clean layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT COLUMN – Editorial (span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center py-6 lg:py-12">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif mb-6" style={{ fontFamily: "'Zodiak', serif" }}>
              Real Stories <br />& Impact
            </h2>

            <p className="text-sm text-gray-500 font-medium max-w-md leading-relaxed mb-8">
              Honest, sincere and direct. A community that women can trust. Trust is built through stories that reflect unquestionable integrity and real transformation.
            </p>

            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD90A7] text-white rounded-[12px] font-bold shadow-md shadow-[#FD90A7]/20 hover:bg-[#F77997] transition self-start"
            >
              Read all stories <ChevronRight className="w-4 h-4" />
            </button>

            {/* Trusted by – refined pills */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-3">Trusted by</p>
              <div className="flex flex-wrap gap-3">
                {partners.map((partner) => (
                  <span key={partner.name} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[12px] text-sm font-semibold text-gray-700 shadow-sm">
                    {partner.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop-only static impact mini cards */}
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
              {impactMiniStats.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-[12px] p-4 text-center shadow-sm">
                  <div className="w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN – Deep Purple Gradient Card (span 7) */}
          <div className="lg:col-span-7 flex items-stretch">
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
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-white/30" />
              <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-white/20" />

              {/* Featured testimonial – large quote */}
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-[#FD90A7] mb-4 animate-pulse" />
                <p className="text-xl md:text-2xl lg:text-3xl text-white font-light italic leading-relaxed mb-4">
                  "{featured.quote}"
                </p>
                <p className="text-white/60 text-sm">— {featured.source}</p>
              </div>

              {/* Pulse testimonial cards grid */}
              <div className="relative z-10 mt-8">
                <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider flex items-center gap-2">
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
            <div className="flex justify-between items-center mb-4">
              <Quote className="w-8 h-8 text-[#FD90A7]" />
              <button onClick={() => setSelectedTestimonial(null)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-lg text-gray-800 italic leading-relaxed mb-4">"{selectedTestimonial.quote}"</p>
            <p className="text-sm text-gray-500">— {selectedTestimonial.source}</p>
          </div>
        </div>
      )}

      {/* Full Testimonials Modal */}
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAll(false)}>
          <div className="bg-white rounded-[12px] shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Testimonials</h2>
              <button onClick={() => setShowAll(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#FD90A7]/5 rounded-[12px] p-4 flex flex-col">
                  <Quote className="w-5 h-5 text-[#FD90A7] mb-2" />
                  <p className="text-sm italic text-gray-800 leading-relaxed flex-1">"{t.quote}"</p>
                  <p className="text-xs text-gray-500 mt-3">— {t.source}</p>
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