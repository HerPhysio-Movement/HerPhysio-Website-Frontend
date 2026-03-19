import { Link } from "react-router-dom";

const events = [
  { day: "13", month: "JUL", title: "A day with our wonderful women" },
  { day: "25", month: "JUL", title: "Seminar: Caring for women health challenge" },
];

const EventsPreview = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D2130] mb-8">
          Our Events
        </h2>
        <div className="space-y-4 mb-6">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4 text-lg">
              <span className="font-bold text-[#FD90A7]">
                {event.day} {event.month}
              </span>
              <span className="text-[#525560]">{event.title}</span>
            </div>
          ))}
        </div>
        <p className="text-[#525560] text-sm">
          Subscribe to get latest updates
        </p>
      </div>
    </section>
  );
};

export default EventsPreview;