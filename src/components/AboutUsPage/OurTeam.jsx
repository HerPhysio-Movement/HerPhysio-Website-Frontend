import { FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Modupe Laja",
    role: "Founder & Executive Director",
    image: "/Modupe.jpg",
    linkedin: "https://www.linkedin.com/in/modupelaja/",
  },
  {
    name: "Antonia Abraham",
    role: "Programs Manager",
    image: "/Antonia.jpg",
    linkedin: "https://www.linkedin.com/in/anthonia-abraham/",
  },
  {
    name: "Hauwa Ahmed",
    role: "Community Outreach Lead",
    image: "/Hauwa.jpg",
    linkedin: "https://www.linkedin.com/in/hauwa-ahmed-871a37264/",
  },
  {
    name: "Chijioke Otikpa",
    role: "Research & Development",
    image: "/Chijioke.jpg",
    linkedin: "https://www.linkedin.com/in/chijiokeotikpa/",
  },
  {
    name: "Joseph Adunola",
    role: "Mentorship Coordinator",
    image: "/Joseph.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-adunola-9a8bab19b/",
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
            Our People
          </span>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4"
          >
            Meet Our Dedicated Team
          </h2>
          <p className="text-[#525560] text-lg">
            Leaders in health, education, and community impact.
          </p>
        </div>

        {/* Team Grid – responsive for 5 members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              {/* Image with rounded corners */}
              <div className="mb-4 overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Name */}
              <h3 className="font-bold text-lg text-[#1D2130] mb-1">
                {member.name}
              </h3>
              {/* Role */}
              <p className="text-sm text-[#525560] mb-3">
                {member.role}
              </p>
              {/* LinkedIn Icon */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-[#FD90A7]/10 rounded-full text-[#FD90A7] hover:bg-[#FD90A7] hover:text-white transition-colors duration-200"
                aria-label={`Visit ${member.name}'s LinkedIn profile`}
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Optional "View All" button – can be linked to a full team page */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition shadow-md hover:shadow-lg"
          >
            Meet the whole team
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;