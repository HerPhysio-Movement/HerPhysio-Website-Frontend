import { apiClient } from './apiClient';

const pickThumbnail = (item = {}) => {
  if (typeof item.best_thumbnail === 'string') return item.best_thumbnail;
  if (item.best_thumbnail && typeof item.best_thumbnail === 'object') {
    return Object.values(item.best_thumbnail).find(Boolean) || '';
  }
  if (item.thumbnail_urls && typeof item.thumbnail_urls === 'object') {
    return Object.values(item.thumbnail_urls).find(Boolean) || '';
  }
  return '';
};

const normalizeWebinar = (item) => {
  if (!item || typeof item !== 'object') return null;

  return {
    ...item,
    id: item.id || item._id || item.webinar_id || item.webinarId,
    webinar_title: item.webinar_title || item.title || item.preview_title || 'Untitled webinar',
    webinar_host: item.webinar_host || item.host || item.preview_site_name || 'Expert Speaker',
    caption: item.caption || item.preview_title || '',
    description: item.description || item.preview_description || item.caption || '',
    youtube_url: item.youtube_url || item.youtubeUrl || item.video_url || item.videoUrl || item.link || '',
    embed_url: item.embed_url || item.embedUrl || item.iframe_url || item.iframeUrl || '',
    preview_image:
      item.preview_image ||
      item.image_url ||
      item.thumbnail_url ||
      item.thumbnail ||
      pickThumbnail(item),
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
};

const normalizeWebinarList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.webinars)) return payload.webinars;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.results)) return payload.results;
    if (payload.webinar) return [payload.webinar];
  }
  return [];
};

const cleanWebinarPayload = (data = {}) => {
  const tags = Array.isArray(data.tags)
    ? data.tags
    : String(data.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

  return {
    webinar_title: data.webinar_title || data.title || '',
    webinar_host: data.webinar_host || data.host || '',
    caption: data.caption || '',
    description: data.description || '',
    youtube_url: data.youtube_url || data.youtubeUrl || data.link || '',
    tags,
  };
};

export const webinarAPI = {
  createWebinar: async (data) => {
    const response = await apiClient.post('/webinar/create', cleanWebinarPayload(data));
    return normalizeWebinar(response?.webinar || response?.data || response);
  },
  getAllWebinars: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await apiClient.get(`/webinar/${query ? `?${query}` : ''}`);
    return normalizeWebinarList(response).map(normalizeWebinar).filter(Boolean);
  },
  getWebinarById: async (webinarId) => {
    const response = await apiClient.get(`/webinar/${webinarId}`);
    return normalizeWebinar(response?.webinar || response?.data || response);
  },
  updateWebinar: async (webinarId, data) => {
    const response = await apiClient.put(`/webinar/${webinarId}`, cleanWebinarPayload(data));
    return normalizeWebinar(response?.webinar || response?.data || response);
  },
  deleteWebinar: (webinarId) => apiClient.delete(`/webinar/${webinarId}`),
};
