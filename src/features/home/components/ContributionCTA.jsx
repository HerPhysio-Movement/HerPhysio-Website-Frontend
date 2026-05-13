// src/features/home/components/ContributionCTA.jsx
import { Link } from 'react-router-dom';
import { Heart, HandHeart, ArrowRight, Sparkles } from 'lucide-react';

const ContributionCTA = () => {
  return (
    <section className="relative bg-white py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFF5F7] to-white" />
      
      {/* Minimalist abstract shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FD90A7]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C7365B]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side – text and buttons */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D2130] leading-tight mb-6">
              Be the change for women in your community.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#FD90A7] text-white rounded-md font-semibold shadow-md hover:shadow-lg hover:bg-[#f77997] transition-all duration-300"
              >
                <HandHeart className="w-5 h-5" />
                Donate
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/volunteer-signup"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-gray-300 text-[#1D2130] rounded-md font-semibold hover:border-[#FD90A7] hover:text-[#FD90A7] transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Join as a Volunteer
              </Link>
            </div>
          </div>

          {/* Right side – image container (larger on tablet, no back glow) */}
          <div className="relative flex justify-center">
            <div className="relative rounded-md overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] w-full md:w-3/4 lg:w-full max-w-lg md:max-w-xl lg:max-w-none">
              <img
                src="/BG.png"
                alt="Women gathering in community"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '1104 / 884' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Floating testimonial micro‑card */}
            <div className="absolute -bottom-5 -left-5 bg-white/90 backdrop-blur-sm rounded-md p-3 shadow-md border border-gray-100 max-w-[200px] hidden sm:block">
              <p className="text-xs text-gray-600 italic">“Their work transformed our community”</p>
              <p className="text-xs font-semibold text-[#1D2130] mt-1">— Amina, Lagos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionCTA;