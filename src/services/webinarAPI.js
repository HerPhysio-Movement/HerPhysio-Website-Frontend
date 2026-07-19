import { apiClient } from './apiClient';

const pickThumbnail = (item = {}) => {
  if (typeof item.preview_image === 'string' && item.preview_image) return item.preview_image;
  if (typeof item.image_url === 'string' && item.image_url) return item.image_url;
  if (typeof item.thumbnail === 'string' && item.thumbnail) return item.thumbnail;
  if (typeof item.best_thumbnail === 'string') return item.best_thumbnail;
  if (item.best_thumbnail && typeof item.best_thumbnail === 'object') {
    return Object.values(item.best_thumbnail).find(Boolean) || '';
  }
  if (item.thumbnail_urls && typeof item.thumbnail_urls === 'object') {
    return Object.values(item.thumbnail_urls).find(Boolean) || '';
  }
  if (typeof item.thumbnail_url === 'string' && item.thumbnail_url) {
    return item.thumbnail_url;
  }
  return '';
};

const normalizeWebinar = (item) => {
  if (!item || typeof item !== 'object') return null;

  const link = item.link || item.youtube_url || item.youtubeUrl || item.video_url || item.videoUrl || '';
  const thumbnail = pickThumbnail(item);

  return {
    ...item,
    id: item.id || item._id || item.webinar_id || item.webinarId,
    webinar_title: item.webinar_title || item.title || item.preview_title || 'Untitled webinar',
    webinar_host: item.webinar_host || item.host || item.preview_site_name || 'Expert Speaker',
    caption: item.caption || item.preview_title || '',
    description: item.description || item.preview_description || item.caption || '',
    link,
    youtube_url: item.youtube_url || item.youtubeUrl || link,
    video_url: item.video_url || item.videoUrl || link,
    youtube_id: item.youtube_id || '',
    vimeo_id: item.vimeo_id || '',
    provider: item.provider || '',
    embeddable: item.embeddable || false,
    embed_url: item.embed_url || item.embedUrl || item.iframe_url || item.iframeUrl || '',
    preview_title: item.preview_title || '',
    preview_description: item.preview_description || '',
    preview_image: thumbnail,
    image_url: item.image_url || thumbnail,
    preview_site_name: item.preview_site_name || '',
    thumbnail_url: item.thumbnail_url || thumbnail,
    thumbnail_file: item.thumbnail_file || null,
    thumbnail_urls: item.thumbnail_urls || {},
    best_thumbnail: item.best_thumbnail || thumbnail || {},
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

  const link = data.link || data.youtube_url || data.youtubeUrl || data.video_url || data.videoUrl || '';

  const payload = {
    webinar_title: data.webinar_title || data.title || '',
    webinar_host: data.webinar_host || data.host || '',
    caption: data.caption || data.preview_title || '',
    description: data.description || data.preview_description || data.caption || '',
    link,
    youtube_url: data.youtube_url || data.youtubeUrl || link,
    video_url: data.video_url || data.videoUrl || link,
    tags,
  };

  const thumbnailUrl = data.thumbnail_url || data.preview_image || data.image_url || data.thumbnail || '';
  if (thumbnailUrl) payload.thumbnail_url = thumbnailUrl;
  
  if (
    typeof File !== 'undefined' &&
    typeof FormData !== 'undefined' &&
    data.thumbnail_file instanceof File
  ) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append('tags', item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    formData.append('thumbnail_file', data.thumbnail_file);
    return formData;
  }

  return payload;
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
