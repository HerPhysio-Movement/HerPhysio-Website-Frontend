import { useState } from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    name: "Leonard John Davies",
    role: "Founder",
    image: "/team1.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Francis Weber",
    role: "Vice Chairman",
    image: "/team2.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Kyla Obrien",
    role: "Head of Authority",
    image: "/team3.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Adrian Dixon",
    role: "Support Executive",
    image: "/team4.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Sophia Martinez",
    role: "Program Director",
    image: "/team5.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "David Chen",
    role: "Research Lead",
    image: "/team6.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Emma Wilson",
    role: "Community Manager",
    image: "/team7.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
  {
    name: "Michael Okonkwo",
    role: "Field Coordinator",
    image: "/team8.jpg",
    social: { linkedin: "#", twitter: "#", facebook: "#" },
  },
];

const TeamGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4 text-center">
          Meet our team
        </h2>
        <p className="text-[#525560] text-center max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>

        {/* Desktop: grid layout (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <h3 className="font-bold text-lg text-[#1D2130]">{member.name}</h3>
              <p className="text-[#525560] text-sm mb-3">{member.role}</p>
              <div className="flex justify-center gap-3 text-gray-400">
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="hover:text-[#FD90A7] transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="hover:text-[#FD90A7] transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook`} className="hover:text-[#FD90A7] transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: carousel (hidden on desktop) */}
        <div className="lg:hidden">
          <div className="relative max-w-sm mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
                      <div className="mb-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-[#1D2130]">{member.name}</h3>
                      <p className="text-[#525560] text-sm mb-3">{member.role}</p>
                      <div className="flex justify-center gap-3 text-gray-400">
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="hover:text-[#FD90A7] transition-colors">
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="hover:text-[#FD90A7] transition-colors">
                          <FaTwitter className="w-4 h-4" />
                        </a>
                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook`} className="hover:text-[#FD90A7] transition-colors">
                          <FaFacebook className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5 text-[#1D2130]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5 text-[#1D2130]" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentIndex ? 'bg-[#FD90A7] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to member ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;