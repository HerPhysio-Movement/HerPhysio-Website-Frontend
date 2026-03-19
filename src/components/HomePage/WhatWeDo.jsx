import {
  FaHandsHelping,
  FaHeartbeat,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";

const services = [
  {
    title: "Family support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: <FaHandsHelping className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: "Health benefits",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: <FaHeartbeat className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: "Scholarships",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: <FaGraduationCap className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: "Therapy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: <FaBrain className="w-8 h-8 text-[#FD90A7]" />,
  },
];

const WhatWeDo = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left column */}
          <div className="md:w-1/2">
            {/* Heading with dash */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]"></div>
              <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
                WHAT WE DO
              </h2>
            </div>
            <p className="text-[#525560] mb-8 max-w-lg">
              Some services we provide for our women. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>

            {/* Vertical list of services */}
            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{service.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1D2130] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[#525560] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - image placeholder */}
          <div className="md:w-1/2 flex items-stretch">
            <div
              className="w-full rounded-lg bg-cover bg-center bg-no-repeat min-h-[300px] md:min-h-full"
              style={{ backgroundImage: "url('/womenBack.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
