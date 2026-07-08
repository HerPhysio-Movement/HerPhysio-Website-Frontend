import KnowAboutUs from '../features/home/components/KnowAboutUs';
import AboutIntro from '../features/about/components/AboutIntro';
import MissionVision from '../features/about/components/MissionVision';
import Supporters from '../features/about/components/Supporters';
import WhatWeDoCountry from '../features/about/components/WhatWeDoCountry';
import WhatWeDoSpecial from '../features/about/components/WhatWeDoSpecial';
import KeyPillars from '../features/about/components/KeyPillars';
import TeamGrid from '../features/about/components/TeamGrid';
import ContributionCTA from '../features/home/components/ContributionCTA';
import EventsSection from '../features/events/components/EventsSection';

const AboutUs = () => {
  return (
    <main id="main-content">
      <AboutIntro />
      <KnowAboutUs />
      <MissionVision />
      <Supporters />
      <WhatWeDoCountry />
      <WhatWeDoSpecial />
      <KeyPillars />
      <TeamGrid />
      <ContributionCTA />
      <EventsSection />
    </main>
  );
};

export default AboutUs;