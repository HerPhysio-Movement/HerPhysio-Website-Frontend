const KnowAboutUs = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]"></div>
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            KNOW ABOUT US
          </h2>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2130] mb-4">
              We are a non-governmental organization
            </h3>
          </div>
          <div>
            <p className="text-[#525560] text-lg font-medium mb-4">
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
              Nunc ut sem vitae risus tristique posuere.
            </p>
            <p className="text-[#525560] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowAboutUs;
