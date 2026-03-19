const MissionVision = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Mission */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-4">
            OUR MISSION
          </h3>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#1D2130] mb-4">
            HerPhysioMovement is on a mission to reshape the narrative of women’s health
          </h4>
          <p className="text-[#525560] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
          <p className="text-[#525560] italic">
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
        </div>

        {/* Vision */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-4">
            OUR VISION
          </h3>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#1D2130] mb-4">
            Our voice is that of a big sister – warm, relatable, and deeply informed
          </h4>
          <p className="text-[#525560] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
          <p className="text-[#525560] italic">
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;