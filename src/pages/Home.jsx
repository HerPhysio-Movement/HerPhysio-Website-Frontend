import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HomeHero from "../components/HomePage/HomeHero";
import KnowAboutUs from "../components/HomePage/KnowAboutUs";
import Partners from "../components/HomePage/Partners";
import WhatWeDo from "../components/HomePage/WhatWeDo";
import ProjectsDone from "../components/HomePage/ProjectsDone";
import ImpactStats from "../components/HomePage/ImpactStats";
import ContributionCTA from "../components/HomePage/ContributionCTA";
import EventsSection from "../components/shared/EventsSection";
import { events } from "../constants";

const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  const eventsRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  // Scroll to events section if there's a search term
  useEffect(() => {
    if (searchTerm && eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchTerm]);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main id="main-content">
      <HomeHero />
      <KnowAboutUs />
      <Partners />
      <WhatWeDo />
      <ProjectsDone />
      <ImpactStats />
      <ContributionCTA />
      <div ref={eventsRef}>
        <EventsSection
          events={filteredEvents}
          showHeading={true}
          highlight={searchTerm}
        />
      </div>
    </main>
  );
};

export default Home;
