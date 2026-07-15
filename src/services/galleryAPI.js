import { apiClient } from './apiClient';

const normalizeGalleryImage = (item, index = 0) => {
  if (!item || typeof item !== 'object') return null;

  return {
    id: item.id || item._id || item.image_id || item.image?.id || `${item.image_url || 'gallery'}-${index}`,
    title: item.title || '',
    caption: item.caption || item.category || 'Event',
    description: item.description || '',
    image_url:
      item.image_url ||
      item.file_url ||
      item.image_file_url ||
      item.image?.image_url ||
      item.image?.file_url ||
      item.src ||
      item.url ||
      '',
    created_at: item.created_at || item.createdAt || null,
    updated_at: item.updated_at || item.updatedAt || null,
  };
};

const normalizeGalleryList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.images)) return payload.images;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.results)) return payload.results;
    if (payload.image) return [payload.image];
  }
  return [];
};

export const galleryAPI = {
  getGallery: async () => {
    const response = await apiClient.get('/gallery/');
    return normalizeGalleryList(response)
      .map((item, index) => normalizeGalleryImage(item, index))
      .filter(Boolean);
  },

  createImage: async (data) => {
    const payload = new FormData();
    payload.append('image_file', data.image_file);
    payload.append('title', data.title || '');
    payload.append('caption', data.caption || '');
    payload.append('description', data.description || '');

    const response = await apiClient.post('/gallery/', payload);
    const image = response?.image || response?.data || response;
    return normalizeGalleryImage(image);
  },

  updateImage: async (imageId, data) => {
    const hasImageFile = typeof File !== 'undefined' && data.image_file instanceof File;
    const payload = hasImageFile ? new FormData() : {
      title: data.title || '',
      caption: data.caption || '',
      description: data.description || '',
    };

    if (hasImageFile) {
      payload.append('image_file', data.image_file);
      payload.append('title', data.title || '');
      payload.append('caption', data.caption || '');
      payload.append('description', data.description || '');
    }

    const response = await apiClient.put(`/gallery/${imageId}`, payload);
    const image = response?.image || response?.data || response;
    return normalizeGalleryImage(image);
  },

  deleteImage: (imageId) => apiClient.delete(`/gallery/${imageId}`),
};
