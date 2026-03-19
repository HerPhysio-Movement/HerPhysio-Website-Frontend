// src/components/EventPage/EventHero.jsx
import { MapPin, Calendar } from "lucide-react";

const EventHero = () => {
  return (
    <section className="bg-[#FFD8E1] py-12 px-4 sm:py-16 sm:px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-[#1D2130] font-bold mb-4 leading-tight text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px]">
          A Day with Our Wonderful Women: Wellness & Community Connection
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[#525560] text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FD90A7]" />
            <span>HerPhysio outreach event, Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FD90A7]" />
            <span>September 23, 2025 | 10:30 AM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;