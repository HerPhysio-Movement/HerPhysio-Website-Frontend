const HomeHero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="hero-panel p-8 md:p-12 rounded-3xl inline-block max-w-4xl">
          <h1 className="leading-tight mb-4">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-2 text-white drop-shadow-md">
              Empowering Women through
            </span>
            <span className="relative inline-block my-2">
              <span
                className="curly-text block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  fontFamily: "'Allura', cursive",
                  background: 'linear-gradient(135deg, #FD90A7 0%, #ffb6c1 70%, #fff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                Specialised
              </span>
              <span className="absolute left-0 -bottom-3 w-full h-1 bg-gradient-to-r from-[#FD90A7] via-[#ffb6c1] to-transparent rounded-full animate-underline"></span>
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-white drop-shadow-md">
              Physiotherapy Care
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
            Gentle, evidence-based treatment for pelvic health, prenatal,
            postpartum, and chronic pain care
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-[#f7f2f2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              What we do
            </button>
            <button className="btn-secondary bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
              Play Video
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-panel {
          background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
        }

        .curly-text {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50% { transform: translateY(-5px) rotate(0.5deg); }
        }

        @keyframes underlineExpand {
          0% { width: 0%; opacity: 0; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0.7; }
        }

        .animate-underline {
          animation: underlineExpand 1.5s ease-out forwards;
        }

        .btn-primary, .btn-secondary {
          position: relative;
          overflow: hidden;
        }

        .btn-primary::after, .btn-secondary::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::after, .btn-secondary:hover::after {
          width: 300px;
          height: 300px;
        }
      `}</style>
    </section>
  );
};

export default HomeHero;