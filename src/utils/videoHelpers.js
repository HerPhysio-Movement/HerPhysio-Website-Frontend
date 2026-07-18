export const getWebinarId = (webinar) =>
  webinar?.id || webinar?._id || webinar?.webinar_id || webinar?.webinarId;

export const getWebinarTitle = (webinar) =>
  webinar?.webinar_title || webinar?.title || webinar?.preview_title || 'Untitled webinar';

export const getWebinarHost = (webinar) =>
  webinar?.webinar_host || webinar?.host || webinar?.preview_site_name || 'Expert Speaker';

export const getWebinarDescription = (webinar) =>
  webinar?.description || webinar?.preview_description || webinar?.caption || '';

export const getWebinarThumbnail = (webinar) => {
  if (!webinar) return '';
  if (webinar.preview_image || webinar.image_url || webinar.thumbnail_url || webinar.thumbnail) {
    return webinar.preview_image || webinar.image_url || webinar.thumbnail_url || webinar.thumbnail;
  }
  if (typeof webinar.best_thumbnail === 'string') return webinar.best_thumbnail;
  if (webinar.best_thumbnail && typeof webinar.best_thumbnail === 'object') {
    return Object.values(webinar.best_thumbnail).find(Boolean) || '';
  }
  if (webinar.thumbnail_urls && typeof webinar.thumbnail_urls === 'object') {
    return Object.values(webinar.thumbnail_urls).find(Boolean) || '';
  }
  return '';
};

export const getWebinarVideoUrl = (webinar) =>
  webinar?.youtube_url ||
  webinar?.youtubeUrl ||
  webinar?.video_url ||
  webinar?.videoUrl ||
  webinar?.link ||
  '';

const isYouTubeUrl = (url = '') => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be';
  } catch {
    return false;
  }
};

export const getWebinarEmbedUrl = (webinar) => {
  const resolvedEmbedUrl =
    webinar?.embed_url ||
    webinar?.embedUrl ||
    webinar?.iframe_url ||
    webinar?.iframeUrl ||
    '';
  if (resolvedEmbedUrl) return resolvedEmbedUrl;

  const videoUrl = getWebinarVideoUrl(webinar);
  return isYouTubeUrl(videoUrl) ? getYouTubeEmbedUrl(videoUrl) : '';
};

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
