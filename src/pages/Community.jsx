// src/pages/Community.jsx
import { useState } from "react";
import { FaUsers, FaComments, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import EventsSection from '../components/shared/EventsSection';
import ContributionCTA from '../components/HomePage/ContributionCTA';

const Community = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  const stories = [
    {
      name: "Amina's Journey",
      role: "Beneficiary",
      quote: "Her Physio Movement gave me back my confidence. The pelvic health sessions changed my life.",
      image: "/story1.jpg",
    },
    {
      name: "Community Outreach",
      role: "Volunteer",
      quote: "Volunteering here has been the most rewarding experience. We're truly making a difference.",
      image: "/story2.jpg",
    },
    {
      name: "Support Group",
      role: "Member",
      quote: "Finding a sisterhood of women who understand my struggles has been invaluable.",
      image: "/story3.jpg",
    },
    {
      name: "Wellness Workshop",
      role: "Participant",
      quote: "I learned so much about postpartum care. The community here is so welcoming.",
      image: "/story4.jpg",
    },
    {
      name: "Mentorship Program",
      role: "Mentee",
      quote: "My mentor guided me through my physiotherapy exams. Forever grateful.",
      image: "/story5.jpg",
    },
    {
      name: "Fundraising Gala",
      role: "Organizer",
      quote: "Seeing everyone come together to support women's health was incredible.",
      image: "/story6.jpg",
    },
  ];

  const groups = [
    { name: "Pelvic Health Support Group", members: 234, icon: FaHeart },
    { name: "New Moms Circle", members: 156, icon: FaUsers },
    { name: "Physiotherapy Students Network", members: 89, icon: FaComments },
    { name: "Wellness Wednesday Chats", members: 112, icon: FaCalendarAlt },
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
      {/* Hero section */}
      <section className="px-4 sm:px-8 md:px-16 pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Community
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2130] mb-4 max-w-3xl">
            Together, we grow stronger
          </h1>
          <p className="text-[#525560] text-lg max-w-2xl">
            Join a supportive community of women, physiotherapists, and advocates dedicated to transforming women's health.
          </p>
        </div>
      </section>

      {/* Community Stories - Carousel */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Community stories
            </h2>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            className="pb-4"
          >
            {stories.map((story, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                      {story.image ? <img src={story.image} alt={story.name} className="w-full h-full rounded-full object-cover" /> : '📷'}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1D2130]">{story.name}</h3>
                      <p className="text-sm text-[#525560]">{story.role}</p>
                    </div>
                  </div>
                  <p className="text-[#525560] italic">"{story.quote}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Upcoming Events - reuse EventsSection but without its own heading */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-[#FFD8E1]">
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
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition text-center">
                  <Icon className="w-8 h-8 text-[#FD90A7] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1D2130] mb-2">{group.name}</h3>
                  <p className="text-sm text-[#525560] mb-4">{group.members} members</p>
                  <button
                    onClick={() => openModal(group.name)}
                    className="text-[#FD90A7] font-medium text-sm hover:underline"
                  >
                    Join group →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reuse ContributionCTA */}
      <ContributionCTA />

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-[#1D2130] mb-4">
              You're on the list! 🎉
            </h3>
            <p className="text-[#525560] mb-6">
              We're building something amazing for the <span className="font-semibold text-[#FD90A7]">{selectedGroup}</span>. You'll be the first to know when it's ready to join. Stay tuned!
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#FD90A7] text-white px-6 py-2 rounded-md hover:bg-[#f77997] transition"
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