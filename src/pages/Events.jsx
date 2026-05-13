import EventHero from '../features/events/components/EventHero';
import EventAbout from '../features/events/components/EventAbout';
import EventsSection from '../features/events/components/EventsSection';

const Events = () => {
  return (
    <main id="main-content">
      <EventHero />
      <EventAbout />
      <EventsSection />
    </main>
  );
};

export default Events;