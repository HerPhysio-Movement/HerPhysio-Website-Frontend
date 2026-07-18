// src/features/events/components/EventAbout.jsx
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

const EventAbout = ({ event, loading, onReserveSpot }) => {
  const eventTitle = event?.event_name || 'A Day with Our Wonderful Women';
  const eventDescription = event?.description || 'Join us for a heartwarming day of connection, learning, and empowerment. This gathering brings together women from all walks of life to share experiences, learn from experts, and uplift one another.';
  const eventLocation = event?.venue || event?.location || 'HerPhysio Outreach, Lagos, Nigeria';
  const eventDate = event?.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Coming soon';
  const eventTime = event?.event_time || 'Time TBD';
  const eventImage = event?.thumbnail_url || event?.thumbnail_file || event?.image_url || event?.image || '/Outreach.jpg';
  const eventLink = event?.link || event?.event_link || null;
  const isPastEvent = event?.event_date ? new Date(event.event_date) < new Date(new Date().setHours(0, 0, 0, 0)) : false;

  // Safe time formatter
  const formatTime = (time) => {
    if (!time || time === 'Time TBD') return 'Time TBD';
  
    // Create a date object with today's date and the provided time
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <section className="px-4 py-16 bg-white sm:px-8 md:px-16 lg:px-20 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-[#FD90A7] border border-[#FD90A7]/30 rounded-full hover:bg-[#FD90A7]/10 transition-colors"
        >
          ← Back to Events
        </Link>

        {/* Two‑column layout */}
        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Left column – text content */}
          <div>
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D2130]">About the Speaker</h2>
            </div>

              <div className="space-y-6">
                <p className="text-[#525560] leading-relaxed">
                  {loading ? 'Loading the next event details...' : eventDescription}
                </p>
                {!isPastEvent && (
                  <>
                    <p className="text-[#525560] leading-relaxed">
                      Whether you are seeking knowledge, connection, or a day of wellness, this gathering offers a welcoming space to learn, reflect, and grow with a community that cares.
                    </p>
                    <p className="text-[#525560] leading-relaxed">
                      For our physiotherapy students and interns, this event offers invaluable hands‑on experience and the chance to support meaningful outreach work.
                    </p>
                    <p className="text-[#1D2130] font-semibold">
                      Come as you are. Leave feeling seen, heard, and empowered.
                    </p> 
                  </>
                )}
              </div>

            {/* {!isPastEvent && (
              <div className="mt-8 p-5 bg-[#FFF5F7] rounded-lg border-l-4 border-[#FD90A7]">
                <p className="text-[#1D2130] italic text-base sm:text-lg">
                  "This event isn't just about learning – it's about finding your tribe and realizing you're not alone."
                </p>
                <p className="mt-2 text-sm text-gray-500">— Dr. Funmi Adebayo, Volunteer Physiotherapist</p>
              </div>
            )} */}
          </div>

          {/* Right column – image + stats */}
          <div className="space-y-6">
            {/* Image with caption */}
            <figure className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={eventImage}
                alt={eventTitle}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="mt-3 text-sm text-center text-gray-400">
                {eventTitle}
              </figcaption>
            </figure>

            {/* Quick stats card (light background, no box) */}
            <div className="bg-[#FFF5F7] rounded-lg p-5 flex flex-col items-center text-center">
              {/* <Users className="w-8 h-8 text-[#FD90A7] mb-2" />
              <div className="text-3xl font-bold text-[#1D2130]">{registeredCount}</div>
              <p className="text-sm text-gray-500">Women already registered</p> */}
              <Calendar className="w-5 h-5 text-[#FD90A7] mt-3 mb-1" />
              <p className="text-sm text-gray-500">{eventDate} · {formatTime(eventTime)}</p>
              <MapPin className="w-5 h-5 text-[#FD90A7] mt-2 mb-1" />
              <p className="text-sm text-gray-500">{eventLocation}</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="flex flex-col items-center justify-center gap-3 mt-12 text-center sm:flex-row">
          <button
            type="button"
            onClick={onReserveSpot}
            disabled={isPastEvent}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-md transition-all duration-300 group ${isPastEvent ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#FD90A7] text-white hover:shadow-lg hover:bg-[#f77997]'}`}
          >
            {isPastEvent ? 'Registration Closed' : 'Reserve Your Spot'}
            {!isPastEvent && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
          </button>
          {eventLink && !isPastEvent && (
            <a
              href={eventLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#FD90A7]/30 rounded-full font-semibold text-[#FD90A7] bg-white hover:bg-[#FD90A7]/10 transition-all duration-300"
            >
              Event Link <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventAbout;