// src/features/home/components/Testimonials.jsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      "After my delivery, I struggled with pelvic pain. The support group and physiotherapy sessions gave me my life back.",
    name: 'Amina Ibrahim',
    role: 'Beneficiary, Lagos',
  },
  {
    id: 2,
    quote:
      "Volunteering here has been incredibly fulfilling. We're not just treating symptoms; we're empowering women with knowledge and care.",
    name: 'Dr. Funmi Adebayo',
    role: 'Volunteer Physiotherapist',
  },
  {
    id: 3,
    quote:
      "As a first‑time mom, I felt isolated. This community welcomed me with open arms. The weekly chats and expert advice have been a lifeline.",
    name: 'Chioma Okafor',
    role: 'New Mom',
  },
  {
    id: 4,
    quote:
      "Guiding young physiotherapists and seeing them grow into confident practitioners is the most rewarding part of my week.",
    name: 'PT. Abraham',
    role: 'Mentor',
  },
  {
    id: 5,
    quote:
      "I never knew there were other women going through the same thing. Sharing experiences has been healing in so many ways.",
    name: 'Grace Okonkwo',
    role: 'Community Member',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const autoTimer = useRef(null);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 250);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setFade(true);
    }, 250);
  };

  // Auto‑rotate every 5 seconds
  useEffect(() => {
    autoTimer.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoTimer.current);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#FFFAF9' }}>
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C7365B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <Sparkles className="w-4 h-4" />
            Voices from Our Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
            Real Stories & Impact
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#A19390] text-sm max-w-md mx-auto">
            What our women and volunteers say about their journey with us.
          </p>
        </div>

        {/* Quote Card */}
        <div className="relative bg-white/80 backdrop-blur-md border border-[#F3E4E2] rounded-2xl shadow-xl p-8 md:p-12 text-center transition-all duration-500">
          {/* Decorative quote icon */}
          <div className="absolute top-4 left-4 text-[#FD90A7]/10">
            <Quote className="w-16 h-16" />
          </div>

          <div
            className={`transition-opacity duration-300 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-lg md:text-2xl text-[#1A1A1A] leading-relaxed italic font-light">
              “{current.quote}”
            </p>
            <div className="mt-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FD90A7] to-[#C7365B] flex items-center justify-center text-white font-bold text-sm">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#1A1A1A]">{current.name}</p>
                  <p className="text-xs text-[#A19390]">{current.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setFade(true);
                  }, 200);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-[#FD90A7]'
                    : 'w-2 bg-[#F3E4E2] hover:bg-[#FD90A7]/50'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/90 border border-[#F3E4E2] text-[#A19390] hover:text-[#FD90A7] hover:border-[#FD90A7] transition shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;