// src/pages/Community.jsx
import { useState } from "react";
import {
  FaUsers,
  FaHeart,
  FaComments,
  FaCalendarAlt,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaQuoteLeft,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EventsSection from "../components/shared/EventsSection";
import ContributionCTA from "../components/HomePage/ContributionCTA";
import { Link } from "react-router-dom";

const Community = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  // Impact stats
  const stats = [
    { value: "5,000+", label: "Community members", icon: FaUsers },
    { value: "200+", label: "Active volunteers", icon: FaHandsHelping },
    { value: "50+", label: "Workshops held", icon: FaChalkboardTeacher },
    { value: "1,200+", label: "Lives impacted", icon: FaHeart },
  ];

  // Testimonials – authentic, diverse voices
  const stories = [
    {
      name: "Amina Ibrahim",
      role: "Beneficiary",
      quote:
        "After my delivery, I struggled with pelvic pain. The support group here gave me a voice and a path to healing. I'm not alone anymore.",
      image: "/images/amina.jpg",
    },
    {
      name: "Dr. Funmi Adebayo",
      role: "Volunteer Physiotherapist",
      quote:
        "Volunteering here has been incredibly fulfilling. We're not just treating symptoms; we're empowering women with knowledge and care.",
      image: "/images/funmi.jpg",
    },
    {
      name: "Chidinma Okonkwo",
      role: "New Moms Circle",
      quote:
        "As a first‑time mom, I felt isolated. This community welcomed me with open arms. The weekly chats and expert advice have been a lifeline.",
      image: "/images/chidinma.jpg",
    },
    {
      name: "Leonard Davies",
      role: "Mentor",
      quote:
        "Guiding young physiotherapists and seeing them grow into confident practitioners is the most rewarding part of my week.",
      image: "/images/leonard.jpg",
    },
    {
      name: "Esther Williams",
      role: "Pelvic Health Group",
      quote:
        "I never knew there were other women going through the same thing. Sharing experiences has been healing in so many ways.",
      image: "/images/esther.jpg",
    },
    {
      name: "Prof. Abike Lawson",
      role: "Advisor",
      quote:
        "This community is a model for grassroots health empowerment. The dedication is inspiring.",
      image: "/images/prof.jpg",
    },
  ];

  // Community groups with descriptions
  const groups = [
    {
      name: "Pelvic Health Support Group",
      members: 234,
      icon: FaHeart,
      description: "A safe space to share and heal together.",
    },
    {
      name: "New Moms Circle",
      members: 156,
      icon: FaUsers,
      description: "For mothers at every stage – ask, share, connect.",
    },
    {
      name: "Physiotherapy Students Network",
      members: 89,
      icon: FaComments,
      description: "Learn, mentor, and grow with peers.",
    },
    {
      name: "Wellness Wednesday Chats",
      members: 112,
      icon: FaCalendarAlt,
      description: "Weekly conversations on mind, body, and spirit.",
    },
  ];

  // How to get involved steps
  const steps = [
    {
      title: "Volunteer",
      description: "Create a free account – it takes two minutes.",
    },
    {
      title: "Choose your path",
      description: "Join a group, volunteer, or attend an event.",
    },
    {
      title: "Make an impact",
      description: "Your presence makes our community stronger.",
    },
  ];

  const openModal = (groupName) => {
    setSelectedGroup(groupName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroup("");
  };

  return (
    <main id="main-content" className="bg-white">
      {/* Hero */}
      <section className="px-4 sm:px-8 md:px-16 pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Community
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1D2130] mb-4 max-w-4xl leading-tight">
            Together, we're stronger.
          </h1>
          <p className="text-lg text-[#525560] max-w-2xl mb-8">
            Join a vibrant community of women, healthcare professionals, and advocates dedicated to transforming women's health across Africa. Whether you need support, want to learn, or are ready to give back – there's a place for you here.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-[#FD90A7] text-white rounded-full font-medium hover:bg-[#f77997] transition shadow-md"
            >
              Join the community
            </Link>
            <Link
              to="/volunteer"
              className="px-6 py-3 border-2 border-[#FD90A7] text-[#FD90A7] rounded-full font-medium hover:bg-[#FD90A7] hover:text-white transition"
            >
              Become a volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="px-4 sm:px-8 md:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <Icon className="w-6 h-6 text-[#FD90A7] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1D2130]">{stat.value}</div>
                <div className="text-xs text-[#525560] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-[#FFD8E1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Voices from our community
            </h2>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            loop={true}
            className="pb-12"
          >
            {stories.map((story, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl p-6 h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition relative">
                  <FaQuoteLeft className="absolute top-4 right-4 text-[#FD90A7] opacity-20 w-8 h-8" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📷
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1D2130] text-base">
                        {story.name}
                      </h3>
                      <p className="text-xs text-[#525560]">{story.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#525560] italic flex-1">
                    "{story.quote}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev !text-[#FD90A7] !w-8 !h-8 after:!text-sm"></div>
            <div className="swiper-button-next !text-[#FD90A7] !w-8 !h-8 after:!text-sm"></div>
          </Swiper>
        </div>
      </section>

      {/* Why join? */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Why join?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: "Find your people",
                desc: "Connect with women who truly understand your journey – no judgment, just support.",
              },
              {
                number: 2,
                title: "Learn from experts",
                desc: "Access workshops, Q&As, and resources designed to empower you with knowledge.",
              },
              {
                number: 3,
                title: "Make a difference",
                desc: "Volunteer, mentor, or advocate – your voice matters, and your impact is real.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FD90A7] rounded-full flex items-center justify-center text-white font-bold">
                  {item.number}
                </div>
                <div>
                  <h3 className="font-bold text-[#1D2130] text-lg mb-1">{item.title}</h3>
                  <p className="text-[#525560] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Groups */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Join a group
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className="group bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#FD90A7] hover:shadow-md transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-[#FD90A7] mb-3" />
                  <h3 className="font-bold text-[#1D2130] text-lg mb-1">{group.name}</h3>
                  <p className="text-sm text-[#525560] mb-3">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#525560]">{group.members} members</span>
                    <button
                      onClick={() => openModal(group.name)}
                      className="text-[#FD90A7] text-sm font-medium hover:underline"
                    >
                      Join →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="px-4 sm:px-8 md:px-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#FFD8E1] to-[#ffe4ec] rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-white/50 shadow-sm">
            <div>
              <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Featured event
              </span>
              <h3 className="text-2xl font-bold text-[#1D2130] mb-2">
                Pelvic Health Workshop with Dr. Ada
              </h3>
              <p className="text-[#525560] max-w-md">
                Join us for a live, interactive session on pelvic floor health. Open to all community members.
              </p>
            </div>
            <Link
              to="/events"
              className="px-6 py-3 bg-[#FD90A7] text-white rounded-full font-medium hover:bg-[#f77997] transition shadow-md whitespace-nowrap"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Community events
            </h2>
          </div>
          <EventsSection showHeading={false} />
        </div>
      </section>

      {/* Get involved */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-[#FFD8E1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Get involved
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#FD90A7] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-[#1D2130] text-lg mb-2">{step.title}</h3>
                <p className="text-[#525560] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution CTA (unchanged) */}
      <ContributionCTA />

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-[#1D2130] mb-4">
              You're on the list! 
            </h3>
            <p className="text-[#525560] mb-6">
              We're building something amazing for the{" "}
              <span className="font-semibold text-[#FD90A7]">{selectedGroup}</span>.
              You'll be the first to know when it's ready to join. Stay tuned!
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#FD90A7] text-white px-6 py-2 rounded-md hover:bg-[#f77997] transition font-medium"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Community;