import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, Users, CalendarDays } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { eventAPI } from '../services/eventAPI';

const UserDashboard = () => {
  const { currentUser } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        // Fetch all upcoming events
        const allEvents = await eventAPI.getAllEvents();
        const eventsArray = allEvents.events || allEvents;
        const today = new Date().toISOString().slice(0, 10);
        const upcoming = eventsArray.filter(event => event.event_date >= today);
        setUpcomingEvents(upcoming.slice(0, 3));

        // Fetch user's registered events
        const userEvents = await eventAPI.getUserEvents(currentUser.email);
        setRegisteredEvents(userEvents.events || userEvents);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6">Loading your dashboard...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">My Dashboard</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2">
            {getGreeting()}, {currentUser?.f_name || currentUser?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your account.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Registered Events</p>
                <p className="text-2xl font-bold text-[#1D2130]">{registeredEvents.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#FD90A7]" />
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Events</p>
                <p className="text-2xl font-bold text-[#1D2130]">{upcomingEvents.length}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-[#FD90A7]" />
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Community Points</p>
                <p className="text-2xl font-bold text-[#1D2130]">120</p>
              </div>
              <Heart className="w-8 h-8 text-[#FD90A7]" />
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Volunteer Hours</p>
                <p className="text-2xl font-bold text-[#1D2130]">0</p>
              </div>
              <Users className="w-8 h-8 text-[#FD90A7]" />
            </div>
          </div>
        </div>

        {/* Registered Events */}
        {registeredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-xl">
            <p className="text-gray-500">You haven't registered for any events yet.</p>
            <Link to="/events" className="mt-4 inline-block px-6 py-2 bg-[#FD90A7] text-white rounded-full hover:bg-[#f77997]">
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#1D2130] mb-4">Your Registered Events</h2>
            <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
              {registeredEvents.map((event) => (
                <div key={event.id} className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-[#FD90A7]/10 text-[#FD90A7] px-3 py-1 rounded-full text-sm font-medium">
                      {event.badge || 'Event'}
                    </span>
                    <span className="text-xs text-gray-500">{event.event_date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1D2130] mb-2">{event.event_name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{event.description || event.caption}</p>
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-[#FD90A7]" />
                      {event.event_date}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-[#FD90A7]" />
                      {event.event_time}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-[#FD90A7]" />
                      {event.venue || 'TBD'}
                    </div>
                  </div>
                  <Link to={`/events/${event.id}`} className="text-[#FD90A7] font-medium text-sm hover:underline">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upcoming events teaser */}
        <h2 className="text-xl font-bold text-[#1D2130] mb-4">Upcoming Events You Might Like</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-5 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h3 className="font-bold text-lg text-[#1D2130] mb-2">{event.event_name}</h3>
              <div className="flex items-center mb-3 text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" /> {event.event_date}
              </div>
              <Link to={`/events/${event.id}`} className="text-[#FD90A7] text-sm font-medium hover:underline">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;