import { apiClient } from './apiClient';

const buildEventFormData = (data) => {
  const formData = new FormData();

  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const eventAPI = {
  createEvent: async (data) => {
    console.log('🔍 Creating event with payload:', data);
    console.log('📊 Payload fields:', Object.keys(data));
    // Log data types
    const types = {};
    Object.entries(data).forEach(([k, v]) => {
      types[k] = `${typeof v} ${Array.isArray(v) ? '(array)' : v === null ? '(null)' : ''}`;
    });
    console.log('📝 Payload types:', types);
    try {
      const formData = buildEventFormData(data);
      const response = await fetch(`${apiClient.baseURL}/event/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiClient.getToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create event';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (error) {
          console.error('Error parsing event creation error response:', error);
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return response.status === 204 ? null : response.json();
    } catch (error) {
      console.error('❌ Event creation failed.');
      if (error.response) {
        console.error('HTTP status:', error.response.status);
        console.error('Response data (raw):', error.response.data);
        if (Array.isArray(error.response.data)) {
          console.error('Validation errors:');
          error.response.data.forEach((err, idx) => {
            console.error(`  ${idx + 1}. ${err.msg || err.message} (field: ${err.loc?.join('.')})`);
          });
        } else if (error.response.data.detail) {
          console.error('Detail:', error.response.data.detail);
        }
      }
      throw error;
    }
  },
  registerForEvent: async (data) => {
    console.log('🔍 Registering for event with payload:', data);
    return apiClient.post('/event/register', data);
  },
  getAllEvents: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/event/${query ? `?${query}` : ''}`);
  },
  getUserEvents: async (email) => {
    console.log('🔍 Fetching events for user:', email);
    return apiClient.get(`/event/user/${encodeURIComponent(email)}`);
  },
  getEventById: async (eventId) => {
    console.log('🔍 Fetching event with ID:', eventId);
    return apiClient.get(`/event/${eventId}`);
  },
  getEventRegistrations: async (eventId) => {
    console.log('🔍 Fetching registrations for event with ID:', eventId);
    return apiClient.get(`/event/${eventId}/registrations`);
  },
  updateEvent: async (eventId, data) => {
    console.log('🔍 Updating event with ID:', eventId, 'and payload:', data);
    const formData = buildEventFormData(data);
    const response = await fetch(`${apiClient.baseURL}/event/${eventId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiClient.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update event';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (error) {
        console.error('Error parsing event update error response:', error);
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.status === 204 ? null : response.json();
  },
  deleteEvent: async (eventId) => {
    console.log('🔍 Deleting event with ID:', eventId);
    return apiClient.delete(`/event/${eventId}`);
  },
};