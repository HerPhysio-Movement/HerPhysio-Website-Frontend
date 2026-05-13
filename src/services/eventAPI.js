import { apiClient } from './apiClient';

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
      return await apiClient.post('/event/create', data);
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
    return apiClient.put(`/event/${eventId}`, data);
  },
  deleteEvent: async (eventId) => {
    console.log('🔍 Deleting event with ID:', eventId);
    return apiClient.delete(`/event/${eventId}`);
  },
};