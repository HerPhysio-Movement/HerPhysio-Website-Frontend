// src/components/EventPage/EventHero.jsx
import { MapPin, Calendar } from "lucide-react";

const EventHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFD8E1] to-[#ffe4ec] py-12 px-4 sm:py-16 sm:px-8 md:px-16 overflow-hidden">
      {/* Subtle decorative pattern (optional) */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="event-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#FD90A7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#event-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center lg:text-left">
        {/* Event badge */}
        <span className="inline-block bg-white/30 backdrop-blur-sm text-[#1D2130] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-6 border border-white/50 shadow-sm">
          Upcoming Event
        </span>

        {/* Event title */}
        <h1 className="text-[#1D2130] font-bold mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          A Day with Our Wonderful Women:<br />
          <span className="text-[#FD90A7]">Wellness & Community Connection</span>
        </h1>

        {/* Event details with icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[#525560] text-base sm:text-lg">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <MapPin className="w-5 h-5 text-[#FD90A7]" />
            <span>HerPhysio outreach, Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Calendar className="w-5 h-5 text-[#FD90A7]" />
            <span>September 23, 2025 | 10:30 AM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;