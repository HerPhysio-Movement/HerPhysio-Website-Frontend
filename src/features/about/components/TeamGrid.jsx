// src/features/about/components/TeamGrid.jsx
import { useState, useRef, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { teamMembers } from '../data/teamData';

const TeamGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);
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
    <section className="bg-white py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <span className="w-2 h-2 bg-[#FD90A7] rounded-full" />
            <span>Our People</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Meet Our Dedicated Team</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4" />
          <p className="text-[#525560]">Leaders in health, education, and community impact.</p>
        </div>

        {/* Horizontal scroll, no visible scrollbar, drag to scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="relative flex-shrink-0 w-72 md:w-80 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100 p-6 transition-all duration-300 group"
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
                <div className="relative mb-5 overflow-hidden rounded-md aspect-square shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  {/* Overlay with LinkedIn icon */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-md text-[#FD90A7] hover:bg-[#FD90A7] hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
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
        <div className="text-center mt-4 text-xs text-gray-400 flex justify-center gap-2">
          <span>← Drag to explore →</span>
        </div>
      </div>

      {/* Hide scrollbar for all browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TeamGrid;