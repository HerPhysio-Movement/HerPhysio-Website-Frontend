import { apiClient } from './apiClient';

export const articleAPI = {
  createArticle: (data) => apiClient.post('/article/create', data),
  getAllArticles: () => apiClient.get('/article/'),
  getArticlesByCategory: (category) => apiClient.get(`/article/category/${category}`),
  getArticleById: (articleId) => apiClient.get(`/article/${articleId}`),
  updateArticle: (articleId, data) => apiClient.put(`/article/${articleId}`, data),
  deleteArticle: (articleId) => apiClient.delete(`/article/${articleId}`),
};
