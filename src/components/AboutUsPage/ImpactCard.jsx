const ImpactSection = () => {
  return (
    <section
      className="bg-white px-4 sm:px-8 md:px-16 py-16"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-8xl mx-auto">
        <div className="bg-[#FFD8E1] rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              id="impact-heading"
              className="text-[#000000] text-sm sm:text-base md:text-lg font-bold mb-2 uppercase tracking-[2px] leading-[100%]"
            >
              Our Impact Journey: Advancing Health & Professional Excellence
            </h2>

            <p className="text-[#000000] text-sm sm:text-base md:text-lg leading-[160%]">
              We are proud to share the milestones we've achieved in both
              empowering women through improved health and fostering the growth
              of future physiotherapy leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-[#FD90A7] rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer focus:outline focus:outline-2 focus:outline-gray-400"
              tabIndex={0}
              role="presentation"
              aria-label="Over ten thousand lives impacted through health outreach and training programs"
            >
              <div className="text-[#000000] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                10k+
              </div>
              <div className="text-[#000000] text-sm sm:text-base font-semibold mb-1">
                Lives Impacted
              </div>
              <p className="text-[#000000] text-xs sm:text-sm md:text-base opacity-80 leading-[160%]">
                Through our health outreach and professional training programs.
              </p>
            </div>

            <div
              className="bg-[#FD90A7] rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer focus:outline focus:outline-2 focus:outline-gray-400"
              tabIndex={0}
              role="presentation"
              aria-label="Over four hundred physiotherapists and volunteers engaged with our cause"
            >
              <div className="text-[#000000] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                400+
              </div>
              <div className="text-[#000000] text-sm sm:text-base font-semibold mb-1">
                Physiotherapists & Volunteers Engaged
              </div>
              <p className="text-[#000000] text-xs sm:text-sm md:text-base opacity-80 leading-[160%]">
                Joining our cause and developing their skills.
              </p>
            </div>
            <div
              className="bg-[#FD90A7] rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer focus:outline focus:outline-2 focus:outline-gray-400"
              tabIndex={0}
              role="presentation"
              aria-label="Over twenty communities reached with health education and physiotherapy services"
            >
              <div className="text-[#000000] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                20+
              </div>
              <div className="text-[#000000] text-sm sm:text-base font-semibold mb-1">
                Communities Reached
              </div>
              <p className="text-[#000000] text-xs sm:text-sm md:text-base opacity-80 leading-[160%]">
                With essential health education and specialized physiotherapy
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
