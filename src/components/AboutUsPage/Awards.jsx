// src/components/AboutUsPage/Awards.jsx
import { FaTrophy, FaGlobe, FaMedal, FaRibbon } from 'react-icons/fa';

const awards = [
  {
    year: "2021",
    title: "Best NGO Award",
    location: "BERLIN, GERMANY",
    icon: <FaTrophy className="w-8 h-8 text-[#FD90A7] mx-auto mb-2" />,
  },
  {
    year: "2018",
    title: "Global Award",
    location: "NEW YORK, USA",
    icon: <FaGlobe className="w-8 h-8 text-[#FD90A7] mx-auto mb-2" />,
  },
  {
    year: "2014",
    title: "CSN Award",
    location: "NEW DELHI, INDIA",
    icon: <FaMedal className="w-8 h-8 text-[#FD90A7] mx-auto mb-2" />,
  },
  {
    year: "2010",
    title: "NGO of the year Award",
    location: "VIENNA, AUSTRIA",
    icon: <FaRibbon className="w-8 h-8 text-[#FD90A7] mx-auto mb-2" />,
  },
];

const Awards = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-12 text-center">
          Our Key Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center">
              {award.icon}
              <div className="text-4xl font-black text-[#FD90A7] mb-2">{award.year}</div>
              <div className="font-bold text-[#1D2130] text-lg">{award.title}</div>
              <div className="text-[#525560] text-sm">{award.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;