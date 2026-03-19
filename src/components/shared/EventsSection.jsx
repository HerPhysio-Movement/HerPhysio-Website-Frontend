import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { events } from "../../constants";

const EventsSection = () => {
  // Helper to safely extract day and month from a date string
  const getDayMonth = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { day: "TBD", month: "" };
    }
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
    };
  };

  return (
    <div id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
            Upcoming Gatherings
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
            Our Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join us in creating meaningful experiences and connections
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event) => {
            const { day, month } = getDayMonth(event.date);
            return (
              <div
                key={event.id}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Simple date badge */}
                <div className="absolute top-6 right-6 bg-pink-50 rounded-lg px-3 py-1.5 text-center border border-pink-100 shadow-sm">
                  <span className="block text-lg font-bold text-pink-600 leading-tight">{day}</span>
                  {month && <span className="block text-xs text-gray-500 uppercase tracking-wider">{month}</span>}
                </div>

                {/* Event Badge */}
                <div className="inline-block bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-pink-100">
                  {event.badge}
                </div>

                {/* Event Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 pr-20">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details with Icons */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-pink-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-pink-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Learn More Link */}
                <Link
                  to={event.link}
                  className="inline-flex items-center text-pink-600 font-medium group/link"
                >
                  <span className="border-b border-pink-200 pb-0.5 transition-all group-hover/link:border-pink-600">
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-16">
          <Link
            to="/events"
            className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;