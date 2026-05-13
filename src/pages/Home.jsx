// src/pages/Home.jsx
import HomeHero from '../features/home/components/HomeHero';     // new
import PelvicHealthQuiz from '../features/home/components/PelvicHealthQuiz';     // new
import SymptomFinder from '../features/home/components/SymptomFinder';           // new
import KnowAboutUs from '../features/home/components/KnowAboutUs';
import Partners from '../features/home/components/Partners';
import WhatWeDo from '../features/home/components/WhatWeDo';
import MythBusters from '../features/home/components/MythBusters';
import ProjectsDone from '../features/home/components/ProjectsDone';
import Features from '../features/home/components/Features';
import HealthTips from '../features/home/components/HealthTips';
import ContributionCTA from '../features/home/components/ContributionCTA';
import EventsSection from '../features/events/components/EventsSection';
import Testimonials from '../features/home/components/Testimonials';
import FaqSection from '../features/home/components/FaqSection';

const Home = () => {
  return (
    <main id="main-content">
      <HomeHero />   
      <PelvicHealthQuiz />   
      <SymptomFinder />          
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