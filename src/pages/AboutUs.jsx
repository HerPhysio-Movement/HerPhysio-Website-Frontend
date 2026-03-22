import KnowAboutUs from "../components/HomePage/KnowAboutUs";
import MissionVision from "../components/AboutUsPage/MissionVision";
import WhatWeDoCountry from "../components/AboutUsPage/WhatWeDoCountry";
import WhatWeDoSpecial from "../components/AboutUsPage/WhatWeDoSpecial";
import Awards from "../components/AboutUsPage/Awards";
import Journey from "../components/AboutUsPage/Journey";
import TeamGrid from "../components/AboutUsPage/TeamGrid";
import ContributionCTA from "../components/HomePage/ContributionCTA";
import EventsSection from "../components/shared/EventsSection";
import Partners from "../components/HomePage/Partners";

const AboutUs = () => {
  return (
    <main id="main-content">
      <KnowAboutUs />
      <MissionVision />
      <Partners />
      <WhatWeDoCountry />
      <WhatWeDoSpecial />
      <Awards />
      <Journey />
      <TeamGrid />
      <ContributionCTA />
      <EventsSection />
    </main>
  );
};

export default AboutUs;
