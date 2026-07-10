// src/features/events/components/EventsSection.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  MapPin,
} from 'lucide-react';
import { eventAPI } from '../../../services/eventAPI';
import { useUser } from '../../../context/UserContext';

/* ---------- Mini Calendar Component ---------- */
const CalendarDate = ({ dateString }) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return (
    <div className="flex flex-col items-center h-16 overflow-hidden bg-white shadow-md rounded-xl w-14">
      <div className="bg-[#FD90A7] text-white w-full text-center text-xs font-semibold py-0.5">{month}</div>
      <div className="flex items-center justify-center flex-1">
        <span className="text-xl font-black text-gray-800">{day}</span>
      </div>
    </div>
  );
};

/* ---------- Countdown Timer ---------- */
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate).getTime() - now.getTime();
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate || timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds <= 0) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-[#FD90A7]/30">
      <Clock className="w-4 h-4 text-[#FD90A7]" />
      <span className="text-sm font-semibold text-gray-700">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
};

/* ---------- Registration Modal ---------- */
const RegistrationModal = ({ isOpen, onClose, event, currentUser, onRegister }) => {
  const [email, setEmail] = useState(currentUser?.email || '');
  const [fName, setFName] = useState(currentUser?.f_name || '');
  const [lName, setLName] = useState(currentUser?.l_name || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
      setFName(currentUser.f_name || '');
      setLName(currentUser.l_name || '');
    }
  }, [currentUser]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const eventId = event.id || event._id || event.event_id;
      if (!eventId) {
        alert('Unable to register: invalid event ID.');
        return;
      }
      await onRegister(eventId, {
        email,
        f_name: fName,
        l_name: lName,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-[20px] shadow-2xl max-w-md w-full p-6 md:p-8 border border-gray-100 animate-modal-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
          <button onClick={onClose} className="p-1 text-gray-400 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#FD90A7]/5 rounded-2xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900">{event.event_name}</p>
              <p className="mt-1 text-xs text-gray-500">{event.event_date} • {event.event_time}</p>
              <p className="mt-1 text-xs text-gray-400">{event.venue || 'Online'}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">First Name</label>
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent text-sm" required />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-700">Last Name</label>
                <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent text-sm" required />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent text-sm" required />
            </div>
            <button type="submit" disabled={submitting} className="w-full py-2.5 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#F77997] transition flex items-center justify-center gap-2 disabled:opacity-60">
              {submitting ? 'Registering...' : 'Confirm Registration'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
      </div>
    </div>
  );
};

/* ---------- Main EventsSection ---------- */
const EventsSection = ({ showHeading = true }) => {
  const { currentUser } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index) => {
    if (index === activeEventIndex || events.length === 0) return;
    setSwipeDirection(index > activeEventIndex ? 'right' : 'left');
    setTimeout(() => { setActiveEventIndex(index); setSwipeDirection(null); }, 400);
  }, [activeEventIndex, events.length]);

  const nextEvent = () => goTo((activeEventIndex + 1) % events.length);
  const prevEvent = () => goTo((activeEventIndex - 1 + events.length) % events.length);

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextEvent();
      else prevEvent();
    }
  };

  const handleRegisterClick = (event) => {
    const isPast = new Date(event.event_date) < new Date();
    if (isPast) return;
    setSelectedEvent(event);
    setShowRegModal(true);
  };

  const handleRegistration = async (eventId, { email, f_name, l_name }) => {
    try {
      await eventAPI.registerForEvent({
        f_name: f_name || currentUser?.f_name || '',
        l_name: l_name || currentUser?.l_name || '',
        email: email || currentUser?.email || '',
        event_id: eventId,
      });
      setShowRegModal(false);
      alert('Registered successfully!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= new Date()).length;
  const upcomingEventsList = events.filter((e) => new Date(e.event_date) >= new Date());
  const totalRegistrations = events.reduce((sum, e) => sum + (e.registrations || 0), 0);
  const nextUpcomingEvent = upcomingEventsList[0];
  const currentEvent = events[activeEventIndex];

  if (loading) {
    return (
      <section className="py-20 px-4 bg-[#F4F6F8]" ref={sectionRef}>
        <div className="mx-auto text-center max-w-7xl"><div className="animate-pulse text-[#FD90A7]">Loading events...</div></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-[#F4F6F8]" ref={sectionRef}>
        <div className="mx-auto text-center text-red-500 max-w-7xl">Error loading events: {error}</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-[#F4F6F8]">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-[#FD90A7] rounded-full opacity-40 animate-float-slow" />
        <div className="absolute bottom-20 right-16 w-4 h-4 bg-[#6020F0] rounded-full opacity-30 animate-float-slow-delayed" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[#FCD172] rounded-full opacity-50 animate-float-slower" />
        <div className="absolute bottom-1/3 left-1/3 w-3.5 h-3.5 bg-[#C7365B] rounded-full opacity-30 animate-float-slow" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-[#FD90A7] rounded-full opacity-40 animate-float-slow-delayed" />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/30 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <Sparkles className="w-4 h-4" /> Our Events
          </span>
          <h2 className="max-w-4xl mx-auto mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
             Learn something new.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FD90A7] via-[#6020F0] to-[#FCD172] mx-auto mb-4 rounded-full" />
          <p className="max-w-xl mx-auto text-lg text-gray-500">Explore our upcoming events and secure your spot today.</p>
          {nextUpcomingEvent && (
            <div className="mt-4">
              <CountdownTimer targetDate={nextUpcomingEvent.event_date} />
              <p className="mt-1 text-xs text-gray-400">until next event</p>
            </div>
          )}
        </div>

        {/* Asymmetric Grid */}
        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column – Stats & Upcoming Ledger (span 5) */}
          <div className={`lg:col-span-5 space-y-6 order-2 lg:order-1 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 max-w-sm mx-auto lg:mx-0 relative">
              {nextUpcomingEvent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg animate-pulse-glow">
                  Next: {nextUpcomingEvent.event_name.substring(0, 20)}...
                </div>
              )}
              <h3 className="flex items-center gap-2 mt-2 mb-4 text-lg font-bold text-gray-900"><Users className="w-5 h-5 text-[#FD90A7]" /> Event Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FD90A7]/5 rounded-2xl p-4"><p className="text-3xl font-black text-[#FD90A7]">{totalEvents}</p><p className="text-xs text-gray-500">Total Events</p></div>
                <div className="bg-[#6020F0]/5 rounded-2xl p-4"><p className="text-3xl font-black text-[#6020F0]">{upcomingEvents}</p><p className="text-xs text-gray-500">Upcoming</p></div>
                <div className="bg-[#FCD172]/10 rounded-2xl p-4 col-span-2"><p className="text-2xl font-black text-gray-900">{totalRegistrations}+</p><p className="text-xs text-gray-500">Attendees & Growing</p></div>
              </div>
            </div>

            {events.length > 0 && (
              <div className="bg-[#0B0F12] text-white rounded-[32px] p-6 max-w-sm mx-auto lg:mx-0">
                <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">Upcoming Events</h3>
                <div className="space-y-3">
                  {upcomingEventsList.length > 0 ? (
                    upcomingEventsList.slice(0, 3).map((ev) => {
                      const index = events.indexOf(ev);
                      return (
                        <div
                          key={ev.id || ev._id || index}
                          onClick={() => goTo(index)}
                          className={`ledger-row-item flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                            index === activeEventIndex ? 'bg-[#FD90A7] text-white' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FD90A7]/20 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{ev.event_name}</p>
                              <p className="text-xs text-gray-400">{ev.event_date} • {ev.event_time}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-5 text-sm text-center text-gray-200 border rounded-2xl border-white/20">
                      No upcoming event yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link
              to="/events"
              className="w-full max-w-sm mx-auto lg:mx-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD90A7] text-white rounded-full font-semibold shadow-lg hover:bg-[#F77997] transition transform hover:scale-105"
            >
              View All Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right Column – 3D Cover‑Flow Carousel (span 7) */}
          <div className={`lg:col-span-7 order-1 lg:order-2 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative w-full max-w-2xl mx-auto" style={{ perspective: '1200px' }}>
              {/* Navigation arrows */}
              {events.length > 1 && (
                <>
                  <button onClick={prevEvent} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 border border-gray-200 text-gray-500 hover:text-[#FD90A7] hover:border-[#FD90A7] shadow-sm transition">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextEvent} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 border border-gray-200 text-gray-500 hover:text-[#FD90A7] hover:border-[#FD90A7] shadow-sm transition">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Carousel container with manual swipe */}
              <div
                ref={carouselRef}
                className="flex justify-center items-center min-h-[420px] overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {events.map((ev, idx) => {
                  const offset = idx - activeEventIndex;
                  const absOffset = Math.abs(offset);
                  const scale = 1 - absOffset * 0.15;
                  const rotateY = offset * 30;
                  const translateX = offset * 30;
                  const zIndex = 10 - absOffset;
                  const opacity = 1 - absOffset * 0.35;
                  const blur = absOffset > 0 ? `blur(${absOffset * 2}px)` : 'none';

                  const eventId = ev.id || ev._id || ev.event_id || ev.eventId || '';
                  const eventImage = ev.thumbnail_url || ev.thumbnail_file || ev.image_url || ev.image || null;

                  return (
                    <div
                      key={eventId || idx}
                      className="absolute transition-all duration-500 ease-out cursor-pointer w-72 sm:w-80"
                      style={{
                        transform: `translateX(${translateX}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                        zIndex,
                        opacity,
                        filter: blur,
                        pointerEvents: absOffset === 0 ? 'auto' : 'none',
                      }}
                      onClick={() => goTo(idx)}
                    >
                      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden border border-gray-100 group">
                        {/* Image */}
                        <div className="relative overflow-hidden h-44">
                          {eventImage ? (
                            <img src={eventImage} alt={ev.event_name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#FD90A7]/20 to-[#6020F0]/20 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-[#FD90A7]/50" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <CalendarDate dateString={ev.event_date} />
                          </div>
                          {/* Progress chip */}
                          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-semibold text-[#FD90A7] shadow">
                            {idx + 1}/{events.length}
                          </div>
                        </div>
                        {/* Card body */}
                        <div className="p-5">
                          <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">{ev.event_name}</h3>
                          <div className="space-y-1.5 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#6020F0]" />{ev.event_time || 'TBA'}</div>
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#FCD172]" />{ev.venue || 'Online'}</div>
                            {ev.description && <p className="mt-2 text-xs text-gray-400 line-clamp-2">{ev.description}</p>}
                          </div>
                          <div className="flex flex-col gap-2 mt-4 sm:flex-row">
                            {new Date(ev.event_date) >= new Date() ? (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleRegisterClick(ev); }}
                                className="flex-1 py-2.5 bg-[#FD90A7] text-white rounded-full font-semibold text-sm hover:bg-[#F77997] transition flex items-center justify-center gap-2 animate-pulse-glow"
                              >
                                Register <ArrowRight className="w-4 h-4" />
                              </button>
                            ) : (
                              <span className="flex-1 inline-flex py-2.5 justify-center rounded-full bg-gray-200 text-gray-500 font-semibold text-sm">
                                Event Closed
                              </span>
                            )}
                            <Link
                              to={eventId ? `/events/${eventId}` : '/events'}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 border border-[#FD90A7]/30 text-[#FD90A7] rounded-full font-semibold text-sm hover:bg-[#FD90A7]/10 transition"
                            >
                              Event Details <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                          <p className="text-center text-[10px] text-gray-400 mt-1.5">← Swipe to explore →</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dot indicators */}
              {events.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {events.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === activeEventIndex ? 'w-6 bg-[#FD90A7]' : 'w-2 bg-gray-300 hover:bg-[#FD90A7]/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal isOpen={showRegModal} onClose={() => setShowRegModal(false)} event={selectedEvent} currentUser={currentUser} onRegister={handleRegistration} />

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-modal-pop { animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes modalPop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(253,144,167,0.4); } 50% { box-shadow: 0 0 0 10px rgba(253,144,167,0); } }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .animate-float-slow-delayed { animation: floatSlow 8s ease-in-out infinite 2s; }
        .animate-float-slower { animation: floatSlower 10s ease-in-out infinite; }
        @keyframes floatSlow { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-12px) translateX(6px); } }
        @keyframes floatSlower { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-8px) translateX(-4px); } }
        .ledger-row-item { transition: background-color 0.4s ease, transform 0.3s ease; }
        .ledger-row-item:hover { transform: translateX(4px); }
      `}</style>
    </section>
  );
};

export default EventsSection;