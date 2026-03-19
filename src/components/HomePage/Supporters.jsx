// src/components/HomePage/Supporters.jsx
const supporters = [
  "logolipsum®",
  "logolipsum®",
  "logolipsum®",
  "logogipsum®",
  "logolipsum®",
];

const Supporters = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            OUR SUPPORTERS
          </h2>
        </div>

        <p className="text-[#1D2130] text-lg mb-10 max-w-2xl">
          We're proud to partner with organizations that share our vision of empowering women through specialised physiotherapy care.
        </p>

        {/* Supporters list – clean and minimal on pink background */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 py-8 px-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          {supporters.map((supporter, index) => (
            <span
              key={index}
              className="text-[#1D2130] font-medium text-lg md:text-xl hover:text-[#FD90A7] transition-colors duration-200 cursor-default"
            >
              {supporter}
            </span>
          ))}
        </div>

        {/* Optional subtle note */}
        <p className="text-center text-sm text-[#1D2130] mt-8 opacity-70">
          Join these amazing organizations in supporting women's health.
        </p>
      </div>
    </section>
  );
};

export default Supporters;