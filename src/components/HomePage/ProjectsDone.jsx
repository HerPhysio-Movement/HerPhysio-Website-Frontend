// src/components/HomePage/ProjectsDone.jsx
import DonationStats from "../DonationStats";

const projects = [
  {
    title: "Mission smile 1k: Outdoor charity",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Weekly excursions:",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Monthly public awareness:",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    image: "https://images.unsplash.com/photo-1573164713988-9665fc3c3e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const ProjectsDone = () => {
  return (
    <section className="bg-white mb-16">
      {/* Top part: heading and project cards (centered container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16 pb-8">
        {/* Heading with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]"></div>
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            PROJECTS WE HAVE DONE
          </h2>
        </div>

        <p className="text-[#525560] mb-12 max-w-2xl">
          We are creating a place where women with special needs can thrive
        </p>

        {/* Project cards – responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden bg-cover bg-center min-h-[250px] flex items-end"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 p-6 text-white w-full">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-sm leading-relaxed mb-4 opacity-90">
                  {project.description}
                </p>
                <button className="inline-flex items-center text-sm font-semibold underline underline-offset-4 hover:no-underline focus:outline focus:outline-2 focus:outline-white">
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full‑width donation section (black background) */}
      <div className="w-full bg-black">
        {/* Centered content with padding */}
        <div className="px-4 sm:px-8 md:px-16 py-16">
          <DonationStats showHeading={false} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsDone;