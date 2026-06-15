const API_BASE_URL = 'https://herphysio-website.onrender.com';

const normalizeErrorMessage = (value, fallback) => {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    const messages = value
      .map((item) => normalizeErrorMessage(item, ''))
      .filter(Boolean);
    return messages.length ? messages.join(', ') : fallback;
  }
  if (typeof value === 'object') {
    const directMessages = [
      typeof value.message === 'string' ? value.message : '',
      typeof value.msg === 'string' ? value.msg : '',
      typeof value.detail === 'string' ? value.detail : '',
    ].filter(Boolean);

    const messages = Object.entries(value)
      .map(([key, item]) => `${key}: ${normalizeErrorMessage(item, '')}`.trim())
      .filter((message) => message && !message.endsWith(':'));

    const combinedMessages = [...directMessages, ...messages.filter((message) => !directMessages.includes(message))];
    return combinedMessages.length ? combinedMessages.join(', ') : fallback;
  }
  return fallback;
};

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        let errorDetail = null;
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorData.message || errorMessage;
          errorMessage = normalizeErrorMessage(errorDetail, errorMessage);
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        const error = new Error(errorMessage);
        error.response = { status: response.status, data: errorDetail };
        throw error;
      }
      if (response.status === 204) return null;
      return await response.json();
    } catch (error) {
      // Improve messaging for network-level failures (CORS, DNS, offline)
      console.error(`API Error [${endpoint}]:`, error);
      if (typeof window !== 'undefined' && error instanceof TypeError) {
        const improved = new Error(
          'Network error: Failed to fetch. Check backend URL, server status, and CORS configuration.'
        );
        improved.cause = error;
        throw improved;
      }
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: data });
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: data });
  }

  patch(endpoint, data) {
    return this.request(endpoint, { method: 'PATCH', body: data });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
