import { useState, useEffect } from "react";

const HomeHero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetSlide, setTargetSlide] = useState(null);

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

  // Auto‑rotate every 2 seconds, but not during hover or animation
  useEffect(() => {
    if (isHovering || isAnimating) return;
    const interval = setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      startFlip(newIndex);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovering, isAnimating, currentSlide, slides.length]);

  const startFlip = (newIndex) => {
    if (isAnimating) return;
    setTargetSlide(newIndex);
    setIsAnimating(true);
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsFlipped(false);
      setIsAnimating(false);
      setTargetSlide(null);
    }, 600);
  };

  const handleNext = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    startFlip(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    startFlip(newIndex);
  };

  const frontContent = slides[currentSlide];
  const backContent =
    targetSlide !== null
      ? slides[targetSlide]
      : slides[(currentSlide + 1) % slides.length];

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden"
      style={{ backgroundImage: "url('/back.jpg')" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Flip container */}
          <div
            className="flip-container transition-all duration-600 ease-in-out"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
              minHeight: "420px",
            }}
          >
            <div
              className={`flipper relative w-full transition-transform duration-600 ease-in-out ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front side */}
              <div
                className="front absolute inset-0 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="border border-[rgba(253,144,167,0.8)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_30px_rgba(253,144,167,0.3)]">
                  <h1 className="leading-tight mb-4">{frontContent.title}</h1>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {frontContent.description}
                  </p>
                </div>
              </div>
              {/* Back side */}
              <div
                className="back absolute inset-0 backface-hidden rotate-y-180"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="border border-[rgba(253,144,167,0.8)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_30px_rgba(253,144,167,0.3)]">
                  <h1 className="leading-tight mb-4">{backContent.title}</h1>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {backContent.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-50"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
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
                  if (idx === currentSlide) return;
                  if (idx > currentSlide) handleNext();
                  else handlePrev();
                }}
                disabled={isAnimating}
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
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .flip-container {
          perspective: 1200px;
        }
        .flipper {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
        }
        .front,
        .back {
          width: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </section>
  );
};

export default HomeHero;
