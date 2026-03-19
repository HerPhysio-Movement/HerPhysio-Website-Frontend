import { FaBullseye, FaEye } from 'react-icons/fa';

const MissionVision = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Optional subtle section heading – uncomment if needed */}
        {/* <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-[#1D2130] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
            Our Purpose
          </span>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-full flex items-center justify-center">
                <FaBullseye className="w-6 h-6 text-[#FD90A7]" />
              </div>
              <h3 className="text-sm font-bold text-[#FD90A7] uppercase tracking-wider">
                Our Mission
              </h3>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1D2130] mb-4 leading-tight">
              Reshaping the narrative of women's health
            </h4>
            <p className="text-[#525560] mb-6 leading-relaxed">
              HerPhysioMovement is dedicated to transforming women's health physiotherapy across Africa. We build awareness, dismantle myths, and bring professional development and advocacy to the forefront, especially in marginalized communities.
            </p>
            <blockquote className="text-[#525560] italic border-l-4 border-[#FD90A7] pl-4">
              “We speak in a way that makes women feel seen, heard, and empowered – without judgment or jargon.”
            </blockquote>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-full flex items-center justify-center">
                <FaEye className="w-6 h-6 text-[#FD90A7]" />
              </div>
              <h3 className="text-sm font-bold text-[#FD90A7] uppercase tracking-wider">
                Our Vision
              </h3>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1D2130] mb-4 leading-tight">
              A big sister – warm, relatable, and deeply informed
            </h4>
            <p className="text-[#525560] mb-6 leading-relaxed">
              Our vision is to be the trusted guide for women at every stage of life. We combine clinical expertise with culturally relevant, simple language to bridge the gap between medical knowledge and real‑life health experiences.
            </p>
            <blockquote className="text-[#525560] italic border-l-4 border-[#FD90A7] pl-4">
              “Physiotherapy is not a luxury – it's a necessity. We're here to make it accessible to every woman.”
            </blockquote>
          </div>
        </div>

        {/* Optional bottom note */}
        <p className="text-center text-[#1D2130] text-sm mt-12 opacity-70">
          Join us in building a new generation of women's health champions.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;