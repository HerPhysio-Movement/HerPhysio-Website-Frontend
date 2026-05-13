import { apiClient } from './apiClient';

export const projectAPI = {
  createProject: async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.image && data.image instanceof File) {
      formData.append('image', data.image);
    }
    if (data.status) {
      formData.append('status', data.status);
    }

    const response = await fetch(`${apiClient.baseURL}/projects/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiClient.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create project';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        console.log('Error parsing error response:', e);
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/projects/${query ? `?${query}` : ''}`);
  },

  getProjectById: (projectId) => apiClient.get(`/projects/${projectId}`),

  updateProject: async (projectId, data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.image && data.image instanceof File) {
      formData.append('image', data.image);
    }
    if (data.status) {
      formData.append('status', data.status);
    }

    const response = await fetch(`${apiClient.baseURL}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiClient.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update project';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        console.log('Error parsing error response:', e);
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  deleteProject: (projectId) => apiClient.delete(`/projects/${projectId}`),
  publishProject: (projectId) => apiClient.post(`/projects/${projectId}/publish`),
  archiveProject: (projectId) => apiClient.post(`/projects/${projectId}/archive`),
  getPublishedProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/projects/published${query ? `?${query}` : ''}`);
  },
  getPublishedProjectById: (projectId) => apiClient.get(`/projects/published/${projectId}`),
};