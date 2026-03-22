import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { events as defaultEvents } from "../../constants";
import { useUser } from "../../context/UserContext";

// Helper function to highlight matching text
const highlightText = (text, query) => {
  if (!query || !text) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[#FD90A7]/20 text-[#1D2130] px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

const EventsSection = ({
  showHeading = true,
  events = defaultEvents,
  highlight = "",
}) => {
  const { currentUser } = useUser();

  const getDayMonth = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: "TBD", month: "" };
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
    };
  };

  const registerEvent = (eventId) => {
    if (!currentUser) {
      alert("Please sign in to register.");
      return;
    }
    const key = `registrations_${currentUser.email}`;
    const existing = localStorage.getItem(key);
    const registered = existing ? JSON.parse(existing) : [];
    if (!registered.includes(eventId)) {
      localStorage.setItem(key, JSON.stringify([...registered, eventId]));
      alert("Registered successfully!");
    } else {
      alert("You are already registered for this event.");
    }
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
              Come learn something new.
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Events
            </h2>
            <p className="text-gray-600 text-lg">
              Seminar | Panel Session | Skills Training | Outreach
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((event) => {
            const { day, month } = getDayMonth(event.date);
            const highlightedTitle = highlightText(event.title, highlight);
            const highlightedDescription = highlightText(
              event.description,
              highlight,
            );
            return (
              <div
                key={event.id}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-1.5 rounded-full text-sm font-medium">
                    {event.badge}
                  </span>
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center border border-gray-100 shadow-sm">
                    <span className="block text-2xl font-bold text-[#FD90A7] leading-none">
                      {day}
                    </span>
                    {month && (
                      <span className="block text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {month}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {highlightedTitle}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {highlightedDescription}
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-[#FD90A7]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-[#FD90A7]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-[#FD90A7]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-between mt-2">
                  <button
                    onClick={() => registerEvent(event.id)}
                    className="px-4 py-2 bg-[#FD90A7] text-white rounded-full text-sm font-semibold hover:bg-[#f77997] transition"
                  >
                    Register
                  </button>
                  <Link
                    to={event.link}
                    className="inline-flex items-center text-[#FD90A7] font-medium group/link"
                  >
                    <span className="border-b border-[#FD90A7]/20 pb-0.5 transition-all group-hover/link:border-[#FD90A7]">
                      Learn more
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-16">
          <Link
            to="/events"
            className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All Events <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
