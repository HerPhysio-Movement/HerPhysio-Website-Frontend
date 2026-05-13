// src/features/events/components/EventAbout.jsx
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, MapPin, Heart, ArrowRight } from 'lucide-react';

const EventAbout = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-[#FD90A7] border border-[#FD90A7]/30 rounded-full hover:bg-[#FD90A7]/10 transition-colors"
        >
          ← Back to Events
        </Link>

        {/* Two‑column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column – text content */}
          <div>
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D2130]">About This Event</h2>
            </div>

            <div className="space-y-6">
              <p className="text-[#525560] leading-relaxed">
                Join us for a heartwarming day of connection, learning, and empowerment.
                <span className="text-[#FD90A7] font-semibold"> A Day with Our Wonderful Women</span> is designed to celebrate the strength of women's physical health and build a community of support.
              </p>
              <p className="text-[#525560] leading-relaxed">
                This gathering brings together women from all walks of life to share experiences, learn from experts, and uplift one another. Whether you're seeking knowledge, connection, or simply a day of wellness, you'll find a warm welcome here.
              </p>
              <p className="text-[#525560] leading-relaxed">
                For our physiotherapy students and interns, this event offers invaluable hands‑on experience. You'll assist with sessions, observe expert practitioners, and gain confidence in a supportive environment.
              </p>
              <p className="text-[#1D2130] font-semibold">
                Come as you are. Leave feeling seen, heard, and empowered.
              </p>
            </div>

            {/* Feature quote */}
            <div className="mt-8 p-5 bg-[#FFF5F7] rounded-lg border-l-4 border-[#FD90A7]">
              <p className="text-[#1D2130] italic text-base sm:text-lg">
                "This event isn't just about learning – it's about finding your tribe and realizing you're not alone."
              </p>
              <p className="mt-2 text-sm text-gray-500">— Dr. Funmi Adebayo, Volunteer Physiotherapist</p>
            </div>
          </div>

          {/* Right column – image + stats */}
          <div className="space-y-6">
            {/* Image with caption */}
            <figure className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/Outreach.jpg"
                alt="Community members sharing a joyful moment during a previous outreach"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="mt-3 text-sm text-gray-400 text-center">
                Previous outreach event – women connecting and learning together.
              </figcaption>
            </figure>

            {/* Quick stats card (light background, no box) */}
            <div className="bg-[#FFF5F7] rounded-lg p-5 flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-[#FD90A7] mb-2" />
              <div className="text-3xl font-bold text-[#1D2130]">200+</div>
              <p className="text-sm text-gray-500">Women already registered</p>
              <Calendar className="w-5 h-5 text-[#FD90A7] mt-3 mb-1" />
              <p className="text-sm text-gray-500">September 23, 2025 · 10:30 AM</p>
              <MapPin className="w-5 h-5 text-[#FD90A7] mt-2 mb-1" />
              <p className="text-sm text-gray-500">HerPhysio Outreach, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FD90A7] text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-[#f77997] transition-all duration-300 group"
          >
            Reserve Your Spot
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;