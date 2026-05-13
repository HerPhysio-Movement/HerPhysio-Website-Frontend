import { apiClient } from './apiClient';

export const courseAPI = {
  createCourse: (data) => apiClient.post('/course/create', data),

  getAllCourses: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/course/${query ? `?${query}` : ''}`);
  },

  getCoursesByCategory: (category) =>
    apiClient.get(`/course/category/${encodeURIComponent(category)}`),

  getCourseById: (courseId) => apiClient.get(`/course/${courseId}`),

  updateCourse: (courseId, data) =>
    apiClient.put(`/course/${courseId}`, data),

  deleteCourse: (courseId) => apiClient.delete(`/course/${courseId}`),
};