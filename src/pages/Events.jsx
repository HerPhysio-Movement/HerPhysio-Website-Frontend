import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import EventHero from '../features/events/components/EventHero';
import EventAbout from '../features/events/components/EventAbout';
import EventsSection from '../features/events/components/EventsSection';
import { useUser } from '../context/UserContext';
import { eventAPI } from '../services/eventAPI';

const parseEventDateTime = (event) => {
  if (!event?.event_date) return null;

  const baseDate = new Date(event.event_date);
  if (Number.isNaN(baseDate.getTime())) return null;

  if (event.event_time) {
    const timeMatch = event.event_time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
    if (timeMatch) {
      let hour = Number(timeMatch[1]);
      const minute = Number(timeMatch[2] || 0);
      const meridian = timeMatch[3]?.toUpperCase();

      if (meridian === 'PM' && hour < 12) hour += 12;
      if (meridian === 'AM' && hour === 12) hour = 0;

      baseDate.setHours(hour, minute, 0, 0);
    }
  }

  return baseDate;
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-[20px] border border-gray-100 bg-white p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl bg-[#FD90A7]/5 p-4">
            <p className="text-sm font-semibold text-gray-900">{event.event_name}</p>
            <p className="mt-1 text-xs text-gray-500">{event.event_date} • {event.event_time || 'Time TBD'}</p>
            <p className="mt-1 text-xs text-gray-400">{event.venue || event.location || 'Location TBD'}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">First Name</label>
              <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Last Name</label>
              <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
          </div>

          <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FD90A7] px-4 py-2.5 font-semibold text-white transition hover:bg-[#F77997] disabled:opacity-60">
            {submitting ? 'Registering...' : 'Confirm Registration'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

const Events = () => {
  const { currentUser } = useUser();
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegModal, setShowRegModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const data = await eventAPI.getAllEvents();
        const events = Array.isArray(data?.events) ? data.events : Array.isArray(data) ? data : [];

        const upcomingEvents = events
          .map((event) => ({ ...event, parsedDate: parseEventDateTime(event) }))
          .filter((event) => event.parsedDate && event.parsedDate >= new Date())
          .sort((a, b) => a.parsedDate - b.parsedDate);

        setNextEvent(upcomingEvents[0] || events[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNextEvent();
  }, []);

  const handleReserveSpot = () => {
    if (!nextEvent) return;
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
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <main id="main-content">
      <EventHero event={nextEvent} loading={loading} onReserveSpot={handleReserveSpot} />
      <EventAbout event={nextEvent} loading={loading} onReserveSpot={handleReserveSpot} />
      <EventsSection />
      <RegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        event={nextEvent}
        currentUser={currentUser}
        onRegister={handleRegistration}
      />
      {error && <div className="px-4 pb-4 text-center text-sm text-red-500">{error}</div>}
    </main>
  );
};

export default Events;