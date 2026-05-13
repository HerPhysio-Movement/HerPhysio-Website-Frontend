import { FaTrophy, FaGlobe, FaMedal, FaRibbon } from 'react-icons/fa';

const awards = [
  { year: "2021", title: "Best NGO Award", location: "BERLIN, GERMANY", icon: FaTrophy },
  { year: "2018", title: "Global Award", location: "NEW YORK, USA", icon: FaGlobe },
  { year: "2014", title: "CSN Award", location: "NEW DELHI, INDIA", icon: FaMedal },
  { year: "2010", title: "NGO of the year Award", location: "VIENNA, AUSTRIA", icon: FaRibbon },
];

const Awards = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">Recognition</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">Our Key Pillars</h2>
          <p className="text-[#525560] text-lg">Celebrated for our commitment to women's health and community impact.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div key={index} className="group bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-[#FD90A7]/10 rounded-xl mb-4 group-hover:bg-[#FD90A7]/20 transition mx-auto">
                  <Icon className="w-6 h-6 text-[#FD90A7]" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#FD90A7] mb-2">{award.year}</div>
                <h3 className="font-bold text-lg text-[#1D2130] mb-1">{award.title}</h3>
                <p className="text-sm text-[#525560]">{award.location}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;