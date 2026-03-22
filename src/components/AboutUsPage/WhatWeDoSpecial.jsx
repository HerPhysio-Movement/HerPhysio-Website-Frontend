import {
  FaHandsHelping,
  FaHeartbeat,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";

const services = [
  {
    title: "Family Support",
    description:
      "A safe space for families to connect, share experiences, and access resources that strengthen the care journey.",
    icon: <FaHandsHelping className="w-6 h-6 text-[#FD90A7]" />,
  },
  {
    title: "Health Benefits",
    description:
      "Evidence‑based physiotherapy that improves mobility, reduces pain, and enhances overall quality of life.",
    icon: <FaHeartbeat className="w-6 h-6 text-[#FD90A7]" />,
  },
  {
    title: "Scholarships",
    description:
      "Empowering the next generation of physiotherapists through education and mentorship opportunities.",
    icon: <FaGraduationCap className="w-6 h-6 text-[#FD90A7]" />,
  },
  {
    title: "Therapy",
    description:
      "Specialised, one‑on‑one care for pelvic health, prenatal, postpartum, and chronic pain conditions.",
    icon: <FaBrain className="w-6 h-6 text-[#FD90A7]" />,
  },
];

const WhatWeDoSpecial = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-white/20 text-[#1D2130] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">
            What we do for women with special needs
          </h2>
          <p className="text-[#525560] text-lg">
            Every woman deserves compassionate, expert care. Here's how we
            support you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-[#FD90A7]/10 rounded-xl mb-4 group-hover:bg-[#FD90A7]/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl text-[#1D2130] mb-2">
                {service.title}
              </h3>
              <p className="text-[#525560] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#1D2130] text-sm mt-12 opacity-70">
          Want to learn more?{" "}
          <a href="#" className="text-[#FD90A7] font-medium hover:underline">
            Contact our team
          </a>
        </p>
      </div>
    </section>
  );
};

export default WhatWeDoSpecial;
