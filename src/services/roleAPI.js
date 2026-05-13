import { apiClient } from './apiClient';

export const roleAPI = {
  getAllAdmins: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/roles/admins${query ? `?${query}` : ''}`);
  },
  
  getAllUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/roles/users${query ? `?${query}` : ''}`);
  },
  
  promoteUserToAdmin: async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    try {
      // Ensure user_id is passed as a string in the path
      const response = await apiClient.post(`/roles/promote/${encodeURIComponent(userId)}`);
      return response;
    } catch (error) {
      console.error('Promote user API error:', error);
      let message = error.message;
      if (error.response && error.response.data) {
        message = error.response.data.detail || error.response.data.message || message;
      }
      throw new Error(message);
    }
  },
  
  deleteAdmin: (adminId) => apiClient.delete(`/roles/admin/${adminId}`),
};