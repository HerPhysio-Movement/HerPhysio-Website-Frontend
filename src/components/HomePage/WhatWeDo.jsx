import {
  FaVideo,
  FaUsers,
  FaHandsHelping,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Heart } from "lucide-react";

const services = [
  {
    title: "Her Physio Webinar",
    description:
      "Monthly conversations with healthcare specialists on women's health topics.",
    icon: <FaVideo className="w-8 h-8 text-[#FD90A7]" />,
    image: "/webinar.jpg",
  },
  {
    title: "The 360 Panel Session",
    description:
      "Quarterly discussions that bring a diverse group of voices together around women's health.",
    icon: <FaUsers className="w-8 h-8 text-[#FD90A7]" />,
    image: "/degreeWomen.jpg",
  },
  {
    title: "The Workshop2Outreach (W20)",
    description:
      "Community mini-projects are implemented, to address the health needs of women in the community.",
    icon: <FaHandsHelping className="w-8 h-8 text-[#FD90A7]" />,
    image: "/Outreachh.jpg",
  },
  {
    title: "The 3-months Mentorship Program",
    description:
      "A cohort-based program that equips physiotherapists in the women's health field for 3 months which is completed with a capstone project.",
    icon: <FaChalkboardTeacher className="w-8 h-8 text-[#FD90A7]" />,
    image: "/hpmMentorss.jpg",
  },
];

const WhatWeDo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-30">
          {/* Left text column */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
              <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
                WHAT WE DO
              </h2>
            </div>
            <p className="text-lg text-[#525560] mb-4">
              Whether you are a woman wanting to understand your body better, or
              a professional ready to serve women well, there is a place for you
              in what we do.
            </p>
            <p className="text-lg font-semibold text-[#1D2130]">
              4 ways we are changing the narratives around women's health in
              Africa.
            </p>
          </div>

          {/* Right column with two images + decorative cluster */}
          <div className="md:w-1/2">
            {/* Desktop layout */}
            <div className="hidden md:flex items-center">
              {/* Left image */}
              <div className="w-[42%] group relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="/active.jpg"
                  alt="Active women participating in workshop"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <span className="text-white text-sm font-medium">
                    Community engagement in action
                  </span>
                </div>
              </div>

              {/* Decorative cluster (7 elements) */}
              <div className="flex items-center justify-center gap-1 mx-4">
                <Heart className="w-3 h-3 text-[#FD90A7]/30" />
                <Star className="w-3 h-3 text-[#FD90A7]/30" />
                <Plus className="w-3 h-3 text-[#FD90A7]/30" />
                <div className="flex flex-col items-center justify-center">
                  <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#FD90A7]/50 to-transparent"></div>
                  <div className="my-1">
                    <div
                      className="w-7 h-7 rounded-full bg-[#FD90A7]/10 flex items-center justify-center cursor-pointer hover:bg-[#FD90A7]/20 transition"
                      onClick={() => setModalOpen(true)}
                    >
                      <div className="w-2.5 h-2.5 bg-[#FD90A7] rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gradient-to-t from-transparent via-[#FD90A7]/50 to-transparent"></div>
                </div>
                <Plus className="w-3 h-3 text-[#FD90A7]/30" />
                <Star className="w-3 h-3 text-[#FD90A7]/30" />
                <Heart className="w-3 h-3 text-[#FD90A7]/30" />
              </div>

              {/* Right image (pushed right) */}
              <div className="w-[42%] ml-auto group relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="/womenHealth.jpg"
                  alt="Women learning about health"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <span className="text-white text-sm font-medium">
                    Empowering women with knowledge
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="flex md:hidden items-center justify-between">
              <div className="w-[45%] group relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="/active.jpg"
                  alt="Active women participating in workshop"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
                  <span className="text-white text-xs font-medium">
                    Community engagement
                  </span>
                </div>
              </div>

              {/* Mobile decorative cluster */}
              <div className="flex items-center justify-center gap-1 mx-2">
                <Heart className="w-2.5 h-2.5 text-[#FD90A7]/30" />
                <Star className="w-2.5 h-2.5 text-[#FD90A7]/30" />
                <Plus className="w-2.5 h-2.5 text-[#FD90A7]/30" />
                <div className="flex flex-col items-center justify-center">
                  <div className="h-px w-5 bg-gradient-to-r from-transparent via-[#FD90A7]/50 to-transparent"></div>
                  <div className="my-1">
                    <div
                      className="w-6 h-6 rounded-full bg-[#FD90A7]/10 flex items-center justify-center cursor-pointer hover:bg-[#FD90A7]/20 transition"
                      onClick={() => setModalOpen(true)}
                    >
                      <div className="w-2 h-2 bg-[#FD90A7] rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-px w-5 bg-gradient-to-l from-transparent via-[#FD90A7]/50 to-transparent"></div>
                </div>
                <Plus className="w-2.5 h-2.5 text-[#FD90A7]/30" />
                <Star className="w-2.5 h-2.5 text-[#FD90A7]/30" />
                <Heart className="w-2.5 h-2.5 text-[#FD90A7]/30" />
              </div>

              <div className="w-[45%] group relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="/womenHealth.jpg"
                  alt="Women learning about health"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
                  <span className="text-white text-xs font-medium">
                    Empowering women
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services grid – now spaced further down */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0 mt-1">{service.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-[#1D2130] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#525560] mb-4">{service.description}</p>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-[#1D2130] mb-3">
              Become a Volunteer
            </h3>
            <p className="text-[#525560] mb-5">
              Join our growing community of volunteers and help us transform
              women's health across Africa. Whether you're a physiotherapist,
              student, or simply passionate about making a difference – your
              contribution matters.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
              >
                Maybe later
              </button>
              <Link
                to="/volunteer-signup"
                className="px-4 py-2 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition"
                onClick={() => setModalOpen(false)}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhatWeDo;
