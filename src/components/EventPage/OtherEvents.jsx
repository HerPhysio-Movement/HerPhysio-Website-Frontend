import { Link } from "react-router-dom";

const otherEvents = [
  {
    day: "23",
    month: "JUL",
    title: "Say no to plastic usage and save the planet",
    link: "/",
  },
  {
    day: "30",
    month: "JUL",
    title: "Monthly widows visits",
    link: "/",
  },
];

const OtherEvents = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D2130] mb-10">
          Other events
        </h2>
        <div className="space-y-6">
          {otherEvents.map((event, index) => (
            <Link
              key={index}
              to={event.link}
              className="flex items-start gap-4 sm:gap-6 group hover:bg-gray-50 p-4 -mx-4 rounded-lg transition"
            >
              <div className="text-right min-w-[70px]">
                <span className="block text-xl sm:text-2xl font-bold text-[#FD90A7]">
                  {event.day}
                </span>
                <span className="block text-xs sm:text-sm text-[#525560] uppercase tracking-wider">
                  {event.month}
                </span>
              </div>
              <p className="flex-1 text-[#1D2130] text-base sm:text-lg font-medium group-hover:text-[#FD90A7] transition">
                {event.title}
              </p>
              <span className="text-[#FD90A7] opacity-0 group-hover:opacity-100 transition">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherEvents;