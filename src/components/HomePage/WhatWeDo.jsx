import {
  FaVideo,
  FaUsers,
  FaHandsHelping,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

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
      "A 3-month cohort-based program that equips physiotherapists in the women's health field.",
    icon: <FaChalkboardTeacher className="w-8 h-8 text-[#FD90A7]" />,
    image: "/hpmMentorss.jpg",
  },
];

const WhatWeDo = () => {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [hiddenServiceModalOpen, setHiddenServiceModalOpen] = useState(false);

  const hiddenService = services.find(service => service.title === "The Workshop2Outreach (W20)");
  const visibleServices = services.filter(service => service.title !== "The Workshop2Outreach (W20)");

  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section: left text + testimonial card */}
        <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
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
          <div className="md:w-1/2">
            {/* Replaced image with a testimonial card */}
            <div className="bg-[#FFD8E1] rounded-xl p-6 shadow-md border border-white/30">
              <p className="text-[#1D2130] italic text-lg mb-4">
                “Her Physio Movement gave me back my confidence. The support and knowledge I received changed my life.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FD90A7]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#FD90A7] font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1D2130]">Amina Ibrahim</p>
                  <p className="text-sm text-[#525560]">Beneficiary, Lagos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services grid – unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {visibleServices.map((service, index) => (
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
                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setHiddenServiceModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition"
          >
            View more
          </button>
        </div>
      </div>

      {/* Modal for hidden service (Workshop2Outreach) – unchanged */}
      {hiddenServiceModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setHiddenServiceModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHiddenServiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-full flex items-center justify-center">
                  {hiddenService.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1D2130] font-zodiak">
                  {hiddenService.title}
                </h3>
              </div>
              <p className="text-[#525560] text-lg">{hiddenService.description}</p>
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={hiddenService.image}
                  alt={hiddenService.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  to="/volunteer-signup"
                  className="px-6 py-2 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition"
                  onClick={() => setHiddenServiceModalOpen(false)}
                >
                  Get involved
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Modal (kept for future use) – unchanged */}
      {volunteerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setVolunteerModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-[#1D2130] mb-3">Become a Volunteer</h3>
            <p className="text-[#525560] mb-5">
              Join our growing community of volunteers and help us transform women's health across Africa. Whether you're a physiotherapist, student, or simply passionate about making a difference – your contribution matters.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVolunteerModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
              >
                Maybe later
              </button>
              <Link
                to="/volunteer-signup"
                className="px-4 py-2 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition"
                onClick={() => setVolunteerModalOpen(false)}
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