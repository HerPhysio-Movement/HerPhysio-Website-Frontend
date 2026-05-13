// src/pages/Home.jsx
import HomeHero from '../features/home/components/HomeHero';
import KnowAboutUs from '../features/home/components/KnowAboutUs';
import Partners from '../features/home/components/Partners';
import WhatWeDo from '../features/home/components/WhatWeDo';
import ProjectsDone from '../features/home/components/ProjectsDone';
import ContributionCTA from '../features/home/components/ContributionCTA';
import EventsSection from '../features/events/components/EventsSection';
import FaqSection from '../features/home/components/FaqSection';
import Features from '../features/home/components/Features';
import Testimonials from '../features/home/components/Testimonials';
import HealthTips from '../features/home/components/HealthTips';
import MythBusters from '../features/home/components/MythBusters';

const Home = () => {
  return (
    <main id="main-content">
      <HomeHero />
      <KnowAboutUs />
      <Partners />
      <WhatWeDo />
      <MythBusters />
      <ProjectsDone />
      <Features />
      <HealthTips />
      <ContributionCTA />
      <EventsSection />
      <Testimonials />
      <FaqSection />
    </main>
  );
};

export default Home;