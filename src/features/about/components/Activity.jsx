import EventsSection from '../../../features/events/components/EventsSection';

const Activity = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96 flex items-center justify-center mb-16" style={{ backgroundImage: "url('/BG.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="text-center text-white max-w-xl px-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 leading-[120%]">Join Us in Shaping the Future of Women's Health & Physiotherapy</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#FD90A7] text-black text-sm sm:text-base font-bold py-2 px-6 rounded-md">Join as a Volunteer</button>
            <button className="border border-white text-black text-sm sm:text-base bg-white font-bold py-2 px-6 rounded-md">Donate</button>
          </div>
        </div>
      </div>
      <EventsSection />
    </section>
  );
};

export default Activity;