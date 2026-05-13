import { apiClient } from './apiClient';

export const webinarAPI = {
  createWebinar: (data) => apiClient.post('/webinar/create', data),
  getAllWebinars: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/webinar/${query ? `?${query}` : ''}`);
  },
  getWebinarById: (webinarId) => apiClient.get(`/webinar/${webinarId}`),
  updateWebinar: (webinarId, data) => apiClient.put(`/webinar/${webinarId}`, data),
  deleteWebinar: (webinarId) => apiClient.delete(`/webinar/${webinarId}`),
};