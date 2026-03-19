const WhatWeDoCountry = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left text */}
          <div className="md:w-1/2">
            {/* Heading with dash */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
              <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
                WHAT WE DO
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-4">
              We are working across country
            </p>
            <p className="text-[#525560] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet.
            </p>
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              Learn more
            </button>
          </div>
          {/* Right image */}
          <div className="md:w-1/2">
            <img
              src="/ladylooking.jpg"
              alt="Woman looking into the distance"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoCountry;