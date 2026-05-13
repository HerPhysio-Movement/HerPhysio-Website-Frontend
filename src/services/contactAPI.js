import { apiClient } from './apiClient';

export const contactAPI = {
  submitContactForm: (data) => apiClient.post('/contact/submit', data),
  getAllContacts: () => apiClient.get('/contact/all'),
  getAllSubscribers: () => apiClient.get('/contact/subscribers'),
  subscribeToNewsletter: (data) => apiClient.post('/contact/subscribe', data),
};