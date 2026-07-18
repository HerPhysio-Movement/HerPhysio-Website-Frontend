// src/features/resources/components/ResourcesComponent.jsx
import { useEffect, useState } from 'react';
import { webinarAPI } from '../../../services/webinarAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import ContributionCTA from '../../home/components/ContributionCTA';
import EventsSection from '../../events/components/EventsSection';
import ResourcesIntro from './ResourcesIntro';
import { NewsSection } from './NewsSection';
import { NotesSection, CoursesSection, SocialSection } from './ResourceSections';
import { WebinarsSection, ArticlesSection, GallerySection } from './ContentSections';

const ResourcesComponent = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const webinarsData = await webinarAPI.getAllWebinars();
      
      // Handle inconsistent API response structures
      const webinarsArray = extractArrayFromResponse(webinarsData, ['webinars', 'data', 'items']);
      
      setWebinars(webinarsArray);
    } catch (error) {
      console.error('Failed to load resources:', error);
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Refetch when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') fetchData();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (loading) {
    return <div className="pt-20 text-center text-gray-500">Loading resources...</div>;
  }

  return (
    <main id="resources-content" className="bg-white">
      <ResourcesIntro />

      {/* Top News */}
      {/* <NewsSection /> */}

      {/* Care That Moves With You */}
      <NotesSection />

      {/* Online Courses */}
      <CoursesSection />

      {/* Webinar Recordings */}
      <WebinarsSection webinars={webinars} />

      {/* Articles & Insights */}
      <ArticlesSection />

      {/* Gallery Preview */}
      <GallerySection />

      {/* Connect With Us (Social Media) */}
      <SocialSection />

      {/* Call to Action & Events */}
      <ContributionCTA />
      <EventsSection />

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
      `}</style>
    </main>
  );
};

export default ResourcesComponent;
