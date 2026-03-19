import { FaHandsHelping, FaHeartbeat, FaGraduationCap, FaBrain } from 'react-icons/fa';

const services = [
  {
    title: 'Family support',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    icon: <FaHandsHelping className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: 'Health benefits',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    icon: <FaHeartbeat className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: 'Scholarships',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    icon: <FaGraduationCap className="w-8 h-8 text-[#FD90A7]" />,
  },
  {
    title: 'Therapy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    icon: <FaBrain className="w-8 h-8 text-[#FD90A7]" />,
  },
];

const WhatWeDoSpecial = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4 text-center">
          What we do for women with special needs
        </h2>
        <p className="text-[#525560] text-center max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="font-bold text-lg text-[#1D2130] mb-2">{service.title}</h3>
              <p className="text-[#525560] text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSpecial;