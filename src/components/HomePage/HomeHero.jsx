import { useState, useEffect } from "react";

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: (
        <>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-2 text-white drop-shadow-md">
            Empowering Women through
          </span>
          <span className="relative inline-block my-2">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-md">
              Specialised
            </span>
            <div className="absolute left-0 -bottom-3 w-full h-0.5 bg-gradient-to-r from-[#FD90A7] via-[#ffb6c1] to-transparent rounded-full"></div>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-white drop-shadow-md">
            Physiotherapy Care
          </span>
        </>
      ),
      description:
        "Gentle, evidence-based treatment for pelvic health, prenatal, postpartum, and chronic pain care",
    },
    {
      title: (
        <>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-2 text-white drop-shadow-md">
            For Physiotherapists, Wanting to
          </span>
          <span className="relative inline-block my-2">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-md">
              Shape the Future
            </span>
            <div className="absolute left-0 -bottom-3 w-full h-0.5 bg-gradient-to-r from-[#FD90A7] via-[#ffb6c1] to-transparent rounded-full"></div>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-white drop-shadow-md">
            of Women's Health
          </span>
        </>
      ),
      description:
        "Join a growing network of professionals driving mentorship, advanced training, and advocacy. Together, we're building Africa's next generation of women's health leaders.",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto‑rotate every 4 seconds, pause on hover
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden"
      style={{ backgroundImage: "url('/back.jpg')" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Slides container with crossfade + scale */}
          <div className="relative min-h-[420px] md:min-h-[480px]">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-600 ease-out ${
                  idx === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div
                  className="rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_20px_rgba(253,144,167,0.1)]"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(253,144,167,0.25), 0 0 20px rgba(253,144,167,0.1)",
                  }}
                >
                  <h1 className="leading-tight mb-4">{slide.title}</h1>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-50"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-50"
              aria-label="Next slide"
            >
              →
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx === currentSlide || isTransitioning) return;
                  if (idx > currentSlide) {
                    nextSlide();
                  } else {
                    prevSlide();
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-[#FD90A7] w-4"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition-property: all;
        }
        .duration-600 {
          transition-duration: 600ms;
        }
        .ease-out {
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default HomeHero;
