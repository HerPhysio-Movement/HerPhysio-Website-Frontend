const HomeHero = () => {
  return (
    <section
      className="bg-white bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16 py-16 md:py-24"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Empowering Women through <br className="hidden sm:block" />
          Specialised Physiotherapy Care
        </h1>
        <p className="text-lg sm:text-xl text-slate-100 mb-8 max-w-2xl">
          Gentle, evidence-based treatment for pelvic health, prenatal,
          postpartum, and chronic pain care
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-[#f7f2f2] transition focus:outline focus:outline-2 focus:outline-gray-400">
            What we do
          </button>
          <button className="bg-white border-2 border-[#FD90A7] text-black font-bold py-3 px-8 rounded-md hover:bg-[#f7f2f2] transition focus:outline focus:outline-2 focus:outline-gray-400">
            Play Video
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
