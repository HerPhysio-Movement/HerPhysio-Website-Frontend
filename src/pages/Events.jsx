import EventHero from "../components/EventPage/EventHero";
import EventAbout from "../components/EventPage/EventAbout";
import EventsSection from "../components/shared/EventsSection";

const Events = () => {
  return (
    <main id="main-content">
      <EventHero />
      <EventAbout />
      <EventsSection/>
    </main>
  );
};

export default Events;