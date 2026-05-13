import { apiClient } from './apiClient';

export const authAPI = {
  // Admin
  adminSignup: (data) => apiClient.post('/admin/signup', data),
  adminLogin: (data) => apiClient.post('/admin/login', data),
  getAdminMe: () => apiClient.get('/admin/me'),

  // User
  userSignup: (data) => apiClient.post('/user/signup', data),
  userLogin: (data) => apiClient.post('/user/login', data),
  getUserMe: () => apiClient.get('/user/me'),
};

// Token helpers (delegated to apiClient)
export const setAuthToken = (token) => apiClient.setToken(token);
export const removeAuthToken = () => apiClient.setToken(null);
export const getAuthToken = () => apiClient.getToken();