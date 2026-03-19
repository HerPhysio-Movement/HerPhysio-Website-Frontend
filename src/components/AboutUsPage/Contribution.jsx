const Contribution = () => {
  return (
    <section className="bg-[#FD90A7] px-4 sm:px-8 md:px-16 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D2130] mb-8">
          You can contribute to provide a place for women with special needs!
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#1D2130] font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition">
            Join as a volunteer
          </button>
          <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-[#FD90A7] transition">
            Donate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contribution;