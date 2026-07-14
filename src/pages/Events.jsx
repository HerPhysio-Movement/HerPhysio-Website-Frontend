import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import EventHero from '../features/events/components/EventHero';
import EventAbout from '../features/events/components/EventAbout';
import EventsSection from '../features/events/components/EventsSection';
import { useUser } from '../context/UserContext';
import { eventAPI } from '../services/eventAPI';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/45 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-[20px] border border-gray-100 bg-white p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
          <button onClick={onClose} className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-600">
            <X className="w-5 h-5" />
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
              <label className="block mb-1 text-xs font-medium text-gray-700">First Name</label>
              <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Last Name</label>
              <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium text-gray-700">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FD90A7]/50" required />
          </div>

          <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FD90A7] px-4 py-2.5 font-semibold text-white transition hover:bg-[#F77997] disabled:opacity-60">
            {submitting ? 'Registering...' : 'Confirm Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

const Events = () => {
  const { currentUser } = useUser();
  const { eventId } = useParams();
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegModal, setShowRegModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setNextEvent(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventAPI.getEventById(eventId);
        const event = response?.event || response?.data || response;
        setNextEvent(event || null);
      } catch (err) {
        setError(err.message);
        setNextEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

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

  if (!eventId) {
    return (
      <main id="main-content">
        <EventsSection />
      </main>
    );
  }

  if (!loading && !nextEvent) {
    return (
      <main id="main-content">
        <div className="px-4 pt-24 pb-8 text-center bg-white">
          <p className="text-sm font-semibold text-[#FD90A7]">Event details unavailable</p>
          <h1 className="mt-2 text-3xl font-black text-gray-900 md:text-5xl">Explore our events</h1>
          <p className="max-w-2xl mx-auto mt-3 text-gray-500">
            We could not find that event, but you can browse upcoming and past events below.
          </p>
        </div>
        <EventsSection />
        {error && <div className="px-4 pb-4 text-sm text-center text-red-500">{error}</div>}
      </main>
    );
  }

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
      {error && <div className="px-4 pb-4 text-sm text-center text-red-500">{error}</div>}
    </main>
  );
};

export default Events;
