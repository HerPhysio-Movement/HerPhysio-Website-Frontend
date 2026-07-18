// src/features/events/components/EventHero.jsx
import { MapPin, Calendar, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import {  formatEventTime } from '../utils/dateHelper';

const EventHero = ({ event, loading, onReserveSpot }) => {
  const eventTitle = event?.event_name || 'A Day with Our Wonderful Women';
  const eventHost = event?.event_host;
  const eventSubtitle = event?.description || 'Wellness & Community Connection';
  const eventLocation = event?.venue || event?.location || 'HerPhysio Outreach, Lagos, Nigeria';
  const eventDate = event?.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Coming soon';
  const eventTime = event?.event_time || 'Time TBD';
  const eventLink = event?.link || event?.event_link || null;
  const isPastEvent = event?.event_date ? new Date(event.event_date) < new Date(new Date().setHours(0, 0, 0, 0)) : false;

  // Split the event name into two parts
  const splitTitle = (title) => {
    const words = title.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    
    // Handle case where there's only one word
    if (words.length === 1) {
      return { firstHalf: title, secondHalf: '' };
    }
    
    return {
      firstHalf: words.slice(0, midPoint).join(' '),
      secondHalf: words.slice(midPoint).join(' ')
    };
  };
  
  const { firstHalf, secondHalf } = splitTitle(eventTitle);
  
  const formattedTime = formatEventTime(eventTime);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFD8E1] pt-20 pb-16 md:pt-28 md:pb-24">
      <video
        className="absolute inset-0 object-cover w-full h-full opacity-40"
        src="/IMG_1164.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-[#FFF5F7]/75 to-[#FFD8E1]/80" />

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FD90A7]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FD90A7]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-[#C7365B]/5 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] border border-white/30 shadow-sm">
            <Heart className="w-4 h-4" />
            <span>{isPastEvent ? 'Past Event' : 'Upcoming Event'}</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1D2130] leading-tight mb-6">
          {firstHalf}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
            {secondHalf}
          </span>
          <br />
          <span className="text-xl sm:text-2xl md:text-3xl block mt-2 text-[#525560]">
            Host: {eventHost}
          </span>
        </h1>

        {/* Event details with icons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[#525560] text-base sm:text-lg mb-8">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-white/60 backdrop-blur-sm border-white/50">
            <MapPin className="w-5 h-5 text-[#FD90A7]" />
            <span>{eventLocation}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-white/60 backdrop-blur-sm border-white/50">
            <Calendar className="w-5 h-5 text-[#FD90A7]" />
            <span>{eventDate} • {formatTime(eventTime)}</span>
          </div>
        </div>

        {/* CTA button */}
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <button
            type="button"
            onClick={onReserveSpot}
            disabled={isPastEvent}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 group ${isPastEvent ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#FD90A7] text-white hover:shadow-xl hover:bg-[#f77997]'}`}
          >
            {isPastEvent ? 'Registration Closed' : 'Reserve Your Spot'}
            {!isPastEvent && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
          </button>
          {eventLink && !isPastEvent && (
            <a
              href={eventLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#FD90A7]/30 rounded-full font-semibold text-lg text-[#FD90A7] bg-white/70 backdrop-blur-sm hover:bg-[#FD90A7]/10 transition-all duration-300"
            >
              Event Link <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-12 text-white/20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default EventHero;