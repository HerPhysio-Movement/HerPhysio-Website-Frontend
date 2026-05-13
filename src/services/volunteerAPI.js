import { apiClient } from './apiClient';

export const volunteerAPI = {
  signup: async (data) => {
    // Ensure role is plural
    const payload = { ...data, role: 'volunteers' };
    return await apiClient.post('/volunteer/signup', payload);
  },
  getAllVolunteers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/volunteer/${query ? `?${query}` : ''}`);
  },
  getVolunteerById: (volunteerId) => apiClient.get(`/volunteer/${volunteerId}`),
  updateVolunteerStatus: (volunteerId, status) =>
    apiClient.put(`/volunteer/${volunteerId}/status`, { status }),
};