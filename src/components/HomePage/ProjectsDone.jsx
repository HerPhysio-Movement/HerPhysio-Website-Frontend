import { Link } from "react-router-dom";

const projects = [
  {
    title: "The Workshop2Outreach Program",
    description:
      "Community projects implemented by participants to address local women's health needs.",
    image: "/webinar.jpg",
    galleryLink: "/gallery",
  },
  {
    title: "Collaborative Projects",
    description: "Working with partners to scale impact across Nigeria.",
    image: "/pospartum.jpg",
    galleryLink: "/gallery",
  },
];

const ProjectsDone = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            OUR PROJECTS
          </h2>
        </div>
        <p className="text-[#525560] text-lg mb-12 max-w-2xl">
          We are empowering women, one project at a time.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <Link
                  to={project.galleryLink}
                  className="text-white font-semibold underline underline-offset-4 hover:no-underline"
                >
                  Visit our Gallery →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProjectsDone;
