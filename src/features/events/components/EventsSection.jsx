// src/features/events/components/EventsSection.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { eventAPI } from '../../../services/eventAPI';
import { useUser } from '../../../context/UserContext';

const EventsSection = ({ showHeading = true }) => {
  const { currentUser } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventAPI.getAllEvents();
        setEvents(data.events || data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Hide scroll hint after 3 seconds
  useEffect(() => {
    if (!loading && events.length > 0) {
      const timer = setTimeout(() => setShowScrollHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, events]);

  // Horizontal drag scroll
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

  const registerEvent = async (eventId) => {
    if (!currentUser) {
      alert('Please sign in to register.');
      return;
    }
    try {
      await eventAPI.registerForEvent({
        f_name: currentUser.f_name,
        l_name: currentUser.l_name,
        email: currentUser.email,
        event_id: eventId,
      });
      alert('Registered successfully!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  const getDayMonth = (dateString) => {
    const date = new Date(dateString);
    return { day: date.getDate(), month: date.toLocaleString('default', { month: 'short' }) };
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse text-[#FD90A7]">Loading events...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          Error loading events: {error}
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Join Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">Our Events</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#525560] text-lg max-w-2xl mx-auto">
            Come learn something new, connect with experts, and be part of the movement.
          </p>
        </div>

        {/* Horizontal scrollable events */}
        <div className="relative">
          {/* Scroll hint */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 right-4 z-20 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-opacity duration-500 ${
              showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            ← Drag to explore →
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide cursor-grab snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {events.map((event) => {
              const { day, month } = getDayMonth(event.event_date);
              return (
                <div
                  key={event.id}
                  className="relative flex-shrink-0 w-80 md:w-96 snap-start group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="relative bg-white/80 backdrop-blur-sm rounded-md border border-gray-100 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                    style={{
                      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width - 0.5;
                      const y = (e.clientY - rect.top) / rect.height - 0.5;
                      e.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${y * -6}deg) translateZ(10px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                    }}
                  >
                    {/* Gradient top border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B]" />

                    {/* Date ribbon */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded px-3 py-1 shadow-sm text-center border border-gray-100">
                      <div className="text-2xl font-bold text-[#FD90A7] leading-none">{day}</div>
                      <div className="text-xs uppercase text-gray-500">{month}</div>
                    </div>

                    {/* Content – increased top padding to prevent overlap */}
                    <div className="p-5 pt-20">
                      <h3 className="text-xl font-bold text-[#1D2130] group-hover:text-[#FD90A7] transition-colors line-clamp-1 mt-2">
                        {event.event_name}
                      </h3>
                      <div className="space-y-3 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FD90A7]" />
                          <span>{event.event_date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#FD90A7]" />
                          <span>{event.event_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#FD90A7]" />
                          <span className="line-clamp-1">{event.venue || 'Online / TBD'}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-gray-500 text-sm mt-4 line-clamp-2">{event.description}</p>
                      )}
                    </div>

                    {/* Register button */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => registerEvent(event.id)}
                        className="w-full py-2.5 bg-transparent border border-[#FD90A7] text-[#FD90A7] rounded-md font-semibold text-sm hover:bg-[#FD90A7] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Register
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View all events link */}
        <div className="text-center mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-[#FD90A7] font-semibold group hover:gap-3 transition-all"
          >
            <span>View all events</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default EventsSection;