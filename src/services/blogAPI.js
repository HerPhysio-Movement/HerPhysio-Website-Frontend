// src/services/blogAPI.js
import { apiClient } from './apiClient';

export const blogAPI = {
  createBlog: async (data) => {
    console.log('🔍 Creating blog with payload:', data);
    try {
      return await apiClient.post('/blogs/create', data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('❌ Blog creation failed. Response data:', error.response.data);
      }
      throw error;
    }
  },
  getAllBlogsPublic: () => apiClient.get('/blogs/'),
  getAllBlogsAdmin: () => apiClient.get('/blogs/admin'),
  getBlogByIdPublic: (blogId) => apiClient.get(`/blogs/${blogId}`),
  getBlogByIdAdmin: (blogId) => apiClient.get(`/blogs/admin/${blogId}`),
  updateBlog: (blogId, data) => apiClient.put(`/blogs/${blogId}`, data),
  deleteBlog: (blogId) => apiClient.delete(`/blogs/${blogId}`),
  publishBlog: (blogId) => apiClient.patch(`/blogs/${blogId}/publish`),
  archiveBlog: (blogId) => apiClient.patch(`/blogs/${blogId}/archive`),
};