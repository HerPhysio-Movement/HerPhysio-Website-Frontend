import { apiClient } from './apiClient';

export const galleryAPI = {
  // If no dedicated gallery endpoint, we can use project images or a placeholder
  getGallery: async () => {
    // Return mock data or fetch from a future endpoint
    return [];
  },
  uploadImage: (formData) => {
    console.warn('Gallery upload not implemented');
    return Promise.resolve({ id: Date.now(), ...formData });
  },
  deleteImage: (id) => {
    console.warn('Gallery delete not implemented');
    return Promise.resolve();
  },
};