const supporters = [
  "logolipsum",
  "logolipsum",
  "logolipsum",
  "logogipsum",
];

const Supporters = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#1D2130] mb-8 text-center">
          OUR SUPPORTERS
        </h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {supporters.map((supporter, index) => (
            <a
              key={index}
              href="#"
              className="text-[#1D2130] font-bold text-lg md:text-xl hover:text-[#FD90A7] transition-colors"
            >
              {supporter}®
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;