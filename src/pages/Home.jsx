import HomeHero from '../components/HomePage/HomeHero';
import KnowAboutUs from '../components/HomePage/KnowAboutUs';
import Supporters from '../components/HomePage/Supporters';
import WhatWeDo from '../components/HomePage/WhatWeDo';
import ProjectsDone from '../components/HomePage/ProjectsDone';
import ContributionCTA from '../components/HomePage/ContributionCTA';
import EventsSection from '../components/shared/EventsSection';

const Home = () => {
  return (
    <main id="main-content">
      <HomeHero />
      <KnowAboutUs />
      <Supporters />
      <WhatWeDo />
      <ProjectsDone />
      <ContributionCTA />
      <section className="bg-white px-4 sm:px-8 md:px-16 py-16">
        <EventsSection />
      </section>
    </main>
  );
};

export default Home;