const Journey = () => {
  return (
    <section className="bg-[#FFD8E1] px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {/* Heading with dash */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
              <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
                OUR JOURNEY
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D2130] mb-4">
              How we raised ₦34M
            </h3>
            <p className="text-[#525560] mb-6">
              Through grassroots fundraising, partnerships, and the generosity
              of our community, we've raised over 34 million Naira to support
              women's health initiatives. Every donation goes directly to
              outreach programs, training, and resources.
            </p>
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              Learn more
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="bg-cover bg-center w-full h-64 rounded-lg"
              style={{ backgroundImage: "url('/mock.jpg')" }}
              role="img"
              aria-label="Mock representation of fundraising journey"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
