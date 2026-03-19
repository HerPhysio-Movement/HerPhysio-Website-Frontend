// src/components/HomePage/ContributionCTA.jsx
const ContributionCTA = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 py-16">
      <div
        className="max-w-7xl mx-auto w-11/12 md:w-10/12 lg:w-9/12 bg-[#FD90A7] bg-cover bg-center bg-no-repeat rounded-lg py-12 px-6 text-center"
        style={{ backgroundImage: "url('/BG.png')" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
          You can contribute to provide a place for women with special needs!
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-white text-[#1D2130] font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition focus:outline focus:outline-2 focus:outline-gray-400">
            Donate
          </button>
          <button className="bg-[#FD90A7] text-black font-bold py-3 px-8 rounded-md hover:bg-[#e07a8f] transition focus:outline focus:outline-2 focus:outline-gray-400">
            Join as a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContributionCTA;
