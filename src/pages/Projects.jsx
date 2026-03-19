const Projects = () => {
  return (
    <main id="main-content" className="px-4 sm:px-8 md:px-16 py-16">
      <h1 className="text-3xl font-bold text-[#1D2130] mb-8">Our Projects</h1>
      <p className="text-[#525560] mb-8">
        Here are some of the projects we have done to empower women through physiotherapy.
      </p>
      <div className="grid gap-6">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#1D2130]">Mission smile 1k: Outdoor charity</h2>
          <p className="text-[#525560]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
        </div>
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#1D2130]">Weekly excursions</h2>
          <p className="text-[#525560]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
        </div>
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#1D2130]">Monthly public awareness</h2>
          <p className="text-[#525560]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
        </div>
      </div>
    </main>
  );
};

export default Projects;