/**
 * Centralized API Response Helper
 * Standardizes how we extract and handle API responses across the application
 */

/**
 * Extract array from API response with fallback keys
 * @param {any} data - The API response data
 * @param {string[]} possibleKeys - Array of possible keys to check
 * @returns {array} - The extracted array or empty array
 */
export const extractArrayFromResponse = (data, possibleKeys = ['data', 'items', 'results', 'blogs', 'articles', 'projects', 'events', 'webinars', 'volunteers', 'users']) => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    for (const key of possibleKeys) {
      if (data[key] && Array.isArray(data[key])) return data[key];
    }
  }
  return [];
};

/**
 * Extract single object from API response
 * @param {any} data - The API response data
 * @returns {object} - The data object or empty object
 */
export const extractObjectFromResponse = (data) => {
  if (typeof data === 'object' && data !== null) return data;
  return {};
};

/**
 * Format error message from API response
 * @param {Error} error - The error object
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';
  
  if (error.response?.data) {
    const data = error.response.data;
    
    if (data.detail) {
      if (Array.isArray(data.detail)) {
        return data.detail.map(err => err.msg || err.message || String(err)).join(', ');
      }
      if (typeof data.detail === 'string') return data.detail;
    }
    
    if (Array.isArray(data)) {
      return data.map(err => err.msg || err.message || String(err)).join(', ');
    }
    
    if (data.message) return data.message;
    if (data.error) return data.error;
  }
  
  return error.message || 'An unexpected error occurred';
};

/**
 * Safe API call wrapper with error handling
 * @param {Function} apiMethod - The API method to call
 * @param {any[]} args - Arguments to pass to the method
 * @param {any} fallback - Fallback value if API call fails
 * @returns {Promise} - Promise with data or fallback
 */
export const safeAPICall = async (apiMethod, args = [], fallback = []) => {
  try {
    if (!apiMethod || typeof apiMethod !== 'function') {
      console.warn('Invalid API method provided');
      return fallback;
    }
    const result = await apiMethod(...args);
    return result || fallback;
  } catch (error) {
    console.error('API call failed:', error);
    return fallback;
  }
};

/**
 * Validate required fields in an object
 * @param {object} obj - Object to validate
 * @param {string[]} requiredFields - List of required field names
 * @returns {object} - { isValid: boolean, errors: string[] }
 */
export const validateRequired = (obj, requiredFields) => {
  const errors = [];
  requiredFields.forEach(field => {
    if (!obj[field] || (typeof obj[field] === 'string' && !obj[field].trim())) {
      errors.push(`${field} is required`);
    }
  });
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Debounce helper for API calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 500) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
