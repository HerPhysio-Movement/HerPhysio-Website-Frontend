export const getWebinarId = (webinar) =>
  webinar?.id || webinar?._id || webinar?.webinar_id || webinar?.webinarId;

export const getWebinarTitle = (webinar) =>
  webinar?.webinar_title || webinar?.title || 'Untitled webinar';

export const getWebinarHost = (webinar) =>
  webinar?.webinar_host || webinar?.host || 'Expert Speaker';

export const getWebinarVideoUrl = (webinar) =>
  webinar?.youtube_url ||
  webinar?.youtubeUrl ||
  webinar?.video_url ||
  webinar?.videoUrl ||
  webinar?.embed_url ||
  webinar?.embedUrl ||
  webinar?.iframe_url ||
  webinar?.iframeUrl ||
  webinar?.link ||
  '';

export const getYouTubeEmbedUrl = (url = '') => {
  if (!url || typeof url !== 'string') return '';

  const trimmedUrl = url.trim();
  const iframeSrcMatch = trimmedUrl.match(/src=["']([^"']+)["']/i);
  const candidateUrl = iframeSrcMatch?.[1] || trimmedUrl;

  try {
    const parsedUrl = new URL(candidateUrl);
    const host = parsedUrl.hostname.replace(/^www\./, '');

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsedUrl.pathname.startsWith('/embed/')) return parsedUrl.toString();
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        const videoId = parsedUrl.pathname.split('/')[2];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
      }
      const videoId = parsedUrl.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    return candidateUrl;
  } catch {
    return '';
  }
};
