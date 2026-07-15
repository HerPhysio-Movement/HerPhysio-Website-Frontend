// src/features/about/components/TeamGrid.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import { Info, X } from 'lucide-react';
import { coFounders, leadersTeam, websiteTeam } from '../data/teamData';

const teamSections = [
  { title: 'Meet Our Co-founders', members: coFounders },
  { title: 'Meet Our Leaders', members: leadersTeam },
  { title: 'Meet Our Website Team', members: websiteTeam },
];

const TeamGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const scrollContainerRefs = useRef({});
  const sectionRef = useRef(null);
  const location = useLocation(); // Get location

  // Handle mouse drag for horizontal scroll
  const handleMouseDown = useCallback((e, sectionKey) => {
    const container = scrollContainerRefs.current[sectionKey];
    if (!container) return;
    const isDragging = container.dataset.dragging === 'true';
    if (isDragging) return;
    
    container.dataset.dragging = 'true';
    container.dataset.startX = e.pageX - container.offsetLeft;
    container.dataset.scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e) => {
    // Find which container we're dragging
    for (const key in scrollContainerRefs.current) {
      const container = scrollContainerRefs.current[key];
      if (!container || container.dataset.dragging !== 'true') continue;
      
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - parseFloat(container.dataset.startX)) * 1.5;
      container.scrollLeft = parseFloat(container.dataset.scrollLeft) - walk;
      break;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    for (const key in scrollContainerRefs.current) {
      const container = scrollContainerRefs.current[key];
      if (!container) continue;
      
      if (container.dataset.dragging === 'true') {
        container.dataset.dragging = 'false';
        container.style.cursor = 'grab';
        container.style.userSelect = '';
      }
    }
  }, []);

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

  // Handle hash-based scrolling
  useEffect(() => {
    if (location.hash === '#team' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Set up individual container event listeners
  useEffect(() => {
    const containers = scrollContainerRefs.current;
    const mouseDownHandlers = {};

    for (const key in containers) {
      const container = containers[key];
      if (!container) continue;
      
      container.style.cursor = 'grab';
      
      const handler = (e) => handleMouseDown(e, key);
      mouseDownHandlers[key] = handler;
      container.addEventListener('mousedown', handler);
      container.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      for (const key in containers) {
        const container = containers[key];
        if (!container) continue;
        
        container.removeEventListener('mousedown', mouseDownHandlers[key]);
        container.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [handleMouseDown, handleMouseUp]);

  return (
    <section id="team" ref={sectionRef} className="px-4 py-20 overflow-hidden bg-white sm:px-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <span className="w-2 h-2 bg-[#FD90A7] rounded-full" />
            <span>Our People</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Meet Our Team</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4" />
        </div>

        {teamSections.map((section, sectionIndex) => {
          const sectionKey = `section-${sectionIndex}`;
          
          return (
            <div key={section.title} className="mb-14">
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#1D2130]">{section.title}</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mt-2" />
              </div>

              <div
                ref={(el) => {
                  if (el) {
                    scrollContainerRefs.current[sectionKey] = el;
                  }
                }}
                className="flex gap-8 pb-8 overflow-x-auto scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  cursor: 'grab'
                }}
                data-dragging="false"
              >
                {section.members.map((member, idx) => {
                  const isActive = activeIndex === `${sectionKey}-${idx}`;
                  return (
                    <div
                      key={`${sectionKey}-${member.name}`}
                      className="relative flex-shrink-0 p-6 transition-all duration-300 border border-gray-100 rounded-lg w-72 md:w-80 bg-white/70 backdrop-blur-sm group"
                      style={{
                        transformStyle: 'preserve-3d',
                        transition: 'box-shadow 0.3s, transform 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                      onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                      onMouseEnter={() => setActiveIndex(`${sectionKey}-${idx}`)}
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FD90A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#FD90A7]/30 rounded-tr-lg" />

                      <div className="relative mb-5 overflow-hidden rounded-md shadow-md aspect-square">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                          style={{ objectPosition: member.objectPosition }}
                        />
                        <div className="absolute inset-0 flex items-end justify-center gap-3 transition-opacity duration-300 opacity-100 bg-black/30 lg:items-center lg:opacity-0 lg:bg-black/50 group-hover:opacity-100 pb-7 lg:pb-0">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-md text-[#FD90A7] hover:bg-[#FD90A7] hover:text-white transition-all duration-300 shadow-lg"
                            aria-label={`Visit ${member.name} on LinkedIn`}
                            onClick={(e) => e.stopPropagation()}
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

                      <h3 className="text-xl font-bold text-[#1D2130] mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>

                      <div
                        className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] transform origin-left transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-2 mt-4 text-xs text-center text-gray-400">
                <span>← Drag to explore →</span>
              </div>
            </div>
          );
        })}
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

      <style>{`
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