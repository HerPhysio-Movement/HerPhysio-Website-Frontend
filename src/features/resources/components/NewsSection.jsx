import { Link } from 'react-router-dom';
import { 
  Sparkles, Calendar, Heart, ArrowRight 
} from 'lucide-react';

/**
 * Displays top news items with icons and metadata
 * Separated from main component for better organization
 */
export const NewsSection = () => {
  const iconMap = {
    Sparkles: Sparkles,
    Calendar: Calendar,
    Heart: Heart,
  };

  const news = [
    {
      id: 1,
      icon: 'Sparkles',
      type: 'Announcement',
      date: 'April 2025',
      title: 'New: Free Pelvic Health Webinar Series',
      description: 'Four‑part series with leading physiotherapists. First session "Understanding Your Pelvic Floor" – available on demand.',
      link: '/resources#webinars',
    },
    {
      id: 2,
      icon: 'Calendar',
      type: 'Event',
      date: 'May 15, 2025',
      title: 'Community Outreach in Lagos',
      description: 'Free physiotherapy screenings and education. Volunteers needed!',
      link: '/volunteer-signup',
    },
    {
      id: 3,
      icon: 'Heart',
      type: 'Impact',
      date: 'March 2025',
      title: 'Over 900 Women Reached This Quarter',
      description: 'Expanded reach across three new communities – thanks to our volunteers and partners.',
      link: '/impact',
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-16 pt-16 pb-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#FD90A7] to-[#C7365B] rounded-full" />
            <h2 className="text-xl font-bold text-[#1D2130]">Top News</h2>
          </div>
          <Link 
            to="/news" 
            className="text-sm text-[#FD90A7] hover:underline flex items-center gap-1 transition"
          >
            All news <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {news.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 pb-5 border-b border-gray-100 hover:border-b-[#FD90A7]/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FD90A7]/10 flex items-center justify-center group-hover:bg-[#FD90A7]/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-[#FD90A7]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FD90A7]">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-400">• {item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1D2130] group-hover:text-[#FD90A7] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#FD90A7] mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
