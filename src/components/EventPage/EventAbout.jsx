import { Link } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

const EventAbout = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-white text-[#1D2130]">
      <div className="max-w-6xl mx-auto">
        {/* Back link as a subtle button */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-[#FD90A7] border border-[#FD90A7]/30 rounded-full hover:bg-[#FD90A7]/10 transition-colors"
        >
          ← Back to Events
        </Link>

        {/* About header with decorative line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-0.5 bg-[#FD90A7]" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D2130]">
            About This Event
          </h2>
        </div>

        {/* Introduction with highlighted stat */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-3 space-y-6">
            <p className="text-lg sm:text-xl leading-relaxed text-[#525560]">
              Join us for a heartwarming day of connection, learning, and empowerment. 
              <span className="text-[#FD90A7] font-semibold"> A Day with Our Wonderful Women</span> is designed to celebrate the strength of women's physical health and build a community of support.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#525560]">
              This gathering brings together women from all walks of life to share experiences, learn from experts, and uplift one another. Whether you're seeking knowledge, connection, or simply a day of wellness, you'll find a warm welcome here.
            </p>
          </div>
          <div className="md:col-span-2 bg-[#FFD8E1] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <Users className="w-10 h-10 text-[#FD90A7] mb-2" />
            <div className="text-3xl font-bold text-[#1D2130]">200+</div>
            <p className="text-sm text-[#525560]">Women already registered</p>
            <Calendar className="w-5 h-5 text-[#FD90A7] mt-4 mb-1" />
            <p className="text-sm text-[#525560]">September 23, 2025 · 10:30 AM</p>
          </div>
        </div>

        {/* Feature quote */}
        <div className="mb-12 p-8 bg-gray-50 rounded-2xl border-l-8 border-[#FD90A7]">
          <p className="text-xl sm:text-2xl italic text-[#1D2130]">
            "This event isn't just about learning – it's about finding your tribe and realizing you're not alone."
          </p>
          <p className="mt-2 text-[#525560]">— Dr. Funmi Adebayo, Volunteer Physiotherapist</p>
        </div>

        {/* Image with caption */}
        <figure className="mb-12">
          <img
            src="/Outreach.jpg"
            alt="Community members sharing a joyful moment during a previous outreach"
            className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]"
          />
          <figcaption className="mt-3 text-sm text-[#525560] text-center">
            Previous outreach event – women connecting and learning together.
          </figcaption>
        </figure>

        {/* Detailed description */}
        <div className="prose prose-lg max-w-none text-[#525560] space-y-6">
          <p>
            The day will feature engaging discussions led by expert physiotherapists, interactive wellness sessions, and plenty of time for networking. Topics include pelvic health, postnatal recovery, and strategies for managing chronic pain – all delivered in our signature warm, relatable style.
          </p>
          <p>
            For our physiotherapy students and interns, this event offers invaluable hands‑on experience. You'll assist with sessions, observe expert practitioners, and gain confidence in a supportive environment. It's a chance to see firsthand how we're shaping the next generation of women's health professionals.
          </p>
          <p className="font-semibold text-[#1D2130]">
            Come as you are. Leave feeling seen, heard, and empowered.
          </p>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-[#FD90A7] text-white rounded-full font-semibold hover:bg-[#f77997] transition shadow-lg"
          >
            Reserve Your Spot
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;