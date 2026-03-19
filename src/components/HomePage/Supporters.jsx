const supporters = [
  'logolipsum®',
  'logolipsum®',
  'logolipsum®',
  'logogipsum®',
  'logolipsum®',
];

const Supporters = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#1D2130] mb-6">
          OUR SUPPORTERS
        </h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="text-[#1D2130] font-bold text-lg md:text-xl"
            >
              {supporter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;