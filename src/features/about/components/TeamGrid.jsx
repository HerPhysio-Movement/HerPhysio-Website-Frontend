// src/features/about/components/TeamGrid.jsx
import { useState, useRef, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { Info, X } from 'lucide-react';
import { teamMembers } from '../data/teamData';

const TeamGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Handle mouse drag for horizontal scroll
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.cursor = 'grab';
  };

  // Mouse move for individual card 3D tilt
  const handleCardMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardEl.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(20px)`;
  };

  const handleCardMouseLeave = (cardEl) => {
    if (cardEl) cardEl.style.transform = '';
  };

  const openMemberModal = (member) => {
    setSelectedMember(member);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <section className="px-4 py-20 overflow-hidden bg-white sm:px-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <span className="w-2 h-2 bg-[#FD90A7] rounded-full" />
            <span>Our People</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Meet Our Co-founders</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4" />
          <p className="text-[#525560]">Leaders in health, education, and community impact.</p>
        </div>

        {/* Horizontal scroll, no visible scrollbar, drag to scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 pb-8 overflow-x-auto scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="relative flex-shrink-0 p-6 transition-all duration-300 border border-gray-100 rounded-lg w-72 md:w-80 bg-white/70 backdrop-blur-sm group"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'box-shadow 0.3s, transform 0.2s',
                }}
                onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FD90A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#FD90A7]/30 rounded-tr-lg" />

                {/* Image with rounded corners (not circle) */}
                <div className="relative mb-5 overflow-hidden rounded-md shadow-md aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  {/* Overlay with social and info actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-md text-[#FD90A7] hover:bg-[#FD90A7] hover:text-white transition-all duration-300 shadow-lg"
                      aria-label={`Visit ${member.name} on LinkedIn`}
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openMemberModal(member);
                      }}
                      className="p-2 bg-white rounded-md text-[#C7365B] hover:bg-[#C7365B] hover:text-white transition-all duration-300 shadow-lg"
                      aria-label={`Learn more about ${member.name}`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Name and role */}
                <h3 className="text-xl font-bold text-[#1D2130] mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>

                {/* Animated bottom border on active */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] transform origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Instruction for drag scroll */}
        <div className="flex justify-center gap-2 mt-4 text-xs text-center text-gray-400">
          <span>← Drag to explore →</span>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/60 backdrop-blur-sm" onClick={closeMemberModal}>
          <div
            className="relative w-full max-w-lg rounded-[20px] border border-gray-100 bg-white p-6 shadow-2xl md:p-8 animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeMemberModal}
              className="absolute p-2 text-gray-500 transition-colors rounded-full top-4 right-4 hover:bg-gray-100 hover:text-[#C7365B]"
              aria-label="Close profile details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left sm:items-start">
              <div className="relative w-24 h-24 overflow-hidden shadow-md rounded-2xl">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: selectedMember.objectPosition }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FD90A7]">About</p>
                <h3 className="mt-1 text-2xl font-bold text-[#1D2130]">{selectedMember.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{selectedMember.role}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#FD90A7]/15 bg-[#FFF5F7] p-5">
              <p className="text-sm leading-7 text-[#525560]">{selectedMember.about}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar for all browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-modal-pop {
          animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modal-pop {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamGrid;