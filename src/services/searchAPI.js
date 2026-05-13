import { apiClient } from './apiClient';

export const searchAPI = {
  globalSearch: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/${query ? `?${query}` : ''}`);
  },
  searchEvents: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/events${query ? `?${query}` : ''}`);
  },
  searchArticles: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/articles${query ? `?${query}` : ''}`);
  },
  searchCourses: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/courses${query ? `?${query}` : ''}`);
  },
  searchWebinars: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/webinars${query ? `?${query}` : ''}`);
  },
  searchBlogs: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/search/blogs${query ? `?${query}` : ''}`);
  },
};