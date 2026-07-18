import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Play, Sparkles, User, X } from 'lucide-react';
import { webinarAPI } from '../../../services/webinarAPI';
import { extractArrayFromResponse } from '../../../utils/apiHelpers';
import {
  getWebinarHost,
  getWebinarId,
  getWebinarTitle,
  getWebinarVideoUrl,
  getYouTubeEmbedUrl,
} from '../../../utils/videoHelpers';
import { BackgroundParticles } from './SectionComponents';

const formatWebinarDate = (webinar) => {
  const dateValue = webinar?.created_at || webinar?.published_at || webinar?.date;
  if (!dateValue) return 'On demand';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'On demand';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const WebinarsComponent = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await webinarAPI.getAllWebinars();
        setWebinars(extractArrayFromResponse(response, ['webinars', 'data', 'items']));
      } catch (error) {
        console.error('Failed to load webinars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const selectedVideoUrl = getWebinarVideoUrl(selectedWebinar);
  const selectedEmbedUrl = getYouTubeEmbedUrl(selectedVideoUrl);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAF9] flex items-center justify-center">
        <div className="animate-pulse text-[#FD90A7] text-lg">
          Loading webinars...
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#FFFAF9] pt-20 pb-16 overflow-hidden">
      <BackgroundParticles variant="webinars" />

      <div className="relative px-4 mx-auto mb-16 text-center max-w-7xl sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#FD90A7] mb-5">
          <Sparkles className="w-4 h-4" />
          Webinar Library
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          HPM Webinar Recordings
        </h1>
        <div className="w-20 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
        <p className="text-[#A19390] max-w-xl mx-auto text-lg">
          Listen to previous HPM webinars across a variety of women's health topics at your own pace.
        </p>
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {webinars.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border border-[#F3E4E2]">
            <Play className="w-16 h-16 text-[#F3E4E2] mx-auto mb-4" />
            <p className="text-[#A19390] text-lg">
              No webinars yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar, index) => {
              const title = getWebinarTitle(webinar);
              const host = getWebinarHost(webinar);

              return (
                <article
                  key={getWebinarId(webinar) || index}
                  className="group bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedWebinar(webinar)}
                >
                  <div className="relative aspect-video bg-linear-to-br from-[#FD90A7]/15 to-[#6020F0]/10 flex items-center justify-center overflow-hidden">
                    {webinar.image_url || webinar.thumbnail_url ? (
                      <img
                        src={webinar.image_url || webinar.thumbnail_url}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Play className="w-12 h-12 text-[#FD90A7]" />
                    )}
                    <div className="absolute inset-0 transition opacity-0 bg-black/10 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#FD90A7] text-xs font-semibold shadow-sm">
                      <Play className="w-3.5 h-3.5" />
                      Watch recording
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#FD90A7] transition-colors">
                      {title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#A19390] mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {host}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatWebinarDate(webinar)}
                      </span>
                    </div>
                    <p className="text-[#A19390] text-sm leading-relaxed line-clamp-3 flex-1">
                      {webinar.description || webinar.caption}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-[#FD90A7]">
                      Open webinar
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedWebinar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedWebinar(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#F3E4E2]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 sm:p-6 flex justify-between items-center border-b border-[#F3E4E2]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] pr-8">
                {getWebinarTitle(selectedWebinar)}
              </h2>
              <button
                onClick={() => setSelectedWebinar(null)}
                className="p-2 rounded-lg hover:bg-[#F3E4E2] transition text-[#A19390]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {selectedEmbedUrl ? (
                <div className="mb-5 overflow-hidden bg-gray-900 aspect-video rounded-xl">
                  <iframe
                    src={selectedEmbedUrl}
                    title={getWebinarTitle(selectedWebinar)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-[#F3E4E2] flex items-center justify-center mb-5">
                  <Play className="w-12 h-12 text-[#FD90A7]" />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#A19390] mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {getWebinarHost(selectedWebinar)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatWebinarDate(selectedWebinar)}
                </span>
              </div>

              <p className="text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                {selectedWebinar.description || selectedWebinar.caption}
              </p>

              {selectedVideoUrl && (
                <div className="mt-6 pt-4 border-t border-[#F3E4E2]">
                  <a
                    href={selectedVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FD90A7] hover:text-[#C7365B] font-semibold transition"
                  >
                    Watch on source <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default WebinarsComponent;
