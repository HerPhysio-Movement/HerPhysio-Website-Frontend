const HeroSection = () => {
  return (
    <section aria-label="About HerPhysio Movement">
      <div className="bg-white px-4 sm:px-8 md:px-16 xl:px-20 2xl:px-32 pt-8 sm:pt-12 md:pt-16 pb-40 sm:pb-48 md:pb-60">
        <div
          className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          role="presentation"
          aria-hidden="true"
        >
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]"></div>
          <p className="uppercase text-[#1D2130] font-bold text-xs sm:text-sm md:text-base xl:text-lg leading-[100%] tracking-[1px] sm:tracking-[2px]">
            Know About Us
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 xl:gap-16 2xl:gap-20 items-start">
          <div className="md:w-1/2 px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#1D2130] mb-4 sm:mb-6 leading-[115%] tracking-[-0.01em] max-w-none">
              A Non-Governmental Organization: Driving Health and Professional
              Growth
            </h1>
          </div>

          <div className="md:w-1/2 md:pt-2 xl:pt-4 2xl:pt-6">
            <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl text-[#1D2130] leading-[170%] tracking-[0] mb-4">
              Her Physio Movement is a pioneering non-governmental organization
              dedicated to transforming women's health physiotherapy in Nigeria.
              We are driven by a vision to build a new generation of women's
              health physiotherapists and changemakers, simultaneously improving
              the physical health outcomes for women across Africa.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 z-20 mt-[-60px] sm:mt-[-80px] md:mt-[-100px] lg:mt-[-120px] xl:mt-[-140px] 2xl:mt-[-160px] px-4 sm:px-8 md:px-16 xl:px-20 2xl:px-32">
        <div className="max-w-6xl mx-auto rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
          <img
            src="/Video.png"
            alt="Video thumbnail"
            className="rounded-lg sm:rounded-xl w-full h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 2xl:h-[28rem] object-cover"
          />
        </div>
      </div>

      <div className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 xl:px-20 2xl:px-32 pt-30 sm:pt-38 md:pt-50 lg:pt-72 xl:pt-80 2xl:pt-96 pb-6 sm:pb-10 md:pb-14 xl:pb-18 relative z-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20">
          <div>
            <div className="mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold text-[#1D2130] mb-2 sm:mb-3 uppercase leading-[100%] tracking-[1px] sm:tracking-[2px]">
                Our Dual Mission: Empowering Women, Elevating Professions
              </div>
              <p className="text-[#1D2130] text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl leading-[170%]">
                HerPhysioMovement is on a mission to reshape the narrative of
                women's health.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold text-[#1D2130] mb-2 sm:mb-3 uppercase leading-[100%] tracking-[1px] sm:tracking-[2px]">
                Our Vision: A New Era for Women's Health and Physiotherapy
              </div>
              <p className="text-[#1D2130] text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl leading-[170%]">
                Our vision is to be the 'big sister' – warm, relatable, and
                deeply informed – building a new generation of women's health
                physiotherapists and changemakers, while decisively shifting the
                narrative on the health of women across Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
