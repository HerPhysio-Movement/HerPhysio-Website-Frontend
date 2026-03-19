const teamMembers = [
  {
    name: "Modupe Laja",
    image: "/Modupe.jpg",
    linkedin: "https://www.linkedin.com/in/modupelaja/",
  },
  {
    name: "Antonia Abraham",
    image: "/Antonia.jpg",
    linkedin: "https://www.linkedin.com/in/anthonia-abraham/",
  },
  {
    name: "Hauwa Ahmed",
    image: "/Hauwa.jpg",
    linkedin: "https://www.linkedin.com/in/hauwa-ahmed-871a37264/",
  },
  {
    name: "Chijioke Otikpa",
    image: "/Chijioke.jpg",
    linkedin: "https://www.linkedin.com/in/chijiokeotikpa/",
  },
  {
    name: "Joseph Adunola",
    image: "/Joseph.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-adunola-9a8bab19b/",
  },
];

const TeamSection = () => {
  return (
    <section
      className="bg-white px-4 sm:px-8 md:px-16 py-16"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D2130] mb-4 leading-[120%]"
          >
            Meet Our Dedicated Team: Leaders in Health & Education
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="text-center focus-within:outline focus-within:outline-2 focus-within:outline-gray-400"
              role="group"
              aria-label={member.name}
            >
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={`Picture of ${member.name}`}
                  className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mx-auto object-cover object-top rounded-lg"
                />
              </div>
              <h4 className="font-bold text-[#1D2130] text-lg sm:text-xl md:text-2xl mb-1">
                {member.name}
              </h4>
              <div className="flex justify-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  className="text-black hover:text-gray-400 underline text-sm sm:text-base"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamMembers.slice(3, 5).map((member, index) => (
            <div
              key={index}
              className="text-center focus-within:outline focus-within:outline-2 focus-within:outline-gray-400"
              role="group"
              aria-label={member.name}
            >
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={`Picture of ${member.name}`}
                  className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mx-auto object-cover object-top rounded-lg"
                />
              </div>
              <h4 className="font-bold text-[#1D2130] text-lg sm:text-xl md:text-2xl mb-1">
                {member.name}
              </h4>
              <div className="flex justify-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  className="text-black hover:text-gray-400 underline text-sm sm:text-base"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
